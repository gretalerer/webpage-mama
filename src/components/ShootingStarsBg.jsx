import './ShootingStarsBg.css'

/** Accent motion layer — same language as the About section. */
export default function ShootingStarsBg({ className = '' }) {
  return (
    <div className={`shooting-stars ${className}`.trim()} aria-hidden>
      <div className="star star--1" />
      <div className="star star--2" />
      <div className="star star--3" />
    </div>
  )
}
