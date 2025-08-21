'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import ContactForm from '@/components/ui/ContactForm'
import ChatbaseChatbot from '@/components/ui/ChatbaseChatbot'

// 3D Card component with tilt effect
const Card3D = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateY = (mouseX / (rect.width / 2)) * 15
    const rotateX = -(mouseY / (rect.height / 2)) * 15

    setRotateX(rotateX)
    setRotateY(rotateY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transform-gpu ${className}`}
      style={{
        perspective: '1000px',
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </motion.div>
  )
}

export default function ContactUs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <>
      {/* Chatbase Chatbot */}
      <ChatbaseChatbot />

      <div
        ref={containerRef}
        className='min-h-screen bg-gray-900 relative overflow-hidden'
      >
        {/* Neural background is now in layout */}

        {/* Hero Section */}
        <section className='relative pt-32 pb-20 px-4 sm:px-6 lg:px-8'>
          {/* Animated background grid */}
          <div className='absolute inset-0 opacity-10'>
            <div
              className='absolute inset-0'
              style={{
                backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
            `,
                backgroundSize: '100px 100px',
              }}
            />
          </div>

          <div className='max-w-7xl mx-auto text-center relative z-10'>
            <motion.div style={{ y, opacity }} className='relative'>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className='text-4xl md:text-5xl font-bold text-white mb-8 relative'
              >
                Contact{' '}
                <span className='bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                  Fude Development
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className='text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed'
              >
                Ready to transform your ideas into reality? Let&apos;s start a
                conversation about your next project
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className='py-20 px-4 sm:px-6 lg:px-8 relative'>
          {/* Animated background elements */}
          <div className='absolute inset-0 overflow-hidden'>
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
              className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl'
            />
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              }}
              className='absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl'
            />
          </div>

          <div className='max-w-7xl mx-auto relative z-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
              {/* Contact Form */}
              <Card3D delay={0.1}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className='relative'
                >
                  <div className='relative p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl backdrop-blur-sm border border-gray-700/50'>
                    <div className='absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg rotate-45' />
                    <div className='absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg rotate-45' />

                    <motion.h2
                      className='text-3xl font-bold text-white mb-6'
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <span className='bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent'>
                        Get Started
                      </span>{' '}
                      Today
                    </motion.h2>

                    <ContactForm />
                  </div>
                </motion.div>
              </Card3D>

              {/* Contact Information */}
              <Card3D delay={0.2}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className='space-y-8'
                >
                  {/* Quick Contact */}
                  <motion.div
                    className='relative p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl backdrop-blur-sm border border-gray-700/50'
                    whileHover={{
                      boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
                      borderColor: 'rgba(99, 102, 241, 0.5)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h3
                      className='text-2xl font-bold text-white mb-6'
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <span className='bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent'>
                        Let&apos;s Connect
                      </span>
                    </motion.h3>

                    <motion.p
                      className='text-gray-300 mb-8 leading-relaxed'
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      Have a project in mind? We&apos;d love to hear from you.
                      Get in touch and let&apos;s discuss how we can bring your
                      vision to life with our AI-powered solutions.
                    </motion.p>

                    <div className='space-y-6'>
                      {/* Email */}
                      <motion.div
                        className='flex items-center space-x-4'
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        whileHover={{ x: 10 }}
                      >
                        <div className='w-12 h-12 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-lg flex items-center justify-center'>
                          <svg
                            className='w-6 h-6 text-white'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                            />
                          </svg>
                        </div>
                        <div>
                          <p className='text-gray-400 text-sm'>Email Us</p>
                          <a
                            href='mailto:fudedevelopments@gmail.com'
                            className='text-white hover:text-indigo-400 transition-colors duration-300'
                          >
                            fudedevelopments@gmail.com
                          </a>
                        </div>
                      </motion.div>

                      {/* Phone */}
                      <motion.div
                        className='flex items-center space-x-4'
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        whileHover={{ x: 10 }}
                      >
                        <div className='w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center'>
                          <svg
                            className='w-6 h-6 text-white'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                            />
                          </svg>
                        </div>
                        <div>
                          <p className='text-gray-400 text-sm'>Call Us</p>
                          <p className='text-white'>+91 7904329569</p>
                          <p className='text-green-400 text-sm'>
                            Available 24/7
                          </p>
                        </div>
                      </motion.div>

                      {/* Location */}
                      <motion.div
                        className='flex items-center space-x-4'
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        whileHover={{ x: 10 }}
                      >
                        <div className='w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center'>
                          <svg
                            className='w-6 h-6 text-white'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                          </svg>
                        </div>
                        <div>
                          <p className='text-gray-400 text-sm'>Visit Us</p>
                          <p className='text-white'>
                            Slatter Nagar, Perunduari
                          </p>
                          <p className='text-white'>
                            Erode - 638053, Tamil Nadu
                          </p>
                        </div>
                      </motion.div>

                      {/* Social Media Links */}
                      <motion.div
                        className='pt-6 border-t border-gray-700/50'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                      >
                        <p className='text-gray-400 text-sm mb-4'>Follow Us</p>
                        <div className='flex space-x-4'>
                          {/* LinkedIn */}
                          <motion.a
                            href='https://www.linkedin.com/company/104111287'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center'
                            whileHover={{
                              scale: 1.1,
                              boxShadow: '0 10px 20px rgba(59, 130, 246, 0.4)',
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg
                              className='w-6 h-6 text-white'
                              fill='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                            </svg>
                          </motion.a>

                          {/* Instagram */}
                          <motion.a
                            href='https://instagram.com/fude_developments'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg flex items-center justify-center'
                            whileHover={{
                              scale: 1.1,
                              boxShadow: '0 10px 20px rgba(236, 72, 153, 0.4)',
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg
                              className='w-6 h-6 text-white'
                              fill='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                            </svg>
                          </motion.a>

                          {/* YouTube */}
                          <motion.a
                            href='https://youtube.com/@fudedevelopments?si=2K13a8HHKTcc9e35'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center'
                            whileHover={{
                              scale: 1.1,
                              boxShadow: '0 10px 20px rgba(239, 68, 68, 0.4)',
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg
                              className='w-6 h-6 text-white'
                              fill='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
                            </svg>
                          </motion.a>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Response Time */}
                  <motion.div
                    className='relative p-6 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl backdrop-blur-sm border border-indigo-500/30'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
                    }}
                  >
                    <div className='text-center'>
                      <motion.div
                        className='w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4'
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <svg
                          className='w-8 h-8 text-white'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                      </motion.div>
                      <h4 className='text-lg font-semibold text-white mb-2'>
                        Quick Response
                      </h4>
                      <p className='text-gray-300 text-sm'>
                        We typically respond within 2-4 hours during business
                        days
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </Card3D>
            </div>
          </div>
        </section>

        {/* Enhanced Contact Cards Section */}
        <section className='py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
          {/* Animated background */}
          <div className='absolute inset-0'>
            <div className='absolute inset-0 bg-gradient-to-r from-gray-800/80 to-gray-900/80' />
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className='absolute inset-0 opacity-20'
              style={{
                backgroundImage: `
                radial-gradient(circle at 25% 25%, #6366f1 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, #ec4899 0%, transparent 50%)
              `,
                backgroundSize: '100% 100%',
              }}
            />
          </div>

          <div className='max-w-7xl mx-auto relative z-10'>
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='text-center mb-16'
            >
              <motion.h2
                className='text-6xl md:text-7xl font-bold text-white mb-6'
                whileInView={{
                  textShadow: [
                    '0 0 20px rgba(99, 102, 241, 0)',
                    '0 0 20px rgba(99, 102, 241, 0.8)',
                    '0 0 20px rgba(99, 102, 241, 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className='bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                  Multiple Ways
                </span>
              </motion.h2>
              <motion.p
                className='text-2xl text-gray-300 max-w-3xl mx-auto'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Choose the most convenient way to reach out to us
              </motion.p>
              <motion.div
                className='w-40 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full mt-6'
                initial={{ width: 0 }}
                whileInView={{ width: 160 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>

            {/* Enhanced Contact Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {/* Location Card */}
              <Card3D delay={0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ y: -10 }}
                  className='relative group'
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300' />
                  <div className='relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-8 text-center backdrop-blur-sm border border-gray-700/50 shadow-2xl'>
                    <motion.div
                      className='w-20 h-20 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'
                      whileHover={{
                        scale: 1.1,
                        rotateY: 180,
                        boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)',
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.svg
                        className='w-10 h-10 text-white'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      </motion.svg>
                    </motion.div>

                    <motion.h3
                      className='text-2xl font-bold text-white mb-4'
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Our Location
                    </motion.h3>

                    <motion.div
                      className='text-gray-300 leading-relaxed'
                      whileHover={{ color: '#ffffff' }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.p
                        className='text-lg'
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        Slatter Nagar, Perunduari
                        <br />
                        Erode - 638053
                        <br />
                        Tamil Nadu, India
                      </motion.p>
                    </motion.div>

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className='absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60'
                    />
                  </div>
                </motion.div>
              </Card3D>

              {/* Email Card */}
              <Card3D delay={0.2}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ y: -10 }}
                  className='relative group'
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300' />
                  <div className='relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-8 text-center backdrop-blur-sm border border-gray-700/50 shadow-2xl'>
                    <motion.div
                      className='w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'
                      whileHover={{
                        scale: 1.1,
                        rotateY: 180,
                        boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)',
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.svg
                        className='w-10 h-10 text-white'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        />
                      </motion.svg>
                    </motion.div>

                    <motion.h3
                      className='text-2xl font-bold text-white mb-4'
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Email Us
                    </motion.h3>

                    <motion.div
                      className='text-gray-300 leading-relaxed'
                      whileHover={{ color: '#ffffff' }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.a
                        href='mailto:fudedevelopments@gmail.com'
                        className='block text-lg hover:text-purple-400 transition-colors duration-300'
                        whileHover={{ x: 5, scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        fudedevelopments@gmail.com
                      </motion.a>
                    </motion.div>

                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className='absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60'
                    />
                  </div>
                </motion.div>
              </Card3D>

              {/* Phone Card */}
              <Card3D delay={0.3}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  whileHover={{ y: -10 }}
                  className='relative group'
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300' />
                  <div className='relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-8 text-center backdrop-blur-sm border border-gray-700/50 shadow-2xl'>
                    <motion.div
                      className='w-20 h-20 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'
                      whileHover={{
                        scale: 1.1,
                        rotateY: 180,
                        boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)',
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.svg
                        className='w-10 h-10 text-white'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                        />
                      </motion.svg>
                    </motion.div>

                    <motion.h3
                      className='text-2xl font-bold text-white mb-4'
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Call Us
                    </motion.h3>

                    <motion.div
                      className='text-gray-300 leading-relaxed'
                      whileHover={{ color: '#ffffff' }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.p
                        className='text-lg'
                        whileHover={{ x: 5, scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        +91 7904329569
                        <br />
                        <span className='text-emerald-400 font-medium'>
                          Available 24/7
                        </span>
                      </motion.p>
                    </motion.div>

                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className='absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-60'
                    />
                  </div>
                </motion.div>
              </Card3D>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50'>
          <div className='max-w-4xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='text-center mb-16'
            >
              <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
                Explore Our{' '}
                <span className='bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent'>
                  Projects
                </span>
              </h2>
              <p className='text-lg text-gray-300 mb-8'>
                Check out our latest work and innovations on GitHub
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='inline-block'
              >
                <motion.a
                  href='https://github.com/fudedevelopments'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group relative inline-flex items-center space-x-3 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300'
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className='w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300'
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <svg
                      className='w-8 h-8 text-white'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                    </svg>
                  </motion.div>

                  <div className='text-left'>
                    <h3 className='text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300'>
                      View Our GitHub
                    </h3>
                    <p className='text-gray-300 group-hover:text-white transition-colors duration-300'>
                      Discover our open-source projects and contributions
                    </p>
                    <div className='flex items-center mt-2 text-sm text-indigo-400 group-hover:text-indigo-300'>
                      <span>Visit Repository</span>
                      <motion.svg
                        className='w-4 h-4 ml-2'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17 8l4 4m0 0l-4 4m4-4H3'
                        />
                      </motion.svg>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className='absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60'
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className='absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60'
                  />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
