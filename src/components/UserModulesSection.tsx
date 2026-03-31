import React from 'react'
import { Section, SectionHeader } from './Section'
import { Grid } from './Grid'
import { Card } from './Card'
import { 
  User, 
  Home, 
  Car, 
  Heart, 
  Shield, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Bell, 
  Camera, 
  DollarSign, 
  Route, 
  Stethoscope, 
  FileText, 
  CheckCircle, 
  Users,
  BarChart3,
  Settings
} from 'lucide-react'

const UserModulesSection = () => {
  const modules = [
    {
      id: 'tourist',
      name: 'Tourist Module',
      icon: User,
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      description: 'Complete travel management for tourists with AI-powered assistance',
      features: [
        {
          icon: User,
          title: 'Registration',
          description: 'Quick signup with social login and passport verification'
        },
        {
          icon: MapPin,
          title: 'Journey Preferences',
          description: 'Set travel interests, budget, and personal preferences'
        },
        {
          icon: Settings,
          title: 'AI Itinerary',
          description: 'Smart trip planning with personalized recommendations'
        },
        {
          icon: CreditCard,
          title: 'Bookings',
          description: 'One-click booking for hotels, transport, and activities'
        },
        {
          icon: Bell,
          title: 'Reminders',
          description: 'Smart notifications for bookings, weather, and events'
        }
      ]
    },
    {
      id: 'host',
      name: 'Host Module',
      icon: Home,
      color: 'text-secondary',
      bgColor: 'bg-secondary-50',
      borderColor: 'border-secondary-200',
      description: 'Comprehensive homestay management for local hosts',
      features: [
        {
          icon: Shield,
          title: 'Register/Accredit',
          description: 'Government verification and accreditation process'
        },
        {
          icon: Camera,
          title: 'Upload Pics',
          description: 'High-quality photo management with AI optimization'
        },
        {
          icon: DollarSign,
          title: 'Set Pricing',
          description: 'Dynamic pricing with seasonal and demand adjustments'
        },
        {
          icon: Calendar,
          title: 'Calendar Sync',
          description: 'Real-time availability sync across all platforms'
        }
      ]
    },
    {
      id: 'transport',
      name: 'Transport Partner',
      icon: Car,
      color: 'text-accent',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      description: 'Complete transportation service management',
      features: [
        {
          icon: Car,
          title: 'List Vehicles',
          description: 'Taxis, buses, tuk-tuks with detailed specifications'
        },
        {
          icon: Route,
          title: 'Route Info',
          description: 'Real-time routes, traffic, and alternative paths'
        },
        {
          icon: DollarSign,
          title: 'Pricing',
          description: 'Transparent pricing with surge and distance calculations'
        },
        {
          icon: Calendar,
          title: 'Availability',
          description: 'Live availability tracking and booking management'
        }
      ]
    },
    {
      id: 'medical',
      name: 'Medical Partner',
      icon: Heart,
      color: 'text-status-success',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Medical tourism and healthcare service management',
      features: [
        {
          icon: Heart,
          title: 'List Hospitals',
          description: 'Verified hospitals with accreditation and specialties'
        },
        {
          icon: Stethoscope,
          title: 'Specialists',
          description: 'Doctor profiles, qualifications, and availability'
        },
        {
          icon: FileText,
          title: 'Treatment Packages',
          description: 'Comprehensive medical packages with pricing'
        },
        {
          icon: Shield,
          title: 'Insurance Tie-ups',
          description: 'International insurance partnerships and claims'
        }
      ]
    },
    {
      id: 'admin',
      name: 'Admin Module',
      icon: Shield,
      color: 'text-neutral-dark-200',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      description: 'Government oversight and platform management',
      features: [
        {
          icon: CheckCircle,
          title: 'Approval Workflows',
          description: 'Streamlined approval process for all service providers'
        },
        {
          icon: BarChart3,
          title: 'Monitoring',
          description: 'Real-time analytics and performance monitoring'
        },
        {
          icon: FileText,
          title: 'Content Management',
          description: 'Platform content, policies, and information updates'
        },
        {
          icon: Shield,
          title: 'Compliance Check',
          description: 'Regular compliance audits and quality assurance'
        }
      ]
    }
  ]

  return (
    <Section background="white" id="user-modules" className="sri-lanka-modules-section">
      <SectionHeader 
        title="Comprehensive Platform Modules"
        subtitle="Multi-User Ecosystem"
        description="Our platform serves all stakeholders in the Sri Lankan tourism ecosystem with specialized modules designed for different user types and needs."
        centered={true}
      />
      
      <Grid cols={1} gap="xl" className="sri-lanka-modules-grid">
        {modules.map((module) => (
          <Card key={module.id} className={`sri-lanka-module-card p-8 hover:shadow-medium transition-all duration-300 group border-l-4 ${module.borderColor}`}>
            <div className="sri-lanka-module-card-content">
              {/* Module Header */}
              <div className="sri-lanka-module-header flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                <div className={`sri-lanka-module-icon ${module.bgColor} p-3 sm:p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <module.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${module.color}`} />
                </div>
                <div className="sri-lanka-module-info flex-1">
                  <h3 className="sri-lanka-module-name text-xl sm:text-2xl font-heading font-bold text-neutral-dark-200 mb-2 group-hover:text-primary transition-colors">
                    {module.name}
                  </h3>
                  <p className="sri-lanka-module-description text-sm sm:text-base text-neutral-dark-100">
                    {module.description}
                  </p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="sri-lanka-module-features">
                <Grid cols={4} gap="md" className="sri-lanka-module-features-grid">
                  {module.features.map((feature, index) => (
                    <Card key={index} className="sri-lanka-module-feature p-4 hover:shadow-soft transition-all duration-300 group/feature">
                      <div className="sri-lanka-module-feature-content text-center">
                        <div className={`sri-lanka-module-feature-icon ${module.bgColor} p-3 rounded-lg mx-auto mb-3 group-hover/feature:scale-110 transition-transform duration-300 w-fit`}>
                          <feature.icon className={`h-5 w-5 ${module.color}`} />
                        </div>
                        <h4 className="sri-lanka-module-feature-title text-sm font-heading font-semibold text-neutral-dark-200 mb-2 group-hover/feature:text-primary transition-colors">
                          {feature.title}
                        </h4>
                        <p className="sri-lanka-module-feature-description text-xs text-neutral-dark-100">
                          {feature.description}
                        </p>
                      </div>
                    </Card>
                  ))}
                </Grid>
              </div>
            </div>
          </Card>
        ))}
      </Grid>

      {/* Platform Benefits */}
      <div className="sri-lanka-platform-benefits mt-8 sm:mt-12 md:mt-16">
        <div className="sri-lanka-platform-benefits-content bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
          <div className="sri-lanka-platform-benefits-header text-center mb-6 sm:mb-8">
            <h3 className="sri-lanka-platform-benefits-title text-xl sm:text-2xl font-heading font-bold text-neutral-dark-200 mb-3 sm:mb-4">
              Integrated Ecosystem Benefits
            </h3>
            <p className="sri-lanka-platform-benefits-description text-sm sm:text-base text-neutral-dark-100 max-w-3xl mx-auto px-2 sm:px-0">
              All modules work together seamlessly to create a comprehensive tourism ecosystem that benefits everyone involved.
            </p>
          </div>
          
          <Grid cols={3} gap="lg" className="sri-lanka-platform-benefits-grid">
            <div className="sri-lanka-platform-benefit text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="sri-lanka-platform-benefit-title text-lg font-heading font-semibold text-neutral-dark-200 mb-2">
                Multi-User Support
              </h4>
              <p className="sri-lanka-platform-benefit-description text-sm text-neutral-dark-100">
                Dedicated interfaces for tourists, hosts, transport partners, medical providers, and administrators
              </p>
            </div>
            
            <div className="sri-lanka-platform-benefit text-center">
              <Shield className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h4 className="sri-lanka-platform-benefit-title text-lg font-heading font-semibold text-neutral-dark-200 mb-2">
                Government Oversight
              </h4>
              <p className="sri-lanka-platform-benefit-description text-sm text-neutral-dark-100">
                All services are monitored and verified by relevant government departments for quality and safety
              </p>
            </div>
            
            <div className="sri-lanka-platform-benefit text-center">
              <BarChart3 className="h-12 w-12 text-accent mx-auto mb-4" />
              <h4 className="sri-lanka-platform-benefit-title text-lg font-heading font-semibold text-neutral-dark-200 mb-2">
                Data-Driven Insights
              </h4>
              <p className="sri-lanka-platform-benefit-description text-sm text-neutral-dark-100">
                Real-time analytics and insights help improve services and user experiences across all modules
              </p>
            </div>
          </Grid>
        </div>
      </div>
    </Section>
  )
}

export { UserModulesSection }

