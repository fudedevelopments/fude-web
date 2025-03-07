"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Scene from '../3d/Scene';
import { useInView } from 'framer-motion';
import ClientOnly from '../3d/ClientOnly';

const milestones = [
    {
        year: 2020,
        title: 'Company Founded',
        description: 'Fude Development was established with a vision to create AI-powered solutions for businesses.',
    },
    {
        year: 2021,
        title: 'First Major Project',
        description: 'Launched our first AI-driven e-commerce platform, setting the foundation for our future work.',
    },
    {
        year: 2022,
        title: 'Team Expansion',
        description: 'Grew our team of experts in AI, mobile development, and cloud infrastructure.',
    },
    {
        year: 2023,
        title: 'Innovation Award',
        description: 'Received recognition for our innovative approach to AI integration in web and mobile applications.',
    },
    {
        year: 2024,
        title: 'Global Reach',
        description: 'Expanded our services to international clients, bringing AI-powered solutions to businesses worldwide.',
    },
    {
        year: 2025,
        title: 'Future Vision',
        description: 'Continuing to push the boundaries of what&apos;s possible with AI-driven development.',
    },
];

function TimelineSphere({ index }: { index: number }) {
    const colors = ['#4F46E5', '#10B981', '#8B5CF6', '#EC4899', '#F59E0B', '#3B82F6'];
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <div ref={ref} className="w-20 h-20 relative">
            <ClientOnly>
                <Scene>
                    <mesh position={[0, 0, 0]} scale={isInView ? 1 : 0}>
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshStandardMaterial color={colors[index % colors.length]} />
                    </mesh>
                </Scene>
            </ClientOnly>
        </div>
    );
}

export default function About() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

    return (
        <section id="about" className="py-24 bg-gray-900 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl font-bold text-white mb-4"
                    >
                        About <span className="text-indigo-500">Us</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-gray-400 text-lg"
                    >
                        Fude Development is a team of experts pushing the boundaries of AI-driven development.
                    </motion.p>
                </div>

                <motion.div
                    ref={containerRef}
                    style={{ opacity, y }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"></div>

                        {/* Timeline items */}
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative mb-16 flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                                    }`}
                            >
                                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                                    <h3 className="text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-full mb-2">
                                        {milestone.year}
                                    </span>
                                    <p className="text-gray-400">{milestone.description}</p>
                                </div>

                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                    <TimelineSphere index={index} />
                                </div>

                                <div className="w-1/2"></div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-24 max-w-3xl mx-auto text-center"
                >
                    <h3 className="text-2xl font-bold text-white mb-6">Our Vision</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        At Fude Development, we believe in harnessing the power of artificial intelligence to create innovative solutions that transform businesses and enhance user experiences. Our team of passionate developers, designers, and AI specialists work together to push the boundaries of what&apos;s possible in the digital world.
                    </p>
                </motion.div>
            </div>
        </section>
    );
} 