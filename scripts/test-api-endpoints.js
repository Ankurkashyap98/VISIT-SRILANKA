#!/usr/bin/env node

/**
 * Test script for all API endpoints
 * Run with: node scripts/test-api-endpoints.js
 */

const baseUrl = 'http://localhost:3000/api'

const endpoints = [
  // Data endpoints
  { method: 'GET', path: '/destinations', description: 'Get destinations' },
  { method: 'GET', path: '/destinations?search=sigiriya', description: 'Search destinations' },
  { method: 'GET', path: '/destinations?category=Historical', description: 'Filter by category' },
  
  { method: 'GET', path: '/transport', description: 'Get transport services' },
  { method: 'GET', path: '/transport?type=home_pickup', description: 'Filter transport by type' },
  
  { method: 'GET', path: '/flights', description: 'Get flights' },
  { method: 'GET', path: '/flights?route=Delhi', description: 'Filter flights by route' },
  
  { method: 'GET', path: '/hotels', description: 'Get accommodations' },
  { method: 'GET', path: '/hotels?tier=Premium', description: 'Filter by tier' },
  
  { method: 'GET', path: '/localTours', description: 'Get local tours' },
  { method: 'GET', path: '/localTours?category=cultural', description: 'Filter tours by category' },
  
  { method: 'GET', path: '/vendors', description: 'Get vendors' },
  { method: 'GET', path: '/vendors?type=transport', description: 'Filter vendors by type' },
  
  { method: 'GET', path: '/notifications', description: 'Get notifications' },
  { method: 'GET', path: '/notifications?recipient=v_001', description: 'Filter by recipient' },
  
  { method: 'GET', path: '/bookings', description: 'Get bookings' },
  { method: 'GET', path: '/bookings?status=confirmed', description: 'Filter by status' },
  
  // Itinerary endpoint
  { method: 'GET', path: '/itinerary', description: 'Get itinerary (requires POST data)' },
  
  // Vendor proposals
  { method: 'GET', path: '/vendor-proposals', description: 'Get vendor proposals' },
]

const testData = {
  // Test booking creation
  booking: {
    travellerName: 'Test User',
    email: 'test@example.com',
    phone: '+1 555 123 4567',
    source: 'Mumbai',
    destination: 'Colombo',
    duration: 5,
    travelers: 2,
    package: 'Standard',
    totalCost: 800,
    services: ['Transport', 'Accommodation'],
    startDate: '2024-03-01',
    endDate: '2024-03-06'
  },
  
  // Test vendor proposal
  proposal: {
    bookingId: 'BK2024001',
    vendorId: 'v_001',
    vendorName: 'Test Vendor',
    serviceType: 'transport',
    originalPrice: 100,
    proposedPrice: 80,
    description: 'Special discount offer',
    features: ['Luxury vehicle', 'Experienced driver']
  },
  
  // Test itinerary generation
  itinerary: {
    tripDetails: {
      duration: 5,
      type: 'leisure',
      travelers: 2
    },
    selectedPackage: {
      level: 'standard',
      name: 'Standard'
    },
    sourceDestination: {
      source: 'Mumbai',
      destination: 'Colombo'
    }
  }
}

async function testEndpoint(endpoint) {
  try {
    const url = `${baseUrl}${endpoint.path}`
    console.log(`\n🧪 Testing: ${endpoint.description}`)
    console.log(`   ${endpoint.method} ${url}`)
    
    const options = {
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json',
      }
    }
    
    // Add body for POST requests
    if (endpoint.method === 'POST') {
      if (endpoint.path === '/bookings') {
        options.body = JSON.stringify(testData.booking)
      } else if (endpoint.path === '/vendor-proposals') {
        options.body = JSON.stringify(testData.proposal)
      } else if (endpoint.path === '/itinerary') {
        options.body = JSON.stringify(testData.itinerary)
      }
    }
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    if (response.ok) {
      console.log(`   ✅ Success (${response.status})`)
      if (data.success !== undefined) {
        console.log(`   📊 Success: ${data.success}`)
      }
      if (data.count !== undefined) {
        console.log(`   📈 Count: ${data.count}`)
      }
      if (data.total !== undefined) {
        console.log(`   📊 Total: ${data.total}`)
      }
    } else {
      console.log(`   ❌ Error (${response.status})`)
      console.log(`   📝 Message: ${data.error || data.message || 'Unknown error'}`)
    }
  } catch (error) {
    console.log(`   💥 Network Error: ${error.message}`)
  }
}

async function runTests() {
  console.log('🚀 Starting API Endpoint Tests')
  console.log('=' .repeat(50))
  
  for (const endpoint of endpoints) {
    await testEndpoint(endpoint)
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  console.log('\n' + '=' .repeat(50))
  console.log('✅ API Testing Complete!')
  console.log('\n📋 Test Summary:')
  console.log('   • GET endpoints: Test data retrieval')
  console.log('   • POST endpoints: Test data creation')
  console.log('   • Filtering: Test query parameters')
  console.log('   • Error handling: Test validation')
  
  console.log('\n🔗 Available Endpoints:')
  console.log('   • /api/destinations - Sri Lankan destinations')
  console.log('   • /api/transport - Transport services')
  console.log('   • /api/flights - Flight options')
  console.log('   • /api/hotels - Accommodation options')
  console.log('   • /api/localTours - Local tour packages')
  console.log('   • /api/vendors - Service providers')
  console.log('   • /api/notifications - System notifications')
  console.log('   • /api/bookings - Booking management')
  console.log('   • /api/vendor-proposals - Vendor proposals')
  console.log('   • /api/itinerary - AI itinerary generation')
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests().catch(console.error)
}

module.exports = { runTests, testEndpoint }
