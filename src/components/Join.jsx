import { useRef, useState, useCallback } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import ShootingStarsBg from './ShootingStarsBg'
import './Join.css'

const SLIDES = [
  {
    title: 'Investor',
    description: 'Access curated opportunities',
    detail:
      'Governance and capital structured for long horizons — aligned incentives from first ticket to exit.',
  },
  {
    title: 'Partner',
    description: 'Build and scale ventures',
    detail:
      'Shared execution from thesis to scale: strategy, operating rhythm, and ecosystem access in one lane.',
  },
  {
    title: 'Supplier',
    description: 'Lead execution',
    detail:
      'Operational depth where ventures meet the real economy — delivery, trust, and velocity without noise.',
  },
  {
    title: 'Customer',
    description: 'Unlock growth opportunities',
    detail:
      'Demand-led validation and durable revenue routes — markets tell the story before the spreadsheet does.',
  },
]

function Join() {
  const scrollRootRef = useRef(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: scrollRootRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const n = SLIDES.length
    const idx = Math.min(n - 1, Math.max(0, Math.floor(v * n)))
    setActive(idx)
  })

  const scrollToSlide = useCallback((index) => {
    const root = scrollRootRef.current
    if (!root) return
    const top = root.getBoundingClientRect().top + window.scrollY
    const h = root.offsetHeight
    const n = SLIDES.length
    const y = top + (index / n) * h + 2
    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [])

  const current = SLIDES[active]

  return (
    <section className="join section" id="join">
      <ShootingStarsBg />

      <div className="container join-header-block join-layer">
        <h2 className="section-title join-section-title">JOIN OUR JOURNEY</h2>
        <p className="join-intro">
          Be part of the Portfolio companies that helps companies and entrepreneurs to explore and
          develop business opportunities by leading the projects, identifying and bringing together
          Investors, Partners, Suppliers and Customers to create new companies.
        </p>
      </div>

      <div
        ref={scrollRootRef}
        className="join-scroll-track join-layer"
        style={{ '--join-slide-count': SLIDES.length }}
      >
        <div className="join-showcase-sticky">
          <div className="container join-showcase-grid">
            <nav className="join-showcase-nav" aria-label="Journey roles">
              <ul className="join-nav-list">
                {SLIDES.map((slide, i) => (
                  <li key={slide.title}>
                    <button
                      type="button"
                      className={`join-nav-item ${active === i ? 'join-nav-item--active' : ''}`}
                      onClick={() => scrollToSlide(i)}
                    >
                      <span className="join-nav-line">
                        <span className="join-nav-heading">
                          <span className="join-nav-index">
                            ({String(i + 1).padStart(2, '0')})
                          </span>
                          <span className="join-nav-name">{slide.title}</span>
                        </span>
                        <span className="join-nav-more">SEE MORE</span>
                      </span>
                      <span className="join-nav-desc">{slide.description}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="join-editorial">
              <div className="join-editorial-bg" aria-hidden />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  className="join-editorial-inner"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <span className="join-editorial-watermark" aria-hidden>
                    {String(active + 1).padStart(2, '0')}
                  </span>
                  <span className="join-editorial-index">({String(active + 1).padStart(2, '0')})</span>
                  <h3 className="join-editorial-title">{current.title}</h3>
                  <p className="join-editorial-lede">{current.description}</p>
                  <span className="join-editorial-rule" />
                  <p className="join-editorial-detail">{current.detail}</p>
                  <a href="#contact" className="btn-outline join-showcase-cta join-cta">
                    Apply now
                  </a>
                </motion.div>
              </AnimatePresence>

              <div className="join-progress-rail" role="tablist" aria-label="Roles">
                {SLIDES.map((slide, i) => (
                  <button
                    key={slide.title}
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    className={`join-progress-dot ${active === i ? 'join-progress-dot--active' : ''}`}
                    onClick={() => scrollToSlide(i)}
                    aria-label={`${slide.title}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container join-footer-block join-layer">
        <p className="join-statement">
          WE ARE BUSINESS CREATORS. WE CREATE BUSINESSES BY CONSTANT MOVEMENT AND ACCURATE CAPITAL ALLOCATION.
        </p>
      </div>
    </section>
  )
}

export default Join
