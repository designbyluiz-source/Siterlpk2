import { ASSETS } from '../../assets/figma'

export default function RplkManifesto() {
  return (
    <section
      id="sobre"
      className="relative bg-rplk-editorial text-rplk-ink py-24 md:py-32 lg:py-40 scroll-mt-[120px]"
    >
      <div className="mx-auto grid max-w-[1600px] gap-14 lg:gap-20 lg:grid-cols-2 px-5 md:px-10 lg:px-14 items-start">
        <div className="relative">
          <p className="font-rplk-serif text-[clamp(1.75rem,3.2vw,2.75rem)] leading-snug text-rplk-ink">
            “Construir nunca foi apenas erguer estruturas. Para a RPLK, significa identificar oportunidades,
            antecipar movimentos urbanos e transformar visão estratégica em patrimônio real.”
          </p>

          <div className="mt-12 space-y-8 text-rplk-ink/75 font-rplk-sans text-[15px] md:text-base leading-relaxed max-w-xl">
            <h2 className="font-rplk-serif text-3xl md:text-4xl text-rplk-ink tracking-tight">
              Incorporação com leitura de território.
            </h2>
            <p>
              A RPLK nasceu da união entre tradição familiar, engenharia de precisão e visão de mercado. Cada
              terreno, cada bairro e cada projeto são analisados com profundidade para entregar ativos
              imobiliários capazes de unir sofisticação, segurança e valorização consistente.
            </p>
            <p className="text-xs uppercase tracking-[0.35em] text-rplk-gold">#rplkinvest</p>
          </div>
        </div>

        <div className="relative min-h-[320px] lg:min-h-[560px] bg-rplk-midnight">
          <span
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 origin-center -rotate-90 text-[10px] tracking-[0.5em] uppercase text-rplk-gold/55 font-rplk-sans whitespace-nowrap"
            aria-hidden
          >
            Manifesto
          </span>

          <div
            className="absolute inset-0 overflow-hidden"
            role="img"
            aria-label="Vídeo institucional RPLK em loop — substitua por arquivo em public/rplk-institutional.mp4 quando disponível"
          >
            <img
              src={ASSETS.sobreBuilding}
              alt=""
              className="h-full w-full object-cover opacity-95 motion-safe:animate-rplk-kenburn"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-black/35 pointer-events-none" />
          </div>
          <p className="absolute bottom-6 right-6 z-10 text-[10px] uppercase tracking-[0.35em] text-rplk-gold/50 font-rplk-sans">
            Vídeo institucional · loop
          </p>
        </div>
      </div>
    </section>
  )
}
