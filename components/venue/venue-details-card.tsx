'use client'

import { Venue } from '@/lib/types'
import { MapPin, Clock, Square, Users } from 'lucide-react'

interface VenueDetailsCardProps {
  venue: Venue
}

export function VenueDetailsCard({ venue }: VenueDetailsCardProps) {
  return (
    <div className="rounded-lg border-2 border-black shadow-sm p-6" style={{ backgroundColor: '#F3D052' }}>
      {venue.address && (
        <div className="flex items-center gap-2 text-black mb-4 font-mono">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">{venue.address}</span>
        </div>
      )}

      <div className="space-y-4">
        {venue.hours && (
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold text-black mb-1 uppercase font-mono">
                HOURS
              </div>
              <div className="text-sm text-black font-mono">{venue.hours.weekdays}</div>
              <div className="text-sm text-black font-mono">{venue.hours.weekends}</div>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <Square className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-bold text-black mb-1 uppercase font-mono">
              SPACE
            </div>
            <div className="text-sm text-black font-mono">
              {venue.squareFootage.toLocaleString()} sq ft
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-bold text-black mb-1 uppercase font-mono">
              CAPACITY
            </div>
            <div className="text-sm text-black font-mono">
              Up to {venue.capacity} guests
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

