import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import Stepper from '../components/tripPlanner/Stepper'
import NextButton from '../components/tripPlanner/NextButton'
import ServiceCard from '../components/tripPlanner/ServiceCard'
import { useBookingStore, TourOption } from '../store/bookingStore'
import { Star, MapPin, Clock } from 'lucide-react'

const steps = [
  { id: 1, title: 'Preferences', description: 'Tell us about your trip' },
  { id: 2, title: 'Itinerary', description: 'AI-generated plan' },
  { id: 3, title: 'Transport', description: 'Flights & transfers' },
  { id: 4, title: 'Hotels', description: 'Accommodation' },
  { id: 5, title: 'Tours', description: 'Experiences' },
  { id: 6, title: 'Summary', description: 'Review & book' }
]

// Mock tour data
const tourOptions: TourOption[] = [
  {
    id: 'tour-1',
    name: 'Sigiriya Rock Fortress Guided Tour',
    location: 'Central Province',
    duration: '4 hours',
    price: 85,
    rating: 4.9,
    description: 'Expert guided tour of the ancient rock fortress with historical insights and photography opportunities.',
    highlights: ['Ancient Frescoes', 'Lion Gate', 'Water Gardens', 'Panoramic Views', 'Historical Guide'],
    image: '/images/sigiriya-tour.jpg',
    category: 'Historical'
  },
  {
    id: 'tour-2',
    name: 'Yala National Park Safari',
    location: 'Southern Province',
    duration: 'Full Day',
    price: 120,
    rating: 4.8,
    description: 'Wildlife safari through Yala National Park with experienced guides and comfortable jeep transport.',
    highlights: ['Leopard Spotting', 'Elephant Herds', 'Bird Watching', 'Wildlife Photography', 'Expert Guide'],
    image: '/images/yala-safari.jpg',
    category: 'Wildlife'
  },
  {
    id: 'tour-3',
    name: 'Tea Plantation Experience',
    location: 'Nuwara Eliya',
    duration: '6 hours',
    price: 75,
    rating: 4.7,
    description: 'Visit working tea plantations, learn about tea processing, and enjoy fresh Ceylon tea tastings.',
    highlights: ['Tea Factory Tour', 'Tea Tasting', 'Plantation Walk', 'Local Culture', 'Fresh Tea'],
    image: '/images/tea-plantation.jpg',
    category: 'Cultural'
  },
  {
    id: 'tour-4',
    name: 'Galle Fort Walking Tour',
    location: 'Galle',
    duration: '3 hours',
    price: 45,
    rating: 4.6,
    description: 'Explore the UNESCO World Heritage Galle Fort with its colonial architecture and charming streets.',
    highlights: ['Dutch Architecture', 'Historic Lighthouse', 'Art Galleries', 'Boutique Shops', 'Coastal Views'],
    image: '/images/galle-fort-tour.jpg',
    category: 'Historical'
  },
  {
    id: 'tour-5',
    name: 'Whale Watching Tour',
    location: 'Mirissa',
    duration: '5 hours',
    price: 95,
    rating: 4.5,
    description: 'Boat tour to spot blue whales and dolphins in their natural habitat with marine biologist guide.',
    highlights: ['Blue Whale Spotting', 'Dolphin Watching', 'Marine Biology', 'Ocean Experience', 'Photography'],
    image: '/images/whale-watching.jpg',
    category: 'Adventure'
  },
  {
    id: 'tour-6',
    name: 'Cooking Class & Market Tour',
    location: 'Colombo',
    duration: '4 hours',
    price: 65,
    rating: 4.8,
    description: 'Learn to cook authentic Sri Lankan dishes with a local chef, including market tour for fresh ingredients.',
    highlights: ['Local Chef', 'Market Tour', 'Cooking Class', 'Traditional Recipes', 'Food Tasting'],
    image: '/images/cooking-class.jpg',
    category: 'Cultural'
  }
]

