import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
  userType: string
  image?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => void
  signUp: (data: { name: string; email: string; password: string; userType: string }) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('tourism-user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
      }
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API call - in production, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication - in production, validate against your backend
      // For demo purposes, accept any email/password
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email: email,
        role: email.includes('admin') ? 'admin' : 'tourist',
        userType: email.includes('admin') ? 'admin' : 'tourist',
      }
      
      setUser(mockUser)
      localStorage.setItem('tourism-user', JSON.stringify(mockUser))
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Failed to sign in' }
    }
  }

  const signUp = async (data: { name: string; email: string; password: string; userType: string }): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: data.userType,
        userType: data.userType,
      }
      
      setUser(newUser)
      localStorage.setItem('tourism-user', JSON.stringify(newUser))
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Failed to sign up' }
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('tourism-user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

