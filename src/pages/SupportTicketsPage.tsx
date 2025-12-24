import React, { useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { 
  Ticket,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Calendar,
  User,
  FileText,
  Star,
  DollarSign,
  Shield,
  Car,
  Building2,
  MapPin,
  Heart,
  Globe,
  Flag,
  Plus,
  Eye,
  Reply,
  Send,
  Download,
  Search,
  Filter,
  Bell,
  HelpCircle
} from 'lucide-react'

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
  responseTime?: string
  satisfaction?: number
}

export default function SupportTicketsPage() {
  const [selectedTab, setSelectedTab] = useState('all')
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Mock data - in real app, this would come from API
  const tickets: SupportTicket[] = [
    {
      id: 'TKT001',
      type: 'complaint',
      priority: 'high',
      status: 'in_progress',
      title: 'Poor Tour Guide Service',
      description: 'Tour guide was unprofessional and provided incorrect information about historical sites.',
      category: 'Tour Operator',
      serviceType: 'Cultural Tour',
      createdAt: '2024-03-19 10:30',
      updatedAt: '2024-03-20 14:15',
      assignedTo: 'Sarah Johnson',
      responseTime: '2 hours'
    },
    {
      id: 'TKT002',
      type: 'booking',
      priority: 'normal',
      status: 'resolved',
      title: 'Booking Modification Request',
      description: 'Need to change the date of my hotel booking from March 25 to March 27.',
      category: 'Accommodation',
      serviceType: 'Hotel Booking',
      createdAt: '2024-03-18 14:20',
      updatedAt: '2024-03-19 09:30',
      assignedTo: 'Mike Chen',
      resolution: 'Booking successfully modified to March 27, 2024.',
      responseTime: '4 hours',
      satisfaction: 5
    },
    {
      id: 'TKT003',
      type: 'payment',
      priority: 'high',
      status: 'open',
      title: 'Payment Not Reflected',
      description: 'Made payment for tour package but it is not showing in my booking confirmation.',
      category: 'Payment System',
      serviceType: 'Tour Package',
      createdAt: '2024-03-19 16:45',
      updatedAt: '2024-03-19 16:45',
      responseTime: '30 minutes'
    },
    {
      id: 'TKT004',
      type: 'general',
      priority: 'low',
      status: 'closed',
      title: 'Information Request',
      description: 'Need information about best time to visit Sri Lanka and weather conditions.',
      category: 'General Inquiry',
      serviceType: 'Travel Information',
      createdAt: '2024-03-17 11:15',
      updatedAt: '2024-03-18 10:30',
      assignedTo: 'Lisa Anderson',
      resolution: 'Provided comprehensive information about Sri Lanka tourism seasons and weather.',
      responseTime: '2 hours',
      satisfaction: 4
    }
  ]

  const tabs = [
    { id: 'all', label: 'All Tickets', count: tickets.length },
    { id: 'open', label: 'Open', count: tickets.filter(t => t.status === 'open').length },
    { id: 'in_progress', label: 'In Progress', count: tickets.filter(t => t.status === 'in_progress').length },
    { id: 'resolved', label: 'Resolved', count: tickets.filter(t => t.status === 'resolved').length },
    { id: 'closed', label: 'Closed', count: tickets.filter(t => t.status === 'closed').length }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-blue-600 bg-blue-100'
      case 'in_progress': return 'text-orange-600 bg-orange-100'
      case 'resolved': return 'text-green-600 bg-green-100'
      case 'closed': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'normal': return 'text-blue-600 bg-blue-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'complaint': return AlertTriangle
      case 'booking': return Calendar
      case 'payment': return DollarSign
      case 'emergency': return Shield
      default: return MessageCircle
    }
  }

  const filteredTickets = tickets.filter(ticket => {
    if (selectedTab === 'all') return true
    return ticket.status === selectedTab
  })

  const renderTicketCard = (ticket: SupportTicket) => {
    const TypeIcon = getTypeIcon(ticket.type)
    
    return (
      <Card key={ticket.id} className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedTicket(ticket)}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-gray-100">
              <TypeIcon className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
              <p className="text-gray-600">Ticket #{ticket.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
              {ticket.status.replace('_', ' ').toUpperCase()}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">{ticket.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Category</p>
            <p className="text-sm text-gray-600">{ticket.category}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Service Type</p>
            <p className="text-sm text-gray-600">{ticket.serviceType}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Created: {ticket.createdAt}</span>
            </div>
            {ticket.responseTime && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Response: {ticket.responseTime}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            {ticket.status === 'resolved' && ticket.satisfaction && (
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < ticket.satisfaction! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    )
  }

  const renderTicketDetail = () => {
    if (!selectedTicket) return null
    
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedTicket.title}
              </h2>
              <p className="text-gray-600">Ticket #{selectedTicket.id}</p>
            </div>
            <Button variant="outline" onClick={() => setSelectedTicket(null)}>
              Back to List
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Status</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTicket.status)}`}>
                  {selectedTicket.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Priority</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                  {selectedTicket.priority.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Category</h3>
                <p className="text-gray-600">{selectedTicket.category}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Service Type</h3>
                <p className="text-gray-600">{selectedTicket.serviceType}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Created</h3>
                <p className="text-gray-600">{selectedTicket.createdAt}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Last Updated</h3>
                <p className="text-gray-600">{selectedTicket.updatedAt}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">{selectedTicket.description}</p>
          </div>

          {selectedTicket.assignedTo && (
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-2">Assigned To</h3>
              <p className="text-gray-600">{selectedTicket.assignedTo}</p>
            </div>
          )}

          {selectedTicket.resolution && (
            <div className="mb-8 p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Resolution</h3>
              <p className="text-gray-600">{selectedTicket.resolution}</p>
            </div>
          )}

          <div className="border-t pt-6">
            <h3 className="font-medium text-gray-900 mb-4">Add Response</h3>
            <div className="space-y-4">
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Add a response or update to this ticket..."
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    className="hidden"
                    id="attachment"
                  />
                  <label htmlFor="attachment" className="cursor-pointer">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Attach File
                    </Button>
                  </label>
                </div>
                <Button>
                  <Send className="h-4 w-4 mr-1" />
                  Send Response
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  const renderCreateForm = () => (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Support Ticket</h2>
          <p className="text-gray-600">Get help with your tourism experience in Sri Lanka</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ticket Type *
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="">Select ticket type</option>
                <option value="general">General Support</option>
                <option value="complaint">Complaint</option>
                <option value="booking">Booking Support</option>
                <option value="payment">Payment Issue</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Brief description of your issue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Please provide detailed information about your issue..."
            />
          </div>

          <div className="flex items-center justify-between pt-6">
            <Button variant="outline" onClick={() => setShowCreateForm(false)}>
              Cancel
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Create Ticket
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-gray-900">
                My Support Tickets
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Track your support requests and get help with tourism services
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => setShowCreateForm(true)} className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {showCreateForm ? (
          renderCreateForm()
        ) : selectedTicket ? (
          renderTicketDetail()
        ) : (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Tickets</p>
                    <p className="text-2xl font-bold text-blue-600">{tickets.length}</p>
                  </div>
                  <Ticket className="h-8 w-8 text-blue-600" />
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Open</p>
                    <p className="text-2xl font-bold text-orange-600">{tickets.filter(t => t.status === 'open').length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">In Progress</p>
                    <p className="text-2xl font-bold text-yellow-600">{tickets.filter(t => t.status === 'in_progress').length}</p>
                  </div>
                  <MessageCircle className="h-8 w-8 text-yellow-600" />
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Resolved</p>
                    <p className="text-2xl font-bold text-green-600">{tickets.filter(t => t.status === 'resolved').length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </Card>
            </div>

            {/* Tabs */}
            <div className="mb-8">
              <div className="flex space-x-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedTab === tab.id
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Tickets List */}
            <div className="space-y-6">
              {filteredTickets.length === 0 ? (
                <Card className="p-12 text-center">
                  <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No tickets found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    No tickets match the selected filter.
                  </p>
                  <Button onClick={() => setShowCreateForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Ticket
                  </Button>
                </Card>
              ) : (
                filteredTickets.map(renderTicketCard)
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

