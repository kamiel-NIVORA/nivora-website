import { useEffect, type CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { BlockFont } from '@/data/posts'
import { Reveal } from '@/components/animations/Reveal'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { BlogCover } from '@/components/BlogCover'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { BOOKING_URL } from '@/data/contact'
import { usePost } from '@/lib/blog'
import { useLang } from '@/i18n'

const COPY = {
  en: {
    notFound: 'Article not found',
    backToBlog: 'Back to the blog',
    back: 'Back',
    bookCall: 'Book a call',
  },
  nl: {
    notFound: 'Artikel niet gevonden',
    backToBlog: 'Terug naar de blog',
    back: 'Terug',
    bookCall: 'Boek een gesprek',
  },
} as const

/** Per-block font override → Tailwind class. `fallback` is the block's current
 *  default, so a block without an explicit font stays byte-identical. */
function blockFontClass(font?: BlockFont, fallback = ''): string {
  if (font === 'serif') return 'font-serif'
  if (font === 'sans') return 'font-sans'
  return fallback
}

/** Per-block size override → inline fontSize (px), clamped to a sane range.
 *  No/invalid size returns undefined, so the block keeps its default CSS size. */
function blockSizeStyle(size?: number): CSSProperties | undefined {
  if (typeof size !== 'number' || !Number.isFinite(size)) return undefined
  return { fontSize: `${Math.min(72, Math.max(12, size))}px` }
}

export function BlogPost() {
  const { slug } = useParams()
  const { post, loaded } = usePost(slug)
  const { lang } = useLang()
  const t = COPY[lang]

  // Per-post SEO: set the tab title and meta description, then restore on leave.
  useEffect(() => {
    if (!post) return
    const prevTitle = document.title
    document.title = `${post.title} · Nivora`

    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? null
    meta?.setAttribute('content', post.excerpt)

    return () => {
      document.title = prevTitle
      if (meta && prevDesc !== null) meta.setAttribute('content', prevDesc)
    }
  }, [post])

  if (!post) {
    // Still loading the live posts (direct link to a DB-only post): hold the
    // layout instead of flashing "not found".
    if (!loaded) return <main className="min-h-[70vh]" />
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-[760px] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-3xl text-ink">{t.notFound}</h1>
        <Link
          to="/blog"
          className="mt-4 inline-flex min-h-[44px] items-center gap-2 py-2 text-sm text-faint transition-colors hover:text-ink active:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> {t.backToBlog}
        </Link>
      </main>
    )
  }

  return (
    <main>
      <article className="relative mx-auto w-full max-w-[760px] px-6 pb-28 pt-36 lg:pb-32 lg:pt-44">
        {/* Header — centered */}
        <header className="text-center">
          <Reveal mode="mount">
            <h1 className="mx-auto max-w-[720px] font-serif text-[34px] leading-[1.08] tracking-[-0.02em] text-ink sm:text-[48px] sm:leading-[1.06] lg:text-[58px]">
              {post.title}
            </h1>
          </Reveal>

          <Reveal mode="mount" delay={0.08}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[13px]">
              <Avatar name={post.author} size="md" />
              <span className="text-ink-soft">{post.author}</span>
              <span className="text-dim">·</span>
              <span className="text-faint">{post.category}</span>
              <span className="text-dim">·</span>
              <span className="text-faint">{post.date}</span>
            </div>
          </Reveal>
        </header>

        {/* Cover */}
        <Reveal mode="mount" delay={0.12}>
          <div className="mt-12 aspect-[16/9] overflow-hidden rounded-3xl border border-line">
            <BlogCover post={post} variant="hero" />
          </div>
        </Reveal>

        {/* Body — plain strings are paragraphs; objects add headings, pull
            quotes, and inline images. */}
        <Reveal mode="mount" delay={0.16} className="mx-auto mt-12 max-w-[680px]">
          <div className="flex flex-col gap-6">
            {post.body.map((block, i) => {
              if (typeof block === 'string') {
                return (
                  <p key={i} className="text-[17px] leading-[1.8] text-muted sm:text-[18px]">
                    {block}
                  </p>
                )
              }
              if ('p' in block) {
                // New object paragraph: same look as a bare string, plus an
                // optional per-block font (serif/sans) and size (px).
                return (
                  <p
                    key={i}
                    className={`${blockFontClass(block.font)} text-[17px] leading-[1.8] text-muted sm:text-[18px]`.trim()}
                    style={blockSizeStyle(block.size)}
                  >
                    {block.p}
                  </p>
                )
              }
              if ('h2' in block) {
                return (
                  <h2
                    key={i}
                    className={`mt-4 ${blockFontClass(block.font, 'font-serif')} text-[26px] leading-[1.2] tracking-[-0.01em] text-ink sm:text-[30px]`}
                    style={blockSizeStyle(block.size)}
                  >
                    {block.h2}
                  </h2>
                )
              }
              if ('quote' in block) {
                return (
                  <blockquote
                    key={i}
                    className={`my-2 border-l-2 border-line-strong pl-5 ${blockFontClass(block.font, 'font-serif')} text-[22px] leading-[1.4] tracking-[-0.01em] text-ink sm:text-[26px]`}
                    style={blockSizeStyle(block.size)}
                  >
                    {block.quote}
                  </blockquote>
                )
              }
              if ('cta' in block) {
                const { label, href } = block.cta
                const inner = (
                  <>
                    {label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
                  </>
                )
                const cls =
                  'group mx-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[14px] font-medium text-[#0a0a0a] transition-colors hover:bg-white/90'
                return (
                  <div key={i} className="my-3 flex justify-center">
                    {href.startsWith('/') ? (
                      <Link to={href} className={cls}>{inner}</Link>
                    ) : (
                      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                    )}
                  </div>
                )
              }
              return (
                <figure key={i} className="my-2">
                  <div className={block.feather ? '' : 'overflow-hidden rounded-2xl border border-line'}>
                    <img
                      src={block.image}
                      alt={block.alt}
                      loading="lazy"
                      style={
                        block.feather
                          ? {
                              WebkitMaskImage:
                                'radial-gradient(115% 115% at 50% 50%, #000 58%, transparent 100%)',
                              maskImage:
                                'radial-gradient(115% 115% at 50% 50%, #000 58%, transparent 100%)',
                            }
                          : undefined
                      }
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </div>
                  {block.caption && (
                    <figcaption className="mt-3 text-center text-[13.5px] leading-relaxed text-faint">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              )
            })}
          </div>
        </Reveal>

        {/* Bottom nav */}
        <div className="mx-auto mt-14 flex max-w-[680px] items-center justify-between">
          <Button variant="dark" asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4" /> {t.back}
            </Link>
          </Button>
          <Button variant="dark" asChild>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{t.bookCall}</a>
          </Button>
        </div>
      </article>

      <NewsletterSignup source="blog-post" />
    </main>
  )
}
