import { useEffect, type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, ArrowDown, Gift } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { RippleButton } from '@/components/ui/RippleButton'
import { useContactModal } from '@/components/contact/ContactModal'
import { useLang } from '@/i18n'

const ease = [0.16, 1, 0.3, 1] as const

/* Line-art renders that keep the whole page in one quiet, monochrome world. */
const PEAK_IMG = '/affiliate/peak.webp' // hero, drawn mountain
const WAVES_IMG = '/affiliate/waves.webp' // closing call to action
const TOPO_IMG = '/affiliate/topo.webp' // faint texture behind the steps
const LOOP_GIF = '/affiliate/loop.gif' // animated ribbon, the gift visual

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
        body: 'You join the program and we hand you your own link to Box and Voice.',
      },
      {
        title: 'Share it with your people',
        body: 'Post it, send it, recommend it. Anywhere the right businesses already listen to you.',
      },
      {
        title: 'They become customers',
        body: 'When someone signs up through your link and starts paying, we tie it to you.',
      },
      {
        title: 'You earn 20%',
        body: 'You keep 20% of what they pay, every month they stay a customer. No cap.',
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
    badgeProgram: 'Affiliate program',
    badgeSoon: 'Coming soon',
    heroLine1: 'Share Box and Voice.',
    heroLine2: 'Earn 20%.',
    heroSub:
      'When someone signs up through your personal link and becomes a paying customer, you keep 20% of what they pay, for as long as they stay. The program is not open yet. Here is how it will work.',
    beFirst: 'Be the first to know',
    seeHow: 'See how it works',
    kickerHow: 'How it will work',
    howHeading: 'From your link to your first payout',
    kickerExtra: 'A little extra',
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
        body: 'U sluit zich aan bij het programma en wij geven u uw eigen link naar Box en Voice.',
      },
      {
        title: 'Deel hem met uw mensen',
        body: 'Post hem, stuur hem, beveel hem aan. Overal waar de juiste bedrijven al naar u luisteren.',
      },
      {
        title: 'Zij worden klant',
        body: 'Wanneer iemand zich via uw link aanmeldt en begint te betalen, koppelen we het aan u.',
      },
      {
        title: 'U verdient 20%',
        body: 'U houdt 20% van wat ze betalen, elke maand dat ze klant blijven. Zonder limiet.',
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
    badgeProgram: 'Affiliate programma',
    badgeSoon: 'Binnenkort',
    heroLine1: 'Deel Box en Voice.',
    heroLine2: 'Verdien 20%.',
    heroSub:
      'Wanneer iemand zich via uw persoonlijke link aanmeldt en een betalende klant wordt, houdt u 20% van wat ze betalen, zolang ze blijven. Het programma is nog niet open. Zo zal het werken.',
    beFirst: 'Wees als eerste op de hoogte',
    seeHow: 'Bekijk hoe het werkt',
    kickerHow: 'Hoe het zal werken',
    howHeading: 'Van uw link tot uw eerste uitbetaling',
    kickerExtra: 'Een beetje extra',
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
      <GiftBlock />
      <Apps />
      <FinalCta />
    </main>
  )
}

/* ── Shared ──────────────────────────────────────────────────────────────── */

/** One quiet marker, used as a section opener. A soft pulse, no rules or lines. */
function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[13px] text-faint">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/70" />
      </span>
      {children}
    </span>
  )
}

