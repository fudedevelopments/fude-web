"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function FloatingLogo() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Store the ref value in a variable to use in cleanup
        const container = containerRef.current;
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        scene.background.convertSRGBToLinear();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Create logo group
        const logoGroup = new THREE.Group();
        scene.add(logoGroup);

        // Create base circle
        const baseGeometry = new THREE.CircleGeometry(1.5, 32);
        const baseMaterial = new THREE.MeshBasicMaterial({
            color: 0x6366F1,
            transparent: true,
            opacity: 0.2
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        logoGroup.add(base);

        // Create "F" shape
        const fGeometry = new THREE.BufferGeometry();
        const fVertices = new Float32Array([
            // Vertical line
            -0.5, 0.8, 0,
            -0.5, -0.8, 0,
            -0.2, -0.8, 0,
            -0.2, 0.8, 0,

            // Top horizontal line
            -0.5, 0.8, 0,
            -0.5, 0.5, 0,
            0.5, 0.5, 0,
            0.5, 0.8, 0,

            // Middle horizontal line
            -0.5, 0.2, 0,
            -0.5, -0.1, 0,
            0.3, -0.1, 0,
            0.3, 0.2, 0
        ]);
        fGeometry.setAttribute('position', new THREE.BufferAttribute(fVertices, 3));
        fGeometry.setIndex([
            0, 1, 2, 0, 2, 3, // Vertical line
            4, 5, 6, 4, 6, 7, // Top horizontal
            8, 9, 10, 8, 10, 11 // Middle horizontal
        ]);
        const fMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
        const fLogo = new THREE.Mesh(fGeometry, fMaterial);
        logoGroup.add(fLogo);

        // Add floating spheres
        const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x6366F1,
            transparent: true,
            opacity: 0.8
        });

        // Create spheres at different positions
        const spherePositions = [
            [1.2, 0.8, 0],
            [-1.2, -0.8, 0],
            [1.0, -0.5, 0],
            [-0.8, 0.6, 0],
            [0.7, 0.2, 0]
        ];

        const spheres: THREE.Mesh[] = [];
        spherePositions.forEach((pos, index) => {
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
            sphere.position.set(pos[0], pos[1], pos[2]);
            sphere.userData.speed = 0.01 + Math.random() * 0.01;
            sphere.userData.amplitude = 0.2 + Math.random() * 0.3;
            sphere.userData.phase = Math.random() * Math.PI * 2;
            logoGroup.add(sphere);
            spheres.push(sphere);
        });

        // Animation
        function animate() {
            requestAnimationFrame(animate);

            // Rotate logo slightly
            logoGroup.rotation.z += 0.002;

            // Animate spheres
            spheres.forEach((sphere, index) => {
                const time = Date.now() * sphere.userData.speed;
                sphere.position.x = spherePositions[index][0] + Math.sin(time + sphere.userData.phase) * sphere.userData.amplitude;
                sphere.position.y = spherePositions[index][1] + Math.cos(time + sphere.userData.phase) * sphere.userData.amplitude;
            });

            renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        function handleResize() {
            if (!container) return;

            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);

            if (container) {
                container.removeChild(renderer.domElement);
            }

            scene.remove(logoGroup);
            baseGeometry.dispose();
            baseMaterial.dispose();
            fGeometry.dispose();
            fMaterial.dispose();
            sphereGeometry.dispose();
            sphereMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} className="w-full h-full" />;
} 