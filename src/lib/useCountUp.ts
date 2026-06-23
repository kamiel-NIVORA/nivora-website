import { useEffect, useState } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

/**
 * Spring-animated number. Counts up from 0 on first render, then eases toward
 * the new target whenever it changes, so a slider drag reads as cause and
 * effect. Honours prefers-reduced-motion by snapping straight to the value.
 */
export function useCountUp(target: number): number {
  const reduced = usePrefersReducedMotion()
  const mv = useMotionValue(0)
  // Fast but over-damped: it reaches the amount quickly (Kamiel: it was "supertraag"
  // before) yet never overshoots or snaps, so the number settles cleanly.
  const spring = useSpring(mv, { stiffness: 150, damping: 26, mass: 1, restDelta: 2 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (reduced) {
      setDisplay(target)
      return
    }
    mv.set(target)
  }, [target, reduced, mv])

  useEffect(() => {
    if (reduced) return
    const unsub = spring.on('change', (v) => setDisplay(v))
    return () => unsub()
  }, [spring, reduced])

  return reduced ? target : display
}
