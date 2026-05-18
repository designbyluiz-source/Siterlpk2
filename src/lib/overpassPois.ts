export type CategoriaLocalizacao = 'mercados' | 'farmacias' | 'bares'

export type OsmPoi = {
  id: string
  nome: string
  lat: number
  lng: number
  tempo: string
  /** Presente em resultados de bares — usado para misturar tipos na listagem */
  amenity?: string
}

const R_METERS = 950

/**
 * Mesmo domínio primeiro (/api/overpass) — proxied em dev (Vite) e em vários hosts (ex.: vercel.json).
 * Depois mirrors públicos se o primeiro falhar ou for bloqueado.
 */
export function overpassInterpreterUrls(): string[] {
  if (typeof window === 'undefined') {
    return ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter']
  }
  return [
    '/api/overpass',
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
  ]
}

async function postOverpass(
  interpreterUrl: string,
  ql: string,
  signal?: AbortSignal,
): Promise<Response> {
  return fetch(interpreterUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: `data=${encodeURIComponent(ql)}`,
    signal,
  })
}

/**
 * Fragmentos no nome (sem acento, minúsculas) excluídos só em «mercados».
 * Evita destacar um supermercado específico próximo mantendo os demais.
 */
const MERCADOS_NOME_EXCLUIR_SUBSTR: readonly string[] = ['miramar']

function normalizeNomeParaFiltro(nome: string): string {
  return nome
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
}

function mercadoNomeExcluido(nome: string): boolean {
  const n = normalizeNomeParaFiltro(nome)
  return MERCADOS_NOME_EXCLUIR_SUBSTR.some((frag) => n.includes(frag))
}

/** Bares/cafés: não listar locais com mais de N minutos a pé (mesma fórmula que `tempoEstimado`). */
export const MAX_WALK_MINUTES_BARES = 8

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (d: number) => (d * Math.PI) / 180
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}

function estimatedTravelMinutes(distanceKm: number, mode: 'walk' | 'drive'): number {
  const kmH = mode === 'walk' ? 4.5 : 26
  return Math.max(1, Math.round((distanceKm / kmH) * 60))
}

function tempoEstimado(distanceKm: number, mode: 'walk' | 'drive'): string {
  const min = estimatedTravelMinutes(distanceKm, mode)
  return `≈ ${min} min ${mode === 'walk' ? 'a pé' : 'de carro'}`
}

function nomeFallbackBares(amenity?: string): string {
  switch (amenity) {
    case 'bar':
      return 'Bar'
    case 'pub':
      return 'Pub'
    case 'cafe':
      return 'Café'
    case 'nightclub':
      return 'Night club'
    case 'biergarten':
      return 'Biergarten'
    case 'karaoke_box':
      return 'Karaokê'
    default:
      return 'Bar / café'
  }
}

/** Mistura bares, pubs, cafés, etc., para a lista não ficar só com o tipo mais denso no OSM (ex.: cafés). */
function diverseBaresSlice(sorted: OsmPoi[], max: number): OsmPoi[] {
  const priority = ['bar', 'pub', 'nightclub', 'biergarten', 'cafe', 'karaoke_box'] as const
  const prioritySet = new Set<string>(priority)
  const buckets = new Map<string, OsmPoi[]>()
  for (const key of priority) buckets.set(key, [])
  buckets.set('outro', [])

  for (const p of sorted) {
    const a = p.amenity
    const k = a && prioritySet.has(a) ? a : 'outro'
    buckets.get(k)!.push(p)
  }

  const out: OsmPoi[] = []
  const seen = new Set<string>()
  const coordKey = (p: OsmPoi) => `${p.lat.toFixed(5)},${p.lng.toFixed(5)}`
  const order = [...priority, 'outro'] as const

  while (out.length < max) {
    let addedRound = false
    for (const key of order) {
      if (out.length >= max) break
      const list = buckets.get(key)
      while (list && list.length > 0) {
        const p = list.shift()!
        const ck = coordKey(p)
        if (seen.has(ck)) continue
        seen.add(ck)
        out.push(p)
        addedRound = true
        break
      }
    }
    if (!addedRound) break
  }
  return out
}

