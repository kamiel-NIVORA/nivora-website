/**
 * Blog analytics, first-party en cookieloos-licht.
 *
 * Elke blogpagina meldt zich bij de gedeelde Supabase `blog_events` tabel
 * (anon mag alleen INSERTEN, nooit lezen; RLS). Het Nivora AIOS-dashboard
 * leest de aggregaties terug via de get_blog_stats* RPC's.
 *
 * Per bezoek (sessie) sturen we:
 *  - 1 `view` event zodra het artikel echt gerenderd is;
 *  - `ping` events met de ACTIEVE leestijd (tabblad zichtbaar) en de maximale
 *    scroll-diepte, elke 15s zolang er iets veranderde, plus een afsluitende
 *    ping bij wegnavigeren/tab sluiten (fetch keepalive overleeft pagehide).
 * De bezoeker krijgt een anoniem first-party id in localStorage zodat het
 * dashboard unieke lezers kan tellen. Analytics mag NOOIT de pagina breken:
 * alles zit in try/catch en fouten worden stil genegeerd.
 */
import { useEffect, useRef } from 'react'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/lib/blog'
import { getCookieConsent } from '@/components/CookieConsent'

const ENDPOINT = `${SUPABASE_URL}/rest/v1/blog_events`
const PING_INTERVAL_MS = 15_000
const MAX_PINGS = 40 // ~10 min actieve meting per sessie; de slot-ping blijft altijd werken
const MAX_SECONDS = 14_400
// Eén settle mag nooit meer dan 2 ping-intervallen optellen: een grotere gap
// betekent dat timers stilstonden (slaap/achtergrond) en is dus geen leestijd.
const MAX_DELTA_S = (PING_INTERVAL_MS / 1000) * 2
// Zichtbaar tabblad zonder enige interactie: na 90s pauzeert de klok, zodat een
// vergeten open tab de gemiddelde leestijd niet kan vergiftigen.
const IDLE_LIMIT_MS = 90_000

const uuid = (): string =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`

/**
 * Anoniem first-party bezoekers-id, ALLEEN wanneer de bezoeker cookies heeft
 * geaccepteerd (nivora.consent). Zonder acceptatie raken we localStorage niet
 * aan en sturen we geen id mee: de meting blijft dan puur geaggregeerd
 * (weergaven/leestijd), zonder herkenning over bezoeken heen.
 */
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

/** Verkeersbron: hostnaam van de verwijzer, 'intern' voor eigen navigatie, '' voor direct. */
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

function send(payload: Record<string, unknown>): void {
  try {
    void fetch(ENDPOINT, {
      method: 'POST',
      keepalive: true,
      headers: {
        'content-type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    }).catch(() => {})
  } catch {
    /* analytics mag nooit de pagina breken */
  }
}

/**
 * Meet één artikel-bezoek. Geef `slug` pas door zodra het artikel bestaat
 * (undefined = nog niet meten); bij een slug-wissel start een nieuwe sessie.
 * De taal reist mee via een ref: een NL/EN-wissel mid-artikel verandert de
 * payload maar start GEEN nieuwe sessie (zou anders een extra view tellen).
 */
export function useBlogAnalytics(slug: string | undefined, lang: string): void {
  const langRef = useRef(lang)
  langRef.current = lang

  useEffect(() => {
    if (!slug || typeof window === 'undefined') return
    if (navigator.webdriver) return // bots/e2e-tests niet meetellen
    if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return

    const base = {
      slug,
      session_id: uuid(),
      visitor_id: visitorId(),
      referrer: refSource(),
      path: location.pathname.slice(0, 300),
      device: deviceType(),
    }
    const payloadLang = () => (langRef.current || 'en').slice(0, 10)

    let activeSeconds = 0
    let visibleSince: number | null = document.visibilityState === 'visible' ? performance.now() : null
    let lastActivityAt = performance.now()
    let maxScroll = 0
    let lastSentSeconds = -1
    let lastSentScroll = -1
    let pings = 0

    const settleActive = () => {
      if (visibleSince != null) {
        activeSeconds += Math.min((performance.now() - visibleSince) / 1000, MAX_DELTA_S)
        visibleSince = performance.now()
      }
    }

    // Interactie = bewijs van aanwezigheid: klok (her)start wanneer de lezer
    // iets doet terwijl het tabblad zichtbaar is.
    const markActivity = () => {
      lastActivityAt = performance.now()
      if (visibleSince == null && document.visibilityState === 'visible') visibleSince = performance.now()
    }

    const ping = (force = false) => {
      settleActive()
      const seconds = Math.min(Math.round(activeSeconds), MAX_SECONDS)
      const scroll = maxScroll
      if (!force && seconds === lastSentSeconds && scroll === lastSentScroll) return
      if (!force && pings >= MAX_PINGS) return
      pings += 1
      lastSentSeconds = seconds
      lastSentScroll = scroll
      send({ ...base, lang: payloadLang(), event: 'ping', seconds, scroll_pct: scroll })
    }

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        visibleSince = performance.now()
        lastActivityAt = performance.now()
      } else {
        settleActive()
        visibleSince = null
        ping()
      }
    }

    const onScroll = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const pct = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 100
      if (pct > maxScroll) maxScroll = Math.min(100, Math.max(0, pct))
      markActivity()
    }

    const onPageHide = () => ping(true)

    send({ ...base, lang: payloadLang(), event: 'view', seconds: 0, scroll_pct: 0 })
    onScroll()

    const interval = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      if (performance.now() - lastActivityAt > IDLE_LIMIT_MS) {
        // Lezer is er even niet: tel het stuk tot nu en pauzeer de klok.
        settleActive()
        visibleSince = null
        return
      }
      ping()
    }, PING_INTERVAL_MS)
    const activityEvents: (keyof WindowEventMap)[] = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart']
    activityEvents.forEach((ev) => window.addEventListener(ev, markActivity, { passive: true }))
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', onPageHide)

    return () => {
      window.clearInterval(interval)
      activityEvents.forEach((ev) => window.removeEventListener(ev, markActivity))
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', onPageHide)
      ping(true) // SPA-navigatie weg van het artikel telt ook als einde
    }
  }, [slug])
}
