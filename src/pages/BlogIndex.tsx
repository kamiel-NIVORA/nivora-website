import { useState } from 'react'
import { Reveal } from '@/components/animations/Reveal'
import { PostCard } from '@/components/PostCard'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { usePosts } from '@/lib/blog'
import { useLang } from '@/i18n'
import { cn } from '@/lib/utils'

const COPY = {
  en: { heading: 'Blog & News', viewAll: 'View All' },
  nl: { heading: 'Blog & nieuws', viewAll: 'Alles' },
} as const

export function BlogIndex() {
  const { posts: allPosts } = usePosts()
  const { lang } = useLang()
  const t = COPY[lang]
  // null = "view all"; storing the category (not the localized label) keeps the
  // active filter valid across a language switch.
  const [active, setActive] = useState<string | null>(null)
  const categories = Array.from(new Set(allPosts.map((p) => p.category)))
  const posts = active === null ? allPosts : allPosts.filter((p) => p.category === active)
  const tabs: { key: string; label: string; value: string | null }[] = [
    { key: '__all__', label: t.viewAll, value: null },
    ...categories.map((cat) => ({ key: cat, label: cat, value: cat })),
  ]

  return (
    <main>
      <section className="relative mx-auto w-full max-w-[1200px] px-6 pb-28 pt-36 lg:pb-32 lg:pt-44">
        {/* Heading */}
        <Reveal>
          <h1 className="font-serif text-[44px] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[60px]">
            {t.heading}
          </h1>
        </Reveal>

        {/* Category filters */}
        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.value)}
                className={cn(
                  'rounded-full px-4 py-2 text-[13px] transition-colors duration-200',
                  active === tab.value
                    ? 'bg-ink text-bg'
                    : 'border border-line bg-white/[0.03] text-muted hover:bg-white/[0.06] hover:text-ink',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Post grid — keyed by filter so cards re-reveal on switch */}
        <div key={active} className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={Math.min(i, 5) * 0.06}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>

      <NewsletterSignup source="blog-index" />
    </main>
  )
}
