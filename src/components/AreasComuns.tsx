import { useState } from 'react'
import { ASSETS } from '../assets/figma'
import { PLANTAS_SELECIONAR_PAVIMENTO, type PlantasSelecionarPavimentoDetail } from '../data/plantas-pavimentos'
import ImageLightbox from './ImageLightbox'
import AmbarRevealItem from './AmbarRevealItem'

type AreaComumSlide = {
  src: string
  alt: string
  /** Pavimento da planta onde este espaço se insere (Térreo vs Terraço). */
  pavimentoId: 'terreo' | 'terraco'
  floorLabel: string
  /** Terraço: pré-seleciona a zona no mapa interativo (Plantas). */
  unidadeNumero?: string
}

/**
 * Ordem da galeria: **térreo** (coliving, hall), depois **terraço** (coworking, gourmet, piscinas).
 * «Ver Planta» abre o pavimento certo em #plantas.
 */
const IMAGES: readonly AreaComumSlide[] = [
  { src: '/areas-comuns/coliving.jpg', alt: 'Coliving', pavimentoId: 'terreo', floorLabel: 'Térreo' },
  { src: '/areas-comuns/hall.jpg', alt: 'Hall de entrada', pavimentoId: 'terreo', floorLabel: 'Térreo' },
  {
    src: '/areas-comuns/coworking.jpg',
    alt: 'Coworking',
    pavimentoId: 'terraco',
    floorLabel: 'Terraço',
    unidadeNumero: 'Coworking',
  },
  {
    src: '/areas-comuns/gourmet.jpg',
    alt: 'Espaço gourmet',
    pavimentoId: 'terraco',
    floorLabel: 'Terraço',
    unidadeNumero: 'Gourmet',
  },
  { src: '/areas-comuns/piscina-01.jpg', alt: 'Piscina', pavimentoId: 'terraco', floorLabel: 'Terraço' },
  { src: '/areas-comuns/piscina-02.jpg', alt: 'Piscina — vista 2', pavimentoId: 'terraco', floorLabel: 'Terraço' },
] as const

const IMG_SRCS = IMAGES.map((i) => i.src)

