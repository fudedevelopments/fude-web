"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const projects = [
    {
        id: 1,
        title: 'AI-Powered E-commerce Platform',
        category: 'Web Development',
        description: 'A cutting-edge e-commerce platform with AI-driven product recommendations and personalized user experiences.',
        image: '/project1.jpg',
        technologies: ['React', 'Node.js', 'TensorFlow', 'MongoDB'],
    },
    {
        id: 2,
        title: 'Smart Home Control App',
        category: 'Android App',
        description: 'A mobile application for controlling smart home devices with voice commands and automated routines.',
        image: '/project2.jpg',
        technologies: ['Kotlin', 'Firebase', 'TensorFlow Lite', 'MQTT'],
    },
    {
        id: 3,
        title: 'Predictive Analytics Dashboard',
        category: 'Machine Learning',
        description: 'A data visualization dashboard with predictive analytics for business intelligence and decision making.',
        image: '/project3.jpg',
        technologies: ['Python', 'React', 'Scikit-learn', 'D3.js'],
    },
    {
        id: 4,
        title: 'Cloud-Based CRM System',
        category: 'Cloud Development',
        description: 'A scalable customer relationship management system with AI-powered insights and automation.',
        image: '/project4.jpg',
        technologies: ['Next.js', 'AWS', 'GraphQL', 'PostgreSQL'],
    },
    {
        id: 5,
        title: 'Real-time Collaboration Tool',
        category: 'Web Development',
        description: 'A real-time collaboration platform for teams with AI-assisted content creation and editing.',
        image: '/project5.jpg',
        technologies: ['Vue.js', 'WebSockets', 'Express', 'Redis'],
    },
    {
        id: 6,
        title: 'Health Monitoring Application',
        category: 'Android App',
        description: 'A health tracking application with AI-powered insights and personalized recommendations.',
        image: '/project6.jpg',
        technologies: ['Flutter', 'TensorFlow', 'Firebase', 'SQLite'],
    },
];

// For demo purposes, we'll use placeholder images
// In a real project, you would have actual project images
const placeholderImages = [
    'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=AI+E-commerce',
    'https://via.placeholder.com/600x400/10B981/FFFFFF?text=Smart+Home+App',
    'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Analytics+Dashboard',
    'https://via.placeholder.com/600x400/EC4899/FFFFFF?text=Cloud+CRM',
    'https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Collaboration+Tool',
    'https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Health+App',
];

export default function Portfolio() {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(project => project.category === filter);

    const categories = ['All', ...new Set(projects.map(project => project.category))];

    return (
        <section id="portfolio" className="py-24 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl font-bold text-white mb-4"
                    >
                        Our <span className="text-indigo-500">Portfolio</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-gray-400 text-lg"
                    >
                        Explore our latest projects and see how we&apos;ve helped businesses transform with AI-powered technology.
                    </motion.p>
                </div>

                {/* Filter buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilter(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${filter === category
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>

                {/* Projects grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    layout
                >
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{
                                    z: 20,
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                className="bg-gray-800 rounded-xl overflow-hidden shadow-xl cursor-pointer"
                                onClick={() => setSelectedProject(project.id)}
                            >
                                <div className="relative h-60">
                                    <Image
                                        src={placeholderImages[index % placeholderImages.length]}
                                        alt={project.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-500 hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-full mb-2">
                                            {project.category}
                                        </span>
                                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Project modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedProject(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-gray-800 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {(() => {
                                    const project = projects.find(p => p.id === selectedProject);
                                    if (!project) return null;

                                    const imageIndex = (project.id - 1) % placeholderImages.length;

                                    return (
                                        <>
                                            <div className="relative h-80">
                                                <Image
                                                    src={placeholderImages[imageIndex]}
                                                    alt={project.title}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div className="p-8">
                                                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                                <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-full mb-4">
                                                    {project.category}
                                                </span>
                                                <p className="text-gray-300 mb-6">{project.description}</p>
                                                <div className="mb-6">
                                                    <h4 className="text-lg font-semibold text-white mb-2">Technologies Used:</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.technologies.map((tech) => (
                                                            <span key={tech} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <button
                                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
                                                    onClick={() => setSelectedProject(null)}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </>
                                    );
                                })()}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
} 