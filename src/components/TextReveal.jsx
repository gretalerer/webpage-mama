import { useRef, useEffect, useState, useMemo } from 'react'
import './TextReveal.css'

function TextReveal({ text, className = '' }) {
  const containerRef = useRef(null)
  const [progress, setProgress] = useState(0)

  const words = useMemo(() => {
    const lines = text.split('\n')
    const result = []
    lines.forEach((line, lineIdx) => {
      const lineWords = line.trim().split(/\s+/)
      lineWords.forEach((word) => {
        result.push({ word, lineIdx })
      })
    })
    return result
  }, [text])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const windowH = window.innerHeight

      const start = windowH * 0.85
      const end = windowH * 0.25
      const raw = (start - rect.top) / (start - end)
      setProgress(Math.max(0, Math.min(1, raw)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <h2 ref={containerRef} className={`text-reveal ${className}`}>
      {words.map((item, i) => {
        const wordProgress = progress * words.length
        const opacity = Math.max(0.15, Math.min(1, wordProgress - i + 1))

        return (
          <span key={i} className="text-reveal-word" style={{ opacity }}>
            {item.word}
            {' '}
          </span>
        )
      })}
    </h2>
  )
}

export default TextReveal
