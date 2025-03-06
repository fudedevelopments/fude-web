"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// We need to make sure Three.js is properly initialized before loading any components
// that depend on it. This is especially important in Next.js with SSR.

// Create a simple placeholder component for when the 3D components are not loaded
const Placeholder = () => (
    <div className="w-full h-full flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-indigo-600/20 animate-pulse"></div>
    </div>
);

// Dynamically import Three.js components with no SSR and loading fallbacks
const Scene = dynamic(() => import('./Scene'), {
    ssr: false,
    loading: () => <Placeholder />
});

const HeroModel = dynamic(() => import('./HeroModel'), {
    ssr: false,
    loading: () => null
});

const ServiceCard = dynamic(() => import('./ServiceCard'), {
    ssr: false,
    loading: () => null
});

interface ThreeWrapperProps {
    type: 'hero' | 'service' | 'timeline';
    isHovered?: boolean;
    serviceProps?: {
        position: [number, number, number];
        title: string;
        color: string;
        hoverColor: string;
        onClick?: () => void;
    };
    timelineProps?: {
        index: number;
        color: string;
    };
}

export default function ThreeWrapper({
    type,
    isHovered = false,
    serviceProps,
    timelineProps
}: ThreeWrapperProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [isThreeReady, setIsThreeReady] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        // Make sure Three.js is properly initialized
        const checkThree = async () => {
            try {
                // Dynamic import of Three.js to ensure it's loaded
                await import('three');
                setIsThreeReady(true);
            } catch (error) {
                console.error('Failed to load Three.js:', error);
            }
        };

        checkThree();
    }, []);

    // Don't render anything on the server or if the component isn't mounted
    if (!isMounted) {
        return <Placeholder />;
    }

    // Don't render Three.js components until Three.js is ready
    if (!isThreeReady) {
        return <Placeholder />;
    }

    if (type === 'hero') {
        return (
            <Scene>
                <HeroModel isHovered={isHovered} />
            </Scene>
        );
    }

    if (type === 'service' && serviceProps) {
        return (
            <Scene background="transparent">
                <ServiceCard
                    position={serviceProps.position}
                    title={serviceProps.title}
                    color={serviceProps.color}
                    hoverColor={serviceProps.hoverColor}
                    onClick={serviceProps.onClick}
                />
            </Scene>
        );
    }

    if (type === 'timeline' && timelineProps) {
        return (
            <Scene>
                <mesh position={[0, 0, 0]} scale={1}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color={timelineProps.color} />
                </mesh>
            </Scene>
        );
    }

    return <Placeholder />;
} 