import React from 'react'
import { cn } from '../lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'light' | 'primary' | 'secondary' | 'dark'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  id?: string
}

const Section = ({ 
  children, 
  className, 
  background = 'white', 
  padding = 'lg',
  id 
}: SectionProps) => {
  const backgroundClasses = {
    white: 'bg-white',
    light: 'bg-neutral-light-100',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    dark: 'bg-neutral-dark-200 text-white'
  }

  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20'
  }

  return (
    <section 
      id={id}
      className={cn(
        'sri-lanka-section',
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  className?: string
  centered?: boolean
}

const SectionHeader = ({ 
  title, 
  subtitle, 
  description, 
  className,
  centered = true 
}: SectionHeaderProps) => {
  return (
    <div className={cn(
      'sri-lanka-section-header mb-12',
      centered ? 'text-center' : 'text-left',
      className
    )}>
      {subtitle && (
        <p className="text-sm font-medium text-primary uppercase tracking-wide mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark-200 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-neutral-dark-100 max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}

export { Section, SectionHeader }

