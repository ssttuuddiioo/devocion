'use client'

import { StatsBar } from '@/components/admin/stats-bar'
import { FilterBar } from '@/components/admin/filter-bar'
import { InquiriesTable } from '@/components/admin/inquiries-table'
import { DetailPanel } from '@/components/admin/detail-panel'
import { useAdminStore } from '@/lib/store'

export default function AdminPage() {
  const selectedInquiryId = useAdminStore((state) => state.selectedInquiryId)

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Inquiries Dashboard
          </h1>
          <p className="text-gray-600">
            Manage and track all venue rental inquiries
          </p>
        </div>

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

