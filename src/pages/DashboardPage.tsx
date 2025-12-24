import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { useAuth } from '../context/AuthContext'
import {
  User,
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  Settings,
  Bell,
  Heart,
  Clock,
  CheckCircle,
  ArrowRight,
  Plus,
  FileText,
  CreditCard,
  Share,
  Shield,
  Download,
} from 'lucide-react'

type DashboardTab = 'overview' | 'my trips' | 'bookings' | 'wishlist' | 'profile'

interface DashboardUser {
  id: string
  name: string
  email: string
  userType: string
  role: string
  profileImage: string
  verified: boolean
  lastLogin: string
  stats: {
    totalBookings: number
    totalSpent: number
    upcomingTrips: number
    wishlistItems: number
  }
}

import { getImageUrl } from '../lib/utils'

export default function DashboardPage() {
  const { userType: routeUserType } = useParams<{ userType: string }>()
  const navigate = useNavigate()
  const { user: authUser, loading: authLoading, signOut } = useAuth()

  const [user, setUser] = useState<DashboardUser | null>(null)
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview')
  const [loading, setLoading] = useState(true)
  const [navigating, setNavigating] = useState<string | null>(null)

  const userType = routeUserType || authUser?.userType || 'tourist'

  const handleNavigation = (href: string, actionName: string) => {
    setNavigating(actionName)
    setTimeout(() => {
      navigate(href)
      setNavigating(null)
    }, 500)
  }

  const handleTabSwitch = (tab: DashboardTab) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    if (authLoading) {
      setLoading(true)
      return
    }

    // Use authenticated user if available, otherwise fallback demo user
    const baseUser =
      authUser || ({
        id: 'guest',
        name: 'Guest Traveler',
        email: 'guest@example.com',
        role: userType === 'admin' ? 'admin' : 'tourist',
        userType,
      } as const)

    const userData: DashboardUser = {
      id: baseUser.id,
      name: baseUser.name || 'User',
      email: baseUser.email || '',
      userType: baseUser.userType || userType,
      role: baseUser.role || 'user',
      profileImage: getImageUrl('/images/placeholder-img1.jpg'),
      verified: true,
      lastLogin: new Date().toISOString(),
      stats: {
        totalBookings: 3,
        totalSpent: 1250,
        upcomingTrips: 1,
        wishlistItems: 5,
      },
    }

    setUser(userData)
    setLoading(false)
  }, [authUser, authLoading, userType])

  const getDashboardConfig = (dashboardUserType: string) => {
    const configs = {
      tourist: {
        title: 'My Travel Dashboard',
        description:
          "Explore Sri Lanka's diverse experiences - from ancient temples to pristine beaches, Ayurveda to adventure.",
        tabs: ['Overview', 'My Trips', 'Bookings', 'Wishlist', 'Profile'],
        quickActions: [
          { label: 'Plan New Trip', href: '/trip-planner', icon: Plus },
          { label: 'All Destinations', href: '/destinations', icon: MapPin },
          { label: 'Pilgrimage Sites', href: '/destinations?type=pilgrimage', icon: Star },
          { label: 'Medical Tourism', href: '/medical-tourism', icon: User },
          { label: 'Ayurveda & Wellness', href: '/experiences?type=wellness', icon: Heart },
        ],
      },
      'medical-tourist': {
        title: 'My Health & Travel Dashboard',
        description:
          "Manage your health journey while exploring Sri Lanka's rich culture and natural beauty",
        tabs: ['Overview', 'Medical Records', 'Appointments', 'Recovery', 'Profile'],
        quickActions: [
          { label: 'Find Hospitals', href: '/medical-tourism', icon: Plus },
          { label: 'Book Consultation', href: '/medical-tourism', icon: Calendar },
          { label: 'Recovery Planning', href: '/medical-tourism', icon: Heart },
          { label: 'Cultural Sites', href: '/destinations?type=cultural', icon: Star },
          { label: 'Leisure Activities', href: '/experiences?type=leisure', icon: MapPin },
        ],
      },
      'luxury-traveler': {
        title: 'Luxury Travel Dashboard',
        description: 'Curate your premium Sri Lankan experience',
        tabs: ['Overview', 'Luxury Experiences', 'Concierge', 'Preferences', 'Profile'],
        quickActions: [
          { label: 'Luxury Experiences', href: '/experiences', icon: Star },
          { label: 'Concierge Service', href: '/support', icon: Settings },
          { label: 'Premium Booking', href: '/booking', icon: Plus },
        ],
      },
      'adventure-nomad': {
        title: 'Adventure Nomad Dashboard',
        description: 'Adventure meets remote work in Sri Lanka',
        tabs: ['Overview', 'Adventures', 'Co-working', 'Community', 'Profile'],
        quickActions: [
          { label: 'Adventure Activities', href: '/experiences', icon: MapPin },
          { label: 'Co-working Spaces', href: '/experiences', icon: Settings },
          { label: 'Community Events', href: '/experiences', icon: Star },
        ],
      },
      host: {
        title: 'Host Dashboard',
        description: 'Manage your homestay business',
        tabs: ['Overview', 'Bookings', 'Guests', 'Earnings', 'Profile'],
        quickActions: [
          { label: 'New Booking', href: '/booking', icon: Plus },
          { label: 'Manage Property', href: '/host/property', icon: Settings },
          { label: 'View Analytics', href: '/host/analytics', icon: TrendingUp },
        ],
      },
      'transport-partner': {
        title: 'Transport Partner Dashboard',
        description: 'Manage your transport services',
        tabs: ['Overview', 'Bookings', 'Vehicles', 'Earnings', 'Profile'],
        quickActions: [
          { label: 'New Booking', href: '/transport/bookings', icon: Plus },
          { label: 'Manage Fleet', href: '/transport/fleet', icon: Settings },
          { label: 'View Routes', href: '/transport/routes', icon: MapPin },
        ],
      },
      'medical-partner': {
        title: 'Medical Partner Dashboard',
        description: 'Manage your medical practice',
        tabs: ['Overview', 'Patients', 'Appointments', 'Services', 'Profile'],
        quickActions: [
          { label: 'New Patient', href: '/medical/patients', icon: Plus },
          { label: 'Schedule Appointment', href: '/medical/appointments', icon: Calendar },
          { label: 'Update Services', href: '/medical/services', icon: Settings },
        ],
      },
      admin: {
        title: 'Admin Dashboard',
        description: 'System administration and management',
        tabs: ['Overview', 'Users', 'Analytics', 'Content', 'Settings'],
        quickActions: [
          { label: 'User Management', href: '/admin/users', icon: User },
          { label: 'System Analytics', href: '/admin/analytics', icon: TrendingUp },
          { label: 'Content Management', href: '/admin/content', icon: Settings },
        ],
      },
    }

    return configs[dashboardUserType as keyof typeof configs] || configs.tourist
  }

  const config = getDashboardConfig(userType)

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-light-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-neutral-dark-100">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-light-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="dashboard-header mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading mb-0 font-semibold text-neutral-dark-200">
                {config.title}
              </h2>
              <p className="mt-2 mb-0 text-neutral-dark-100">{config.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  signOut()
                  navigate('/')
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <Card className="dashboard-welcome-block mb-8 p-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.profileImage}
              alt={user.name}
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="mb-0 text-neutral-dark-200">Welcome back, {user.name}!</h3>
              <p className="mb-0 text-neutral-dark-100">
                {user.email} • {user.userType} • Last login:{' '}
                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {user.verified && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="dashboard-quick-actions mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {config.quickActions.map((action, index) => (
            <Card
              key={action.label + index}
              className="cursor-pointer p-6 transition-shadow hover:shadow-lg"
              onClick={() => handleNavigation(action.href, action.label)}
            >
              <div className="flex items-center space-x-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  {navigating === action.label ? (
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : (
                    <action.icon className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="mb-0 text-neutral-dark-200">
                    {navigating === action.label ? 'Loading...' : action.label}
                  </h4>
                  <p className="mb-0 text-neutral-dark-100">
                    {navigating === action.label
                      ? 'Please wait...'
                      : `Quick access to ${action.label.toLowerCase()}`}
                  </p>
                </div>
                {navigating !== action.label && (
                  <ArrowRight className="h-5 w-5 text-neutral-dark-100" />
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="dashboard-navigation-tabs mb-8">
          <div className="border-b border-neutral-light-300">
            <nav className="-mb-px flex space-x-8">
              {config.tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab.toLowerCase() as DashboardTab)}
                  className={`py-2 px-1 text-sm font-medium border-b-2 ${
                    activeTab === (tab.toLowerCase() as DashboardTab)
                      ? 'border-primary text-primary'
                      : 'border-transparent text-neutral-dark-100 hover:border-neutral-light-300 hover:text-neutral-dark-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="dashboard-stats-overview mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card
            className="cursor-pointer p-6 transition-shadow hover:shadow-lg"
            onClick={() => handleTabSwitch('bookings')}
          >
            <div className="flex items-center">
              <div className="rounded-lg bg-blue-100 p-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="mb-0 text-neutral-dark-100">Total Bookings</p>
                <p className="text-2xl font-bold text-neutral-dark-200">
                  {user.stats.totalBookings}
                </p>
              </div>
            </div>
          </Card>

          <Card
            className="cursor-pointer p-6 transition-shadow hover:shadow-lg"
            onClick={() => handleTabSwitch('bookings')}
          >
            <div className="flex items-center">
              <div className="rounded-lg bg-green-100 p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="mb-0 text-neutral-dark-100">Total Spent</p>
                <p className="text-2xl font-bold text-neutral-dark-200">
                  ${user.stats.totalSpent}
                </p>
              </div>
            </div>
          </Card>

          <Card
            className="cursor-pointer p-6 transition-shadow hover:shadow-lg"
            onClick={() => handleTabSwitch('my trips')}
          >
            <div className="flex items-center">
              <div className="rounded-lg bg-purple-100 p-3">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="mb-0 text-neutral-dark-100">Upcoming Trips</p>
                <p className="text-2xl font-bold text-neutral-dark-200">
                  {user.stats.upcomingTrips}
                </p>
              </div>
            </div>
          </Card>

          <Card
            className="cursor-pointer p-6 transition-shadow hover:shadow-lg"
            onClick={() => handleTabSwitch('wishlist')}
          >
            <div className="flex items-center">
              <div className="rounded-lg bg-red-100 p-3">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="mb-0 text-neutral-dark-100">Wishlist Items</p>
                <p className="text-2xl font-bold text-neutral-dark-200">
                  {user.stats.wishlistItems}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tab Content */}
        <div className="dashboard-tab-content grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="dashboard-main-content lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="dashboard-tab-overview space-y-6">
                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Recent Activity</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 rounded-lg bg-neutral-light-50 p-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <h5 className="mb-0 text-neutral-dark-200">Booking Confirmed</h5>
                        <p className="mb-0 text-neutral-dark-100">
                          Sigiriya Rock Fortress Tour - March 25, 2024
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg bg-neutral-light-50 p-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <h5 className="mb-0 text-neutral-dark-200">Trip Planning</h5>
                        <p className="mb-0 text-neutral-dark-100">
                          Kandy Cultural Experience - In Progress
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg bg-neutral-light-50 p-3">
                      <Star className="h-5 w-5 text-yellow-600" />
                      <div>
                        <h5 className="mb-0 text-neutral-dark-200">Review Added</h5>
                        <p className="mb-0 text-neutral-dark-100">
                          Anuradhapura Spiritual Journey - 5 stars
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg bg-neutral-light-50 p-3">
                      <Heart className="h-5 w-5 text-red-600" />
                      <div>
                        <h5 className="mb-0 text-neutral-dark-200">Added to Wishlist</h5>
                        <p className="mb-0 text-neutral-dark-100">
                          Ella Rock Hike - Adventure Activity
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Travel Insights</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-blue-50 p-4">
                      <h5 className="mb-2 text-blue-800">Favorite Destination</h5>
                      <p className="mb-0 text-blue-600">Cultural Heritage Sites</p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-4">
                      <h5 className="mb-2 text-green-800">Travel Style</h5>
                      <p className="mb-0 text-green-600">Cultural Explorer</p>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-4">
                      <h5 className="mb-2 text-purple-800">Next Trip</h5>
                      <p className="mb-0 text-purple-600">Beach & Wildlife Safari</p>
                    </div>
                    <div className="rounded-lg bg-orange-50 p-4">
                      <h5 className="mb-2 text-orange-800">Budget Range</h5>
                      <p className="mb-0 text-orange-600">$300-500 per trip</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'my trips' && (
              <div className="dashboard-tab-my-trips space-y-6">
                <Card className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="mb-0 text-neutral-dark-200">My Trips</h4>
                    <Button variant="primary" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Plan New Trip
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-neutral-light-300 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h5 className="mb-0 text-neutral-dark-200">
                          Cultural Heritage Tour
                        </h5>
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                          Completed
                        </span>
                      </div>
                      <p className="mb-2 text-neutral-dark-100">
                        Anuradhapura • Polonnaruwa • Sigiriya
                      </p>
                      <p className="mb-2 text-neutral-dark-100">
                        March 15-20, 2024 • 6 days • $450
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Write Review
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border border-neutral-light-300 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h5 className="mb-0 text-neutral-dark-200">
                          Beach & Wildlife Safari
                        </h5>
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                          Upcoming
                        </span>
                      </div>
                      <p className="mb-2 text-neutral-dark-100">
                        Yala National Park • Mirissa • Galle
                      </p>
                      <p className="mb-2 text-neutral-dark-100">
                        April 10-15, 2024 • 6 days • $380
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Modify Trip
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border border-neutral-light-300 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h5 className="mb-0 text-neutral-dark-200">Pilgrimage Journey</h5>
                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                          Planning
                        </span>
                      </div>
                      <p className="mb-2 text-neutral-dark-100">
                        Kandy • Adam&apos;s Peak • Dambulla
                      </p>
                      <p className="mb-2 text-neutral-dark-100">
                        May 5-10, 2024 • 6 days • $320
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Continue Planning
                        </Button>
                        <Button variant="outline" size="sm">
                          Save for Later
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Trip Statistics</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-green-50 p-4 text-center">
                      <h4 className="mb-1 text-2xl font-bold text-green-600">1</h4>
                      <p className="mb-0 text-green-800">Completed Trips</p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-4 text-center">
                      <h4 className="mb-1 text-2xl font-bold text-blue-600">1</h4>
                      <p className="mb-0 text-blue-800">Upcoming Trips</p>
                    </div>
                    <div className="rounded-lg bg-yellow-50 p-4 text-center">
                      <h4 className="mb-1 text-2xl font-bold text-yellow-600">1</h4>
                      <p className="mb-0 text-yellow-800">In Planning</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="dashboard-tab-bookings space-y-6">
                <Card className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="mb-0 text-neutral-dark-200">My Bookings</h4>
                    <Button variant="primary" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      New Booking
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-neutral-light-300 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h5 className="mb-0 text-neutral-dark-200">Hotel Reservation</h5>
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                          Confirmed
                        </span>
                      </div>
                      <p className="mb-2 text-neutral-dark-100">
                        Grand Oriental Hotel, Colombo
                      </p>
                      <p className="mb-2 text-neutral-dark-100">
                        Check-in: March 25, 2024 • 3 nights • $180
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Modify
                        </Button>
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border border-neutral-light-300 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h5 className="mb-0 text-neutral-dark-200">Transport Booking</h5>
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                          Confirmed
                        </span>
                      </div>
                      <p className="mb-2 text-neutral-dark-100">Private Car with Driver</p>
                      <p className="mb-2 text-neutral-dark-100">
                        March 25-30, 2024 • 6 days • $200
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Track Vehicle
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact Driver
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border border-neutral-light-300 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h5 className="mb-0 text-neutral-dark-200">Tour Package</h5>
                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                          Pending
                        </span>
                      </div>
                      <p className="mb-2 text-neutral-dark-100">
                        Sigiriya Rock Fortress Tour
                      </p>
                      <p className="mb-2 text-neutral-dark-100">
                        March 26, 2024 • Full day • $75
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Pay Now
                        </Button>
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Booking Summary</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-green-50 p-4 text-center">
                      <h4 className="mb-1 text-2xl font-bold text-green-600">2</h4>
                      <p className="mb-0 text-green-800">Confirmed</p>
                    </div>
                    <div className="rounded-lg bg-yellow-50 p-4 text-center">
                      <h4 className="mb-1 text-2xl font-bold text-yellow-600">1</h4>
                      <p className="mb-0 text-yellow-800">Pending</p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-4 text-center">
                      <h4 className="mb-1 text-2xl font-bold text-blue-600">$455</h4>
                      <p className="mb-0 text-blue-800">Total Spent</p>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-4 text-center">
                      <h4 className="mb-1 text-2xl font-bold text-purple-600">3</h4>
                      <p className="mb-0 text-purple-800">Total Bookings</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="dashboard-tab-wishlist space-y-6">
                <Card className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="mb-0 text-neutral-dark-200">My Wishlist</h4>
                    <Button variant="primary" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Browse More
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-neutral-light-300 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h5 className="mb-0 text-neutral-dark-200">Ella Rock Hike</h5>
                        <Heart className="h-4 w-4 text-red-500" />
                      </div>
                      <p className="mb-2 text-neutral-dark-100">Adventure • 1 day</p>
                      <p className="mb-2 text-neutral-dark-100">$45 per person</p>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="primary" size="sm">
                          Book Now
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border border-neutral-light-300 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h5 className="mb-0 text-neutral-dark-200">Whale Watching</h5>
                        <Heart className="h-4 w-4 text-red-500" />
                      </div>
                      <p className="mb-2 text-neutral-dark-100">Wildlife • Half day</p>
                      <p className="mb-2 text-neutral-dark-100">$65 per person</p>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="primary" size="sm">
                          Book Now
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border border-neutral-light-300 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h5 className="mb-0 text-neutral-dark-200">Ayurveda Spa</h5>
                        <Heart className="h-4 w-4 text-red-500" />
                      </div>
                      <p className="mb-2 text-neutral-dark-100">Wellness • 3 hours</p>
                      <p className="mb-2 text-neutral-dark-100">$85 per session</p>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="primary" size="sm">
                          Book Now
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border border-neutral-light-300 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h5 className="mb-0 text-neutral-dark-200">Train Journey</h5>
                        <Heart className="h-4 w-4 text-red-500" />
                      </div>
                      <p className="mb-2 text-neutral-dark-100">Scenic • 7 hours</p>
                      <p className="mb-2 text-neutral-dark-100">$25 per person</p>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="primary" size="sm">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Wishlist Categories</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-red-50 p-4 text-center">
                      <h4 className="mb-1 text-2xl font-bold text-red-600">2</h4>
                      <p className="mb-0 text-red-800">Adventure</p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-4 text-center">
                      <h4 className="mb-1 text-2xl font-bold text-blue-600">1</h4>
                      <p className="mb-0 text-blue-800">Wildlife</p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-4 text-center">
                      <h4 className="mb-1 text-2xl font-bold text-green-600">1</h4>
                      <p className="mb-0 text-green-800">Wellness</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="dashboard-tab-profile space-y-6">
                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Profile Information</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-neutral-dark-200">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John Tourist"
                          className="w-full bg-white rounded-md border border-neutral-light-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-neutral-dark-200">Email</label>
                        <input
                          type="email"
                          defaultValue="tourist@example.com"
                          className="w-full bg-white rounded-md border border-neutral-light-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-neutral-dark-200">Phone</label>
                        <input
                          type="tel"
                          defaultValue="+1 234 567 8900"
                          className="w-full bg-white rounded-md border border-neutral-light-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-neutral-dark-200">
                          Nationality
                        </label>
                        <input
                          type="text"
                          defaultValue="American"
                          className="w-full bg-white rounded-md border border-neutral-light-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-neutral-dark-200">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          defaultValue="1990-05-15"
                          className="w-full bg-white rounded-md border border-neutral-light-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-neutral-dark-200">
                          Passport Number
                        </label>
                        <input
                          type="text"
                          defaultValue="US123456789"
                          className="w-full bg-white rounded-md border border-neutral-light-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-neutral-dark-200">
                        Travel Preferences
                      </label>
                      <textarea
                        defaultValue="Interested in cultural heritage, wildlife, and adventure activities. Prefer eco-friendly accommodations."
                        rows={3}
                        className="w-full bg-white rounded-md border border-neutral-light-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button variant="primary" size="sm">
                        Update Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        Change Password
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Account Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-neutral-light-300 p-4">
                      <div>
                        <h5 className="mb-1 text-neutral-dark-200">Email Notifications</h5>
                        <p className="mb-0 text-neutral-dark-100">
                          Receive updates about bookings and promotions
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary"
                      />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-neutral-light-300 p-4">
                      <div>
                        <h5 className="mb-1 text-neutral-dark-200">SMS Notifications</h5>
                        <p className="mb-0 text-neutral-dark-100">
                          Get important updates via SMS
                        </p>
                      </div>
                      <input type="checkbox" className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-neutral-light-300 p-4">
                      <div>
                        <h5 className="mb-1 text-neutral-dark-200">
                          Two-Factor Authentication
                        </h5>
                        <p className="mb-0 text-neutral-dark-100">
                          Add extra security to your account
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Travel Statistics</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-blue-50 p-4 text-center">
                      <h4 className="mb-1 text-2xl font-bold text-blue-600">3</h4>
                      <p className="mb-0 text-blue-800">Total Trips</p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-4 text-center">
                      <h4 className="mb-1 text-2xl font-bold text-green-600">12</h4>
                      <p className="mb-0 text-green-800">Days Traveled</p>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-4 text-center">
                      <h4 className="mb-1 text-2xl font-bold text-purple-600">8</h4>
                      <p className="mb-0 text-purple-800">Destinations</p>
                    </div>
                    <div className="rounded-lg bg-orange-50 p-4 text-center">
                      <h4 className="mb-1 text-2xl font-bold text-orange-600">$1,150</h4>
                      <p className="mb-0 text-orange-800">Total Spent</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="dashboard-sidebar space-y-6">
            {activeTab === 'overview' && (
              <div className="dashboard-sidebar-overview space-y-6">
                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleNavigation('/trip-planner', 'Plan New Trip')}
                      disabled={navigating === 'Plan New Trip'}
                    >
                      {navigating === 'Plan New Trip' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <Plus className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Plan New Trip' ? 'Loading...' : 'Plan New Trip'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        handleNavigation('/destinations', 'Browse Destinations')
                      }
                      disabled={navigating === 'Browse Destinations'}
                    >
                      {navigating === 'Browse Destinations' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <MapPin className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Browse Destinations'
                        ? 'Loading...'
                        : 'Browse Destinations'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleTabSwitch('wishlist')}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      View Wishlist
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleTabSwitch('bookings')}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Check Bookings
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Travel Tips</h4>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <h6 className="mb-1 text-blue-800">Best Time to Visit</h6>
                      <p className="mb-0 text-xs text-blue-600">
                        December to March for west coast
                      </p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-3">
                      <h6 className="mb-1 text-green-800">Must-See</h6>
                      <p className="mb-0 text-xs text-green-600">Sigiriya Rock Fortress</p>
                    </div>
                    <Button variant="primary" size="sm" className="w-full">
                      View All Tips
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'my trips' && (
              <div className="dashboard-sidebar-my-trips space-y-6">
                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Trip Planning</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        handleNavigation('/trip-planner', 'Create New Trip')
                      }
                      disabled={navigating === 'Create New Trip'}
                    >
                      {navigating === 'Create New Trip' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <Plus className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Create New Trip' ? 'Loading...' : 'Create New Trip'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        handleNavigation('/destinations?type=popular', 'Popular Routes')
                      }
                      disabled={navigating === 'Popular Routes'}
                    >
                      {navigating === 'Popular Routes' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <MapPin className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Popular Routes'
                        ? 'Loading...'
                        : 'Popular Routes'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        handleNavigation('/trip-planner/calendar', 'Trip Calendar')
                      }
                      disabled={navigating === 'Trip Calendar'}
                    >
                      {navigating === 'Trip Calendar' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <Calendar className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Trip Calendar'
                        ? 'Loading...'
                        : 'Trip Calendar'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        handleNavigation('/trip-planner/saved', 'Saved Itineraries')
                      }
                      disabled={navigating === 'Saved Itineraries'}
                    >
                      {navigating === 'Saved Itineraries' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <Star className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Saved Itineraries'
                        ? 'Loading...'
                        : 'Saved Itineraries'}
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Trip Recommendations</h4>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-purple-50 p-3">
                      <h6 className="mb-1 text-purple-800">Cultural Circuit</h6>
                      <p className="mb-0 text-xs text-purple-600">7 days • $450</p>
                    </div>
                    <div className="rounded-lg bg-orange-50 p-3">
                      <h6 className="mb-1 text-orange-800">Beach Paradise</h6>
                      <p className="mb-0 text-xs text-orange-600">5 days • $380</p>
                    </div>
                    <Button variant="primary" size="sm" className="w-full">
                      View All Packages
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="dashboard-sidebar-bookings space-y-6">
                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Booking Actions</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleNavigation('/booking', 'New Booking')}
                      disabled={navigating === 'New Booking'}
                    >
                      {navigating === 'New Booking' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <Plus className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'New Booking' ? 'Loading...' : 'New Booking'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        handleNavigation('/booking/calendar', 'Booking Calendar')
                      }
                      disabled={navigating === 'Booking Calendar'}
                    >
                      {navigating === 'Booking Calendar' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <Calendar className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Booking Calendar'
                        ? 'Loading...'
                        : 'Booking Calendar'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        handleNavigation('/booking/history', 'Booking History')
                      }
                      disabled={navigating === 'Booking History'}
                    >
                      {navigating === 'Booking History' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <FileText className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Booking History'
                        ? 'Loading...'
                        : 'Booking History'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        handleNavigation(
                          '/booking/payment-methods',
                          'Payment Methods',
                        )
                      }
                      disabled={navigating === 'Payment Methods'}
                    >
                      {navigating === 'Payment Methods' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <CreditCard className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Payment Methods'
                        ? 'Loading...'
                        : 'Payment Methods'}
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Booking Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-dark-100">Confirmed</span>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                        2
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-dark-100">Pending</span>
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                        1
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-dark-100">Total Spent</span>
                      <span className="font-semibold text-neutral-dark-200">
                        $455
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="dashboard-sidebar-wishlist space-y-6">
                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Wishlist Actions</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleNavigation('/experiences', 'Add to Wishlist')}
                      disabled={navigating === 'Add to Wishlist'}
                    >
                      {navigating === 'Add to Wishlist' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <Plus className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Add to Wishlist'
                        ? 'Loading...'
                        : 'Add to Wishlist'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        handleNavigation('/experiences', 'Browse Activities')
                      }
                      disabled={navigating === 'Browse Activities'}
                    >
                      {navigating === 'Browse Activities' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <MapPin className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Browse Activities'
                        ? 'Loading...'
                        : 'Browse Activities'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        handleNavigation('/experiences?type=popular', 'Popular Items')
                      }
                      disabled={navigating === 'Popular Items'}
                    >
                      {navigating === 'Popular Items' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <Star className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Popular Items'
                        ? 'Loading...'
                        : 'Popular Items'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        handleNavigation('/wishlist/share', 'Share Wishlist')
                      }
                      disabled={navigating === 'Share Wishlist'}
                    >
                      {navigating === 'Share Wishlist' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <Share className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Share Wishlist'
                        ? 'Loading...'
                        : 'Share Wishlist'}
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Wishlist Summary</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-dark-100">Adventure</span>
                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                        2
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-dark-100">Wildlife</span>
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                        1
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-dark-100">Wellness</span>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                        1
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-dark-100">Total Value</span>
                      <span className="font-semibold text-neutral-dark-200">
                        $220
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="dashboard-sidebar-profile space-y-6">
                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Account Actions</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleNavigation('/profile/edit', 'Edit Profile')}
                      disabled={navigating === 'Edit Profile'}
                    >
                      {navigating === 'Edit Profile' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <Settings className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Edit Profile'
                        ? 'Loading...'
                        : 'Edit Profile'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        handleNavigation('/profile/security', 'Security Settings')
                      }
                      disabled={navigating === 'Security Settings'}
                    >
                      {navigating === 'Security Settings' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <Shield className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Security Settings'
                        ? 'Loading...'
                        : 'Security Settings'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        handleNavigation('/profile/notifications', 'Notifications')
                      }
                      disabled={navigating === 'Notifications'}
                    >
                      {navigating === 'Notifications' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <Bell className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Notifications'
                        ? 'Loading...'
                        : 'Notifications'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        handleNavigation('/profile/export', 'Export Data')
                      }
                      disabled={navigating === 'Export Data'}
                    >
                      {navigating === 'Export Data' ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      {navigating === 'Export Data'
                        ? 'Loading...'
                        : 'Export Data'}
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-4 text-neutral-dark-200">Account Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-dark-100">Verification</span>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                        Verified
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-dark-100">Member Since</span>
                      <span className="text-neutral-dark-200">Jan 2024</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-dark-100">Last Login</span>
                      <span className="text-neutral-dark-200">Today</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-dark-100">Travel Level</span>
                      <span className="font-semibold text-neutral-dark-200">
                        Explorer
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Support Card - Always Visible */}
            <Card className="dashboard-support-card p-6">
              <h4 className="mb-4 text-neutral-dark-200">Support</h4>
              <div className="space-y-3">
                <p className="mb-0 text-neutral-dark-100">
                  Need help with your Sri Lankan adventure?
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  Contact Support
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Emergency: +94 11 2 426 426
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

