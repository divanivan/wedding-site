"use client"

import { FadeIn } from "@/components/fade-in"

const chapters = [
  {
    year: "2019",
    title: "Первая встреча",
    text: "познакомились в парке.",
  },
  {
    year: "2022",
    title: "Путь вместе",
    text: "Через времена года и города они открывали мир рядом друг с другом. Каждое совместное приключение лишь укрепляло то, что и без слов было очевидно: они нашли дом друг в друге.",
  },
  {
    year: "2026",
    title: "Навсегда",
    text: "Третьего октября, в окружении самых близких, Иван и Нелли произнесут слова, которые останутся с ними навсегда. История любви, рождённая в тишине, — теперь звучит в полный голос.",
  },
]

export function OurStory() {
  return (
    <section id="story" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <FadeIn blur>
          <div className="text-center mb-20">
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-4">
              Как всё началось
            </p>
            <h2 className="font-serif font-light text-[clamp(2.5rem,5vw,4rem)] text-foreground">
              Наша история
            </h2>
            <div className="mx-auto mt-5 w-16 h-px bg-foreground/20" />
          </div>
        </FadeIn>

        {/* Chapters */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {chapters.map((chapter, i) => (
            <FadeIn key={chapter.year} delay={i * 0.18} blur>
              <article
                className="flex flex-col gap-5 group"
                style={{
                  transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = "translateY(0px)"
                }}
              >
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent-foreground/45 border-t border-border pt-5">
                  {chapter.year}
                </span>
                <h3 className="font-serif font-light text-xl text-foreground">
                  {chapter.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed font-light">
                  {chapter.text}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* Divider quote */}
        <FadeIn delay={0.3} blur>
          <blockquote className="text-center mt-24 max-w-2xl mx-auto">
            <p className="font-serif font-light italic text-[clamp(1.1rem,2.5vw,1.5rem)] text-foreground/55 leading-relaxed text-pretty">
              &ldquo;Я нашёл того, кого любит душа моя.&rdquo;
            </p>
            <cite className="block mt-4 font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground not-italic">

            </cite>
          </blockquote>
        </FadeIn>
      </div>
    </section>
  )
}
