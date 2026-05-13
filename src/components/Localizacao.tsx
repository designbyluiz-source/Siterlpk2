import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CategoriaLocalizacao, OsmPoi } from '../lib/overpassPois'
import {
  MAX_WALK_MINUTES_BARES,
  fetchNearbyPois,
  filterPoisWithinWalkingMinutes,
} from '../lib/overpassPois'
import {
  fetchOsrmRoute,
  formatOsrmDistance,
  formatOsrmDuration,
  geocodeAddress,
} from '../lib/osmRouting'
import LocalizacaoMapLeaflet from './LocalizacaoMapLeaflet'

const MAP_LAT = -25.4556
const MAP_LON = -49.2874

const EMPREENDIMENTO_ADDRESS =
  'Rua Palmeiras, 691, Água Verde, Curitiba, PR 80620-110, Brasil'

const ADDRESS_LINES = [
  'Rua Palmeiras, 691',
  'Água Verde · Curitiba/PR',
  'CEP 80620-110',
]

const MAP_BOX_HEIGHT = 'clamp(260px, 48vw, 440px)'

const LISTA_LATERAL_MAX = 6

const FILTROS: Array<{ id: CategoriaLocalizacao; label: string; short: string }> = [
  { id: 'mercados', label: 'Mercados', short: 'Mercados' },
  { id: 'farmacias', label: 'Farmácias', short: 'Farmácias' },
  { id: 'bares', label: 'Bares e cafés', short: 'Bares' },
]

const FALLBACK_POIS: Record<CategoriaLocalizacao, OsmPoi[]> = {
  mercados: [
    {
      id: 'fb-m1',
      nome: 'Mercado (dados de exemplo)',
      tempo: '≈ 4 min de carro',
      lat: -25.456,
      lng: -49.288,
    },
    {
      id: 'fb-m2',
      nome: 'Supermercado próximo (exemplo)',
      tempo: '≈ 5 min de carro',
      lat: -25.457,
      lng: -49.289,
    },
  ],
  farmacias: [
    {
      id: 'fb-f1',
      nome: 'Farmácia (dados de exemplo)',
      tempo: '≈ 3 min de carro',
      lat: -25.456,
      lng: -49.287,
    },
    {
      id: 'fb-f2',
      nome: 'Farmácia 24h (exemplo)',
      tempo: '≈ 6 min de carro',
      lat: -25.458,
      lng: -49.285,
    },
  ],
  bares: [
    {
      id: 'fb-b1',
      nome: 'Café (dados de exemplo)',
      tempo: '≈ 3 min a pé',
      lat: -25.4555,
      lng: -49.2875,
    },
    {
      id: 'fb-b2',
      nome: 'Bar (exemplo)',
      tempo: '≈ 5 min a pé',
      lat: -25.4565,
      lng: -49.2885,
    },
  ],
}

function fallbackPoisForCategory(cat: CategoriaLocalizacao): OsmPoi[] {
  const raw = FALLBACK_POIS[cat]
  if (cat === 'bares') {
    return filterPoisWithinWalkingMinutes(raw, MAP_LAT, MAP_LON, MAX_WALK_MINUTES_BARES)
  }
  return raw
}

