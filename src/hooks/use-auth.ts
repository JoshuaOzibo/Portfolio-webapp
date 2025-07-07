import { useCallback } from 'react'
import useAuthStore from '@/store/auth-store'
import { LoginResult, AuthHookReturn } from '@/types/auth'
import { usePost } from './use-fetch'

// API response types
interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

interface SignInData {
  token: string
  user: {
    _id: string
    email: string
    name?: string
  }
}

interface SignUpData {
  token: string
  user: {
    _id: string
    email: string
    name: string
  }
}

interface GoogleSignInData {
  token: string
  user: {
    _id: string
    email: string
    name?: string
  }
}

type SignInResponse = ApiResponse<SignInData>
type SignUpResponse = ApiResponse<SignUpData>
type GoogleSignInResponse = ApiResponse<GoogleSignInData>

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

  // Google sign-in mutation
  const googleSignInMutation = usePost<GoogleSignInResponse, { idToken: string }>(() => {
    // onSuccess callback
  })

  const handleLogin = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    setLoading(true)
    try {
      const result = await signInMutation.mutateAsync({
        endpoint: 'api/v1/auth/sign-in',
        data: { email, password }
      })

      // console.log('Login API result:', result)

      // Store JWT token in localStorage
      localStorage.setItem('token', result.data.token)
      
      // Ensure we have valid user data
      if (!result.data.user) {
        // console.error('No user data in login response')
        setLoading(false)
        return { success: false, error: 'Invalid response from server' }
      }
      
      // Transform backend user data to match frontend User interface
      const transformedUser = {
        id: result.data.user._id,
        email: result.data.user.email,
        name: result.data.user.name
      }
      
      // Update auth store with user data
      // console.log('Calling login with user:', transformedUser)
      login(transformedUser)
      
      // console.log('Login successful, user should be redirected')
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

      // console.log('Signup API result:', result)

      // Store JWT token in localStorage
      localStorage.setItem('token', result.data.token)
      
      // Ensure we have valid user data
      if (!result.data.user) {
        // console.error('No user data in signup response')
        setLoading(false)
        return { success: false, error: 'Invalid response from server' }
      }
      
      // Transform backend user data to match frontend User interface
      const transformedUser = {
        id: result.data.user._id,
        email: result.data.user.email,
        name: result.data.user.name
      }
      
      // Update auth store with user data
      // console.log('Calling login with user:', transformedUser)
      login(transformedUser)
      
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

  const handleGoogleSignIn = useCallback(async (idToken: string): Promise<LoginResult> => {
    setLoading(true)
    try {
      const result = await googleSignInMutation.mutateAsync({
        endpoint: 'api/auth/google-login',
        data: { idToken }
      })

      console.log('Google login API result:', result)

      // Store JWT token in localStorage
      localStorage.setItem('token', result.data.token)
      
      // Ensure we have valid user data
      if (!result.data.user) {
        console.error('No user data in Google login response')
        setLoading(false)
        return { success: false, error: 'Invalid response from server' }
      }
      
      // Transform backend user data to match frontend User interface
      const transformedUser = {
        id: result.data.user._id,
        email: result.data.user.email,
        name: result.data.user.name
      }
      
      // Update auth store with user data
      // console.log('Calling login with user:', transformedUser)
      login(transformedUser)
      
      return { success: true }
    } catch (error: any) {
      setLoading(false)
      let errorMessage = 'Google sign-in failed'
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.response?.status === 401) {
        errorMessage = 'Invalid Google token'
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid request data'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      return { success: false, error: errorMessage }
    }
  }, [login, setLoading, googleSignInMutation])

  const handleLogout = useCallback(() => {
    // Remove token from localStorage
    localStorage.removeItem('token')
    logout()
  }, [logout])

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || signInMutation.isPending || signUpMutation.isPending || googleSignInMutation.isPending,
    login: handleLogin,
    signUp: handleSignUp,
    googleSignIn: handleGoogleSignIn,
    logout: handleLogout,
  }
} 