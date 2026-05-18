import { Link } from 'react-router-dom'
import { blogPosts } from '../../data/rplk-content'

export default function RplkBlog({ standalone = false }: { standalone?: boolean }) {
  const sectionPad = standalone
    ? 'scroll-mt-[88px] pt-[calc(71px+1.75rem)] pb-24 md:pt-[calc(71px+2.25rem)] md:pb-32'
    : 'scroll-mt-[88px] py-[90px] md:py-[110px]'

  const introClass = standalone
    ? 'mt-8 max-w-[42rem] font-rplk-serif font-normal italic text-[clamp(1rem,2vw,1.5625rem)] leading-[1.55] text-rplk-muted'
    : 'mt-6 max-w-2xl font-rplk-serif font-normal italic text-[clamp(0.9375rem,1.8vw,1.35rem)] leading-relaxed text-rplk-muted'

  return (
    <section id="blog" className={`bg-rplk-soft ${sectionPad}`} aria-labelledby="rplk-blog-heading">
      <div className="rplk-editorial-container">
        <p className="font-rplk-sans text-[clamp(1rem,2vw,1.125rem)] font-normal uppercase tracking-rplk-nav text-rplk-gold">
          Conteúdo
        </p>
        <h2
          id="rplk-blog-heading"
          className={`font-rplk-serif font-normal italic text-rplk-white tracking-normal ${standalone ? 'mt-5 text-[clamp(2.25rem,5vw,4.375rem)] leading-[1.03]' : 'mt-4 text-[clamp(2rem,4.5vw,3rem)] leading-[1.05]'}`}
        >
          Blog RPLK
        </h2>
        <p className={introClass}>
          Somente textos orientados ao investidor — sem narrativa industrial. Para projetos em curso e fichas,
          use{' '}
          <Link
            to="/empreendimentos"
            className="text-white/92 underline decoration-rplk-gold/45 underline-offset-[5px] transition-colors hover:text-rplk-gold hover:decoration-rplk-gold"
          >
            Empreendimentos
          </Link>
          ; para o manifesto da empresa,{' '}
          <Link
            to="/#sobre"
            className="text-white/92 underline decoration-rplk-gold/45 underline-offset-[5px] transition-colors hover:text-rplk-gold hover:decoration-rplk-gold"
          >
            Sobre
          </Link>{' '}
          na home.
        </p>
      </div>

      <div
        className={`mt-14 md:mt-[90px] flex w-full gap-6 overflow-x-auto overflow-y-hidden scroll-smooth px-[40px] pb-6 pt-1 [scrollbar-width:thin] snap-x snap-mandatory md:gap-8 lg:pl-[120px] lg:pr-[120px] ${standalone ? 'md:pb-8' : ''}`}
        style={{ scrollbarColor: 'rgba(255,255,255,0.25) transparent' }}
        tabIndex={0}
        role="region"
        aria-label="Artigos do blog em carrossel horizontal"
      >
        {blogPosts.map((post) => (
          <article
            key={post.title}
            className={`group flex shrink-0 snap-start flex-col items-stretch overflow-hidden bg-rplk-midnight/60 sm:w-[300px] md:w-[320px] ${standalone ? 'w-[min(82vw,360px)]' : 'w-[min(78vw,340px)]'}`}
          >
            <div className="relative aspect-[16/10] w-full max-h-[160px] shrink-0 overflow-hidden sm:max-h-[150px] md:max-h-[170px]">
              <img
                src={post.image}
                alt=""
                className="absolute inset-0 block h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.08]"
              />
            </div>
            <div className="flex flex-col gap-3 p-[30px]">
              <p className="font-rplk-serif font-normal italic text-[clamp(1rem,2vw,1.35rem)] leading-snug text-rplk-gold/90">
                Editorial
              </p>
              <h3 className="font-rplk-sans text-[clamp(1rem,2vw,1.35rem)] font-normal uppercase tracking-rplk-nav leading-[1.2] text-rplk-white transition-colors group-hover:text-rplk-gold">
                {post.title}
              </h3>
              <p
                className={`font-rplk-serif font-normal italic leading-relaxed text-rplk-muted ${standalone ? 'line-clamp-3 text-[clamp(0.8125rem,1.5vw,1rem)]' : 'line-clamp-2 text-[clamp(0.75rem,1.4vw,0.9375rem)]'}`}
              >
                {post.excerpt}
              </p>
              <span className="pt-2 font-rplk-sans text-[14px] uppercase tracking-rplk-nav text-rplk-gold/55">
                Leitura editorial
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
