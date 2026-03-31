import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { getImageUrl } from '../lib/utils'
import { 
  MapPin, 
  Star, 
  CheckCircle,
  Shield
} from 'lucide-react'

interface Destination {
  id: string
  name: string
  description: string
  image: string
  location: string
  rating: number
  price: number
  currency: string
  category: string
  verified: boolean
  governmentApproved: boolean
  highlights: string[]
  duration: string
  maxParticipants: number
}

// Mock destination data
const destinations: Record<string, Destination> = {
  '1': {
    id: '1',
    name: 'Sigiriya Rock Fortress',
    description: 'Ancient rock fortress and palace ruins with stunning frescoes and panoramic views',
    image: getImageUrl('images/ancient-cityof-polonnaruwa.jpg'),
    location: 'Central Province',
    rating: 4.8,
    price: 30,
    currency: 'USD',
    category: 'Historical',
    verified: true,
    governmentApproved: true,
    highlights: ['UNESCO World Heritage', 'Ancient Frescoes', 'Panoramic Views'],
    duration: '3-4 hours',
    maxParticipants: 20
  },
  '2': {
    id: '2',
    name: 'Sacred City of Kandy',
    description: 'Sacred Buddhist city with the Temple of the Sacred Tooth Relic',
    image: getImageUrl('images/sacred-city-of-kandy.jpg'),
    location: 'Kandy',
    rating: 4.9,
    price: 0,
    currency: 'USD',
    category: 'Religious',
    verified: true,
    governmentApproved: true,
    highlights: ['Sacred Relic', 'UNESCO World Heritage', 'Cultural Ceremonies'],
    duration: '2-3 hours',
    maxParticipants: 50
  },
  '3': {
    id: '3',
    name: 'Sinharaja Forest Reserve',
    description: 'UNESCO World Heritage tropical rainforest with endemic wildlife',
    image: getImageUrl('images/sinharaja-forest-reserve.jpg'),
    location: 'Southern Province',
    rating: 4.7,
    price: 45,
    currency: 'USD',
    category: 'Adventure',
    verified: true,
    governmentApproved: true,
    highlights: ['Endemic Species', 'Rainforest Trekking', 'Bird Watching'],
    duration: 'Full day',
    maxParticipants: 15
  },
  '4': {
    id: '4',
    name: 'Ancient City of Polonnaruwa',
    description: 'Medieval capital of Sri Lanka with well-preserved archaeological ruins',
    image: getImageUrl('images/ancient-cityof-polonnaruwa.jpg'),
    location: 'North Central Province',
    rating: 4.6,
    price: 25,
    currency: 'USD',
    category: 'Historical',
    verified: true,
    governmentApproved: true,
    highlights: ['UNESCO World Heritage', 'Ancient Ruins', 'Archaeological Site'],
    duration: 'Half day',
    maxParticipants: 25
  },
  '5': {
    id: '5',
    name: 'Ella Rock & Nine Arch Bridge',
    description: 'Scenic mountain views and iconic railway bridge in the hill country',
    image: getImageUrl('images/sinharaja-forest-reserve.jpg'),
    location: 'Badulla District',
    rating: 4.5,
    price: 20,
    currency: 'USD',
    category: 'Adventure',
    verified: true,
    governmentApproved: true,
    highlights: ['Mountain Views', 'Railway Heritage', 'Hiking Trails'],
    duration: 'Full day',
    maxParticipants: 12
  },
  '6': {
    id: '6',
    name: 'Yala National Park',
    description: 'Premier wildlife sanctuary with diverse wildlife and stunning landscapes',
    image: getImageUrl('images/sinharaja-forest-reserve.jpg'),
    location: 'Southern Province',
    rating: 4.8,
    price: 60,
    currency: 'USD',
    category: 'Adventure',
    verified: true,
    governmentApproved: true,
    highlights: ['Wildlife Safari', 'Leopard Spotting', 'Bird Watching', 'Elephant Herds'],
    duration: 'Full day',
    maxParticipants: 8
  },
  '7': {
    id: '7',
    name: 'Galle Fort',
    description: 'Historic colonial fort with charming architecture and coastal views',
    image: getImageUrl('images/ancient-cityof-polonnaruwa.jpg'),
    location: 'Southern Province',
    rating: 4.7,
    price: 15,
    currency: 'USD',
    category: 'Historical',
    verified: true,
    governmentApproved: true,
    highlights: ['UNESCO World Heritage', 'Colonial Architecture', 'Coastal Views', 'Historic Streets'],
    duration: 'Half day',
    maxParticipants: 30
  },
  '8': {
    id: '8',
    name: 'Temple of the Sacred Tooth Relic',
    description: 'Most sacred Buddhist temple housing the tooth relic of Buddha',
    image: getImageUrl('images/sacred-city-of-kandy.jpg'),
    location: 'Kandy',
    rating: 4.9,
    price: 10,
    currency: 'USD',
    category: 'Religious',
    verified: true,
    governmentApproved: true,
    highlights: ['Sacred Relic', 'Buddhist Temple', 'Cultural Heritage', 'Religious Ceremonies'],
    duration: '2-3 hours',
    maxParticipants: 50
  }
}

