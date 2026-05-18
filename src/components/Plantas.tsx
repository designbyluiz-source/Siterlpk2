import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ASSETS } from '../assets/figma'
import AmbarRevealItem from './AmbarRevealItem'
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

const initialConfig = getPavimentoConfig('terreo')

function disponibilidadeDe(u: UnidadePlanta): DisponibilidadeUnidade {
  return u.disponibilidade ?? 'disponivel'
}

function ariaLabelUnidade(u: UnidadePlanta): string {
  const d = disponibilidadeDe(u)
  if (d === 'vendido') return `Unidade ${u.numero}, vendida`
  if (d === 'reservado') return `Unidade ${u.numero}, reservada`
  return `Unidade ${u.numero}`
}

/** Retângulo da imagem com `object-contain` dentro do content box do contentor. */
function objectContainRect(
  cw: number,
  ch: number,
  nw: number,
  nh: number,
): { drawW: number; drawH: number; ox: number; oy: number } {
  if (cw <= 0 || ch <= 0 || nw <= 0 || nh <= 0) {
    return { drawW: cw, drawH: ch, ox: 0, oy: 0 }
  }
  const cr = cw / ch
  const ir = nw / nh
  if (ir > cr) {
    const drawW = cw
    const drawH = cw / ir
    return { drawW, drawH, ox: 0, oy: (ch - drawH) / 2 }
  }
  const drawH = ch
  const drawW = ch * ir
  return { drawW, drawH, ox: (cw - drawW) / 2, oy: 0 }
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

const PLANTA_ZOOM_LENS_PX = 112
const PLANTA_ZOOM_SCALE = 1

/**
 * Planta da unidade com lupa no hover (estilo e-commerce), só em apontador fino.
 */
function PlantaUnidadeComLupa({
  src,
  alt,
  vendido,
}: {
  src: string
  alt: string
  vendido: boolean
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null)
  const [fineHover, setFineHover] = useState(false)
  const [lensOn, setLensOn] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [boxTick, setBoxTick] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const apply = () => setFineHover(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const updateFromEvent = useCallback((e: React.PointerEvent) => {
    if (!fineHover || e.pointerType !== 'mouse') return
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setCursor({ x: e.clientX - r.left, y: e.clientY - r.top })
  }, [fineHover])

  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => setBoxTick((t) => t + 1))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const lensLayout = useMemo(() => {
    const el = wrapRef.current
    if (!el || !natural || !lensOn) return null
    void boxTick
    const cw = el.clientWidth
    const ch = el.clientHeight
    const { drawW, drawH, ox, oy } = objectContainRect(cw, ch, natural.w, natural.h)
    const L = Math.min(PLANTA_ZOOM_LENS_PX, drawW * 0.85, drawH * 0.85)
    if (L < 48 || drawW < 24 || drawH < 24) return null

    const cx = clamp(cursor.x, ox + L / 2, ox + drawW - L / 2)
    const cy = clamp(cursor.y, oy + L / 2, oy + drawH - L / 2)

    const ix = clamp(((cx - ox) / drawW) * natural.w, 0, natural.w)
    const iy = clamp(((cy - oy) / drawH) * natural.h, 0, natural.h)
    const Z = PLANTA_ZOOM_SCALE

    const bgUrl = `url("${src.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}")`

    return {
      L,
      left: cx - L / 2,
      top: cy - L / 2,
      bgUrl,
      bgSizeW: natural.w * Z,
      bgSizeH: natural.h * Z,
      bgPosX: L / 2 - ix * Z,
      bgPosY: L / 2 - iy * Z,
    }
  }, [natural, lensOn, cursor.x, cursor.y, src, boxTick])

  return (
    <div
      ref={wrapRef}
      className={[
        'relative mx-auto aspect-square w-full max-w-[280px] shrink-0 overflow-hidden lg:mx-0 lg:max-h-[min(58vh,420px)] lg:max-w-full lg:w-full lg:self-center',
        fineHover ? 'cursor-crosshair' : '',
      ].join(' ')}
      onPointerEnter={(e) => {
        if (!fineHover || e.pointerType !== 'mouse') return
        setLensOn(true)
        updateFromEvent(e)
      }}
      onPointerLeave={() => setLensOn(false)}
      onPointerMove={(e) => {
        updateFromEvent(e)
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        onLoad={(ev) => {
          const im = ev.currentTarget
          setNatural({ w: im.naturalWidth, h: im.naturalHeight })
        }}
        className="absolute inset-0 h-full w-full object-contain object-center bg-transparent select-none"
      />
      {lensLayout ? (
        <div
          className="pointer-events-none absolute z-[2] overflow-hidden rounded-[3px] border-2 border-white/95 shadow-[0_6px_24px_rgba(0,45,79,0.22)] ring-1 ring-ambar-navy/20"
          style={{
            width: lensLayout.L,
            height: lensLayout.L,
            left: lensLayout.left,
            top: lensLayout.top,
            backgroundImage: lensLayout.bgUrl,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${lensLayout.bgSizeW}px ${lensLayout.bgSizeH}px`,
            backgroundPosition: `${lensLayout.bgPosX}px ${lensLayout.bgPosY}px`,
          }}
          aria-hidden
        />
      ) : null}
      {vendido ? (
        <div
          className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center"
          aria-hidden
        >
          <span className="-rotate-[32deg] select-none whitespace-nowrap font-ui text-[clamp(1.75rem,5.5vw,2.75rem)] font-black uppercase tracking-[0.2em] text-red-800/[0.38] [text-shadow:0_0_1px_rgba(255,255,255,0.5)]">
            Vendido
          </span>
        </div>
      ) : null}
    </div>
  )
}

/** Duração do crossfade entre planta completa e destaque (e entre destaques). */
const MAP_FADE_MS = 440
/** Troca o PNG do destaque com o overlay já quase transparente, para evitar “corte” brusco. */
const MAP_DESTAQUE_SWAP_MS = Math.round(MAP_FADE_MS * 0.4)

function PlantaMapInteractive({
  interactive,
  destaqueRendered,
  destaqueLayerOpacity,
  dimMapBaseForDestaque,
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
  /** Mantém o fundo escurecido enquanto há seleção/hover no mapa (evita “piscar” ao trocar unidade). */
  dimMapBaseForDestaque: boolean
  onMapPointerEnter: () => void
  onMapPointerLeave: () => void
  onUnitPointerEnter: (u: UnidadePlanta) => void
  onUnitPointerDown: (u: UnidadePlanta) => void
  onUnitFocus: (u: UnidadePlanta) => void
  handleUnitFocusBlur: (e: React.FocusEvent<HTMLButtonElement>) => void
}) {
  const baseBrightness =
    interactive.mapBaseBrightnessWhenDestaque != null && dimMapBaseForDestaque
      ? interactive.mapBaseBrightnessWhenDestaque
      : 1

  const mapAr = interactive.mapAspect[0] / interactive.mapAspect[1]

  return (
    <div
      className="relative mx-auto max-h-[min(72vh,640px)] w-[min(100%,calc(min(72vh,640px)*var(--map-ar)))] overflow-visible py-2"
      style={{
        ['--map-ar' as string]: String(mapAr),
        aspectRatio: `${interactive.mapAspect[0]} / ${interactive.mapAspect[1]}`,
      }}
      data-planta-map
      onPointerEnter={onMapPointerEnter}
      onPointerLeave={onMapPointerLeave}
    >
      <div className="absolute inset-0 z-0 isolate">
        <img
          src={interactive.mapaCompleta}
          alt="Planta humanizada do pavimento"
          className="absolute inset-0 z-0 h-full w-full object-contain object-center pointer-events-none select-none bg-transparent motion-safe:transition-[filter]"
          style={{
            filter: baseBrightness < 1 ? `brightness(${baseBrightness})` : undefined,
            transitionDuration: `${MAP_FADE_MS}ms`,
          }}
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
              ...(interactive.mapDestaqueMixBlendMode
                ? { mixBlendMode: interactive.mapDestaqueMixBlendMode }
                : {}),
            }}
            draggable={false}
          />
        ) : null}
      </div>
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
                  className={[
                    'pointer-events-none absolute top-1 right-1 max-w-[calc(100%-8px)] rounded border px-1.5 py-0.5 text-left font-ui text-[9px] font-bold uppercase leading-tight tracking-wide shadow-sm opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100',
                    disp === 'vendido'
                      ? 'border-red-800/45 bg-red-50/95 text-red-900'
                      : 'border-ambar-gray/60 bg-ambar-cream/95 text-ambar-gray',
                  ].join(' ')}
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
  const [pavAtivo, setPavAtivo] = useState('terreo')
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
        <header className="mb-8 lg:mb-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-y-5 lg:items-end lg:gap-y-0">
          <AmbarRevealItem preset="skew-up" once={false} className="lg:col-start-1 lg:row-start-1 justify-self-start">
            <h2 className="heading-section text-ambar-brown">PLANTAS</h2>
          </AmbarRevealItem>
          <AmbarRevealItem
            preset="zoom-pop"
            delayMs={110}
            once={false}
            className="flex w-full justify-center lg:col-start-2 lg:row-start-1 lg:justify-self-center"
          >
            <nav
              className="flex flex-wrap items-center justify-center gap-x-0.5 gap-y-1"
              aria-label="Pavimentos"
            >
              {PAVIMENTO_TABS.map((p, idx) => (
                <AmbarRevealItem
                  key={p.id}
                  preset="tilt-in"
                  staggerIndex={idx}
                  staggerMs={55}
                  once={false}
                  threshold={0.05}
                  className="inline-flex"
                >
                  <button
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
                </AmbarRevealItem>
              ))}
            </nav>
          </AmbarRevealItem>
        </header>

        {interactive && panelUnit ? (
          <>
            {/* Desktop: planta completa | planta da unidade | informações */}
            <div
              className={[
                'grid w-full min-w-0',
                'grid-cols-1 gap-6',
                'lg:grid-cols-[minmax(0,1fr)_minmax(11rem,min(280px,26vw))_minmax(11rem,auto)]',
                'lg:gap-x-3 xl:gap-x-5',
                'lg:items-center',
              ].join(' ')}
            >
              <AmbarRevealItem
                preset="glide-right"
                delayMs={70}
                once={false}
                className="flex min-h-0 min-w-0 w-full flex-col items-stretch justify-center"
              >
                <p className="font-ui font-semibold text-[16px] text-ambar-gray text-center tracking-tight pb-2.5 lg:pb-1.5">
                  Face Norte
                </p>
                <div className="h-px w-full shrink-0 bg-ambar-gray/40" aria-hidden />
                <PlantaMapInteractive
                  interactive={interactive}
                  destaqueRendered={destaqueRendered}
                  destaqueLayerOpacity={destaqueLayerOpacity}
                  dimMapBaseForDestaque={highlightOnMap != null}
                  onMapPointerEnter={desbloquearSeVoltouAoMapa}
                  onMapPointerLeave={handleMapPointerLeave}
                  onUnitPointerEnter={handleUnitPointerEnter}
                  onUnitPointerDown={handleUnitPointerDown}
                  onUnitFocus={handleUnitFocus}
                  handleUnitFocusBlur={handleUnitFocusBlur}
                />
                <div className="h-px w-full shrink-0 bg-ambar-gray/40 mt-2 lg:mt-1.5" aria-hidden />
                <p className="font-ui font-semibold text-[16px] text-ambar-gray text-center tracking-tight pt-2.5 lg:pt-1.5">
                  Frente Rua
                </p>
              </AmbarRevealItem>

              <AmbarRevealItem preset="blur-rise" delayMs={120} once={false}>
                <PlantaUnidadeComLupa
                  key={panelUnit.numero}
                  src={panelUnit.plantaSrc}
                  alt={
                    disponibilidadeDe(panelUnit) === 'vendido'
                      ? `Planta da unidade ${panelUnit.numero} (vendida)`
                      : `Planta da unidade ${panelUnit.numero}`
                  }
                  vendido={disponibilidadeDe(panelUnit) === 'vendido'}
                />
              </AmbarRevealItem>

              <AmbarRevealItem
                preset="glide-left"
                delayMs={90}
                once={false}
                className="flex w-full shrink-0 flex-col items-center justify-center gap-4 text-ambar-gray lg:min-w-0 lg:max-w-[min(17rem,30vw)] xl:max-w-[18rem]"
              >
                <dl className="m-0 flex w-full max-w-[14rem] flex-col items-center gap-0 text-center font-ui lg:max-w-none">
                  <div className="flex w-full flex-col items-center gap-1 pb-5">
                    <dt className="font-bold text-[11px] uppercase tracking-wide leading-tight text-ambar-gray">
                      Unidade
                    </dt>
                    <dd className="m-0 flex flex-col items-center gap-2">
                      <span className="font-medium text-[14px] tabular-nums leading-snug text-ambar-gray">
                        {panelUnit.numero}
                      </span>
                      {(disponibilidadeDe(panelUnit) === 'vendido' ||
                        disponibilidadeDe(panelUnit) === 'reservado') ? (
                        <span className="flex flex-wrap justify-center gap-1">
                          {disponibilidadeDe(panelUnit) === 'vendido' ? (
                            <span className="inline-block rounded border border-red-800/40 bg-red-700/12 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-red-900">
                              Vendido
                            </span>
                          ) : null}
                          {disponibilidadeDe(panelUnit) === 'reservado' ? (
                            <span className="inline-block rounded border border-ambar-gray/55 bg-ambar-cream/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ambar-gray">
                              Reservado
                            </span>
                          ) : null}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                  <div className="flex w-full flex-col items-center gap-1 pb-5">
                    <dt className="font-bold text-[11px] uppercase tracking-wide leading-tight text-ambar-gray">
                      Tipologia
                    </dt>
                    <dd className="m-0 max-w-[16rem] text-[13px] font-medium leading-snug text-ambar-gray">
                      {panelUnit.tipologia}
                    </dd>
                  </div>
                  <div className="flex w-full flex-col items-center gap-1">
                    <dt className="font-bold text-[10px] uppercase tracking-wide leading-tight text-ambar-gray">
                      Área privativa
                    </dt>
                    <dd className="m-0 text-[14px] font-medium tabular-nums leading-snug text-ambar-gray">
                      {panelUnit.area}
                    </dd>
                  </div>
                </dl>
                {panelUnit.temDecorado && disponibilidadeDe(panelUnit) === 'disponivel' ? (
                  <a
                    href="#decorados"
                    className="inline-flex shrink-0 border border-ambar-gray/50 rounded-[6px] px-3 py-2 font-ui font-medium text-[12px] text-ambar-gray transition-colors hover:bg-ambar-gray hover:text-ambar-cream xl:px-4 xl:text-[13px]"
                  >
                    Ver Decorado
                  </a>
                ) : null}
              </AmbarRevealItem>
            </div>
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
