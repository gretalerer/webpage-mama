import { motion, AnimatePresence } from 'framer-motion'
import ShootingStarsBg from './ShootingStarsBg'
import { useCarousel } from '../hooks/useCarousel'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { joinMotion } from '../animations'
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
  const { active, goTo } = useCarousel({ itemCount: SLIDES.length })
  const reducedMotion = usePrefersReducedMotion()
  const slideMotion = joinMotion(reducedMotion)
  const current = SLIDES[active]
  const indexLabel = String(active + 1).padStart(2, '0')

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

      <div className="join-scroll-track join-layer">
        <div className="join-showcase-sticky">
          <div className="container join-showcase-grid">
            <nav className="join-showcase-nav" aria-label="Journey roles">
              <ul className="join-nav-list">
                {SLIDES.map((slide, i) => (
                  <li key={slide.title}>
                    <button
                      type="button"
                      className={`join-nav-item ${active === i ? 'join-nav-item--active' : ''}`}
                      onClick={() => goTo(i)}
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
                  initial={slideMotion.initial}
                  animate={slideMotion.animate}
                  exit={slideMotion.exit}
                  transition={slideMotion.transition}
                >
                  <span className="join-editorial-watermark" aria-hidden>
                    {indexLabel}
                  </span>
                  <span className="join-editorial-index">({indexLabel})</span>
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
                    onClick={() => goTo(i)}
                    aria-label={slide.title}
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