/* ── Hero ────────────────────────────────────────────────────────────────── */

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}
const heroWord: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease } },
}
const heroFade: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease } },
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
    <section className="relative flex min-h-[94svh] w-full flex-col items-center justify-center overflow-hidden px-6 pb-28 pt-32">
      {/* Drawn mountain, sitting a touch high so the summit breathes */}
      <img
        src={PEAK_IMG}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[50%_22%] opacity-90"
      />
      {/* Even darken so the line art reads but the type stays crisp */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/80" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 50% at 50% 56%, rgba(0,0,0,0.55), transparent 80%)' }}
      />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-bg via-bg/80 to-transparent" />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.div variants={heroFade}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-[12.5px] text-ink/90 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            {t.badgeProgram}
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="text-faint">{t.badgeSoon}</span>
          </span>
        </motion.div>

        <h1 className="mt-7 font-serif text-[42px] leading-[1.04] tracking-[-0.02em] text-ink sm:text-[60px] lg:text-[74px] lg:leading-[1.01]">
          <span className="block">
            <HeroWords text={t.heroLine1} />
          </span>
          <span className="mt-1 block">
            <HeroWords text={t.heroLine2} />
          </span>
        </h1>

        <motion.p
          variants={heroFade}
          className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-ink-soft/80 lg:text-[17px]"
        >
          {t.heroSub}
        </motion.p>

        <motion.div variants={heroFade} className="mt-10">
          <RippleButton
            href="#contact"
            className="h-12 px-7 text-[15px]"
            onClick={(e) => {
              e.preventDefault()
              open()
            }}
          >
            {t.beFirst}
          </RippleButton>
        </motion.div>

        {/* The arrow lives under the button, a calm cue to read on */}
        <motion.a
          variants={heroFade}
          href="#how"
          aria-label={t.seeHow}
          className="group mt-12 flex flex-col items-center gap-3 text-faint transition-colors hover:text-ink"
        >
          <span className="text-[12px] tracking-wide">{t.seeHow}</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 backdrop-blur-md transition-colors group-hover:border-white/30">
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="h-4 w-4" strokeWidth={1.6} />
            </motion.span>
          </span>
        </motion.a>
      </motion.div>
    </section>
  )
}

/* ── Facts ───────────────────────────────────────────────────────────────── */

function Facts() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative z-10 mx-auto -mt-10 w-full max-w-[1080px] px-6">
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

/* ── How it works ────────────────────────────────────────────────────────── */

function HowItWorks() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section id="how" className="relative w-full scroll-mt-24 px-6 py-28 lg:py-36">
      {/* Faint topographic texture, just enough to feel designed */}
      <img
        src={TOPO_IMG}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.06]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal y={16}>
            <div className="flex justify-center">
              <Kicker>{t.kickerHow}</Kicker>
            </div>
          </Reveal>
          <Reveal delay={0.06} y={16}>
            <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[46px]">
              {t.howHeading}
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[18px] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
          />
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {t.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} y={16}>
                <div className="relative">
                  <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg font-mono text-[13px] text-ink-soft">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-faint">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
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
                <Kicker>{t.kickerExtra}</Kicker>
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
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white/[0.04] text-ink-soft">
                    <Gift className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  </span>
                  <span className="text-[14px] text-ink-soft">
                    {t.giftChip}
                  </span>
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
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-28 lg:py-36">
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
                  href={`/waitlist?product=${a.name.toLowerCase()}`}
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

/* ── Final CTA ───────────────────────────────────────────────────────────── */

function FinalCta() {
  const { open } = useContactModal()
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section id="contact" className="relative w-full overflow-hidden px-6 pb-32 pt-12 lg:pb-40">
      {/* Flowing line art, anchoring the close */}
      <img
        src={WAVES_IMG}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[120%] w-full object-cover object-bottom opacity-[0.14]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg/90" />

      <Reveal y={16}>
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[32px] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[44px] lg:text-[54px]">
            {t.finalHeading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-faint lg:text-base">
            {t.finalBody}
          </p>
          <div className="mt-9 flex justify-center">
            <RippleButton
              href="#contact"
              className="h-12 px-7 text-[15px]"
              onClick={(e) => {
                e.preventDefault()
                open()
              }}
            >
              {t.beFirst}
            </RippleButton>
          </div>
          <p className="mt-5 text-[13px] text-dim">{t.finalFoot}</p>
        </div>
      </Reveal>
    </section>
  )
}
