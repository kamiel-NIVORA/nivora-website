import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { POSTS } from '@/data/posts'

export function BlogPost() {
  const { slug } = useParams()
  const post = POSTS.find((p) => p.slug === slug)

  if (!post) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-[760px] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-3xl text-ink">Article not found</h1>
        <Link
          to="/blog"
          className="mt-4 inline-flex items-center gap-2 text-sm text-faint transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the blog
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
          <div className="mt-12 overflow-hidden rounded-3xl border border-line">
            <img src={post.image} alt={post.title} className="aspect-[16/9] w-full object-cover" />
          </div>
        </Reveal>

        {/* Body */}
        <Reveal mode="mount" delay={0.16} className="mx-auto mt-12 max-w-[680px]">
          <div className="flex flex-col gap-6">
            {post.body.map((para, i) => (
              <p key={i} className="text-[17px] leading-[1.8] text-muted sm:text-[18px]">
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Bottom nav */}
        <div className="mx-auto mt-14 flex max-w-[680px] items-center justify-between">
          <Button variant="dark" asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </Button>
          <Button variant="dark" asChild>
            <a href="/#contact">Book a call</a>
          </Button>
        </div>
      </article>
    </main>
  )
}
