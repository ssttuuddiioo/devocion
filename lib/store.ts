import { create } from 'zustand'
import { Inquiry, FormData, AdminFilters, InquiryStatus } from './types'
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
  inquiries: mockInquiries,
  addInquiry: (inquiry) =>
    set((state) => ({
      inquiries: [inquiry, ...state.inquiries],
    })),
  updateInquiryStatus: (id, status) =>
    set((state) => ({
      inquiries: state.inquiries.map((inquiry) =>
        inquiry.id === id ? { ...inquiry, status } : inquiry
      ),
    })),
  deleteInquiry: (id) =>
    set((state) => ({
      inquiries: state.inquiries.filter((inquiry) => inquiry.id !== id),
    })),
}))

export const useAdminStore = create<AdminStore>((set) => ({
  filters: {
    search: '',
    status: 'ALL',
    venue: 'ALL',
    dateRange: 'Last 30 days',
    leadScore: 'ALL',
  },
  selectedInquiryId: null,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  setSelectedInquiry: (id) => set({ selectedInquiryId: id }),
}))

