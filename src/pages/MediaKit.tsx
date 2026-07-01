import { useEffect, useState, type ReactNode } from 'react'
import { Check, Copy, Download, ImageDown, ArrowRight, ArrowDown } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useSeo } from '@/lib/seo'
import {
  copyText,
  copyImage,
  downloadAsset,
  downloadAll,
  useCopyFeedback,
} from '@/lib/clipboard'
import { useLang } from '@/i18n'
import {
  getColorGroups,
  getFonts,
  getLogos,
  getPhotoGallery,
  getPhotoPrinciples,
  getPhotoPrompts,
  getVoice,
  ALL_ASSETS,
} from '@/data/brand'

/* ── A frosted "kader", same feel as the home/service cards: hairline border,
   near-black surface, a soft light line along the top edge. ── */
function Kader({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('relative overflow-hidden rounded-[24px] border border-line bg-white/[0.02]', className)}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
      />
      {children}
    </div>
  )
}

/* ── Section frame: one big left-aligned serif title, no mono eyebrow, no
   numbers. Anchored so the sticky index rail can jump + track it. ── */
function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <Reveal>
        <h2 className="max-w-3xl font-serif text-[34px] leading-[1.06] tracking-[-0.02em] text-ink sm:text-[44px] lg:text-[54px]">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.06}>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{intro}</p>
        </Reveal>
      )}
      <div className="mt-10 lg:mt-14">{children}</div>
    </section>
  )
}

/* ── A quiet, readable sub-label above a block (never tiny uppercase mono). ── */
function MiniLabel({ children }: { children: ReactNode }) {
  return <p className="mb-5 text-[14px] font-medium text-ink">{children}</p>
}

/* ── A small button that flips to a check when its action fires ── */
function ActionButton({
  active,
  onClick,
  idle,
  done,
  icon: Icon,
}: {
  active: boolean
  onClick: () => void
  idle: string
  done: string
  icon: typeof Copy
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex h-10 min-h-[44px] items-center gap-1.5 rounded-full border border-line px-3.5 text-[12px] font-medium transition-colors lg:h-8 lg:min-h-0 lg:px-3',
        active ? 'bg-olive/15 text-olive' : 'bg-white/[0.03] text-muted hover:bg-white/[0.07] hover:text-ink',
      )}
    >
      {active ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
      {active ? done : idle}
    </button>
  )
}

