import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LanguageProvider } from './context/LanguageProvider'
import { CurrencyProvider } from './context/CurrencyProvider'
import { BookingProvider } from './context/BookingContext'
import { AuthProvider } from './context/AuthContext'

// Pages
import HomePage from './pages/HomePage'
import DestinationsPage from './pages/DestinationsPage'
import DestinationDetailPage from './pages/DestinationDetailPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TripPlannerPage from './pages/TripPlannerPage'
import TripPlannerPreferencesPage from './pages/TripPlannerPreferencesPage'
import TripPlannerItineraryPage from './pages/TripPlannerItineraryPage'
import TripPlannerTransportPage from './pages/TripPlannerTransportPage'
import TripPlannerHotelsPage from './pages/TripPlannerHotelsPage'
import TripPlannerToursPage from './pages/TripPlannerToursPage'
import TripPlannerSummaryPage from './pages/TripPlannerSummaryPage'
import TripPlannerConfirmationPage from './pages/TripPlannerConfirmationPage'
import VisaPage from './pages/VisaPage'
import BookingPage from './pages/BookingPage'
import DashboardPage from './pages/DashboardPage'
import ExperiencesPage from './pages/ExperiencesPage'
import MedicalTourismPage from './pages/MedicalTourismPage'
import SupportPage from './pages/SupportPage'
import SupportTicketsPage from './pages/SupportTicketsPage'
import ComplaintsPage from './pages/ComplaintsPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import UnauthorizedPage from './pages/UnauthorizedPage'

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <CurrencyProvider>
            <BookingProvider>
              <div id="app-root" role="application" aria-label="Sri Lanka Tourism Portal">
                {/* Skip to main content link */}
                <a href="#main-content" className="skip-link sr-only-focusable">
                  Skip to main content
                </a>
                
                <main id="main-content" role="main" aria-label="Main content">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/destinations" element={<DestinationsPage />} />
                    <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/trip-planner" element={<TripPlannerPage />} />
                    <Route path="/trip-planner/preferences" element={<TripPlannerPreferencesPage />} />
                    <Route path="/trip-planner/itinerary" element={<TripPlannerItineraryPage />} />
                    <Route path="/trip-planner/transport" element={<TripPlannerTransportPage />} />
                    <Route path="/trip-planner/hotels" element={<TripPlannerHotelsPage />} />
                    <Route path="/trip-planner/tours" element={<TripPlannerToursPage />} />
                    <Route path="/trip-planner/summary" element={<TripPlannerSummaryPage />} />
                    <Route path="/trip-planner/confirmation" element={<TripPlannerConfirmationPage />} />
                    <Route path="/visa" element={<VisaPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/dashboard/:userType" element={<DashboardPage />} />
                    <Route path="/experiences" element={<ExperiencesPage />} />
                    <Route path="/medical-tourism" element={<MedicalTourismPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/support/tickets" element={<SupportTicketsPage />} />
                    <Route path="/complaints" element={<ComplaintsPage />} />
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route path="/admin/*" element={<AdminDashboardPage />} />
                    <Route path="/unauthorized" element={<UnauthorizedPage />} />
                  </Routes>
                </main>
                
                {/* Accessibility features component */}
                <div id="accessibility-features" aria-hidden="true">
                  {/* This will be rendered by individual pages that need it */}
                </div>
              </div>
            </BookingProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App

