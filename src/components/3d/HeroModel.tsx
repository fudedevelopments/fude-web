"use client";

import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Ring, Text, Line } from '@react-three/drei';
import * as THREE from 'three';

// AI Neural Network Node Component
const AINode = ({ position, color, size = 0.1, delay = 0 }: { 
    position: [number, number, number]; 
    color: string; 
    size?: number; 
    delay?: number;
}) => {
    const nodeRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!nodeRef.current) return;
        
        const time = state.clock.getElapsedTime();
        nodeRef.current.scale.setScalar(
            size + Math.sin(time * 2 + delay) * 0.02
        );
        
        // Pulsing glow effect
        if (nodeRef.current.material instanceof THREE.MeshStandardMaterial) {
            nodeRef.current.material.emissiveIntensity = 0.3 + Math.sin(time * 3 + delay) * 0.2;
        }
    });

    return (
        <mesh ref={nodeRef} position={position}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial 
                color={color} 
                emissive={color} 
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
            />
        </mesh>
    );
};

// AI Connection Line Component
const AIConnection = ({ start, end, color = "#6366F1", opacity = 0.6 }: {
    start: [number, number, number];
    end: [number, number, number];
    color?: string;
    opacity?: number;
}) => {
    const lineRef = useRef<any>(null);

    useFrame((state) => {
        if (!lineRef.current) return;
        
        const time = state.clock.getElapsedTime();
        if (lineRef.current.material) {
            lineRef.current.material.opacity = opacity + Math.sin(time * 4) * 0.2;
        }
    });

    const points = useMemo(() => [
        new THREE.Vector3(...start),
        new THREE.Vector3(...end)
    ], [start, end]);

    return (
        <Line
            ref={lineRef}
            points={points}
            color={color}
            lineWidth={2}
            transparent
            opacity={opacity}
        />
    );
};

// Holographic Ring Component
const HolographicRing = ({ radius, position, color, rotationSpeed = 1 }: {
    radius: number;
    position: [number, number, number];
    color: string;
    rotationSpeed?: number;
}) => {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!ringRef.current) return;
        
        const time = state.clock.getElapsedTime();
        ringRef.current.rotation.z = time * rotationSpeed;
        
        // Pulsing effect
        if (ringRef.current.material instanceof THREE.MeshBasicMaterial) {
            ringRef.current.material.opacity = 0.3 + Math.sin(time * 2) * 0.2;
        }
    });

    return (
        <mesh ref={ringRef} position={position} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius, radius + 0.02, 64]} />
            <meshBasicMaterial 
                color={color} 
                transparent 
                opacity={0.3}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

// Data Particle Component
const DataParticle = ({ position, targetPosition, speed = 1, color = "#10B981" }: {
    position: [number, number, number];
    targetPosition: [number, number, number];
    speed?: number;
    color?: string;
}) => {
    const particleRef = useRef<THREE.Mesh>(null);
    const progress = useRef(0);

    useFrame((state, delta) => {
        if (!particleRef.current) return;
        
        progress.current += delta * speed;
        
        if (progress.current > 1) {
            progress.current = 0;
        }
        
        // Interpolate between start and end position
        const t = progress.current;
        const x = position[0] + (targetPosition[0] - position[0]) * t;
        const y = position[1] + (targetPosition[1] - position[1]) * t;
        const z = position[2] + (targetPosition[2] - position[2]) * t;
        
        particleRef.current.position.set(x, y, z);
        
        // Fade effect
        if (particleRef.current.material instanceof THREE.MeshBasicMaterial) {
            particleRef.current.material.opacity = Math.sin(t * Math.PI);
        }
    });

    return (
        <mesh ref={particleRef}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial 
                color={color} 
                transparent 
                opacity={0.8}
            />
        </mesh>
    );
};

