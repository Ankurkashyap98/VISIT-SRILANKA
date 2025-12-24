import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'
import { Button } from './Button'
import { LoginModal } from './LoginModal'
import { useCurrency } from '../context/CurrencyProvider'
import { useAuth } from '../context/AuthContext'
import { Menu, X, Globe, DollarSign, Phone, User, LogOut } from 'lucide-react'
import { TouristNavigation } from './navigation/TouristNavigation'
import { HostNavigation } from './navigation/HostNavigation'
import { OperatorNavigation } from './navigation/OperatorNavigation'
import { GovernmentAdminNavigation } from './navigation/GovernmentAdminNavigation'

interface NavbarProps {
  className?: string
}

const Navbar = ({ className }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const { currentCurrency, setCurrentCurrency, currencies } = useCurrency()
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'si', name: 'සිංහල' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ar', name: 'العربية' },
    { code: 'zh', name: '中文' },
    { code: 'fr', name: 'Français' }
  ]

  // Get user role for navigation
  const userRole = user?.role || 'tourist'
  const userType = user?.userType || 'tourist'

  // Determine which navigation to show based on user role
  const getNavigationComponent = (isMobile = false) => {
    // Government Admin and Super Admin get government admin navigation
    if (userRole === 'super_admin' || userRole === 'government_admin') {
      return <GovernmentAdminNavigation isMobile={isMobile} />
    }
    
    // Operators get operator navigation
    if (userType === 'operator' || userRole === 'operator') {
      return <OperatorNavigation isMobile={isMobile} />
    }
    
    // Hosts get host navigation
    if (userType === 'host' || userRole === 'host') {
      return <HostNavigation isMobile={isMobile} />
    }
    
    // Default to tourist navigation for guests and tourists
    return <TouristNavigation isMobile={isMobile} />
  }

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }

  return (
    <>
      {/* Skip to main content link for screen readers */}
      <a href="#main-content" className="skip-link sr-only-focusable">
        Skip to main content
      </a>
      
      <nav 
        className={cn('sri-lanka-navbar bg-white shadow-soft sticky top-0 z-50', className)}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Top Bar - Centered */}
        <div className="navbar-top-main bg-primary text-white">
          <div className="navbar-top-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="top-nav-container flex items-center justify-between text-sm gap-6">
              {/* Left Section - Contact Number */}
              <div className="top-nav-left flex items-center">
                <Link 
                  to="/support" 
                  className="flex items-center text-white hover:text-accent transition-colors touch-friendly"
                  aria-label="Emergency contact information"
                >
                  <Phone className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span className="sr-only">Emergency contact: </span>
                  <span className='contact-number'>+91 971 7132 668</span>
                </Link>
              </div>

              {/* Right Section - Language, Currency & User Actions */}
              <div className="top-nav-right flex items-center space-x-4">
                {/* Language & Currency */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" aria-hidden="true" />
                    <label htmlFor="language-select" className="sr-only">
                      Select language
                    </label>
                    <select
                      id="language-select"
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="bg-transparent text-white border-none outline-none cursor-pointer touch-friendly p-0"
                      aria-label="Select language"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.name} className="bg-primary text-white">
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" aria-hidden="true" />
                    <label htmlFor="currency-select" className="sr-only">
                      Select currency
                    </label>
                    <select
                      id="currency-select"
                      value={currentCurrency.code}
                      onChange={(e) => {
                        const currency = currencies.find(c => c.code === e.target.value)
                        if (currency) setCurrentCurrency(currency)
                      }}
                      className="bg-transparent text-white border-none outline-none cursor-pointer touch-friendly p-0"
                      aria-label="Select currency"
                    >
                      {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code} className="bg-primary text-white">
                          {currency.code}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* User Actions */}
                {user ? (
                  <div className="flex items-center space-x-2">
                    <Link 
                      to={`/dashboard/${user.userType || 'tourist'}`}
                      className="flex items-center text-white hover:text-accent transition-colors touch-friendly"
                      aria-label="Go to your dashboard"
                    >
                      <User className="h-4 w-4 mr-1" aria-hidden="true" />
                      {user.name || user.userType || 'Dashboard'}
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center text-white hover:text-accent transition-colors touch-friendly"
                      aria-label="Sign out"
                    >
                      <LogOut className="h-4 w-4 mr-1" aria-hidden="true" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => setIsLoginModalOpen(true)}
                      className="flex items-center text-white hover:text-accent transition-colors touch-friendly"
                      aria-label="Sign in to your account"
                    >
                      <User className="h-4 w-4 mr-1" aria-hidden="true" />
                      Login
                    </button>
                    <Link 
                      to="/register" 
                      className="flex items-center text-white hover:text-accent transition-colors touch-friendly"
                      aria-label="Create a new account"
                    >
                      <User className="h-4 w-4 mr-1" aria-hidden="true" />
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      {/* Main Navigation */}
      <div className="navbar-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="navbar-main-container flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <div className="flex items-center flex-shrink-0">
            <Link 
              to="/" 
              className="navbar-logo-container flex items-center touch-friendly no-underline"
              style={{ padding: 0 }}
              aria-label="Visit Sri Lanka - Home"
            >
              <div className="navbar-logo-image relative w-10 h-10">
                <img 
                  src={`${import.meta.env.BASE_URL}images/monogram.png`}
                  alt="Sri Lanka Tourism Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className='logo-text-container ml-2'>
                <h1 className="font-bold text-sm" style={{ 
                  fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  letterSpacing: '0.05em',
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  fontWeight: '600',
                  marginBottom: '0px'
                }}>
                  <span style={{ color: '#0E485D' }}>VISIT</span><span style={{ color: '#697627' }}>SRILANKA</span>
                </h1>
                <p className="text-xs text-neutral-dark-100" style={{ marginBottom: '0px' }}>Discover. Connect. Experience.</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="flex-1 flex justify-center">
            {getNavigationComponent()}
          </div>

          {/* Mobile menu button - Right Side */}
          <div className="flex-shrink-0 md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-dark-100 hover:text-primary transition-colors touch-friendly p-2"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          className="sri-lanka-navbar-mobile md:hidden bg-white border-t border-neutral-light-200"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="sri-lanka-navbar-mobile-container px-4 py-2 space-y-1">
            <nav role="menu" aria-label="Mobile navigation menu">
              {/* Mobile navigation will be handled by individual navigation components */}
              <div className="md:hidden">
                {getNavigationComponent(true)}
              </div>
            </nav>
            <div className="pt-4">
              {user ? (
                <div className="space-y-2">
                  <Link 
                    to={`/dashboard/${user.userType || 'tourist'}`}
                    className="block text-center text-sm text-primary hover:underline py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {user.name || 'Dashboard'}
                  </Link>
                  <Button 
                    variant="outline" 
                    size="md"
                    className="w-full touch-friendly"
                    onClick={() => {
                      handleSignOut()
                      setIsMenuOpen(false)
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="accent" 
                  size="md" 
                  className="w-full touch-friendly" 
                  style={{ backgroundColor: 'rgb(14, 72, 93)' }}
                  onClick={() => {
                    setIsLoginModalOpen(true)
                    setIsMenuOpen(false)
                  }}
                  aria-label="Login to your account"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      </nav>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  )
}

export { Navbar }

