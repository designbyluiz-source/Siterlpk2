import { Link } from 'react-router-dom'
import { ASSETS } from '../../assets/figma'

export default function RplkFooter() {
  return (
    <footer className="bg-rplk-midnight text-white/85 border-t border-white/[0.12] py-20 md:py-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14 grid gap-14 lg:grid-cols-3 lg:gap-10">
        <div className="space-y-6">
          <img src={ASSETS.rplkLogo} alt="RPLK" className="h-11 w-auto" />
          <p className="font-rplk-sans text-sm leading-relaxed text-rplk-muted max-w-sm">
            Incorporação residencial com visão patrimonial, foco em valorização e execução impecável em Curitiba.
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-rplk-gold/90 font-rplk-sans mb-6">Links rápidos</p>
          <ul className="space-y-3 font-rplk-sans text-sm">
            <li>
              <Link to="/" className="text-white/90 hover:text-rplk-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rplk-gold transition-colors">
                Home
              </Link>
            </li>
            <li>
              <a href="#empreendimentos" className="text-white/90 hover:text-rplk-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rplk-gold transition-colors">
                Empreendimentos
              </a>
            </li>
            <li>
              <a href="#sobre" className="text-white/90 hover:text-rplk-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rplk-gold transition-colors">
                Sobre
              </a>
            </li>
            <li>
              <a href="#blog" className="text-white/90 hover:text-rplk-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rplk-gold transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#contato" className="text-white/90 hover:text-rplk-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rplk-gold transition-colors">
                Contato
              </a>
            </li>
            <li>
              <Link to="/empreendimentos/ambar" className="text-white/90 hover:text-rplk-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rplk-gold transition-colors">
                Âmbar
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <p className="text-[10px] uppercase tracking-[0.35em] text-rplk-gold/90 font-rplk-sans">Contatos comerciais</p>
          <ul className="space-y-2 font-rplk-sans text-sm">
            <li>
              <a
                href="http://wa.me/5541991853174"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-rplk-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rplk-gold transition-colors"
              >
                Comercial · 41 99185-3174
              </a>
            </li>
            <li>
              <a
                href="http://wa.me/5541984481435"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-rplk-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rplk-gold transition-colors"
              >
                Compras · 41 98448-1435
              </a>
            </li>
            <li>
              <a
                href="http://wa.me/5541991172938"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-rplk-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rplk-gold transition-colors"
              >
                Financeiro · 41 99117-2938
              </a>
            </li>
          </ul>
          <address className="not-italic text-sm text-rplk-muted leading-relaxed">
            Trav. Rafael Francisco Greca, 50
            <br />
            Sala 42 — Curitiba, PR
          </address>
          <div className="flex gap-5 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="opacity-70 hover:opacity-100 hover:text-rplk-gold transition-colors"
            >
              <img src={ASSETS.instagram} alt="" className="h-6 w-6 invert" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="opacity-70 hover:opacity-100 hover:text-rplk-gold transition-colors"
            >
              <img src={ASSETS.linkedin} alt="" className="h-6 w-6 invert" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14 mt-16 pt-10 border-t border-white/[0.12] text-center">
        <p className="font-rplk-serif text-[clamp(1rem,2.5vw,1.35rem)] tracking-[0.08em] text-rplk-gold uppercase">
          Onde engenharia, visão e patrimônio se encontram.
        </p>
        <p className="mt-6 text-[11px] text-rplk-muted font-rplk-sans">© {new Date().getFullYear()} RPLK. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