export default function HeroModel({ isHovered }: { isHovered: boolean }) {
    const centralCoreRef = useRef<THREE.Mesh>(null);
    const outerRingRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();
    
    // Responsive scaling based on viewport
    const scale = useMemo(() => {
        if (viewport.width > 8) return 1.2;
        if (viewport.width > 5) return 1;
        return 0.7;
    }, [viewport.width]);

    // AI Neural Network Node positions
    const neuralNodes = useMemo(() => [
        // Inner ring nodes
        { pos: [1.5, 0, 0] as [number, number, number], color: "#6366F1", size: 0.08 },
        { pos: [-1.5, 0, 0] as [number, number, number], color: "#8B5CF6", size: 0.08 },
        { pos: [0, 1.5, 0] as [number, number, number], color: "#10B981", size: 0.08 },
        { pos: [0, -1.5, 0] as [number, number, number], color: "#F59E0B", size: 0.08 },
        
        // Outer ring nodes
        { pos: [2.5, 1, 0.5] as [number, number, number], color: "#EF4444", size: 0.06 },
        { pos: [-2.5, -1, -0.5] as [number, number, number], color: "#06B6D4", size: 0.06 },
        { pos: [1, 2.5, 0] as [number, number, number], color: "#F472B6", size: 0.06 },
        { pos: [-1, -2.5, 0] as [number, number, number], color: "#A78BFA", size: 0.06 },
    ], []);

    // AI Connection lines between nodes
    const connections = useMemo(() => [
        { start: [0, 0, 0] as [number, number, number], end: [1.5, 0, 0] as [number, number, number], color: "#6366F1" },
        { start: [0, 0, 0] as [number, number, number], end: [-1.5, 0, 0] as [number, number, number], color: "#8B5CF6" },
        { start: [0, 0, 0] as [number, number, number], end: [0, 1.5, 0] as [number, number, number], color: "#10B981" },
        { start: [0, 0, 0] as [number, number, number], end: [0, -1.5, 0] as [number, number, number], color: "#F59E0B" },
        
        // Inter-node connections
        { start: [1.5, 0, 0] as [number, number, number], end: [0, 1.5, 0] as [number, number, number], color: "#6366F1", opacity: 0.3 },
        { start: [-1.5, 0, 0] as [number, number, number], end: [0, -1.5, 0] as [number, number, number], color: "#8B5CF6", opacity: 0.3 },
    ], []);

    // Data particles flowing through the network
    const dataParticles = useMemo(() => [
        { start: [0, 0, 0] as [number, number, number], end: [1.5, 0, 0] as [number, number, number], speed: 0.5, color: "#6366F1" },
        { start: [1.5, 0, 0] as [number, number, number], end: [0, 1.5, 0] as [number, number, number], speed: 0.7, color: "#10B981" },
        { start: [0, 1.5, 0] as [number, number, number], end: [-1.5, 0, 0] as [number, number, number], speed: 0.6, color: "#8B5CF6" },
        { start: [-1.5, 0, 0] as [number, number, number], end: [0, -1.5, 0] as [number, number, number], speed: 0.8, color: "#F59E0B" },
    ], []);

    // Animation loop for the central core and outer elements
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        
        // Animate central core
        if (centralCoreRef.current) {
            // Smooth mouse interaction
            centralCoreRef.current.rotation.x = THREE.MathUtils.lerp(
                centralCoreRef.current.rotation.x,
                state.mouse.y * 0.15,
                0.03
            );
            centralCoreRef.current.rotation.y = THREE.MathUtils.lerp(
                centralCoreRef.current.rotation.y,
                state.mouse.x * 0.15 + time * 0.2,
                0.03
            );
            
            // Hovering effect
            const targetScale = isHovered ? 1.1 : 1;
            centralCoreRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                0.05
            );
        }
        
        // Animate outer ring group
        if (outerRingRef.current) {
            outerRingRef.current.rotation.z = time * 0.1;
            outerRingRef.current.rotation.y = time * 0.05;
        }
    });

    return (
        <Float
            speed={1}
            rotationIntensity={0.1}
            floatIntensity={1}
            position={[0, 0, 0]}
        >
            <group scale={scale}>
                {/* Central AI Core - Main focal point */}
                <mesh ref={centralCoreRef}>
                    <icosahedronGeometry args={[0.8, 3]} />
                    <MeshDistortMaterial
                        color={isHovered ? "#6366F1" : "#4F46E5"}
                        speed={isHovered ? 3 : 1.5}
                        distort={isHovered ? 0.6 : 0.3}
                        radius={1}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>

                {/* Holographic Rings */}
                <group ref={outerRingRef}>
                    <HolographicRing radius={2} position={[0, 0, 0]} color="#6366F1" rotationSpeed={0.5} />
                    <HolographicRing radius={2.5} position={[0, 0, 0]} color="#8B5CF6" rotationSpeed={-0.3} />
                    <HolographicRing radius={3} position={[0, 0, 0]} color="#10B981" rotationSpeed={0.2} />
                </group>

                {/* AI Neural Network Nodes */}
                {neuralNodes.map((node, index) => (
                    <AINode
                        key={`node-${index}`}
                        position={node.pos}
                        color={node.color}
                        size={node.size}
                        delay={index * 0.5}
                    />
                ))}

                {/* AI Connection Lines */}
                {connections.map((connection, index) => (
                    <AIConnection
                        key={`connection-${index}`}
                        start={connection.start}
                        end={connection.end}
                        color={connection.color}
                        opacity={connection.opacity || 0.6}
                    />
                ))}

                {/* Data Particles flowing through network */}
                {dataParticles.map((particle, index) => (
                    <DataParticle
                        key={`particle-${index}`}
                        position={particle.start}
                        targetPosition={particle.end}
                        speed={particle.speed}
                        color={particle.color}
                    />
                ))}

                {/* Ambient Light Enhancement */}
                <pointLight 
                    position={[0, 0, 2]} 
                    intensity={isHovered ? 0.8 : 0.5} 
                    color="#6366F1" 
                    distance={10}
                />
                
                {/* Secondary Accent Light */}
                <pointLight 
                    position={[2, 2, -2]} 
                    intensity={0.3} 
                    color="#8B5CF6" 
                    distance={8}
                />
                
                {/* Rim Light */}
                <pointLight 
                    position={[-2, -2, 2]} 
                    intensity={0.2} 
                    color="#10B981" 
                    distance={6}
                />
            </group>
        </Float>
    );
} 