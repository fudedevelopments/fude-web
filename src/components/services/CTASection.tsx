'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import LoadingLink from '@/components/ui/LoadingLink'

export default function CTASection() {
  return (
    <section className='py-16 sm:py-24 relative'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl p-12 border border-indigo-500/20'
        >
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>
            Ready to Start Your{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'>
              Project?
            </span>
          </h2>
          <p className='max-w-2xl mx-auto text-gray-400 text-lg mb-8'>
            Let&apos;s discuss your requirements and create something amazing
            together. Get a free consultation today!
          </p>
          <div className='flex justify-center'>
            <LoadingLink href='/contactus'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center'
              >
                <MessageCircle className='w-5 h-5 mr-2' />
                Contact Us
              </motion.button>
            </LoadingLink>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
