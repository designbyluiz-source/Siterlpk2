import { Link } from 'react-router-dom'
import { empreendimentos } from '../../data/rplk-content'
import { ASSETS } from '../../assets/figma'

const isAmbarEmp = (slug?: string) => slug === '/empreendimentos/ambar'

export default function RplkEmpreendimentos() {
  return (
    <section
      id="empreendimentos"
      className="bg-rplk-editorial text-rplk-ink scroll-mt-[120px]"
      aria-labelledby="rplk-emp-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14 pt-24 md:pt-32 pb-8">
        <p className="text-[11px] uppercase tracking-[0.45em] text-rplk-gold font-rplk-sans">Portfólio</p>
        <h2
          id="rplk-emp-heading"
          className="mt-4 font-rplk-serif text-[clamp(2.25rem,4vw,3.5rem)] tracking-tight text-rplk-ink"
        >
          Empreendimentos
        </h2>
      </div>

      <div className="flex flex-col gap-0">
        {empreendimentos.map((e) => {
          const frameLinkClass =
            'relative block h-[min(72vh,820px)] w-full overflow-hidden group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rplk-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-rplk-editorial'
          const frameDivClass = 'relative h-[min(72vh,820px)] w-full overflow-hidden group'

          const media = (
            <>
              <img
                src={e.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
              <div
                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
                aria-hidden
              >
                {isAmbarEmp(e.slug) ? (
                  <img
                    src={ASSETS.ambarWordmark}
                    alt=""
                    className="w-[min(88vw,420px)] max-h-[min(40vh,200px)] object-contain drop-shadow-[0_4px_32px_rgba(0,0,0,0.45)]"
                  />
                ) : (
                  <p className="max-w-[min(92vw,1100px)] px-6 text-center font-rplk-serif text-[clamp(2.25rem,7vw,5.25rem)] leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]">
                    {e.title}
                  </p>
                )}
              </div>
              <div className="pointer-events-none absolute left-5 top-6 z-20 flex flex-wrap gap-2 md:left-10">
                <span className="border border-white/40 bg-black/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-rplk-white backdrop-blur-sm">
                  {e.status}
                </span>
                <span className="border border-rplk-gold/50 bg-black/35 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-rplk-gold backdrop-blur-sm">
                  {e.badge}
                </span>
              </div>
            </>
          )

          return (
            <article
              key={e.title}
              id={e.anchorId}
              className="scroll-mt-[100px] border-t border-rplk-ink/10 first:border-t-0 bg-rplk-editorial md:scroll-mt-[120px]"
            >
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

              <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14 py-14 md:py-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 items-start lg:items-center">
                <div>
                  <h3 className="font-rplk-serif text-[clamp(1.75rem,3vw,2.75rem)] text-rplk-ink leading-tight">
                    {e.title}
                  </h3>
                  <p className="mt-5 font-rplk-sans text-lg md:text-xl text-rplk-ink/80 max-w-2xl leading-relaxed">
                    {e.headline}
                  </p>
                  <p className="mt-6 text-sm text-rplk-ink/60 font-rplk-sans max-w-xl">{e.destaque}</p>
                </div>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm font-rplk-sans text-rplk-ink/70 border-t border-rplk-ink/10 lg:border-t-0 lg:border-l lg:border-rplk-ink/10 lg:pl-12 lg:pt-0 pt-8">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-rplk-gold/90">Metragem</dt>
                    <dd className="mt-1 text-rplk-ink">{e.metragem}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-rplk-gold/90">Tipologia</dt>
                    <dd className="mt-1 text-rplk-ink">{e.tipologia}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-rplk-gold/90">Localização</dt>
                    <dd className="mt-1 text-rplk-ink">{e.local}</dd>
                  </div>
                </dl>
                <div className="lg:col-span-2">
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
                      className="inline-flex rplk-btn-outline border-rplk-ink/30 text-rplk-ink hover:bg-rplk-ink hover:text-rplk-white text-[11px] tracking-[0.28em] uppercase px-8 py-3.5"
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
