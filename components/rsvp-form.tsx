"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/fade-in"

type FormState = "idle" | "loading" | "success" | "error"

/** Input with soft border-glow on focus */
function LuxuryInput({
  id,
  name,
  type = "text",
  placeholder,
  required,
  min,
  max,
  defaultValue,
  className,
}: {
  id: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  min?: number
  max?: number
  defaultValue?: number
  className?: string
}) {
  const [focused, setFocused] = useState(false)

  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      min={min}
      max={max}
      defaultValue={defaultValue}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={cn(
        "bg-transparent outline-none py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground/35",
        className
      )}
      style={{
        borderBottom: `1px solid ${focused ? "oklch(0.35 0.01 60 / 0.7)" : "oklch(0.88 0.01 80)"}`,
        boxShadow: focused ? "0 1px 0 0 oklch(0.35 0.01 60 / 0.25)" : "none",
        transition: "border-color 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}
    />
  )
}

function LuxuryTextarea({
  id,
  name,
  rows,
  placeholder,
}: {
  id: string
  name: string
  rows: number
  placeholder?: string
}) {
  const [focused, setFocused] = useState(false)

  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="bg-transparent outline-none py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground/35 resize-none"
      style={{
        borderBottom: `1px solid ${focused ? "oklch(0.35 0.01 60 / 0.7)" : "oklch(0.88 0.01 80)"}`,
        boxShadow: focused ? "0 1px 0 0 oklch(0.35 0.01 60 / 0.25)" : "none",
        transition: "border-color 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}
    />
  )
}

/** Smooth success state with staggered fade-in */
function SuccessState() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 60)
    return () => clearTimeout(t)
  }, [])

  const ease = "cubic-bezier(0.22,1,0.36,1)"

  return (
    <section id="rsvp" className="py-32 px-6 bg-card">
      <div className="max-w-lg mx-auto text-center">
        {/* Icon */}
        <div
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "scale(1)" : "scale(0.88)",
            transition: `opacity 1s ${ease} 0.1s, transform 1s ${ease} 0.1s`,
          }}
          className="inline-flex items-center justify-center w-16 h-16 border border-foreground/18 mb-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground/55"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p
          className="font-sans text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-5"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 1s ${ease} 0.3s, transform 1s ${ease} 0.3s`,
          }}
        >
          Спасибо
        </p>
        <h2
          className="font-serif font-light text-4xl text-foreground mb-5"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(14px)",
            transition: `opacity 1.1s ${ease} 0.5s, transform 1.1s ${ease} 0.5s`,
          }}
        >
          Ваш ответ получен
        </h2>
        <p
          className="font-sans text-sm text-muted-foreground leading-relaxed"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 1.1s ${ease} 0.7s, transform 1.1s ${ease} 0.7s`,
          }}
        >
          Мы рады вашему ответу и с нетерпением ждём возможности отметить этот особенный день вместе с вами.
        </p>
      </div>
    </section>
  )
}

export function RsvpForm() {
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null)
  const [formState, setFormState] = useState<FormState>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [pressed, setPressed] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState("loading")
    setErrorMessage("")

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      attendance: attendance ?? "no",
      guests: parseInt(
        (form.elements.namedItem("guests") as HTMLInputElement)?.value || "1",
        10
      ),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || "Something went wrong. Please try again.")
      }

      setFormState("success")
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.")
      setFormState("error")
    }
  }

  if (formState === "success") return <SuccessState />

  return (
    <section id="rsvp" className="py-32 px-6 bg-card">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <FadeIn blur>
          <div className="text-center mb-14">
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-4">
              Ответьте, пожалуйста, до 1 Августа 2026
            </p>
            <h2 className="font-serif font-light text-[clamp(2.5rem,5vw,4rem)] text-foreground">
              Пожалуйста, ответьте
            </h2>
            <div className="mx-auto mt-5 w-16 h-px bg-foreground/20" />
          </div>
        </FadeIn>

        <FadeIn delay={0.12} blur>
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground"
              >
                Имя и фамилия <span aria-hidden="true">*</span>
              </label>
              <LuxuryInput
                id="name"
                name="name"
                placeholder="Ваше имя и фамилия"
                required
                className="w-full"
              />
            </div>

            {/* Attendance */}
            <div className="flex flex-col gap-3">
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                Вы придёте? <span aria-hidden="true">*</span>
              </p>
              <div className="flex gap-4">
                {(["yes", "no"] as const).map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAttendance(val)}
                    className={cn(
                      "flex-1 py-3 font-sans text-xs tracking-[0.2em] uppercase border",
                      attendance === val
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground"
                    )}
                    style={{
                      transition:
                        "background-color 0.45s cubic-bezier(0.22,1,0.36,1), color 0.45s ease, border-color 0.45s ease",
                    }}
                  >
                    {val === "yes" ? "С радостью приду" : "К сожалению, не смогу"}
                  </button>
                ))}
              </div>
            </div>

            {/* Guests — only if attending */}
            {attendance === "yes" && (
              <div
                className="flex flex-col gap-2"
                style={{
                  animation: "guestReveal 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
                }}
              >
                <label
                  htmlFor="guests"
                  className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground"
                >
                  Количество гостей
                </label>
                <LuxuryInput
                  id="guests"
                  name="guests"
                  type="number"
                  min={1}
                  max={10}
                  defaultValue={1}
                  className="w-24"
                />
              </div>
            )}

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground"
              >
                Сообщение{" "}
                <span className="opacity-45">(необязательно)</span>
              </label>
              <LuxuryTextarea
                id="message"
                name="message"
                rows={3}
                placeholder="Слова для молодожёнов..."
              />
            </div>

            {/* Error */}
            {formState === "error" && (
              <p
                className="font-sans text-xs text-destructive"
                role="alert"
                style={{ animation: "guestReveal 0.5s cubic-bezier(0.22,1,0.36,1) forwards" }}
              >
                {errorMessage}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={formState === "loading" || attendance === null}
              onMouseDown={() => setPressed(true)}
              onMouseUp={() => setPressed(false)}
              onMouseLeave={() => setPressed(false)}
              className="mt-2 font-sans text-xs tracking-[0.25em] uppercase border border-foreground text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                padding: "1rem",
                transition:
                  "background-color 0.5s cubic-bezier(0.22,1,0.36,1), color 0.5s ease, transform 0.2s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease",
                transform: pressed ? "scale(0.985)" : "scale(1)",
              }}
              onMouseEnter={(e) => {
                if (formState !== "loading" && attendance !== null) {
                  const el = e.currentTarget
                  el.style.backgroundColor = "var(--foreground)"
                  el.style.color = "var(--background)"
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.backgroundColor = "transparent"
                el.style.color = ""
                setPressed(false)
              }}
            >
              {formState === "loading" ? "Отправляем..." : "Подтвердить участие"}
            </button>
          </form>

          <style>{`
            @keyframes guestReveal {
              from { opacity: 0; transform: translateY(10px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </FadeIn>
      </div>
    </section>
  )
}
