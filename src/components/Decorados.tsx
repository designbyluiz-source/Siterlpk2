import { useState } from 'react'
import { ASSETS } from '../assets/figma'
import { PLANTAS_SELECIONAR_PAVIMENTO, type PlantasSelecionarPavimentoDetail } from '../data/plantas-pavimentos'
import ImageLightbox from './ImageLightbox'

type Decorado = {
  label: string
  img: string
  /** Miniatura da planta da unidade decorada. */
  plantaThumb: string
  /** Pavimento correspondente nas abas de Plantas (Térreo/2º/3-4/5º/6-8/Terraço). */
  pavimentoId: string
  /** `numero` da unidade tal como está em `PavimentoPlantaData.unidades` (ex.: '309-409', '501'). */
  unidadeNumero: string
}

/**
 * Cada decorado tem rótulo, foto em `/decorados/`, miniatura da planta e o pavimento+unidade
 * alvo na secção Plantas. Clicar numa aba (ou no thumbnail) sincroniza o background e
 * navega para a planta correspondente já com a unidade pré-selecionada.
 */
const DECORADOS: readonly Decorado[] = [
  {
    label: 'UD 309/409',
    img: '/decorados/ap-309.jpg',
    plantaThumb: '/plantas/terceiro-quarto/309-planta.png',
    pavimentoId: '3-4',
    unidadeNumero: '309-409',
  },
  {
    label: 'UD 501',
    img: '/decorados/ap-501.jpg',
    plantaThumb: '/plantas/quinto/501-planta.png',
    pavimentoId: '5',
    unidadeNumero: '501',
  },
  {
    label: 'UD 503',
    img: '/decorados/ap-503.jpg',
    plantaThumb: '/plantas/quinto/503-planta.png',
    pavimentoId: '5',
    unidadeNumero: '503',
  },
] as const

const DECORADOS_IMGS = DECORADOS.map((d) => d.img)

function irParaPlantaDoDecorado(d: Decorado) {
  window.dispatchEvent(
    new CustomEvent(PLANTAS_SELECIONAR_PAVIMENTO, {
      detail: {
        pavimentoId: d.pavimentoId,
        unidadeNumero: d.unidadeNumero,
      } satisfies PlantasSelecionarPavimentoDetail,
    }),
  )
  document.getElementById('plantas')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Decorados() {
  const [ativaIdx, setAtivaIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const ativa = DECORADOS[ativaIdx]

  return (
    <section
      id="decorados"
      className="relative isolate min-h-[500px] md:min-h-[745px] flex flex-col justify-end pt-[33px] pb-20 px-6 md:px-[80px] overflow-hidden"
      data-node-id="334:293"
    >
      {/* Background: cor base + foto do decorado selecionado + gradiente inferior */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-ambar-terracotta" />
        {DECORADOS.map((d, i) => (
          <img
            key={d.img}
            src={d.img}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
            style={{ opacity: i === ativaIdx ? 1 : 0 }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[47%] to-black" />
      </div>

      <div className="flex flex-wrap items-end justify-center gap-4 md:gap-6 w-full">
        {/* Miniatura: clicar leva à planta da unidade ativa. */}
        <button
          type="button"
          onClick={() => irParaPlantaDoDecorado(ativa)}
          className="hidden md:block relative shrink-0 h-[148px] w-[118px] overflow-hidden rounded-sm bg-white/95 ring-1 ring-white/40 shadow-lg hover:ring-white/80 focus-visible:ring-2 focus-visible:ring-white outline-none transition"
          aria-label={`Abrir planta de ${ativa.label} na secção Plantas`}
          title={`Ver planta de ${ativa.label}`}
        >
          {DECORADOS.map((d, i) => (
            <img
              key={d.plantaThumb}
              src={d.plantaThumb}
              alt={i === ativaIdx ? `Miniatura da planta — ${d.label}` : ''}
              className="absolute inset-0 h-full w-full object-contain p-1.5 transition-opacity duration-300 ease-out"
              style={{ opacity: i === ativaIdx ? 1 : 0 }}
              loading={i === 0 ? 'eager' : 'lazy'}
              aria-hidden={i !== ativaIdx}
            />
          ))}
        </button>

        <div className="flex flex-col md:flex-row flex-1 items-center justify-center gap-4 md:gap-11 px-4 md:px-[80px]">
          <h2 className="heading-section text-white whitespace-nowrap">DECORADOS</h2>

          <div
            className="flex flex-wrap gap-1 md:gap-[22px] justify-center"
            role="tablist"
            aria-label="Alternar entre os decorados"
          >
            {DECORADOS.map((d, i) => (
              <button
                key={d.label}
                type="button"
                role="tab"
                aria-selected={i === ativaIdx}
                onClick={() => setAtivaIdx(i)}
                title={`Mostrar decorado ${d.label}`}
                className={[
                  'px-5 py-[10px] font-ui text-[16px] text-white transition-colors',
                  i === ativaIdx
                    ? 'border-b-2 border-white font-semibold'
                    : 'font-medium opacity-90 hover:opacity-100',
                ].join(' ')}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="shrink-0 h-[50px] w-[50px] grid place-items-center hover:opacity-80 transition-opacity"
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

      <ImageLightbox
        open={lightboxOpen}
        images={DECORADOS_IMGS}
        startIndex={ativaIdx}
        alt={`Decorado ${ativa.label}`}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setAtivaIdx}
        renderOverlay={(i) => {
          const d = DECORADOS[i]
          return (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxOpen(false)
                irParaPlantaDoDecorado(d)
              }}
              className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-[2] flex flex-col items-stretch rounded-sm bg-white/95 ring-1 ring-white/40 shadow-xl hover:ring-white/80 focus-visible:ring-2 focus-visible:ring-white outline-none transition"
              aria-label={`Abrir planta de ${d.label} na secção Plantas`}
              title={`Ver planta de ${d.label}`}
            >
              <span className="relative block h-[170px] w-[150px] md:h-[200px] md:w-[180px]">
                <img
                  key={d.plantaThumb}
                  src={d.plantaThumb}
                  alt={`Miniatura da planta — ${d.label}`}
                  className="absolute inset-0 h-full w-full object-contain p-2"
                />
              </span>
              <span className="border-t border-ambar-gray/15 px-2 py-1.5 text-center font-ui text-[11px] uppercase tracking-wider text-ambar-navy">
                Planta · {d.label}
              </span>
            </button>
          )
        }}
      />
    </section>
  )
}
