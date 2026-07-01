import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion'
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
/** One quiet, monochrome image per step of the timeline, alternating left and
 *  right. Kept grayscale on purpose: the green scenics are the hero and the close,
 *  the middle of the page stays calm and clean. */
const STEP_IMAGES = [
  '/affiliate/timeline-1.webp',
  '/affiliate/timeline-2.webp',
  '/affiliate/timeline-3.webp',
  '/affiliate/timeline-4.webp',
]

/** The un-glossy source, shown first; the glossy blur then fades in on scroll. */
const CLEAN_IMAGES = [
  '/affiliate/timeline-clean-1.webp',
  '/affiliate/timeline-clean-2.webp',
  '/affiliate/timeline-clean-3.webp',
  '/affiliate/timeline-clean-4.webp',
]

/** White step marks: link, share, customer for the first three; the last row shows
 *  the reward number instead of an icon. */
const STEP_ICONS: (string | null)[] = [
  '/affiliate/icons/step-link.png',
  '/affiliate/icons/step-share.png',
  '/affiliate/icons/step-customer.png',
  null,
]

/** Backgrounds for the two "how you share" cards (landscape photos). */
const SOCIAL_BG = '/affiliate/social-bg.webp'
const WOM_BG = '/affiliate/wom-bg.webp'
const WOM_ICON = '/affiliate/icons/word-of-mouth.png'

/** Social platforms you can post on — real brand icons, scattered across the frame
 *  at varied sizes like the Local AI constellation (one bigger, some smaller). */
const SOCIALS: { name: string; src: string; left: string; top: string; size: number }[] = [
  { name: 'Instagram', src: '/affiliate/icons/instagram.svg', left: '50%', top: '49%', size: 76 },
  { name: 'TikTok', src: '/affiliate/icons/tiktok.svg', left: '22%', top: '26%', size: 54 },
  { name: 'YouTube', src: '/affiliate/icons/youtube.svg', left: '79%', top: '24%', size: 58 },
  { name: 'LinkedIn', src: '/affiliate/icons/linkedin.svg', left: '13%', top: '63%', size: 46 },
  { name: 'X', src: '/affiliate/icons/x.svg', left: '33%', top: '79%', size: 52 },
  { name: 'Facebook', src: '/affiliate/icons/facebook.svg', left: '87%', top: '64%', size: 50 },
  { name: 'Pinterest', src: '/affiliate/icons/pinterest.svg', left: '67%', top: '80%', size: 48 },
]

type Fact = { big: string; label: string }
type Step = { title: string; body: string; keyword: string }
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
        keyword: 'Link',
      },
      {
        title: 'Share it with your people',
        body: 'Post it, send it, recommend it. Anywhere the right businesses already listen to you. The word travels, and every click stays tied to you.',
        keyword: 'Share',
      },
      {
        title: 'They become customers',
        body: 'When someone signs up through your link and starts paying, we tie it to you. No forms to chase, no proof to gather. It simply counts.',
        keyword: 'Clients',
      },
      {
        title: 'You earn 20%',
        body: 'You keep 20% of what they pay, every month they stay a customer. No cap, no expiry. It keeps coming in as long as they do.',
        keyword: '20%',
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
    badgeSoon: 'Coming soon',
    heroLine1: 'Share Box and Voice.',
    heroLine2: 'Earn 20%.',
    heroSub:
      'Post about it, or simply tell the right people. You keep 20% of every customer you bring in, every month they stay.',
    beFirst: 'Be the first to know',
    eyebrowHow: 'How it works',
    howHeading: 'From your link to your first payout',
    howSub: 'Four steps, and only the first one asks anything of you. The rest keeps running on its own.',
    waysEyebrow: 'How you share',
    waysHeading: 'Two simple ways to bring people in',
    waysSub: 'You do not need a big audience. Pick whichever fits you, both pay exactly the same.',
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
        keyword: 'Link',
      },
      {
        title: 'Deel hem met uw mensen',
        body: 'Post hem, stuur hem, beveel hem aan. Overal waar de juiste bedrijven al naar u luisteren. Het gaat rond, en elke klik blijft aan u gekoppeld.',
        keyword: 'Delen',
      },
      {
        title: 'Zij worden klant',
        body: 'Wanneer iemand zich via uw link aanmeldt en begint te betalen, koppelen we het aan u. Geen formulieren, geen bewijzen verzamelen. Het telt gewoon.',
        keyword: 'Klanten',
      },
      {
        title: 'U verdient 20%',
        body: 'U houdt 20% van wat ze betalen, elke maand dat ze klant blijven. Zonder limiet, zonder einddatum. Het blijft binnenkomen zolang zij dat doen.',
        keyword: '20%',
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
    badgeSoon: 'Binnenkort',
    heroLine1: 'Deel Box en Voice.',
    heroLine2: 'Verdien 20%.',
    heroSub:
      'Post erover, of vertel het gewoon aan de juiste mensen. U houdt 20% van elke klant die u aanbrengt, elke maand opnieuw.',
    beFirst: 'Wees als eerste op de hoogte',
    eyebrowHow: 'Hoe het werkt',
    howHeading: 'Van uw link tot uw eerste uitbetaling',
    howSub: 'Vier stappen, en alleen de eerste vraagt iets van u. De rest loopt vanzelf verder.',
    waysEyebrow: 'Hoe u deelt',
    waysHeading: 'Twee simpele manieren om mensen binnen te brengen',
    waysSub: 'U hebt geen groot publiek nodig. Kies wat bij u past, beide betalen precies evenveel.',
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
      <Apps />
      <FinalCta />
    </main>
  )
}

