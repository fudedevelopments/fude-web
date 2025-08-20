'use client'

import Link from 'next/link'
import { useNavigation } from '@/providers/NavigationProvider'
import { ReactNode, MouseEvent } from 'react'

interface LoadingLinkProps {
  href: string
  children: ReactNode
  className?: string
  target?: string
  rel?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  loadingMessage?: string
}

export default function LoadingLink({
  href,
  children,
  className,
  target,
  rel,
  onClick,
  loadingMessage = 'Loading page...',
}: LoadingLinkProps) {
  const { startLoading } = useNavigation()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Only show loading for internal navigation (not external links or same page)
    if (
      !target &&
      !href.startsWith('http') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:') &&
      !href.startsWith('#')
    ) {
      // Check if it's a different page
      const currentPath = window.location.pathname
      const linkPath = href.split('#')[0] // Remove hash

      if (linkPath !== currentPath && linkPath !== '') {
        startLoading()
      }
    }

    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}