function googleDirOriginTextToAmbar(originAddress: string) {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originAddress)}&destination=${encodeURIComponent(EMPREENDIMENTO_ADDRESS)}&travelmode=driving`
}

function getCurrentPositionAsync(options: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

function geoSecureContextBlockedMessage(): string | null {
  if (typeof window === 'undefined') return null
  if (window.isSecureContext) return null
  return (
    'O navegador só permite pedir a sua localização em páginas seguras (HTTPS).\n\n' +
    'Se estiver a abrir o site por HTTP ou por um endereço IP na rede local, o pedido de autorização nem sequer aparece — use https:// ou introduza o endereço em texto em baixo.'
  )
}

function geoDeniedUserMessage(): string {
  return (
    'A localização está bloqueada ou foi recusada para este site, por isso o navegador não mostra o pedido de autorização.\n\n' +
    'Chrome / Edge: ícone à esquerda do endereço (cadeado ou informações) → Definições do site ou Permissões → Localização → Permitir.\n' +
    'Safari (Mac): Safari → Definições para [este site] → Localização → Permitir.\n' +
    'iPhone: Ajustes → Safari → Localização, ou Ajustes → Privacidade e segurança → Serviços de localização.\n\n' +
    'Guarde as alterações, recarregue a página e tente de novo — ou use o campo de endereço em texto.'
  )
}

function geoErrorMessage(err: GeolocationPositionError): string {
  if (err.code === err.PERMISSION_DENIED) return geoDeniedUserMessage()
  if (err.code === err.POSITION_UNAVAILABLE) {
    return 'Não foi possível obter a posição neste momento. Tente noutra rede ou use um endereço em texto.'
  }
  return 'O pedido de localização demorou demasiado. Tente outra vez ou use um endereço em texto.'
}

type RouteSummary = {
  distanceM: number
  durationS: number
  modeLabel: string
}

export default function Localizacao() {
  const [filtro, setFiltro] = useState<CategoriaLocalizacao>('mercados')
  const [pois, setPois] = useState<OsmPoi[]>([])
  const [loadingPois, setLoadingPois] = useState(true)
  const [routeDialogOpen, setRouteDialogOpen] = useState(false)
  const [typedOrigin, setTypedOrigin] = useState('')
  const [routePolyline, setRoutePolyline] = useState<[number, number][] | null>(null)
  const [routeOrigin, setRouteOrigin] = useState<{ lat: number; lng: number } | null>(null)
  const [routeSummary, setRouteSummary] = useState<RouteSummary | null>(null)
  const [calculatingRoute, setCalculatingRoute] = useState(false)
  const routeAbortRef = useRef<AbortController | null>(null)
  const [hoveredPoi, setHoveredPoi] = useState<string | null>(null)

  const travelMode = filtro === 'bares' ? ('walking' as const) : ('driving' as const)

  const listaLateral = useMemo(() => pois.slice(0, LISTA_LATERAL_MAX), [pois])
  const totalPins = pois.length

  useEffect(() => {
    const ac = new AbortController()
    let alive = true
    setLoadingPois(true)
    setPois([])
    fetchNearbyPois(filtro, MAP_LAT, MAP_LON, ac.signal)
      .then((data) => {
        if (!alive) return
        if (data.length > 0) setPois(data)
        else setPois(fallbackPoisForCategory(filtro))
      })
      .catch(() => {
        if (!alive) return
        setPois(fallbackPoisForCategory(filtro))
      })
      .finally(() => {
        if (alive) setLoadingPois(false)
      })
    return () => {
      alive = false
      ac.abort()
    }
  }, [filtro])

  const clearOsrmRoute = useCallback(() => {
    setRoutePolyline(null)
    setRouteOrigin(null)
    setRouteSummary(null)
  }, [])

  useEffect(() => {
    clearOsrmRoute()
  }, [filtro, clearOsrmRoute])

  const applyRoute = (
    route: Awaited<ReturnType<typeof fetchOsrmRoute>>,
    origin: { lat: number; lng: number },
    modeLabel: string,
  ) => {
    setRoutePolyline(route.coordinatesLatLng)
    setRouteOrigin(origin)
    setRouteSummary({
      distanceM: route.distanceM,
      durationS: route.durationS,
      modeLabel,
    })
  }

  const runOsrmFromPoint = async (lat: number, lng: number, ac: AbortSignal) => {
    const route = await fetchOsrmRoute('driving', lng, lat, MAP_LON, MAP_LAT, ac)
    applyRoute(route, { lat, lng }, 'carro')
  }

  const loadRouteOnMapFromPoi = useCallback(
    async (poi: OsmPoi) => {
      routeAbortRef.current?.abort()
      const ac = new AbortController()
      routeAbortRef.current = ac
      setCalculatingRoute(true)
      try {
        const profile = travelMode === 'walking' ? 'foot' : 'driving'
        const route = await fetchOsrmRoute(profile, poi.lng, poi.lat, MAP_LON, MAP_LAT, ac.signal)
        const modePt = profile === 'foot' ? 'a pé' : 'carro'
        applyRoute(route, { lat: poi.lat, lng: poi.lng }, modePt)
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return
        const msg = e instanceof Error ? e.message : 'Erro desconhecido.'
        window.alert(`Não foi possível traçar a rota no mapa. ${msg}`)
      } finally {
        setCalculatingRoute(false)
      }
    },
    [travelMode],
  )

  const showRouteFromTypedAddress = async () => {
    const trimmed = typedOrigin.trim()
    if (!trimmed) {
      window.alert('Digite um endereço ou ponto de partida, ou use a sua localização.')
      return
    }
    routeAbortRef.current?.abort()
    const ac = new AbortController()
    routeAbortRef.current = ac
    setCalculatingRoute(true)
    try {
      const pt = await geocodeAddress(trimmed, ac.signal)
      if (!pt) {
        window.alert(
          'Não encontrámos esse endereço. Tente com mais detalhe (rua, número, bairro, Curitiba).',
        )
        return
      }
      await runOsrmFromPoint(pt.lat, pt.lng, ac.signal)
      setRouteDialogOpen(false)
      setTypedOrigin('')
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return
      const msg = e instanceof Error ? e.message : 'Erro desconhecido.'
      window.alert(`Não foi possível calcular a rota. ${msg}`)
    } finally {
      setCalculatingRoute(false)
    }
  }

  const showRouteFromGeolocation = () => {
    void (async () => {
      if (!navigator.geolocation) {
        window.alert('O seu navegador não suporta localização.')
        return
      }

      const insecureMsg = geoSecureContextBlockedMessage()
      if (insecureMsg) {
        window.alert(insecureMsg)
        return
      }

      routeAbortRef.current?.abort()
      const ac = new AbortController()
      routeAbortRef.current = ac
      setCalculatingRoute(true)

      try {
        let pos: GeolocationPosition
        try {
          pos = await getCurrentPositionAsync({
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: 18_000,
          })
        } catch (first) {
          const err = first as GeolocationPositionError
          if (
            typeof err?.code === 'number' &&
            (err.code === err.TIMEOUT || err.code === err.POSITION_UNAVAILABLE)
          ) {
            pos = await getCurrentPositionAsync({
              enableHighAccuracy: true,
              maximumAge: 0,
              timeout: 25_000,
            })
          } else {
            throw first
          }
        }

        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        try {
          await runOsrmFromPoint(lat, lng, ac.signal)
          setRouteDialogOpen(false)
          setTypedOrigin('')
        } catch (e) {
          if (e instanceof DOMException && e.name === 'AbortError') return
          const msg = e instanceof Error ? e.message : 'Erro desconhecido.'
          window.alert(`Não foi possível calcular a rota. ${msg}`)
        }
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return
        const err = e as GeolocationPositionError
        if (typeof err?.code === 'number') {
          window.alert(geoErrorMessage(err))
        } else {
          window.alert(
            'Não foi possível obter a sua localização. Tente de novo ou use um endereço em texto.',
          )
        }
      } finally {
        setCalculatingRoute(false)
      }
    })()
  }

  const openGoogleRouteFromTypedAddress = () => {
    const trimmed = typedOrigin.trim()
    if (!trimmed) {
      window.alert('Digite um endereço para abrir no Google Maps.')
      return
    }
    window.open(googleDirOriginTextToAmbar(trimmed), '_blank', 'noopener,noreferrer')
  }

  const filtroAtual = FILTROS.find((f) => f.id === filtro)!

  return (
    <section
      id="localizacao"
      className="bg-ambar-cream py-[33px] pb-20"
      data-node-id="334:169"
    >
      <div className="container-ambar">
        <h2 className="heading-section text-ambar-terracotta mb-4">LOCALIZAÇÃO</h2>

        <p className="mb-6 max-w-3xl font-ui text-[15px] md:text-[17px] leading-relaxed text-ambar-gray">
          <span className="font-bold text-ambar-navy">Rua Palmeiras, 691</span>
          {' — '}
          Água Verde — Curitiba/PR — CEP 80620-110
        </p>

        <div className="grid items-start gap-6 md:gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.65fr)] lg:items-start lg:gap-8">
          <div className="flex min-w-0 flex-col gap-2">
            <div
              className="relative w-full min-h-0 overflow-hidden rounded-[14px] border border-ambar-navy/25 bg-ambar-cream/40 shadow-[0px_4px_11px_0px_rgba(0,45,79,0.1)]"
              style={{ height: MAP_BOX_HEIGHT }}
            >
              <LocalizacaoMapLeaflet
                places={pois}
                travelMode={travelMode}
                addressLines={ADDRESS_LINES}
                routePolyline={routePolyline}
                routeOrigin={routeOrigin}
                onClearRoute={clearOsrmRoute}
                onRouteFromPoi={(poi) => void loadRouteOnMapFromPoi(poi)}
                routeBusy={calculatingRoute}
              />
            </div>
            {routeSummary && (
              <div
                role="status"
                aria-live="polite"
                className="font-ui rounded-xl border border-ambar-navy/20 bg-white/80 px-4 py-3 shadow-[0_2px_12px_rgba(0,45,79,0.08)] backdrop-blur-[2px]"
              >
                <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-ambar-navy/70 md:text-left">
                  Rota até o Âmbar
                </p>
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
                  <div className="flex flex-1 flex-wrap items-end justify-center gap-4 sm:justify-start sm:gap-6">
                    <div className="min-w-[7rem] text-center sm:text-left">
                      <p className="mb-0.5 text-[11px] font-medium text-ambar-gray">Distância</p>
                      <p className="text-[1.65rem] font-bold leading-none tracking-tight text-ambar-navy tabular-nums md:text-[1.85rem]">
                        {formatOsrmDistance(routeSummary.distanceM)}
                      </p>
                    </div>
                    <div
                      className="hidden h-12 w-px shrink-0 bg-ambar-navy/15 sm:block"
                      aria-hidden
                    />
                    <div className="min-w-[7rem] text-center sm:text-left">
                      <p className="mb-0.5 text-[11px] font-medium text-ambar-gray">Tempo estimado</p>
                      <p className="text-[1.65rem] font-bold leading-none tracking-tight text-ambar-terracotta tabular-nums md:text-[1.85rem]">
                        {formatOsrmDuration(routeSummary.durationS)}
                      </p>
                    </div>
                  </div>
                  <p className="text-center text-[11px] text-ambar-gray sm:max-w-[11rem] sm:text-right">
                    Trajeto de {routeSummary.modeLabel}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex min-h-0 w-full max-w-[440px] flex-col gap-2.5 lg:max-w-none lg:h-[clamp(260px,_48vw,_440px)] lg:min-h-0">
            <div className="shrink-0">
              <p className="mb-2 text-center font-ui text-[11px] font-semibold uppercase tracking-[0.12em] text-ambar-navy/80">
                Perto do Âmbar
              </p>
              <div
                role="tablist"
                aria-label="Tipo de estabelecimento"
                className="flex flex-wrap justify-center gap-1.5 rounded-full border border-ambar-gray/20 bg-white/45 p-1 shadow-sm backdrop-blur-[2px]"
              >
                {FILTROS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={filtro === f.id}
                    onClick={() => {
                      setFiltro(f.id)
                      setTypedOrigin('')
                    }}
                    className={[
                      'rounded-full px-3.5 py-2 font-ui text-[12px] font-medium transition-all md:px-4',
                      filtro === f.id
                        ? 'bg-ambar-navy text-ambar-cream shadow-sm ring-1 ring-ambar-navy/30'
                        : 'text-ambar-gray hover:bg-white/90 hover:text-ambar-navy',
                    ].join(' ')}
                  >
                    <span className="md:hidden">{f.short}</span>
                    <span className="hidden md:inline">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[12px] border border-ambar-gray/20 bg-white/55 shadow-[0px_4px_11px_0px_rgba(0,0,0,0.05)]">
              <div className="flex shrink-0 items-center justify-between border-b border-ambar-gray/15 bg-ambar-cream/80 px-3 py-2">
                <span className="font-ui text-[12px] font-semibold text-ambar-navy">
                  {filtroAtual.label}
                </span>
                {loadingPois ? (
                  <span className="font-ui text-[11px] text-ambar-gray">A carregar…</span>
                ) : (
                  <span className="font-ui text-[11px] text-ambar-gray">
                    {totalPins} {totalPins === 1 ? 'local' : 'locais'}
                  </span>
                )}
              </div>

              <ul className="scrollbar-thin min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
                {listaLateral.map((poi) => {
                  const active = hoveredPoi === poi.id
                  return (
                    <li
                      key={poi.id}
                      className={[
                        'border-b border-ambar-gray/15 px-3 py-2.5 last:border-b-0 transition-colors',
                        active ? 'border-ambar-navy/40 bg-[#ebd8b6]/90' : 'hover:bg-ambar-cream/40',
                      ].join(' ')}
                      onMouseEnter={() => setHoveredPoi(poi.id)}
                      onMouseLeave={() => setHoveredPoi(null)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-ui text-[14px] font-semibold leading-snug text-ambar-gray line-clamp-2">
                            {poi.nome}
                          </p>
                          <p className="mt-0.5 font-ui text-[12px] text-ambar-gray/90">{poi.tempo}</p>
                        </div>
                        <div className="flex shrink-0 flex-col">
                          <button
                            type="button"
                            disabled={calculatingRoute}
                            onClick={() => void loadRouteOnMapFromPoi(poi)}
                            className="rounded border border-ambar-navy/35 bg-ambar-navy/8 px-2 py-1 text-center font-ui text-[11px] font-semibold uppercase tracking-wide text-ambar-navy hover:bg-ambar-navy/15 disabled:opacity-50"
                          >
                            Mapa
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>

              {totalPins > LISTA_LATERAL_MAX && !loadingPois && (
                <p className="shrink-0 border-t border-ambar-gray/10 bg-ambar-cream/50 px-3 py-2 font-ui text-[10px] leading-snug text-ambar-gray">
                  +{totalPins - LISTA_LATERAL_MAX} no mapa — use <strong>Mapa</strong> ou o marcador para
                  ver a rota aqui.
                </p>
              )}
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={() => setRouteDialogOpen(true)}
                className="w-full rounded-[6px] border border-ambar-gray/45 bg-white/50 px-4 py-2.5 font-ui text-[14px] font-medium text-ambar-gray shadow-sm transition-colors hover:border-ambar-navy/30 hover:bg-white/90 hover:text-ambar-navy"
              >
                Rota a partir de um endereço
              </button>
            </div>
          </div>
        </div>
      </div>

      {routeDialogOpen && (
        <div
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="route-dialog-title"
          onClick={() => {
            routeAbortRef.current?.abort()
            setRouteDialogOpen(false)
            setTypedOrigin('')
            setCalculatingRoute(false)
          }}
        >
          <div
            className="w-full max-w-md rounded-[14px] bg-ambar-cream p-6 shadow-xl border border-ambar-gray/20"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="route-dialog-title" className="font-ui font-bold text-lg text-ambar-navy mb-4">
              Rota até o Âmbar
            </h3>
            <button
              type="button"
              disabled={calculatingRoute}
              onClick={() => void showRouteFromGeolocation()}
              className="mb-3 w-full rounded-md border border-ambar-navy/35 bg-ambar-navy/10 px-3 py-2.5 font-ui text-sm font-semibold text-ambar-navy hover:bg-ambar-navy/15 disabled:opacity-50"
            >
              {calculatingRoute ? 'A calcular…' : 'Usar minha localização'}
            </button>
            <label htmlFor="route-origin" className="sr-only">
              Origem (endereço)
            </label>
            <input
              id="route-origin"
              type="text"
              value={typedOrigin}
              onChange={(e) => setTypedOrigin(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  void showRouteFromTypedAddress()
                }
              }}
              placeholder="Ex.: Batel, Curitiba ou Rua XV de Novembro, 129"
              className="mb-3 w-full rounded-md border border-ambar-gray/40 bg-white px-3 py-2 font-ui text-sm text-ambar-ink"
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
              <button
                type="button"
                disabled={calculatingRoute}
                onClick={() => {
                  routeAbortRef.current?.abort()
                  setRouteDialogOpen(false)
                  setTypedOrigin('')
                  setCalculatingRoute(false)
                }}
                className="rounded-md px-4 py-2 font-ui text-sm text-ambar-gray hover:bg-black/5 disabled:opacity-50 sm:order-1"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={calculatingRoute}
                onClick={() => void showRouteFromTypedAddress()}
                className="rounded-md border border-ambar-terracotta bg-ambar-terracotta/90 px-4 py-2 font-ui text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
              >
                {calculatingRoute ? 'A calcular…' : 'Mostrar rota no mapa'}
              </button>
            </div>
            {typedOrigin.trim() && (
              <p className="mt-4 font-ui text-xs text-ambar-gray">
                Preferir o Google?{' '}
                <button
                  type="button"
                  className="text-ambar-rose underline hover:no-underline"
                  onClick={openGoogleRouteFromTypedAddress}
                >
                  Abrir mesma origem no Google Maps
                </button>
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
