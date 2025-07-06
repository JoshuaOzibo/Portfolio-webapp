"use client"

import { useState } from 'react'
import AuthInput from '../../components/auth_input'
import AuthOnlyRoute from '../../components/auth-only-route'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'

const AuthPage = () => {
    const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
    const { login, signUp, googleSignIn, isLoading } = useAuth()

    const handleSubmit = async (email: string, password: string, name?: string) => {
        let result
        
        if (authMode === 'signup' && name) {
            result = await signUp(name, email, password)
        } else {
            result = await login(email, password)
        }
        
        if (result.success) {
            toast.success(
                authMode === 'signin' 
                    ? 'Successfully signed in!' 
                    : 'Account created successfully!'
            )
        } else {
            toast.error(result.error || `${authMode === 'signin' ? 'Sign in' : 'Sign up'} failed`)
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

    const toggleAuthMode = () => {
        setAuthMode(authMode === 'signin' ? 'signup' : 'signin')
    }

    return (
        <AuthOnlyRoute>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-md">
                    <AuthInput 
                        onSubmit={handleSubmit} 
                        onGoogleSignIn={handleGoogleSignIn} 
                        type={authMode}
                        isLoading={isLoading}
                    />
                    
                    {/* Toggle between sign-in and sign-up */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            {authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}
                            {' '}
                            <button
                                onClick={toggleAuthMode}
                                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                            >
                                {authMode === 'signin' ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </AuthOnlyRoute>
    )
}

export default AuthPage