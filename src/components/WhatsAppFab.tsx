import { ASSETS } from '../assets/figma'

const PHONE = '5541991853174'

const PRESETS = {
  ambar: `https://wa.me/${PHONE}?text=${encodeURIComponent('Olá, gostaria de saber mais sobre o Âmbar')}`,
  rplk: `https://wa.me/${PHONE}?text=${encodeURIComponent(
    'Olá, gostaria de falar sobre investimentos e empreendimentos RPLK.',
  )}`,
} as const

export const AMBAR_WHATSAPP_HREF = PRESETS.ambar

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
      className="fixed bottom-6 right-6 z-[70] block drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] hover:-translate-y-[2px] transition-transform"
    >
      <img
        src={ASSETS.whatsapp}
        alt=""
        aria-hidden
        className="h-14 w-14 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
      />
    </a>
  )
}
