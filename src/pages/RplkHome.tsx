import { useEffect } from 'react'
import RplkHeader from '../components/rplk/RplkHeader'
import RplkHero from '../components/rplk/RplkHero'
import RplkManifesto from '../components/rplk/RplkManifesto'
import RplkStats from '../components/rplk/RplkStats'
import RplkEmpreendimentos from '../components/rplk/RplkEmpreendimentos'
import RplkPilares from '../components/rplk/RplkPilares'
import RplkBlog from '../components/rplk/RplkBlog'
import RplkDepoimentos from '../components/rplk/RplkDepoimentos'
import RplkCtaFinal from '../components/rplk/RplkCtaFinal'
import RplkLeadForm from '../components/rplk/RplkLeadForm'
import RplkFooter from '../components/rplk/RplkFooter'
import WhatsAppFab from '../components/WhatsAppFab'

export default function RplkHome() {
  useEffect(() => {
    document.title = 'RPLK — Construtora e Incorporadora'
    const { documentElement, body } = document
    documentElement.classList.add('rplk-site-home')
    body.classList.add('rplk-site-home')
    return () => {
      documentElement.classList.remove('rplk-site-home')
      body.classList.remove('rplk-site-home')
    }
  }, [])

  return (
    <div className="min-h-screen bg-rplk-midnight text-white font-rplk-sans antialiased selection:bg-rplk-gold/40 selection:text-rplk-midnight">
      <RplkHeader />
      <main>
        <RplkHero />
        <RplkManifesto />
        <RplkStats />
        <RplkEmpreendimentos />
        <RplkPilares />
        <RplkBlog />
        <RplkDepoimentos />
        <RplkCtaFinal />
        <RplkLeadForm />
      </main>
      <RplkFooter />
      <WhatsAppFab preset="rplk" />
    </div>
  )
}
