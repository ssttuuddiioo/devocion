'use client'

import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-brand-white rounded-lg shadow-sm border-2 border-brand-white p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-16 h-16 text-brand-yellow" />
        </div>
        <h1 className="text-3xl font-bold text-brand-black mb-4 uppercase">
          Request Received!
        </h1>
        <div className="text-left space-y-4 mb-8">
          <p className="text-brand-black font-mono">
            Here's what happens next:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-brand-black font-mono">
            <li>We'll review your inquiry within 24 hours</li>
            <li>You'll receive pricing and availability via email</li>
            <li>If it's a good fit, we'll schedule a brief call</li>
          </ol>
          <p className="text-sm text-brand-black font-mono mt-4">
            A copy of your request has been sent to your email address.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link
            href="/admin"
            className="px-6 py-2 border-2 border-brand-white bg-brand-black text-brand-white rounded-md hover:bg-brand-black/80 transition-colors font-bold uppercase"
          >
            View Your Submission
          </Link>
          <Link
            href="/"
            className="px-6 py-2 border-2 border-brand-white bg-brand-yellow text-brand-black rounded-md hover:bg-brand-yellow/90 transition-colors font-bold uppercase"
          >
            Request Another Venue
          </Link>
        </div>
      </div>
    </main>
  )
}

