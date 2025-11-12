import { Inquiry } from './types'
import { calculateLeadScore } from './scoring'
import { estimatePrice } from './pricing'

export const mockInquiries: Inquiry[] = [
  // High-score leads (🔥 80-100)
  {
    id: '1',
    eventBasics: {
      venueId: 'williamsburg',
      eventType: 'Product Launch',
      preferredDates: ['2024-12-15', '2024-12-16', '2024-12-17'],
      startTime: '18:00',
      endTime: '22:00',
      guestCount: '61-100',
    },
    requirements: {
      timeBlocks: {
        dayHours: false,
        eveningHours: true,
      },
      services: {
        coffeeService: true,
        pastryService: 'Yes',
        baristas: true,
        alcoholService: false,
        avPackage: 'Yes',
      },
      specialRequirements:
        'Need projector for product demo, preference for standing reception setup with high-top tables',
    },
    contactInfo: {
      firstName: 'Sarah',
      lastName: 'Chen',
      email: 'sarah.chen@techcorp.com',
      phone: '(917) 555-0123',
      organizationName: 'TechCorp',
      organizationType: 'Company',
      budget: '$20k+',
    },
    status: 'NEW',
    leadScore: calculateLeadScore(
      '$20k+',
      'Company',
      'Product Launch',
      '61-100',
      {
        coffeeService: true,
        pastryService: 'Yes',
        baristas: true,
        alcoholService: false,
        avPackage: 'Yes',
      }
    ),
    estimatedPrice: estimatePrice(
      'williamsburg',
      { dayHours: false, eveningHours: true },
      '18:00',
      '22:00',
      '61-100',
      {
        coffeeService: true,
        pastryService: 'Yes',
        baristas: true,
        alcoholService: false,
        avPackage: 'Yes',
      }
    ),
    submittedAt: new Date('2024-11-10T14:30:00'),
  },
  {
    id: '2',
    eventBasics: {
      venueId: 'tribeca',
      eventType: 'Product Launch',
      preferredDates: ['2024-12-20'],
      startTime: '17:00',
      endTime: '23:00',
      guestCount: '101+',
    },
    requirements: {
      timeBlocks: {
        dayHours: true,
        eveningHours: true,
      },
      services: {
        coffeeService: true,
        pastryService: 'Yes',
        baristas: true,
        alcoholService: true,
        avPackage: 'Yes',
      },
      specialRequirements: 'Full day event with cocktail reception',
    },
    contactInfo: {
      firstName: 'Michael',
      lastName: 'Rodriguez',
      email: 'm.rodriguez@startup.io',
      phone: '(646) 555-0456',
      organizationName: 'Startup.io',
      organizationType: 'Company',
      budget: '$20k+',
    },
    status: 'CONTACTED',
    leadScore: calculateLeadScore(
      '$20k+',
      'Company',
      'Product Launch',
      '101+',
      {
        coffeeService: true,
        pastryService: 'Yes',
        baristas: true,
        alcoholService: true,
        avPackage: 'Yes',
      }
    ),
    estimatedPrice: estimatePrice(
      'tribeca',
      { dayHours: true, eveningHours: true },
      '17:00',
      '23:00',
      '101+',
      {
        coffeeService: true,
        pastryService: 'Yes',
        baristas: true,
        alcoholService: true,
        avPackage: 'Yes',
      }
    ),
    submittedAt: new Date('2024-11-08T10:15:00'),
  },
  {
    id: '3',
    eventBasics: {
      venueId: 'dumbo',
      eventType: 'Offsite',
      preferredDates: ['2024-12-03', '2024-12-04'],
      startTime: '09:00',
      endTime: '17:00',
      guestCount: '31-60',
    },
    requirements: {
      timeBlocks: {
        dayHours: true,
        eveningHours: false,
      },
      services: {
        coffeeService: true,
        pastryService: 'Yes',
        baristas: false,
        alcoholService: false,
        avPackage: 'Yes',
      },
      specialRequirements: 'Need breakout rooms for team sessions',
    },
    contactInfo: {
      firstName: 'David',
      lastName: 'Park',
      email: 'david.park@adobe.com',
      phone: '(212) 555-0789',
      organizationName: 'Adobe',
      organizationType: 'Company',
      budget: '$10k-$20k',
    },
    status: 'CONTACTED',
    leadScore: calculateLeadScore(
      '$10k-$20k',
      'Company',
      'Offsite',
      '31-60',
      {
        coffeeService: true,
        pastryService: 'Yes',
        baristas: false,
        alcoholService: false,
        avPackage: 'Yes',
      }
    ),
    estimatedPrice: estimatePrice(
      'dumbo',
      { dayHours: true, eveningHours: false },
      '09:00',
      '17:00',
      '31-60',
      {
        coffeeService: true,
        pastryService: 'Yes',
        baristas: false,
        alcoholService: false,
        avPackage: 'Yes',
      }
    ),
    submittedAt: new Date('2024-11-05T16:45:00'),
  },
  // Medium leads (⭐ 60-79)
  {
    id: '4',
    eventBasics: {
      venueId: 'soho',
      eventType: 'Meeting',
      preferredDates: ['2024-12-10'],
      startTime: '14:00',
      endTime: '18:00',
      guestCount: '31-60',
    },
    requirements: {
      timeBlocks: {
        dayHours: true,
        eveningHours: false,
      },
      services: {
        coffeeService: true,
        pastryService: 'Maybe',
        baristas: false,
        alcoholService: false,
        avPackage: 'Yes',
      },
      specialRequirements: 'Board meeting setup',
    },
    contactInfo: {
      firstName: 'Jennifer',
      lastName: 'Martinez',
      email: 'j.martinez@agency.com',
      phone: '(347) 555-0234',
      organizationName: 'Creative Agency',
      organizationType: 'Agency',
      budget: '$10k-$20k',
    },
    status: 'NEGOTIATING',
    leadScore: calculateLeadScore(
      '$10k-$20k',
      'Agency',
      'Meeting',
      '31-60',
      {
        coffeeService: true,
        pastryService: 'Maybe',
        baristas: false,
        alcoholService: false,
        avPackage: 'Yes',
      }
    ),
    estimatedPrice: estimatePrice(
      'soho',
      { dayHours: true, eveningHours: false },
      '14:00',
      '18:00',
      '31-60',
      {
        coffeeService: true,
        pastryService: 'Maybe',
        baristas: false,
        alcoholService: false,
        avPackage: 'Yes',
      }
    ),
    submittedAt: new Date('2024-11-01T11:20:00'),
  },
  {
    id: '5',
    eventBasics: {
      venueId: 'downtown',
      eventType: 'Private Party',
      preferredDates: ['2024-12-22'],
      startTime: '19:00',
      endTime: '23:00',
      guestCount: '61-100',
    },
    requirements: {
      timeBlocks: {
        dayHours: false,
        eveningHours: true,
      },
      services: {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: true,
        avPackage: 'No',
      },
      specialRequirements: 'Holiday party, need DJ setup',
    },
    contactInfo: {
      firstName: 'Robert',
      lastName: 'Kim',
      email: 'robert.kim@company.com',
      phone: '(718) 555-0567',
      organizationName: 'Finance Corp',
      organizationType: 'Company',
      budget: '$10k-$20k',
    },
    status: 'NEW',
    leadScore: calculateLeadScore(
      '$10k-$20k',
      'Company',
      'Private Party',
      '61-100',
      {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: true,
        avPackage: 'No',
      }
    ),
    estimatedPrice: estimatePrice(
      'downtown',
      { dayHours: false, eveningHours: true },
      '19:00',
      '23:00',
      '61-100',
      {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: true,
        avPackage: 'No',
      }
    ),
    submittedAt: new Date('2024-11-12T09:00:00'),
  },
  {
    id: '6',
    eventBasics: {
      venueId: 'chelsea',
      eventType: 'Offsite',
      preferredDates: ['2024-12-05', '2024-12-06'],
      startTime: '10:00',
      endTime: '16:00',
      guestCount: '31-60',
    },
    requirements: {
      timeBlocks: {
        dayHours: true,
        eveningHours: false,
      },
      services: {
        coffeeService: true,
        pastryService: 'Yes',
        baristas: true,
        alcoholService: false,
        avPackage: 'Maybe',
      },
      specialRequirements: 'Team building workshop',
    },
    contactInfo: {
      firstName: 'Lisa',
      lastName: 'Thompson',
      email: 'lisa@marketing.com',
      phone: '(929) 555-0345',
      organizationName: 'Marketing Solutions',
      organizationType: 'Agency',
      budget: '$5k-$10k',
    },
    status: 'NEW',
    leadScore: calculateLeadScore(
      '$5k-$10k',
      'Agency',
      'Offsite',
      '31-60',
      {
        coffeeService: true,
        pastryService: 'Yes',
        baristas: true,
        alcoholService: false,
        avPackage: 'Maybe',
      }
    ),
    estimatedPrice: estimatePrice(
      'chelsea',
      { dayHours: true, eveningHours: false },
      '10:00',
      '16:00',
      '31-60',
      {
        coffeeService: true,
        pastryService: 'Yes',
        baristas: true,
        alcoholService: false,
        avPackage: 'Maybe',
      }
    ),
    submittedAt: new Date('2024-11-14T13:30:00'),
  },
  {
    id: '7',
    eventBasics: {
      venueId: 'williamsburg',
      eventType: 'Photoshoot',
      preferredDates: ['2024-12-08'],
      startTime: '08:00',
      endTime: '14:00',
      guestCount: '0-30',
    },
    requirements: {
      timeBlocks: {
        dayHours: true,
        eveningHours: false,
      },
      services: {
        coffeeService: true,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      },
      specialRequirements: 'Fashion shoot, need natural light',
    },
    contactInfo: {
      firstName: 'Emma',
      lastName: 'Wilson',
      email: 'emma@photography.com',
      phone: '(516) 555-0678',
      organizationName: 'Studio Photography',
      organizationType: 'Agency',
      budget: '$5k-$10k',
    },
    status: 'CONTACTED',
    leadScore: calculateLeadScore(
      '$5k-$10k',
      'Agency',
      'Photoshoot',
      '0-30',
      {
        coffeeService: true,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      }
    ),
    estimatedPrice: estimatePrice(
      'williamsburg',
      { dayHours: true, eveningHours: false },
      '08:00',
      '14:00',
      '0-30',
      {
        coffeeService: true,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      }
    ),
    submittedAt: new Date('2024-11-07T15:20:00'),
  },
  // Low leads (💼 40-59)
  {
    id: '8',
    eventBasics: {
      venueId: 'downtown',
      eventType: 'Meeting',
      preferredDates: ['2024-12-12'],
      startTime: '13:00',
      endTime: '15:00',
      guestCount: '0-30',
    },
    requirements: {
      timeBlocks: {
        dayHours: true,
        eveningHours: false,
      },
      services: {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      },
      specialRequirements: 'Small team meeting',
    },
    contactInfo: {
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike@startup.com',
      phone: '(917) 555-0890',
      organizationName: 'Startup Inc',
      organizationType: 'Company',
      budget: '$2k-$5k',
    },
    status: 'NEW',
    leadScore: calculateLeadScore(
      '$2k-$5k',
      'Company',
      'Meeting',
      '0-30',
      {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      }
    ),
    estimatedPrice: estimatePrice(
      'downtown',
      { dayHours: true, eveningHours: false },
      '13:00',
      '15:00',
      '0-30',
      {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      }
    ),
    submittedAt: new Date('2024-11-20T10:00:00'),
  },
  {
    id: '9',
    eventBasics: {
      venueId: 'soho',
      eventType: 'Private Party',
      preferredDates: ['2024-12-18'],
      startTime: '18:00',
      endTime: '22:00',
      guestCount: '31-60',
    },
    requirements: {
      timeBlocks: {
        dayHours: false,
        eveningHours: true,
      },
      services: {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      },
      specialRequirements: 'Birthday celebration',
    },
    contactInfo: {
      firstName: 'Alex',
      lastName: 'Brown',
      email: 'alex.brown@gmail.com',
      phone: '(646) 555-0123',
      organizationName: 'Personal',
      organizationType: 'Individual',
      budget: '$2k-$5k',
    },
    status: 'NEW',
    leadScore: calculateLeadScore(
      '$2k-$5k',
      'Individual',
      'Private Party',
      '31-60',
      {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      }
    ),
    estimatedPrice: estimatePrice(
      'soho',
      { dayHours: false, eveningHours: true },
      '18:00',
      '22:00',
      '31-60',
      {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      }
    ),
    submittedAt: new Date('2024-11-18T14:15:00'),
  },
  {
    id: '10',
    eventBasics: {
      venueId: 'chelsea',
      eventType: 'Other',
      preferredDates: ['2024-12-25'],
      startTime: '19:00',
      endTime: '23:00',
      guestCount: '0-30',
    },
    requirements: {
      timeBlocks: {
        dayHours: false,
        eveningHours: true,
      },
      services: {
        coffeeService: true,
        pastryService: 'Maybe',
        baristas: false,
        alcoholService: true,
        avPackage: 'No',
      },
      specialRequirements: 'Holiday gathering',
    },
    contactInfo: {
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria@nonprofit.org',
      phone: '(212) 555-0456',
      organizationName: 'Community Nonprofit',
      organizationType: 'Nonprofit',
      budget: '$2k-$5k',
    },
    status: 'NEW',
    leadScore: calculateLeadScore(
      '$2k-$5k',
      'Nonprofit',
      'Other',
      '0-30',
      {
        coffeeService: true,
        pastryService: 'Maybe',
        baristas: false,
        alcoholService: true,
        avPackage: 'No',
      }
    ),
    estimatedPrice: estimatePrice(
      'chelsea',
      { dayHours: false, eveningHours: true },
      '19:00',
      '23:00',
      '0-30',
      {
        coffeeService: true,
        pastryService: 'Maybe',
        baristas: false,
        alcoholService: true,
        avPackage: 'No',
      }
    ),
    submittedAt: new Date('2024-11-15T11:45:00'),
  },
  // Very low (❄️ <40)
  {
    id: '11',
    eventBasics: {
      venueId: 'downtown',
      eventType: 'Meeting',
      preferredDates: ['2024-12-28'],
      startTime: '10:00',
      endTime: '12:00',
      guestCount: '0-30',
    },
    requirements: {
      timeBlocks: {
        dayHours: true,
        eveningHours: false,
      },
      services: {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      },
      specialRequirements: 'Quick meeting',
    },
    contactInfo: {
      firstName: 'Tom',
      lastName: 'Anderson',
      email: 'tom@email.com',
      phone: '(347) 555-0789',
      organizationName: 'Freelance',
      organizationType: 'Individual',
      budget: '<$2k',
    },
    status: 'NEW',
    leadScore: calculateLeadScore(
      '<$2k',
      'Individual',
      'Meeting',
      '0-30',
      {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      }
    ),
    estimatedPrice: estimatePrice(
      'downtown',
      { dayHours: true, eveningHours: false },
      '10:00',
      '12:00',
      '0-30',
      {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      }
    ),
    submittedAt: new Date('2024-11-22T08:30:00'),
  },
  {
    id: '12',
    eventBasics: {
      venueId: 'williamsburg',
      eventType: 'Other',
      preferredDates: ['2024-12-30'],
      startTime: '20:00',
      endTime: '23:00',
      guestCount: '0-30',
    },
    requirements: {
      timeBlocks: {
        dayHours: false,
        eveningHours: true,
      },
      services: {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      },
      specialRequirements: 'New Year gathering',
    },
    contactInfo: {
      firstName: 'Chris',
      lastName: 'Lee',
      email: 'chris.lee@gmail.com',
      phone: '(718) 555-0234',
      organizationName: 'Personal',
      organizationType: 'Individual',
      budget: '<$2k',
    },
    status: 'NEW',
    leadScore: calculateLeadScore(
      '<$2k',
      'Individual',
      'Other',
      '0-30',
      {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      }
    ),
    estimatedPrice: estimatePrice(
      'williamsburg',
      { dayHours: false, eveningHours: true },
      '20:00',
      '23:00',
      '0-30',
      {
        coffeeService: false,
        pastryService: 'No',
        baristas: false,
        alcoholService: false,
        avPackage: 'No',
      }
    ),
    submittedAt: new Date('2024-11-25T12:00:00'),
  },
]

