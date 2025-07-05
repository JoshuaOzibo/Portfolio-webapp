"use client"

import AuthInput from '../../components/auth_input'
import AuthOnlyRoute from '../../components/auth-only-route'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'

const AuthPage = () => {
    const { login, googleSignIn, isLoading } = useAuth()

    const handleSubmit = async (email: string, password: string) => {
        const result = await login(email, password)
        if (result.success) {
            toast.success('Successfully logged in!')
        } else {
            toast.error(result.error || 'Login failed')
        }
    }

    const handleGoogleSignIn = async () => {
        const result = await googleSignIn()
        if (result.success) {
            toast.success('Successfully signed in with Google!')
        } else {
            toast.error(result.error || 'Google sign-in failed')
        }
    }

    return (
        <AuthOnlyRoute>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <AuthInput 
                    onSubmit={handleSubmit} 
                    onGoogleSignIn={handleGoogleSignIn} 
                    type='signin' 
                />
            </div>
        </AuthOnlyRoute>
    )
}

export default AuthPage