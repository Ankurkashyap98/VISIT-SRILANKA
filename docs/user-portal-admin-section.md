# User Portal Admin Section - Sri Lanka Tourism Platform

## Overview

The User Portal Admin Section is a comprehensive administrative interface designed for government administrators, tourism authorities, and system administrators to manage the Sri Lanka Tourism platform effectively.

## Admin Section Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER PORTAL ADMIN SECTION                     │
├─────────────────────────────────────────────────────────────────┤
│  🔐 Authentication & Authorization                              │
│  ├── Multi-factor Authentication                                │
│  ├── Role-based Access Control                                  │
│  ├── Session Management                                         │
│  └── Audit Logging                                             │
├─────────────────────────────────────────────────────────────────┤
│  📊 Analytics & Monitoring Dashboard                           │
│  ├── Tourist Analytics                                         │
│  ├── Revenue & Booking Metrics                                 │
│  ├── Partner Performance                                       │
│  └── System Health Monitoring                                  │
├─────────────────────────────────────────────────────────────────┤
│  👥 User Management                                            │
│  ├── User Registration & Verification                          │
│  ├── Partner Onboarding                                        │
│  ├── Role Assignment                                           │
│  └── User Activity Monitoring                                  │
├─────────────────────────────────────────────────────────────────┤
│  🏢 Partner Management                                         │
│  ├── Homestay Approval & Tracking                              │
│  ├── Transport Partner Management                              │
│  ├── Medical Partner Verification                              │
│  └── Quality Assurance                                         │
├─────────────────────────────────────────────────────────────────┤
│  📝 Content Management                                         │
│  ├── Destination Information                                   │
│  ├── Event Management                                          │
│  ├── Policy Updates                                            │
│  └── Emergency Alerts                                          │
├─────────────────────────────────────────────────────────────────┤
│  🚨 Crisis Management Center                                   │
│  ├── Security Alert Dashboard                                  │
│  ├── Emergency Response                                        │
│  ├── Communication Hub                                         │
│  └── Resource Coordination                                     │
├─────────────────────────────────────────────────────────────────┤
│  💰 Financial Management                                       │
│  ├── Revenue Tracking                                          │
│  ├── Commission Management                                     │
│  ├── Budget Allocation                                         │
│  └── Financial Reporting                                       │
└─────────────────────────────────────────────────────────────────┘
```

## 1. 🔐 Authentication & Authorization

### Multi-factor Authentication
```typescript
interface AdminAuth {
  primaryAuth: {
    email: string
    password: string
    rememberMe: boolean
  }
  secondaryAuth: {
    method: 'sms' | 'email' | 'totp' | 'biometric'
    code?: string
    backupCodes?: string[]
  }
  deviceVerification: {
    deviceId: string
    deviceName: string
    location: string
    trusted: boolean
  }
}

// Implementation
class AdminAuthService {
  async authenticateAdmin(credentials: AdminCredentials): Promise<AuthResult> {
    // Step 1: Primary authentication
    const primaryResult = await this.primaryAuth(credentials.email, credentials.password)
    
    if (!primaryResult.success) {
      return { success: false, error: 'Invalid credentials' }
    }
    
    // Step 2: Secondary authentication
    const secondaryResult = await this.secondaryAuth(primaryResult.userId, credentials.secondaryAuth)
    
    if (!secondaryResult.success) {
      return { success: false, error: 'Secondary authentication failed' }
    }
    
    // Step 3: Device verification
    const deviceResult = await this.verifyDevice(primaryResult.userId, credentials.deviceInfo)
    
    return {
      success: true,
      token: await this.generateJWT(primaryResult.userId),
      user: primaryResult.user,
      permissions: await this.getUserPermissions(primaryResult.userId)
    }
  }
}
```

### Role-based Access Control
```typescript
enum AdminRole {
  SUPER_ADMIN = 'super_admin',
  TOURISM_ADMIN = 'tourism_admin',
  PARTNER_ADMIN = 'partner_admin',
  CONTENT_ADMIN = 'content_admin',
  ANALYTICS_ADMIN = 'analytics_admin',
  CRISIS_ADMIN = 'crisis_admin',
  FINANCIAL_ADMIN = 'financial_admin'
}

