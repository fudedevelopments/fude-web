'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Shield, Target, Users, Rocket, Globe } from 'lucide-react'

export default function WhyChooseUs() {
  const [hoveredBenefitIndex, setHoveredBenefitIndex] = useState<number | null>(
    null
  )
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  const benefits = [
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description:
        'We leverage cutting-edge technologies and methodologies to give you a competitive advantage in your market.',
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description:
        'Rigorous testing and quality control processes ensure reliable, secure, and scalable solutions.',
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description:
        'Every project is focused on delivering measurable business outcomes and ROI for our clients.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description:
        'Our experienced developers and designers bring deep expertise across multiple technologies.',
    },
    {
      icon: Rocket,
      title: 'Fast Delivery',
      description:
        'Agile development processes and efficient workflows ensure timely project completion.',
    },
    {
      icon: Globe,
      title: '24/7 Support',
      description:
        'Comprehensive support and maintenance services to keep your solutions running smoothly.',
    },
  ]

  return (
    <section className='py-16 sm:py-24 relative'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6'>
            Why Choose{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'>
              Fude Dev
            </span>
          </h2>
          <p className='max-w-2xl mx-auto text-gray-400 text-lg'>
            We deliver exceptional results through innovation, expertise, and
            unwavering commitment to your success
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className='group relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300 text-center overflow-hidden'
              onMouseEnter={() => setHoveredBenefitIndex(index)}
              onMouseLeave={() => setHoveredBenefitIndex(null)}
              onMouseMove={handleCardMouseMove}
            >
              <div
                className='absolute inset-0 rounded-2xl'
                style={getCardGradientStyle(hoveredBenefitIndex === index)}
              />
              <div className='relative z-10 w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300'>
                <benefit.icon className='w-8 h-8 text-indigo-400' />
              </div>
              <h3 className='relative z-10 text-xl font-bold text-white mb-3'>
                {benefit.title}
              </h3>
              <p className='relative z-10 text-gray-400 leading-relaxed'>
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
