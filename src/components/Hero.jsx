import { motion } from 'framer-motion'
import YoutubeAutoplayIframe from './YoutubeAutoplayIframe'
import './Hero.css'

const YOUTUBE_ID = 'mVXuN28Ismk'
const START_SEC = 15

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 + i * 0.2 },
  }),
}

function Hero() {
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
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          AI COLLAPSED TIME. MOVEMENT IS THE NEW CAPITAL
        </motion.p>
        <motion.h1
          className="hero-title"
          variants={fadeIn}
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
          variants={fadeIn}
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