interface AdminPermission {
  resource: string
  actions: ('create' | 'read' | 'update' | 'delete' | 'approve' | 'reject')[]
  conditions?: PermissionCondition[]
}

interface AdminUser {
  id: string
  email: string
  name: string
  role: AdminRole
  permissions: AdminPermission[]
  department: string
  lastLogin: Date
  isActive: boolean
  mfaEnabled: boolean
}
```

## 2. 📊 Analytics & Monitoring Dashboard

### Tourist Analytics Dashboard
```typescript
interface TouristAnalytics {
  demographics: {
    ageGroups: { [ageRange: string]: number }
    nationalities: { [country: string]: number }
    genderDistribution: { male: number, female: number, other: number }
  }
  preferences: {
    popularDestinations: Destination[]
    accommodationTypes: { [type: string]: number }
    activityPreferences: { [activity: string]: number }
    budgetRanges: { [range: string]: number }
  }
  travelPatterns: {
    averageStayDuration: number
    seasonalTrends: MonthlyData[]
    repeatVisitorRate: number
    bookingAdvanceTime: number
  }
  behavioralAnalytics: {
    userJourney: JourneyStep[]
    conversionFunnels: ConversionFunnel[]
    engagementMetrics: EngagementMetric[]
    retentionRates: RetentionData[]
  }
}

// Dashboard Component
const TouristAnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<TouristAnalytics | null>(null)
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
    end: new Date()
  })
  const [selectedMetric, setSelectedMetric] = useState<string>('demographics')

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Tourist Analytics Dashboard</h1>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>
      
      <div className="metrics-grid">
        <MetricCard
          title="Total Visitors"
          value={analyticsData?.totalVisitors || 0}
          change={12.5}
          trend="up"
        />
        <MetricCard
          title="Average Stay Duration"
          value={`${analyticsData?.travelPatterns?.averageStayDuration || 0} days`}
          change={-2.3}
          trend="down"
        />
        <MetricCard
          title="Repeat Visitor Rate"
          value={`${analyticsData?.travelPatterns?.repeatVisitorRate || 0}%`}
          change={5.7}
          trend="up"
        />
        <MetricCard
          title="Revenue Growth"
          value="15.2%"
          change={3.4}
          trend="up"
        />
      </div>

      <div className="charts-section">
        <div className="chart-row">
          <DemographicsChart data={analyticsData?.demographics} />
          <PreferencesChart data={analyticsData?.preferences} />
        </div>
        <div className="chart-row">
          <TravelPatternsChart data={analyticsData?.travelPatterns} />
          <BehavioralAnalyticsChart data={analyticsData?.behavioralAnalytics} />
        </div>
      </div>
    </div>
  )
}
```

### Revenue & Booking Metrics
```typescript
interface RevenueAnalytics {
  totalRevenue: number
  revenueByCategory: {
    accommodations: number
    transport: number
    activities: number
    medical: number
    luxury: number
  }
  revenueByDestination: DestinationRevenue[]
  bookingMetrics: {
    totalBookings: number
    conversionRate: number
    averageBookingValue: number
    cancellationRate: number
    refundRate: number
  }
  seasonalAnalysis: {
    peakMonths: Month[]
    lowMonths: Month[]
    seasonalFactors: SeasonalFactor[]
  }
  forecasting: {
    nextMonth: number
    nextQuarter: number
    nextYear: number
    confidence: number
  }
}

