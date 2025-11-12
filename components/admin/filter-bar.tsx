'use client'

import { useAdminStore } from '@/lib/store'
import { InquiryStatus } from '@/lib/types'
import { venues } from '@/lib/venues'

export function FilterBar() {
  const { filters, setFilters } = useAdminStore()

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            placeholder="Search inquiries..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({ status: e.target.value as InquiryStatus | 'ALL' })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="ALL">All</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="NEGOTIATING">Negotiating</option>
            <option value="CLOSED WON">Closed Won</option>
            <option value="CLOSED LOST">Closed Lost</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Venue
          </label>
          <select
            value={filters.venue}
            onChange={(e) => setFilters({ venue: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="ALL">All</option>
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) =>
              setFilters({
                dateRange: e.target.value as
                  | 'Last 7 days'
                  | 'Last 30 days'
                  | 'Last 90 days'
                  | 'All time',
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 90 days">Last 90 days</option>
            <option value="All time">All time</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lead Score
          </label>
          <select
            value={filters.leadScore}
            onChange={(e) =>
              setFilters({
                leadScore: e.target.value as
                  | 'ALL'
                  | 'HIGH'
                  | 'MEDIUM'
                  | 'LOW'
                  | 'VERY_LOW',
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="ALL">All</option>
            <option value="HIGH">High (80+)</option>
            <option value="MEDIUM">Medium (60-79)</option>
            <option value="LOW">Low (40-59)</option>
            <option value="VERY_LOW">Very Low (&lt;40)</option>
          </select>
        </div>
      </div>
    </div>
  )
}

