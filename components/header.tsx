'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-black uppercase tracking-tight">
              DEVOCIÓN
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link
              href="/find"
              className={`text-sm font-mono uppercase transition-colors ${
                pathname === '/find'
                  ? 'text-black font-bold'
                  : 'text-black hover:text-black/70'
              }`}
            >
              Browse All
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-mono uppercase transition-colors ${
                pathname === '/contact'
                  ? 'text-black font-bold'
                  : 'text-black hover:text-black/70'
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

