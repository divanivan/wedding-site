"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
     <div className="absolute inset-0 z-0">
  <video
    autoPlay
    muted
    loop
    playsInline
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: mounted ? 1 : 0,
      transform: mounted ? "scale(1)" : "scale(1.04)",
      transition: `opacity 2s ${ease} 0.1s, transform 6s ${ease} 0.1s`,
    }}
  >
    <source src="/images/video/backgr.mp4" type="video/mp4" />
      </video>
    <div className="absolute inset-0 bg-background/65" />
   </div>

      {/* Floating ambient gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 30% 60%, oklch(0.82 0.035 60 / 0.08) 0%, transparent 70%)",
          animation: "ambientDrift 18s ease-in-out infinite alternate",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-6">

        {/* Label */}
        <p
          className="font-sans text-xs tracking-[0.32em] uppercase text-muted-foreground"
          style={reveal(0.1)}
        >
          Свадебное приглашение
        </p>

        {/* Names — clipPath reveal left→right */}
        <div style={reveal(0.35)}>
          <svg
            viewBox="0 0 800 150"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: "clamp(300px, 88vw, 820px)",
              height: "auto",
              overflow: "visible",
            }}
            aria-label="Ivan & Nelli"
          >
            <defs>
              <clipPath id="revealClip">
                <rect
                  x="0"
                  y="0"
                  width="800"
                  height="150"
                  style={{
                    transformOrigin: "left center",
                    transform: mounted ? "scaleX(1)" : "scaleX(0)",
                    transition: mounted
                      ? "transform 5s cubic-bezier(0.25, 0, 0.1, 1) 0.5s"
                      : "none",
                  }}
                />
              </clipPath>
            </defs>

            {/* Ghost outline */}
            <text
              x="400"
              y="118"
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-tangerine)",
                fontSize: "124px",
                fontWeight: 400,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "0.4px",
                opacity: 0.1,
              }}
              className="text-foreground"
            >
              Ivan &amp; Nelli
            </text>

            {/* Main text revealed by clipPath */}
            <text
              x="400"
              y="118"
              textAnchor="middle"
              clipPath="url(#revealClip)"
              style={{
                fontFamily: "var(--font-tangerine)",
                fontSize: "124px",
                fontWeight: 400,
                fill: "currentColor",
              }}
              className="text-foreground"
            >
              Ivan &amp; Nelli
            </text>
          </svg>
        </div>

        {/* Date divider */}
        <div className="flex items-center gap-4 mt-2" style={reveal(0.6)}>
          <span className="block w-12 h-px bg-foreground/20" />
          <p className="font-sans text-xs tracking-[0.32em] uppercase text-muted-foreground">
            3 · 10 · 2026
          </p>
          <span className="block w-12 h-px bg-foreground/20" />
        </div>

        {/* Subtitle */}
        <p
          className="font-serif font-light text-base text-muted-foreground mt-4 max-w-sm text-balance leading-relaxed"
          style={reveal(0.85)}
        >
          Мы будем рады разделить с вами этот особенный день.
        </p>

        {/* CTA */}
        <a
          href="#rsvp"
          className="mt-8 font-sans text-xs tracking-[0.22em] uppercase border border-foreground/35 text-foreground/65 px-8 py-3"
          style={{
            ...reveal(1.1),
            transition: `opacity 1.4s ${ease} 1.1s, transform 1.4s ${ease} 1.1s, background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease`,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = "var(--foreground)"
            el.style.color = "var(--background)"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = "transparent"
            el.style.color = ""
          }}
        >
          Ответить на приглашение
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={reveal(1.5, { opacity: mounted ? 0.35 : 0 })}
      >
        <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
          Листать
        </span>
        <span
          className="block w-px h-10 bg-foreground/25"
          style={{ animation: "scrollPulse 2.4s ease-in-out infinite" }}
        />
      </div>

      <style>{`
        @keyframes ambientDrift {
          0%   { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(4%, -3%) scale(1.05); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.25; transform: scaleY(1); }
          50%       { opacity: 0.7;  transform: scaleY(0.7); }
        }
      `}</style>
    </section>
  )
}
