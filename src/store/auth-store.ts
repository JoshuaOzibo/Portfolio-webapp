import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, AuthState } from '@/types/auth'

interface AuthStore extends AuthState {
  login: (user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: (user: User) => set({ user, isAuthenticated: true, isLoading: false }),
      logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)

export default useAuthStore 