"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function NeuralNetworkBackground() {
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
        camera.position.z = 30;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Create particles for neural network nodes
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 500;

        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);

        // Create random positions and colors for particles
        for (let i = 0; i < particlesCount * 3; i++) {
            // Position
            posArray[i] = (Math.random() - 0.5) * 50;

            // Color - create a darker gradient from purple to blue to pink
            if (i % 3 === 0) {
                colorArray[i] = 0.3 + Math.random() * 0.4; // R: 0.3-0.7 (darker)
                colorArray[i + 1] = 0.1 + Math.random() * 0.2; // G: 0.1-0.3 (darker)
                colorArray[i + 2] = 0.6 + Math.random() * 0.2; // B: 0.6-0.8 (darker)
            }
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        // Material for particles
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.2,
            vertexColors: true,
            transparent: true,
            opacity: 0.7, // Slightly reduced opacity
        });

        // Create the particle system
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Create connections between nodes (lines)
        const linesMaterial = new THREE.LineBasicMaterial({
            color: 0x553388, // Darker purple
            transparent: true,
            opacity: 0.15, // Reduced opacity for lines
        });

        const linesGroup = new THREE.Group();
        scene.add(linesGroup);

        // Create connections between nearby particles
        const maxDistance = 8; // Maximum distance for connection
        const positions = particlesGeometry.attributes.position.array;

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
                    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                        new THREE.Vector3(x1, y1, z1),
                        new THREE.Vector3(x2, y2, z2),
                    ]);

                    const line = new THREE.Line(lineGeometry, linesMaterial);
                    linesGroup.add(line);
                }
            }
        }

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Reduced intensity
        scene.add(ambientLight);

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate the particle system
            particlesMesh.rotation.x += 0.0003;
            particlesMesh.rotation.y += 0.0003;

            // Rotate the lines group
            linesGroup.rotation.x += 0.0003;
            linesGroup.rotation.y += 0.0003;

            // Move based on mouse position
            particlesMesh.rotation.x += mouseY * 0.0003;
            particlesMesh.rotation.y += mouseX * 0.0003;
            linesGroup.rotation.x += mouseY * 0.0003;
            linesGroup.rotation.y += mouseX * 0.0003;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);

            if (container) {
                container.removeChild(renderer.domElement);
            }

            // Dispose of geometries and materials
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            linesMaterial.dispose();

            // Dispose of all line geometries
            linesGroup.children.forEach((child) => {
                if (child instanceof THREE.Line) {
                    child.geometry.dispose();
                }
            });
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
    );
} 