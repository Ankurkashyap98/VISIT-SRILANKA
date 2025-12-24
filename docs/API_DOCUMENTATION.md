# Visit Sri Lanka Tourism Portal - API Documentation

## Overview

This document describes the complete API system for the Visit Sri Lanka Tourism Portal, including all mock JSON data files and API routes that support the end-to-end booking workflow.

## 📁 Data Structure

### Mock JSON Files (`/data/`)

| File | Description | Key Fields |
|------|-------------|------------|
| `destinations.json` | Sri Lankan destinations | `id`, `name`, `location`, `category`, `rating`, `price` |
| `transport.json` | Transport services | `id`, `name`, `type`, `price`, `location`, `governmentApproved` |
| `flights.json` | Flight options | `id`, `route`, `airline`, `price`, `availability` |
| `hotels.json` | Accommodation options | `id`, `name`, `tier`, `pricePerNight`, `location`, `verified` |
| `localTours.json` | Tour packages | `id`, `title`, `category`, `price`, `duration`, `location` |
| `vendors.json` | Service providers | `id`, `name`, `category`, `rating`, `governmentApproved` |
| `notifications.json` | System notifications | `id`, `type`, `message`, `recipient`, `status` |
| `bookings.json` | Booking records | `id`, `travellerName`, `status`, `totalCost`, `services` |

## 🔗 API Endpoints

### Destinations API

#### `GET /api/destinations`
Get all destinations with optional filtering.

**Query Parameters:**
- `search` - Search by name, description, or keywords
- `category` - Filter by category (Historical, Religious, Adventure, etc.)
- `location` - Filter by location
- `minPrice` / `maxPrice` - Price range filter
- `rating` - Minimum rating filter
- `featured` - Show only featured destinations (rating >= 4.5)
- `limit` / `offset` - Pagination

**Example:**
```bash
GET /api/destinations?search=sigiriya&category=Historical&rating=4.5
```

#### `POST /api/destinations`
Create a new destination (Admin only).

**Request Body:**
```json
{
  "name": "New Destination",
  "description": "Description here",
  "image": "/images/destination.jpg",
  "location": "Central Province",
  "price": 25,
  "category": "Historical",
  "highlights": ["Feature 1", "Feature 2"]
}
```

### Transport API

#### `GET /api/transport`
Get transport services.

**Query Parameters:**
- `type` - Filter by type (home_pickup, airport_transfer, local_transport)
- `location` - Filter by location
- `verified` - Filter by verification status

**Example:**
```bash
GET /api/transport?type=home_pickup&location=Colombo
```

#### `POST /api/transport`
Book a transport service.

**Request Body:**
```json
{
  "serviceId": "hp_001",
  "bookingId": "BK2024001",
  "pickupLocation": "Airport",
  "dropoffLocation": "Hotel",
  "pickupTime": "2024-03-01T10:00:00Z",
  "passengers": 2,
  "specialRequests": "Wheelchair accessible"
}
```

### Flights API

#### `GET /api/flights`
Get flight options.

**Query Parameters:**
- `route` - Filter by route (e.g., "Delhi → Colombo")
- `airline` - Filter by airline
- `class` - Filter by class (Economy, Business)
- `maxPrice` - Maximum price filter
- `availability` - Filter by availability

**Example:**
```bash
GET /api/flights?route=Delhi&maxPrice=200
```

#### `POST /api/flights`
Book a flight.

**Request Body:**
```json
{
  "flightId": "fl_001",
  "bookingId": "BK2024001",
  "passengers": 2,
  "seatPreferences": ["Window", "Aisle"],
  "specialRequests": "Vegetarian meals"
}
```

### Hotels API

#### `GET /api/hotels`
Get accommodation options.

**Query Parameters:**
- `location` - Filter by location
- `tier` - Filter by tier (Economy, Premium, Luxury)
- `type` - Filter by type (hotel, homestay)
- `maxPrice` - Maximum price filter
- `verified` - Filter by verification status

**Example:**
```bash
GET /api/hotels?tier=Premium&location=Colombo
```

#### `POST /api/hotels`
Book accommodation.

**Request Body:**
```json
{
  "accommodationId": "ht_001",
  "bookingId": "BK2024001",
  "checkIn": "2024-03-01",
  "checkOut": "2024-03-06",
  "guests": 2,
  "roomType": "Deluxe",
  "specialRequests": "High floor room"
}
```

### Local Tours API

#### `GET /api/localTours`
Get local tour options.

**Query Parameters:**
- `category` - Filter by category (cultural, adventure, nature)
- `location` - Filter by location
- `days` - Filter by duration
- `maxPrice` - Maximum price filter
- `verified` - Filter by verification status

**Example:**
```bash
GET /api/localTours?category=cultural&days=3
```

#### `POST /api/localTours`
Book a tour.

**Request Body:**
```json
{
  "tourId": "lt_001",
  "bookingId": "BK2024001",
  "participants": 4,
  "startDate": "2024-03-02",
  "endDate": "2024-03-04",
  "specialRequests": "English speaking guide"
}
```

### Vendors API

#### `GET /api/vendors`
Get service providers.

**Query Parameters:**
- `type` - Filter by service type
- `location` - Filter by location

**Example:**
```bash
GET /api/vendors?type=transport&location=Colombo
```

#### `POST /api/vendors`
Submit a vendor proposal.

