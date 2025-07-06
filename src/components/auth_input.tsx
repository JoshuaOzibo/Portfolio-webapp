'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { googleSvg } from './svgs';

interface AuthInputProps {
  onSubmit: (email: string, password: string, name?: string) => void;
  onGoogleSignIn: () => void;
  type: 'signin' | 'signup';
  isLoading?: boolean;
}

export default function AuthInput({ onSubmit, onGoogleSignIn, type, isLoading = false }: AuthInputProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'signup' && !name.trim()) {
      return; // Name is required for signup
    }
    
    if (type === 'signup') {
      onSubmit(email, password, name);
    } else {
      onSubmit(email, password);
    }
  };

  const isFormValid = () => {
    const emailValid = email.trim() && email.includes('@');
    const passwordValid = password.length >= 6;
    const nameValid = type === 'signin' || (type === 'signup' && name.trim().length >= 2);
    
    return emailValid && passwordValid && nameValid;
  };

  return (
    <div className="md:w-full w-full shadow-lg mt-20 max-w-md border border-gray-200 rounded-lg p-4 mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {type === 'signin' ? 'Sign In' : 'Create Account'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {type === 'signin' 
            ? 'Welcome back! Please sign in to your account.' 
            : 'Create a new account to get started.'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input - Only for signup */}
        {type === 'signup' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition duration-150 ease-in-out"
                placeholder="Enter your full name"
                minLength={2}
              />
            </div>
          </div>
        )}

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       transition duration-150 ease-in-out"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       transition duration-150 ease-in-out pr-12"
              placeholder="Enter your password"
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {type === 'signup' && (
            <p className="mt-1 text-xs text-gray-500">
              Password must be at least 6 characters long
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid() || isLoading}
          className="w-full flex cursor-pointer justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm 
                   text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                   transition duration-150 ease-in-out disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              {type === 'signin' ? 'Signing In...' : 'Creating Account...'}
            </div>
          ) : (
            type === 'signin' ? 'Sign In' : 'Create Account'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Google Sign In Button */}
      <button
        type="button"
        onClick={onGoogleSignIn}
        disabled={isLoading}
        className="w-full flex cursor-pointer items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm 
                 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                 transition duration-150 ease-in-out"
      >
        {googleSvg()}
        Continue with Google
      </button>
    </div>
  );
}
