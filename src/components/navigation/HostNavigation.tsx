import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { Home, Users, Calendar, DollarSign, Settings, BarChart3, MessageSquare } from 'lucide-react'

interface HostNavigationProps {
  className?: string
  isMobile?: boolean
}

const HostNavigation = ({ className, isMobile = false }: HostNavigationProps) => {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard/host', icon: Home },
    { name: 'My Properties', href: '/dashboard/host/properties', icon: Users },
    { name: 'Bookings', href: '/dashboard/host/bookings', icon: Calendar },
    { name: 'Earnings', href: '/dashboard/host/earnings', icon: DollarSign },
    { name: 'Analytics', href: '/dashboard/host/analytics', icon: BarChart3 },
    { name: 'Messages', href: '/dashboard/host/messages', icon: MessageSquare },
    { name: 'Settings', href: '/dashboard/host/settings', icon: Settings }
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
                "sri-lanka-navbar-mobile-link block px-3 py-2 rounded-md transition-colors text-sm touch-friendly flex items-center space-x-2",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-neutral-dark-100 hover:text-primary hover:bg-neutral-light-100"
              )}
              role="menuitem"
              aria-current={isActive ? "page" : undefined}
              aria-label={`Navigate to ${item.name}`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <nav className={cn("nav-container hidden md:flex items-center space-x-2", className)} aria-label="Host navigation">
      <ul className="flex items-center space-x-2" role="menubar">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <li key={item.name} role="none">
              <Link
                to={item.href}
                className={cn(
                  "navbar-link font-medium transition-colors px-4 py-2 rounded-md touch-friendly no-underline flex items-center space-x-2",
                  isActive 
                    ? "bg-primary text-white text-sm" 
                    : "text-black hover:text-accent hover:bg-white/10"
                )}
                role="menuitem"
                aria-current={isActive ? "page" : undefined}
                aria-label={`Navigate to ${item.name}`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { HostNavigation }

