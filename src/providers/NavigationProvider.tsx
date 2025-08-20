'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
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
  const searchParams = useSearchParams()

  useEffect(() => {
    // Stop loading immediately when pathname or searchParams change
    console.log('Route changed to:', pathname)
    setIsLoading(false)
  }, [pathname, searchParams])

  useEffect(() => {
    // Failsafe: automatically stop loading after 5 seconds
    if (isLoading) {
      console.log('Loading started, setting 5s timeout')
      const timeout = setTimeout(() => {
        console.log('Loading timeout reached, stopping loading')
        setIsLoading(false)
      }, 5000)

      return () => clearTimeout(timeout)
    }
  }, [isLoading])

  const startLoading = () => {
    console.log('startLoading called')
    setIsLoading(true)
  }
  const stopLoading = () => {
    console.log('stopLoading called')
    setIsLoading(false)
  }

  return (
    <NavigationContext.Provider
      value={{ isLoading, startLoading, stopLoading }}
    >
      {children}
      {isLoading && <LoadingFallback message='Loading page...' />}
    </NavigationContext.Provider>
  )
}
