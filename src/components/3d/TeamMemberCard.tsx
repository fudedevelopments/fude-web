'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface TeamMemberCardProps {
  name: string
  role: string
  bio: string
  image: string
  socialLinks: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  delay?: number
}

export default function TeamMemberCard({
  name,
  role,
  bio,
  image,
  socialLinks,
  delay = 0,
}: TeamMemberCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation (limited to 10 degrees)
    const rotateY = (mouseX / (rect.width / 2)) * 10
    const rotateX = -(mouseY / (rect.height / 2)) * 10

    setRotateX(rotateX)
    setRotateY(rotateY)
  }

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  // Handle image error
  const handleImageError = () => {
    console.error(`Failed to load image: ${image}`)
    setImageError(true)
  }

  // Handle image load success
  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  // Generate initials for fallback
  const getInitials = () => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className='relative w-full max-w-sm mx-auto'
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className='bg-gray-800 rounded-xl overflow-hidden shadow-xl glass'
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Glowing border effect */}
        <div
          className='absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300'
          style={{
            opacity: isHovered ? 0.5 : 0,
            boxShadow:
              'inset 0 0 20px rgba(99, 102, 241, 0.8), 0 0 20px rgba(99, 102, 241, 0.5)',
          }}
        />

        {/* Image with 3D effect */}
        <div className='relative h-80 overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-b from-indigo-600/30 to-black/70 z-10' />

          {/* Fallback shown while image is loading or if it fails */}
          {(!isImageLoaded || imageError) && (
            <div className='absolute inset-0 bg-gradient-to-br from-indigo-800 to-purple-900 flex items-center justify-center'>
              <span className='text-5xl font-bold text-white/80'>
                {getInitials()}
              </span>
            </div>
          )}

          {/* Actual image (hidden if error) */}
          {!imageError && (
            <motion.div
              style={{
                transform: `translateZ(20px) scale(${isHovered ? 1.05 : 1})`,
                transition: 'transform 0.3s ease-out',
                opacity: isImageLoaded ? 1 : 0,
              }}
              className='h-full w-full'
            >
              <Image
                src={image}
                alt={name}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition:
                    name === 'Mathan M' ? 'center top' : 'center center',
                }}
                className='transition-transform duration-500'
                onError={handleImageError}
                onLoad={handleImageLoad}
                sizes='(max-width: 768px) 100vw, 25vw'
                priority
                unoptimized
              />
            </motion.div>
          )}

          {/* Name and role with 3D effect */}
          <div className='absolute bottom-0 left-0 p-6 z-20'>
            <motion.h3
              className='text-2xl font-bold text-white mb-1'
              style={{
                transform: `translateZ(40px)`,
                textShadow: '0 0 10px rgba(99, 102, 241, 0.8)',
              }}
            >
              {name}
            </motion.h3>
            <motion.p
              className='text-indigo-300'
              style={{
                transform: `translateZ(30px)`,
              }}
            >
              {role}
            </motion.p>
          </div>
        </div>

        {/* Bio with 3D effect */}
        <motion.div
          className='p-6'
          style={{
            transform: `translateZ(10px)`,
          }}
        >
          <p className='text-gray-300 mb-4'>{bio}</p>

          {/* Social links with 3D effect */}
          <div className='flex space-x-4'>
            {socialLinks.twitter && (
              <motion.a
                href={socialLinks.twitter}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-indigo-400 transition-colors'
                whileHover={{ y: -3, scale: 1.2 }}
                style={{ transform: `translateZ(30px)` }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                </svg>
              </motion.a>
            )}

            {socialLinks.linkedin && (
              <motion.a
                href={socialLinks.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-indigo-400 transition-colors'
                whileHover={{ y: -3, scale: 1.2 }}
                style={{ transform: `translateZ(30px)` }}
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
            )}

            {socialLinks.github && (
              <motion.a
                href={socialLinks.github}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-indigo-400 transition-colors'
                whileHover={{ y: -3, scale: 1.2 }}
                style={{ transform: `translateZ(30px)` }}
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
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
