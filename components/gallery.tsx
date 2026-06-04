"use client"

import Image from "next/image"
import { useEffect, useState, useCallback } from "react"
import { createPortal } from "react-dom"
import { FadeIn } from "@/components/fade-in"
import { useLang } from "@/components/lang-context"

const photos = [
  { src: "/images/gallery-1.jpg", alt: "Ivan and Nelli portrait" },
  { src: "/images/gallery-2.jpg", alt: "Wedding venue" },
  { src: "/images/gallery-3.jpg", alt: "Bridal bouquet" },
  { src: "/images/gallery-4.jpg", alt: "Wedding rings" },
]

export function Gallery() {
  const [mounted, setMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const { t } = useLang()
  const tr = t.gallery

  const [touchStart, setTouchStart] = useState<number>(0)
  const [touchEnd, setTouchEnd] = useState<number>(0)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % photos.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50) nextSlide()
    if (distance < -50) prevSlide()
    setTouchStart(0)
    setTouchEnd(0)
  }

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const nextLightbox = useCallback(() => setLightboxIndex((i) => i === null ? null : (i + 1) % photos.length), [])
  const prevLightbox = useCallback(() => setLightboxIndex((i) => i === null ? null : (i - 1 + photos.length) % photos.length), [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") prevLightbox()
      if (e.key === "ArrowRight") nextLightbox()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [lightboxIndex, prevLightbox, nextLightbox])

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [lightboxIndex])

  if (!tr) return null

  return (
    <section id="gallery" className="py-28 px-6 bg-card transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <FadeIn blur>
          <div className="text-center mb-16">
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-4">{tr.label}</p>
            <h2 className="font-serif font-light text-[clamp(2.5rem,5vw,4rem)] text-foreground">{tr.title}</h2>
            <div className="mx-auto mt-5 w-16 h-px bg-foreground/20" />
          </div>
        </FadeIn>

        {/* ОБНОВЛЕННЫЙ КОНТЕЙНЕР: Фиксированная высота под экран, без жесткого кропа */}
        <FadeIn delay={0.1}>
          <div 
            className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden group select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Лента слайдов */}
            <div 
              className="flex h-full w-full transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1)"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {photos.map((photo, i) => (
                <div 
                  key={photo.src} 
                  className="relative min-w-full h-full cursor-zoom-in flex items-center justify-center"
                  onClick={() => openLightbox(i)}
                >
                  <Image 
                    src={photo.src} 
                    alt={photo.alt} 
                    fill 
                    className="object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                    sizes="(max-w-768px) 100vw, 850px"
                    priority={i === 0}
                  />
                  
                  {/* Лупа при наведении на ПК */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex pointer-events-none">
                    <div className="p-3 rounded-full bg-black/15 backdrop-blur-sm border border-white/20 text-white transform scale-95 group-hover:scale-100 transition-all duration-500">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.5" y1="16.5" x2="22" y2="22" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Стрелочки навигации */}
            <button 
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 border border-foreground/15 text-foreground/65 bg-card/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-foreground hover:text-foreground"
              style={{ cursor: "pointer" }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
                <polyline points="11,3 5,9 11,15" />
              </svg>
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 border border-foreground/15 text-foreground/65 bg-card/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-foreground hover:text-foreground"
              style={{ cursor: "pointer" }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
                <polyline points="7,3 13,9 7,15" />
              </svg>
            </button>
          </div>
        </FadeIn>

        {/* Индикаторы (точки) */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="h-1 transition-all duration-500"
              style={{
                width: currentSlide === i ? "20px" : "6px",
                backgroundColor: currentSlide === i ? "var(--foreground)" : "oklch(from var(--foreground) l c h / 0.15)",
                borderRadius: "2px",
                cursor: "pointer"
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="text-center mt-12 font-sans text-xs tracking-[0.16em] uppercase text-muted-foreground">{tr.footer}</p>
        </FadeIn>
      </div>

      {/* Полноэкранный Лайтбокс */}
      {lightboxIndex !== null && mounted && createPortal(
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center overscroll-none select-none" 
          style={{ background: "oklch(0 0 0 / 0.96)", touchAction: "none", animation: "lbFadeIn 0.3s ease" }} 
          onClick={closeLightbox}
        >
          <div className="relative pointer-events-none" style={{ width: "min(94vw, 1000px)", height: "min(85vh, 800px)", animation: "lbScaleIn 0.35s cubic-bezier(0.22,1,0.36,1)" }}>
            <Image key={lightboxIndex} src={photos[lightboxIndex].src} alt={photos[lightboxIndex].alt} fill className="object-contain" sizes="94vw" priority />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-xs tracking-[0.2em] uppercase text-white/40">
            {lightboxIndex + 1} / {photos.length}
          </div>

          <button onClick={closeLightbox} className="absolute top-5 right-5 flex items-center justify-center" style={{ width: 44, height: 44, border: "1px solid oklch(1 0 0 / 0.25)", color: "oklch(1 0 0 / 0.7)", background: "rgba(0,0,0,0.2)", cursor: "pointer" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><line x1="2" y1="2" x2="14" y2="14" /><line x1="14" y1="2" x2="2" y2="14" /></svg>
          </button>

          <button onClick={(e) => { e.stopPropagation(); prevLightbox() }} className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center" style={{ width: 48, height: 48, border: "1px solid oklch(1 0 0 / 0.25)", color: "oklch(1 0 0 / 0.7)", background: "transparent", cursor: "pointer" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2"><polyline points="11,3 5,9 11,15" /></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); nextLightbox() }} className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center" style={{ width: 48, height: 48, border: "1px solid oklch(1 0 0 / 0.25)", color: "oklch(1 0 0 / 0.7)", background: "transparent", cursor: "pointer" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2"><polyline points="7,3 13,9 7,15" /></svg>
          </button>
        </div>,
        document.body
      )}

      <style>{`
        @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lbScaleIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </section>
  )
}