const COPY = {
  en: {
    headerTitle: 'The Nivora brand kit',
    headerIntro:
      'The whole identity, in the open: logos, colour, type, photography, voice and the prompts behind our images. Copy or download anything with one click.',
    downloadAll: 'Download all assets',
    preparing: 'Preparing…',
    scroll: 'Scroll',
    nav: {
      logo: 'Logo',
      colour: 'Colour',
      type: 'Type',
      photography: 'Photography',
      voice: 'Voice',
      guidelines: 'Posting',
    },
    logo: {
      title: 'The mark.',
      intro:
        'The arrow rising through the wordmark is our symbol of growth. White on dark, black on light, and never redrawn.',
      copyImage: 'Copy',
      copied: 'Copied',
      downloadPng: 'PNG',
      rulesLabel: 'A few things to avoid',
      rules: [
        'Keep clear space around the mark equal to the height of the arrow.',
        'Use white on dark, black on light. Nothing in between.',
        'Don’t recolour, rotate, stretch, or add shadows and outlines.',
        'Don’t place the logo on a busy area of a photo. Find calm space.',
      ],
    },
    colour: {
      title: 'Near-black, with earth from the landscape.',
      intro:
        'Layered near-blacks and a grayscale text ladder. Colour appears only in small earthy accents, pulled straight from the photography. Tap any swatch to copy its value.',
      copy: 'Copy',
      copied: 'Copied',
    },
    type: {
      title: 'A serif that speaks, a sans that works.',
      intro:
        'Hedvig Letters Serif carries every headline; Inter handles the reading and the interface; Geist Mono labels the technical bits.',
      copyName: 'Copy name',
      copied: 'Copied',
    },
    photography: {
      title: 'One landscape, shot many ways.',
      intro:
        'Every Nivora image looks like it came from the same quiet morning. Follow the principles, then use the prompts to make new on-brand photos.',
      principlesLabel: 'The principles',
      promptsTitle: 'Image prompts',
      promptsIntro:
        'Paste these into an image model (we use Nano Banana Pro) and swap the capitalised placeholders. They keep every new image on-brand.',
      copyPrompt: 'Copy prompt',
      copied: 'Copied',
      downloadPhoto: 'Download photo',
    },
    voice: {
      title: 'How Nivora sounds.',
      do: 'Do',
      dont: 'Don’t',
    },
    guidelines: {
      title: 'Sharing Nivora? Here is how.',
      intro:
        'Posting through the affiliate program? Here is what makes a good post, where to share it, and the assets to build from.',
      postLabel: 'What to post',
      posts: [
        'Show a real problem, then Box or Voice quietly solving it. A genuine moment beats any feature list.',
        'Keep the tone calm and honest. No hype, no countdowns, no invented numbers or made-up results.',
        'Always include your personal link, so every signup is tied to you.',
        'Build from the assets above. Use the logo as it is, never redraw or recolour it.',
      ],
      whereLabel: 'Where to post',
      whereIntro: 'Post wherever your people already are, or simply tell them directly.',
      platforms: ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'X', 'Facebook', 'Word of mouth'],
      assetsCta: 'Download the bundle',
      affiliateCta: 'The affiliate program',
    },
    closing: {
      title: 'Building something with Nivora?',
      intro: 'Grab the full bundle, or reach out if you need a format, colour or logo variant that isn’t here.',
      contact: 'Contact us',
    },
  },
  nl: {
    headerTitle: 'De Nivora brand kit',
    headerIntro:
      'De hele identiteit, in het open: logo’s, kleur, typografie, fotografie, stem en de prompts achter onze beelden. Kopieer of download alles met één klik.',
    downloadAll: 'Download alle assets',
    preparing: 'Bezig…',
    scroll: 'Scroll',
    nav: {
      logo: 'Logo',
      colour: 'Kleur',
      type: 'Type',
      photography: 'Fotografie',
      voice: 'Stem',
      guidelines: 'Posten',
    },
    logo: {
      title: 'Het teken.',
      intro:
        'De pijl die door het woordmerk omhoogkomt is ons symbool van groei. Wit op donker, zwart op licht, en nooit opnieuw getekend.',
      copyImage: 'Kopieer',
      copied: 'Gekopieerd',
      downloadPng: 'PNG',
      rulesLabel: 'Een paar dingen om te vermijden',
      rules: [
        'Houd rondom het teken vrije ruimte gelijk aan de hoogte van de pijl.',
        'Gebruik wit op donker, zwart op licht. Niets daartussen.',
        'Herkleur, roteer of rek het niet, en voeg geen schaduwen of contouren toe.',
        'Plaats het logo niet op een druk deel van een foto. Zoek rustige ruimte.',
      ],
    },
    colour: {
      title: 'Bijna-zwart, met aarde uit het landschap.',
      intro:
        'Gelaagde bijna-zwarten en een grijswaardenladder voor tekst. Kleur verschijnt alleen in kleine aardse accenten, rechtstreeks uit de fotografie. Tik op een staal om de waarde te kopiëren.',
      copy: 'Kopieer',
      copied: 'Gekopieerd',
    },
    type: {
      title: 'Een serif die spreekt, een sans die werkt.',
      intro:
        'Hedvig Letters Serif draagt elke kop; Inter verzorgt het lezen en de interface; Geist Mono labelt de technische details.',
      copyName: 'Kopieer naam',
      copied: 'Gekopieerd',
    },
    photography: {
      title: 'Eén landschap, op vele manieren geschoten.',
      intro:
        'Elk Nivora-beeld lijkt van dezelfde stille ochtend te komen. Volg de principes, en gebruik de prompts om nieuwe on-brand foto’s te maken.',
      principlesLabel: 'De principes',
      promptsTitle: 'Beeldprompts',
      promptsIntro:
        'Plak deze in een beeldmodel (wij gebruiken Nano Banana Pro) en vervang de placeholders in hoofdletters. Ze houden elk nieuw beeld on-brand.',
      copyPrompt: 'Kopieer prompt',
      copied: 'Gekopieerd',
      downloadPhoto: 'Download foto',
    },
    voice: {
      title: 'Hoe Nivora klinkt.',
      do: 'Wel',
      dont: 'Niet',
    },
    guidelines: {
      title: 'Nivora delen? Zo doet u dat.',
      intro:
        'Deelt u via het affiliateprogramma? Hier leest u wat een goede post maakt, waar u het deelt, en met welke assets u bouwt.',
      postLabel: 'Wat u post',
      posts: [
        'Toon een echt probleem, en dan Box of Voice die het rustig oplost. Een oprecht moment wint van elke opsomming.',
        'Houd de toon kalm en eerlijk. Geen hype, geen aftelklokken, geen verzonnen cijfers of resultaten.',
        'Voeg altijd uw persoonlijke link toe, zodat elke aanmelding aan u gekoppeld wordt.',
        'Bouw met de assets hierboven. Gebruik het logo zoals het is, teken of herkleur het nooit.',
      ],
      whereLabel: 'Waar u post',
      whereIntro: 'Post waar uw mensen al zijn, of vertel het gewoon rechtstreeks.',
      platforms: ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'X', 'Facebook', 'Mond-op-mond'],
      assetsCta: 'Download de bundel',
      affiliateCta: 'Het affiliateprogramma',
    },
    closing: {
      title: 'Bouwt u iets met Nivora?',
      intro: 'Pak de volledige bundel, of laat het weten als u een formaat, kleur of logovariant nodig hebt die hier niet staat.',
      contact: 'Neem contact op',
    },
  },
} as const

