'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    id: 1,
    title: 'AI-Powered Web Development',
    subtitle: 'Intelligent Websites for the Future',
    description:
      "We create cutting-edge websites powered by artificial intelligence, delivering personalized user experiences and intelligent automation that adapts to your users' needs.",
    icon: '🌐',
    color: 'from-indigo-500 to-blue-600',
    features: [
      'AI-driven personalization engines',
      'Intelligent chatbots and virtual assistants',
      'Automated content generation',
      'Smart recommendation systems',
      'Predictive user analytics',
      'Voice and image recognition integration',
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'TensorFlow.js',
      'OpenAI API',
      'Tailwind CSS',
    ],
    pricing: 'Starting from $5,000',
  },
  {
    id: 2,
    title: 'Custom Android App Solutions',
    subtitle: 'Mobile Excellence, Delivered',
    description:
      'Native and cross-platform mobile applications with seamless performance, beautiful UI, and advanced functionality tailored to your business needs.',
    icon: '📱',
    color: 'from-green-500 to-emerald-600',
    features: [
      'Native Android development',
      'Cross-platform solutions (React Native, Flutter)',
      'Offline-first architecture',
      'Push notifications and real-time updates',
      'Payment gateway integration',
      'Advanced security implementations',
    ],
    technologies: [
      'Kotlin',
      'Java',
      'React Native',
      'Flutter',
      'Firebase',
      'Android Jetpack',
    ],
    pricing: 'Starting from $8,000',
  },
  {
    id: 3,
    title: 'Machine Learning & Automation',
    subtitle: 'Transform Data into Intelligence',
    description:
      'Implement sophisticated ML models to automate processes, analyze complex data patterns, and create predictive systems that drive business growth.',
    icon: '🤖',
    color: 'from-purple-500 to-violet-600',
    features: [
      'Custom ML model development',
      'Computer vision solutions',
      'Natural language processing',
      'Predictive analytics and forecasting',
      'Automated decision systems',
      'Data pipeline optimization',
    ],
    technologies: [
      'Python',
      'TensorFlow',
      'PyTorch',
      'Scikit-learn',
      'OpenCV',
      'Pandas',
    ],
    pricing: 'Starting from $10,000',
  },
  {
    id: 4,
    title: 'Cloud & Backend Development',
    subtitle: 'Scalable Infrastructure Solutions',
    description:
      'Build robust, scalable, and secure backend solutions using modern cloud infrastructure, serverless architecture, and microservices patterns.',
    icon: '☁️',
    color: 'from-pink-500 to-rose-600',
    features: [
      'Serverless architecture design',
      'Microservices development',
      'Database design and optimization',
      'API development and integration',
      'DevOps and CI/CD pipelines',
      'Security and compliance implementation',
    ],
    technologies: [
      'Node.js',
      'Python',
      'AWS',
      'Docker',
      'Kubernetes',
      'PostgreSQL',
    ],
    pricing: 'Starting from $6,000',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Planning',
    description:
      'We analyze your requirements, understand your business goals, and create a detailed project roadmap.',
    icon: '🔍',
  },
  {
    step: '02',
    title: 'Design & Prototyping',
    description:
      'Our team creates wireframes, mockups, and interactive prototypes to visualize your solution.',
    icon: '🎨',
  },
  {
    step: '03',
    title: 'Development & Testing',
    description:
      'We build your solution using cutting-edge technologies with rigorous testing at every stage.',
    icon: '⚙️',
  },
  {
    step: '04',
    title: 'Deployment & Support',
    description:
      'We deploy your solution and provide ongoing support, maintenance, and updates.',
    icon: '🚀',
  },
]

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className='min-h-screen bg-gray-900'>
      {/* Hero Section */}
      <section className='pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6'
          >
            Our{' '}
            <span className='bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent'>
              Services
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-xl text-gray-300 max-w-3xl mx-auto mb-12'
          >
            We deliver cutting-edge technology solutions that transform your
            business and drive growth through innovation, automation, and
            intelligent design.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className='py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            variants={container}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            className='grid grid-cols-1 lg:grid-cols-2 gap-8'
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={item}
                className='bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer'
                onClick={() =>
                  setSelectedService(
                    selectedService === service.id ? null : service.id
                  )
                }
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <div className='p-8'>
                  <div className='flex items-start justify-between mb-6'>
                    <div>
                      <div className='text-4xl mb-4'>{service.icon}</div>
                      <h3 className='text-2xl font-bold text-white mb-2'>
                        {service.title}
                      </h3>
                      <p className='text-indigo-400 font-medium mb-4'>
                        {service.subtitle}
                      </p>
                      <p className='text-gray-300 leading-relaxed'>
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {selectedService === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className='border-t border-gray-700 pt-6 mt-6'
                    >
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                          <h4 className='text-lg font-semibold text-white mb-3'>
                            Key Features
                          </h4>
                          <ul className='space-y-2'>
                            {service.features.map((feature, index) => (
                              <li
                                key={index}
                                className='text-gray-300 flex items-center'
                              >
                                <span className='text-green-400 mr-2'>✓</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className='text-lg font-semibold text-white mb-3'>
                            Technologies
                          </h4>
                          <div className='flex flex-wrap gap-2 mb-4'>
                            {service.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className='px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm'
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className='text-xl font-bold text-indigo-400'>
                            {service.pricing}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-800'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='text-3xl sm:text-4xl font-bold text-white mb-4'
            >
              Our <span className='text-indigo-400'>Process</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='text-gray-300 text-lg max-w-2xl mx-auto'
            >
              We follow a proven methodology to ensure your project is delivered
              on time, within budget, and exceeds expectations.
            </motion.p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='text-center'
              >
                <div className='relative mb-6'>
                  <div className='w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4'>
                    {step.icon}
                  </div>
                  <div className='absolute -top-2 -right-2 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center'>
                    <span className='text-indigo-400 font-bold text-sm'>
                      {step.step}
                    </span>
                  </div>
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>
                  {step.title}
                </h3>
                <p className='text-gray-300'>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='text-3xl sm:text-4xl font-bold text-white mb-6'
          >
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-gray-300 text-lg mb-8'
          >
            Let&apos;s discuss how our services can help you achieve your goals
            and drive innovation in your industry.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='flex flex-col sm:flex-row gap-4 justify-center'
          >
            <Link
              href='/#contact'
              className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Get Started Today
            </Link>
            <Link
              href='/#portfolio'
              className='border border-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:border-indigo-500 hover:text-indigo-400 transition-all duration-300'
            >
              View Our Work
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
