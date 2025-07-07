'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import LoadingSpinner from './loading-spinner'

interface AuthOnlyRouteProps {
  children: React.ReactNode
}

export default function AuthOnlyRoute({ children }: AuthOnlyRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('AuthOnlyRoute effect - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated)
    if (!isLoading && isAuthenticated) {
      console.log('Redirecting to home page...')
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-screen" />
  }

  if (isAuthenticated) {
    return null
  }

  return <>{children}</>
} 