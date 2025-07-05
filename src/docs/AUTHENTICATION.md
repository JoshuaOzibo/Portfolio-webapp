# Authentication System

This document describes the authentication system implemented in the portfolio webapp.

## Overview

The authentication system is built with a modular approach using:
- **Zustand** for state management
- **Next.js App Router** for routing
- **TypeScript** for type safety
- **Persistent storage** for session management

## Architecture

### Core Components

1. **Auth Store** (`src/store/auth-store.ts`)
   - Manages authentication state using Zustand
   - Persists user data in localStorage
   - Provides login/logout actions

2. **Auth Hook** (`src/hooks/use-auth.ts`)
   - Provides easy access to auth state and methods
   - Handles login/logout logic
   - Returns typed authentication interface

3. **Route Protection Components**
   - `ProtectedRoute`: Redirects unauthenticated users to auth page
   - `AuthOnlyRoute`: Redirects authenticated users away from auth page
   - `ProtectedLayout`: Wraps authenticated content with sidebar/navbar

4. **Conditional Layout** (`src/components/conditional-layout.tsx`)
   - Determines which layout to show based on current route
   - Routes `/auth_page` to auth layout
   - Routes all other pages to protected layout

## File Structure

```
src/
├── store/
│   └── auth-store.ts          # Authentication state management
├── hooks/
│   └── use-auth.ts           # Authentication hook
├── components/
│   ├── protected-route.tsx    # Route protection for authenticated pages
│   ├── auth-only-route.tsx    # Route protection for auth page
│   ├── protected-layout.tsx   # Layout for authenticated users
│   ├── conditional-layout.tsx # Main layout router
│   ├── loading-spinner.tsx    # Loading component
│   └── navbar.tsx            # Updated with user info and logout
├── types/
│   └── auth.ts               # Type definitions
└── app/
    ├── layout.tsx            # Root layout with conditional rendering
    └── auth_page/
        └── page.tsx          # Authentication page
```

## Usage

### Basic Authentication Check

```typescript
import { useAuth } from '@/hooks/use-auth'

function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) return <LoadingSpinner />
  if (!isAuthenticated) return <div>Please log in</div>
  
  return <div>Welcome, {user?.name}!</div>
}
```

### Login/Logout

```typescript
import { useAuth } from '@/hooks/use-auth'

function AuthComponent() {
  const { login, logout, googleSignIn } = useAuth()
  
  const handleLogin = async () => {
    const result = await login('user@example.com', 'password')
    if (result.success) {
      // User is now authenticated
    }
  }
  
  const handleLogout = () => {
    logout()
    // User is redirected to auth page
  }
}
```

### Route Protection

The system automatically handles route protection:

- **Unauthenticated users** are redirected to `/auth_page`
- **Authenticated users** trying to access `/auth_page` are redirected to `/`
- **All other routes** require authentication

## State Management

The authentication state includes:
- `user`: Current user object (null if not authenticated)
- `isAuthenticated`: Boolean indicating authentication status
- `isLoading`: Boolean for loading states during auth operations

## Persistence

User authentication state is persisted in localStorage using Zustand's persist middleware. This means:
- Users remain logged in across browser sessions
- Authentication state survives page refreshes
- Logout clears the persisted data

## Security Notes

1. **Client-side only**: This is a client-side authentication system. For production, implement proper server-side authentication.
2. **Mock authentication**: The current implementation uses mock data. Replace with real API calls.
3. **Token management**: Consider implementing JWT tokens for better security.
4. **Route protection**: Server-side route protection should also be implemented for production.

## Customization

### Adding New Protected Routes

Simply create new pages in the `src/app/` directory. They will automatically be protected.

### Modifying Authentication Logic

Update the `useAuth` hook in `src/hooks/use-auth.ts` to integrate with your authentication API.

### Styling

The authentication components use Tailwind CSS. Customize styles by modifying the className props. 