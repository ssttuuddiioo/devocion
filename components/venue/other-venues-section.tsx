'use client'

import Link from 'next/link'
import { venues } from '@/lib/venues'

interface OtherVenuesSectionProps {
  currentVenueId: string
}

function VenueImage({ image, name }: { image: string; name: string }) {
  return (
    <div className="relative aspect-video overflow-hidden bg-gray-100">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  )
}

function VenueCard({ venue }: { venue: typeof venues[0] }) {
  return (
    <Link
      href={`/venue/${venue.id}`}
      className="group relative overflow-hidden rounded-lg border-2 border-black bg-white shadow-sm hover:border-black/80 transition-all"
    >
      <VenueImage image={venue.images[0]} name={venue.name} />
      <div className="p-6">
        <h3 className="text-xl font-bold text-black mb-2 uppercase">
          {venue.name}
        </h3>

        {venue.description && (
          <p className="text-sm text-black mb-4 line-clamp-2 font-mono">
            {venue.description}
          </p>
        )}

        <div className="space-y-1 text-sm text-black mb-4 font-mono">
          <p>{venue.squareFootage.toLocaleString()} sq ft</p>
          <p>Capacity: {venue.capacity} guests</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-black">
            Full Day from ${(venue.fullDayBuyout / 1000).toFixed(0)}k
          </span>
          <span className="text-sm text-black font-mono">
            After Hours from ${venue.afterHoursRate}/hr
          </span>
        </div>

        <div className="mt-4">
          <span className="inline-flex items-center px-3 py-1.5 border-2 border-black text-sm font-bold bg-white text-black group-hover:bg-black group-hover:text-white transition-colors uppercase">
            VIEW THIS VENUE
          </span>
        </div>
      </div>
    </Link>
  )
}

export function OtherVenuesSection({ currentVenueId }: OtherVenuesSectionProps) {
  const otherVenues = venues.filter((venue) => venue.id !== currentVenueId)

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-black mb-2 uppercase">
          Other Venues
        </h2>
        <p className="text-black font-mono">
          Explore our other stunning locations
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  )
}

