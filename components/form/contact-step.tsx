'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { OrganizationType, BudgetRange } from '@/lib/types'
import { useFormStore } from '@/lib/store'

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  organizationName: z.string().min(1, 'Organization name is required'),
  organizationType: z.enum([
    'Company',
    'Agency',
    'Nonprofit',
    'Individual',
    'Other',
  ]),
  budget: z.enum(['<$2k', '$2k-$5k', '$5k-$10k', '$10k-$20k', '$20k+']),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactStepProps {
  onSubmit: (data: ContactFormData) => void
  onBack: () => void
  initialData?: Partial<ContactFormData>
}

export function ContactStep({
  onSubmit,
  onBack,
  initialData,
}: ContactStepProps) {
  const { formData, updateFormData } = useFormStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: initialData || formData.contactInfo || {},
  })

  const onFormSubmit = (data: ContactFormData) => {
    updateFormData({ contactInfo: data })
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First name
          </label>
          <input
            type="text"
            {...register('firstName')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last name
          </label>
          <input
            type="text"
            {...register('lastName')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Organization name
        </label>
        <input
          type="text"
          {...register('organizationName')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.organizationName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.organizationName.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Organization type
        </label>
        <select
          {...register('organizationType')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select organization type</option>
          <option value="Company">Company</option>
          <option value="Agency">Agency</option>
          <option value="Nonprofit">Nonprofit</option>
          <option value="Individual">Individual</option>
          <option value="Other">Other</option>
        </select>
        {errors.organizationType && (
          <p className="mt-1 text-sm text-red-600">
            {errors.organizationType.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Budget range
        </label>
        <select
          {...register('budget')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select budget range</option>
          <option value="<$2k">Less than $2k</option>
          <option value="$2k-$5k">$2k - $5k</option>
          <option value="$5k-$10k">$5k - $10k</option>
          <option value="$10k-$20k">$10k - $20k</option>
          <option value="$20k+">$20k+</option>
        </select>
        {errors.budget && (
          <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Submit Request
        </button>
      </div>
    </form>
  )
}

