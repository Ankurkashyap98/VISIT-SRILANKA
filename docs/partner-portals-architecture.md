# Partner Portals Architecture - Sri Lanka Tourism

## Overview

The Partner Portals provide specialized interfaces for different types of tourism business partners (Homestay, Transport, Medical) to manage their services, bookings, and business operations within the Sri Lanka Tourism platform ecosystem.

## Technology Stack

### Frontend Technologies
- **Framework**: Next.js 15+ with TypeScript
- **UI Library**: Tailwind CSS + Headless UI + Radix UI
- **State Management**: Zustand + React Query
- **Forms**: React Hook Form + Zod validation
- **Charts**: Chart.js + Recharts for analytics
- **File Upload**: React Dropzone for image/document uploads

### Backend Technologies
- **API Framework**: Next.js API routes + Express.js microservices
- **Database**: PostgreSQL with partner-specific schemas
- **Authentication**: NextAuth.js with partner-specific roles
- **File Storage**: AWS S3 for partner assets
- **Real-time**: WebSocket for booking notifications
- **Payment Processing**: Stripe integration for commission handling

## Portal Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PARTNER PORTAL ECOSYSTEM                      │
├─────────────────────────────────────────────────────────────────┤
│  Authentication & Authorization                                 │
│  ├── Partner Registration & Verification                        │
│  ├── Role-based Access Control                                  │
│  └── Multi-factor Authentication                                │
├─────────────────────────────────────────────────────────────────┤
│  Portal Types                                                   │
│  ├── Homestay Partner Portal                                    │
│  ├── Transport Partner Portal                                   │
│  └── Medical Partner Portal                                     │
├─────────────────────────────────────────────────────────────────┤
│  Shared Services                                                │
│  ├── Booking Management                                         │
│  ├── Financial Management                                       │
│  ├── Communication System                                       │
│  ├── Analytics & Reporting                                      │
│  └── Support System                                             │
└─────────────────────────────────────────────────────────────────┘
```

## 1. Homestay Partner Portal

### Core Features

#### Property Management
- **Property Listing**: Create and manage property listings
- **Room Management**: Manage rooms, amenities, and pricing
- **Photo Gallery**: Upload and manage property images
- **Availability Calendar**: Manage booking availability
- **Pricing Management**: Set dynamic pricing and seasonal rates

#### Booking Management
- **Booking Dashboard**: View and manage all bookings
- **Guest Communication**: Communicate with guests
- **Check-in/Check-out**: Manage guest arrivals and departures
- **Booking Modifications**: Handle booking changes and cancellations
- **Review Management**: Respond to guest reviews

#### Financial Management
- **Revenue Tracking**: Track earnings and commission
- **Payment History**: View payment history and statements
- **Commission Reports**: Detailed commission breakdown
- **Tax Documentation**: Generate tax-related documents
- **Financial Analytics**: Revenue trends and projections

### Implementation

```typescript
// Homestay Partner Service
interface HomestayPartnerService {
  // Property Management
  createProperty(propertyData: PropertyData): Promise<Property>
  updateProperty(propertyId: string, updates: PropertyUpdate): Promise<Property>
  manageAvailability(propertyId: string, availability: AvailabilityData): Promise<void>
  updatePricing(propertyId: string, pricing: PricingData): Promise<void>
  
  // Booking Management
  getBookings(filters: BookingFilters): Promise<Booking[]>
  updateBookingStatus(bookingId: string, status: BookingStatus): Promise<void>
  communicateWithGuest(bookingId: string, message: Message): Promise<void>
  
  // Financial Management
  getRevenueReport(period: DateRange): Promise<RevenueReport>
  getCommissionStatement(): Promise<CommissionStatement>
  requestPayout(): Promise<PayoutRequest>
}

// Homestay Data Types
interface Property {
  id: string
  name: string
  description: string
  address: Address
  type: PropertyType
  rooms: Room[]
  amenities: Amenity[]
  images: PropertyImage[]
  pricing: PricingStructure
  availability: AvailabilityCalendar
  rating: number
  status: PropertyStatus
}

