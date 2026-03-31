import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import Stepper from '../components/tripPlanner/Stepper'
import { useBookingStore, TransportOption } from '../store/bookingStore'
import { Plane, Train, Bus, Car, ArrowRight, ArrowLeft, CheckCircle, Clock, MapPin, DollarSign } from 'lucide-react'
import { getLocationName } from './TripPlannerPreferencesPage'

const steps = [
  { id: 1, title: 'Preferences', description: 'Set your travel preferences' },
  { id: 2, title: 'Itinerary', description: 'Review your itinerary' },
  { id: 3, title: 'Transport', description: 'Choose transport', active: true },
  { id: 4, title: 'Hotels', description: 'Select hotels' },
  { id: 5, title: 'Tours', description: 'Book tours' },
  { id: 6, title: 'Summary', description: 'Review & book' }
]

export default function TripPlannerTransportPage() {
  const navigate = useNavigate()
  const { preferences, itinerary, setField, setCurrentStep } = useBookingStore()
  const [selectedTransport, setSelectedTransport] = useState<TransportOption[]>([])
  const [availableOptions, setAvailableOptions] = useState<TransportOption[]>([])

  useEffect(() => {
    // If no preferences or itinerary, redirect back
    if (!preferences || !itinerary) {
      navigate('/trip-planner/preferences')
      return
    }

    // Generate transport options based on preferences
    generateTransportOptions()
  }, [preferences, itinerary])

  const generateTransportOptions = () => {
    if (!preferences) return

    const originName = getLocationName(preferences.origin)
    const destinationName = getLocationName(preferences.destination)

    // Generate sample transport options based on selected origin and destination
    const options: TransportOption[] = [
      {
        id: 'flight-1',
        type: 'flight',
        name: 'International Flight',
        from: originName,
        to: destinationName,
        departure: preferences.startDate,
        arrival: preferences.endDate,
        price: 800,
        duration: '8-12 hours',
        provider: 'SriLankan Airlines'
      },
      {
        id: 'airport-transfer',
        type: 'car',
        name: 'Airport Transfer',
        from: originName,
        to: destinationName,
        departure: preferences.startDate,
        arrival: preferences.startDate,
        price: 50,
        duration: '1 hour',
        provider: 'Premium Taxi Service'
      },
      {
        id: 'route-transport',
        type: preferences.origin === 'colombo' ? 'train' : 'bus',
        name: preferences.origin === 'colombo' ? 'Scenic Train Journey' : 'Intercity Bus',
        from: originName,
        to: destinationName,
        departure: preferences.startDate,
        arrival: preferences.startDate,
        price: preferences.origin === 'colombo' ? 15 : 12,
        duration: preferences.origin === 'colombo' ? '3 hours' : '4 hours',
        provider: preferences.origin === 'colombo' ? 'Sri Lanka Railways' : 'CTB Express'
      },
      {
        id: 'car-rental',
        type: 'car',
        name: 'Car Rental',
        from: originName,
        to: destinationName,
        departure: preferences.startDate,
        arrival: preferences.endDate,
        price: 200,
        duration: 'Full trip',
        provider: 'Budget Car Rental'
      },
      {
        id: 'private-transfer',
        type: 'car',
        name: 'Private Transfer Service',
        from: originName,
        to: destinationName,
        departure: preferences.startDate,
        arrival: preferences.startDate,
        price: 80,
        duration: '2-4 hours',
        provider: 'Premium Transport Services'
      }
    ]

    setAvailableOptions(options)
  }

  const toggleTransport = (option: TransportOption) => {
    setSelectedTransport(prev => {
      const exists = prev.find(t => t.id === option.id)
      if (exists) {
        return prev.filter(t => t.id !== option.id)
      } else {
        return [...prev, option]
      }
    })
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return Plane
      case 'train':
        return Train
      case 'bus':
        return Bus
      case 'car':
        return Car
      default:
        return Car
    }
  }

  const handleContinue = () => {
    if (selectedTransport.length > 0) {
      setField('transport', selectedTransport)
      setCurrentStep(4)
      navigate('/trip-planner/hotels')
    }
  }

  const handleBack = () => {
    navigate('/trip-planner/itinerary')
  }

  if (!preferences || !itinerary) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-light-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Stepper */}
        <Stepper
  steps={steps}
  currentStep={3}
  totalSteps={steps.length}
/>


        {/* Header */}
        <div className="text-center mb-8 mt-8">
          <h1 className="text-3xl text-white font-bold text-neutral mb-2">
            Choose Your Transport
          </h1>
          <p className="text-neutral text-white">
            Select transportation options for your Sri Lankan adventure
          </p>
        </div>

        {/* Transport Options */}
        <div className="space-y-4 mb-8">
          {availableOptions.map((option) => {
            const Icon = getIcon(option.type)
            const isSelected = selectedTransport.some(t => t.id === option.id)
            
            return (
              <Card 
                key={option.id} 
                className={`cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-primary border-2 border-primary bg-green-50' : 'hover:shadow-md'
                }`}
                onClick={() => toggleTransport(option)}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}  
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-primary text-white' : 'bg-neutral-light-100 text-neutral-dark-200'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-dark-200 mb-1">
                          {option.name}
                        </h3>
                        <p className="text-sm text-neutral-dark-100 mb-2">
                          {option.provider}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      )}
                    </div>

                    {/* Route */}
                    <div className="flex items-center gap-2 mb-2 text-sm text-neutral-dark-100">
                      <MapPin className="h-4 w-4" />
                      <span>{option.from}</span>
                      <ArrowRight className="h-4 w-4" />
                      <span>{option.to}</span>
                    </div>

                    {/* Details */}
                    <div className="flex items-center gap-4 text-sm text-neutral-dark-100">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{option.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-semibold text-neutral-dark-200">
                          ${option.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Selected Summary */}
        {selectedTransport.length > 0 && (
          <Card className="mb-8 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-neutral-dark-200 mb-1">
                  Selected Transport ({selectedTransport.length})
                </h3>
                <p className="text-sm text-neutral-dark-100">
                  Total: ${selectedTransport.reduce((sum, t) => sum + t.price, 0)}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Itinerary
          </Button>
          
          <Button 
            onClick={handleContinue}
            disabled={selectedTransport.length === 0}
          >
            Continue to Hotels
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

