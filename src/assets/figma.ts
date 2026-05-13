// Caminhos para os assets extraídos do Figma (servidos via /public)
// Os PNGs são fotos/renders e os SVGs são logos/ícones.

export const ASSETS = {
  // Hero
  heroBg: '/figma-assets/ec19dd4c204c11d285295f662057fbf44bc6641a.png',
  rplkLogo: '/figma-assets/cb796d42b6c79e95af1ef2b8ba294dd1778b5687.png',
  ambarWordmark: '/figma-assets/48a03d8c238b76eb675e9371606a49b2295329f9.svg',
  expandArrow: '/figma-assets/19c25616b984c8c739ed71e883e1de6f98273b02.svg',
  whatsapp: '/figma-assets/a8d2a185360daf56f2875c84df726b1ad51d0b3d.svg',

  // Sobre (galeria)
  sobreBuilding: '/figma-assets/36c9b1946cc91e9dc6e470c6d7613a49e7b137b0.png',
  sobreThumb1: '/figma-assets/3e19ebc12a14afa94d3bfaaddd5ce497cdb258e6.png',
  sobreThumb2: '/figma-assets/dcc9bd274755ff0fc536da2c50ae8a3d11bdc5f8.png',
  sobreThumb3: '/figma-assets/64f69109fad45e28c6014192385e78b1b2c6d6f6.png',
  sobreThumb4: '/figma-assets/57570396decea0e22faabd3f09670d0bbba601cd.png',
  circledRight43: '/figma-assets/81d8af4e4a973d29b24085f3eb90b1f53af5526b.svg',
  circledRight43Alt: '/figma-assets/bfe27b01be8697f042540a493177d2bbfd776897.svg',
  expand38: '/figma-assets/2b2006e26a643ae43f4f19f791ef6380904779e5.svg',
  expand50: '/figma-assets/9c3e49e838cfbb0f6dce1b84b547ad1d4f778db7.svg',

  // Áreas Comuns (reutiliza thumbs como imagens grandes)
  areasComunsMain: '/figma-assets/dcc9bd274755ff0fc536da2c50ae8a3d11bdc5f8.png',
  areasComunsLeft: '/figma-assets/57570396decea0e22faabd3f09670d0bbba601cd.png',
  areasComunsRight: '/figma-assets/067eb6475fec36cb84d625eae91c29464ef9839d.png',
  plantaMini: '/figma-assets/d01d03df8049a8e2351d0e7f1e9cf7bd45dd41d8.png',
  circledRight60: '/figma-assets/d8369961ad864a9064da2146707313db07bf1b0e.svg',
  circledRight60Alt: '/figma-assets/e587cb6cf4d98bd9c38f7d451ec80e4da50120ec.svg',

  // Localização
  mapImage: '/figma-assets/df14977a97fa073d33089164d2b9b2ff92da9364.png',

  // Separador conceitual — textura de pedra (panorâmica 2400×550)
  separadorTexture: '/figma-assets/separador-pedra.jpg',
  ambarWordmarkSeparator: '/figma-assets/8bcbf3296ee97c4a4d0bd1d5e32ea2ad97e124e7.svg',

  // Plantas
  plantaMain: '/figma-assets/46fcad8b7987bd07cae72c8e25a3b4ebde3c66b5.png',
  plantaUnidade: '/figma-assets/4863fc965916f4bff30e7d1f3f06bccf11ef02f4.png',

  // Decorados
  decoradosBg: '/figma-assets/8fbd7f02d7bb9146f6554712527c1eb46190b701.png',
  decoradosPlantaThumb: '/figma-assets/df66fa51886758638622ab65f086605a3843922e.png',

  // Carrossel institucional (logos repetidos)
  ambarWordmarkSmall: '/figma-assets/37c4ab871033087bed5eb09b29929d2c7850aa30.svg',

  // Footer
  footerBg: '/figma-assets/87a398100e89b22d520c1a3ee8ff0968fc7abec1.png',
  ambarWordmarkFooter: '/figma-assets/72289d2d3eae109042a78d28ea5897f97137cecc.svg',
  instagram: '/figma-assets/5ab837ad85c8d0f58795ce18827b90860a4b9184.svg',
  linkedin: '/figma-assets/d08269979b191163f899d705a6329f1230ac385f.svg',
} as const;

export type AssetKey = keyof typeof ASSETS;
