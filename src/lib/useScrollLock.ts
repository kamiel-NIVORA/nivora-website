import { useEffect } from 'react'

/**
 * Locks page scroll while `active` is true.
 *
 * Lenis is mounted with its defaults (syncTouch: false), so on touch devices it
 * does NOT intercept finger scrolling and `lenis.stop()` alone lets the page
 * scroll behind overlays. This applies a real native lock and compensates for
 * the scrollbar width so desktop layout doesn't shift when it engages. One
 * shared implementation for the mobile menu, the contact modal, and any future
 * overlay, so they all lock correctly on phone and tablet.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const { body } = document
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = body.style.overflow
    const prevPaddingRight = body.style.paddingRight
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPaddingRight
    }
  }, [active])
}
