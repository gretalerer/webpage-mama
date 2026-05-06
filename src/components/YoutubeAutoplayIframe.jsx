import { useEffect, useMemo, useRef, useState } from 'react'

function buildEmbedSrc(videoId, startSec, nonce) {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    playsinline: '1',
    loop: '1',
    playlist: videoId,
    controls: '0',
    rel: '0',
    modestbranding: '1',
    start: String(startSec),
    disablekb: '1',
    iv_load_policy: '3',
    enablejsapi: '1',
  })
  if (typeof window !== 'undefined' && window.location?.origin) {
    params.set('origin', window.location.origin)
  }
  const base = `https://www.youtube.com/embed/${videoId}?${params.toString()}`
  return nonce ? `${base}&_kick=${nonce}` : base
}

/**
 * YouTube background embed tuned for mobile autoplay (muted + playsinline +
 * full Permissions-Policy allow list). Remounting retries playback when iOS
 * blocks the first load or when the iframe was off-screen.
 */
export default function YoutubeAutoplayIframe({
  videoId,
  start = 15,
  title,
  className,
  /** Below-the-fold embeds: remount once when sufficiently visible. */
  remountWhenVisible = false,
  /** First tap/scroll press: remount so autoplay can start after gesture. */
  remountOnMobileInteraction = false,
}) {
  const [kick, setKick] = useState(0)
  const wrapRef = useRef(null)

  const src = useMemo(
    () => buildEmbedSrc(videoId, start, kick),
    [videoId, start, kick]
  )

  useEffect(() => {
    if (!remountOnMobileInteraction) return
    const coarse =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: coarse)').matches
    const uaMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (!coarse && !uaMobile) return

    let fired = false
    const bump = () => {
      if (fired) return
      fired = true
      setKick((k) => k + 1)
    }
    window.addEventListener('pointerdown', bump, { passive: true, once: true })
    return () => window.removeEventListener('pointerdown', bump)
  }, [remountOnMobileInteraction])

  useEffect(() => {
    if (!remountWhenVisible || !wrapRef.current) return
    const el = wrapRef.current
    let done = false
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting && e.intersectionRatio >= 0.12)
        if (!hit || done) return
        done = true
        setKick((k) => k + 1)
        obs.disconnect()
      },
      { threshold: [0, 0.12, 0.25] }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [remountWhenVisible])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <iframe
        key={src}
        className={className}
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}
