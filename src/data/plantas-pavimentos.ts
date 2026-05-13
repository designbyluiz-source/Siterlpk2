/** Hitbox em % do container do mapa (0–100), relativo à planta completa. */
export type HitboxPct = {
  left: number
  top: number
  width: number
  height: number
}

/** Estado comercial da unidade no mapa interativo. */
export type DisponibilidadeUnidade = 'disponivel' | 'vendido' | 'reservado'

export type UnidadePlanta = {
  numero: string
  tipologia: string
  area: string
  /** Omite ou `disponivel` = disponível para comercialização. */
  disponibilidade?: DisponibilidadeUnidade
  temDecorado: boolean
  plantaSrc: string
  destaqueSrc: string
  hitbox: HitboxPct
  /**
   * Empilhamento no mapa (maior = recebe o ponteiro primeiro).
   * Útil quando a unidade central é estreita e as hitboxes vizinhas se tocam.
   */
  mapZIndex?: number
}

export type PavimentoPlantaData = {
  id: string
  mapaCompleta: string
  /** Largura e altura em px da imagem base (para aspect-ratio). */
  mapAspect: readonly [number, number]
  unidades: UnidadePlanta[]
}

import { formatAreaPrivativaM2, getPlantaUnidadeCatalogRow } from './plantas-unidades-catalog'

const BASE_2 = '/plantas/segundo-andar'
const BASE_TERREO = '/plantas/terreo'
const BASE_34 = '/plantas/terceiro-quarto'
const BASE_5 = '/plantas/quinto'
const BASE_68 = '/plantas/sexto-ao-oitavo'

function catalogKeyUnidade(numero: string): string {
  return numero.split('-')[0] ?? numero
}

function tipologiaEArea(numero: string): { tipologia: string; area: string } {
  const row = getPlantaUnidadeCatalogRow(catalogKeyUnidade(numero))
  if (!row) return { tipologia: '—', area: '—' }
  return { tipologia: row.type, area: formatAreaPrivativaM2(row.internal_area_m2) }
}

/**
 * 2º andar: topo esquerda → direita 201–205; base esquerda → direita 209–206.
 * Hitboxes calibradas na `planta-completa.png` (859×431); ajuste fino se necessário.
 */
export const segundoAndar: PavimentoPlantaData = {
  id: '2',
  mapaCompleta: `${BASE_2}/planta-completa.png`,
  mapAspect: [859, 431],
  unidades: [
    {
      numero: '201',
      ...tipologiaEArea('201'),
      temDecorado: true,
      plantaSrc: `${BASE_2}/201-planta.png`,
      destaqueSrc: `${BASE_2}/201-destaque.png`,
      hitbox: { left: 0, top: 1, width: 16.2, height: 45.5 },
    },
    {
      numero: '202',
      ...tipologiaEArea('202'),
      temDecorado: false,
      plantaSrc: `${BASE_2}/202-planta.png`,
      destaqueSrc: `${BASE_2}/202-destaque.png`,
      hitbox: { left: 16.2, top: 1, width: 12.6, height: 45.5 },
    },
    {
      numero: '203',
      ...tipologiaEArea('203'),
      temDecorado: true,
      plantaSrc: `${BASE_2}/203-planta.png`,
      destaqueSrc: `${BASE_2}/203-destaque.png`,
      hitbox: { left: 28.8, top: 1, width: 25.5, height: 45.5 },
    },
    {
      numero: '204',
      ...tipologiaEArea('204'),
      temDecorado: false,
      plantaSrc: `${BASE_2}/204-planta.png`,
      destaqueSrc: `${BASE_2}/204-destaque.png`,
      hitbox: { left: 54.3, top: 1, width: 12.5, height: 45.5 },
    },
    {
      numero: '205',
      ...tipologiaEArea('205'),
      temDecorado: false,
      plantaSrc: `${BASE_2}/205-planta.png`,
      destaqueSrc: `${BASE_2}/205-destaque.png`,
      hitbox: { left: 66.8, top: 1, width: 33.2, height: 45.5 },
    },
    {
      numero: '209',
      ...tipologiaEArea('209'),
      temDecorado: false,
      plantaSrc: `${BASE_2}/209-planta.png`,
      destaqueSrc: `${BASE_2}/209-destaque.png`,
      hitbox: { left: 0, top: 46.2, width: 24, height: 53 },
    },
    {
      numero: '208',
      ...tipologiaEArea('208'),
      temDecorado: false,
      plantaSrc: `${BASE_2}/208-planta.png`,
      destaqueSrc: `${BASE_2}/208-destaque.png`,
      hitbox: { left: 24, top: 46.2, width: 24.5, height: 53 },
    },
    {
      numero: '207',
      ...tipologiaEArea('207'),
      disponibilidade: 'vendido',
      temDecorado: false,
      plantaSrc: `${BASE_2}/207-planta.png`,
      destaqueSrc: `${BASE_2}/207-destaque.png`,
      hitbox: { left: 48.5, top: 46.2, width: 24.5, height: 53 },
    },
    {
      numero: '206',
      ...tipologiaEArea('206'),
      temDecorado: false,
      plantaSrc: `${BASE_2}/206-planta.png`,
      destaqueSrc: `${BASE_2}/206-destaque.png`,
      hitbox: { left: 73, top: 46.2, width: 27, height: 53 },
    },
  ],
}

