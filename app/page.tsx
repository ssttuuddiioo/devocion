'use client'

import { HomePageFinder } from '@/components/landing/home-page-finder'
import { PasswordProtection } from '@/components/auth/password-protection'

export default function Home() {
  return (
    <PasswordProtection password="pablorules" storageKey="home_password_authenticated">
      <HomePageFinder />
    </PasswordProtection>
  )
}

