'use client'

import { useState, useEffect } from 'react'
import { SplashPage } from './splash-page'

interface SiteProtectionProps {
  children: React.ReactNode
  password: string
}

export function SiteProtection({ children, password }: SiteProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if already authenticated in session storage
    const authenticated = sessionStorage.getItem('site_password_authenticated') === 'true'
    setIsAuthenticated(authenticated)
    setIsLoading(false)
  }, [])

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-white font-mono">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <SplashPage onAuthenticated={handleAuthenticated} password={password} />
  }

  return <>{children}</>
}

