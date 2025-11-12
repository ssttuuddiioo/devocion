'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { venues } from '@/lib/venues'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function VenueImageSlider({ images, name }: { images: string[]; name: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <div className="relative aspect-video overflow-hidden bg-gray-100">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {images.map((image, index) => (
            <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 relative">
              <Image
                src={image}
                alt={`${name} - Image ${index + 1}`}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === selectedIndex
                    ? 'w-6 bg-white'
                    : 'w-1.5 bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function VenueCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {venues.map((venue) => (
        <Link
          key={venue.id}
          href={`/venue/${venue.id}`}
          className="group relative overflow-hidden rounded-lg border-2 border-brand-white bg-brand-white shadow-sm transition-all hover:shadow-lg hover:border-brand-yellow"
        >
          <VenueImageSlider images={venue.images} name={venue.name} />
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
              <span className="inline-flex items-center px-3 py-1.5 border-2 border-brand-white text-sm font-bold bg-brand-yellow text-brand-black group-hover:bg-brand-yellow/90 transition-colors uppercase">
                Select This Venue
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
