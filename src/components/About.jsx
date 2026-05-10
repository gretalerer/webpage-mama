import { motion } from 'framer-motion'
import YoutubeAutoplayIframe from './YoutubeAutoplayIframe'
import ShootingStarsBg from './ShootingStarsBg'
import './About.css'

const YOUTUBE_ID = 'mVXuN28Ismk'
const START_SEC = 15

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.15 },
  }),
}

function About() {
  return (
    <section className="about section" id="company">
      <ShootingStarsBg />

      <div className="about-inner container">
        <motion.p
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          Our Company
        </motion.p>
        <motion.div
          className="masked-title-wrapper"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
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
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={2}
        >
          We partner with companies and entrepreneurs to explore, develop, and scale new
          business opportunities. We lead projects end-to-end, connecting customers, partners,
          investors, and suppliers to launch new ventures.
        </motion.p>
        <motion.p
          className="about-body"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={3}
        >
          We originate opportunities, build ventures, and scale them by orchestrating
          the right ecosystem.
        </motion.p>
        <motion.a
          href="#portfolio"
          className="btn-outline about-cta"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={4}
        >
          Collection
        </motion.a>
      </div>
    </section>
  )
}

export default About
