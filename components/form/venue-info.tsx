'use client'

import { getVenueById } from '@/lib/venues'
import { MapPin, Clock, Square, Users } from 'lucide-react'

interface VenueInfoProps {
  venueId: string | null
}

export function VenueInfo({ venueId }: VenueInfoProps) {
  if (!venueId) return null

  const venue = getVenueById(venueId)
  if (!venue) return null

  return (
    <div className="bg-brand-black rounded-lg border-2 border-brand-white p-6 mb-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-yellow mb-2 uppercase">{venue.name}</h2>
          {venue.address && (
            <div className="flex items-center gap-2 text-brand-white mb-2 font-mono">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{venue.address}</span>
            </div>
          )}
        </div>
      </div>

      {venue.description && (
        <p className="text-brand-white mb-6 leading-relaxed font-mono">{venue.description}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-brand-white">
        {venue.hours && (
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-brand-white mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold text-brand-yellow mb-1 uppercase">
                Hours
              </div>
              <div className="text-sm text-brand-white font-mono">{venue.hours.weekdays}</div>
              <div className="text-sm text-brand-white font-mono">{venue.hours.weekends}</div>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <Square className="w-5 h-5 text-brand-white mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-bold text-brand-yellow mb-1 uppercase">
              Space
            </div>
            <div className="text-sm text-brand-white font-mono">
              {venue.squareFootage.toLocaleString()} sq ft
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-brand-white mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-bold text-brand-yellow mb-1 uppercase">
              Capacity
            </div>
            <div className="text-sm text-brand-white font-mono">
              Up to {venue.capacity} guests
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