function irParaPlantaDoPavimento(slide: Pick<AreaComumSlide, 'pavimentoId' | 'unidadeNumero'>) {
  window.dispatchEvent(
    new CustomEvent(PLANTAS_SELECIONAR_PAVIMENTO, {
      detail: {
        pavimentoId: slide.pavimentoId,
        ...(slide.unidadeNumero != null ? { unidadeNumero: slide.unidadeNumero } : {}),
      } satisfies PlantasSelecionarPavimentoDetail,
    }),
  )
  document.getElementById('plantas')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function AreasComuns() {
  const [idx, setIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const prev = () => setIdx((i) => (i - 1 + IMAGES.length) % IMAGES.length)
  const next = () => setIdx((i) => (i + 1) % IMAGES.length)

  const sideLeft = IMAGES[(idx - 1 + IMAGES.length) % IMAGES.length]
  const sideRight = IMAGES[(idx + 1) % IMAGES.length]
  const main = IMAGES[idx]

  return (
    <section
      id="areas-comuns"
      className="bg-ambar-terracotta py-[33px] pb-20"
      data-node-id="334:162"
    >
      <AmbarRevealItem preset="skew-up" once={false} className="container-ambar mb-10">
        <h2 className="heading-section text-white">AREAS COMUNS</h2>
      </AmbarRevealItem>

      {/* Galeria: 3 imagens lado a lado, lateral parcialmente visível */}
      <div className="relative w-full overflow-hidden">
        <div className="flex items-stretch justify-center gap-11 px-4">
          {/* Side left (peek) */}
          <AmbarRevealItem preset="glide-right" delayMs={80} once={false} className="hidden lg:contents">
            <button
              type="button"
              onClick={prev}
              aria-label={`Imagem anterior — ${sideLeft.alt}`}
              className="hidden lg:grid relative w-[803px] h-[452px] shrink-0 place-items-center justify-end pr-[120px] -ml-[525px] hover:opacity-90 transition-opacity"
            >
              <img
                src={sideLeft.src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-40"
                aria-hidden
                loading="lazy"
              />
              <img
                src={ASSETS.circledRight60}
                alt=""
                className="relative h-[60px] w-[60px] rotate-180 invert opacity-90"
                aria-hidden
              />
            </button>
          </AmbarRevealItem>

          {/* Main image */}
          <AmbarRevealItem preset="zoom-pop" delayMs={40} once={false} className="relative w-full max-w-[803px] h-[320px] md:h-[452px] shrink-0 overflow-hidden">
            <img
              src={main.src}
              alt={main.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[47%] to-black/85" />

            <div className="absolute inset-x-0 bottom-0 px-[29px] pb-[19px] flex items-end justify-between">
              <div className="flex gap-3 items-center">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="h-[38px] w-[38px] grid place-items-center shrink-0 hover:opacity-80 transition-opacity"
                  aria-label="Expandir imagem"
                >
                  <img
                    src={ASSETS.expand38}
                    alt=""
                    className="h-[26px] w-[26px] object-contain pointer-events-none opacity-95"
                    aria-hidden
                  />
                </button>
                <a
                  href="#plantas"
                  onClick={(e) => {
                    e.preventDefault()
                    irParaPlantaDoPavimento(main)
                  }}
                  className="btn-outline-white"
                >
                  Ver Planta
                </a>
              </div>

              <div className="hidden md:flex flex-col items-end gap-0.5 px-3 py-1.5 rounded-sm bg-black/35 backdrop-blur-sm font-ui text-white text-right">
                <span className="text-[14px] tracking-wide uppercase leading-tight">{main.alt}</span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-white/85">
                  {main.floorLabel}
                </span>
              </div>
            </div>
          </AmbarRevealItem>

          {/* Side right (peek) */}
          <AmbarRevealItem preset="glide-left" delayMs={80} once={false} className="hidden lg:contents">
            <button
              type="button"
              onClick={next}
              aria-label={`Próxima imagem — ${sideRight.alt}`}
              className="hidden lg:grid relative w-[803px] h-[452px] shrink-0 place-items-center justify-start pl-[120px] -mr-[525px] hover:opacity-90 transition-opacity"
            >
              <img
                src={sideRight.src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-40"
                aria-hidden
                loading="lazy"
              />
              <img
                src={ASSETS.circledRight60Alt}
                alt=""
                className="relative h-[60px] w-[60px] invert opacity-90"
                aria-hidden
              />
            </button>
          </AmbarRevealItem>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex flex-col items-center gap-3 mt-6">
          <div className="text-center font-ui text-white">
            <p className="text-[14px] uppercase tracking-wide">{main.alt}</p>
            <p className="text-[12px] mt-0.5 uppercase tracking-wider text-white/85">{main.floorLabel}</p>
          </div>
          <div className="flex justify-center gap-6">
            <button type="button" onClick={prev} aria-label="Anterior" className="h-10 w-10">
              <img src={ASSETS.circledRight60} alt="" className="h-full w-full rotate-180 invert" aria-hidden />
            </button>
            <button type="button" onClick={next} aria-label="Próxima" className="h-10 w-10">
              <img src={ASSETS.circledRight60Alt} alt="" className="h-full w-full invert" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <ImageLightbox
        open={lightboxOpen}
        images={IMG_SRCS}
        startIndex={idx}
        alt={`Área comum: ${main.alt} (${main.floorLabel})`}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setIdx}
        renderOverlay={(currentIndex) => {
          const slide = IMAGES[currentIndex]
          return (
            <>
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[min(50%,320px)] bg-gradient-to-t from-black/85 from-[18%] via-black/30 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 z-[4] px-[29px] pb-[19px] flex items-end justify-between pointer-events-none">
                <div className="pointer-events-auto flex gap-3 items-center">
                  <a
                    href="#plantas"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setLightboxOpen(false)
                      irParaPlantaDoPavimento(slide)
                    }}
                    className="btn-outline-white"
                  >
                    Ver Planta
                  </a>
                </div>
                <div className="hidden md:flex flex-col items-end gap-0.5 px-3 py-1.5 rounded-sm bg-black/35 backdrop-blur-sm font-ui text-white text-right pointer-events-auto">
                  <span className="text-[14px] tracking-wide uppercase leading-tight">{slide.alt}</span>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-white/85">
                    {slide.floorLabel}
                  </span>
                </div>
              </div>
            </>
          )
        }}
      />
    </section>
  )
}
