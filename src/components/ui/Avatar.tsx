import { cn } from '@/lib/utils'

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/** Photo for known authors (falls back to a monogram for anyone else). */
export function authorPhoto(name: string): string | undefined {
  return (name || '').trim().toLowerCase().startsWith('kamiel') ? '/founder-kamiel.jpg' : undefined
}

/** Small byline avatar: a photo when `src` is given, otherwise a monogram. */
export function Avatar({
  name,
  src,
  size = 'sm',
  className,
}: {
  name: string
  src?: string
  size?: 'sm' | 'md'
  className?: string
}) {
  const box = size === 'md' ? 'h-7 w-7' : 'h-[22px] w-[22px]'
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        className={cn('shrink-0 select-none rounded-full border border-line object-cover', box, className)}
      />
    )
  }
  const text = size === 'md' ? 'text-[11px]' : 'text-[10px]'
  return (
    <span
      aria-hidden
      className={cn(
        'flex shrink-0 select-none items-center justify-center rounded-full border border-line bg-white/[0.06] font-medium tracking-wide text-ink-soft',
        box,
        text,
        className,
      )}
    >
      {initials(name)}
    </span>
  )
}
