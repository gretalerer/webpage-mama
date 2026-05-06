import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import founderImg from '../assets/founder.jpg'
import './Founder.css'

function Founder() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.35'],
  })

  const xTop = useTransform(scrollYProgress, [0, 1], ['50vw', '0vw'])
  const yTop = useTransform(scrollYProgress, [0, 1], ['-40px', '0px'])
  const xBottom = useTransform(scrollYProgress, [0, 1], ['-50vw', '0vw'])
  const yBottom = useTransform(scrollYProgress, [0, 1], ['40px', '0px'])
  const imgScale = useTransform(scrollYProgress, [0, 0.6], [0.92, 1])
  const imgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section className="founder section" id="about" ref={sectionRef}>
      <div className="founder-inner container">

        <div className="founder-hero">
          <motion.span
            className="founder-typo founder-typo-top"
            style={{ x: xTop, y: yTop }}
          >
            life is
          </motion.span>

          <motion.div
            className="founder-image-frame"
            style={{ scale: imgScale, opacity: imgOpacity }}
          >
            <img src={founderImg} alt="Marina Wasserman" className="founder-photo" />
          </motion.div>

          <motion.span
            className="founder-typo founder-typo-bottom"
            style={{ x: xBottom, y: yBottom }}
          >
            movement
          </motion.span>
        </div>

        <div className="founder-bio">
          <p>
          Marina Wasserman is a senior executive with more than 35 years of experience in banking, fintech, and cross-border payments. 
          Throughout her career, she has held leadership roles at Citibank, Visa, and Mastercard, as well as at leading payment service providers such as Paysafe.
          </p>
          <p>
          As Founder and Director of Movements.Capital, Marina partners with companies and entrepreneurs to identify and develop new business opportunities, 
          leading projects from concept to execution by bringing together customers, partners, investors, and suppliers to build successful ventures.
          The firm maintains a curated portfolio of projects across the fintech, digital payments, entertainment, wellness, and hospitality industries, spanning Latin America,
          Europe, the United States, Asia, and the UAE.
          </p>
          <a href="#contact" className="btn-outline about-cta">
            Contact us
          </a>
        </div>

      </div>
    </section>
  )
}

export default Founder
