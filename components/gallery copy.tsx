"use client"

import Image from "next/image"
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
                className={`relative overflow-hidden ${photo.aspect} ${photo.colSpan}`}
                style={{
                  transition: "box-shadow 0.6s cubic-bezier(0.22,1,0.36,1)",
                }}
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
                    transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease",
                    willChange: "transform",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLImageElement).style.transform = "scale(1.02)"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLImageElement).style.transform = "scale(1)"
                  }}
                />
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
    </section>
  )
}
