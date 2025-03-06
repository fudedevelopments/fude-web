"use client";

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface ServiceCardProps {
    position: [number, number, number];
    title: string;
    color: string;
    hoverColor: string;
    onClick?: () => void;
}

export default function ServiceCard({
    position,
    title,
    color,
    hoverColor,
    onClick
}: ServiceCardProps) {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame(() => {
        if (!mesh.current) return;

        mesh.current.rotation.x = THREE.MathUtils.lerp(
            mesh.current.rotation.x,
            hovered ? 0.1 : 0,
            0.1
        );

        mesh.current.rotation.y = THREE.MathUtils.lerp(
            mesh.current.rotation.y,
            hovered ? 0.1 : 0,
            0.1
        );

        mesh.current.position.z = THREE.MathUtils.lerp(
            mesh.current.position.z,
            hovered ? position[2] + 0.3 : position[2],
            0.1
        );
    });

    return (
        <group position={position}>
            <RoundedBox
                ref={mesh}
                args={[2, 1, 0.1]}
                radius={0.1}
                smoothness={4}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={onClick}
            >
                <meshStandardMaterial
                    color={hovered ? hoverColor : color}
                    roughness={0.3}
                    metalness={0.7}
                />
            </RoundedBox>

            <Text
                position={[0, 0, 0.06]}
                fontSize={0.15}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
            >
                {title}
            </Text>
        </group>
    );
} 