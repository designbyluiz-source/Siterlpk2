import { Link } from 'react-router-dom'

const pilares = [
  {
    n: '01',
    title: 'Valorização Patrimonial',
    href: '#contato',
    external: false,
  },
  {
    n: '02',
    title: 'Inteligência Urbana',
    href: '#contato',
    external: false,
  },
  {
    n: '03',
    title: 'Execução Impecável',
    href: '#contato',
    external: false,
  },
  {
    n: '04',
    title: 'Conheça o Âmbar',
    href: '/empreendimentos/ambar',
    external: false,
    isLink: true,
  },
] as const

export default function RplkPilares() {
  return (
    <section className="bg-rplk-editorial py-[90px] md:py-[100px]" aria-labelledby="rplk-pilares-heading">
      <div className="rplk-editorial-container">
        {/* Section header */}
        <p className="font-rplk-sans text-[clamp(1rem,2vw,1.125rem)] font-normal uppercase tracking-rplk-nav text-rplk-gold mb-5">
          Fundamentos
        </p>
        <h2
          id="rplk-pilares-heading"
          className="font-rplk-serif font-normal italic text-[clamp(2.25rem,5vw,4.375rem)] leading-[1.03] text-rplk-ink tracking-normal max-w-[min(100%,42rem)]"
        >
          Três pilares que sustentam cada decisão.
        </h2>

        {/* BoxLinks list */}
        <ul className="mt-[60px] md:mt-[70px]" role="list">
          {pilares.map((p) => {
            const itemClass = 'group flex items-center justify-between py-[30px] cursor-pointer'
            const leftContent = (
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="font-rplk-serif font-normal italic text-[clamp(0.875rem,1.4vw,1.125rem)] text-rplk-ink/40 tracking-normal leading-none shrink-0">
                  {p.n}
                </span>
                <span className="font-rplk-sans font-normal uppercase tracking-rplk-nav text-[clamp(1.125rem,2.5vw,2rem)] leading-none text-rplk-ink group-hover:text-rplk-gold transition-colors duration-300">
                  {p.title}
                </span>
              </div>
            )
            const arrow = (
              <span
                className="font-rplk-sans text-[clamp(1.25rem,2vw,1.75rem)] text-rplk-ink/35 group-hover:text-rplk-gold transition-colors duration-300 shrink-0 ml-8"
                aria-hidden
              >
                →
              </span>
            )

            return (
              <li key={p.n} className="border-t border-rplk-ink/15 last:border-b">
                {'isLink' in p && p.isLink ? (
                  <Link to={p.href} className={itemClass} aria-label={p.title}>
                    {leftContent}
                    {arrow}
                  </Link>
                ) : (
                  <a href={p.href} className={itemClass} aria-label={p.title}>
                    {leftContent}
                    {arrow}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
