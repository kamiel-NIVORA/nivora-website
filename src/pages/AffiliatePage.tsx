import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Gift, Megaphone, Share2 } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { RippleButton } from '@/components/ui/RippleButton'
import { useContactModal } from '@/components/contact/ContactModal'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { cn } from '@/lib/utils'
import { waitlistHref } from '@/data/contact'
import { useLang } from '@/i18n'

const ease = [0.16, 1, 0.3, 1] as const

/* Scenic, photographic world, in line with the home and service pages. */
const HERO_IMG = '/affiliate/hero-hills.webp' // green hills, the hero
const CTA_IMG = '/affiliate/cta-spiral.webp' // the closing call to action
const LOOP_GIF = '/affiliate/loop.gif' // the gift ribbon

/** One quiet, monochrome image per step of the timeline, alternating left and
 *  right. Kept grayscale on purpose: the green scenics are the hero and the close,
 *  the middle of the page stays calm and clean. */
const STEP_IMAGES = [
  '/backgrounds/bg-dunes-mist.jpg',
  '/backgrounds/bg-peak-mono.webp',
  '/backgrounds/bg-peak-stars.webp',
  '/affiliate/IMG_0694.webp',
]

/** Monochrome brand glyphs for the platforms you can post on. Simple, single-path
 *  SVGs kept in currentColor so they read as one quiet family. */
