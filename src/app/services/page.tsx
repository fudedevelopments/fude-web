'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import ServicesGrid from '@/components/services/ServicesGrid'

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
const ChatbaseChatbot = dynamic(() => import('@/components/ui/ChatbaseChatbot'), {
  ssr: false,
})

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
      {/* Chatbase Chatbot */}
      <ChatbaseChatbot />

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
