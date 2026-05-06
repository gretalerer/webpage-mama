import { useEffect, useRef } from 'react'
import './HelixDivider.css'

function HelixDivider() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2)
    }
    resize()
    window.addEventListener('resize', resize)

    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight
    const cx = () => W() / 2
    const amplitude = 50
    const frequency = 3
    const nodeCount = 8
    const speed = 0.0015

    let time = 0

    const draw = () => {
      const w = W()
      const h = H()
      ctx.clearRect(0, 0, w, h)

      const steps = 120
      ctx.beginPath()
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const x = cx() + Math.sin((t * frequency + time) * Math.PI * 2) * amplitude
        const y = t * h
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(201, 168, 76, 0.25)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.beginPath()
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const x = cx() + Math.sin((t * frequency + time) * Math.PI * 2 + Math.PI) * amplitude
        const y = t * h
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(201, 168, 76, 0.25)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      for (let i = 0; i < steps; i += Math.floor(steps / 20)) {
        const t = i / steps
        const x1 = cx() + Math.sin((t * frequency + time) * Math.PI * 2) * amplitude
        const x2 = cx() + Math.sin((t * frequency + time) * Math.PI * 2 + Math.PI) * amplitude
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
        const fadeIn = Math.sin(t * Math.PI)

        const x1 = cx() + Math.sin((t * frequency + time) * Math.PI * 2) * amplitude
        const x2 = cx() + Math.sin((t * frequency + time) * Math.PI * 2 + Math.PI) * amplitude
        const y = t * h

        drawGlowNode(ctx, x1, y, fadeIn)
        drawGlowNode(ctx, x2, y, fadeIn * 0.7)
      }

      time += speed
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="helix-divider">
      <canvas ref={canvasRef} className="helix-canvas" />
    </div>
  )
}

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

export default HelixDivider
