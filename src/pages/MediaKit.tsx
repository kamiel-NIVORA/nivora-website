import { useState, type ReactNode } from 'react'
import { Check, Copy, Download, ImageDown, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
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
  getRadii,
  getPhotoGallery,
  getPhotoPrinciples,
  getPhotoPrompts,
  getVoice,
  ALL_ASSETS,
} from '@/data/brand'

/* ── A frosted "kader", same feel as the home/service cards: a hairline
   border, near-black surface and a soft light line along the top edge. ── */
function Kader({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[22px] border border-line bg-white/[0.02]',
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      {children}
    </div>
  )
}

/* ── Section frame: a calm centered serif heading (no mono eyebrow, no
   numbers), anchored so the table of contents can jump to it. ── */
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
    <section id={id} className="scroll-mt-28 py-14 sm:py-20 lg:py-24">
      <SectionHeading title={title} subtitle={intro} />
      <div className="mt-12 lg:mt-16">{children}</div>
    </section>
  )
}

/* ── A small label above a block of content: quiet, readable, sentence case. ── */
function MiniLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('mb-4 text-[14px] font-medium text-ink', className)}>{children}</p>
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
      'Everything you need to represent Nivora correctly: logos, colours, type, photography and the prompts behind our images. Copy or download anything with one click.',
    downloadAll: 'Download all assets',
    preparing: 'Preparing…',
    questions: 'Questions? Get in touch',
    toc: {
      guidelines: 'Posting',
      logo: 'Logo',
      colour: 'Colour',
      type: 'Typography',
      layout: 'Layout',
      photography: 'Photography',
      voice: 'Voice',
    },
    guidelines: {
      title: 'What to post, and how.',
      intro:
        'Sharing Nivora through the affiliate program? Here is what makes a good post, where to share it, and the assets to build from.',
      postLabel: 'What to post',
      posts: [
        'Show a real problem, then Box or Voice quietly solving it. A genuine moment beats any feature list.',
        'Keep the tone calm and honest. No hype, no countdowns, no invented numbers or made-up results.',
        'Always include your personal link, so every signup is tied to you.',
        'Build from the assets below. Use the logo as it is, never redraw or recolour it.',
      ],
      whereLabel: 'Where to post',
      whereIntro: 'Post wherever your people already are, or simply tell them directly.',
      platforms: ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'X', 'Facebook', 'Word of mouth'],
      assetsCta: 'Download the asset bundle',
      affiliateCta: 'Back to the affiliate program',
    },
    logo: {
      title: 'The mark, and how to use it.',
      intro:
        'The arrow rising through the wordmark is our symbol of growth. Give it room, keep it monochrome, and never redraw it.',
      copyImage: 'Copy image',
      copied: 'Copied',
      downloadPng: 'Download PNG',
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
        'Layered near-blacks and a grayscale text ladder. Colour appears only in small earthy accents, pulled straight from our photography. Click any swatch to copy its value.',
      copy: 'Copy',
      copied: 'Copied',
    },
    type: {
      title: 'A serif that speaks, a sans that works.',
      intro:
        'Hedvig Letters Serif carries every headline; Inter handles the reading and the interface; Geist Mono labels the technical bits. That is the whole system.',
      copyName: 'Copy name',
      copied: 'Copied',
    },
    layout: {
      title: 'Soft corners, hairline borders, calm motion.',
      intro:
        'Surfaces are framed with white hairline borders at low opacity and rounded consistently. Buttons are full pills; cards round generously.',
      cornerRadius: 'Corner radius',
      buttons: 'Buttons',
      primary: 'Primary',
      secondary: 'Secondary',
      ghost: 'Ghost',
      buttonNote:
        'Primary is the white pill that fills black from the cursor. Secondary is a hairline dark pill. Keep one primary action per view.',
      pillTag: 'Pill · rounded-full',
      cardTag: 'Card · rounded-2xl',
    },
    photography: {
      title: 'One landscape, shot many ways.',
      intro:
        'Every Nivora image looks like it came from the same quiet morning. Follow the principles below, and use the prompts to generate new on-brand photos.',
      principlesLabel: 'The principles',
      promptsTitle: 'Image prompts',
      promptsIntro:
        'Paste these into an image model (we use Nano Banana Pro) and swap the capitalised placeholders. They keep every new image on-brand.',
      copyPrompt: 'Copy prompt',
      copied: 'Copied',
      downloadPhoto: 'Download photo',
    },
    voice: {
      do: 'Do',
      dont: 'Don’t',
    },
    closing: {
      title: 'Building something with Nivora?',
      intro:
        'Grab the full asset bundle, or reach out if you need a format, colour, or logo variant that isn’t here.',
      contact: 'Contact us',
    },
  },
  nl: {
    headerTitle: 'De Nivora brand kit',
    headerIntro:
      'Alles wat u nodig hebt om Nivora correct weer te geven: logo’s, kleuren, typografie, fotografie en de prompts achter onze beelden. Kopieer of download alles met één klik.',
    downloadAll: 'Download alle assets',
    preparing: 'Bezig…',
    questions: 'Vragen? Neem contact op',
    toc: {
      guidelines: 'Posten',
      logo: 'Logo',
      colour: 'Kleur',
      type: 'Typografie',
      layout: 'Layout',
      photography: 'Fotografie',
      voice: 'Stem',
    },
    guidelines: {
      title: 'Wat u post, en hoe.',
      intro:
        'Deelt u Nivora via het affiliateprogramma? Hier leest u wat een goede post maakt, waar u het deelt, en met welke assets u bouwt.',
      postLabel: 'Wat u post',
      posts: [
        'Toon een echt probleem, en dan Box of Voice die het rustig oplost. Een oprecht moment wint van elke opsomming.',
        'Houd de toon kalm en eerlijk. Geen hype, geen aftelklokken, geen verzonnen cijfers of resultaten.',
        'Voeg altijd uw persoonlijke link toe, zodat elke aanmelding aan u gekoppeld wordt.',
        'Bouw met de assets hieronder. Gebruik het logo zoals het is, teken of herkleur het nooit.',
      ],
      whereLabel: 'Waar u post',
      whereIntro: 'Post waar uw mensen al zijn, of vertel het gewoon rechtstreeks.',
      platforms: ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'X', 'Facebook', 'Mond-op-mond'],
      assetsCta: 'Download de asset-bundel',
      affiliateCta: 'Terug naar het affiliateprogramma',
    },
    logo: {
      title: 'Het teken, en hoe u het gebruikt.',
      intro:
        'De pijl die door het woordmerk omhoogkomt is ons symbool van groei. Geef het ruimte, houd het monochroom, en teken het nooit opnieuw.',
      copyImage: 'Kopieer afbeelding',
      copied: 'Gekopieerd',
      downloadPng: 'Download PNG',
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
        'Gelaagde bijna-zwarten en een grijswaardenladder voor tekst. Kleur verschijnt alleen in kleine aardse accenten, rechtstreeks uit onze fotografie. Klik op een staal om de waarde te kopiëren.',
      copy: 'Kopieer',
      copied: 'Gekopieerd',
    },
    type: {
      title: 'Een serif die spreekt, een sans die werkt.',
      intro:
        'Hedvig Letters Serif draagt elke kop; Inter verzorgt het lezen en de interface; Geist Mono labelt de technische details. Dat is het hele systeem.',
      copyName: 'Kopieer naam',
      copied: 'Gekopieerd',
    },
    layout: {
      title: 'Zachte hoeken, haarlijnranden, kalme beweging.',
      intro:
        'Oppervlakken zijn omkaderd met witte haarlijnranden met lage opaciteit en consistent afgerond. Knoppen zijn volledige pills; cards ronden royaal af.',
      cornerRadius: 'Hoekafronding',
      buttons: 'Knoppen',
      primary: 'Primair',
      secondary: 'Secundair',
      ghost: 'Ghost',
      buttonNote:
        'Primair is de witte pill die vanaf de cursor zwart vult. Secundair is een donkere haarlijn-pill. Houd één primaire actie per scherm.',
      pillTag: 'Pill · rounded-full',
      cardTag: 'Card · rounded-2xl',
    },
    photography: {
      title: 'Eén landschap, op vele manieren geschoten.',
      intro:
        'Elk Nivora-beeld lijkt van dezelfde stille ochtend te komen. Volg de principes hieronder, en gebruik de prompts om nieuwe on-brand foto’s te genereren.',
      principlesLabel: 'De principes',
      promptsTitle: 'Beeldprompts',
      promptsIntro:
        'Plak deze in een beeldmodel (wij gebruiken Nano Banana Pro) en vervang de placeholders in hoofdletters. Ze houden elk nieuw beeld on-brand.',
      copyPrompt: 'Kopieer prompt',
      copied: 'Gekopieerd',
      downloadPhoto: 'Download foto',
    },
    voice: {
      do: 'Wel',
      dont: 'Niet',
    },
    closing: {
      title: 'Bouwt u iets met Nivora?',
      intro:
        'Pak de volledige asset-bundel, of laat het weten als u een formaat, kleur of logovariant nodig hebt die hier niet staat.',
      contact: 'Neem contact op',
    },
  },
} as const

