export type Post = {
  slug: string
  title: string
  category: string
  author: string
  date: string
  image: string
  excerpt: string
  body: string[]
}

export const AUTHOR_ROLE = 'Founder'

export const POSTS: Post[] = [
  {
    slug: 'why-most-companies-need-less-ai',
    title: 'Why most companies need less AI, not more.',
    category: 'Perspective',
    author: 'Kamiel Niville',
    date: 'Jun 12, 2026',
    image: '/images/2S9MZkkrhQhX1BXE7eQesdMNEk.jpg',
    excerpt:
      'The pressure to adopt AI is everywhere. The honest answer is that most businesses need a smaller, sharper set of systems, not a longer list of tools.',
    body: [
      'Almost every founder we talk to feels the same quiet pressure. Everyone else seems to be moving on AI, so they should too. That pressure rarely leads to good decisions. It leads to a pile of trials, half-used subscriptions, and tools nobody really owns.',
      'We start from the opposite question. Not what AI can do, but what in your business is actually worth changing. Most of the time the answer is short. A handful of repetitive tasks, one or two slow handoffs, a place where information keeps getting lost. Fix those and the rest can stay exactly as it is.',
      'Less AI, done properly, beats more AI bolted on. A system that one person understands and trusts will get used every day. A platform that promises everything tends to get used by no one.',
      'So before we build anything, we map where the real cost sits. If a tool does not save money, time, or mistakes, we say so and we leave it out. That is the part most vendors skip.',
      'The goal is not to make your company look modern. It is to make it work better, with the smallest set of systems that does the job.',
    ],
  },
  {
    slug: 'private-by-design',
    title: 'Private by design: AI that runs inside your business, not someone else’s cloud.',
    category: 'Systems',
    author: 'Kamiel Niville',
    date: 'May 28, 2026',
    image: '/images/9jP0u7kHdIoe1HYaQgRX1MKRqE.jpg',
    excerpt:
      'Your data is part of your business. We build AI systems that run on infrastructure you control, so what is yours stays yours.',
    body: [
      'When you send your documents, customer records, and internal chat to a third-party AI service, you are trusting that company with the core of your business. For a lot of work that trade is fine. For sensitive operations it is not.',
      'We design AI systems that run inside your business. Your AIOS sits on your own hardware, or in a private environment you control. The data never leaves, the models answer from your own knowledge, and access stays in your hands.',
      'Private does not mean primitive. Local models have become strong enough to handle real work: reading contracts, drafting replies, searching years of internal files in seconds. The difference is that none of it is logged on a server you cannot see.',
      'It also means you are not tied to one provider’s pricing or roadmap. The system is yours. If a better model arrives, we swap it in. If a rule changes, we adjust it. You are never waiting on someone else’s release notes.',
      'Build it once, inside your own walls, and you get the upside of AI without handing over the thing that makes your company yours.',
    ],
  },
  {
    slug: 'value-before-you-commit',
    title: 'How we show the value of a build before you commit.',
    category: 'Approach',
    author: 'Kamiel Niville',
    date: 'May 9, 2026',
    image: '/images/89dxBkhlY82YRVjvzzxceldnL0.jpg',
    excerpt:
      'No one should sign off on a system they have not seen work. We prove the value on a small, real slice first, then build.',
    body: [
      'A custom build is a real investment, and most of the risk lives at the start, before anyone knows if the idea holds up. So we move that moment forward. Before a full project, we show you the value on a small, real slice of your work.',
      'That usually means taking one concrete task you already do and building a working version of the system around it. Not a slide, not a demo with fake data. Your data, your process, running.',
      'You get to see the output, push on it, and decide with evidence in front of you. If it clearly helps, we scope the full build from there. If it does not, you have lost a small step instead of a large one.',
      'This is how we take the pressure out of the decision. You are never betting on a promise. You are looking at something that already works and choosing whether to make it bigger.',
      'We would rather earn the next step than sell the whole thing up front. That is also how we end up building only what matters.',
    ],
  },
]
