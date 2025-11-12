'use client'

import { useInquiriesStore, useAdminStore } from '@/lib/store'
import { Inquiry, AdminFilters } from '@/lib/types'
import { getLeadScoreEmoji, getLeadScoreLabel } from '@/lib/scoring'
import { getVenueById } from '@/lib/venues'
import { format } from 'date-fns'

function filterInquiries(
  inquiries: Inquiry[],
  filters: AdminFilters
): Inquiry[] {
  let filtered = [...inquiries]

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(
      (inquiry) =>
        inquiry.contactInfo.firstName.toLowerCase().includes(searchLower) ||
        inquiry.contactInfo.lastName.toLowerCase().includes(searchLower) ||
        inquiry.contactInfo.organizationName.toLowerCase().includes(searchLower) ||
        inquiry.contactInfo.email.toLowerCase().includes(searchLower)
    )
  }

  // Status filter
  if (filters.status !== 'ALL') {
    filtered = filtered.filter((inquiry) => inquiry.status === filters.status)
  }

  // Venue filter
  if (filters.venue !== 'ALL') {
    filtered = filtered.filter(
      (inquiry) => inquiry.eventBasics.venueId === filters.venue
    )
  }

  // Date range filter
  const now = new Date()
  const dateRanges = {
    'Last 7 days': 7,
    'Last 30 days': 30,
    'Last 90 days': 90,
    'All time': Infinity,
  }
  const days = dateRanges[filters.dateRange]
  if (days !== Infinity) {
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
    filtered = filtered.filter(
      (inquiry) => inquiry.submittedAt >= cutoffDate
    )
  }

  // Lead score filter
  if (filters.leadScore !== 'ALL') {
    const scoreRanges = {
      HIGH: [80, 100],
      MEDIUM: [60, 79],
      LOW: [40, 59],
      VERY_LOW: [0, 39],
    }
    const [min, max] = scoreRanges[filters.leadScore]
    filtered = filtered.filter(
      (inquiry) => inquiry.leadScore >= min && inquiry.leadScore <= max
    )
  }

  return filtered.sort((a, b) => b.leadScore - a.leadScore)
}

export function InquiriesTable() {
  const { inquiries } = useInquiriesStore()
  const { filters, setSelectedInquiry } = useAdminStore()

  const filteredInquiries = filterInquiries(inquiries, filters)

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredInquiries.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{inquiries.length}</span> inquiries
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔥</span>
                  <span>Score</span>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[200px]">
                Contact
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[180px]">
                Organization
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[140px]">
                Venue
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[140px]">
                Event Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px]">
                Event Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[100px]">
                Guests
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px]">
                Budget
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px]">
                Est. Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[140px]">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[140px]">
                Submitted
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredInquiries.map((inquiry) => {
              const venue = getVenueById(inquiry.eventBasics.venueId)
              const emoji = getLeadScoreEmoji(inquiry.leadScore)
              const firstName = inquiry.contactInfo.firstName
              const lastName = inquiry.contactInfo.lastName
              const preferredDate = inquiry.eventBasics.preferredDates[0]
              const isNew = inquiry.status === 'NEW'

              return (
                <tr
                  key={inquiry.id}
                  onClick={() => setSelectedInquiry(inquiry.id)}
                  className={`hover:bg-blue-50 cursor-pointer transition-colors ${
                    isNew ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <td className="px-4 py-3 whitespace-nowrap sticky left-0 bg-white z-0 border-r border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{emoji}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {inquiry.leadScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">
                      {firstName} {lastName}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {inquiry.contactInfo.email}
                    </div>
                    <div className="text-xs text-gray-500">
                      {inquiry.contactInfo.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 font-medium">
                      {inquiry.contactInfo.organizationName}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {inquiry.contactInfo.organizationType}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 font-medium">
                      {venue?.name || 'N/A'}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {inquiry.eventBasics.eventType}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {preferredDate
                        ? format(new Date(preferredDate), 'MMM d, yyyy')
                        : 'N/A'}
                    </div>
                    {inquiry.eventBasics.preferredDates.length > 1 && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        +{inquiry.eventBasics.preferredDates.length - 1} alt
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {inquiry.eventBasics.guestCount}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 font-medium">
                      {inquiry.contactInfo.budget}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 font-semibold">
                      ${inquiry.estimatedPrice.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        inquiry.status === 'NEW'
                          ? 'bg-blue-100 text-blue-800'
                          : inquiry.status === 'CONTACTED'
                          ? 'bg-yellow-100 text-yellow-800'
                          : inquiry.status === 'NEGOTIATING'
                          ? 'bg-purple-100 text-purple-800'
                          : inquiry.status === 'CLOSED WON'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {format(inquiry.submittedAt, 'MMM d')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(inquiry.submittedAt, 'h:mm a')}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {filteredInquiries.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No inquiries match your filters
        </div>
      )}
    </div>
  )
}

