import { useEffect } from 'react'
import RplkShell from '../layouts/RplkShell'
import RplkEmpreendimentos from '../components/rplk/RplkEmpreendimentos'
import RplkCtaFinal from '../components/rplk/RplkCtaFinal'

export default function RplkEmpreendimentosPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <RplkShell title="Empreendimentos — RPLK">
      <RplkEmpreendimentos standalone />
      <RplkCtaFinal />
    </RplkShell>
  )
}
