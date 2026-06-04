"use client"

import { createContext, useContext, useState, useEffect } from "react"

export type Lang = "ru" | "hy"

type LangContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Record<string, any>
  loading: boolean
}

const LangContext = createContext<LangContextType>({
  lang: "ru",
  setLang: () => {},
  t: {},
  loading: true,
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru")
  const [t, setT] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    import(`@/locales/${lang}`)
      .then((mod) => {
        setT(mod.default)
        setLoading(false)
      })
      .catch(console.error)
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t, loading }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}