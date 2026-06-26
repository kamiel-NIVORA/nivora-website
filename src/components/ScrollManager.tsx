import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'

/** On route change: scroll to a hash target if present, otherwise jump to top.
 *  Uses the Lenis instance so it cooperates with the smooth-scroll wrapper. */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  // Stop the browser from restoring the previous scroll position on reload,
  // so a refresh always lands at the top (unless the URL carries a hash).
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        // Offset by the fixed navbar height so the target isn't hidden behind it.
        if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -96 })
        else el.scrollIntoView()
        return
      }
    }
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash, lenis])

  return null
}
