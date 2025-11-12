import {
  BudgetRange,
  OrganizationType,
  EventType,
  GuestCountRange,
  Services,
} from './types'

export function calculateLeadScore(
  budget: BudgetRange,
  orgType: OrganizationType,
  eventType: EventType,
  guestCount: GuestCountRange,
  services: Services
): number {
  let score = 0

  // Budget weight: 40 pts
  switch (budget) {
    case '$20k+':
      score += 40
      break
    case '$10k-$20k':
      score += 30
      break
    case '$5k-$10k':
      score += 20
      break
    case '$2k-$5k':
      score += 10
      break
    case '<$2k':
      score += 5
      break
  }

  // Org type: 20 pts
  switch (orgType) {
    case 'Company':
      score += 20
      break
    case 'Agency':
      score += 15
      break
    case 'Nonprofit':
      score += 10
      break
    case 'Individual':
      score += 5
      break
    case 'Other':
      score += 5
      break
  }

  // Event type: 20 pts
  switch (eventType) {
    case 'Product Launch':
      score += 20
      break
    case 'Offsite':
    case 'Meeting':
      score += 15
      break
    case 'Private Party':
    case 'Photoshoot':
      score += 10
      break
    case 'Other':
      score += 10
      break
  }

  // Headcount: 10 pts
  switch (guestCount) {
    case '101+':
      score += 10
      break
    case '61-100':
      score += 8
      break
    case '31-60':
      score += 6
      break
    case '0-30':
      score += 4
      break
  }

  // Services: 10 pts (Coffee = +5, Baristas = +5)
  if (services.coffeeService) {
    score += 5
  }
  if (services.baristas) {
    score += 5
  }

  return Math.min(score, 100)
}

export function getLeadScoreEmoji(score: number): string {
  if (score >= 80) return '🔥'
  if (score >= 60) return '⭐'
  if (score >= 40) return '💼'
  return '❄️'
}

export function getLeadScoreLabel(score: number): 'HIGH' | 'MEDIUM' | 'LOW' | 'VERY_LOW' {
  if (score >= 80) return 'HIGH'
  if (score >= 60) return 'MEDIUM'
  if (score >= 40) return 'LOW'
  return 'VERY_LOW'
}

