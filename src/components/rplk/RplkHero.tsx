import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { heroAmbianceSlides } from '../../data/rplk-content'

export default function RplkHero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroAmbianceSlides.length)
    }, 7500)
    return () => window.clearInterval(id)
  }, [])

  const slide = heroAmbianceSlides[index]

  return (
    <section
      className="group relative isolate overflow-hidden bg-rplk-midnight h-[100svh]"
      aria-label="Abertura"
    >
      {/* Background slides */}
      {heroAmbianceSlides.map((s, i) => (
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
        </div>
      ))}

      {/* Previous arrow */}
      <button
        type="button"
        className="pointer-events-auto absolute left-[clamp(1rem,4.8vw,70px)] top-1/2 z-20 hidden h-[30px] w-[30px] -translate-y-1/2 items-center justify-center border border-solid border-white/85 bg-transparent text-[22px] font-light leading-none text-white opacity-0 shadow-none transition-opacity duration-[400ms] ease-out hover:border-rplk-gold hover:text-rplk-gold md:flex motion-safe:group-hover:opacity-100"
        aria-label="Imagem de fundo anterior"
        onClick={() => setIndex((i) => (i - 1 + heroAmbianceSlides.length) % heroAmbianceSlides.length)}
      >
        ‹
      </button>

      {/* Next arrow */}
      <button
        type="button"
        className="pointer-events-auto absolute right-[clamp(1rem,4.8vw,70px)] top-1/2 z-20 hidden h-[30px] w-[30px] -translate-y-1/2 items-center justify-center border border-solid border-white/85 bg-transparent text-[22px] font-light leading-none text-white opacity-0 shadow-none transition-opacity duration-[400ms] ease-out hover:border-rplk-gold hover:text-rplk-gold md:flex motion-safe:group-hover:opacity-100"
        aria-label="Próxima imagem de fundo"
        onClick={() => setIndex((i) => (i + 1) % heroAmbianceSlides.length)}
      >
        ›
      </button>

      {/* Content — bottom-left aligned */}
      <div className="relative z-10 flex h-full flex-col justify-end pb-12 md:pb-16">
        <div className="rplk-editorial-container flex flex-col items-start gap-0">
          {/* Badge */}
          <p
            key={`badge-${index}`}
            className="font-rplk-serif font-normal italic text-[clamp(1rem,1.8vw,1.5rem)] leading-snug tracking-[3px] text-white/85"
          >
            {slide.badge}
          </p>

          {/* Main title — link se o slide tiver href */}
          {slide.href ? (
            <Link
              key={`title-${index}`}
              to={slide.href}
              className="mt-3 font-rplk-sans font-normal uppercase tracking-[3px] text-white leading-[0.92] hover:text-rplk-gold transition-colors duration-300 group/title"
              style={{ fontSize: 'clamp(5rem,18vw,10rem)' }}
              aria-label={`Ver empreendimento ${slide.title}`}
            >
              <h1>{slide.title}</h1>
              <span className="block mt-2 font-rplk-sans text-[clamp(0.75rem,1.4vw,1rem)] uppercase tracking-[3px] text-rplk-gold/80 group-hover/title:text-rplk-gold transition-colors">
                Ver empreendimento →
              </span>
            </Link>
          ) : (
            <h1
              key={`title-${index}`}
              className="mt-3 font-rplk-sans font-normal uppercase tracking-[3px] text-white leading-[0.92]"
              style={{ fontSize: 'clamp(5rem,18vw,10rem)' }}
            >
              {slide.title}
            </h1>
          )}

          {/* Sub */}
          <p
            key={`sub-${index}`}
            className="mt-4 font-rplk-sans font-normal uppercase tracking-[3px] text-white/75 text-[clamp(0.75rem,1.4vw,1rem)]"
          >
            {slide.sub}
          </p>
        </div>
      </div>

      {/* Bottom-right: dots + scroll arrow */}
      <div className="absolute bottom-12 right-[clamp(1.5rem,4vw,60px)] z-20 flex flex-col items-center gap-6">
        <div className="flex gap-3" role="tablist" aria-label="Selecionar imagem de fundo">
          {heroAmbianceSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`h-[15px] w-[15px] shrink-0 rounded-full border-0 transition-colors duration-300 ${
                i === index ? 'bg-rplk-gold' : 'bg-white/35 hover:bg-white/55'
              }`}
              aria-label={`Fundo ${i + 1} de ${heroAmbianceSlides.length}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <Link
          to="/#sobre"
          className="flex text-white/75 transition-colors hover:text-rplk-gold motion-safe:animate-[fadeIn_1s_ease-out]"
          aria-label="Descer para a próxima secção"
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden className="opacity-90">
            <path
              d="M30 14v26M17 31l13 13 13-13"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  )
}
