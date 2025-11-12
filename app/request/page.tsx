import { Suspense } from 'react'
import { MultiStepForm } from '@/components/form/multi-step-form'

export default function RequestPage() {
  return (
    <main className="min-h-screen bg-brand-black py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-brand-yellow mb-2 uppercase">
          Request a Venue
        </h1>
        <p className="text-brand-white font-mono">
          Tell us about your event and we'll get back to you within 24 hours
        </p>
      </div>
      <Suspense fallback={<div className="text-center py-12 text-brand-white">Loading...</div>}>
        <MultiStepForm />
      </Suspense>
    </main>
  )
}

