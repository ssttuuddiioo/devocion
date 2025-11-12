'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { EventType, GuestCountRange } from '@/lib/types'
import { venues } from '@/lib/venues'
import { useFormStore } from '@/lib/store'

const eventBasicsSchema = z.object({
  venueId: z.string().min(1, 'Please select a venue'),
  eventType: z.enum([
    'Product Launch',
    'Offsite',
    'Meeting',
    'Private Party',
    'Photoshoot',
    'Other',
  ]),
  preferredDates: z
    .array(z.string())
    .min(1, 'Please select at least one preferred date')
    .max(3, 'Maximum 3 dates allowed'),
  startTime: z.string().min(1, 'Please select a start time'),
  endTime: z.string().min(1, 'Please select an end time'),
  guestCount: z.enum(['0-30', '31-60', '61-100', '101+']),
})

type EventBasicsFormData = z.infer<typeof eventBasicsSchema>

interface EventBasicsStepProps {
  onNext: (data: EventBasicsFormData) => void
  initialData?: Partial<EventBasicsFormData>
}

export function EventBasicsStep({ onNext, initialData }: EventBasicsStepProps) {
  const { formData, updateFormData } = useFormStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<EventBasicsFormData>({
    resolver: zodResolver(eventBasicsSchema),
    defaultValues: initialData || formData.eventBasics || {},
  })

  useEffect(() => {
    if (initialData?.venueId) {
      setValue('venueId', initialData.venueId)
    }
  }, [initialData?.venueId, setValue])

  const onSubmit = (data: EventBasicsFormData) => {
    updateFormData({ eventBasics: data })
    onNext(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-black mb-2 uppercase font-mono">
          WHICH DEVOCION LOCATION?
        </label>
        <select
          {...register('venueId')}
          className="w-full px-3 py-2 border-2 border-black bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black font-mono"
        >
          <option value="">Select a venue</option>
          {venues.map((venue) => (
            <option key={venue.id} value={venue.id}>
              {venue.name}
            </option>
          ))}
        </select>
        {errors.venueId && (
          <p className="mt-1 text-sm text-red-600 font-mono">{errors.venueId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-bold text-black mb-2 uppercase font-mono">
          EVENT TYPE
        </label>
        <select
          {...register('eventType')}
          className="w-full px-3 py-2 border-2 border-black bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black font-mono"
        >
          <option value="">Select event type</option>
          <option value="Product Launch">Product Launch</option>
          <option value="Offsite">Offsite</option>
          <option value="Meeting">Meeting</option>
          <option value="Private Party">Private Party</option>
          <option value="Photoshoot">Photoshoot</option>
          <option value="Other">Other</option>
        </select>
        {errors.eventType && (
          <p className="mt-1 text-sm text-red-600 font-mono">{errors.eventType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-bold text-black mb-2 uppercase font-mono">
          PREFERRED DATE(S) (UP TO 3)
        </label>
        <div className="space-y-2">
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              type="date"
              {...register(`preferredDates.${index}` as const)}
              className="w-full px-3 py-2 border-2 border-black bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black font-mono"
            />
          ))}
        </div>
        {errors.preferredDates && (
          <p className="mt-1 text-sm text-red-600 font-mono">
            {errors.preferredDates.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-black mb-2 uppercase font-mono">
            START TIME
          </label>
          <input
            type="time"
            {...register('startTime')}
            className="w-full px-3 py-2 border-2 border-black bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black font-mono"
          />
          {errors.startTime && (
            <p className="mt-1 text-sm text-red-600 font-mono">
              {errors.startTime.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-black mb-2 uppercase font-mono">
            END TIME
          </label>
          <input
            type="time"
            {...register('endTime')}
            className="w-full px-3 py-2 border-2 border-black bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black font-mono"
          />
          {errors.endTime && (
            <p className="mt-1 text-sm text-red-600 font-mono">{errors.endTime.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-black mb-2 uppercase font-mono">
          EXPECTED GUEST COUNT
        </label>
        <select
          {...register('guestCount')}
          className="w-full px-3 py-2 border-2 border-black bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black font-mono"
        >
          <option value="">Select guest count</option>
          <option value="0-30">0-30</option>
          <option value="31-60">31-60</option>
          <option value="61-100">61-100</option>
          <option value="101+">101+</option>
        </select>
        {errors.guestCount && (
          <p className="mt-1 text-sm text-red-600 font-mono">
            {errors.guestCount.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
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

