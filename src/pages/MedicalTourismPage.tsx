import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import PerformanceCard from '../components/PerformanceCard'
import { getImageUrl } from '../lib/utils'
import { 
  Search, 
  DollarSign, 
  Shield,
  Award
} from 'lucide-react'

interface MedicalService {
  id: string
  name: string
  description: string
  image: string
  location: string
  rating: number
  price: number
  currency: string
  category: string
  duration: string
  difficulty: string
  maxParticipants: number
  highlights: string[]
  verified: boolean
  governmentApproved: boolean
  hospital: string
  doctor: string
  specialization: string
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

export default function MedicalTourismPage() {
  const categories = ['All', 'Dental', 'Cosmetic', 'Cardiology', 'Orthopedics', 'Ophthalmology', 'Wellness', 'Ayurveda', 'Spa', 'Rehabilitation', 'Fertility', 'Oncology']
  const locations = ['All', 'Colombo', 'Kandy', 'Galle', 'Negombo', 'Kurunegala', 'Anuradhapura', 'Jaffna', 'Batticaloa', 'Trincomalee']
  
  // Mock data for now - in production, this would be fetched from API
  const medicalServices: MedicalService[] = [
    {
      id: '1',
      name: 'Dental Implant Surgery',
      description: 'High-quality dental implant surgery with advanced technology and experienced specialists.',
      image: getImageUrl('images/ancient-cityof-polonnaruwa.jpg'),
      location: 'Colombo',
      rating: 4.9,
      price: 1200,
      currency: 'USD',
      category: 'Dental',
      duration: '2-3 days',
      difficulty: 'Moderate',
      maxParticipants: 1,
      highlights: ['Advanced Technology', 'Experienced Specialists', 'Quick Recovery'],
      verified: true,
      governmentApproved: true,
      hospital: 'Colombo Dental Hospital',
      doctor: 'Dr. Priya Fernando',
      specialization: 'Oral & Maxillofacial Surgery',
      slug: 'dental-implant-surgery',
      images: [],
      reviews: []
    },
    {
      id: '2',
      name: 'Cosmetic Surgery Package',
      description: 'Comprehensive cosmetic surgery procedures with world-class facilities and expert surgeons.',
      image: getImageUrl('images/sacred-city-of-kandy.jpg'),
      location: 'Colombo',
      rating: 4.8,
      price: 3500,
      currency: 'USD',
      category: 'Cosmetic',
      duration: '7-10 days',
      difficulty: 'High',
      maxParticipants: 1,
      highlights: ['World-class Facilities', 'Expert Surgeons', 'Comprehensive Care'],
      verified: true,
      governmentApproved: true,
      hospital: 'Sri Lanka Cosmetic Center',
      doctor: 'Dr. Rajesh Kumar',
      specialization: 'Plastic & Reconstructive Surgery',
      slug: 'cosmetic-surgery-package',
      images: [],
      reviews: []
    },
    {
      id: '3',
      name: 'Ayurvedic Wellness Retreat',
      description: 'Traditional Ayurvedic treatments and wellness programs in a serene environment.',
      image: getImageUrl('images/sinharaja-forest-reserve.jpg'),
      location: 'Kandy',
      rating: 4.7,
      price: 800,
      currency: 'USD',
      category: 'Ayurveda',
      duration: '5-7 days',
      difficulty: 'Easy',
      maxParticipants: 20,
      highlights: ['Traditional Treatments', 'Serene Environment', 'Holistic Approach'],
      verified: true,
      governmentApproved: true,
      hospital: 'Kandy Ayurvedic Center',
      doctor: 'Dr. Soma Perera',
      specialization: 'Ayurvedic Medicine',
      slug: 'ayurvedic-wellness-retreat',
      images: [],
      reviews: []
    }
  ]

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Sri Lanka Medical Tourism",
            "description": "World-class medical care in Sri Lanka",
            "url": "https://visitsrilanka.gov.lk/medical-tourism",
            "location": {
              "@type": "Place",
              "name": "Sri Lanka",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "LK"
              }
            },
            "medicalSpecialty": [
              "Dental Care",
              "Cosmetic Surgery",
              "Cardiology",
              "Orthopedics",
              "Ophthalmology",
              "Wellness",
              "Ayurveda"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Medical Services",
              "itemListElement": medicalServices.slice(0, 10).map((service, index) => ({
                "@type": "Offer",
                "position": index + 1,
                "name": service.name,
                "description": service.description,
                "price": service.price,
                "priceCurrency": service.currency
              }))
            }
          })
        }}
      />

      <div className="min-h-screen bg-neutral-light-50">
      <Navbar />
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-neutral-dark-200 mb-4">
              Medical Tourism in Sri Lanka
            </h1>
            <p className="text-lg text-neutral-dark-100 mb-6">
              Access world-class healthcare at affordable prices with government-verified medical facilities
            </p>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="p-4 text-center">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-neutral-dark-200 mb-1">World-Class Quality</h3>
                <p className="text-sm text-neutral-dark-100">Internationally certified hospitals and specialists</p>
              </Card>
              <Card className="p-4 text-center">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-neutral-dark-200 mb-1">Affordable Prices</h3>
                <p className="text-sm text-neutral-dark-100">Up to 70% savings compared to Western countries</p>
              </Card>
              <Card className="p-4 text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-neutral-dark-200 mb-1">Government Verified</h3>
                <p className="text-sm text-neutral-dark-100">All facilities are government-approved and verified</p>
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
                      placeholder="Search medical services..."
                      className="w-full pl-10 pr-4 py-3 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <select className="w-full px-3 py-3 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <select className="w-full px-3 py-3 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
              </Card>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-neutral-dark-100">
              Showing {medicalServices.length} medical services
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicalServices.map((service, index) => (
              <PerformanceCard
                key={service.id}
                id={service.id}
                title={service.name}
                description={service.description}
                image={service.image}
                location={service.location}
                rating={service.rating}
                price={service.price}
                currency={service.currency}
                category={service.category}
                verified={service.verified}
                governmentApproved={service.governmentApproved}
                highlights={service.highlights}
                priority={index < 6}
                onFavorite={(id) => console.log('Favorite:', id)}
                onShare={(id) => console.log('Share:', id)}
                onBook={(id) => console.log('Book:', id)}
                onView={(id) => console.log('View:', id)}
              />
            ))}
              </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <Button size="lg">
              Load More Services
            </Button>
          </div>
        </div>

      <Footer />
    </div>
    </>
  )
}
