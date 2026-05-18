import { useEffect } from 'react'
import AmbarRevealSection from '../components/AmbarRevealSection'
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
      <AmbarRevealSection variant="fade" threshold={0.06} once={false}>
        <RplkHero />
      </AmbarRevealSection>

      <AmbarRevealSection variant="fade-up" delayMs={70} once={false}>
        <RplkEmpreendimentos />
      </AmbarRevealSection>

      <AmbarRevealSection variant="fade-right" delayMs={80} once={false}>
        <RplkManifesto />
      </AmbarRevealSection>

      <AmbarRevealSection variant="fade-up" delayMs={70} once={false}>
        <RplkStats />
      </AmbarRevealSection>

      <AmbarRevealSection variant="fade-left" delayMs={80} once={false}>
        <RplkPilares />
      </AmbarRevealSection>

      <AmbarRevealSection variant="fade-up" delayMs={70} once={false}>
        <RplkDepoimentos />
      </AmbarRevealSection>

      <AmbarRevealSection variant="fade" delayMs={60} once={false}>
        <RplkCtaFinal />
      </AmbarRevealSection>
    </RplkShell>
  )
}
