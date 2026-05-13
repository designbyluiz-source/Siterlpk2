import { useCallback, useEffect, useRef, useState } from 'react'
import { ASSETS } from '../assets/figma'
import {
  getPavimentoConfig,
  isPavimentoTabId,
  PAVIMENTO_TABS,
  PLANTAS_SELECIONAR_PAVIMENTO,
  type DisponibilidadeUnidade,
  type PavimentoPlantaData,
  type PlantasSelecionarPavimentoDetail,
  type UnidadePlanta,
} from '../data/plantas-pavimentos'

const initialConfig = getPavimentoConfig('2')

function disponibilidadeDe(u: UnidadePlanta): DisponibilidadeUnidade {
  return u.disponibilidade ?? 'disponivel'
}

function ariaLabelUnidade(u: UnidadePlanta): string {
  const d = disponibilidadeDe(u)
  if (d === 'vendido') return `Unidade ${u.numero}, vendida`
  if (d === 'reservado') return `Unidade ${u.numero}, reservada`
  return `Unidade ${u.numero}`
}

/** Duração do crossfade entre planta completa e destaque (e entre destaques). */
const MAP_FADE_MS = 440
/** Troca o PNG do destaque com o overlay já quase transparente, para evitar “corte” brusco. */
const MAP_DESTAQUE_SWAP_MS = Math.round(MAP_FADE_MS * 0.4)

