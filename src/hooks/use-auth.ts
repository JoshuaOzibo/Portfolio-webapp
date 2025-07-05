import { useCallback } from 'react'
import useAuthStore from '@/store/auth-store'
import { LoginResult, AuthHookReturn } from '@/types/auth'

export const useAuth = (): AuthHookReturn => {
  const { user, isAuthenticated, isLoading, login, logout, setLoading } = useAuthStore()

  const handleLogin = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    setLoading(true)
    try {
      // Here you would typically make an API call to authenticate
      // For now, we'll simulate a successful login
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0]
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      login(mockUser)
      return { success: true }
    } catch (error) {
      setLoading(false)
      return { success: false, error: 'Login failed' }
    }
  }, [login, setLoading])

  const handleGoogleSignIn = useCallback(async (): Promise<LoginResult> => {
    setLoading(true)
    try {
      // Here you would implement Google OAuth
      // For now, we'll simulate a successful Google sign-in
      const mockUser = {
        id: '2',
        email: 'user@gmail.com',
        name: 'Google User'
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      login(mockUser)
      return { success: true }
    } catch (error) {
      setLoading(false)
      return { success: false, error: 'Google sign-in failed' }
    }
  }, [login, setLoading])

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  return {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    googleSignIn: handleGoogleSignIn,
    logout: handleLogout,
  }
} 