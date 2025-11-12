'use client'

import Image from 'next/image'
import { MultiStepForm } from '@/components/form/multi-step-form'
import { VenueDetailsCard } from './venue-details-card'
import { OtherVenuesSection } from './other-venues-section'
import { getVenueById } from '@/lib/venues'

interface VenueDetailPageProps {
  venueId: string
}

export function VenueDetailPage({ venueId }: VenueDetailPageProps) {
  const venue = getVenueById(venueId)

  if (!venue) {
    return null
  }

  // Get first image
  const image1 = venue.images[0] || ''

  const scrollToOtherVenues = () => {
    const element = document.getElementById('other-venues')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Row 1: Name/Description (left) | Details (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column: Name and Description */}
          <div className="bg-black rounded-lg border-2 border-black shadow-sm p-6">
            <h2 className="text-2xl font-bold text-white mb-4 uppercase">{venue.name}</h2>
            
            {venue.description && (
              <p className="text-white leading-relaxed font-mono text-sm">
                {venue.description}
              </p>
            )}
          </div>

          {/* Right Column: Details Card */}
          <div>
            <VenueDetailsCard venue={venue} />
          </div>
        </div>

        {/* Row 2: Image (left) | Form Top (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-stretch">
          {/* Left: Image and Explore Section */}
          <div className="flex flex-col gap-4">
            <div className="relative flex-1 overflow-hidden rounded-lg border-2 border-black bg-gray-100 aspect-video">
              <Image
                src={image1}
                alt={venue.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Explore Other Venues Section */}
            <div className="flex items-center justify-between gap-4 p-4 border border-black/20 rounded-lg bg-white/50">
              <div>
                <p className="text-sm text-black font-mono">
                  Explore our other venues
                </p>
              </div>
              <button
                onClick={scrollToOtherVenues}
                className="px-4 py-2 border border-black text-black bg-white hover:bg-black hover:text-white transition-colors text-sm font-mono uppercase whitespace-nowrap"
              >
                View All
              </button>
            </div>
          </div>

          {/* Right: Form - Top Part (Step 1: Event Basics) */}
          <div>
            <MultiStepForm venueId={venueId} />
          </div>
        </div>

        {/* Bottom Section: Other Venues */}
        <div id="other-venues" className="mt-16">
          <OtherVenuesSection currentVenueId={venueId} />
        </div>
      </div>
    </div>
  )
}

