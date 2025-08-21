'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import LoadingLink from './LoadingLink'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/30 backdrop-blur-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link href='/' className='flex-shrink-0'>
              <Image
                src='/images/logo/fude-logo.svg'
                alt='Fude Development Logo'
                width={40}
                height={40}
                className='w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full bg-gray-800/30 p-1 hover:scale-110 transition-transform duration-300'
              />
            </Link>
            <div className='hidden md:block ml-10'>
              <div className='flex items-baseline space-x-8'>
                {navLinks.map((link) => (
                  <LoadingLink
                    key={link.name}
                    href={link.href}
                    className='text-gray-300 hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors'
                  >
                    {link.name}
                  </LoadingLink>
                ))}
              </div>
            </div>
          </div>

          <div className='hidden md:block'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors'
            >
              Get in Touch
            </motion.button>
          </div>

          <div className='md:hidden'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
        className={`md:hidden overflow-hidden bg-gray-900/80 backdrop-blur-lg`}
      >
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
          {navLinks.map((link) => (
            <LoadingLink
              key={link.name}
              href={link.href}
              className='text-gray-300 hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-medium transition-colors'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </LoadingLink>
          ))}
          <button className='w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors'>
            Get in Touch
          </button>
        </div>
      </motion.div>
    </motion.nav>
  )
}
