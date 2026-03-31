import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Section, SectionHeader } from '../components/Section'
import { Grid } from '../components/Grid'
import { getImageUrl } from '../lib/utils'
import { 
  Shield, 
  Users, 
  Globe, 
  Heart,
  CheckCircle,
  Award,
  Target,
  Eye,
  HandHeart,
  Lightbulb
} from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'We ensure all tourism services meet the highest standards of quality and safety.',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'We prioritize the well-being of local communities and sustainable development.',
      color: 'text-green-600'
    },
    {
      icon: Globe,
      title: 'Global Standards',
      description: 'We maintain international standards while preserving local authenticity.',
      color: 'text-purple-600'
    },
    {
      icon: Heart,
      title: 'Passion for Tourism',
      description: 'We are passionate about showcasing the beauty and culture of Sri Lanka.',
      color: 'text-red-600'
    }
  ]

  const achievements = [
    {
      icon: Award,
      title: 'UNESCO World Heritage Sites',
      description: '8 UNESCO World Heritage Sites under our protection and promotion',
      value: '8',
      color: 'text-yellow-600'
    },
    {
      icon: Users,
      title: 'Tourist Arrivals',
      description: 'Millions of satisfied visitors annually',
      value: '2.3M+',
      color: 'text-blue-600'
    },
    {
      icon: CheckCircle,
      title: 'Verified Providers',
      description: 'Government-verified tourism service providers',
      value: '500+',
      color: 'text-green-600'
    },
    {
      icon: Globe,
      title: 'International Recognition',
      description: 'Awards and recognition from global tourism organizations',
      value: '15+',
      color: 'text-purple-600'
    }
  ]

  const team = [
    {
      name: 'Dr. Priyanka Fernando',
      position: 'Director General',
      image: '/images/team/director.jpg',
      description: 'Leading the transformation of Sri Lanka tourism with 20+ years of experience.'
    },
    {
      name: 'Mr. Rajesh Kumar',
      position: 'Head of Digital Innovation',
      image: '/images/team/digital-head.jpg',
      description: 'Pioneering smart tourism solutions and digital transformation initiatives.'
    },
    {
      name: 'Ms. Soma Perera',
      position: 'Head of Quality Assurance',
      image: '/images/team/quality-head.jpg',
      description: 'Ensuring the highest standards of service quality and safety.'
    },
    {
      name: 'Mr. Nimal Silva',
      position: 'Head of Community Relations',
      image: '/images/team/community-head.jpg',
      description: 'Building strong relationships with local communities and stakeholders.'
    }
  ]

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sri Lanka Tourism Development Authority",
            "alternateName": "SLTDA",
            "description": "The official tourism authority of Sri Lanka, promoting sustainable and responsible tourism.",
            "url": "https://visitsrilanka.gov.lk",
            "logo": "https://visitsrilanka.gov.lk/images/logo.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Colombo",
              "addressRegion": "Western Province",
              "addressCountry": "LK"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+94-11-242-6900",
              "contactType": "customer service",
              "availableLanguage": ["English", "Sinhala", "Tamil"]
            },
            "sameAs": [
              "https://www.facebook.com/VisitSriLanka",
              "https://www.instagram.com/visitsrilanka",
              "https://www.twitter.com/VisitSriLanka"
            ]
          })
        }}
      />

      <div className="min-h-screen bg-gray-50 ">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold text-black mb-6">
              About Sri Lanka Tourism Development Authority
            </h1>
            <p className="text-xl text-black max-w-3xl mx-auto">
              We are the official tourism authority of Sri Lanka, dedicated to promoting sustainable and responsible tourism while preserving our rich cultural heritage and natural beauty.
            </p>
          </div>

          {/* Mission & Vision */}
          <Section background="white" id="mission-vision">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-8">
                <div className="text-center">
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-heading font-bold text-neutral-dark-200 mb-4">Our Mission</h2>
                  <p className="text-neutral-dark-100 leading-relaxed">
                    To promote Sri Lanka as a premier tourism destination while ensuring sustainable development, 
                    community empowerment, and preservation of our natural and cultural heritage for future generations.
                  </p>
                </div>
              </Card>
              
              <Card className="p-8">
                <div className="text-center">
                  <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-heading font-bold text-neutral-dark-200 mb-4">Our Vision</h2>
                  <p className="text-neutral-dark-100 leading-relaxed">
                    To be the leading tourism authority in South Asia, recognized globally for our commitment 
                    to sustainable tourism, innovation, and authentic cultural experiences.
                  </p>
                </div>
              </Card>
            </div>
          </Section>

          {/* Values */}
          <Section background="light" id="values">
            <SectionHeader 
              title="Our Core Values"
              description="The principles that guide our work and shape our commitment to excellence in tourism."
            />
            
            <Grid cols={4} gap="md">
              {values.map((value, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className={`inline-flex p-3 rounded-full bg-neutral-light-100 mb-4 ${value.color}`}>
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-neutral-dark-200 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-neutral-dark-100">
                    {value.description}
                  </p>
                </Card>
              ))}
            </Grid>
          </Section>

          {/* Achievements */}
          <Section background="white" id="achievements">
            <SectionHeader 
              title="Our Achievements"
              description="Milestones that reflect our commitment to excellence and innovation in tourism."
            />
            
            <Grid cols={4} gap="md">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-full bg-neutral-light-100 mb-4 ${achievement.color}`}>
                    <achievement.icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {achievement.value}
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-neutral-dark-200 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-neutral-dark-100 text-sm">
                    {achievement.description}
                  </p>
                </Card>
              ))}
            </Grid>
          </Section>

          {/* Team */}
          <Section background="light" id="team">
            <SectionHeader 
              title="Our Leadership Team"
              description="Meet the dedicated professionals leading Sri Lanka's tourism transformation."
            />
            
            <Grid cols={4} gap="md">
              {team.map((member, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 bg-neutral-light-200 rounded-full mx-auto mb-4 overflow-hidden relative">
                    <img 
                      src={getImageUrl(member.image)} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget
                        target.onerror = null
                        target.src = getImageUrl('/images/placeholder-img1.jpg')
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-neutral-dark-200 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-neutral-dark-100 text-sm">
                    {member.description}
                  </p>
                </Card>
              ))}
            </Grid>
          </Section>

          {/* Call to Action */}
          <Section background="white" id="cta">
            <div className="text-center">
              <h2 className="text-3xl font-heading font-bold text-neutral-dark-200 mb-4">
                Join Us in Promoting Sri Lanka
              </h2>
              <p className="text-xl text-neutral-dark-100 mb-8 max-w-2xl mx-auto">
                Whether you&apos;re a tourist, tourism provider, or community member, 
                we invite you to be part of Sri Lanka&apos;s sustainable tourism journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <HandHeart className="h-5 w-5 mr-2" />
                  Partner With Us
                </Button>
                <Button variant="primary" size="lg">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Share Your Ideas
                </Button>
              </div>
            </div>
          </Section>
        </div>

        <Footer />
      </div>
    </>
  )
}
