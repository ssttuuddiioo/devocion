'use client'

import { Venue } from '@/lib/types'

interface VenueImageProps {
  venue: Venue
}

export function VenueImage({ venue }: VenueImageProps) {
  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg border-2 border-black bg-gray-100">
      <img
        src={venue.images[0]}
        alt={venue.name}
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  )
}

