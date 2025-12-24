import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import {
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  Share2,
  Shield,
  CheckCircle,
} from 'lucide-react'

interface Review {
  id: string
  rating: number
  comment: string
  user: {
    name: string
    image: string
  }
  date: string
}

interface DestinationDetail {
  id: string
  name: string
  description: string
  longDescription: string
  image: string
  images: string[]
  location: string
  rating: number
  price: number
  currency: string
  category: string
  verified: boolean
  governmentApproved: boolean
  highlights: string[]
  features: string[]
  bestTimeToVisit: string
  duration: string
  maxParticipants: number
  reviews: Review[]
  slug: string
}

// Static destination data migrated from Next.js page
const destinations: Record<string, DestinationDetail> = {
  'sigiriya-rock-fortress': {
    id: '1',
    name: 'Sigiriya Rock Fortress',
    description:
      'Ancient rock fortress and palace ruins with stunning frescoes and panoramic views',
    longDescription:
      'Sigiriya, also known as the Lion Rock, is an ancient rock fortress located in the central Matale District near the town of Dambulla in the Central Province, Sri Lanka. The name refers to a site of historical and archaeological significance that is dominated by a massive column of rock nearly 200 metres (660 ft) high.',
    image: getImageUrl('images/srilanka-destination1.jpg'),
    images: [
      getImageUrl('images/srilanka-destination1.jpg'),
      getImageUrl('images/srilanka-destination2.jpg'),
      getImageUrl('images/placeholder-img1.jpg'),
    ],
    location: 'Central Province',
    rating: 4.8,
    price: 30,
    currency: 'USD',
    category: 'Historical',
    verified: true,
    governmentApproved: true,
    highlights: ['UNESCO World Heritage', 'Ancient Frescoes', 'Panoramic Views', 'Lion Gate'],
    features: [
      'Ancient rock fortress dating back to 5th century',
      'World-famous frescoes of the Sigiriya maidens',
      'Remains of the royal palace on the summit',
      'Extensive water gardens and fountains',
      'Mirror wall with ancient graffiti',
    ],
    bestTimeToVisit: 'December to March (dry season)',
    duration: '3-4 hours',
    maxParticipants: 20,
    reviews: [
      {
        id: '1',
        rating: 5,
        comment:
          'Absolutely breathtaking views and incredible history. The climb is worth every step!',
        user: { name: 'Sarah Johnson', image: '/images/placeholder-img1.jpg' },
        date: '2024-01-15',
      },
      {
        id: '2',
        rating: 4,
        comment:
          'Amazing historical site with great views. Can get crowded during peak hours.',
        user: { name: 'Mike Chen', image: '/images/placeholder-img2.jpg' },
        date: '2024-01-10',
      },
    ],
    slug: 'sigiriya-rock-fortress',
  },
  'sacred-city-of-kandy': {
    id: '2',
    name: 'Sacred City of Kandy',
    description: 'Sacred Buddhist city with the Temple of the Sacred Tooth Relic',
    longDescription:
      'Kandy is a major city in Sri Lanka located in the Central Province. It was the last capital of the ancient kings era of Sri Lanka. The city lies in the midst of hills in the Kandy plateau, which crosses an area of tropical plantations, mainly tea.',
    image: getImageUrl('images/sacred-city-of-kandy.jpg'),
    images: [
      getImageUrl('images/sacred-city-of-kandy.jpg'),
      getImageUrl('images/srilanka-destination3.jpg'),
      getImageUrl('images/placeholder-img1.jpg'),
    ],
    location: 'Kandy',
    rating: 4.9,
    price: 0,
    currency: 'USD',
    category: 'Religious',
    verified: true,
    governmentApproved: true,
    highlights: [
      'Sacred Relic',
      'UNESCO World Heritage',
      'Cultural Ceremonies',
      'Royal Palace',
    ],
    features: [
      'Temple of the Sacred Tooth Relic',
      'Kandy Lake and surrounding gardens',
      'Traditional Kandyan dance performances',
      'Royal Palace complex',
      'Peradeniya Botanical Gardens nearby',
    ],
    bestTimeToVisit: 'August (Esala Perahera festival)',
    duration: '2-3 hours',
    maxParticipants: 50,
    reviews: [
      {
        id: '3',
        rating: 5,
        comment: 'Spiritual and peaceful place. The temple architecture is magnificent.',
        user: { name: 'Priya Sharma', image: getImageUrl('images/placeholder-img1.jpg') },
        date: '2024-01-12',
      },
    ],
    slug: 'sacred-city-of-kandy',
  },
  'sinharaja-forest-reserve': {
    id: '3',
    name: 'Sinharaja Forest Reserve',
    description: 'UNESCO World Heritage tropical rainforest with endemic wildlife',
    longDescription:
      'Sinharaja Forest Reserve is a forest reserve and a biodiversity hotspot in Sri Lanka. It is of international significance and has been designated a Biosphere Reserve and World Heritage Site by UNESCO.',
    image: getImageUrl('images/sinharaja-forest-reserve.jpg'),
    images: [
      getImageUrl('images/sinharaja-forest-reserve.jpg'),
      getImageUrl('images/srilanka-destination4.jpg'),
      getImageUrl('images/placeholder-img1.jpg'),
    ],
    location: 'Southern Province',
    rating: 4.7,
    price: 45,
    currency: 'USD',
    category: 'Adventure',
    verified: true,
    governmentApproved: true,
    highlights: ['Endemic Species', 'Rainforest Trekking', 'Bird Watching', 'Biodiversity Hotspot'],
    features: [
      'Home to over 50% of Sri Lankan endemic species',
      'Guided nature trails and bird watching',
      'Waterfalls and natural pools',
      'Research station and visitor center',
      'Camping facilities available',
    ],
    bestTimeToVisit: 'December to April (dry season)',
    duration: 'Full day',
    maxParticipants: 15,
    reviews: [
      {
        id: '4',
        rating: 5,
        comment: 'Incredible biodiversity and pristine nature. Perfect for nature lovers!',
        user: { name: 'David Wilson', image: '/images/placeholder-img2.jpg' },
        date: '2024-01-08',
      },
    ],
    slug: 'sinharaja-forest-reserve',
  },
  'ancient-city-of-polonnaruwa': {
    id: '4',
    name: 'Ancient City of Polonnaruwa',
    description: 'Medieval capital of Sri Lanka with well-preserved archaeological ruins',
    longDescription:
      'Polonnaruwa was the second capital of Sri Lanka after the destruction of Anuradhapura in 993. It comprises the Brahmanic monuments built by the Cholas and the ruins of the fabulous garden-city created by Parakramabahu I in the 12th century.',
    image: getImageUrl('images/ancient-cityof-polonnaruwa.jpg'),
    images: [
      getImageUrl('images/ancient-cityof-polonnaruwa.jpg'),
      getImageUrl('images/srilanka-destination5.jpg'),
      getImageUrl('images/placeholder-img1.jpg'),
    ],
    location: 'North Central Province',
    rating: 4.6,
    price: 25,
    currency: 'USD',
    category: 'Historical',
    verified: true,
    governmentApproved: true,
    highlights: [
      'UNESCO World Heritage',
      'Ancient Ruins',
      'Archaeological Site',
      'Medieval Capital',
    ],
    features: [
      'Well-preserved archaeological ruins from 10th-12th centuries',
      'Gal Vihara rock temple with massive Buddha statues',
      'Royal palace complex and council chamber',
      'Sacred quadrangle with ancient temples',
      'Parakrama Samudra - ancient reservoir',
    ],
    bestTimeToVisit: 'November to March (dry season)',
    duration: 'Half day',
    maxParticipants: 25,
    reviews: [
      {
        id: '5',
        rating: 4,
        comment:
          'Fascinating historical site with well-preserved ruins. Great for history enthusiasts.',
        user: { name: 'Emma Thompson', image: '/images/placeholder-img2.jpg' },
        date: '2024-01-05',
      },
    ],
    slug: 'ancient-city-of-polonnaruwa',
  },
  'ella-rock-nine-arch-bridge': {
    id: '5',
    name: 'Ella Rock & Nine Arch Bridge',
    description: 'Scenic mountain views and iconic railway bridge in the hill country',
    longDescription:
      'Ella is a small mountain town in the Badulla District of Sri Lanka. It is known for its scenic beauty, cool climate, and the famous Nine Arch Bridge. The area offers spectacular views of the surrounding mountains and tea plantations.',
    image: getImageUrl('images/srilanka-destination6.jpg'),
    images: [
      getImageUrl('images/srilanka-destination6.jpg'),
      getImageUrl('images/srilanka-destination7.jpg'),
      getImageUrl('images/placeholder-img1.jpg'),
    ],
    location: 'Badulla District',
    rating: 4.5,
    price: 20,
    currency: 'USD',
    category: 'Adventure',
    verified: true,
    governmentApproved: true,
    highlights: [
      'Mountain Views',
      'Railway Heritage',
      'Hiking Trails',
      'Tea Plantations',
    ],
    features: [
      'Nine Arch Bridge - iconic railway bridge',
      'Ella Rock hiking trail with panoramic views',
      "Little Adam's Peak for easier hiking",
      'Tea plantation tours and experiences',
      'Railway station and train rides',
    ],
    bestTimeToVisit: 'December to March (dry season)',
    duration: 'Full day',
    maxParticipants: 12,
    reviews: [
      {
        id: '6',
        rating: 5,
        comment: 'Absolutely stunning views! The Nine Arch Bridge is a must-see.',
        user: { name: 'James Wilson', image: '/images/placeholder-img2.jpg' },
        date: '2024-01-03',
      },
    ],
    slug: 'ella-rock-nine-arch-bridge',
  },
}

