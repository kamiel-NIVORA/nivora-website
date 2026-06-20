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

/** Small monogram avatar used in blog bylines. */
export function Avatar({
  name,
  size = 'sm',
  className,
}: {
  name: string
  size?: 'sm' | 'md'
  className?: string
}) {
  const dims = size === 'md' ? 'h-7 w-7 text-[11px]' : 'h-[22px] w-[22px] text-[10px]'
  return (
    <span
      aria-hidden
      className={cn(
        'flex shrink-0 select-none items-center justify-center rounded-full border border-line bg-white/[0.06] font-medium tracking-wide text-ink-soft',
        dims,
        className,
      )}
    >
      {initials(name)}
    </span>
  )
}
