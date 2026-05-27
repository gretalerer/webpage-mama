import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './HelixDivider.css'

function drawGlowNode(ctx, x, y, alpha) {
  const r = 3 + alpha * 2
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, r * 6)
  gradient.addColorStop(0, `rgba(201, 168, 76, ${0.8 * alpha})`)
  gradient.addColorStop(0.3, `rgba(201, 168, 76, ${0.3 * alpha})`)
  gradient.addColorStop(0.6, `rgba(201, 168, 76, ${0.08 * alpha})`)
  gradient.addColorStop(1, 'rgba(201, 168, 76, 0)')

  ctx.beginPath()
  ctx.arc(x, y, r * 6, 0, Math.PI * 2)
  ctx.fillStyle = gradient
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(201, 168, 76, ${0.9 * alpha})`
  ctx.fill()
}

function drawHelixFrame(ctx, w, h, time) {
  const cx = w / 2
  const amplitude = 50
  const frequency = 3
  const nodeCount = 8
  const steps = 120

  ctx.clearRect(0, 0, w, h)

  const drawStrand = (phase) => {
    ctx.beginPath()
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const x = cx + Math.sin((t * frequency + time) * Math.PI * 2 + phase) * amplitude
      const y = t * h
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.strokeStyle = 'rgba(201, 168, 76, 0.25)'
    ctx.lineWidth = 1.5
    ctx.stroke()
  }

  drawStrand(0)
  drawStrand(Math.PI)

  for (let i = 0; i < steps; i += Math.floor(steps / 20)) {
    const t = i / steps
    const x1 = cx + Math.sin((t * frequency + time) * Math.PI * 2) * amplitude
    const x2 = cx + Math.sin((t * frequency + time) * Math.PI * 2 + Math.PI) * amplitude
    const y = t * h
    ctx.beginPath()
    ctx.moveTo(x1, y)
    ctx.lineTo(x2, y)
    ctx.strokeStyle = 'rgba(201, 168, 76, 0.08)'
    ctx.lineWidth = 0.5
    ctx.stroke()
  }

  for (let n = 0; n < nodeCount; n++) {
    const offset = n / nodeCount
    const t = ((time * 0.8 + offset) % 1)
    const fade = Math.sin(t * Math.PI)
    const x1 = cx + Math.sin((t * frequency + time) * Math.PI * 2) * amplitude
    const x2 = cx + Math.sin((t * frequency + time) * Math.PI * 2 + Math.PI) * amplitude
    const y = t * h
    drawGlowNode(ctx, x1, y, fade)
    drawGlowNode(ctx, x2, y, fade * 0.7)
  }
}

function HelixDivider() {
  const canvasRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animId
    const dpr = 2

    const applySize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      return { w, h }
    }

    let { w, h } = applySize()

    const onResize = () => {
      ;({ w, h } = applySize())
      if (reducedMotion) drawHelixFrame(ctx, w, h, 0)
    }

    window.addEventListener('resize', onResize)

    if (reducedMotion) {
      drawHelixFrame(ctx, w, h, 0)
      return () => window.removeEventListener('resize', onResize)
    }

    let time = 0
    const speed = 0.0015

    const draw = () => {
      drawHelixFrame(ctx, w, h, time)
      time += speed
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [reducedMotion])

  return (
    <div className="helix-divider">
      <canvas ref={canvasRef} className="helix-canvas" />
    </div>
  )
}

export default HelixDivider
