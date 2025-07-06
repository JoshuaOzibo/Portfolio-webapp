import { useCallback } from 'react'
import useAuthStore from '@/store/auth-store'
import { LoginResult, AuthHookReturn } from '@/types/auth'
import { usePost } from './use-fetch'

// API response types
interface SignInResponse {
  token: string
  user: {
    id: string
    email: string
    name?: string
  }
}

interface SignUpResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export const useAuth = (): AuthHookReturn => {
  const { user, isAuthenticated, isLoading, login, logout, setLoading } = useAuthStore()

  // Sign-in mutation
  const signInMutation = usePost<SignInResponse, { email: string; password: string }>(() => {
    // onSuccess callback
  })

  // Sign-up mutation
  const signUpMutation = usePost<SignUpResponse, { name: string; email: string; password: string }>(() => {
    // onSuccess callback
  })

  const handleLogin = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    setLoading(true)
    try {
      const result = await signInMutation.mutateAsync({
        endpoint: 'api/v1/auth/sign-in',
        data: { email, password }
      })

      // Store JWT token in localStorage
      localStorage.setItem('token', result.token)
      
      // Update auth store with user data
      login(result.user)
      
      return { success: true }
    } catch (error: any) {
      setLoading(false)
      let errorMessage = 'Login failed'
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password'
      } else if (error.response?.status === 404) {
        errorMessage = 'User not found'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      return { success: false, error: errorMessage }
    }
  }, [login, setLoading, signInMutation])

  const handleSignUp = useCallback(async (name: string, email: string, password: string): Promise<LoginResult> => {
    setLoading(true)
    try {
      const result = await signUpMutation.mutateAsync({
        endpoint: 'api/v1/auth/sign-up',
        data: { name, email, password }
      })

      // Store JWT token in localStorage
      localStorage.setItem('token', result.token)
      
      // Update auth store with user data
      login(result.user)
      
      return { success: true }
    } catch (error: any) {
      setLoading(false)
      let errorMessage = 'Sign up failed'
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.response?.status === 409) {
        errorMessage = 'User with this email already exists'
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid input data'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      return { success: false, error: errorMessage }
    }
  }, [login, setLoading, signUpMutation])

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
    // Remove token from localStorage
    localStorage.removeItem('token')
    logout()
  }, [logout])

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || signInMutation.isPending || signUpMutation.isPending,
    login: handleLogin,
    signUp: handleSignUp,
    googleSignIn: handleGoogleSignIn,
    logout: handleLogout,
  }
} 