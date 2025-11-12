'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ServiceOption } from '@/lib/types'
import { useFormStore } from '@/lib/store'

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

interface RequirementsStepProps {
  onNext: (data: RequirementsFormData) => void
  onBack: () => void
  initialData?: Partial<RequirementsFormData>
}

export function RequirementsStep({
  onNext,
  onBack,
  initialData,
}: RequirementsStepProps) {
  const { formData, updateFormData } = useFormStore()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RequirementsFormData>({
    resolver: zodResolver(requirementsSchema),
    defaultValues: initialData || formData.requirements || {
      timeBlocks: {
        dayHours: false,
        eveningHours: false,
      },
      services: {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      },
      specialRequirements: '',
    },
  })

  const onSubmit = (data: RequirementsFormData) => {
    updateFormData({ requirements: data })
    onNext(data)
  }

  const dayHours = watch('timeBlocks.dayHours')
  const eveningHours = watch('timeBlocks.eveningHours')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-black mb-3 uppercase font-mono">
          Will you need the space during:
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('timeBlocks.dayHours')}
              className="rounded border-2 border-black text-red-600 focus:ring-black"
            />
            <span className="ml-2 text-sm text-black font-mono">
              Day hours (7am-7pm)
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('timeBlocks.eveningHours')}
              className="rounded border-2 border-black text-red-600 focus:ring-black"
            />
            <span className="ml-2 text-sm text-black font-mono">
              Evening/after hours (7pm-11pm)
            </span>
          </label>
        </div>
        {!dayHours && !eveningHours && (
          <p className="mt-1 text-sm text-red-600 font-mono">
            Please select at least one time block
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-bold text-black mb-3 uppercase font-mono">
          Services needed:
        </label>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('services.coffeeService')}
              className="rounded border-2 border-black text-red-600 focus:ring-black"
            />
            <span className="ml-2 text-sm text-black font-mono">Coffee service</span>
          </label>

          <div className="flex items-center">
            <span className="text-sm text-black font-mono mr-4 min-w-[120px]">
              Pastry service:
            </span>
            <div className="flex gap-4">
              {(['Yes', 'No', 'Maybe'] as ServiceOption[]).map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    value={option}
                    {...register('services.pastryService')}
                    className="text-red-600 focus:ring-black"
                  />
                  <span className="ml-1 text-sm text-black font-mono">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('services.baristas')}
              className="rounded border-2 border-black text-red-600 focus:ring-black"
            />
            <span className="ml-2 text-sm text-black font-mono">Baristas</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('services.alcoholService')}
              className="rounded border-2 border-black text-red-600 focus:ring-black"
            />
            <span className="ml-2 text-sm text-black font-mono">Alcohol service</span>
          </label>

          <div className="flex items-center">
            <span className="text-sm text-black font-mono mr-4 min-w-[120px]">
              AV Package:
            </span>
            <div className="flex gap-4">
              {(['Yes', 'No', 'Maybe'] as ServiceOption[]).map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    value={option}
                    {...register('services.avPackage')}
                    className="text-red-600 focus:ring-black"
                  />
                  <span className="ml-1 text-sm text-black font-mono">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-black mb-2 uppercase font-mono">
          Special requirements
        </label>
        <textarea
          {...register('specialRequirements')}
          rows={4}
          className="w-full px-3 py-2 border-2 border-black bg-white text-white rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
          placeholder="Any additional requirements or notes..."
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border-2 border-black bg-white text-black rounded-md hover:bg-black hover:text-white transition-colors font-bold uppercase"
        >
          ← BACK
        </button>
        <button
          type="submit"
          className="px-6 py-2 border-2 border-black bg-black text-white rounded-md hover:bg-black/90 transition-colors font-bold uppercase"
        >
          CONTINUE →
        </button>
      </div>
    </form>
  )
}