interface Room {
  id: string
  name: string
  type: RoomType
  capacity: number
  amenities: RoomAmenity[]
  pricing: RoomPricing
  images: RoomImage[]
  availability: AvailabilityCalendar
}
```

### User Interface

#### Dashboard Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Header: Logo | Notifications | Profile | Support               │
├─────────────────────────────────────────────────────────────────┤
│  Sidebar Navigation                                             │
│  ├── Dashboard Overview                                        │
│  ├── Properties                                                │
│  ├── Bookings                                                  │
│  ├── Calendar                                                  │
│  ├── Guests                                                    │
│  ├── Reviews                                                   │
│  ├── Financials                                                │
│  ├── Analytics                                                 │
│  └── Settings                                                  │
├─────────────────────────────────────────────────────────────────┤
│  Main Content Area                                             │
│  ├── Key Metrics Cards                                         │
│  ├── Recent Bookings                                           │
│  ├── Revenue Charts                                            │
│  └── Quick Actions                                             │
└─────────────────────────────────────────────────────────────────┘
```

#### Key Screens

**Property Management Screen**
- Property listing with photos and details
- Room configuration and pricing setup
- Availability calendar management
- Amenity and service configuration

**Booking Management Screen**
- Booking calendar view
- Guest communication interface
- Check-in/check-out management
- Booking modification tools

**Financial Dashboard**
- Revenue charts and trends
- Commission tracking
- Payment history
- Tax document generation

## 2. Transport Partner Portal

### Core Features

#### Fleet Management
- **Vehicle Registration**: Register and manage vehicles
- **Driver Management**: Manage driver profiles and licenses
- **Route Management**: Define and manage routes
- **Maintenance Scheduling**: Track vehicle maintenance
- **Insurance Management**: Manage vehicle insurance

#### Booking Management
- **Trip Booking**: Manage trip bookings and assignments
- **Driver Scheduling**: Schedule drivers for trips
- **Route Optimization**: Optimize routes for efficiency
- **Real-time Tracking**: Track vehicles in real-time
- **Customer Communication**: Communicate with customers

#### Financial Management
- **Trip Revenue**: Track revenue per trip
- **Driver Payments**: Manage driver payments
- **Fuel Tracking**: Track fuel expenses
- **Maintenance Costs**: Track maintenance expenses
- **Profit Analysis**: Analyze profitability

### Implementation

```typescript
// Transport Partner Service
interface TransportPartnerService {
  // Fleet Management
  registerVehicle(vehicleData: VehicleData): Promise<Vehicle>
  manageDriver(driverData: DriverData): Promise<Driver>
  createRoute(routeData: RouteData): Promise<Route>
  scheduleMaintenance(vehicleId: string, maintenance: MaintenanceData): Promise<void>
  
  // Booking Management
  acceptBooking(bookingId: string, driverId: string): Promise<void>
  updateTripStatus(tripId: string, status: TripStatus): Promise<void>
  optimizeRoute(tripId: string): Promise<OptimizedRoute>
  trackVehicle(vehicleId: string): Promise<VehicleLocation>
  
  // Financial Management
  getTripRevenue(period: DateRange): Promise<TripRevenue>
  processDriverPayment(driverId: string, amount: number): Promise<Payment>
  trackExpenses(period: DateRange): Promise<ExpenseReport>
}

// Transport Data Types
interface Vehicle {
  id: string
  registrationNumber: string
  type: VehicleType
  capacity: number
  features: VehicleFeature[]
  insurance: InsuranceInfo
  maintenance: MaintenanceRecord[]
  status: VehicleStatus
  currentLocation?: Location
}

interface Driver {
  id: string
  name: string
  licenseNumber: string
  licenseExpiry: Date
  phone: string
  rating: number
  availability: AvailabilityStatus
  assignedVehicle?: string
}
```

### User Interface

