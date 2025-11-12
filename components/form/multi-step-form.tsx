'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { EventBasicsStep } from './event-basics-step'
import { RequirementsStep } from './requirements-step'
import { ContactStep } from './contact-step'
import { useFormStore, useInquiriesStore } from '@/lib/store'
import { calculateLeadScore } from '@/lib/scoring'
import { estimatePrice } from '@/lib/pricing'
import type { EventBasics, Requirements, ContactInfo } from '@/lib/types'
import { z } from 'zod'

const requirementsSchema = z.object({
  timeBlocks: z.object({
    dayHours: z.boolean(),
    eveningHours: z.boolean(),
  }),
  services: z.object({
    coffeeService: z.boolean(),
    pastryService: z.enum(['Yes', 'No', 'Maybe']),
    baristas: z.boolean(),
    alcoholService: z.boolean(),
    avPackage: z.enum(['Yes', 'No', 'Maybe']),
  }),
  specialRequirements: z.string().optional(),
})

type RequirementsFormData = z.infer<typeof requirementsSchema>

export function MultiStepForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentStep, formData, setCurrentStep, resetForm } = useFormStore()
  const { addInquiry } = useInquiriesStore()
  const [step, setStep] = useState(currentStep)

  useEffect(() => {
    const venueId = searchParams.get('venue')
    if (venueId && step === 1 && !formData.eventBasics?.venueId) {
      useFormStore.getState().updateFormData({
        eventBasics: { venueId },
      })
    }
  }, [searchParams, step, formData.eventBasics?.venueId])

  const handleStep1Next = (data: EventBasics) => {
    setStep(2)
    setCurrentStep(2)
  }

  const handleStep2Next = (data: RequirementsFormData) => {
    setStep(3)
    setCurrentStep(3)
  }

  const handleStep2Back = () => {
    setStep(1)
    setCurrentStep(1)
  }

  const handleStep3Back = () => {
    setStep(2)
    setCurrentStep(2)
  }

  const handleSubmit = (data: ContactInfo) => {
    const eventBasics = formData.eventBasics as EventBasics
    const requirements = formData.requirements as RequirementsFormData

    if (!eventBasics || !requirements) {
      return
    }

    const requirementsWithDefaults: Requirements = {
      ...requirements,
      specialRequirements: requirements.specialRequirements || '',
    }

    const leadScore = calculateLeadScore(
      data.budget,
      data.organizationType,
      eventBasics.eventType,
      eventBasics.guestCount,
      requirements.services
    )

    const estimatedPrice = estimatePrice(
      eventBasics.venueId,
      requirements.timeBlocks,
      eventBasics.startTime,
      eventBasics.endTime,
      eventBasics.guestCount,
      requirements.services
    )

    const inquiry = {
      id: Date.now().toString(),
      eventBasics,
      requirements: requirementsWithDefaults,
      contactInfo: data,
      status: 'NEW' as const,
      leadScore,
      estimatedPrice,
      submittedAt: new Date(),
    }

    addInquiry(inquiry)
    resetForm()
    router.push('/request/success')
  }

  const steps = [
    { number: 1, title: 'Event Basics' },
    { number: 2, title: 'Requirements' },
    { number: 3, title: 'Contact & Budget' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s.number
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s.number}
                </div>
                <span className="mt-2 text-xs text-gray-600 text-center">
                  {s.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    step > s.number ? 'bg-gray-900' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {step === 1 && (
          <EventBasicsStep
            onNext={handleStep1Next}
            initialData={formData.eventBasics}
          />
        )}
        {step === 2 && (
          <RequirementsStep
            onNext={handleStep2Next}
            onBack={handleStep2Back}
            initialData={formData.requirements}
          />
        )}
        {step === 3 && (
          <ContactStep
            onSubmit={handleSubmit}
            onBack={handleStep3Back}
            initialData={formData.contactInfo}
          />
        )}
      </div>
    </div>
  )
}

