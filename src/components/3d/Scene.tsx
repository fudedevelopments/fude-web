"use client";

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Three.js components to ensure they only load on the client
const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), { ssr: false });
const PerspectiveCamera = dynamic(() => import('@react-three/drei').then(mod => mod.PerspectiveCamera), { ssr: false });
const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => mod.OrbitControls), { ssr: false });
const Environment = dynamic(() => import('@react-three/drei').then(mod => mod.Environment), { ssr: false });

interface SceneProps {
    children: React.ReactNode;
    cameraPosition?: [number, number, number];
    background?: string;
    controls?: boolean;
}

export default function Scene({
    children,
    cameraPosition = [0, 0, 5],
    background = 'transparent',
    controls = false
}: SceneProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="w-full h-full">
            <Canvas
                shadows
                gl={{ antialias: true, alpha: true }}
                style={{ background }}
            >
                <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                <Suspense fallback={null}>
                    {children}
                    <Environment preset="city" />
                </Suspense>
                {controls && <OrbitControls enableZoom={false} />}
            </Canvas>
        </div>
    );
} 