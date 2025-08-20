'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import components to reduce initial bundle size
const OptimizedNeuralBackground = dynamic(
  () => import('./OptimizedNeuralBackground'),
  {
    ssr: false,
    loading: () => (
      <div className='w-full h-full bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black' />
    ),
  }
)

const SimpleNeuralBackground = dynamic(
  () => import('./SimpleNeuralBackground'),
  {
    ssr: false,
    loading: () => (
      <div className='w-full h-full bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black' />
    ),
  }
)

interface DeviceCapabilities {
  isMobile: boolean
  isLowEnd: boolean
  supportsWebGL: boolean
  memoryLevel: 'low' | 'medium' | 'high'
}

function detectDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isLowEnd: false,
      supportsWebGL: false,
      memoryLevel: 'medium',
    }
  }

  // Check if mobile
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

  // Check WebGL support
  const canvas = document.createElement('canvas')
  const gl =
    canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  const supportsWebGL = !!gl

  // Estimate device performance
  let isLowEnd = false
  let memoryLevel: 'low' | 'medium' | 'high' = 'medium'

  // Check device memory if available
  const deviceMemory = (navigator as any).deviceMemory
  if (deviceMemory) {
    if (deviceMemory <= 2) {
      isLowEnd = true
      memoryLevel = 'low'
    } else if (deviceMemory >= 8) {
      memoryLevel = 'high'
    }
  }

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4
  if (cores <= 2) {
    isLowEnd = true
  }

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
  if (prefersReducedMotion) {
    isLowEnd = true
  }

  // Mobile devices are generally considered lower performance for 3D
  if (isMobile) {
    isLowEnd = true
    memoryLevel = memoryLevel === 'high' ? 'medium' : 'low'
  }

  return {
    isMobile,
    isLowEnd,
    supportsWebGL,
    memoryLevel,
  }
}

interface SmartNeuralBackgroundProps {
  forceMode?: 'auto' | 'optimized' | 'simple' | 'none'
  enablePerformanceMode?: boolean
}

export default function SmartNeuralBackground({
  forceMode = 'auto',
  enablePerformanceMode = true,
}: SmartNeuralBackgroundProps) {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isLowEnd: false,
    supportsWebGL: false,
    memoryLevel: 'medium',
  })
  const [backgroundMode, setBackgroundMode] = useState<
    'optimized' | 'simple' | 'none'
  >('simple')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const detected = detectDeviceCapabilities()
    setCapabilities(detected)

    // Determine background mode
    if (forceMode !== 'auto') {
      setBackgroundMode(forceMode as 'optimized' | 'simple' | 'none')
    } else {
      if (!detected.supportsWebGL || detected.isLowEnd) {
        setBackgroundMode('simple')
      } else if (detected.memoryLevel === 'high' && !detected.isMobile) {
        setBackgroundMode('optimized')
      } else {
        setBackgroundMode('simple')
      }
    }

    setIsMounted(true)
  }, [forceMode])

  // Performance monitoring
  useEffect(() => {
    if (!enablePerformanceMode || !isMounted) return

    let frameCount = 0
    let lastTime = performance.now()

    const checkPerformance = () => {
      frameCount++
      const now = performance.now()

      if (now - lastTime >= 2000) {
        // Check every 2 seconds
        const fps = (frameCount * 1000) / (now - lastTime)
        frameCount = 0
        lastTime = now

        // Downgrade if performance is poor
        if (fps < 15 && backgroundMode === 'optimized') {
          setBackgroundMode('simple')
        } else if (fps < 10 && backgroundMode === 'simple') {
          setBackgroundMode('none')
        }
      }

      requestAnimationFrame(checkPerformance)
    }

    const handle = requestAnimationFrame(checkPerformance)
    return () => cancelAnimationFrame(handle)
  }, [backgroundMode, enablePerformanceMode, isMounted])

  if (!isMounted) {
    return (
      <div className='w-full h-full bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black' />
    )
  }

  const getQualityLevel = () => {
    if (capabilities.memoryLevel === 'high' && !capabilities.isMobile)
      return 'HIGH'
    if (capabilities.memoryLevel === 'low' || capabilities.isMobile)
      return 'LOW'
    return 'MEDIUM'
  }

  switch (backgroundMode) {
    case 'optimized':
      return (
        <OptimizedNeuralBackground
          quality={getQualityLevel()}
          enableAdaptiveQuality={enablePerformanceMode}
        />
      )

    case 'simple':
      return <SimpleNeuralBackground animate={!capabilities.isLowEnd} />

    case 'none':
      return (
        <div className='w-full h-full bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black' />
      )

    default:
      return <SimpleNeuralBackground animate={false} />
  }
}
