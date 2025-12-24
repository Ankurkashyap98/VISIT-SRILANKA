/**
 * Image utility functions for fetching and managing destination images
 */
import { createApi } from 'unsplash-js';

export interface ImageSource {
  url: string
  fallback: string
  alt: string
}

// Get base URL from Vite (will be '/srilankatourism/' in production)
const BASE_URL = import.meta.env.BASE_URL;

// Helper function to create image paths with base URL
const imagePath = (path: string): string => {
  // Remove leading slash from path if present, BASE_URL already has trailing slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_URL}${cleanPath}`;
};

// Initialize Unsplash API
const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY || "",
});

/**
 * Get local image path for Sri Lanka destinations (only for images that actually exist)
 */
export const getLocalImage = (destination: string): string | null => {
  // Map destination names to ACTUALLY AVAILABLE local images
  const imageMap: Record<string, string> = {
    // UNESCO World Heritage Sites - using exact file names that exist
    'sinharaja forest reserve': imagePath('images/sinharaja-forest-reserve.jpg'),
    'ancient city of polonnaruwa': imagePath('images/ancient-cityof-polonnaruwa.jpg'),
    'sacred city of kandy': imagePath('images/sacred-city-of-kandy.jpg'),
    'polonnaruwa': imagePath('images/ancient-cityof-polonnaruwa.jpg'),
    'kandy': imagePath('images/sacred-city-of-kandy.jpg'),
    'sinharaja': imagePath('images/sinharaja-forest-reserve.jpg'),
    
    // Common variations and aliases
    'sigiriya rock fortress': imagePath('images/ancient-cityof-polonnaruwa.jpg'), // Using historical site image
    'sigiriya': imagePath('images/ancient-cityof-polonnaruwa.jpg'),
    'temple of the tooth': imagePath('images/sacred-city-of-kandy.jpg'),
    'temple of tooth': imagePath('images/sacred-city-of-kandy.jpg'),
    'dambulla cave temple': imagePath('images/sacred-city-of-kandy.jpg'),
    'dambulla': imagePath('images/sacred-city-of-kandy.jpg'),
    
    // Adventure and nature destinations
    'ella': imagePath('images/sinharaja-forest-reserve.jpg'), // Using forest image for nature
    'nuwara eliya': imagePath('images/sinharaja-forest-reserve.jpg'),
    'little adam\'s peak': imagePath('images/sinharaja-forest-reserve.jpg'),
    'nine arch bridge': imagePath('images/sinharaja-forest-reserve.jpg'),
    'yala national park': imagePath('images/sinharaja-forest-reserve.jpg'),
    'yala': imagePath('images/sinharaja-forest-reserve.jpg'),
    'wilpattu national park': imagePath('images/sinharaja-forest-reserve.jpg'),
    'wilpattu': imagePath('images/sinharaja-forest-reserve.jpg'),
    
    // Beach destinations
    'arugam bay': imagePath('images/sacred-city-of-kandy.jpg'), // Using available image as fallback
    'mirissa': imagePath('images/sacred-city-of-kandy.jpg'),
    'unawatuna': imagePath('images/sacred-city-of-kandy.jpg'),
    'bentota': imagePath('images/sacred-city-of-kandy.jpg'),
    'negombo': imagePath('images/sacred-city-of-kandy.jpg'),
    'trincomalee': imagePath('images/sacred-city-of-kandy.jpg'),
    
    // Cultural and historical sites
    'anuradhapura': imagePath('images/ancient-cityof-polonnaruwa.jpg'),
    'galle fort': imagePath('images/ancient-cityof-polonnaruwa.jpg'),
    'galle': imagePath('images/ancient-cityof-polonnaruwa.jpg'),
    'colombo': imagePath('images/sacred-city-of-kandy.jpg'), // Using available image as fallback
    'jaffna': imagePath('images/sacred-city-of-kandy.jpg'),
    
    // Medical facilities
    'colombo national hospital': imagePath('images/sacred-city-of-kandy.jpg'), // Using available image as fallback
    'asiri central hospital': imagePath('images/sacred-city-of-kandy.jpg'),
    'lanka hospitals': imagePath('images/sacred-city-of-kandy.jpg')
  }
  
  const normalizedName = destination.toLowerCase().trim()
  return imageMap[normalizedName] || null // Return null if no local image exists
}

/**
 * Generate Unsplash image URL for Sri Lanka destinations using SDK with smart fallbacks
 */
