import React from 'react'
import { Button } from './Button'
import { Card } from './Card'
import { X, MapPin, Star, Clock, Users, DollarSign, Shield, Award, Building2, User, Calendar } from 'lucide-react'

interface MedicalService {
  id: string
  name: string
  description: string
  image: string
  location: string
  rating: number
  price: number
  currency: string
  category: string
  duration: string
  difficulty: string
  maxParticipants: number
  highlights: string[]
  verified: boolean
  governmentApproved: boolean
  hospital: string
  doctor: string
  specialization: string
}

interface MedicalServiceDetailModalProps {
  isOpen: boolean
  onClose: () => void
  service: MedicalService | null
  onBook: (id: string) => void
}

export function MedicalServiceDetailModal({ isOpen, onClose, service, onBook }: MedicalServiceDetailModalProps) {
  if (!isOpen || !service) return null

  const handleBook = () => {
    onClose() // Close detail modal first
    // Small delay to ensure smooth transition
    setTimeout(() => {
      onBook(service.id)
    }, 100)
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-light-200 p-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-heading font-bold text-neutral-dark-200">
            {service.name}
          </h2>
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
          {/* Image */}
          <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            {service.verified && (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                Verified
              </div>
            )}
            {service.governmentApproved && (
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Award className="h-4 w-4 mr-1" />
                Government Approved
              </div>
            )}
          </div>

          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Left Column - Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-dark-200 mb-2">Description</h3>
                <p className="text-neutral-dark-100 leading-relaxed">{service.description}</p>
              </div>

              {/* Highlights */}
              {service.highlights.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-neutral-dark-200 mb-3">Key Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center px-4 py-2 bg-blue-50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="text-neutral-dark-200">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hospital & Doctor Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-light-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Building2 className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-semibold text-neutral-dark-200">Hospital</h4>
                  </div>
                  <p className="text-neutral-dark-100">{service.hospital}</p>
                </div>
                <div className="p-4 bg-neutral-light-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <User className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-semibold text-neutral-dark-200">Doctor</h4>
                  </div>
                  <p className="text-neutral-dark-100">{service.doctor}</p>
                  <p className="text-sm text-neutral-dark-100 mt-1">{service.specialization}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Info */}
            <div className="space-y-4">
              {/* Price Card */}
              <Card className="p-4 bg-gradient-to-br from-primary to-primary-600 text-white">
                <div className="flex items-center mb-2">
                  <DollarSign className="h-5 w-5 mr-2" />
                  <span className="text-sm opacity-90">Price</span>
                </div>
                <div className="text-3xl font-bold mb-1">
                  {service.currency} {service.price.toLocaleString()}
                </div>
                <p className="text-sm opacity-90">All inclusive package</p>
              </Card>

              {/* Details Card */}
              <Card className="p-4">
                <h4 className="font-semibold text-neutral-dark-200 mb-3">Service Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span className="text-neutral-dark-100">{service.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-neutral-dark-100">{service.rating} Rating</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span className="text-neutral-dark-100">{service.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span className="text-neutral-dark-100">Max {service.maxParticipants} participant{service.maxParticipants > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span className="text-neutral-dark-100">Difficulty: {service.difficulty}</span>
                  </div>
                  <div className="pt-2 border-t border-neutral-light-200">
                    <span className="text-xs font-medium text-primary bg-primary-50 px-2 py-1 rounded">
                      {service.category}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Book Button */}
              <Button
                size="lg"
                className="w-full"
                onClick={handleBook}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

