import { cn } from '@/lib/utils'
import type { CaseStudy } from '@/data/cases'

/** Cover van een case: een Nivora-landschap met groot het logo van de klant erop. */
export function CaseCover({
  c,
  eager,
  hover,
  className,
}: {
  c: Pick<CaseStudy, 'cover' | 'logo' | 'coverAlt'>
  eager?: boolean
  /** Zachte zoom als de kaart in een lijst staat. */
  hover?: boolean
  className?: string
}) {
  return (
    <div className={cn('relative isolate overflow-hidden rounded-3xl border border-line', className)}>
      <img
        src={c.cover}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        className={cn(
          'absolute inset-0 -z-10 h-full w-full object-cover',
          hover && 'transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]',
        )}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/10 via-black/25 to-black/55" />
      <img
        src={c.logo}
        alt={c.coverAlt}
        loading={eager ? 'eager' : 'lazy'}
        className="absolute left-1/2 top-1/2 w-[26%] min-w-[96px] max-w-[220px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
      />
    </div>
  )
}
