'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import ServicesGrid from '@/components/services/ServicesGrid'

// Dynamically import components for performance
const NeuralNetworkBackground = dynamic(
  () => import('@/components/3d/NeuralNetworkBackground'),
  { ssr: false }
)

// Import service components
const ServicesHero = dynamic(
  () => import('@/components/services/ServicesHero'),
  { ssr: false }
)
const ProcessSteps = dynamic(
  () => import('@/components/services/ProcessSteps'),
  { ssr: false }
)
const TechnologyStack = dynamic(
  () => import('@/components/services/TechnologyStack'),
  { ssr: false }
)
const WhyChooseUs = dynamic(() => import('@/components/services/WhyChooseUs'), {
  ssr: false,
})
const CTASection = dynamic(() => import('@/components/services/CTASection'), {
  ssr: false,
})
const YouTubeSection = dynamic(
  () => import('@/components/services/YouTubeSection'),
  { ssr: false }
)

export default function ServicesPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

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
      {/* Neural Network Background */}
      <div
        className='fixed inset-0'
        style={{
          zIndex: 0,
          background:
            'linear-gradient(to bottom, #000000, #050510, #050510, #000000)',
        }}
      >
        {isMounted && <NeuralNetworkBackground />}
      </div>
      {/* Main content */}
      <div className='relative' style={{ zIndex: 10 }}>
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
