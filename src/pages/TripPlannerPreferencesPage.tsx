import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import Stepper from '../components/tripPlanner/Stepper'
import NextButton from '../components/tripPlanner/NextButton'
import { useBookingStore } from '../store/bookingStore'
import { Calendar, Users, DollarSign, Heart, MapPin, Clock, Shield, AlertTriangle, Phone, User, Navigation, Search, X } from 'lucide-react'

const travelTypes = [
  { id: 'leisure', name: 'Leisure & Relaxation', icon: '🏖️', description: 'Beaches, spas, and peaceful retreats' },
  { id: 'adventure', name: 'Adventure & Nature', icon: '🏔️', description: 'Hiking, wildlife, and outdoor activities' },
  { id: 'culture', name: 'Culture & Heritage', icon: '🏛️', description: 'Historical sites, temples, and traditions' },
  { id: 'wellness', name: 'Wellness & Medical', icon: '🧘', description: 'Ayurveda, yoga, and health treatments' },
  { id: 'pilgrimage', name: 'Pilgrimage & Spiritual', icon: '🙏', description: 'Religious sites and spiritual journeys' }
]

const budgetRanges = [
  { id: 'budget', name: 'Budget', range: '$500 - $1,500', description: 'Hostels, local transport, street food' },
  { id: 'standard', name: 'Standard', range: '$1,500 - $3,500', description: 'Mid-range hotels, guided tours' },
  { id: 'luxury', name: 'Luxury', range: '$3,500+', description: '5-star hotels, private tours, premium experiences' }
]

const interests = [
  { id: 'beaches', name: 'Beaches & Coastline', icon: '🏖️' },
  { id: 'wildlife', name: 'Wildlife & Nature', icon: '🦁' },
  { id: 'history', name: 'Historical Sites', icon: '🏛️' },
  { id: 'temples', name: 'Temples & Religious Sites', icon: '🕉️' },
  { id: 'tea', name: 'Tea Plantations', icon: '🍃' },
  { id: 'food', name: 'Local Cuisine', icon: '🍛' },
  { id: 'adventure', name: 'Adventure Sports', icon: '🏄' },
  { id: 'shopping', name: 'Shopping & Markets', icon: '🛍️' }
]

const dietaryOptions = [
  { id: 'vegetarian', name: 'Vegetarian', icon: '🥬' },
  { id: 'vegan', name: 'Vegan', icon: '🌱' },
  { id: 'halal', name: 'Halal', icon: '☪️' },
  { id: 'kosher', name: 'Kosher', icon: '✡️' },
  { id: 'gluten-free', name: 'Gluten-Free', icon: '🌾' },
  { id: 'dairy-free', name: 'Dairy-Free', icon: '🥛' },
  { id: 'nut-allergy', name: 'Nut Allergy', icon: '🥜' },
  { id: 'seafood-allergy', name: 'Seafood Allergy', icon: '🐟' }
]

const commonAllergies = [
  { id: 'peanuts', name: 'Peanuts', icon: '🥜' },
  { id: 'tree-nuts', name: 'Tree Nuts', icon: '🌰' },
  { id: 'shellfish', name: 'Shellfish', icon: '🦐' },
  { id: 'fish', name: 'Fish', icon: '🐟' },
  { id: 'eggs', name: 'Eggs', icon: '🥚' },
  { id: 'milk', name: 'Milk/Dairy', icon: '🥛' },
  { id: 'soy', name: 'Soy', icon: '🫘' },
  { id: 'wheat', name: 'Wheat', icon: '🌾' },
  { id: 'sesame', name: 'Sesame', icon: '🌰' },
  { id: 'sulfites', name: 'Sulfites', icon: '🍷' }
]

const medicalConditions = [
  { id: 'diabetes', name: 'Diabetes', icon: '🩺' },
  { id: 'hypertension', name: 'Hypertension', icon: '❤️' },
  { id: 'asthma', name: 'Asthma', icon: '🫁' },
  { id: 'heart-condition', name: 'Heart Condition', icon: '❤️‍🩹' },
  { id: 'epilepsy', name: 'Epilepsy', icon: '🧠' },
  { id: 'arthritis', name: 'Arthritis', icon: '🦴' },
  { id: 'back-problems', name: 'Back Problems', icon: '🦴' },
  { id: 'knee-problems', name: 'Knee Problems', icon: '🦵' }
]

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']