export function MediaKit() {
  const { lang } = useLang()
  const t = COPY[lang]
  const colorGroups = getColorGroups(lang)
  const fonts = getFonts(lang)
  const logos = getLogos(lang)
  const radii = getRadii(lang)
  const photoGallery = getPhotoGallery(lang)
  const photoPrinciples = getPhotoPrinciples(lang)
  const photoPrompts = getPhotoPrompts(lang)
  const voice = getVoice(lang)
  const { copiedKey, flash } = useCopyFeedback()
  const [downloading, setDownloading] = useState(false)

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

  const TOC = [
    { id: 'guidelines', label: t.toc.guidelines },
    { id: 'logo', label: t.toc.logo },
    { id: 'colour', label: t.toc.colour },
    { id: 'type', label: t.toc.type },
    { id: 'layout', label: t.toc.layout },
    { id: 'photography', label: t.toc.photography },
    { id: 'voice', label: t.toc.voice },
  ]

  return (
    <main>
      {/* ── Header ── */}
      <header className="relative overflow-hidden">
        {/* Soft on-brand landscape, faded into the dark */}
        <div className="pointer-events-none absolute inset-0">
          <img src="/home/hero-nivora.webp" alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/85 to-bg" />
        </div>

        <div className="relative mx-auto w-full max-w-[1100px] px-6 pb-16 pt-36 text-center lg:pb-20 lg:pt-44">
          <Reveal mode="mount">
            <h1 className="mx-auto max-w-3xl font-serif text-[44px] leading-[1.04] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[72px] lg:leading-[1.02]">
              {t.headerTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-ink-soft/80">
              {t.headerIntro}
            </p>
          </Reveal>

          <Reveal mode="mount" delay={0.1}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" onClick={onDownloadAll} disabled={downloading}>
                <Download className="h-4 w-4" />
                {downloading ? t.preparing : t.downloadAll}
              </Button>
              <Button variant="dark" size="lg" asChild>
                <a href="/#contact">
                  {t.questions} <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </Reveal>

          {/* Table of contents — quiet jump links */}
          <Reveal mode="mount" delay={0.18}>
            <nav className="mt-12 flex flex-wrap justify-center gap-2.5 lg:gap-2">
              {TOC.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-white/[0.03] px-4 py-2.5 text-[13px] text-muted transition-colors hover:bg-white/[0.07] hover:text-ink lg:min-h-0 lg:py-2"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1200px] px-6">
        {/* ── Posting guidelines · for affiliates & partners ── */}
        <Section id="guidelines" title={t.guidelines.title} intro={t.guidelines.intro}>
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* What to post */}
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

            {/* Where to post + the assets */}
            <Reveal delay={0.06}>
              <Kader className="flex h-full flex-col p-6 lg:p-8">
                <MiniLabel>{t.guidelines.whereLabel}</MiniLabel>
                <p className="text-[14px] leading-relaxed text-faint">{t.guidelines.whereIntro}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {t.guidelines.platforms.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-[12.5px] text-ink-soft/80"
                    >
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

        {/* ── Logo ── */}
        <Section id="logo" title={t.logo.title} intro={t.logo.intro}>
          <div className="grid gap-6 sm:grid-cols-2">
            {logos.map((logo) => {
              const copyKey = `logo-copy-${logo.filename}`
              return (
                <Reveal key={logo.filename}>
                  <Kader className="flex h-full flex-col">
                    <div
                      className={cn(
                        'flex h-44 items-center justify-center px-8',
                        logo.surface === 'light'
                          ? 'bg-white'
                          : 'bg-[radial-gradient(ellipse_at_center,#141414,#080808)]',
                      )}
                    >
                      <img src={logo.src} alt={logo.name} className="max-h-16 w-auto max-w-[70%] object-contain" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[15px] font-semibold text-ink">{logo.name}</p>
                      <p className="mt-1 text-[13px] leading-snug text-faint">{logo.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
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

          {/* Misuse rules */}
          <Reveal>
            <Kader className="mt-6 p-6 lg:p-8">
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

        {/* ── Colour ── */}
        <Section id="colour" title={t.colour.title} intro={t.colour.intro}>
          <div className="flex flex-col gap-10">
            {colorGroups.map((group) => (
              <Reveal key={group.label}>
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-serif text-[20px] text-ink">{group.label}</h3>
                  <p className="max-w-md text-[13px] text-faint">{group.note}</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {group.swatches.map((s) => {
                    const key = `swatch-${s.token}`
                    const copied = copiedKey === key
                    return (
                      <button
                        key={s.token}
                        type="button"
                        onClick={() => onCopyText(key, s.value)}
                        className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-xl border border-line p-3 text-left transition-transform hover:-translate-y-0.5"
                        style={{ backgroundColor: s.value }}
                      >
                        <span
                          className={cn(
                            'flex items-center gap-1 text-[11px] font-medium transition-opacity',
                            s.text === 'dark' ? 'text-black/70' : 'text-white/80',
                            copied
                              ? 'opacity-100'
                              : 'opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100',
                          )}
                        >
                          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied ? t.colour.copied : t.colour.copy}
                        </span>
                        <span>
                          <span
                            className={cn(
                              'block text-[13px] font-semibold',
                              s.text === 'dark' ? 'text-black/85' : 'text-white',
                            )}
                          >
                            {s.name}
                          </span>
                          <span
                            className={cn(
                              'block font-mono text-[11px] uppercase',
                              s.text === 'dark' ? 'text-black/55' : 'text-white/55',
                            )}
                          >
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

        {/* ── Typography ── */}
        <Section id="type" title={t.type.title} intro={t.type.intro}>
          <div className="flex flex-col gap-4">
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
                    <p
                      className="mt-6 text-[28px] leading-tight text-ink-soft sm:text-[34px]"
                      style={{ fontFamily: font.family }}
                    >
                      {font.specimen}
                    </p>
                    <p className="mt-5 max-w-2xl text-[13px] leading-relaxed text-muted">{font.usage}</p>
                  </Kader>
                </Reveal>
              )
            })}
          </div>
        </Section>

        {/* ── Layout & components ── */}
        <Section id="layout" title={t.layout.title} intro={t.layout.intro}>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Radius scale */}
            <Reveal>
              <Kader className="h-full p-6 lg:p-8">
                <MiniLabel>{t.layout.cornerRadius}</MiniLabel>
                <div className="flex flex-wrap items-end gap-4">
                  {radii.map((r) => (
                    <div key={r.name} className="flex flex-col items-center gap-2">
                      <div
                        className="h-16 w-16 border border-line-strong bg-white/[0.05]"
                        style={{ borderRadius: r.px > 100 ? 9999 : r.px }}
                      />
                      <span className="font-mono text-[11px] text-muted">{r.name}</span>
                      <span className="text-[11px] text-muted lg:text-[10px] lg:text-dim">{r.usage}</span>
                    </div>
                  ))}
                </div>
              </Kader>
            </Reveal>

            {/* Buttons */}
            <Reveal delay={0.05}>
              <Kader className="h-full p-6 lg:p-8">
                <MiniLabel>{t.layout.buttons}</MiniLabel>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button>{t.layout.primary}</Button>
                    <Button variant="dark">{t.layout.secondary}</Button>
                    <Button variant="ghost">{t.layout.ghost}</Button>
                  </div>
                  <p className="text-[13px] leading-relaxed text-muted">{t.layout.buttonNote}</p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <span className="rounded-full border border-line bg-white/[0.04] px-3 py-1 text-[12px] text-muted">
                      {t.layout.pillTag}
                    </span>
                    <span className="rounded-2xl border border-line bg-white/[0.04] px-3 py-1.5 text-[12px] text-muted">
                      {t.layout.cardTag}
                    </span>
                  </div>
                </div>
              </Kader>
            </Reveal>
          </div>
        </Section>

        {/* ── Photography ── */}
        <Section id="photography" title={t.photography.title} intro={t.photography.intro}>
          {/* Principles */}
          <Reveal>
            <Kader className="p-6 lg:p-8">
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

          {/* Gallery */}
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {photoGallery.map((shot) => {
              const key = `shot-${shot.src}`
              return (
                <Reveal
                  key={shot.src}
                  className={cn(
                    shot.span === 'wide' && 'lg:col-span-2',
                    shot.span === 'tall' && 'lg:row-span-2',
                  )}
                >
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-line">
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      className="h-full min-h-44 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3">
                      <span className="text-[12px] text-ink-soft/90">{shot.caption}</span>
                      <button
                        type="button"
                        onClick={() => downloadAsset(shot.src)}
                        aria-label={t.photography.downloadPhoto}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-black/40 text-ink-soft backdrop-blur transition-colors hover:bg-black/70 hover:text-white lg:h-8 lg:w-8"
                      >
                        {copiedKey === key ? <Check className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Prompt formulas */}
          <Reveal>
            <h3 className="mt-14 text-center font-serif text-[26px] text-ink sm:text-[30px]">
              {t.photography.promptsTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-center text-[14px] leading-relaxed text-faint">
              {t.photography.promptsIntro}
            </p>
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

        {/* ── Voice ── */}
        <Section id="voice" title={voice.essence}>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <Kader className="h-full p-6 lg:p-8">
                <div className="mb-5 flex items-center gap-2 text-[15px] font-medium text-olive">
                  <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                  {t.voice.do}
                </div>
                <ul className="flex flex-col gap-3">
                  {voice.dos.map((d) => (
                    <li key={d} className="flex gap-2.5 text-[14px] leading-snug text-ink-soft/85">
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
                <ul className="flex flex-col gap-3">
                  {voice.donts.map((d) => (
                    <li key={d} className="flex gap-2.5 text-[14px] leading-snug text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Kader>
            </Reveal>
          </div>
        </Section>

        {/* ── Closing CTA ── */}
        <section className="py-14 text-center sm:py-20 lg:py-28">
          <SectionHeading title={t.closing.title} subtitle={t.closing.intro} />
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" onClick={onDownloadAll} disabled={downloading}>
                <Download className="h-4 w-4" />
                {downloading ? t.preparing : t.downloadAll}
              </Button>
              <Button variant="dark" size="lg" asChild>
                <a href="/#contact">{t.closing.contact}</a>
              </Button>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  )
}
