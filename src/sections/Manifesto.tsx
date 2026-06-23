import { ScrollStatement } from '@/components/ui/ScrollStatement'

/** Aerial field photo — lives in /public, served from the site root. */
const IMAGE = '/IMG_0743.jpg'

const COPY =
  'Every hour your team spends on repetitive work is an hour we can reclaim. With software you use tomorrow, or a system we build from scratch.'

/**
 * Manifesto — the home page's pinned, scroll-driven moment. The effect itself
 * now lives in ScrollStatement so the service pages can reuse it verbatim with
 * their own photo and copy. This keeps the home line exactly as it was.
 */
export function Manifesto() {
  return <ScrollStatement image={IMAGE} copy={COPY} />
}
