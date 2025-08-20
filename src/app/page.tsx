'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Brain,
  Smartphone,
  Cloud,
  Sparkles,
  Cpu,
  Zap,
  ArrowRight,
  CheckCircle,
  Globe,
  Shield,
  Rocket,
  TrendingUp,
  Users,
  Award,
  Star,
  Code,
  Database,
  Layers,
  PenTool,
  Lightbulb,
  Target,
  BarChart3,
  Building2,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Coffee,
  Heart,
  Briefcase,
  BookOpen,
  Handshake,
  Eye,
  Play,
  MessageCircle,
} from 'lucide-react'

// Dynamically import components with no SSR for performance
const ThreeChatbot = dynamic(() => import('@/components/ui/ThreeChatbot'), {
  ssr: false,
  loading: () => null, // Remove loading spinner for faster perceived performance
})
const CustomTypewriter = dynamic(
  () => import('@/components/ui/CustomTypewriter'),
  {
    ssr: false,
    loading: () => (
      <div className='text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8 min-h-[4rem] font-light animate-pulse'>
        Building the Future with AI ⚡
      </div>
    ),
  }
)

export default function Home() {
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredStatIndex, setHoveredStatIndex] = useState<number | null>(null)
  const [hoveredValueIndex, setHoveredValueIndex] = useState<number | null>(
    null
  )
  const [hoveredChoiceIndex, setHoveredChoiceIndex] = useState<number | null>(
    null
  )
  const [hoveredCultureIndex, setHoveredCultureIndex] = useState<number | null>(
    null
  )
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 100])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  // Mouse gradient effect handler
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const getCardGradientStyle = (isHovered: boolean) => ({
    background: isHovered
      ? `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15), transparent 40%)`
      : 'transparent',
    transition: 'background 0.3s ease',
  })

  // Company data

  // Company stats
  const companyStats = [
    { label: 'Years of Excellence', value: '5+', icon: Award },
    { label: 'Projects Delivered', value: '50+', icon: Rocket },
    { label: 'Happy Clients', value: '30+', icon: Heart },
    { label: 'Team Members', value: '10+', icon: Users },
  ]

  // Company values
  const companyValues = [
    {
      icon: Eye,
      title: 'Our Vision',
      description:
        'To be the leading AI-powered development company that transforms businesses through innovative technology solutions.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Target,
      title: 'Our Mission',
      description:
        'Empowering businesses with cutting-edge AI solutions, responsive designs, and scalable applications that drive growth and success.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Heart,
      title: 'Our Values',
      description:
        'Innovation, Quality, Integrity, and Customer Success are at the core of everything we do at Fude Developments.',
      color: 'from-pink-500 to-red-500',
    },
  ]

  // Why choose us points
  const whyChooseUs = [
    {
      icon: Brain,
      title: 'AI-First Approach',
      description:
        'We integrate artificial intelligence into every solution for smarter, more efficient results.',
    },
    {
      icon: Rocket,
      title: 'Fast Delivery',
      description:
        'Agile development methodology ensures quick turnaround without compromising quality.',
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description:
        'Rigorous testing and quality control processes guarantee reliable, secure solutions.',
    },
    {
      icon: Handshake,
      title: 'Client Partnership',
      description:
        'We work closely with clients as partners, not just service providers.',
    },
  ]

  // Performance optimized animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <>
      {/* Chatbot */}
      <div style={{ zIndex: 50 }}>
        <ThreeChatbot />
      </div>

      {/* Main content - Neural background is now in layout */}
      <div className='relative'>
        {/* Hero Section */}
        <section
          id='home'
          className='relative min-h-screen flex items-center justify-center pt-16 overflow-hidden'
        >
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-20 lg:mt-16'>
            <div className='max-w-4xl mx-auto'>
              <div className='flex items-center justify-center'>
                {/* Main Content - Centered */}
                <div className='text-center w-full'>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-6'>
                      <Sparkles className='w-5 h-5 text-indigo-400 mr-2' />
                      <span className='text-sm font-medium text-indigo-300'>
                        AI-Powered Development
                      </span>
                    </div>

                    <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight'>
                      Welcome to{' '}
                      <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500'>
                        Fude
                      </span>{' '}
                      <br />
                      <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
                        Developments
                      </span>
                    </h1>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className='text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8 min-h-[4rem] font-light'
                  >
                    <CustomTypewriter
                      strings={[
                        'Building the Future with AI ⚡',
                        'Transforming Ideas into Reality 🚀',
                        'Your Trusted Development Partner 🤝',
                      ]}
                      loop={true}
                      typeSpeed={60}
                      deleteSpeed={40}
                      delayBetweenStrings={2000}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className='flex flex-col sm:flex-row gap-4 justify-center mb-12'
                  >
                    <Link href='/services' prefetch={true}>
                      <motion.button
                        className='relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold group transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/25'
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className='relative flex items-center justify-center space-x-2'>
                          <Rocket className='w-5 h-5' />
                          <span>Explore Services</span>
                        </span>
                        <motion.div
                          className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500'
                          initial={{ x: '-100%' }}
                          animate={{ x: isHovered ? '0%' : '-100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    </Link>
                  </motion.div>

                  {/* Company Stats - Horizontal Layout */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className='grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8'
                  >
                    {companyStats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className='relative text-center group'
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                      >
                        <div className='relative bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 hover:border-indigo-500/50 transition-all duration-300 h-32 flex flex-col items-center justify-center'>
                          <stat.icon className='w-12 h-12 text-indigo-400 mb-3' />
                          <div className='text-xl sm:text-2xl font-bold text-white mb-1'>
                            {stat.value}
                          </div>
                          <div className='text-xs text-gray-400 font-medium text-center leading-tight px-2'>
                            {stat.label}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className='absolute bottom-6 left-1/2 transform -translate-x-1/2'
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className='flex flex-col items-center space-y-2'>
              <div className='w-6 h-10 border-2 border-gray-400/60 rounded-full flex justify-center relative'>
                <motion.div
                  className='w-1 h-3 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full mt-2'
                  animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
              <span className='text-xs text-gray-500 font-medium'>
                Scroll Down
              </span>
            </div>
          </motion.div>
        </section>

        {/* About Company Section */}
        <section className='py-16 sm:py-24 relative'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='text-center mb-16'
            >
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>
                About{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'>
                  Fude Developments
                </span>
              </h2>
              <p className='max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed'>
                Founded with a vision to revolutionize the digital landscape,
                Fude Developments is a cutting-edge technology company
                specializing in AI-powered solutions, web development, and
                mobile applications. We combine innovation with expertise to
                deliver exceptional results that drive business growth.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16'>
              {companyValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                  className='relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center hover:border-indigo-500/50 transition-all duration-300 overflow-hidden'
                  onMouseEnter={() => setHoveredValueIndex(index)}
                  onMouseLeave={() => setHoveredValueIndex(null)}
                  onMouseMove={handleCardMouseMove}
                >
                  <div
                    className='absolute inset-0 rounded-3xl'
                    style={getCardGradientStyle(hoveredValueIndex === index)}
                  />
                  <div
                    className={`relative z-10 w-20 h-20 bg-gradient-to-br ${value.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <value.icon className='w-10 h-10 text-white drop-shadow-lg' />
                  </div>
                  <h3 className='relative z-10 text-2xl font-bold text-white mb-4'>
                    {value.title}
                  </h3>
                  <p className='relative z-10 text-gray-400 leading-relaxed'>
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className='py-16 sm:py-24 relative'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='text-center mb-16'
            >
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>
                Why Choose{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'>
                  Us?
                </span>
              </h2>
              <p className='max-w-2xl mx-auto text-gray-400 text-lg'>
                We combine innovation, expertise, and dedication to deliver
                exceptional results that exceed expectations
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {whyChooseUs.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className='relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center hover:border-indigo-500/50 transition-all duration-300 overflow-hidden'
                  onMouseEnter={() => setHoveredChoiceIndex(index)}
                  onMouseLeave={() => setHoveredChoiceIndex(null)}
                  onMouseMove={handleCardMouseMove}
                >
                  <div
                    className='absolute inset-0 rounded-2xl'
                    style={getCardGradientStyle(hoveredChoiceIndex === index)}
                  />
                  <div className='relative z-10 w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/30'>
                    <point.icon className='w-8 h-8 text-indigo-400' />
                  </div>
                  <h3 className='relative z-10 text-xl font-bold text-white mb-3'>
                    {point.title}
                  </h3>
                  <p className='relative z-10 text-gray-400 text-sm leading-relaxed'>
                    {point.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Culture Section */}
        <section className='py-16 sm:py-24 relative'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='text-center mb-16'
            >
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>
                Our{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'>
                  Culture
                </span>
              </h2>
              <p className='max-w-2xl mx-auto text-gray-400 text-lg'>
                At Fude Developments, we believe in creating an environment that
                fosters innovation, creativity, and growth
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[
                {
                  icon: Coffee,
                  title: 'Work-Life Balance',
                  description:
                    'We believe in maintaining a healthy balance between professional excellence and personal well-being.',
                },
                {
                  icon: Lightbulb,
                  title: 'Innovation First',
                  description:
                    'Every team member is encouraged to think creatively and contribute innovative ideas to our projects.',
                },
                {
                  icon: BookOpen,
                  title: 'Continuous Learning',
                  description:
                    "We invest in our team's growth through training, conferences, and skill development programs.",
                },
                {
                  icon: Users,
                  title: 'Collaborative Team',
                  description:
                    'Open communication and teamwork are the foundation of our success and project excellence.',
                },
                {
                  icon: Target,
                  title: 'Goal-Oriented',
                  description:
                    'We set clear objectives and work systematically to achieve exceptional results for our clients.',
                },
                {
                  icon: Globe,
                  title: 'Global Perspective',
                  description:
                    'Our diverse team brings international experience and perspectives to every project we undertake.',
                },
              ].map((culture, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className='relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300 overflow-hidden'
                  onMouseEnter={() => setHoveredCultureIndex(index)}
                  onMouseLeave={() => setHoveredCultureIndex(null)}
                  onMouseMove={handleCardMouseMove}
                >
                  <div
                    className='absolute inset-0 rounded-2xl'
                    style={getCardGradientStyle(hoveredCultureIndex === index)}
                  />
                  <div className='relative z-10 w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-4 border border-indigo-500/30'>
                    <culture.icon className='w-8 h-8 text-indigo-400' />
                  </div>
                  <h3 className='relative z-10 text-xl font-bold text-white mb-3'>
                    {culture.title}
                  </h3>
                  <p className='relative z-10 text-gray-400 leading-relaxed'>
                    {culture.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section id='contact' className='py-16 sm:py-24 relative'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='text-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl p-12 border border-indigo-500/20'
            >
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>
                Ready to Transform Your{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'>
                  Business?
                </span>
              </h2>
              <p className='max-w-2xl mx-auto text-gray-400 text-lg mb-8'>
                Let&apos;s discuss your project and explore how we can help you
                achieve your goals with cutting-edge technology and innovative
                solutions.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto'
                >
                  <MessageCircle className='w-5 h-5' />
                  <span>Start a Project</span>
                </motion.button>
                <Link
                  href='/services'
                  className='w-full sm:w-auto'
                  prefetch={true}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='border-2 border-indigo-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg hover:bg-indigo-500/10 transition-all duration-300 flex items-center justify-center space-x-2 w-full'
                  >
                    <Briefcase className='w-5 h-5' />
                    <span>View Services</span>
                  </motion.button>
                </Link>
              </div>

              {/* Contact Info */}
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-gray-700/50'>
                <div className='flex items-center justify-center space-x-3 text-sm sm:text-base'>
                  <Phone className='w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 flex-shrink-0' />
                  <span className='text-gray-400'>+91 7904329569</span>
                </div>
                <div className='flex items-center justify-center space-x-3 text-sm sm:text-base'>
                  <Mail className='w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 flex-shrink-0' />
                  <span className='text-gray-400'>
                    fudedevelopments@gmail.com
                  </span>
                </div>
                <div className='flex items-center justify-center space-x-3 text-sm sm:text-base'>
                  <MapPin className='w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 flex-shrink-0' />
                  <span className='text-gray-400'>Erode, India</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
