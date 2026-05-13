import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ASSETS } from '../../assets/figma'

const navItems: Array<{ label: string; to?: string; href?: string }> = [
  { label: 'Home', to: '/' },
  { label: 'Empreendimentos', href: '#empreendimentos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contato', href: '#contato' },
]

export default function RplkHeader() {
  const [solid, setSolid] = useState(false)

  const closeMobile = () => {
    document.getElementById('rplk-mobile-nav')?.classList.add('hidden')
  }

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-[100px] md:h-[110px] flex items-center transition-all duration-500 ${
        solid
          ? 'bg-rplk-midnight/94 backdrop-blur-md border-b border-white/[0.12] shadow-[0_8px_40px_rgba(0,0,0,0.35)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6 px-5 md:px-10 lg:px-14">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="RPLK — Início">
          <img
            src={ASSETS.rplkLogo}
            alt="RPLK"
            className={`h-10 md:h-11 w-auto transition-[filter] duration-500 ${solid ? '' : 'drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)]'}`}
          />
        </Link>

        <nav className="hidden xl:flex items-center gap-10" aria-label="Principal">
          {navItems.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className="rplk-nav-link text-[13px] tracking-[0.22em] uppercase text-white/88 hover:text-rplk-gold transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="rplk-nav-link text-[13px] tracking-[0.22em] uppercase text-white/88 hover:text-rplk-gold transition-colors"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <a
            href="#contato"
            className="hidden sm:inline-flex rplk-btn-outline border-rplk-gold text-rplk-gold hover:bg-rplk-gold hover:text-rplk-midnight text-[11px] tracking-[0.2em] uppercase px-5 py-2.5"
          >
            Quero investir
          </a>
          <button
            type="button"
            className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded border border-white/20 text-white hover:border-rplk-gold hover:text-rplk-gold transition-colors"
            aria-label="Abrir menu"
            onClick={() => {
              const el = document.getElementById('rplk-mobile-nav')
              el?.classList.toggle('hidden')
            }}
          >
            <span className="block h-0.5 w-5 bg-current shadow-[0_-6px_0,0_6px_0] shadow-current" />
          </button>
        </div>
      </div>

      <div
        id="rplk-mobile-nav"
        className="hidden xl:hidden absolute top-full left-0 right-0 border-t border-white/12 bg-rplk-midnight/98 backdrop-blur-lg px-6 py-6 flex flex-col gap-4"
      >
        {navItems.map((item) =>
          item.to ? (
            <Link
              key={item.label}
              to={item.to}
              onClick={closeMobile}
              className="text-sm uppercase tracking-widest text-white/90 hover:text-rplk-gold transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              onClick={closeMobile}
              className="text-sm uppercase tracking-widest text-white/90 hover:text-rplk-gold transition-colors"
            >
              {item.label}
            </a>
          ),
        )}
        <a
          href="#contato"
          onClick={closeMobile}
          className="mt-2 inline-flex w-max rplk-btn-outline border-rplk-gold text-rplk-gold hover:bg-rplk-gold hover:text-rplk-midnight text-[11px] tracking-[0.2em] uppercase px-5 py-2.5"
        >
          Quero investir
        </a>
      </div>
    </header>
  )
}
