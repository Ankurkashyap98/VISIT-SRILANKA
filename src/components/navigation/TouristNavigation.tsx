import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'

interface TouristNavigationProps {
  className?: string
  isMobile?: boolean
}

const TouristNavigation = ({ className, isMobile = false }: TouristNavigationProps) => {
  const location = useLocation()

  const navigation = [
    // { name: 'Home', href: '/' },
    { name: 'About ', href: '/about' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Trip Planner', href: '/trip-planner' },
    { name: 'Book Trip', href: '/booking' },
    { name: 'Medical Tourism', href: '/medical-tourism' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Support Center', href: '/support' },
    { name: 'Support Tickets', href: '/support/tickets' }
  ]

  if (isMobile) {
    return (
      <div className="space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "sri-lanka-navbar-mobile-link block px-3 py-2 rounded-md transition-colors text-sm touch-friendly",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-neutral-dark-100 hover:text-primary hover:bg-neutral-light-100"
              )}
              role="menuitem"
              aria-current={isActive ? "page" : undefined}
              aria-label={`Navigate to ${item.name}`}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <nav className={cn("nav-container hidden md:flex items-center justify-center", className)} aria-label="Tourist navigation">
      <ul className="flex items-center space-x-1" role="menubar">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || (item.href === '/' && location.pathname === '/')
          return (
            <li key={item.name} role="none">
              <Link
                to={item.href}
                className={cn(
                  "navbar-link font-medium transition-all duration-200 px-3 py-2 rounded-md touch-friendly no-underline text-sm whitespace-nowrap",
                  isActive 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-neutral-dark-200 hover:text-primary hover:bg-primary/5"
                )}
                role="menuitem"
                aria-current={isActive ? "page" : undefined}
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { TouristNavigation }