// International origin cities (can start from anywhere)
export const internationalOrigins = [
  { id: 'delhi', name: 'Delhi, India', country: 'India', icon: '🇮🇳' },
  { id: 'mumbai', name: 'Mumbai, India', country: 'India', icon: '🇮🇳' },
  { id: 'chennai', name: 'Chennai, India', country: 'India', icon: '🇮🇳' },
  { id: 'bangalore', name: 'Bangalore, India', country: 'India', icon: '🇮🇳' },
  { id: 'kolkata', name: 'Kolkata, India', country: 'India', icon: '🇮🇳' },
  { id: 'hyderabad', name: 'Hyderabad, India', country: 'India', icon: '🇮🇳' },
  { id: 'dubai', name: 'Dubai, UAE', country: 'UAE', icon: '🇦🇪' },
  { id: 'abu-dhabi', name: 'Abu Dhabi, UAE', country: 'UAE', icon: '🇦🇪' },
  { id: 'doha', name: 'Doha, Qatar', country: 'Qatar', icon: '🇶🇦' },
  { id: 'kuala-lumpur', name: 'Kuala Lumpur, Malaysia', country: 'Malaysia', icon: '🇲🇾' },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', icon: '🇸🇬' },
  { id: 'bangkok', name: 'Bangkok, Thailand', country: 'Thailand', icon: '🇹🇭' },
  { id: 'london', name: 'London, UK', country: 'UK', icon: '🇬🇧' },
  { id: 'paris', name: 'Paris, France', country: 'France', icon: '🇫🇷' },
  { id: 'frankfurt', name: 'Frankfurt, Germany', country: 'Germany', icon: '🇩🇪' },
  { id: 'new-york', name: 'New York, USA', country: 'USA', icon: '🇺🇸' },
  { id: 'los-angeles', name: 'Los Angeles, USA', country: 'USA', icon: '🇺🇸' },
  { id: 'sydney', name: 'Sydney, Australia', country: 'Australia', icon: '🇦🇺' },
  { id: 'melbourne', name: 'Melbourne, Australia', country: 'Australia', icon: '🇦🇺' },
  { id: 'tokyo', name: 'Tokyo, Japan', country: 'Japan', icon: '🇯🇵' },
  { id: 'seoul', name: 'Seoul, South Korea', country: 'South Korea', icon: '🇰🇷' },
  { id: 'hong-kong', name: 'Hong Kong', country: 'Hong Kong', icon: '🇭🇰' },
  { id: 'beijing', name: 'Beijing, China', country: 'China', icon: '🇨🇳' },
  { id: 'shanghai', name: 'Shanghai, China', country: 'China', icon: '🇨🇳' },
  { id: 'istanbul', name: 'Istanbul, Turkey', country: 'Turkey', icon: '🇹🇷' },
  { id: 'cairo', name: 'Cairo, Egypt', country: 'Egypt', icon: '🇪🇬' },
  { id: 'johannesburg', name: 'Johannesburg, South Africa', country: 'South Africa', icon: '🇿🇦' },
  { id: 'nairobi', name: 'Nairobi, Kenya', country: 'Kenya', icon: '🇰🇪' }
]

