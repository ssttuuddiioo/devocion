import { Suspense } from 'react'
import { MultiStepForm } from '@/components/form/multi-step-form'

export default function RequestPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Request a Venue
        </h1>
        <p className="text-gray-600">
          Tell us about your event and we'll get back to you within 24 hours
        </p>
      </div>
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <MultiStepForm />
      </Suspense>
    </main>
  )
}

