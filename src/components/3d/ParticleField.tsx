"use client";

import { useRef, useMemo, useEffect } from 'react';
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
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);

        // Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCnt = count;
        const posArray = new Float32Array(particlesCnt * 3);
        const velocityArray = new Float32Array(particlesCnt * 3);

        for (let i = 0; i < particlesCnt * 3; i++) {
            // Position
            posArray[i] = (Math.random() - 0.5) * 100;
            // Velocity
            velocityArray[i] = (Math.random() - 0.5) * speed;
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
        });

        // Mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Lines
        let lineMesh: THREE.LineSegments | null = null;

        if (showLines) {
            const lineGeometry = new THREE.BufferGeometry();
            const lineIndices: number[] = [];
            const linePositions = new Float32Array(particlesCnt * 3);

            // Copy positions from particles
            for (let i = 0; i < particlesCnt * 3; i++) {
                linePositions[i] = posArray[i];
            }

            // Create connections between nearby particles
            for (let i = 0; i < particlesCnt; i++) {
                for (let j = i + 1; j < particlesCnt; j++) {
                    const distance = Math.sqrt(
                        Math.pow(posArray[i * 3] - posArray[j * 3], 2) +
                        Math.pow(posArray[i * 3 + 1] - posArray[j * 3 + 1], 2) +
                        Math.pow(posArray[i * 3 + 2] - posArray[j * 3 + 2], 2)
                    );

                    if (distance < 10) {
                        lineIndices.push(i, j);
                    }
                }
            }

            lineGeometry.setIndex(lineIndices);
            lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

            const lineMaterial = new THREE.LineBasicMaterial({
                color: new THREE.Color(color),
                transparent: true,
                opacity: opacity * 0.5,
            });

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

            // Update particles
            const positions = particlesGeometry.attributes.position.array as Float32Array;
            const velocities = particlesGeometry.attributes.velocity.array as Float32Array;

            for (let i = 0; i < particlesCnt * 3; i += 3) {
                // Apply velocity
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];

                // Boundary check
                if (Math.abs(positions[i]) > 50) velocities[i] *= -1;
                if (Math.abs(positions[i + 1]) > 50) velocities[i + 1] *= -1;
                if (Math.abs(positions[i + 2]) > 50) velocities[i + 2] *= -1;
            }

            particlesGeometry.attributes.position.needsUpdate = true;

            // Update lines if they exist
            if (lineMesh) {
                const linePositions = lineMesh.geometry.attributes.position.array as Float32Array;
                for (let i = 0; i < particlesCnt * 3; i++) {
                    linePositions[i] = positions[i];
                }
                lineMesh.geometry.attributes.position.needsUpdate = true;
            }

            // Rotate based on mouse position
            particlesMesh.rotation.x += mouse.y * 0.001;
            particlesMesh.rotation.y += mouse.x * 0.001;

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

            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
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

    return <div ref={containerRef} className="absolute inset-0 z-10" />;
} 