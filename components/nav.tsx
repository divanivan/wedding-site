"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const links = [
  { label: "История", href: "#story" },
  { label: "Галерея", href: "#gallery" },
  { label: "Детали", href: "#details" },
  { label: "RSVP", href: "#rsvp" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
        transition: "opacity 1s cubic-bezier(0.22,1,0.36,1) 0.2s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.2s, background-color 0.7s ease, border-color 0.7s ease",
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
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-xs tracking-[0.16em] uppercase text-foreground/55 hover:text-foreground transition-colors duration-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#rsvp"
          className="hidden md:inline-block font-sans text-xs tracking-[0.16em] uppercase border border-foreground/25 text-foreground/65 hover:border-foreground hover:text-foreground hover:bg-foreground hover:text-background transition-all duration-500 px-5 py-2"
        >
          Участвовать
        </a>
      </nav>
    </header>
  )
}
