'use client'

import { motion } from 'framer-motion'

interface LoadingFallbackProps {
  message?: string
}

export default function LoadingFallback({
  message = 'Loading...',
}: LoadingFallbackProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900/95 backdrop-blur-sm'>
      <div className='flex flex-col items-center space-y-6'>
        {/* Animated Spinner */}
        <motion.div
          className='relative'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Outer spinning ring */}
          <motion.div
            className='relative w-20 h-20 rounded-full border-4 border-gray-700'
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* Gradient border segment */}
            <div className='absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-600'></div>
          </motion.div>

          {/* Inner spinning circle */}
          <motion.div
            className='absolute inset-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-2 border-indigo-400/30'
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* Central dot */}
            <div className='absolute inset-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full'></div>
          </motion.div>

          {/* Floating particles */}
          <motion.div
            className='absolute -top-3 -right-3'
            animate={{
              y: [-10, 10, -10],
              opacity: [0.4, 0.8, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className='w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full'></div>
          </motion.div>

          <motion.div
            className='absolute -bottom-3 -left-3'
            animate={{
              y: [10, -10, 10],
              opacity: [0.4, 0.8, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            <div className='w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full'></div>
          </motion.div>

          <motion.div
            className='absolute -top-2 -left-4'
            animate={{
              x: [-8, 8, -8],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          >
            <div className='w-1.5 h-1.5 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full'></div>
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className='text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className='text-xl font-semibold text-white mb-2'>{message}</h3>

          {/* Animated dots */}
          <div className='flex items-center justify-center space-x-1'>
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className='w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full'
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className='w-64 h-1 bg-gray-700 rounded-full overflow-hidden'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className='h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full'
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.5) 0%, transparent 25%),
                                radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.5) 0%, transparent 25%)`,
          }}
        />
      </div>
    </div>
  )
}
