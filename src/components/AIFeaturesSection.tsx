import React from 'react'
import { Section, SectionHeader } from './Section'
import { Grid } from './Grid'
import { Card } from './Card'
import { 
  Plane, 
  Home, 
  RefreshCw, 
  Shield, 
  MessageCircle, 
  MapPin, 
  Brain,
  FileText,
  CheckCircle,
  Lock,
  Globe,
  Users
} from 'lucide-react'

const AIFeaturesSection = () => {
  const aiFeatures = [
    {
      id: 'journey-planner',
      name: 'AI Journey Planner',
      icon: Plane,
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      description: 'Intelligent trip planning from source to Sri Lanka with complete journey mapping',
      features: [
        'Multi-leg journey optimization',
        'Flight and transport connections',
        'Time zone and layover management',
        'Budget-aware route planning',
        'Real-time schedule updates'
      ]
    },
    {
      id: 'stay-recommendation',
      name: 'Stay Recommendation Engine',
      icon: Home,
      color: 'text-secondary',
      bgColor: 'bg-secondary-50',
      borderColor: 'border-secondary-200',
      description: 'Personalized accommodation suggestions based on comprehensive user profiling',
      features: [
        'Preference-based matching',
        'Interest and activity alignment',
        'Dynamic budget optimization',
        'Seasonal pricing intelligence',
        'Location and accessibility scoring'
      ]
    },
    {
      id: 'itinerary-optimizer',
      name: 'Itinerary Optimizer',
      icon: RefreshCw,
      color: 'text-accent',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      description: 'Dynamic itinerary adjustments based on real-time conditions and events',
      features: [
        'Weather-based modifications',
        'Time optimization algorithms',
        'Local event integration',
        'Closure and availability updates',
        'Alternative activity suggestions'
      ]
    },
    {
      id: 'scam-avoidance',
      name: 'Scam-Avoidance Alerts',
      icon: Shield,
      color: 'text-status-success',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Proactive protection against scams using GPS, location data, and travel trends',
      features: [
        'GPS-based location verification',
        'Real-time scam pattern detection',
        'Travel trend analysis',
        'User behavior monitoring',
        'Instant alert notifications'
      ]
    },
    {
      id: 'ai-assistant',
      name: 'Conversational AI Assistant',
      icon: MessageCircle,
      color: 'text-status-warning',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: '24/7 AI companion providing local tips, translation, and emergency assistance',
      features: [
        'Natural language processing',
        'Local tips and recommendations',
        'Multi-language translation',
        'Emergency aid coordination',
        'Context-aware responses'
      ]
    },
    {
      id: 'live-tracking',
      name: 'Live Tracking',
      icon: MapPin,
      color: 'text-neutral-dark-200',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      description: 'Real-time tourist safety monitoring with embassy and local support integration',
      features: [
        'Real-time location tracking',
        'Safety zone monitoring',
        'Emergency contact integration',
        'Embassy coordination',
        'Local support network'
      ]
    }
  ]

  const securityFeatures = [
    {
      id: 'ekyc',
      name: 'eKYC & Document Upload',
      icon: FileText,
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      description: 'Secure identity verification for tourists and hosts with government integration',
      features: [
        'Digital identity verification',
        'Document authenticity checks',
        'Government database integration',
        'Secure document storage',
        'Multi-factor authentication'
      ]
    },
    {
      id: 'host-licensing',
      name: 'Host Licensing & Audit',
      icon: CheckCircle,
      color: 'text-secondary',
      bgColor: 'bg-secondary-50',
      description: 'Government-audited host licensing with periodic inspections and compliance',
      features: [
        'Government audit integration',
        'Periodic inspection scheduling',
        'Compliance monitoring',
        'License renewal automation',
        'Quality standard enforcement'
      ]
    },
    {
      id: 'privacy',
      name: 'GDPR-Style Privacy',
      icon: Lock,
      color: 'text-accent',
      bgColor: 'bg-yellow-50',
      description: 'Comprehensive data protection following international privacy standards',
      features: [
        'Data minimization practices',
        'Consent management',
        'Right to deletion',
        'Data portability',
        'Privacy impact assessments'
      ]
    },
    {
      id: 'visa-validation',
      name: 'Visa Validation',
      icon: Globe,
      color: 'text-status-success',
      bgColor: 'bg-green-50',
      description: 'Real-time visa validation through Immigration Department APIs',
      features: [
        'Immigration API integration',
        'Real-time visa status checks',
        'Document validation',
        'Entry requirement verification',
        'Automated compliance checking'
      ]
    },
    {
      id: 'customs-health',
      name: 'Customs & Health Integration',
      icon: Users,
      color: 'text-status-warning',
      bgColor: 'bg-orange-50',
      description: 'Seamless integration with customs and health declaration systems',
      features: [
        'Customs declaration automation',
        'Health screening integration',
        'Travel history tracking',
        'Medical requirement checks',
        'Border control coordination'
      ]
    }
  ]

  return (
    <Section background="light" id="ai-features" className="sri-lanka-ai-features-section">
      <SectionHeader 
        title="Smart AI-Powered Features"
        subtitle="Intelligent Tourism Technology"
        description="Advanced artificial intelligence and machine learning capabilities that make your Sri Lankan journey seamless, safe, and personalized."
        centered={true}
      />
      
      {/* AI Features Grid */}
      <Grid cols={3} gap="lg" className="sri-lanka-ai-features-grid mb-16">
        {aiFeatures.map((feature) => (
          <Card key={feature.id} className={`sri-lanka-ai-feature-card p-6 hover:shadow-medium transition-all duration-300 group border-l-4 ${feature.borderColor}`}>
            <div className="sri-lanka-ai-feature-card-content">
              {/* Feature Header */}
              <div className="sri-lanka-ai-feature-header flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <div className={`sri-lanka-ai-feature-icon ${feature.bgColor} p-2 sm:p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <feature.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${feature.color}`} />
                </div>
                <div className="sri-lanka-ai-feature-info flex-1 min-w-0">
                  <h3 className="sri-lanka-ai-feature-name text-base sm:text-lg font-heading font-semibold text-neutral-dark-200 mb-2 group-hover:text-primary transition-colors">
                    {feature.name}
                  </h3>
                  <p className="sri-lanka-ai-feature-description text-xs sm:text-sm text-neutral-dark-100">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Feature List */}
              <div className="sri-lanka-ai-feature-list">
                <ul className="space-y-2">
                  {feature.features.map((item, index) => (
                    <li key={index} className="sri-lanka-ai-feature-item flex items-center text-sm text-neutral-dark-100">
                      <CheckCircle className="h-4 w-4 text-status-success mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </Grid>

      {/* Security & Compliance Section */}
      <div className="sri-lanka-security-section">
        <SectionHeader 
          title="Security, Licensing, and Compliance"
          subtitle="Government-Integrated Safety"
          description="Comprehensive security measures and compliance systems integrated with government departments to ensure your safety and data protection."
          centered={true}
        />
        
        <Grid cols={3} gap="lg" className="sri-lanka-security-features-grid">
          {securityFeatures.map((feature) => (
            <Card key={feature.id} className="sri-lanka-security-feature-card p-6 hover:shadow-medium transition-all duration-300 group border-l-4 border-primary">
              <div className="sri-lanka-security-feature-card-content">
                {/* Feature Header */}
                <div className="sri-lanka-security-feature-header flex items-start space-x-4 mb-4">
                  <div className={`sri-lanka-security-feature-icon ${feature.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div className="sri-lanka-security-feature-info flex-1">
                    <h3 className="sri-lanka-security-feature-name text-lg font-heading font-semibold text-neutral-dark-200 mb-2 group-hover:text-primary transition-colors">
                      {feature.name}
                    </h3>
                    <p className="sri-lanka-security-feature-description text-sm text-neutral-dark-100">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Feature List */}
                <div className="sri-lanka-security-feature-list">
                  <ul className="space-y-2">
                    {feature.features.map((item, index) => (
                      <li key={index} className="sri-lanka-security-feature-item flex items-center text-sm text-neutral-dark-100">
                        <Shield className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </Grid>
      </div>

      {/* AI & Security Benefits */}
      <div className="sri-lanka-ai-security-benefits mt-8 sm:mt-12 md:mt-16">
        <div className="sri-lanka-ai-security-benefits-content bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
          <div className="sri-lanka-ai-security-benefits-header text-center mb-6 sm:mb-8">
            <h3 className="sri-lanka-ai-security-benefits-title text-xl sm:text-2xl font-heading font-bold text-neutral-dark-200 mb-3 sm:mb-4">
              Advanced Technology for Safe Travel
            </h3>
            <p className="sri-lanka-ai-security-benefits-description text-sm sm:text-base text-neutral-dark-100 max-w-3xl mx-auto px-2 sm:px-0">
              Our platform combines cutting-edge AI technology with robust security measures to create the safest and most intelligent tourism experience in Sri Lanka.
            </p>
          </div>
          
          <Grid cols={3} gap="lg" className="sri-lanka-ai-security-benefits-grid">
            <div className="sri-lanka-ai-security-benefit text-center">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="sri-lanka-ai-security-benefit-title text-lg font-heading font-semibold text-neutral-dark-200 mb-2">
                AI-Powered Intelligence
              </h4>
              <p className="sri-lanka-ai-security-benefit-description text-sm text-neutral-dark-100">
                Machine learning algorithms provide personalized recommendations and proactive safety measures
              </p>
            </div>
            
            <div className="sri-lanka-ai-security-benefit text-center">
              <Shield className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h4 className="sri-lanka-ai-security-benefit-title text-lg font-heading font-semibold text-neutral-dark-200 mb-2">
                Government Integration
              </h4>
              <p className="sri-lanka-ai-security-benefit-description text-sm text-neutral-dark-100">
                Direct integration with government systems ensures compliance and real-time verification
              </p>
            </div>
            
            <div className="sri-lanka-ai-security-benefit text-center">
              <Lock className="h-12 w-12 text-accent mx-auto mb-4" />
              <h4 className="sri-lanka-ai-security-benefit-title text-lg font-heading font-semibold text-neutral-dark-200 mb-2">
                Privacy Protection
              </h4>
              <p className="sri-lanka-ai-security-benefit-description text-sm text-neutral-dark-100">
                GDPR-compliant data protection with end-to-end encryption and secure storage
              </p>
            </div>
          </Grid>
        </div>
      </div>
    </Section>
  )
}

export { AIFeaturesSection }

