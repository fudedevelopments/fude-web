'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle, AlertCircle, Phone, Mail, User, Building2, MessageSquare, Loader2 } from 'lucide-react'

interface DemoRequestFormProps {
  isModal?: boolean
  onClose?: () => void
}

export default function DemoRequestForm({ isModal = false, onClose }: DemoRequestFormProps) {
  const [result, setResult] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setResult('Sending...')
    setIsError(false)

    const formData = new FormData(event.currentTarget)
    formData.append('access_key', 'e79fa461-4fa3-400b-be52-72d4d02d8432')
    formData.append('subject', 'Smart School ERP - Demo Request')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        setResult('Demo request submitted successfully! We will contact you shortly.')
        setIsSuccess(true)
        ;(event.target as HTMLFormElement).reset()
      } else {
        setResult('Something went wrong. Please try again.')
        setIsError(true)
      }
    } catch {
      setResult('Network error. Please check your connection and try again.')
      setIsError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative ${isModal ? '' : 'bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-indigo-900/30 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-6 sm:p-8 lg:p-10'}`}
    >
      {/* Decorative gradient orbs */}
      {!isModal && (
        <>
          <div className='absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none' />
          <div className='absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none' />
        </>
      )}

      {/* Success State */}
      <AnimatePresence mode='wait'>
        {isSuccess ? (
          <motion.div
            key='success'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='text-center py-8 sm:py-12'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className='w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30'
            >
              <CheckCircle className='w-10 h-10 text-white' />
            </motion.div>
            <h3 className='text-2xl font-bold text-white mb-3'>Request Submitted!</h3>
            <p className='text-gray-400 max-w-md mx-auto mb-6'>
              Thank you for your interest in Smart School ERP. Our team will reach out to you within 24 hours to schedule your personalized demo.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsSuccess(false)
                setResult('')
              }}
              className='px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300'
            >
              Submit Another Request
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key='form'>
            {!isModal && (
              <div className='relative z-10 mb-8'>
                <h3 className='text-2xl sm:text-3xl font-bold text-white mb-2'>
                  Request a{' '}
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400'>
                    Free Demo
                  </span>
                </h3>
                <p className='text-gray-400'>
                  Fill in your details and our team will arrange a personalized demo for your institution.
                </p>
              </div>
            )}

            <form onSubmit={onSubmit} className='relative z-10 space-y-5'>
              {/* Hidden field for form identification */}
              <input type='hidden' name='from_page' value='Smart School ERP' />

              {/* Name Field */}
              <div className='group'>
                <label htmlFor={`demo-name${isModal ? '-modal' : ''}`} className='flex items-center gap-2 text-sm font-medium text-gray-300 mb-2'>
                  <User className='w-4 h-4 text-indigo-400' />
                  Full Name <span className='text-red-400'>*</span>
                </label>
                <input
                  id={`demo-name${isModal ? '-modal' : ''}`}
                  type='text'
                  name='name'
                  required
                  className='w-full px-4 py-3.5 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 hover:border-gray-500/50'
                  placeholder='Enter your full name'
                />
              </div>

              {/* Phone Number Field - MANDATORY */}
              <div className='group'>
                <label htmlFor={`demo-phone${isModal ? '-modal' : ''}`} className='flex items-center gap-2 text-sm font-medium text-gray-300 mb-2'>
                  <Phone className='w-4 h-4 text-emerald-400' />
                  Phone Number <span className='text-red-400'>*</span>
                  <span className='text-xs text-emerald-400/70 bg-emerald-500/10 px-2 py-0.5 rounded-full'>Required</span>
                </label>
                <input
                  id={`demo-phone${isModal ? '-modal' : ''}`}
                  type='tel'
                  name='phone'
                  required
                  pattern='[0-9+\-\s]{7,15}'
                  title='Please enter a valid phone number (7-15 digits)'
                  className='w-full px-4 py-3.5 bg-gray-800/50 border border-emerald-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 hover:border-emerald-400/40'
                  placeholder='+91 XXXXX XXXXX'
                />
              </div>

              {/* Email Field - OPTIONAL */}
              <div className='group'>
                <label htmlFor={`demo-email${isModal ? '-modal' : ''}`} className='flex items-center gap-2 text-sm font-medium text-gray-300 mb-2'>
                  <Mail className='w-4 h-4 text-indigo-400' />
                  Email Address
                  <span className='text-xs text-gray-500 bg-gray-700/50 px-2 py-0.5 rounded-full'>Optional</span>
                </label>
                <input
                  id={`demo-email${isModal ? '-modal' : ''}`}
                  type='email'
                  name='email'
                  className='w-full px-4 py-3.5 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 hover:border-gray-500/50'
                  placeholder='your.email@example.com'
                />
              </div>

              {/* School/Institution Name */}
              <div className='group'>
                <label htmlFor={`demo-school${isModal ? '-modal' : ''}`} className='flex items-center gap-2 text-sm font-medium text-gray-300 mb-2'>
                  <Building2 className='w-4 h-4 text-indigo-400' />
                  School / Institution Name <span className='text-red-400'>*</span>
                </label>
                <input
                  id={`demo-school${isModal ? '-modal' : ''}`}
                  type='text'
                  name='school_name'
                  required
                  className='w-full px-4 py-3.5 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 hover:border-gray-500/50'
                  placeholder='Enter your school or institution name'
                />
              </div>

              {/* Message */}
              <div className='group'>
                <label htmlFor={`demo-message${isModal ? '-modal' : ''}`} className='flex items-center gap-2 text-sm font-medium text-gray-300 mb-2'>
                  <MessageSquare className='w-4 h-4 text-indigo-400' />
                  Message
                  <span className='text-xs text-gray-500 bg-gray-700/50 px-2 py-0.5 rounded-full'>Optional</span>
                </label>
                <textarea
                  id={`demo-message${isModal ? '-modal' : ''}`}
                  name='message'
                  rows={3}
                  className='w-full px-4 py-3.5 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 resize-none hover:border-gray-500/50'
                  placeholder='Tell us about your requirements or any questions...'
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type='submit'
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className='w-full relative overflow-hidden bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-60 disabled:cursor-not-allowed group'
              >
                <span className='relative z-10 flex items-center justify-center gap-2'>
                  {isSubmitting ? (
                    <>
                      <Loader2 className='w-5 h-5 animate-spin' />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
                      <span>Request Free Demo</span>
                    </>
                  )}
                </span>
                {/* Animated shine effect */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700' />
              </motion.button>

              {/* Error Message */}
              {isError && result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3'
                >
                  <AlertCircle className='w-4 h-4 flex-shrink-0' />
                  <span>{result}</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  // If modal mode, wrap in modal overlay
  if (isModal) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6'
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose?.()
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='absolute inset-0 bg-black/70 backdrop-blur-sm'
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900/40 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-500/10'
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className='absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/80 border border-gray-600/50 text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all duration-300 z-20'
          >
            <X className='w-5 h-5' />
          </motion.button>

          {/* Modal Header */}
          <div className='mb-6 pr-10'>
            <h3 className='text-2xl font-bold text-white mb-2'>
              Request a{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400'>
                Free Demo
              </span>
            </h3>
            <p className='text-gray-400 text-sm'>
              Experience the power of Smart School ERP. Fill in your details and we&apos;ll arrange a personalized demo.
            </p>
          </div>

          {/* Decorative gradient orbs */}
          <div className='absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none' />
          <div className='absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none' />

          {formContent}
        </motion.div>
      </motion.div>
    )
  }

  return formContent
}
