import './SectionDivider.css'

function SectionDivider({ flip = false }) {
  return (
    <div className={`section-divider ${flip ? 'section-divider--flip' : ''}`}>
      <div className="section-divider-glow" />
      <div className="section-divider-line" />
      <div className="section-divider-dot" />
    </div>
  )
}

export default SectionDivider
