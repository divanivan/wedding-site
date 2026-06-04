"use client"

import { useEffect, useState } from "react"
import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { Gallery } from "@/components/gallery"
import { EventDetails } from "@/components/event-details"
import { RsvpForm } from "@/components/rsvp-form"
import { Footer } from "@/components/footer"

/**
 * Wraps the full page in a cinematic page-load reveal:
 * soft fade-in + 12px upward drift over 1s, then settles.
 */
function PageReveal({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 40)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0px)" : "translateY(12px)",
        transition: "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </div>
  )
}

export default function WeddingPage() {
  return (
    <PageReveal>
      <main className="min-h-screen bg-background">
        <Nav />
        <Hero />
        <Gallery />
        <EventDetails />
        <RsvpForm />
        <Footer />
      </main>
    </PageReveal>
  )
}
