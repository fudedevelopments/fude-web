"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Scene from '../3d/Scene';
import ServiceCard from '../3d/ServiceCard';
import ClientOnly from '../3d/ClientOnly';

const services = [
    {
        id: 1,
        title: 'AI-Powered Web Development',
        description: 'We build cutting-edge websites with AI-driven features, personalized user experiences, and intelligent automation.',
        color: '#4F46E5',
        hoverColor: '#6366F1',
        icon: '🌐',
    },
    {
        id: 2,
        title: 'Custom Android App Solutions',
        description: 'Native and cross-platform mobile applications with seamless performance, beautiful UI, and advanced functionality.',
        color: '#10B981',
        hoverColor: '#34D399',
        icon: '📱',
    },
    {
        id: 3,
        title: 'Machine Learning & Automation',
        description: 'Implement ML models to automate processes, analyze data, and create predictive systems for your business.',
        color: '#8B5CF6',
        hoverColor: '#A78BFA',
        icon: '🤖',
    },
    {
        id: 4,
        title: 'Cloud & Backend Development',
        description: 'Scalable, secure, and high-performance backend solutions using modern cloud infrastructure and serverless architecture.',
        color: '#EC4899',
        hoverColor: '#F472B6',
        icon: '☁️',
    },
];

export default function Services() {
    const [selectedService, setSelectedService] = useState<number | null>(null);

    const handleServiceClick = (id: number) => {
        setSelectedService(id === selectedService ? null : id);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section id="services" className="py-24 bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl font-bold text-white mb-4"
                    >
                        Our <span className="text-indigo-500">Services</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-gray-400 text-lg"
                    >
                        We offer a range of AI-powered solutions to help your business thrive in the digital age.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={item}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="h-48 relative">
                                <ClientOnly>
                                    <Scene background="transparent">
                                        <ServiceCard
                                            position={[0, 0, 0]}
                                            title={service.title}
                                            color={service.color}
                                            hoverColor={service.hoverColor}
                                            onClick={() => handleServiceClick(service.id)}
                                        />
                                    </Scene>
                                </ClientOnly>
                            </div>
                            <div className="p-6">
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                <p className="text-gray-400">{service.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
} 