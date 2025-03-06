"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThree, Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Robot head model
function RobotHead() {
    // Simple robot head using Three.js primitives
    return (
        <group>
            {/* Head */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#6366F1" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Eyes */}
            <mesh position={[0.25, 0.2, 0.51]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[-0.25, 0.2, 0.51]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.5} />
            </mesh>

            {/* Antenna */}
            <mesh position={[0, 0.7, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
                <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.9, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#FF0066" emissive="#FF0066" emissiveIntensity={0.5} />
            </mesh>

            {/* Mouth */}
            <mesh position={[0, -0.2, 0.51]}>
                <boxGeometry args={[0.5, 0.1, 0.1]} />
                <meshStandardMaterial color="#444" />
            </mesh>
        </group>
    );
}

// Scene setup
function ChatbotScene() {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(0, 0, 3);
    }, [camera]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <RobotHead />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={2}
                minPolarAngle={Math.PI / 2 - 0.5}
                maxPolarAngle={Math.PI / 2 + 0.5}
            />
        </>
    );
}

export default function ThreeChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string, sender: 'bot' | 'user' }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [showChatbot, setShowChatbot] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Bot responses
    const botResponses = [
        "I'm an AI assistant powered by advanced neural networks!",
        "I can help you learn about our AI development services.",
        "Our team specializes in creating custom AI solutions for businesses.",
        "Would you like to know more about our machine learning capabilities?",
        "We've developed AI systems for various industries including healthcare, finance, and retail.",
        "Our neural networks are trained on vast datasets to provide accurate insights.",
        "I'm constantly learning and improving through each interaction!",
        "Did you know we also develop computer vision solutions?",
        "Our natural language processing models can analyze text in multiple languages.",
        "We can build custom chatbots like me for your business!"
    ];

    // Show chatbot after a delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChatbot(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Add initial message
    useEffect(() => {
        if (showChatbot) {
            setMessages([
                {
                    text: "Hi there! 👋 I'm your AI assistant. How can I help you learn about our AI development services?",
                    sender: 'bot'
                }
            ]);
        }
    }, [showChatbot]);

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputValue.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
        setInputValue('');

        // Add bot response after a delay
        setTimeout(() => {
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            setMessages(prev => [...prev, { text: randomResponse, sender: 'bot' }]);
        }, 1000);
    };

    if (!showChatbot) return null;

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="mb-4 w-80 h-96 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-900/90 to-purple-900/90 backdrop-blur-md border border-indigo-500/30"
                    >
                        {/* Chat header */}
                        <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
                            <h3 className="font-bold">AI Assistant</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-gray-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Messages container */}
                        <div className="p-4 h-64 overflow-y-auto">
                            <AnimatePresence>
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className={`mb-3 ${message.sender === 'user'
                                                ? 'ml-auto bg-indigo-600 text-white'
                                                : 'mr-auto bg-gray-800/60 text-gray-100'
                                            } p-3 rounded-xl max-w-[80%]`}
                                    >
                                        {message.text}
                                    </motion.div>
                                ))}
                                <div ref={messagesEndRef} />
                            </AnimatePresence>
                        </div>

                        {/* Input form */}
                        <form onSubmit={handleSubmit} className="p-3 border-t border-gray-700">
                            <div className="flex">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask me anything..."
                                    className="flex-1 bg-gray-800/60 text-white p-2 rounded-l-lg focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white p-2 rounded-r-lg hover:bg-indigo-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chatbot button with 3D robot */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg flex items-center justify-center relative overflow-hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                    boxShadow: isOpen
                        ? "0 0 0 rgba(99, 102, 241, 0)"
                        : "0 0 20px rgba(99, 102, 241, 0.7)"
                }}
                transition={{
                    boxShadow: {
                        repeat: isOpen ? 0 : Infinity,
                        repeatType: "reverse",
                        duration: 1.5
                    }
                }}
            >
                <div className="w-full h-full">
                    <Canvas>
                        <ChatbotScene />
                    </Canvas>
                </div>

                {/* Notification dot */}
                {!isOpen && (
                    <motion.div
                        className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                )}
            </motion.button>
        </div>
    );
} 