'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import TeamMemberCard from '@/components/3d/TeamMemberCard'
import NeuralNetworkBackground from '@/components/3d/NeuralNetworkBackground'
import Footer from '@/components/ui/Footer'

// 3D Card component with tilt effect
const Card3D = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateY = (mouseX / (rect.width / 2)) * 15
    const rotateX = -(mouseY / (rect.height / 2)) * 15

    setRotateX(rotateX)
    setRotateY(rotateY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transform-gpu ${className}`}
      style={{
        perspective: '1000px',
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </motion.div>
  )
}

const teamMembers = [
  {
    name: 'Praveen M',
    role: 'Frontend Developer',
    bio: 'Skilled frontend developer with a passion for creating beautiful and functional user interfaces. Expert in React, Next.js, and Flutter.',
    image: '/images/team/praveen.jpg',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/praveen-kumar-03320326b/',
      twitter: 'https://x.com/Praveenstark08',
      github: 'https://github.com/praveenstark',
    },
  },
  {
    name: 'Dhanush S',
    role: 'Backend Developer',
    bio: 'Proficient backend developer with expertise in building scalable APIs, database management, and server-side logic. Experienced in Node.js, Express, and MongoDB.',
    image: '/images/team/dhanush.jpg',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/dhanushns',
      github: 'https://github.com/dhanushns',
    },
  },
  {
    name: 'Kishore R',
    role: 'Digital Marketing Specialist',
    bio: 'Digital marketing specialist with expertise in SEO, content marketing, and social media strategy.',
    image: '/images/team/kishore.jpg',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/kishore-ramesh-6a2778202',
      github: 'https://github.com/kishore1804',
    },
  },
  {
    name: 'Dinesh Kumar Vs',
    role: 'Full Stack & Java Developer',
    bio: 'Experienced developer in Html, CSS, JavaScript, and Java. Proficient in building responsive web applications and RESTful APIs.',
    image: '/images/team/dinesh.jpg',
    socialLinks: {
      linkedin:
        'https://www.linkedin.com/in/dinesh-kumar-v-s-37236a30b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: 'https://github.com/dineshkumarvs',
    },
  },
]

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div
      ref={containerRef}
      className='min-h-screen bg-gray-900 relative overflow-hidden'
    >
      <NeuralNetworkBackground />

      {/* Simplified Hero Section */}
      <section className='relative pt-32 pb-20 px-4 sm:px-6 lg:px-8'>
        {/* Animated background grid */}
        <div className='absolute inset-0 opacity-10'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
            `,
              backgroundSize: '100px 100px',
            }}
          />
        </div>

        <div className='max-w-7xl mx-auto text-center relative z-10'>
          <motion.div style={{ y, opacity }} className='relative'>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className='text-4xl md:text-5xl font-bold text-white mb-8 relative'
            >
              About{' '}
              <span className='bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                Fude Development
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className='text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed'
            >
              Pioneering the future of software development with AI-powered
              solutions
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Company Overview - Who We Are */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 relative'>
        {/* Animated background elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl'
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className='absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl'
          />
        </div>

        <div className='max-w-7xl mx-auto relative z-10'>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <motion.h2
              className='text-6xl md:text-7xl font-bold text-white mb-6 relative'
              whileInView={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <span className='bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                Who We Are
              </span>
            </motion.h2>
            <motion.div
              className='w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full'
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          <div className='max-w-4xl mx-auto'>
            {/* Content */}
            <Card3D delay={0.2}>
              <div className='relative'>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className='space-y-8'
                >
                  <motion.div
                    className='relative p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl backdrop-blur-sm border border-gray-700/50'
                    whileHover={{
                      boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
                      borderColor: 'rgba(99, 102, 241, 0.5)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className='absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg rotate-45' />
                    <div className='absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg rotate-45' />

                    <motion.p
                      className='text-xl text-gray-300 mb-6 leading-relaxed'
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <motion.span
                        className='text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent'
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        Fude Development
                      </motion.span>{' '}
                      is a cutting-edge software development company
                      specializing in artificial intelligence solutions. We are
                      passionate about creating innovative technologies that
                      transform businesses and enhance user experiences.
                    </motion.p>

                    <motion.p
                      className='text-xl text-gray-300 mb-8 leading-relaxed'
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      Our team of expert developers and AI specialists work
                      tirelessly to deliver world-class solutions in web
                      development, mobile applications, machine learning, and
                      intelligent automation systems.
                    </motion.p>

                    {/* Enhanced Skill Tags */}
                    <motion.div
                      className='flex flex-wrap gap-4 justify-center'
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      {[
                        {
                          name: 'AI Development',
                          color: 'from-indigo-600 to-indigo-800',
                        },
                        {
                          name: 'Web Solutions',
                          color: 'from-purple-600 to-purple-800',
                        },
                        {
                          name: 'Mobile Apps',
                          color: 'from-pink-600 to-pink-800',
                        },
                        {
                          name: 'Automation',
                          color: 'from-emerald-600 to-emerald-800',
                        },
                      ].map((skill, index) => (
                        <motion.span
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: 0.8 + index * 0.1,
                          }}
                          whileHover={{
                            scale: 1.1,
                            rotateY: 10,
                            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                          }}
                          className={`px-6 py-3 bg-gradient-to-r ${skill.color} text-white rounded-full text-sm font-medium cursor-pointer transition-all duration-300 shadow-lg`}
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </Card3D>
          </div>
        </div>
      </section>

      {/* Enhanced Get In Touch Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
        {/* Animated background */}
        <div className='absolute inset-0'>
          <div className='absolute inset-0 bg-gradient-to-r from-gray-800/80 to-gray-900/80' />
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className='absolute inset-0 opacity-20'
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #6366f1 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, #ec4899 0%, transparent 50%)
              `,
              backgroundSize: '100% 100%',
            }}
          />
        </div>

        <div className='max-w-7xl mx-auto relative z-10'>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <motion.h2
              className='text-6xl md:text-7xl font-bold text-white mb-6'
              whileInView={{
                textShadow: [
                  '0 0 20px rgba(99, 102, 241, 0)',
                  '0 0 20px rgba(99, 102, 241, 0.8)',
                  '0 0 20px rgba(99, 102, 241, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className='bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                Get In Touch
              </span>
            </motion.h2>
            <motion.p
              className='text-2xl text-gray-300 max-w-3xl mx-auto'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Ready to bring your ideas to life? Let&apos;s create something
              amazing together.
            </motion.p>
            <motion.div
              className='w-40 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full mt-6'
              initial={{ width: 0 }}
              whileInView={{ width: 160 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* Enhanced Contact Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Location Card */}
            <Card3D delay={0.1}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ y: -10 }}
                className='relative group'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300' />
                <div className='relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-8 text-center backdrop-blur-sm border border-gray-700/50 shadow-2xl'>
                  <motion.div
                    className='w-20 h-20 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'
                    whileHover={{
                      scale: 1.1,
                      rotateY: 180,
                      boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.svg
                      className='w-10 h-10 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </motion.svg>
                  </motion.div>

                  <motion.h3
                    className='text-2xl font-bold text-white mb-4'
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Our Location
                  </motion.h3>

                  <motion.div
                    className='text-gray-300 leading-relaxed'
                    whileHover={{ color: '#ffffff' }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.p
                      className='text-lg'
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Slatter Nagar, Perunduari
                      <br />
                      Erode - 638053
                      <br />
                      Tamil Nadu, India
                    </motion.p>
                  </motion.div>

                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className='absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60'
                  />
                </div>
              </motion.div>
            </Card3D>

            {/* Email Card */}
            <Card3D delay={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ y: -10 }}
                className='relative group'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300' />
                <div className='relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-8 text-center backdrop-blur-sm border border-gray-700/50 shadow-2xl'>
                  <motion.div
                    className='w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'
                    whileHover={{
                      scale: 1.1,
                      rotateY: 180,
                      boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.svg
                      className='w-10 h-10 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </motion.svg>
                  </motion.div>

                  <motion.h3
                    className='text-2xl font-bold text-white mb-4'
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Email Us
                  </motion.h3>

                  <motion.div
                    className='text-gray-300 leading-relaxed'
                    whileHover={{ color: '#ffffff' }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.a
                      href='mailto:fudedevelopments@gmail.com'
                      className='block text-lg hover:text-purple-400 transition-colors duration-300'
                      whileHover={{ x: 5, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      fudedevelopments@gmail.com
                    </motion.a>
                  </motion.div>

                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className='absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60'
                  />
                </div>
              </motion.div>
            </Card3D>

            {/* Phone Card */}
            <Card3D delay={0.3}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ y: -10 }}
                className='relative group'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300' />
                <div className='relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-8 text-center backdrop-blur-sm border border-gray-700/50 shadow-2xl'>
                  <motion.div
                    className='w-20 h-20 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'
                    whileHover={{
                      scale: 1.1,
                      rotateY: 180,
                      boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.svg
                      className='w-10 h-10 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                      />
                    </motion.svg>
                  </motion.div>

                  <motion.h3
                    className='text-2xl font-bold text-white mb-4'
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Call Us
                  </motion.h3>

                  <motion.div
                    className='text-gray-300 leading-relaxed'
                    whileHover={{ color: '#ffffff' }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.p
                      className='text-lg'
                      whileHover={{ x: 5, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      +91 7904329569
                      <br />
                      <span className='text-emerald-400 font-medium'>
                        Available 24/7
                      </span>
                    </motion.p>
                  </motion.div>

                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className='absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-60'
                  />
                </div>
              </motion.div>
            </Card3D>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
              Meet Our{' '}
              <span className='bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent'>
                Team
              </span>
            </h2>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
              Our diverse team of experts brings together years of experience in
              AI, software development, and innovative technology solutions.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={member.name}
                {...member}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <h2 className='text-4xl font-bold text-white mb-4'>Our Values</h2>
            <p className='text-lg text-gray-300'>
              The principles that drive everything we do
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className='text-center'
            >
              <div className='w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-2'>Innovation</h3>
              <p className='text-gray-300'>
                Pushing boundaries with cutting-edge AI and technology solutions
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-center'
            >
              <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-2'>Quality</h3>
              <p className='text-gray-300'>
                Delivering excellence in every project with attention to detail
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='text-center'
            >
              <div className='w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-2'>
                Collaboration
              </h3>
              <p className='text-gray-300'>
                Working together to achieve extraordinary results
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='text-center'
            >
              <div className='w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-2'>Impact</h3>
              <p className='text-gray-300'>
                Creating solutions that make a real difference in the world
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
