"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ParticleFieldProps {
    count?: number;
    size?: number;
    color?: string;
    speed?: number;
    opacity?: number;
    showLines?: boolean;
}

export default function ParticleField({
    count = 1000,
    size = 2,
    color = '#6366F1',
    speed = 0.2,
    opacity = 0.7,
    showLines = true
}: ParticleFieldProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Store the ref value in a variable to use in cleanup
        const container = containerRef.current;
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 50;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = count;

        const posArray = new Float32Array(particlesCount * 3);
        const velocityArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            // Position
            posArray[i] = (Math.random() - 0.5) * 100;

            // Velocity
            velocityArray[i] = (Math.random() - 0.5) * 0.2 * speed;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocityArray, 3));

        // Material
        const particlesMaterial = new THREE.PointsMaterial({
            size: size * 0.01,
            color: new THREE.Color(color),
            transparent: true,
            opacity: opacity,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        // Create particle system
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Lines for connected particles
        let lineMesh: THREE.LineSegments | null = null;

        if (showLines) {
            // Create lines between particles that are close to each other
            const lineGeometry = new THREE.BufferGeometry();
            const linePositions: number[] = [];
            const lineIndices: number[] = [];

            // Find particles that are close to each other
            const positions = particlesGeometry.attributes.position.array;
            const maxDistance = 10; // Maximum distance for connection
            let lineIndex = 0;

            for (let i = 0; i < particlesCount; i++) {
                const x1 = positions[i * 3];
                const y1 = positions[i * 3 + 1];
                const z1 = positions[i * 3 + 2];

                for (let j = i + 1; j < particlesCount; j++) {
                    const x2 = positions[j * 3];
                    const y2 = positions[j * 3 + 1];
                    const z2 = positions[j * 3 + 2];

                    const distance = Math.sqrt(
                        Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
                    );

                    if (distance < maxDistance) {
                        linePositions.push(x1, y1, z1, x2, y2, z2);
                        lineIndices.push(lineIndex, lineIndex + 1);
                        lineIndex += 2;
                    }
                }
            }

            // Create line geometry
            lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
            lineGeometry.setIndex(lineIndices);

            // Line material
            const lineMaterial = new THREE.LineBasicMaterial({
                color: new THREE.Color(color),
                transparent: true,
                opacity: opacity * 0.3,
                blending: THREE.AdditiveBlending
            });

            // Create line mesh
            lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
            scene.add(lineMesh);
        }

        // Mouse interaction
        const mouse = new THREE.Vector2();

        function onMouseMove(event: MouseEvent) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }

        window.addEventListener('mousemove', onMouseMove);

        // Animation
        function animate() {
            requestAnimationFrame(animate);

            // Update particle positions
            const positions = particlesGeometry.attributes.position.array;
            const velocities = particlesGeometry.attributes.velocity.array;

            for (let i = 0; i < particlesCount * 3; i += 3) {
                // Update position based on velocity
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];

                // Boundary check - wrap around if out of bounds
                if (Math.abs(positions[i]) > 50) {
                    positions[i] = -positions[i] * 0.9;
                }
                if (Math.abs(positions[i + 1]) > 50) {
                    positions[i + 1] = -positions[i + 1] * 0.9;
                }
                if (Math.abs(positions[i + 2]) > 50) {
                    positions[i + 2] = -positions[i + 2] * 0.9;
                }
            }

            particlesGeometry.attributes.position.needsUpdate = true;

            // Rotate based on mouse position
            particlesMesh.rotation.x += mouse.y * 0.01;
            particlesMesh.rotation.y += mouse.x * 0.01;

            if (lineMesh) {
                lineMesh.rotation.x = particlesMesh.rotation.x;
                lineMesh.rotation.y = particlesMesh.rotation.y;
            }

            renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        function handleResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);

            if (container) {
                container.removeChild(renderer.domElement);
            }

            scene.remove(particlesMesh);
            particlesGeometry.dispose();
            particlesMaterial.dispose();

            if (lineMesh) {
                scene.remove(lineMesh);
                lineMesh.geometry.dispose();
                (lineMesh.material as THREE.Material).dispose();
            }

            renderer.dispose();
        };
    }, [count, size, color, speed, opacity, showLines]);

    return <div ref={containerRef} className="w-full h-full" />;
} 