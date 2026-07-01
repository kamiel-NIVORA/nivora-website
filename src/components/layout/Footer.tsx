import {
  getCompanyPrimary,
  getProducts,
  getServices,
  type NavItem,
} from '@/lib/navigation'
import { WAITLIST_URL } from '@/data/contact'
import { LanguageSwitch } from '@/components/ui/LanguageSwitch'
import { useLang, type Lang } from '@/i18n'

const toLinks = (items: NavItem[]) => items.map((i) => ({ label: i.title, href: i.href }))

const COPY = {
  en: {
    products: 'Products',
    services: 'Services',
    company: 'Company',
    legal: 'Legal',
    contact: 'Contact',
    blog: 'Blog',
    brandKit: 'Brand Kit',
    helpCenter: 'Help Center',
    privacy: 'Privacy Policy',
    terms: 'Terms',
    location: 'Brugge, Belgium',
    rights: '© 2026 Nivora. All rights reserved.',
    comingSoon: 'Coming soon',
  },
  nl: {
    products: 'Producten',
    services: 'Diensten',
    company: 'Bedrijf',
    legal: 'Juridisch',
    contact: 'Contact',
    blog: 'Blog',
    brandKit: 'Brand Kit',
    helpCenter: 'Helpcentrum',
    privacy: 'Privacybeleid',
    terms: 'Voorwaarden',
    location: 'Brugge, België',
    rights: '© 2026 Nivora. Alle rechten voorbehouden.',
    comingSoon: 'Binnenkort',
  },
} as const

function getColumns(lang: Lang) {
  const t = COPY[lang]
  return [
    { title: t.products, links: toLinks(getProducts(lang)) },
    { title: t.services, links: toLinks(getServices(lang)) },
    {
      title: t.company,
      links: [
        ...toLinks(getCompanyPrimary(lang)),
        { label: t.blog, href: '/blog' },
        { label: t.brandKit, href: '/media' },
        { label: t.helpCenter, href: '/help' },
      ],
    },
    {
      title: t.legal,
      links: [
        { label: t.privacy, href: '/privacy' },
        { label: t.terms, href: '/terms' },
      ],
    },
    {
      title: t.contact,
      links: [
        { label: 'kamiel@nivoraworks.com', href: 'mailto:kamiel@nivoraworks.com' },
        { label: '+32 489 00 77 37', href: 'tel:+32489007737' },
        {
          label: t.location,
          href: 'https://www.google.com/maps/search/?api=1&query=Julius%20en%20Maurits%20Sabbestraat%2015%2C%208000%20Brugge',
        },
      ],
    },
  ]
}

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/116050071',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'X',
    href: null,
    path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/nivoraworks/',
    path: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61588828395357',
    path: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
  },
]

export function Footer() {
  const { lang } = useLang()
  const t = COPY[lang]
  const columns = getColumns(lang)

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* Warm glow behind the wordmark */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[80%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(189,169,109,0.12),transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 pt-16">
        {/* Top: brand + columns */}
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Nivora arrow mark */}
          <img src="/brand/nivora-mark.webp" alt="Nivora" className="w-44 max-w-full shrink-0 opacity-90" />

          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 md:w-auto md:flex-1 md:max-w-[900px] md:pl-12">
            {columns.map((col) => (
              <div key={col.title} className={col.title === t.contact ? 'col-span-2 sm:col-span-1' : undefined}>
                <p className="text-sm text-faint">{col.title}</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((l) => {
                    // The e-mail is one long token; let it break ONLY after the "@"
                    // (via <wbr>), never mid-domain, so it always reads whole.
                    const atIndex = l.href.startsWith('mailto:') ? l.label.indexOf('@') : -1
                    const wrapClass = atIndex >= 0 ? '[overflow-wrap:normal] [word-break:normal]' : '[overflow-wrap:anywhere]'
                    return (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          {...(l.href.startsWith(WAITLIST_URL) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className={`inline-block py-1.5 -my-1.5 text-sm text-ink-soft/85 transition-colors hover:text-ink ${wrapClass}`}
                        >
                          {atIndex >= 0 ? (
                            <>
                              {l.label.slice(0, atIndex + 1)}
                              <wbr />
                              {l.label.slice(atIndex + 1)}
                            </>
                          ) : (
                            l.label
                          )}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="relative mt-10 flex justify-center overflow-hidden">
          <span
            className="select-none font-serif leading-none tracking-[-0.04em] text-[#fafafa]/[0.05]"
            style={{ fontSize: 'clamp(96px, 29vw, 400px)' }}
          >
            Nivora
          </span>
        </div>

        {/* Bottom bar: rights left, socials centred, language toggle right */}
        <div className="relative flex flex-col items-center gap-5 border-t border-line py-6 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
          <p className="text-sm text-faint sm:justify-self-start">{t.rights}</p>
          <div className="flex items-center gap-4 sm:justify-self-center">
            {SOCIALS.map((s) => {
              const icon = (
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              )
              return s.href ? (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="-m-2.5 grid h-11 w-11 place-items-center text-ink-soft/45 transition-colors hover:text-ink-soft/80"
                >
                  {icon}
                </a>
              ) : (
                <span
                  key={s.label}
                  aria-label={`${s.label}, ${t.comingSoon.toLowerCase()}`}
                  title={t.comingSoon}
                  className="-m-2.5 grid h-11 w-11 cursor-default place-items-center text-ink-soft/20"
                >
                  {icon}
                </span>
              )
            })}
          </div>
          <div className="sm:justify-self-end">
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </footer>
  )
}
