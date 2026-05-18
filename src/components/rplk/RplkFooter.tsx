import { Link } from 'react-router-dom'
import { ASSETS } from '../../assets/figma'

export default function RplkFooter() {
  const navLinkClass =
    'font-rplk-sans text-[clamp(0.75rem,1.4vw,0.9375rem)] font-normal uppercase tracking-rplk-nav text-white/80 hover:text-rplk-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rplk-gold transition-colors'

  return (
    <footer id="contato" className="bg-rplk-midnight text-white/85 pt-[70px] pb-[70px]">
      <div className="rplk-editorial-container flex flex-col items-center">
        {/* Logo centered */}
        <img src={ASSETS.rplkLogo} alt="RPLK" className="h-11 w-auto mb-[60px] mx-auto" />

        {/* Separator */}
        <div className="w-full border-t border-white/[0.12] mb-10" />

        {/* Nav links row centered */}
        <nav aria-label="Links do rodapé">
          <ul className="flex flex-wrap justify-center gap-8 md:gap-10">
            <li>
              <Link to="/" className={navLinkClass}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/empreendimentos" className={navLinkClass}>
                Empreendimentos
              </Link>
            </li>
            <li>
              <Link to="/#sobre" className={navLinkClass}>
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/blog" className={navLinkClass}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/#contato" className={navLinkClass}>
                Contato
              </Link>
            </li>
            <li>
              <Link to="/empreendimentos/ambar" className={navLinkClass}>
                Âmbar
              </Link>
            </li>
          </ul>
        </nav>

        {/* Separator */}
        <div className="w-full border-t border-white/[0.12] mt-10 mb-10" />

        {/* Social icons centered */}
        <div className="flex gap-6 mb-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="opacity-60 hover:opacity-100 hover:text-rplk-gold transition-opacity"
          >
            <img src={ASSETS.instagram} alt="" className="h-6 w-6 brightness-0 invert" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="opacity-60 hover:opacity-100 hover:text-rplk-gold transition-opacity"
          >
            <img src={ASSETS.linkedin} alt="" className="h-6 w-6 brightness-0 invert" />
          </a>
        </div>

        {/* Contacts */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8 font-rplk-sans text-[14px] text-white/70">
          <a
            href="http://wa.me/5541991853174"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rplk-gold transition-colors"
          >
            Comercial · 41 99185-3174
          </a>
          <a
            href="http://wa.me/5541984481435"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rplk-gold transition-colors"
          >
            Compras · 41 98448-1435
          </a>
          <a
            href="http://wa.me/5541991172938"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rplk-gold transition-colors"
          >
            Financeiro · 41 99117-2938
          </a>
        </div>

        {/* Address + copyright */}
        <address className="not-italic font-rplk-sans text-[13px] text-rplk-muted/70 text-center leading-relaxed mb-6">
          Trav. Rafael Francisco Greca, 50 — Sala 42 · Curitiba, PR
        </address>

        <p className="font-rplk-serif font-normal italic text-[clamp(0.9rem,1.6vw,1.125rem)] leading-snug tracking-normal text-rplk-gold text-center mb-6">
          Onde engenharia, visão e patrimônio se encontram.
        </p>

        <p className="font-rplk-sans text-[13px] text-rplk-muted/55 text-center">
          © {new Date().getFullYear()} RPLK. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
