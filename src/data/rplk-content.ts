import { ASSETS } from '../assets/figma'

/** Fotos reais (Desktop/Empreendimentos → `public/empreendimentos/`). Âmbar segue no asset do Figma. */
export const INV = {
  tatemono: '/empreendimentos/tatemono.png',
  tingui: '/empreendimentos/tingui.jpg',
  denver: '/empreendimentos/denver.jpg',
  santorini: '/empreendimentos/santorini.jpg',
  mykonos: '/empreendimentos/mykonos.jpg',
  paris: '/empreendimentos/paris.webp',
} as const

export type HeroSlide = {
  image: string
  line1: string
  line2: string
  sub: string
  /** Âncora do card na seção Empreendimentos (mesmo `id` no `<article>`) */
  empreendimentoAnchorId: string
  /** Nome curto para aria-label do clique na foto */
  empreendimentoNome: string
}

export const heroSlides: HeroSlide[] = [
  {
    image: INV.tatemono,
    line1: 'Curitiba cresce.',
    line2: 'Seu patrimônio também.',
    sub: 'Antecipamos movimentos urbanos com inteligência de incorporação.',
    empreendimentoAnchorId: 'emp-st01-tatemono',
    empreendimentoNome: 'ST01 — AOI TATEMONO',
  },
  {
    image: INV.tingui,
    line1: 'Projetos que',
    line2: 'valorizam antes da entrega.',
    sub: 'Curadoria de endereços, tipologia e timing de mercado.',
    empreendimentoAnchorId: 'emp-opera-tingui',
    empreendimentoNome: 'Opera Tingui',
  },
  {
    image: ASSETS.heroBg,
    line1: 'Investir bem é',
    line2: 'escolher antes.',
    sub: 'Empreendimentos pensados para gerar valorização desde o lançamento.',
    empreendimentoAnchorId: 'emp-ambar',
    empreendimentoNome: 'Âmbar',
  },
  {
    image: INV.paris,
    line1: 'Arquitetura pensada',
    line2: 'para retorno real.',
    sub: 'Da concepção ao pós-obra, foco em ativos residenciais de alto padrão.',
    empreendimentoAnchorId: 'emp-paris',
    empreendimentoNome: 'Paris',
  },
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
    anchorId: 'emp-st01-tatemono',
    status: 'Em construção',
    badge: 'Alta procura',
    title: 'ST01 — AOI TATEMONO',
    headline: 'Studios inteligentes para quem investe com visão.',
    metragem: '24 m² a 34 m²',
    tipologia: 'Studios e 1 dorm.',
    local: 'Curitiba — PR',
    destaque: 'Torre compacta com eficiência locativa e acabamento premium.',
    image: INV.tatemono,
  },
  {
    anchorId: 'emp-opera-tingui',
    status: 'Em construção',
    badge: 'Alta procura',
    title: 'Opera Tingui',
    headline: 'Vista ampla e plantas fluidas para morar ou rentabilizar.',
    metragem: '52 m² a 118 m²',
    tipologia: '2 e 3 dorms.',
    local: 'Curitiba — PR',
    destaque: 'Endereço consolidado com liquidez histórica na região.',
    image: INV.tingui,
  },
  {
    anchorId: 'emp-denver',
    status: 'Últimas unidades',
    badge: 'Últimas unidades',
    title: 'Denver',
    headline: 'Laje corrida, pé-direito generoso e luz natural em cada ambiente.',
    metragem: '68 m² a 142 m²',
    tipologia: '2 a 4 dorms.',
    local: 'Curitiba — PR',
    destaque: 'Produto família com diferenciação de acabamentos e áreas comuns completas.',
    image: INV.denver,
  },
  {
    anchorId: 'emp-santorini',
    status: 'Entregue',
    badge: 'Vendido antes da entrega',
    title: 'Santorini',
    headline: 'Referência em valorização no bairro desde o primeiro lote.',
    metragem: '45 m² a 92 m²',
    tipologia: '1 a 3 dorms.',
    local: 'Curitiba — PR',
    destaque: 'Case de saída acelerada e ticket médio em alta.',
    image: INV.santorini,
  },
  {
    anchorId: 'emp-mykonos',
    status: 'Entregue',
    badge: 'Vendido antes da entrega',
    title: 'Mykonos',
    headline: 'Torre enxuta com foco absoluto em rentabilidade por m².',
    metragem: '32 m² a 58 m²',
    tipologia: '1 e 2 dorms.',
    local: 'Curitiba — PR',
    destaque: 'Perfil investidor com payback competitivo.',
    image: INV.mykonos,
  },
  {
    anchorId: 'emp-paris',
    status: 'Entregue',
    badge: 'Vendido antes da entrega',
    title: 'Paris',
    headline: 'Endereço nobre com liquidez e valorização consistente.',
    metragem: '120 m² a 280 m²',
    tipologia: '3 a 4 suítes',
    local: 'Curitiba — PR',
    destaque: 'Alto padrão com narrativa patrimonial de longo prazo.',
    image: INV.paris,
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

export const depoimentos = [
  {
    quote:
      'Adquiri meu primeiro studio ainda no lançamento e tive valorização antes mesmo da entrega.',
    name: 'Mariana V.',
    perfil: 'Investidora — Curitiba',
    rating: 5,
  },
  {
    quote:
      'A leitura de bairro e o cuidado com prazo me deram segurança para compor patrimônio em duas torres.',
    name: 'Ricardo F.',
    perfil: 'Empresário — investimento residencial',
    rating: 5,
  },
  {
    quote:
      'Transparência comercial e produto alinhado ao que prometem. Hoje é meu melhor ativo locável.',
    name: 'Helena K.',
    perfil: 'Médica — renda passiva',
    rating: 5,
  },
]
