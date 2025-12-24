import React, { useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { 
  MessageCircle,
  AlertTriangle,
  Phone,
  Mail,
  Clock,
  FileText,
  Search,
  Plus,
  Ticket,
  Shield,
  Star,
  Users,
  Car,
  Building2,
  MapPin,
  Heart,
  Globe,
  CheckCircle,
  Send,
  Calendar,
  MapPin as LocationIcon,
  CreditCard,
  Camera,
  Upload,
  Download,
  Bell,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Flag
} from 'lucide-react'

interface SupportCategory {
  id: string
  name: string
  description: string
  icon: any
  color: string
  services: string[]
}

interface SupportTicket {
  id: string
  type: 'general' | 'complaint' | 'booking' | 'payment' | 'emergency'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  title: string
  description: string
  category: string
  serviceType: string
  createdAt: string
  updatedAt: string
  assignedTo?: string
  resolution?: string
}

export default function SupportPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showTicketForm, setShowTicketForm] = useState(false)
  const [ticketType, setTicketType] = useState<'general' | 'complaint' | 'booking' | 'payment' | 'emergency'>('general')

  const supportCategories: SupportCategory[] = [
    {
      id: 'accommodation',
      name: 'Accommodation',
      description: 'Hotels, homestays, guesthouses, and lodging issues',
      icon: Building2,
      color: 'bg-blue-500',
      services: ['Hotels', 'Homestays', 'Guesthouses', 'Resorts', 'Villas', 'Hostels']
    },
    {
      id: 'transportation',
      name: 'Transportation',
      description: 'Flights, buses, taxis, trains, and transport services',
      icon: Car,
      color: 'bg-green-500',
      services: ['Domestic Flights', 'Buses', 'Taxis', 'Trains', 'Car Rentals', 'Airport Transfers', 'Tour Buses']
    },
    {
      id: 'tours_activities',
      name: 'Tours & Activities',
      description: 'Tour operators, guides, activities, and experiences',
      icon: MapPin,
      color: 'bg-purple-500',
      services: ['City Tours', 'Cultural Tours', 'Adventure Tours', 'Wildlife Safaris', 'Beach Tours', 'Historical Sites', 'Adventure Activities']
    },
    {
      id: 'food_dining',
      name: 'Food & Dining',
      description: 'Restaurants, cafes, food tours, and dining experiences',
      icon: Heart,
      color: 'bg-red-500',
      services: ['Restaurants', 'Street Food', 'Food Tours', 'Cooking Classes', 'Cafes', 'Fine Dining']
    },
    {
      id: 'medical_health',
      name: 'Medical & Health',
      description: 'Medical tourism, health services, and wellness',
      icon: Shield,
      color: 'bg-orange-500',
      services: ['Hospitals', 'Clinics', 'Wellness Centers', 'Medical Tourism', 'Emergency Services', 'Pharmacies']
    },
    {
      id: 'booking_platform',
      name: 'Booking Platform',
      description: 'Website, app, payment, and technical issues',
      icon: Globe,
      color: 'bg-indigo-500',
      services: ['Website Issues', 'Mobile App', 'Payment Problems', 'Account Issues', 'Booking System', 'Technical Support']
    },
    {
      id: 'government_services',
      name: 'Government Services',
      description: 'Immigration, customs, permits, and official services',
      icon: Flag,
      color: 'bg-yellow-500',
      services: ['Immigration', 'Customs', 'Visa Services', 'Permits', 'Tourism Authority', 'Police Services']
    },
    {
      id: 'general_inquiry',
      name: 'General Inquiry',
      description: 'General questions, information, and assistance',
      icon: HelpCircle,
      color: 'bg-gray-500',
      services: ['Information', 'Travel Advice', 'General Questions', 'Recommendations', 'Planning Help']
    }
  ]

  const ticketTypes = [
    {
      id: 'general',
      name: 'General Support',
      description: 'General questions and information requests',
      icon: MessageCircle,
      color: 'text-blue-600'
    },
    {
      id: 'complaint',
      name: 'File Complaint',
      description: 'Report issues with tourism services',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      id: 'booking',
      name: 'Booking Support',
      description: 'Help with reservations and bookings',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      id: 'payment',
      name: 'Payment Issues',
      description: 'Payment problems and refunds',
      icon: CreditCard,
      color: 'text-purple-600'
    },
    {
      id: 'emergency',
      name: 'Emergency Support',
      description: 'Urgent assistance and emergencies',
      icon: Shield,
      color: 'text-orange-600'
    }
  ]

  const renderCategoryCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {supportCategories.map((category) => (
        <Card 
          key={category.id} 
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => {
            setSelectedCategory(category.id)
            setShowTicketForm(true)
          }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className={`p-3 rounded-lg ${category.color}`}>
              <category.icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.services.slice(0, 3).map((service) => (
              <span key={service} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {service}
              </span>
            ))}
            {category.services.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{category.services.length - 3} more
              </span>
            )}
          </div>
        </Card>
      ))}
    </div>
  )

  const renderTicketForm = () => (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black mb-2">Create Support Request</h2>
          <p className="text-gray-600">
            {selectedCategory 
              ? `Report an issue with ${supportCategories.find(c => c.id === selectedCategory)?.name}`
              : 'Get help with your tourism experience'
            }
          </p>
        </div>

        {/* Ticket Type Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4">Select Request Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ticketTypes.map((type) => (
              <div
                key={type.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                  ticketType === type.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setTicketType(type.id as any)}
              >
                <div className="flex items-center space-x-3">
                  <type.icon className={`h-6 w-6 ${type.color}`} />
                  <div>
                    <h4 className="font-medium text-black">{type.name}</h4>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Request Form */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                placeholder="+94 XX XXX XXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationality
              </label>
              <input
                type="text"
                className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                placeholder="Your nationality"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject/Title *
            </label>
            <input
              type="text"
              className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
              placeholder="Brief description of your issue"
            />
          </div>

          {selectedCategory && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Service
              </label>
              <select className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200" style={{ color: '#000000' }}>
                <option value="" style={{ backgroundColor: '#ffffff', color: '#000000' }}>Select specific service</option>
                {supportCategories.find(c => c.id === selectedCategory)?.services.map((service) => (
                  <option key={service} value={service} style={{ backgroundColor: '#ffffff', color: '#000000' }}>{service}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Description *
            </label>
            <textarea
              rows={6}
              className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
              placeholder="Please provide detailed information about your issue, including dates, locations, and any relevant details..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Supporting Documents (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload photos or documents</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB each</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6">
            <Button variant="outline" onClick={() => setShowTicketForm(false)}>
              Cancel
            </Button>
            <Button className="flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Submit Request</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderQuickActions = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <Card className="p-6 text-center">
        <div className="p-3 rounded-full bg-blue-100 w-fit mx-auto mb-4">
          <MessageCircle className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-black mb-2">Live Chat</h3>
        <p className="text-gray-600 mb-4">Chat with our support team in real-time</p>
        <Button className="w-full">Start Chat</Button>
      </Card>

      <Card className="p-6 text-center">
        <div className="p-3 rounded-full bg-green-100 w-fit mx-auto mb-4">
          <Phone className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-black mb-2">Call Support</h3>
        <p className="text-gray-600 mb-4">Speak directly with our support team</p>
        <Button  className="w-full">Call Now</Button>
      </Card>

      <Card className="p-6 text-center">
        <div className="p-3 rounded-full bg-purple-100 w-fit mx-auto mb-4">
          <FileText className="h-8 w-8 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-black mb-2">Knowledge Base</h3>
        <p className="text-gray-600 mb-4">Find answers to common questions</p>
        <Button  className="w-full">Browse FAQ</Button>
      </Card>

      <Card className="p-6 text-center">
        <div className="p-3 rounded-full bg-orange-100 w-fit mx-auto mb-4">
          <Shield className="h-8 w-8 text-orange-600" />
        </div>
        <h3 className="text-lg font-semibold text-black mb-2">Emergency</h3>
        <p className="text-gray-600 mb-4">24/7 emergency assistance</p>
        <Button className="w-full mt-6">Emergency Help</Button>
      </Card>
    </div>
  )

  const renderContactInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center">
        <div className="p-3 rounded-full bg-blue-100 w-fit mx-auto mb-4">
          <Phone className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-black mb-2">Phone Support</h3>
        <p className="text-gray-600 mb-2">+94 11 242 6900</p>
        <p className="text-sm text-gray-500">Mon-Fri 8:00 AM - 6:00 PM</p>
        <p className="text-sm text-gray-500">Sat-Sun 9:00 AM - 5:00 PM</p>
      </div>

      <div className="text-center">
        <div className="p-3 rounded-full bg-green-100 w-fit mx-auto mb-4">
          <Mail className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-black mb-2">Email Support</h3>
        <p className="text-gray-600 mb-2">support@sltda.gov.lk</p>
        <p className="text-sm text-gray-500">Response within 24 hours</p>
      </div>

      <div className="text-center">
        <div className="p-3 rounded-full bg-purple-100 w-fit mx-auto mb-4">
          <MessageSquare className="h-8 w-8 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-black mb-2">WhatsApp</h3>
        <p className="text-gray-600 mb-2">+94 77 123 4567</p>
        <p className="text-sm text-gray-500">24/7 WhatsApp support</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-black mb-4">
            Support Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get help with your Sri Lanka tourism experience. We&apos;re here to assist you with any questions, 
            complaints, or support needs across all tourism services.
          </p>
        </div>

        {/* Quick Actions */}
        {renderQuickActions()}

        {/* Main Content */}
        {showTicketForm ? (
          renderTicketForm()
        ) : (
          <>
            {/* Service Categories */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">Select Service Category</h2>
              <p className="text-gray-600 mb-8">
                Choose the type of service you need help with to get the most relevant support.
              </p>
              {renderCategoryCards()}
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-8 text-center">Contact Information</h2>
              {renderContactInfo()}
            </div>

            {/* Emergency Notice */}
            <Card className="p-8 bg-red-50 border-red-200">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-red-100">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Emergency Support</h3>
                  <p className="text-red-800 mb-2">
                    For urgent safety, security, or medical emergencies, contact our 24/7 emergency hotline immediately.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Emergency: +94 11 242 6900
                    </Button>
                    <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                      <Shield className="h-4 w-4 mr-2" />
                      Safety Guidelines
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
