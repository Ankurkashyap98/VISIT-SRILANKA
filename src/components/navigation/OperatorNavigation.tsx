import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { 
  Home, 
  Users, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Settings, 
  BarChart3, 
  MessageSquare,
  Shield,
  AlertTriangle,
  Bell
} from 'lucide-react'

interface OperatorNavigationProps {
  className?: string
  isMobile?: boolean
}

const OperatorNavigation = ({ className, isMobile = false }: OperatorNavigationProps) => {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard/operator', icon: Home },
    { name: 'Tour Operations', href: '/dashboard/operator/tours', icon: MapPin },
    { name: 'Bookings', href: '/dashboard/operator/bookings', icon: Calendar },
    { name: 'Revenue', href: '/dashboard/operator/revenue', icon: DollarSign },
    { name: 'Complaints', href: '/dashboard/operator/complaints', icon: AlertTriangle },
    { name: 'Notifications', href: '/dashboard/operator/notifications', icon: Bell },
    { name: 'Analytics', href: '/dashboard/operator/analytics', icon: BarChart3 },
    { name: 'Customer Support', href: '/dashboard/operator/support', icon: MessageSquare },
    { name: 'Compliance', href: '/dashboard/operator/compliance', icon: Shield },
    { name: 'Settings', href: '/dashboard/operator/settings', icon: Settings }
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
    <nav className={cn("nav-container hidden min-[1025px]:flex items-center space-x-2", className)} aria-label="Operator navigation">
      <ul className="flex items-center space-x-2 flex-wrap" role="menubar">
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

export { OperatorNavigation }

