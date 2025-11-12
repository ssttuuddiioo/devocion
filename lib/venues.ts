import { Venue } from './types'

export const venues: Venue[] = [
  {
    id: 'williamsburg',
    name: 'Williamsburg',
    images: ['/williamsburg.webp'],
    address: '148 Grand St, Brooklyn, NY 11249',
    hours: {
      weekdays: 'Mon–Fri: 7am – 6pm',
      weekends: 'Sat–Sun: 7:30am – 6pm',
    },
    description:
      'Flagship New York specialty coffee shop and roastery with indoor greenery and natural light. Features a pitched roof, skylight, sunlit courtyard, and handcrafted wooden details inspired by traditional Colombian coffee farms.',
    squareFootage: 3500,
    capacity: 120,
    fullDayBuyout: 16000,
    afterHoursRate: 500,
  },
  {
    id: 'dumbo',
    name: 'Dumbo',
    images: ['/Devocion_Dumbo_0722_LizClayman_046.webp'],
    address: '105 York St., Brooklyn, NY 11201',
    hours: {
      weekdays: 'Mon–Fri: 7am – 6pm',
      weekends: 'Sat–Sun: 7:30am – 6pm',
    },
    description:
      'Located on the corner of Jay and York with 20 ft ceilings, large floor to ceiling windows, and an industrial character. Features three 16-foot planters created from Colombian naturally fallen Pine trees hung from the ceiling, filled with jungle-like hanging plants and indigenous flowers. Custom solid wood wall paneling inspired by traditional Bogotá house doors creates a warm background.',
    squareFootage: 4200,
    capacity: 150,
    fullDayBuyout: 20000,
    afterHoursRate: 600,
  },
  {
    id: 'downtown',
    name: 'Downtown Brooklyn',
    images: ['/DowntownBK_Devocion_LizClayman_002_3.jpg'],
    address: 'Downtown Brooklyn',
    hours: {
      weekdays: 'Mon–Fri: 7am – 6pm',
      weekends: 'Sat–Sun: 7:30am – 6pm',
    },
    description:
      'Spacious venue perfect for corporate events and meetings in the bustling downtown area.',
    squareFootage: 2800,
    capacity: 80,
    fullDayBuyout: 12000,
    afterHoursRate: 450,
  },
  {
    id: 'nomad',
    name: 'NoMad',
    images: ['/Devocion_NoMad_0425_LizClayman_1064.webp'],
    address: '1134 Broadway, New York, NY 10010',
    hours: {
      weekdays: 'Mon–Fri: 7am – 6pm',
      weekends: 'Sat–Sun: 7:30am – 6pm',
    },
    description:
      'A stunning indoor oasis in the heart of NoMad serving the freshest Colombian coffee in New York City. Features elegant design elements and premium amenities perfect for events.',
    squareFootage: 3200,
    capacity: 100,
    fullDayBuyout: 18000,
    afterHoursRate: 550,
  },
  {
    id: 'flatiron',
    name: 'Flatiron',
    images: ['/Flatiron_Devocion_LizClayman_002_2x_87422494-c6ca-48c5-bd09-26a4ffbe7314.webp'],
    address: '25 E 20th St, New York, NY 10003',
    hours: {
      weekdays: 'Mon–Fri: 7am – 6pm',
      weekends: 'Sat–Sun: 7:30am – 6pm',
    },
    description:
      'Iconic location in the Flatiron District, perfect for product launches and high-profile events. Features elegant design and premium amenities.',
    squareFootage: 4800,
    capacity: 180,
    fullDayBuyout: 24000,
    afterHoursRate: 700,
  },
  {
    id: 'midtown',
    name: 'Lexington',
    images: ['/Devocion_0523_LizClayman_087_e2526ecc-5036-4919-ab5f-c32d3c6fb29c.webp'],
    address: '600 Lexington Ave., New York, NY 10022',
    hours: {
      weekdays: 'Mon–Fri: 7am – 6pm',
      weekends: 'Sat–Sun: 8am – 5pm',
    },
    description:
      'Inspired by the corten steel sculptures found in Medellin and the glasshouse of the NY Botanical Garden. Features a central steel column covered by tropical plants and indigenous flowers. A corten steel walkway guides guests around the space to the "L" shaped coffee counter finished with Carrara honed marble and intimate benches with planters carved inside custom wood paneling.',
    squareFootage: 3600,
    capacity: 130,
    fullDayBuyout: 17000,
    afterHoursRate: 525,
  },
]

export function getVenueById(id: string): Venue | undefined {
  return venues.find((venue) => venue.id === id)
}