const PLATFORMS: { name: string; path: string }[] = [
  {
    name: 'Instagram',
    path: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
  },
  {
    name: 'TikTok',
    path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
  {
    name: 'YouTube',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    name: 'LinkedIn',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    name: 'X',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    name: 'Facebook',
    path: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
  },
]

type Fact = { big: string; label: string }
type Step = { title: string; body: string }
type App = { logo: string; name: string; line: string }

const COPY = {
  en: {
    docTitle: 'Affiliate · Nivora',
    facts: [
      { big: '20%', label: 'of every payment from the customers you refer' },
      { big: 'Every month', label: 'you keep earning for as long as they stay' },
      { big: 'Your link', label: 'a personal link that tracks everyone you send' },
    ] as Fact[],
    steps: [
      {
        title: 'Get your personal link',
        body: 'You join the program and we hand you your own link to Box and Voice. One link, yours, ready to share anywhere.',
      },
      {
        title: 'Share it with your people',
        body: 'Post it, send it, recommend it. Anywhere the right businesses already listen to you. The word travels, and every click stays tied to you.',
      },
      {
        title: 'They become customers',
        body: 'When someone signs up through your link and starts paying, we tie it to you. No forms to chase, no proof to gather. It simply counts.',
      },
      {
        title: 'You earn 20%',
        body: 'You keep 20% of what they pay, every month they stay a customer. No cap, no expiry. It keeps coming in as long as they do.',
      },
    ] as Step[],
    apps: [
      {
        logo: '/products/box-logo.webp',
        name: 'Box',
        line: 'All your communication, brought together in one place.',
      },
      {
        logo: '/products/voice-logo.webp',
        name: 'Voice',
        line: 'Speech to text, tuned to your voice and your writing.',
      },
    ] as App[],
    heroLine1: 'Share Box and Voice.',
    heroLine2: 'Earn 20%.',
    heroSub:
      'Post about it, or simply tell the right people. When someone signs up through your personal link and starts paying, you keep 20% of what they pay, for as long as they stay. The program is not open yet, here is how it will work.',
    beFirst: 'Be the first to know',
    eyebrowHow: 'How it works',
    howHeading: 'From your link to your first payout',
    howSub: 'Four steps, and only the first one asks anything of you. The rest keeps running on its own.',
    waysEyebrow: 'How you share',
    waysHeading: 'Two simple ways to bring people in',
    waysSub: 'You do not need a big following. Post about it, or just tell the right people. Both count, both pay.',
    postTitle: 'Post content',
    postBody:
      'Make a video, a post, a story. Show what Box and Voice do for the people who already follow you. We hand you a full kit of assets and clear guidelines, so you always know what to share and how.',
    postCta: 'See the post guidelines',
    wordTitle: 'Word of mouth',
    wordBody:
      'No feed, no camera, no problem. Send your link in a message, drop it in a group chat, mention it to a business that needs it. One honest recommendation beats any ad.',
    wordChips: ['A message', 'A group chat', 'A quick word'],
    eyebrowExtra: 'A little extra',
    giftHeading: 'Your people get a gift too',
    giftBody:
      'It is not only about your commission. Everyone who joins through your link gets early access to Box and Voice before the public. So sharing feels like giving them a head start, not a sales pitch.',
    giftRibbonAlt: 'An endless ribbon, passed from one hand to the next',
    giftChip: 'Early access for everyone you invite. A gift worth sharing.',
    appsHeading: 'Two apps people will actually want',
    appsBody:
      'Box and Voice are launching soon. As an affiliate you will be among the first to put them in front of the people who need them.',
    joinWaitlist: 'Join the waiting list',
    finalHeading: 'The program opens soon',
    finalBody:
      'We are putting the final pieces in place. Leave your details and we will reach out the moment you can join as an affiliate, with your link ready to share.',
    finalFoot: 'No spam. One message when affiliates can join.',
  },
  nl: {
    docTitle: 'Affiliate · Nivora',
    facts: [
      { big: '20%', label: 'van elke betaling van de klanten die u aanbrengt' },
      { big: 'Elke maand', label: 'u blijft verdienen zolang ze klant blijven' },
      { big: 'Uw link', label: 'een persoonlijke link die iedereen volgt die u doorstuurt' },
    ] as Fact[],
    steps: [
      {
        title: 'Krijg uw persoonlijke link',
        body: 'U sluit zich aan bij het programma en wij geven u uw eigen link naar Box en Voice. Eén link, van u, klaar om overal te delen.',
      },
      {
        title: 'Deel hem met uw mensen',
        body: 'Post hem, stuur hem, beveel hem aan. Overal waar de juiste bedrijven al naar u luisteren. Het gaat rond, en elke klik blijft aan u gekoppeld.',
      },
      {
        title: 'Zij worden klant',
        body: 'Wanneer iemand zich via uw link aanmeldt en begint te betalen, koppelen we het aan u. Geen formulieren, geen bewijzen verzamelen. Het telt gewoon.',
      },
      {
        title: 'U verdient 20%',
        body: 'U houdt 20% van wat ze betalen, elke maand dat ze klant blijven. Zonder limiet, zonder einddatum. Het blijft binnenkomen zolang zij dat doen.',
      },
    ] as Step[],
    apps: [
      {
        logo: '/products/box-logo.webp',
        name: 'Box',
        line: 'Al uw communicatie, samengebracht op één plek.',
      },
      {
        logo: '/products/voice-logo.webp',
        name: 'Voice',
        line: 'Spraak naar tekst, afgestemd op uw stem en uw schrijfstijl.',
      },
    ] as App[],
    heroLine1: 'Deel Box en Voice.',
    heroLine2: 'Verdien 20%.',
    heroSub:
      'Post erover, of vertel het gewoon aan de juiste mensen. Wanneer iemand zich via uw persoonlijke link aanmeldt en begint te betalen, houdt u 20% van wat ze betalen, zolang ze blijven. Het programma is nog niet open, zo zal het werken.',
    beFirst: 'Wees als eerste op de hoogte',
    eyebrowHow: 'Hoe het werkt',
    howHeading: 'Van uw link tot uw eerste uitbetaling',
    howSub: 'Vier stappen, en alleen de eerste vraagt iets van u. De rest loopt vanzelf verder.',
    waysEyebrow: 'Hoe u deelt',
    waysHeading: 'Twee simpele manieren om mensen binnen te brengen',
    waysSub: 'U hebt geen groot bereik nodig. Post erover, of vertel het gewoon aan de juiste mensen. Beide tellen, beide betalen.',
    postTitle: 'Post content',
    postBody:
      'Maak een video, een post, een story. Laat zien wat Box en Voice doen voor de mensen die u al volgen. Wij geven u een volledige kit met assets en heldere richtlijnen, zodat u altijd weet wat u deelt en hoe.',
    postCta: 'Bekijk de post-richtlijnen',
    wordTitle: 'Mond-op-mond',
    wordBody:
      'Geen feed, geen camera, geen probleem. Stuur uw link in een bericht, zet hem in een groepschat, vermeld hem bij een bedrijf dat het nodig heeft. Eén eerlijke aanbeveling wint van elke advertentie.',
    wordChips: ['Een bericht', 'Een groepschat', 'Een kort woord'],
    eyebrowExtra: 'Een beetje extra',
    giftHeading: 'Uw mensen krijgen ook een cadeau',
    giftBody:
      'Het gaat niet alleen om uw commissie. Iedereen die zich via uw link aansluit, krijgt vroege toegang tot Box en Voice, nog voor het grote publiek. Zo voelt delen als hen een voorsprong geven, niet als een verkooppraatje.',
    giftRibbonAlt: 'Een eindeloos lint, doorgegeven van de ene hand naar de andere',
    giftChip: 'Vroege toegang voor iedereen die u uitnodigt. Een cadeau dat het delen waard is.',
    appsHeading: 'Twee apps die mensen echt zullen willen',
    appsBody:
      'Box en Voice lanceren binnenkort. Als affiliate bent u een van de eersten om ze onder de aandacht te brengen van de mensen die ze nodig hebben.',
    joinWaitlist: 'Schrijf u in op de wachtlijst',
    finalHeading: 'Het programma opent binnenkort',
    finalBody:
      'We leggen de laatste stukken op hun plaats. Laat uw gegevens achter en we nemen contact op zodra u zich als affiliate kunt aansluiten, met uw link klaar om te delen.',
    finalFoot: 'Geen spam. Eén bericht zodra affiliates zich kunnen aansluiten.',
  },
} as const

/* ──────────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────────── */
export function AffiliatePage() {
  const { lang } = useLang()
  const t = COPY[lang]
  useEffect(() => {
    document.title = t.docTitle
    return () => {
      document.title = 'Nivora'
    }
  }, [t.docTitle])

  return (
    <main className="relative w-full overflow-hidden bg-bg">
      <Hero />
      <Facts />
      <HowItWorks />
      <Ways />
      <GiftBlock />
      <Apps />
      <FinalCta />
    </main>
  )
}

/* ── Shared ──────────────────────────────────────────────────────────────── */

/** A calm, plain section eyebrow. No dots, no rules, just a quiet label. */
function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-faint">{children}</span>
}

