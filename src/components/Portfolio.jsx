import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import WorldMap from './WorldMap'
import './Portfolio.css'

const categories = [
  {
    title: 'Fintech & Digital Payments',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=700&h=450&fit=crop&sat=-100',
  },
  {
    title: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=700&h=450&fit=crop&sat=-100',
  },
  {
    title: 'Wellness & Lifestyle',
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=700&h=450&fit=crop&sat=-100',
  },
  {
    title: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=700&h=450&fit=crop&sat=-100',
  },
  {
    title: 'Cross-Border Payments',
    image: 'https://images.unsplash.com/photo-1545959570-a94084071b5d?w=700&h=450&fit=crop&sat=-100',
  },
  {
    title: 'Digital Infrastructure',
    image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=700&h=450&fit=crop&sat=-100',
  },
  {
    title: 'Emerging Markets',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700&h=450&fit=crop&sat=-100',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 },
  }),
}

function Portfolio() {
  const [center, setCenter] = useState(3)
  const total = categories.length
  const timerRef = useRef(null)

  const next = useCallback(() => setCenter((c) => (c + 1) % total), [total])

  const startAutoPlay = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, 2000)
  }, [next])

  useEffect(() => {
    startAutoPlay()
    return () => clearInterval(timerRef.current)
  }, [startAutoPlay])

  const handleManual = (fn) => {
    fn()
    startAutoPlay()
  }

  return (
    <section className="portfolio section" id="portfolio">
      <WorldMap />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.h2
          className="portfolio-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          Collection
        </motion.h2>
        <motion.p
          className="portfolio-intro"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
        >
          We lead projects end-to-end and orchestrate the ecosystem required for success.
          Our portfolio spans fintech and digital payments, entertainment, wellness, and hospitality,
          with a global footprint across Latin America, Europe, the U.S., Asia, and the UAE.
        </motion.p>
      </div>

      <div className="portfolio-carousel">
        <div className="portfolio-stage">
          {categories.map((cat, i) => {
            let offset = i - center
            if (offset > total / 2) offset -= total
            if (offset < -total / 2) offset += total

            const absOffset = Math.abs(offset)
            const rotateY = offset * 25
            const translateZ = -absOffset * 80
            const translateX = offset * 200
            const opacity = absOffset > 3 ? 0 : 1 - absOffset * 0.2
            const scale = 1 - absOffset * 0.08
            const zIndex = total - absOffset

            return (
              <div
                key={i}
                className={`portfolio-card ${offset === 0 ? 'portfolio-card--active' : ''}`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
                onClick={() => handleManual(() => setCenter(i))}
              >
                <img src={cat.image} alt={cat.title} loading="lazy" />
                <div className="portfolio-card-label">
                  <span>{cat.title}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
