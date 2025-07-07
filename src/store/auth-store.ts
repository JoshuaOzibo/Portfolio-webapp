import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, AuthState } from '@/types/auth'

interface AuthStore extends AuthState {
  login: (user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  initialize: () => void
  setInitialized: (initialized: boolean) => void
  isHydrated: boolean
  setHydrated: (hydrated: boolean) => void
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      isHydrated: false,
      login: (user: User) => {
        console.log('Auth store login called with user:', user)
        set({ user, isAuthenticated: true, isLoading: false })
        console.log('Auth state updated - user should be authenticated')
      },
      logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setInitialized: (initialized: boolean) => set({ isLoading: !initialized }),
      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),
      initialize: () => {
        try {
          // Check if there's a token in localStorage
          const token = localStorage.getItem('token')
          const currentUser = get().user
          const currentIsAuthenticated = get().isAuthenticated
          
          // console.log('Auth initialization:', { 
          //   token: !!token, 
          //   user: !!currentUser, 
          //   isAuthenticated: currentIsAuthenticated 
          // })
          
          // If we have user data and isAuthenticated is true, we're good
          if (currentUser && currentIsAuthenticated) {
            // console.log('User already authenticated from persisted state')
            set({ isLoading: false })
            return
          }
          
          // If we have a token but no user data, clear the token
          if (token && !currentUser) {
            // console.log('Token exists but no user data - clearing token')
            localStorage.removeItem('token')
            set({ isAuthenticated: false, user: null, isLoading: false })
            return
          }
          
          // If we have both token and user data, authenticate
          if (token && currentUser) {
            // console.log('Token and user data present - authenticating')
            set({ isAuthenticated: true, isLoading: false })
            return
          }
          
          // No token - not authenticated
          // console.log('No token found - not authenticated')
          set({ isAuthenticated: false, user: null, isLoading: false })
        } catch (error) {
          // console.error('Error initializing auth state:', error)
          set({ isAuthenticated: false, user: null, isLoading: false })
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => {
        // console.log('Persisting state:', { user: state.user, isAuthenticated: state.isAuthenticated })
        return { user: state.user, isAuthenticated: state.isAuthenticated }
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          // console.log('Store rehydrated, user data:', state.user)
          // console.log('Store rehydrated, isAuthenticated:', state.isAuthenticated)
          // Mark as hydrated first
          state.setHydrated(true)
          // Initialize immediately after rehydration
          state.initialize()
        }
      },
    }
  )
)

export default useAuthStore 