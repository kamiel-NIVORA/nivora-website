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
import { useEffect, useState } from 'react'
import { POSTS, type Post } from '@/data/posts'

const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? 'https://agpjxjujzjzasgizpphz.supabase.co'
const SUPABASE_ANON_KEY =
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
  image_position: string | null
  cover_label: string | null
  cover_occlude: boolean | null
  cover_label_y: string | null
  cover_icons: unknown
}

function mapRow(r: Row): Post {
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    author: r.author,
    date: r.date ?? '',
    image: r.image ?? '',
    excerpt: r.excerpt ?? '',
    body: Array.isArray(r.body) ? (r.body as Post['body']) : [],
    imagePosition: r.image_position ?? undefined,
    coverLabel: r.cover_label ?? undefined,
    coverOcclude: r.cover_occlude ?? undefined,
    coverLabelY: r.cover_label_y ?? undefined,
    coverIcons: (r.cover_icons as Post['coverIcons']) ?? undefined,
  }
}

export async function fetchPublishedPosts(): Promise<Post[]> {
  const url = `${SUPABASE_URL}/rest/v1/blog_posts?status=eq.published&select=*&order=published_at.desc.nullslast`
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
  })
  if (!res.ok) throw new Error(`blog fetch failed: ${res.status}`)
  const rows = (await res.json()) as Row[]
  return rows.filter((r) => r.slug && r.title).map(mapRow)
}

/** Posts for the blog. Starts with the bundled set for an instant render, then
 *  swaps in the live published posts from Supabase. `loaded` is true once the
 *  network call has settled (so a single-post page knows when to show 404).
 *  A module cache keeps navigation flicker-free. */
let cache: Post[] | null = null

export function usePosts(): { posts: Post[]; loaded: boolean } {
  const [posts, setPosts] = useState<Post[]>(cache ?? POSTS)
  const [loaded, setLoaded] = useState(cache !== null)
  useEffect(() => {
    if (cache !== null) return
    let alive = true
    fetchPublishedPosts()
      .then((p) => {
        if (alive && p.length) {
          cache = p
          setPosts(p)
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
  return { posts, loaded }
}

/** A single post by slug, plus whether the live list has settled. */
export function usePost(slug?: string): { post: Post | undefined; loaded: boolean } {
  const { posts, loaded } = usePosts()
  return { post: posts.find((p) => p.slug === slug), loaded }
}
