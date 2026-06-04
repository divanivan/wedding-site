"use client"

import Image from "next/image"
import { FadeIn } from "@/components/fade-in"
import { useLang } from "@/components/lang-context"

export function EventDetails() {
  const { t } = useLang()
  const tr = t.details

  if (!tr) return null

  return (
    <section id="details" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn blur>
          <div className="text-center mb-20">
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-4">{tr.label}</p>
            <h2 className="font-serif font-light text-[clamp(2.5rem,5vw,4rem)] text-foreground">{tr.title}</h2>
            <div className="mx-auto mt-5 w-16 h-px bg-foreground/20" />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-12">
            <FadeIn delay={0.1} blur>
              <div className="border-l-2 border-foreground/12 pl-8"
                style={{ transition: "border-color 0.5s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(var(--foreground) / 0.3)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "" }}
              >
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">{tr.dateLabel}</p>
                <p className="font-serif font-light text-3xl text-foreground mb-1">{tr.dateText}</p>
                <p className="font-serif font-light text-2xl text-muted-foreground">2026</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} blur>
              <div>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">{tr.scheduleLabel}</p>
                <ul className="flex flex-col gap-0">
                  {tr.schedule.map((item: { time: string; label: string; desc: string }) => (
                    <li key={item.time} className="flex items-start gap-6 py-4 border-b border-border last:border-0"
                      style={{ transition: "background-color 0.4s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(var(--muted) / 0.5)" }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent" }}
                    >
                      <span className="font-sans text-xs text-muted-foreground w-12 shrink-0 pt-0.5">{item.time}</span>
                      <div>
                        <p className="font-serif font-light text-base text-foreground">{item.label}</p>
                        <p className="font-sans text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.15} blur>
            <div className="flex flex-col gap-5">
              <div className="border-l-2 border-foreground/12 pl-8 mb-2">
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">{tr.venueLabel}</p>
                <p className="font-serif font-light text-xl text-foreground">{tr.venueTitle}</p>
                <p className="font-sans text-sm text-muted-foreground mt-1">{tr.venueHint}</p>
              </div>

              <a href="https://yandex.ru/maps/org/sid_kholl/226809495458/?ll=43.106396%2C44.043269&z=16"
                target="_blank" rel="noopener noreferrer"
                className="relative block overflow-hidden rounded-3xl"
                style={{ aspectRatio: "16 / 10", width: "100%", transition: "box-shadow 0.6s cubic-bezier(0.22,1,0.36,1)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px oklch(0 0 0 / 0.09)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none" }}
              >
                <Image src="/images/place.jpg" alt="Ресторан для свадебного ужина" fill className="absolute inset-0 object-cover" sizes="(max-width: 768px) 100vw, 50vw" style={{ filter: "grayscale(10%)", opacity: 0.95 }} priority />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-background/85 px-4 py-2 text-xs uppercase tracking-[0.22em] text-foreground">
                  {tr.venueHint}
                </span>
              </a>

              <a href="https://yandex.ru/maps/org/sid_kholl/226809495458/?ll=43.106396%2C44.043269&z=16"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-foreground/65 border border-border px-5 py-3 self-start"
                style={{ transition: "color 0.4s ease, border-color 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--foreground)"; el.style.borderColor = "oklch(var(--foreground) / 0.5)"; el.style.transform = "translateY(-2px)" }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = ""; el.style.borderColor = ""; el.style.transform = "translateY(0)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {tr.mapBtn}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}