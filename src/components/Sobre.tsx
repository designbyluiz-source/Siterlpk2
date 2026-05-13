import { useState } from 'react'
import { ASSETS } from '../assets/figma'
import ImageLightbox from './ImageLightbox'

const GALLERY = [
  ASSETS.sobreBuilding,
  ASSETS.sobreThumb2,
  ASSETS.sobreThumb3,
  ASSETS.sobreThumb4,
  ASSETS.sobreThumb1,
]

const NAV_LINKS: Array<{ id: string; label: string }> = [
  { id: 'sobre', label: 'O PROJETO' },
  { id: 'areas-comuns', label: 'GALERIA' },
  { id: 'localizacao', label: 'LOCALIZAÇÃO' },
  { id: 'plantas', label: 'PLANTAS' },
  { id: 'decorados', label: 'DECORADOS' },
]

export default function Sobre() {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const visibleThumbs = [
    GALLERY[(active - 1 + GALLERY.length) % GALLERY.length],
    GALLERY[(active + 1) % GALLERY.length],
    GALLERY[(active + 2) % GALLERY.length],
  ]
  const next = () => setActive((i) => (i + 1) % GALLERY.length)
  const prev = () => setActive((i) => (i - 1 + GALLERY.length) % GALLERY.length)

  return (
    <section
      id="sobre"
      className="bg-ambar-cream text-ambar-navy"
      data-node-id="334:144"
    >
      <div className="container-ambar grid lg:grid-cols-[895fr_551fr] gap-6 lg:gap-0 py-10 md:py-[40px]">
        {/* LEFT: nav + título + texto */}
        <div className="flex flex-col gap-6 pr-0 lg:pr-12">
          <nav className="flex flex-wrap gap-3 -ml-5">
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={[
                  'nav-link text-ambar-navy hover:opacity-70',
                  idx === 0 ? 'font-semibold' : 'font-medium',
                ].join(' ')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-6 md:gap-11 pl-0 md:pl-[80px] py-8 md:py-[54px]">
            <h2 className="heading-display text-shadow-terracotta text-ambar-navy max-w-[460px]">
              Sobre o Âmbar
            </h2>
            <p className="font-ui font-extralight text-[18px] md:text-[24px] leading-[1.5] text-justify text-ambar-navy max-w-[460px]">
              O Âmbar traduz o encontro entre o modernismo brasileiro e a vida
              contemporânea em um projeto com linhas precisas, luz natural
              abundante e interiores acolhedores, criando uma experiência urbana
              sofisticada onde arquitetura, funcionalidade e identidade caminham
              juntas em todos os ambientes.
            </p>
          </div>
        </div>

        {/* RIGHT: imagem principal + galeria */}
        <div className="flex flex-col gap-[10px] py-[15px] px-[10px] overflow-hidden lg:h-full lg:min-h-0 lg:justify-center">
          {/* Main image */}
          <div className="relative w-full aspect-[531/429] overflow-hidden bg-black/10">
            <img
              src={GALLERY[active]}
              alt="Vista do empreendimento Âmbar"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            />
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-4 left-[17px] h-[50px] w-[50px] grid place-items-center hover:bg-black/20 transition-colors rounded-sm shrink-0"
              aria-label="Expandir imagem"
            >
              <img
                src={ASSETS.expand50}
                alt=""
                className="h-[34px] w-[34px] object-contain pointer-events-none opacity-95"
                aria-hidden
              />
            </button>
          </div>

          {/* Thumbnails row: dim + chevron-over-dim + main + chevron-over-dim + dim */}
          <div className="flex items-center justify-center gap-7 overflow-hidden w-full">
            {/* Dim thumb 1 */}
            <div className="hidden md:block relative h-[148px] w-[207px] opacity-60 shrink-0">
              <img src={visibleThumbs[0]} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>

            {/* Left chevron over dimmed thumb */}
            <button
              type="button"
              onClick={prev}
              aria-label="Imagem anterior"
              className="relative h-[148px] w-[120px] md:w-[207px] shrink-0 flex items-center justify-end pr-12 hover:opacity-90 transition-opacity"
            >
              <img
                src={visibleThumbs[0]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-40"
                aria-hidden
              />
              <img
                src={ASSETS.circledRight43}
                alt=""
                className="relative h-[43px] w-[43px] rotate-180 invert opacity-90"
                aria-hidden
              />
            </button>

            {/* Main center thumb */}
            <div className="relative h-[148px] w-[180px] md:w-[207px] shrink-0">
              <img
                src={GALLERY[active]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* Right chevron over dimmed thumb */}
            <button
              type="button"
              onClick={next}
              aria-label="Próxima imagem"
              className="relative h-[148px] w-[120px] md:w-[207px] shrink-0 flex items-center justify-start pl-12 hover:opacity-90 transition-opacity"
            >
              <img
                src={visibleThumbs[1]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-40"
                aria-hidden
              />
              <img
                src={ASSETS.circledRight43Alt}
                alt=""
                className="relative h-[43px] w-[43px] invert opacity-90"
                aria-hidden
              />
            </button>

            {/* Dim thumb 2 */}
            <div className="hidden md:block relative h-[148px] w-[207px] opacity-60 shrink-0">
              <img src={visibleThumbs[2]} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <ImageLightbox
        open={lightboxOpen}
        images={GALLERY}
        startIndex={active}
        alt="Vista do empreendimento Âmbar"
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setActive}
      />
    </section>
  )
}
