import { useEffect, useState } from 'react'
import { useInView } from '../../hooks/useInView'

export default function RplkStats() {
  const { ref, visible } = useInView<HTMLElement>(0.35)
  const [nProj, setNProj] = useState(0)
  const [nPct, setNPct] = useState(0)
  const [nFocus, setNFocus] = useState(0)

  useEffect(() => {
    if (!visible) return
    const dur = 2000
    const t0 = performance.now()
    let raf = 0
    const ease = (x: number) => 1 - Math.pow(1 - x, 3)
    const tick = (now: number) => {
      const p = ease(Math.min(1, (now - t0) / dur))
      setNProj(Math.round(6 * p))
      setNPct(Math.round(28 * p))
      setNFocus(Math.round(100 * p))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible])

  return (
    <section
      ref={ref}
      className="relative bg-rplk-midnight py-24 md:py-32 border-y border-white/[0.12]"
      aria-labelledby="rplk-stats-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <h2 id="rplk-stats-heading" className="sr-only">
          Provas de performance
        </h2>
        <div className="grid gap-16 md:grid-cols-3 md:gap-8 text-center">
          <div className="space-y-3">
            <p className="font-rplk-serif text-[clamp(3.5rem,10vw,7rem)] leading-none text-rplk-gold tracking-tight">
              {nProj}
            </p>
            <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-rplk-muted font-rplk-sans max-w-[14rem] mx-auto">
              Projetos vendidos antes da entrega
            </p>
          </div>
          <div className="space-y-3 md:border-x border-white/[0.12] md:px-10">
            <p className="font-rplk-serif text-[clamp(3.5rem,10vw,7rem)] leading-none text-rplk-gold tracking-tight">
              +{nPct}%
            </p>
            <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-rplk-muted font-rplk-sans max-w-[14rem] mx-auto">
              Média de valorização em carteira selecionada
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-rplk-serif text-[clamp(3.5rem,10vw,7rem)] leading-none text-rplk-gold tracking-tight">
              {nFocus}%
            </p>
            <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-rplk-muted font-rplk-sans max-w-[14rem] mx-auto">
              Foco residencial
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
