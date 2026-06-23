import { useEffect, useRef, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

type Props = {
  /** file under /media, without extension, e.g. "brain" */
  name: string
  className?: string
  style?: CSSProperties
  /** Black-bg footage blends onto dark surfaces (only the light shows). */
  blend?: boolean
  fit?: 'cover' | 'contain'
}

/**
 * Looping, muted, autoplay background video for the service pages.
 *
 * The clips are black-background animations, so `mix-blend-screen` drops the
 * black and lets only the luminous motion read over the OLED page. A poster
 * (first frame) covers load and reduced-motion (where the clip stays paused on
 * its first frame). An IntersectionObserver pauses the video off-screen so a
 * page with several clips never decodes them all at once.
 */
export function LoopVideo({ name, className, style, blend = true, fit = 'cover' }: Props) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  return (
    <video
      ref={ref}
      src={`/media/${name}.mp4`}
      poster={`/media/${name}.jpg`}
      autoPlay={!reduced}
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden
      className={cn(fit === 'cover' ? 'object-cover' : 'object-contain', className)}
      style={{ ...(blend ? { mixBlendMode: 'screen' } : null), ...style }}
    />
  )
}
