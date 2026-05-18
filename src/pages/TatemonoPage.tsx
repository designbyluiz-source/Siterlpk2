import { useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AmbarRevealSection from '../components/AmbarRevealSection'
import ImageLightbox from '../components/ImageLightbox'
import RplkFooter from '../components/rplk/RplkFooter'
import WhatsAppFab from '../components/WhatsAppFab'
import { ASSETS } from '../assets/figma'
import {
  tatemonoGaleriaSrcs,
  tatemonoHeroSrc,
  tatemonoInteriorBannerSrc,
  tatemonoLightboxImages,
  tatemonoLightboxInteriorIndex,
} from '../data/tatemono-media'
import { useInView } from '../hooks/useInView'

// ---------------------------------------------------------------------------
// TatHero
// ---------------------------------------------------------------------------
function TatHero() {
  return (
    <section className="relative h-[100svh] bg-rplk-midnight overflow-hidden">
      {/* Background image */}
      <img
        src={tatemonoHeroSrc}
        alt="AOI Tatemono — fachada"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/15"
      />

      {/* Content — bottom left */}
      <div className="absolute bottom-16 left-4 right-4 sm:left-6 sm:right-6 md:left-12 md:right-auto md:max-w-[min(36rem,calc(100%-6rem))] flex flex-col gap-3 z-10">
        <span className="font-rplk-serif italic text-rplk-gold text-base md:text-lg tracking-wide">
          Em Obra · Entrega Set. 2026
        </span>

        <div className="flex flex-col gap-1 min-w-0">
          <h1
            className="font-rplk-sans uppercase text-white leading-[0.95] break-words max-w-full"
            style={{ fontSize: 'clamp(2.75rem, 12vw, 10rem)' }}
          >
            ST01
          </h1>
          <h2
            className="font-rplk-sans uppercase text-white leading-tight break-words max-w-full"
            style={{ fontSize: 'clamp(1.5rem, 5.5vw, 4rem)' }}
          >
            AOI TATEMONO
          </h2>
        </div>

        <p className="font-rplk-sans uppercase tracking-rplk-nav text-white/80 text-sm md:text-base mt-1">
          Água Verde · Curitiba · PR
        </p>
      </div>

      {/* Scroll arrow — centered at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M30 16 L30 44 M18 32 L30 44 L42 32"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// TatSobre
// ---------------------------------------------------------------------------
function TatSobre() {
  return (
    <section className="bg-rplk-editorial text-rplk-ink py-[90px] md:py-[110px] overflow-x-clip">
      <div className="rplk-editorial-container px-6 md:px-12 min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start min-w-0">
          {/* Left: text */}
          <div className="flex flex-col gap-6 min-w-0">
            <span className="font-rplk-sans uppercase tracking-rplk-nav text-rplk-gold text-sm">
              Sobre o Empreendimento
            </span>

            <h2
              className="font-rplk-serif italic text-rplk-ink leading-[1.1]"
              style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}
            >
              AOI Tatemono
            </h2>

            <p className="font-rplk-sans text-[16px] leading-relaxed text-rplk-ink/80">
              O AOI Tatemono é um empreendimento pensado para atender a uma demanda crescente por
              moradias compactas, funcionais e bem localizadas. Situado na Rua Doutor Alexandre
              Gutierrez, 766, em pleno bairro Água Verde — um dos mais valorizados de Curitiba — o
              projeto oferece studios com metragens entre 17 e 25m², ideais para quem busca
              praticidade no dia a dia ou uma excelente oportunidade de investimento. Com estrutura
              pensada especialmente para locações por temporada, o empreendimento se destaca pelo
              alto potencial de rentabilidade, valorização e versatilidade de uso. Assinado pela
              RPLK Engenharia.
            </p>
          </div>

          {/* Right: stats 2×2 */}
          <div className="grid grid-cols-2 divide-x divide-y divide-rplk-ink/10 border border-rplk-ink/10 min-w-0">
            {[
              { value: '17–25 m²', label: 'Studios' },
              { value: 'Água Verde', label: 'Curitiba, PR' },
              { value: 'Set. 2026', label: 'Entrega prevista' },
              { value: '100% Vendido', label: 'Todos os studios' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-2 p-4 sm:p-6 md:p-8 min-w-0">
                <span
                  className="font-rplk-serif italic text-rplk-ink leading-none break-words"
                  style={{ fontSize: 'clamp(1.75rem,4vw,3rem)' }}
                >
                  {value}
                </span>
                <span className="font-rplk-sans uppercase tracking-rplk-nav text-rplk-gold text-[14px]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// TatGaleria
// ---------------------------------------------------------------------------
function TatGaleria({ onOpenLightbox }: { onOpenLightbox: (lightboxIndex: number) => void }) {
  const g = tatemonoGaleriaSrcs
  return (
    <section className="bg-rplk-midnight py-[90px] overflow-x-clip">
      <div className="rplk-editorial-container px-6 md:px-12 min-w-0">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-3">
          <span className="font-rplk-sans uppercase tracking-rplk-nav text-rplk-gold text-sm">
            Galeria
          </span>
          <h2
            className="font-rplk-serif italic text-white leading-[1.1]"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}
          >
            Renders do Empreendimento
          </h2>
          <p className="font-rplk-sans text-[14px] text-white/55 max-w-xl">
            Toque em qualquer imagem para ver em tela cheia e deslizar entre as fotos.
          </p>
        </div>

        {/* Row 1: col-span-2 + 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2 overflow-hidden rounded-sm">
            <button
              type="button"
              className="block h-full w-full overflow-hidden border-0 bg-transparent p-0 text-left cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rplk-gold"
              onClick={() => onOpenLightbox(1)}
              aria-label="Abrir render 1 em tela cheia"
            >
              <img
                src={g[0]}
                alt=""
                className="object-cover w-full h-[360px] md:h-[500px] group-hover:scale-105 transition-transform duration-700"
              />
            </button>
          </div>
          <div className="overflow-hidden rounded-sm">
            <button
              type="button"
              className="block h-full w-full overflow-hidden border-0 bg-transparent p-0 text-left cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rplk-gold"
              onClick={() => onOpenLightbox(2)}
              aria-label="Abrir render 2 em tela cheia"
            >
              <img
                src={g[1]}
                alt=""
                className="object-cover w-full h-[360px] md:h-[500px] group-hover:scale-105 transition-transform duration-700"
              />
            </button>
          </div>
        </div>

        {/* Row 2: 3 equal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {g.slice(2, 5).map((src, i) => (
            <div key={src} className="overflow-hidden rounded-sm">
              <button
                type="button"
                className="block h-full w-full overflow-hidden border-0 bg-transparent p-0 text-left cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rplk-gold"
                onClick={() => onOpenLightbox(3 + i)}
                aria-label={`Abrir render ${i + 3} em tela cheia`}
              >
                <img
                  src={src}
                  alt=""
                  className="object-cover w-full h-[300px] group-hover:scale-105 transition-transform duration-700"
                />
              </button>
            </div>
          ))}
        </div>

        {/* Row 3: 3 equal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {g.slice(5, 8).map((src, i) => (
            <div key={src} className="overflow-hidden rounded-sm">
              <button
                type="button"
                className="block h-full w-full overflow-hidden border-0 bg-transparent p-0 text-left cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rplk-gold"
                onClick={() => onOpenLightbox(6 + i)}
                aria-label={`Abrir render ${i + 6} em tela cheia`}
              >
                <img
                  src={src}
                  alt=""
                  className="object-cover w-full h-[300px] group-hover:scale-105 transition-transform duration-700"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// TatObra
// ---------------------------------------------------------------------------
const OBRA_ITEMS = [
  { label: 'Escavação / Fundação', pct: 100 },
  { label: 'Estrutura', pct: 100 },
  { label: 'Alvenaria', pct: 100 },
  { label: 'Acabamentos Externos', pct: 25 },
  { label: 'Acabamentos Internos', pct: 30 },
] as const

function TatObra() {
  const { ref, visible } = useInView<HTMLDivElement>(0.15)

  return (
    <section className="bg-rplk-editorial text-rplk-ink py-[90px] md:py-[110px] overflow-x-clip">
      <div className="rplk-editorial-container px-6 md:px-12 min-w-0">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-3">
          <span className="font-rplk-sans uppercase tracking-rplk-nav text-rplk-gold text-sm">
            Andamento
          </span>
          <h2
            className="font-rplk-serif italic text-rplk-ink leading-[1.1]"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}
          >
            Progresso da Obra
          </h2>
          <p
            className="font-rplk-serif italic text-rplk-ink/60"
            style={{ fontSize: 'clamp(1rem,2vw,1.25rem)' }}
          >
            Acompanhe a evolução da construção em tempo real.
          </p>
        </div>

        {/* Bars */}
        <div ref={ref} className="flex flex-col gap-10">
          {OBRA_ITEMS.map(({ label, pct }) => {
            const done = pct === 100
            return (
              <div key={label} className="flex flex-col gap-2 min-w-0">
                <div className="flex items-end justify-between gap-3 min-w-0">
                  <span className="font-rplk-sans uppercase tracking-wide text-[15px] sm:text-[18px] text-rplk-ink break-words min-w-0 pr-2">
                    {label}
                    {done && (
                      <span className="ml-2 text-rplk-gold font-rplk-sans text-[16px]">✓</span>
                    )}
                  </span>
                  <span
                    className="font-rplk-serif italic text-rplk-gold shrink-0"
                    style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}
                  >
                    {pct}%
                  </span>
                </div>
                {/* Track */}
                <div className="relative h-[4px] w-full bg-rplk-ink/10 overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-rplk-gold transition-[width] duration-[1500ms] ease-out"
                    style={{ width: visible ? `${pct}%` : '0%' }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-10 font-rplk-sans text-[12px] text-rplk-ink/40 uppercase tracking-widest">
          * Atualizado em Maio de 2026
        </p>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// TatValores
// ---------------------------------------------------------------------------
function TatValores() {
  return (
    <section className="bg-rplk-midnight py-[90px] md:py-[110px] overflow-x-clip">
      <div className="rplk-editorial-container px-6 md:px-12 min-w-0">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-3">
          <span className="font-rplk-sans uppercase tracking-rplk-nav text-rplk-gold text-sm">
            Comercial
          </span>
          <h2
            className="font-rplk-serif italic text-white leading-[1.1]"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}
          >
            Tabela de Valores
          </h2>
        </div>

        {/* Table — fixed layout so all columns fit viewport (no horizontal page/table scroll) */}
        <div className="w-full max-w-full min-w-0">
          <table className="w-full max-w-full table-fixed border-collapse text-left text-[12px] sm:text-[16px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Unidade', 'Metragem', 'Status', 'Tipo'].map((h) => (
                  <th
                    key={h}
                    className="font-rplk-sans uppercase tracking-rplk-nav text-rplk-gold text-[11px] sm:text-[14px] pb-3 sm:pb-4 px-1 sm:px-0 sm:pr-4 md:pr-8 font-normal align-bottom break-words"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className="font-rplk-sans text-white py-4 sm:py-6 pr-1 sm:pr-4 md:pr-8 break-words">
                  Unidade 1
                </td>
                <td className="font-rplk-sans text-white py-4 sm:py-6 pr-1 sm:pr-4 md:pr-8 break-words">
                  17–25 m²
                </td>
                <td className="py-4 sm:py-6 pr-1 sm:pr-4 md:pr-8 align-top">
                  <span className="inline-block max-w-full bg-rplk-gold/20 text-rplk-gold border border-rplk-gold/30 px-2 sm:px-3 py-1 rounded-sm text-[10px] sm:text-[13px] font-rplk-sans uppercase tracking-wider break-words leading-snug">
                    100% Vendido
                  </span>
                </td>
                <td className="font-rplk-sans text-white py-4 sm:py-6 break-words">Studio</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Note */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p
            className="font-rplk-serif italic text-white/70"
            style={{ fontSize: 'clamp(1rem,2vw,1.25rem)' }}
          >
            Todas as unidades foram comercializadas. Para futuras oportunidades RPLK, entre em
            contato.{' '}
            <a
              href="/#contato"
              className="text-rplk-gold underline underline-offset-4 hover:no-underline transition-all"
            >
              Falar com a RPLK
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// TatLocalizacao
// ---------------------------------------------------------------------------
function TatLocalizacao() {
  return (
    <section className="bg-rplk-editorial text-rplk-ink py-[90px] md:py-[110px] overflow-x-clip">
      <div className="rplk-editorial-container px-6 md:px-12 min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start min-w-0">
          {/* Left: address + proximities */}
          <div className="flex flex-col gap-8 min-w-0">
            <div className="flex flex-col gap-3">
              <span className="font-rplk-sans uppercase tracking-rplk-nav text-rplk-gold text-sm">
                Localização
              </span>
              <h2
                className="font-rplk-serif italic text-rplk-ink leading-[1.1]"
                style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}
              >
                Água Verde
              </h2>
            </div>

            <address className="not-italic flex flex-col gap-1 min-w-0">
              <p className="font-rplk-sans text-[16px] text-rplk-ink break-words">
                Rua Doutor Alexandre Gutierrez, 766
              </p>
              <p className="font-rplk-sans text-[16px] text-rplk-ink">
                Água Verde, Curitiba — PR
              </p>
              <p className="font-rplk-sans text-[16px] text-rplk-ink/60">CEP 80620-110</p>
            </address>

            {/* Proximities */}
            <div className="flex flex-col gap-3">
              <p className="font-rplk-sans uppercase tracking-rplk-nav text-rplk-gold text-[13px]">
                Proximidades
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  { place: 'Av. Batel', dist: '650m' },
                  { place: 'Parque Barigui', dist: '3.2km' },
                  { place: 'Centro de Curitiba', dist: '4.8km' },
                  { place: 'Aeroporto Internacional', dist: '22km' },
                ].map(({ place, dist }) => (
                  <li
                    key={place}
                    className="flex items-center justify-between gap-3 border-b border-rplk-ink/10 pb-2 min-w-0"
                  >
                    <span className="font-rplk-sans text-[15px] text-rplk-ink break-words min-w-0">
                      {place}
                    </span>
                    <span className="font-rplk-sans text-[15px] text-rplk-gold">{dist}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: editorial box */}
          <div className="bg-rplk-midnight text-white p-6 sm:p-8 flex items-center min-h-[260px] min-w-0">
            <p
              className="font-rplk-serif italic leading-relaxed break-words"
              style={{ fontSize: 'clamp(1.25rem,2.5vw,2rem)' }}
            >
              Água Verde é um dos bairros mais valorizados de Curitiba, com infraestrutura
              completa, transporte público, comércio e serviços.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// TatInterior
// ---------------------------------------------------------------------------
function TatInterior({ onOpenLightbox }: { onOpenLightbox: (lightboxIndex: number) => void }) {
  return (
    <section className="bg-rplk-midnight overflow-x-clip">
      {/* Full-width image banner */}
      <button
        type="button"
        className="relative w-full h-[70vh] overflow-hidden border-0 p-0 block cursor-pointer group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rplk-gold"
        onClick={() => onOpenLightbox(tatemonoLightboxInteriorIndex)}
        aria-label="Abrir imagem de interiores em tela cheia"
      >
        <img
          src={tatemonoInteriorBannerSrc}
          alt=""
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
        />
        {/* Overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent pointer-events-none"
        />
        {/* Text overlay — bottom left */}
        <div className="absolute bottom-10 left-4 right-4 sm:left-6 sm:right-6 md:left-12 md:right-auto md:max-w-[min(32rem,calc(100%-6rem))] flex flex-col gap-2 z-10 pointer-events-none min-w-0">
          <span className="font-rplk-serif italic text-white text-base md:text-xl break-words">
            Acabamento Premium
          </span>
          <h2
            className="font-rplk-sans uppercase text-white leading-tight break-words max-w-full"
            style={{ fontSize: 'clamp(1.75rem,5.5vw,5rem)' }}
          >
            Interiores
          </h2>
        </div>
      </button>

      {/* Caption below image */}
      <div className="rplk-editorial-container px-6 md:px-12 py-[60px] min-w-0">
        <p
          className="font-rplk-serif italic text-white/75 max-w-2xl break-words"
          style={{ fontSize: 'clamp(1.1rem,2.2vw,1.5rem)' }}
        >
          Cada detalhe pensado para maximizar o aproveitamento do espaço sem abrir mão do conforto
          e da estética.
        </p>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// TatemonoPage — main export
// ---------------------------------------------------------------------------
export default function TatemonoPage() {
  const [barSolid, setBarSolid] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  useEffect(() => {
    document.title = 'ST01 AOI Tatemono — RPLK'
  }, [])

  useEffect(() => {
    const onScroll = () => setBarSolid(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen min-w-0 overflow-x-clip bg-rplk-midnight text-white">
      {/* Fixed header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] flex min-h-[56px] items-center justify-center px-4 py-3 md:px-8 transition-[background,box-shadow,border-color] duration-500 ${
          barSolid
            ? 'bg-rplk-midnight/95 backdrop-blur-md border-b border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.25)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <Link
          to="/"
          className="inline-flex shrink-0 items-center outline-none focus-visible:ring-2 focus-visible:ring-rplk-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm text-white hover:opacity-90 transition-opacity"
          aria-label="RPLK — Voltar à página inicial"
        >
          <img
            src={ASSETS.rplkLogo}
            alt=""
            className={`h-8 w-auto ${barSolid ? '' : 'drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]'}`}
          />
        </Link>
      </header>

      <main className="min-w-0 overflow-x-clip">
        <AmbarRevealSection variant="fade" threshold={0.06}>
          <TatHero />
        </AmbarRevealSection>

        <AmbarRevealSection variant="fade-up" delayMs={70}>
          <TatSobre />
        </AmbarRevealSection>

        <AmbarRevealSection variant="fade-right" delayMs={80}>
          <TatGaleria onOpenLightbox={openLightbox} />
        </AmbarRevealSection>

        <AmbarRevealSection variant="fade-up" delayMs={70}>
          <TatObra />
        </AmbarRevealSection>

        <AmbarRevealSection variant="fade-left" delayMs={80}>
          <TatValores />
        </AmbarRevealSection>

        <AmbarRevealSection variant="fade-up" delayMs={70}>
          <TatLocalizacao />
        </AmbarRevealSection>

        <AmbarRevealSection variant="fade" delayMs={60}>
          <TatInterior onOpenLightbox={openLightbox} />
        </AmbarRevealSection>
      </main>

      <ImageLightbox
        open={lightboxOpen}
        images={tatemonoLightboxImages}
        startIndex={lightboxIndex}
        alt="AOI Tatemono — imagem"
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />

      <AmbarRevealSection variant="fade" delayMs={40}>
        <RplkFooter />
      </AmbarRevealSection>

      <WhatsAppFab preset="rplk" />
    </div>
  )
}
