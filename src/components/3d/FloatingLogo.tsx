"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function FloatingLogo() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 5;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(200, 200);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);

        // Create logo geometry
        const logoGroup = new THREE.Group();

        // Base rectangle
        const baseGeometry = new THREE.BoxGeometry(3, 1.5, 0.2);
        const baseMaterial = new THREE.MeshPhongMaterial({
            color: 0x0F172A,
            emissive: 0x0F172A,
            emissiveIntensity: 0.2,
            specular: 0x111111,
            shininess: 30
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.set(0, 0, 0);
        logoGroup.add(base);

        // Letter F
        const fGeometry = new THREE.BoxGeometry(0.8, 1, 0.3);
        const fMaterial = new THREE.MeshPhongMaterial({
            color: 0x6366F1,
            emissive: 0x6366F1,
            emissiveIntensity: 0.5,
            specular: 0x6366F1,
            shininess: 100
        });
        const fMesh = new THREE.Mesh(fGeometry, fMaterial);
        fMesh.position.set(-0.8, 0, 0.2);
        logoGroup.add(fMesh);

        // Accent sphere
        const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({
            color: 0x10B981,
            emissive: 0x10B981,
            emissiveIntensity: 0.5,
            specular: 0xffffff,
            shininess: 100
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(1, 0.4, 0.3);
        logoGroup.add(sphere);

        scene.add(logoGroup);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x6366F1, 1, 10);
        pointLight.position.set(2, 2, 2);
        scene.add(pointLight);

        // Animation
        let time = 0;

        // GSAP animations
        gsap.to(logoGroup.rotation, {
            y: Math.PI * 2,
            duration: 10,
            repeat: -1,
            ease: "none"
        });

        gsap.to(sphere.position, {
            y: 0.6,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        function animate() {
            requestAnimationFrame(animate);

            time += 0.01;

            // Floating animation
            logoGroup.position.y = Math.sin(time) * 0.1;

            // Glow effect
            const pulseIntensity = (Math.sin(time * 2) + 1) / 4 + 0.5;
            (fMaterial as THREE.MeshPhongMaterial).emissiveIntensity = pulseIntensity;
            (sphereMaterial as THREE.MeshPhongMaterial).emissiveIntensity = pulseIntensity;

            renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        function handleResize() {
            renderer.setSize(200, 200);
        }

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);

            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
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

    return (
        <div
            ref={containerRef}
            className="w-[200px] h-[200px] relative"
            style={{
                filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.5))'
            }}
        />
    );
} 