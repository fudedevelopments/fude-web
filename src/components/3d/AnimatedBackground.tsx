"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface AnimatedBackgroundProps {
    color1?: string;
    color2?: string;
    density?: number;
    speed?: number;
}

export default function AnimatedBackground({
    color1 = '#4338ca',
    color2 = '#6366F1',
    density = 30,
    speed = 0.5
}: AnimatedBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Store the ref value in a variable to use in cleanup
        const container = containerRef.current;
        if (!container) return;

        // Scene setup with lower resource usage
        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        // Renderer setup with optimizations
        const renderer = new THREE.WebGLRenderer({
            antialias: false, // Disable antialiasing for performance
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
        container.appendChild(renderer.domElement);

        // Create a more interesting 3D background
        const geometry = new THREE.BufferGeometry();
        const vertices: number[] = [];
        const colors: number[] = [];

        // Create a color gradient
        const color1Obj = new THREE.Color(color1);
        const color2Obj = new THREE.Color(color2);

        // Create a grid of points for better performance than random points
        const gridSize = Math.ceil(Math.sqrt(density * 10));
        const spacing = 100 / gridSize;

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                for (let k = 0; k < gridSize; k++) {
                    // Add some randomness to the grid
                    const x = (i - gridSize / 2) * spacing + (Math.random() - 0.5) * spacing * 0.5;
                    const y = (j - gridSize / 2) * spacing + (Math.random() - 0.5) * spacing * 0.5;
                    const z = (k - gridSize / 2) * spacing + (Math.random() - 0.5) * spacing * 0.5;

                    vertices.push(x, y, z);

                    // Mix colors based on position
                    const mixRatio = Math.abs(y / 50) * 0.5 + 0.5;
                    const color = color1Obj.clone().lerp(color2Obj, mixRatio);
                    colors.push(color.r, color.g, color.b);
                }
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        // Material with vertex colors
        const material = new THREE.PointsMaterial({
            size: 0.7,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        // Create points
        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Create a few larger glowing spheres for visual interest
        const glowingSpheres: THREE.Mesh[] = [];
        const sphereCount = 5;

        for (let i = 0; i < sphereCount; i++) {
            const sphereGeometry = new THREE.SphereGeometry(Math.random() * 2 + 1, 16, 16);
            const sphereMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(i % 2 === 0 ? color1 : color2),
                transparent: true,
                opacity: 0.5
            });

            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

            // Random position
            sphere.position.set(
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 80
            );

            scene.add(sphere);
            glowingSpheres.push(sphere);

            // Animate each sphere with GSAP
            gsap.to(sphere.position, {
                x: (Math.random() - 0.5) * 80,
                y: (Math.random() - 0.5) * 80,
                z: (Math.random() - 0.5) * 80,
                duration: Math.random() * 20 + 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            gsap.to(sphere.scale, {
                x: Math.random() + 0.5,
                y: Math.random() + 0.5,
                z: Math.random() + 0.5,
                duration: Math.random() * 5 + 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        // Mouse interaction
        const mouse = new THREE.Vector2();

        function onMouseMove(event: MouseEvent) {
            // Convert mouse position to normalized device coordinates
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }

        window.addEventListener('mousemove', onMouseMove);

        // Animation with throttled frame rate for performance
        let time = 0;
        let lastFrameTime = 0;
        const frameInterval = 1000 / 30; // Target 30 FPS for background

        function animate(currentTime: number) {
            requestAnimationFrame(animate);

            // Throttle frame rate
            if (currentTime - lastFrameTime < frameInterval) return;
            lastFrameTime = currentTime;

            time += 0.001 * speed;

            // Rotate points slowly
            points.rotation.x = Math.sin(time) * 0.1;
            points.rotation.y = time * 0.1;

            // Move camera slightly based on mouse position
            camera.position.x += (mouse.x * 5 - camera.position.x) * 0.01;
            camera.position.y += (-mouse.y * 5 - camera.position.y) * 0.01;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        animate(0);

        // Handle resize efficiently
        function handleResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(document.body);

        // Cleanup
        return () => {
            if (container) {
                container.removeChild(renderer.domElement);
            }

            window.removeEventListener('mousemove', onMouseMove);
            resizeObserver.disconnect();

            // Dispose resources
            geometry.dispose();
            material.dispose();

            glowingSpheres.forEach(sphere => {
                (sphere.geometry as THREE.BufferGeometry).dispose();
                (sphere.material as THREE.Material).dispose();
                scene.remove(sphere);
            });

            scene.remove(points);
            renderer.dispose();
        };
    }, [color1, color2, density, speed]);

    return <div ref={containerRef} className="fixed inset-0 -z-10" />;
} 