/**
 * Térreo: `planta-completa.png` 521×521.
 * Hitboxes calibradas pixel-a-pixel por análise dos `destaques`:
 * para cada unidade, usa-se a região onde o brilho aumenta SÓ nesse `destaque`
 * (g_i > +T && g_j < -T && g_k < -T), com bbox por percentil 2-98% e ~1% de padding.
 * Resultado em px (521×521):
 *   101 → x[174,303] y[27,130]   102 → x[309,373] y[35,172]   103 → x[358,480] y[37,208]
 * As três unidades ficam no quadrante superior; o resto da imagem é paisagismo/decoração.
 * 102 é faixa estreita; mantém `mapZIndex` alto p/ vencer qualquer sobreposição de borda.
 */
export const terreoPavimento: PavimentoPlantaData = {
  id: 'terreo',
  mapaCompleta: `${BASE_TERREO}/planta-completa.png`,
  mapAspect: [521, 521],
  unidades: [
    {
      numero: '101',
      ...tipologiaEArea('101'),
      temDecorado: false,
      plantaSrc: `${BASE_TERREO}/101-planta.png`,
      destaqueSrc: `${BASE_TERREO}/101-destaque.png`,
      hitbox: { left: 32.4, top: 3.8, width: 26.6, height: 23.0 },
    },
    {
      numero: '102',
      ...tipologiaEArea('102'),
      temDecorado: false,
      plantaSrc: `${BASE_TERREO}/102-planta.png`,
      destaqueSrc: `${BASE_TERREO}/102-destaque.png`,
      hitbox: { left: 58.6, top: 5.4, width: 13.8, height: 29.4 },
      mapZIndex: 10,
    },
    {
      numero: '103',
      ...tipologiaEArea('103'),
      temDecorado: false,
      plantaSrc: `${BASE_TERREO}/103-planta.png`,
      destaqueSrc: `${BASE_TERREO}/103-destaque.png`,
      hitbox: { left: 72.4, top: 5.8, width: 22.4, height: 36.0 },
    },
  ],
}

