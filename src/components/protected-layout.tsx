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
      <div className="flex h-screen bg-gray-50">
        <main>
          <Sidebar />
          <div className="flex-1 flex flex-col md:ml-64 ml-24">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-5">
              {children}
            </main>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
} 