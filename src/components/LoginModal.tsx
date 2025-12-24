import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from './Button'
import { Card } from './Card'
import { useAuth } from '../context/AuthContext'
import { X, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'forgot'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { signIn, user } = useAuth()

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const [forgotData, setForgotData] = useState({
    email: ''
  })
  const [forgotSuccess, setForgotSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn(loginData.email, loginData.password)

      if (!result.success) {
        setError(result.error || 'Invalid email or password. Please check your credentials and try again.')
      } else {
        onClose()
        // Redirect to dashboard
        navigate('/dashboard/tourist')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setForgotSuccess(false)

    try {
      // TODO: Implement actual forgot password API call
      console.log('Forgot password attempt:', forgotData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setForgotSuccess(true)
      setForgotData({ email: '' })
      
    } catch (error) {
      console.error('Forgot password error:', error)
      setError('Failed to send reset link. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-light-200">
          <h2 className="font-heading font-semibold text-neutral-dark-200" style={{ fontSize: '16px', marginBottom: '0' }}>
            {activeTab === 'login' && 'Sign In'}
            {activeTab === 'forgot' && 'Reset Password'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1 h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

          {/* Content */}
          <div className="p-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg flex items-center mb-3 text-sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}

            {/* Helpful info for testing */}
            <div className=" border bg-white border-blue-200 text-blue-700 px-3 py-2 rounded-lg mb-3 text-xs">
              <p className='text-black'><strong>Test Account:</strong> tourist@example.com / tourist123</p>
              <p className='text-black'><strong>Or register</strong> with your own email below</p>
            </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-dark-200 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-dark-100" />
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 text-sm bg-white text-black border border-neutral-light-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-dark-200 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-dark-100" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full pl-8 pr-8 py-1.5 text-sm bg-white text-black border border-neutral-light-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-dark-100 hover:text-primary"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('forgot')}
                  className="text-sm text-primary hover:underline"
                  style={{ padding: '0' }}
                >
                  Forgot Password?
                </button>
              </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  disabled={loading}
                  loading={loading}
                  loadingText="Signing In"
                >
                  <span className="flex items-center">
                    Sign In
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </span>
                </Button>
            </form>
          )}
          
          {/* Registration Link - Always visible when login tab is active */}
          {activeTab === 'login' && (
            <div className="mt-4 text-center">
              <p className="text-sm text-neutral-dark-100">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="text-primary hover:underline">
                  Create one here
                </Link>
              </p>
            </div>
          )}


          {/* Forgot Password Form */}
          {activeTab === 'forgot' && !forgotSuccess && (
            <form onSubmit={handleForgotPassword} className="space-y-3">
              <div className="text-center mb-4">
                <p className="text-sm text-neutral-dark-100">
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-dark-200 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-dark-100" />
                  <input
                    type="email"
                    value={forgotData.email}
                    onChange={(e) => setForgotData({ ...forgotData, email: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 text-sm bg-white text-black border border-neutral-light-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md transition-all duration-200 placeholder:text-gray-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setActiveTab('login')}
                >
                  Back to Login
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  disabled={loading}
                  loading={loading}
                  loadingText="Sending"
                >
                  Send Reset Link
                </Button>
              </div>
            </form>
          )}

          {/* Forgot Password Success */}
          {activeTab === 'forgot' && forgotSuccess && (
            <div className="space-y-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              
              <h3 className="text-sm font-semibold text-neutral-dark-200">
                Reset Link Sent!
              </h3>
              
              <p className="text-xs text-neutral-dark-100">
                We&apos;ve sent a password reset link to your email address. 
                Please check your inbox and follow the instructions to reset your password.
              </p>
              
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    setActiveTab('login')
                    setForgotSuccess(false)
                  }}
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  Back to Login
                </Button>
                
                <Button
                  onClick={() => setForgotSuccess(false)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Send Another Link
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

