import { Venue } from './types'

export const venues: Venue[] = [
  {
    id: 'williamsburg',
    name: 'Williamsburg',
    image: '/venues/williamsburg.jpg',
    squareFootage: 3500,
    capacity: 120,
    fullDayBuyout: 16000,
    afterHoursRate: 500,
  },
  {
    id: 'dumbo',
    name: 'Dumbo',
    image: '/venues/dumbo.jpg',
    squareFootage: 4200,
    capacity: 150,
    fullDayBuyout: 20000,
    afterHoursRate: 600,
  },
  {
    id: 'downtown',
    name: 'Downtown',
    image: '/venues/downtown.jpg',
    squareFootage: 2800,
    capacity: 80,
    fullDayBuyout: 12000,
    afterHoursRate: 450,
  },
  {
    id: 'soho',
    name: 'SoHo',
    image: '/venues/soho.jpg',
    squareFootage: 3200,
    capacity: 100,
    fullDayBuyout: 18000,
    afterHoursRate: 550,
  },
  {
    id: 'tribeca',
    name: 'Tribeca',
    image: '/venues/tribeca.jpg',
    squareFootage: 4800,
    capacity: 180,
    fullDayBuyout: 24000,
    afterHoursRate: 700,
  },
  {
    id: 'chelsea',
    name: 'Chelsea',
    image: '/venues/chelsea.jpg',
    squareFootage: 3600,
    capacity: 130,
    fullDayBuyout: 17000,
    afterHoursRate: 525,
  },
]

export function getVenueById(id: string): Venue | undefined {
  return venues.find((venue) => venue.id === id)
}