const RevenueDashboard: React.FC = () => {
  return (
    <div className="revenue-dashboard">
      <div className="revenue-overview">
        <h2>Revenue Overview</h2>
        <div className="revenue-cards">
          <RevenueCard
            title="Total Revenue"
            value={formatCurrency(revenueData.totalRevenue)}
            period="This Month"
            change={revenueData.monthlyChange}
          />
          <RevenueCard
            title="Average Booking Value"
            value={formatCurrency(revenueData.bookingMetrics.averageBookingValue)}
            period="This Month"
            change={revenueData.bookingValueChange}
          />
          <RevenueCard
            title="Conversion Rate"
            value={`${revenueData.bookingMetrics.conversionRate}%`}
            period="This Month"
            change={revenueData.conversionChange}
          />
        </div>
      </div>

      <div className="revenue-breakdown">
        <RevenueByCategoryChart data={revenueData.revenueByCategory} />
        <RevenueByDestinationChart data={revenueData.revenueByDestination} />
      </div>

      <div className="forecasting-section">
        <h3>Revenue Forecasting</h3>
        <ForecastingChart data={revenueData.forecasting} />
      </div>
    </div>
  )
}
```

## 3. 👥 User Management

### User Registration & Verification
```typescript
interface UserManagementDashboard {
  pendingRegistrations: PendingUser[]
  verifiedUsers: VerifiedUser[]
  blockedUsers: BlockedUser[]
  userStatistics: UserStatistics
}

interface PendingUser {
  id: string
  email: string
  name: string
  userType: UserType
  registrationDate: Date
  verificationDocuments: Document[]
  riskScore: number
  status: 'pending' | 'under_review' | 'requires_documents'
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<UserManagementDashboard | null>(null)
  const [selectedTab, setSelectedTab] = useState<'pending' | 'verified' | 'blocked'>('pending')

  return (
    <div className="user-management-page">
      <div className="page-header">
        <h1>User Management</h1>
        <div className="user-stats">
          <StatCard title="Pending" value={users?.userStatistics.pending} color="warning" />
          <StatCard title="Verified" value={users?.userStatistics.verified} color="success" />
          <StatCard title="Blocked" value={users?.userStatistics.blocked} color="danger" />
        </div>
      </div>

      <div className="tabs">
        <TabButton
          active={selectedTab === 'pending'}
          onClick={() => setSelectedTab('pending')}
        >
          Pending Registrations ({users?.pendingRegistrations.length || 0})
        </TabButton>
        <TabButton
          active={selectedTab === 'verified'}
          onClick={() => setSelectedTab('verified')}
        >
          Verified Users ({users?.verifiedUsers.length || 0})
        </TabButton>
        <TabButton
          active={selectedTab === 'blocked'}
          onClick={() => setSelectedTab('blocked')}
        >
          Blocked Users ({users?.blockedUsers.length || 0})
        </TabButton>
      </div>

      <div className="user-list">
        {selectedTab === 'pending' && (
          <PendingUsersList
            users={users?.pendingRegistrations || []}
            onApprove={handleUserApproval}
            onReject={handleUserRejection}
            onRequestDocuments={handleDocumentRequest}
          />
        )}
        {selectedTab === 'verified' && (
          <VerifiedUsersList
            users={users?.verifiedUsers || []}
            onBlock={handleUserBlock}
            onEdit={handleUserEdit}
          />
        )}
        {selectedTab === 'blocked' && (
          <BlockedUsersList
            users={users?.blockedUsers || []}
            onUnblock={handleUserUnblock}
            onPermanentlyDelete={handleUserDelete}
          />
        )}
      </div>
    </div>
  )
}
```

### Partner Onboarding
```typescript
interface PartnerOnboarding {
  pendingApplications: PartnerApplication[]
  underReview: PartnerApplication[]
  approved: PartnerApplication[]
  rejected: PartnerApplication[]
}

interface PartnerApplication {
  id: string
  businessName: string
  ownerName: string
  businessType: 'homestay' | 'transport' | 'medical' | 'tour_guide'
  location: string
  applicationDate: Date
  documents: {
    businessLicense: DocumentStatus
    insurance: DocumentStatus
    taxRegistration: DocumentStatus
    qualityCertification: DocumentStatus
  }
  inspectionStatus: 'pending' | 'scheduled' | 'completed'
  riskAssessment: RiskAssessment
  status: 'pending' | 'under_review' | 'approved' | 'rejected'
}

