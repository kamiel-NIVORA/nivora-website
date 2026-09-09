import { useEffect, useState } from 'react'
import { LangLink as Link } from '@/components/ui/LangLink'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { useLang } from '@/i18n'

/**
 * Cookie consent, in the site's glass language: one small frosted card, bottom
 * left, top hairline, soft sheen. The choice lands in localStorage; nothing
 * that needs consent runs before "accepted" (analytics added later must check
 * getCookieConsent() first). Shown once, after a short beat so it never fights
 * the hero.
 *
 * De twee knoppen zijn BEWUST identiek. De Gegevensbeschermingsautoriteit
 * verwacht dat weigeren even zichtbaar en even bereikbaar is als aanvaarden,
 * in dezelfde laag van de banner. Een gevulde witte "Accepteren" naast een
 * grijs "Weigeren" met een randje is sturen via design, en dat maakt de
 * toestemming ongeldig. Geef deze twee knoppen dus nooit een verschillende
 * kleur, grootte of volgorde-nadruk.
 */

const STORAGE_KEY = 'nivora.consent'
/** Waarmee de footerlink de vraag opnieuw oproept. Intrekken moet even
 *  makkelijk zijn als geven. */
export const COOKIE_SETTINGS_EVENT = 'nivora:cookie-settings'

export type CookieChoice = 'accepted' | 'declined'

export function getCookieConsent(): CookieChoice | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v === 'accepted' || v === 'declined' ? v : null
  } catch {
    return null
  }
}

/** Haalt de cookievraag terug op het scherm, vanaf eender welke pagina. */
export function openCookieSettings(): void {
  try {
    window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))
  } catch {
    /* geen window: niets te doen */
  }
}

const COPY = {
  en: {
    title: 'We use cookies',
    body: 'This site stores three small things to work properly, and one more only if you accept: a random number so repeat visits count as one reader. Read what each one does in our ',
    privacy: 'privacy policy',
    bodyEnd: '.',
    accept: 'Accept',
    decline: 'Decline',
  },
  nl: {
    title: 'Wij gebruiken cookies',
    body: 'Deze site bewaart drie kleine dingen om te werken, en één extra alleen als u aanvaardt: een willekeurig getal zodat herhaalbezoek als één lezer telt. Lees wat elk ding doet in ons ',
    privacy: 'privacybeleid',
    bodyEnd: '.',
    accept: 'Accepteren',
    decline: 'Weigeren',
  },
} as const

export function CookieConsent() {
  const { lang } = useLang()
  const t = COPY[lang]
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (getCookieConsent()) return
    const id = window.setTimeout(() => setOpen(true), 1400)
    return () => window.clearTimeout(id)
  }, [])

  /* De footerlink "Cookievoorkeuren" roept de vraag opnieuw op, ook als er al
     lang een keuze staat. */
  useEffect(() => {
    const reopen = () => setOpen(true)
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen)
  }, [])

  const choose = (value: CookieChoice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
      /* Weigeren wist ook wat een eerdere "accepteren" achterliet, anders
         blijft het bezoekers-id staan na een intrekking. */
      if (value === 'declined') window.localStorage.removeItem('nv_vid')
    } catch {
      /* private mode: the card simply stays away for this visit */
    }
    setOpen(false)
  }

  /* Identieke opmaak voor beide knoppen. Zie de noot bovenaan dit bestand. */
  const buttonClass =
    'flex-1 rounded-full border border-line-strong bg-white/[0.06] px-5 py-2.5 text-[13.5px] font-medium text-ink transition-colors hover:bg-white/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40'

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label={t.title}
          className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-[420px] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:mx-0"
        >
          <div className="relative overflow-hidden rounded-[26px] border border-line bg-[#0a0a0c]/85 p-5 shadow-[0_35px_90px_-35px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="pointer-events-none absolute -top-20 right-[-40px] h-44 w-44 rounded-full bg-white/[0.06] blur-3xl" />

            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-white/[0.05] text-faint">
                <Cookie className="h-[17px] w-[17px]" strokeWidth={1.8} />
              </span>
              <p className="font-serif text-[17px] leading-snug text-ink">{t.title}</p>
            </div>

            <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
              {t.body}
              <Link to="/privacy" className="underline decoration-white/30 underline-offset-2 transition-colors hover:text-ink">
                {t.privacy}
              </Link>
              {t.bodyEnd}
            </p>

            <div className="mt-4 flex gap-2.5">
              <button type="button" onClick={() => choose('declined')} className={buttonClass}>
                {t.decline}
              </button>
              <button type="button" onClick={() => choose('accepted')} className={buttonClass}>
                {t.accept}
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
