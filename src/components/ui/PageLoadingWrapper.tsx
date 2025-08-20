'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useNavigation } from '@/providers/NavigationProvider'

export default function PageLoadingWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { stopLoading } = useNavigation()

  useEffect(() => {
    // Stop loading when the route changes
    stopLoading()
  }, [pathname, searchParams, stopLoading])

  return <>{children}</>
}
