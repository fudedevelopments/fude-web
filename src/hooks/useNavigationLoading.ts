'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function useNavigationLoading() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    // Listen for route changes
    const handleRouteChange = () => {
      setIsLoading(false)
    }

    // Set loading to false when pathname or search params change
    handleRouteChange()

    return () => {
      setIsLoading(false)
    }
  }, [pathname, searchParams])

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  return {
    isLoading,
    startLoading,
    stopLoading,
  }
}
