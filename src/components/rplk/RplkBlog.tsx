import { blogPosts } from '../../data/rplk-content'

export default function RplkBlog() {
  return (
    <section id="blog" className="bg-rplk-soft py-16 md:py-20 scroll-mt-[120px]" aria-labelledby="rplk-blog-heading">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <p className="text-[11px] uppercase tracking-[0.45em] text-rplk-gold font-rplk-sans">Conteúdo</p>
        <h2 id="rplk-blog-heading" className="mt-2 font-rplk-serif text-[clamp(1.75rem,3.5vw,2.75rem)] text-rplk-white tracking-tight">
          Blog RPLK
        </h2>
        <p className="mt-3 max-w-2xl text-rplk-muted font-rplk-sans text-sm leading-relaxed">
          Somente conteúdos orientados ao investidor — sem narrativa industrial.
        </p>
      </div>

      <div
        className="mt-8 flex w-full gap-4 overflow-x-auto overflow-y-hidden scroll-smooth px-5 pb-3 pt-1 [scrollbar-width:thin] snap-x snap-mandatory md:gap-5 md:px-10 lg:pl-14 lg:pr-8"
        style={{ scrollbarColor: 'rgba(255,255,255,0.25) transparent' }}
        tabIndex={0}
        role="region"
        aria-label="Artigos do blog em carrossel horizontal"
      >
        {blogPosts.map((post) => (
          <a
            key={post.title}
            href="#blog"
            className="group flex w-[min(78vw,340px)] shrink-0 snap-start flex-col items-stretch overflow-hidden border border-white/[0.12] bg-rplk-midnight/55 transition-colors hover:border-rplk-gold/45 sm:w-[300px] md:w-[320px]"
          >
            <div className="relative aspect-[16/10] w-full max-h-[160px] shrink-0 overflow-hidden sm:max-h-[150px]">
              <img
                src={post.image}
                alt=""
                className="absolute inset-0 block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col gap-2 p-4">
              <h3 className="font-rplk-serif text-lg leading-snug text-rplk-white transition-colors group-hover:text-rplk-gold md:text-[1.05rem]">
                {post.title}
              </h3>
              <p className="line-clamp-2 text-xs leading-relaxed text-rplk-muted font-rplk-sans">{post.excerpt}</p>
              <span className="pt-1 text-[9px] uppercase tracking-[0.28em] text-rplk-gold/55 font-rplk-sans">
                Leitura editorial
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
