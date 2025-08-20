'use client'

import { useMemo } from 'react'

interface SimpleNeuralBackgroundProps {
  animate?: boolean
}

export default function SimpleNeuralBackground({
  animate = true,
}: SimpleNeuralBackgroundProps) {
  // Generate static positions for better performance
  const particles = useMemo(() => {
    const count = 50 // Much fewer particles
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 3,
    }))
  }, [])

  const connections = useMemo(() => {
    const lines: Array<{ x1: number; y1: number; x2: number; y2: number }> = []

    // Create fewer connections for performance
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < Math.min(i + 3, particles.length); j++) {
        const p1 = particles[i]
        const p2 = particles[j]
        const distance = Math.sqrt(
          Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
        )

        if (distance < 20) {
          lines.push({
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
          })
        }
      }
    }

    return lines
  }, [particles])

  return (
    <div className='w-full h-full absolute inset-0 overflow-hidden'>
      {/* Gradient Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black'></div>

      {/* CSS-based Neural Network */}
      <svg
        className='absolute inset-0 w-full h-full'
        style={{ filter: 'blur(0.5px)' }}
      >
        {/* Connections */}
        {connections.map((line, index) => (
          <line
            key={`line-${index}`}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke='rgba(147, 51, 234, 0.15)'
            strokeWidth='0.5'
            className={animate ? 'animate-pulse' : ''}
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: '4s',
            }}
          />
        ))}

        {/* Particles */}
        {particles.map((particle) => (
          <circle
            key={`particle-${particle.id}`}
            cx={`${particle.x}%`}
            cy={`${particle.y}%`}
            r={particle.size}
            fill='rgba(147, 51, 234, 0.6)'
            className={animate ? 'animate-pulse' : ''}
            style={{
              animationDelay: `${particle.delay}s`,
              animationDuration: '3s',
            }}
          />
        ))}
      </svg>

      {/* Additional ambient glow */}
      <div
        className='absolute inset-0 opacity-30'
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
