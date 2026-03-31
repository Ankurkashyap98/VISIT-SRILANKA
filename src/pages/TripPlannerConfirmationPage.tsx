import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { useBookingStore } from '../store/bookingStore'
import { CheckCircle, Calendar, Users, MapPin, Mail, Phone, Home } from 'lucide-react'

export default function TripPlannerConfirmationPage() {
  const navigate = useNavigate()
  const { preferences, getTotalCost, reset } = useBookingStore()

  useEffect(() => {
    // If no preferences, redirect to trip planner
    if (!preferences) {
      navigate('/trip-planner')
      return
    }
  }, [preferences, navigate])

  const handleNewTrip = () => {
    reset()
    navigate('/trip-planner')
  }

  const handleGoHome = () => {
    navigate('/')
  }

  const totalCost = getTotalCost()
  const taxes = totalCost * 0.1
  const finalTotal = totalCost + taxes

  if (!preferences) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-light-50">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-dark-200 mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-neutral-dark-100">
              Your trip to Sri Lanka has been successfully booked
            </p>
          </div>

          {/* Booking Details */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-neutral-dark-200 mb-4">Booking Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-lg font-bold text-primary">${finalTotal.toFixed(2)}</p>
                <p className="text-sm text-neutral-dark-100">Total Cost</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-800 mb-3">What's Next?</h3>
            <ul className="text-blue-700 text-sm space-y-2 text-left">
              <li>• You will receive a confirmation email with all booking details</li>
              <li>• Our team will contact you within 24 hours to finalize arrangements</li>
              <li>• All travel documents will be sent to your email</li>
              <li>• 24/7 support is available throughout your trip</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-neutral-dark-200 mb-3">Need Help?</h3>
            <div className="space-y-2 text-sm text-neutral-dark-100">
              <div className="flex items-center justify-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>support@srilankatourism.gov.lk</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+94 11 242 6900</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={handleGoHome}
              className="flex items-center"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Home
            </Button>
            <Button
              onClick={handleNewTrip}
              className="flex items-center"
            >
              Plan Another Trip
            </Button>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  )
}

