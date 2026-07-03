import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RippleButton } from '@/components/ui/RippleButton'
import { LanguageSwitch } from '@/components/ui/LanguageSwitch'
import { cn } from '@/lib/utils'
import {
  getCompanyPrimary,
  getProducts,
  getResources,
  getServices,
  getMenuLabel,
  MENU_KEYS,
  type MenuKey,
  type NavItem as Item,
} from '@/lib/navigation'
import { useLang, localizePath, type Lang } from '@/i18n'
import { useContactModal } from '@/components/contact/ContactModal'
import { useScrollLock } from '@/lib/useScrollLock'
import { BOOKING_URL, WAITLIST_URL } from '@/data/contact'

const ease = [0.22, 1, 0.36, 1] as const

const ORDER: Record<MenuKey, number> = { Products: 0, Services: 1, Company: 2, Resources: 3 }

const COPY = {
  en: {
    comingSoon: 'Coming soon',
    interested: 'Interested?',
    bookDemo: 'Book a demo',
    bookStrategy: 'Book a strategy call',
    getInTouch: 'Get in touch',
    contactUs: 'Contact Us',
    bookCall: 'Book a call',
    language: 'Language',
    toggleMenu: 'Toggle menu',
    dismiss: 'Dismiss',
    home: 'Nivora works home',
    bannerLead: 'Box and Voice are coming.',
    bannerCta: 'Get notified at launch',
    bannerCtaShort: 'Get notified',
  },
  nl: {
    comingSoon: 'Binnenkort',
    interested: 'Interesse?',
    bookDemo: 'Boek een demo',
    bookStrategy: 'Boek een strategiegesprek',
    getInTouch: 'Neem contact op',
    contactUs: 'Neem contact op',
    bookCall: 'Boek een gesprek',
    language: 'Taal',
    toggleMenu: 'Menu openen',
    dismiss: 'Sluiten',
    home: 'Nivora works home',
    bannerLead: 'Box en Voice komen eraan.',
    bannerCta: 'Word op de hoogte gebracht bij de lancering',
    bannerCtaShort: 'Blijf op de hoogte',
  },
} as const

const slide = {
  enter: (d: number) => ({ opacity: 0, x: d * 28 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: -d * 28 }),
}

/* Small, elegant "coming soon" tag — used next to Products. */
function ComingSoonTag({ className }: { className?: string }) {
  const { lang } = useLang()
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-line bg-white/[0.04] px-1.5 py-[2.5px] text-[9px] font-medium normal-case leading-none tracking-normal text-faint',
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-olive shadow-[0_0_6px_rgba(150,167,102,0.7)]" />
      {COPY[lang].comingSoon}
    </span>
  )
}

/* ── Item primitives ── */
function CardItem({ title, desc, href, Icon, img, iconImg, comingSoon }: Item) {
  const { lang } = useLang()
  return (
    <a
      href={localizePath(href, lang)}
      {...(href.includes(WAITLIST_URL) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group/i flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.06]"
    >
      {img ? (
        <img
          src={img}
          alt={title}
          className="mt-0.5 h-9 w-9 shrink-0 rounded-[10px] border border-line object-cover"
          loading="lazy"
        />
      ) : (
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-line bg-white/[0.04] text-ink-soft transition-colors group-hover/i:bg-white/[0.08]">
          {iconImg ? (
            <img src={iconImg} alt="" className="h-5 w-5 object-contain" loading="lazy" />
          ) : (
            Icon && <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
          )}
        </span>
      )}
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="text-[15px] font-semibold leading-tight text-ink">{title}</span>
          {comingSoon && <ComingSoonTag />}
        </span>
        {desc && <span className="mt-1 block text-[13px] leading-snug text-faint">{desc}</span>}
      </span>
    </a>
  )
}

/* Short clickable line under the panel. Booking labels go to the Nivora booking
   page; contact labels open the contact popup. */
function InterestedRow({
  label,
  kind,
  onSelect,
}: {
  label: string
  kind: 'booking' | 'contact'
  onSelect?: () => void
}) {
  const { open } = useContactModal()
  const { lang } = useLang()
  const cls = 'group/c mt-2.5 inline-flex items-center gap-1.5 px-3 text-[13px]'
  const inner = (
    <>
      <span className="text-faint">{COPY[lang].interested}</span>
      <span className="font-medium text-ink transition-colors group-hover/c:text-white">{label}</span>
      <ArrowRight className="h-3.5 w-3.5 text-ink transition-transform duration-200 group-hover/c:translate-x-0.5" strokeWidth={1.8} />
    </>
  )
  if (kind === 'booking' && BOOKING_URL) {
    return (
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onSelect?.()}
        className={cls}
      >
        {inner}
      </a>
    )
  }
  return (
    <button type="button" onClick={() => { onSelect?.(); open() }} className={cls}>
      {inner}
    </button>
  )
}