const NAV_IDS = ['logo', 'colour', 'type', 'photography', 'voice', 'guidelines'] as const

export function MediaKit() {
  const { lang } = useLang()
  const t = COPY[lang]
  useSeo({
    title: 'Media kit · Nivora',
    description:
      lang === 'nl'
        ? 'De officiële Nivora media kit: logo, kleuren, typografie, fotografie en merkstem, klaar om te downloaden voor pers en partners.'
        : 'The official Nivora media kit: logo, colours, typography, photography and brand voice, ready to download for press and partners.',
    path: '/media',
  })
  const colorGroups = getColorGroups(lang)
  const fonts = getFonts(lang)
  const logos = getLogos(lang)
  const photoGallery = getPhotoGallery(lang)
  const photoPrinciples = getPhotoPrinciples(lang)
  const photoPrompts = getPhotoPrompts(lang)
  const voice = getVoice(lang)
  const { copiedKey, flash } = useCopyFeedback()
  const [downloading, setDownloading] = useState(false)
  const [active, setActive] = useState<string>('logo')

  // Scroll-spy for the sticky index rail.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const onCopyText = (key: string, text: string) => {
    copyText(text)
    flash(key)
  }
  const onCopyImage = (key: string, src: string) => {
    copyImage(src)
    flash(key)
  }
  const onDownloadAll = async () => {
    setDownloading(true)
    await downloadAll(ALL_ASSETS)
    setDownloading(false)
  }

  return (
    <main>
      {/* ── Cinematic hero ── */}
      <header className="relative flex min-h-[92svh] items-center overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img src="/home/hero-nivora.webp" alt="" className="h-full w-full scale-105 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/70 to-bg" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(6,6,6,0.85)_100%)]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1280px] px-6 pt-28 pb-16 lg:pt-32">
          <Reveal mode="mount">
            <img src="/brand/nivora-mark.webp" alt="" className="mb-8 h-12 w-auto object-contain opacity-90 lg:h-14" />
            <h1 className="max-w-4xl font-serif text-[52px] leading-[0.98] tracking-[-0.03em] text-ink sm:text-7xl lg:text-[92px]">
              {t.headerTitle}
            </h1>
          </Reveal>
          <Reveal mode="mount" delay={0.08}>
            <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-ink-soft/80">{t.headerIntro}</p>
          </Reveal>
          <Reveal mode="mount" delay={0.16}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={onDownloadAll} disabled={downloading}>
                <Download className="h-4 w-4" />
                {downloading ? t.preparing : t.downloadAll}
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-7 flex justify-center">
          <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-faint">
            {t.scroll} <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </span>
        </div>
      </header>

      {/* ── Body: sticky index rail + the sections ── */}
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-x-16 px-6 py-20 lg:grid-cols-[150px_minmax(0,1fr)] lg:py-28">
        {/* Rail (desktop) */}
        <aside className="hidden lg:block">
          <nav className="sticky top-32 flex flex-col border-l border-line">
            {NAV_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  '-ml-px border-l py-2 pl-5 text-[13px] transition-colors',
                  active === id
                    ? 'border-ink font-medium text-ink'
                    : 'border-transparent text-dim hover:text-muted',
                )}
              >
                {t.nav[id]}
              </a>
            ))}
          </nav>
        </aside>

        <div className="flex flex-col gap-24 lg:gap-36">
          {/* ── Logo ── */}
          <Section id="logo" title={t.logo.title} intro={t.logo.intro}>
            {/* Dual-surface stage: white on dark · black on light */}
            <Reveal>
              <div className="grid overflow-hidden rounded-[24px] border border-line sm:grid-cols-2">
                <div className="flex h-56 items-center justify-center bg-[radial-gradient(ellipse_at_center,#161616,#070707)] px-8 sm:h-72">
                  <img src="/brand/nivora-logo.png" alt="" className="h-10 w-auto max-w-[78%] object-contain lg:h-12" />
                </div>
                <div className="flex h-56 items-center justify-center border-t border-line bg-white px-8 sm:h-72 sm:border-l sm:border-t-0">
                  <img src="/brand/nivora-mark-dark.webp" alt="" className="h-14 w-auto object-contain lg:h-16" />
                </div>
              </div>
            </Reveal>

            {/* Asset rack */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {logos.map((logo) => {
                const copyKey = `logo-copy-${logo.filename}`
                return (
                  <Reveal key={logo.filename}>
                    <Kader className="flex h-full flex-col">
                      <div
                        className={cn(
                          'flex h-28 items-center justify-center px-6',
                          logo.surface === 'light' ? 'bg-white' : 'bg-white/[0.03]',
                        )}
                      >
                        <img src={logo.src} alt={logo.name} className="max-h-12 w-auto max-w-[75%] object-contain" />
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <p className="text-[14px] font-semibold text-ink">{logo.name}</p>
                        <p className="mt-1 flex-1 text-[12px] leading-snug text-faint">{logo.desc}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <ActionButton
                            active={copiedKey === copyKey}
                            onClick={() => onCopyImage(copyKey, logo.src)}
                            idle={t.logo.copyImage}
                            done={t.logo.copied}
                            icon={ImageDown}
                          />
                          <ActionButton
                            active={false}
                            onClick={() => downloadAsset(logo.src, logo.filename)}
                            idle={t.logo.downloadPng}
                            done={t.logo.downloadPng}
                            icon={Download}
                          />
                        </div>
                      </div>
                    </Kader>
                  </Reveal>
                )
              })}
            </div>

            {/* Misuse */}
            <Reveal>
              <Kader className="mt-4 p-6 lg:p-8">
                <MiniLabel>{t.logo.rulesLabel}</MiniLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {t.logo.rules.map((rule) => (
                    <p key={rule} className="flex gap-2.5 text-[13px] leading-snug text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                      {rule}
                    </p>
                  ))}
                </div>
              </Kader>
            </Reveal>
          </Section>

          {/* ── Colour · spectrum bars ── */}
          <Section id="colour" title={t.colour.title} intro={t.colour.intro}>
            <div className="flex flex-col gap-11">
              {colorGroups.map((group) => (
                <Reveal key={group.label}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-serif text-[21px] text-ink">{group.label}</h3>
                    <p className="max-w-md text-[13px] text-faint sm:text-right">{group.note}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {group.swatches.map((s) => {
                      const key = `swatch-${s.token}`
                      const copied = copiedKey === key
                      const darkText = s.text === 'dark'
                      return (
                        <button
                          key={s.token}
                          type="button"
                          onClick={() => onCopyText(key, s.value)}
                          className="group relative flex h-40 flex-1 basis-[130px] flex-col justify-between overflow-hidden rounded-2xl border border-line p-3.5 text-left transition-transform duration-300 hover:-translate-y-1 sm:h-48"
                          style={{ backgroundColor: s.value }}
                        >
                          <span
                            className={cn(
                              'flex items-center gap-1 self-end text-[11px] font-medium transition-opacity',
                              darkText ? 'text-black/70' : 'text-white/80',
                              copied
                                ? 'opacity-100'
                                : 'opacity-0 [@media(hover:none)]:opacity-100 group-hover:opacity-100',
                            )}
                          >
                            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {copied ? t.colour.copied : t.colour.copy}
                          </span>
                          <span>
                            <span className={cn('block text-[13.5px] font-semibold', darkText ? 'text-black/85' : 'text-white')}>
                              {s.name}
                            </span>
                            <span className={cn('block font-mono text-[11px] uppercase', darkText ? 'text-black/55' : 'text-white/60')}>
                              {s.value}
                            </span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* ── Typography · giant specimen ── */}
          <Section id="type" title={t.type.title} intro={t.type.intro}>
            <Reveal>
              <p
                className="font-serif leading-[0.98] tracking-[-0.02em] text-ink"
                style={{ fontFamily: fonts[0]?.family, fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)' }}
              >
                {fonts[0]?.specimen}
              </p>
            </Reveal>
            <div className="mt-14 flex flex-col gap-4">
              {fonts.map((font) => {
                const key = `font-${font.name}`
                return (
                  <Reveal key={font.name}>
                    <Kader className="p-6 lg:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="font-serif text-[22px] text-ink">{font.name}</p>
                          <p className="mt-1 text-[13px] text-faint">
                            {font.role} · {font.weights}
                          </p>
                        </div>
                        <ActionButton
                          active={copiedKey === key}
                          onClick={() => onCopyText(key, font.name)}
                          idle={t.type.copyName}
                          done={t.type.copied}
                          icon={Copy}
                        />
                      </div>
                      <p className="mt-6 text-[26px] leading-tight text-ink-soft sm:text-[32px]" style={{ fontFamily: font.family }}>
                        {font.specimen}
                      </p>
                      <p className="mt-5 max-w-2xl text-[13px] leading-relaxed text-muted">{font.usage}</p>
                    </Kader>
                  </Reveal>
                )
              })}
            </div>
          </Section>

          {/* ── Photography · lookbook ── */}
          <Section id="photography" title={t.photography.title} intro={t.photography.intro}>
            {/* Mosaic */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:auto-rows-[210px]">
              {photoGallery.map((shot) => {
                const key = `shot-${shot.src}`
                return (
                  <Reveal
                    key={shot.src}
                    className={cn(shot.span === 'wide' && 'lg:col-span-2', shot.span === 'tall' && 'lg:row-span-2')}
                  >
                    <div className="group relative h-full overflow-hidden rounded-[20px] border border-line">
                      <img
                        src={shot.src}
                        alt={shot.caption}
                        className="h-full min-h-44 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3 sm:p-3.5">
                        <span className="text-[12px] text-ink-soft/90">{shot.caption}</span>
                        <button
                          type="button"
                          onClick={() => downloadAsset(shot.src)}
                          aria-label={t.photography.downloadPhoto}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40 text-ink-soft backdrop-blur transition-colors hover:bg-white hover:text-black lg:h-9 lg:w-9"
                        >
                          {copiedKey === key ? <Check className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>

            {/* Principles */}
            <Reveal>
              <Kader className="mt-4 p-6 lg:p-8">
                <MiniLabel>{t.photography.principlesLabel}</MiniLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {photoPrinciples.map((p) => (
                    <p key={p} className="flex gap-2.5 text-[13px] leading-snug text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {p}
                    </p>
                  ))}
                </div>
              </Kader>
            </Reveal>

            {/* Prompts */}
            <Reveal>
              <h3 className="mt-14 font-serif text-[26px] text-ink sm:text-[30px]">{t.photography.promptsTitle}</h3>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-faint">{t.photography.promptsIntro}</p>
            </Reveal>
            <div className="mt-8 flex flex-col gap-4">
              {photoPrompts.map((p) => {
                const key = `prompt-${p.label}`
                return (
                  <Reveal key={p.label}>
                    <Kader className="p-6 lg:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-[15px] font-semibold text-ink">{p.label}</p>
                          <p className="mt-1 text-[13px] text-faint">{p.use}</p>
                        </div>
                        <ActionButton
                          active={copiedKey === key}
                          onClick={() => onCopyText(key, p.prompt)}
                          idle={t.photography.copyPrompt}
                          done={t.photography.copied}
                          icon={Copy}
                        />
                      </div>
                      <p className="mt-4 rounded-xl border border-line bg-black/40 p-4 font-mono text-[12.5px] leading-relaxed text-muted">
                        {p.prompt}
                      </p>
                    </Kader>
                  </Reveal>
                )
              })}
            </div>
          </Section>

          {/* ── Voice · pull-quote + split ── */}
          <Section id="voice" title={t.voice.title}>
            <Reveal>
              <p className="max-w-3xl font-serif leading-[1.08] tracking-[-0.01em] text-ink" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
                “{voice.essence}”
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Reveal>
                <Kader className="h-full p-6 lg:p-8">
                  <div className="mb-5 flex items-center gap-2 text-[15px] font-medium text-olive">
                    <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                    {t.voice.do}
                  </div>
                  <ul className="flex flex-col gap-3.5">
                    {voice.dos.map((d) => (
                      <li key={d} className="flex gap-2.5 text-[14.5px] leading-snug text-ink-soft/85">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </Kader>
              </Reveal>
              <Reveal delay={0.05}>
                <Kader className="h-full p-6 lg:p-8">
                  <div className="mb-5 flex items-center gap-2 text-[15px] font-medium text-terracotta">
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                    {t.voice.dont}
                  </div>
                  <ul className="flex flex-col gap-3.5">
                    {voice.donts.map((d) => (
                      <li key={d} className="flex gap-2.5 text-[14.5px] leading-snug text-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </Kader>
              </Reveal>
            </div>
          </Section>

          {/* ── Posting · for affiliates ── */}
          <Section id="guidelines" title={t.guidelines.title} intro={t.guidelines.intro}>
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <Reveal>
                <Kader className="h-full p-6 lg:p-8">
                  <MiniLabel>{t.guidelines.postLabel}</MiniLabel>
                  <ul className="flex flex-col gap-3.5">
                    {t.guidelines.posts.map((p) => (
                      <li key={p} className="flex gap-3 text-[14.5px] leading-relaxed text-ink-soft/85">
                        <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-olive" strokeWidth={2} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Kader>
              </Reveal>
              <Reveal delay={0.06}>
                <Kader className="flex h-full flex-col p-6 lg:p-8">
                  <MiniLabel>{t.guidelines.whereLabel}</MiniLabel>
                  <p className="text-[14px] leading-relaxed text-faint">{t.guidelines.whereIntro}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {t.guidelines.platforms.map((p) => (
                      <span key={p} className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-[12.5px] text-ink-soft/80">
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:flex-wrap sm:items-center">
                    <Button onClick={onDownloadAll} disabled={downloading}>
                      <Download className="h-4 w-4" />
                      {downloading ? t.preparing : t.guidelines.assetsCta}
                    </Button>
                    <Button variant="dark" asChild>
                      <a href="/affiliate">
                        {t.guidelines.affiliateCta} <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </Kader>
              </Reveal>
            </div>
          </Section>
        </div>
      </div>

      {/* ── Cinematic closing ── */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img src="/home/cta-landscape.webp" alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg" />
        </div>
        <div className="relative mx-auto max-w-[900px] px-6 py-24 text-center lg:py-32">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-serif text-[34px] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[46px]">
              {t.closing.title}
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft/80">{t.closing.intro}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" onClick={onDownloadAll} disabled={downloading}>
                <Download className="h-4 w-4" />
                {downloading ? t.preparing : t.downloadAll}
              </Button>
              <Button variant="dark" size="lg" asChild>
                <a href="/contact">{t.closing.contact}</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
