'use client'

import { motion } from 'framer-motion'

export default function YouTubeSection() {
  return (
    <section className='py-16 sm:py-24'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6'>
            See Our{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'>
              Work in Action
            </span>
          </h2>
          <p className='max-w-3xl mx-auto text-gray-400 text-lg'>
            Watch how we transform ideas into powerful digital solutions that
            drive business growth
          </p>
        </motion.div>

        {/* Futuristic Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className='relative max-w-6xl mx-auto mb-8 sm:mb-16 px-2 sm:px-0'
        >
          {/* Outer glow container */}
          <div className='relative group'>
            {/* Animated border gradient */}
            <div className='absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl blur-sm group-hover:blur-md transition-all duration-500 animate-pulse'></div>

            {/* Inner glow */}
            <div className='absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl sm:rounded-3xl blur-xl animate-pulse'></div>

            {/* Video container */}
            <div className='relative bg-gray-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden border border-indigo-500/30'>
              {/* Corner accents - responsive sizing */}
              <div className='absolute top-2 sm:top-4 left-2 sm:left-4 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-t-2 border-indigo-400'></div>
              <div className='absolute top-2 sm:top-4 right-2 sm:right-4 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-t-2 border-indigo-400'></div>
              <div className='absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-b-2 border-indigo-400'></div>
              <div className='absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-b-2 border-indigo-400'></div>

              {/* Floating particles effect - hidden on small screens */}
              <div className='absolute inset-0 overflow-hidden pointer-events-none hidden sm:block'>
                <div
                  className='absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-bounce'
                  style={{ animationDelay: '0s', animationDuration: '3s' }}
                ></div>
                <div
                  className='absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce'
                  style={{ animationDelay: '1s', animationDuration: '4s' }}
                ></div>
                <div
                  className='absolute bottom-1/4 left-1/3 w-1 h-1 bg-pink-400 rounded-full animate-bounce'
                  style={{ animationDelay: '2s', animationDuration: '5s' }}
                ></div>
                <div
                  className='absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce'
                  style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}
                ></div>
              </div>

              {/* YouTube embed */}
              <div className='relative aspect-video w-full'>
                <iframe
                  src='https://www.youtube.com/embed/ELesaGVUj_0?si=dIsNOCjZ2_EZdtCA&autoplay=1&mute=1&loop=1&playlist=ELesaGVUj_0&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3'
                  title='Fude Dev Demo Video'
                  className='w-full h-full'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                  loading='lazy'
                ></iframe>
              </div>

              {/* Bottom tech indicator */}
              <div className='absolute bottom-2 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2'>
                <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-xs text-green-400 font-medium'>
                  Live Demo
                </span>
              </div>
            </div>

            {/* Side glow effects - hidden on mobile */}
            <div className='absolute top-1/2 -left-4 w-8 h-24 bg-gradient-to-r from-indigo-500/30 to-transparent rounded-r-full blur-md animate-pulse hidden sm:block'></div>
            <div className='absolute top-1/2 -right-4 w-8 h-24 bg-gradient-to-l from-purple-500/30 to-transparent rounded-l-full blur-md animate-pulse hidden sm:block'></div>
          </div>

          {/* Video description */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className='text-center mt-4 sm:mt-6 px-2'
          >
            <p className='text-gray-400 text-sm sm:text-base'>
              Watch how we transform ideas into innovative AI-powered solutions
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
