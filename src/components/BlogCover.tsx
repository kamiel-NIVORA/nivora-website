import type { Post } from '@/data/posts'
import { cn } from '@/lib/utils'

/**
 * Cover image plus the optional overlay authored in the AIOS cover editor:
 * a brand-serif label, a dark scrim for legibility, and icons/photos.
 *
 * The label can be placed freely: `coverLabelX` + `coverLabelY` (percent of the
 * cover) position it anywhere; when `coverLabelX` is absent it stays
 * horizontally centered (legacy posts). `coverLabelSize` sets the font size in
 * `cqw` units so it scales with the cover width and looks identical in the
 * editor preview and here. Icons with x/y are placed freely; icons without lay
 * out as a centered row (legacy). The parent supplies the rounded aspect box.
 */
export function BlogCover({ post, variant = 'card' }: { post: Post; variant?: 'card' | 'hero' }) {
  const icons = post.coverIcons ?? []
  const positioned = icons.some((i) => typeof i.x === 'number' && typeof i.y === 'number')
  const hero = variant === 'hero'
  const showRow = icons.length > 0 && !positioned

  const freePos = typeof post.coverLabelX === 'string'
  const labelClass =
    'font-serif font-medium tracking-[-0.02em] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]'
  const labelStyle = {
    fontSize: `clamp(13px, ${post.coverLabelSize ?? 7}cqw, 120px)`,
    lineHeight: 1.05,
  }
  const showLabelInColumn = !!post.coverLabel && !freePos

  return (
    <div className="relative h-full w-full" style={{ containerType: 'inline-size' }}>
      {post.image ? (
        <img
          src={post.image}
          alt={post.title}
          loading={hero ? undefined : 'lazy'}
          className={cn(
            'h-full w-full object-cover',
            !hero &&
              'transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]',
          )}
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-white/[0.06] to-white/[0.02]" />
      )}

      {(post.coverOcclude || post.coverLabel) && (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/10"
        />
      )}

      {positioned &&
        icons.map((ic, i) =>
          typeof ic.x === 'number' && typeof ic.y === 'number' ? (
            <img
              key={i}
              src={ic.src}
              alt={ic.name ?? ''}
              className="absolute -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]"
              style={{ left: `${ic.x}%`, top: `${ic.y}%`, width: `${ic.size ?? 14}%` }}
            />
          ) : null,
        )}

      {/* Centered column: legacy icon row + (legacy) centered label */}
      {(showRow || showLabelInColumn) && (
        <div
          className="absolute inset-x-0 flex -translate-y-1/2 flex-col items-center gap-3 px-6 text-center"
          style={{ top: post.coverLabelY ?? '50%' }}
        >
          {showRow && (
            <div className="flex items-center justify-center gap-3">
              {icons.map((ic, i) => (
                <img
                  key={i}
                  src={ic.src}
                  alt={ic.name ?? ''}
                  className={cn(
                    'object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]',
                    hero ? 'h-12 w-12 sm:h-14 sm:w-14' : 'h-9 w-9',
                  )}
                />
              ))}
            </div>
          )}
          {showLabelInColumn && (
            <span className={labelClass} style={labelStyle}>
              {post.coverLabel}
            </span>
          )}
        </div>
      )}

      {/* Freely placed label (coverLabelX set) */}
      {post.coverLabel && freePos && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 px-4 text-center"
          style={{ left: post.coverLabelX, top: post.coverLabelY ?? '50%' }}
        >
          <span className={labelClass} style={labelStyle}>
            {post.coverLabel}
          </span>
        </div>
      )}
    </div>
  )
}
