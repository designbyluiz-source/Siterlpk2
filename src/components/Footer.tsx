import { ASSETS } from '../assets/figma'
import { AMBAR_WHATSAPP_HREF } from './WhatsAppFab'

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
        <img
          src={ASSETS.ambarWordmarkFooter}
          alt="Âmbar"
          className="h-14 md:h-[66px] w-auto shrink-0"
        />

        <div className="flex flex-col gap-6 w-full max-w-md">
          <p className="font-sans font-semibold text-[20px] uppercase tracking-[0.1em] text-white">
            CONTATO
          </p>

          <div className="border-l border-white/40 px-10 flex flex-col gap-6 justify-center">
            <a
              href={AMBAR_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-ui text-[14px] leading-tight underline hover:no-underline w-fit"
            >
              Comercial: 41 99185-3174
            </a>

            <div className="space-y-1">
              <p className="text-white/70 font-ui text-[11px] uppercase tracking-[0.18em]">
                Escritório
              </p>
              <address className="not-italic text-white font-ui text-[14px] leading-tight">
                Trav. Rafael Francisco Greca, 50<br />
                Sala 42, Curitiba - PR
              </address>
            </div>

            <a
              href={AMBAR_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-white font-ui text-[14px] leading-tight underline underline-offset-2 hover:no-underline w-fit"
            >
              <img
                src={ASSETS.whatsapp}
                alt=""
                aria-hidden
                className="h-5 w-5 shrink-0 opacity-95"
              />
              Abrir WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