const PartnerOnboardingPage: React.FC = () => {
  return (
    <div className="partner-onboarding-page">
      <div className="onboarding-stats">
        <StatCard title="Pending Applications" value={onboardingData.pendingApplications.length} />
        <StatCard title="Under Review" value={onboardingData.underReview.length} />
        <StatCard title="Approved This Month" value={onboardingData.approved.length} />
        <StatCard title="Rejection Rate" value="5.2%" />
      </div>

      <div className="onboarding-workflow">
        <WorkflowStep
          title="Application Review"
          applications={onboardingData.pendingApplications}
          onAction={handleApplicationAction}
        />
        <WorkflowStep
          title="Document Verification"
          applications={onboardingData.underReview}
          onAction={handleDocumentVerification}
        />
        <WorkflowStep
          title="Quality Inspection"
          applications={onboardingData.underReview}
          onAction={handleQualityInspection}
        />
        <WorkflowStep
          title="Final Approval"
          applications={onboardingData.underReview}
          onAction={handleFinalApproval}
        />
      </div>
    </div>
  )
}
```

## 4. 🏢 Partner Management

### Homestay Approval & Tracking
```typescript
interface HomestayManagement {
  pendingApprovals: HomestayApplication[]
  approvedHomestays: Homestay[]
  qualityInspections: Inspection[]
  performanceMetrics: HomestayMetrics[]
}

interface HomestayApplication {
  id: string
  propertyName: string
  ownerName: string
  location: string
  propertyType: 'villa' | 'apartment' | 'house' | 'bungalow'
  roomCount: number
  guestCapacity: number
  amenities: string[]
  photos: string[]
  pricing: {
    basePrice: number
    seasonalRates: SeasonalRate[]
  }
  documents: {
    propertyDeed: DocumentStatus
    businessLicense: DocumentStatus
    insurance: DocumentStatus
    safetyCertificate: DocumentStatus
  }
  inspection: {
    scheduled: boolean
    date?: Date
    inspector?: string
    status: 'pending' | 'scheduled' | 'completed'
    report?: InspectionReport
  }
  riskAssessment: {
    score: number
    factors: RiskFactor[]
  }
}

const HomestayManagementPage: React.FC = () => {
  return (
    <div className="homestay-management-page">
      <div className="management-header">
        <h1>Homestay Management</h1>
        <div className="quick-actions">
          <Button onClick={scheduleBulkInspections}>Schedule Inspections</Button>
          <Button onClick={generateQualityReport}>Quality Report</Button>
          <Button onClick={exportData}>Export Data</Button>
        </div>
      </div>

      <div className="homestay-metrics">
        <MetricCard title="Total Homestays" value={homestayData.totalHomestays} />
        <MetricCard title="Pending Approvals" value={homestayData.pendingApprovals.length} />
        <MetricCard title="Average Rating" value="4.2" />
        <MetricCard title="Occupancy Rate" value="78%" />
      </div>

      <div className="homestay-sections">
        <HomestayApplicationsSection
          applications={homestayData.pendingApprovals}
          onApprove={handleHomestayApproval}
          onReject={handleHomestayRejection}
          onScheduleInspection={handleInspectionScheduling}
        />
        
        <HomestayQualitySection
          inspections={homestayData.qualityInspections}
          onCompleteInspection={handleInspectionCompletion}
          onGenerateReport={handleReportGeneration}
        />
        
        <HomestayPerformanceSection
          metrics={homestayData.performanceMetrics}
          onViewDetails={handlePerformanceDetails}
        />
      </div>
    </div>
  )
}
```

### Transport Partner Management
```typescript
interface TransportManagement {
  pendingApplications: TransportApplication[]
  approvedPartners: TransportPartner[]
  vehicleInspections: VehicleInspection[]
  routeAnalytics: RouteAnalytics[]
}

