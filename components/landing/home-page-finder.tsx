'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { venues } from '@/lib/venues'
import type { GuestCountRange } from '@/lib/types'

type Location = 'Brooklyn' | 'Manhattan' | ''
type CoffeeMethod = 'pour over' | 'espresso' | 'french press' | 'aeropress' | 'cold' | 'fast' | ''

// Helper function to determine location from venue
function getVenueLocation(venueId: string): 'Brooklyn' | 'Manhattan' {
  const brooklynVenues = ['williamsburg', 'dumbo', 'downtown']
  return brooklynVenues.includes(venueId) ? 'Brooklyn' : 'Manhattan'
}

function VenueImage({ image, name }: { image: string; name: string }) {
  return (
    <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
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

export function HomePageFinder() {
  const [location, setLocation] = useState<Location>('')
  const [capacity, setCapacity] = useState<GuestCountRange | ''>('')
  const [coffeeMethod, setCoffeeMethod] = useState<CoffeeMethod>('')

  const filteredVenues = useMemo(() => {
    // For capacity 0-30 and 31-60, show all venues
    if (capacity === '0-30' || capacity === '31-60') {
      return venues.filter((venue) => {
        // Location filter only
        if (location) {
          const venueLocation = getVenueLocation(venue.id)
          return venueLocation === location
        }
        return true
      })
    }

    // For other capacities, filter normally
    return venues.filter((venue) => {
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
        if (capacity === '61-100') {
          if (venue.capacity < 61 || venue.capacity > 100) matchesAll = false
        } else if (capacity === '101+') {
          if (venue.capacity < 101) matchesAll = false
        }
      }

      return matchesAll
    })
  }, [location, capacity])

  // Coffee method is for user input/admin personalization only, not filtering
  const hasFilters = location || capacity
  const showSpecialMessage = capacity === '0-30' || capacity === '31-60'

  return (
    <div className="relative min-h-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      {/* Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/williamsburg.webp"
          alt="Williamsburg venue"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ filter: 'blur(3px)', transform: 'scale(1.1)' }}
        />
        {/* Overlay with yellow tint */}
        <div className="absolute inset-0 bg-[#F3D052]/80" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 uppercase tracking-tight">
            FIND YOUR PERFECT EVENT SPACE
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-black font-mono">
            Six stunning locations across New York.
            <br />
            From intimate gatherings to grand
            <br />
            celebrations.
          </p>
        </div>

        {/* Filter Component */}
        <div className="bg-white rounded-lg border-2 border-black shadow-md p-6 md:p-8 max-w-6xl mx-auto">
          <div className="flex flex-wrap lg:flex-nowrap items-end gap-4">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-bold text-black mb-2 uppercase font-mono">
                LOCATION
              </label>
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value as Location)}
                  className="w-full px-4 py-3 pr-10 border-2 border-black bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black font-mono appearance-none cursor-pointer"
                >
                  <option value="">Any location</option>
                  <option value="Brooklyn">Brooklyn</option>
                  <option value="Manhattan">Manhattan</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />
              </div>
            </div>

            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-bold text-black mb-2 uppercase font-mono">
                CAPACITY
              </label>
              <div className="relative">
                <select
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value as GuestCountRange | '')}
                  className="w-full px-4 py-3 pr-10 border-2 border-black bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black font-mono appearance-none cursor-pointer"
                >
                  <option value="">Any size</option>
                  <option value="0-30">0-30 guests</option>
                  <option value="31-60">31-60 guests</option>
                  <option value="61-100">61-100 guests</option>
                  <option value="101+">101+ guests</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setLocation('')
                  setCapacity('')
                }}
                className="px-6 py-3 border-2 border-black bg-white text-black rounded-md hover:bg-black hover:text-white transition-colors font-bold uppercase"
              >
                CLEAR
              </button>
            </div>
          </div>
        </div>

        {/* Special Message for 0-30 and 31-60 capacity */}
        {showSpecialMessage && (
          <div className="mt-8 text-center">
            <div className="bg-black text-white rounded-lg border-2 border-black shadow-sm p-6 inline-block">
              <p className="text-lg font-bold uppercase mb-2 font-mono">
                All of our venues are perfect for that!
              </p>
              <p className="text-sm font-mono">
                You might even get a discounted rate
              </p>
            </div>
          </div>
        )}

        {/* Filtered Venues */}
        {hasFilters && filteredVenues.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-black mb-6 text-center uppercase">
              Matching Venues
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </div>
        )}

        {/* View All Button */}
        <div className="mt-8 text-center">
          <Link
            href="/find"
            className="inline-block px-8 py-3 border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors font-bold uppercase font-mono"
          >
            View All
          </Link>
        </div>
      </div>

      {/* Footer Credit - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-40 text-center">
        <p className="text-sm text-black font-mono">
          This website was made by{' '}
          <a
            href="https://yopablo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black/70 transition-colors"
          >
            Pablo
          </a>
        </p>
      </div>
    </div>
  )
}

