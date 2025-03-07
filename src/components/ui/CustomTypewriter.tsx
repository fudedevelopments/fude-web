"use client";

import { useState, useEffect, useRef } from 'react';

interface CustomTypewriterProps {
    strings: string[];
    loop?: boolean;
    typeSpeed?: number;
    deleteSpeed?: number;
    delayBetweenStrings?: number;
    className?: string;
}

export default function CustomTypewriter({
    strings,
    loop = true,
    typeSpeed = 80,
    deleteSpeed = 50,
    delayBetweenStrings = 1500,
    className = ''
}: CustomTypewriterProps) {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentStringIndex, setCurrentStringIndex] = useState(0);
    const [isWaiting, setIsWaiting] = useState(false);

    // Use a ref to track the current timeout
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // If we're waiting, don't do anything
        if (isWaiting) return;

        const currentString = strings[currentStringIndex];

        // Calculate the delay based on whether we're typing or deleting
        const delay = isDeleting
            ? deleteSpeed
            : displayText.length === currentString.length
                ? delayBetweenStrings
                : typeSpeed;

        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new timeout
        timeoutRef.current = setTimeout(() => {
            // If we're at the end of the string and not deleting yet, wait before starting to delete
            if (displayText === currentString && !isDeleting) {
                setIsWaiting(true);
                timeoutRef.current = setTimeout(() => {
                    setIsDeleting(true);
                    setIsWaiting(false);
                }, delayBetweenStrings);
                return;
            }

            // If we're deleting and reached an empty string, move to the next string
            if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setCurrentStringIndex((prevIndex) => {
                    if (prevIndex === strings.length - 1) {
                        return loop ? 0 : prevIndex;
                    }
                    return prevIndex + 1;
                });
                return;
            }

            // Update the display text based on whether we're typing or deleting
            setDisplayText((prevText) => {
                if (isDeleting) {
                    return prevText.substring(0, prevText.length - 1);
                } else {
                    return currentString.substring(0, prevText.length + 1);
                }
            });
        }, delay);

    }, [displayText, isDeleting, currentStringIndex, strings, loop, typeSpeed, deleteSpeed, delayBetweenStrings, isWaiting]);

    return (
        <span className={className}>
            {displayText}
            <span className="animate-blink">|</span>
        </span>
    );
} 