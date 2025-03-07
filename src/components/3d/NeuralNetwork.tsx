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
        // Store the ref value in a variable to use in cleanup
        const container = containerRef.current;
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        scene.background.set(0x000000);
        scene.background.convertSRGBToLinear();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 15;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create neural network group
        const networkGroup = new THREE.Group();
        scene.add(networkGroup);

        // Node geometry and materials
        const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(color) });

        // Connection material
        const connectionMaterial = new THREE.LineBasicMaterial({
            color: new THREE.Color(color),
            transparent: true,
            opacity: connectionOpacity
        });

        // Create nodes and store their positions
        const nodes: THREE.Mesh[] = [];
        const nodePositions: THREE.Vector3[] = [];

        // Calculate spacing
        const layerSpacing = 20 / (layers.length - 1);
        const maxNodesInLayer = Math.max(...layers);
        const verticalSpacing = 10 / maxNodesInLayer;

        // Create nodes for each layer
        layers.forEach((nodeCount, layerIndex) => {
            const xPos = layerIndex * layerSpacing - 10;

            for (let i = 0; i < nodeCount; i++) {
                const yPos = (i - (nodeCount - 1) / 2) * verticalSpacing;

                const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
                node.position.set(xPos, yPos, 0);
                networkGroup.add(node);
                nodes.push(node);
                nodePositions.push(new THREE.Vector3(xPos, yPos, 0));

                // Add pulse animation to some nodes
                if (Math.random() > 0.7) {
                    const pulseMaterial = node.material as THREE.MeshBasicMaterial;
                    node.userData.pulseDirection = 1;
                    node.userData.pulseValue = 1;
                    node.userData.pulseSpeed = 0.01 * pulseSpeed * (0.5 + Math.random());
                }
            }
        });

        // Create connections between layers
        for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
            const currentLayerSize = layers[layerIndex];
            const nextLayerSize = layers[layerIndex + 1];

            let currentLayerStartIndex = 0;
            for (let i = 0; i < layerIndex; i++) {
                currentLayerStartIndex += layers[i];
            }

            const nextLayerStartIndex = currentLayerStartIndex + currentLayerSize;

            // Connect each node in current layer to each node in next layer
            for (let i = 0; i < currentLayerSize; i++) {
                const fromNodeIndex = currentLayerStartIndex + i;

                for (let j = 0; j < nextLayerSize; j++) {
                    const toNodeIndex = nextLayerStartIndex + j;

                    const points = [
                        nodePositions[fromNodeIndex],
                        nodePositions[toNodeIndex]
                    ];

                    const geometry = new THREE.BufferGeometry().setFromPoints(points);
                    const line = new THREE.Line(geometry, connectionMaterial);
                    networkGroup.add(line);
                }
            }
        }

        // Animation
        function animate() {
            requestAnimationFrame(animate);

            // Pulse animation for nodes
            nodes.forEach(node => {
                if (node.userData.pulseDirection !== undefined) {
                    const material = node.material as THREE.MeshBasicMaterial;

                    // Update pulse value
                    node.userData.pulseValue += node.userData.pulseDirection * node.userData.pulseSpeed;

                    // Reverse direction at limits
                    if (node.userData.pulseValue > 1.5) {
                        node.userData.pulseDirection = -1;
                    } else if (node.userData.pulseValue < 0.5) {
                        node.userData.pulseDirection = 1;
                    }

                    // Apply pulse to node scale and opacity
                    node.scale.set(
                        node.userData.pulseValue,
                        node.userData.pulseValue,
                        node.userData.pulseValue
                    );

                    material.opacity = node.userData.pulseValue * 0.7;
                }
            });

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

            if (container) {
                container.removeChild(renderer.domElement);
            }

            scene.remove(networkGroup);
            nodeGeometry.dispose();

            nodes.forEach(node => {
                (node.material as THREE.Material).dispose();
            });

            // Dispose of all line geometries
            networkGroup.children.forEach(child => {
                if (child instanceof THREE.Line) {
                    child.geometry.dispose();
                    (child.material as THREE.Material).dispose();
                }
            });
        };
    }, [width, height, layers, color, pulseSpeed, connectionOpacity]);

    return <div ref={containerRef} className="w-full h-full" />;
} 