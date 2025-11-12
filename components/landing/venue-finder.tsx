'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { venues } from '@/lib/venues'
import type { GuestCountRange, BudgetRange } from '@/lib/types'
import { Star } from 'lucide-react'

type Location = 'Brooklyn' | 'Manhattan' | ''

// Helper function to determine location from venue
function getVenueLocation(venueId: string): 'Brooklyn' | 'Manhattan' {
  const brooklynVenues = ['williamsburg', 'dumbo', 'downtown']
  return brooklynVenues.includes(venueId) ? 'Brooklyn' : 'Manhattan'
}

function VenueImage({ image, name }: { image: string; name: string }) {
  return (
    <div className="relative aspect-video overflow-hidden bg-gray-100">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}

function VenueCard({
  venue,
  isHighlighted,
}: {
  venue: typeof venues[0]
  isHighlighted: boolean
}) {
  return (
    <Link
      href={`/venue/${venue.id}`}
      className={`group relative overflow-hidden rounded-lg border-2 transition-all ${
        isHighlighted
          ? 'border-brand-yellow bg-brand-white shadow-lg scale-[1.02]'
          : 'border-brand-white bg-brand-white shadow-sm hover:border-brand-yellow'
      }`}
    >
      {isHighlighted && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-brand-yellow text-brand-black px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Perfect Match
          </div>
        </div>
      )}
      <VenueImage image={venue.images[0]} name={venue.name} />
      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-black mb-2 uppercase">
          {venue.name}
        </h3>

        {venue.description && (
          <p className="text-sm text-brand-black mb-4 line-clamp-2 font-mono">
            {venue.description}
          </p>
        )}

        <div className="space-y-1 text-sm text-brand-black mb-4 font-mono">
          <p>{venue.squareFootage.toLocaleString()} sq ft</p>
          <p>Capacity: {venue.capacity} guests</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-brand-black">
            Full Day from ${(venue.fullDayBuyout / 1000).toFixed(0)}k
          </span>
          <span className="text-sm text-brand-black font-mono">
            After Hours from ${venue.afterHoursRate}/hr
          </span>
        </div>

        <div className="mt-4">
          <span className="inline-flex items-center px-3 py-1.5 border-2 border-brand-black text-sm font-bold bg-brand-white text-brand-black group-hover:bg-brand-yellow transition-colors uppercase">
            Select This Venue
          </span>
        </div>
      </div>
    </Link>
  )
}

