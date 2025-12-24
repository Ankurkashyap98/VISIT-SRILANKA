import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import PerformanceCard from '../components/PerformanceCard'
import { getImageUrl } from '../lib/utils'
import { 
  Search
} from 'lucide-react'

interface Experience {
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

export default function ExperiencesPage() {
  const categories = ['All', 'Cultural', 'Adventure', 'Wellness', 'Culinary', 'Wildlife', 'Spiritual', 'Medical', 'Educational', 'Photography', 'Nature', 'Sports']
  const locations = ['All', 'Colombo', 'Kandy', 'Galle', 'Ella', 'Nuwara Eliya', 'Trincomalee', 'Jaffna', 'Anuradhapura', 'Polonnaruwa']
  
  // Mock data for now - in production, this would be fetched from API
  const experiences: Experience[] = [
    {
      id: '1',
      name: 'Traditional Sri Lankan Cooking Class',
      description: 'Learn to cook authentic Sri Lankan dishes with local chefs in a traditional kitchen setting.',
      image: getImageUrl('images/ancient-cityof-polonnaruwa.jpg'),
      location: 'Colombo',
      rating: 4.9,
      price: 45,
      currency: 'USD',
      category: 'Culinary',
      duration: '3 hours',
      difficulty: 'Easy',
      maxParticipants: 8,
      highlights: ['Traditional Recipes', 'Local Ingredients', 'Cultural Experience'],
      verified: true,
      governmentApproved: true,
      slug: 'traditional-cooking-class',
      images: [],
      reviews: []
    },
    {
      id: '2',
      name: 'Tea Plantation Tour & Tasting',
      description: 'Explore the lush tea plantations of Nuwara Eliya and learn about the tea-making process.',
      image: getImageUrl('images/sacred-city-of-kandy.jpg'),
      location: 'Nuwara Eliya',
      rating: 4.8,
      price: 35,
      currency: 'USD',
      category: 'Cultural',
      duration: '4 hours',
      difficulty: 'Easy',
      maxParticipants: 12,
      highlights: ['Tea Tasting', 'Plantation Tour', 'Scenic Views'],
      verified: true,
      governmentApproved: true,
      slug: 'tea-plantation-tour',
      images: [],
      reviews: []
    },
    {
      id: '3',
      name: 'Wildlife Safari in Yala National Park',
      description: 'Experience the thrill of spotting leopards, elephants, and other wildlife in their natural habitat.',
      image: getImageUrl('images/sinharaja-forest-reserve.jpg'),
      location: 'Yala',
      rating: 4.7,
      price: 120,
      currency: 'USD',
      category: 'Wildlife',
      duration: '6 hours',
      difficulty: 'Moderate',
      maxParticipants: 6,
      highlights: ['Leopard Spotting', 'Elephant Watching', 'Bird Watching'],
      verified: true,
      governmentApproved: true,
      slug: 'yala-wildlife-safari',
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
            "@type": "ItemList",
            "name": "Sri Lanka Experiences",
            "description": "Discover unique experiences in Sri Lanka",
            "url": "https://visitsrilanka.gov.lk/experiences",
            "numberOfItems": experiences.length,
            "itemListElement": experiences.slice(0, 10).map((experience, index) => ({
              "@type": "TouristAttraction",
              "position": index + 1,
              "name": experience.name,
              "description": experience.description,
              "url": `https://visitsrilanka.gov.lk/experiences/${experience.slug}`,
              "image": experience.image,
              "location": {
                "@type": "Place",
                "name": experience.location
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": experience.rating,
                "reviewCount": experience.reviews.length
              },
              "offers": {
                "@type": "Offer",
                "price": experience.price,
                "priceCurrency": experience.currency
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
              Unique Sri Lankan Experiences
            </h1>
            <p className="text-lg text-neutral-dark-100">
              Immerse yourself in authentic Sri Lankan culture, nature, and traditions
            </p>
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
                  placeholder="Search experiences..."
                      className="w-full pl-10 bg-white text-black pr-4 py-3 border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                  </div>
              </div>
              
              <div>
                  <select className="w-full px-3 bg-white text-black py-3 border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                  <select className="w-full px-3 bg-white text-black py-3 border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
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
              Showing {experiences.length} experiences
            </p>
          </div>
          
          {/* Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((experience, index) => (
              <PerformanceCard
                key={experience.id}
                id={experience.id}
                title={experience.name}
                description={experience.description}
                image={experience.image}
                location={experience.location}
                rating={experience.rating}
                price={experience.price}
                currency={experience.currency}
                category={experience.category}
                verified={experience.verified}
                governmentApproved={experience.governmentApproved}
                highlights={experience.highlights}
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
              Load More Experiences
            </Button>
          </div>
        </div>

      <Footer />
    </div>
    </>
  )
}
