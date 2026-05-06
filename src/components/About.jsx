import { motion } from 'framer-motion'
import './About.css'

const YOUTUBE_ID = 'mVXuN28Ismk'

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
      <div className="shooting-stars">
        <div className="star star--1" />
        <div className="star star--2" />
        <div className="star star--3" />
      </div>

      <div className="about-inner container">
        <motion.div
          className="masked-title-wrapper"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          <div className="masked-title-video">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&start=15&playsinline=1&disablekb=1&iv_load_policy=3`}
              title="Masked background video"
              allow="autoplay; encrypted-media"
              frameBorder="0"
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
          custom={1}
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
          custom={2}
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
          custom={3}
        >
          Collection
        </motion.a>
      </div>
    </section>
  )
}

export default About
