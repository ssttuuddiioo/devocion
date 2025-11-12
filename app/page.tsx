import Link from 'next/link'
import { VenueCards } from '@/components/form/venue-cards'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Host Your Event at Devocion
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            From intimate meetings to product launches, find the perfect space
            for your next event
          </p>
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-sm text-gray-500">
              Hosted 200+ events
            </div>
            <div className="text-sm text-gray-500">
              Response within 24 hours
            </div>
          </div>
          <Link
            href="/request"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            Check Availability
          </Link>
        </div>

        {/* Venue Cards */}
        <VenueCards />
      </div>
    </main>
  )
}