#### Dashboard Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Header: Logo | Notifications | Profile | Support               │
├─────────────────────────────────────────────────────────────────┤
│  Sidebar Navigation                                             │
│  ├── Dashboard Overview                                        │
│  ├── Fleet Management                                          │
│  ├── Driver Management                                         │
│  ├── Route Management                                          │
│  ├── Trip Bookings                                            │
│  ├── Real-time Tracking                                       │
│  ├── Maintenance                                              │
│  ├── Financials                                               │
│  └── Settings                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Main Content Area                                             │
│  ├── Fleet Status Overview                                     │
│  ├── Active Trips                                              │
│  ├── Driver Availability                                       │
│  └── Revenue Summary                                           │
└─────────────────────────────────────────────────────────────────┘
```

#### Key Screens

**Fleet Management Screen**
- Vehicle inventory with status indicators
- Driver management and assignment
- Maintenance scheduling calendar
- Insurance and documentation tracking

**Trip Management Screen**
- Trip booking queue
- Driver assignment interface
- Real-time trip tracking
- Customer communication tools

**Analytics Dashboard**
- Trip completion rates
- Revenue per vehicle/driver
- Fuel efficiency metrics
- Customer satisfaction scores

## 3. Medical Partner Portal

### Core Features

#### Practice Management
- **Doctor Profiles**: Manage doctor and specialist profiles
- **Service Catalog**: Manage medical services and procedures
- **Appointment Scheduling**: Manage appointment availability
- **Facility Management**: Manage clinic/hospital facilities
- **Equipment Tracking**: Track medical equipment

#### Patient Management
- **Medical Tourist Profiles**: Manage international patient profiles
- **Treatment Planning**: Create and manage treatment plans
- **Medical Records**: Manage patient medical records
- **Progress Tracking**: Track patient recovery progress
- **Follow-up Scheduling**: Schedule follow-up appointments

#### Compliance & Quality
- **License Management**: Track medical licenses and certifications
- **Quality Assurance**: Manage quality standards and protocols
- **Regulatory Compliance**: Ensure regulatory compliance
- **Accreditation**: Manage international accreditations
- **Audit Management**: Handle quality audits

### Implementation

```typescript
// Medical Partner Service
interface MedicalPartnerService {
  // Practice Management
  manageDoctorProfile(doctorData: DoctorData): Promise<Doctor>
  updateServiceCatalog(services: MedicalService[]): Promise<void>
  manageAppointments(availability: AppointmentAvailability): Promise<void>
  updateFacilityInfo(facilityData: FacilityData): Promise<Facility>
  
  // Patient Management
  createPatientProfile(patientData: PatientData): Promise<Patient>
  createTreatmentPlan(patientId: string, plan: TreatmentPlan): Promise<void>
  updateMedicalRecord(patientId: string, record: MedicalRecord): Promise<void>
  trackProgress(patientId: string, progress: ProgressUpdate): Promise<void>
  
  // Compliance Management
  updateLicense(licenseData: LicenseData): Promise<void>
  conductQualityAudit(): Promise<QualityAudit>
  generateComplianceReport(): Promise<ComplianceReport>
}

// Medical Data Types
interface Doctor {
  id: string
  name: string
  specialization: MedicalSpecialization
  qualifications: Qualification[]
  experience: number
  languages: string[]
  rating: number
  availability: AvailabilitySchedule
  consultationFee: number
}

interface MedicalService {
  id: string
  name: string
  category: ServiceCategory
  description: string
  duration: number
  price: number
  requirements: string[]
  recoveryTime: string
  successRate: number
}
```

### User Interface

#### Dashboard Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Header: Logo | Notifications | Profile | Support               │
├─────────────────────────────────────────────────────────────────┤
│  Sidebar Navigation                                             │
│  ├── Dashboard Overview                                        │
│  ├── Practice Management                                       │
│  ├── Doctor Profiles                                           │
│  ├── Service Catalog                                           │
│  ├── Appointment Calendar                                      │
│  ├── Patient Management                                        │
│  ├── Medical Records                                           │
│  ├── Compliance                                                │
│  ├── Quality Assurance                                         │
│  └── Settings                                                  │
├─────────────────────────────────────────────────────────────────┤
│  Main Content Area                                             │
│  ├── Practice Metrics                                          │
│  ├── Upcoming Appointments                                     │
│  ├── Patient Status Overview                                   │
│  └── Compliance Status                                         │
└─────────────────────────────────────────────────────────────────┘
```

