"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimatedChatbot() {
    const [isVisible, setIsVisible] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi there! 👋 Need help with AI solutions?' }
    ]);
    const [userInput, setUserInput] = useState('');

    // Show chatbot after a delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { sender: 'user', text: userInput }]);
        setUserInput('');

        // Simulate bot response
        setTimeout(() => {
            const botResponses = [
                "I can help you with AI-powered solutions for your business!",
                "Our team specializes in creating custom AI applications.",
                "That&apos;s a great question! Our AI solutions can help with that.",
                "We have experience in machine learning, natural language processing, and computer vision.",
                "That&apos;s one of our core strengths at Fude Development!",
                "Would you like to schedule a consultation with our team?"
            ];

            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            setMessages(prev => [...prev, { sender: 'bot', text: randomResponse }]);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-5 right-5 z-50">
                    {/* Chat window */}
                    <AnimatePresence>
                        {isChatOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                className="mb-4 w-80 bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-indigo-500/30"
                            >
                                {/* Chat header */}
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                                            <span className="text-lg">🤖</span>
                                        </div>
                                        <h3 className="text-white font-medium">AI Assistant</h3>
                                    </div>
                                    <button
                                        onClick={() => setIsChatOpen(false)}
                                        className="text-white hover:text-gray-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Chat messages */}
                                <div className="h-80 overflow-y-auto p-4 flex flex-col space-y-4">
                                    <AnimatePresence>
                                        {messages.map((msg, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user'
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-gray-700 text-gray-200'
                                                        }`}
                                                >
                                                    {msg.text}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Chat input */}
                                <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value={userInput}
                                            onChange={(e) => setUserInput(e.target.value)}
                                            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white"
                                            placeholder="Type your message..."
                                        />
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Chatbot button */}
                    <motion.button
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg relative overflow-hidden"
                    >
                        {/* Robot face */}
                        <div className="relative z-10">
                            {isChatOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <div className="robot-face">
                                    <div className="text-2xl">🤖</div>
                                </div>
                            )}
                        </div>

                        {/* Animated pulse */}
                        <motion.div
                            className="absolute inset-0 bg-white rounded-full"
                            initial={{ scale: 0, opacity: 0.5 }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop"
                            }}
                        />
                    </motion.button>

                    {/* Notification dot */}
                    {!isChatOpen && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white"
                        />
                    )}
                </div>
            )}
        </AnimatePresence>
    );
} 