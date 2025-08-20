'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code, Smartphone, Brain, Cloud, Database, PenTool } from 'lucide-react'

export default function ServicesGrid() {
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState<number | null>(
    null
  )
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Add a small delay to ensure proper loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Mouse gradient effect handler
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const getCardGradientStyle = (isHovered: boolean) => ({
    background: isHovered
      ? `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15), transparent 40%)`
      : 'transparent',
    transition: 'background 0.3s ease',
  })

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description:
        'Modern, responsive websites built with cutting-edge technologies',
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications',
    },
    {
      icon: Brain,
      title: 'AI Solutions',
      description:
        'Custom artificial intelligence and machine learning solutions',
    },
    {
      icon: Cloud,
      title: 'Cloud Services',
      description: 'Scalable cloud infrastructure and deployment solutions',
    },
    {
      icon: Database,
      title: 'Backend Systems',
      description: 'Robust server-side architecture and database design',
    },
    {
      icon: PenTool,
      title: 'UI/UX Design',
      description: 'User-centered design that converts and engages',
    },
  ]

  return (
    <section className='py-8 sm:py-12 relative'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6'>
            Our{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'>
              Services
            </span>
          </h2>
          <p className='max-w-3xl mx-auto text-gray-400 text-lg'>
            Comprehensive solutions tailored to accelerate your business growth
            with cutting-edge technology
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: isLoaded ? index * 0.1 : 0 }}
              whileHover={{ y: -10 }}
              className='group relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-500 overflow-hidden'
              onMouseEnter={() => setHoveredServiceIndex(index)}
              onMouseLeave={() => setHoveredServiceIndex(null)}
              onMouseMove={handleCardMouseMove}
            >
              {/* Gradient overlay */}
              <div
                className='absolute inset-0 rounded-2xl'
                style={getCardGradientStyle(hoveredServiceIndex === index)}
              />

              {/* Icon */}
              <div className='relative z-10 mb-6'>
                <div className='w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300'>
                  <service.icon className='w-8 h-8 text-indigo-400' />
                </div>
              </div>

              {/* Content */}
              <div className='relative z-10'>
                <h3 className='text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300'>
                  {service.title}
                </h3>
                <p className='text-gray-400 mb-6 leading-relaxed'>
                  {service.description}
                </p>
              </div>

              {/* Hover effect particles */}
              <div className='absolute top-4 right-4 w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300'></div>
              <div
                className='absolute bottom-4 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300'
                style={{ animationDelay: '0.5s' }}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
