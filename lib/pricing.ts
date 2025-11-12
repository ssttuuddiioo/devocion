import { Venue, TimeBlock, Services, GuestCountRange } from './types'
import { getVenueById } from './venues'

function parseTime(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours + minutes / 60
}

function calculateHours(startTime: string, endTime: string): number {
  const start = parseTime(startTime)
  const end = parseTime(endTime)
  return Math.max(end - start, 0)
}

function getGuestCountNumber(guestCount: GuestCountRange): number {
  switch (guestCount) {
    case '0-30':
      return 25
    case '31-60':
      return 45
    case '61-100':
      return 80
    case '101+':
      return 120
  }
}

export function estimatePrice(
  venueId: string,
  timeBlocks: TimeBlock,
  startTime: string,
  endTime: string,
  guestCount: GuestCountRange,
  services: Services
): number {
  const venue = getVenueById(venueId)
  if (!venue) return 0

  let basePrice = 0

  // If both day and evening hours: Full day buyout price
  if (timeBlocks.dayHours && timeBlocks.eveningHours) {
    basePrice = venue.fullDayBuyout
  } else if (timeBlocks.eveningHours) {
    // If evening only: After-hours rate × hours (minimum 3 hours)
    const hours = calculateHours(startTime, endTime)
    basePrice = venue.afterHoursRate * Math.max(hours, 3)
  } else if (timeBlocks.dayHours) {
    // Day hours only - use full day buyout
    basePrice = venue.fullDayBuyout
  }

  // Add service estimates
  const guestNumber = getGuestCountNumber(guestCount)

  // Coffee service: $15/person
  if (services.coffeeService) {
    basePrice += 15 * guestNumber
  }

  // AV Package: $1,000
  if (services.avPackage === 'Yes') {
    basePrice += 1000
  }

  // Baristas: $500
  if (services.baristas) {
    basePrice += 500
  }

  return Math.round(basePrice)
}