/** 5º: `planta-completa.png` 500×464 — 501/502 no topo; fila inferior 506–505–504–503 (esq.→dir.). */
export const quintoPavimento: PavimentoPlantaData = {
  id: '5',
  mapaCompleta: `${BASE_5}/planta-completa.png`,
  mapAspect: [500, 464],
  unidades: [
    {
      numero: '501',
      ...tipologiaEArea('501'),
      temDecorado: false,
      plantaSrc: `${BASE_5}/501-planta.png`,
      destaqueSrc: `${BASE_5}/501-destaque.png`,
      hitbox: { left: 1.8, top: 19.0, width: 46.5, height: 29.5 },
    },
    {
      numero: '502',
      ...tipologiaEArea('502'),
      temDecorado: false,
      plantaSrc: `${BASE_5}/502-planta.png`,
      destaqueSrc: `${BASE_5}/502-destaque.png`,
      hitbox: { left: 49.0, top: 19.0, width: 47.0, height: 29.5 },
    },
    {
      numero: '506',
      ...tipologiaEArea('506'),
      temDecorado: false,
      plantaSrc: `${BASE_5}/506-planta.png`,
      destaqueSrc: `${BASE_5}/506-destaque.png`,
      hitbox: { left: 1.8, top: 48.6, width: 22.8, height: 31.5 },
    },
    {
      numero: '505',
      ...tipologiaEArea('505'),
      temDecorado: false,
      plantaSrc: `${BASE_5}/505-planta.png`,
      destaqueSrc: `${BASE_5}/505-destaque.png`,
      hitbox: { left: 25.2, top: 48.6, width: 22.8, height: 31.5 },
    },
    {
      numero: '504',
      ...tipologiaEArea('504'),
      temDecorado: false,
      plantaSrc: `${BASE_5}/504-planta.png`,
      destaqueSrc: `${BASE_5}/504-destaque.png`,
      hitbox: { left: 48.6, top: 48.6, width: 22.8, height: 31.5 },
    },
    {
      numero: '503',
      ...tipologiaEArea('503'),
      temDecorado: true,
      plantaSrc: `${BASE_5}/503-planta.png`,
      destaqueSrc: `${BASE_5}/503-destaque.png`,
      hitbox: { left: 72.0, top: 48.6, width: 24.0, height: 31.5 },
    },
  ],
}

/**
 * 3º/4º: hitboxes calibradas pixel-a-pixel a partir de cada `NNN-destaque.png`
 * (`planta-completa.png` é 500×317). Para cada unidade, isolam-se os pixels em que
 * o brilho aumenta SÓ nesse destaque (g_i > +T && demais < −T) e toma-se o bbox
 * por percentil 2–98 %. Fronteiras entre adjacentes ficam no midpoint dos bboxes;
 * topo/base com 0.5–1 % de padding para conforto de hover.
 *
 * Ordem (paralela a `segundoAndar.unidades`):
 *   [0]=301  [1]=302  [2]=303  [3]=304  [4]=305  [5]=309  [6]=308  [7]=307  [8]=306
 *
 * Bbox em px: 301:[26-97,31-191]  302:[84-151,24-154]  303:[158-311,26-98]
 *             304:[316-394,33-150] 305:[398-469,34-193]
 *             309:[26-124,194-293] 308:[133-241,196-288]
 *             307:[251-362,198-288] 306:[367-469,196-292]
 */
const HITBOXES_TERCEIRO_QUARTO: HitboxPct[] = [
  { left: 4.6, top: 8.5, width: 13.6, height: 53.0 },
  { left: 18.2, top: 6.5, width: 12.8, height: 43.5 },
  { left: 31.0, top: 7.0, width: 31.8, height: 25.0 },
  { left: 62.8, top: 9.0, width: 16.5, height: 39.5 },
  { left: 79.3, top: 9.0, width: 15.7, height: 53.0 },
  { left: 4.6, top: 60.5, width: 21.2, height: 33.0 },
  { left: 25.8, top: 61.0, width: 23.5, height: 31.0 },
  { left: 49.3, top: 61.5, width: 23.7, height: 30.5 },
  { left: 73.0, top: 61.0, width: 22.0, height: 32.0 },
]

/** 3º & 4º: uma aba; unidades no formato `301-401` (evita sub-abas). */
const DECORADOS_34 = new Set(['301-401', '303-403', '309-409'])

export const terceiroQuartoPavimento: PavimentoPlantaData = {
  id: '3-4',
  mapaCompleta: `${BASE_34}/planta-completa.png`,
  mapAspect: [500, 317],
  unidades: segundoAndar.unidades.map((ref2, i) => {
    const refN = parseInt(ref2.numero, 10)
    const sufixo = refN % 100
    const n3 = 300 + sufixo
    const n4 = 400 + sufixo
    const numero = `${n3}-${n4}`
    const fk = `${n3}`
    const ta = tipologiaEArea(numero)
    return {
      numero,
      tipologia: ta.tipologia,
      area: ta.area,
      disponibilidade: numero === '307-407' ? 'vendido' : undefined,
      temDecorado: DECORADOS_34.has(numero),
      plantaSrc: `${BASE_34}/${fk}-planta.png`,
      destaqueSrc: `${BASE_34}/${fk}-destaque.png`,
      hitbox: HITBOXES_TERCEIRO_QUARTO[i],
    }
  }),
}

