import {
  FileText,
  Handshake,
  HelpCircle,
  Leaf,
  Shield,
  Star,
  Users,
  type LucideIcon,
} from 'lucide-react'

/** Shared navigation source of truth — used by both the Navbar and the Footer
 *  so the two never drift apart. Update items here once and both stay in sync. */
export type NavItem = {
  title: string
  desc?: string
  href: string
  Icon?: LucideIcon
  img?: string
  comingSoon?: boolean
}

export const PRODUCTS: NavItem[] = [
  { title: 'Box', desc: 'All your communication, brought together in one place.', href: '/#features', img: '/box-logo.png', comingSoon: true },
  { title: 'Voice', desc: 'Speech-to-text, tuned to your voice and your writing.', href: '/#features', img: '/voice-logo.png', comingSoon: true },
  { title: 'Editor', desc: 'Create animations that plug straight into After Effects.', href: '/#features', img: '/editor-logo.png', comingSoon: true },
]

export const SERVICES: NavItem[] = [
  { title: 'App Design', desc: 'Custom apps built around your idea.', href: '/#contact', img: '/service-appdesign.png' },
  { title: 'Local AI', desc: 'Secure AI on your own servers or ours.', href: '/#contact', img: '/service-localai.png' },
  { title: 'AIOS', desc: 'A custom AI operating system for your company.', href: '/#contact', img: '/service-aios.png' },
  { title: 'AI Consulting', desc: 'Find where AI fits and which strategy wins.', href: '/#contact', img: '/service-consulting.png' },
]

export const COMPANY_PRIMARY: NavItem[] = [
  { title: 'About Us', desc: 'Learn more about our story and team.', href: '/#contact', Icon: Users },
  { title: 'Customer Stories', desc: "See how we've helped our clients succeed.", href: '/#contact', Icon: Star },
  { title: 'Partnerships', desc: 'Collaborate with us for mutual growth.', href: '/#contact', Icon: Handshake },
]

/** Nivora media / branding assets — the branding page is on the way. */
export const COMPANY_MEDIA: NavItem[] = [
  { title: 'Media Assets', desc: 'Logos, colours and brand kit.', href: '/#contact', img: '/media-logo.png', comingSoon: true },
  { title: 'Brand Guidelines', desc: 'How to use the Nivora brand.', href: '/#contact', img: '/media-logo.png', comingSoon: true },
]

export const COMPANY_SECONDARY: NavItem[] = [
  { title: 'Terms of Service', href: '/terms', Icon: FileText },
  { title: 'Privacy Policy', href: '/privacy', Icon: Shield },
  { title: 'Blog', href: '/blog', Icon: Leaf },
  { title: 'Help Center', href: '/#contact', Icon: HelpCircle },
]
