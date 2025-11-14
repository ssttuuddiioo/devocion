import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { SiteProtection } from '@/components/auth/site-protection'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Devocion Venue Rental',
  description: 'Host your event at Devocion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-brand-black">
        <SiteProtection password="pablorules">
          <Header />
          {children}
        </SiteProtection>
      </body>
    </html>
  )
}

