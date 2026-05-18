import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ASSETS } from '../../assets/figma'

export default function RplkHeader() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[102] h-[71px] flex items-center justify-center transition-[background-color,border-color,box-shadow,color] duration-[250ms] ease-in-out ${
        solid
          ? 'bg-rplk-editorial/96 backdrop-blur-md border-b border-rplk-ink/10 text-rplk-ink shadow-[0_6px_40px_rgba(0,0,0,0.06)]'
          : 'bg-transparent border-b border-transparent text-white'
      }`}
    >
      <div className="rplk-editorial-container flex w-full items-center justify-center">
        <Link
          to="/"
          className="flex shrink-0 items-center outline-none focus-visible:ring-2 focus-visible:ring-rplk-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
          aria-label="RPLK — Voltar à página inicial"
        >
          <img
            src={ASSETS.rplkLogo}
            alt=""
            className={`h-9 md:h-10 w-auto transition-[filter] duration-[250ms] ease-in-out ${
              solid ? '' : 'drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)]'
            }`}
          />
        </Link>
      </div>
    </header>
  )
}
