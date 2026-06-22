import { useEffect, useState } from 'react'

/**
 * True when the visitor asked their OS to reduce motion. Used to swap the
 * looping product-card animations (Box converge, Voice wave) for a quiet
 * static frame. SSR-safe: starts false, syncs on mount.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
