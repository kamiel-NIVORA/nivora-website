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

/** Real portraits for known authors. Any byline with this name renders the photo
 *  instead of the monogram, so the homepage, blog index and post pages all match. */
const AVATARS: Record<string, string> = {
  'Kamiel Niville': '/founder-kamiel.webp',
}

/** Small avatar used in blog bylines: the author's photo when we have one,
 *  otherwise a clean monogram fallback. */
export function Avatar({
  name,
  size = 'sm',
  className,
}: {
  name: string
  size?: 'sm' | 'md'
  className?: string
}) {
  const dims = size === 'md' ? 'h-7 w-7' : 'h-[22px] w-[22px]'
  const photo = AVATARS[name]

  if (photo) {
    return (
      <img
        src={photo}
        alt=""
        aria-hidden
        loading="lazy"
        className={cn(
          'shrink-0 select-none rounded-full border border-line object-cover object-[center_22%]',
          dims,
          className,
        )}
      />
    )
  }

  return (
    <span
      aria-hidden
      className={cn(
        'flex shrink-0 select-none items-center justify-center rounded-full border border-line bg-white/[0.06] font-medium tracking-wide text-ink-soft',
        size === 'md' ? 'text-[11px]' : 'text-[10px]',
        dims,
        className,
      )}
    >
      {initials(name)}
    </span>
  )
}