function PlantaMapInteractive({
  interactive,
  destaqueRendered,
  destaqueLayerOpacity,
  onMapPointerEnter,
  onMapPointerLeave,
  onUnitPointerEnter,
  onUnitPointerDown,
  onUnitFocus,
  handleUnitFocusBlur,
}: {
  interactive: PavimentoPlantaData
  destaqueRendered: UnidadePlanta | null
  destaqueLayerOpacity: number
  onMapPointerEnter: () => void
  onMapPointerLeave: () => void
  onUnitPointerEnter: (u: UnidadePlanta) => void
  onUnitPointerDown: (u: UnidadePlanta) => void
  onUnitFocus: (u: UnidadePlanta) => void
  handleUnitFocusBlur: (e: React.FocusEvent<HTMLButtonElement>) => void
}) {
  return (
    <div
      className="relative w-full overflow-visible py-2"
      style={{
        aspectRatio: `${interactive.mapAspect[0]} / ${interactive.mapAspect[1]}`,
      }}
      data-planta-map
      onPointerEnter={onMapPointerEnter}
      onPointerLeave={onMapPointerLeave}
    >
      <img
        src={interactive.mapaCompleta}
        alt="Planta humanizada do pavimento"
        className="absolute inset-0 z-0 h-full w-full object-contain object-center pointer-events-none select-none bg-transparent"
        draggable={false}
      />
      {destaqueRendered ? (
        <img
          key={destaqueRendered.numero}
          src={destaqueRendered.destaqueSrc}
          alt=""
          aria-hidden
          className="absolute inset-0 z-[1] h-full w-full object-contain object-center pointer-events-none select-none bg-transparent transition-opacity ease-in-out"
          style={{
            opacity: destaqueLayerOpacity,
            transitionDuration: `${MAP_FADE_MS}ms`,
          }}
          draggable={false}
        />
      ) : null}
      {interactive.unidades.map((u) => {
        const disp = disponibilidadeDe(u)
        const indisponivel = disp !== 'disponivel'
        return (
          <button
            key={u.numero}
            type="button"
            onPointerEnter={() => onUnitPointerEnter(u)}
            onPointerDown={() => onUnitPointerDown(u)}
            onFocus={() => onUnitFocus(u)}
            onBlur={handleUnitFocusBlur}
            aria-label={ariaLabelUnidade(u)}
            className={[
              'group absolute box-border overflow-hidden bg-transparent',
              'border-0 outline-none transition-colors',
              'focus-visible:ring-2 focus-visible:ring-ambar-navy/50 focus-visible:ring-offset-0',
            ].join(' ')}
            style={{
              left: `${u.hitbox.left}%`,
              top: `${u.hitbox.top}%`,
              width: `${u.hitbox.width}%`,
              height: `${u.hitbox.height}%`,
              zIndex: u.mapZIndex ?? 2,
            }}
          >
            {indisponivel ? (
              <>
                <span
                  className="pointer-events-none absolute inset-0 bg-ambar-ink/10 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute inset-0 bg-ambar-gray/25 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute top-1 right-1 max-w-[calc(100%-8px)] rounded border border-ambar-gray/60 bg-ambar-cream/95 px-1.5 py-0.5 text-left font-ui text-[9px] font-bold uppercase leading-tight tracking-wide text-ambar-gray shadow-sm opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden
                >
                  {disp === 'vendido' ? 'Vendido' : 'Reservado'}
                </span>
              </>
            ) : null}
            <span className="sr-only">UD {u.numero}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function Plantas() {
  const [pavAtivo, setPavAtivo] = useState('2')
  const config = getPavimentoConfig(pavAtivo)

  const [selected, setSelected] = useState<UnidadePlanta | null>(
    initialConfig.kind === 'interactive' ? initialConfig.data.unidades[0] : null,
  )
  const [highlightOnMap, setHighlightOnMap] = useState<UnidadePlanta | null>(null)
  const [destaqueRendered, setDestaqueRendered] = useState<UnidadePlanta | null>(null)
  const [destaqueLayerOpacity, setDestaqueLayerOpacity] = useState(0)
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafFadeInRef = useRef<number | null>(null)
  const committedDestaqueRef = useRef<UnidadePlanta | null>(null)
  const mapaTravadoRef = useRef(false)
  /** True após sair da área do mapa; ao entrar de novo desbloqueia o hover. */
  const saiuDoMapaRef = useRef(false)
  /** Unidade vinda de um evento externo (Decorados/Áreas Comuns) a aplicar após trocar pavimento. */
  const pendingUnidadeRef = useRef<string | null>(null)
  /**
   * Modalidade de entrada para distinguir tap/click (mobile/desktop) de navegação por teclado.
   * Em mobile, o focus dispara DEPOIS do pointerdown e, sem este flag, o handler do focus
   * resetava o lock do mapa e o pointerleave seguinte limpava o destaque.
   */
  const lastInputWasKeyboardRef = useRef(false)

  useEffect(() => {
    const setKey = () => {
      lastInputWasKeyboardRef.current = true
    }
    const setPointer = () => {
      lastInputWasKeyboardRef.current = false
    }
    window.addEventListener('keydown', setKey, true)
    window.addEventListener('pointerdown', setPointer, true)
    return () => {
      window.removeEventListener('keydown', setKey, true)
      window.removeEventListener('pointerdown', setPointer, true)
    }
  }, [])

  useEffect(() => {
    const c = getPavimentoConfig(pavAtivo)
    mapaTravadoRef.current = false
    saiuDoMapaRef.current = false
    if (c.kind === 'interactive') {
      const pendingNumero = pendingUnidadeRef.current
      pendingUnidadeRef.current = null
      const initialUnit =
        (pendingNumero && c.data.unidades.find((u) => u.numero === pendingNumero)) ||
        c.data.unidades[0]
      setSelected(initialUnit)
      setHighlightOnMap(pendingNumero ? initialUnit : null)
      if (pendingNumero) mapaTravadoRef.current = true
    } else {
      setSelected(null)
      setHighlightOnMap(null)
    }
  }, [pavAtivo])

  useEffect(() => {
    const onSelecionarPavimento = (ev: Event) => {
      const ce = ev as CustomEvent<PlantasSelecionarPavimentoDetail>
      const id = ce.detail?.pavimentoId
      const unidade = ce.detail?.unidadeNumero ?? null
      if (!id || !isPavimentoTabId(id)) return
      pendingUnidadeRef.current = unidade
      if (id === pavAtivo) {
        const cfg = getPavimentoConfig(id)
        if (cfg.kind === 'interactive') {
          const found = unidade ? cfg.data.unidades.find((u) => u.numero === unidade) : null
          if (found) {
            setSelected(found)
            setHighlightOnMap(found)
            mapaTravadoRef.current = true
          }
        }
        pendingUnidadeRef.current = null
      } else {
        setPavAtivo(id)
      }
    }
    window.addEventListener(PLANTAS_SELECIONAR_PAVIMENTO, onSelecionarPavimento)
    return () => window.removeEventListener(PLANTAS_SELECIONAR_PAVIMENTO, onSelecionarPavimento)
  }, [pavAtivo])

  const interactive = config.kind === 'interactive' ? config.data : null

  useEffect(() => {
    if (!interactive) {
      setDestaqueRendered(null)
      setDestaqueLayerOpacity(0)
      return
    }
    for (const u of interactive.unidades) {
      const img = new Image()
      img.src = u.destaqueSrc
    }
  }, [interactive])

  useEffect(() => {
    const clearTimers = () => {
      if (fadeTimerRef.current !== null) {
        clearTimeout(fadeTimerRef.current)
        fadeTimerRef.current = null
      }
      if (rafFadeInRef.current !== null) {
        cancelAnimationFrame(rafFadeInRef.current)
        rafFadeInRef.current = null
      }
    }

    const fadeIn = () => {
      rafFadeInRef.current = requestAnimationFrame(() => {
        rafFadeInRef.current = requestAnimationFrame(() => {
          setDestaqueLayerOpacity(1)
          rafFadeInRef.current = null
        })
      })
    }

    if (!interactive) {
      clearTimers()
      committedDestaqueRef.current = null
      setDestaqueRendered(null)
      setDestaqueLayerOpacity(0)
      return
    }

    if (!highlightOnMap) {
      setDestaqueLayerOpacity(0)
      clearTimers()
      fadeTimerRef.current = setTimeout(() => {
        committedDestaqueRef.current = null
        setDestaqueRendered(null)
        fadeTimerRef.current = null
      }, MAP_FADE_MS)
      return clearTimers
    }

    const prev = committedDestaqueRef.current

    if (!prev) {
      committedDestaqueRef.current = highlightOnMap
      setDestaqueRendered(highlightOnMap)
      setDestaqueLayerOpacity(0)
      clearTimers()
      fadeIn()
      return clearTimers
    }

    if (prev.numero === highlightOnMap.numero) {
      setDestaqueLayerOpacity(1)
      return clearTimers
    }

    setDestaqueLayerOpacity(0)
    clearTimers()
    fadeTimerRef.current = setTimeout(() => {
      committedDestaqueRef.current = highlightOnMap
      setDestaqueRendered(highlightOnMap)
      fadeTimerRef.current = null
      fadeIn()
    }, MAP_DESTAQUE_SWAP_MS)

    return clearTimers
  }, [highlightOnMap, interactive])

  const panelUnit = selected ?? interactive?.unidades[0] ?? null

  const handleMapPointerLeave = useCallback(() => {
    saiuDoMapaRef.current = true
    if (!mapaTravadoRef.current) setHighlightOnMap(null)
  }, [])

  const desbloquearSeVoltouAoMapa = useCallback(() => {
    if (!saiuDoMapaRef.current) return
    saiuDoMapaRef.current = false
    mapaTravadoRef.current = false
  }, [])

  const handleUnitPointerEnter = useCallback(
    (u: UnidadePlanta) => {
      desbloquearSeVoltouAoMapa()
      if (!mapaTravadoRef.current) {
        setSelected(u)
        setHighlightOnMap(u)
      }
    },
    [desbloquearSeVoltouAoMapa],
  )

  const handleUnitPointerDown = useCallback((u: UnidadePlanta) => {
    mapaTravadoRef.current = true
    setSelected(u)
    setHighlightOnMap(u)
  }, [])

  const handleUnitFocus = useCallback((u: UnidadePlanta) => {
    // Focus dispara também após `pointerdown` em mobile/desktop. Esses casos já são
    // tratados pelo `handleUnitPointerDown`; aqui só queremos reagir a tabulação por teclado.
    if (!lastInputWasKeyboardRef.current) return
    mapaTravadoRef.current = false
    setSelected(u)
    setHighlightOnMap(u)
  }, [])

  const handleUnitFocusBlur = useCallback((e: React.FocusEvent<HTMLButtonElement>) => {
    const map = e.currentTarget.closest('[data-planta-map]')
    const next = e.relatedTarget as Node | null
    if (map && next && map.contains(next)) return
    if (mapaTravadoRef.current) return
    setHighlightOnMap(null)
  }, [])

  return (
    <section
      id="plantas"
      className="bg-ambar-cream py-[33px] pb-20"
      data-node-id="334:251"
    >
      <div className="container-ambar">
        {/* Referência: título à esquerda, abas centradas na largura total */}
        <header className="mb-8 lg:mb-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-y-5 lg:gap-y-0">
          <h2 className="heading-section text-ambar-brown lg:col-start-1 lg:row-start-1 justify-self-start">
            PLANTAS
          </h2>
          <nav
            className="flex flex-wrap justify-center gap-x-0.5 gap-y-1 lg:col-start-2 lg:row-start-1 lg:justify-self-center"
            aria-label="Pavimentos"
          >
            {PAVIMENTO_TABS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPavAtivo(p.id)}
                className={[
                  'px-5 py-[10px] font-ui text-[16px] text-ambar-gray transition-colors border-b',
                  pavAtivo === p.id
                    ? 'border-ambar-gray font-black'
                    : 'border-transparent font-medium hover:text-ambar-navy hover:border-ambar-gray/25',
                ].join(' ')}
              >
                {p.label}
              </button>
            ))}
          </nav>
        </header>

        {interactive && panelUnit ? (
          <>
            {/* Referência: duas imagens lado a lado, alinhadas ao centro vertical */}
            <div
              className={[
                'grid w-full min-w-0',
                'grid-cols-1 gap-y-6',
                'lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,min(42vw,36rem))]',
                'lg:gap-x-8 xl:gap-x-14',
                'lg:items-start',
              ].join(' ')}
            >
              <div className="flex min-w-0 w-full max-w-3xl mx-auto lg:mx-0 lg:max-w-none flex-col items-stretch">
                <p className="font-ui font-semibold text-[16px] text-ambar-gray text-center tracking-tight pb-2.5">
                  Face Norte
                </p>
                <div className="h-px w-full shrink-0 bg-ambar-gray/40" aria-hidden />
                <PlantaMapInteractive
                  interactive={interactive}
                  destaqueRendered={destaqueRendered}
                  destaqueLayerOpacity={destaqueLayerOpacity}
                  onMapPointerEnter={desbloquearSeVoltouAoMapa}
                  onMapPointerLeave={handleMapPointerLeave}
                  onUnitPointerEnter={handleUnitPointerEnter}
                  onUnitPointerDown={handleUnitPointerDown}
                  onUnitFocus={handleUnitFocus}
                  handleUnitFocusBlur={handleUnitFocusBlur}
                />
                <div className="h-px w-full shrink-0 bg-ambar-gray/40 mt-2" aria-hidden />
                <p className="font-ui font-semibold text-[16px] text-ambar-gray text-center tracking-tight pt-2.5">
                  Frente Rua
                </p>
              </div>

              <div className="flex w-full min-h-0 min-w-0 justify-center lg:justify-center">
                <div className="relative aspect-square w-full max-w-lg shrink-0 lg:max-w-[min(100%,min(70vh,680px))]">
                  <img
                    src={panelUnit.plantaSrc}
                    alt={`Planta da unidade ${panelUnit.numero}`}
                    className="absolute inset-0 h-full w-full object-contain object-center bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Referência: dados + botão numa linha, grupo centrado na página */}
            <aside className="mt-5 lg:mt-7 w-full flex flex-col items-center text-ambar-gray">
              <div className="flex flex-wrap justify-center items-end gap-x-8 sm:gap-x-12 md:gap-x-16 lg:gap-x-20 gap-y-5">
                <dl className="m-0 flex flex-wrap justify-center items-end gap-x-8 sm:gap-x-12 md:gap-x-16 lg:gap-x-20 gap-y-5">
                  <div className="flex flex-col gap-[7px] items-center min-w-[5rem] max-w-[min(100%,14rem)]">
                    <dt className="font-ui font-bold text-[12px] uppercase">UNIDADE</dt>
                    <dd className="m-0 flex flex-col items-center gap-1.5">
                      <span className="font-ui font-medium text-[11px] sm:text-[12px] tabular-nums text-center leading-snug break-words">
                        {panelUnit.numero}
                      </span>
                      {disponibilidadeDe(panelUnit) === 'vendido' ? (
                        <span className="inline-block rounded border border-ambar-gray/55 bg-ambar-cream/80 px-2 py-0.5 font-ui text-[9px] font-bold uppercase tracking-wide text-ambar-gray">
                          Vendido
                        </span>
                      ) : null}
                      {disponibilidadeDe(panelUnit) === 'reservado' ? (
                        <span className="inline-block rounded border border-ambar-gray/55 bg-ambar-cream/80 px-2 py-0.5 font-ui text-[9px] font-bold uppercase tracking-wide text-ambar-gray">
                          Reservado
                        </span>
                      ) : null}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-[7px] items-center min-w-[5rem]">
                    <dt className="font-ui font-bold text-[12px] uppercase">TIPOLOGIA</dt>
                    <dd className="font-ui font-medium text-[12px] text-center max-w-[10rem] m-0">
                      {panelUnit.tipologia}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-[7px] items-center min-w-[5rem]">
                    <dt className="font-ui font-bold text-[10px] uppercase leading-tight text-center">
                      ÁREA PRIVATIVA
                    </dt>
                    <dd className="font-ui font-medium text-[12px] tabular-nums m-0">{panelUnit.area}</dd>
                  </div>
                </dl>
                {panelUnit.temDecorado && disponibilidadeDe(panelUnit) === 'disponivel' ? (
                  <a
                    href="#decorados"
                    className="shrink-0 border border-ambar-gray/50 rounded-[6px] px-5 py-[10px] font-ui font-medium text-[16px] text-ambar-gray hover:bg-ambar-gray hover:text-ambar-cream transition-colors"
                  >
                    Ver Decorado
                  </a>
                ) : null}
              </div>
            </aside>
          </>
        ) : (
          <div
            className={[
              'grid w-full',
              'grid-cols-1 gap-y-8',
              'lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,min(42vw,36rem))]',
              'lg:gap-x-8 xl:gap-x-14 lg:items-center',
            ].join(' ')}
          >
            <div className="flex min-w-0 w-full max-w-3xl mx-auto lg:mx-0 lg:max-w-none flex-col items-stretch">
              <p className="font-ui font-semibold text-[16px] text-ambar-gray text-center pb-2.5">
                Face Norte
              </p>
              <div className="h-px w-full bg-ambar-gray/40" aria-hidden />
              <div className="relative w-full aspect-[886/439] overflow-hidden flex items-center justify-center bg-ambar-cream/80 border border-ambar-gray/20 rounded-sm my-2">
                <img
                  src={ASSETS.plantaMain}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-25 pointer-events-none"
                  aria-hidden
                />
                <p className="relative z-10 font-ui text-[16px] text-ambar-gray text-center px-6 py-16">
                  Plantas deste pavimento em breve.
                </p>
              </div>
              <div className="h-px w-full bg-ambar-gray/40 mt-2" aria-hidden />
              <p className="font-ui font-semibold text-[16px] text-ambar-gray text-center pt-2.5">
                Frente Rua
              </p>
            </div>
            <div className="flex items-center justify-center min-h-[8rem]">
              <p className="font-ui text-[14px] text-ambar-gray/80 text-center max-w-sm px-2">
                As plantas do terraço estarão disponíveis em breve. Explore os outros pavimentos nas
                abas acima.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
