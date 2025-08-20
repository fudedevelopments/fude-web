'use client'

import { motion } from 'framer-motion'

interface LoadingFallbackProps {
  height?: string
  text?: string
}

export default function LoadingFallback({
  height = 'h-32',
  text = 'Loading...',
}: LoadingFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${height} flex items-center justify-center bg-gray-800/10 rounded-lg border border-gray-700/20`}
    >
      <div className='text-center'>
        <div className='w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-2'></div>
        <p className='text-gray-400 text-sm'>{text}</p>
      </div>
    </motion.div>
  )
}
