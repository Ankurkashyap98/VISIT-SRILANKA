# Mock API Guide - No Database Required

This guide explains how to use the mock API system for the Sri Lanka Tourism platform without requiring a MySQL database.

## 🚀 Quick Start

### 1. Start Development Server
```bash
# Using Turbopack (recommended)
npm run dev

# Using Webpack
npm run dev:webpack

# Mock API specific
npm run dev:mock
```

### 2. Test Mock APIs
Visit: `http://localhost:3000/mock-api-demo`

## 📁 Mock API Structure

### API Endpoints

#### Destinations
- `GET /api/destinations` - List all destinations
- `GET /api/destinations?featured=true` - Featured destinations
- `GET /api/destinations?search=query` - Search destinations
- `GET /api/destinations/[id]` - Get specific destination
- `POST /api/destinations` - Create destination (Admin)
- `PUT /api/destinations/[id]` - Update destination (Admin)
- `DELETE /api/destinations/[id]` - Delete destination (Admin)

#### Experiences
- `GET /api/experiences` - List all experiences
- `GET /api/experiences?featured=true` - Featured experiences
- `GET /api/experiences?search=query` - Search experiences
- `POST /api/experiences` - Create experience (Admin)

#### Medical Services
- `GET /api/medical` - List medical services
- `GET /api/medical?featured=true` - Featured services
- `GET /api/medical?search=query` - Search services
- `POST /api/medical` - Create service (Admin)

#### Bookings
- `GET /api/bookings?userId=123` - User bookings
- `GET /api/bookings/[id]` - Specific booking
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/[id]` - Update booking
- `DELETE /api/bookings/[id]` - Cancel booking

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

#### Analytics
- `GET /api/analytics` - Analytics data

## 🔧 Mock Data Structure

### Users
```typescript
interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'user' | 'admin' | 'super_admin' | 'tourism_admin' | 'content_admin'
  userType: 'tourist' | 'medical-tourist' | 'luxury-traveler' | 'admin'
  verified: boolean
  createdAt: string
  updatedAt: string
}
```

### Destinations
```typescript
interface Destination {
  id: string
  name: string
  description: string
  image: string
  location: string
  rating: number
  price: number
  currency: string
  category: string
  verified: boolean
  governmentApproved: boolean
  highlights: string[]
  slug: string
  reviews: Review[]
  createdAt: string
  updatedAt: string
}
```

## 🎯 Features

### 1. **No Database Required**
- Works without MySQL, PostgreSQL, or any database
- Perfect for development and testing
- Easy to deploy and share

### 2. **Realistic Data**
- Comprehensive mock data with relationships
- Real-world scenarios and edge cases
- Proper data validation and error handling

### 3. **Full API Coverage**
- All CRUD operations
- Search and filtering
- Pagination support
- Authentication flows
- Analytics endpoints

### 4. **State Management Integration**
- Works with Zustand stores
- React Query integration
- Optimistic updates
- Error handling

## 🛠️ Usage Examples

### Fetch Destinations
```typescript
// Using React Query
const { data: destinations, isLoading, error } = useDestinations({
  search: 'sigiriya',
  category: 'Historical',
  rating: 4.5
})
```

### Create Booking
```typescript
const createBooking = useCreateBooking()

await createBooking.mutate({
  userId: '123',
  items: [{
    id: '1',
    type: 'destination',
    name: 'Sigiriya',
    price: 30,
    quantity: 2
  }],
  checkIn: '2024-03-15',
  checkOut: '2024-03-17',
  guests: 2,
  contactInfo: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 555 123 4567'
  }
})
```

### Search with Filters
```typescript
// Search destinations
const response = await fetch('/api/destinations?search=kandy&category=Religious&rating=4.5')
const data = await response.json()
```

## 🔄 Migration to Real Database

When ready to use a real database:

1. **Install Database**
   ```bash
   npm install mysql2 prisma
   ```

2. **Setup Prisma**
   ```bash
   npx prisma init
   npx prisma db push
   npx prisma db seed
   ```

3. **Update API Routes**
   - Replace mock data with database queries
   - Add proper error handling
   - Implement authentication middleware

4. **Environment Variables**
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/srilanka_tourism"
   NEXTAUTH_SECRET="your-secret-key"
   ```

## 📊 Mock Data Statistics

- **Users**: 3 mock users (admin, tourist, medical-tourist)
- **Destinations**: 3 destinations with full details
- **Experiences**: 2 experiences with reviews
- **Medical Services**: 1 medical service
- **Bookings**: 1 sample booking
- **Reviews**: Multiple reviews per item

## 🧪 Testing

### Manual Testing
1. Visit `/mock-api-demo` page
2. Click API test buttons
3. Verify responses and data structure

### Automated Testing
```bash
# Test specific endpoint
curl -X GET http://localhost:3000/api/destinations

# Test with filters
curl -X GET "http://localhost:3000/api/destinations?featured=true&rating=4.5"
```

## 🚀 Deployment

### Vercel Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Customization

### Add New Mock Data
1. Edit `lib/mockData.ts`
2. Add new data to arrays
3. Update search functions
4. Test with API endpoints

### Add New API Endpoints
1. Create new route file in `app/api/`
2. Import mock data functions
3. Implement CRUD operations
4. Add to demo page

## 📈 Performance

- **Fast Development**: No database setup required
- **Instant Responses**: Mock data loads immediately
- **Easy Testing**: Predictable data for testing
- **Scalable**: Easy to add more mock data

## 🎯 Benefits

1. **Development Speed**: Start coding immediately
2. **No Dependencies**: Works without external services
3. **Easy Sharing**: Share project without database setup
4. **Testing**: Perfect for unit and integration tests
5. **Demo Ready**: Great for presentations and demos

## 🔍 Troubleshooting

### Common Issues

1. **API Not Responding**
   - Check if development server is running
   - Verify endpoint URLs
   - Check browser console for errors

2. **Data Not Loading**
   - Verify mock data structure
   - Check API response format
   - Ensure proper error handling

3. **State Management Issues**
   - Check Zustand store setup
   - Verify React Query configuration
   - Ensure proper data flow

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev
```

## 📚 Additional Resources

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Mock API Best Practices](https://www.mockapi.io/docs)

---

**Ready to start?** Run `npm run dev` and visit `http://localhost:3000/mock-api-demo` to test the mock APIs! 🚀