type PanelDef = {
  items: Item[]
  label?: string
  kind?: 'booking' | 'contact'
  /** Resources gets the language toggle instead of an "interested" row. */
  switcher?: boolean
}

function getPanel(key: MenuKey, lang: Lang): PanelDef {
  const t = COPY[lang]
  switch (key) {
    case 'Products':
      return { items: getProducts(lang), label: t.bookDemo, kind: 'booking' }
    case 'Services':
      return { items: getServices(lang), label: t.bookStrategy, kind: 'booking' }
    case 'Company':
      return { items: getCompanyPrimary(lang), label: t.getInTouch, kind: 'contact' }
    case 'Resources':
      return { items: getResources(lang), switcher: true }
  }
}

function PanelContent({ active, onSelect }: { active: MenuKey; onSelect?: () => void }) {
  const { lang } = useLang()
  const panel = getPanel(active, lang)

  return (
    <div className="w-[360px]">
      {/* One clean frame holding every item for this menu */}
      <div className="flex flex-col rounded-2xl border border-line bg-white/[0.03] p-2">
        {panel.items.map((it) => (
          <CardItem key={it.title} {...it} />
        ))}
      </div>
      {panel.label && panel.kind && (
        <InterestedRow label={panel.label} kind={panel.kind} onSelect={onSelect} />
      )}
      {panel.switcher && (
        <div className="mt-2.5 flex items-center justify-between gap-2 px-3">
          <span className="text-[13px] text-faint">{COPY[lang].language}</span>
          <LanguageSwitch />
        </div>
      )}
    </div>
  )
}

/* Slim launch announcement that floats above the bar and points at the waitlist.
 *  Dismissible, and the choice is remembered so it stays out of the way. */
function LaunchBanner() {
  const { lang } = useLang()
  const t = COPY[lang]
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(localStorage.getItem('nivora.launchBanner.dismissed') !== '1')
  }, [])

  if (!show) return null

  return (
    <div className="mx-auto mb-2 flex w-full max-w-[1200px] items-stretch gap-2">
      <a
        href={WAITLIST_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-black/80 px-4 py-2 text-center text-[12.5px] leading-snug text-muted shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-colors hover:text-ink lg:bg-black/55 lg:backdrop-blur-xl"
      >
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-olive shadow-[0_0_8px_rgba(150,167,102,0.7)]" />
        <span className="hidden sm:inline">{t.bannerLead}</span>
        <span className="font-medium text-ink sm:hidden">{t.bannerCtaShort}</span>
        <span className="hidden font-medium text-ink sm:inline">{t.bannerCta}</span>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
      </a>
      <button
        type="button"
        aria-label={t.dismiss}
        onClick={() => {
          localStorage.setItem('nivora.launchBanner.dismissed', '1')
          setShow(false)
        }}
        className="flex w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-black/80 text-faint transition-colors hover:text-ink lg:bg-black/55 lg:backdrop-blur-xl"
      >
        <X className="h-4 w-4" strokeWidth={1.8} />
      </button>
    </div>
  )
}

