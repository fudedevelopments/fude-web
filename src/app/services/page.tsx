"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Brain, 
  Cloud, 
  Database,
  PenTool,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  Shield,
  Rocket,
  Settings,
  Users,
  TrendingUp,
  Award,
  Star,
  Lightbulb,
  Target,
  ChevronRight,
  Play,
  MessageCircle,
  Calendar,
  Phone
} from 'lucide-react';

// Dynamically import components for performance
const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: false });
const AppBar = dynamic(() => import('@/components/ui/AppBar'), { ssr: false });
const NeuralNetworkBackground = dynamic(() => import('@/components/3d/NeuralNetworkBackground'), { ssr: false });

export default function ServicesPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState<number | null>(null);
  const [hoveredBenefitIndex, setHoveredBenefitIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);

  // Mouse gradient effect handler
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const getCardGradientStyle = (isHovered: boolean) => ({
    background: isHovered
      ? `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15), transparent 40%)`
      : 'transparent',
    transition: 'background 0.3s ease',
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies",
      features: ["React/Next.js", "AI Integration", "Mobile-First Design", "SEO Optimized"],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
      price: "Starting from $2,500",
      timeline: "4-8 weeks"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications",
      features: ["Android/iOS", "React Native", "AI Features", "Cloud Sync"],
      technologies: ["React Native", "Flutter", "Firebase", "AWS", "Redux", "GraphQL"],
      price: "Starting from $5,000",
      timeline: "6-12 weeks"
    },
    {
      icon: Brain,
      title: "AI Solutions",
      description: "Custom artificial intelligence and machine learning solutions",
      features: ["Machine Learning", "Natural Language", "Computer Vision", "Automation"],
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI", "Scikit-learn", "Pandas"],
      price: "Starting from $7,500",
      timeline: "8-16 weeks"
    },
    {
      icon: Cloud,
      title: "Cloud Services",
      description: "Scalable cloud infrastructure and deployment solutions",
      features: ["AWS/GCP", "Auto-scaling", "Security", "Monitoring"],
      technologies: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform", "CI/CD"],
      price: "Starting from $3,000",
      timeline: "2-6 weeks"
    },
    {
      icon: Database,
      title: "Backend Systems",
      description: "Robust server-side architecture and database design",
      features: ["API Development", "Database Design", "Real-time Systems", "Security"],
      technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
      price: "Starting from $4,000",
      timeline: "4-10 weeks"
    },
    {
      icon: PenTool,
      title: "UI/UX Design",
      description: "User-centered design that converts and engages",
      features: ["User Research", "Prototyping", "Design Systems", "Testing"],
      technologies: ["Figma", "Adobe XD", "Sketch", "Framer", "Principle", "InVision"],
      price: "Starting from $2,000",
      timeline: "3-6 weeks"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We dive deep into understanding your business needs, target audience, and project requirements through comprehensive research and planning sessions.",
      features: ["Requirement Analysis", "Market Research", "Technical Planning", "Timeline Creation"],
      duration: "1-2 weeks"
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description: "Our design team creates wireframes, mockups, and interactive prototypes that align with your brand and user experience goals.",
      features: ["UI/UX Design", "Wireframing", "Prototyping", "Design System"],
      duration: "2-3 weeks"
    },
    {
      step: "03",
      title: "Development & Integration",
      description: "Using agile methodologies, we build your solution with clean, scalable code and integrate all necessary third-party services.",
      features: ["Frontend Development", "Backend Development", "API Integration", "Testing"],
      duration: "4-8 weeks"
    },
    {
      step: "04",
      title: "Testing & Deployment",
      description: "Comprehensive testing ensures your solution works perfectly across all devices and platforms before going live.",
      features: ["Quality Assurance", "Performance Testing", "Security Audit", "Deployment"],
      duration: "1-2 weeks"
    },
    {
      step: "05",
      title: "Launch & Support",
      description: "We handle the launch process and provide ongoing support, maintenance, and optimization for continued success.",
      features: ["Launch Management", "Performance Monitoring", "Maintenance", "Support"],
      duration: "Ongoing"
    }
  ];

  return (
    <>
      {/* Neural Network Background */}
      <div
        className="fixed inset-0"
        style={{
          zIndex: 0,
          background: 'linear-gradient(to bottom, #000000, #050510, #050510, #000000)'
        }}
      >
        {isMounted && <NeuralNetworkBackground />}
      </div>

      {/* App Bar */}
      <AppBar />

      {/* Main content */}
      <div className="relative" style={{ zIndex: 10 }}>
        
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Services</span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed">
                  Comprehensive AI-powered solutions to transform your business and drive innovation
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center"
                >
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-indigo-500 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-indigo-500/10 transition-all duration-300 flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-8"
              >
                {[
                  { label: "Projects Delivered", value: "50+", icon: Award },
                  { label: "Happy Clients", value: "30+", icon: Users },
                  { label: "Technologies", value: "20+", icon: Settings },
                  { label: "Success Rate", value: "98%", icon: TrendingUp }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 sm:py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Offer</span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-400 text-lg">
                From concept to deployment, we provide end-to-end solutions tailored to your specific needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:border-indigo-500/50 transition-all duration-300 overflow-hidden"
                  onMouseEnter={() => setHoveredServiceIndex(index)}
                  onMouseLeave={() => setHoveredServiceIndex(null)}
                  onMouseMove={handleCardMouseMove}
                >
                  <div 
                    className="absolute inset-0 rounded-3xl"
                    style={getCardGradientStyle(hoveredServiceIndex === index)}
                  />
                  <div className="relative z-10 flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-400 mb-4 leading-relaxed">{service.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-white mb-3">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-300">
                              <CheckCircle className="w-4 h-4 text-indigo-400 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-white mb-3">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-xs border border-indigo-500/20">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-lg font-bold text-indigo-400">{service.price}</div>
                          <div className="text-sm text-gray-500">{service.timeline}</div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center"
                        >
                          Get Quote
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 sm:py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Process</span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-400 text-lg">
                A proven methodology that ensures successful project delivery from start to finish
              </p>
            </motion.div>

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:space-x-12 space-y-8 lg:space-y-0`}
                >
                  <div className="flex-1 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {step.step}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    </div>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed">{step.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-300">
                          <Zap className="w-4 h-4 text-indigo-400 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-sm text-indigo-400 font-semibold">
                      Duration: {step.duration}
                    </div>
                  </div>
                  
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center border-4 border-indigo-500/30">
                    <div className="w-4 h-4 bg-indigo-400 rounded-full animate-pulse"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 sm:py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Fude Dev</span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-400 text-lg">
                We deliver exceptional results through innovation, expertise, and unwavering commitment to your success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Lightbulb,
                  title: "Innovation First",
                  description: "We leverage cutting-edge technologies and methodologies to give you a competitive advantage in your market."
                },
                {
                  icon: Shield,
                  title: "Quality Assurance",
                  description: "Rigorous testing and quality control processes ensure reliable, secure, and scalable solutions."
                },
                {
                  icon: Target,
                  title: "Results-Driven",
                  description: "Every project is focused on delivering measurable business outcomes and ROI for our clients."
                },
                {
                  icon: Users,
                  title: "Expert Team",
                  description: "Our experienced developers and designers bring deep expertise across multiple technologies."
                },
                {
                  icon: Rocket,
                  title: "Fast Delivery",
                  description: "Agile development processes and efficient workflows ensure timely project completion."
                },
                {
                  icon: Globe,
                  title: "24/7 Support",
                  description: "Comprehensive support and maintenance services to keep your solutions running smoothly."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300 text-center overflow-hidden"
                  onMouseEnter={() => setHoveredBenefitIndex(index)}
                  onMouseLeave={() => setHoveredBenefitIndex(null)}
                  onMouseMove={handleCardMouseMove}
                >
                  <div 
                    className="absolute inset-0 rounded-2xl"
                    style={getCardGradientStyle(hoveredBenefitIndex === index)}
                  />
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                    <benefit.icon className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h3 className="relative z-10 text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="relative z-10 text-gray-400 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl p-12 border border-indigo-500/20"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Project?</span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-8">
                Let&apos;s discuss your requirements and create something amazing together. Get a free consultation today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Free Quote
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-indigo-500 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-indigo-500/10 transition-all duration-300 flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Call
                </motion.button>
              </div>
              
              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-gray-700/50 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +1 (555) 123-4567
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  hello@fudedev.com
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
