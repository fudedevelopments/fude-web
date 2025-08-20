'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { usePathname } from 'next/navigation'
import LoadingFallback from '@/components/ui/LoadingFallback'

interface NavigationContextType {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
)

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}

interface NavigationProviderProps {
  children: ReactNode
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Stop loading immediately when pathname changes
    setIsLoading(false)
  }, [pathname])

  useEffect(() => {
    // Failsafe: automatically stop loading after 5 seconds
    if (isLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false)
      }, 5000)

      return () => clearTimeout(timeout)
    }
  }, [isLoading])

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  return (
    <NavigationContext.Provider
      value={{ isLoading, startLoading, stopLoading }}
    >
      {children}
      {isLoading && <LoadingFallback message='Loading page...' />}
    </NavigationContext.Provider>
  )
}
