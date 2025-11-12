'use client'

import { useInquiriesStore } from '@/lib/store'
import { InquiryStatus } from '@/lib/types'
import { format } from 'date-fns'

export function StatsBar() {
  const { inquiries } = useInquiriesStore()

  const newCount = inquiries.filter((i) => i.status === 'NEW').length
  const contactedCount = inquiries.filter(
    (i) => i.status === 'CONTACTED'
  ).length
  const negotiatingCount = inquiries.filter(
    (i) => i.status === 'NEGOTIATING'
  ).length

  const pipelineValue = inquiries
    .filter(
      (i) =>
        i.status === 'NEW' ||
        i.status === 'CONTACTED' ||
        i.status === 'NEGOTIATING'
    )
    .reduce((sum, i) => sum + i.estimatedPrice, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="text-sm text-gray-600 mb-1">New</div>
        <div className="text-2xl font-bold text-gray-900">{newCount}</div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="text-sm text-gray-600 mb-1">Contacted</div>
        <div className="text-2xl font-bold text-gray-900">{contactedCount}</div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="text-sm text-gray-600 mb-1">Negotiating</div>
        <div className="text-2xl font-bold text-gray-900">
          {negotiatingCount}
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="text-sm text-gray-600 mb-1">Pipeline</div>
        <div className="text-2xl font-bold text-gray-900">
          ${(pipelineValue / 1000).toFixed(0)}k
        </div>
      </div>
    </div>
  )
}

