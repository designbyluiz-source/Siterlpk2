import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

const SWIPE_PX = 56

export type ImageLightboxProps = {
  open: boolean
  images: readonly string[]
  startIndex: number
  alt?: string
  onClose: () => void
  /** Mantém o carrossel da página alinhado ao slide visto no lightbox */
  onIndexChange?: (index: number) => void
  /**
   * Conteúdo extra sobreposto ao lightbox (acima da imagem, abaixo de Fechar / setas).
   * Recebe o índice atual para permitir UI dependente da imagem em foco.
   */
  renderOverlay?: (currentIndex: number) => ReactNode
}

export default function ImageLightbox({
  open,
  images,
  startIndex,
  alt = '',
  onClose,
  onIndexChange,
  renderOverlay,
}: ImageLightboxProps) {
  const [index, setIndex] = useState(0)
  const dragStartX = useRef<number | null>(null)
  const swipeNavigated = useRef(false)
  const len = images.length
  const canNav = len > 1

  useLayoutEffect(() => {
    if (!open || len === 0) return
    const clamped = Math.max(0, Math.min(startIndex, len - 1))
    setIndex(clamped)
  }, [open, startIndex, len])

  const goNext = useCallback(() => {
    if (!canNav) return
    setIndex((i) => {
      const n = (i + 1) % len
      onIndexChange?.(n)
      return n
    })
  }, [canNav, len, onIndexChange])

  const goPrev = useCallback(() => {
    if (!canNav) return
    setIndex((i) => {
      const n = (i - 1 + len) % len
      onIndexChange?.(n)
      return n
    })
  }, [canNav, len, onIndexChange])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (!canNav) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goPrev()
      }
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose, canNav, goNext, goPrev])

  const onPointerDown = (e: React.PointerEvent) => {
    if (!canNav) return
    dragStartX.current = e.clientX
    swipeNavigated.current = false
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current == null) return
    const start = dragStartX.current
    dragStartX.current = null
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    if (!canNav) return
    const dx = e.clientX - start
    if (dx < -SWIPE_PX) {
      swipeNavigated.current = true
      goNext()
    } else if (dx > SWIPE_PX) {
      swipeNavigated.current = true
      goPrev()
    }
  }

  const onPointerCancel = (e: React.PointerEvent) => {
    dragStartX.current = null
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }

  const src = len > 0 ? images[index] : null
  if (!open || !src) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] bg-black"
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Imagem em tela cheia'}
      aria-live="polite"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-[2] rounded-sm border border-white/30 bg-black/50 px-4 py-2 font-ui text-sm text-white hover:bg-white/10"
        aria-label="Fechar"
      >
        Fechar
      </button>

      {canNav && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            className="absolute left-2 top-1/2 z-[2] -translate-y-1/2 rounded-sm border border-white/20 bg-black/40 p-3 text-white hover:bg-white/10 md:left-6"
            aria-label="Imagem anterior"
          >
            <span className="sr-only">Anterior</span>
            <span aria-hidden className="block text-2xl leading-none">
              ‹
            </span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            className="absolute right-2 top-1/2 z-[2] -translate-y-1/2 rounded-sm border border-white/20 bg-black/40 p-3 text-white hover:bg-white/10 md:right-6"
            aria-label="Próxima imagem"
          >
            <span className="sr-only">Próxima</span>
            <span aria-hidden className="block text-2xl leading-none">
              ›
            </span>
          </button>
        </>
      )}

      <div
        className="absolute inset-0 flex items-center justify-center p-4 pt-16 md:p-8 md:pt-20"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            if (swipeNavigated.current) {
              swipeNavigated.current = false
              return
            }
            onClose()
          }
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        style={{ touchAction: canNav ? 'none' : undefined }}
      >
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain select-none"
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />
      </div>

      {renderOverlay ? <>{renderOverlay(index)}</> : null}
    </div>,
    document.body,
  )
}
