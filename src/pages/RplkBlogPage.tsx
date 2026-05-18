import { useEffect } from 'react'
import RplkShell from '../layouts/RplkShell'
import RplkBlog from '../components/rplk/RplkBlog'
import RplkCtaFinal from '../components/rplk/RplkCtaFinal'

export default function RplkBlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <RplkShell title="Blog — RPLK">
      <RplkBlog standalone />
      <RplkCtaFinal />
    </RplkShell>
  )
}
