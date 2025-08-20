'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function ProcessSteps() {
  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description:
        'We dive deep into understanding your business needs, target audience, and project requirements through comprehensive research and planning sessions.',
      features: [
        'Requirement Analysis',
        'Market Research',
        'Technical Planning',
        'Timeline Creation',
      ],
      duration: '1-2 weeks',
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description:
        'Our design team creates wireframes, mockups, and interactive prototypes that align with your brand and user experience goals.',
      features: ['UI/UX Design', 'Wireframing', 'Prototyping', 'Design System'],
      duration: '2-3 weeks',
    },
    {
      step: '03',
      title: 'Development & Integration',
      description:
        'Using agile methodologies, we build your solution with clean, scalable code and integrate all necessary third-party services.',
      features: [
        'Frontend Development',
        'Backend Development',
        'API Integration',
        'Testing',
      ],
      duration: '4-8 weeks',
    },
    {
      step: '04',
      title: 'Testing & Deployment',
      description:
        'Comprehensive testing ensures your solution works perfectly across all devices and platforms before going live.',
      features: [
        'Quality Assurance',
        'Performance Testing',
        'Security Audit',
        'Deployment',
      ],
      duration: '1-2 weeks',
    },
    {
      step: '05',
      title: 'Launch & Support',
      description:
        'We handle the launch process and provide ongoing support, maintenance, and optimization for continued success.',
      features: [
        'Launch Management',
        'Performance Monitoring',
        'Maintenance',
        'Support',
      ],
      duration: 'Ongoing',
    },
  ]

  return (
    <section className='py-16 sm:py-24 relative'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6'>
            Our{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'>
              Process
            </span>
          </h2>
          <p className='max-w-3xl mx-auto text-gray-400 text-lg'>
            A proven methodology that ensures your project is delivered on time,
            within budget, and exceeds expectations
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className='space-y-8'>
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Step Number */}
              <div className='flex-shrink-0'>
                <div className='relative'>
                  <div className='w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full border-2 border-indigo-500/50 flex items-center justify-center backdrop-blur-sm'>
                    <span className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400'>
                      {step.step}
                    </span>
                  </div>

                  {/* Connector line - hidden on last item */}
                  {index < processSteps.length - 1 && (
                    <div className='absolute top-24 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-indigo-500/50 to-transparent lg:hidden'></div>
                  )}
                </div>
              </div>

              {/* Step Content */}
              <div className='flex-1 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300'>
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4'>
                  <h3 className='text-xl sm:text-2xl font-bold text-white mb-2 lg:mb-0'>
                    {step.title}
                  </h3>
                  <span className='text-sm text-indigo-400 font-medium bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 w-fit'>
                    {step.duration}
                  </span>
                </div>

                <p className='text-gray-400 leading-relaxed mb-6'>
                  {step.description}
                </p>

                {/* Features */}
                <div className='grid grid-cols-2 gap-3'>
                  {step.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className='flex items-center space-x-2'
                    >
                      <CheckCircle className='w-4 h-4 text-green-400 flex-shrink-0' />
                      <span className='text-sm text-gray-300'>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow for desktop - hidden on mobile and last item */}
              {index < processSteps.length - 1 && (
                <div className='hidden lg:block absolute left-1/2 transform -translate-x-1/2 mt-32'>
                  <ArrowRight className='w-6 h-6 text-indigo-400' />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
