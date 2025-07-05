'use client'

import { usePathname } from 'next/navigation'
import ProtectedLayout from './protected-layout'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/auth_page'

  // If it's the auth page, render children directly (auth page handles its own layout)
  if (isAuthPage) {
    return <>{children}</>
  }

  // For all other pages, wrap with protected layout
  return <ProtectedLayout>{children}</ProtectedLayout>
} 