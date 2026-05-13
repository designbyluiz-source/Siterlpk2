import { useEffect, useState } from 'react'
import { heroSlides } from '../../data/rplk-content'

function scrollToEmpreendimento(anchorId: string) {
  const el = document.getElementById(anchorId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function RplkHero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length)
    }, 7500)
    return () => window.clearInterval(id)
  }, [])

  const slide = heroSlides[index]

  return (
    <section className="relative min-h-[100svh] isolate overflow-hidden bg-rplk-midnight" aria-label="Destaques">
      {heroSlides.map((s, i) => (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
            i === index ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={s.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-[18s] motion-safe:ease-out"
            style={{
              transform: i === index ? 'scale(1.04) translateZ(0)' : 'scale(1.1) translateZ(0)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/25" />
        </div>
      ))}

      {/* Clique na área da foto (atrás do conteúdo) rola até o empreendimento do slide atual */}
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 z-[5] cursor-pointer border-0 bg-transparent p-0"
        aria-label={`Ir para o empreendimento ${slide.empreendimentoNome} na lista abaixo`}
        onClick={() => scrollToEmpreendimento(slide.empreendimentoAnchorId)}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col pt-[100px] md:pt-[110px] pointer-events-none">
        <div className="flex flex-1 flex-col justify-end pb-16 md:pb-24 px-5 md:px-10 lg:px-14">
          <div className="ml-auto max-w-[min(100%,520px)] text-right pointer-events-auto">
            <h1 className="font-rplk-serif text-rplk-white leading-[0.95] tracking-tight">
              <span className="block text-[clamp(2.25rem,6vw,4.75rem)] font-medium">{slide.line1}</span>
              <span className="block text-[clamp(2.25rem,6vw,4.75rem)] font-normal italic text-rplk-gold">
                {slide.line2}
              </span>
            </h1>
            <p className="mt-6 text-sm md:text-base text-white/80 font-rplk-sans max-w-md ml-auto leading-relaxed">
              {slide.sub}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-end gap-4">
              <a
                href="#empreendimentos"
                className="rplk-btn-outline border-rplk-gold text-rplk-gold hover:bg-rplk-gold hover:text-rplk-midnight text-[11px] tracking-[0.28em] uppercase px-8 py-3.5"
              >
                Ver oportunidades
              </a>
            </div>
          </div>

          <div className="mt-14 flex items-center justify-between gap-6 pointer-events-auto">
            <div className="flex gap-2">
              <button
                type="button"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-rplk-gold/45 text-rplk-gold transition hover:bg-rplk-gold hover:text-rplk-midnight hover:border-rplk-gold"
                aria-label="Slide anterior"
                onClick={() => setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length)}
              >
                <span className="text-lg leading-none">‹</span>
              </button>
              <button
                type="button"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-rplk-gold/45 text-rplk-gold transition hover:bg-rplk-gold hover:text-rplk-midnight hover:border-rplk-gold"
                aria-label="Próximo slide"
                onClick={() => setIndex((i) => (i + 1) % heroSlides.length)}
              >
                <span className="text-lg leading-none">›</span>
              </button>
            </div>
            <div className="flex gap-2" role="tablist" aria-label="Slides">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === index ? 'w-8 bg-rplk-gold' : 'w-2 bg-white/30 hover:bg-rplk-gold/55'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