#### Key Screens

**Practice Management Screen**
- Doctor and specialist profiles
- Service catalog with pricing
- Appointment scheduling calendar
- Facility and equipment management

**Patient Management Screen**
- Medical tourist profiles
- Treatment plan creation
- Medical record management
- Progress tracking interface

**Compliance Dashboard**
- License and certification tracking
- Quality assurance metrics
- Regulatory compliance status
- Audit management tools

## Shared Services Architecture

### 1. Booking Management System

#### Core Booking Features
- **Booking Creation**: Create new bookings
- **Booking Modifications**: Modify existing bookings
- **Booking Cancellations**: Handle booking cancellations
- **Booking Status Tracking**: Track booking status changes
- **Booking Analytics**: Analyze booking patterns

#### Implementation
```typescript
// Shared Booking Service
interface BookingManagementService {
  createBooking(bookingData: CreateBookingData): Promise<Booking>
  updateBooking(bookingId: string, updates: BookingUpdate): Promise<Booking>
  cancelBooking(bookingId: string, reason: string): Promise<void>
  getBookingStatus(bookingId: string): Promise<BookingStatus>
  getBookingAnalytics(partnerId: string, period: DateRange): Promise<BookingAnalytics>
}

// Booking Types
interface Booking {
  id: string
  partnerId: string
  customerId: string
  serviceType: ServiceType
  serviceDetails: ServiceDetails
  dates: BookingDates
  status: BookingStatus
  totalAmount: number
  commission: number
  createdAt: Date
  updatedAt: Date
}
```

### 2. Financial Management System

#### Revenue Management
- **Revenue Tracking**: Track partner revenue
- **Commission Calculation**: Calculate platform commissions
- **Payment Processing**: Process partner payments
- **Financial Reporting**: Generate financial reports
- **Tax Management**: Handle tax calculations and reporting

#### Implementation
```typescript
// Financial Management Service
interface FinancialManagementService {
  calculateCommission(bookingId: string): Promise<CommissionCalculation>
  processPayment(partnerId: string, amount: number): Promise<PaymentResult>
  generateRevenueReport(partnerId: string, period: DateRange): Promise<RevenueReport>
  handleRefund(bookingId: string, amount: number): Promise<RefundResult>
  generateTaxDocument(partnerId: string, period: DateRange): Promise<TaxDocument>
}

// Financial Types
interface CommissionCalculation {
  bookingId: string
  grossAmount: number
  commissionRate: number
  commissionAmount: number
  netAmount: number
  paymentDate: Date
}
```

### 3. Communication System

#### Multi-channel Communication
- **In-app Messaging**: Real-time messaging within the platform
- **Email Notifications**: Automated email notifications
- **SMS Notifications**: SMS alerts for urgent matters
- **Push Notifications**: Mobile push notifications
- **WhatsApp Integration**: WhatsApp Business integration

#### Implementation
```typescript
// Communication Service
interface CommunicationService {
  sendMessage(to: string, message: Message, channel: CommunicationChannel): Promise<void>
  sendNotification(partnerId: string, notification: Notification): Promise<void>
  scheduleMessage(message: ScheduledMessage): Promise<void>
  getMessageHistory(conversationId: string): Promise<Message[]>
  updateMessageStatus(messageId: string, status: MessageStatus): Promise<void>
}

// Communication Types
interface Message {
  id: string
  from: string
  to: string
  content: string
  type: MessageType
  channel: CommunicationChannel
  timestamp: Date
  status: MessageStatus
}
```

