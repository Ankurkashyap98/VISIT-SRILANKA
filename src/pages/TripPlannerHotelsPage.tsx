import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import Stepper from '../components/tripPlanner/Stepper'
import NextButton from '../components/tripPlanner/NextButton'
import ServiceCard from '../components/tripPlanner/ServiceCard'
import { useBookingStore, HotelOption } from '../store/bookingStore'
import { Star, Wifi, Car, Coffee, Utensils, Dumbbell } from 'lucide-react'

const steps = [
  { id: 1, title: 'Preferences', description: 'Tell us about your trip' },
  { id: 2, title: 'Itinerary', description: 'AI-generated plan' },
  { id: 3, title: 'Transport', description: 'Flights & transfers' },
  { id: 4, title: 'Hotels', description: 'Accommodation' },
  { id: 5, title: 'Tours', description: 'Experiences' },
  { id: 6, title: 'Summary', description: 'Review & book' }
]

// Mock hotel data
const hotelOptions: HotelOption[] = [
  {
    id: 'hotel-1',
    name: 'Galle Face Hotel',
    location: 'Colombo',
    rating: 4.8,
    price: 180,
    amenities: ['Free WiFi', 'Parking', 'Restaurant', 'Spa', 'Pool'],
    image: '/images/galle-face-hotel.jpg',
    description: 'Historic luxury hotel overlooking the Indian Ocean with colonial architecture and modern amenities.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-2',
    name: 'Earl\'s Regency Hotel',
    location: 'Kandy',
    rating: 4.6,
    price: 120,
    amenities: ['Free WiFi', 'Parking', 'Restaurant', 'Gym', 'Pool'],
    image: '/images/earls-regency.jpg',
    description: 'Modern hotel in the heart of Kandy with stunning views of the city and surrounding hills.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-3',
    name: 'Jetwing Lighthouse',
    location: 'Galle',
    rating: 4.7,
    price: 200,
    amenities: ['Free WiFi', 'Parking', 'Restaurant', 'Spa', 'Pool', 'Beach Access'],
    image: '/images/jetwing-lighthouse.jpg',
    description: 'Boutique hotel designed by Geoffrey Bawa with unique architecture and beachfront location.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-4',
    name: 'Heritance Kandalama',
    location: 'Dambulla',
    rating: 4.5,
    price: 150,
    amenities: ['Free WiFi', 'Parking', 'Restaurant', 'Spa', 'Pool', 'Nature Tours'],
    image: '/images/heritance-kandalama.jpg',
    description: 'Eco-friendly resort built into the rock face with panoramic views and sustainable practices.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-5',
    name: 'Cinnamon Grand Colombo',
    location: 'Colombo',
    rating: 4.7,
    price: 170,
    amenities: ['Free WiFi', 'Parking', 'Restaurant', 'Spa', 'Pool'],
    image: '/images/cinnamon-grand-colombo.jpg',
    description: 'Upscale hotel in central Colombo offering luxury rooms, fine dining, and urban convenience.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-6',
    name: 'The Radh Hotel',
    location: 'Kandy',
    rating: 4.6,
    price: 140,
    amenities: ['Free WiFi', 'Restaurant', 'Spa', 'City View'],
    image: '/images/the-radh-kandy.jpg',
    description: 'Boutique hotel near the Temple of the Tooth with stylish interiors and cultural ambiance.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-7',
    name: 'Fort Bazaar Hotel',
    location: 'Galle',
    rating: 4.8,
    price: 210,
    amenities: ['Free WiFi', 'Restaurant', 'Spa', 'Courtyard Lounge'],
    image: '/images/fort-bazaar-galle.jpg',
    description: 'Charming heritage hotel located inside Galle Fort with elegant rooms and colonial aesthetics.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-8',
    name: 'Hotel Sigiriya',
    location: 'Sigiriya',
    rating: 4.5,
    price: 130,
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Nature Tours'],
    image: '/images/hotel-sigiriya.jpg',
    description: 'Eco-friendly retreat offering scenic views of Sigiriya Rock and lush landscapes.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-9',
    name: 'The Sanctuary at Tissawewa',
    location: 'Anuradhapura',
    rating: 4.4,
    price: 110,
    amenities: ['Free WiFi', 'Parking', 'Restaurant', 'Garden View'],
    image: '/images/sanctuary-tissawewa.jpg',
    description: 'Historic colonial-style hotel located near ancient ruins and sacred heritage sites.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-10',
    name: 'Ekho Lake House',
    location: 'Polonnaruwa',
    rating: 4.5,
    price: 125,
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Lake View'],
    image: '/images/ekho-lake-polonnaruwa.jpg',
    description: 'Serene lakeside resort offering peaceful surroundings and easy access to ruins.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-11',
    name: 'Grand Hotel Nuwara Eliya',
    location: 'Nuwara Eliya',
    rating: 4.7,
    price: 190,
    amenities: ['Free WiFi', 'Restaurant', 'Garden', 'Tea Lounge'],
    image: '/images/grand-hotel-nuwara-eliya.jpg',
    description: 'Iconic British colonial-era hotel surrounded by tea plantations and cool climate.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-12',
    name: '98 Acres Resort & Spa',
    location: 'Ella',
    rating: 4.8,
    price: 220,
    amenities: ['Free WiFi', 'Spa', 'Restaurant', 'Mountain View'],
    image: '/images/98-acres-ella.jpg',
    description: 'Luxury hillside resort with panoramic views of Ella Gap and natural surroundings.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-13',
    name: 'Taj Bentota Resort & Spa',
    location: 'Bentota',
    rating: 4.6,
    price: 175,
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Beach Access'],
    image: '/images/taj-bentota.jpg',
    description: 'Seaside resort offering beachfront relaxation, luxury dining, and ocean views.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-14',
    name: 'Ocean Reach Hotel',
    location: 'Mirissa',
    rating: 4.5,
    price: 140,
    amenities: ['Free WiFi', 'Restaurant', 'Beach Access', 'Balcony View'],
    image: '/images/ocean-reach-mirissa.jpg',
    description: 'Cozy beachfront hotel located near whale watching and coastal attractions.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-15',
    name: 'Jetwing Yala',
    location: 'Yala',
    rating: 4.7,
    price: 200,
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Safari Tours'],
    image: '/images/jetwing-yala.jpg',
    description: 'Nature-filled wildlife resort located near Yala National Park with safari access.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-16',
    name: 'Trinco Blu by Cinnamon',
    location: 'Trincomalee',
    rating: 4.6,
    price: 160,
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Beachfront'],
    image: '/images/trinco-blu.jpg',
    description: 'Stylish beachfront resort offering ocean activities and tropical relaxation.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-17',
    name: 'Jetwing Jaffna',
    location: 'Jaffna',
    rating: 4.5,
    price: 130,
    amenities: ['Free WiFi', 'Restaurant', 'City View', 'Parking'],
    image: '/images/jetwing-jaffna.jpg',
    description: 'Modern city hotel reflecting northern Sri Lankan culture and hospitality.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-18',
    name: 'Heritance Negombo',
    location: 'Negombo',
    rating: 4.6,
    price: 150,
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Beach Access'],
    image: '/images/heritance-negombo.jpg',
    description: 'Contemporary beachfront hotel located near the airport and coastal attractions.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-19',
    name: 'Pelwehera Village Resort',
    location: 'Dambulla',
    rating: 4.4,
    price: 120,
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Nature View'],
    image: '/images/pelwehera-dambulla.jpg',
    description: 'Peaceful nature resort surrounded by greenery near cave temple attractions.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'hotel-20',
    name: 'Sapphire Holiday Resort',
    location: 'Ratnapura',
    rating: 4.3,
    price: 100,
    amenities: ['Free WiFi', 'Parking', 'Restaurant', 'Garden'],
    image: '/images/sapphire-ratnapura.jpg',
    description: 'Comfortable countryside resort located in the gem-mining capital of Sri Lanka.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  
]

// Extended hotel data with highlights for display
const hotelOptionsExtended = hotelOptions.map(hotel => ({
  ...hotel,
  highlights: hotel.id === 'hotel-1' 
    ? ['Ocean Views', 'Historic Building', 'Central Location', 'Luxury Amenities']
    : hotel.id === 'hotel-2'
    ? ['City Views', 'Modern Facilities', 'Central Location', 'Friendly Staff']
    : hotel.id === 'hotel-3'
    ? ['Beachfront', 'Unique Architecture', 'Boutique Experience', 'Design Hotel']
    : ['Eco-Friendly', 'Rock Face Location', 'Nature Views', 'Sustainable Tourism']
}))

export default function TripPlannerHotelsPage() {
  const navigate = useNavigate()
  const { setField, setCurrentStep, hotels, preferences, itinerary, transport } = useBookingStore()
  const [selectedHotels, setSelectedHotels] = useState<string[]>(
    hotels ? hotels.map(h => h.id) : []
  )

  useEffect(() => {
    // If no preferences, itinerary, or transport, redirect back
    if (!preferences || !itinerary || !transport) {
      navigate('/trip-planner/preferences')
      return
    }
  }, [preferences, itinerary, transport, navigate])

  const handleHotelToggle = (hotelId: string) => {
    setSelectedHotels(prev => 
      prev.includes(hotelId)
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    )
  }

  const handleNext = () => {
    const selectedOptions = hotelOptions.filter(option => 
      selectedHotels.includes(option.id)
    )
    setField('hotels', selectedOptions)
    setCurrentStep(5)
    navigate('/trip-planner/tours')
  }

  const handlePrevious = () => {
    setCurrentStep(3)
    navigate('/trip-planner/transport')
  }

  const totalCost = selectedHotels.reduce((sum, id) => {
    const option = hotelOptions.find(opt => opt.id === id)
    return sum + (option?.price || 0)
  }, 0)

  if (!preferences || !itinerary || !transport) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-light-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Stepper */}
        <div className="mb-8">
          <Stepper currentStep={4} totalSteps={6} steps={steps} />
        </div>

        <Card className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-dark-200 mb-4">
              Choose Your Accommodation
            </h1>
            <p className="text-lg text-neutral-dark-100">
              Select hotels that match your travel style and budget
            </p>
          </div>

          {/* Hotel Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {hotelOptionsExtended.map((hotel) => (
              <ServiceCard
                key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                description={hotel.description}
                image={hotel.image}
                price={hotel.price}
                rating={hotel.rating}
                location={hotel.location}
                duration={`Check-in: ${hotel.checkIn} | Check-out: ${hotel.checkOut}`}
                amenities={hotel.amenities}
                highlights={hotel.highlights}
                isSelected={selectedHotels.includes(hotel.id)}
                onToggle={handleHotelToggle}
                showToggle={true}
                className="h-full"
              />
            ))}
          </div>

          {/* Selected Hotels Summary */}
          {selectedHotels.length > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-neutral-dark-200 mb-4">
                Selected Accommodations
              </h3>
              <div className="space-y-3">
                {selectedHotels.map(hotelId => {
                  const option = hotelOptions.find(opt => opt.id === hotelId)
                  if (!option) return null
                  
                  return (
                    <div key={hotelId} className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                          <Star className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-dark-200">{option.name}</p>
                          <p className="text-sm text-neutral-dark-100">{option.location}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-neutral-dark-100 ml-1">{option.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">${option.price}/night</p>
                        <p className="text-xs text-neutral-dark-100">per room</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-primary/20 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-neutral-dark-200">Total Hotel Cost:</span>
                  <span className="text-xl font-bold text-primary">${totalCost}/night</span>
                </div>
              </div>
            </div>
          )}

          {/* Hotel Tips */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 mb-3">Accommodation Tips for Sri Lanka</h3>
            <ul className="text-green-700 text-sm space-y-2">
              <li>• Book hotels in advance during peak season (December-March)</li>
              <li>• Many hotels offer traditional Sri Lankan breakfast</li>
              <li>• Look for hotels with cultural shows and local experiences</li>
              <li>• Consider eco-friendly resorts for a unique experience</li>
            </ul>
          </div>

          {/* Navigation */}
          <NextButton
            onClick={handleNext}
            onPrevious={handlePrevious}
            disabled={selectedHotels.length === 0}
            nextText="Continue to Tours"
            previousText="Back to Transport"
            className="mt-8"
          />
        </Card>
      </div>

      <Footer />
    </div>
  )
}

