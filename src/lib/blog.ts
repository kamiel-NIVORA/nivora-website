/**
 * Blog data layer.
 *
 * Posts live in the shared Supabase `blog_posts` table (written by the Nivora
 * AIOS blog page and the AIOS chat). We read the PUBLISHED ones over the REST
 * API with plain fetch, so the marketing site stays a dependency-free static
 * build. The bundled `POSTS` in `@/data/posts` is used as an instant first
 * paint and a fallback if the network call fails, so the blog never breaks.
 *
 * The Supabase anon key is public by design; row-level security limits anon
 * reads to published posts only.
 */
import { useEffect, useMemo, useState } from 'react'
import { getPosts, type Post, type PostBlock } from '@/data/posts'
import { useLang, type Lang } from '@/i18n'

export const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? 'https://agpjxjujzjzasgizpphz.supabase.co'
export const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFncGp4anVqemp6YXNnaXpwcGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzOTk5MzQsImV4cCI6MjA4NTk3NTkzNH0.-Rz-xk09qfg39dsBMXYRApzktEDz6qr1rsnscF_JX3Q'

type Row = {
  slug: string
  title: string
  category: string
  author: string
  date: string | null
  image: string | null
  excerpt: string | null
  body: unknown
  /** Dutch variants, authored alongside the base (English) fields in the AIOS.
   *  When the site language is NL these win; missing ones fall back to English,
   *  so a half-translated post still renders. */
  title_nl: string | null
  excerpt_nl: string | null
  body_nl: unknown
  category_nl: string | null
  image_position: string | null
  cover_label: string | null
  cover_occlude: boolean | null
  cover_label_y: string | null
  cover_label_x: string | null
  cover_label_size: number | null
  cover_icons: unknown
}

/**
 * public/ was reorganized into per-feature folders (2026-06), so the flat
 * pre-reorg files (e.g. /box-logo.webp, /images/blog-*.webp) no longer ship.
 * Posts authored in the AIOS can still carry those old paths in the database,
 * which then render as broken images. Remap the known legacy locations to the
 * new folders at read time, so a stale path in the DB can never break the blog
 * again, whatever the source data holds.
 */
const LEGACY_ASSET_PATHS: Record<string, string> = {
  '/box-logo.webp': '/products/box-logo.webp',
  '/voice-logo.webp': '/products/voice-logo.webp',
}

function fixAssetPath(src: string): string {
  if (!src) return src
  if (LEGACY_ASSET_PATHS[src]) return LEGACY_ASSET_PATHS[src]
  // Blog imagery moved from the flat root / old /images folder into /blog.
  const blog = src.match(/^\/(?:images\/)?(blog-[\w-]+\.[a-z0-9]+)$/i)
  if (blog) return `/blog/${blog[1]}`
  return src
}

function fixBlock(block: PostBlock): PostBlock {
  return block && typeof block === 'object' && 'image' in block
    ? { ...block, image: fixAssetPath(block.image) }
    : block
}

function mapRow(r: Row, lang: Lang): Post {
  const coverIcons = (r.cover_icons as Post['coverIcons']) ?? undefined
  const nl = lang === 'nl'
  const body = nl && Array.isArray(r.body_nl) && r.body_nl.length ? r.body_nl : r.body
  return {
    slug: r.slug,
    title: (nl && r.title_nl) || r.title,
    category: (nl && r.category_nl) || r.category,
    author: r.author,
    date: r.date ?? '',
    image: fixAssetPath(r.image ?? ''),
    excerpt: (nl && r.excerpt_nl) || r.excerpt || '',
    body: Array.isArray(body) ? (body as Post['body']).map(fixBlock) : [],
    imagePosition: r.image_position ?? undefined,
    coverLabel: r.cover_label ?? undefined,
    coverOcclude: r.cover_occlude ?? undefined,
    coverLabelY: r.cover_label_y ?? undefined,
    coverLabelX: r.cover_label_x ?? undefined,
    coverLabelSize: typeof r.cover_label_size === 'number' ? r.cover_label_size : undefined,
    coverIcons: coverIcons?.map((ic) => ({ ...ic, src: fixAssetPath(ic.src) })),
  }
}

async function fetchPublishedRows(): Promise<Row[]> {
  const url = `${SUPABASE_URL}/rest/v1/blog_posts?status=eq.published&select=*&order=published_at.desc.nullslast`
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
  })
  if (!res.ok) throw new Error(`blog fetch failed: ${res.status}`)
  const rows = (await res.json()) as Row[]
  return rows.filter((r) => r.slug && r.title)
}

export async function fetchPublishedPosts(lang: Lang = 'en'): Promise<Post[]> {
  return (await fetchPublishedRows()).map((r) => mapRow(r, lang))
}

/** Posts for the blog. Starts with the bundled set for an instant render, then
 *  swaps in the live published posts from Supabase. `loaded` is true once the
 *  network call has settled (so a single-post page knows when to show 404).
 *  A module cache keeps navigation flicker-free. The raw rows are cached and
 *  mapped per language, so switching NL/EN re-renders the live posts too. */
let cache: Row[] | null = null

export function usePosts(): { posts: Post[]; loaded: boolean } {
  const { lang } = useLang()
  const [rows, setRows] = useState<Row[] | null>(cache)
  const [loaded, setLoaded] = useState(cache !== null)
  useEffect(() => {
    if (cache !== null) return
    let alive = true
    fetchPublishedRows()
      .then((r) => {
        if (alive && r.length) {
          cache = r
          setRows(r)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setLoaded(true)
      })
    return () => {
      alive = false
    }
  }, [])
  const posts = useMemo(
    () => (rows ? rows.map((r) => mapRow(r, lang)) : getPosts(lang)),
    [rows, lang],
  )
  return { posts, loaded }
}

/** A single post by slug, plus whether the live list has settled. */
export function usePost(slug?: string): { post: Post | undefined; loaded: boolean } {
  const { posts, loaded } = usePosts()
  return { post: posts.find((p) => p.slug === slug), loaded }
}
