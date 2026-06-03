"use client"

import Image from "next/image"
import { useEffect, useState, useCallback } from "react"
import { FadeIn } from "@/components/fade-in"

const photos = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Ivan and Nelli portrait",
    aspect: "aspect-[3/4]",
    colSpan: "col-span-2 md:col-span-1 md:row-span-2",
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Wedding venue",
    aspect: "aspect-square",
    colSpan: "",
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Bridal bouquet",
    aspect: "aspect-[3/4]",
    colSpan: "",
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "Wedding rings",
    aspect: "aspect-square",
    colSpan: "",
  },
  {
    src: "/images/wedding-hero.jpg",
    alt: "Wedding flowers",
    aspect: "aspect-[4/3]",
    colSpan: "",
  },
]

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const open = (i: number) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length))
  }, [])

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length))
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [lightboxIndex, prev, next])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [lightboxIndex])

  return (
    <section id="gallery" className="py-28 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn blur>
          <div className="text-center mb-16">
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-4">
              Запечатлённые мгновения
            </p>
            <h2 className="font-serif font-light text-[clamp(2.5rem,5vw,4rem)] text-foreground">
              Галерея
            </h2>
            <div className="mx-auto mt-5 w-16 h-px bg-foreground/20" />
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <FadeIn key={photo.src} delay={0.06 * i} threshold={0.08}>
              <div
                className={`relative overflow-hidden cursor-zoom-in ${photo.aspect} ${photo.colSpan}`}
                style={{
                  transition: "box-shadow 0.6s cubic-bezier(0.22,1,0.36,1)",
                }}
                onClick={() => open(i)}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow =
                    "0 16px 48px oklch(0 0 0 / 0.10)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  style={{
                    transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1)",
                    willChange: "transform",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLImageElement).style.transform = "scale(1)"
                  }}
                />

                {/* Hover overlay hint */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100"
                  style={{ transition: "opacity 0.4s ease", background: "oklch(0 0 0 / 0.15)" }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="16.5" y1="16.5" x2="22" y2="22" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <p className="text-center mt-10 font-sans text-xs tracking-[0.16em] uppercase text-muted-foreground">
            Ещё больше воспоминаний впереди · 03.10.2026
          </p>
        </FadeIn>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "oklch(0 0 0 / 0.92)",
            animation: "lbFadeIn 0.3s ease",
          }}
          onClick={close}
        >
          {/* Image */}
          <div
            className="relative"
            style={{
              width: "min(90vw, 900px)",
              height: "min(85vh, 700px)",
              animation: "lbScaleIn 0.35s cubic-bezier(0.22,1,0.36,1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={lightboxIndex}
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Counter */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-xs tracking-[0.2em] uppercase"
            style={{ color: "oklch(1 0 0 / 0.45)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxIndex + 1} / {photos.length}
          </div>

          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-5 right-5 flex items-center justify-center"
            style={{
              width: 44, height: 44,
              border: "1px solid oklch(1 0 0 / 0.25)",
              color: "oklch(1 0 0 / 0.7)",
              background: "transparent",
              cursor: "pointer",
              transition: "border-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.7)"
              ;(e.currentTarget as HTMLElement).style.color = "white"
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.25)"
              ;(e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 0.7)"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
              <line x1="2" y1="2" x2="14" y2="14" />
              <line x1="14" y1="2" x2="2" y2="14" />
            </svg>
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{
              width: 48, height: 48,
              border: "1px solid oklch(1 0 0 / 0.25)",
              color: "oklch(1 0 0 / 0.7)",
              background: "transparent",
              cursor: "pointer",
              transition: "border-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.7)"
              ;(e.currentTarget as HTMLElement).style.color = "white"
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.25)"
              ;(e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 0.7)"
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
              <polyline points="11,3 5,9 11,15" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{
              width: 48, height: 48,
              border: "1px solid oklch(1 0 0 / 0.25)",
              color: "oklch(1 0 0 / 0.7)",
              background: "transparent",
              cursor: "pointer",
              transition: "border-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.7)"
              ;(e.currentTarget as HTMLElement).style.color = "white"
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.25)"
              ;(e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 0.7)"
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
              <polyline points="7,3 13,9 7,15" />
            </svg>
          </button>
        </div>
      )}

      <style>{`
        @keyframes ambientDrift {
          0%   { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(4%, -3%) scale(1.05); }
        }
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lbScaleIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  )
}
