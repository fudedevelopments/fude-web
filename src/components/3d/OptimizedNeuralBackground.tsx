'use client'

import { useRef, useEffect, useMemo, useCallback } from 'react'
import * as THREE from 'three'

// Performance configuration
const PERFORMANCE_CONFIG = {
  HIGH: {
    particleCount: 300,
    maxConnections: 150,
    connectionDistance: 8,
    frameRate: 60,
  },
  MEDIUM: {
    particleCount: 200,
    maxConnections: 100,
    connectionDistance: 6,
    frameRate: 30,
  },
  LOW: {
    particleCount: 100,
    maxConnections: 50,
    connectionDistance: 4,
    frameRate: 15,
  },
}

interface OptimizedNeuralBackgroundProps {
  quality?: 'HIGH' | 'MEDIUM' | 'LOW'
  enableAdaptiveQuality?: boolean
}

export default function OptimizedNeuralBackground({
  quality = 'MEDIUM',
  enableAdaptiveQuality = true,
}: OptimizedNeuralBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(0)
  const currentQuality = useRef(quality)

  // Memoize configuration based on quality
  const config = useMemo(() => PERFORMANCE_CONFIG[currentQuality.current], [])

  // Performance monitoring
  const adaptQuality = useCallback(() => {
    if (!enableAdaptiveQuality) return

    const now = performance.now()
    frameCountRef.current++

    if (now - lastTimeRef.current >= 1000) {
      const fps = frameCountRef.current
      frameCountRef.current = 0
      lastTimeRef.current = now

      // Adaptive quality based on FPS
      if (fps < 20 && currentQuality.current !== 'LOW') {
        currentQuality.current = 'LOW'
      } else if (fps > 45 && currentQuality.current === 'LOW') {
        currentQuality.current = 'MEDIUM'
      } else if (fps > 55 && currentQuality.current === 'MEDIUM') {
        currentQuality.current = 'HIGH'
      }
    }
  }, [enableAdaptiveQuality])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup with optimizations
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 30

    // Renderer setup with optimizations
    const renderer = new THREE.WebGLRenderer({
      antialias: false, // Disable antialiasing for performance
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    // Create optimized particle system using InstancedMesh
    const particleGeometry = new THREE.SphereGeometry(0.1, 6, 6) // Reduced detail
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.6,
    })

    const particleCount = config.particleCount
    const instancedMesh = new THREE.InstancedMesh(
      particleGeometry,
      particleMaterial,
      particleCount
    )
    scene.add(instancedMesh)

    // Store particle data
    const particles: Array<{
      position: THREE.Vector3
      velocity: THREE.Vector3
      matrix: THREE.Matrix4
    }> = []

    // Initialize particles with optimized distribution
    for (let i = 0; i < particleCount; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 20
      )

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.01
      )

      const matrix = new THREE.Matrix4()
      matrix.setPosition(position)
      instancedMesh.setMatrixAt(i, matrix)

      particles.push({ position, velocity, matrix })
    }

    instancedMesh.instanceMatrix.needsUpdate = true

    // Optimized connection system with spatial partitioning
    const lineGeometry = new THREE.BufferGeometry()
    const linePositions: number[] = []
    const maxConnections = config.maxConnections
    let connectionCount = 0

    // Create connections only between nearby particles (optimized)
    for (
      let i = 0;
      i < particleCount && connectionCount < maxConnections;
      i++
    ) {
      const particle1 = particles[i]

      // Check only a subset of other particles for performance
      const checkCount = Math.min(10, particleCount - i - 1)
      for (
        let j = 1;
        j <= checkCount && connectionCount < maxConnections;
        j++
      ) {
        const idx = (i + j) % particleCount
        if (idx === i) continue

        const particle2 = particles[idx]
        const distance = particle1.position.distanceTo(particle2.position)

        if (distance < config.connectionDistance) {
          linePositions.push(
            particle1.position.x,
            particle1.position.y,
            particle1.position.z,
            particle2.position.x,
            particle2.position.y,
            particle2.position.z
          )
          connectionCount++
        }
      }
    }

    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    )

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x553388,
      transparent: true,
      opacity: 0.1,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // Mouse interaction (simplified)
    let mouseX = 0
    let mouseY = 0
    const mouseInfluence = 0.0001

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    // Optimized animation loop with frame rate control
    let lastFrame = 0
    const targetFrameTime = 1000 / config.frameRate

    const animate = (currentTime: number) => {
      requestAnimationFrame(animate)

      // Frame rate limiting
      if (currentTime - lastFrame < targetFrameTime) return
      lastFrame = currentTime

      // Adaptive quality monitoring
      adaptQuality()

      // Update particle positions (simplified physics)
      for (let i = 0; i < particleCount; i++) {
        const particle = particles[i]

        // Simple movement
        particle.position.add(particle.velocity)

        // Mouse influence (reduced)
        particle.position.x += mouseX * mouseInfluence
        particle.position.y += mouseY * mouseInfluence

        // Boundary wrapping
        if (Math.abs(particle.position.x) > 25) {
          particle.position.x = -Math.sign(particle.position.x) * 25
        }
        if (Math.abs(particle.position.y) > 25) {
          particle.position.y = -Math.sign(particle.position.y) * 25
        }

        // Update matrix
        particle.matrix.setPosition(particle.position)
        instancedMesh.setMatrixAt(i, particle.matrix)
      }

      instancedMesh.instanceMatrix.needsUpdate = true

      // Slow rotation for background effect
      instancedMesh.rotation.x += 0.0002
      instancedMesh.rotation.y += 0.0002
      lines.rotation.x += 0.0002
      lines.rotation.y += 0.0002

      renderer.render(scene, camera)
    }

    animate(0)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }

      // Dispose of resources
      particleGeometry.dispose()
      particleMaterial.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      renderer.dispose()
    }
  }, [config, adaptQuality])

  return (
    <div
      ref={containerRef}
      className='w-full h-full'
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none', // Prevent interference with UI
      }}
    />
  )
}
