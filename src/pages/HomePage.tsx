import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { Footer } from '../components/Footer'
import { Button } from '../components/Button'
import { Card, DestinationCard } from '../components/Card'
import { Section, SectionHeader } from '../components/Section'
import { Grid } from '../components/Grid'
import { StakeholdersSection } from '../components/StakeholdersSection'
import { UserModulesSection } from '../components/UserModulesSection'
import { AIFeaturesSection } from '../components/AIFeaturesSection'
import { getImageSource } from '../lib/imageUtils'
import { 
  Shield, 
  DollarSign, 
  Bot, 
  Phone, 
  ArrowRight
} from 'lucide-react'

export default function HomePage() {
  // Mock data for demonstration - using smart image system
  const featuredDestinations = [
    {
      id: "1",
      name: "Sigiriya Rock Fortress",
      description: "Ancient rock fortress and palace ruins with stunning frescoes and panoramic views",
      category: "Historical",
      location: "Central Province",
      rating: 4.8,
      price: 30,
      image: getImageSource("Sigiriya Rock Fortress").url,
      verified: true,
      governmentApproved: true,
      highlights: ["UNESCO World Heritage", "Ancient Frescoes", "Panoramic Views"],
      duration: "Half Day",
      difficulty: "Moderate"
    },
    {
      id: "2",
      name: "Sacred City of Kandy",
      description: "Sacred Buddhist city with the Temple of the Sacred Tooth Relic",
      category: "Religious",
      location: "Kandy",
      rating: 4.9,
      price: 0,
      image: getImageSource("Sacred City of Kandy").url,
      verified: true,
      governmentApproved: true,
      highlights: ["Sacred Relic", "UNESCO World Heritage", "Cultural Ceremonies"],
      duration: "2-3 Hours",
      difficulty: "Easy"
    },
    {
      id: "3",
      name: "Sinharaja Forest Reserve",
      description: "UNESCO World Heritage tropical rainforest with endemic wildlife",
      category: "Adventure",
      location: "Southern Province",
      rating: 4.7,
      price: 45,
      image: getImageSource("Sinharaja Forest Reserve").url,
      verified: true,
      governmentApproved: true,
      highlights: ["Endemic Species", "Rainforest Trekking", "Bird Watching"],
      duration: "Full Day",
      difficulty: "Moderate"
    }
  ]

  const valuePropositions = [
    {
      icon: Shield,
      title: "Licensed Providers",
      description: "All hotels, guides, and transport services are audited and verified by the government",
      color: "text-status-success"
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "Clear breakdown of all costs with no hidden charges or surprise fees",
      color: "text-primary"
    },
    {
      icon: Bot,
      title: "AI Assistance",
      description: "Smart recommendations and 24/7 support powered by advanced AI technology",
      color: "text-accent"
    },
    {
      icon: Phone,
      title: "Safe Travel",
      description: "Emergency SOS, local alerts, and government-verified safety measures",
      color: "text-status-warning"
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
            "@type": "WebSite",
            "name": "Visit Sri Lanka - Smart Tourism Portal",
            "description": "Discover Sri Lanka's rich culture, stunning landscapes, and warm hospitality with government-verified services and transparent pricing.",
            "url": "https://visitsrilanka.gov.lk",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://visitsrilanka.gov.lk/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Sri Lanka Tourism Development Authority",
              "url": "https://visitsrilanka.gov.lk"
            }
          })
        }}
      />

      <div className="sri-lanka-homepage min-h-screen">
        <Navbar />
        
        {/* Hero Section */}
        <Hero />

        {/* Value Proposition Section */}
        <Section background="light" id="value-propositions">
          <SectionHeader 
            title="Why Choose Sri Lanka Smart Portal?"
            description="Experience the difference with government-verified services, transparent pricing, and AI-powered assistance designed for your safety and satisfaction."
          />
          
          <Grid cols={4} gap="md">
            {valuePropositions.map((item, index) => (
              <Card key={index} className="sri-lanka-value-card p-6 text-center hover:shadow-medium transition-all duration-300">
                <div className={`sri-lanka-value-card-icon inline-flex p-3 rounded-full bg-neutral-light-100 mb-4 ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="sri-lanka-value-card-title text-xl font-heading font-semibold text-neutral-dark-200 mb-3">
                  {item.title}
                </h3>
                <p className="sri-lanka-value-card-description text-neutral-dark-100">
                  {item.description}
                </p>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* Featured Destinations */}
        <Section background="white" id="featured-destinations">
          <SectionHeader 
            title="Featured Destinations"
            description="Discover Sri Lanka's most iconic and government-verified destinations."
          />
          
          <Grid cols={3} gap="md">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </Grid>
          
          <div className="sri-lanka-destinations-cta text-center mt-8">
            <Link to="/destinations">
              <Button variant="primary" size="lg" className="sri-lanka-destinations-button">
                View All Destinations
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </Section>

        {/* Government Stakeholders Section */}
        <StakeholdersSection />

        {/* User Modules Section */}
        <UserModulesSection />

        {/* AI Features Section */}
        <AIFeaturesSection />

        {/* Note: Other sections (PilgrimagePlanner, MedicalTourismModule, etc.) can be added here
            They are complex components that can be migrated later if needed */}

        <Footer />
      </div>
    </>
  )
}
