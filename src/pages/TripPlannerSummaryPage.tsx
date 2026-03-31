import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import Stepper from '../components/tripPlanner/Stepper'
import NextButton from '../components/tripPlanner/NextButton'
import { useBookingStore } from '../store/bookingStore'
import { Calendar, Users, MapPin, DollarSign, CheckCircle, Edit3, Shield, AlertTriangle, Phone, User, Navigation } from 'lucide-react'
import { getLocationName } from './TripPlannerPreferencesPage'

const steps = [
  { id: 1, title: 'Preferences', description: 'Tell us about your trip' },
  { id: 2, title: 'Itinerary', description: 'AI-generated plan' },
  { id: 3, title: 'Transport', description: 'Flights & transfers' },
  { id: 4, title: 'Hotels', description: 'Accommodation' },
  { id: 5, title: 'Tours', description: 'Experiences' },
  { id: 6, title: 'Summary', description: 'Review & book' }
]

export default function TripPlannerSummaryPage() {
  const navigate = useNavigate()
  const { 
    preferences, 
    itinerary, 
    transport, 
    hotels, 
    tours, 
    setField, 
    setCurrentStep,
    getTotalCost 
  } = useBookingStore()
  
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // If no preferences, itinerary, transport, hotels, or tours, redirect back
    if (!preferences || !itinerary || !transport || !hotels || !tours) {
      navigate('/trip-planner/preferences')
      return
    }
  }, [preferences, itinerary, transport, hotels, tours, navigate])

  const handleNext = () => {
    setIsProcessing(true)
    
    // Simulate processing time
    setTimeout(() => {
      setCurrentStep(7)
      navigate('/trip-planner/confirmation')
    }, 2000)
  }

  const handlePrevious = () => {
    setCurrentStep(5)
    navigate('/trip-planner/tours')
  }

  const handleEdit = (step: number) => {
    setCurrentStep(step)
    const routes = ['/trip-planner/preferences', '/trip-planner/itinerary', '/trip-planner/transport', '/trip-planner/hotels', '/trip-planner/tours']
    navigate(routes[step - 1])
  }

  const totalCost = getTotalCost()
  const taxes = totalCost * 0.1 // 10% tax
  const finalTotal = totalCost + taxes

  const transportCost = transport?.reduce((sum, item) => sum + item.price, 0) || 0
  const hotelCost = hotels?.reduce((sum, item) => sum + item.price, 0) || 0
  const tourCost = tours?.reduce((sum, item) => sum + item.price, 0) || 0

  if (!preferences || !itinerary || !transport || !hotels || !tours) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-light-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Stepper */}
        <div className="mb-8">
          <Stepper currentStep={6} totalSteps={6} steps={steps} />
        </div>

        <Card className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-dark-200 mb-4">
              Review Your Trip
            </h1>
            <p className="text-lg text-neutral-dark-100">
              Please review all details before confirming your booking
            </p>
          </div>

          {/* Trip Overview */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-neutral-dark-200 mb-4">Trip Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-lg font-bold text-neutral-dark-200">
                 {new Date(preferences?.startDate).toLocaleDateString("en-GB")} -
                 {new Date(preferences?.endDate).toLocaleDateString("en-GB")}
                </p>
                <p className="text-sm text-neutral-dark-100">Travel Dates</p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-lg font-bold text-neutral-dark-200">{preferences?.travelers}</p>
                <p className="text-sm text-neutral-dark-100">Travelers</p>
              </div>
              <div className="text-center">
                <Navigation className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-semibold text-neutral-dark-200">
                  {preferences?.origin ? getLocationName(preferences.origin) : 'Not set'}
                </p>
                <p className="text-xs text-neutral-dark-100">→</p>
                <p className="text-sm font-semibold text-neutral-dark-200">
                  {preferences?.destination ? getLocationName(preferences.destination) : 'Not set'}
                </p>
                <p className="text-sm text-neutral-dark-100">Route</p>
              </div>
              <div className="text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-lg font-bold text-neutral-dark-200">{itinerary?.length || 0}</p>
                <p className="text-sm text-neutral-dark-100">Destinations</p>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="space-y-6 mb-8">
            {/* Itinerary */}
            <div className="border border-neutral-light-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-dark-200">Itinerary</h3>
                <button 
                  onClick={() => handleEdit(2)}
                  className="text-primary hover:text-primary/80 flex items-center text-sm"
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit
                </button>
              </div>
              <div className="space-y-2">
                {itinerary?.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <span className="text-neutral-dark-200">Day {item.day}: {item.activity}</span>
                    <span className="text-primary font-medium">${item.cost}</span>
                  </div>
                ))}
                {itinerary && itinerary.length > 3 && (
                  <div className="text-sm text-neutral-dark-100">
                    +{itinerary.length - 3} more activities
                  </div>
                )}
              </div>
            </div>

            {/* Transport */}
            <div className="border border-neutral-light-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-dark-200">Transport</h3>
                <button 
                  onClick={() => handleEdit(3)}
                  className="text-primary hover:text-primary/80 flex items-center text-sm"
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit
                </button>
              </div>
              <div className="space-y-2">
                {transport?.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <span className="text-neutral-dark-200">{item.name}</span>
                    <span className="text-primary font-medium">${item.price}</span>
                  </div>
                ))}
                <div className="border-t border-neutral-light-200 pt-2 mt-2">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-neutral-dark-200">Transport Total:</span>
                    <span className="text-primary">${transportCost}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotels */}
            <div className="border border-neutral-light-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-dark-200">Accommodation</h3>
                <button 
                  onClick={() => handleEdit(4)}
                  className="text-primary hover:text-primary/80 flex items-center text-sm"
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit
                </button>
              </div>
              <div className="space-y-2">
                {hotels?.map((hotel) => (
                  <div key={hotel.id} className="flex items-center justify-between">
                    <span className="text-neutral-dark-200">{hotel.name}</span>
                    <span className="text-primary font-medium">${hotel.price}/night</span>
                  </div>
                ))}
                <div className="border-t border-neutral-light-200 pt-2 mt-2">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-neutral-dark-200">Hotels Total:</span>
                    <span className="text-primary">${hotelCost}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tours */}
            <div className="border border-neutral-light-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-dark-200">Tours & Experiences</h3>
                <button 
                  onClick={() => handleEdit(5)}
                  className="text-primary hover:text-primary/80 flex items-center text-sm"
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit
                </button>
              </div>
              <div className="space-y-2">
                {tours?.map((tour) => (
                  <div key={tour.id} className="flex items-center justify-between">
                    <span className="text-neutral-dark-200">{tour.name}</span>
                    <span className="text-primary font-medium">${tour.price}</span>
                  </div>
                ))}
                <div className="border-t border-neutral-light-200 pt-2 mt-2">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-neutral-dark-200">Tours Total:</span>
                    <span className="text-primary">${tourCost}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            {preferences?.medicalInfo && (
              <div className="border border-neutral-light-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-semibold text-neutral-dark-200">Medical Information</h3>
                  </div>
                  <button 
                    onClick={() => handleEdit(1)}
                    className="text-primary hover:text-primary/80 flex items-center text-sm"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dietary & Allergies */}
                  <div>
                    <h4 className="font-medium text-neutral-dark-200 mb-3">Dietary & Allergies</h4>
                    <div className="space-y-2">
                      {preferences.medicalInfo.dietaryPreferences.length > 0 && (
                        <div>
                          <span className="text-sm text-neutral-dark-100">Dietary: </span>
                          <span className="text-sm text-neutral-dark-200">
                            {preferences.medicalInfo.dietaryPreferences.join(', ')}
                          </span>
                        </div>
                      )}
                      {preferences.medicalInfo.allergies.length > 0 && (
                        <div>
                          <span className="text-sm text-neutral-dark-100">Allergies: </span>
                          <span className="text-sm text-red-600">
                            {preferences.medicalInfo.allergies.join(', ')}
                          </span>
                        </div>
                      )}
                      {preferences.medicalInfo.medicalConditions.length > 0 && (
                        <div>
                          <span className="text-sm text-neutral-dark-100">Conditions: </span>
                          <span className="text-sm text-orange-600">
                            {preferences.medicalInfo.medicalConditions.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <h4 className="font-medium text-neutral-dark-200 mb-3">Emergency Contact</h4>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-neutral-dark-100 mr-2" />
                        <span className="text-sm text-neutral-dark-200">
                          {preferences.medicalInfo.emergencyContact.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-neutral-dark-100 mr-2" />
                        <span className="text-sm text-neutral-dark-200">
                          {preferences.medicalInfo.emergencyContact.phone}
                        </span>
                      </div>
                      <div className="text-sm text-neutral-dark-100">
                        {preferences.medicalInfo.emergencyContact.relationship}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Considerations */}
                <div className="mt-4 pt-4 border-t border-neutral-light-200">
                  <div className="flex flex-wrap gap-4">
                    {preferences.medicalInfo.motionSickness && (
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                        Motion Sickness
                      </span>
                    )}
                    {preferences.medicalInfo.mobilityAssistance && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        Mobility Assistance
                      </span>
                    )}
                    {preferences.medicalInfo.bloodType && (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                        Blood Type: {preferences.medicalInfo.bloodType}
                      </span>
                    )}
                    {preferences.medicalInfo.insuranceProvider && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        Insurance: {preferences.medicalInfo.insuranceProvider}
                      </span>
                    )}
                  </div>
                </div>

                {/* Special Medical Needs */}
                {preferences.medicalInfo.specialMedicalNeeds && (
                  <div className="mt-4 pt-4 border-t border-neutral-light-200">
                    <h4 className="font-medium text-neutral-dark-200 mb-2">Special Medical Needs</h4>
                    <p className="text-sm text-neutral-dark-100">{preferences.medicalInfo.specialMedicalNeeds}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cost Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-neutral-dark-200 mb-4">Cost Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral-dark-200">Transport:</span>
                <span className="text-neutral-dark-200">${transportCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-dark-200">Hotels:</span>
                <span className="text-neutral-dark-200">${hotelCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-dark-200">Tours:</span>
                <span className="text-neutral-dark-200">${tourCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-dark-200">Subtotal:</span>
                <span className="text-neutral-dark-200">${totalCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-dark-200">Taxes & Fees (10%):</span>
                <span className="text-neutral-dark-200">${taxes.toFixed(2)}</span>
              </div>
              <div className="border-t border-neutral-light-300 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-neutral-dark-200">Total Cost:</span>
                  <span className="text-primary">${finalTotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-neutral-dark-100 mt-1">
                  for {preferences?.travelers} {preferences?.travelers === 1 ? 'person' : 'people'}
                </p>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Booking Terms</h3>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• All bookings are subject to availability</li>
                  <li>• Cancellation policy: 48 hours notice required</li>
                  <li>• Government-verified services with quality guarantee</li>
                  <li>• 24/7 customer support during your trip</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <NextButton
            onClick={handleNext}
            onPrevious={handlePrevious}
            loading={isProcessing}
            disabled={isProcessing}
            nextText={isProcessing ? "Processing..." : "Confirm Booking"}
            previousText="Back to Tours"
            isLastStep={true}
            className="mt-8"
          />
        </Card>
      </div>

      <Footer />
    </div>
  )
}

