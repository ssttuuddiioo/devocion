import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '700', '900'],
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
    <html lang="en" className={`${playfairDisplay.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-brand-black">
        <Header />
        {children}
      </body>
    </html>
  )
}

