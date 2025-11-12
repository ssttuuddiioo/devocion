'use client'

import { useState } from 'react'
import { useInquiriesStore, useAdminStore } from '@/lib/store'
import { InquiryStatus, ActivityType } from '@/lib/types'
import { getVenueById } from '@/lib/venues'
import { getLeadScoreEmoji } from '@/lib/scoring'
import { format } from 'date-fns'
import { X, Mail, Phone, Copy, Trash2, MessageSquare, PhoneCall, Mail as MailIcon, Calendar, Clock, Plus } from 'lucide-react'

export function DetailPanel() {
  const { inquiries, updateInquiryStatus, deleteInquiry, addActivity, updateLastContacted, setFollowUpDate } = useInquiriesStore()
  const { selectedInquiryId, setSelectedInquiry } = useAdminStore()
  const [noteText, setNoteText] = useState('')
  const [activityType, setActivityType] = useState<ActivityType>('note')
  const [showNoteInput, setShowNoteInput] = useState(false)
  const [followUpDateInput, setFollowUpDateInput] = useState('')

  if (!selectedInquiryId) return null

  const inquiry = inquiries.find((i) => i.id === selectedInquiryId)
  if (!inquiry) return null

  const venue = getVenueById(inquiry.eventBasics.venueId)
  const emoji = getLeadScoreEmoji(inquiry.leadScore)
  const activities = inquiry.activities || []

  const handleStatusChange = (newStatus: InquiryStatus) => {
    updateInquiryStatus(inquiry.id, newStatus)
    if (newStatus === 'CONTACTED' && !inquiry.lastContactedAt) {
      updateLastContacted(inquiry.id, new Date())
    }
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
    updateLastContacted(inquiry.id, new Date())
    addActivity(inquiry.id, {
      type: 'call',
      content: 'Marked as contacted',
    })
  }

  const handleAddNote = () => {
    if (!noteText.trim()) return
    
    addActivity(inquiry.id, {
      type: activityType,
      content: noteText.trim(),
    })
    
    if (activityType === 'call' || activityType === 'email') {
      updateLastContacted(inquiry.id, new Date())
    }
    
    setNoteText('')
    setShowNoteInput(false)
    setActivityType('note')
  }

  const handleSetFollowUp = () => {
    if (followUpDateInput) {
      const date = new Date(followUpDateInput)
      setFollowUpDate(inquiry.id, date)
      addActivity(inquiry.id, {
        type: 'note',
        content: `Follow-up scheduled for ${format(date, 'MMM d, yyyy')}`,
      })
      setFollowUpDateInput('')
    }
  }

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'call':
        return <PhoneCall className="w-4 h-4" />
      case 'email':
        return <MailIcon className="w-4 h-4" />
      case 'meeting':
        return <Calendar className="w-4 h-4" />
      case 'status_change':
        return <Clock className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
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

          {/* Follow-up & Last Contacted */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              FOLLOW-UP & CONTACT
            </h3>
            <div className="space-y-3">
              {inquiry.lastContactedAt && (
                <div className="text-sm">
                  <span className="text-gray-600">Last Contacted:</span>{' '}
                  <span className="text-gray-900">
                    {format(inquiry.lastContactedAt, 'MMM d, yyyy')} at{' '}
                    {format(inquiry.lastContactedAt, 'h:mm a')}
                  </span>
                </div>
              )}
              {inquiry.followUpDate && (
                <div className="text-sm">
                  <span className="text-gray-600">Follow-up Date:</span>{' '}
                  <span className="text-gray-900 font-semibold">
                    {format(inquiry.followUpDate, 'MMM d, yyyy')}
                  </span>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="date"
                  value={followUpDateInput}
                  onChange={(e) => setFollowUpDateInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <button
                  onClick={handleSetFollowUp}
                  disabled={!followUpDateInput}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Set Follow-up
                </button>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                ACTIVITY TIMELINE
              </h3>
              <button
                onClick={() => setShowNoteInput(!showNoteInput)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 border border-blue-600 rounded-md hover:bg-blue-50"
              >
                <Plus className="w-4 h-4" />
                Add Note
              </button>
            </div>

            {/* Add Note Input */}
            {showNoteInput && (
              <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                <select
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value as ActivityType)}
                  className="w-full mb-2 px-2 py-1.5 border border-gray-300 rounded-md text-sm"
                >
                  <option value="note">Note</option>
                  <option value="call">Call</option>
                  <option value="email">Email</option>
                  <option value="meeting">Meeting</option>
                </select>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add a note..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddNote}
                    disabled={!noteText.trim()}
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowNoteInput(false)
                      setNoteText('')
                    }}
                    className="px-4 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Activity List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {activities.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No activities yet</p>
              ) : (
                activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex gap-3 p-3 bg-gray-50 rounded-md border border-gray-200"
                  >
                    <div className="flex-shrink-0 mt-0.5 text-gray-500">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">
                        {activity.content}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(activity.createdAt, 'MMM d, yyyy')} at{' '}
                        {format(activity.createdAt, 'h:mm a')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

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