export const getUnsplashImage = async (destination: string, width = 400, height = 300): Promise<string> => {
  try {
    if (!import.meta.env.VITE_UNSPLASH_ACCESS_KEY) {
      // Fallback to old method if no API key
      const searchTerm = encodeURIComponent(`${destination} srilanka tourism`)
      return `https://source.unsplash.com/${width}x${height}/?${searchTerm}`
    }

    // Try multiple search strategies for better results
    const searchStrategies = [
      `${destination} srilanka tourism`, // Exact match
      `${destination} sri lanka`, // Without "tourism"
      `${destination} ceylon`, // Historical name
      getCategoryBasedSearch(destination), // Category-based search
      'sri lanka tourism', // Generic Sri Lanka tourism
      'sri lanka travel' // Generic Sri Lanka travel
    ]

    for (const searchQuery of searchStrategies) {
      try {
        const response = await unsplash.search.getPhotos({
          query: searchQuery,
          page: 1,
          perPage: 3, // Get multiple options
          orientation: "landscape",
        });

        if (response.response && response.response.results.length > 0) {
          // Return the first result
          return response.response.results[0].urls.regular;
        }
      } catch (searchError) {
        console.log(`Search failed for "${searchQuery}":`, searchError);
        continue; // Try next strategy
      }
    }
    
    // Fallback to old method if no results from any strategy
    const searchTerm = encodeURIComponent(`${destination} srilanka tourism`)
    return `https://source.unsplash.com/${width}x${height}/?${searchTerm}`
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    // Fallback to old method on error
    const searchTerm = encodeURIComponent(`${destination} srilanka tourism`)
    return `https://source.unsplash.com/${width}x${height}/?${searchTerm}`
  }
}

/**
 * Get category-based search terms for better image matching
 */
const getCategoryBasedSearch = (destination: string): string => {
  const categoryMap: Record<string, string> = {
    'sigiriya': 'ancient fortress sri lanka',
    'kandy': 'temple buddhist sri lanka',
    'sinharaja': 'rainforest wildlife sri lanka',
    'polonnaruwa': 'ancient ruins sri lanka',
    'galle': 'colonial fort sri lanka',
    'ella': 'mountain train sri lanka',
    'yala': 'wildlife safari sri lanka',
    'anuradhapura': 'ancient city sri lanka',
    'colombo': 'city urban sri lanka',
    'hospital': 'medical healthcare sri lanka',
    'beach': 'coastal sri lanka',
    'mountain': 'hill country sri lanka'
  }

  const lowerDestination = destination.toLowerCase()
  
  // Find matching category
  for (const [key, searchTerm] of Object.entries(categoryMap)) {
    if (lowerDestination.includes(key)) {
      return searchTerm
    }
  }
  
  // Default fallback
  return 'sri lanka tourism'
}

/**
 * Generate Unsplash image URL synchronously (fallback method)
 * NOTE: This uses the deprecated source.unsplash.com which may cause errors
 * Only use this as a last resort when no local images are available
 */
export const getUnsplashImageSync = (destination: string, width = 400, height = 300): string => {
  // Use a more generic approach to avoid specific destination issues
  const searchTerm = encodeURIComponent(`sri lanka tourism`)
  return `https://source.unsplash.com/${width}x${height}/?${searchTerm}`
}

/**
 * Generate a safe placeholder image URL that won't cause errors
 * This is used when Unsplash API is not available or fails
 */
export const getSafePlaceholderImage = (destination: string, width = 400, height = 300): string => {
  // Use a reliable placeholder service that won't cause application errors
  return `https://picsum.photos/${width}/${height}?random=${encodeURIComponent(destination)}`
}

/**
 * Generate fallback image using local placeholder
 */
export const getFallbackImage = (): string => {
  return imagePath('images/placeholder-destination.jpg')
}

/**
 * Get optimized image source with fallback (synchronous version)
 * PRIORITIZES LOCAL IMAGES over Unsplash to avoid API issues
 */
export const getImageSource = (destination: string, width = 400, height = 300): ImageSource => {
  const localImage = getLocalImage(destination)
  
  // Always use local images first, only use Unsplash as last resort
  if (localImage) {
    return {
      url: localImage,
      fallback: getFallbackImage(),
      alt: `${destination}, Sri Lanka`
    }
  }
  
  // Try to find a similar local image based on category
  const similarLocalImage = getSimilarLocalImage(destination)
  if (similarLocalImage) {
    return {
      url: similarLocalImage,
      fallback: getFallbackImage(),
      alt: `${destination}, Sri Lanka`
    }
  }
  
  // Only use Unsplash if no local image exists AND API key is configured
  if (import.meta.env.VITE_UNSPLASH_ACCESS_KEY) {
    return {
      url: getUnsplashImageSync(destination, width, height),
      fallback: getFallbackImage(),
      alt: `${destination}, Sri Lanka`
    }
  }
  
  // Use safe placeholder instead of problematic Unsplash method
  return {
    url: getSafePlaceholderImage(destination, width, height),
    fallback: getFallbackImage(),
    alt: `${destination}, Sri Lanka`
  }
}

