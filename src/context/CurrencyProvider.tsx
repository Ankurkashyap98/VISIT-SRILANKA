import React, { createContext, useContext, useState, useEffect } from 'react'

interface Currency {
  code: string
  name: string
  symbol: string
  rate: number // Exchange rate to LKR (Sri Lankan Rupee)
}

interface CurrencyContextType {
  currentCurrency: Currency
  setCurrentCurrency: (currency: Currency) => void
  currencies: Currency[]
  convertAmount: (amount: number, fromCurrency?: string) => number
  formatCurrency: (amount: number, currency?: Currency) => string
  isLoading: boolean
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

const supportedCurrencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 0.0033 },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: '₨', rate: 1 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.0030 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 0.27 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.0026 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', rate: 0.012 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', rate: 0.012 }
]

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(supportedCurrencies[0])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load saved currency from localStorage
    const savedCurrency = localStorage.getItem('tourism-currency')
    if (savedCurrency) {
      const currency = supportedCurrencies.find(curr => curr.code === savedCurrency)
      if (currency) {
        setCurrentCurrency(currency)
      }
    }
    setIsLoading(false)
  }, [])

  const handleSetCurrency = (currency: Currency) => {
    setCurrentCurrency(currency)
    localStorage.setItem('tourism-currency', currency.code)
  }

  const convertAmount = (amount: number, fromCurrency: string = 'LKR'): number => {
    if (fromCurrency === currentCurrency.code) return amount
    
    const fromRate = supportedCurrencies.find(c => c.code === fromCurrency)?.rate || 1
    const toRate = currentCurrency.rate
    
    // Convert to LKR first, then to target currency
    const lkrAmount = amount / fromRate
    return lkrAmount * toRate
  }

  const formatCurrency = (amount: number, currency: Currency = currentCurrency): string => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
    return formatter.format(amount)
  }

  const value: CurrencyContextType = {
    currentCurrency,
    setCurrentCurrency: handleSetCurrency,
    currencies: supportedCurrencies,
    convertAmount,
    formatCurrency,
    isLoading
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}

