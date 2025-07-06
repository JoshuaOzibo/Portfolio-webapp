import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, AuthState } from '@/types/auth'

interface AuthStore extends AuthState {
  login: (user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  initialize: () => void
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: (user: User) => set({ user, isAuthenticated: true, isLoading: false }),
      logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      initialize: () => {
        // Check if there's a token in localStorage
        const token = localStorage.getItem('token')
        if (token) {
          // If there's a token, we assume the user is authenticated
          // In a real app, you might want to validate the token with the server
          const currentUser = get().user
          if (currentUser) {
            set({ isAuthenticated: true })
          }
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)

export default useAuthStore 