'use client'

import { useState } from 'react'
import Image from 'next/image'

interface SplashPageProps {
  onAuthenticated: () => void
  password: string
}

export function SplashPage({ onAuthenticated, password }: SplashPageProps) {
  const [inputPassword, setInputPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (inputPassword === password) {
      sessionStorage.setItem('site_password_authenticated', 'true')
      onAuthenticated()
      setInputPassword('')
    } else {
      setError('Incorrect password. Please try again.')
      setInputPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/williamsburg.webp"
          alt="Devocion"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ filter: 'blur(3px)', transform: 'scale(1.1)' }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8 md:p-10 border-2 border-black">
          {/* Logo/Branding */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-black mb-2 uppercase tracking-tight">
              DEVOCIÓN
            </h1>
            <p className="text-sm text-black font-mono">
              Venue Rental
            </p>
          </div>

          {/* Password Form */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-black mb-2 text-center">
              Password Protected
            </h2>
            <p className="text-gray-600 mb-6 text-sm text-center font-mono">
              Please enter the password to access the site.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black mb-2 uppercase font-mono"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-black bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-mono"
                  placeholder="Enter password"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 font-mono">{error}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors font-bold uppercase tracking-tight text-sm font-mono"
              >
                Access Site
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

