import { Link } from 'react-router-dom'
import { empreendimentos } from '../../data/rplk-content'
import { ASSETS } from '../../assets/figma'

const isAmbarEmp = (slug?: string) => slug === '/empreendimentos/ambar'

export default function RplkEmpreendimentos({ standalone = false }: { standalone?: boolean }) {
  const headerTop = standalone
    ? 'pt-[calc(71px+2rem)] md:pt-[calc(71px+2.75rem)]'
    : 'pt-[90px] md:pt-[110px]'

  if (standalone) {
    // Standalone mode: stacked full-width with details (dark background so header is visible)
    return (
      <section
        id="empreendimentos"
        className="bg-rplk-midnight text-white scroll-mt-[88px]"
        aria-labelledby="rplk-emp-heading"
      >
        <div className={`rplk-editorial-container ${headerTop} pb-12 md:pb-16`}>
          <p className="font-rplk-sans text-[clamp(1rem,2vw,1.125rem)] font-normal uppercase tracking-rplk-nav text-rplk-gold">
            Portfólio
          </p>
          <h2
            id="rplk-emp-heading"
            className="mt-5 font-rplk-serif font-normal italic text-[clamp(2.5rem,6vw,4.375rem)] leading-[1.03] text-white tracking-normal"
          >
            Empreendimentos
          </h2>
          <p className="mt-10 max-w-[42rem] font-rplk-sans text-[16px] leading-[1.65] text-white/70">
            Esta página concentra fichas e imagens dos projetos. O manifesto e os pilares da marca continuam na secção{' '}
            <Link
              to="/#sobre"
              className="font-rplk-serif font-normal italic text-[18px] leading-snug text-white underline decoration-rplk-gold/45 underline-offset-[5px] transition-colors hover:text-rplk-gold hover:decoration-rplk-gold"
            >
              Sobre
            </Link>{' '}
            da home; artigos para investidores na página{' '}
            <Link
              to="/blog"
              className="font-rplk-serif font-normal italic text-[18px] leading-snug text-white underline decoration-rplk-gold/45 underline-offset-[5px] transition-colors hover:text-rplk-gold hover:decoration-rplk-gold"
            >
              Blog
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col gap-0">
          {empreendimentos.map((e) => {
            const frameLinkClass =
              'relative block h-[min(72vh,820px)] w-full overflow-hidden group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rplk-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-rplk-editorial bg-rplk-midnight'
            const frameDivClass =
              'relative h-[min(72vh,820px)] w-full overflow-hidden group bg-rplk-midnight'

            const media = (
              <>
                <img
                  src={e.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-40"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                <div
                  className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                  aria-hidden
                >
                  {isAmbarEmp(e.slug) ? (
                    <img
                      src={ASSETS.ambarWordmark}
                      alt=""
                      className="block w-[min(68vw,360px)] max-w-full h-auto shrink-0 object-contain drop-shadow-[0_4px_32px_rgba(0,0,0,0.45)]"
                    />
                  ) : (
                    <p className="max-w-[min(92vw,1100px)] px-6 text-center font-rplk-serif font-normal italic text-[clamp(2rem,7vw,4rem)] leading-[1.05] tracking-normal text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]">
                      {e.title}
                    </p>
                  )}
                </div>
                <div className="pointer-events-none absolute left-8 top-8 z-20 flex flex-wrap gap-x-6 gap-y-3 md:left-14 md:top-10">
                  <span className="font-rplk-serif text-[clamp(1.125rem,2vw,1.875rem)] italic font-normal tracking-[3px] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                    {e.status}
                  </span>
                  <span className="font-rplk-serif text-[clamp(1.125rem,2vw,1.875rem)] italic font-normal tracking-[3px] text-rplk-gold drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                    {e.badge}
                  </span>
                </div>
              </>
            )

            return (
              <article key={e.title} id={e.anchorId} className="scroll-mt-[88px] py-14 md:py-[55px]">
                {e.slug ? (
                  <Link
                    to={e.slug}
                    className={frameLinkClass}
                    aria-label={`Ver página do empreendimento ${e.title}`}
                  >
                    {media}
                  </Link>
                ) : (
                  <div className={frameDivClass}>{media}</div>
                )}

                <div className="rplk-editorial-container pt-[30px] pb-6 md:pt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[100px] items-start lg:items-center">
                  <div className="space-y-6">
                    <h3 className="font-rplk-sans text-[clamp(1.125rem,2vw,1.5625rem)] font-normal uppercase tracking-rplk-nav leading-[1.15] text-white">
                      {e.title}
                    </h3>
                    <p className="font-rplk-serif font-normal italic text-[clamp(1.25rem,3vw,2.1875rem)] leading-[1.15] text-white/88 max-w-2xl">
                      {e.headline}
                    </p>
                    <p className="font-rplk-sans text-[16px] leading-[1.65] text-white/60 max-w-xl">{e.destaque}</p>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-10 gap-y-8 font-rplk-sans text-[16px] text-white/70">
                    <div>
                      <dt className="font-rplk-sans text-[14px] font-normal uppercase tracking-rplk-nav text-rplk-gold/90">
                        Metragem
                      </dt>
                      <dd className="mt-2 text-white">{e.metragem}</dd>
                    </div>
                    <div>
                      <dt className="font-rplk-sans text-[14px] font-normal uppercase tracking-rplk-nav text-rplk-gold/90">
                        Tipologia
                      </dt>
                      <dd className="mt-2 text-white">{e.tipologia}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="font-rplk-sans text-[14px] font-normal uppercase tracking-rplk-nav text-rplk-gold/90">
                        Localização
                      </dt>
                      <dd className="mt-2 text-white">{e.local}</dd>
                    </div>
                  </dl>
                  <div className="lg:col-span-2 pt-4">
                    {e.slug ? (
                      <Link
                        to={e.slug}
                        className="inline-flex rplk-btn-outline border-rplk-gold text-rplk-gold hover:bg-rplk-gold hover:text-rplk-midnight text-[11px] tracking-[0.28em] uppercase px-8 py-3.5"
                      >
                        Ver empreendimento
                      </Link>
                    ) : (
                      <a
                        href="#contato"
                        className="inline-flex rplk-btn-outline border-white/30 text-white hover:bg-white hover:text-rplk-midnight text-[11px] tracking-[0.28em] uppercase px-8 py-3.5"
                      >
                        Falar com o time
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    )
  }

  // Home mode: Plaenge-style card grid (3 cols, or 2 if only 2 projects)
  const gridCols = empreendimentos.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'

  return (
    <section
      id="empreendimentos"
      className="bg-rplk-editorial text-rplk-ink scroll-mt-[88px] py-[90px] md:py-[110px]"
      aria-labelledby="rplk-emp-heading"
    >
      <div className="rplk-editorial-container">
        <p className="font-rplk-sans text-[clamp(1rem,2vw,1.125rem)] font-normal uppercase tracking-rplk-nav text-rplk-gold">
          Portfólio
        </p>
        <h2
          id="rplk-emp-heading"
          className="mt-5 font-rplk-serif font-normal italic text-[clamp(2.5rem,6vw,4.375rem)] leading-[1.03] text-rplk-ink tracking-normal"
        >
          Empreendimentos
        </h2>

        <div className={`mt-[60px] grid gap-8 ${gridCols}`}>
          {empreendimentos.map((e) => (
            <article
              key={e.title}
              id={e.anchorId}
              className="scroll-mt-[88px] group flex flex-col"
            >
              {/* Image container */}
              <div className="relative h-[520px] overflow-hidden bg-rplk-midnight cursor-pointer">
                {e.slug ? (
                  <Link
                    to={e.slug}
                    className="absolute right-0 bottom-0 h-full w-full z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-rplk-gold/50 focus-visible:ring-offset-2"
                    aria-label={`Ver página do empreendimento ${e.title}`}
                    tabIndex={0}
                  />
                ) : null}

                {/* Photo */}
                <img
                  src={e.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:opacity-40"
                />

                {/* Hover overlay: title/wordmark */}
                <div
                  className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center opacity-0 group-hover:opacity-100"
                  aria-hidden
                >
                  {isAmbarEmp(e.slug) ? (
                    <img
                      src={ASSETS.ambarWordmark}
                      alt=""
                      className="block w-[min(72%,332px)] max-w-full h-auto shrink-0 object-contain drop-shadow-[0_4px_32px_rgba(0,0,0,0.55)]"
                    />
                  ) : (
                    <p className="px-6 text-center font-rplk-serif font-normal italic text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-normal text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]">
                      {e.title}
                    </p>
                  )}
                </div>

                {/* Badge top-left */}
                <div className="pointer-events-none absolute left-6 top-6 z-[6] flex flex-wrap gap-x-4 gap-y-2">
                  <span className="font-rplk-serif text-[clamp(1rem,1.6vw,1.375rem)] italic font-normal tracking-[3px] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    {e.status}
                  </span>
                  <span className="font-rplk-serif text-[clamp(1rem,1.6vw,1.375rem)] italic font-normal tracking-[3px] text-rplk-gold drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    {e.badge}
                  </span>
                </div>
              </div>

              {/* Text area below image */}
              <div className="flex flex-col flex-1 bg-rplk-editorial pt-[30px] pb-8 px-0 space-y-4">
                {/* Status badge */}
                <p className="font-rplk-serif font-normal italic text-[clamp(0.875rem,1.2vw,1rem)] tracking-[2px] text-rplk-gold">
                  {e.status} · {e.badge}
                </p>

                {/* Title */}
                <h3 className="font-rplk-sans font-normal uppercase tracking-rplk-nav text-[clamp(1rem,1.6vw,1.375rem)] leading-[1.2] text-rplk-ink">
                  {e.title}
                </h3>

                {/* Headline italic serif */}
                <p className="font-rplk-serif font-normal italic leading-[1.15] text-rplk-ink/88"
                  style={{ fontSize: 'clamp(1.25rem,2.2vw,2.1875rem)' }}>
                  {e.headline}
                </p>

                {/* Location */}
                <p className="font-rplk-sans text-[14px] font-normal uppercase tracking-rplk-nav text-rplk-ink/55">
                  {e.local}
                </p>

                {/* CTA */}
                <div className="pt-4">
                  {e.slug ? (
                    <Link
                      to={e.slug}
                      className="inline-flex items-center gap-2 font-rplk-sans text-[11px] font-normal uppercase tracking-[0.28em] text-rplk-gold border-b border-rplk-gold/45 pb-0.5 transition-colors hover:text-rplk-ink hover:border-rplk-ink"
                    >
                      Ver empreendimento →
                    </Link>
                  ) : (
                    <a
                      href="#contato"
                      className="inline-flex items-center gap-2 font-rplk-sans text-[11px] font-normal uppercase tracking-[0.28em] text-rplk-ink/55 border-b border-rplk-ink/25 pb-0.5 transition-colors hover:text-rplk-ink hover:border-rplk-ink"
                    >
                      Falar com o time →
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
