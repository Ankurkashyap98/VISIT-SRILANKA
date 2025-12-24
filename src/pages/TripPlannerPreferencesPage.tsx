import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import Stepper from '../components/tripPlanner/Stepper'
import NextButton from '../components/tripPlanner/NextButton'
import { useBookingStore } from '../store/bookingStore'
import { Calendar, Users, DollarSign, Heart, MapPin, Clock, Shield, AlertTriangle, Phone, User } from 'lucide-react'

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

const steps = [
  { id: 1, title: 'Preferences', description: 'Tell us about your trip' },
  { id: 2, title: 'Itinerary', description: 'AI-generated plan' },
  { id: 3, title: 'Transport', description: 'Flights & transfers' },
  { id: 4, title: 'Hotels', description: 'Accommodation' },
  { id: 5, title: 'Tours', description: 'Experiences' },
  { id: 6, title: 'Summary', description: 'Review & book' }
]

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
    formData.medicalInfo.emergencyContact.name &&
    formData.medicalInfo.emergencyContact.phone &&
    formData.medicalInfo.emergencyContact.relationship

  return (
    <div className="min-h-screen bg-neutral-light-50">
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
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200 hover:border-red-200'
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
                        ? 'border-orange-300 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-200'
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
