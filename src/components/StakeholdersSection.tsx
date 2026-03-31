import React from 'react'
import { Section, SectionHeader } from './Section'
import { Grid } from './Grid'
import { Card } from './Card'
import { Shield, Users, Heart, Train, Home, Wifi, CheckCircle, Star } from 'lucide-react'

const StakeholdersSection = () => {
  const stakeholders = [
    {
      id: '1',
      name: 'Sri Lanka Tourism Development Authority',
      role: 'Primary Tourism Authority',
      services: ['Destination Verification', 'Tourism Standards', 'Quality Assurance'],
      icon: Shield,
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      description: 'Official government body ensuring tourism quality and standards'
    },
    {
      id: '2',
      name: 'Immigration & Visa Department',
      role: 'Entry & Documentation',
      services: ['Visa Processing', 'Entry Clearance', 'Document Verification'],
      icon: Users,
      color: 'text-secondary',
      bgColor: 'bg-secondary-50',
      description: 'Streamlined visa and immigration services for tourists'
    },
    {
      id: '3',
      name: 'Ministry of Health',
      role: 'Medical Tourism',
      services: ['Hospital Accreditation', 'Medical Standards', 'Health Monitoring'],
      icon: Heart,
      color: 'text-status-success',
      bgColor: 'bg-green-50',
      description: 'Ensuring medical tourism safety and quality standards'
    },
    {
      id: '4',
      name: 'Transport Department',
      role: 'Transportation Services',
      services: ['Railway Services', 'Taxi Licensing', 'Route Verification'],
      icon: Train,
      color: 'text-accent',
      bgColor: 'bg-yellow-50',
      description: 'Verified and licensed transportation options'
    },
    {
      id: '5',
      name: 'Local Municipality',
      role: 'Accommodation Auditing',
      services: ['Homestay Verification', 'Safety Standards', 'Local Compliance'],
      icon: Home,
      color: 'text-status-warning',
      bgColor: 'bg-orange-50',
      description: 'Local accommodation safety and quality assurance'
    },
    {
      id: '6',
      name: 'Cybersecurity & Telecom',
      role: 'Digital Security',
      services: ['Location Tracking', 'Data Protection', 'Emergency Response'],
      icon: Wifi,
      color: 'text-neutral-dark-200',
      bgColor: 'bg-gray-50',
      description: 'Advanced security and emergency response systems'
    }
  ]

  return (
    <Section background="light" id="stakeholders" className="sri-lanka-stakeholders-section">
      <SectionHeader 
        title="Government-Verified Services"
        subtitle="Trusted Partners"
        description="Our platform integrates with key government departments to ensure your safety, security, and seamless travel experience in Sri Lanka."
        centered={true}
      />
      
      <Grid cols={3} gap="lg" className="sri-lanka-stakeholders-grid">
        {stakeholders.map((stakeholder) => (
          <Card key={stakeholder.id} className="sri-lanka-stakeholder-card p-6 hover:shadow-medium transition-all duration-300 group">
            <div className="sri-lanka-stakeholder-card-content">
              {/* Icon and Header */}
              <div className="sri-lanka-stakeholder-header flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <div className={`sri-lanka-stakeholder-icon ${stakeholder.bgColor} p-2 sm:p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <stakeholder.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stakeholder.color}`} />
                </div>
                <div className="sri-lanka-stakeholder-info flex-1 min-w-0">
                  <h3 className="sri-lanka-stakeholder-name text-base sm:text-lg font-heading font-semibold text-neutral-dark-200 mb-1 group-hover:text-primary transition-colors">
                    {stakeholder.name}
                  </h3>
                  <p className="sri-lanka-stakeholder-role text-xs sm:text-sm text-primary font-medium mb-2">
                    {stakeholder.role}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="sri-lanka-stakeholder-description text-sm text-neutral-dark-100 mb-4">
                {stakeholder.description}
              </p>

              {/* Services */}
              <div className="sri-lanka-stakeholder-services">
                <h4 className="sri-lanka-stakeholder-services-title text-sm font-medium text-neutral-dark-200 mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 text-status-success mr-2" />
                  Key Services
                </h4>
                <div className="sri-lanka-stakeholder-services-list space-y-2">
                  {stakeholder.services.map((service, index) => (
                    <div key={index} className="sri-lanka-stakeholder-service flex items-center text-sm text-neutral-dark-100">
                      <Star className="h-3 w-3 text-accent mr-2 flex-shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </Grid>

      {/* Trust Indicators */}
      <div className="sri-lanka-trust-indicators mt-8 sm:mt-12 text-center">
        <div className="sri-lanka-trust-badge bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-soft border border-primary-100">
          <div className="sri-lanka-trust-badge-content">
            <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
            <h3 className="sri-lanka-trust-badge-title text-lg sm:text-xl font-heading font-semibold text-neutral-dark-200 mb-2">
              Government-Backed Platform
            </h3>
            <p className="sri-lanka-trust-badge-description text-sm sm:text-base text-neutral-dark-100 max-w-2xl mx-auto px-2 sm:px-0">
              Every service, accommodation, and experience on our platform is verified and monitored by official government departments, 
              ensuring your safety, security, and satisfaction throughout your Sri Lankan journey.
            </p>
            <div className="sri-lanka-trust-badge-features flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
              <div className="sri-lanka-trust-feature flex items-center text-sm text-neutral-dark-100">
                <CheckCircle className="h-4 w-4 text-status-success mr-2" />
                <span>100% Verified Services</span>
              </div>
              <div className="sri-lanka-trust-feature flex items-center text-sm text-neutral-dark-100">
                <CheckCircle className="h-4 w-4 text-status-success mr-2" />
                <span>Real-time Monitoring</span>
              </div>
              <div className="sri-lanka-trust-feature flex items-center text-sm text-neutral-dark-100">
                <CheckCircle className="h-4 w-4 text-status-success mr-2" />
                <span>24/7 Emergency Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export { StakeholdersSection }

