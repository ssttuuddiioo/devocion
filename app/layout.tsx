import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header'

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
    <html lang="en">
      <body className="bg-brand-black">
        <Header />
        {children}
      </body>
    </html>
  )
}

