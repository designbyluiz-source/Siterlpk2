const pilares = [
  {
    n: '01',
    title: 'Valorização',
    body: 'Investimentos desenhados para crescer.',
  },
  {
    n: '02',
    title: 'Inteligência urbana',
    body: 'Bairros analisados com precisão.',
  },
  {
    n: '03',
    title: 'Execução',
    body: 'Engenharia, prazo e entrega sem ruído.',
  },
] as const

export default function RplkPilares() {
  return (
    <section className="bg-rplk-midnight py-24 md:py-32 border-y border-white/[0.12]" aria-labelledby="rplk-pilares-heading">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <h2
          id="rplk-pilares-heading"
          className="font-rplk-serif text-[clamp(2rem,3.5vw,3rem)] text-rplk-white tracking-tight max-w-xl"
        >
          Três pilares que sustentam cada decisão.
        </h2>
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10 lg:gap-16">
          {pilares.map((p) => (
            <div key={p.n} className="border-t border-rplk-gold/25 pt-8">
              <p className="text-[11px] uppercase tracking-[0.45em] text-rplk-gold font-rplk-sans">{p.n}</p>
              <h3 className="mt-5 font-rplk-serif text-2xl md:text-3xl text-rplk-white tracking-tight">{p.title}</h3>
              <p className="mt-4 text-rplk-muted font-rplk-sans text-[15px] leading-relaxed max-w-sm">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
