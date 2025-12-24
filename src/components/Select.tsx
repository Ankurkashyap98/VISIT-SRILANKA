import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../lib/utils'
import { ChevronDown, Check } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  icon?: React.ReactNode
  variant?: 'default' | 'navbar'
}

const Select = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option", 
  className,
  disabled = false,
  icon,
  variant = 'default'
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || '')
  const selectRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(option => option.value === selectedValue)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    onChange?.(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={cn('sri-lanka-select relative', className)} ref={selectRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'sri-lanka-select-trigger w-full pl-10 pr-4 py-3 border border-neutral-light-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none appearance-none text-left flex items-center justify-between text-sm',
          variant === 'default' && 'bg-white',
          variant === 'navbar' && 'bg-transparent text-white border-transparent',
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'hover:border-primary-300 cursor-pointer'
        )}
      >
        <div className="flex items-center">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-dark-100">
              {icon}
            </div>
          )}
          <span className={cn(
            'sri-lanka-select-value',
            variant === 'default' && selectedOption ? 'text-neutral-dark-200' : 'text-neutral-dark-100',
            variant === 'navbar' && 'text-white'
          )}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown 
          className={cn(
            'sri-lanka-select-chevron h-5 w-5 transition-transform duration-200',
            variant === 'default' && 'text-neutral-dark-100',
            variant === 'navbar' && 'text-white',
            isOpen && 'rotate-180'
          )} 
        />
      </button>

      {isOpen && (
        <div className="sri-lanka-select-dropdown absolute z-50 w-full mt-1 bg-white border text-black border-neutral-light-200 rounded-lg shadow-strong max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => !option.disabled && handleSelect(option.value)}
              disabled={option.disabled}
              className={cn(
                'sri-lanka-select-option w-full px-4 py-3 text-left hover:bg-neutral-light-100 transition-colors flex items-center justify-between text-sm',
                selectedValue === option.value && 'bg-primary-50 text-primary-600',
                option.disabled && 'opacity-50 cursor-not-allowed',
                !option.disabled && 'cursor-pointer'
              )}
            >
              <span className="sri-lanka-select-option-label">{option.label}</span>
              {selectedValue === option.value && (
                <Check className="sri-lanka-select-option-check h-4 w-4 text-primary-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { Select }

