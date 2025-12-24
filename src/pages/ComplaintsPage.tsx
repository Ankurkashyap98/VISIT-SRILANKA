import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export default function ComplaintsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Complaints</h1>
        <p>Complaints page - Migrate from app/complaints/page.tsx</p>
      </main>
      <Footer />
    </div>
  )
}

