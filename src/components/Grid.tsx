import React from 'react'
import { cn } from '../lib/utils'

interface GridProps {
  children: React.ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
}

const Grid = ({ 
  children, 
  className, 
  cols = 3, 
  gap = 'lg',
  responsive = true
}: GridProps) => {
  const gapClasses = {
    sm: 'gap-3 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-12'
  }

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
  }

  return (
    <div className={cn(
      'sri-lanka-grid grid',
      gridClasses[cols],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}

interface GridItemProps {
  children: React.ReactNode
  className?: string
  span?: 1 | 2 | 3 | 4 | 5 | 6
}

const GridItem = ({ children, className, span = 1 }: GridItemProps) => {
  const spanClasses = {
    1: 'col-span-1',
    2: 'col-span-1 sm:col-span-2',
    3: 'col-span-1 sm:col-span-2 lg:col-span-3',
    4: 'col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4',
    5: 'col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5',
    6: 'col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-6'
  }

  return (
    <div className={cn(
      'sri-lanka-grid-item',
      spanClasses[span],
      className
    )}>
      {children}
    </div>
  )
}

export { Grid, GridItem }

