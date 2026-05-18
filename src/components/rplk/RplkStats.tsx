export default function RplkStats() {
  return (
    <section
      className="relative bg-rplk-editorial pt-[70px] pb-[110px] md:pb-[120px]"
      aria-labelledby="rplk-stats-heading"
    >
      <div className="rplk-editorial-container">
        <h2
          id="rplk-stats-heading"
          className="font-rplk-serif font-normal italic text-[clamp(2.25rem,5vw,4.375rem)] leading-[1.03] text-rplk-ink tracking-normal mb-[60px] md:mb-[80px]"
        >
          Números que falam por si.
        </h2>

        <div className="grid md:grid-cols-3 divide-y divide-rplk-ink/15 md:divide-y-0 border-t border-rplk-ink/15">
          <div className="flex flex-col justify-center gap-5 text-center min-h-[240px] py-[55px] px-6 md:px-10 md:border-r border-rplk-ink/15">
            <p
              className="font-rplk-serif font-light italic leading-[0.92] text-rplk-ink tracking-normal"
              style={{ fontSize: 'clamp(5rem,18vw,8.125rem)' }}
            >
              6
            </p>
            <p className="mx-auto max-w-[14rem] font-rplk-sans text-[14px] font-normal uppercase tracking-rplk-nav text-rplk-ink/55 leading-normal">
              Projetos vendidos antes da entrega
            </p>
          </div>
          <div className="flex flex-col justify-center gap-5 text-center min-h-[240px] py-[55px] px-6 md:px-10 md:border-r border-rplk-ink/15">
            <p
              className="font-rplk-serif font-light italic leading-[0.92] text-rplk-ink tracking-normal"
              style={{ fontSize: 'clamp(5rem,18vw,8.125rem)' }}
            >
              +28%
            </p>
            <p className="mx-auto max-w-[14rem] font-rplk-sans text-[14px] font-normal uppercase tracking-rplk-nav text-rplk-ink/55 leading-normal">
              Média de valorização em carteira selecionada
            </p>
          </div>
          <div className="flex flex-col justify-center gap-5 text-center min-h-[240px] py-[55px] px-6 md:px-10">
            <p
              className="font-rplk-serif font-light italic leading-[0.92] text-rplk-ink tracking-normal"
              style={{ fontSize: 'clamp(5rem,18vw,8.125rem)' }}
            >
              100%
            </p>
            <p className="mx-auto max-w-[14rem] font-rplk-sans text-[14px] font-normal uppercase tracking-rplk-nav text-rplk-ink/55 leading-normal">
              Foco residencial
            </p>
          </div>
        </div>

        <div className="border-b border-rplk-ink/15 mt-0" />
      </div>
    </section>
  )
}
