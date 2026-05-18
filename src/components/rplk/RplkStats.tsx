const STATS = [
  {
    value: '12.000+',
    label: 'm² em obras',
  },
  {
    value: '7',
    label: 'anos desenvolvendo projetos em Curitiba',
  },
  {
    value: '100%',
    label: 'foco em studios para investimento',
  },
] as const

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
          {STATS.map(({ value, label }, i) => (
            <div
              key={label}
              className={[
                'flex flex-col justify-center gap-5 text-center min-h-[240px] py-[55px] px-6 md:px-10',
                i < 2 ? 'md:border-r border-rplk-ink/15' : '',
              ].join(' ')}
            >
              <p
                className="font-rplk-serif font-light italic leading-[0.92] text-rplk-ink tracking-normal break-words"
                style={{ fontSize: 'clamp(2.75rem, 10vw, 7rem)' }}
              >
                {value}
              </p>
              <p className="mx-auto max-w-[16rem] font-rplk-sans text-[14px] font-normal uppercase tracking-rplk-nav text-rplk-ink/55 leading-normal">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="border-b border-rplk-ink/15 mt-0" />
      </div>
    </section>
  )
}
