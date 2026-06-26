import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Mail, Phone, X, type LucideIcon } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { CONTACT, SOCIAL_LINKS } from '@/data/contact'
import { cn } from '@/lib/utils'
import { useScrollLock } from '@/lib/useScrollLock'
import { useLang } from '@/i18n'

const ease = [0.22, 1, 0.36, 1] as const

const COPY = {
  en: {
    dialogLabel: 'Get in touch',
    kicker: 'Contact',
    heading: 'Get in touch',
    sub: 'Mail or call us directly. We usually reply within a day.',
    labelEmail: 'Email',
    labelPhone: 'Phone',
    close: 'Close',
    copied: 'Copied',
    copy: 'Copy',
    copyAria: (label: string) => `Copy ${label.toLowerCase()}`,
  },
  nl: {
    dialogLabel: 'Neem contact op',
    kicker: 'Contact',
    heading: 'Neem contact op',
    sub: 'Mail of bel ons rechtstreeks. We reageren meestal binnen een dag.',
    labelEmail: 'E-mail',
    labelPhone: 'Telefoon',
    close: 'Sluiten',
    copied: 'Gekopieerd',
    copy: 'Kopiëren',
    copyAria: (label: string) => `${label} kopiëren`,
  },
} as const

type Ctx = { open: () => void; close: () => void }
const ContactModalContext = createContext<Ctx | null>(null)

export function useContactModal() {
  const ctx = useContext(ContactModalContext)
  if (!ctx) throw new Error('useContactModal must be used within a ContactModalProvider')
  return ctx
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <ContactModalContext.Provider value={{ open, close }}>
      {children}
      <ContactModal open={isOpen} onClose={close} />
    </ContactModalContext.Provider>
  )
}

type CopyKey = 'email' | 'phone'

function CopyRow({
  icon: Icon,
  label,
  value,
  href,
  copied,
  onCopy,
  copyAria,
  copyLabel,
  copiedLabel,
}: {
  icon: LucideIcon
  label: string
  value: string
  href: string
  copied: boolean
  onCopy: () => void
  copyAria: string
  copyLabel: string
  copiedLabel: string
}) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-line bg-white/[0.025] p-2 pr-2 transition-colors hover:bg-white/[0.045]">
      <a href={href} className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-1 py-1">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.04] text-ink-soft">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="text-[11px] uppercase tracking-[0.08em] text-faint">{label}</span>
          <span className="truncate text-[14px] text-ink">{value}</span>
        </span>
      </a>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copyAria}
        className={cn(
          'flex h-10 shrink-0 items-center gap-1.5 rounded-lg border px-3 text-[12px] font-medium transition-colors',
          copied
            ? 'border-olive/40 bg-olive/10 text-olive'
            : 'border-line bg-white/[0.03] text-faint hover:bg-white/[0.08] hover:text-ink',
        )}
      >
        {copied ? <Check className="h-4 w-4" strokeWidth={2} /> : <Copy className="h-4 w-4" strokeWidth={1.7} />}
        <span>{copied ? copiedLabel : copyLabel}</span>
      </button>
    </div>
  )
}

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lenis = useLenis()
  const { lang } = useLang()
  const t = COPY[lang]
  const [copied, setCopied] = useState<CopyKey | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Real native scroll-lock (lenis.stop alone doesn't hold on touch).
  useScrollLock(open)

  const doCopy = useCallback(async (text: string, key: CopyKey) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
      } catch {
        /* ignore */
      }
      document.body.removeChild(ta)
    }
    setCopied(key)
  }, [])

  // Reset feedback shortly after copying.
  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(null), 1600)
    return () => clearTimeout(t)
  }, [copied])

  // Esc to close + lock background scroll while open.
  useEffect(() => {
    if (!open) return
    setCopied(null)
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    lenis?.stop()
    return () => {
      window.removeEventListener('keydown', onKey)
      lenis?.start()
    }
  }, [open, onClose, lenis])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.dialogLabel}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.34, ease }}
            className="relative z-[1] max-h-[calc(100svh-2rem)] w-full max-w-[400px] overflow-y-auto overflow-x-hidden overscroll-contain rounded-[28px] border border-line bg-gradient-to-b from-[#171717]/90 to-[#0b0b0b]/92 p-6 shadow-[0_40px_120px_-24px_rgba(0,0,0,0.85)] backdrop-blur-2xl sm:p-7"
          >
            {/* Glossy highlights */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[130%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(189,169,109,0.10),transparent_70%)]" />

            {/* Close */}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="absolute right-4 top-4 z-[2] flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.03] text-faint transition-colors hover:bg-white/[0.08] hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="relative">
              <span className="label-mono text-dim">{t.kicker}</span>
              <h2 className="mt-2 font-serif text-[26px] leading-tight tracking-[-0.01em] text-ink">
                {t.heading}
              </h2>
              <p className="mt-2 max-w-[300px] text-[13.5px] leading-relaxed text-faint">
                {t.sub}
              </p>
            </div>

            {/* Email + phone */}
            <div className="relative mt-6 flex flex-col gap-2">
              <CopyRow
                icon={Mail}
                label={t.labelEmail}
                value={CONTACT.email}
                href={`mailto:${CONTACT.email}`}
                copied={copied === 'email'}
                onCopy={() => doCopy(CONTACT.email, 'email')}
                copyAria={t.copyAria(t.labelEmail)}
                copyLabel={t.copy}
                copiedLabel={t.copied}
              />
              <CopyRow
                icon={Phone}
                label={t.labelPhone}
                value={CONTACT.phoneDisplay}
                href={CONTACT.phoneHref}
                copied={copied === 'phone'}
                onCopy={() => doCopy(CONTACT.phoneDisplay, 'phone')}
                copyAria={t.copyAria(t.labelPhone)}
                copyLabel={t.copy}
                copiedLabel={t.copied}
              />
            </div>

            {/* Socials */}
            <div className="relative mt-6 flex items-center justify-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.03] text-ink-soft/70 transition-colors hover:bg-white/[0.07] hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
