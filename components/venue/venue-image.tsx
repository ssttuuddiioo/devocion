'use client'

import Image from 'next/image'
import { Venue } from '@/lib/types'

interface VenueImageProps {
  venue: Venue
}

export function VenueImage({ venue }: VenueImageProps) {
  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg border-2 border-black bg-gray-100">
      <Image
        src={venue.images[0]}
        alt={venue.name}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}

