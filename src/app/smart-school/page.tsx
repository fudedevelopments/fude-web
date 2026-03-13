'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import {
  GraduationCap,
  BookOpen,
  Users,
  BarChart3,
  Calendar,
  Bell,
  Shield,
  Smartphone,
  Cloud,
  CreditCard,
  Bus,
  ClipboardList,
  MessageSquare,
  Award,
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Sparkles,
  School,
  FileText,
  UserCheck,
  Building2,
} from 'lucide-react'

const DemoRequestForm = dynamic(
  () => import('@/components/smart-school/DemoRequestForm'),
  { ssr: false }
)

export default function SmartSchoolPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [hoveredFeatureIndex, setHoveredFeatureIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState(0)

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isDemoModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDemoModalOpen])

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const getCardGradientStyle = (isHovered: boolean) => ({
    background: isHovered
      ? `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.12), transparent 40%)`
      : 'transparent',
    transition: 'background 0.3s ease',
  })

  const features = [
    {
      icon: Users,
      title: 'Student Management',
      description: 'Complete student lifecycle management from admission to graduation with detailed profiles and academic records.',
      color: 'from-emerald-500 to-green-600',
    },
    {
      icon: BookOpen,
      title: 'Attendance Tracking',
      description: 'Digital attendance with real-time parent notifications via SMS/WhatsApp. Biometric and QR code support.',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: BarChart3,
      title: 'Exam & Results',
      description: 'Comprehensive exam management with auto-generated report cards, grade analytics, and performance tracking.',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      icon: CreditCard,
      title: 'Fee Management',
      description: 'Automated fee collection with online payment gateway, receipt generation, and defaulter tracking.',
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: Calendar,
      title: 'Timetable & Scheduling',
      description: 'Smart timetable generator with conflict detection, substitute teacher management, and room allocation.',
      color: 'from-pink-500 to-rose-600',
    },
    {
      icon: Bus,
      title: 'Transport Management',
      description: 'GPS-based bus tracking, route optimization, and real-time parent alerts for safe transportation.',
      color: 'from-amber-500 to-yellow-600',
    },
    {
      icon: ClipboardList,
      title: 'Staff & HR Management',
      description: 'Employee records, payroll processing, leave management, and performance evaluation system.',
      color: 'from-teal-500 to-emerald-600',
    },
    {
      icon: MessageSquare,
      title: 'Communication Hub',
      description: 'Instant notifications, circulars, and parent-teacher messaging through SMS, email, and in-app chat.',
      color: 'from-indigo-500 to-violet-600',
    },
    {
      icon: FileText,
      title: 'Library Management',
      description: 'Digital library catalog, book issue/return tracking, fine management, and inventory control.',
      color: 'from-lime-500 to-green-600',
    },
  ]

  const modules = [
    {
      title: 'For Administrators',
      icon: Building2,
      items: [
        'Dashboard with real-time analytics',
        'Student & Staff management',
        'Fee collection & reports',
        'Admission management',
        'Custom report generation',
      ],
    },
    {
      title: 'For Teachers',
      icon: UserCheck,
      items: [
        'Digital attendance marking',
        'Exam & marks entry',
        'Lesson planning tools',
        'Student performance view',
        'Communication with parents',
      ],
    },
    {
      title: 'For Parents',
      icon: Users,
      items: [
        'Real-time attendance alerts',
        'Fee payment online',
        'Exam results & report cards',
        'School announcements',
        'Bus tracking & safety',
      ],
    },
  ]

  const stats = [
    { value: '500+', label: 'Schools Onboarded', icon: School },
    { value: '1M+', label: 'Students Managed', icon: GraduationCap },
    { value: '99.9%', label: 'Uptime Guarantee', icon: Shield },
    { value: '24/7', label: 'Support Available', icon: Zap },
  ]

  return (
    <>
      {/* Demo Modal */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <DemoRequestForm
            isModal={true}
            onClose={() => setIsDemoModalOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className='relative'>
        {/* ============ HERO SECTION ============ */}
        <section className='relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden'>
          {/* Decorative elements */}
          <div className='absolute top-1/4 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none' />
          <div className='absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none' />

          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
              {/* Left - Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Badge */}
                  <div className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 mb-6'>
                    <Sparkles className='w-4 h-4 text-emerald-400 mr-2' />
                    <span className='text-sm font-medium text-emerald-300'>
                      AI-Powered School Management
                    </span>
                  </div>

                  <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight'>
                    Smart{' '}
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500'>
                      School
                    </span>
                    <br />
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500'>
                      ERP
                    </span>
                  </h1>

                  <p className='text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl'>
                    Transform your school with our comprehensive ERP solution. Manage students, staff, fees, attendance, and more — all from a single, intelligent platform.
                  </p>

                  {/* CTA Buttons */}
                  <div className='flex flex-col sm:flex-row gap-4 mb-8'>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsDemoModalOpen(true)}
                      className='relative overflow-hidden bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold group transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/25 flex items-center justify-center gap-2'
                    >
                      <Play className='w-5 h-5' />
                      <span>Request Free Demo</span>
                      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700' />
                    </motion.button>

                    <motion.a
                      href='#features'
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className='border-2 border-emerald-500/50 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-emerald-500/10 transition-all duration-300 flex items-center justify-center gap-2'
                    >
                      <span>Explore Features</span>
                      <ArrowRight className='w-5 h-5' />
                    </motion.a>
                  </div>

                  {/* Quick stats */}
                  <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                      <CheckCircle className='w-5 h-5 text-emerald-400' />
                      <span className='text-gray-400 text-sm'>Free Setup</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <CheckCircle className='w-5 h-5 text-emerald-400' />
                      <span className='text-gray-400 text-sm'>No Hidden Charges</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <CheckCircle className='w-5 h-5 text-emerald-400' />
                      <span className='text-gray-400 text-sm'>24/7 Support</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right - Demo Form (Visible on page) */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <DemoRequestForm isModal={false} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============ STATS SECTION ============ */}
        <section className='py-12 sm:py-16 relative'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className='relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center hover:border-emerald-500/50 transition-all duration-300 group'
                >
                  <div className='w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:from-emerald-500/30 group-hover:to-cyan-500/30 transition-all duration-300'>
                    <stat.icon className='w-6 h-6 text-emerald-400' />
                  </div>
                  <div className='text-2xl sm:text-3xl font-bold text-white mb-1'>
                    {stat.value}
                  </div>
                  <div className='text-xs sm:text-sm text-gray-400'>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FEATURES SECTION ============ */}
        <section id='features' className='py-16 sm:py-24 relative'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='text-center mb-16'
            >
              <div className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 mb-4'>
                <Zap className='w-4 h-4 text-emerald-400 mr-2' />
                <span className='text-sm font-medium text-emerald-300'>Powerful Features</span>
              </div>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>
                Everything Your School{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400'>
                  Needs
                </span>
              </h2>
              <p className='max-w-3xl mx-auto text-gray-400 text-lg'>
                A complete suite of modules designed to streamline every aspect of school administration and management.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                  className='group relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 lg:p-8 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden'
                  onMouseEnter={() => setHoveredFeatureIndex(index)}
                  onMouseLeave={() => setHoveredFeatureIndex(null)}
                  onMouseMove={handleCardMouseMove}
                >
                  {/* Gradient overlay */}
                  <div
                    className='absolute inset-0 rounded-2xl'
                    style={getCardGradientStyle(hoveredFeatureIndex === index)}
                  />

                  {/* Icon */}
                  <div className='relative z-10 mb-5'>
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className='w-7 h-7 text-white' />
                    </div>
                  </div>

                  {/* Content */}
                  <div className='relative z-10'>
                    <h3 className='text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300'>
                      {feature.title}
                    </h3>
                    <p className='text-gray-400 text-sm leading-relaxed'>
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover particles */}
                  <div className='absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300' />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ MODULE TABS SECTION ============ */}
        <section className='py-16 sm:py-24 relative'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='text-center mb-12'
            >
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>
                Built for{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400'>
                  Everyone
                </span>
              </h2>
              <p className='max-w-2xl mx-auto text-gray-400 text-lg'>
                Tailored dashboards and tools for every stakeholder in your institution.
              </p>
            </motion.div>

            {/* Tab Buttons */}
            <div className='flex justify-center mb-10'>
              <div className='inline-flex bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-1.5 gap-1'>
                {modules.map((module, index) => (
                  <motion.button
                    key={index}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(index)}
                    className={`relative px-4 sm:px-6 py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeTab === index
                        ? 'text-white bg-gradient-to-r from-emerald-600 to-cyan-600 shadow-lg shadow-emerald-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <module.icon className='w-4 h-4' />
                    <span className='hidden sm:inline'>{module.title}</span>
                    <span className='sm:hidden'>{module.title.split(' ')[1]}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className='max-w-2xl mx-auto'
              >
                <div className='bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 sm:p-10'>
                  <div className='flex items-center gap-3 mb-6'>
                    {(() => {
                      const ModuleIcon = modules[activeTab].icon
                      return (
                        <div className='w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center'>
                          <ModuleIcon className='w-6 h-6 text-emerald-400' />
                        </div>
                      )
                    })()}
                    <h3 className='text-2xl font-bold text-white'>
                      {modules[activeTab].title}
                    </h3>
                  </div>

                  <ul className='space-y-4'>
                    {modules[activeTab].items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className='flex items-center gap-3 text-gray-300'
                      >
                        <div className='w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0'>
                          <CheckCircle className='w-4 h-4 text-emerald-400' />
                        </div>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsDemoModalOpen(true)}
                    className='mt-8 w-full bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 border border-emerald-500/30 text-emerald-300 font-medium py-3 px-6 rounded-xl hover:from-emerald-600/30 hover:to-cyan-600/30 transition-all duration-300 flex items-center justify-center gap-2'
                  >
                    <span>See it in action</span>
                    <ArrowRight className='w-4 h-4' />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ============ WHY CHOOSE SMART SCHOOL ============ */}
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
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400'>
                  Smart School?
                </span>
              </h2>
              <p className='max-w-2xl mx-auto text-gray-400 text-lg'>
                Trusted by hundreds of institutions for reliable, scalable, and user-friendly school management.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {[
                {
                  icon: Cloud,
                  title: 'Cloud-Based',
                  description: 'Access from anywhere, anytime. No installation needed. Automatic updates and backups.',
                },
                {
                  icon: Smartphone,
                  title: 'Mobile App',
                  description: 'Dedicated apps for parents, teachers, and admins available on Android and iOS.',
                },
                {
                  icon: Shield,
                  title: 'Data Security',
                  description: 'Enterprise-grade security with encrypted data storage and role-based access control.',
                },
                {
                  icon: Award,
                  title: 'Easy to Use',
                  description: 'Intuitive interface designed for non-technical users. Get started in minutes.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className='relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center hover:border-emerald-500/50 transition-all duration-300 group'
                >
                  <div className='w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 group-hover:from-emerald-500/30 group-hover:to-cyan-500/30 transition-all duration-300'>
                    <item.icon className='w-8 h-8 text-emerald-400' />
                  </div>
                  <h3 className='text-xl font-bold text-white mb-2'>
                    {item.title}
                  </h3>
                  <p className='text-gray-400 text-sm leading-relaxed'>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA SECTION ============ */}
        <section className='py-16 sm:py-24 relative'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='text-center bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-indigo-500/10 rounded-3xl p-10 sm:p-16 border border-emerald-500/20 relative overflow-hidden'
            >
              {/* Background decorations */}
              <div className='absolute top-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none' />
              <div className='absolute bottom-0 right-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none' />

              <div className='relative z-10'>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className='w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30'
                >
                  <GraduationCap className='w-10 h-10 text-white' />
                </motion.div>

                <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>
                  Ready to Transform Your{' '}
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400'>
                    School?
                  </span>
                </h2>
                <p className='max-w-2xl mx-auto text-gray-400 text-lg mb-8'>
                  Join hundreds of schools already using Smart School ERP. Get a personalized demo and see how we can simplify your school management.
                </p>

                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsDemoModalOpen(true)}
                    className='bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-emerald-500 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40'
                  >
                    <Play className='w-5 h-5' />
                    <span>Request Free Demo</span>
                  </motion.button>
                  <motion.a
                    href='tel:+917904329569'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='border-2 border-emerald-500/50 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-emerald-500/10 transition-all duration-300 flex items-center justify-center gap-2'
                  >
                    <Smartphone className='w-5 h-5' />
                    <span>Call Us Now</span>
                  </motion.a>
                </div>

                {/* Trust badges */}
                <div className='flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-gray-700/50'>
                  {[
                    { icon: Star, text: '4.9/5 Rating' },
                    { icon: Shield, text: 'ISO Certified' },
                    { icon: Users, text: '500+ Schools' },
                    { icon: Zap, text: 'Quick Setup' },
                  ].map((badge, index) => (
                    <div key={index} className='flex items-center gap-2 text-gray-400'>
                      <badge.icon className='w-4 h-4 text-emerald-400' />
                      <span className='text-sm'>{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
