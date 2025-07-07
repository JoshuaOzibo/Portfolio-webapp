'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import LoadingSpinner from './loading-spinner'
import useAuthStore from '@/store/auth-store'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const isHydrated = useAuthStore(state => state.isHydrated)
  const router = useRouter()

  useEffect(() => {
    // Only redirect if we're hydrated, not loading, and definitely not authenticated
    if (isHydrated && !isLoading && !isAuthenticated) {
      // console.log('Redirecting to auth page - not authenticated')
      router.push('/auth_page')
    }
  }, [isAuthenticated, isLoading, isHydrated, router])

  // Show loading spinner while determining authentication status or while hydrating
  if (isLoading || !isHydrated) {
    // console.log('ProtectedRoute loading:', { isLoading, isHydrated })
    return <LoadingSpinner size="lg" className="min-h-screen" />
  }

  // Don't render anything while redirecting
  if (!isAuthenticated) {
    // console.log('ProtectedRoute not authenticated')
    return null
  }

  // User is authenticated, render the protected content
  // console.log('ProtectedRoute rendering children - authenticated')
  return <>{children}</>
} 