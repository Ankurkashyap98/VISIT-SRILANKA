import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import PerformanceCard from '../components/PerformanceCard'
import { getImageSource } from '../lib/imageUtils'
import { getImageUrl } from '../lib/utils'
import { 
  Search, 
  MapPin, 
  Star, 
  Shield,
  CheckCircle,
  Grid,
  List
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
  slug: string
  images: Array<{
    id: string
    url: string
    alt: string
  }>
  reviews: Array<{
    id: string
    rating: number
    comment: string
    user: {
      name: string
      image: string
    }
  }>
}

export default function DestinationsPage() {
  const navigate = useNavigate()
  const categories = ['All', 'Historical', 'Religious', 'Adventure', 'Cultural', 'Medical', 'Pilgrimage', 'Wellness', 'Ayurveda', 'Nature', 'Leisure', 'Spiritual']
  const locations = ['All', 'Central Province', 'Kandy', 'Southern Province', 'Colombo', 'Ella']
  
  // Loading states for each destination
  const [loadingStates, setLoadingStates] = useState<Record<string, { view: boolean; book: boolean }>>({})
  
  // State for load more functionality
  const [displayedCount, setDisplayedCount] = useState(6) // Show first 6 destinations
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)
  
  // State for destinations data
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch destinations from API - Optimized with immediate fallback
  useEffect(() => {
    // Set mock data immediately for fast initial render
    setDestinations(getMockDestinations())
    setLoading(false)
    
    // Then fetch from API in background
    const fetchDestinations = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout
        
        const response = await fetch('/api/destinations', { signal: controller.signal })
        clearTimeout(timeoutId)
        
        if (!response.ok) {
          console.error('Failed to fetch destinations:', response.status)
          return // Keep mock data
        }
        
        const text = await response.text()
        if (!text) {
          console.error('Empty response from server')
          return // Keep mock data
        }
        
        const data = JSON.parse(text)
        
        if (data.success && data.destinations && data.destinations.length > 0) {
          // Transform API data to match our interface
          const transformedDestinations = data.destinations.map((dest: any) => {
            const imageSource = getImageSource(dest.name)
            return {
              id: dest.id || dest.slug || Math.random().toString(),
              name: dest.name,
              description: dest.description,
              // Always resolve images via helper so they work in dev + production
              image: imageSource.url,
              location: dest.location,
              rating: dest.rating || 4.5,
              price: dest.price || 0,
              currency: dest.currency || 'USD',
              category: dest.category,
              verified: dest.verified || false,
              governmentApproved: dest.governmentApproved || false,
              highlights: dest.highlights || [],
              slug: dest.slug || dest.name.toLowerCase().replace(/\s+/g, '-'),
              images:
                dest.images ||
                [
                  {
                    id: '1',
                    url: imageSource.url,
                    alt: dest.name,
                  },
                ],
              reviews: dest.reviews || [],
            }
          })
          // Update with API data when it arrives
          setDestinations(transformedDestinations)
        }
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching destinations:', error)
        }
        // Keep mock data on error
      }
    }

    fetchDestinations()
  }, [])

  // Mock data fallback
  const getMockDestinations = (): Destination[] => [
    {
      id: '1',
      name: 'Sigiriya Rock Fortress',
      description: 'Ancient rock fortress and palace ruins with stunning frescoes and panoramic views',
      image: getImageSource('Sigiriya Rock Fortress').url,
      location: 'Central Province',
      rating: 4.8,
      price: 30,
      currency: 'USD',
      category: 'Historical',
      verified: true,
      governmentApproved: true,
      highlights: ['UNESCO World Heritage', 'Ancient Frescoes', 'Panoramic Views'],
      slug: 'sigiriya-rock-fortress',
      images: [
        { id: '1', url: getImageUrl('images/ancient-cityof-polonnaruwa.jpg'), alt: 'Sigiriya Rock Fortress' },
        { id: '2', url: getImageUrl('images/sacred-city-of-kandy.jpg'), alt: 'Sigiriya View' }
      ],
      reviews: []
    },
    {
      id: '2',
      name: 'Sacred City of Kandy',
      description: 'Sacred Buddhist city with the Temple of the Sacred Tooth Relic',
      image: getImageSource('Sacred City of Kandy').url,
      location: 'Kandy',
      rating: 4.9,
      price: 0,
      currency: 'USD',
      category: 'Religious',
      verified: true,
      governmentApproved: true,
      highlights: ['Sacred Relic', 'UNESCO World Heritage', 'Cultural Ceremonies'],
      slug: 'sacred-city-of-kandy',
      images: [
        { id: '1', url: getImageUrl('images/sacred-city-of-kandy.jpg'), alt: 'Sacred City of Kandy' },
        { id: '2', url: getImageUrl('images/sinharaja-forest-reserve.jpg'), alt: 'Kandy Temple' }
      ],
      reviews: []
    },
    {
      id: '3',
      name: 'Sinharaja Forest Reserve',
      description: 'UNESCO World Heritage tropical rainforest with endemic wildlife',
      image: getImageSource('Sinharaja Forest Reserve').url,
      location: 'Southern Province',
      rating: 4.7,
      price: 45,
      currency: 'USD',
      category: 'Adventure',
      verified: true,
      governmentApproved: true,
      highlights: ['Endemic Species', 'Rainforest Trekking', 'Bird Watching'],
      slug: 'sinharaja-forest-reserve',
      images: [
        { id: '1', url: getImageUrl('images/sinharaja-forest-reserve.jpg'), alt: 'Sinharaja Forest Reserve' },
        { id: '2', url: getImageUrl('images/ancient-cityof-polonnaruwa.jpg'), alt: 'Sinharaja Wildlife' }
      ],
      reviews: []
    },
    {
      id: '4',
      name: 'Ancient City of Polonnaruwa',
      description: 'Medieval capital of Sri Lanka with well-preserved archaeological ruins',
      image: getImageSource('Ancient City of Polonnaruwa').url,
      location: 'North Central Province',
      rating: 4.6,
      price: 25,
      currency: 'USD',
      category: 'Historical',
      verified: true,
      governmentApproved: true,
      highlights: ['UNESCO World Heritage', 'Ancient Ruins', 'Archaeological Site'],
      slug: 'ancient-city-of-polonnaruwa',
      images: [
        { id: '1', url: getImageUrl('images/ancient-cityof-polonnaruwa.jpg'), alt: 'Ancient City of Polonnaruwa' },
        { id: '2', url: getImageUrl('images/sacred-city-of-kandy.jpg'), alt: 'Polonnaruwa Ruins' }
      ],
      reviews: []
    },
    {
      id: '5',
      name: 'Ella Rock & Nine Arch Bridge',
      description: 'Scenic mountain views and iconic railway bridge in the hill country',
      image: getImageSource('Ella Rock & Nine Arch Bridge').url,
      location: 'Badulla District',
      rating: 4.5,
      price: 20,
      currency: 'USD',
      category: 'Adventure',
      verified: true,
      governmentApproved: true,
      highlights: ['Mountain Views', 'Railway Heritage', 'Hiking Trails'],
      slug: 'ella-rock-nine-arch-bridge',
      images: [
        { id: '1', url: getImageUrl('images/sinharaja-forest-reserve.jpg'), alt: 'Ella Rock' },
        { id: '2', url: getImageUrl('images/sacred-city-of-kandy.jpg'), alt: 'Nine Arch Bridge' }
      ],
      reviews: []
    },
    {
      id: '6',
      name: 'Yala National Park',
      description: 'Premier wildlife sanctuary with diverse wildlife and stunning landscapes',
      image: getImageSource('Yala National Park').url,
      location: 'Southern Province',
      rating: 4.8,
      price: 60,
      currency: 'USD',
      category: 'Adventure',
      verified: true,
      governmentApproved: true,
      highlights: ['Wildlife Safari', 'Leopard Spotting', 'Bird Watching', 'Elephant Herds'],
      slug: 'yala-national-park',
      images: [
        { id: '1', url: getImageUrl('images/sinharaja-forest-reserve.jpg'), alt: 'Yala National Park' },
        { id: '2', url: getImageUrl('images/ancient-cityof-polonnaruwa.jpg'), alt: 'Yala Wildlife' }
      ],
      reviews: []
    },
    {
      id: '7',
      name: 'Galle Fort',
      description: 'Historic colonial fort with charming architecture and coastal views',
      image: getImageSource('Galle Fort').url,
      location: 'Southern Province',
      rating: 4.7,
      price: 15,
      currency: 'USD',
      category: 'Historical',
      verified: true,
      governmentApproved: true,
      highlights: ['UNESCO World Heritage', 'Colonial Architecture', 'Coastal Views', 'Historic Streets'],
      slug: 'galle-fort',
      images: [
        { id: '1', url: getImageUrl('images/ancient-cityof-polonnaruwa.jpg'), alt: 'Galle Fort' },
        { id: '2', url: getImageUrl('images/sacred-city-of-kandy.jpg'), alt: 'Galle Colonial Architecture' }
      ],
      reviews: []
    },
    {
      id: '8',
      name: 'Temple of the Sacred Tooth Relic',
      description: 'Most sacred Buddhist temple housing the tooth relic of Buddha',
      image: getImageSource('Temple of the Sacred Tooth Relic').url,
      location: 'Kandy',
      rating: 4.9,
      price: 10,
      currency: 'USD',
      category: 'Religious',
      verified: true,
      governmentApproved: true,
      highlights: ['Sacred Relic', 'Buddhist Temple', 'Cultural Heritage', 'Religious Ceremonies'],
      slug: 'temple-sacred-tooth-relic',
      images: [
        { id: '1', url: getImageUrl('images/sacred-city-of-kandy.jpg'), alt: 'Temple of the Sacred Tooth Relic' },
        { id: '2', url: getImageUrl('images/sinharaja-forest-reserve.jpg'), alt: 'Temple Interior' }
      ],
      reviews: []
    }
  ]

  // Handler functions for buttons
  const handleView = async (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: { ...prev[id], view: true } }))
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Navigate to destination detail page
    const destination = destinations.find(d => d.id === id)
    navigate(`/destinations/${destination?.slug || id}`)
    
    setLoadingStates(prev => ({ ...prev, [id]: { ...prev[id], view: false } }))
  }

  const handleBook = async (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: { ...prev[id], book: true } }))
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Navigate to booking page
    navigate(`/booking?destination=${id}`)
    
    setLoadingStates(prev => ({ ...prev, [id]: { ...prev[id], book: false } }))
  }

  const handleFavorite = (id: string) => {
    console.log('Favorite destination:', id)
    // TODO: Implement favorite functionality
  }

  const handleShare = (id: string) => {
    console.log('Share destination:', id)
    // TODO: Implement share functionality
  }

  const handleLoadMore = async () => {
    setLoadMoreLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Load 3 more destinations (or remaining ones)
    setDisplayedCount(prev => Math.min(prev + 3, destinations.length))
    
    setLoadMoreLoading(false)
  }

  // Get destinations to display
  const displayedDestinations = destinations.slice(0, displayedCount)
  const hasMoreDestinations = destinations.length > displayedCount

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-light-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-dark-100">Loading destinations...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Sri Lanka Destinations",
            "description": "Discover the best destinations in Sri Lanka",
            "url": "https://visitsrilanka.gov.lk/destinations",
            "numberOfItems": destinations.length,
            "itemListElement": destinations.slice(0, 10).map((destination, index) => ({
              "@type": "TouristAttraction",
              "position": index + 1,
              "name": destination.name,
              "description": destination.description,
              "url": `https://visitsrilanka.gov.lk/destinations/${destination.slug}`,
              "image": destination.image,
              "location": {
                "@type": "Place",
                "name": destination.location
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": destination.rating,
                "reviewCount": destination.reviews.length
              }
            }))
          })
        }}
      />

      <div className="min-h-screen bg-neutral-light-50">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-neutral-dark-200 mb-4">
              Discover Sri Lanka&apos;s Destinations
            </h1>
            <p className="text-lg text-neutral-dark-100 mb-6">
              Explore the Pearl of the Indian Ocean with our curated selection of destinations
            </p>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="p-4 text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-neutral-dark-200 mb-1">Government Verified</h3>
                <p className="text-sm text-neutral-dark-100">All destinations are government-approved and verified</p>
              </Card>
              <Card className="p-4 text-center">
                <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-neutral-dark-200 mb-1">Top Rated</h3>
                <p className="text-sm text-neutral-dark-100">Highly rated by thousands of visitors</p>
              </Card>
              <Card className="p-4 text-center">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-neutral-dark-200 mb-1">Quality Assured</h3>
                <p className="text-sm text-neutral-dark-100">Premium experiences with guaranteed quality</p>
              </Card>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-dark-100" />
                    <input
                      type="text"
                      placeholder="Search destinations..."
                      className="w-full pl-10 pr-4 py-3 bg-white border text-black border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <select className="w-full px-3 py-3 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    {categories.map(category => (
                      <option key={category} value={category} style={{ color: 'black', backgroundColor: 'white' }}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <select className="w-full px-3 py-3 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    {locations.map(location => (
                      <option key={location} value={location} style={{ color: 'black', backgroundColor: 'white' }}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-neutral-dark-100">
              Showing {displayedDestinations.length} of {destinations.length} destinations
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg bg-primary text-white">
                <Grid className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600">
                <List className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Show Map
              </Button>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedDestinations.map((destination, index) => (
              <PerformanceCard
                key={destination.id}
                id={destination.id}
                title={destination.name}
                description={destination.description}
                image={destination.image}
                location={destination.location}
                rating={destination.rating}
                price={destination.price}
                currency={destination.currency}
                category={destination.category}
                verified={destination.verified}
                governmentApproved={destination.governmentApproved}
                highlights={destination.highlights}
                priority={index < 6}
                onFavorite={handleFavorite}
                onShare={handleShare}
                onBook={handleBook}
                onView={handleView}
                loadingStates={loadingStates[destination.id]}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreDestinations && (
            <div className="text-center mt-8">
              <Button 
                size="lg" 
                onClick={handleLoadMore}
                loading={loadMoreLoading}
                disabled={loadMoreLoading}
              >
                {loadMoreLoading ? 'More options are loading, please wait...' : 'Load More Destinations'}
              </Button>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  )
}
