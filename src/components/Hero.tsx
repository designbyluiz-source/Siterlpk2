import { ASSETS } from '../assets/figma'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-screen flex flex-col items-center justify-between py-10 md:py-[80px] px-6 md:px-[80px] overflow-hidden"
      data-node-id="335:498"
    >
      {/* Background photo + dark overlay (35% per Figma) */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <img
          src={ASSETS.heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* RPLK logo top */}
      <div className="flex items-center justify-center w-full">
        <img
          src={ASSETS.rplkLogo}
          alt="RPLK Empreiteira"
          className="h-[75px] w-auto select-none"
        />
      </div>

      {/* Center: Âmbar wordmark + tagline + button */}
      <div className="flex flex-1 flex-col items-center justify-center gap-[60px] md:gap-[90px] py-12 text-center">
        <div className="flex flex-col items-center gap-6">
          <img
            src={ASSETS.ambarWordmark}
            alt="Âmbar"
            className="w-[280px] sm:w-[380px] md:w-[496px] h-auto select-none"
          />
          <p className="font-ui text-[18px] leading-[65px] text-white whitespace-pre">
            {`Reencontre o passado.  Conheça seu futuro.`}
          </p>
        </div>

        <a href="#contato" className="btn-outline-white">
          ENTRE EM CONTATO
        </a>
      </div>

      {/* Saber mais bottom */}
      <a
        href="#sobre"
        className="flex flex-col items-center gap-3 opacity-80 hover:opacity-100 transition-opacity"
      >
        <span className="font-ui text-[20px] leading-[65px] text-white">SABER MAIS</span>
        <img src={ASSETS.expandArrow} alt="" className="h-[42px] w-[42px]" aria-hidden />
      </a>
    </section>
  )
}
