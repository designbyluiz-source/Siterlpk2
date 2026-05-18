import { type CSSProperties, type ReactNode } from 'react'
import {
  AMBAR_MOTION_SHOWN,
  type AmbarRevealVariant,
  presetHiddenClasses,
  presetTransitionClasses,
  useIntersectionReveal,
  useReducedMotionAmbar,
} from '../lib/ambarMotion'

type AmbarRevealSectionProps = {
  children: ReactNode
  variant?: AmbarRevealVariant
  delayMs?: number
  once?: boolean
  threshold?: number
  rootMargin?: string
  className?: string
}

export type { AmbarRevealVariant }

/**
 * Invólucro de secção completa no Âmbar (scroll reveal).
 */
export default function AmbarRevealSection({
  children,
  variant = 'fade-up',
  delayMs = 0,
  once = true,
  threshold = 0.12,
  rootMargin = '0px 0px -6% 0px',
  className = '',
}: AmbarRevealSectionProps) {
  const reducedMotion = useReducedMotionAmbar()
  const { ref, visible } = useIntersectionReveal<HTMLDivElement>({ once, threshold, rootMargin })

  const revealed = reducedMotion || visible

  const style: CSSProperties | undefined =
    !reducedMotion && delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined

  return (
    <div
      ref={ref}
      style={style}
      className={[
        'w-full',
        !reducedMotion && presetTransitionClasses(variant),
        revealed ? AMBAR_MOTION_SHOWN : presetHiddenClasses(variant),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
