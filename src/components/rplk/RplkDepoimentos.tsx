import { useRef } from 'react'
import { depoimentos } from '../../data/rplk-content'

export default function RplkDepoimentos() {
  const scroller = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: -1 | 1) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(420, el.clientWidth * 0.85), behavior: 'auto' })
  }

  return (
    <section className="bg-rplk-midnight py-[50px] md:py-[70px]" aria-labelledby="rplk-depo-heading">
      <div className="rplk-editorial-container flex flex-col md:flex-row md:items-end md:justify-between gap-10 pb-12">
        <div>
          <p className="font-rplk-sans text-[clamp(1rem,2vw,1.125rem)] font-normal uppercase tracking-rplk-nav text-rplk-gold">
            Confiança
          </p>
          <h2
            id="rplk-depo-heading"
            className="mt-5 font-rplk-serif font-normal italic text-[clamp(2.25rem,5vw,4.375rem)] leading-[1.03] text-rplk-white tracking-normal"
          >
            Depoimentos
          </h2>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            className="h-11 w-11 rounded-full border border-white/25 text-white/70 hover:bg-white hover:text-rplk-midnight hover:border-white transition"
            aria-label="Anterior"
            onClick={() => scrollBy(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="h-11 w-11 rounded-full border border-white/20 text-white/70 hover:bg-rplk-gold hover:text-rplk-midnight hover:border-rplk-gold transition"
            aria-label="Próximo"
            onClick={() => scrollBy(1)}
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-[40px] pb-4 scrollbar-thin"
        style={{ scrollbarColor: 'rgba(200,164,106,0.3) transparent' }}
      >
        {depoimentos.map((d, i) => (
          <figure
            key={d.name}
            className={`snap-start min-w-[min(100%,380px)] max-w-md bg-white flex flex-col justify-between ${
              i % 2 === 0
                ? 'rounded-none rounded-br-[15px] rounded-tr-[15px]'
                : 'rounded-none rounded-bl-[15px] rounded-tl-[15px]'
            } ${i % 2 === 0 ? 'pl-[30px] pr-10 py-[30px]' : 'pr-[30px] pl-10 py-[30px]'}`}
          >
            <div>
              <div className="flex gap-1 text-rplk-gold" aria-label={`${d.rating} de 5 estrelas`}>
                {Array.from({ length: d.rating }).map((_, si) => (
                  <span key={si} aria-hidden>
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="mt-8 font-rplk-serif font-normal italic text-[19px] leading-[25.65px] text-rplk-ink/90">
                "{d.quote}"
              </blockquote>
            </div>
            <figcaption className="mt-10 font-rplk-sans text-[18px] leading-6 font-normal text-rplk-ink/55">
              <span className="block text-rplk-ink">{d.name}</span>
              {d.perfil}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
