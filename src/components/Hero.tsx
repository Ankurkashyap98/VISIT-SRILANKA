import React, { useState } from 'react'
import { cn } from '../lib/utils'
import { Button } from './Button'
import { Select } from './Select'
import { Autocomplete } from './Autocomplete'
import { Search, Calendar, MapPin, Users, ArrowRight, Star } from 'lucide-react'
import { getImageSource } from '../lib/imageUtils'

interface HeroProps {
  className?: string
}

interface Destination {
  id: string
  name: string
  location: string
  category: string
  image: string
  rating: number
  description: string
  keywords?: string[]
}

const Hero = ({ className }: HeroProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [, setSelectedDestination] = useState<Destination | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [travelType, setTravelType] = useState('')

  const travelTypes = [
    { value: 'culture', label: 'Culture & Heritage' },
    { value: 'pilgrimage', label: 'Pilgrimage & Religious' },
    { value: 'adventure', label: 'Adventure & Wildlife' },
    { value: 'medical', label: 'Medical & Wellness' },
    { value: 'leisure', label: 'Leisure & Luxury' }
  ]

  // Mock destinations data for popular tags - using getImageSource to get correct paths with BASE_URL
  const destinations = [
    { id: '1', name: 'Sigiriya Rock Fortress', location: 'Central Province', category: 'Historical', image: getImageSource('Sigiriya Rock Fortress').url, rating: 4.8, description: 'Ancient rock fortress' },
    { id: '2', name: 'Temple of the Sacred Tooth Relic', location: 'Kandy', category: 'Religious', image: getImageSource('Temple of the Sacred Tooth Relic').url, rating: 4.9, description: 'Sacred Buddhist temple' },
    { id: '3', name: 'Yala National Park', location: 'Southern Province', category: 'Adventure', image: getImageSource('Yala National Park').url, rating: 4.7, description: 'Wildlife sanctuary' },
    { id: '4', name: 'Galle Fort', location: 'Galle', category: 'Historical', image: getImageSource('Galle Fort').url, rating: 4.6, description: 'UNESCO World Heritage' },
    { id: '5', name: 'Ella Rock', location: 'Ella', category: 'Adventure', image: getImageSource('Ella Rock').url, rating: 4.5, description: 'Scenic hiking destination' }
  ]

  return (
    <section className={cn('sri-lanka-hero relative min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden py-8 sm:py-12', className)}>
      {/* Background Gradient */}
      <div className="sri-lanka-hero-background absolute inset-0 z-0">
        <div className="sri-lanka-hero-gradient w-full h-full bg-gradient-to-br from-primary-900 via-primary-700 to-secondary-600">
          <div className="sri-lanka-hero-overlay absolute inset-0 bg-gray-50"></div>
        </div>
      </div>

      {/* Content */}
      <div className="sri-lanka-hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="sri-lanka-hero-container grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Title, Description, Tags */}
          <div className="sri-lanka-hero-left text-center lg:text-left">
            {/* Main Heading */}
            <h1 className="sri-lanka-hero-title font-heading font-bold text-black mb-4 sm:mb-6 animate-fade-in text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Discover the Pearl of the Indian Ocean
            </h1>
            
            <p className="sri-lanka-hero-subtitle text-base sm:text-lg md:text-xl lg:text-2xl text-black mb-6 sm:mb-8 animate-slide-up px-2 sm:px-0">
              Experience Sri Lanka&apos;s rich culture, stunning landscapes, and warm hospitality
              with government-verified services and transparent pricing.
            </p>

            {/* Popular Destinations */}
            <div className="sri-lanka-hero-popular animate-slide-up">
              <p className="sri-lanka-hero-popular-label text-black mb-3 sm:mb-4 text-sm sm:text-base">Popular destinations:</p>
              <div className="sri-lanka-hero-popular-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {destinations.slice(0, 6).map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => {
                      setSearchQuery(destination.name)
                      setSelectedDestination(destination)
                    }}
                    className="sri-lanka-hero-popular-card  bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 hover:bg-white/20 transition-all duration-300 text-left group"
                  >
                    <div className="sri-lanka-hero-popular-card-content">
                      <div className="sri-lanka-hero-popular-card-image mb-2">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="w-full h-16 object-cover rounded-md"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            const fallbackImage = getImageSource(destination.name, 60, 60).fallback
                            target.src = fallbackImage
                          }}
                        />
                      </div>
                      <div className="sri-lanka-hero-popular-card-info">
                        <h4 className="sri-lanka-hero-popular-card-name text-sm font-medium text-black group-hover:text-accent transition-colors truncate">
                          {destination.name}
                        </h4>
                        <p className="sri-lanka-hero-popular-card-location text-xs text-black flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{destination.location}</span>
                        </p>
                        <div className="sri-lanka-hero-popular-card-rating text-xs text-black flex items-center mt-1">
                          <Star className="h-3 w-3 mr-1 text-accent fill-current" />
                          <span>{destination.rating}</span>
                          <span className="mx-1">•</span>
                          <span className="bg-white/20 text-black px-2 py-0.5 rounded-full text-xs">
                            {destination.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Search Form */}
          <div className="sri-lanka-hero-right mt-6 lg:mt-0">
            <div className="sri-lanka-hero-search bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-strong animate-slide-up">
              <h2 className="sri-lanka-hero-search-title text-xl sm:text-2xl font-heading font-semibold text-neutral-dark-200 mb-4 sm:mb-6">
                Where do you want to go?
              </h2>
              
              <div className="sri-lanka-hero-search-form space-y-4 sm:space-y-6 mb-4 sm:mb-6">
                {/* Destination Search */}
                <div className="sri-lanka-hero-field-group">
                  <label htmlFor="destination-search" className="sri-lanka-hero-field-label block text-sm font-medium text-neutral-dark-200 mb-2">
                    Where do you want to go?
                  </label>
                  <Autocomplete
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSelect={setSelectedDestination}
                    placeholder="Search destinations..."
                    icon={<MapPin className="h-5 w-5" />}
                  />
                </div>

                {/* Date Fields Row */}
                <div className="sri-lanka-hero-field-group">
                  <label className="sri-lanka-hero-field-label block text-sm font-medium text-neutral-dark-200 mb-2">
                    Travel Dates
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Start Date */}
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-dark-100" />
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="sri-lanka-hero-date-input w-full bg-white pl-10 pr-4 py-3 border text-black border-neutral-light-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                      />
                    </div>

                    {/* End Date */}
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-dark-100" />
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="sri-lanka-hero-date-input w-full bg-white pl-10 pr-4 py-3 border text-black border-neutral-light-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Travel Type */}
                <div className="sri-lanka-hero-field-group">
                  <label className="sri-lanka-hero-field-label block text-sm font-medium text-neutral-dark-200 mb-2">
                    Type of Visit
                  </label>
                  <Select
                    options={travelTypes}
                    value={travelType}
                    onChange={setTravelType}
                    placeholder="Select travel type"
                    icon={<Users className="h-5 w-5" />}
                  />
                </div>
              </div>

              {/* Search Button */}
              <Button variant="primary" size="lg" className="sri-lanka-hero-search-button w-full text-sm sm:text-base">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Build My Journey
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="sri-lanka-hero-scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="sri-lanka-hero-scroll-icon w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="sri-lanka-hero-scroll-dot w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export { Hero }

