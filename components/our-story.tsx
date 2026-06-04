"use client"

import { FadeIn } from "@/components/fade-in"
import { useLang } from "@/components/lang-context"

export function OurStory() {
  const { t } = useLang()
  const tr = t.story

  if (!tr) return null

  return (
    <section id="story" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn blur>
          <div className="text-center mb-20">
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-4">{tr.label}</p>
            <h2 className="font-serif font-light text-[clamp(2.5rem,5vw,4rem)] text-foreground">{tr.title}</h2>
            <div className="mx-auto mt-5 w-16 h-px bg-foreground/20" />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {tr.chapters.map((chapter, i) => (
            <FadeIn key={chapter.year} delay={i * 0.18} blur>
              <article className="flex flex-col gap-5 group" style={{ transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0px)" }}
              >
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent-foreground/45 border-t border-border pt-5">{chapter.year}</span>
                <h3 className="font-serif font-light text-xl text-foreground">{chapter.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed font-light">{chapter.text}</p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} blur>
          <blockquote className="text-center mt-24 max-w-2xl mx-auto">
            <p className="font-serif font-light italic text-[clamp(1.1rem,2.5vw,1.5rem)] text-foreground/55 leading-relaxed text-pretty">
              &ldquo;{tr.quote}&rdquo;
            </p>
          </blockquote>
        </FadeIn>
      </div>
    </section>
  )
}
