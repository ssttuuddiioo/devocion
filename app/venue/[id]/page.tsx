import { Suspense } from 'react'
import { VenueDetailPage } from '@/components/venue/venue-detail-page'
import { getVenueById } from '@/lib/venues'
import { notFound } from 'next/navigation'

interface VenuePageProps {
  params: Promise<{ id: string }>
}

export default async function VenuePage({ params }: VenuePageProps) {
  const { id } = await params
  const venue = getVenueById(id)

  if (!venue) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="text-center py-12 text-black">Loading...</div>}>
        <VenueDetailPage venueId={id} />
      </Suspense>
    </main>
  )
}