// Expanded Sri Lankan locations (25+ famous destinations)
export const sriLankanLocations = [
  { id: 'colombo', name: 'Colombo', description: 'Capital city, commercial hub', icon: '🏙️' },
  { id: 'kandy', name: 'Kandy', description: 'Sacred city, cultural heart', icon: '🕌' },
  { id: 'galle', name: 'Galle', description: 'Historic fort, coastal beauty', icon: '🏰' },
  { id: 'sigiriya', name: 'Sigiriya', description: 'Ancient rock fortress', icon: '🗿' },
  { id: 'anuradhapura', name: 'Anuradhapura', description: 'Ancient capital, sacred city', icon: '🛕' },
  { id: 'polonnaruwa', name: 'Polonnaruwa', description: 'Medieval capital, ruins', icon: '🏛️' },
  { id: 'nuwara-eliya', name: 'Nuwara Eliya', description: 'Tea country, hill station', icon: '🍃' },
  { id: 'ella', name: 'Ella', description: 'Mountain views, hiking', icon: '⛰️' },
  { id: 'bentota', name: 'Bentota', description: 'Beach resort, water sports', icon: '🏖️' },
  { id: 'mirissa', name: 'Mirissa', description: 'Whale watching, beaches', icon: '🐋' },
  { id: 'yala', name: 'Yala', description: 'National park, wildlife', icon: '🦁' },
  { id: 'trincomalee', name: 'Trincomalee', description: 'Beaches, diving', icon: '🤿' },
  { id: 'jaffna', name: 'Jaffna', description: 'Northern capital, culture', icon: '🏛️' },
  { id: 'negombo', name: 'Negombo', description: 'Beach town, fishing', icon: '🐟' },
  { id: 'dambulla', name: 'Dambulla', description: 'Cave temple, golden', icon: '🕉️' },
  { id: 'ratnapura', name: 'Ratnapura', description: 'Gem city, Sinharaja', icon: '💎' },
  { id: 'unawatuna', name: 'Unawatuna', description: 'Beautiful beach, diving', icon: '🏖️' },
  { id: 'hikkaduwa', name: 'Hikkaduwa', description: 'Coral reef, surfing', icon: '🏄' },
  { id: 'udawalawe', name: 'Udawalawe', description: 'Elephant sanctuary', icon: '🐘' },
  { id: 'wilpattu', name: 'Wilpattu', description: 'National park, leopards', icon: '🐆' },
  { id: 'minneriya', name: 'Minneriya', description: 'Elephant gathering', icon: '🐘' },
  { id: 'adam-peak', name: 'Adam\'s Peak', description: 'Sacred mountain, sunrise', icon: '⛰️' },
  { id: 'horton-plains', name: 'Horton Plains', description: 'World\'s end, nature', icon: '🌲' },
  { id: 'sinharaja', name: 'Sinharaja', description: 'Rainforest, biodiversity', icon: '🌿' },
  { id: 'pasikudah', name: 'Pasikudah', description: 'Calm beaches, swimming', icon: '🏖️' },
  { id: 'arugam-bay', name: 'Arugam Bay', description: 'Surfing paradise', icon: '🏄' },
  { id: 'kalpitiya', name: 'Kalpitiya', description: 'Dolphin watching, kitesurfing', icon: '🐬' },
  { id: 'tissamaharama', name: 'Tissamaharama', description: 'Ancient stupa, wildlife', icon: '🛕' },
  { id: 'badulla', name: 'Badulla', description: 'Hill country, waterfalls', icon: '💧' },
  { id: 'matale', name: 'Matale', description: 'Spice gardens, temples', icon: '🌶️' },
  { id: 'kurunegala', name: 'Kurunegala', description: 'Ancient kingdom, lakes', icon: '🏞️' },
  { id: 'anuradhapura-new', name: 'Anuradhapura New Town', description: 'Modern city, heritage', icon: '🏙️' },
  { id: 'batticaloa', name: 'Batticaloa', description: 'Eastern coast, lagoons', icon: '🌊' },
  { id: 'kalutara', name: 'Kalutara', description: 'Beach town, temple', icon: '🏖️' },
  { id: 'weligama', name: 'Weligama', description: 'Fishing village, stilt fishing', icon: '🎣' }
]

export const getLocationName = (locationId: string): string => {
  const sriLankanLocation = sriLankanLocations.find(loc => loc.id === locationId)
  if (sriLankanLocation) return sriLankanLocation.name
  
  const internationalLocation = internationalOrigins.find(loc => loc.id === locationId)
  if (internationalLocation) return internationalLocation.name
  
  return locationId
}

const steps = [
  { id: 1, title: 'Preferences', description: 'Tell us about your trip' },
  { id: 2, title: 'Itinerary', description: 'AI-generated plan' },
  { id: 3, title: 'Transport', description: 'Flights & transfers' },
  { id: 4, title: 'Hotels', description: 'Accommodation' },
  { id: 5, title: 'Tours', description: 'Experiences' },
  { id: 6, title: 'Summary', description: 'Review & book' }
]

// Searchable Location Select Component
interface LocationOption {
  id: string
  name: string
  description?: string
  country?: string
  icon: string
}

interface SearchableLocationSelectProps {
  value: string
  onChange: (locationId: string) => void
  options: LocationOption[]
  placeholder: string
  label: string
  required?: boolean
}