interface BookingForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  date: string
  time: string
  participants: number
  specialRequests: string
}

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const destinationId = searchParams.get('destination')
  
  const [destination, setDestination] = useState<Destination | null>(null)
  const [form, setForm] = useState<BookingForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    participants: 1,
    specialRequests: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Details, 2: Payment, 3: Confirmation

  useEffect(() => {
    if (destinationId && destinations[destinationId]) {
      setDestination(destinations[destinationId])
    }
  }, [destinationId])

  const handleInputChange = (field: keyof BookingForm, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleNextStep = async () => {
    if (step === 1) {
      setIsLoading(true)
      // Simulate validation
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStep(2)
      setIsLoading(false)
    } else if (step === 2) {
      setIsLoading(true)
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      setStep(3)
      setIsLoading(false)
    }
  }

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const totalPrice = destination ? destination.price * form.participants : 0

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-black mb-4">Choose Your Destination</h1>
            <p className="text-lg text-black mb-8">Select a destination to start your booking process.</p>
          </div>
          
          {/* Popular Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Object.values(destinations).map((dest) => (
              <Card key={dest.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/booking?destination=${dest.id}`)}>
                <div className="relative">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{dest.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-neutral-dark-200 mb-2">{dest.name}</h3>
                  <p className="text-sm text-neutral-dark-100 mb-3">{dest.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-neutral-dark-100">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{dest.location}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">
                        {dest.price === 0 ? 'Free' : `${dest.currency} ${dest.price}`}
                      </div>
                      <div className="text-xs text-neutral-dark-100">{dest.duration}</div>
                    </div>
                  </div>
                  {dest.governmentApproved && (
                    <div className="mt-3 flex items-center text-green-600 text-sm">
                      <Shield className="h-4 w-4 mr-1" />
                      <span>Government Approved</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="primary" onClick={() => navigate('/destinations')}>
              View All Destinations
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 ml-2 ${
                    step > stepNumber ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-16">
            <span className={`text-sm ${step >= 1 ? 'text-primary font-medium' : 'text-gray-500'}`}>
              Booking Details
            </span>
            <span className={`text-sm ${step >= 2 ? 'text-primary font-medium' : 'text-gray-500'}`}>
              Payment
            </span>
            <span className={`text-sm ${step >= 3 ? 'text-primary font-medium' : 'text-gray-500'}`}>
              Confirmation
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <h2 className="text-xl font-semibold mb-6">Booking Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 "
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                      Visit Date *
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full px-3 py-2 bg-white [color-scheme:light] text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                      Preferred Time *
                    </label>
                    <select
                      value={form.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full px-3 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200"
                      style={{ color: '#000000' }}
                      required
                    >
                      <option value="" style={{ backgroundColor: '#ffffff', color: '#000000' }}>Select time</option>
                      <option value="08:00" style={{ backgroundColor: '#ffffff', color: '#000000' }}>8:00 AM</option>
                      <option value="10:00" style={{ backgroundColor: '#ffffff', color: '#000000' }}>10:00 AM</option>
                      <option value="12:00" style={{ backgroundColor: '#ffffff', color: '#000000' }}>12:00 PM</option>
                      <option value="14:00" style={{ backgroundColor: '#ffffff', color: '#000000' }}>2:00 PM</option>
                      <option value="16:00" style={{ backgroundColor: '#ffffff', color: '#000000' }}>4:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                    Number of Participants *
                  </label>
                  <select
                    value={form.participants}
                    onChange={(e) => handleInputChange('participants', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200"
                    style={{ color: '#000000' }}
                    required
                  >
                    {[...Array(destination.maxParticipants)].map((_, i) => (
                      <option key={i + 1} value={i + 1} style={{ backgroundColor: '#ffffff', color: '#000000' }}>
                        {i + 1} {i === 0 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    value={form.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                    placeholder="Any special requirements or requests..."
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleNextStep}
                    loading={isLoading}
                    disabled={!form.firstName || !form.lastName || !form.email || !form.phone || !form.date || !form.time}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center text-blue-700">
                    <Shield className="h-5 w-5 mr-2" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-blue-600 text-sm mt-1">
                    Your payment information is encrypted and secure. We accept all major credit cards.
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-3 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBackStep}>
                    Back
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    loading={isLoading}
                  >
                    Complete Booking
                  </Button>
                </div>
              </Card>
            )}

            {step === 3 && (
              <Card className="text-center">
                <div className="mb-6">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-neutral-dark-200 mb-2">
                    Booking Confirmed!
                  </h2>
                  <p className="text-neutral-dark-100">
                    Your booking has been successfully processed. You will receive a confirmation email shortly.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-medium text-neutral-dark-200 mb-3">Booking Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-dark-100">Destination:</span>
                      <span className="font-medium">{destination.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-dark-100">Date:</span>
                      <span className="font-medium">{form.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-dark-100">Time:</span>
                      <span className="font-medium">{form.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-dark-100">Participants:</span>
                      <span className="font-medium">{form.participants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-dark-100">Total:</span>
                      <span className="font-medium">{destination.currency} {totalPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button  onClick={() => navigate('/destinations')}>
                    Browse More
                  </Button>
                  <Button onClick={() => navigate('/dashboard/tourist')}>
                    View Dashboard
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <div className="flex items-center mb-4">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-16 h-12 object-cover rounded-lg mr-3"
                />
                <div>
                  <h3 className="font-medium text-neutral-dark-200">{destination.name}</h3>
                  <div className="flex items-center text-sm text-neutral-dark-100">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{destination.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-dark-100">Duration</span>
                  <span className="font-medium">{destination.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-dark-100">Category</span>
                  <span className="font-medium">{destination.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-dark-100">Rating</span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    <span className="font-medium">{destination.rating}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neutral-dark-100">Price per person</span>
                  <span className="font-medium">
                    {destination.price === 0 ? 'Free' : `${destination.currency} ${destination.price}`}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neutral-dark-100">Participants</span>
                  <span className="font-medium">{form.participants}</span>
                </div>
                <div className="flex items-center justify-between text-lg font-semibold text-primary">
                  <span>Total</span>
                  <span>{destination.currency} {totalPrice}</span>
                </div>
              </div>

              {destination.governmentApproved && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center text-green-700">
                    <Shield className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Government Approved</span>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