**Request Body:**
```json
{
  "bookingId": "BK2024001",
  "serviceType": "transport",
  "vendorId": "v_001",
  "proposal": {
    "originalPrice": 100,
    "proposedPrice": 80,
    "description": "Special discount offer"
  }
}
```

### Notifications API

#### `GET /api/notifications`
Get notifications.

**Query Parameters:**
- `recipient` - Filter by recipient
- `type` - Filter by type
- `status` - Filter by status (unread, read)

**Example:**
```bash
GET /api/notifications?recipient=v_001&status=unread
```

#### `POST /api/notifications`
Create a notification.

**Request Body:**
```json
{
  "type": "booking_assignment",
  "title": "New Booking Assignment",
  "message": "You have been assigned to provide transport services",
  "recipient": "v_001",
  "bookingId": "BK2024001",
  "serviceType": "transport",
  "priority": "high"
}
```

#### `PUT /api/notifications`
Update notification status.

**Request Body:**
```json
{
  "notificationId": "n_001",
  "status": "read"
}
```

### Bookings API

#### `GET /api/bookings`
Get bookings.

**Query Parameters:**
- `userId` - Filter by user
- `status` - Filter by status
- `limit` / `offset` - Pagination

**Example:**
```bash
GET /api/bookings?status=confirmed&limit=10
```

#### `POST /api/bookings`
Create a new booking.

**Request Body:**
```json
{
  "travellerName": "John Smith",
  "email": "john@example.com",
  "phone": "+1 555 123 4567",
  "source": "Mumbai",
  "destination": "Colombo",
  "duration": 7,
  "travelers": 2,
  "package": "Standard",
  "totalCost": 1198,
  "services": ["Transport", "Accommodation", "Tours"],
  "startDate": "2024-03-01",
  "endDate": "2024-03-08"
}
```

### Vendor Proposals API

#### `GET /api/vendor-proposals`
Get vendor proposals.

**Query Parameters:**
- `bookingId` - Filter by booking
- `vendorId` - Filter by vendor
- `status` - Filter by status

**Example:**
```bash
GET /api/vendor-proposals?bookingId=BK2024001&status=pending
```

#### `POST /api/vendor-proposals`
Create a vendor proposal.

**Request Body:**
```json
{
  "bookingId": "BK2024001",
  "vendorId": "v_001",
  "vendorName": "Sri Lanka Tours",
  "serviceType": "transport",
  "originalPrice": 100,
  "proposedPrice": 80,
  "description": "Special discount offer",
  "features": ["Luxury vehicle", "Experienced driver"]
}
```

#### `PUT /api/vendor-proposals`
Update proposal status.

**Request Body:**
```json
{
  "proposalId": "prop_001",
  "bookingId": "BK2024001",
  "status": "accepted"
}
```

### Itinerary API

#### `POST /api/itinerary`
Generate AI-powered itinerary.

**Request Body:**
```json
{
  "tripDetails": {
    "duration": 7,
    "type": "leisure",
    "travelers": 2
  },
  "selectedPackage": {
    "level": "standard",
    "name": "Standard"
  },
  "sourceDestination": {
    "source": "Mumbai",
    "destination": "Colombo"
  }
}
```

## 🧪 Testing

### Run API Tests

```bash
# Start the development server
npm run dev

# In another terminal, run the test script
node scripts/test-api-endpoints.js
```

### Manual Testing with curl

```bash
# Test destinations
curl "http://localhost:3000/api/destinations?search=sigiriya"

# Test transport
curl "http://localhost:3000/api/transport?type=home_pickup"

# Test bookings
curl "http://localhost:3000/api/bookings?status=confirmed"

# Create a booking
curl -X POST "http://localhost:3000/api/bookings" \
  -H "Content-Type: application/json" \
  -d '{
    "travellerName": "Test User",
    "email": "test@example.com",
    "source": "Mumbai",
    "destination": "Colombo",
    "duration": 5,
    "travelers": 2
  }'
```

## 📊 Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": [...],
  "count": 10,
  "total": 50,
  "limit": 10,
  "offset": 0,
  "hasMore": true
}
```

## 🔒 Error Handling

Error responses follow this format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

## 🚀 Integration with Frontend

The API endpoints are designed to work seamlessly with the booking workflow:

1. **Step 1**: Use `/api/destinations` to show available destinations
2. **Step 2**: Use `/api/transport`, `/api/flights`, `/api/hotels` for service selection
3. **Step 3**: Use `/api/vendors` to show available service providers
4. **Step 4**: Use `/api/itinerary` to generate personalized itineraries
5. **Step 5**: Use `/api/bookings` to create bookings
6. **Step 6**: Use `/api/vendor-proposals` for competitive pricing
7. **Step 7**: Use `/api/notifications` for real-time updates

## 📈 Performance Considerations

- All endpoints support pagination with `limit` and `offset`
- Filtering is implemented at the data level for efficiency
- Mock data is loaded once and cached in memory
- File-based storage for development (replace with database in production)

## 🔧 Development Notes

- All data is stored in JSON files in the `/data` directory
- API routes are in `/app/api/` following Next.js App Router conventions
- Error handling includes proper HTTP status codes
- All endpoints return consistent response formats
- CORS is handled by Next.js automatically

## 🎯 Next Steps

1. **Database Integration**: Replace JSON files with a real database
2. **Authentication**: Add JWT-based authentication
3. **Rate Limiting**: Implement API rate limiting
4. **Caching**: Add Redis caching for better performance
5. **Monitoring**: Add API monitoring and logging
6. **Documentation**: Generate OpenAPI/Swagger documentation
