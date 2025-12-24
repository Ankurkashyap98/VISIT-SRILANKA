import React from 'react'
import { Button } from '../Button'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'

interface NextButtonProps {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'outline' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  showPrevious?: boolean
  onPrevious?: () => void
  previousDisabled?: boolean
  nextText?: string
  previousText?: string
  isLastStep?: boolean
  className?: string
}

export default function NextButton({
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  showPrevious = true,
  onPrevious,
  previousDisabled = false,
  nextText = 'Continue',
  previousText = 'Previous',
  isLastStep = false,
  className = ''
}: NextButtonProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Previous Button */}
      {showPrevious && onPrevious && (
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={previousDisabled}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {previousText}
        </Button>
      )}
      
      {/* Spacer when no previous button */}
      {(!showPrevious || !onPrevious) && <div />}
      
      {/* Next/Complete Button */}
      <Button
        variant={isLastStep ? 'primary' : variant}
        onClick={onClick}
        disabled={disabled}
        loading={loading}
        size={size}
        className="flex items-center"
      >
        {isLastStep ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Complete Booking
          </>
        ) : (
          <>
            {nextText}
            <ArrowRight className="h-4 w-4 ml-2" />
          </>
        )}
      </Button>
    </div>
  )
}

