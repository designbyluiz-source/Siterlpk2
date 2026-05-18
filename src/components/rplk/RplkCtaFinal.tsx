import { ASSETS } from '../../assets/figma'

export default function RplkCtaFinal() {
  return (
    <section
      className="relative isolate min-h-[80vh] flex items-center justify-center overflow-hidden"
      aria-labelledby="rplk-cta-final-heading"
    >
      <img src={ASSETS.decoradosBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-rplk-midnight/70" />
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-[90px] md:py-[110px]">
        <h2
          id="rplk-cta-final-heading"
          className="font-rplk-serif font-normal italic text-rplk-white leading-[1.05] tracking-normal"
          style={{ fontSize: 'clamp(3rem,8vw,5rem)' }}
        >
          Toda Realização Começa Com Um Sonho.
        </h2>
        <div className="mt-14">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 font-rplk-sans text-[clamp(0.6875rem,1.4vw,0.9375rem)] font-normal uppercase tracking-[0.3em] text-rplk-gold border-b border-rplk-gold/60 pb-1 transition-colors hover:text-rplk-white hover:border-rplk-white"
          >
            Quero conhecer →
          </a>
        </div>
      </div>
    </section>
  )
}
