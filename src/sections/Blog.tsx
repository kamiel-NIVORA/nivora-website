import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PostCard } from '@/components/PostCard'
import { usePosts } from '@/lib/blog'
import { useLang } from '@/i18n'

const COPY = {
  en: {
    title: 'Our most recent articles',
    subtitle:
      'Field notes from inside Nivora, the tools we ship, the thinking behind them, and what we are learning as we build.',
  },
  nl: {
    title: 'Onze meest recente artikelen',
    subtitle:
      'Notities vanuit Nivora, de tools die we uitbrengen, het denken erachter, en wat we leren terwijl we bouwen. Over de echte economische waarde van AI, niet de zoveelste hypetool.',
  },
} as const

export function Blog() {
  const { posts } = usePosts()
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <section id="blog" className="relative mx-auto w-full max-w-[1480px] px-6 py-24 lg:py-28">
      <SectionHeading title={t.title} subtitle={t.subtitle} />

      <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-10">
        {posts.slice(0, 3).map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.07}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
