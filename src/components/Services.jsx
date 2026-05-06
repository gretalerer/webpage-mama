import { useState, useEffect, useCallback } from 'react'
import TextReveal from './TextReveal'
import QuantumNodes from './QuantumNodes'
import scalingImg from '../assets/scaling-expansion.png'
import './Services.css'

const projects = [
  {
    number: '01',
    title: 'Opportunity Origination',
    category: 'Strategy',
    year: '2026',
    description: 'Identify high-potential business opportunities across targeted industries.',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1400&h=900&fit=crop',
  },
  {
    number: '02',
    title: 'Venture Building',
    category: 'Execution',
    year: '2026',
    description: 'Design, structure, and launch new ventures from concept to execution.',
    image: 'https://images.unsplash.com/photo-1533518463841-d62e1fc91373?w=1400&h=900&fit=crop',
  },
  {
    number: '03',
    title: 'Ecosystem Orchestration',
    category: 'Partnerships',
    year: '2026',
    description: 'Bring together customers, partners, investors, and suppliers to create scalable businesses.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=900&fit=crop',
  },
  {
    number: '04',
    title: 'Execution & Delivery',
    category: 'Operations',
    year: '2026',
    description: 'Lead projects end-to-end with a strong focus on implementation, not just strategy.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1400&h=900&fit=crop',
  },
  {
    number: '05',
    title: 'Scaling & Expansion',
    category: 'Growth',
    year: '2026',
    description: 'Support growth and expansion across global markets, including LATAM, the U.S., Europe and Asia.',
    image: scalingImg,
  },
]


function Services() {
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const total = projects.length

  const goTo = useCallback((idx) => {
    if (transitioning || idx === active) return
    setPrev(active)
    setActive(idx)
    setTransitioning(true)
    setTimeout(() => setTransitioning(false), 900)
  }, [transitioning, active])

  const next = useCallback(() => goTo((active + 1) % total), [active, total, goTo])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  const project = projects[active]
  const prevProject = projects[prev]

  return (
    <section className="services section" id="services">
      <QuantumNodes className="services-nodes" />

      <div className="container">
        <TextReveal
          text={"WE ARE CRAFTSMEN. CRAFTSMEN OF BUSINESS CREATION.\nWE CREATE BUSINESSES FOR OURSELVES AND FOR OTHERS."}
          className="services-headline"
        />
      </div>

      <div className="drift-showcase">
        <div className="drift-bg drift-bg--prev">
          <img src={prevProject.image} alt={prevProject.title} />
        </div>
        <div className={`drift-bg ${transitioning ? 'drift-bg--entering' : 'drift-bg--active'}`}>
          <img src={project.image} alt={project.title} />
        </div>
        <div className="drift-overlay" />

        <div className="drift-card drift-card--in">
          <div className="drift-card-thumb">
            <img src={project.image} alt={project.title} />
          </div>
          <div className="drift-card-info">
            <div className="drift-card-top">
              <span className="drift-card-number">{project.number}</span>
              <span className="drift-card-title">{project.title}</span>
            </div>
            <div className="drift-card-meta">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            <p className="drift-card-desc">{project.description}</p>
          </div>
        </div>

        <div className="drift-dots">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`drift-dot ${i === active ? 'drift-dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
