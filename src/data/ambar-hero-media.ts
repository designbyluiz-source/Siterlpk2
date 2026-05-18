import { ASSETS } from '../assets/figma'

/** Fotos do Âmbar para rodar na hero junto ao vídeo (sem plantas/logo/mapa). */
const RAW_PHOTOS: readonly { src: string; alt: string }[] = [
  { src: ASSETS.heroBg, alt: 'Âmbar — vista do empreendimento' },
  { src: ASSETS.sobreBuilding, alt: 'Âmbar — fachada' },
  { src: ASSETS.sobreThumb1, alt: 'Âmbar — ambiente' },
  { src: ASSETS.sobreThumb2, alt: 'Âmbar — área comum' },
  { src: ASSETS.sobreThumb3, alt: 'Âmbar — detalhe arquitetônico' },
  { src: ASSETS.sobreThumb4, alt: 'Âmbar — espaço interno' },
  { src: ASSETS.areasComunsRight, alt: 'Âmbar — área comum' },
  { src: ASSETS.decoradosBg, alt: 'Âmbar — ambiente decorado' },
  { src: ASSETS.footerBg, alt: 'Âmbar — vista' },
  { src: '/areas-comuns/coliving.jpg', alt: 'Coliving — Âmbar' },
  { src: '/areas-comuns/hall.jpg', alt: 'Hall de entrada — Âmbar' },
  { src: '/areas-comuns/coworking.jpg', alt: 'Coworking — Âmbar' },
  { src: '/areas-comuns/gourmet.jpg', alt: 'Espaço gourmet — Âmbar' },
  { src: '/areas-comuns/piscina-01.jpg', alt: 'Piscina — Âmbar' },
  { src: '/areas-comuns/piscina-02.jpg', alt: 'Piscina — Âmbar' },
  { src: '/decorados/ap-309.jpg', alt: 'Apartamento decorado 309 — Âmbar' },
  { src: '/decorados/ap-501.jpg', alt: 'Apartamento decorado 501 — Âmbar' },
  { src: '/decorados/ap-503.jpg', alt: 'Apartamento decorado 503 — Âmbar' },
]

function dedupeBySrc(photos: readonly { src: string; alt: string }[]): { src: string; alt: string }[] {
  const seen = new Set<string>()
  return photos.filter((p) => {
    if (seen.has(p.src)) return false
    seen.add(p.src)
    return true
  })
}

export const AMBAR_HERO_PHOTOS = dedupeBySrc(RAW_PHOTOS)
