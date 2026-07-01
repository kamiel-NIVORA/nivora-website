import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { useLang } from '@/i18n'

/**
 * Cookie consent, in the site's glass language: one small frosted card, bottom
 * left, top hairline, soft sheen. The choice lands in localStorage; nothing
 * that needs consent runs before "accepted" (analytics added later must check
 * getCookieConsent() first). Shown once, after a short beat so it never fights
 * the hero.
 */

const STORAGE_KEY = 'nivora.consent'

export type CookieChoice = 'accepted' | 'declined'

export function getCookieConsent(): CookieChoice | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v === 'accepted' || v === 'declined' ? v : null
  } catch {
    return null
  }
}

const COPY = {
  en: {
    title: 'Cookies, the short version',
    body: 'We use a few small cookies to make the site work properly and, only with your OK, to see anonymously which pages help people most. The details live in our ',
    privacy: 'privacy policy',
    bodyEnd: '.',
    accept: 'Sounds good',
    decline: 'Only the essentials',
  },
  nl: {
    title: 'Cookies, de korte versie',
    body: 'We gebruiken enkele kleine cookies om de site goed te laten werken en, alleen met uw akkoord, om anoniem te zien welke pagina’s mensen het meest helpen. De details staan in ons ',
    privacy: 'privacybeleid',
    bodyEnd: '.',
    accept: 'Prima zo',
    decline: 'Enkel het nodige',
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

  const choose = (value: CookieChoice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* private mode: the card simply stays away for this visit */
    }
    setOpen(false)
  }

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

            <div className="mt-4 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => choose('accepted')}
                className="rounded-full bg-[#f5f5f5] px-5 py-2.5 text-[13.5px] font-medium text-[#0a0a0c] transition-colors hover:bg-white"
              >
                {t.accept}
              </button>
              <button
                type="button"
                onClick={() => choose('declined')}
                className="rounded-full border border-line bg-white/[0.04] px-5 py-2.5 text-[13.5px] text-muted transition-colors hover:bg-white/[0.09] hover:text-ink"
              >
                {t.decline}
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
