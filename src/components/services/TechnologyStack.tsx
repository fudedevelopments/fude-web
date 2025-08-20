'use client'

import { motion } from 'framer-motion'
import {
  Code,
  Smartphone,
  Brain,
  Cloud,
  Database,
  Settings,
  Globe,
  Zap,
} from 'lucide-react'

export default function TechnologyStack() {
  const technologies = [
    {
      name: 'React',
      category: 'Frontend',
      icon: Code,
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      name: 'Next.js',
      category: 'Framework',
      icon: Globe,
      color: 'from-gray-500/20 to-gray-600/20',
    },
    {
      name: 'TypeScript',
      category: 'Language',
      icon: Code,
      color: 'from-blue-600/20 to-blue-700/20',
    },
    {
      name: 'Node.js',
      category: 'Backend',
      icon: Settings,
      color: 'from-green-500/20 to-green-600/20',
    },
    {
      name: 'Python',
      category: 'AI/ML',
      icon: Brain,
      color: 'from-yellow-500/20 to-orange-500/20',
    },
    {
      name: 'AWS',
      category: 'Cloud',
      icon: Cloud,
      color: 'from-orange-500/20 to-red-500/20',
    },
    {
      name: 'MongoDB',
      category: 'Database',
      icon: Database,
      color: 'from-green-600/20 to-green-700/20',
    },
    {
      name: 'React Native',
      category: 'Mobile',
      icon: Smartphone,
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      name: 'TensorFlow',
      category: 'AI/ML',
      icon: Brain,
      color: 'from-orange-600/20 to-red-600/20',
    },
    {
      name: 'Docker',
      category: 'DevOps',
      icon: Settings,
      color: 'from-blue-500/20 to-blue-600/20',
    },
    {
      name: 'GraphQL',
      category: 'API',
      icon: Zap,
      color: 'from-pink-500/20 to-purple-500/20',
    },
    {
      name: 'Firebase',
      category: 'Backend',
      icon: Cloud,
      color: 'from-yellow-600/20 to-orange-600/20',
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
            Technology{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'>
              Stack
            </span>
          </h2>
          <p className='max-w-3xl mx-auto text-gray-400 text-lg'>
            We leverage the latest and most powerful technologies to build
            robust, scalable, and future-proof solutions
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className='group relative'
            >
              {/* Tech circuit board background */}
              <div className='absolute inset-0 opacity-30'>
                {/* Circuit lines */}
                <div className='absolute left-0 top-1/4 w-full h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent'></div>
                <div className='absolute left-0 bottom-1/4 w-full h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent'></div>
                <div className='absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent'></div>
                <div className='absolute top-0 right-1/4 h-full w-px bg-gradient-to-b from-transparent via-pink-400/60 to-transparent'></div>

                {/* Circuit nodes */}
                <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse'></div>
                <div
                  className='absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse'
                  style={{ animationDelay: '0.2s' }}
                ></div>
                <div
                  className='absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse'
                  style={{ animationDelay: '0.4s' }}
                ></div>
                <div
                  className='absolute bottom-1/4 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-pulse'
                  style={{ animationDelay: '0.6s' }}
                ></div>

                {/* Corner connectors */}
                <div className='absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-cyan-400/80'></div>
                <div className='absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-indigo-400/80'></div>
                <div className='absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-purple-400/80'></div>
                <div className='absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-pink-400/80'></div>

                {/* Data flow animation */}
                <div className='absolute inset-0 opacity-60'>
                  <div
                    className='absolute top-1/2 left-0 w-2 h-0.5 bg-cyan-400 animate-pulse rounded-full'
                    style={{ animation: 'slideRight 2s infinite linear' }}
                  ></div>
                  <div
                    className='absolute left-1/2 top-0 w-0.5 h-2 bg-indigo-400 animate-pulse rounded-full'
                    style={{ animation: 'slideDown 2.5s infinite linear' }}
                  ></div>
                </div>
              </div>

              {/* Main card with processor-style border */}
              <div className='relative bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 sm:p-6 hover:border-indigo-500/70 transition-all duration-500 text-center h-full flex flex-col justify-center overflow-hidden group-hover:bg-gray-800/90'>
                {/* Processor-style glow effect */}
                <div className='absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500'></div>

                {/* Tech icon */}
                <div className='relative z-10 mb-3 flex justify-center'>
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${tech.color} group-hover:scale-110 transition-all duration-300`}
                  >
                    <tech.icon className='w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-lg' />
                  </div>
                </div>

                {/* Tech name */}
                <h3 className='relative z-10 text-base sm:text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors duration-300'>
                  {tech.name}
                </h3>

                {/* Category */}
                <p className='relative z-10 text-xs sm:text-sm text-gray-400 group-hover:text-indigo-300 transition-colors duration-300'>
                  {tech.category}
                </p>

                {/* Processor pins effect */}
                <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className='w-0.5 h-2 bg-gradient-to-t from-gold-400/60 to-transparent rounded-t'
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
