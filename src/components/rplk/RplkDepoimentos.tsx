import { useRef } from 'react'
import { depoimentos } from '../../data/rplk-content'

export default function RplkDepoimentos() {
  const scroller = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: -1 | 1) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(420, el.clientWidth * 0.85), behavior: 'smooth' })
  }

  return (
    <section className="bg-rplk-editorial py-24 md:py-32 border-y border-rplk-ink/10" aria-labelledby="rplk-depo-heading">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.45em] text-rplk-gold font-rplk-sans">Confiança</p>
          <h2
            id="rplk-depo-heading"
            className="mt-3 font-rplk-serif text-[clamp(2rem,3.5vw,3rem)] text-rplk-ink tracking-tight"
          >
            Depoimentos
          </h2>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            className="h-11 w-11 rounded-full border border-rplk-ink/25 text-rplk-ink hover:bg-rplk-midnight hover:text-white hover:border-rplk-midnight transition"
            aria-label="Anterior"
            onClick={() => scrollBy(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="h-11 w-11 rounded-full border border-rplk-ink/20 text-rplk-ink hover:bg-rplk-gold hover:text-rplk-midnight hover:border-rplk-gold transition"
            aria-label="Próximo"
            onClick={() => scrollBy(1)}
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory px-5 md:px-10 lg:px-14 pb-2 scrollbar-thin"
        style={{ scrollbarColor: 'rgba(37,37,37,0.2) transparent' }}
      >
        {depoimentos.map((d) => (
          <figure
            key={d.name}
            className="snap-start min-w-[min(100%,380px)] max-w-md border border-rplk-ink/10 bg-rplk-white p-8 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex gap-1 text-rplk-gold" aria-label={`${d.rating} de 5 estrelas`}>
                {Array.from({ length: d.rating }).map((_, i) => (
                  <span key={i} aria-hidden>
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="mt-6 font-rplk-serif text-xl leading-snug text-rplk-ink/90">
                “{d.quote}”
              </blockquote>
            </div>
            <figcaption className="mt-8 text-sm font-rplk-sans text-rplk-ink/55">
              <span className="block text-rplk-ink font-medium">{d.name}</span>
              {d.perfil}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
