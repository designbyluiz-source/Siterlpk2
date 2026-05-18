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
        {/*
          Centragem (translate -50%) num wrapper exterior; animação só no interior.
          Se translate e keyframes ficam no mesmo elemento, o transform da animação
          sobrescreve o translate e o pan/zoom deixa de funcionar como esperado.
        */}
        <div
          className={[
            'absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2',
            'h-[118%] w-[118%]',
            'lg:h-[132%] lg:w-[132%]',
          ].join(' ')}
        >
          {/* overflow clip; animação na <img> com origin-center — motion-safe impedia animação com “reduzir movimento” mal configurado no SO */}
          <div className="h-full w-full overflow-hidden">
            <img
              src={ASSETS.separadorTextureWide}
              alt=""
              className={[
                'block h-full w-full object-cover object-center',
                'origin-center will-change-transform',
                'max-lg:animate-ambar-separador-bg lg:animate-ambar-separador-bg-lg',
                'motion-reduce:animate-none',
              ].join(' ')}
            />
          </div>
        </div>
      </div>
      {/* Véu com leve deriva (contrária à textura) para dar sensação de profundidade */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[14%] bg-black/20 animate-ambar-separador-veil motion-reduce:animate-none will-change-transform" />
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
