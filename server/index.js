const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from data directory
const dataDir = path.join(__dirname, '..', 'data');

// Helper function to read JSON files
const readJsonFile = (filename) => {
  try {
    const filePath = path.join(dataDir, filename);
    console.log(`📖 Attempting to read: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      console.error(`❌ Data directory exists: ${fs.existsSync(dataDir)}`);
      return null;
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    if (!data || data.trim().length === 0) {
      console.error(`❌ Empty file: ${filename}`);
      return null;
    }
    
    const parsed = JSON.parse(data);
    console.log(`✅ Successfully parsed ${filename}`);
    return parsed;
  } catch (error) {
    console.error(`❌ Error reading ${filename}:`, error.message);
    console.error(`❌ Error stack:`, error.stack);
    return null;
  }
};

// API Routes - Destinations
app.get('/api/destinations', (req, res) => {
  try {
    console.log('📥 Received request for /api/destinations');
    const { search, category, location, minPrice, maxPrice, rating, featured, limit, offset } = req.query;
    
    console.log(`📂 Reading file from: ${path.join(dataDir, 'destinations.json')}`);
    const destinationsData = readJsonFile('destinations.json');
    
    if (!destinationsData) {
      console.error('❌ Failed to load destinations.json');
      console.error(`❌ Data directory: ${dataDir}`);
      console.error(`❌ File path: ${path.join(dataDir, 'destinations.json')}`);
      console.error(`❌ File exists: ${fs.existsSync(path.join(dataDir, 'destinations.json'))}`);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to load destinations',
        destinations: [],
        allDestinations: [],
        popularDestinations: []
      });
    }
    
    console.log('✅ Loaded destinations.json successfully');
    console.log(`✅ Data structure: allDestinations=${destinationsData.allDestinations?.length || 0}, popularDestinations=${destinationsData.popularDestinations?.length || 0}`);

    let results = destinationsData.allDestinations || [];
    
    // If allDestinations is empty, try popularDestinations
    if (results.length === 0 && destinationsData.popularDestinations) {
      results = destinationsData.popularDestinations;
    }

    // Apply search filter
    if (search) {
      results = results.filter((dest) =>
        dest.name.toLowerCase().includes(search.toLowerCase()) ||
        dest.description.toLowerCase().includes(search.toLowerCase()) ||
        dest.location.toLowerCase().includes(search.toLowerCase()) ||
        (dest.keywords && dest.keywords.some((keyword) =>
          keyword.toLowerCase().includes(search.toLowerCase())
        ))
      );
    }

    // Apply category filter
    if (category && category !== 'All') {
      results = results.filter((dest) => dest.category === category);
    }

    // Apply location filter
    if (location && location !== 'All') {
      results = results.filter((dest) =>
        dest.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Apply price range filter
    if (minPrice && maxPrice) {
      const min = parseInt(minPrice);
      const max = parseInt(maxPrice);
      results = results.filter((dest) => dest.price >= min && dest.price <= max);
    }

    // Apply rating filter
    if (rating) {
      const minRating = parseFloat(rating);
      results = results.filter((dest) => dest.rating >= minRating);
    }

    // Apply featured filter
    if (featured === 'true') {
      results = results.filter((dest) => dest.rating >= 4.5);
    }

    // Apply pagination
    const startIndex = offset ? parseInt(offset) : 0;
    const endIndex = limit ? startIndex + parseInt(limit) : results.length;
    const paginatedResults = results.slice(startIndex, endIndex);

    const response = {
      success: true,
      destinations: paginatedResults,
      allDestinations: paginatedResults, // For compatibility
      popularDestinations: destinationsData.popularDestinations || [],
      total: results.length,
      count: paginatedResults.length,
    };
    
    console.log(`✅ Sending ${paginatedResults.length} destinations`);
    res.json(response);
  } catch (error) {
    console.error('❌ Error fetching destinations:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({ 
      success: false, 
      error: `Failed to fetch destinations: ${error.message}`,
      destinations: [],
      allDestinations: [],
      popularDestinations: [],
      total: 0,
      count: 0
    });
  }
});

app.get('/api/destinations/:id', (req, res) => {
  try {
    const { id } = req.params;
    const destinationsData = readJsonFile('destinations.json');
    
    if (!destinationsData) {
      return res.status(500).json({ success: false, error: 'Failed to load destinations' });
    }

    const destination = (destinationsData.allDestinations || []).find((d) => d.id === id || d.slug === id);
    
    if (!destination) {
      return res.status(404).json({ success: false, error: 'Destination not found' });
    }

    res.json({ success: true, destination });
  } catch (error) {
    console.error('Error fetching destination:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch destination' });
  }
});

// API Routes - Transport
app.get('/api/transport', (req, res) => {
  try {
    const { type, location, verified } = req.query;
    const transportData = readJsonFile('transport.json');

    if (!transportData) {
      return res.status(500).json({ success: false, error: 'Failed to load transport data' });
    }

    let services = [];

    // Combine all transport types
    if (transportData.homePickups) {
      services = services.concat(transportData.homePickups);
    }
    if (transportData.airportTransfers) {
      services = services.concat(transportData.airportTransfers);
    }
    if (transportData.localTransport) {
      services = services.concat(transportData.localTransport);
    }

    // Filter by type if provided
    if (type) {
      services = services.filter((service) => service.type === type);
    }

    // Filter by location if provided
    if (location) {
      services = services.filter((service) =>
        service.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by verification status if provided
    if (verified !== null && verified !== undefined) {
      const isVerified = verified === 'true';
      services = services.filter((service) => service.governmentApproved === isVerified);
    }

    res.json({
      success: true,
      services,
      count: services.length,
    });
  } catch (error) {
    console.error('Error fetching transport services:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch transport services' });
  }
});

// API Routes - Flights
app.get('/api/flights', (req, res) => {
  try {
    const { route, airline, class: classType, maxPrice, availability } = req.query;
    const flightsData = readJsonFile('flights.json');

    if (!flightsData) {
      return res.status(500).json({ success: false, error: 'Failed to load flights data' });
    }

    let flights = flightsData.routes || [];

    // Filter by route if provided
    if (route) {
      flights = flights.filter((flight) =>
        flight.route.toLowerCase().includes(route.toLowerCase())
      );
    }

    // Filter by airline if provided
    if (airline) {
      flights = flights.filter((flight) =>
        flight.airline.toLowerCase().includes(airline.toLowerCase())
      );
    }

    // Filter by class if provided
    if (classType) {
      flights = flights.filter((flight) =>
        flight.class.toLowerCase() === classType.toLowerCase()
      );
    }

    // Filter by max price if provided
    if (maxPrice) {
      const maxPriceNum = parseInt(maxPrice);
      flights = flights.filter((flight) => flight.price <= maxPriceNum);
    }

    // Filter by availability if provided
    if (availability !== null && availability !== undefined) {
      const isAvailable = availability === 'true';
      flights = flights.filter((flight) => flight.availability === isAvailable);
    }

    res.json({
      success: true,
      flights,
      count: flights.length,
    });
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch flights' });
  }
});

// API Routes - Hotels
app.get('/api/hotels', (req, res) => {
  try {
    const hotelsData = readJsonFile('hotels.json');
    if (!hotelsData) {
      return res.status(500).json({ success: false, error: 'Failed to load hotels data' });
    }
    res.json({ success: true, hotels: hotelsData.hotels || [] });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch hotels' });
  }
});

// API Routes - Packages
app.get('/api/packages', (req, res) => {
  try {
    const packagesData = readJsonFile('packages.json');
    if (!packagesData) {
      return res.status(500).json({ success: false, error: 'Failed to load packages data' });
    }
    res.json({ success: true, packages: packagesData.packages || [] });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch packages' });
  }
});

// API Routes - Categories
app.get('/api/categories', (req, res) => {
  try {
    const categoriesData = readJsonFile('categories.json');
    if (!categoriesData) {
      return res.status(500).json({ success: false, error: 'Failed to load categories data' });
    }
    res.json({ success: true, categories: categoriesData.categories || [] });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch categories' });
  }
});

// API Routes - Hospitals
app.get('/api/hospitals', (req, res) => {
  try {
    const hospitalsData = readJsonFile('hospitals.json');
    if (!hospitalsData) {
      return res.status(500).json({ success: false, error: 'Failed to load hospitals data' });
    }
    res.json({ success: true, hospitals: hospitalsData.hospitals || [] });
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch hospitals' });
  }
});

// API Routes - Medical Procedures
app.get('/api/medical-procedures', (req, res) => {
  try {
    const proceduresData = readJsonFile('medical-procedures.json');
    if (!proceduresData) {
      return res.status(500).json({ success: false, error: 'Failed to load medical procedures data' });
    }
    res.json({ success: true, procedures: proceduresData.procedures || [] });
  } catch (error) {
    console.error('Error fetching medical procedures:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch medical procedures' });
  }
});

// API Routes - Pilgrimage Sites
app.get('/api/pilgrimage-sites', (req, res) => {
  try {
    const sitesData = readJsonFile('pilgrimage-sites.json');
    if (!sitesData) {
      return res.status(500).json({ success: false, error: 'Failed to load pilgrimage sites data' });
    }
    res.json({ success: true, sites: sitesData.sites || [] });
  } catch (error) {
    console.error('Error fetching pilgrimage sites:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch pilgrimage sites' });
  }
});

// API Routes - Luxury Experiences
app.get('/api/luxury-experiences', (req, res) => {
  try {
    const experiencesData = readJsonFile('luxury-experiences.json');
    if (!experiencesData) {
      return res.status(500).json({ success: false, error: 'Failed to load luxury experiences data' });
    }
    res.json({ success: true, experiences: experiencesData.experiences || [] });
  } catch (error) {
    console.error('Error fetching luxury experiences:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch luxury experiences' });
  }
});

// API Routes - Adventure Activities
app.get('/api/adventure-activities', (req, res) => {
  try {
    const activitiesData = readJsonFile('adventure-activities.json');
    if (!activitiesData) {
      return res.status(500).json({ success: false, error: 'Failed to load adventure activities data' });
    }
    res.json({ success: true, activities: activitiesData.activities || [] });
  } catch (error) {
    console.error('Error fetching adventure activities:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch adventure activities' });
  }
});

// API Routes - Local Tours
app.get('/api/localTours', (req, res) => {
  try {
    const toursData = readJsonFile('localTours.json');
    if (!toursData) {
      return res.status(500).json({ success: false, error: 'Failed to load local tours data' });
    }
    res.json({ success: true, tours: toursData.tours || [] });
  } catch (error) {
    console.error('Error fetching local tours:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch local tours' });
  }
});

// API Routes - Testimonials
app.get('/api/testimonials', (req, res) => {
  try {
    const testimonialsData = readJsonFile('testimonials.json');
    if (!testimonialsData) {
      return res.status(500).json({ success: false, error: 'Failed to load testimonials data' });
    }
    res.json({ success: true, testimonials: testimonialsData.testimonials || [] });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch testimonials' });
  }
});

// API Routes - Users
app.get('/api/users', (req, res) => {
  try {
    const usersData = readJsonFile('users.json');
    if (!usersData) {
      return res.status(500).json({ success: false, error: 'Failed to load users data' });
    }
    res.json({ success: true, users: usersData.users || [] });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
});

// API Routes - Vendors
app.get('/api/vendors', (req, res) => {
  try {
    const vendorsData = readJsonFile('vendors.json');
    if (!vendorsData) {
      return res.status(500).json({ success: false, error: 'Failed to load vendors data' });
    }
    res.json({ success: true, vendors: vendorsData.vendors || [] });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch vendors' });
  }
});

// API Routes - Bookings
app.get('/api/bookings', (req, res) => {
  try {
    const bookingsData = readJsonFile('bookings.json');
    if (!bookingsData) {
      return res.status(500).json({ success: false, error: 'Failed to load bookings data' });
    }
    res.json({ success: true, bookings: bookingsData.bookings || [] });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch bookings' });
  }
});

app.get('/api/bookings/:id', (req, res) => {
  try {
    const { id } = req.params;
    const bookingsData = readJsonFile('bookings.json');
    
    if (!bookingsData) {
      return res.status(500).json({ success: false, error: 'Failed to load bookings data' });
    }

    const booking = (bookingsData.bookings || []).find((b) => b.id === id);
    
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.json({ success: true, booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booking' });
  }
});

// API Routes - Experiences (using mock data from lib)
app.get('/api/experiences', (req, res) => {
  try {
    // This would need to be implemented with actual data
    // For now, return empty array
    res.json({ success: true, experiences: [] });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch experiences' });
  }
});

// API Routes - Medical Services
app.get('/api/medical', (req, res) => {
  try {
    // This would need to be implemented with actual data
    // For now, return empty array
    res.json({ success: true, services: [] });
  } catch (error) {
    console.error('Error fetching medical services:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch medical services' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
});

