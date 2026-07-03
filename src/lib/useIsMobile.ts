import { useEffect, useState } from 'react'

/**
 * True on narrow (phone / small-tablet) viewports. Used to switch OFF the heavy
 * scroll-driven transforms and shrink the fixed-px icon clusters that jank or
 * overflow on mobile, while leaving the desktop experience untouched.
 *
 * SSR-safe: starts false, syncs on mount. Default breakpoint 1024px mirrors
 * Tailwind's `lg` (where the bento / multi-column layouts kick in).
 */
export function useIsMobile(maxWidth = 1024): boolean {
  const query = `(max-width: ${maxWidth - 0.02}px)`
  // Initialise with the REAL value on the first client render (the app is CSR via
  // createRoot, so there is no hydration mismatch). This matters for perf: a hook
  // that starts false renders mobile-gated `{!isMobile && <img>}` once before the
  // effect flips it, and the browser downloads that heavy image anyway. Starting
  // correct means those images never render, so they never download on phones.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    setIsMobile(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return isMobile
}
