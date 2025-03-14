"use client";

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';


const TeamMemberCard = dynamic(() => import('@/components/3d/TeamMemberCard'), {
    ssr: false,
    loading: () => <div className="w-full h-[500px] bg-gray-800/50 rounded-xl animate-pulse" />
});

const teamMembers = [
    {
        name: 'Praveen M',
        role: 'CEO & AI Specialist',
        bio: 'With over 10 years of experience in AI and machine learning, Praveen leads our team with a vision to create innovative solutions that transform businesses.',
        image: 'https://images.tanzo.in/assets/praveen',
        socialLinks: {
            twitter: 'https://twitter.com',
            linkedin: 'https://linkedin.com',
            github: 'https://github.com'
        }
    },
    {
        name: 'Paul Earnest J',
        role: 'Lead Web Developer',
        bio: 'Paul specializes in creating cutting-edge web applications with a focus on performance, accessibility, and beautiful user interfaces.',
        image: 'https://images.tanzo.in/assets/paul',
        socialLinks: {
            twitter: 'https://twitter.com',
            linkedin: 'https://linkedin.com',
            github: 'https://github.com'
        }
    },
    {
        name: 'Dinesh Kumar V S',
        role: 'Android Development Lead',
        bio: 'dinesh brings extensive experience in native and cross-platform mobile development, creating seamless and intuitive mobile experiences.',
        image: 'https://images.tanzo.in/assets/dinesh',
        socialLinks: {
            twitter: 'https://twitter.com',
            linkedin: 'https://linkedin.com',
            github: 'https://github.com'
        }
    },
    {
        name: 'Gokul Prasath S',
        role: 'ML Engineer',
        bio: 'Gokul specializes in implementing machine learning models and algorithms that power our AI-driven solutions and automation systems.',
        image: 'https://images.tanzo.in/assets/gokul',
        socialLinks: {
            twitter: 'https://twitter.com',
            linkedin: 'https://linkedin.com',
            github: 'https://github.com'
        }
    }
];

export default function Team() {
    return (
        <section id="team" className="py-24 bg-gray-900 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-gray-900"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl font-bold text-white mb-4"
                    >
                        Our <span className="text-indigo-500">Team</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-gray-400 text-lg"
                    >
                        Meet the experts behind our AI-powered solutions. Our diverse team brings together skills in AI, web development, mobile apps, and cloud infrastructure.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard
                            key={index}
                            name={member.name}
                            role={member.role}
                            bio={member.bio}
                            image={member.image}
                            socialLinks={member.socialLinks}
                            delay={0.1 * index}
                        />
                    ))}
                </div>

                {/* Join our team CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-20 text-center"
                >
                    <h3 className="text-2xl font-bold text-white mb-4">Join Our Team</h3>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        We&apos;re always looking for talented individuals to join our team. If you&apos;re passionate about AI and technology, we&apos;d love to hear from you.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors"
                    >
                        View Open Positions
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
} 