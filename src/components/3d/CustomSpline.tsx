"use client";

import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

interface CustomSplineProps {
    scene: string;
}

export default function CustomSpline({ scene }: CustomSplineProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Store the ref value in a variable to use in cleanup
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Create a new Spline application
        const app = new Application(canvas);

        // Load the scene
        app.load(scene);

        // Cleanup
        return () => {
            // Cleanup Spline resources
            if (app) {
                app.dispose();
            }
        };
    }, [scene]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '100%',
                height: '100%',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}
        />
    );
} 