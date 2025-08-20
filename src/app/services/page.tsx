'use client'

import { useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import ServicesGrid from '@/components/services/ServicesGrid'

// Import service components with improved loading
const ServicesHero = dynamic(
  () => import('@/components/services/ServicesHero'),
  {
    ssr: false,
    loading: () => (
      <div className='min-h-[50vh] flex items-center justify-center'>
        <div className='animate-pulse text-center'>
          <div className='h-12 bg-gray-700/30 rounded-lg mb-4 w-64 mx-auto'></div>
          <div className='h-6 bg-gray-700/20 rounded w-96 mx-auto'></div>
        </div>
      </div>
    ),
  }
)
const ProcessSteps = dynamic(
  () => import('@/components/services/ProcessSteps'),
  {
    ssr: false,
    loading: () => (
      <div className='h-32 bg-gray-800/20 rounded-lg animate-pulse'></div>
    ),
  }
)
const TechnologyStack = dynamic(
  () => import('@/components/services/TechnologyStack'),
  {
    ssr: false,
    loading: () => (
      <div className='h-32 bg-gray-800/20 rounded-lg animate-pulse'></div>
    ),
  }
)
const WhyChooseUs = dynamic(() => import('@/components/services/WhyChooseUs'), {
  ssr: false,
  loading: () => (
    <div className='h-32 bg-gray-800/20 rounded-lg animate-pulse'></div>
  ),
})
const CTASection = dynamic(() => import('@/components/services/CTASection'), {
  ssr: false,
  loading: () => (
    <div className='h-32 bg-gray-800/20 rounded-lg animate-pulse'></div>
  ),
})
const YouTubeSection = dynamic(
  () => import('@/components/services/YouTubeSection'),
  {
    ssr: false,
    loading: () => (
      <div className='h-32 bg-gray-800/20 rounded-lg animate-pulse'></div>
    ),
  }
)

export default function ServicesPage() {
  useEffect(() => {
    // Add custom animations to document head
    const style = document.createElement('style')
    style.textContent = `
      @keyframes slideRight {
        0% { transform: translateX(-100%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateX(200%); opacity: 0; }
      }
      @keyframes slideDown {
        0% { transform: translateY(-100%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(200%); opacity: 0; }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <>
      {/* Main content - Neural background is now in layout */}
      <div className='relative'>
        <ServicesGrid />
        <ProcessSteps />
        <TechnologyStack />
        <WhyChooseUs />
        <CTASection />
        <YouTubeSection />
      </div>
    </>
  )
}