### 4. Analytics & Reporting

#### Partner Analytics
- **Performance Metrics**: Track partner performance
- **Revenue Analytics**: Analyze revenue trends
- **Customer Satisfaction**: Track customer ratings and reviews
- **Operational Metrics**: Track operational efficiency
- **Predictive Analytics**: Forecast future performance

#### Implementation
```typescript
// Analytics Service
interface AnalyticsService {
  getPerformanceMetrics(partnerId: string, period: DateRange): Promise<PerformanceMetrics>
  getRevenueAnalytics(partnerId: string, period: DateRange): Promise<RevenueAnalytics>
  getCustomerSatisfaction(partnerId: string, period: DateRange): Promise<SatisfactionMetrics>
  getOperationalMetrics(partnerId: string, period: DateRange): Promise<OperationalMetrics>
  generatePredictiveReport(partnerId: string): Promise<PredictiveReport>
}

// Analytics Types
interface PerformanceMetrics {
  partnerId: string
  period: DateRange
  totalBookings: number
  revenue: number
  averageRating: number
  customerSatisfaction: number
  operationalEfficiency: number
}
```

## Security & Compliance

### Authentication & Authorization
- **Partner Registration**: Secure partner onboarding process
- **Multi-factor Authentication**: Enhanced security for partner accounts
- **Role-based Access Control**: Granular permissions per partner type
- **API Security**: Secure API endpoints with rate limiting

### Data Protection
- **Data Encryption**: Encrypt sensitive partner and customer data
- **GDPR Compliance**: Ensure data privacy compliance
- **Audit Logging**: Track all partner actions and changes
- **Backup & Recovery**: Regular backups with disaster recovery

### Implementation
```typescript
// Security Service
interface SecurityService {
  registerPartner(partnerData: PartnerRegistrationData): Promise<Partner>
  verifyPartner(partnerId: string, verificationData: VerificationData): Promise<VerificationResult>
  authenticatePartner(credentials: LoginCredentials): Promise<AuthResult>
  authorizeAction(partnerId: string, action: string, resource: string): Promise<boolean>
  logAuditEvent(event: AuditEvent): Promise<void>
}
```

## Integration Architecture

### External System Integration
- **Payment Gateways**: Stripe, PayPal, local payment methods
- **Communication APIs**: Twilio, SendGrid, WhatsApp Business API
- **Maps & Navigation**: Google Maps, OpenStreetMap
- **Government Systems**: License verification, compliance checking
- **Third-party Services**: Weather, currency conversion, translation

### Platform Integration
- **Main Tourism Platform**: Seamless integration with main platform
- **Admin Dashboard**: Real-time data sharing with government admin
- **Mobile Apps**: Partner data accessible through mobile apps
- **API Gateway**: Centralized API management and routing

## Performance & Scalability

### Caching Strategy
- **Redis Caching**: Cache frequently accessed data
- **CDN Integration**: Cache static assets and images
- **Database Query Caching**: Cache expensive database queries
- **API Response Caching**: Cache API responses

### Load Balancing
- **Application Load Balancer**: Distribute traffic across instances
- **Database Load Balancing**: Use read replicas for read operations
- **Microservices**: Independent scaling of services
- **Auto-scaling**: Dynamic resource allocation based on demand

## Deployment & Maintenance

### Deployment Strategy
- **Container Deployment**: Docker containers for consistent deployment
- **Blue-Green Deployment**: Zero-downtime deployments
- **Feature Flags**: Control feature rollouts
- **Database Migrations**: Safe database updates

### Monitoring & Maintenance
- **Application Monitoring**: Track application performance
- **Error Tracking**: Monitor and alert on errors
- **Performance Monitoring**: Track response times and throughput
- **Regular Updates**: Automated security and feature updates

This comprehensive partner portal architecture provides specialized interfaces for different types of tourism partners while maintaining consistency, security, and scalability across the platform ecosystem.
