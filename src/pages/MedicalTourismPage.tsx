import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import PerformanceCard from '../components/PerformanceCard'
import { MedicalServiceDetailModal } from '../components/MedicalServiceDetailModal'
import { BookingModal } from '../components/BookingModal'
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
  
  // State for managing displayed services
  const [displayedCount, setDisplayedCount] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  
  // State for modals
  const [selectedService, setSelectedService] = useState<MedicalService | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  
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
    },
    {
      id: '4',
      name: 'Cardiac Bypass Surgery',
      description: 'Advanced cardiac procedures performed by internationally trained cardiothoracic surgeons.',
      image: getImageUrl('images/ancient-cityof-polonnaruwa.jpg'),
      location: 'Colombo',
      rating: 4.9,
      price: 8500,
      currency: 'USD',
      category: 'Cardiology',
      duration: '10-14 days',
      difficulty: 'High',
      maxParticipants: 1,
      highlights: ['International Surgeons', 'State-of-the-art Equipment', 'Post-op Care'],
      verified: true,
      governmentApproved: true,
      hospital: 'National Hospital of Sri Lanka',
      doctor: 'Dr. Nimal Perera',
      specialization: 'Cardiothoracic Surgery',
      slug: 'cardiac-bypass-surgery',
      images: [],
      reviews: []
    },
    {
      id: '5',
      name: 'Knee Replacement Surgery',
      description: 'Total knee replacement with advanced prosthetics and comprehensive rehabilitation.',
      image: getImageUrl('images/sacred-city-of-kandy.jpg'),
      location: 'Kandy',
      rating: 4.8,
      price: 5500,
      currency: 'USD',
      category: 'Orthopedics',
      duration: '7-10 days',
      difficulty: 'Moderate',
      maxParticipants: 1,
      highlights: ['Advanced Prosthetics', 'Expert Surgeons', 'Rehabilitation Program'],
      verified: true,
      governmentApproved: true,
      hospital: 'Kandy General Hospital',
      doctor: 'Dr. Chaminda Silva',
      specialization: 'Orthopedic Surgery',
      slug: 'knee-replacement-surgery',
      images: [],
      reviews: []
    },
    {
      id: '6',
      name: 'LASIK Eye Surgery',
      description: 'Laser vision correction surgery using the latest technology for perfect vision.',
      image: getImageUrl('images/sinharaja-forest-reserve.jpg'),
      location: 'Colombo',
      rating: 4.9,
      price: 1500,
      currency: 'USD',
      category: 'Ophthalmology',
      duration: '2-3 days',
      difficulty: 'Moderate',
      maxParticipants: 1,
      highlights: ['Latest Technology', 'Quick Recovery', 'High Success Rate'],
      verified: true,
      governmentApproved: true,
      hospital: 'Colombo Eye Hospital',
      doctor: 'Dr. Anjali Wickramasinghe',
      specialization: 'Refractive Surgery',
      slug: 'lasik-eye-surgery',
      images: [],
      reviews: []
    },
    {
      id: '7',
      name: 'Spa & Wellness Package',
      description: 'Luxury spa treatments and wellness programs in a tropical paradise setting.',
      image: getImageUrl('images/ancient-cityof-polonnaruwa.jpg'),
      location: 'Galle',
      rating: 4.6,
      price: 600,
      currency: 'USD',
      category: 'Spa',
      duration: '3-5 days',
      difficulty: 'Easy',
      maxParticipants: 15,
      highlights: ['Luxury Spa', 'Tropical Setting', 'Holistic Wellness'],
      verified: true,
      governmentApproved: true,
      hospital: 'Galle Wellness Resort',
      doctor: 'Dr. Sunil Mendis',
      specialization: 'Wellness Medicine',
      slug: 'spa-wellness-package',
      images: [],
      reviews: []
    },
    {
      id: '8',
      name: 'Physical Rehabilitation Program',
      description: 'Comprehensive rehabilitation services for post-surgical recovery and injury treatment.',
      image: getImageUrl('images/sacred-city-of-kandy.jpg'),
      location: 'Colombo',
      rating: 4.7,
      price: 1200,
      currency: 'USD',
      category: 'Rehabilitation',
      duration: '7-14 days',
      difficulty: 'Moderate',
      maxParticipants: 10,
      highlights: ['Expert Therapists', 'Modern Equipment', 'Personalized Programs'],
      verified: true,
      governmentApproved: true,
      hospital: 'Colombo Rehabilitation Center',
      doctor: 'Dr. Kamani Jayasuriya',
      specialization: 'Physical Medicine',
      slug: 'physical-rehabilitation-program',
      images: [],
      reviews: []
    },
    {
      id: '9',
      name: 'IVF Fertility Treatment',
      description: 'Advanced fertility treatments with high success rates and compassionate care.',
      image: getImageUrl('images/sinharaja-forest-reserve.jpg'),
      location: 'Colombo',
      rating: 4.8,
      price: 4500,
      currency: 'USD',
      category: 'Fertility',
      duration: '14-21 days',
      difficulty: 'Moderate',
      maxParticipants: 1,
      highlights: ['High Success Rate', 'Expert Team', 'Compassionate Care'],
      verified: true,
      governmentApproved: true,
      hospital: 'Colombo Fertility Center',
      doctor: 'Dr. Rukmal Perera',
      specialization: 'Reproductive Medicine',
      slug: 'ivf-fertility-treatment',
      images: [],
      reviews: []
    },
    {
      id: '10',
      name: 'Cancer Treatment Package',
      description: 'Comprehensive oncology services with modern chemotherapy and radiation facilities.',
      image: getImageUrl('images/ancient-cityof-polonnaruwa.jpg'),
      location: 'Colombo',
      rating: 4.9,
      price: 12000,
      currency: 'USD',
      category: 'Oncology',
      duration: '21-30 days',
      difficulty: 'High',
      maxParticipants: 1,
      highlights: ['Modern Facilities', 'Expert Oncologists', 'Comprehensive Care'],
      verified: true,
      governmentApproved: true,
      hospital: 'National Cancer Institute',
      doctor: 'Dr. Nalini Fernando',
      specialization: 'Medical Oncology',
      slug: 'cancer-treatment-package',
      images: [],
      reviews: []
    },
    {
      id: '11',
      name: 'Dental Veneers & Whitening',
      description: 'Cosmetic dental procedures for a perfect smile with advanced techniques.',
      image: getImageUrl('images/sacred-city-of-kandy.jpg'),
      location: 'Negombo',
      rating: 4.7,
      price: 800,
      currency: 'USD',
      category: 'Dental',
      duration: '3-5 days',
      difficulty: 'Easy',
      maxParticipants: 1,
      highlights: ['Advanced Techniques', 'Quick Results', 'Affordable Prices'],
      verified: true,
      governmentApproved: true,
      hospital: 'Negombo Dental Clinic',
      doctor: 'Dr. Tharindu Bandara',
      specialization: 'Cosmetic Dentistry',
      slug: 'dental-veneers-whitening',
      images: [],
      reviews: []
    },
    {
      id: '12',
      name: 'Hair Transplant Surgery',
      description: 'Advanced FUE hair transplant procedures with natural-looking results.',
      image: getImageUrl('images/sinharaja-forest-reserve.jpg'),
      location: 'Colombo',
      rating: 4.8,
      price: 2800,
      currency: 'USD',
      category: 'Cosmetic',
      duration: '3-5 days',
      difficulty: 'Moderate',
      maxParticipants: 1,
      highlights: ['FUE Technique', 'Natural Results', 'Expert Surgeons'],
      verified: true,
      governmentApproved: true,
      hospital: 'Colombo Hair Restoration Center',
      doctor: 'Dr. Ashan Pathirana',
      specialization: 'Hair Restoration',
      slug: 'hair-transplant-surgery',
      images: [],
      reviews: []
    },
    {
      id: '13',
      name: 'Traditional Ayurvedic Panchakarma',
      description: 'Complete detoxification and rejuvenation through traditional Panchakarma therapy.',
      image: getImageUrl('images/ancient-cityof-polonnaruwa.jpg'),
      location: 'Kandy',
      rating: 4.9,
      price: 1000,
      currency: 'USD',
      category: 'Ayurveda',
      duration: '14-21 days',
      difficulty: 'Easy',
      maxParticipants: 12,
      highlights: ['Traditional Therapy', 'Complete Detox', 'Rejuvenation'],
      verified: true,
      governmentApproved: true,
      hospital: 'Kandy Ayurvedic Institute',
      doctor: 'Dr. Soma Perera',
      specialization: 'Ayurvedic Medicine',
      slug: 'traditional-ayurvedic-panchakarma',
      images: [],
      reviews: []
    },
    {
      id: '14',
      name: 'Hip Replacement Surgery',
      description: 'Total hip replacement with advanced materials and expert surgical care.',
      image: getImageUrl('images/sacred-city-of-kandy.jpg'),
      location: 'Colombo',
      rating: 4.8,
      price: 6000,
      currency: 'USD',
      category: 'Orthopedics',
      duration: '7-10 days',
      difficulty: 'High',
      maxParticipants: 1,
      highlights: ['Advanced Materials', 'Expert Care', 'Quick Recovery'],
      verified: true,
      governmentApproved: true,
      hospital: 'Colombo Orthopedic Hospital',
      doctor: 'Dr. Chaminda Silva',
      specialization: 'Orthopedic Surgery',
      slug: 'hip-replacement-surgery',
      images: [],
      reviews: []
    },
    {
      id: '15',
      name: 'Cataract Surgery',
      description: 'Advanced cataract removal with premium intraocular lens implantation.',
      image: getImageUrl('images/sinharaja-forest-reserve.jpg'),
      location: 'Galle',
      rating: 4.9,
      price: 1200,
      currency: 'USD',
      category: 'Ophthalmology',
      duration: '1-2 days',
      difficulty: 'Moderate',
      maxParticipants: 1,
      highlights: ['Premium Lenses', 'Quick Procedure', 'High Success Rate'],
      verified: true,
      governmentApproved: true,
      hospital: 'Galle Eye Hospital',
      doctor: 'Dr. Anjali Wickramasinghe',
      specialization: 'Cataract Surgery',
      slug: 'cataract-surgery',
      images: [],
      reviews: []
    }
  ]
  
  // Handle load more button click
  const handleLoadMore = () => {
    setIsLoading(true)
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + 6, medicalServices.length))
      setIsLoading(false)
    }, 500)
  }
  
  // Handle view button click
  const handleView = (id: string) => {
    const service = medicalServices.find(s => s.id === id)
    if (service) {
      setSelectedService(service)
      setIsDetailModalOpen(true)
    }
  }
  
  // Handle book button click
  const handleBook = (id: string) => {
    const service = medicalServices.find(s => s.id === id)
    if (service) {
      setSelectedService(service)
      setIsBookingModalOpen(true)
    }
  }
  
  // Get services to display
  const displayedServices = medicalServices.slice(0, displayedCount)
  const hasMore = displayedCount < medicalServices.length

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

      <div className="min-h-screen bg-gray-50">
      <Navbar />
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-black mb-4">
              Medical Tourism in Sri Lanka
            </h1>
            <p className="text-lg text-black mb-6">
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
                      className="w-full pl-10 pr-4 py-3 bg-white/20 text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <select className="w-full px-3 bg-white text-black border py-3 border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
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
            <p className="text-black">
              Showing {displayedServices.length} of {medicalServices.length} medical services
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedServices.map((service, index) => (
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
                onBook={handleBook}
                onView={handleView}
              />
            ))}
              </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-8">
              <Button 
                size="lg" 
                onClick={handleLoadMore}
                loading={isLoading}
                loadingText="Loading..."
              >
                Load More Services
              </Button>
            </div>
          )}
        </div>

      <Footer />
    </div>

      {/* Medical Service Detail Modal */}
      <MedicalServiceDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedService(null)
        }}
        service={selectedService}
        onBook={handleBook}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false)
          setSelectedService(null)
        }}
        service={selectedService}
      />
    </>
  )
}
