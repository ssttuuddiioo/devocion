'use client'

import { useInquiriesStore, useAdminStore } from '@/lib/store'
import { InquiryStatus } from '@/lib/types'
import { getVenueById } from '@/lib/venues'
import { getLeadScoreEmoji } from '@/lib/scoring'
import { format } from 'date-fns'
import { X, Mail, Phone, Copy, Trash2 } from 'lucide-react'

export function DetailPanel() {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useInquiriesStore()
  const { selectedInquiryId, setSelectedInquiry } = useAdminStore()

  if (!selectedInquiryId) return null

  const inquiry = inquiries.find((i) => i.id === selectedInquiryId)
  if (!inquiry) return null

  const venue = getVenueById(inquiry.eventBasics.venueId)
  const emoji = getLeadScoreEmoji(inquiry.leadScore)

  const handleStatusChange = (newStatus: InquiryStatus) => {
    updateInquiryStatus(inquiry.id, newStatus)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(inquiry.contactInfo.email)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      deleteInquiry(inquiry.id)
      setSelectedInquiry(null)
    }
  }

  const handleMarkContacted = () => {
    handleStatusChange('CONTACTED')
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={() => setSelectedInquiry(null)}
      />
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl z-50 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {inquiry.contactInfo.firstName} {inquiry.contactInfo.lastName}
            </h2>
            <p className="text-gray-600">{inquiry.contactInfo.organizationName}</p>
          </div>
          <button
            onClick={() => setSelectedInquiry(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{emoji}</span>
            <span className="text-xl font-bold text-gray-900">
              Lead Score: {inquiry.leadScore}/100
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={inquiry.status}
              onChange={(e) =>
                handleStatusChange(e.target.value as InquiryStatus)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="NEGOTIATING">Negotiating</option>
              <option value="CLOSED WON">Closed Won</option>
              <option value="CLOSED LOST">Closed Lost</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              CONTACT
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                  {inquiry.contactInfo.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="ml-auto text-gray-400 hover:text-gray-600"
                  title="Copy email"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                  {inquiry.contactInfo.phone}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              EVENT DETAILS
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Type:</span>{' '}
                <span className="text-gray-900">{inquiry.eventBasics.eventType}</span>
              </div>
              <div>
                <span className="text-gray-600">Organization:</span>{' '}
                <span className="text-gray-900">
                  {inquiry.contactInfo.organizationType}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Venue:</span>{' '}
                <span className="text-gray-900">{venue?.name}</span>
              </div>
              <div>
                <span className="text-gray-600">Date 1:</span>{' '}
                <span className="text-gray-900">
                  {inquiry.eventBasics.preferredDates[0]
                    ? format(
                        new Date(inquiry.eventBasics.preferredDates[0]),
                        'MMM d, yyyy'
                      )
                    : 'N/A'}
                </span>
              </div>
              {inquiry.eventBasics.preferredDates[1] && (
                <div>
                  <span className="text-gray-600">Date 2:</span>{' '}
                  <span className="text-gray-900">
                    {format(
                      new Date(inquiry.eventBasics.preferredDates[1]),
                      'MMM d, yyyy'
                    )}{' '}
                    (alt)
                  </span>
                </div>
              )}
              {inquiry.eventBasics.preferredDates[2] && (
                <div>
                  <span className="text-gray-600">Date 3:</span>{' '}
                  <span className="text-gray-900">
                    {format(
                      new Date(inquiry.eventBasics.preferredDates[2]),
                      'MMM d, yyyy'
                    )}{' '}
                    (alt)
                  </span>
                </div>
              )}
              <div>
                <span className="text-gray-600">Time:</span>{' '}
                <span className="text-gray-900">
                  {inquiry.eventBasics.startTime} - {inquiry.eventBasics.endTime}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Guests:</span>{' '}
                <span className="text-gray-900">
                  {inquiry.eventBasics.guestCount}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              REQUIREMENTS
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-600">Time Blocks:</span>
                <div className="mt-1 space-y-1">
                  {inquiry.requirements.timeBlocks.dayHours && (
                    <div className="text-gray-900">✓ Day hours (7am-7pm)</div>
                  )}
                  {inquiry.requirements.timeBlocks.eveningHours && (
                    <div className="text-gray-900">
                      ✓ Evening hours (7pm-11pm)
                    </div>
                  )}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Services:</span>
                <div className="mt-1 space-y-1">
                  <div className={inquiry.requirements.services.coffeeService ? 'text-gray-900' : 'text-gray-400'}>
                    {inquiry.requirements.services.coffeeService ? '✓' : '✗'}{' '}
                    Coffee service
                  </div>
                  <div className={inquiry.requirements.services.pastryService === 'Yes' ? 'text-gray-900' : 'text-gray-400'}>
                    {inquiry.requirements.services.pastryService === 'Yes' ? '✓' : '✗'}{' '}
                    Pastry service
                  </div>
                  <div className={inquiry.requirements.services.baristas ? 'text-gray-900' : 'text-gray-400'}>
                    {inquiry.requirements.services.baristas ? '✓' : '✗'}{' '}
                    Baristas
                  </div>
                  <div className={inquiry.requirements.services.alcoholService ? 'text-gray-900' : 'text-gray-400'}>
                    {inquiry.requirements.services.alcoholService ? '✓' : '✗'}{' '}
                    Alcohol service
                  </div>
                  <div className={inquiry.requirements.services.avPackage === 'Yes' ? 'text-gray-900' : 'text-gray-400'}>
                    {inquiry.requirements.services.avPackage === 'Yes' ? '✓' : '✗'}{' '}
                    AV Package
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              BUDGET & ESTIMATE
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Their Budget:</span>{' '}
                <span className="text-gray-900">{inquiry.contactInfo.budget}</span>
              </div>
              <div>
                <span className="text-gray-600">Est. Price:</span>{' '}
                <span className="text-gray-900">
                  ${inquiry.estimatedPrice.toLocaleString()}
                </span>
              </div>
              <div className="text-green-600">
                ✓ Matches minimum
              </div>
            </div>
          </div>

          {inquiry.requirements.specialRequirements && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                SPECIAL REQUIREMENTS
              </h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {inquiry.requirements.specialRequirements}
              </p>
            </div>
          )}

          <div className="border-t border-gray-200 pt-4">
            <div className="text-sm text-gray-500 mb-4">
              Submitted:{' '}
              {format(inquiry.submittedAt, 'MMM d, yyyy')} at{' '}
              {format(inquiry.submittedAt, 'h:mm a')}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleCopyEmail}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Email
              </button>
              <button
                onClick={handleMarkContacted}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Mark as Contacted
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 border border-red-300 rounded-md text-sm text-red-700 hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