import { getImageUrl } from '../lib/utils'

export default function DestinationDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const [isFavorited, setIsFavorited] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [bookingLoading, setBookingLoading] = useState(false)

  const destination = slug ? destinations[slug] : undefined

  if (!destination) {
    return (
      <div className="min-h-screen bg-neutral-light-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold text-neutral-dark-200">
            Destination Not Found
          </h1>
          <p className="mb-8 text-neutral-dark-100">
            The destination you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const handleBook = async () => {
    setBookingLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    navigate(`/booking?destination=${destination.id}`)
    setBookingLoading(false)
  }

  const handleFavorite = () => {
    setIsFavorited((prev) => !prev)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: destination.name,
        text: destination.description,
        url: window.location.href,
      })
    } else if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const mainImage = destination.images[selectedImage] || destination.image

  return (
    <div className="min-h-screen bg-neutral-light-50">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Destinations
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center space-x-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                  {destination.category}
                </span>
                {destination.verified && (
                  <div className="flex items-center text-green-600">
                    <Shield className="mr-1 h-4 w-4" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                )}
              </div>
              <h1 className="mb-2 text-3xl font-bold text-neutral-dark-200">
                {destination.name}
              </h1>
              <div className="flex items-center space-x-4 text-neutral-dark-100">
                <div className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>{destination.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 text-yellow-500" />
                  <span>{destination.rating}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFavorite}
                className={isFavorited ? 'border-red-500 text-red-500' : ''}
              >
                <Heart
                  className={`mr-2 h-4 w-4 ${isFavorited ? 'fill-current' : ''}`}
                />
                {isFavorited ? 'Favorited' : 'Favorite'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Image Gallery */}
            <Card className="overflow-hidden p-0">
              <div className="relative aspect-video">
                <img
                  src={getImageUrl(mainImage)}
                  alt={destination.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {destination.images.map((img, index) => (
                    <button
                      key={img + index}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-12 w-16 overflow-hidden rounded-lg border-2 ${
                        selectedImage === index ? 'border-primary' : 'border-white'
                      }`}
                    >
                      <img
                        src={getImageUrl(img)}
                        alt={`${destination.name} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card>
              <h2 className="mb-4 text-xl font-semibold">About This Destination</h2>
              <p className="mb-4 leading-relaxed text-neutral-dark-100">
                {destination.description}
              </p>
              <p className="leading-relaxed text-neutral-dark-100">
                {destination.longDescription}
              </p>
            </Card>

            {/* Features */}
            <Card>
              <h2 className="mb-4 text-xl font-semibold">Key Features</h2>
              <ul className="space-y-2">
                {destination.features.map((feature, index) => (
                  <li key={feature + index} className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-neutral-dark-100">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Reviews */}
            <Card>
              <h2 className="mb-4 text-xl font-semibold">Reviews</h2>
              <div className="space-y-4">
                {destination.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={getImageUrl(review.user.image)}
                          alt={review.user.name}
                          className="mr-3 h-10 w-10 rounded-full"
                          width={40}
                          height={40}
                        />
                        <div>
                          <h4 className="font-medium text-neutral-dark-200">
                            {review.user.name}
                          </h4>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={`${review.id}-star-${i}`}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-current text-yellow-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-neutral-dark-100">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-neutral-dark-100">{review.comment}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card>
              <div className="mb-4 text-center">
                <div className="mb-1 text-3xl font-bold text-primary">
                  {destination.price === 0
                    ? 'Free'
                    : `${destination.currency} ${destination.price}`}
                </div>
                <div className="text-neutral-dark-100">per person</div>
              </div>

              <Button
                size="lg"
                className="mb-4 w-full"
                onClick={handleBook}
                loading={bookingLoading}
                disabled={bookingLoading}
              >
                {bookingLoading ? 'Processing...' : 'Book Now'}
              </Button>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-dark-100">Duration</span>
                  <span className="font-medium">{destination.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-dark-100">Max Participants</span>
                  <span className="font-medium">{destination.maxParticipants}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-dark-100">Best Time</span>
                  <span className="text-right font-medium">
                    {destination.bestTimeToVisit}
                  </span>
                </div>
              </div>
            </Card>

            {/* Highlights */}
            <Card>
              <h3 className="mb-3 font-semibold">Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {destination.highlights.map((highlight, index) => (
                  <span
                    key={highlight + index}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </Card>

            {/* Government Approval */}
            {destination.governmentApproved && (
              <Card className="border-green-200 bg-green-50">
                <div className="flex items-center text-green-700">
                  <Shield className="mr-2 h-5 w-5" />
                  <span className="font-medium">Government Approved</span>
                </div>
                <p className="mt-1 text-sm text-green-600">
                  This destination is verified and approved by the Sri Lankan Tourism
                  Authority.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

