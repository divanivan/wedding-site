"use client"

import { useFadeIn } from "@/hooks/use-fade-in"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  threshold?: number
  blur?: boolean
  className?: string
}

/**
 * Shared luxury scroll-reveal component.
 * Fades in with an upward drift and optional soft blur-to-sharp transition.
 * Uses cinematic cubic-bezier easing for a premium feel.
 */
export function FadeIn({
  children,
  delay = 0,
  threshold = 0.12,
  blur = false,
  className,
}: FadeInProps) {
  const { ref, visible } = useFadeIn(threshold)

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(18px)",
        filter: blur ? (visible ? "blur(0px)" : "blur(6px)") : undefined,
        transition: `opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s,
                     transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s${
                       blur
                         ? `, filter 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`
                         : ""
                     }`,
      }}
    >
      {children}
    </div>
  )
}
