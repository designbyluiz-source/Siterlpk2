import { ASSETS } from '../assets/figma'

export default function Separador() {
  return (
    <section
      className="relative overflow-hidden py-[40px] px-6 md:px-[80px]"
      data-node-id="334:208"
      aria-label="Pilares conceituais"
    >
      <img
        src={ASSETS.separadorTexture}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Overlay sutil só para garantir legibilidade do texto branco sobre as zonas mais claras da pedra */}
      <div aria-hidden className="absolute inset-0 bg-black/20" />

      <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[60px]">
        <ul className="font-sans font-semibold text-[20px] md:text-[30px] uppercase tracking-[0.05em] text-white leading-[1.5] text-center md:text-left">
          <li>IDENTIDADE</li>
          <li>CONTEMPORANEIDADE</li>
          <li>INTELIGÊNCIA ESPACIAL</li>
        </ul>
        <img
          src={ASSETS.ambarWordmarkSeparator}
          alt="Âmbar"
          className="h-16 md:h-[106px] w-auto"
        />
      </div>
    </section>
  )
}
