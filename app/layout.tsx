import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Tangerine } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LangProvider } from '@/components/lang-context'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
})

const tangerine = Tangerine({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-tangerine',
})

export const metadata: Metadata = {
  title: 'Иван и Нелли — Свадьба 03.10.2026',
  description: 'Вы приглашены на торжество в честь бракосочетания Ивана и Нелли — 3 октября 2026 года.',
  generator: 'ivan',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${inter.variable} ${tangerine.variable} bg-background`}>
      <body className="font-sans antialiased">
        <LangProvider>
          {children}
        </LangProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
