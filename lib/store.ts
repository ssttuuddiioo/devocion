import { create } from 'zustand'
import { Inquiry, FormData, AdminFilters, InquiryStatus, Activity } from './types'
import { mockInquiries } from './mockData'

interface FormStore {
  currentStep: number
  formData: FormData
  setCurrentStep: (step: number) => void
  updateFormData: (data: Partial<FormData>) => void
  resetForm: () => void
}

interface InquiriesStore {
  inquiries: Inquiry[]
  addInquiry: (inquiry: Inquiry) => void
  updateInquiryStatus: (id: string, status: InquiryStatus) => void
  deleteInquiry: (id: string) => void
  addActivity: (inquiryId: string, activity: Omit<Activity, 'id' | 'createdAt'>) => void
  updateLastContacted: (id: string, date: Date) => void
  setFollowUpDate: (id: string, date: Date | undefined) => void
}

interface AdminStore {
  filters: AdminFilters
  selectedInquiryId: string | null
  setFilters: (filters: Partial<AdminFilters>) => void
  setSelectedInquiry: (id: string | null) => void
}

export const useFormStore = create<FormStore>((set) => ({
  currentStep: 1,
  formData: {
    eventBasics: {},
    requirements: {},
    contactInfo: {},
  },
  setCurrentStep: (step) => set({ currentStep: step }),
  updateFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
  resetForm: () =>
    set({
      currentStep: 1,
      formData: {
        eventBasics: {},
        requirements: {},
        contactInfo: {},
      },
    }),
}))

export const useInquiriesStore = create<InquiriesStore>((set) => ({
  inquiries: mockInquiries.map((inquiry) => ({
    ...inquiry,
    activities: inquiry.activities || [],
    lastContactedAt: inquiry.lastContactedAt,
    followUpDate: inquiry.followUpDate,
  })),
  addInquiry: (inquiry) =>
    set((state) => ({
      inquiries: [
        { ...inquiry, activities: inquiry.activities || [] },
        ...state.inquiries,
      ],
    })),
  updateInquiryStatus: (id, status) =>
    set((state) => ({
      inquiries: state.inquiries.map((inquiry) => {
        if (inquiry.id === id) {
          const activity: Activity = {
            id: Date.now().toString(),
            type: 'status_change',
            content: `Status changed to ${status}`,
            createdAt: new Date(),
          }
          return {
            ...inquiry,
            status,
            activities: [activity, ...(inquiry.activities || [])],
          }
        }
        return inquiry
      }),
    })),
  deleteInquiry: (id) =>
    set((state) => ({
      inquiries: state.inquiries.filter((inquiry) => inquiry.id !== id),
    })),
  addActivity: (inquiryId, activity) =>
    set((state) => ({
      inquiries: state.inquiries.map((inquiry) => {
        if (inquiry.id === inquiryId) {
          const newActivity: Activity = {
            ...activity,
            id: Date.now().toString(),
            createdAt: new Date(),
          }
          return {
            ...inquiry,
            activities: [newActivity, ...(inquiry.activities || [])],
          }
        }
        return inquiry
      }),
    })),
  updateLastContacted: (id, date) =>
    set((state) => ({
      inquiries: state.inquiries.map((inquiry) =>
        inquiry.id === id ? { ...inquiry, lastContactedAt: date } : inquiry
      ),
    })),
  setFollowUpDate: (id, date) =>
    set((state) => ({
      inquiries: state.inquiries.map((inquiry) =>
        inquiry.id === id ? { ...inquiry, followUpDate: date } : inquiry
      ),
    })),
}))

export const useAdminStore = create<AdminStore>((set) => ({
  filters: {
    search: '',
    status: 'ALL',
    venue: 'ALL',
    dateRange: 'All time',
    leadScore: 'ALL',
  },
  selectedInquiryId: null,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  setSelectedInquiry: (id) => set({ selectedInquiryId: id }),
}))