export function Navbar() {
  const { lang } = useLang()
  const t = COPY[lang]
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<MenuKey | null>(null)
  const [dir, setDir] = useState(1)
  /* Hover-to-open is for real pointers only. On touch tablets (iPad landscape
     gets the desktop nav) hover is emulated and unreliable, so there we drive
     the dropdowns by tap instead. */
  const [canHover, setCanHover] = useState(true)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* Lock the page behind the open mobile menu (Lenis doesn't stop touch scroll). */
  useScrollLock(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  const cancelClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current) }
  const closeSoon = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setActive(null), 130)
  }
  const openMenu = (label: MenuKey) => {
    cancelClose()
    setActive((prev) => {
      if (prev && prev !== label) setDir(ORDER[label] > ORDER[prev] ? 1 : -1)
      return label
    })
  }

  return (
    <div className="fixed inset-x-0 top-0 z-50 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(1rem,env(safe-area-inset-top))]">
      <LaunchBanner />
      <div className="relative mx-auto w-full max-w-[1200px]">
        <motion.nav
          initial={false}
          animate={{ maxWidth: scrolled ? 1080 : 1200 }}
          transition={{ duration: 0.4, ease }}
          className={cn(
            'mx-auto w-full rounded-2xl transition-[background-color,box-shadow,backdrop-filter] duration-300',
            // Glass surface whenever scrolled OR the mobile menu is open, so the
            // menu always sits on a readable backing instead of floating over the hero.
            scrolled || open
              // Solid (no backdrop-blur) on mobile: blurring the backdrop every
              // scroll frame is the main cause of janky scrolling on iOS. Glass on desktop.
              ? 'bg-black/80 px-3 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] lg:bg-black/55 lg:backdrop-blur-xl'
              : 'px-2 py-2',
          )}
        >
          <div className="flex items-center justify-between">
            {/* Left: logo */}
            <a href={localizePath('/', lang)} className="flex items-center pl-1" aria-label={t.home}>
              <img src="/brand/nivora-logo.png" alt="Nivora" className="h-[22px] w-auto" />
            </a>

            {/* Center: links */}
            <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
              <div className="flex items-center gap-1">
                {MENU_KEYS.map((key) => (
                  <button
                    key={key}
                    onMouseEnter={canHover ? () => openMenu(key) : undefined}
                    onMouseLeave={canHover ? closeSoon : undefined}
                    onClick={() => setActive((a) => (a === key ? null : key))}
                    className={cn(
                      'flex items-center gap-1 rounded-lg px-3 py-2.5 text-sm transition-colors',
                      active === key ? 'bg-white/[0.07] text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    {getMenuLabel(key, lang)}
                    <ChevronDown
                      className={cn('h-3.5 w-3.5 transition-transform duration-300', active === key && 'rotate-180')}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: actions */}
            <div className="hidden items-center gap-2.5 lg:flex">
              <RippleButton variant="ghost" href={localizePath('/contact', lang)} className="h-10 px-5">{t.contactUs}</RippleButton>
              <RippleButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="h-10 px-5">{t.bookCall}</RippleButton>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="-mr-1.5 flex h-11 w-11 items-center justify-center rounded-lg text-ink lg:hidden"
              aria-label={t.toggleMenu}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile panel — capped to the viewport and internally scrollable so
              the lower sections + CTA stay reachable on short phones, with the
              page itself locked behind it. */}
          {open && (
            <div className="mt-3 flex max-h-[calc(100dvh-7rem)] flex-col gap-0.5 overflow-y-auto overscroll-contain border-t border-line pt-3 pb-[max(0.25rem,env(safe-area-inset-bottom))] lg:hidden">
              <p className="px-3 pb-1 pt-2 text-[11px] uppercase tracking-wide text-dim">{getMenuLabel('Products', lang)}</p>
              {getProducts(lang).map((l) => (
                <a key={l.title} href={localizePath(l.href, lang)} {...(l.href.includes(WAITLIST_URL) ? { target: '_blank', rel: 'noopener noreferrer' } : {})} onClick={() => setOpen(false)} className="flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-[15px] text-muted hover:bg-white/5 hover:text-ink active:bg-white/5">
                  {l.title}
                  {l.comingSoon && <ComingSoonTag />}
                </a>
              ))}
              <p className="px-3 pb-1 pt-3 text-[11px] uppercase tracking-wide text-dim">{getMenuLabel('Services', lang)}</p>
              {getServices(lang).map((l) => (
                <a key={l.title} href={localizePath(l.href, lang)} onClick={() => setOpen(false)} className="flex min-h-[44px] items-center rounded-lg px-3 text-[15px] text-muted hover:bg-white/5 hover:text-ink active:bg-white/5">{l.title}</a>
              ))}
              <p className="px-3 pb-1 pt-3 text-[11px] uppercase tracking-wide text-dim">{getMenuLabel('Company', lang)}</p>
              {getCompanyPrimary(lang).map((l) => (
                <a key={l.title} href={localizePath(l.href, lang)} onClick={() => setOpen(false)} className="flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-[15px] text-muted hover:bg-white/5 hover:text-ink active:bg-white/5">
                  {l.title}
                  {l.comingSoon && <ComingSoonTag />}
                </a>
              ))}
              <p className="px-3 pb-1 pt-3 text-[11px] uppercase tracking-wide text-dim">{getMenuLabel('Resources', lang)}</p>
              {getResources(lang).map((l) => (
                <a key={l.title} href={localizePath(l.href, lang)} onClick={() => setOpen(false)} className="flex min-h-[44px] items-center rounded-lg px-3 text-[15px] text-muted hover:bg-white/5 hover:text-ink active:bg-white/5">{l.title}</a>
              ))}
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-line px-3 pt-3">
                <span className="text-[11px] uppercase tracking-wide text-dim">{t.language}</span>
                <LanguageSwitch />
              </div>
              <Button size="lg" className="mt-3 h-16 w-full text-[15px]" asChild>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>{t.bookCall}</a>
              </Button>
            </div>
          )}
        </motion.nav>

        {/* Dropdown — rendered OUTSIDE the nav so its backdrop-filter samples the page
            directly, giving the same frosted glass as the scrolled bar. The open
            animation fades + slides only (NO scale): scaling a backdrop-filter layer is
            what made it recompute mid-animation and flicker, so keep it scale-free and
            the glass stays smooth. Switching menus keeps the panel up and only slides
            its contents. */}
        {/* Tap-away closer for touch tablets (desktop closes on hover-out). */}
        {active && !canHover && (
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-40 hidden cursor-default lg:block"
          />
        )}

        <AnimatePresence>
          {active && (
            <motion.div
              key="nav-dropdown"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.22, ease }}
              className="absolute left-0 right-0 top-full z-50 hidden justify-center pt-2 transform-gpu [backface-visibility:hidden] lg:flex"
              onMouseEnter={canHover ? cancelClose : undefined}
              onMouseLeave={canHover ? closeSoon : undefined}
            >
              <div className="relative">
                {/* Frosted glass — identical blur to the scrolled bar, so the hero
                    shows through softly (the glossy look). Because the wrapper no
                    longer scales, the backdrop-filter doesn't recompute mid-animation,
                    which is what removes the old flicker. */}
                <div className="absolute inset-0 rounded-[20px] border border-line bg-black/55 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[20px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Animated content on top of the glass */}
                <div className="relative overflow-hidden p-2.5">
                  <AnimatePresence mode="popLayout" custom={dir} initial={false}>
                    <motion.div
                      key={active}
                      custom={dir}
                      variants={slide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease }}
                    >
                      <PanelContent active={active} onSelect={() => setActive(null)} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
