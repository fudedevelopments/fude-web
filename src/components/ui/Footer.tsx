'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  ArrowRight,
  Sparkles,
  Code2,
  Brain,
  Rocket,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse gradient effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const getGradientStyle = (isHovered: boolean) => ({
    background: isHovered
      ? `radial-gradient(400px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1), transparent 50%)`
      : 'transparent',
    transition: 'background 0.3s ease',
  });

  const socialLinks = [
    { icon: Github, href: 'https://github.com/fudedevelopments', name: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/fude-dev', name: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/fudedev', name: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/fudedev', name: 'Instagram' }
  ];

  const services = [
    { name: 'AI Development', icon: Brain, href: '/services' },
    { name: 'Web Development', icon: Code2, href: '/services' },
    { name: 'Mobile Apps', icon: Rocket, href: '/services' },
    { name: 'Cloud Solutions', icon: Sparkles, href: '/services' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900/50 to-black border-t border-gray-800/50 backdrop-blur-sm overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Link href="/" className="inline-flex items-center group mb-6">
                  <div className="relative">
                    <Image
                      src="/images/logo/fude-logo.svg"
                      alt="Fude Development Logo"
                      width={48}
                      height={48}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full bg-gray-800/30 p-1 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
                  </div>
                  <span className="ml-3 text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Fude Developments
                  </span>
                </Link>

                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Transforming businesses through AI-powered innovations. We build the future with cutting-edge technology solutions that drive growth and success.
                </p>

                {/* Contact Info */}
                <div className="space-y-4">
                  <motion.a
                    href="mailto:hello@fudedev.com"
                    className="flex items-center group text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <Mail className="w-5 h-5 mr-3 group-hover:text-indigo-400" />
                    <span>hello@fudedev.com</span>
                  </motion.a>
                  <motion.a
                    href="tel:+15551234567"
                    className="flex items-center group text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <Phone className="w-5 h-5 mr-3 group-hover:text-indigo-400" />
                    <span>+1 (555) 123-4567</span>
                  </motion.a>
                  <motion.div
                    className="flex items-center text-gray-400"
                    whileHover={{ x: 5 }}
                  >
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>San Francisco, CA</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Services & Links */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* Services */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold text-white mb-6 relative">
                    Our Services
                    <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                  </h3>
                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <Link key={index} href={service.href}>
                        <motion.div
                          className="group flex items-center p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                          whileHover={{ x: 5, scale: 1.02 }}
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                            <service.icon className="w-5 h-5 text-indigo-400" />
                          </div>
                          <span className="text-gray-400 group-hover:text-white transition-colors duration-300 flex-1">
                            {service.name}
                          </span>
                          <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 transition-colors duration-300" />
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-white mb-6 relative">
                    Quick Links
                    <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Home', href: '/' },
                      { name: 'About Us', href: '/#about' },
                      { name: 'Services', href: '/services' },
                      { name: 'Contact', href: '/#contact' },
                      { name: 'Privacy Policy', href: '/privacy' },
                      { name: 'Terms of Service', href: '/terms' }
                    ].map((link, index) => (
                      <Link key={index} href={link.href}>
                        <motion.div
                          className="group flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/30 transition-all duration-300"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                            {link.name}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800/50 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            
            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center space-x-4"
            >
              <span className="text-gray-400 text-sm font-medium mr-2">Follow us:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    onMouseMove={handleMouseMove}
                  >
                    <div 
                      className="absolute inset-0 rounded-xl"
                      style={getGradientStyle(hoveredSocial === index)}
                    />
                    <social.icon className="w-5 h-5 relative z-10" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center md:text-right"
            >
              <p className="text-gray-500 text-sm">
                © 2025 <span className="text-gray-400 font-medium">Fude Developments</span>. All rights reserved.
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Crafted with <span className="text-red-400">♥</span> and AI-powered innovation
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}