/** Ordem espacial: 601 e 602 ao topo; fila de baixo 606 → 603 (esq. → dir.). */
const SEXTO_OITAVO_SLOTS: readonly { unitDigit: number; fileKey: number; hitbox: HitboxPct }[] = [
  { unitDigit: 1, fileKey: 601, hitbox: { left: 3.5, top: 7.8, width: 45.2, height: 42.5 } },
  { unitDigit: 2, fileKey: 602, hitbox: { left: 49.2, top: 7.8, width: 45.2, height: 42.5 } },
  { unitDigit: 6, fileKey: 606, hitbox: { left: 3.4, top: 51.0, width: 22.4, height: 42.8 } },
  { unitDigit: 5, fileKey: 605, hitbox: { left: 26.25, top: 51.0, width: 22.4, height: 42.8 } },
  { unitDigit: 4, fileKey: 604, hitbox: { left: 49.1, top: 51.0, width: 22.4, height: 42.8 } },
  { unitDigit: 3, fileKey: 603, hitbox: { left: 71.95, top: 51.0, width: 22.4, height: 42.8 } },
]

/** 6º–8º: uma aba; unidades `601-701-801` (tipologia/área iguais nos três pisos no catálogo). */
export const sextoAoOitavoPavimento: PavimentoPlantaData = {
  id: '6-8',
  mapaCompleta: `${BASE_68}/planta-completa.png`,
  mapAspect: [500, 317],
  unidades: SEXTO_OITAVO_SLOTS.map(({ unitDigit, fileKey, hitbox }) => {
    const n6 = 600 + unitDigit
    const n7 = 700 + unitDigit
    const n8 = 800 + unitDigit
    const numero = `${n6}-${n7}-${n8}`
    const fk = `${fileKey}`
    const ta = tipologiaEArea(numero)
    const temDecorado = n6 === 601
    return {
      numero,
      tipologia: ta.tipologia,
      area: ta.area,
      temDecorado,
      plantaSrc: `${BASE_68}/${fk}-planta.png`,
      destaqueSrc: `${BASE_68}/${fk}-destaque.png`,
      hitbox,
    }
  }),
}

export type PavimentoTab = { id: string; label: string }

export const PAVIMENTO_TABS: PavimentoTab[] = [
  { id: 'terreo', label: 'Térreo' },
  { id: '2', label: '2º' },
  { id: '3-4', label: '3º & 4º' },
  { id: '5', label: '5º' },
  { id: '6-8', label: '6º ao 8º' },
  { id: 'terraco', label: 'Terraço' },
]

/** Disparado em `window` antes de saltar para `#plantas` (ex.: Áreas Comuns → Ver Planta). */
export const PLANTAS_SELECIONAR_PAVIMENTO = 'ambar:plantas-selecionar-pavimento' as const

export type PlantasSelecionarPavimentoDetail = {
  pavimentoId: string
  /** Opcional: pré-seleciona uma unidade específica do pavimento (ex.: '501', '309-409'). */
  unidadeNumero?: string
}

export function isPavimentoTabId(id: string): boolean {
  return PAVIMENTO_TABS.some((t) => t.id === id)
}

export type PavimentoConfig =
  | { kind: 'interactive'; data: PavimentoPlantaData }
  | { kind: 'placeholder' }

export function getPavimentoConfig(pavimentoId: string): PavimentoConfig {
  switch (pavimentoId) {
    case 'terreo':
      return { kind: 'interactive', data: terreoPavimento }
    case '2':
      return { kind: 'interactive', data: segundoAndar }
    case '5':
      return { kind: 'interactive', data: quintoPavimento }
    case '3-4':
      return { kind: 'interactive', data: terceiroQuartoPavimento }
    case '6-8':
      return { kind: 'interactive', data: sextoAoOitavoPavimento }
    default:
      return { kind: 'placeholder' }
  }
}
