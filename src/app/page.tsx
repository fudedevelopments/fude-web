'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Dynamically import components with no SSR
const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: false })
const Team = dynamic(() => import('@/components/sections/Team'), { ssr: false })
const ThreeChatbot = dynamic(() => import('@/components/ui/ThreeChatbot'), {
  ssr: false,
})
const NeuralNetworkBackground = dynamic(
  () => import('@/components/3d/NeuralNetworkBackground'),
  { ssr: false }
)
const CustomSpline = dynamic(() => import('@/components/3d/CustomSpline'), {
  ssr: false,
})
const AppBar = dynamic(() => import('@/components/ui/AppBar'), { ssr: false })
const CustomTypewriter = dynamic(
  () => import('@/components/ui/CustomTypewriter'),
  { ssr: false }
)

// Dynamically import 3D components
const NeuralNetwork = dynamic(() => import('@/components/3d/NeuralNetwork'), {
  ssr: false,
  loading: () => (
    <div className='w-[300px] h-[200px] bg-indigo-900/20 rounded-xl animate-pulse' />
  ),
})

export default function Home() {
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      {/* Neural Network Background - always visible */}
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

      {/* Spline Robot - fixed position on left side */}
      <div
        className='fixed inset-y-0 left-0 w-1/2 hidden md:block'
        style={{ zIndex: 1 }}
      >
        {isMounted && (
          <CustomSpline scene='https://prod.spline.design/YFoLw57TNWMbFovw/scene.splinecode' />
        )}
      </div>

      {/* Chatbot */}
      <div style={{ zIndex: 50 }}>
        <ThreeChatbot />
      </div>

      {/* App Bar */}
      <AppBar />

      {/* Main content */}
      <div className='relative' style={{ zIndex: 10 }}>
        {/* Hero Section */}
        <section
          id='home'
          className='relative min-h-screen flex items-center justify-center pt-16'
        >
          {/* Content - positioned right on desktop */}
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-20 md:mt-16'>
            <div className='max-w-4xl mx-auto md:mr-0 md:ml-auto md:pr-8 md:w-1/2 text-center md:text-left'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 neon-text'>
                  Building the Future with{' '}
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x'>
                    AI-Powered Technology
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className='text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 h-12'
              >
                <CustomTypewriter
                  strings={[
                    'We develop AI-driven websites',
                    'We create Android apps',
                    'We build smart automation solutions',
                  ]}
                  loop={true}
                  typeSpeed={80}
                  deleteSpeed={50}
                  delayBetweenStrings={1500}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'
              >
                <motion.button
                  className='relative overflow-hidden bg-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium group'
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className='relative z-10'>Get in Touch</span>
                  <motion.div
                    className='absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600'
                    initial={{ x: '-100%' }}
                    animate={{ x: isHovered ? '0%' : '-100%' }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className='absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                </motion.button>

                <motion.button
                  className='relative overflow-hidden bg-transparent border-2 border-indigo-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:border-purple-500'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className='relative z-10'>View Our Work</span>
                </motion.button>
              </motion.div>

              {/* Key features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className='mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6'
              >
                {[
                  {
                    title: 'AI-Powered',
                    description:
                      'Cutting-edge artificial intelligence solutions',
                    image: 'https://images.tanzo.in/assets/ai-icon',
                  },
                  {
                    title: 'Responsive Design',
                    description: 'Beautiful interfaces on any device',
                    image: 'https://images.tanzo.in/assets/responsive-icon',
                  },
                  {
                    title: 'Cloud-Native',
                    description: 'Scalable, secure, and always available',
                    image: 'https://images.tanzo.in/assets/cloud-icon',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -10 }}
                    className='bg-gray-800/30 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700'
                  >
                    <div className='w-12 h-12 mb-4 relative'>
                      {feature.image ? (
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className='object-contain'
                          unoptimized
                        />
                      ) : (
                        <div className='w-full h-full bg-indigo-600 rounded-full flex items-center justify-center text-2xl'>
                          {feature.title.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className='text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2'>
                      {feature.title}
                    </h3>
                    <p className='text-sm sm:text-base text-gray-400'>
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className='absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2'
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-gray-400'
            >
              <path d='M12 5v14M19 12l-7 7-7-7' />
            </svg>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id='services' className='py-24 relative'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='text-3xl sm:text-4xl font-bold text-white mb-4'
              >
                Our <span className='text-indigo-500'>Services</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='max-w-2xl mx-auto text-gray-400 text-lg'
              >
                We offer a range of AI-powered solutions to help your business
                thrive in the digital age.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <Team />

        {/* Portfolio Section */}
        <section id='portfolio' className='py-24 relative'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='text-3xl sm:text-4xl font-bold text-white mb-4'
              >
                Our <span className='text-indigo-500'>Portfolio</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='max-w-2xl mx-auto text-gray-400 text-lg'
              >
                Check out some of our recent projects and see how we&apos;ve
                helped businesses succeed.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id='contact' className='py-24 relative'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='text-3xl sm:text-4xl font-bold text-white mb-4'
              >
                Get in <span className='text-indigo-500'>Touch</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='max-w-2xl mx-auto text-gray-400 text-lg'
              >
                Ready to start your project? Contact us today for a free
                consultation.
              </motion.p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
