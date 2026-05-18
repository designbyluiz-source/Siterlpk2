import type { CategoriaLocalizacao, OsmPoi } from './overpassPois'

const PREFIX = 'ambar:pois:'
const SCHEMA = 'v1'
const TTL_MS = 4 * 60 * 60 * 1000 // 4h

type Wrapped = {
  expires: number
  pois: OsmPoi[]
}

function key(cat: CategoriaLocalizacao) {
  return `${PREFIX}${SCHEMA}:${cat}`
}

export function loadPoisFromSession(cat: CategoriaLocalizacao): OsmPoi[] | null {
  try {
    const raw = sessionStorage.getItem(key(cat))
    if (!raw) return null
    const w = JSON.parse(raw) as Wrapped
    if (!w || typeof w.expires !== 'number' || !Array.isArray(w.pois)) return null
    if (Date.now() > w.expires) {
      sessionStorage.removeItem(key(cat))
      return null
    }
    return w.pois
  } catch {
    return null
  }
}

export function savePoisToSession(cat: CategoriaLocalizacao, pois: OsmPoi[]) {
  try {
    const w: Wrapped = { expires: Date.now() + TTL_MS, pois }
    sessionStorage.setItem(key(cat), JSON.stringify(w))
  } catch {
    /* quota / private mode */
  }
}

export function clearPoisSessionCache(cat?: CategoriaLocalizacao) {
  try {
    if (cat) {
      sessionStorage.removeItem(key(cat))
      return
    }
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const k = sessionStorage.key(i)
      if (k?.startsWith(PREFIX)) sessionStorage.removeItem(k)
    }
  } catch {
    /* noop */
  }
}
