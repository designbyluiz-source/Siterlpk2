import { useEffect, useRef, useState } from 'react'

/** Presets para secções e para elementos dentro das secções (Âmbar). */
export type AmbarMotionPreset =
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'blur-rise'
  | 'skew-up'
  | 'zoom-pop'
  | 'glide-left'
  | 'glide-right'
  | 'tilt-in'

export type AmbarRevealVariant = Extract<
  AmbarMotionPreset,
  'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in'
>

export const AMBAR_MOTION_SHOWN =
  'opacity-100 translate-x-0 translate-y-0 scale-100 skew-x-0 skew-y-0 rotate-0 blur-none'

export function presetHiddenClasses(preset: AmbarMotionPreset): string {
  switch (preset) {
    case 'fade':
      return 'opacity-0'
    case 'fade-up':
      return 'opacity-0 translate-y-[28px]'
    case 'fade-down':
      return 'opacity-0 -translate-y-[28px]'
    case 'fade-left':
      return 'opacity-0 translate-x-[36px]'
    case 'fade-right':
      return 'opacity-0 -translate-x-[36px]'
    case 'zoom-in':
      return 'opacity-0 scale-[0.94]'
    case 'blur-rise':
      return 'opacity-0 translate-y-[38px] blur-md'
    case 'skew-up':
      return 'opacity-0 translate-y-[24px] skew-y-[5deg] scale-[0.96]'
    case 'zoom-pop':
      return 'opacity-0 scale-[0.78]'
    case 'glide-left':
      return 'opacity-0 translate-x-[56px]'
    case 'glide-right':
      return 'opacity-0 -translate-x-[56px]'
    case 'tilt-in':
      return 'opacity-0 translate-y-[20px] rotate-[2.5deg] scale-[0.93]'
    default:
      return 'opacity-0 translate-y-[28px]'
  }
}

export function presetTransitionClasses(preset: AmbarMotionPreset): string {
  const base =
    'motion-safe:will-change-[transform,opacity,filter] motion-safe:transition-[opacity,transform,filter]'
  if (preset === 'zoom-pop') {
    return `${base} motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.34,1.56,0.64,1)]`
  }
  if (preset === 'skew-up' || preset === 'tilt-in') {
    return `${base} motion-safe:duration-[820ms] motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)]`
  }
  if (preset === 'blur-rise') {
    return `${base} motion-safe:duration-[850ms] motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)]`
  }
  return `${base} motion-safe:duration-[780ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]`
}

export function useReducedMotionAmbar(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export type IntersectionRevealOptions = {
  once?: boolean
  threshold?: number
  rootMargin?: string
}

export function useIntersectionReveal<T extends HTMLElement>({
  once = false,
  threshold = 0.1,
  rootMargin = '0px 0px -5% 0px',
}: IntersectionRevealOptions) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) io.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, threshold, rootMargin])

  return { ref, visible }
}
