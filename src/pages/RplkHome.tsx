import { useEffect } from 'react'
import RplkShell from '../layouts/RplkShell'
import RplkHero from '../components/rplk/RplkHero'
import RplkManifesto from '../components/rplk/RplkManifesto'
import RplkStats from '../components/rplk/RplkStats'
import RplkEmpreendimentos from '../components/rplk/RplkEmpreendimentos'
import RplkPilares from '../components/rplk/RplkPilares'
import RplkDepoimentos from '../components/rplk/RplkDepoimentos'
import RplkCtaFinal from '../components/rplk/RplkCtaFinal'

export default function RplkHome() {
  useEffect(() => {
    document.title = 'RPLK — Construtora e Incorporadora'
  }, [])

  return (
    <RplkShell>
      <RplkHero />
      <RplkEmpreendimentos />
      <RplkManifesto />
      <RplkStats />
      <RplkPilares />
      <RplkDepoimentos />
      <RplkCtaFinal />
    </RplkShell>
  )
}
