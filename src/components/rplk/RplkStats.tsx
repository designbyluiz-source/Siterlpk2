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
      className="relative bg-rplk-editorial pt-[70px] pb-[110px] md:pb-[120px]"
      aria-labelledby="rplk-stats-heading"
    >
      <div className="rplk-editorial-container">
        {/* Section title */}
        <h2
          id="rplk-stats-heading"
          className="font-rplk-serif font-normal italic text-[clamp(2.25rem,5vw,4.375rem)] leading-[1.03] text-rplk-ink tracking-normal mb-[60px] md:mb-[80px]"
        >
          Números que falam por si.
        </h2>

        {/* Stats grid — 3 cols with horizontal separators */}
        <div className="grid md:grid-cols-3 divide-y divide-rplk-ink/15 md:divide-y-0 border-t border-rplk-ink/15">
          <div className="flex flex-col justify-center gap-5 text-center min-h-[240px] py-[55px] px-6 md:px-10 md:border-r border-rplk-ink/15">
            <p className="font-rplk-serif font-light italic leading-[0.92] text-rplk-ink tracking-normal"
              style={{ fontSize: 'clamp(5rem,18vw,8.125rem)' }}>
              {nProj}
            </p>
            <p className="mx-auto max-w-[14rem] font-rplk-sans text-[14px] font-normal uppercase tracking-rplk-nav text-rplk-ink/55 leading-normal">
              Projetos vendidos antes da entrega
            </p>
          </div>
          <div className="flex flex-col justify-center gap-5 text-center min-h-[240px] py-[55px] px-6 md:px-10 md:border-r border-rplk-ink/15">
            <p className="font-rplk-serif font-light italic leading-[0.92] text-rplk-ink tracking-normal"
              style={{ fontSize: 'clamp(5rem,18vw,8.125rem)' }}>
              +{nPct}%
            </p>
            <p className="mx-auto max-w-[14rem] font-rplk-sans text-[14px] font-normal uppercase tracking-rplk-nav text-rplk-ink/55 leading-normal">
              Média de valorização em carteira selecionada
            </p>
          </div>
          <div className="flex flex-col justify-center gap-5 text-center min-h-[240px] py-[55px] px-6 md:px-10">
            <p className="font-rplk-serif font-light italic leading-[0.92] text-rplk-ink tracking-normal"
              style={{ fontSize: 'clamp(5rem,18vw,8.125rem)' }}>
              {nFocus}%
            </p>
            <p className="mx-auto max-w-[14rem] font-rplk-sans text-[14px] font-normal uppercase tracking-rplk-nav text-rplk-ink/55 leading-normal">
              Foco residencial
            </p>
          </div>
        </div>

        {/* Bottom separator */}
        <div className="border-b border-rplk-ink/15 mt-0" />
      </div>
    </section>
  )
}
