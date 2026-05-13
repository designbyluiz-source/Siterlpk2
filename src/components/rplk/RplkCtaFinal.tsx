import { ASSETS } from '../../assets/figma'

export default function RplkCtaFinal() {
  return (
    <section className="relative isolate min-h-[70vh] flex items-center justify-center overflow-hidden" aria-labelledby="rplk-cta-final-heading">
      <img src={ASSETS.decoradosBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-rplk-midnight/80" />
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto py-24">
        <h2
          id="rplk-cta-final-heading"
          className="font-rplk-serif text-[clamp(2rem,5vw,3.5rem)] text-rplk-white leading-tight tracking-tight"
        >
          O próximo grande investimento pode começar hoje.
        </h2>
        <a
          href="#contato"
          className="mt-10 inline-flex rplk-btn-outline border-rplk-gold text-rplk-gold hover:bg-rplk-gold hover:text-rplk-midnight text-[11px] tracking-[0.28em] uppercase px-10 py-3.5"
        >
          Quero conhecer
        </a>
      </div>
    </section>
  )
}
