/**
 * Geocoding no browser: Photon (CORS permissivo) + rota OSRM pública.
 * Photon não aceita lang=pt — usar lang=en ou omitir lang.
 */

const PHOTON_API = 'https://photon.komoot.io/api'
/** bbox Photon: minLon, minLat, maxLon, maxLat — Curitiba */
const PHOTON_BBOX_CURITIBA = '-49.45,-25.62,-49.05,-25.35'

const OSRM_BASE = 'https://router.project-osrm.org/route/v1'

export type OsrmProfile = 'driving' | 'foot'

export type OsrmRouteResult = {
  coordinatesLatLng: [number, number][]
  distanceM: number
  durationS: number
}

function parsePhotonPoint(data: {
  features?: Array<{ geometry?: { type?: string; coordinates?: unknown } }>
}): { lat: number; lng: number } | null {
  const geom = data.features?.[0]?.geometry
  if (!geom || geom.type !== 'Point' || !Array.isArray(geom.coordinates)) return null
  const c = geom.coordinates as [number, number]
  if (c.length < 2) return null
  const [lng, lat] = c
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null
  return { lat, lng }
}

/** Uma chamada ao Photon; HTTP não OK → null (sem lançar), para permitir fallbacks. */
async function photonSearchOnce(
  params: URLSearchParams,
  signal?: AbortSignal,
): Promise<{ lat: number; lng: number } | null> {
  const url = `${PHOTON_API}/?${params.toString()}`
  const res = await fetch(url, { signal })
  if (!res.ok) return null
  const data = (await res.json()) as {
    features?: Array<{ geometry?: { type?: string; coordinates?: unknown } }>
  }
  return parsePhotonPoint(data)
}

/**
 * Photon devolve 400 com alguns parâmetros (ex.: bbox inválido ou combinações rejeitadas).
 * Tentamos várias combinações antes de desistir.
 */
export async function geocodeAddress(
  query: string,
  signal?: AbortSignal,
): Promise<{ lat: number; lng: number } | null> {
  const q = query.trim()
  if (!q) return null

  const buildParams = (withBbox: boolean, withLang: boolean) => {
    const p = new URLSearchParams({ q, limit: '1' })
    if (withLang) p.set('lang', 'en')
    if (withBbox) p.set('bbox', PHOTON_BBOX_CURITIBA)
    return p
  }

  const attempts = [
    buildParams(true, true),
    buildParams(false, true),
    buildParams(true, false),
    buildParams(false, false),
  ]

  for (const params of attempts) {
    const pt = await photonSearchOnce(params, signal)
    if (pt) return pt
  }
  return null
}

export async function fetchOsrmRoute(
  profile: OsrmProfile,
  fromLng: number,
  fromLat: number,
  toLng: number,
  toLat: number,
  signal?: AbortSignal,
): Promise<OsrmRouteResult> {
  const path = `${fromLng},${fromLat};${toLng},${toLat}`
  const url = `${OSRM_BASE}/${profile}/${path}?overview=full&geometries=geojson&steps=false`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`OSRM ${res.status}`)
  const data = (await res.json()) as {
    code?: string
    routes?: Array<{
      geometry?: { coordinates?: [number, number][] }
      distance?: number
      duration?: number
    }>
  }
  if (data.code !== 'Ok' || !data.routes?.[0]) {
    throw new Error(
      data.code === 'NoRoute'
        ? `Sem rota (${profile}) entre estes pontos.`
        : 'Resposta OSRM inválida.',
    )
  }
  const coords = data.routes[0].geometry?.coordinates
  if (!coords?.length) throw new Error('Geometria da rota vazia.')
  const coordinatesLatLng: [number, number][] = coords.map(([lng, lat]) => [lat, lng])
  return {
    coordinatesLatLng,
    distanceM: data.routes[0].distance ?? 0,
    durationS: data.routes[0].duration ?? 0,
  }
}

export function formatOsrmDuration(seconds: number): string {
  const m = Math.round(seconds / 60)
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60)
  const rest = m % 60
  return `${h} h ${rest} min`
}

export function formatOsrmDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`
  return `${(meters / 1000).toFixed(1)} km`
}
