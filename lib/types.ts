export type EventType =
  | 'Product Launch'
  | 'Offsite'
  | 'Meeting'
  | 'Private Party'
  | 'Photoshoot'
  | 'Other'

export type OrganizationType =
  | 'Company'
  | 'Agency'
  | 'Nonprofit'
  | 'Individual'
  | 'Other'

export type BudgetRange =
  | '<$2k'
  | '$2k-$5k'
  | '$5k-$10k'
  | '$10k-$20k'
  | '$20k+'

export type GuestCountRange = '0-30' | '31-60' | '61-100' | '101+'

export type ServiceOption = 'Yes' | 'No' | 'Maybe'

export type InquiryStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'NEGOTIATING'
  | 'CLOSED WON'
  | 'CLOSED LOST'

export interface Venue {
  id: string
  name: string
  image: string
  squareFootage: number
  capacity: number
  fullDayBuyout: number
  afterHoursRate: number
}

export interface TimeBlock {
  dayHours: boolean
  eveningHours: boolean
}

export interface Services {
  coffeeService: boolean
  pastryService: ServiceOption
  baristas: boolean
  alcoholService: boolean
  avPackage: ServiceOption
}

export interface EventBasics {
  venueId: string
  eventType: EventType
  preferredDates: string[]
  startTime: string
  endTime: string
  guestCount: GuestCountRange
}

export interface Requirements {
  timeBlocks: TimeBlock
  services: Services
  specialRequirements?: string
}

export interface ContactInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  organizationName: string
  organizationType: OrganizationType
  budget: BudgetRange
}

export interface Inquiry {
  id: string
  eventBasics: EventBasics
  requirements: Requirements
  contactInfo: ContactInfo
  status: InquiryStatus
  leadScore: number
  estimatedPrice: number
  submittedAt: Date
}

export interface FormData {
  eventBasics: Partial<EventBasics>
  requirements: Partial<Requirements>
  contactInfo: Partial<ContactInfo>
}

export interface AdminFilters {
  search: string
  status: InquiryStatus | 'ALL'
  venue: string | 'ALL'
  dateRange: 'Last 7 days' | 'Last 30 days' | 'Last 90 days' | 'All time'
  leadScore: 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'VERY_LOW'
}