interface TransportApplication {
  id: string
  companyName: string
  ownerName: string
  businessType: 'taxi' | 'bus' | 'tuk_tuk' | 'private_vehicle'
  vehicleCount: number
  routes: Route[]
  pricing: PricingStructure
  documents: {
    businessLicense: DocumentStatus
    vehicleRegistration: DocumentStatus[]
    driverLicenses: DocumentStatus[]
    insurance: DocumentStatus
    routePermits: DocumentStatus[]
  }
  qualityStandards: {
    vehicleCondition: 'excellent' | 'good' | 'fair' | 'poor'
    driverTraining: boolean
    safetyEquipment: boolean
    gpsTracking: boolean
  }
}

const TransportManagementPage: React.FC = () => {
  return (
    <div className="transport-management-page">
      <div className="transport-header">
        <h1>Transport Partner Management</h1>
        <div className="transport-stats">
          <StatCard title="Active Partners" value={transportData.approvedPartners.length} />
          <StatCard title="Pending Applications" value={transportData.pendingApplications.length} />
          <StatCard title="Total Vehicles" value={transportData.totalVehicles} />
          <StatCard title="Safety Score" value="4.5/5" />
        </div>
      </div>

      <div className="transport-sections">
        <TransportApplicationsSection
          applications={transportData.pendingApplications}
          onApprove={handleTransportApproval}
          onReject={handleTransportRejection}
        />
        
        <VehicleInspectionsSection
          inspections={transportData.vehicleInspections}
          onScheduleInspection={handleVehicleInspection}
          onCompleteInspection={handleInspectionCompletion}
        />
        
        <RouteAnalyticsSection
          analytics={transportData.routeAnalytics}
          onViewRouteDetails={handleRouteDetails}
        />
      </div>
    </div>
  )
}
```

## 5. 📝 Content Management

### Destination Information Management
```typescript
interface ContentManagement {
  destinations: Destination[]
  events: Event[]
  policies: Policy[]
  announcements: Announcement[]
}

interface Destination {
  id: string
  name: string
  description: string
  category: string
  location: {
    address: string
    coordinates: { lat: number, lng: number }
    district: string
    province: string
  }
  images: string[]
  pricing: {
    adult: number
    child: number
    senior: number
    group: number
  }
  operatingHours: {
    [day: string]: { open: string, close: string }
  }
  accessibility: {
    wheelchairAccessible: boolean
    parking: boolean
    publicTransport: boolean
    facilities: string[]
  }
  status: 'active' | 'inactive' | 'maintenance'
  lastUpdated: Date
  updatedBy: string
}

const ContentManagementPage: React.FC = () => {
  return (
    <div className="content-management-page">
      <div className="content-tabs">
        <TabButton active={true}>Destinations</TabButton>
        <TabButton>Events</TabButton>
        <TabButton>Policies</TabButton>
        <TabButton>Announcements</TabButton>
      </div>

      <div className="destination-management">
        <div className="destination-actions">
          <Button onClick={addDestination}>Add Destination</Button>
          <Button onClick={bulkUpdate}>Bulk Update</Button>
          <Button onClick={exportDestinations}>Export</Button>
        </div>

        <DestinationTable
          destinations={contentData.destinations}
          onEdit={handleDestinationEdit}
          onDelete={handleDestinationDelete}
          onToggleStatus={handleDestinationToggle}
        />
      </div>
    </div>
  )
}
```

### Event Management
```typescript
interface EventManagement {
  upcomingEvents: Event[]
  pastEvents: Event[]
  recurringEvents: RecurringEvent[]
  eventCategories: EventCategory[]
}

interface Event {
  id: string
  name: string
  description: string
  category: string
  location: string
  startDate: Date
  endDate: Date
  organizer: string
  capacity: number
  currentAttendance: number
  pricing: EventPricing
  images: string[]
  status: 'draft' | 'published' | 'cancelled' | 'completed'
  governmentApproval: boolean
  specialRequirements: string[]
}

