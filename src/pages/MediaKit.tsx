import { useState, type ReactNode } from 'react'
import { Check, Copy, Download, ImageDown, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import {
  copyText,
  copyImage,
  downloadAsset,
  downloadAll,
  useCopyFeedback,
} from '@/lib/clipboard'
import {
  COLOR_GROUPS,
  FONTS,
  LOGOS,
  RADII,
  PHOTO_GALLERY,
  PHOTO_PRINCIPLES,
  PHOTO_PROMPTS,
  ALL_ASSETS,
  VOICE,
} from '@/data/brand'

/* ── Section frame: mono eyebrow + serif title, anchored for the TOC ── */
function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string
  index: string
  eyebrow: string
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-20 lg:py-28">
      <Reveal>
        <div className="flex items-baseline gap-3">
          <span className="label-mono text-dim">{index}</span>
          <span className="label-mono">{eyebrow}</span>
        </div>
        <h2 className="mt-5 max-w-2xl font-serif text-[32px] leading-[1.12] tracking-[-0.02em] text-ink sm:text-[40px]">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-faint">{intro}</p>}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  )
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
        'inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-3 text-[12px] font-medium transition-colors',
        active ? 'bg-olive/15 text-olive' : 'bg-white/[0.03] text-muted hover:bg-white/[0.07] hover:text-ink',
      )}
    >
      {active ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
      {active ? done : idle}
    </button>
  )
}

