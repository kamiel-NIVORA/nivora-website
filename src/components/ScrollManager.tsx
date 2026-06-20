import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'

/** On route change: scroll to a hash target if present, otherwise jump to top.
 *  Uses the Lenis instance so it cooperates with the smooth-scroll wrapper. */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        if (lenis) lenis.scrollTo(el as HTMLElement)
        else el.scrollIntoView()
        return
      }
    }
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash, lenis])

  return null
}
