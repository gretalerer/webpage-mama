import { motion } from 'framer-motion'
import YoutubeAutoplayIframe from './YoutubeAutoplayIframe'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { fadeIn, motionVariants } from '../animations'
import './Hero.css'

const YOUTUBE_ID = 'mVXuN28Ismk'
const START_SEC = 15

function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const variants = motionVariants(fadeIn, reducedMotion)

  return (
    <section className="hero">
      <div className="hero-video-wrapper">
        <YoutubeAutoplayIframe
          className="hero-video"
          videoId={YOUTUBE_ID}
          start={START_SEC}
          title="Background video"
          remountWhenVisible
          remountOnMobileInteraction
        />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content container">
        <motion.p
          className="hero-tagline"
          variants={variants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          AI COLLAPSED TIME. MOVEMENT IS THE NEW CAPITAL
        </motion.p>
        <motion.h1
          className="hero-title"
          variants={variants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          We Turn Time, Movement,<br />
          and Ecosystems Into Ventures.
        </motion.h1>
        <motion.a
          href="#contact"
          className="btn-primary"
          variants={variants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Contact us
        </motion.a>
      </div>
    </section>
  )
}

export default Hero
