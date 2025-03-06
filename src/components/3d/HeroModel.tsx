"use client";

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroModel({ isHovered }: { isHovered: boolean }) {
    const mesh = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();

    // Animation on mouse move
    useFrame((state) => {
        if (!mesh.current) return;

        // Rotate the mesh
        mesh.current.rotation.x = THREE.MathUtils.lerp(
            mesh.current.rotation.x,
            state.mouse.y * 0.2,
            0.05
        );
        mesh.current.rotation.y = THREE.MathUtils.lerp(
            mesh.current.rotation.y,
            state.mouse.x * 0.2,
            0.05
        );
    });

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.2}
            floatIntensity={2}
            position={[0, 0, 0]}
        >
            <mesh ref={mesh} scale={viewport.width > 5 ? 1.5 : 1}>
                <icosahedronGeometry args={[1.5, 2]} />
                <MeshDistortMaterial
                    color={isHovered ? "#6366F1" : "#4F46E5"}
                    speed={2}
                    distort={0.4}
                    radius={1}
                />
            </mesh>

            {/* Smaller orbiting spheres */}
            <mesh position={[2, 0, 0]}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color="#10B981" />
            </mesh>

            <mesh position={[-1.5, 1, 0]}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial color="#818CF8" />
            </mesh>

            <mesh position={[0, -2, 0]}>
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshStandardMaterial color="#F472B6" />
            </mesh>
        </Float>
    );
} 