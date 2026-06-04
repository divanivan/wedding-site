"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useLang } from "@/components/lang-context"

const hrefs = ["#gallery", "#details", "#rsvp"]

function ArmeniaFlag({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 900 450" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width="900" height="150" y="0" fill="#D90012" />
      <rect width="900" height="150" y="150" fill="#0033A0" />
      <rect width="900" height="150" y="300" fill="#F2A800" />
    </svg>
  )
}

function RussiaFlag({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 900 450" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width="900" height="150" y="0" fill="#FFFFFF" />
      <rect width="900" height="150" y="150" fill="#0039A6" />
      <rect width="900" height="150" y="300" fill="#D52B1E" />
    </svg>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { lang, setLang, t } = useLang()
  const tr = t.nav

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!tr) return null

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        scrolled
          ? "bg-background/96 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      )}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(-8px)",
        transition:
          "opacity 1s cubic-bezier(0.22,1,0.36,1) 0.2s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.2s, background-color 0.7s ease, border-color 0.7s ease",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a
          href="#hero"
          className="font-serif text-sm tracking-[0.2em] uppercase text-foreground/65 hover:text-foreground transition-colors duration-400"
        >
          I &amp; N
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {tr.links.map((label: string, i: number) => (
            <li key={hrefs[i]}>
              <a
                href={hrefs[i]}
                className="font-sans text-xs tracking-[0.16em] uppercase text-foreground/55 hover:text-foreground transition-colors duration-400"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "ru" ? "hy" : "ru")}
            title={lang === "ru" ? "Переключить на армянский" : "Անցնել ռուսերենի"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 10px",
              border: "1px solid oklch(var(--foreground) / 0.2)",
              background: "transparent",
              cursor: "pointer",
              transition: "border-color 0.3s ease, transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "oklch(var(--foreground) / 0.5)"
              ;(e.currentTarget as HTMLElement).style.transform = "scale(1.05)"
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "oklch(var(--foreground) / 0.2)"
              ;(e.currentTarget as HTMLElement).style.transform = "scale(1)"
            }}
          >
            {lang === "ru" ? <ArmeniaFlag size={28} /> : <RussiaFlag size={28} />}
          </button>

          <a
            href="#rsvp"
            className="hidden md:inline-block font-sans text-xs tracking-[0.16em] uppercase border border-foreground/25 text-foreground/65 hover:border-foreground hover:text-foreground hover:bg-foreground hover:text-background transition-all duration-500 px-5 py-2"
          >
            {tr.cta}
          </a>
        </div>
      </nav>
    </header>
  )
}