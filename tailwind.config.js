/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // Garante que todas as classes de cor ambar-* sejam geradas mesmo
  // se o scanner perder alguma referência durante reload.
  safelist: [
    { pattern: /(bg|text|border|ring)-rplk-(black|midnight|soft|editorial|ink|gold|gold-hover|white|muted)(\/[0-9]+)?/ },
    'font-rplk-sans',
    'font-rplk-serif',
    'animate-rplk-kenburn',
    'bg-ambar-cream', 'bg-ambar-terracotta', 'bg-ambar-fab',
    'text-ambar-cream', 'text-ambar-terracotta', 'text-ambar-navy',
    'text-ambar-gray', 'text-ambar-rose', 'text-ambar-brown', 'text-ambar-ink',
    'border-ambar-cream', 'border-ambar-terracotta', 'border-ambar-navy',
    'border-ambar-gray', 'border-ambar-rose', 'border-ambar-brown',
    { pattern: /(bg|text|border)-ambar-(cream|terracotta|navy|gray|rose|brown|fab|ink)(\/[0-9]+)?/ },
  ],
  theme: {
    extend: {
      colors: {
        rplk: {
          gold: '#C8A46A',
          'gold-hover': '#B8935A',
          /* Fundo principal da home RPLK — azul escuro (família do navy #002d4f) */
          midnight: '#032a45',
          /* Faixas elevadas (blog): um tom acima */
          soft: '#0a3a5c',
          black: '#000000',
          white: '#FFFFFF',
          ink: '#252525',
          editorial: '#F7F5F2',
          /* Texto secundário sobre fundos midnight/soft (tom frio, contraste AA em corpo ≥14px) */
          muted: '#c4ccd6',
        },
        ambar: {
          // Hexes extraídos diretamente do Figma
          cream: '#e7d1ac',       // Bg Sobre / Localização / Plantas
          terracotta: '#d8a18a',  // Bg Áreas Comuns / Decorados / Carrossel
          navy: '#002d4f',        // Texto Sobre o Âmbar + nav
          gray: '#535456',        // Texto Localização / Plantas
          rose: '#c17b5d',        // Link "Ver trajeto"
          brown: '#ad816e',       // Título Plantas
          fab: '#e7d1ac',         // WhatsApp FAB bg
          ink: '#1a1410',         // Texto escuro fallback
        },
      },
      fontFamily: {
        'rplk-sans': ['"DM Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        'rplk-serif': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        // Cinzel ≈ Bertoni Capitals (decorative Roman caps)
        display: ['"Cinzel"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        // Manrope ≈ Gilroy (geometric sans)
        sans: ['"Manrope"', '"Inter"', 'system-ui', 'sans-serif'],
        // Inter para nav-links (igual ao Figma)
        ui: ['"Inter"', 'system-ui', 'sans-serif'],
        // Space Grotesk para botões
        button: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-2': '0.25em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'rplk-kenburn': {
          '0%': { transform: 'scale(1) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.12) translate3d(-2%, -1.5%, 0)' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'rplk-kenburn': 'rplk-kenburn 28s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
