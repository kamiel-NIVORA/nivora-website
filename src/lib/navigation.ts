import { HelpCircle, Leaf, type LucideIcon } from 'lucide-react'

/** Shared navigation source of truth — used by both the Navbar and the Footer
 *  so the two never drift apart. Update items here once and both stay in sync. */
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

export const PRODUCTS: NavItem[] = [
  { title: 'Box', desc: 'All your communication, brought together in one place.', href: '/#features', img: '/box-logo.png', comingSoon: true },
  { title: 'Voice', desc: 'Speech-to-text, tuned to your voice and your writing.', href: '/#features', img: '/voice-logo.png', comingSoon: true },
]

export const SERVICES: NavItem[] = [
  { title: 'App Design', desc: 'Custom apps built around your idea.', href: '/services/app-design', img: '/service-appdesign.png' },
  { title: 'Local AI', desc: 'Secure AI on your own servers or ours.', href: '/services/local-ai', img: '/service-localai.png' },
  { title: 'AIOS', desc: 'A custom AI operating system for your company.', href: '/services/aios', img: '/service-aios.png' },
  { title: 'AI Consulting', desc: 'Find where AI fits and which strategy wins.', href: '/services/ai-consulting', img: '/service-consulting.png' },
]

export const COMPANY_PRIMARY: NavItem[] = [
  { title: 'About Us', desc: 'Learn more about our story and team.', href: '/about', iconImg: '/icon-about.png' },
  { title: 'Customer Stories', desc: "See how we've helped our clients succeed.", href: '/#contact', iconImg: '/icon-stories.png' },
  { title: 'Partnerships', desc: 'Collaborate with us for mutual growth.', href: '/#contact', iconImg: '/icon-partnerships.png' },
  { title: 'Affiliate', desc: 'Earn by referring Nivora to others.', href: '/affiliate', iconImg: '/icon-affiliate.png', comingSoon: true },
]

export const RESOURCES: NavItem[] = [
  { title: 'Media', desc: 'Logos, colours and the full brand kit.', href: '/media', iconImg: '/icon-media.png' },
  { title: 'Blog', desc: 'Insights, updates and ideas.', href: '/blog', Icon: Leaf },
  { title: 'Terms of Service', desc: 'The rules for using Nivora.', href: '/terms', iconImg: '/icon-terms.png' },
  { title: 'Privacy Policy', desc: 'How we handle and protect your data.', href: '/privacy', iconImg: '/icon-privacy.png' },
  { title: 'Help Center', desc: 'Ask our assistant or reach a person.', href: '/help', Icon: HelpCircle },
]
