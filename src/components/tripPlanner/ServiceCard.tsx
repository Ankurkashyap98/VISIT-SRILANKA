import React, { useState } from 'react'
import { Card } from '../Card'
import { Star, MapPin, Clock, Image as ImageIcon } from 'lucide-react'
import { getImageUrl } from '../../lib/utils'

interface ServiceCardProps {
  id: string
  name: string
  description: string
  image: string
  price: number
  rating: number
  location: string
  duration?: string
  amenities?: string[]
  highlights?: string[]
  category?: string
  isSelected?: boolean
  onToggle?: (id: string) => void
  showToggle?: boolean
  priceLabel?: string
  className?: string
}

export default function ServiceCard({
  id,
  name,
  description,
  image,
  price,
  rating,
  location,
  duration,
  amenities = [],
  highlights = [],
  category,
  isSelected = false,
  onToggle,
  showToggle = false,
  priceLabel = 'per night',
  className = ''
}: ServiceCardProps) {
  const [imageError, setImageError] = useState(false)
  const [fallbackError, setFallbackError] = useState(false)

  const handleClick = () => {
    if (showToggle && onToggle) {
      onToggle(id)
    }
  }

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true)
    } else if (!fallbackError) {
      setFallbackError(true)
    }
  }

  return (
    <Card
      className={`cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-lg'
      } ${className}`}
      onClick={handleClick}
    >
      <div className="flex flex-col h-full">
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg mb-4 bg-neutral-light-100 flex items-center justify-center">
          {!fallbackError ? (
            <img
              src={imageError ? getImageUrl('/images/placeholder-img1.jpg') : getImageUrl(image)}
              alt={name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <ImageIcon className="h-12 w-12 text-neutral-dark-200/50 mb-2" />
              <p className="text-xs text-neutral-dark-200/70 text-center px-2">{name}</p>
            </div>
          )}
          {showToggle && (
            <div className="absolute top-2 right-2">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected
                    ? 'bg-primary border-primary'
                    : 'bg-white border-gray-300'
                }`}
              >
                {isSelected && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-neutral-dark-200 flex-1">
                {name}
              </h3>
              <div className="flex items-center ml-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="ml-1 text-sm font-medium text-neutral-dark-200">
                  {rating}
                </span>
              </div>
            </div>

            <div className="flex items-center text-sm text-neutral-dark-100 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              {duration && (
                <div className="flex items-center text-sm text-neutral-dark-100">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{duration}</span>
                </div>
              )}
              {category && (
                <span className="text-xs bg-secondary-100 text-secondary-600 px-2 py-1 rounded-full">
                  {category}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-dark-100 mb-3 line-clamp-2 flex-1">
            {description}
          </p>

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {highlights.slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                >
                  {highlight}
                </span>
              ))}
              {highlights.length > 3 && (
                <span className="text-xs text-neutral-dark-100">
                  +{highlights.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Amenities */}
          {amenities && amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {amenities.slice(0, 4).map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs bg-neutral-light-100 text-neutral-dark-100 px-2 py-1 rounded"
                >
                  {amenity}
                </span>
              ))}
              {amenities.length > 4 && (
                <span className="text-xs text-neutral-dark-100">
                  +{amenities.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="mt-auto pt-3 border-t border-neutral-light-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">${price}</p>
                <p className="text-xs text-neutral-dark-100">{priceLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

