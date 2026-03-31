import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { 
  Home, 
  BarChart3, 
  Users, 
  FileText, 
  Shield, 
  AlertTriangle,
  Settings,
  Globe,
  Building,
  Activity,
  Calendar
} from 'lucide-react'

interface GovernmentAdminNavigationProps {
  className?: string
  isMobile?: boolean
}

const GovernmentAdminNavigation = ({ className, isMobile = false }: GovernmentAdminNavigationProps) => {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/admin/government', icon: Home },
    { name: 'Analytics', href: '/admin/government/analytics', icon: BarChart3 },
    { name: 'Partner Approval', href: '/admin/government/partners', icon: Users },
    { name: 'Content Moderation', href: '/admin/government/content', icon: FileText },
    { name: 'Booking Oversight', href: '/admin/government/bookings', icon: Calendar },
    { name: 'Compliance Monitoring', href: '/admin/government/compliance', icon: Shield },
    { name: 'Grievance Management', href: '/admin/government/grievances', icon: AlertTriangle },
    { name: 'Crisis Management', href: '/admin/government/crisis', icon: AlertTriangle },
    { name: 'System Health', href: '/admin/government/system', icon: Activity },
    { name: 'Settings', href: '/admin/government/settings', icon: Settings }
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
    <nav className={cn("nav-container hidden min-[1025px]:flex items-center space-x-2", className)} aria-label="Government Admin navigation">
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

export { GovernmentAdminNavigation }

