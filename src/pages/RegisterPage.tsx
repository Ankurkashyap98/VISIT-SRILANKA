import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { LoginModal } from '../components/LoginModal'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    preferredTravelType: 'tourist', // Optional preference, not required
    country: '',
    city: '',
    agreeToTerms: false
  })

  const travelPreferences = [
    { value: 'tourist', label: 'General Tourist', description: 'Explore all of Sri Lanka\'s diverse experiences' },
    { value: 'medical-tourist', label: 'Medical Tourist', description: 'Health services and wellness treatments' },
    { value: 'luxury-traveler', label: 'Luxury Traveler', description: 'Premium and exclusive experiences' },
    { value: 'adventure-nomad', label: 'Adventure Nomad', description: 'Adventure activities and remote work' },
    { value: 'pilgrimage', label: 'Pilgrimage Traveler', description: 'Spiritual and religious sites' },
    { value: 'wellness', label: 'Wellness Seeker', description: 'Ayurveda, meditation, and healing' },
    { value: 'cultural', label: 'Cultural Explorer', description: 'Ancient heritage and traditions' }
  ]

  // Countries and Cities data
  const countriesWithCities = {
    'Sri Lanka': ['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Anuradhapura', 'Trincomalee', 'Batticaloa', 'Ratnapura', 'Negombo', 'Matara'],
    'India': ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Kochi'],
    'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Edinburgh', 'Liverpool', 'Bristol', 'Newcastle', 'Sheffield'],
    'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
    'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Wollongong', 'Hobart'],
    'Germany': ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
    'France': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux', 'Lille'],
    'Japan': ['Tokyo', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Saitama', 'Hiroshima', 'Sendai'],
    'China': ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Tianjin', 'Wuhan', 'Dongguan', 'Chengdu', 'Nanjing', 'Chongqing'],
    'Canada': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener']
  }

  // Get cities for selected country
  const getCitiesForCountry = (country: string) => {
    return countriesWithCities[country as keyof typeof countriesWithCities] || []
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return // Prevent double submission
    
    setIsSubmitting(true)
    
    try {
      // Validation checks
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match')
        return
      }
      if (!formData.agreeToTerms) {
        alert('Please agree to the terms and conditions')
        return
      }
      if (!formData.country || !formData.city) {
        alert('Please select both country and city')
        return
      }
      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters long')
        return
      }
      // Call registration API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          country: formData.country,
          city: formData.city,
          preferredTravelType: formData.preferredTravelType,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }
      console.log('Registration successful:', data)
      
      // Redirect to thank you page
      navigate('/thank-you')
      
    } catch (error) {
      console.error('Registration error:', error)
      alert(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-black mb-4">
            Join Sri Lanka Tourism
          </h1>
          <p className="text-lg text-black">
            Create your account and start your personalized Sri Lankan journey
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Registration Form */}
          <Card className="p-8">
            <div className="flex items-center mb-6">
              <User className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-heading font-semibold text-neutral-dark-200">
                Create Account
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Travel Preference (Optional) */}
              <div>
                <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                  Travel Preference (Optional):
                </label>
                <select
                  value={formData.preferredTravelType}
                  onChange={(e) => setFormData({ ...formData, preferredTravelType: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200"
                  style={{ color: '#000000' }}
                >
                  {travelPreferences.map((pref) => (
                    <option key={pref.value} value={pref.value} style={{ backgroundColor: '#ffffff', color: '#000000' }}>
                      {pref.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-neutral-dark-100 mt-1">
                  {travelPreferences.find(p => p.value === formData.preferredTravelType)?.description}
                </p>
                <p className="text-xs text-neutral-dark-100 mt-1">
                  This helps us personalize your experience. You can explore all destinations regardless of your preference.
                </p>
              </div>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-dark-100" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-dark-100" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              {/* Location - Country and City */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => {
                      setFormData({ 
                        ...formData, 
                        country: e.target.value,
                        city: '' // Reset city when country changes
                      })
                    }}
                    className="w-full px-4 py-3 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200"
                    style={{ color: '#000000' }}
                    required
                  >
                    <option value="" style={{ backgroundColor: '#ffffff', color: '#000000' }}>Select your country</option>
                    {Object.keys(countriesWithCities).map((country) => (
                      <option key={country} value={country} style={{ backgroundColor: '#ffffff', color: '#000000' }}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                    City
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200"
                    style={{ color: '#000000' }}
                    disabled={!formData.country}
                    required
                  >
                    <option value="" style={{ backgroundColor: '#ffffff', color: '#000000' }}>Select your city</option>
                    {formData.country && getCitiesForCountry(formData.country).map((city) => (
                      <option key={city} value={city} style={{ backgroundColor: '#ffffff', color: '#000000' }}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {!formData.country && (
                    <p className="text-xs text-neutral-dark-100 mt-1">
                      Please select a country first
                    </p>
                  )}
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-dark-100" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-dark-100 hover:text-primary"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-neutral-dark-200 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-dark-100" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-dark-100 hover:text-primary"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {/* Terms Agreement */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-neutral-light-300 rounded"
                  required
                />
                <label htmlFor="agreeToTerms" className="text-sm text-neutral-dark-100">
                  I agree to the{' '}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
                loading={isSubmitting}
                loadingText="Creating Account"
              >
                <span className="flex items-center">
                  Create Account
                  <ArrowRight className="h-5 w-5 ml-2" />
                </span>
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-dark-100">
                Already have an account?{' '}
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-primary hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </Card>
          {/* Benefits Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-heading font-semibold text-neutral-dark-200 mb-4">
                Why Join Sri Lanka Tourism?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-dark-200">Government Verified</h4>
                    <p className="text-sm text-neutral-dark-100">All services are verified by Sri Lankan authorities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-dark-200">Transparent Pricing</h4>
                    <p className="text-sm text-neutral-dark-100">No hidden fees, clear pricing for all services</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-dark-200">AI-Powered Assistance</h4>
                    <p className="text-sm text-neutral-dark-100">Smart recommendations and personalized planning</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-dark-200">24/7 Support</h4>
                    <p className="text-sm text-neutral-dark-100">Round-the-clock assistance for your journey</p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                🌟 Explore Everything
              </h3>
              <p className="text-sm text-neutral-dark-100">
                Your travel preference helps us personalize recommendations, but you&apos;re free to explore 
                all of Sri Lanka&apos;s treasures - from ancient temples to modern medical facilities, 
                pristine beaches to mountain adventures.
              </p>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  )
}
