import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../lib/utils'
import { MapPin, Star, Search } from 'lucide-react'
import { getImageSource } from '../lib/imageUtils'

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

interface AutocompleteProps {
  value: string
  onChange: (value: string) => void
  onSelect: (destination: Destination | null) => void
  placeholder?: string
  className?: string
  icon?: React.ReactNode
}

const Autocomplete = ({ 
  value, 
  onChange, 
  onSelect, 
  placeholder = "Search destinations...", 
  className,
  icon
}: AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([])
  const [popularDestinations, setPopularDestinations] = useState<Destination[]>([])
  const [isLoading] = useState(false)
  const autocompleteRef = useRef<HTMLDivElement>(null)

  // Load destinations data
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const response = await fetch('/api/destinations')
        if (!response.ok) {
          console.error('Failed to fetch destinations:', response.status)
          return
        }
        const text = await response.text()
        if (!text) {
          console.error('Empty response from server')
          return
        }
        const data = JSON.parse(text)

        const all = (data.destinations || data.allDestinations || []) as any[]
        const popular = (data.popularDestinations || []) as any[]

        const normalize = (list: any[]): Destination[] =>
          list.map((dest) => {
            const imageSource = getImageSource(dest.name)
            return {
              ...dest,
              image: imageSource.url,
            }
          })

        setDestinations(normalize(all))
        setPopularDestinations(normalize(popular))
      } catch (error) {
        console.error('Error loading destinations:', error)
        // Set empty arrays on error to prevent further issues
        setDestinations([])
        setPopularDestinations([])
      }
    }
    loadDestinations()
  }, [])

  // Filter destinations based on search query
  useEffect(() => {
    if (value.trim().length === 0) {
      setFilteredDestinations([])
      return
    }

    const query = value.toLowerCase().trim()
    const filtered = destinations.filter(destination => {
      const nameMatch = destination.name.toLowerCase().includes(query)
      const locationMatch = destination.location.toLowerCase().includes(query)
      const categoryMatch = destination.category.toLowerCase().includes(query)
      const keywordMatch = destination.keywords?.some(keyword => 
        keyword.toLowerCase().includes(query)
      ) || false
      
      return nameMatch || locationMatch || categoryMatch || keywordMatch
    })

    // Sort by relevance (exact name matches first, then partial matches)
    const sorted = filtered.sort((a, b) => {
      const aName = a.name.toLowerCase()
      const bName = b.name.toLowerCase()
      
      if (aName.startsWith(query) && !bName.startsWith(query)) return -1
      if (!aName.startsWith(query) && bName.startsWith(query)) return 1
      if (aName.includes(query) && !bName.includes(query)) return -1
      if (!aName.includes(query) && bName.includes(query)) return 1
      
      return a.rating - b.rating // Sort by rating as tiebreaker
    })

    setFilteredDestinations(sorted.slice(0, 8)) // Limit to 8 results
  }, [value, destinations])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    setIsOpen(newValue.length > 0 || true) // Keep open to show popular destinations
  }

  const handleSelect = (destination: Destination) => {
    onChange(destination.name)
    onSelect(destination)
    setIsOpen(false)
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const displayDestinations = value.trim().length > 0 ? filteredDestinations : popularDestinations.slice(0, 6)

  return (
    <div className={cn('sri-lanka-autocomplete relative', className)} ref={autocompleteRef}>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-dark-100">
            {icon}
          </div>
        )}
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="sri-lanka-autocomplete-input w-full pl-10 pr-4 py-3 border bg-white text-black border-neutral-light-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="sri-lanka-autocomplete-dropdown absolute z-50 w-full mt-1 bg-white border border-neutral-light-200 rounded-lg shadow-strong max-h-80 overflow-auto">
          {displayDestinations.length > 0 ? (
            <>
              {value.trim().length === 0 && (
                <div className="px-4 py-2 text-xs font-medium text-neutral-dark-100 bg-neutral-light-100 border-b border-neutral-light-200">
                  Popular Destinations
                </div>
              )}
              {displayDestinations.map((destination) => (
                <button
                  key={destination.id}
                  type="button"
                  onClick={() => handleSelect(destination)}
                  className="sri-lanka-autocomplete-option w-full px-4 py-3 text-left hover:bg-neutral-light-100 transition-colors flex items-center space-x-3 border-b border-neutral-light-100 last:border-b-0"
                >
                  <div className="sri-lanka-autocomplete-image flex-shrink-0 relative w-12 h-12">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </div>
                  <div className="sri-lanka-autocomplete-content flex-1 min-w-0">
                    <div className="sri-lanka-autocomplete-name font-medium text-sm text-neutral-dark-200 truncate">
                      {destination.name}
                    </div>
                    <div className="sri-lanka-autocomplete-location text-xs text-neutral-dark-100 flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">{destination.location}</span>
                    </div>
                    <div className="sri-lanka-autocomplete-rating text-xs text-neutral-dark-100 flex items-center mt-1">
                      <Star className="h-3 w-3 mr-1 text-accent fill-current" />
                      <span>{destination.rating}</span>
                      <span className="mx-1">•</span>
                      <span className="bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full text-xs">
                        {destination.category}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </>
          ) : value.trim().length > 0 ? (
            <div className="sri-lanka-autocomplete-no-results px-4 py-6 text-center text-sm text-neutral-dark-100">
              <Search className="h-8 w-8 mx-auto mb-2 text-neutral-light-200" />
              <p>No destinations found for &quot;{value}&quot;</p>
              <p className="text-xs mt-1">Try searching for a city, landmark, or activity</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export { Autocomplete }

