import { useState, useEffect, useRef, useCallback } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Shared carousel state for index-based sliders.
 * @param {object} options
 * @param {number} options.itemCount
 * @param {number} [options.initialIndex=0]
 * @param {number|null} [options.autoPlayInterval=null] — ms between auto-advance (disabled when reduced motion)
 * @param {number} [options.transitionMs=0] — lock duration for crossfade transitions (Services)
 */
export function useCarousel({
  itemCount,
  initialIndex = 0,
  autoPlayInterval = null,
  transitionMs = 0,
}) {
  const reducedMotion = usePrefersReducedMotion()
  const [active, setActive] = useState(initialIndex)
  const [prev, setPrev] = useState(initialIndex)
  const [transitioning, setTransitioning] = useState(false)
  const intervalRef = useRef(null)
  const transitionRef = useRef(null)

  const goTo = useCallback(
    (idx) => {
      const next = ((idx % itemCount) + itemCount) % itemCount
      if (next === active) return
      if (transitionMs > 0 && transitioning) return

      setPrev(active)
      setActive(next)

      if (transitionMs > 0) {
        setTransitioning(true)
        clearTimeout(transitionRef.current)
        transitionRef.current = setTimeout(() => setTransitioning(false), transitionMs)
      }
    },
    [active, itemCount, transitionMs, transitioning]
  )

  const next = useCallback(() => {
    goTo(active + 1)
  }, [active, goTo])

  const resetAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current)
    if (!autoPlayInterval || reducedMotion) return
    intervalRef.current = setInterval(next, autoPlayInterval)
  }, [autoPlayInterval, next, reducedMotion])

  useEffect(() => {
    resetAutoPlay()
    return () => clearInterval(intervalRef.current)
  }, [resetAutoPlay])

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(transitionRef.current)
    }
  }, [])

  const goToAndResetAutoPlay = useCallback(
    (idx) => {
      goTo(idx)
      resetAutoPlay()
    },
    [goTo, resetAutoPlay]
  )

  return {
    active,
    prev,
    transitioning,
    goTo,
    goToAndResetAutoPlay,
    next,
  }
}