/**
 * Get similar local image based on destination category
 */
const getSimilarLocalImage = (destination: string): string | null => {
  const lowerDestination = destination.toLowerCase()
  
  // Category-based fallbacks
  if (lowerDestination.includes('kandy') || lowerDestination.includes('temple') || lowerDestination.includes('religious')) {
    return imagePath('images/sacred-city-of-kandy.jpg')
  }
  
  if (lowerDestination.includes('polonnaruwa') || lowerDestination.includes('ancient') || lowerDestination.includes('ruins') || lowerDestination.includes('historical')) {
    return imagePath('images/ancient-cityof-polonnaruwa.jpg')
  }
  
  if (lowerDestination.includes('sinharaja') || lowerDestination.includes('forest') || lowerDestination.includes('wildlife') || lowerDestination.includes('nature')) {
    return imagePath('images/sinharaja-forest-reserve.jpg')
  }
  
  if (lowerDestination.includes('hospital') || lowerDestination.includes('medical') || lowerDestination.includes('healthcare')) {
    return imagePath('images/sacred-city-of-kandy.jpg') // Using available image as fallback
  }
  
  return null
}

/**
 * Get optimized image source with fallback (asynchronous version for better image quality)
 * PRIORITIZES LOCAL IMAGES over Unsplash to avoid API issues
 */
export const getImageSourceAsync = async (destination: string, width = 400, height = 300): Promise<ImageSource> => {
  const localImage = getLocalImage(destination)
  
  // Always use local images first, only use Unsplash as last resort
  if (localImage) {
    return {
      url: localImage,
      fallback: getFallbackImage(),
      alt: `${destination}, Sri Lanka`
    }
  }
  
  // Try to find a similar local image based on category
  const similarLocalImage = getSimilarLocalImage(destination)
  if (similarLocalImage) {
    return {
      url: similarLocalImage,
      fallback: getFallbackImage(),
      alt: `${destination}, Sri Lanka`
    }
  }
  
  // Only use Unsplash if no local image exists AND API key is configured
  if (import.meta.env.VITE_UNSPLASH_ACCESS_KEY) {
    try {
      const unsplashUrl = await getUnsplashImage(destination, width, height)
      return {
        url: unsplashUrl,
        fallback: getFallbackImage(),
        alt: `${destination}, Sri Lanka`
      }
    } catch (error) {
      console.error('Unsplash API error:', error)
      // Fall back to placeholder if Unsplash fails
      return {
        url: getFallbackImage(),
        fallback: getFallbackImage(),
        alt: `${destination}, Sri Lanka`
      }
    }
  }
  
  // Use safe placeholder instead of problematic Unsplash method
  return {
    url: getSafePlaceholderImage(destination, width, height),
    fallback: getFallbackImage(),
    alt: `${destination}, Sri Lanka`
  }
}

/**
 * Generate category-specific image URLs using local images
 */
export const getCategoryImage = (category: string, destination: string): string => {
  // First try to get the specific destination image
  const destinationImage = getLocalImage(destination)
  if (destinationImage) {
    return destinationImage
  }
  
  // Fallback to category-based images (using available images)
  const categoryMap: Record<string, string> = {
    'Historical': imagePath('images/ancient-cityof-polonnaruwa.jpg'),
    'Religious': imagePath('images/sacred-city-of-kandy.jpg'),
    'Adventure': imagePath('images/sinharaja-forest-reserve.jpg'),
    'Cultural': imagePath('images/sacred-city-of-kandy.jpg'),
    'Beach': imagePath('images/sacred-city-of-kandy.jpg'), // Using available image as fallback
    'Wildlife': imagePath('images/sinharaja-forest-reserve.jpg'),
    'Mountain': imagePath('images/sinharaja-forest-reserve.jpg'),
    'City': imagePath('images/sacred-city-of-kandy.jpg')
  }

  return categoryMap[category] || imagePath('images/sacred-city-of-kandy.jpg')
}

/**
 * Preload images for better performance
 */
export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
    img.src = url
  })
}

/**
 * Batch preload multiple images
 */
export const preloadImages = async (urls: string[]): Promise<void> => {
  const promises = urls.map(url => preloadImage(url).catch(() => {})) // Ignore individual failures
  await Promise.all(promises)
}