export function MediaKit() {
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
    { id: 'logo', label: 'Logo' },
    { id: 'colour', label: 'Colour' },
    { id: 'type', label: 'Typography' },
    { id: 'layout', label: 'Layout' },
    { id: 'photography', label: 'Photography' },
    { id: 'voice', label: 'Voice' },
  ]

  return (
    <main>
      {/* ── Header ── */}
      <header className="relative overflow-hidden">
        {/* Soft on-brand landscape, faded into the dark */}
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/home/hero-nivora.webp"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/85 to-bg" />
        </div>

        <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-16 pt-36 lg:pb-20 lg:pt-44">
          <Reveal mode="mount">
            <span className="label-mono">Brand &amp; Media Kit</span>
            <h1 className="mt-5 max-w-3xl font-serif text-[44px] leading-[1.04] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[72px] lg:leading-[1.02]">
              The Nivora brand kit
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-soft/80">
              Everything you need to represent Nivora correctly — logos, colours,
              type, photography and the prompts behind our images. Built for
              partners, affiliates and the press. Copy or download anything with
              one click.
            </p>
          </Reveal>

          <Reveal mode="mount" delay={0.1}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={onDownloadAll} disabled={downloading}>
                <Download className="h-4 w-4" />
                {downloading ? 'Preparing…' : 'Download all assets'}
              </Button>
              <Button variant="dark" size="lg" asChild>
                <a href="#contact">
                  Questions? Get in touch <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </Reveal>

          {/* Table of contents */}
          <Reveal mode="mount" delay={0.18}>
            <nav className="mt-12 flex flex-wrap gap-2">
              {TOC.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[13px] text-muted transition-colors hover:bg-white/[0.07] hover:text-ink"
                >
                  {t.label}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1200px] px-6">
        {/* ── 1 · Logo ── */}
        <Section
          id="logo"
          index="01"
          eyebrow="Logo & mark"
          title="The mark, and how to use it."
          intro="The arrow rising through the wordmark is our symbol of growth. Give it room, keep it monochrome, and never redraw it."
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {LOGOS.map((logo) => {
              const copyKey = `logo-copy-${logo.filename}`
              return (
                <Reveal key={logo.filename}>
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white/[0.02]">
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
                          idle="Copy image"
                          done="Copied"
                          icon={ImageDown}
                        />
                        <ActionButton
                          active={false}
                          onClick={() => downloadAsset(logo.src, logo.filename)}
                          idle="Download PNG"
                          done="Download PNG"
                          icon={Download}
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Misuse rules */}
          <Reveal>
            <div className="mt-6 grid gap-3 rounded-2xl border border-line bg-white/[0.02] p-6 sm:grid-cols-2">
              {[
                'Keep clear space around the mark equal to the height of the arrow.',
                'Use white on dark, black on light — nothing in between.',
                'Don’t recolour, rotate, stretch, or add shadows and outlines.',
                'Don’t place the logo on a busy area of a photo — find calm space.',
              ].map((rule) => (
                <p key={rule} className="flex gap-2.5 text-[13px] leading-snug text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                  {rule}
                </p>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ── 2 · Colour ── */}
        <Section
          id="colour"
          index="02"
          eyebrow="Colour"
          title="Near-black, with earth from the landscape."
          intro="The interface is built from layered near-blacks and a grayscale text ladder. Colour appears only in small earthy accents, pulled straight from our photography. Click any swatch to copy its value."
        >
          <div className="flex flex-col gap-10">
            {COLOR_GROUPS.map((group) => (
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
                            copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                          )}
                        >
                          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied ? 'Copied' : 'Copy'}
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

        {/* ── 3 · Typography ── */}
        <Section
          id="type"
          index="03"
          eyebrow="Typography"
          title="A serif that speaks, a sans that works."
          intro="Hedvig Letters Serif carries every headline; Inter handles the reading and the interface; Geist Mono labels things. That is the whole system."
        >
          <div className="flex flex-col gap-4">
            {FONTS.map((font) => {
              const key = `font-${font.name}`
              return (
                <Reveal key={font.name}>
                  <div className="rounded-2xl border border-line bg-white/[0.02] p-6 lg:p-8">
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
                        idle="Copy name"
                        done="Copied"
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
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Section>

        {/* ── 4 · Layout & components ── */}
        <Section
          id="layout"
          index="04"
          eyebrow="Layout & components"
          title="Soft corners, hairline borders, calm motion."
          intro="Surfaces are framed with white hairline borders at low opacity and rounded consistently. Buttons are full pills; cards round generously."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Radius scale */}
            <Reveal>
              <div className="h-full rounded-2xl border border-line bg-white/[0.02] p-6">
                <p className="label-mono mb-5">Corner radius</p>
                <div className="flex flex-wrap items-end gap-4">
                  {RADII.map((r) => (
                    <div key={r.name} className="flex flex-col items-center gap-2">
                      <div
                        className="h-16 w-16 border border-line-strong bg-white/[0.05]"
                        style={{ borderRadius: r.px > 100 ? 9999 : r.px }}
                      />
                      <span className="font-mono text-[11px] text-muted">{r.name}</span>
                      <span className="text-[10px] text-dim">{r.usage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Buttons */}
            <Reveal delay={0.05}>
              <div className="h-full rounded-2xl border border-line bg-white/[0.02] p-6">
                <p className="label-mono mb-5">Buttons</p>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button>Primary</Button>
                    <Button variant="dark">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                  <p className="text-[13px] leading-relaxed text-muted">
                    Primary is the white pill that fills black from the cursor.
                    Secondary is a hairline dark pill. Both are fully rounded with
                    a 200&nbsp;ms ease. Keep one primary action per view.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <span className="rounded-full border border-line bg-white/[0.04] px-3 py-1 text-[12px] text-muted">
                      Pill · rounded-full
                    </span>
                    <span className="rounded-2xl border border-line bg-white/[0.04] px-3 py-1.5 text-[12px] text-muted">
                      Card · rounded-2xl
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ── 5 · Photography ── */}
        <Section
          id="photography"
          index="05"
          eyebrow="Photography & image prompts"
          title="One landscape, shot many ways."
          intro="Every Nivora image looks like it came from the same quiet morning. Follow the principles below, and use the prompts to generate new on-brand photos for blogs and ads — text included."
        >
          {/* Principles */}
          <Reveal>
            <div className="grid gap-3 rounded-2xl border border-line bg-white/[0.02] p-6 sm:grid-cols-2">
              {PHOTO_PRINCIPLES.map((p) => (
                <p key={p} className="flex gap-2.5 text-[13px] leading-snug text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Gallery */}
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {PHOTO_GALLERY.map((shot) => {
              const key = `shot-${shot.src}`
              return (
                <Reveal
                  key={shot.src}
                  className={cn(
                    shot.span === 'wide' && 'col-span-2',
                    shot.span === 'tall' && 'row-span-2',
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
                        aria-label="Download photo"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-black/40 text-ink-soft backdrop-blur transition-colors hover:bg-black/70 hover:text-white"
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
            <h3 className="mt-14 font-serif text-[22px] text-ink">Image prompts</h3>
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-faint">
              Paste these into an image model (we use Nano Banana Pro) and swap the
              capitalised placeholders. They keep every new image on-brand.
            </p>
          </Reveal>
          <div className="mt-6 flex flex-col gap-4">
            {PHOTO_PROMPTS.map((p) => {
              const key = `prompt-${p.label}`
              return (
                <Reveal key={p.label}>
                  <div className="rounded-2xl border border-line bg-white/[0.02] p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-[15px] font-semibold text-ink">{p.label}</p>
                        <p className="mt-1 text-[13px] text-faint">{p.use}</p>
                      </div>
                      <ActionButton
                        active={copiedKey === key}
                        onClick={() => onCopyText(key, p.prompt)}
                        idle="Copy prompt"
                        done="Copied"
                        icon={Copy}
                      />
                    </div>
                    <p className="mt-4 rounded-xl border border-line bg-black/40 p-4 font-mono text-[12.5px] leading-relaxed text-muted">
                      {p.prompt}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Section>

        {/* ── 6 · Voice ── */}
        <Section
          id="voice"
          index="06"
          eyebrow="Voice & tone"
          title={VOICE.essence}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-line bg-white/[0.02] p-6">
                <p className="label-mono mb-5 text-olive">Do</p>
                <ul className="flex flex-col gap-3">
                  {VOICE.dos.map((d) => (
                    <li key={d} className="flex gap-2.5 text-[14px] leading-snug text-ink-soft/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="h-full rounded-2xl border border-line bg-white/[0.02] p-6">
                <p className="label-mono mb-5 text-terracotta">Don’t</p>
                <ul className="flex flex-col gap-3">
                  {VOICE.donts.map((d) => (
                    <li key={d} className="flex gap-2.5 text-[14px] leading-snug text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ── Closing CTA ── */}
        <section className="border-t border-line py-20 text-center lg:py-28">
          <Reveal>
            <h2 className="mx-auto max-w-xl font-serif text-[30px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[40px]">
              Building something with Nivora?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-faint">
              Grab the full asset bundle, or reach out if you need a format,
              colour, or logo variant that isn’t here.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" onClick={onDownloadAll} disabled={downloading}>
                <Download className="h-4 w-4" />
                {downloading ? 'Preparing…' : 'Download all assets'}
              </Button>
              <Button variant="dark" size="lg" asChild>
                <a href="/#contact">Contact us</a>
              </Button>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  )
}
