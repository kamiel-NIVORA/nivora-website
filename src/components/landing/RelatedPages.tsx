import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { LangLink as Link } from '@/components/ui/LangLink'
import type { LandingLink } from '@/data/landing/types'

/**
 * The related-pages block that closes every landing page.
 *
 * This is the internal link mesh. It is what keeps ~120 pages from sitting as
 * isolated islands: each page passes authority to its siblings, its hub and the
 * services behind it, and no page ends up orphaned. The set is derived by rule
 * in src/data/landing/related.ts rather than written by hand.
 */
export function RelatedPages({ links, title }: { links: LandingLink[]; title: string }) {
  if (!links.length) return null

  return (
    <nav aria-label={title} className="mx-auto w-full max-w-[900px] px-6 py-14 lg:py-20">
      <Reveal>
        <h2 className="label-mono text-faint">{title}</h2>
        <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                to={l.href}
                className="group flex items-center justify-between gap-4 border-b border-line py-4 text-[15px] text-ink-soft/80 transition-colors hover:text-ink"
              >
                <span>{l.label}</span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </nav>
  )
}
