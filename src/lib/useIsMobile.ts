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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth - 0.02}px)`)
    setIsMobile(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [maxWidth])

  return isMobile
}
