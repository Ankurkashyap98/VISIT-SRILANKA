import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import Stepper from '../components/tripPlanner/Stepper'
import { useBookingStore } from '../store/bookingStore'
import { Calendar, MapPin, Clock, Utensils, Hotel, Car, Camera, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import { getImageUrl } from '../lib/utils'

const steps = [
  { id: 1, title: 'Preferences', description: 'Set your travel preferences' },
  { id: 2, title: 'Itinerary', description: 'Review your itinerary', active: true },
  { id: 3, title: 'Transport', description: 'Choose transport' },
  { id: 4, title: 'Hotels', description: 'Select hotels' },
  { id: 5, title: 'Tours', description: 'Book tours' },
  { id: 6, title: 'Summary', description: 'Review & book' }
]

interface ItineraryItem {
  id: string
  day: number
  date: string
  title: string
  location: string
  description: string
  activities: string[]
  duration: string
  meals: string[]
  accommodation?: string
  image?: string
}

export default function TripPlannerItineraryPage() {
  const navigate = useNavigate()
  const { preferences, setField, setCurrentStep } = useBookingStore()
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    // If no preferences, redirect back to preferences page
    if (!preferences) {
      navigate('/trip-planner/preferences')
      return
    }

    // Generate itinerary based on preferences
    generateItinerary()
  }, [preferences])

  const generateItinerary = async () => {
    if (!preferences) return

    setIsGenerating(true)

    // Simulate AI itinerary generation
    await new Promise(resolve => setTimeout(resolve, 1500))

    const startDate = new Date(preferences.startDate)
    const endDate = new Date(preferences.endDate)
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    
    const generatedItinerary: ItineraryItem[] = []

    // Generate itinerary based on travel type and interests
    const destinations = getDestinationsForTravelType(preferences.travelType, preferences.interests)
    
    for (let i = 0; i < days && i < destinations.length; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      
      const destination = destinations[i % destinations.length]
      
      generatedItinerary.push({
        id: `day-${i + 1}`,
        day: i + 1,
        date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        title: destination.title,
        location: destination.location,
        description: destination.description,
        activities: destination.activities,
        duration: destination.duration,
        meals: getMealsForDay(i, days),
        accommodation: i === 0 ? 'Check-in' : i === days - 1 ? 'Check-out' : undefined,
        image: destination.image
      })
    }

    setItinerary(generatedItinerary)
    setIsGenerating(false)
  }

  const getDestinationsForTravelType = (travelType: string, interests: string[]) => {
    const baseDestinations: Record<string, any[]> = {
      leisure: [
        {
          title: 'Unawatuna Beach',
          location: 'Galle, Southern Province',
          description: 'Relax on pristine beaches and enjoy water sports',
          activities: ['Beach relaxation', 'Snorkeling', 'Sunset viewing'],
          duration: 'Full day',
          image: getImageUrl('images/placeholder-img1.jpg')
        },
        {
          title: 'Bentota Beach',
          location: 'Bentota, Western Province',
          description: 'Water sports and beach activities',
          activities: ['Jet skiing', 'Beach volleyball', 'Beachside dining'],
          duration: 'Full day',
          image: getImageUrl('images/placeholder-img1.jpg')
        }
      ],
      adventure: [
        {
          title: 'Sinharaja Forest Reserve',
          location: 'Ratnapura, Sabaragamuwa Province',
          description: 'Explore the UNESCO World Heritage rainforest',
          activities: ['Rainforest trekking', 'Bird watching', 'Wildlife spotting'],
          duration: 'Full day',
          image: '/srilankatourism/images/sinharaja-forest-reserve.jpg'
        },
        {
          title: 'Ella Rock',
          location: 'Ella, Uva Province',
          description: 'Hike to stunning viewpoints',
          activities: ['Mountain hiking', 'Photography', 'Nature exploration'],
          duration: 'Half day',
          image: getImageUrl('images/placeholder-img1.jpg')
        }
      ],
      culture: [
        {
          title: 'Ancient City of Polonnaruwa',
          location: 'Polonnaruwa, North Central Province',
          description: 'Explore ancient ruins and historical sites',
          activities: ['Historical tour', 'Archaeological sites', 'Photography'],
          duration: 'Full day',
          image: '/srilankatourism/images/ancient-cityof-polonnaruwa.jpg'
        },
        {
          title: 'Sacred City of Kandy',
          location: 'Kandy, Central Province',
          description: 'Visit the Temple of the Tooth Relic',
          activities: ['Temple visit', 'Cultural show', 'City tour'],
          duration: 'Full day',
          image: '/srilankatourism/images/sacred-city-of-kandy.jpg'
        }
      ],
      wellness: [
        {
          title: 'Ayurveda Wellness Center',
          location: 'Kandy, Central Province',
          description: 'Traditional Ayurvedic treatments and spa',
          activities: ['Ayurvedic massage', 'Yoga session', 'Meditation'],
          duration: 'Half day',
          image: getImageUrl('images/placeholder-img1.jpg')
        },
        {
          title: 'Tea Plantation Tour',
          location: 'Nuwara Eliya, Central Province',
          description: 'Visit tea plantations and learn about tea making',
          activities: ['Tea factory tour', 'Tea tasting', 'Scenic views'],
          duration: 'Half day',
          image: getImageUrl('images/placeholder-img1.jpg')
        }
      ],
      pilgrimage: [
        {
          title: 'Temple of the Tooth Relic',
          location: 'Kandy, Central Province',
          description: 'Sacred Buddhist temple housing the tooth relic',
          activities: ['Temple visit', 'Prayer ceremony', 'Cultural exploration'],
          duration: 'Half day',
          image: '/srilankatourism/images/sacred-city-of-kandy.jpg'
        },
        {
          title: 'Anuradhapura Sacred City',
          location: 'Anuradhapura, North Central Province',
          description: 'Ancient Buddhist pilgrimage site',
          activities: ['Sacred tree visit', 'Temple tour', 'Historical exploration'],
          duration: 'Full day',
          image: '/srilankatourism/images/ancient-cityof-polonnaruwa.jpg'
        }
      ]
    }

    return baseDestinations[travelType] || baseDestinations.culture
  }

  const getMealsForDay = (dayIndex: number, totalDays: number): string[] => {
    const meals = ['Breakfast']
    if (dayIndex < totalDays - 1) {
      meals.push('Lunch', 'Dinner')
    } else {
      meals.push('Lunch')
    }
    return meals
  }

  const handleContinue = () => {
    if (itinerary.length > 0) {
      setField('itinerary', itinerary)
      setCurrentStep(3)
      navigate('/trip-planner/transport')
    }
  }

  const handleBack = () => {
    navigate('/trip-planner/preferences')
  }

  if (!preferences) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-light-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Stepper */}
        <Stepper steps={steps} currentStep={2} />

        {/* Header */}
        <div className="text-center mb-8 mt-8">
          <h1 className="text-3xl font-bold text-neutral-dark-200 mb-2">
            Your Personalized Itinerary
          </h1>
          <p className="text-neutral-dark-100">
            Based on your preferences, we've created a perfect itinerary for your Sri Lankan adventure
          </p>
        </div>

        {/* Itinerary Content */}
        {isGenerating ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-neutral-dark-100">Generating your personalized itinerary...</p>
          </div>
        ) : itinerary.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-neutral-dark-100 mb-4">No itinerary generated yet.</p>
            <Button onClick={generateItinerary}>Generate Itinerary</Button>
          </Card>
        ) : (
          <div className="space-y-6 mb-8">
            {itinerary.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="md:flex">
                  {/* Day Badge */}
                  <div className="md:w-24 flex-shrink-0 bg-primary/10 p-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">Day {item.day}</div>
                      <div className="text-sm text-neutral-dark-100">{item.date}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-neutral-dark-200 mb-2">
                          {item.title}
                        </h3>
                        <div className="flex items-center text-neutral-dark-100 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{item.location}</span>
                        </div>
                      </div>
                      {item.accommodation && (
                        <span className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">
                          {item.accommodation}
                        </span>
                      )}
                    </div>

                    <p className="text-neutral-dark-100 mb-4">{item.description}</p>

                    {/* Activities */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-neutral-dark-200 mb-2 flex items-center">
                        <Camera className="h-4 w-4 mr-1" />
                        Activities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.activities.map((activity, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-neutral-light-100 text-neutral-dark-200 text-sm rounded-full"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center text-neutral-dark-100">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex items-center text-neutral-dark-100">
                        <Utensils className="h-4 w-4 mr-2" />
                        <span>{item.meals.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Preferences
          </Button>
          
          {itinerary.length > 0 && (
            <Button onClick={handleContinue}>
              Continue to Transport
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