const SearchableLocationSelect = ({
  value,
  onChange,
  options,
  placeholder,
  label,
  required = false
}: SearchableLocationSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selectedLocation = options.find(opt => opt.id === value)

  // Filter options based on search query - if empty, show all options
  const filteredOptions = searchQuery.trim() === '' 
    ? options 
    : options.filter(option => {
        const query = searchQuery.toLowerCase()
        return (
          option.name.toLowerCase().includes(query) ||
          option.description?.toLowerCase().includes(query) ||
          option.country?.toLowerCase().includes(query)
        )
      })

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (locationId: string) => {
    onChange(locationId)
    setIsOpen(false)
    setSearchQuery('')
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange('')
    setSearchQuery('')
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div
          className={`w-full bg-white border-2 rounded-lg cursor-pointer transition-all ${
            isOpen ? 'border-primary ring-2 ring-primary/20' : 'border-neutral-light-300 hover:border-primary/50'
          } ${value ? 'border-primary/50' : ''}`}
          onClick={() => {
            setIsOpen(true)
            setTimeout(() => inputRef.current?.focus(), 0)
          }}
        >
          {!isOpen && selectedLocation ? (
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-xl">{selectedLocation.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-dark-200 truncate">{selectedLocation.name}</p>
                  {selectedLocation.description && (
                    <p className="text-xs text-neutral-dark-100 truncate">{selectedLocation.description}</p>
                  )}
                  {selectedLocation.country && (
                    <p className="text-xs text-neutral-dark-100 truncate">{selectedLocation.country}</p>
                  )}
                </div>
              </div>
              <button
                onClick={handleClear}
                className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                type="button"
              >
                <X className="h-4 w-4 text-neutral-dark-100" />
              </button>
            </div>
          ) : (
            <div className="px-4 py-3 flex items-center gap-3">
              <Search className="h-5 w-5 text-neutral-dark-100 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onFocus={(e) => {
                  e.stopPropagation()
                  setIsOpen(true)
                }}
                placeholder={placeholder}
                className="flex-1 outline-none text-neutral-dark-200 placeholder-neutral-dark-100 bg-transparent"
              />
              {searchQuery && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSearchQuery('')
                    inputRef.current?.focus()
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                  type="button"
                >
                  <X className="h-4 w-4 text-neutral-dark-100" />
                </button>
              )}
            </div>
          )}
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border-2 border-neutral-light-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              <div className="py-2">
                {searchQuery.trim() === '' && (
                  <div className="px-4 py-2 border-b border-neutral-light-200">
                    {/* <p className="text-xs font-medium text-neutral-dark-100"> */}
                      {/* {options.length} {options.length === 1 ? 'location' : 'locations'} available */}
                    {/* </p> */}
                  </div>
                )}
                {filteredOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-primary/5 transition-colors ${
                      value === option.id ? 'bg-primary/10 border-l-4 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl flex-shrink-0">{option.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-neutral-dark-200">{option.name}</p>
                        {option.description && (
                          <p className="text-xs text-neutral-dark-100 mt-0.5">{option.description}</p>
                        )}
                        {option.country && (
                          <p className="text-xs text-neutral-dark-100 mt-0.5">{option.country}</p>
                        )}
                      </div>
                      {value === option.id && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <Search className="h-8 w-8 mx-auto mb-2 text-neutral-light-200" />
                <p className="text-sm text-neutral-dark-100">No locations found</p>
                <p className="text-xs text-neutral-dark-100 mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function TripPlannerPreferencesPage() {
  const navigate = useNavigate()
  const { setField, setCurrentStep } = useBookingStore()
  
  const [formData, setFormData] = useState({
    travelType: '',
    budget: '',
    interests: [] as string[],
    travelers: 1,
    startDate: '',
    endDate: '',
    origin: '',
    destination: '',
    specialRequirements: '',
    medicalInfo: {
      dietaryPreferences: [] as string[],
      allergies: [] as string[],
      medicalConditions: [] as string[],
      medications: [] as string[],
      motionSickness: false,
      mobilityAssistance: false,
      emergencyContact: {
        name: '',
        phone: '',
        relationship: ''
      },
      insuranceProvider: '',
      bloodType: '',
      specialMedicalNeeds: ''
    }
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }))
  }

  const handleMedicalToggle = (category: string, itemId: string) => {
    setFormData(prev => {
      const currentArray = prev.medicalInfo[category as keyof typeof prev.medicalInfo] as string[]
      const isSelected = Array.isArray(currentArray) && currentArray.includes(itemId)
      
      return {
        ...prev,
        medicalInfo: {
          ...prev.medicalInfo,
          [category]: isSelected
            ? currentArray.filter(id => id !== itemId)
            : [...currentArray, itemId]
        }
      }
    })
  }

  const handleMedicalInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      medicalInfo: {
        ...prev.medicalInfo,
        [field]: value
      }
    }))
  }

  const handleEmergencyContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      medicalInfo: {
        ...prev.medicalInfo,
        emergencyContact: {
          ...prev.medicalInfo.emergencyContact,
          [field]: value
        }
      }
    }))
  }

  const handleNext = () => {
    setField('preferences', formData)
    setCurrentStep(2)
    navigate('/trip-planner/itinerary')
  }

  const isFormValid = formData.travelType && 
    formData.budget && 
    formData.startDate && 
    formData.endDate &&
    formData.origin &&
    formData.destination &&
    formData.medicalInfo.emergencyContact.name &&
    formData.medicalInfo.emergencyContact.phone &&
    formData.medicalInfo.emergencyContact.relationship

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8 ">
        {/* Progress Stepper */}
        <div className="mb-8">
          <Stepper currentStep={1} totalSteps={6} steps={steps} />
        </div>

        <Card className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-dark-200 mb-4">
              Tell Us About Your Trip
            </h1>
            <p className="text-lg text-neutral-dark-100">
              Help us create the perfect Sri Lankan experience for you
            </p>
          </div>

          {/* Travel Type */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-dark-200 mb-4">
              What type of trip interests you most?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {travelTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.travelType === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                  onClick={() => handleInputChange('travelType', type.id)}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <h3 className="font-semibold text-neutral-dark-200 mb-1">{type.name}</h3>
                  <p className="text-sm text-neutral-dark-100">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-dark-200 mb-4">
              What's your budget range?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {budgetRanges.map((budget) => (
                <div
                  key={budget.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.budget === budget.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                  onClick={() => handleInputChange('budget', budget.id)}
                >
                  <h3 className="font-semibold text-neutral-dark-200 mb-1">{budget.name}</h3>
                  <p className="text-primary font-medium mb-2">{budget.range}</p>
                  <p className="text-sm text-neutral-dark-100">{budget.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Route - Origin & Destination */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Navigation className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-xl font-semibold text-neutral-dark-200">
                Where would you like to travel?
              </h2>
            </div>
            <p className="text-neutral-dark-100 mb-6">
              Start your journey from anywhere in the world and explore beautiful destinations in Sri Lanka
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SearchableLocationSelect
                value={formData.origin}
                onChange={(locationId) => handleInputChange('origin', locationId)}
                options={[
                  ...internationalOrigins.map(loc => ({
                    id: loc.id,
                    name: loc.name,
                    country: loc.country,
                    icon: loc.icon
                  })),
                  ...sriLankanLocations.map(loc => ({
                    id: loc.id,
                    name: loc.name,
                    description: loc.description,
                    icon: loc.icon
                  }))
                ]}
                placeholder="Search for your starting point"
                label="Starting Point (Origin)"
                required
              />
              <SearchableLocationSelect
                value={formData.destination}
                onChange={(locationId) => handleInputChange('destination', locationId)}
                options={sriLankanLocations.map(loc => ({
                  id: loc.id,
                  name: loc.name,
                  description: loc.description,
                  icon: loc.icon
                }))}
                placeholder="Search for your destination in Sri Lanka..."
                label="Destination in Sri Lanka"
                required
              />
            </div>
          </div>

          {/* Travel Dates & Group Size */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full bg-white [color-scheme:light] text-black px-3 py-2  border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                End Date *
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="w-full bg-white [color-scheme:light] px-3 py-2 text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                Number of Travelers *
              </label>
              <select
                value={formData.travelers}
                onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
                className="w-full bg-white px-3 py-2 text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Interests */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-dark-200 mb-4">
              What interests you most? (Select all that apply)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interests.map((interest) => (
                <div
                  key={interest.id}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                    formData.interests.includes(interest.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                  onClick={() => handleInterestToggle(interest.id)}
                >
                  <div className="text-xl mb-1">{interest.icon}</div>
                  <p className="text-sm font-medium text-neutral-dark-200">{interest.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Information Section */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold text-neutral-dark-200">
                Medical Information & Safety
              </h2>
            </div>
            <p className="text-neutral-dark-100 mb-6">
              This information helps us ensure your safety and provide appropriate accommodations during your trip.
            </p>

            {/* Dietary Preferences */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-neutral-dark-200 mb-4">
                Dietary Preferences & Restrictions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {dietaryOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                      formData.medicalInfo.dietaryPreferences.includes(option.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => handleMedicalToggle('dietaryPreferences', option.id)}
                  >
                    <div className="text-xl mb-1">{option.icon}</div>
                    <p className="text-sm font-medium text-neutral-dark-200">{option.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-neutral-dark-200 mb-4">
                Food Allergies
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {commonAllergies.map((allergy) => (
                  <div
                    key={allergy.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                      formData.medicalInfo.allergies.includes(allergy.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => handleMedicalToggle('allergies', allergy.id)}
                  >
                    <div className="text-xl mb-1">{allergy.icon}</div>
                    <p className="text-sm font-medium text-neutral-dark-200">{allergy.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Conditions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-neutral-dark-200 mb-4">
                Medical Conditions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {medicalConditions.map((condition) => (
                  <div
                    key={condition.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                      formData.medicalInfo.medicalConditions.includes(condition.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => handleMedicalToggle('medicalConditions', condition.id)}
                  >
                    <div className="text-xl mb-1">{condition.icon}</div>
                    <p className="text-sm font-medium text-neutral-dark-200">{condition.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Motion Sickness & Mobility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-neutral-dark-200 mb-4">
                  Travel Considerations
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.medicalInfo.motionSickness}
                      onChange={(e) => handleMedicalInputChange('motionSickness', e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="ml-3 text-neutral-dark-200">Motion Sickness</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.medicalInfo.mobilityAssistance}
                      onChange={(e) => handleMedicalInputChange('mobilityAssistance', e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="ml-3 text-neutral-dark-200">Mobility Assistance Required</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-dark-200 mb-4">
                  Emergency Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                      Blood Type
                    </label>
                    <select
                      value={formData.medicalInfo.bloodType}
                      onChange={(e) => handleMedicalInputChange('bloodType', e.target.value)}
                      className="w-full bg-white px-3 py-2 text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select Blood Type</option>
                      {bloodTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                      Insurance Provider
                    </label>
                    <input
                      type="text"
                      value={formData.medicalInfo.insuranceProvider}
                      onChange={(e) => handleMedicalInputChange('insuranceProvider', e.target.value)}
                      className="w-full bg-white px-3 py-2 text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., Blue Cross, Aetna"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-neutral-dark-200 mb-4">
                Emergency Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    value={formData.medicalInfo.emergencyContact.name}
                    onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                    className="w-full bg-white px-3 py-2 text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.medicalInfo.emergencyContact.phone}
                    onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                    className="w-full bg-white px-3 py-2 text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                    Relationship *
                  </label>
                  <select
                    value={formData.medicalInfo.emergencyContact.relationship}
                    onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                    className="w-full bg-white px-3 py-2 text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select Relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="child">Child</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Medications & Special Needs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                  Current Medications
                </label>
                <textarea
                  value={formData.medicalInfo.medications.join(', ')}
                  onChange={(e) => handleMedicalInputChange('medications', e.target.value.split(', ').filter(m => m.trim()))}
                  rows={3}
                  className="w-full bg-white px-3 py-2 text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="List any medications you're currently taking (separated by commas)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                  Special Medical Needs
                </label>
                <textarea
                  value={formData.medicalInfo.specialMedicalNeeds}
                  onChange={(e) => handleMedicalInputChange('specialMedicalNeeds', e.target.value)}
                  rows={3}
                  className="w-full bg-white px-3 py-2 text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Any special medical equipment, treatments, or needs during travel"
                />
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Privacy & Security</h4>
                  <p className="text-blue-700 text-sm">
                    Your medical information is encrypted and stored securely. It will only be shared with 
                    relevant service providers (hotels, tour operators) to ensure your safety and comfort. 
                    This information is never sold or used for marketing purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
              Additional Special Requirements or Requests
            </label>
            <textarea
              value={formData.specialRequirements}
              onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
              rows={3}
              className="w-full bg-white px-3 py-2 text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Any other special requirements, accessibility needs, or requests..."
            />
          </div>

          {/* Navigation */}
          <NextButton
            onClick={handleNext}
            disabled={!isFormValid}
            nextText="Generate My Itinerary"
            showPrevious={false}
            className="mt-8"
          />
        </Card>
      </div>

      <Footer />
    </div>
  )
}
