import { useEffect, useRef } from 'react'
import { feature } from 'topojson-client'
import worldData from 'world-atlas/land-110m.json'
import './WorldMap.css'

const land = feature(worldData, worldData.objects.land)

function lngLatToXY(lng, lat, w, h) {
  const x = ((lng + 180) / 360) * w
  const y = ((90 - lat) / 180) * h
  return [x, y]
}

const dotRoutes = [
  { points: [[0.12,0.22],[0.16,0.18],[0.20,0.22],[0.22,0.30],[0.18,0.38],[0.14,0.42]], speed: 0.0008 },
  { points: [[0.22,0.50],[0.26,0.54],[0.27,0.62],[0.24,0.72],[0.21,0.80]], speed: 0.001 },
  { points: [[0.46,0.20],[0.50,0.18],[0.54,0.20]], speed: 0.0012 },
  { points: [[0.47,0.32],[0.52,0.37],[0.54,0.47],[0.50,0.58]], speed: 0.0009 },
  { points: [[0.56,0.17],[0.64,0.16],[0.72,0.20],[0.80,0.24]], speed: 0.0007 },
  { points: [[0.80,0.58],[0.84,0.56],[0.86,0.62],[0.82,0.66]], speed: 0.0014 },
  { points: [[0.22,0.36],[0.30,0.32],[0.38,0.30],[0.46,0.30]], speed: 0.0006 },
  { points: [[0.70,0.36],[0.76,0.44],[0.80,0.54]], speed: 0.001 },
]

function WorldMap() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let dpr = window.devicePixelRatio || 1

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight

    const dots = dotRoutes.flatMap((route) =>
      Array.from({ length: 3 }, (_, i) => ({
        points: route.points,
        progress: i / 3,
        speed: route.speed * (0.8 + Math.random() * 0.4),
      }))
    )

    function drawLand(w, h) {
      land.features.forEach((feat) => {
        const geom = feat.geometry
        const coords = geom.type === 'Polygon'
          ? [geom.coordinates]
          : geom.coordinates

        coords.forEach((polygon) => {
          polygon.forEach((ring) => {
            ctx.beginPath()
            ring.forEach(([lng, lat], i) => {
              const [x, y] = lngLatToXY(lng, lat, w, h)
              if (i === 0) ctx.moveTo(x, y)
              else ctx.lineTo(x, y)
            })
            ctx.closePath()
            ctx.fillStyle = 'rgba(201, 168, 76, 0.06)'
            ctx.fill()
            ctx.strokeStyle = 'rgba(201, 168, 76, 0.18)'
            ctx.lineWidth = 0.6
            ctx.stroke()
          })
        })
      })
    }

    const draw = () => {
      const w = W()
      const h = H()
      ctx.clearRect(0, 0, w, h)

      drawLand(w, h)

      dots.forEach((dot) => {
        dot.progress = (dot.progress + dot.speed) % 1
        const totalSeg = dot.points.length - 1
        if (totalSeg <= 0) return
        const rawIdx = dot.progress * totalSeg
        const i0 = Math.floor(rawIdx)
        const i1 = Math.min(i0 + 1, dot.points.length - 1)
        const frac = rawIdx - i0

        const x = (dot.points[i0][0] + (dot.points[i1][0] - dot.points[i0][0]) * frac) * w
        const y = (dot.points[i0][1] + (dot.points[i1][1] - dot.points[i0][1]) * frac) * h

        const grad = ctx.createRadialGradient(x, y, 0, x, y, 14)
        grad.addColorStop(0, 'rgba(201, 168, 76, 0.55)')
        grad.addColorStop(0.35, 'rgba(201, 168, 76, 0.12)')
        grad.addColorStop(1, 'rgba(201, 168, 76, 0)')
        ctx.beginPath()
        ctx.arc(x, y, 14, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(201, 168, 76, 0.7)'
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="world-map-canvas" />
}

export default WorldMap
