'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { googleSvg } from './svgs';

interface AuthInputProps {
  onSubmit: (email: string, password: string) => void;
  onGoogleSignIn: () => void;
  type: 'signin' | 'signup';
}

export default function AuthInput({ onSubmit, onGoogleSignIn, type }: AuthInputProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="md:w-1/2 w-full shadow-lg mt-20 max-w-md border border-gray-200 rounded-lg p-4 mx-auto space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
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
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex cursor-pointer justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm 
                   text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                   transition duration-150 ease-in-out"
        >
          {type === 'signin' ? 'Sign In' : 'Sign Up'}
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
        className="w-full flex cursor-pointer items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm 
                 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                 transition duration-150 ease-in-out"
      >
        {googleSvg()}
        Continue with Google
      </button>
    </div>
  );
}
