import { type CSSProperties, type ReactNode } from 'react'
import {
  AMBAR_MOTION_SHOWN,
  type AmbarMotionPreset,
  presetHiddenClasses,
  presetTransitionClasses,
  useIntersectionReveal,
  useReducedMotionAmbar,
} from '../lib/ambarMotion'

type AmbarRevealItemProps = {
  children: ReactNode
  preset?: AmbarMotionPreset
  /**
   * `false` = anima de novo ao sair e voltar a entrar no ecrã (entrada/saída).
   * `true` = só na primeira vez.
   */
  once?: boolean
  delayMs?: number
  staggerIndex?: number
  staggerMs?: number
  threshold?: number
  rootMargin?: string
  /** Duração CSS (ms), sobrepõe o default do preset. */
  durationMs?: number
  className?: string
}

/**
 * Bloco dentro de uma secção Âmbar — observa o próprio elemento e anima com presets mais ricos
 * (blur, skew, elastic, glide). Combina com `staggerIndex` + `staggerMs` para cascata.
 */
export default function AmbarRevealItem({
  children,
  preset = 'blur-rise',
  once = false,
  delayMs = 0,
  staggerIndex = 0,
  staggerMs = 0,
  threshold = 0.08,
  rootMargin = '0px 0px -8% 0px',
  durationMs,
  className = '',
}: AmbarRevealItemProps) {
  const reducedMotion = useReducedMotionAmbar()
  const { ref, visible } = useIntersectionReveal<HTMLDivElement>({ once, threshold, rootMargin })

  const revealed = reducedMotion || visible
  const totalDelay = delayMs + staggerIndex * staggerMs

  const style: CSSProperties = {}
  if (!reducedMotion && totalDelay > 0) style.transitionDelay = `${totalDelay}ms`
  if (!reducedMotion && durationMs != null) style.transitionDuration = `${durationMs}ms`

  return (
    <div
      ref={ref}
      style={Object.keys(style).length > 0 ? style : undefined}
      className={[
        !reducedMotion && presetTransitionClasses(preset),
        revealed ? AMBAR_MOTION_SHOWN : presetHiddenClasses(preset),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