const EventManagementPage: React.FC = () => {
  return (
    <div className="event-management-page">
      <div className="event-calendar">
        <EventCalendar
          events={eventData.upcomingEvents}
          onEventClick={handleEventClick}
          onDateSelect={handleDateSelect}
        />
      </div>

      <div className="event-list">
        <EventList
          events={eventData.upcomingEvents}
          onEdit={handleEventEdit}
          onDelete={handleEventDelete}
          onPublish={handleEventPublish}
        />
      </div>
    </div>
  )
}
```

## 6. 🚨 Crisis Management Center

### Security Alert Dashboard
```typescript
interface CrisisManagement {
  activeAlerts: SecurityAlert[]
  emergencyContacts: EmergencyContact[]
  evacuationPlans: EvacuationPlan[]
  communicationChannels: CommunicationChannel[]
}

interface SecurityAlert {
  id: string
  type: 'security' | 'weather' | 'health' | 'transport' | 'other'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  affectedAreas: string[]
  affectedUsers: number
  createdBy: string
  createdAt: Date
  status: 'active' | 'resolved' | 'cancelled'
  actions: AlertAction[]
}

const CrisisManagementPage: React.FC = () => {
  return (
    <div className="crisis-management-page">
      <div className="crisis-header">
        <h1>Crisis Management Center</h1>
        <div className="emergency-actions">
          <Button variant="danger" onClick={createEmergencyAlert}>
            Create Emergency Alert
          </Button>
          <Button onClick={contactEmergencyServices}>
            Contact Emergency Services
          </Button>
        </div>
      </div>

      <div className="alert-dashboard">
        <ActiveAlertsSection
          alerts={crisisData.activeAlerts}
          onResolve={handleAlertResolution}
          onEscalate={handleAlertEscalation}
        />
        
        <EmergencyContactsSection
          contacts={crisisData.emergencyContacts}
          onContact={handleEmergencyContact}
        />
        
        <CommunicationHub
          channels={crisisData.communicationChannels}
          onBroadcast={handleBroadcastMessage}
        />
      </div>
    </div>
  )
}
```

## 7. 💰 Financial Management

### Revenue Tracking & Commission Management
```typescript
interface FinancialManagement {
  revenue: RevenueData
  commissions: CommissionData
  budgets: BudgetData
  reports: FinancialReport[]
}

interface RevenueData {
  totalRevenue: number
  revenueByMonth: MonthlyRevenue[]
  revenueByPartner: PartnerRevenue[]
  revenueByCategory: CategoryRevenue[]
  growthRate: number
  projections: RevenueProjection[]
}

interface CommissionData {
  totalCommissions: number
  commissionByPartner: PartnerCommission[]
  pendingPayouts: PendingPayout[]
  commissionRates: CommissionRate[]
  paymentHistory: PaymentHistory[]
}

const FinancialManagementPage: React.FC = () => {
  return (
    <div className="financial-management-page">
      <div className="financial-overview">
        <RevenueOverview data={financialData.revenue} />
        <CommissionOverview data={financialData.commissions} />
        <BudgetOverview data={financialData.budgets} />
      </div>

      <div className="financial-charts">
        <RevenueChart data={financialData.revenue.revenueByMonth} />
        <CommissionChart data={financialData.commissions.commissionByPartner} />
        <BudgetChart data={financialData.budgets} />
      </div>

      <div className="financial-reports">
        <FinancialReportsSection
          reports={financialData.reports}
          onGenerateReport={handleReportGeneration}
          onExportReport={handleReportExport}
        />
      </div>
    </div>
  )
}
```

## Implementation Priority

### **Phase 1: Core Admin Features (Months 1-2)**
1. Authentication & Authorization System
2. Basic Analytics Dashboard
3. User Management Interface
4. Partner Approval Workflow

### **Phase 2: Advanced Features (Months 3-4)**
1. Content Management System
2. Crisis Management Center
3. Financial Management
4. Advanced Analytics

### **Phase 3: Optimization (Months 5-6)**
1. Performance Optimization
2. Advanced Reporting
3. Integration with External Systems
4. Mobile Admin Interface

This comprehensive admin section provides government administrators with powerful tools to manage the Sri Lanka Tourism platform effectively while ensuring compliance, security, and operational efficiency.
