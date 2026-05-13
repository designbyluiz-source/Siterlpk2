import { ASSETS } from '../assets/figma'

export default function Footer() {
  return (
    <footer
      id="contato"
      className="relative isolate py-10 md:py-[40px] overflow-hidden"
      data-node-id="334:308"
    >
      {/* Background photo + dark overlay */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <img
          src={ASSETS.footerBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container-ambar flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-[99px]">
        {/* Âmbar wordmark left */}
        <img
          src={ASSETS.ambarWordmarkFooter}
          alt="Âmbar"
          className="h-14 md:h-[66px] w-auto shrink-0"
        />

        <div className="flex flex-col gap-6 w-full max-w-[912px]">
          <p className="font-sans font-semibold text-[20px] uppercase tracking-[0.1em] text-white">
            CONTATO
          </p>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {/* Col 1: RPLK + contatos */}
            <div className="border-l border-white/40 px-10 flex flex-col gap-6 justify-center">
              <img
                src={ASSETS.rplkLogo}
                alt="RPLK Empreiteira"
                className="block self-start h-[44px] w-auto max-w-none shrink-0"
              />
              <ul className="space-y-1 text-white font-ui text-[14px] leading-tight list-disc pl-5">
                <li>
                  <a
                    href="http://wa.me/5541991853174"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                  >
                    Comercial: 41 99185-3174
                  </a>
                </li>
                <li>
                  <a
                    href="http://wa.me/5541984481435"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                  >
                    Compras: 41 98448-1435
                  </a>
                </li>
                <li>
                  <a
                    href="http://wa.me/5541991172938"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                  >
                    Financeiro: 41 99117-2938
                  </a>
                </li>
              </ul>
              <div className="space-y-1">
                <p className="text-white/70 font-ui text-[11px] uppercase tracking-[0.18em]">
                  Escritório
                </p>
                <address className="not-italic text-white font-ui text-[14px] leading-tight">
                  Trav. Rafael Francisco Greca, 50<br />
                  Sala 42, Curitiba - PR
                </address>
              </div>
            </div>

            {/* Col 2: Endereço do empreendimento Âmbar (Rua Palmeiras, 691 — Água Verde) */}
            <div className="px-10 flex flex-col justify-end gap-1">
              <p className="text-white/70 font-ui text-[11px] uppercase tracking-[0.18em]">
                Empreendimento Âmbar
              </p>
              <address className="not-italic text-white font-ui text-[14px] leading-tight">
                Rua Palmeiras, 691<br />
                Água Verde — Curitiba/PR<br />
                CEP 80620-110
              </address>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rua%20Palmeiras%2C%20691%2C%20%C3%81gua%20Verde%2C%20Curitiba%2C%20PR"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit text-white/90 font-ui text-[13px] underline underline-offset-2 hover:no-underline hover:text-white"
              >
                Ver no mapa
              </a>
            </div>

            {/* Col 3: Redes sociais */}
            <div className="px-10 flex items-end justify-end gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-[25px] w-[25px] hover:opacity-80 transition-opacity"
              >
                <img src={ASSETS.instagram} alt="" className="h-full w-full invert" aria-hidden />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-[25px] w-[25px] hover:opacity-80 transition-opacity"
              >
                <img src={ASSETS.linkedin} alt="" className="h-full w-full invert" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
