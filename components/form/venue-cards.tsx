'use client'

import Link from 'next/link'
import { venues } from '@/lib/venues'

export function VenueCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {venues.map((venue) => (
        <Link
          key={venue.id}
          href={`/request?venue=${venue.id}`}
          className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:border-gray-300"
        >
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400 text-sm font-medium">
                {venue.name}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {venue.name}
            </h3>
            <div className="space-y-1 text-sm text-gray-600 mb-4">
              <p>{venue.squareFootage.toLocaleString()} sq ft</p>
              <p>Capacity: {venue.capacity} guests</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                Full Day from ${(venue.fullDayBuyout / 1000).toFixed(0)}k
              </span>
              <span className="text-sm text-gray-500">
                After Hours from ${venue.afterHoursRate}/hr
              </span>
            </div>
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 group-hover:bg-blue-100 transition-colors">
                Select This Venue
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

