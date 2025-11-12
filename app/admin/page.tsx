'use client'

import { StatsBar } from '@/components/admin/stats-bar'
import { FilterBar } from '@/components/admin/filter-bar'
import { InquiriesTable } from '@/components/admin/inquiries-table'
import { DetailPanel } from '@/components/admin/detail-panel'
import { useAdminStore, useInquiriesStore } from '@/lib/store'
import { X, Bell } from 'lucide-react'
import { useState } from 'react'

export default function AdminPage() {
  const selectedInquiryId = useAdminStore((state) => state.selectedInquiryId)
  const { inquiries } = useInquiriesStore()
  const [dismissedNotification, setDismissedNotification] = useState(false)
  
  const newInquiriesCount = inquiries.filter((i) => i.status === 'NEW').length

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Lead Organizer
          </h1>
          <p className="text-gray-600">
            Manage and track all venue rental inquiries
          </p>
        </div>

        {/* New Inquiries Notification */}
        {newInquiriesCount > 0 && !dismissedNotification && (
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    {newInquiriesCount} new {newInquiriesCount === 1 ? 'inquiry' : 'inquiries'} 
                    {' '}need your attention
                  </p>
                  <p className="text-xs text-blue-700 mt-0.5">
                    Click on any row to view details and add notes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDismissedNotification(true)}
                className="text-blue-600 hover:text-blue-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <StatsBar />
        <FilterBar />
        <div className="relative">
          <div className={selectedInquiryId ? 'md:mr-96 transition-all' : ''}>
            <InquiriesTable />
          </div>
          <DetailPanel />
        </div>
      </div>
    </main>
  )
}

