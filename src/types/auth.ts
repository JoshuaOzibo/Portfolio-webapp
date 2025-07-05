export interface User {
  id: string
  email: string
  name?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginResult {
  success: boolean
  error?: string
}

export interface AuthHookReturn {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<LoginResult>
  googleSignIn: () => Promise<LoginResult>
  logout: () => void
} 