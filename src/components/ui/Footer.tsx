'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className='bg-gray-900 border-t border-gray-800'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div>
            <Link href='#home' className='flex items-center mb-4'>
              <Image
                src='/images/logo/fude-logo.svg'
                alt='Fude Development Logo'
                width={40}
                height={40}
                className='w-10 h-10'
              />
              <span className='ml-2 text-xl font-bold text-white'>Fude</span>
            </Link>
            <p className='text-gray-400 mb-4'>
              Building the future with AI-powered technology. We develop
              innovative solutions for businesses of all sizes.
            </p>
            <div className='flex space-x-4'>
              <motion.a
                whileHover={{ y: -3, color: '#6366F1' }}
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z' />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ y: -3, color: '#6366F1' }}
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z' />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ y: -3, color: '#6366F1' }}
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ y: -3, color: '#6366F1' }}
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z' />
                </svg>
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className='text-white text-lg font-semibold mb-4'>Services</h3>
            <ul className='space-y-2'>
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href='#services'
                  className='text-gray-400 hover:text-indigo-400 transition-colors'
                >
                  AI-Powered Web Development
                </motion.a>
              </li>
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href='#services'
                  className='text-gray-400 hover:text-indigo-400 transition-colors'
                >
                  Custom Android App Solutions
                </motion.a>
              </li>
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href='#services'
                  className='text-gray-400 hover:text-indigo-400 transition-colors'
                >
                  Machine Learning & Automation
                </motion.a>
              </li>
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href='#services'
                  className='text-gray-400 hover:text-indigo-400 transition-colors'
                >
                  Cloud & Backend Development
                </motion.a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-white text-lg font-semibold mb-4'>Company</h3>
            <ul className='space-y-2'>
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href='#about'
                  className='text-gray-400 hover:text-indigo-400 transition-colors'
                >
                  About Us
                </motion.a>
              </li>
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href='#portfolio'
                  className='text-gray-400 hover:text-indigo-400 transition-colors'
                >
                  Portfolio
                </motion.a>
              </li>
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href='#'
                  className='text-gray-400 hover:text-indigo-400 transition-colors'
                >
                  Careers
                </motion.a>
              </li>
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href='#'
                  className='text-gray-400 hover:text-indigo-400 transition-colors'
                >
                  Privacy Policy
                </motion.a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-white text-lg font-semibold mb-4'>
              Newsletter
            </h3>
            <p className='text-gray-400 mb-4'>
              Subscribe to our newsletter to receive updates on our latest
              projects and AI innovations.
            </p>
            <form className='flex'>
              <input
                type='email'
                placeholder='Your email'
                className='px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white w-full'
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='submit'
                className='px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </motion.button>
            </form>
          </div>
        </div>

        <div className='mt-12 pt-8 border-t border-gray-800 text-center'>
          <p className='text-gray-400'>
            © 2025 Fude Development - AI-Driven Innovations. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