function overpassQuery(cat: CategoriaLocalizacao, lat: number, lon: number): string {
  const a = `around:${R_METERS},${lat},${lon}`
  const head = '[out:json][timeout:25];\n(\n'
  const foot = ');\nout center;\n'
  switch (cat) {
    case 'mercados':
      return `${head}
  node["shop"="supermarket"](${a});
  way["shop"="supermarket"](${a});
  node["shop"="convenience"](${a});
  way["shop"="convenience"](${a});
${foot}`
    case 'farmacias':
      return `${head}
  node["amenity"="pharmacy"](${a});
  way["amenity"="pharmacy"](${a});
${foot}`
    case 'bares':
      return `${head}
  node["amenity"="bar"](${a});
  way["amenity"="bar"](${a});
  node["amenity"="pub"](${a});
  way["amenity"="pub"](${a});
  node["amenity"="cafe"](${a});
  way["amenity"="cafe"](${a});
  node["amenity"="nightclub"](${a});
  way["amenity"="nightclub"](${a});
  node["amenity"="biergarten"](${a});
  way["amenity"="biergarten"](${a});
  node["amenity"="karaoke_box"](${a});
  way["amenity"="karaoke_box"](${a});
${foot}`
  }
}

export type OverpassElement = {
  type: string
  id: number
  lat?: number
  lon?: number
  center?: { lat: number; lon: number }
  tags?: Record<string, string>
}

async function fetchOverpassJson(
  ql: string,
  signal?: AbortSignal,
): Promise<{ elements?: OverpassElement[] }> {
  const urls = overpassInterpreterUrls()
  let lastErr: unknown
  for (const url of urls) {
    try {
      const res = await postOverpass(url, ql, signal)
      if (!res.ok) {
        lastErr = new Error(`Overpass ${res.status} (${url})`)
        continue
      }
      return (await res.json()) as { elements?: OverpassElement[] }
    } catch (e) {
      lastErr = e
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('Overpass indisponível')
}

export async function fetchNearbyPois(
  category: CategoriaLocalizacao,
  originLat: number,
  originLon: number,
  signal?: AbortSignal,
): Promise<OsmPoi[]> {
  const q = overpassQuery(category, originLat, originLon)
  const json = await fetchOverpassJson(q, signal)
  const mode: 'walk' | 'drive' = category === 'bares' ? 'walk' : 'drive'
  const rows: OsmPoi[] = []
  for (const el of json.elements ?? []) {
    const lat = el.lat ?? el.center?.lat
    const lon = el.lon ?? el.center?.lon
    if (lat == null || lon == null) continue
    const amenity = el.tags?.amenity
    const nome =
      el.tags?.name ??
      el.tags?.brand ??
      el.tags?.operator ??
      (category === 'mercados'
        ? 'Mercado'
        : category === 'farmacias'
          ? 'Farmácia'
          : nomeFallbackBares(amenity))
    const d = haversineKm(originLat, originLon, lat, lon)
    if (category === 'bares' && estimatedTravelMinutes(d, 'walk') > MAX_WALK_MINUTES_BARES) continue
    if (category === 'mercados' && mercadoNomeExcluido(nome)) continue
    rows.push({
      id: `${el.type[0]}${el.id}`,
      nome,
      lat,
      lng: lon,
      tempo: tempoEstimado(d, mode),
      ...(category === 'bares' ? { amenity } : {}),
    })
  }
  rows.sort((p, q) => {
    const da = haversineKm(originLat, originLon, p.lat, p.lng)
    const db = haversineKm(originLat, originLon, q.lat, q.lng)
    return da - db
  })
  const seen = new Set<string>()
  const deduped: OsmPoi[] = []
  const poolMax = category === 'bares' ? 48 : 8
  for (const r of rows) {
    const k = `${r.lat.toFixed(5)},${r.lng.toFixed(5)}`
    if (seen.has(k)) continue
    seen.add(k)
    deduped.push(r)
    if (deduped.length >= poolMax) break
  }
  if (category === 'bares') {
    return diverseBaresSlice(deduped, 8)
  }
  return deduped.slice(0, 8)
}

/** Listas estáticas / fallback: mantém só POIs até `maxMinutes` a pé do ponto de referência. */
export function filterPoisWithinWalkingMinutes(
  pois: OsmPoi[],
  originLat: number,
  originLon: number,
  maxMinutes: number,
): OsmPoi[] {
  return pois.filter((p) => {
    const d = haversineKm(originLat, originLon, p.lat, p.lng)
    return estimatedTravelMinutes(d, 'walk') <= maxMinutes
  })
}
