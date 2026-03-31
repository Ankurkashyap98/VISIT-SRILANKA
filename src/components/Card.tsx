import React, { useState } from 'react'
import { cn } from '../lib/utils'
import { useCurrency } from '../context/CurrencyProvider'
import { getImageSource, getCategoryImage } from '../lib/imageUtils'
import { Star, MapPin, Clock, Shield, CheckCircle } from 'lucide-react'

interface CardProps {
  children?: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void

}

interface DestinationCardProps {
  destination: {
    id: string
    name: string
    description: string
    category: string
    location: string
    rating: number
    price: number
    image: string
    verified: boolean
    governmentApproved: boolean
    highlights: string[]
    duration: string
    difficulty: string
  }
  className?: string
}

interface PackageCardProps {
  package: {
    id: string
    name: string
    description: string
    duration: string
    price: number
    category: string
    rating: number
    image: string
    verified: boolean
    governmentApproved: boolean
    highlights: string[]
  }
  className?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, onClick, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'sri-lanka-card px-4 sm:px-6 md:px-7 py-3 rounded-lg sm:rounded-xl border border-neutral-light-200 bg-white shadow-soft hover:shadow-medium transition-all duration-300 w-full',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
)
Card.displayName = 'Card'

const DestinationCard = React.forwardRef<HTMLDivElement, DestinationCardProps>(
  ({ destination, className, ...props }, ref) => {
    const { formatCurrency, convertAmount } = useCurrency()
    const [imageError, setImageError] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)
    
    // Get image source - prioritize local images
    const imageSource = getImageSource(destination.name)
    const categoryImage = getCategoryImage(destination.category, destination.name)
    
    // Use destination.image if it's a local path, otherwise use the imageSource
    const primaryImage = destination.image?.startsWith('/') ? destination.image : imageSource.url
    
    // For local images, start with loading as false since they should load quickly
    React.useEffect(() => {
      if (primaryImage?.startsWith('/')) {
        // For local images, give them a small delay to load
        const timer = setTimeout(() => {
          setImageLoading(false)
        }, 100)
        return () => clearTimeout(timer)
      }
    }, [primaryImage])
    
    const handleImageError = () => {
      console.log('Image failed to load:', primaryImage || categoryImage)
      setImageError(true)
      setImageLoading(false)
    }
    
    const handleImageLoad = () => {
      console.log('Image loaded successfully:', primaryImage || categoryImage)
      setImageLoading(false)
    }
    
    return (
    <Card
      ref={ref}
      className={cn('sri-lanka-destination-card overflow-hidden group cursor-pointer w-full', className)}
      {...props}
    >
      <div className="sri-lanka-destination-card-image relative h-40 sm:h-48 overflow-hidden">
        {imageLoading && (
          <div className="w-full h-48 bg-neutral-light-100 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        <img
          src={imageError ? imageSource.fallback : (primaryImage || categoryImage)}
          alt={imageSource.alt}
          className={cn(
            "sri-lanka-destination-card-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
            imageLoading && "hidden"
          )}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        {destination.verified && (
          <div className="sri-lanka-destination-card-verified absolute top-3 right-3 bg-white rounded-full p-1 shadow-medium">
            <CheckCircle className="h-5 w-5 text-status-success" />
          </div>
        )}
        {destination.governmentApproved && (
          <div className="sri-lanka-destination-card-govt-badge absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
            <Shield className="h-3 w-3 inline mr-1" />
            Govt. Verified
          </div>
        )}
      </div>
      
      <div className="sri-lanka-destination-card-content p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2 gap-2">
          <h4 className="font-heading font-semibold text-sm sm:text-base text-neutral-dark-200 group-hover:text-primary transition-colors flex-1 min-w-0">
            <span className="truncate block">{destination.name}</span>
          </h4>
          <div className="flex items-center flex-shrink-0">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-accent fill-current" />
            <span className="ml-1 text-xs sm:text-sm font-medium">{destination.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center flex-wrap text-xs sm:text-sm text-neutral-dark-100 mb-2 gap-1">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{destination.location}</span>
          </div>
          <span className="mx-1">•</span>
          <span className="bg-primary-100 text-primary-600 px-2 py-0.5 sm:py-1 rounded-full text-xs flex-shrink-0">
            {destination.category}
          </span>
        </div>
        
        <p className="text-xs sm:text-sm text-neutral-dark-100 mb-3 line-clamp-2">
          {destination.description}
        </p>
        
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center text-xs sm:text-sm text-neutral-dark-100">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
            <span>{destination.duration}</span>
            <span className="mx-1 sm:mx-2">•</span>
            <span className="capitalize">{destination.difficulty}</span>
          </div>
          <div className="text-base sm:text-lg font-semibold text-primary">
            {destination.price > 0 ? formatCurrency(convertAmount(destination.price, 'USD')) : 'Free'}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {(destination.highlights || []).slice(0, 2).map((highlight, index) => (
            <span
              key={index}
              className="text-xs bg-neutral-light-100 text-neutral-dark-100 px-2 py-1 rounded-full"
            >
              {highlight}
            </span>
          ))}
          {(destination.highlights || []).length > 2 && (
            <span className="text-xs text-neutral-dark-100">
              +{(destination.highlights || []).length - 2} more
            </span>
          )}
        </div>
      </div>
    </Card>
    )
  }
)
DestinationCard.displayName = 'DestinationCard'

const PackageCard = React.forwardRef<HTMLDivElement, PackageCardProps>(
  ({ package: pkg, className, ...props }, ref) => {
    const { formatCurrency, convertAmount } = useCurrency()
    const [imageError, setImageError] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)
    
    // Get image source for packages - prioritize local images
    const imageSource = getImageSource(pkg.name)
    
    // Use package.image if it's a local path, otherwise use the imageSource
    const primaryImage = pkg.image?.startsWith('/') ? pkg.image : imageSource.url
    
    const handleImageError = () => {
      setImageError(true)
      setImageLoading(false)
    }
    
    const handleImageLoad = () => {
      setImageLoading(false)
    }
    
    return (
    <Card
      ref={ref}
      className={cn('overflow-hidden group cursor-pointer', className)}
      {...props}
    >
      <div className="relative h-40 sm:h-48 overflow-hidden">
        {imageLoading && (
          <div className="w-full h-48 bg-neutral-light-100 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        <img
          src={imageError ? imageSource.fallback : (primaryImage || imageSource.url)}
          alt={imageSource.alt}
          className={cn(
            "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
            imageLoading && "hidden"
          )}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        {pkg.verified && (
          <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-medium">
            <CheckCircle className="h-5 w-5 text-status-success" />
          </div>
        )}
        {pkg.governmentApproved && (
          <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
            <Shield className="h-3 w-3 inline mr-1" />
            Govt. Verified
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2 gap-2">
          <h4 className="font-heading font-semibold text-sm sm:text-base text-neutral-dark-200 group-hover:text-primary transition-colors flex-1 min-w-0">
            <span className="truncate block">{pkg.name}</span>
          </h4>
          <div className="flex items-center flex-shrink-0">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-accent fill-current" />
            <span className="ml-1 text-xs sm:text-sm font-medium">{pkg.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center flex-wrap text-xs sm:text-sm text-neutral-dark-100 mb-2 gap-1">
          <div className="flex items-center">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
            <span>{pkg.duration}</span>
          </div>
          <span className="mx-1">•</span>
          <span className="bg-secondary-100 text-secondary-600 px-2 py-0.5 sm:py-1 rounded-full text-xs flex-shrink-0">
            {pkg.category}
          </span>
        </div>
        
        <p className="text-xs sm:text-sm text-neutral-dark-100 mb-3 line-clamp-2">
          {pkg.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-base sm:text-lg font-semibold text-primary">
            {formatCurrency(convertAmount(pkg.price, 'USD'))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {pkg.highlights.slice(0, 2).map((highlight, index) => (
            <span
              key={index}
              className="text-xs bg-neutral-light-100 text-neutral-dark-100 px-2 py-1 rounded-full"
            >
              {highlight}
            </span>
          ))}
          {pkg.highlights.length > 2 && (
            <span className="text-xs text-neutral-dark-100">
              +{pkg.highlights.length - 2} more
            </span>
          )}
        </div>
      </div>
    </Card>
    )
  }
)
PackageCard.displayName = 'PackageCard'

export { Card, DestinationCard, PackageCard }

