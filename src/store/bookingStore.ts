import { create } from 'zustand';

export interface MedicalInfo {
  dietaryPreferences: string[];
  allergies: string[];
  medicalConditions: string[];
  medications: string[];
  motionSickness: boolean;
  mobilityAssistance: boolean;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insuranceProvider: string;
  bloodType: string;
  specialMedicalNeeds: string;
}

export interface Preferences {
  travelType: string;
  budget: string;
  interests: string[];
  travelers: number;
  startDate: string;
  endDate: string;
  origin: string;
  destination: string;
  specialRequirements: string;
  medicalInfo: MedicalInfo;
}

export interface ItineraryItem {
  id: string;
  day: number;
  activity: string;
  location: string;
  duration: string;
  cost: number;
  description: string;
  highlights: string[];
}

export interface TransportOption {
  id: string;
  type: 'flight' | 'train' | 'bus' | 'car';
  name: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
  duration: string;
  provider: string;
}

export interface HotelOption {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  amenities: string[];
  image: string;
  description: string;
  checkIn: string;
  checkOut: string;
}

export interface TourOption {
  id: string;
  name: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  description: string;
  highlights: string[];
  image: string;
  category: string;
}

export interface BookingSummary {
  totalCost: number;
  breakdown: {
    transport: number;
    hotels: number;
    tours: number;
    taxes: number;
  };
  travelers: number;
  duration: number;
}

interface BookingState {
  // Step data
  preferences: Preferences | null;
  itinerary: ItineraryItem[] | null;
  transport: TransportOption[] | null;
  hotels: HotelOption[] | null;
  tours: TourOption[] | null;
  summary: BookingSummary | null;
  
  // Current step
  currentStep: number;
  
  // Actions
  setField: (field: keyof BookingState, data: any) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  
  // Computed values
  getTotalCost: () => number;
  getStepProgress: () => number;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  // Initial state
  preferences: null,
  itinerary: null,
  transport: null,
  hotels: null,
  tours: null,
  summary: null,
  currentStep: 1,
  
  // Actions
  setField: (field, data) => 
    set((state) => ({ ...state, [field]: data })),
  
  setCurrentStep: (step) => 
    set({ currentStep: step }),
  
  nextStep: () => 
    set((state) => ({ 
      currentStep: Math.min(state.currentStep + 1, 7) 
    })),
  
  prevStep: () => 
    set((state) => ({ 
      currentStep: Math.max(state.currentStep - 1, 1) 
    })),
  
  reset: () => 
    set({
      preferences: null,
      itinerary: null,
      transport: null,
      hotels: null,
      tours: null,
      summary: null,
      currentStep: 1,
    }),
  
  // Computed values
  getTotalCost: () => {
    const state = get();
    let total = 0;
    
    if (state.transport) {
      total += state.transport.reduce((sum, item) => sum + item.price, 0);
    }
    
    if (state.hotels) {
      total += state.hotels.reduce((sum, item) => sum + item.price, 0);
    }
    
    if (state.tours) {
      total += state.tours.reduce((sum, item) => sum + item.price, 0);
    }
    
    return total;
  },
  
  getStepProgress: () => {
    const state = get();
    const completedSteps = [
      state.preferences,
      state.itinerary,
      state.transport,
      state.hotels,
      state.tours,
      state.summary
    ].filter(Boolean).length;
    
    return (completedSteps / 6) * 100;
  }
}));

