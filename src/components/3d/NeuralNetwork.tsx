"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface NeuralNetworkProps {
    width?: number;
    height?: number;
    layers?: number[];
    color?: string;
    pulseSpeed?: number;
    connectionOpacity?: number;
}

export default function NeuralNetwork({
    width = 300,
    height = 200,
    layers = [4, 6, 8, 6, 4],
    color = '#6366F1',
    pulseSpeed = 1,
    connectionOpacity = 0.3
}: NeuralNetworkProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 15;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);

        // Create neural network
        const networkGroup = new THREE.Group();

        // Calculate spacing
        const layerSpacing = 4;
        const nodeSpacing = 1.5;
        const totalWidth = (layers.length - 1) * layerSpacing;
        const startX = -totalWidth / 2;

        // Create nodes and connections
        const nodes: THREE.Mesh[] = [];
        const connections: THREE.Line[] = [];
        const activations: number[] = [];

        // Node geometry and material
        const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const nodeMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color(color),
            emissive: new THREE.Color(color),
            emissiveIntensity: 0.5,
            specular: new THREE.Color(0xffffff),
            shininess: 100
        });

        // Connection material
        const connectionMaterial = new THREE.LineBasicMaterial({
            color: new THREE.Color(color),
            transparent: true,
            opacity: connectionOpacity
        });

        // Create nodes for each layer
        layers.forEach((nodeCount, layerIndex) => {
            const x = startX + layerIndex * layerSpacing;
            const layerHeight = (nodeCount - 1) * nodeSpacing;
            const startY = layerHeight / 2;

            for (let i = 0; i < nodeCount; i++) {
                const y = startY - i * nodeSpacing;

                // Create node
                const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
                node.position.set(x, y, 0);
                networkGroup.add(node);
                nodes.push(node);

                // Initialize activation value
                activations.push(Math.random());

                // Create connections to previous layer
                if (layerIndex > 0) {
                    const prevLayerSize = layers[layerIndex - 1];
                    const prevLayerStartIndex = layers.slice(0, layerIndex - 1).reduce((sum, size) => sum + size, 0);

                    for (let j = 0; j < prevLayerSize; j++) {
                        const prevNodeIndex = prevLayerStartIndex + j;
                        const prevNode = nodes[prevNodeIndex];

                        // Create connection line
                        const points = [
                            new THREE.Vector3(prevNode.position.x, prevNode.position.y, prevNode.position.z),
                            new THREE.Vector3(x, y, 0)
                        ];

                        const connectionGeometry = new THREE.BufferGeometry().setFromPoints(points);
                        const connection = new THREE.Line(connectionGeometry, connectionMaterial.clone());
                        networkGroup.add(connection);
                        connections.push(connection);
                    }
                }
            }
        });

        scene.add(networkGroup);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Animation
        let time = 0;

        function animate() {
            requestAnimationFrame(animate);

            time += 0.01 * pulseSpeed;

            // Animate node activations
            nodes.forEach((node, index) => {
                const activation = (Math.sin(time + activations[index] * 10) + 1) / 2;
                (node.material as THREE.MeshPhongMaterial).emissiveIntensity = activation * 0.8;
                node.scale.set(
                    1 + activation * 0.2,
                    1 + activation * 0.2,
                    1 + activation * 0.2
                );
            });

            // Rotate slightly
            networkGroup.rotation.y = Math.sin(time * 0.2) * 0.2;

            renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        function handleResize() {
            renderer.setSize(width, height);
        }

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);

            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }

            scene.remove(networkGroup);
            nodeGeometry.dispose();

            nodes.forEach(node => {
                (node.material as THREE.Material).dispose();
            });

            connections.forEach(connection => {
                connection.geometry.dispose();
                (connection.material as THREE.Material).dispose();
            });

            renderer.dispose();
        };
    }, [width, height, layers, color, pulseSpeed, connectionOpacity]);

    return (
        <div
            ref={containerRef}
            className={`w-[${width}px] h-[${height}px] relative`}
            style={{ width, height }}
        />
    );
} 