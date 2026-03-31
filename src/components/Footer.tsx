import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

interface FooterProps {
  className?: string
}

const Footer = ({ className }: FooterProps) => {
  const quickLinks = [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Government Contacts', href: '/government' },
    { name: 'Tourist Helpline', href: '/helpline' }
  ]

  const tourismCategories = [
    { name: 'Culture & Heritage', href: '/destinations?category=culture' },
    { name: 'Pilgrimage Tours', href: '/destinations?category=pilgrimage' },
    { name: 'Adventure & Wildlife', href: '/destinations?category=adventure' },
    { name: 'Medical Tourism', href: '/medical-tourism' },
    { name: 'Leisure & Luxury', href: '/destinations?category=leisure' }
  ]

  const supportLinks = [
    { name: 'Emergency Contacts', href: '/emergency' },
    { name: 'Safety Guidelines', href: '/safety' },
    { name: 'Travel Insurance', href: '/insurance' },
    { name: 'Visa Information', href: '/visa' },
    { name: 'Currency Exchange', href: '/currency' }
  ]

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'YouTube', href: '#', icon: Youtube }
  ]

  return (
    <footer className={cn('sri-lanka-footer bg-white text-neutral-dark-200 border-t border-neutral-light-300', className)}>
      {/* Main Footer Content */}
      <div className="sri-lanka-footer-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="sri-lanka-footer-logo relative w-10 h-10 flex-shrink-0">
                <img 
                  src={`${import.meta.env.BASE_URL}images/monogram.png`}
                  alt="Sri Lanka Tourism Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-0" style={{ 
                  fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  letterSpacing: '0.05em',
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  fontWeight: '600'
                }}>
                  <span style={{ color: '#0E485D' }}>VISIT</span><span style={{ color: '#697627' }}>SRILANKA</span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-dark-100 mb-0">Discover. Connect. Experience.</p>
              </div>
            </div>
            <p className="text-sm text-neutral-dark-100 mb-4">
              Your trusted gateway to authentic Sri Lankan experiences with government-verified 
              services, transparent pricing, and AI-powered assistance.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  to={social.href}
                  className="text-neutral-dark-100 hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Tourism Categories */}
          <div>
            <h4 className="text-base sm:text-lg font-heading font-semibold text-neutral-dark-200 mb-3 sm:mb-4">Explore Sri Lanka</h4>
            <ul className="space-y-2">
              {tourismCategories.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-neutral-dark-100 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Safety */}
          <div>
            <h4 className="text-base sm:text-lg font-heading font-semibold text-neutral-dark-200 mb-3 sm:mb-4">Support & Safety</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-neutral-dark-100 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-base sm:text-lg font-heading font-semibold text-neutral-dark-200 mb-3 sm:mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-accent" />
                <div>
                  <p className="text-sm text-neutral-dark-100 mb-0">Tourist Helpline</p>
                  <p className="text-sm font-medium text-neutral-dark-200 mb-0">+94 11 2 426 426</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-accent" />
                <div>
                  <p className="text-sm text-neutral-dark-100 mb-0">Email</p>
                  <p className="text-sm font-medium text-neutral-dark-200 mb-0">info@tourism.gov.lk</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-accent mt-1" />
                <div>
                  <p className="text-sm text-neutral-dark-100 mb-0">Address</p>
                  <p className="text-sm font-medium text-neutral-dark-200 mb-0">
                    Sri Lanka Tourism Development Authority<br />
                    No. 80, Galle Road, Colombo 03
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-light-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-xs sm:text-sm text-neutral-dark-100 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="text-xs sm:text-sm text-neutral-dark-100 text-center sm:text-right">
              <p>© 2025 Sri Lanka Tourism Development Authority. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }

