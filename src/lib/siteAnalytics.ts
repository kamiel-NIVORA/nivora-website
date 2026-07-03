/**
 * Site-wide first-party bezoekers-meting (alle pagina's, niet enkel de blog).
 *
 * Elke route meldt zich bij de Supabase Edge Function `track`, die de meting
 * server-side wegschrijft naar `page_events` en, op basis van het IP (dat de
 * browser zelf niet kent), een Leadinfo-achtige bedrijfsherkenning doet naar
 * `visitor_companies`. Het ruwe IP wordt NOOIT bewaard, enkel een gezouten hash.
 *
 * Per bezoek sturen we een `view` zodra de pagina laadt en een afsluitende
 * `ping` met de ACTIEVE tijd op de pagina (zichtbaar tabblad) bij wegnavigeren.
 * De meting mag NOOIT de pagina breken: alles zit in try/catch, faalt stil, en
 * gebruikt sendBeacon/keepalive zodat de laatste ping het sluiten overleeft.
 *
 * Aggregatie (weergaven, tijd, bedrijven) is cookieloos; een persistent
 * bezoekers-id bewaren we alleen bij cookie-consent, net als de blog-meting.
 */
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { SUPABASE_URL } from '@/lib/blog'
import { getCookieConsent } from '@/components/CookieConsent'

const ENDPOINT = `${SUPABASE_URL}/functions/v1/track`
const IDLE_LIMIT_MS = 90_000
const SETTLE_TICK_MS = 15_000
const MAX_DELTA_S = (SETTLE_TICK_MS / 1000) * 2
const MAX_SECONDS = 14_400

const uuid = (): string =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`

/** Anoniem first-party bezoekers-id, alleen bij cookie-consent (nivora.consent). */
function visitorId(): string | null {
  if (getCookieConsent() !== 'accepted') return null
  try {
    const key = 'nv_vid'
    let v = localStorage.getItem(key)
    if (!v) {
      v = uuid()
      localStorage.setItem(key, v)
    }
    return v.slice(0, 64)
  } catch {
    return null
  }
}

function refSource(): string {
  try {
    if (!document.referrer) return ''
    const u = new URL(document.referrer)
    if (u.hostname === location.hostname) return 'intern'
    return u.hostname.replace(/^www\./, '').slice(0, 200)
  } catch {
    return ''
  }
}

function deviceType(): string {
  const ua = navigator.userAgent
  if (/iPad|Tablet/i.test(ua)) return 'tablet'
  if (/Mobi|Android|iPhone/i.test(ua)) return 'mobile'
  return 'desktop'
}

/** Simple request (text/plain, geen auth-headers) => geen CORS-preflight; body is JSON. */
function send(payload: Record<string, unknown>, beacon = false): void {
  try {
    const bodyStr = JSON.stringify(payload)
    if (beacon && typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon(ENDPOINT, new Blob([bodyStr], { type: 'text/plain' }))
      return
    }
    void fetch(ENDPOINT, {
      method: 'POST',
      keepalive: true,
      headers: { 'content-type': 'text/plain' },
      body: bodyStr,
    }).catch(() => {})
  } catch {
    /* meting mag de pagina nooit breken */
  }
}

/** Meet het huidige route-bezoek. Bij een pad-wissel start een nieuwe sessie. */
export function useSiteAnalytics(): void {
  const { pathname } = useLocation()
  const langRef = useRef<string>('')
  try {
    langRef.current = pathname === '/nl' || pathname.startsWith('/nl/') ? 'nl' : 'en'
  } catch {
    /* ignore */
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (navigator.webdriver) return // bots/e2e niet meetellen
    if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return

    const base = {
      session_id: uuid(),
      visitor_id: visitorId(),
      referrer: refSource(),
      device: deviceType(),
    }

    let activeSeconds = 0
    let visibleSince: number | null = document.visibilityState === 'visible' ? performance.now() : null
    let lastActivityAt = performance.now()
    let maxScroll = 0
    let ended = false

    const settle = () => {
      if (visibleSince != null) {
        activeSeconds += Math.min((performance.now() - visibleSince) / 1000, MAX_DELTA_S)
        visibleSince = performance.now()
      }
    }
    const markActivity = () => {
      lastActivityAt = performance.now()
      if (visibleSince == null && document.visibilityState === 'visible') visibleSince = performance.now()
    }
    const seconds = () => {
      settle()
      return Math.min(Math.round(activeSeconds), MAX_SECONDS)
    }
    const onScroll = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const pct = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 100
      if (pct > maxScroll) maxScroll = Math.min(100, Math.max(0, pct))
      markActivity()
    }
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        visibleSince = performance.now()
        lastActivityAt = performance.now()
      } else {
        settle()
        visibleSince = null
      }
    }
    const end = (beacon: boolean) => {
      if (ended) return
      ended = true
      send({ ...base, path: location.pathname.slice(0, 300), lang: langRef.current, event: 'ping', seconds: seconds(), scroll_pct: maxScroll }, beacon)
    }
    const onPageHide = () => end(true)

    // view
    send({ ...base, path: location.pathname.slice(0, 300), lang: langRef.current, event: 'view', seconds: 0, scroll_pct: 0 })
    onScroll()

    const interval = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      if (performance.now() - lastActivityAt > IDLE_LIMIT_MS) {
        settle()
        visibleSince = null
      }
    }, SETTLE_TICK_MS)

    const activity: (keyof WindowEventMap)[] = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart']
    activity.forEach((ev) => window.addEventListener(ev, markActivity, { passive: true }))
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', onPageHide)

    return () => {
      window.clearInterval(interval)
      activity.forEach((ev) => window.removeEventListener(ev, markActivity))
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', onPageHide)
      end(false) // SPA-navigatie weg van de pagina telt ook als einde
    }
  }, [pathname])
}
