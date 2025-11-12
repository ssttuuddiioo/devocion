'use client'

import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Request Received!
        </h1>
        <div className="text-left space-y-4 mb-8">
          <p className="text-gray-700">
            Here's what happens next:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>We'll review your inquiry within 24 hours</li>
            <li>You'll receive pricing and availability via email</li>
            <li>If it's a good fit, we'll schedule a brief call</li>
          </ol>
          <p className="text-sm text-gray-500 mt-4">
            A copy of your request has been sent to your email address.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link
            href="/admin"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View Your Submission
          </Link>
          <Link
            href="/"
            className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Request Another Venue
          </Link>
        </div>
      </div>
    </main>
  )
}

