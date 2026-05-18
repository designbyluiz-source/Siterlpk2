import { useEffect, useMemo, useRef, useState } from 'react'
import { ASSETS } from '../assets/figma'
import { AMBAR_HERO_PHOTOS } from '../data/ambar-hero-media'
import AmbarRevealItem from './AmbarRevealItem'

const VIDEO_SRC = '/ambar/mobiliario-3d.mp4'

/** Tempo em que o vídeo fica visível primeiro; depois cada foto. */
const VIDEO_HOLD_MS = 10_000
const PHOTO_HOLD_MS = 5_500
const FADE_MS = 1100

function usePrefersReducedMotion(): boolean {
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

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  const slideCount = 1 + AMBAR_HERO_PHOTOS.length
  const [active, setActive] = useState(0)

  const durations = useMemo(() => {
    const d: number[] = [VIDEO_HOLD_MS]
    for (let i = 0; i < AMBAR_HERO_PHOTOS.length; i++) d.push(PHOTO_HOLD_MS)
    return d
  }, [])

  useEffect(() => {
    if (reducedMotion || slideCount <= 1) return
    const ms = durations[active] ?? PHOTO_HOLD_MS
    const id = window.setTimeout(() => setActive((i) => (i + 1) % slideCount), ms)
    return () => window.clearTimeout(id)
  }, [active, durations, reducedMotion, slideCount])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (reducedMotion) {
      v.pause()
      return
    }
    if (active === 0) {
      void v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [active, reducedMotion])

  return (
    <section
      id="hero"
      className="relative isolate min-h-screen flex flex-col items-center justify-between py-10 md:py-[80px] px-6 md:px-[80px] overflow-hidden"
      data-node-id="335:498"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-black">
        {/* Slide 0: vídeo (sempre primeiro na rotação) */}
        <div
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            opacity: reducedMotion ? 1 : active === 0 ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-center"
            muted
            loop
            playsInline
            preload="auto"
            poster={ASSETS.heroBg}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>

        {/* Slides 1..n: fotos */}
        {AMBAR_HERO_PHOTOS.map((photo, i) => {
          const slideIndex = i + 1
          const visible = reducedMotion ? 0 : active === slideIndex ? 1 : 0
          return (
            <div
              key={photo.src}
              className="absolute inset-0 transition-opacity ease-in-out"
              style={{
                opacity: visible,
                transitionDuration: `${FADE_MS}ms`,
              }}
            >
              <img
                src={photo.src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading={i < 3 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          )
        })}

        <div className="absolute inset-0 z-[2] bg-black/35 pointer-events-none" />
      </div>

      <div className="relative z-[4] h-[75px] w-full shrink-0" aria-hidden />

      <div className="relative z-[4] flex flex-1 flex-col items-center justify-center py-12 text-center">
        <div className="flex flex-col items-center gap-6">
          <AmbarRevealItem preset="blur-rise" staggerIndex={0} staggerMs={110} once={false} threshold={0.08}>
            <img
              src={ASSETS.ambarWordmark}
              alt="Âmbar"
              className="w-[280px] sm:w-[380px] md:w-[496px] h-auto select-none"
            />
          </AmbarRevealItem>
          <AmbarRevealItem preset="skew-up" staggerIndex={1} staggerMs={110} once={false} threshold={0.08}>
            <p className="font-ui text-[18px] leading-[65px] text-white whitespace-pre">
              {`Reencontre o passado.  Conheça seu futuro.`}
            </p>
          </AmbarRevealItem>
        </div>
      </div>

      <AmbarRevealItem
        preset="tilt-in"
        delayMs={160}
        once={false}
        threshold={0.12}
        className="relative z-[4]"
      >
        <a
          href="#sobre"
          className="flex flex-col items-center gap-3 opacity-80 hover:opacity-100 transition-opacity"
        >
          <span className="font-ui text-[20px] leading-[65px] text-white">SABER MAIS</span>
          <img src={ASSETS.expandArrow} alt="" className="h-[42px] w-[42px]" aria-hidden />
        </a>
      </AmbarRevealItem>
    </section>
  )
}
