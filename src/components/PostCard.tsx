import { Link } from 'react-router-dom'
import { Avatar, authorPhoto } from '@/components/ui/Avatar'
import type { Post } from '@/data/posts'

/** Blog card: cover → title → excerpt → byline (avatar · author · date). Shared
 *  by the homepage teaser and the blog index so both stay identical. */
export function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group flex h-full flex-col">
      <div className="overflow-hidden rounded-2xl border border-line">
        <img
          src={post.image}
          alt={post.title}
          className="aspect-[16/10] h-full w-full object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>

      <h3 className="mt-5 font-serif text-[21px] leading-[1.25] tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-white">
        {post.title}
      </h3>

      {post.excerpt && (
        <p className="mt-2.5 line-clamp-2 text-[14.5px] leading-relaxed text-faint">{post.excerpt}</p>
      )}

      <div className="mt-auto flex items-center gap-2 pt-4 text-[13px] text-faint">
        <Avatar name={post.author} src={authorPhoto(post.author)} />
        <span className="text-ink-soft/80">{post.author}</span>
        <span className="text-dim">·</span>
        <span>{post.date}</span>
      </div>
    </Link>
  )
}
