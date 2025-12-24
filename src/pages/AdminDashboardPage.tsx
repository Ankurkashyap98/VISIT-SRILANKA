import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <p>Admin dashboard page - Migrate from app/admin/*/page.tsx</p>
      </main>
      <Footer />
    </div>
  )
}

