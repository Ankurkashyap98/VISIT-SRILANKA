import { AuthProvider } from '../context/AuthContext'
import { ReactNode } from 'react'

interface SessionProviderProps {
  children: ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

