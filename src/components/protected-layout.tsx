'use client'

import Navbar from './navbar'
import Sidebar from './sidebar'
import ProtectedRoute from './protected-route'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 h-full w-28 md:w-64 z-20">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="ml-28 md:ml-64">
          <Navbar />
          <main className="p-5 min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
} 