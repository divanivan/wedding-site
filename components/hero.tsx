"use client"

import { useEffect, useState } from "react"
import { useLang } from "@/components/lang-context"

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const { t } = useLang()
  const tr = t.hero

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(timer)
  }, [])

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)"

  function reveal(delay: number, extra?: React.CSSProperties): React.CSSProperties {
    return {
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0px)" : "translateY(22px)",
      transition: `opacity 1.4s ${ease} ${delay}s, transform 1.4s ${ease} ${delay}s`,
      ...extra,
    }
  }

  if (!tr) return null // Ждём загрузки переводов

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video 
  autoPlay 
  muted 
  loop 
  playsInline 
  poster="/images/video-poster.jpg"
  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: mounted ? 0.25 : 0, transform: mounted ? "scale(1)" : "scale(1.04)", transition: `opacity 2s ${ease} 0.1s, transform 6s ${ease} 0.1s` }}
>
  <source src="/images/video/backgr.mp4" type="video/mp4" />
</video>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse 60% 40% at 30% 60%, oklch(0.82 0.035 60 / 0.15) 0%, transparent 70%)", animation: "ambientDrift 18s ease-in-out infinite alternate" }} />

      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-6">
        <p className="font-sans text-xs tracking-[0.32em] uppercase text-foreground/70" style={reveal(0.1)}>
          {tr.label}
        </p>

        <div style={reveal(0.35)}>
          <svg viewBox="0 0 800 150" xmlns="http://www.w3.org/2000/svg" style={{ width: "clamp(300px, 88vw, 820px)", height: "auto", overflow: "visible" }} aria-label="Ivan & Nelli">
            <defs>
              <clipPath id="revealClip">
                <rect x="0" y="0" width="800" height="150" style={{ transformOrigin: "left center", transform: mounted ? "scaleX(1)" : "scaleX(0)", transition: mounted ? "transform 5s cubic-bezier(0.25, 0, 0.1, 1) 0.5s" : "none" }} />
              </clipPath>
            </defs>
            <text x="400" y="118" textAnchor="middle" style={{ fontFamily: "var(--font-tangerine)", fontSize: "124px", fontWeight: 400, fill: "none", stroke: "currentColor", strokeWidth: "0.6px", opacity: 0.2 }} className="text-foreground">Ivan &amp; Nelli</text>
            <text x="400" y="118" textAnchor="middle" clipPath="url(#revealClip)" style={{ fontFamily: "var(--font-tangerine)", fontSize: "124px", fontWeight: 400, fill: "currentColor", opacity: 1 }} className="text-foreground">Ivan &amp; Nelli</text>
          </svg>
        </div>

        <div className="flex items-center gap-4 mt-2" style={reveal(0.6)}>
          <span className="block w-12 h-px bg-foreground/30" />
          <p className="font-sans text-xs tracking-[0.32em] uppercase text-foreground/70">{tr.date}</p>
          <span className="block w-12 h-px bg-foreground/30" />
        </div>

        <p className="font-serif font-light text-base text-foreground/70 mt-4 max-w-sm text-balance leading-relaxed" style={reveal(0.85)}>
          {tr.subtitle}
        </p>

        <a href="#rsvp" className="mt-8 font-sans text-xs tracking-[0.22em] uppercase border border-foreground/45 text-foreground/75 px-8 py-3"
          style={{ ...reveal(1.1), transition: `opacity 1.4s ${ease} 1.1s, transform 1.4s ${ease} 1.1s, background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease` }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--foreground)"; e.currentTarget.style.color = "var(--background)" }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "" }}
        >
          {tr.cta}
        </a>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={reveal(1.5, { opacity: mounted ? 0.5 : 0 })}>
        <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-foreground/50">{tr.scroll}</span>
        <span className="block w-px h-10 bg-foreground/35" style={{ animation: "scrollPulse 2.4s ease-in-out infinite" }} />
      </div>

      <style>{`
        @keyframes ambientDrift { 0% { transform: translate(0%,0%) scale(1); } 100% { transform: translate(4%,-3%) scale(1.05); } }
        @keyframes scrollPulse { 0%,100% { opacity:0.25; transform:scaleY(1); } 50% { opacity:0.7; transform:scaleY(0.7); } }
      `}</style>
    </section>
  )
}