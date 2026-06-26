import { HelpCircle, Leaf, type LucideIcon } from 'lucide-react'
import type { Lang, Localized } from '@/i18n'

/** Shared navigation source of truth — used by both the Navbar and the Footer
 *  so the two never drift apart. Each list exists in English and Dutch; call the
 *  `getX(lang)` selectors to read the right one. Brand and product names (Nivora,
 *  Box, Voice, AIOS, the service names) stay as-is in both languages. */
export type NavItem = {
  title: string
  desc?: string
  href: string
  Icon?: LucideIcon
  /** Full-bleed app-style logo (noisy black tile) — used for Products/Services. */
  img?: string
  /** White line icon shown inside the subtle grey square — like the Lucide icons. */
  iconImg?: string
  comingSoon?: boolean
}

/* ── Products ── */
const PRODUCTS_EN: NavItem[] = [
  { title: 'Box', desc: 'All your communication, brought together in one place.', href: '/#features', img: '/products/box-logo.webp', comingSoon: true },
  { title: 'Voice', desc: 'Speech-to-text, tuned to your voice and your writing.', href: '/#features', img: '/products/voice-logo.webp', comingSoon: true },
]
const PRODUCTS_NL: NavItem[] = [
  { title: 'Box', desc: 'Al uw communicatie, samengebracht op één plek.', href: '/#features', img: '/products/box-logo.webp', comingSoon: true },
  { title: 'Voice', desc: 'Spraak naar tekst, afgestemd op uw stem en schrijfstijl.', href: '/#features', img: '/products/voice-logo.webp', comingSoon: true },
]

/* ── Services ── */
const SERVICES_EN: NavItem[] = [
  { title: 'App Design', desc: 'Custom apps built around your idea.', href: '/services/app-design', img: '/services/service-appdesign.webp' },
  { title: 'Local AI', desc: 'Secure AI on your own servers or ours.', href: '/services/local-ai', img: '/services/service-localai.webp' },
  { title: 'AIOS', desc: 'A custom AI operating system for your company.', href: '/services/aios', img: '/services/service-aios.webp' },
  { title: 'AI Consulting', desc: 'Find where AI fits and which strategy wins.', href: '/services/ai-consulting', img: '/services/service-consulting.webp' },
]
const SERVICES_NL: NavItem[] = [
  { title: 'App Design', desc: 'Apps op maat, gebouwd rond uw idee.', href: '/services/app-design', img: '/services/service-appdesign.webp' },
  { title: 'Local AI', desc: 'Veilige AI op uw eigen servers of de onze.', href: '/services/local-ai', img: '/services/service-localai.webp' },
  { title: 'AIOS', desc: 'Een AI-besturingssysteem op maat voor uw bedrijf.', href: '/services/aios', img: '/services/service-aios.webp' },
  { title: 'AI Consulting', desc: 'Ontdek waar AI past en welke strategie wint.', href: '/services/ai-consulting', img: '/services/service-consulting.webp' },
]

/* ── Company ── */
const COMPANY_PRIMARY_EN: NavItem[] = [
  { title: 'About Us', desc: 'Learn more about our story and team.', href: '/about', iconImg: '/nav/icon-about.png' },
  { title: 'Affiliate', desc: 'Earn by referring Nivora to others.', href: '/affiliate', iconImg: '/nav/icon-affiliate.png', comingSoon: true },
]
const COMPANY_PRIMARY_NL: NavItem[] = [
  { title: 'Over ons', desc: 'Lees meer over ons verhaal en ons team.', href: '/about', iconImg: '/nav/icon-about.png' },
  { title: 'Affiliate', desc: 'Verdien door Nivora aan te bevelen bij anderen.', href: '/affiliate', iconImg: '/nav/icon-affiliate.png', comingSoon: true },
]

/* ── Resources ── */
const RESOURCES_EN: NavItem[] = [
  { title: 'Media', desc: 'Logos, colours and the full brand kit.', href: '/media', iconImg: '/nav/icon-media.png' },
  { title: 'Blog', desc: 'Insights, updates and ideas.', href: '/blog', Icon: Leaf },
  { title: 'Terms of Service', desc: 'The rules for using Nivora.', href: '/terms', iconImg: '/nav/icon-terms.png' },
  { title: 'Privacy Policy', desc: 'How we handle and protect your data.', href: '/privacy', iconImg: '/nav/icon-privacy.png' },
  { title: 'Help Center', desc: 'Ask our assistant or reach a person.', href: '/help', Icon: HelpCircle },
]
const RESOURCES_NL: NavItem[] = [
  { title: 'Media', desc: "Logo's, kleuren en de volledige brand kit.", href: '/media', iconImg: '/nav/icon-media.png' },
  { title: 'Blog', desc: 'Inzichten, updates en ideeën.', href: '/blog', Icon: Leaf },
  { title: 'Servicevoorwaarden', desc: 'De regels voor het gebruik van Nivora.', href: '/terms', iconImg: '/nav/icon-terms.png' },
  { title: 'Privacybeleid', desc: 'Hoe we uw gegevens behandelen en beschermen.', href: '/privacy', iconImg: '/nav/icon-privacy.png' },
  { title: 'Helpcentrum', desc: 'Vraag het onze assistent of bereik een mens.', href: '/help', Icon: HelpCircle },
]

export const getProducts = (lang: Lang): NavItem[] => (lang === 'nl' ? PRODUCTS_NL : PRODUCTS_EN)
export const getServices = (lang: Lang): NavItem[] => (lang === 'nl' ? SERVICES_NL : SERVICES_EN)
export const getCompanyPrimary = (lang: Lang): NavItem[] => (lang === 'nl' ? COMPANY_PRIMARY_NL : COMPANY_PRIMARY_EN)
export const getResources = (lang: Lang): NavItem[] => (lang === 'nl' ? RESOURCES_NL : RESOURCES_EN)

/* Stable internal menu keys (never shown raw) + their localized display labels. */
export type MenuKey = 'Products' | 'Services' | 'Company' | 'Resources'
export const MENU_KEYS: MenuKey[] = ['Products', 'Services', 'Company', 'Resources']

const MENU_LABELS: Record<MenuKey, Localized<string>> = {
  Products: { en: 'Products', nl: 'Producten' },
  Services: { en: 'Services', nl: 'Diensten' },
  Company: { en: 'Company', nl: 'Bedrijf' },
  Resources: { en: 'Resources', nl: 'Resources' },
}

export const getMenuLabel = (key: MenuKey, lang: Lang): string => MENU_LABELS[key][lang]
