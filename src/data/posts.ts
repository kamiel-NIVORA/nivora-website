/**
 * Blog content for Nivora Works.
 *
 * A post body is an ordered list of blocks. A plain string is a paragraph; the
 * object forms add a subheading, a pull quote, or an inline image. Rendering
 * lives in `src/pages/BlogPost.tsx`. House voice: calm, plain-spoken, no hype,
 * and no em-dashes in copy (Kamiel's hard preference).
 */
export type PostBlock =
  | string
  | { h2: string }
  | { quote: string }
  | { image: string; alt: string; caption?: string; position?: string }

export type Post = {
  slug: string
  title: string
  category: string
  author: string
  date: string
  image: string
  /** object-position for the hero crop, e.g. 'center 28%' to lift a tall photo. */
  imagePosition?: string
  /** Short word shown as a glass chip on the hero. */
  coverLabel?: string
  /** App-logo chips on the hero (one per bottom corner). */
  coverIcons?: { src: string; name: string }[]
  excerpt: string
  body: PostBlock[]
}

export const AUTHOR_ROLE = 'Founder'

export const POSTS: Post[] = [
  {
    slug: 'meet-box-and-voice',
    title: 'Meet Box and Voice, the first two apps from Nivora.',
    category: 'Product',
    author: 'Kamiel Niville',
    date: 'Jun 20, 2026',
    image: '/images/blog-box-voice-launch.jpg',
    coverIcons: [
      { src: '/box-logo.png', name: 'Box' },
      { src: '/voice-logo.png', name: 'Voice' },
    ],
    excerpt:
      'After months of building quietly, we are ready to introduce the first two apps in the Nivora suite. Box brings every message into one calm inbox. Voice turns the way you talk into clean, finished text.',
    body: [
      'We have been quiet for a while, and that was on purpose. Building software you actually want to open every day takes longer than building something that just demos well. We wanted the first thing you see from us to be the real thing, not a mockup with the rough edges hidden. So here it is. The first two apps in the Nivora suite are Box and Voice.',
      { h2: 'Box: every message in one calm place' },
      'Most of us lose small pieces of the day to the same problem. A question comes in over email, the follow-up lands in chat, and the actual decision happens in a DM you forgot to check. Box pulls all of it into one inbox. Email, chat, and direct messages, read and sorted and answered in a single place, without jumping between five tabs to keep one conversation straight.',
      'It is built to feel quiet. No badges screaming for attention, no inbox that resets your focus every time you blink. You open it, you see what genuinely needs you, you reply, and you close it again. That is the whole idea.',
      { h2: 'Voice: say it once, get clean copy' },
      'Voice is speech to text that pays attention to two things at the same time. How you talk, and how you write. You dictate a message, a note, or a first draft, and it comes back as finished copy in your own voice, not a wall of run-on transcription you then have to rewrite. Say it once and move on with your day.',
      {
        quote:
          'We are not trying to add more apps to your day. We are trying to take a few away.',
      },
      'That line sits behind everything we make. Box replaces the tab-hopping. Voice replaces the retyping. Both are designed to disappear into your work instead of demanding a place in it. If you ever notice them less, we have done the job right.',
      { h2: 'Both are coming soon, and the waiting list goes first' },
      'Box and Voice are in the final stretch before launch, and they will land on iPhone, Mac, Android, and Windows. The fastest way to get them the day they are ready, and to help shape the last round of details, is the waiting list. Everyone on it gets first access.',
      'It is also where we share the real updates before anywhere else, the honest behind-the-scenes kind, not the polished announcements. If you want to follow how this comes together, join the list and come along early. We would love to have you there from the start.',
    ],
  },
  {
    slug: 'how-the-ai-is-actually-going',
    title: 'How our AI is actually going, in plain words.',
    category: 'Progress',
    author: 'Kamiel Niville',
    date: 'Jun 6, 2026',
    image: '/images/blog-ai-progress.jpg',
    imagePosition: 'center 78%',
    coverLabel: 'AI progress',
    excerpt:
      'An honest progress update from inside the build. What is working now, what we changed our minds about, and why the quiet, unglamorous parts are the ones we are proudest of.',
    body: [
      'People ask us how the AI side is going more than almost anything else, so we want to answer it properly, without the usual fog. No grand claims, no roadmap theatre. Just where things actually stand right now.',
      { h2: 'The models got good enough, quietly' },
      'A year ago, running capable AI close to your own data meant giving something up on quality. That is no longer true. The models we build on can read a long contract, search years of internal files, and draft a careful reply, and they do it fast enough to feel instant. The leap happened without much noise, and it quietly changed what we are able to promise you.',
      {
        image: '/images/blog-ai-hand.jpg',
        alt: 'A human hand reaching toward a hand formed from points of light',
        caption:
          'The gap between what people expect from AI and what it can quietly do has closed faster than most of us planned for.',
      },
      'What that means in practice is simple. A lot of the things we used to describe as coming soon are now just things the software does. That is a good place to be standing.',
      { h2: 'We spent more time on trust than on features' },
      'If we are honest about where the hours went, it was not into piling on more. It went into making the system explain itself. Showing where an answer came from, making it easy to correct, and making sure nothing surprising happens behind your back. A clever feature you do not trust gets used once. A plain one you do trust gets used every day. We optimised hard for the second kind.',
      {
        quote:
          'The quiet parts, the ones nobody puts in a demo, are the parts that decide whether a system survives its first month with a real team.',
      },
      'So a lot of our recent work looks unremarkable from the outside. Better handling when a request is unclear. Clearer limits on what the system will and will not do. Faster answers on smaller hardware. None of it makes a flashy screenshot. All of it is why the people testing early builds keep coming back.',
      { h2: 'What is next' },
      'The near-term goal has not changed. We want a system that one person can fully understand and rely on, that runs close to your business, and that gets sharper every month without you lifting a finger. We are closer to that than we have ever been, and the pace is picking up rather than slowing down.',
      'We will keep sharing these updates as they happen, the real ones rather than the tidy ones. If you want them first, the waiting list is the best seat in the house.',
    ],
  },
  {
    slug: 'why-we-are-betting-on-local',
    title: 'Why we are betting on local, the AI that lives inside your business.',
    category: 'Local',
    author: 'Kamiel Niville',
    date: 'May 22, 2026',
    image: '/images/blog-local-peak.jpg',
    imagePosition: 'center 16%',
    coverLabel: 'Local AI',
    excerpt:
      'Most AI sends your data to someone else’s cloud. We think the bigger opportunity is the opposite. AI that runs on hardware you own, where what is yours stays yours.',
    body: [
      'Almost every AI tool you can buy today works the same way. Your words, your files, and your customers’ details get sent off to a server somewhere, processed there, and sent back. For plenty of tasks that is perfectly fine. But the more we build, the more convinced we become that the real opportunity sits in the other direction. We call it local, and we think it is where a lot of this is quietly heading.',
      { h2: 'What local actually means' },
      'Local AI runs inside your own walls. The model lives on hardware you control, your data never leaves it, and the answers come from your own knowledge instead of a shared cloud. Nothing gets logged on a server you cannot see. Your information stays exactly where it already is, which is with you.',
      'For a long time that came with a catch. Local meant slower, smaller, and noticeably worse. That trade is mostly gone now. Models you can run privately have become strong enough for real work. Reading documents, drafting replies, searching everything you have ever written in seconds. You no longer have to choose between private and capable.',
      {
        image: '/images/blog-local-horizon.jpg',
        alt: 'A lone figure standing on a wide beach, facing the open sea',
        position: 'center 88%',
        caption:
          'Owning the system you depend on changes how it feels to use it. The horizon is yours, not rented.',
      },
      { h2: 'Why this matters more than it sounds' },
      'When the AI lives with you, a few things shift at once. Your data stops being a liability you handed to a third party. Your costs stop being tied to someone else’s per-message pricing. And your system stops being something that can change or vanish because a provider updated their roadmap. You own the thing you rely on, end to end.',
      {
        quote:
          'Private should not mean primitive. The whole point is to get the upside of AI without giving away the thing that makes your company yours.',
      },
      'There is a strategic edge here too. The work you do, the knowledge you have built, the way you speak to your customers, all of it becomes something only your system understands and only you can reach. That is hard to copy. It compounds quietly, month after month, the way a real advantage should.',
      { h2: 'Where we are taking it' },
      'This is the part of Nivora we are most excited about, and the part we are investing in hardest. We do not see local AI as a niche for the privacy-obsessed. We see it as the sensible default for any business that takes its own data seriously. The mountain is big and we are early on it, which is exactly why we like the view.',
      'We will keep writing about what we learn as we climb. If local is something you have quietly been wondering about, join the waiting list and follow along. This one is going to be worth watching from the start.',
    ],
  },
]
