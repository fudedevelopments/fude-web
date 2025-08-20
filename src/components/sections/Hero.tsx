"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { 
    Sparkles, 
    ArrowRight, 
    Code, 
    Smartphone, 
    Brain, 
    Rocket,
    ChevronDown,
    Play,
    Cpu,
    Zap
} from 'lucide-react';
import Scene from '../3d/Scene';
import HeroModel from '../3d/HeroModel';
import ClientOnly from '../3d/ClientOnly';

// Import our custom typewriter component with performance optimization
const CustomTypewriter = dynamic(() => import('@/components/ui/CustomTypewriter'), { 
    ssr: false,
    loading: () => <div className="h-16 flex items-center justify-center"><div className="animate-pulse bg-gray-700 h-8 w-64 rounded" /></div>
});

// Performance-optimized floating particles component
const FloatingParticles = ({ count = 30 }: { count?: number }) => {
    const particles = useMemo(() => 
        Array.from({ length: count }, (_, i) => ({
            id: i,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 15,
            initialX: Math.random() * 100,
            initialY: Math.random() * 100,
        })), [count]
    );
    
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute w-1 h-1 bg-indigo-500 rounded-full opacity-20"
                    style={{
                        left: `${particle.initialX}%`,
                        top: `${particle.initialY}%`,
                    }}
                    animate={{
                        x: [0, Math.random() * 200 - 100, 0],
                        y: [0, Math.random() * 200 - 100, 0],
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

// AI-powered stats counter with enhanced animations
const AIStatsCounter = ({ number, label, delay, icon: Icon }: { 
    number: number; 
    label: string; 
    delay: number;
    icon: React.ComponentType<any>;
}) => {
    const [count, setCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView && !isAnimating) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                let start = 0;
                const increment = number / 60; // 60 frames for smooth animation
                const counter = setInterval(() => {
                    start += increment;
                    if (start >= number) {
                        setCount(number);
                        clearInterval(counter);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, 16); // ~60fps
                return () => clearInterval(counter);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [isInView, number, delay, isAnimating]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: -15 }}
            animate={isInView ? { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                rotateX: 0 
            } : {}}
            transition={{ 
                duration: 1,
                delay: delay / 1000,
                type: "spring",
                stiffness: 100,
                damping: 15
            }}
            className="relative group perspective-1000"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Holographic base platform */}
            <motion.div 
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent rounded-full blur-sm"
                animate={{
                    scaleX: isHovered ? 1.2 : 1,
                    opacity: isHovered ? 0.8 : 0.4,
                }}
                transition={{ duration: 0.3 }}
            />
            
            {/* Neural connection lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                <motion.div
                    className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-indigo-400/0 via-indigo-400/40 to-indigo-400/0"
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scaleY: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 2 + delay / 500,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-purple-400/0 via-purple-400/40 to-purple-400/0"
                    animate={{
                        opacity: [0.2, 0.6, 0.2],
                        scaleX: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 3 + delay / 300,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                />
            </div>
            
            {/* Multi-layered holographic background */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl blur-xl"
                animate={{
                    scale: isHovered ? 1.1 : 1,
                    opacity: isHovered ? 0.3 : 0.15,
                }}
                transition={{ duration: 0.4 }}
            />
            
            <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-pink-500/5 rounded-3xl blur-lg"
                animate={{
                    scale: isHovered ? 1.05 : 0.95,
                    opacity: isHovered ? 0.25 : 0.1,
                    rotate: isHovered ? 2 : 0,
                }}
                transition={{ duration: 0.5, delay: 0.1 }}
            />
            
            {/* Main card container with enhanced glassmorphism */}
            <motion.div 
                className="relative bg-gray-900/40 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-8 text-center overflow-hidden"
                whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    borderColor: "rgba(99, 102, 241, 0.6)",
                }}
                transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                }}
                style={{
                    background: isHovered 
                        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)'
                        : 'rgba(17, 24, 39, 0.4)',
                }}
            >
                {/* Animated circuit pattern overlay */}
                <div className="absolute inset-0 opacity-20">
                    <motion.div
                        className="absolute top-4 right-4 w-16 h-16"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <svg viewBox="0 0 64 64" className="w-full h-full text-indigo-400/40">
                            <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
                            <circle cx="32" cy="12" r="2" fill="currentColor"/>
                            <circle cx="52" cy="32" r="2" fill="currentColor"/>
                            <circle cx="32" cy="52" r="2" fill="currentColor"/>
                            <circle cx="12" cy="32" r="2" fill="currentColor"/>
                            <line x1="32" y1="12" x2="32" y2="18" stroke="currentColor" strokeWidth="1"/>
                            <line x1="52" y1="32" x2="46" y2="32" stroke="currentColor" strokeWidth="1"/>
                            <line x1="32" y1="52" x2="32" y2="46" stroke="currentColor" strokeWidth="1"/>
                            <line x1="12" y1="32" x2="18" y2="32" stroke="currentColor" strokeWidth="1"/>
                        </svg>
                    </motion.div>
                </div>

                {/* Enhanced Icon with multiple effects */}
                <motion.div
                    className="flex justify-center mb-6"
                    whileHover={{ 
                        scale: 1.15, 
                        rotate: 10,
                    }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 10 
                    }}
                >
                    <div className="relative">
                        {/* Icon glow rings */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-indigo-400/30"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border border-purple-400/20"
                            animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.3
                            }}
                        />
                        
                        {/* Main icon container */}
                        <div className="relative p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-2xl">
                            <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                            
                            {/* Sparkle effects */}
                            <motion.div
                                className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full"
                                animate={{
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: delay / 1000
                                }}
                            />
                            <motion.div
                                className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full"
                                animate={{
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: (delay / 1000) + 0.5
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
                
                {/* Enhanced counter with holographic effect */}
                <motion.div 
                    className="text-5xl sm:text-6xl font-bold mb-4 relative"
                    key={count}
                >
                    <motion.span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            backgroundSize: "200% 100%",
                        }}
                    >
                        {count}+
                    </motion.span>
                    
                    {/* Holographic reflection */}
                    <motion.span
                        className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300/40 via-indigo-300/40 to-purple-300/40 blur-sm"
                        animate={{
                            opacity: isHovered ? 0.6 : 0.3,
                            y: isHovered ? -2 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {count}+
                    </motion.span>
                </motion.div>
                
                {/* Enhanced label with subtle animation */}
                <motion.div 
                    className="text-gray-300 text-sm font-medium tracking-wide relative"
                    animate={{
                        color: isHovered ? "#e5e7eb" : "#9ca3af",
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {label}
                    
                    {/* Underline effect */}
                    <motion.div
                        className="absolute bottom-0 left-1/2 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
                        initial={{ width: 0, x: "-50%" }}
                        animate={{
                            width: isHovered ? "100%" : "0%",
                        }}
                        transition={{ duration: 0.4 }}
                    />
                </motion.div>
                
                {/* Data flow particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                    {Array.from({ length: 3 }, (_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-indigo-400 rounded-full"
                            animate={{
                                x: ["-10px", "100%"],
                                y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                                opacity: [0, 0.8, 0],
                            }}
                            transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                                delay: i * 0.8 + delay / 1000,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>
                
                {/* Pulse effect on animation complete */}
                {isAnimating && count === number && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                            opacity: [0, 0.6, 0], 
                            scale: [0.8, 1.1, 1] 
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                )}
            </motion.div>
        </motion.div>
    );
};

// AI-powered service highlights
const AIServiceHighlight = ({ icon: Icon, title, description, delay }: {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    delay: number;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay, type: "spring" }}
            className="group relative"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl blur-xl group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
            
            <div className="relative bg-gray-800/20 backdrop-blur-sm border border-indigo-500/10 rounded-xl p-4 group-hover:border-indigo-500/30 transition-all duration-300">
                <motion.div
                    className="flex items-center space-x-3"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg group-hover:from-indigo-500/40 group-hover:to-purple-500/40 transition-all duration-300">
                        <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-white text-sm">{title}</h4>
                        <p className="text-gray-400 text-xs">{description}</p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default function Hero() {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentSlogan, setCurrentSlogan] = useState(0);
    const containerRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const modelRotation = useTransform(scrollYProgress, [0, 1], [0, 180]);

    // Performance optimized mouse tracking
    const handleMouseMove = useCallback((e: MouseEvent) => {
        setMousePosition({
            x: (e.clientX / window.innerWidth - 0.5) * 2,
            y: (e.clientY / window.innerHeight - 0.5) * 2,
        });
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    // AI slogans rotation
    const aiSlogans = [
        "Transforming Ideas into Intelligent Solutions",
        "Where Artificial Intelligence Meets Innovation",
        "Building Tomorrow's Technology Today",
        "Empowering Businesses with AI-Driven Excellence"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlogan((prev) => (prev + 1) % aiSlogans.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [aiSlogans.length]);

    return (
        <section 
            ref={containerRef}
            id="home" 
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950/50 to-black"
        >
            {/* Enhanced Dynamic Background with Parallax */}
            <motion.div 
                className="absolute inset-0 z-0"
                style={{ y: backgroundY }}
            >
                {/* Neural Network Grid */}
                <div className="absolute inset-0 opacity-20">
                    <div 
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
                                linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
                            `,
                            backgroundSize: '400px 400px, 400px 400px, 50px 50px, 50px 50px',
                            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`
                        }}
                    />
                </div>

                {/* Floating Particles */}
                <FloatingParticles count={25} />
                
                {/* Digital Rain Effect */}
                <div className="absolute inset-0 opacity-10">
                    {Array.from({ length: 20 }, (_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-px bg-gradient-to-b from-transparent via-indigo-400 to-transparent"
                            style={{
                                left: `${Math.random() * 100}%`,
                                height: `${Math.random() * 200 + 100}px`,
                            }}
                            animate={{
                                y: [-100, window?.innerHeight || 1080],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: "linear",
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Enhanced 3D Model with Mouse Interaction */}
            <motion.div 
                className="absolute inset-0 z-10 pointer-events-none opacity-80"
                style={{
                    rotateY: modelRotation,
                    x: mousePosition.x * 15,
                    y: mousePosition.y * 15,
                }}
            >
                <ClientOnly>
                    <Scene>
                        <HeroModel isHovered={isHovered} />
                    </Scene>
                </ClientOnly>
            </motion.div>

            {/* Main Content with Enhanced Animations */}
            <motion.div 
                className="container mx-auto px-4 sm:px-6 lg:px-8 z-20 relative"
                style={{ y: textY }}
            >
                <div className="max-w-7xl mx-auto">
                    {/* AI-Powered Slogan Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-center mb-8"
                    >
                        <motion.div
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-full px-6 py-3 text-sm"
                            whileHover={{ scale: 1.02 }}
                        >
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            <motion.span 
                                key={currentSlogan}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-gray-300 font-medium"
                            >
                                {aiSlogans[currentSlogan]}
                            </motion.span>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        </motion.div>
                    </motion.div>

                    {/* Main Title with Enhanced Staggered Animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-center mb-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="relative"
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight">
                                <motion.span 
                                    className="block"
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.7 }}
                                >
                                    Crafting
                                </motion.span>
                                <motion.span 
                                    className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.9 }}
                                >
                                    AI-Powered
                                </motion.span>
                                <motion.span 
                                    className="block"
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 1.1 }}
                                >
                                    Digital Experiences
                                </motion.span>
                            </h1>
                            
                            {/* Floating Tech Elements */}
                            <motion.div
                                className="absolute -top-8 -right-4 sm:-right-12 opacity-60"
                                animate={{ 
                                    rotate: 360,
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{ 
                                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 3, repeat: Infinity }
                                }}
                            >
                                <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-indigo-500/30 rounded-full flex items-center justify-center">
                                    <Cpu className="w-8 h-8 text-indigo-400" />
                                </div>
                            </motion.div>
                            
                            <motion.div
                                className="absolute -bottom-4 -left-4 sm:-left-12 opacity-40"
                                animate={{ 
                                    y: [0, -10, 0],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Zap className="w-6 h-6 text-purple-400" />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Enhanced Typewriter Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.3 }}
                            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 h-16 flex items-center justify-center"
                        >
                            <div className="relative">
                                <CustomTypewriter
                                    strings={[
                                        'Building intelligent web applications with cutting-edge AI',
                                        'Developing innovative mobile solutions that adapt and learn',
                                        'Creating automation systems that revolutionize workflows',
                                        'Transforming businesses through artificial intelligence'
                                    ]}
                                    loop={true}
                                    typeSpeed={50}
                                    deleteSpeed={30}
                                    delayBetweenStrings={3000}
                                />
                                
                                {/* Enhanced Glowing Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-2xl -z-10" />
                                <motion.div
                                    className="absolute -left-4 top-1/2 w-1 h-8 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>
                        </motion.div>

                        {/* Service Highlights */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.5 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
                        >
                            <AIServiceHighlight 
                                icon={Code} 
                                title="AI Web Development" 
                                description="Smart, adaptive websites"
                                delay={0.1}
                            />
                            <AIServiceHighlight 
                                icon={Smartphone} 
                                title="Mobile AI Apps" 
                                description="Intelligent mobile solutions"
                                delay={0.2}
                            />
                            <AIServiceHighlight 
                                icon={Brain} 
                                title="Machine Learning" 
                                description="Custom AI algorithms"
                                delay={0.3}
                            />
                            <AIServiceHighlight 
                                icon={Rocket} 
                                title="Automation" 
                                description="Intelligent process automation"
                                delay={0.4}
                            />
                        </motion.div>

                        {/* Enhanced Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.7 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                        >
                            <motion.button
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 25px 50px rgba(99, 102, 241, 0.4)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                onHoverStart={() => setIsHovered(true)}
                                onHoverEnd={() => setIsHovered(false)}
                                className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-medium group min-w-[220px]"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Rocket className="w-5 h-5" />
                                    Start Your AI Journey
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '0%' }}
                                    transition={{ duration: 0.3 }}
                                />
                                
                                {/* Enhanced Glow Effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    animate={{ 
                                        boxShadow: isHovered 
                                            ? "0 0 40px rgba(99, 102, 241, 0.8)" 
                                            : "0 0 20px rgba(99, 102, 241, 0.4)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative overflow-hidden border-2 border-indigo-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-indigo-500/10 transition-colors group min-w-[220px]"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <Play className="w-5 h-5" />
                                    Watch Our Demo
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.div>
                                </span>
                            </motion.button>
                        </motion.div>

                        {/* Enhanced Stats Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.9 }}
                            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
                        >
                            <AIStatsCounter number={100} label="AI Projects Delivered" delay={200} icon={Code} />
                            <AIStatsCounter number={50} label="Happy Clients" delay={400} icon={Sparkles} />
                            <AIStatsCounter number={5} label="Years of Innovation" delay={600} icon={Rocket} />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Enhanced Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.5 }}
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <motion.div
                    className="flex flex-col items-center cursor-pointer group"
                    whileHover={{ scale: 1.1 }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ 
                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <span className="text-gray-400 text-sm mb-2 group-hover:text-indigo-400 transition-colors font-medium">
                        Discover Our AI Solutions
                    </span>
                    <motion.div
                        className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center group-hover:border-indigo-400 transition-colors bg-gray-800/20 backdrop-blur-sm"
                        whileHover={{ borderColor: "#6366F1", backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                    >
                        <motion.div
                            animate={{ 
                                y: [2, 16, 2],
                                opacity: [1, 1, 0]
                            }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                        >
                            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Enhanced Ambient Orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.3, 0.1],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <motion.div
                    className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl"
                    animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.25, 0.1],
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <motion.div
                    className="absolute top-1/2 left-3/4 w-32 h-32 bg-pink-600/10 rounded-full blur-2xl"
                    animate={{ 
                        scale: [1, 1.4, 1],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, -20, 0],
                        y: [0, -60, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </section>
    );
}