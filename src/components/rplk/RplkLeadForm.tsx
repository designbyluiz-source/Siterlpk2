import { useState } from 'react'

const faixas = ['Até R$ 500 mil', 'R$ 500 mil — 1 mi', 'R$ 1 mi — 2 mi', 'Acima de R$ 2 mi'] as const
const objetivos = ['Renda passiva', 'Moradia', 'Valorização em 3–5 anos', 'Diversificação de carteira'] as const
type Segmento = 'Quero investir' | 'Quero morar' | 'Sou parceiro'

export default function RplkLeadForm() {
  const [segmento, setSegmento] = useState<Segmento>('Quero investir')

  return (
    <section
      id="contato"
      className="bg-rplk-white py-24 text-rplk-ink [color-scheme:light] md:py-32 scroll-mt-[100px]"
      aria-labelledby="rplk-form-heading"
    >
      <div className="mx-auto max-w-[720px] px-5 md:px-8">
        <h2
          id="rplk-form-heading"
          className="font-rplk-serif text-[clamp(1.75rem,4vw,2.75rem)] text-center tracking-tight text-rplk-ink"
        >
          Encontre o investimento ideal.
        </h2>

        <form
          className="mt-14 space-y-10 font-rplk-sans text-rplk-ink"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <fieldset className="space-y-3">
            <legend className="text-[10px] uppercase tracking-[0.35em] text-rplk-gold">Segmentação</legend>
            <div className="flex flex-wrap gap-3">
              {(['Quero investir', 'Quero morar', 'Sou parceiro'] as const).map((s) => (
                <label
                  key={s}
                  className={`cursor-pointer border-b-2 pb-2 text-[12px] uppercase tracking-[0.2em] transition ${
                    segmento === s
                      ? 'border-rplk-gold text-rplk-ink'
                      : 'border-transparent text-rplk-ink/65 hover:text-rplk-ink'
                  }`}
                >
                  <input
                    type="radio"
                    name="segmento"
                    className="sr-only"
                    checked={segmento === s}
                    onChange={() => setSegmento(s)}
                  />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-10 md:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-rplk-ink">Nome</span>
              <input
                name="nome"
                required
                autoComplete="name"
                className="rplk-input text-rplk-ink"
                placeholder="Seu nome"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-rplk-ink">E-mail</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="rplk-input text-rplk-ink"
                placeholder="nome@email.com"
              />
            </label>
            <label className="block space-y-2 md:col-span-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-rplk-ink">WhatsApp</span>
              <input
                name="whatsapp"
                type="tel"
                required
                autoComplete="tel"
                className="rplk-input text-rplk-ink"
                placeholder="(41) 99999-0000"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-rplk-ink">Faixa de investimento</span>
            <select
              name="faixa"
              required
              className="rplk-input rplk-select text-rplk-ink bg-rplk-white"
              defaultValue=""
              aria-label="Faixa de investimento"
            >
              <option value="" disabled hidden>
                Selecione a faixa de investimento
              </option>
              {faixas.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-rplk-ink">Objetivo</span>
            <select
              name="objetivo"
              required
              className="rplk-input rplk-select text-rplk-ink bg-rplk-white"
              defaultValue=""
              aria-label="Objetivo do investimento"
            >
              <option value="" disabled hidden>
                Selecione o objetivo
              </option>
              {objetivos.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>

          <input type="hidden" name="segmentacao" value={segmento} />

          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="rplk-btn-outline border-rplk-gold text-rplk-gold hover:bg-rplk-gold hover:text-rplk-midnight text-[11px] tracking-[0.28em] uppercase px-12 py-3.5"
            >
              Receber oportunidades
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
