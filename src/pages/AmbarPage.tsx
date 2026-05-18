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
import AmbarRevealSection from '../components/AmbarRevealSection'
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
    <div className="min-h-screen min-w-0 overflow-x-clip bg-ambar-cream text-ambar-ink">
      <header
        className={`fixed top-0 left-0 right-0 z-[60] flex min-h-[56px] items-center justify-center px-4 py-3 md:px-8 transition-[background,box-shadow,border-color] duration-500 ${
          barSolid
            ? 'bg-ambar-cream/95 backdrop-blur-md border-b border-ambar-navy/10 shadow-[0_6px_24px_rgba(0,45,79,0.06)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <Link
          to="/"
          className={`inline-flex shrink-0 items-center outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ambar-rose rounded-sm ${
            barSolid ? '' : 'drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]'
          }`}
          aria-label="RPLK — Voltar à página inicial"
        >
          <img
            src={ASSETS.rplkLogo}
            alt=""
            className={`h-8 w-auto ${barSolid ? '' : 'drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]'}`}
          />
        </Link>
      </header>
      <main className="min-w-0 overflow-x-clip">
        <AmbarRevealSection variant="fade" threshold={0.06}>
          <Hero />
        </AmbarRevealSection>
        <AmbarRevealSection variant="fade-up" delayMs={70}>
          <Sobre />
        </AmbarRevealSection>
        <AmbarRevealSection variant="fade-right" delayMs={90}>
          <AreasComuns />
        </AmbarRevealSection>
        <AmbarRevealSection variant="fade-left" delayMs={70}>
          <Localizacao />
        </AmbarRevealSection>
        <AmbarRevealSection variant="zoom-in" threshold={0.18}>
          <Separador />
        </AmbarRevealSection>
        <AmbarRevealSection variant="fade-up" delayMs={80}>
          <Plantas />
        </AmbarRevealSection>
        <AmbarRevealSection variant="fade-down" delayMs={60}>
          <Decorados />
        </AmbarRevealSection>
        <AmbarRevealSection variant="fade-up" delayMs={100}>
          <Carrossel />
        </AmbarRevealSection>
      </main>
      <AmbarRevealSection variant="fade" delayMs={40}>
        <Footer />
      </AmbarRevealSection>
      <WhatsAppFab />
    </div>
  )
}
