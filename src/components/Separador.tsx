import { ASSETS } from '../assets/figma'
import AmbarRevealItem from './AmbarRevealItem'

export default function Separador() {
  return (
    <section
      className="relative overflow-hidden py-[40px] px-6 md:px-[80px]"
      data-node-id="334:208"
      aria-label="Pilares conceituais"
    >
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <img
          src={ASSETS.separadorTexture}
          alt=""
          className="h-full w-full object-cover object-center motion-safe:animate-ambar-separador-bg will-change-transform"
        />
      </div>
      {/* Véu com leve deriva (contrária à textura) para dar sensação de profundidade */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[14%] bg-black/20 motion-safe:animate-ambar-separador-veil will-change-transform" />
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[60px]">
        <ul className="font-sans font-semibold text-[20px] md:text-[30px] uppercase tracking-[0.05em] text-white leading-[1.5] text-center md:text-left space-y-1 md:space-y-0">
          {(['IDENTIDADE', 'CONTEMPORANEIDADE', 'INTELIGÊNCIA ESPACIAL'] as const).map((label, i) => (
            <li key={label}>
              <AmbarRevealItem preset="glide-right" staggerIndex={i} staggerMs={95} once={false}>
                {label}
              </AmbarRevealItem>
            </li>
          ))}
        </ul>
        <AmbarRevealItem preset="zoom-pop" delayMs={200} once={false}>
          <img
            src={ASSETS.ambarWordmarkSeparator}
            alt="Âmbar"
            className="h-16 md:h-[106px] w-auto"
          />
        </AmbarRevealItem>
      </div>
    </section>
  )
}