/* ── Shared ──────────────────────────────────────────────────────────────── */

/** A calm, plain section eyebrow. No dots, no rules, just a quiet label. */
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
    <section className="relative flex min-h-[80svh] w-full flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-32">
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
            'radial-gradient(78% 60% at 50% 46%, rgba(0,0,0,0.5), rgba(0,0,0,0.16) 58%, transparent 80%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34vh] bg-gradient-to-t from-bg via-bg/70 to-transparent" />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.div variants={heroFade} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-1.5 text-[12.5px] tracking-wide text-ink/90 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            {t.badgeSoon}
          </span>
        </motion.div>

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
    <section className="relative z-10 mx-auto -mt-24 w-full max-w-[1080px] px-6">
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

function HowRow({
  index,
  title,
  body,
  image,
  clean,
  icon,
  keyword,
}: {
  index: number
  title: string
  body: string
  image: string
  clean?: string
  icon?: string | null
  keyword: string
}) {
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
  // Local-AI reveal: the clean photo shows first, then a quick scroll fades the glossy
  // blur in, then the mark (icon, or the one big word), all before the line reaches the bead.
  const blurReveal = useTransform(scrollYProgress, [0.24, 0.36], [0, 1])
  const markReveal = useTransform(scrollYProgress, [0.31, 0.43], [0, 1])

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
          <h3 className="font-serif text-[22px] leading-[1.14] tracking-[-0.01em] text-ink sm:text-[25px] lg:text-[28px]">
            {title}
          </h3>
          <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-faint">{body}</p>
        </motion.div>

        {/* Glossy frame: clean photo -> glossy glass blur fades in -> the mark fades in. */}
        <motion.div
          style={reduced ? undefined : { clipPath: clip, opacity }}
          className={cn(
            'relative aspect-[4/3] overflow-hidden rounded-[20px] border border-line bg-[#070709] shadow-[0_30px_80px_rgba(0,0,0,0.6)]',
            reverse ? 'lg:order-1' : 'lg:order-2',
          )}
        >
          <img
            src={clean ?? image}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {clean && (
            <motion.img
              src={image}
              alt=""
              aria-hidden
              loading="lazy"
              style={reduced ? { opacity: 1 } : { opacity: blurReveal }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-black/30" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(58% 58% at 50% 50%, rgba(0,0,0,0.4), transparent 78%)' }}
          />
          <motion.div
            style={reduced ? { opacity: 1 } : { opacity: markReveal }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
          >
            {icon ? (
              <>
                <span aria-hidden className="absolute h-28 w-28 rounded-full bg-black/25 blur-2xl sm:h-36 sm:w-36" />
                <img
                  src={icon}
                  alt=""
                  className="relative h-20 w-20 drop-shadow-[0_8px_22px_rgba(0,0,0,0.6)] sm:h-28 sm:w-28"
                />
              </>
            ) : (
              <span className="font-serif text-[52px] leading-none tracking-[-0.02em] text-ink [text-shadow:0_4px_30px_rgba(0,0,0,0.7)] sm:text-[64px] lg:text-[76px]">
                {keyword}
              </span>
            )}
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
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
            <h2 className="font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[46px]">
              {t.howHeading}
            </h2>
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
            <HowRow key={s.title} index={i} title={s.title} body={s.body} image={STEP_IMAGES[i]} clean={CLEAN_IMAGES[i]} icon={STEP_ICONS[i]} keyword={s.keyword} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── How you share · post content or word of mouth ───────────────────────── */

/** A perfectly smooth circular drift (same as the Local AI marks): a pivot rotates
 *  linearly, the child is offset by `radius` and counter-rotates to stay upright. */
function Drift({ radius, duration, phase, children }: { radius: number; duration: number; phase: number; children: ReactNode }) {
  const reduced = usePrefersReducedMotion()
  if (reduced) return <span className="inline-flex">{children}</span>
  return (
    <motion.div className="inline-flex" animate={{ rotate: [phase, phase + 360] }} transition={{ duration, repeat: Infinity, ease: 'linear' }}>
      <motion.div className="will-change-transform" style={{ x: radius }} animate={{ rotate: [-phase, -phase - 360] }} transition={{ duration, repeat: Infinity, ease: 'linear' }}>
        {children}
      </motion.div>
    </motion.div>
  )
}

/** One social logo in a glassy floating badge, drifting on its own phase. */
function SocialBadge({ src, name, left, top, size, i }: { src: string; name: string; left: string; top: string; size: number; i: number }) {
  const pad = Math.round(size * 0.24)
  return (
    <div className="absolute" style={{ left, top, marginLeft: -size / 2, marginTop: -size / 2 }}>
      <Drift radius={7} duration={24 + (i % 3) * 5} phase={i * 51}>
        <div
          className="flex items-center justify-center rounded-2xl border border-white/20 bg-white/[0.12] shadow-[0_12px_34px_rgba(0,0,0,0.5)] backdrop-blur-md"
          style={{ width: size, height: size, padding: pad }}
        >
          <img src={src} alt={name} loading="lazy" className="h-full w-full object-contain" />
        </div>
      </Drift>
    </div>
  )
}

/** Frosted glass shell, the same feel as the home "Our Services" cards: a real
 *  backdrop blur, a diagonal sheen, a soft top-left highlight and a top hairline. */
function GlassShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/[0.1] bg-white/[0.03] p-4 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)]',
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-black/25" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_85%_at_18%_-12%,rgba(255,255,255,0.14),transparent_56%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="relative flex flex-1 flex-col">{children}</div>
    </div>
  )
}

function Ways() {
  const { lang } = useLang()
  const t = COPY[lang]
  const reduced = usePrefersReducedMotion()
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal y={16}>
          <h2 className="font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[46px]">
            {t.waysHeading}
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1040px] items-stretch gap-5 md:grid-cols-2 lg:gap-6">
        {/* Post content — a photo frame carrying every platform, in full colour */}
        <Reveal y={16}>
          <GlassShell>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] border border-white/[0.08]">
              <img src={SOCIAL_BG} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[50%_45%]" />
              <div className="absolute inset-0 bg-black/45" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(64% 64% at 50% 50%, rgba(0,0,0,0.3), transparent 76%)' }}
              />
              <div className="pointer-events-none absolute inset-0">
                {SOCIALS.map((s, i) => (
                  <SocialBadge key={s.name} src={s.src} name={s.name} left={s.left} top={s.top} size={s.size} i={i} />
                ))}
              </div>
            </div>

            <div className="flex flex-1 flex-col px-3 pb-2 pt-6">
              <h3 className="font-serif text-[24px] leading-[1.15] tracking-[-0.01em] text-ink lg:text-[26px]">
                {t.postTitle}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-faint">{t.postBody}</p>
              <div className="mt-auto pt-6">
                <RippleButton href="/media#guidelines" variant="ghost" className="h-11 px-6 text-[14px]">
                  {t.postCta}
                </RippleButton>
              </div>
            </div>
          </GlassShell>
        </Reveal>

        {/* Word of mouth — one big icon, no audience required */}
        <Reveal delay={0.08} y={16}>
          <GlassShell>
            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[18px] border border-white/[0.08]">
              <img src={WOM_BG} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[50%_42%]" />
              <div className="absolute inset-0 bg-black/45" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(52% 60% at 50% 46%, rgba(0,0,0,0.4), transparent 72%)' }}
              />
              <Drift radius={9} duration={28} phase={0}>
                <motion.span
                  animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative flex h-24 w-24 items-center justify-center rounded-[26px] border border-white/20 bg-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.55)] backdrop-blur-md"
                >
                  <img src={WOM_ICON} alt="Word of mouth" className="h-12 w-12 object-contain" />
                </motion.span>
              </Drift>
            </div>

            <div className="flex flex-1 flex-col px-3 pb-2 pt-6">
              <h3 className="font-serif text-[24px] leading-[1.15] tracking-[-0.01em] text-ink lg:text-[26px]">
                {t.wordTitle}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-faint">{t.wordBody}</p>
            </div>
          </GlassShell>
        </Reveal>
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
                  className="h-11 px-6 text-[14px]"
                >
                  {t.joinWaitlist}
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
