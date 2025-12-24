import React, { memo, useCallback, useState } from 'react'
import { Card } from './Card'
import { Button } from './Button'
import { Heart, Share2, MapPin, Star, Clock, Users } from 'lucide-react'

interface PerformanceCardProps {
  id: string
  title: string
  description: string
  image: string
  location?: string
  rating?: number
  price?: number
  currency?: string
  duration?: string
  maxParticipants?: number
  category?: string
  verified?: boolean
  governmentApproved?: boolean
  highlights?: string[]
  onFavorite?: (id: string) => void
  onShare?: (id: string) => void
  onBook?: (id: string) => void
  onView?: (id: string) => void
  className?: string
  priority?: boolean
  loadingStates?: { view: boolean; book: boolean }
}

const PerformanceCard = memo(function PerformanceCard({
  id,
  title,
  description,
  image,
  location,
  rating,
  price,
  currency = 'USD',
  duration,
  maxParticipants,
  category,
  verified = false,
  highlights = [],
  onFavorite,
  onShare,
  onBook,
  onView,
  className = '',
  loadingStates
}: PerformanceCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  const handleFavorite = useCallback(() => {
    setIsFavorited(prev => !prev)
    onFavorite?.(id)
  }, [id, onFavorite])

  const handleShare = useCallback(() => {
    onShare?.(id)
  }, [id, onShare])

  const handleBook = useCallback(() => {
    onBook?.(id)
  }, [id, onBook])

  const handleView = useCallback(() => {
    onView?.(id)
  }, [id, onView])

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="relative">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay Actions */}
          <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-full shadow-md transition-colors ${
                isFavorited 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-red-50'
              }`}
              aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:bg-blue-50 transition-colors"
              aria-label="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          {/* Verification Badge */}
          {verified && (
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
              Verified
            </div>
          )}

          {/* Category Badge */}
          {category && (
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              {category}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-neutral-dark-200 mb-2 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-neutral-dark-100 text-sm mb-3 line-clamp-2">
            {description}
          </p>

          {/* Location */}
          {location && (
            <div className="flex items-center text-sm text-neutral-dark-100 mb-2">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          )}

          {/* Rating */}
          {rating && (
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          )}

          {/* Duration and Participants */}
          <div className="flex items-center space-x-4 text-sm text-neutral-dark-100 mb-3">
            {duration && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{duration}</span>
              </div>
            )}
            {maxParticipants && (
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{maxParticipants} max</span>
              </div>
            )}
          </div>

          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {highlights.slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                >
                  {highlight}
                </span>
              ))}
              {highlights.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  +{highlights.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            {price !== undefined && (
              <div className="text-lg font-bold text-primary">
                {currency} {price}
              </div>
            )}
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleView}
                loading={loadingStates?.view}
                disabled={loadingStates?.view || loadingStates?.book}
              >
                {loadingStates?.view ? 'Loading...' : 'View'}
              </Button>
              <Button
                size="sm"
                onClick={handleBook}
                loading={loadingStates?.book}
                disabled={loadingStates?.view || loadingStates?.book}
              >
                {loadingStates?.book ? 'Booking...' : 'Book'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
})

export default PerformanceCard

