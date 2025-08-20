"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { 
    Home, 
    Zap, 
    Users, 
    Briefcase, 
    Mail,
    Brain,
    Menu,
    X
} from 'lucide-react';

const sections = [
    { id: 'home', label: 'Home', Icon: Home, href: '/' },
    { id: 'about', label: 'About Us', Icon: Users, href: '/aboutus' },
    { id: 'services', label: 'Services', Icon: Zap, href: '/services' },
    { id: 'contact', label: 'Contact', Icon: Mail, href: '/contactus' }
];

export default function AppBar() {
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Set active section based on current pathname
        if (pathname === '/') {
            setActiveSection('home');
        } else if (pathname === '/aboutus') {
            setActiveSection('about');
        } else if (pathname === '/services') {
            setActiveSection('services');
        } else if (pathname === '/contactus') {
            setActiveSection('contact');
        } else {
            setActiveSection('home');
        }
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            // Update scrolled state
            setScrolled(window.scrollY > 20);

            // Find active section based on scroll position
            const sectionElements = sections.map(section => ({
                id: section.id,
                element: document.getElementById(section.id)
            })).filter(section => section.element);

            if (sectionElements.length > 0) {
                const currentPosition = window.scrollY + 100;

                for (let i = sectionElements.length - 1; i >= 0; i--) {
                    const section = sectionElements[i];
                    if (section.element && section.element.offsetTop <= currentPosition) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSectionClick = (sectionId: string, href: string) => {
        if (href.startsWith('/')) {
            // Navigate to different page
            router.push(href);
            setActiveSection(sectionId);
            setMobileMenuOpen(false);
        } else {
            // Scroll to section on current page
            document.getElementById(sectionId)?.scrollIntoView({
                behavior: 'smooth'
            });
            setActiveSection(sectionId);
            setMobileMenuOpen(false);
        }
    };

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled 
                        ? 'bg-gray-900/95 backdrop-blur-xl border-b border-indigo-500/20 shadow-2xl shadow-indigo-500/10' 
                        : 'bg-transparent'
                }`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Ambient glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-purple-600/5 to-pink-600/5 opacity-50" />
                
                {/* Neural network pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-400 to-transparent" />
                    <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent" />
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />
                </div>

                <div className="container mx-auto px-3 sm:px-4 lg:px-8 relative">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        {/* Logo Section */}
                        <Link href="/" className="flex items-center group">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative"
                            >
                                {/* Logo glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                                
                                <div className="relative flex items-center space-x-2 sm:space-x-3 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-indigo-500/20">
                                    {/* Fude Logo */}
                                    <motion.div
                                        animate={{ 
                                            scale: [1, 1.05, 1],
                                        }}
                                        transition={{ 
                                            duration: 3, 
                                            repeat: Infinity, 
                                            ease: "easeInOut" 
                                        }}
                                        className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center"
                                    >
                                        <div className="relative">
                                            <Image
                                                src="/images/logo/fude-logo.svg"
                                                alt="Fude Logo"
                                                width={24}
                                                height={24}
                                                className="w-5 h-5 sm:w-6 sm:h-6 object-cover rounded-full bg-gray-800/30 p-0.5"
                                            />
                                            {/* Subtle glow effect */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-sm"
                                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        </div>
                                    </motion.div>
                                    
                                    {/* Company Name with Responsive Text */}
                                    <div className="flex flex-col">
                                        <span className="hidden sm:block text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                            Fude Developments
                                        </span>
                                        <span className="sm:hidden text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                            Fude Dev
                                        </span>
                                        <motion.div
                                            className="hidden sm:block h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-2">
                            {sections.map((section, index) => (
                                <motion.div
                                    key={section.id}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <button
                                        onClick={() => handleSectionClick(section.id, section.href)}
                                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                                            activeSection === section.id
                                                ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600'
                                                : 'text-gray-300 hover:text-white hover:bg-indigo-500/10'
                                        }`}
                                    >
                                        {/* Active section glow */}
                                        {activeSection === section.id && (
                                            <motion.div
                                                layoutId="activeSection"
                                                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        
                                        {/* Hover glow effect */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        
                                        <span className="relative flex items-center space-x-2">
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                            >
                                                <section.Icon className="w-4 h-4" />
                                            </motion.div>
                                            <span>{section.label}</span>
                                        </span>
                                        
                                        {/* Floating indicator */}
                                        {activeSection === section.id && (
                                            <motion.div
                                                className="absolute -bottom-6 left-1/2 w-1 h-1 bg-indigo-400 rounded-full"
                                                initial={{ scale: 0, x: "-50%" }}
                                                animate={{ scale: 1, x: "-50%" }}
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                    </button>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden relative p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-indigo-500/20 text-gray-300 hover:text-white transition-colors duration-300"
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                initial={false}
                                animate={mobileMenuOpen ? "open" : "closed"}
                                className="w-6 h-6 flex items-center justify-center"
                            >
                                {mobileMenuOpen ? (
                                    <motion.div
                                        initial={{ rotate: 0, opacity: 0 }}
                                        animate={{ rotate: 180, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ rotate: 180, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Menu className="w-5 h-5" />
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed top-16 left-0 right-0 z-40 md:hidden"
                    >
                        <div className="bg-gray-900/95 backdrop-blur-xl border-b border-indigo-500/20 shadow-2xl">
                            {/* Neural network pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-indigo-400 to-purple-400" />
                                <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-purple-400 to-pink-400" />
                            </div>
                            
                            <nav className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 relative">
                                <div className="grid grid-cols-1 gap-1 sm:gap-2">
                                    {sections.map((section, index) => (
                                        <motion.button
                                            key={section.id}
                                            onClick={() => handleSectionClick(section.id, section.href)}
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            className={`relative p-3 sm:p-4 rounded-xl text-left transition-all duration-300 group ${
                                                activeSection === section.id
                                                    ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-white border border-indigo-500/30'
                                                    : 'text-gray-300 hover:bg-indigo-500/10 hover:text-white'
                                            }`}
                                        >
                                            {/* Active indicator */}
                                            {activeSection === section.id && (
                                                <motion.div
                                                    className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-r-full"
                                                    initial={{ scaleY: 0, y: "-50%" }}
                                                    animate={{ scaleY: 1, y: "-50%" }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                />
                                            )}
                                            
                                            <div className="flex items-center space-x-3 sm:space-x-4">
                                                <motion.div 
                                                    className="text-indigo-400 p-1.5 sm:p-2 rounded-lg bg-indigo-500/10"
                                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                >
                                                    <section.Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </motion.div>
                                                <div>
                                                    <span className="font-medium text-base sm:text-lg">{section.label}</span>
                                                    <div className="text-xs text-gray-400 mt-0.5 sm:mt-1">
                                                        Navigate to {section.label.toLowerCase()}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Hover glow effect */}
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </motion.button>
                                    ))}
                                </div>
                                
                                {/* Decorative elements */}
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                                    <motion.div
                                        className="w-12 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: 48 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    />
                                </div>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
} 