export function VenueFinder() {
  const [location, setLocation] = useState<Location>('')
  const [capacity, setCapacity] = useState<GuestCountRange | ''>('')
  const [budget, setBudget] = useState<BudgetRange | ''>('')
  const [hasFilters, setHasFilters] = useState(false)

  const handleFilter = () => {
    if (location || capacity || budget) {
      setHasFilters(true)
    }
  }

  const handleClearFilters = () => {
    setLocation('')
    setCapacity('')
    setBudget('')
    setHasFilters(false)
  }

  const matchingVenueIds = useMemo(() => {
    if (!hasFilters) return []

    const matches: string[] = []

    venues.forEach((venue) => {
      let matchesAll = true

      // Location filter
      if (location) {
        const venueLocation = getVenueLocation(venue.id)
        if (venueLocation !== location) {
          matchesAll = false
        }
      }

      // Capacity filter
      if (capacity && matchesAll) {
        if (capacity === '0-30') {
          if (venue.capacity > 30) matchesAll = false
        } else if (capacity === '31-60') {
          if (venue.capacity < 31 || venue.capacity > 60) matchesAll = false
        } else if (capacity === '61-100') {
          if (venue.capacity < 61 || venue.capacity > 100) matchesAll = false
        } else if (capacity === '101+') {
          if (venue.capacity < 101) matchesAll = false
        }
      }

      // Budget filter (fullDayBuyout is in dollars)
      if (budget && matchesAll) {
        const venueFullDay = venue.fullDayBuyout
        if (budget === '<$2k') {
          if (venueFullDay >= 2000) matchesAll = false
        } else if (budget === '$2k-$5k') {
          if (venueFullDay < 2000 || venueFullDay > 5000) matchesAll = false
        } else if (budget === '$5k-$10k') {
          if (venueFullDay < 5000 || venueFullDay > 10000) matchesAll = false
        } else if (budget === '$10k-$20k') {
          if (venueFullDay < 10000 || venueFullDay > 20000) matchesAll = false
        } else if (budget === '$20k+') {
          if (venueFullDay < 20000) matchesAll = false
        }
      }

      if (matchesAll) {
        matches.push(venue.id)
      }
    })

    return matches
  }, [hasFilters, location, capacity, budget])

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
      

          {/* Short Form */}
          <div className="bg-brand-white rounded-lg border-2 border-brand-white p-6 md:p-8 shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-brand-black mb-2 uppercase font-mono">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value as Location)}
                  className="w-full px-4 py-3 border-2 border-brand-black bg-brand-white text-brand-black rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow font-mono"
                >
                  <option value="">Any location</option>
                  <option value="Brooklyn">Brooklyn</option>
                  <option value="Manhattan">Manhattan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-black mb-2 uppercase font-mono">
                  Capacity
                </label>
                <select
                  value={capacity}
                  onChange={(e) =>
                    setCapacity(e.target.value as GuestCountRange | '')
                  }
                  className="w-full px-4 py-3 border-2 border-brand-black bg-brand-white text-brand-black rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow font-mono"
                >
                  <option value="">Any size</option>
                  <option value="0-30">0-30 guests</option>
                  <option value="31-60">31-60 guests</option>
                  <option value="61-100">61-100 guests</option>
                  <option value="101+">101+ guests</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-black mb-2 uppercase font-mono">
                  Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value as BudgetRange | '')}
                  className="w-full px-4 py-3 border-2 border-brand-black bg-brand-white text-brand-black rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow font-mono"
                >
                  <option value="">Any budget</option>
                  <option value="<$2k">Less than $2k</option>
                  <option value="$2k-$5k">$2k - $5k</option>
                  <option value="$5k-$10k">$5k - $10k</option>
                  <option value="$10k-$20k">$10k - $20k</option>
                  <option value="$20k+">$20k+</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleFilter}
                  className="w-full px-6 py-3 border-2 border-brand-black bg-brand-white text-brand-black rounded-md hover:bg-brand-yellow transition-colors font-bold uppercase"
                >
                  Find Venues
                </button>
              </div>
            </div>

            {hasFilters && (
              <div className="flex items-center justify-between pt-4 border-t border-brand-black">
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-brand-black font-mono underline hover:text-brand-yellow transition-colors"
                >
                  Clear filters
                </button>
                {matchingVenueIds.length > 0 && (
                  <span className="text-sm text-brand-black font-mono">
                    {matchingVenueIds.length} perfect match
                    {matchingVenueIds.length !== 1 ? 'es' : ''}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Venues Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {hasFilters && matchingVenueIds.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-brand-yellow mb-2 uppercase">
              Perfect Matches
            </h2>
            <p className="text-brand-white font-mono">
              These venues best fit your criteria
            </p>
          </div>
        )}

        {hasFilters && matchingVenueIds.length === 0 && (
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-brand-yellow mb-2 uppercase">
              No Perfect Matches
            </h2>
            <p className="text-brand-white font-mono mb-4">
              But here are all our venues - they might still work for you
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-2 border-2 border-brand-white bg-brand-black text-brand-white rounded-md hover:bg-brand-black/80 transition-colors font-bold uppercase"
            >
              Browse All Venues
            </button>
          </div>
        )}

        {!hasFilters && (
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-brand-yellow mb-2 uppercase">
              All Venues
            </h2>
            <p className="text-brand-white font-mono">
            Six stunning locations across New York City.
From intimate gatherings to grand
celebrations.
            </p>
          </div>
        )}

        {/* Show matching venues first if filters are active */}
        {hasFilters && matchingVenueIds.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {venues
              .filter((venue) => matchingVenueIds.includes(venue.id))
              .map((venue) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  isHighlighted={true}
                />
              ))}
          </div>
        )}

        {/* Show all venues if no filters, or show "similar venues" if filters are active */}
        {hasFilters && matchingVenueIds.length > 0 && (
          <div className="mt-12">
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold text-brand-yellow mb-2 uppercase">
                Similar Venues
              </h3>
              <p className="text-brand-white font-mono">
                Here are other options you might like
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues
                .filter((venue) => !matchingVenueIds.includes(venue.id))
                .map((venue) => (
                  <VenueCard
                    key={venue.id}
                    venue={venue}
                    isHighlighted={false}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Show all venues when no filters */}
        {(!hasFilters || matchingVenueIds.length === 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                isHighlighted={matchingVenueIds.includes(venue.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

