import { useRef, useEffect } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const DEFAULTS = {
  particleCount: 80,
  particleSize: 1.5,
  connectionDistance: 140,
  speed: 0.3,
  particleColor: '201, 168, 76',
  lineColor: '201, 168, 76',
  particleOpacity: 0.6,
  lineOpacity: 0.15,
}

function QuantumNodes({
  className = '',
  particleCount = DEFAULTS.particleCount,
  connectionDistance = DEFAULTS.connectionDistance,
  speed = DEFAULTS.speed,
  particleColor = DEFAULTS.particleColor,
  lineColor = DEFAULTS.lineColor,
  particleOpacity = DEFAULTS.particleOpacity,
  lineOpacity = DEFAULTS.lineOpacity,
  particleSize = DEFAULTS.particleSize,
}) {
  const canvasRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      return rect
    }

    const initParticles = (rect) => {
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        size: particleSize * (0.5 + Math.random()),
      }))
    }

    const drawFrame = (w, h) => {
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (!reducedMotion) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor}, ${particleOpacity})`
        ctx.fill()

        if (reducedMotion) continue

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            const alpha = lineOpacity * (1 - dist / connectionDistance)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const onResize = () => {
      const rect = resize()
      initParticles(rect)
      if (reducedMotion) drawFrame(rect.width, rect.height)
    }

    const rect = resize()
    initParticles(rect)

    if (reducedMotion) {
      drawFrame(rect.width, rect.height)
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    const draw = () => {
      const { width: w, height: h } = canvas.parentElement.getBoundingClientRect()
      drawFrame(w, h)
      animId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [
    reducedMotion,
    particleCount,
    connectionDistance,
    speed,
    particleColor,
    lineColor,
    particleOpacity,
    lineOpacity,
    particleSize,
  ])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

export default QuantumNodes
