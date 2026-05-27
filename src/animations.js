const EASE = [0.25, 0.1, 0.25, 1]

const staticVisible = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
}

/** Portfolio section — scroll-triggered fade up */
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.12 },
  }),
}

/** About section — slightly larger travel */
export const fadeUpLarge = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: i * 0.15 },
  }),
}

/** Hero — on-load stagger */
export const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE, delay: 0.3 + i * 0.2 },
  }),
}

/** Join editorial panel */
export const joinSlide = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.42, ease: EASE },
}

export const joinSlideReduced = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: 0 },
  transition: { duration: 0 },
}

/** Returns motion variants with animation disabled when user prefers reduced motion. */
export function motionVariants(variants, reducedMotion) {
  return reducedMotion ? staticVisible : variants
}

export function joinMotion(reducedMotion) {
  return reducedMotion ? joinSlideReduced : joinSlide
}
