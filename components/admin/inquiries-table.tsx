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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Organization
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInquiries.map((inquiry) => {
              const venue = getVenueById(inquiry.eventBasics.venueId)
              const emoji = getLeadScoreEmoji(inquiry.leadScore)
              const firstName = inquiry.contactInfo.firstName
              const lastName = inquiry.contactInfo.lastName
              const preferredDate = inquiry.eventBasics.preferredDates[0]

              return (
                <tr
                  key={inquiry.id}
                  onClick={() => setSelectedInquiry(inquiry.id)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-lg">{emoji}</span>
                    <span className="ml-2 text-sm font-medium text-gray-900">
                      {inquiry.leadScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {firstName} {lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {venue?.name} · {inquiry.eventBasics.guestCount} guests ·
                      {inquiry.contactInfo.budget}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {inquiry.contactInfo.organizationName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {inquiry.eventBasics.eventType}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {preferredDate
                        ? format(new Date(preferredDate), 'MMM d')
                        : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {inquiry.status}
                    </span>
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

