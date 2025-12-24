import React, { createContext, useContext, useReducer, ReactNode } from 'react'

interface BookingItem {
  id: string
  type: 'accommodation' | 'transport' | 'activity' | 'guide'
  name: string
  price: number
  quantity: number
  date?: string
  time?: string
  details?: any
}

interface BookingState {
  items: BookingItem[]
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    nationality: string
    passport: string
  }
  paymentInfo: {
    cardNumber: string
    expiryDate: string
    cvv: string
    nameOnCard: string
  }
  totalPrice: number
  bookingStatus: 'draft' | 'pending' | 'confirmed' | 'cancelled'
}

type BookingAction =
  | { type: 'ADD_ITEM'; payload: BookingItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_ITEM'; payload: { id: string; updates: Partial<BookingItem> } }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<BookingState['personalInfo']> }
  | { type: 'UPDATE_PAYMENT_INFO'; payload: Partial<BookingState['paymentInfo']> }
  | { type: 'UPDATE_STATUS'; payload: BookingState['bookingStatus'] }
  | { type: 'CLEAR_BOOKING' }

const initialState: BookingState = {
  items: [],
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    passport: ''
  },
  paymentInfo: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  },
  totalPrice: 0,
  bookingStatus: 'draft'
}

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItems = [...state.items, action.payload]
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      return {
        ...state,
        items: newItems,
        totalPrice: newTotal
      }

    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload)
      const filteredTotal = filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      return {
        ...state,
        items: filteredItems,
        totalPrice: filteredTotal
      }

    case 'UPDATE_ITEM':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.updates }
          : item
      )
      const updatedTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      return {
        ...state,
        items: updatedItems,
        totalPrice: updatedTotal
      }

    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload }
      }

    case 'UPDATE_PAYMENT_INFO':
      return {
        ...state,
        paymentInfo: { ...state.paymentInfo, ...action.payload }
      }

    case 'UPDATE_STATUS':
      return {
        ...state,
        bookingStatus: action.payload
      }

    case 'CLEAR_BOOKING':
      return initialState

    default:
      return state
  }
}

interface BookingContextType {
  state: BookingState
  addItem: (item: BookingItem) => void
  removeItem: (id: string) => void
  updateItem: (id: string, updates: Partial<BookingItem>) => void
  updatePersonalInfo: (info: Partial<BookingState['personalInfo']>) => void
  updatePaymentInfo: (info: Partial<BookingState['paymentInfo']>) => void
  updateStatus: (status: BookingState['bookingStatus']) => void
  clearBooking: () => void
  submitBooking: () => Promise<{ success: boolean; bookingId?: string; error?: string }>
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  const addItem = (item: BookingItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateItem = (id: string, updates: Partial<BookingItem>) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id, updates } })
  }

  const updatePersonalInfo = (info: Partial<BookingState['personalInfo']>) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: info })
  }

  const updatePaymentInfo = (info: Partial<BookingState['paymentInfo']>) => {
    dispatch({ type: 'UPDATE_PAYMENT_INFO', payload: info })
  }

  const updateStatus = (status: BookingState['bookingStatus']) => {
    dispatch({ type: 'UPDATE_STATUS', payload: status })
  }

  const clearBooking = () => {
    dispatch({ type: 'CLEAR_BOOKING' })
  }

  const submitBooking = async (): Promise<{ success: boolean; bookingId?: string; error?: string }> => {
    try {
      // Validate booking data
      if (state.items.length === 0) {
        return { success: false, error: 'No items in booking' }
      }

      if (!state.personalInfo.firstName || !state.personalInfo.email) {
        return { success: false, error: 'Missing personal information' }
      }

      if (!state.paymentInfo.cardNumber || !state.paymentInfo.cvv) {
        return { success: false, error: 'Missing payment information' }
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Generate mock booking ID
      const bookingId = `BK-${Date.now()}`

      // Update status to confirmed
      updateStatus('confirmed')

      return { success: true, bookingId }
    } catch (error) {
      return { success: false, error: 'Failed to submit booking' }
    }
  }

  return (
    <BookingContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateItem,
        updatePersonalInfo,
        updatePaymentInfo,
        updateStatus,
        clearBooking,
        submitBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}

