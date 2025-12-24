import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Section, SectionHeader } from '../components/Section'
import { FileText, Clock, DollarSign, CheckCircle, AlertCircle, Globe, MapPin, Phone } from 'lucide-react'

export default function VisaPage() {
  const visaTypes = [
    {
      name: 'Tourist Visa (ETA)',
      duration: '30 days',
      price: '$35',
      description: 'Electronic Travel Authorization for tourism purposes',
      requirements: [
        'Valid passport (6 months validity)',
        'Return or onward ticket',
        'Sufficient funds for stay',
        'Completed online application'
      ],
      processingTime: '24-48 hours',
      popular: true
    },
    {
      name: 'Business Visa',
      duration: '30 days',
      price: '$40',
      description: 'For business meetings, conferences, and trade',
      requirements: [
        'Valid passport',
        'Business invitation letter',
        'Company registration documents',
        'Return ticket'
      ],
      processingTime: '3-5 business days',
      popular: false
    },
    {
      name: 'Transit Visa',
      duration: '48 hours',
      price: '$20',
      description: 'For travelers transiting through Sri Lanka',
      requirements: [
        'Valid passport',
        'Confirmed onward ticket',
        'Visa for final destination (if required)'
      ],
      processingTime: '24 hours',
      popular: false
    },
    {
      name: 'Medical Visa',
      duration: '60 days',
      price: '$50',
      description: 'For medical treatment and procedures',
      requirements: [
        'Valid passport',
        'Medical report from home country',
        'Hospital appointment confirmation',
        'Medical insurance'
      ],
      processingTime: '5-7 business days',
      popular: false
    }
  ]

  const steps = [
    {
      step: 1,
      title: 'Apply Online',
      description: 'Complete the ETA application form on the official website',
      icon: FileText
    },
    {
      step: 2,
      title: 'Pay Fee',
      description: 'Pay the visa fee using credit/debit card or PayPal',
      icon: DollarSign
    },
    {
      step: 3,
      title: 'Receive Approval',
      description: 'Get your ETA approval via email within 24-48 hours',
      icon: CheckCircle
    },
    {
      step: 4,
      title: 'Travel',
      description: 'Present your ETA and passport at immigration',
      icon: Globe
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-light-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 mt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <FileText className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-dark-200 mb-4">
            Visa Information for Sri Lanka
          </h1>
          <p className="text-xl text-neutral-dark-100 max-w-3xl mx-auto">
            Everything you need to know about obtaining a visa to visit beautiful Sri Lanka
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6">
            <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-neutral-dark-200 mb-2">Processing Time</h3>
            <p className="text-neutral-dark-100">24-48 hours for ETA</p>
          </Card>
          <Card className="text-center p-6">
            <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-neutral-dark-200 mb-2">Visa Fee</h3>
            <p className="text-neutral-dark-100">Starting from $20</p>
          </Card>
          <Card className="text-center p-6">
            <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-neutral-dark-200 mb-2">Online Application</h3>
            <p className="text-neutral-dark-100">Easy and fast process</p>
          </Card>
        </div>

        {/* Visa Types */}
        <Section>
          <SectionHeader
            title="Types of Visas"
            description="Choose the visa type that matches your travel purpose"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {visaTypes.map((visa, index) => (
              <Card key={index} className={`${visa.popular ? 'ring-2 ring-primary' : ''}`}>
                {visa.popular && (
                  <div className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold text-neutral-dark-200 mb-2">
                  {visa.name}
                </h3>
                <p className="text-neutral-dark-100 mb-4">{visa.description}</p>
                
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-neutral-dark-100">
                    <Clock className="h-4 w-4" />
                    <span>{visa.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-dark-100">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-semibold">{visa.price}</span>
                  </div>
                  <div className="text-neutral-dark-100">
                    Processing: {visa.processingTime}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-neutral-dark-200 mb-2">
                    Requirements:
                  </h4>
                  <ul className="space-y-1">
                    {visa.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-neutral-dark-100">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full">
                  Apply for {visa.name}
                </Button>
              </Card>
            ))}
          </div>
        </Section>

        {/* Application Process */}
        <Section>
          <SectionHeader
            title="How to Apply"
            description="Simple steps to get your Sri Lanka visa"
          />
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <Card key={step.step} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 font-bold">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-neutral-dark-200 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-dark-100">
                    {step.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </Section>

        {/* Important Information */}
        <Card className="bg-yellow-50 border-yellow-200 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">
                Important Information
              </h3>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>• ETA is valid for 30 days from the date of entry</li>
                <li>• You can extend your visa at the Department of Immigration</li>
                <li>• Keep a copy of your ETA approval with you during travel</li>
                <li>• Some nationalities are exempt from visa requirements</li>
                <li>• Always check the latest visa requirements before traveling</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card>
          <div className="flex items-start gap-4">
            <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-neutral-dark-200 mb-2">
                Department of Immigration & Emigration
              </h3>
              <p className="text-sm text-neutral-dark-100 mb-2">
                No. 41, Ananda Rajakaruna Mawatha, Colombo 10, Sri Lanka
              </p>
              <div className="flex items-center gap-2 text-sm text-neutral-dark-100">
                <Phone className="h-4 w-4" />
                <span>+94 11 532 9000</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  )
}

