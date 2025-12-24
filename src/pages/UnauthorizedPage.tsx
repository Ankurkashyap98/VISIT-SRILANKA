import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
        <p className="text-lg mb-8">You don't have permission to access this page.</p>
        <Link to="/">
          <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark">
            Go Home
          </button>
        </Link>
      </main>
      <Footer />
    </div>
  )
}

