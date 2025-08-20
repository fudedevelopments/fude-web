'use client'

import { motion } from 'framer-motion'

export default function ServicesHero() {
  return (
    <section className='relative pt-24 pb-12'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-3xl mx-auto'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'
          >
            Our{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'>
              Services
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='text-lg text-gray-400 max-w-2xl mx-auto'
          >
            Professional development services to transform your ideas into
            reality
          </motion.p>
        </div>
      </div>
    </section>
  )
}