export default function TripPlannerToursPage() {
  const navigate = useNavigate()
  const { setField, setCurrentStep, tours, preferences, itinerary, transport, hotels } = useBookingStore()
  const [selectedTours, setSelectedTours] = useState<string[]>(
    tours ? tours.map(t => t.id) : []
  )

  useEffect(() => {
    // If no preferences, itinerary, transport, or hotels, redirect back
    if (!preferences || !itinerary || !transport || !hotels) {
      navigate('/trip-planner/preferences')
      return
    }
  }, [preferences, itinerary, transport, hotels, navigate])

  const handleTourToggle = (tourId: string) => {
    setSelectedTours(prev => 
      prev.includes(tourId)
        ? prev.filter(id => id !== tourId)
        : [...prev, tourId]
    )
  }

  const handleNext = () => {
    const selectedOptions = tourOptions.filter(option => 
      selectedTours.includes(option.id)
    )
    setField('tours', selectedOptions)
    setCurrentStep(6)
    navigate('/trip-planner/summary')
  }

  const handlePrevious = () => {
    setCurrentStep(4)
    navigate('/trip-planner/hotels')
  }

  const totalCost = selectedTours.reduce((sum, id) => {
    const option = tourOptions.find(opt => opt.id === id)
    return sum + (option?.price || 0)
  }, 0)

  if (!preferences || !itinerary || !transport || !hotels) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-light-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Stepper */}
        <div className="mb-8">
          <Stepper currentStep={5} totalSteps={6} steps={steps} />
        </div>

        <Card className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-dark-200 mb-4">
              Add Tours & Experiences
            </h1>
            <p className="text-lg text-neutral-dark-100">
              Enhance your trip with guided tours and unique experiences
            </p>
          </div>

          {/* Tour Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tourOptions.map((tour) => (
              <ServiceCard
                key={tour.id}
                id={tour.id}
                name={tour.name}
                description={tour.description}
                image={tour.image}
                price={tour.price}
                rating={tour.rating}
                location={tour.location}
                duration={tour.duration}
                highlights={tour.highlights}
                category={tour.category}
                isSelected={selectedTours.includes(tour.id)}
                onToggle={handleTourToggle}
                showToggle={true}
                priceLabel="per person"
                className="h-full"
              />
            ))}
          </div>

          {/* Selected Tours Summary */}
          {selectedTours.length > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-neutral-dark-200 mb-4">
                Selected Tours & Experiences
              </h3>
              <div className="space-y-3">
                {selectedTours.map(tourId => {
                  const option = tourOptions.find(opt => opt.id === tourId)
                  if (!option) return null
                  
                  return (
                    <div key={tourId} className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-dark-200">{option.name}</p>
                          <p className="text-sm text-neutral-dark-100">{option.location}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-neutral-dark-100 ml-1">{option.rating}</span>
                            <Clock className="h-3 w-3 text-gray-400 ml-2" />
                            <span className="text-xs text-neutral-dark-100 ml-1">{option.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">${option.price}</p>
                        <p className="text-xs text-neutral-dark-100">per person</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-primary/20 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-neutral-dark-200">Total Tour Cost:</span>
                  <span className="text-xl font-bold text-primary">${totalCost}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tour Categories Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-3">Popular Tour Categories</h3>
              <ul className="text-blue-700 text-sm space-y-2">
                <li>• <strong>Historical:</strong> Ancient cities, temples, and cultural sites</li>
                <li>• <strong>Wildlife:</strong> National parks, safaris, and nature tours</li>
                <li>• <strong>Cultural:</strong> Local experiences, cooking classes, and traditions</li>
                <li>• <strong>Adventure:</strong> Hiking, whale watching, and outdoor activities</li>
              </ul>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-800 mb-3">Tour Benefits</h3>
              <ul className="text-green-700 text-sm space-y-2">
                <li>• Expert local guides with deep knowledge</li>
                <li>• Small group sizes for personalized experience</li>
                <li>• All entrance fees and transportation included</li>
                <li>• Government-verified and quality-assured tours</li>
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <NextButton
            onClick={handleNext}
            onPrevious={handlePrevious}
            nextText="Review & Book"
            previousText="Back to Hotels"
            className="mt-8"
          />
        </Card>
      </div>

      <Footer />
    </div>
  )
}

