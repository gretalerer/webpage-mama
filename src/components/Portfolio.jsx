import { motion } from 'framer-motion'
import WorldMap from './WorldMap'
import { useCarousel } from '../hooks/useCarousel'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { fadeUp, motionVariants } from '../animations'
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

const viewport = { once: true, amount: 0.3 }

function Portfolio() {
  const reducedMotion = usePrefersReducedMotion()
  const variants = motionVariants(fadeUp, reducedMotion)
  const { active: center, goToAndResetAutoPlay } = useCarousel({
    itemCount: categories.length,
    initialIndex: 3,
    autoPlayInterval: 2000,
  })
  const total = categories.length

  return (
    <section className="portfolio section" id="portfolio">
      <WorldMap />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.p
          className="section-label"
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={0}
        >
          Our Portfolio
        </motion.p>
        <motion.h2
          className="portfolio-title"
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={1}
        >
          Collection
        </motion.h2>
        <motion.p
          className="portfolio-intro"
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={2}
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
            const rotateY = offset * 12
            const translateZ = -absOffset * 120
            const translateX = offset * 660
            const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.45
            const scale = 1 - absOffset * 0.07
            const zIndex = total - absOffset

            return (
              <div
                key={cat.title}
                className={`portfolio-card ${offset === 0 ? 'portfolio-card--active' : ''}`}
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
                onClick={() => goToAndResetAutoPlay(i)}
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
