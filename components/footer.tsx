import { FadeIn } from "@/components/fade-in"

const navItems = [
  { label: "История", href: "#story" },
  { label: "Галерея", href: "#gallery" },
  { label: "Детали", href: "#details" },
  { label: "RSVP", href: "#rsvp" },
]

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-border bg-background">
      <FadeIn threshold={0.05}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-serif font-light text-xl text-foreground/65">Ivan &amp; Nelli</p>

          <div className="flex flex-col items-center gap-1">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              03 · 10 · 2026
            </p>
            <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-muted-foreground/45">
              С любовью и радостью
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground"
                    style={{
                      transition:
                        "color 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.color = "var(--foreground)"
                      el.style.transform = "translateY(-2px)"
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.color = ""
                      el.style.transform = "translateY(0)"
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </FadeIn>
    </footer>
  )
}
