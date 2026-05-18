/**
 * Renders AOI Tatemono — pasta `drive-download-*` (11 imagens únicas no site).
 * Ordem: Image1, Image10, Image12…18, RPLK 1 (1) 2, Quarto 1, Quarto 2.
 */
const BASE = '/empreendimentos/tatemono/drive'

export const TATEMONO_DRIVE_IMAGES = [
  `${BASE}/01.png`,
  `${BASE}/02.png`,
  `${BASE}/03.png`,
  `${BASE}/04.png`,
  `${BASE}/05.png`,
  `${BASE}/06.png`,
  `${BASE}/07.png`,
  `${BASE}/08.png`,
  `${BASE}/09.png`,
  `${BASE}/10.png`,
  `${BASE}/11.png`,
] as const

/** Hero em ecrã inteiro */
export const tatemonoHeroSrc = TATEMONO_DRIVE_IMAGES[0]

/**
 * Galeria: oito renders após o hero (02–09.png), sem repetir a capa nem 10.png (quarto 1).
 * O ficheiro 11.png mantém-se só no banner “Interiores” (também abre no lightbox).
 */
export const tatemonoGaleriaSrcs = TATEMONO_DRIVE_IMAGES.slice(1, 9)

/** Conjunto para tela cheia: capa + galeria + interiores (exclui 10.png). */
export const tatemonoLightboxImages: readonly string[] = [
  TATEMONO_DRIVE_IMAGES[0],
  ...TATEMONO_DRIVE_IMAGES.slice(1, 9),
  TATEMONO_DRIVE_IMAGES[10],
]

/** Índice no lightbox da foto do banner Interiores (última). */
export const tatemonoLightboxInteriorIndex = tatemonoLightboxImages.length - 1

/** Destaque da secção Interiores (último render — quarto 2). */
export const tatemonoInteriorBannerSrc = TATEMONO_DRIVE_IMAGES[10] as string
