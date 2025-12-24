import React, { createContext, useContext, useState, useEffect } from 'react'

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

interface LanguageContextType {
  currentLanguage: Language
  setCurrentLanguage: (language: Language) => void
  languages: Language[]
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇱🇰' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' }
]

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(supportedLanguages[0])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('tourism-language')
    if (savedLanguage) {
      const language = supportedLanguages.find(lang => lang.code === savedLanguage)
      if (language) {
        setCurrentLanguage(language)
      }
    }
    setIsLoading(false)
  }, [])

  const handleSetLanguage = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem('tourism-language', language.code)
    
    // Update document language
    document.documentElement.lang = language.code
    
    // Update page direction for RTL languages
    if (language.code === 'ar') {
      document.documentElement.dir = 'rtl'
    } else {
      document.documentElement.dir = 'ltr'
    }
  }

  const value: LanguageContextType = {
    currentLanguage,
    setCurrentLanguage: handleSetLanguage,
    languages: supportedLanguages,
    isLoading
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