/* ── Hero ────────────────────────────────────────────────────────────────── */

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}
const heroWord: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease } },
}
const heroFade: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(7px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease } },
}

function HeroWords({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <motion.span key={i} variants={heroWord} className="mr-[0.22em] inline-block last:mr-0">
          {w}
        </motion.span>
      ))}
    </>
  )
}

function Hero() {
  const { open } = useContactModal()
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 pb-32 pt-32">
      {/* Scenic hills, like the home and service heroes */}
      <img
        src={HERO_IMG}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[50%_42%]"
      />
      {/* Darken so the type stays crisp, and fade the foot into the page */}
      <div className="absolute inset-0 bg-black/30" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(78% 60% at 50% 48%, rgba(0,0,0,0.5), rgba(0,0,0,0.16) 58%, transparent 80%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46vh] bg-gradient-to-t from-bg via-bg/75 to-transparent" />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <h1 className="font-serif text-[42px] leading-[1.04] tracking-[-0.02em] text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.45)] sm:text-[60px] lg:text-[76px] lg:leading-[1.01]">
          <span className="block">
            <HeroWords text={t.heroLine1} />
          </span>
          <span className="mt-1 block">
            <HeroWords text={t.heroLine2} />
          </span>
        </h1>

        <motion.p
          variants={heroFade}
          className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-ink-soft/85 [text-shadow:0_1px_14px_rgba(0,0,0,0.5)] lg:text-[17px]"
        >
          {t.heroSub}
        </motion.p>

        <motion.div variants={heroFade} className="mt-10 w-full sm:w-auto">
          <RippleButton
            href="#contact"
            className="h-12 w-full px-7 text-[15px] sm:w-auto"
            onClick={(e) => {
              e.preventDefault()
              open()
            }}
          >
            {t.beFirst}
          </RippleButton>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ── Facts ───────────────────────────────────────────────────────────────── */

