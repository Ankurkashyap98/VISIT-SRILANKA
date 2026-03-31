import React, { useState } from 'react'
import { Button } from './Button'
import { Card } from './Card'
import { X, Calendar, Users, Mail, Phone, FileText, AlertCircle, CheckCircle } from 'lucide-react'

interface MedicalService {
  id: string
  name: string
  price: number
  currency: string
  duration: string
  location: string
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  service: MedicalService | null
}

export function BookingModal({ isOpen, onClose, service }: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    numberOfParticipants: 1,
    specialRequirements: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen || !service) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess(true)
      // Reset form after success
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          preferredDate: '',
          numberOfParticipants: 1,
          specialRequirements: ''
        })
        setSuccess(false)
        onClose()
      }, 2000)
    } catch (err) {
      setError('Failed to submit booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfParticipants' ? parseInt(value) || 1 : value
    }))
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-light-200 p-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-heading font-bold text-neutral-dark-200">
              Book Medical Service
            </h2>
            <p className="text-sm text-neutral-dark-100 mt-1">{service.name}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1 h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-dark-200 mb-2">
                Booking Request Submitted!
              </h3>
              <p className="text-neutral-dark-100 mb-4">
                We've received your booking request. Our team will contact you within 24 hours to confirm your appointment.
              </p>
            </div>
          ) : (
            <>
              {/* Service Summary */}
              <Card className="p-4 bg-neutral-light-50 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-neutral-dark-200">{service.name}</h3>
                    <p className="text-sm text-neutral-dark-100 mt-1">{service.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {service.currency} {service.price.toLocaleString()}
                    </div>
                    <p className="text-xs text-neutral-dark-100">{service.duration}</p>
                  </div>
                </div>
              </Card>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center mb-4">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}

              {/* Booking Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark-200 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-dark-200 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-dark-100" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark-200 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-dark-100" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="+94 77 123 4567"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-dark-200 mb-1">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-dark-100" />
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-dark-200 mb-1">
                    Number of Participants
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-dark-100" />
                    <select
                      name="numberOfParticipants"
                      value={formData.numberOfParticipants}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-dark-200 mb-1">
                    Special Requirements or Notes
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-neutral-dark-100" />
                    <textarea
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      rows={4}
                      className="w-full pl-10 pr-4 py-2 bg-white text-black border border-neutral-light-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Any special requirements, medical history, or notes..."
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1"
                    loading={loading}
                    loadingText="Submitting..."
                  >
                    Submit Booking Request
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}

