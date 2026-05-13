import { ASSETS } from '../assets/figma'

export default function Carrossel() {
  const items = Array.from({ length: 10 }, (_, i) => i)

  return (
    <section
      className="bg-ambar-terracotta py-5 overflow-hidden"
      aria-label="Identidade visual Âmbar"
      data-node-id="338:25"
    >
      <div className="relative w-full">
        <div className="flex w-max animate-marquee gap-[99px] px-[80px]">
          {[...items, ...items].map((_, idx) => (
            <img
              key={idx}
              src={ASSETS.ambarWordmarkSmall}
              alt=""
              aria-hidden
              className="h-[50px] w-[175px] shrink-0 select-none"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