function Facts() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative z-10 mx-auto -mt-16 w-full max-w-[1080px] px-6">
      <div className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-3">
        {t.facts.map((f, i) => (
          <Reveal key={f.big} delay={i * 0.08} y={16}>
            <div className="h-full bg-bg-soft px-7 py-10 text-center lg:px-8">
              <p className="font-serif text-[34px] leading-none tracking-[-0.01em] text-ink lg:text-[42px]">
                {f.big}
              </p>
              <p className="mx-auto mt-3.5 max-w-[15rem] text-[13.5px] leading-relaxed text-faint">
                {f.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── How it works · alternating scenic timeline ──────────────────────────────
   The AIOS-proposal shape: a white centre line that fills with scroll, with
   feature rows that alternate left and right. Each photo wipes in with a
   clip-path reveal as it passes, the copy drifts, a bead lights on the line. */

function HowRow({ index, title, body, image }: { index: number; title: string; body: string; image: string }) {
  const reduced = usePrefersReducedMotion()
  const reverse = index % 2 === 1 // even rows: image right; odd rows: image left
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const clipFrom = reverse ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'
  const clipTo = reverse ? 'inset(0 0 0 0%)' : 'inset(0 0% 0 0)'
  const clip = useTransform(scrollYProgress, [0, 0.4], [clipFrom, clipTo])
  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0, 1, 1, 0])
  const ty = useTransform(scrollYProgress, [0, 1], [36, -36])
  const beadOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1])
  const beadScale = useTransform(scrollYProgress, [0.4, 0.5, 0.58], [0.3, 1.18, 1])

  return (
    <div ref={ref} className="relative py-14 sm:py-20 lg:py-36">
      {/* node: a black disc that masks the centre line, with a bead that pops in */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bg lg:flex"
      >
        <motion.span
          style={reduced ? undefined : { opacity: beadOpacity, scale: beadScale }}
          className="h-3 w-3 rounded-full bg-ink shadow-[0_0_14px_rgba(245,245,245,0.7)]"
        />
      </span>

      <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-20">
        <motion.div
          style={reduced ? undefined : { y: ty }}
          className={cn('lg:px-2', reverse ? 'lg:order-2' : 'lg:order-1')}
        >
          <span className="font-mono text-[13px] text-faint">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="mt-3 font-serif text-[22px] leading-[1.14] tracking-[-0.01em] text-ink sm:text-[25px] lg:text-[28px]">
            {title}
          </h3>
          <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-faint">{body}</p>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { clipPath: clip, opacity }}
          className={cn(
            'relative overflow-hidden rounded-[20px] border border-line bg-[#070709] shadow-[0_30px_80px_rgba(0,0,0,0.6)]',
            reverse ? 'lg:order-1' : 'lg:order-2',
          )}
        >
          <img src={image} alt="" loading="lazy" className="block aspect-[4/3] w-full object-cover" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>
      </div>
    </div>
  )
}

function HowItWorks() {
  const { lang } = useLang()
  const t = COPY[lang]
  const lineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 60%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section id="how" className="relative w-full scroll-mt-24 px-6 py-20 sm:py-24 lg:py-32">
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal y={16}>
            <Eyebrow>{t.eyebrowHow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06} y={16}>
            <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[46px]">
              {t.howHeading}
            </h2>
          </Reveal>
          <Reveal delay={0.12} y={16}>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{t.howSub}</p>
          </Reveal>
        </div>

        <div
          ref={lineRef}
          className="relative mx-auto mt-8 max-w-[1160px] lg:mt-12 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_10%,#000_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_10%,#000_90%,transparent_100%)]"
        >
          {/* centre line, growing white with scroll (desktop) */}
          <div aria-hidden className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 overflow-hidden rounded-full lg:block">
            <motion.div
              style={{ scaleY: fill }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-white/85 via-white/55 to-white/25"
            />
          </div>

          {t.steps.map((s, i) => (
            <HowRow key={s.title} index={i} title={s.title} body={s.body} image={STEP_IMAGES[i]} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── How you share · post content or word of mouth ───────────────────────── */

function Ways() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal y={16}>
          <Eyebrow>{t.waysEyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06} y={16}>
          <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[46px]">
            {t.waysHeading}
          </h2>
        </Reveal>
        <Reveal delay={0.12} y={16}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{t.waysSub}</p>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1000px] items-stretch gap-5 md:grid-cols-2 lg:gap-6">
        {/* Post content — the platforms + the guidelines */}
        <Reveal y={16}>
          <div className="flex h-full flex-col rounded-[28px] border border-line bg-white/[0.02] p-8 transition-colors duration-300 hover:border-line-strong lg:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-white/[0.04] text-ink">
              <Share2 className="h-[21px] w-[21px]" strokeWidth={1.6} />
            </span>
            <h3 className="mt-7 font-serif text-[23px] leading-[1.18] tracking-[-0.01em] text-ink lg:text-[26px]">
              {t.postTitle}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-faint">{t.postBody}</p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              {PLATFORMS.map((p) => (
                <span
                  key={p.name}
                  title={p.name}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-ink-soft/70 transition-colors hover:border-line-strong hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" role="img" aria-label={p.name}>
                    <path d={p.path} />
                  </svg>
                </span>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <RippleButton href="/media#guidelines" variant="ghost" className="h-11 gap-2 px-6 text-[14px]">
                {t.postCta}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </RippleButton>
            </div>
          </div>
        </Reveal>

        {/* Word of mouth — no audience required */}
        <Reveal delay={0.08} y={16}>
          <div className="flex h-full flex-col rounded-[28px] border border-line bg-white/[0.02] p-8 transition-colors duration-300 hover:border-line-strong lg:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-white/[0.04] text-ink">
              <Megaphone className="h-[21px] w-[21px]" strokeWidth={1.6} />
            </span>
            <h3 className="mt-7 font-serif text-[23px] leading-[1.18] tracking-[-0.01em] text-ink lg:text-[26px]">
              {t.wordTitle}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-faint">{t.wordBody}</p>

            <div className="mt-auto flex flex-wrap gap-2.5 pt-8">
              {t.wordChips.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-ink-soft/80"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Gift ────────────────────────────────────────────────────────────────── */

function GiftBlock() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative w-full px-6 pb-8 lg:pb-12">
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="relative overflow-hidden rounded-[32px] border border-line bg-black">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:p-16">
            {/* Copy */}
            <div className="order-2 lg:order-1">
              <Reveal y={16}>
                <Eyebrow>{t.eyebrowExtra}</Eyebrow>
              </Reveal>
              <Reveal delay={0.06} y={16}>
                <h2 className="mt-5 font-serif text-[28px] leading-[1.14] tracking-[-0.01em] text-ink sm:text-[36px] lg:text-[44px]">
                  {t.giftHeading}
                </h2>
              </Reveal>
              <Reveal delay={0.12} y={16}>
                <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-faint lg:text-base">
                  {t.giftBody}
                </p>
              </Reveal>
              <Reveal delay={0.18} y={16}>
                <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-line bg-white/[0.03] px-4 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.04] text-ink-soft">
                    <Gift className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  </span>
                  <span className="text-[14px] text-ink-soft">{t.giftChip}</span>
                </div>
              </Reveal>
            </div>

            {/* Animated ribbon, sitting in its own pool of light */}
            <Reveal delay={0.1} y={16} className="order-1 lg:order-2">
              <div className="relative mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.08), transparent 70%)' }}
                />
                <img
                  src={LOOP_GIF}
                  alt={t.giftRibbonAlt}
                  className="relative h-full w-full object-contain mix-blend-screen"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Apps ────────────────────────────────────────────────────────────────── */

function Apps() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal y={16}>
          <h2 className="font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[46px]">
            {t.appsHeading}
          </h2>
        </Reveal>
        <Reveal delay={0.06} y={16}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint lg:text-base">
            {t.appsBody}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {t.apps.map((a, i) => (
          <Reveal key={a.name} delay={i * 0.08} y={16}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-[#0a0a0a] p-7 lg:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="flex items-center gap-4">
                <img
                  src={a.logo}
                  alt={a.name}
                  className="h-12 w-12 shrink-0 rounded-2xl border border-line object-cover"
                />
                <span className="font-serif text-[24px] leading-none text-ink">{a.name}</span>
              </div>
              <p className="mt-5 flex-1 text-[14.5px] leading-relaxed text-faint">{a.line}</p>
              <div className="mt-6">
                <RippleButton
                  href={waitlistHref(a.name.toLowerCase())}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="solid"
                  className="h-11 gap-2 px-6 text-[14px]"
                >
                  {t.joinWaitlist}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                </RippleButton>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── Final CTA · scenic close ─────────────────────────────────────────────── */

function FinalCta() {
  const { open } = useContactModal()
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section id="contact" className="relative w-full overflow-hidden px-6 pb-28 pt-24 sm:pb-36 sm:pt-28 lg:pb-44">
      {/* Scenic photo anchoring the close, feathered into the page */}
      <img
        src={CTA_IMG}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[50%_45%]"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(72% 60% at 50% 48%, rgba(6,6,6,0.6), transparent 78%)' }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg via-bg/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg via-bg/70 to-transparent" />

      <Reveal y={16}>
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[32px] leading-[1.1] tracking-[-0.01em] text-ink [text-shadow:0_2px_26px_rgba(0,0,0,0.5)] sm:text-[44px] lg:text-[54px]">
            {t.finalHeading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-ink-soft/85 [text-shadow:0_1px_14px_rgba(0,0,0,0.5)] lg:text-base">
            {t.finalBody}
          </p>
          <div className="mt-9 flex justify-center">
            <RippleButton
              href="#contact"
              className="h-12 w-full px-7 text-[15px] sm:w-auto"
              onClick={(e) => {
                e.preventDefault()
                open()
              }}
            >
              {t.beFirst}
            </RippleButton>
          </div>
          <p className="mt-5 text-[13px] text-ink-soft/60">{t.finalFoot}</p>
        </div>
      </Reveal>
    </section>
  )
}
