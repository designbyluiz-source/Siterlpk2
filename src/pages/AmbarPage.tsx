import { useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Sobre from '../components/Sobre'
import AreasComuns from '../components/AreasComuns'
import Localizacao from '../components/Localizacao'
import Separador from '../components/Separador'
import Plantas from '../components/Plantas'
import Decorados from '../components/Decorados'
import Carrossel from '../components/Carrossel'
import Footer from '../components/Footer'
import WhatsAppFab from '../components/WhatsAppFab'
import { ASSETS } from '../assets/figma'

export default function AmbarPage() {
  const [barSolid, setBarSolid] = useState(false)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  useEffect(() => {
    document.title = 'Âmbar — RPLK'
  }, [])

  useEffect(() => {
    const onScroll = () => setBarSolid(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-ambar-cream text-ambar-ink">
      <header
        className={`fixed top-0 left-0 right-0 z-[60] flex min-h-[56px] items-center gap-4 px-4 py-3 md:px-8 transition-[background,box-shadow,border-color] duration-500 ${
          barSolid
            ? 'bg-ambar-cream/95 backdrop-blur-md border-b border-ambar-navy/10 shadow-[0_6px_24px_rgba(0,45,79,0.06)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <Link
          to="/"
          className={`inline-flex items-center gap-3 font-ui text-xs sm:text-sm uppercase tracking-widest transition-colors ${
            barSolid
              ? 'text-ambar-navy hover:text-ambar-rose'
              : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] hover:text-ambar-cream'
          }`}
        >
          <img
            src={ASSETS.rplkLogo}
            alt="RPLK"
            className={`h-8 w-auto ${barSolid ? '' : 'drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]'}`}
          />
          <span className="hidden sm:inline">Voltar ao site RPLK</span>
          <span className="sm:hidden">RPLK</span>
        </Link>
      </header>
      <main>
        <Hero />
        <Sobre />
        <AreasComuns />
        <Localizacao />
        <Separador />
        <Plantas />
        <Decorados />
        <Carrossel />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
