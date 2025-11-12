import { Inquiry } from './types'
import { getVenueById } from './venues'
import { format } from 'date-fns'

export function generateEmail(inquiry: Inquiry): string {
  const venue = getVenueById(inquiry.eventBasics.venueId)
  const firstName = inquiry.contactInfo.firstName
  const preferredDate = inquiry.eventBasics.preferredDates[0]
    ? format(new Date(inquiry.eventBasics.preferredDates[0]), 'MMMM d, yyyy')
    : 'your preferred date'
  
  const altDates = inquiry.eventBasics.preferredDates.slice(1)
  const altDatesText = altDates.length > 0
    ? ` (or ${altDates.map(d => format(new Date(d), 'MMM d')).join(', ')})`
    : ''

  const services = []
  if (inquiry.requirements.services.coffeeService) services.push('coffee service')
  if (inquiry.requirements.services.baristas) services.push('baristas')
  if (inquiry.requirements.services.pastryService === 'Yes') services.push('pastry service')
  if (inquiry.requirements.services.alcoholService) services.push('alcohol service')
  if (inquiry.requirements.services.avPackage === 'Yes') services.push('AV package')

  const servicesText = services.length > 0 ? services.join(', ') : 'basic setup'

  const timeBlock = inquiry.requirements.timeBlocks.dayHours && inquiry.requirements.timeBlocks.eveningHours
    ? 'full day'
    : inquiry.requirements.timeBlocks.eveningHours
    ? 'evening'
    : 'day'

  const email = `Hi ${firstName},

Thanks for your interest in ${venue?.name || 'our venue'} for your ${inquiry.eventBasics.eventType.toLowerCase()}.

Quick context:
- ${preferredDate}${altDatesText}
- ${inquiry.eventBasics.guestCount} guests
- ${timeBlock} event (${inquiry.eventBasics.startTime} - ${inquiry.eventBasics.endTime})
- ${servicesText}
${inquiry.requirements.specialRequirements ? `- Special note: ${inquiry.requirements.specialRequirements}` : ''}

Your budget range is ${inquiry.contactInfo.budget}, and we can work within that. Our estimate comes in around $${inquiry.estimatedPrice.toLocaleString()} based on your needs.

Happy to hop on a quick call to discuss details and answer any questions. What works for you?

Best,
[Your name]`

  return email
}

