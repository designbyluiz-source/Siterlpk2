import { ASSETS } from '../assets/figma'

/** Foto do Tatemono na home (`public/empreendimentos/`). Âmbar usa asset do Figma / hero. */
export const INV = {
  tatemono: '/empreendimentos/tatemono.png',
} as const

/** Imagens só para ambientação no hero — o texto não replica projetos nem secções seguintes. */
export const heroAmbianceSlides: readonly { image: string; badge: string; title: string; sub: string; href?: string }[] = [
  { image: '/rplk/hero-institucional.png', badge: 'Construtora e Incorporadora', title: 'RPLK', sub: 'Curitiba · PR' },
  { image: ASSETS.sobreBuilding, badge: 'Lançamento',                title: 'Âmbar',         sub: 'Água Verde · Curitiba', href: '/empreendimentos/ambar'     },
  { image: INV.tatemono,         badge: 'Em Construção',             title: 'Tatemono',      sub: 'Curitiba · PR',         href: '/empreendimentos/tatemono'  },
]

export type Empreendimento = {
  /** Âncora alinhada ao hero / links internos */
  anchorId: string
  slug?: string
  status: string
  badge: string
  title: string
  headline: string
  metragem: string
  tipologia: string
  local: string
  destaque: string
  image: string
}

export const empreendimentos: Empreendimento[] = [
  {
    anchorId: 'emp-ambar',
    slug: '/empreendimentos/ambar',
    status: 'Lançamento',
    badge: 'Alta procura',
    title: 'Âmbar',
    headline: 'Reencontre o passado. Conheça seu futuro — empreendimento com alma e projeção patrimonial.',
    metragem: 'Studios e unidades compactas',
    tipologia: 'Moradia e investimento',
    local: 'Curitiba — PR',
    destaque: 'Arquitetura contemporânea, localização estratégica e narrativa forte para quem investe ou mora.',
    image: ASSETS.heroBg,
  },
  {
    anchorId: 'emp-tatemono',
    slug: '/empreendimentos/tatemono',
    status: 'Em construção',
    badge: 'Alta procura',
    title: 'AOI TATEMONO',
    headline: 'Studios inteligentes para quem investe com visão.',
    metragem: '24 m² a 34 m²',
    tipologia: 'Studios e 1 dorm.',
    local: 'Curitiba — PR',
    destaque: 'Torre compacta com eficiência locativa e acabamento premium.',
    image: '/empreendimentos/tatemono/drive/01.png',
  },
]

export const blogPosts = [
  {
    title: 'Investimento em studios',
    excerpt: 'Como enxergar yield, liquidez e valorização em produtos compactos.',
    image: ASSETS.sobreThumb3,
  },
  {
    title: 'Tendências de moradia compacta',
    excerpt: 'Demografia, custo de oportunidade e o novo habitar urbano.',
    image: ASSETS.areasComunsRight,
  },
  {
    title: 'Rentabilidade em Curitiba',
    excerpt: 'Indicadores, bairros e timing para entrar antes da massificação.',
    image: ASSETS.mapImage,
  },
  {
    title: 'Valorização urbana',
    excerpt: 'Infraestrutura, adensamento e sinais de maturidade de bairro.',
    image: ASSETS.plantaMain,
  },
  {
    title: 'Estratégias patrimoniais',
    excerpt: 'Diversificação, blindagem e visão de longo prazo no portfólio.',
    image: ASSETS.decoradosBg,
  },
]
