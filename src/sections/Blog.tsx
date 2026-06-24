import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PostCard } from '@/components/PostCard'
import { usePosts } from '@/lib/blog'

export function Blog() {
  const { posts } = usePosts()

  return (
    <section id="blog" className="relative mx-auto w-full max-w-[1200px] px-6 py-24 lg:py-28">
      <SectionHeading
        title="Our most recent articles"
        subtitle="Field notes from inside Nivora, the tools we ship, the thinking behind them, and what we are learning as we build."
      />

      <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-3">
        {posts.slice(0, 3).map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.07}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
