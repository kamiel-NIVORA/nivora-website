import { ScrollStatement } from '@/components/ui/ScrollStatement'
import { useLang } from '@/i18n'

/** Aerial field photo — lives in /public, served from the site root. */
const IMAGE = '/home/IMG_0743.webp'

const COPY = {
  en: 'Every hour your team spends on repetitive work is an hour we can reclaim. With software you use tomorrow, or a system we build from scratch.',
  nl: 'Elk uur dat uw team aan repetitief werk besteedt, is een uur dat we kunnen terugwinnen. Met software die u morgen gebruikt, of een systeem dat we van nul af aan bouwen.',
} as const

/**
 * Manifesto — the home page's pinned, scroll-driven moment. The effect itself
 * now lives in ScrollStatement so the service pages can reuse it verbatim with
 * their own photo and copy. This keeps the home line exactly as it was.
 */
export function Manifesto() {
  const { lang } = useLang()
  return <ScrollStatement image={IMAGE} copy={COPY[lang]} />
}
