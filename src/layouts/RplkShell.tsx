import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import RplkHeader from '../components/rplk/RplkHeader'
import RplkFooter from '../components/rplk/RplkFooter'
import WhatsAppFab from '../components/WhatsAppFab'

function useRplkBodyClass() {
  useEffect(() => {
    const { documentElement, body } = document
    documentElement.classList.add('rplk-site-home')
    body.classList.add('rplk-site-home')
    return () => {
      documentElement.classList.remove('rplk-site-home')
      body.classList.remove('rplk-site-home')
    }
  }, [])
}

/** Ao mudar de rota ou hash (ex.: /#contato), faz scroll para o alvo no próximo frame. */
function useScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash || hash === '#') return
    const id = decodeURIComponent(hash.slice(1))
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })
  }, [pathname, hash])
}

type RplkShellProps = {
  children: ReactNode
  /** Opcional — quando omitido mantém o título já definido pela página filha */
  title?: string
}

export default function RplkShell({ children, title }: RplkShellProps) {
  useRplkBodyClass()
  useScrollToHash()

  useEffect(() => {
    if (title) document.title = title
  }, [title])

  return (
    <div className="min-h-screen min-w-0 overflow-x-clip bg-rplk-midnight text-white font-rplk-sans text-[16px] font-normal antialiased selection:bg-rplk-gold/40 selection:text-rplk-midnight">
      <RplkHeader />
      <main className="min-w-0 overflow-x-clip">{children}</main>
      <RplkFooter />
      <WhatsAppFab preset="rplk" />
    </div>
  )
}
