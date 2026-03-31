import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Bot, ArrowRight, CheckCircle, Sparkles, Shield, Zap } from 'lucide-react'

export default function TripPlannerPage() {
  const navigate = useNavigate()

  const handleStartPlanning = () => {
    navigate('/trip-planner/preferences')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Bot className="h-10 w-10 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-6">
            AI-Powered Trip Planner
          </h1>
          <p className="text-xl text-black mb-8 max-w-3xl mx-auto">
            Create your perfect Sri Lankan adventure with our intelligent trip planner. 
            Get personalized itineraries, book everything in one place, and travel with confidence.
          </p>
          <Button
            size="lg"
            onClick={handleStartPlanning}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            Start Planning Your Trip
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-dark-200 mb-3">
                Tell Us Your Preferences
              </h3>
              <p className="text-neutral-dark-200">
                Share your travel dates, interests, budget, and special requirements. 
                Our AI learns what you love.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-dark-200 mb-3">
                Get AI-Generated Itinerary
              </h3>
              <p className="text-neutral-dark-200">
                Our AI creates a personalized itinerary with the best attractions, 
                activities, and experiences for you.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-dark-200 mb-3">
                Book Everything
              </h3>
              <p className="text-neutral-dark-200">
                Select transport, hotels, and tours. Review and book your complete 
                trip package in one place.
              </p>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Why Choose Our Trip Planner?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <Bot className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-dark-200 mb-2">AI-Powered</h3>
              <p className="text-sm text-neutral-dark-200">
                Advanced AI creates personalized itineraries based on your preferences.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-dark-200 mb-2">Government Verified</h3>
              <p className="text-sm text-neutral-dark-200">
                All services are government-approved and quality-assured for your safety.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-dark-200 mb-2">All-in-One</h3>
              <p className="text-sm text-neutral-dark-200">
                Book transport, hotels, tours, and experiences in one seamless flow.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-dark-200 mb-2">Instant Booking</h3>
              <p className="text-sm text-neutral-dark-200">
                Get instant confirmations and e-tickets for all your bookings.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 text-center bg-gradient-to-r from-primary/10 to-secondary/10">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-4">
            Ready to Discover Sri Lanka?
          </h2>
          <p className="text-black mb-6 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered the magic of Sri Lanka 
            with our intelligent trip planning system.
          </p>
          <Button
            size="lg"
            onClick={handleStartPlanning}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            Start Your Journey
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
