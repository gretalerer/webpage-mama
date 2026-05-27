import { motion } from 'framer-motion'
import YoutubeAutoplayIframe from './YoutubeAutoplayIframe'
import ShootingStarsBg from './ShootingStarsBg'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { fadeUpLarge, motionVariants } from '../animations'
import './About.css'

const YOUTUBE_ID = 'mVXuN28Ismk'
const START_SEC = 15
const viewport = { once: true, amount: 0.3 }

function About() {
  const reducedMotion = usePrefersReducedMotion()
  const variants = motionVariants(fadeUpLarge, reducedMotion)

  return (
    <section className="about section" id="company">
      <ShootingStarsBg />

      <div className="about-inner container">
        <motion.p
          className="section-label"
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={0}
        >
          Our Company
        </motion.p>
        <motion.div
          className="masked-title-wrapper"
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={1}
        >
          <div className="masked-title-video">
            <YoutubeAutoplayIframe
              videoId={YOUTUBE_ID}
              start={START_SEC}
              title="Masked background video"
              remountWhenVisible
              remountOnMobileInteraction
            />
          </div>
          <h2 className="masked-title">
            Where Opportunities<br />Become Companies
          </h2>
        </motion.div>
        <motion.p
          className="about-body"
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={2}
        >
          We partner with companies and entrepreneurs to explore, develop, and scale new
          business opportunities. We lead projects end-to-end, connecting customers, partners,
          investors, and suppliers to launch new ventures.
        </motion.p>
        <motion.p
          className="about-body"
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={3}
        >
          We originate opportunities, build ventures, and scale them by orchestrating
          the right ecosystem.
        </motion.p>
        <motion.a
          href="#portfolio"
          className="btn-outline about-cta"
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={4}
        >
          Collection
        </motion.a>
      </div>
    </section>
  )
}

export default About
