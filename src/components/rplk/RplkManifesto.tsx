const pilares = [
  {
    label: 'Missão',
    text: 'Desenvolver empreendimentos imobiliários que aliem sofisticação, inovação e solidez, gerando valor sustentável e retorno consistente para nossos investidores. Mais do que construir imóveis, nossa missão é criar ativos que transformem a paisagem urbana de Curitiba, elevem a qualidade de vida e se tornem oportunidades reais de crescimento patrimonial.',
  },
  {
    label: 'Visão',
    text: 'Ser reconhecida como uma das incorporadoras mais sólidas, inovadoras e rentáveis de Curitiba, destacando-se pela excelência em cada empreendimento, pela geração de valor aos investidores e pela capacidade de antecipar tendências do mercado imobiliário.',
  },
  {
    label: 'Valores',
    text: 'Ética e transparência em todas as relações, excelência em cada detalhe, inovação constante sem perder a essência. Respeito às pessoas, ao meio ambiente e à cidade como base do nosso trabalho — e uma gestão colaborativa que valoriza o time e impulsiona o crescimento conjunto.',
  },
] as const

export default function RplkManifesto() {
  return (
    <section
      id="sobre"
      className="relative bg-rplk-editorial text-rplk-ink py-[90px] md:py-[110px] scroll-mt-[88px]"
      aria-labelledby="rplk-manifesto-heading"
    >
      <div className="rplk-editorial-container">

        {/* ── Topo: quote + imagem ── */}
        <div className="grid gap-16 lg:gap-24 lg:grid-cols-2 items-start">

          {/* Coluna esquerda */}
          <div className="flex flex-col gap-10">
            <p className="font-rplk-sans text-[clamp(1rem,2vw,1.125rem)] font-normal uppercase tracking-rplk-nav text-rplk-gold">
              A RPLK
            </p>

            <blockquote
              id="rplk-manifesto-heading"
              className="font-rplk-serif font-normal italic text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] text-rplk-ink tracking-normal"
            >
              "A RPLK carrega no DNA a paixão pela construção."
            </blockquote>

            <p className="font-rplk-sans text-[16px] leading-[1.7] text-rplk-ink/75 max-w-xl">
              Renan Perozin e Lucas Kasecker, ambos engenheiros civis e filhos de construtores,
              se uniram em 2018 carregando, além da herança familiar, décadas de experiência e a
              vontade de inovar e entregar excelência. Mais do que construir, a RPLK proporciona
              a seus clientes projetos com alta qualidade, segurança, valor e rentabilidade.
            </p>

            <p className="font-rplk-sans text-[14px] uppercase tracking-rplk-nav text-rplk-gold">
              Fundada em 2018 · Curitiba, PR
            </p>
          </div>

          {/* Coluna direita: imagem */}
          <div className="relative self-start overflow-hidden">
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 origin-center -rotate-90 font-rplk-sans text-[14px] uppercase tracking-rplk-nav text-rplk-gold/55 whitespace-nowrap"
              aria-hidden
            >
              Manifesto
            </span>
            <img
              src="/rplk/sobre-equipe.png"
              alt="Equipe RPLK"
              className="block w-full h-auto motion-safe:animate-rplk-kenburn"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-black/20 pointer-events-none" />
          </div>
        </div>

        {/* ── Missão / Visão / Valores ── */}
        <div className="mt-[90px] md:mt-[110px]">
          <h2 className="font-rplk-serif font-normal italic text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-rplk-ink max-w-[36rem]">
            Propósito, direção e princípios.
          </h2>

          <ul className="mt-[60px]" role="list">
            {pilares.map((p) => (
              <li key={p.label} className="border-t border-rplk-ink/[0.12] last:border-b">
                <div className="grid gap-6 py-10 md:grid-cols-[200px_1fr] md:gap-16 md:py-12">
                  <p className="font-rplk-sans text-[clamp(1rem,1.8vw,1.375rem)] font-normal uppercase tracking-rplk-nav text-rplk-gold">
                    {p.label}
                  </p>
                  <p className="font-rplk-sans text-[16px] leading-[1.7] text-rplk-ink/75">
                    {p.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
