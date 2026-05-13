import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const baseProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

// Expandir — 4 setas saindo dos cantos
export function Expand(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M4 9V4h5" />
      <path d="M20 9V4h-5" />
      <path d="M4 15v5h5" />
      <path d="M20 15v5h-5" />
    </svg>
  )
}

// Chevron simples
export function ChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  )
}

export function ChevronRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

// Chevron com círculo ao redor
export function CircledChevronLeft(props: IconProps) {
  return (
    <svg viewBox="0 0 60 60" {...baseProps} {...props}>
      <circle cx="30" cy="30" r="28" />
      <path d="M34 22l-8 8 8 8" />
    </svg>
  )
}

export function CircledChevronRight(props: IconProps) {
  return (
    <svg viewBox="0 0 60 60" {...baseProps} {...props}>
      <circle cx="30" cy="30" r="28" />
      <path d="M26 22l8 8-8 8" />
    </svg>
  )
}

// WhatsApp — ícone oficial filled
export function WhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.413.704 4.661 1.92 6.555L4 29l7.652-1.892A11.93 11.93 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 21.6c-1.86 0-3.6-.52-5.083-1.42l-.36-.214-4.54 1.123 1.144-4.43-.236-.376A9.55 9.55 0 016.4 15c0-5.302 4.298-9.6 9.6-9.6s9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6zm5.273-7.18c-.288-.144-1.705-.842-1.97-.938-.264-.096-.456-.144-.648.144-.192.288-.744.938-.912 1.13-.168.192-.336.216-.624.072-.288-.144-1.218-.45-2.32-1.434-.857-.764-1.435-1.708-1.603-1.996-.168-.288-.018-.444.126-.588.13-.13.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.56-.888-2.136-.233-.56-.471-.484-.648-.493-.168-.008-.36-.01-.552-.01a1.06 1.06 0 00-.768.36c-.264.288-1.008.984-1.008 2.4 0 1.416 1.032 2.784 1.176 2.976.144.192 2.028 3.096 4.92 4.344.687.297 1.224.474 1.642.606.69.22 1.318.189 1.814.115.553-.083 1.705-.697 1.946-1.37.24-.673.24-1.25.168-1.37-.072-.12-.264-.192-.552-.336z"/>
    </svg>
  )
}

export function Instagram(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function LinkedIn(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8 18v-7H5.5v7H8zm-1.25-8.1a1.45 1.45 0 100-2.9 1.45 1.45 0 000 2.9zM18.5 18v-3.85c0-2.07-.45-3.65-2.85-3.65-1.15 0-1.93.63-2.25 1.23h-.03V11H10.95v7h2.45v-3.47c0-.92.17-1.8 1.3-1.8 1.13 0 1.15 1.05 1.15 1.86V18h2.65z"/>
    </svg>
  )
}

// Pin de localização
export function MapPin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

// Seta de direção (para "Ver trajeto")
export function Directions(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
