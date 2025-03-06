"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const sections = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'team', label: 'Team' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
];

export default function AppBar() {
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Update scrolled state
            setScrolled(window.scrollY > 50);

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

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
                }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-2xl font-bold"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">
                                Fude Developments
                            </span>
                        </motion.div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {sections.map((section) => (
                            <Link
                                key={section.id}
                                href={`#${section.id}`}
                                className={`text-sm font-medium transition-colors ${activeSection === section.id
                                        ? 'text-indigo-400'
                                        : 'text-gray-300 hover:text-white'
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(section.id)?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                    setActiveSection(section.id);
                                }}
                            >
                                {section.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="text-gray-300 hover:text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
} 