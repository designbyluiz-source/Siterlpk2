import { ASSETS } from '../assets/figma'

const PHONE = '5541991853174'

const PRESETS = {
  ambar: `https://wa.me/${PHONE}?text=${encodeURIComponent('Olá, gostaria de saber mais sobre o Âmbar')}`,
  rplk: `https://wa.me/${PHONE}?text=${encodeURIComponent(
    'Olá, gostaria de falar sobre investimentos e empreendimentos RPLK.',
  )}`,
} as const

export type WhatsAppFabPreset = keyof typeof PRESETS

type WhatsAppFabProps = {
  /** `ambar` — mensagem do Âmbar; `rplk` — mensagem genérica da incorporadora */
  preset?: WhatsAppFabPreset
}

export default function WhatsAppFab({ preset = 'ambar' }: WhatsAppFabProps) {
  const href = PRESETS[preset]
  const aria =
    preset === 'rplk'
      ? 'Falar com o comercial RPLK pelo WhatsApp'
      : 'Entre em contato pelo WhatsApp sobre o Âmbar'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      style={{ backgroundColor: '#e7d1ac', color: '#3b3b3b' }}
      className="fixed bottom-6 right-6 z-[70] flex flex-col items-center gap-3 p-5 rounded-[20px] shadow-[0_4px_18px_rgba(0,0,0,0.25)] hover:-translate-y-[2px] transition-transform"
    >
      <img src={ASSETS.whatsapp} alt="" aria-hidden className="h-[33px] w-[33px]" />
      <span className="font-bold text-[10px] uppercase tracking-wide whitespace-nowrap" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
        ENTRE EM CONTATO
      </span>
    </a>
  )
}
