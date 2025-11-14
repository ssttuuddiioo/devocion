'use client'

import { useState, useEffect } from 'react'

interface PasswordProtectionProps {
  children: React.ReactNode
  password: string
  storageKey?: string
}

export function PasswordProtection({
  children,
  password,
  storageKey = 'page_password_authenticated',
}: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [inputPassword, setInputPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if already authenticated in session storage
    const authenticated = sessionStorage.getItem(storageKey) === 'true'
    setIsAuthenticated(authenticated)
    setIsLoading(false)
  }, [storageKey])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (inputPassword === password) {
      sessionStorage.setItem(storageKey, 'true')
      setIsAuthenticated(true)
      setInputPassword('')
    } else {
      setError('Incorrect password. Please try again.')
      setInputPassword('')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Password Protected
            </h1>
            <p className="text-gray-600 mb-6 text-sm">
              Please enter the password to access this page.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter password"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium uppercase tracking-tight text-sm"
              >
                Access
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

