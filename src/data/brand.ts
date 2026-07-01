/**
 * Brand kit — the single source of truth for Nivora's visual identity.
 *
 * Everything the Media page renders (colours, type, logos, photo prompts,
 * downloadable assets) is described here so partners, affiliates and the team
 * always pull from one consistent place. Update a value once and the public
 * brand page updates with it.
 *
 * The page is bilingual (en/nl): each localizable export is a `Localized`
 * value with a small `get…(lang)` selector. Hex codes, tokens, file paths,
 * pixel values and other identifiers stay identical across both languages.
 */

import type { Lang, Localized } from '@/i18n'

/* ── Colours ── */
export type Swatch = {
  name: string
  token: string // CSS custom property / Tailwind token
  value: string // the literal hex / rgba
  text?: 'light' | 'dark' // which label colour reads on this swatch
}
export type SwatchGroup = {
  label: string
  note: string
  swatches: Swatch[]
}

const COLOR_GROUPS: Localized<SwatchGroup[]> = {
  en: [
    {
      label: 'Surfaces',
      note: 'Layered near-blacks. The deeper the surface, the further back it sits.',
      swatches: [
        { name: 'Background', token: '--color-bg', value: '#060606', text: 'light' },
        { name: 'Background soft', token: '--color-bg-soft', value: '#0a0a0a', text: 'light' },
        { name: 'Surface', token: '--color-surface', value: '#0f0f0f', text: 'light' },
        { name: 'Surface raised', token: '--color-surface-2', value: '#141414', text: 'light' },
      ],
    },
    {
      label: 'Text',
      note: 'A pure grayscale ladder. Contrast carries the hierarchy, never colour.',
      swatches: [
        { name: 'Ink', token: '--color-ink', value: '#f5f5f5', text: 'dark' },
        { name: 'Ink soft', token: '--color-ink-soft', value: '#e5e5e5', text: 'dark' },
        { name: 'Muted', token: '--color-muted', value: '#a1a1a1', text: 'dark' },
        { name: 'Faint', token: '--color-faint', value: '#737373', text: 'light' },
        { name: 'Dim', token: '--color-dim', value: '#525252', text: 'light' },
      ],
    },
    {
      label: 'Earth accents',
      note: 'Lifted straight from the landscape photography. Used sparingly: glows, dots, selection.',
      swatches: [
        { name: 'Gold', token: '--color-gold', value: '#bda96d', text: 'dark' },
        { name: 'Gold light', token: '--color-gold-light', value: '#d7cb94', text: 'dark' },
        { name: 'Olive', token: '--color-olive', value: '#96a766', text: 'dark' },
        { name: 'Terracotta', token: '--color-terracotta', value: '#d07a54', text: 'dark' },
        { name: 'Steel', token: '--color-steel', value: '#6691a3', text: 'dark' },
        { name: 'Brown', token: '--color-brown', value: '#7a6243', text: 'light' },
      ],
    },
    {
      label: 'Lines',
      note: 'Hairline borders are always white at very low opacity, never a solid grey.',
      swatches: [
        { name: 'Line', token: '--color-line', value: 'rgba(255,255,255,0.07)', text: 'light' },
        { name: 'Line strong', token: '--color-line-strong', value: 'rgba(255,255,255,0.12)', text: 'light' },
      ],
    },
  ],
  nl: [
    {
      label: 'Oppervlakken',
      note: 'Gelaagde bijna-zwarten. Hoe dieper het oppervlak, hoe verder het naar achteren ligt.',
      swatches: [
        { name: 'Achtergrond', token: '--color-bg', value: '#060606', text: 'light' },
        { name: 'Achtergrond zacht', token: '--color-bg-soft', value: '#0a0a0a', text: 'light' },
        { name: 'Oppervlak', token: '--color-surface', value: '#0f0f0f', text: 'light' },
        { name: 'Oppervlak verhoogd', token: '--color-surface-2', value: '#141414', text: 'light' },
      ],
    },
    {
      label: 'Tekst',
      note: 'Een zuivere grijswaardenladder. Contrast draagt de hiërarchie, nooit kleur.',
      swatches: [
        { name: 'Inkt', token: '--color-ink', value: '#f5f5f5', text: 'dark' },
        { name: 'Inkt zacht', token: '--color-ink-soft', value: '#e5e5e5', text: 'dark' },
        { name: 'Gedempt', token: '--color-muted', value: '#a1a1a1', text: 'dark' },
        { name: 'Vaag', token: '--color-faint', value: '#737373', text: 'light' },
        { name: 'Flauw', token: '--color-dim', value: '#525252', text: 'light' },
      ],
    },
    {
      label: 'Aardse accenten',
      note: 'Rechtstreeks uit de landschapsfotografie gehaald. Spaarzaam gebruikt: gloed, stippen, selectie.',
      swatches: [
        { name: 'Goud', token: '--color-gold', value: '#bda96d', text: 'dark' },
        { name: 'Goud licht', token: '--color-gold-light', value: '#d7cb94', text: 'dark' },
        { name: 'Olijf', token: '--color-olive', value: '#96a766', text: 'dark' },
        { name: 'Terracotta', token: '--color-terracotta', value: '#d07a54', text: 'dark' },
        { name: 'Staal', token: '--color-steel', value: '#6691a3', text: 'dark' },
        { name: 'Bruin', token: '--color-brown', value: '#7a6243', text: 'light' },
      ],
    },
    {
      label: 'Lijnen',
      note: 'Haarlijnranden zijn altijd wit met heel lage opaciteit, nooit een effen grijs.',
      swatches: [
        { name: 'Lijn', token: '--color-line', value: 'rgba(255,255,255,0.07)', text: 'light' },
        { name: 'Lijn sterk', token: '--color-line-strong', value: 'rgba(255,255,255,0.12)', text: 'light' },
      ],
    },
  ],
}

export const getColorGroups = (lang: Lang): SwatchGroup[] => COLOR_GROUPS[lang]

/* ── Typography ── */
export type FontSpec = {
  name: string
  token: string
  role: string
  usage: string
  specimen: string
  family: string // inline font-family for the live preview
  weights: string
}

const FONTS: Localized<FontSpec[]> = {
  en: [
    {
      name: 'Hedvig Letters Serif',
      token: '--font-serif',
      role: 'Display & headings',
      usage: 'Every headline, the giant wordmark, and the text set over photography.',
      specimen: 'Intelligent systems for ambitious companies.',
      family: '"Hedvig Letters Serif", serif',
      weights: 'Regular 400',
    },
    {
      name: 'Inter',
      token: '--font-sans',
      role: 'Body & interface',
      usage: 'Paragraphs, navigation, buttons, captions. The workhorse voice.',
      specimen: 'We build only what genuinely helps your business.',
      family: '"Inter", sans-serif',
      weights: 'Regular 400 · Medium 500 · Semibold 600',
    },
    {
      name: 'Geist Mono',
      token: '--font-mono',
      role: 'Labels & eyebrows',
      usage: 'Uppercase mono labels above sections and small technical tags.',
      specimen: 'BRAND & MEDIA KIT · 2026',
      family: '"Geist Mono", monospace',
      weights: 'Regular 400',
    },
  ],
  nl: [
    {
      name: 'Hedvig Letters Serif',
      token: '--font-serif',
      role: 'Display & koppen',
      usage: 'Elke kop, het reusachtige woordmerk, en de tekst die over fotografie ligt.',
      specimen: 'Intelligente systemen voor ambitieuze bedrijven.',
      family: '"Hedvig Letters Serif", serif',
      weights: 'Regular 400',
    },
    {
      name: 'Inter',
      token: '--font-sans',
      role: 'Tekst & interface',
      usage: 'Paragrafen, navigatie, knoppen, bijschriften. De werkpaardstem.',
      specimen: 'We bouwen alleen wat uw bedrijf echt vooruithelpt.',
      family: '"Inter", sans-serif',
      weights: 'Regular 400 · Medium 500 · Semibold 600',
    },
    {
      name: 'Geist Mono',
      token: '--font-mono',
      role: 'Labels & eyebrows',
      usage: 'Mono labels in hoofdletters boven secties en kleine technische tags.',
      specimen: 'BRAND & MEDIA KIT · 2026',
      family: '"Geist Mono", monospace',
      weights: 'Regular 400',
    },
  ],
}

export const getFonts = (lang: Lang): FontSpec[] => FONTS[lang]

/* ── Logos & marks ── */
export type LogoAsset = {
  name: string
  desc: string
  src: string
  surface: 'dark' | 'light'
  filename: string
}

const LOGOS: Localized<LogoAsset[]> = {
  en: [
    {
      name: 'Primary wordmark',
      desc: 'The full Nivora lockup, mark plus wordmark. The default everywhere.',
      src: '/brand/nivora-logo.png',
      surface: 'dark',
      filename: 'nivora-wordmark-light.png',
    },
    {
      name: 'Arrow mark, light',
      desc: 'The standalone growth mark for tight spaces, avatars and favicons.',
      src: '/brand/nivora-mark.webp',
      surface: 'dark',
      filename: 'nivora-mark-light.png',
    },
    {
      name: 'Arrow mark, dark',
      desc: 'The mark in black, for light backgrounds and printed material.',
      src: '/brand/nivora-mark-dark.webp',
      surface: 'light',
      filename: 'nivora-mark-dark.png',
    },
    {
      name: 'App icon',
      desc: 'Rounded app/touch icon for mobile, bookmarks and store listings.',
      src: '/brand/icon-app.webp',
      surface: 'dark',
      filename: 'nivora-app-icon.png',
    },
  ],
  nl: [
    {
      name: 'Primair woordmerk',
      desc: 'De volledige Nivora-lockup, merkteken plus woordmerk. Overal de standaard.',
      src: '/brand/nivora-logo.png',
      surface: 'dark',
      filename: 'nivora-wordmark-light.png',
    },
    {
      name: 'Pijlteken, licht',
      desc: 'Het losse groeiteken voor krappe ruimtes, avatars en favicons.',
      src: '/brand/nivora-mark.webp',
      surface: 'dark',
      filename: 'nivora-mark-light.png',
    },
    {
      name: 'Pijlteken, donker',
      desc: 'Het teken in zwart, voor lichte achtergronden en drukwerk.',
      src: '/brand/nivora-mark-dark.webp',
      surface: 'light',
      filename: 'nivora-mark-dark.png',
    },
    {
      name: 'App-icoon',
      desc: 'Afgerond app/touch-icoon voor mobiel, bladwijzers en store-vermeldingen.',
      src: '/brand/icon-app.webp',
      surface: 'dark',
      filename: 'nivora-app-icon.png',
    },
  ],
}

export const getLogos = (lang: Lang): LogoAsset[] => LOGOS[lang]

/* ── Corner radius scale ── */
export type RadiusToken = { name: string; value: string; usage: string; px: number }

const RADII: Localized<RadiusToken[]> = {
  en: [
    { name: 'lg', value: '0.5rem', px: 8, usage: 'Inputs, small chips' },
    { name: 'xl', value: '0.75rem', px: 12, usage: 'Menu rows, icon tiles' },
    { name: '2xl', value: '1rem', px: 16, usage: 'Cards, nav bar, panels' },
    { name: '3xl', value: '1.5rem', px: 24, usage: 'Blog covers, hero frames' },
    { name: 'full', value: '9999px', px: 9999, usage: 'Buttons & pills' },
  ],
  nl: [
    { name: 'lg', value: '0.5rem', px: 8, usage: 'Invoervelden, kleine chips' },
    { name: 'xl', value: '0.75rem', px: 12, usage: 'Menurijen, icoontegels' },
    { name: '2xl', value: '1rem', px: 16, usage: 'Cards, navigatiebalk, panelen' },
    { name: '3xl', value: '1.5rem', px: 24, usage: 'Blogcovers, hero-frames' },
    { name: 'full', value: '9999px', px: 9999, usage: 'Knoppen & pills' },
  ],
}

export const getRadii = (lang: Lang): RadiusToken[] => RADII[lang]

/* ── Photography & prompt formulas ── */
export type PhotoPrompt = {
  label: string
  use: string
  prompt: string
}

/** The visual rules every Nivora image follows — so any generated photo feels
 *  like it came from the same shoot. */
const PHOTO_PRINCIPLES: Localized<string[]> = {
  en: [
    'Cinematic, calm nature: misty mountains, rolling hills, open fields.',
    'Soft hazy light at the top, deep shadow fading to near-black at the bottom.',
    'Strong atmospheric depth of field; distant layers dissolve into fog.',
    'Muted earthy palette: sage & olive green, warm gold, slate blue-grey.',
    'Subtle fine film grain. Never glossy, never saturated, never busy.',
    'When text is added: one short line, centered, in white Hedvig serif.',
  ],
  nl: [
    'Cinematische, kalme natuur: mistige bergen, glooiende heuvels, open velden.',
    'Zacht heiig licht bovenaan, diepe schaduw die onderaan naar bijna-zwart vervaagt.',
    'Sterke atmosferische scherptediepte; verre lagen lossen op in mist.',
    'Gedempt aards palet: salie- en olijfgroen, warm goud, leiblauw-grijs.',
    'Subtiele fijne filmkorrel. Nooit glanzend, nooit verzadigd, nooit druk.',
    'Bij toegevoegde tekst: één korte regel, gecentreerd, in witte Hedvig-serif.',
  ],
}

export const getPhotoPrinciples = (lang: Lang): string[] => PHOTO_PRINCIPLES[lang]

/** On-brand reference shots already in use across the site — the gallery shows
 *  partners exactly what "a Nivora photo" looks like, and each is downloadable. */
export type GalleryShot = { src: string; caption: string; span?: 'wide' | 'tall' }

const PHOTO_GALLERY: Localized<GalleryShot[]> = {
  en: [
    { src: '/home/hero-nivora.webp', caption: 'Hero, misty ridges at dawn', span: 'wide' },
    { src: '/affiliate/grass.webp', caption: 'Wind through tall grass' },
    { src: '/affiliate/hero-hills.webp', caption: 'Rolling hills at first light' },
    { src: '/brand/landscape-ridges.webp', caption: 'Open ridges, generous sky' },
    { src: '/home/cta-landscape.webp', caption: 'Lone subject, deep green field' },
    { src: '/home/IMG_0743.webp', caption: 'Aerial field texture', span: 'tall' },
  ],
  nl: [
    { src: '/home/hero-nivora.webp', caption: 'Hero, mistige bergkammen bij dageraad', span: 'wide' },
    { src: '/affiliate/grass.webp', caption: 'Wind door het hoge gras' },
    { src: '/affiliate/hero-hills.webp', caption: 'Glooiende heuvels bij het eerste licht' },
    { src: '/brand/landscape-ridges.webp', caption: 'Open bergkammen, ruime lucht' },
    { src: '/home/cta-landscape.webp', caption: 'Eenzaam onderwerp, diepgroen veld' },
    { src: '/home/IMG_0743.webp', caption: 'Veldtextuur van bovenaf', span: 'tall' },
  ],
}

export const getPhotoGallery = (lang: Lang): GalleryShot[] => PHOTO_GALLERY[lang]

const PHOTO_PROMPTS: Localized<PhotoPrompt[]> = {
  en: [
    {
      label: 'Hero / background',
      use: 'Full-bleed section backgrounds and landing heroes.',
      prompt:
        'Cinematic fine-art landscape photograph at dawn: layered rolling green mountain ridges receding into soft morning mist. The upper third is a calm hazy pale blue-grey sky with vast negative space. Strong aerial depth of field, distant ridges dissolving into fog. Low warm golden side-light grazing sage-green slopes; foreground falls into deep shadow and the bottom edge sinks to near-black. Muted earthy palette, subtle fine film grain, painterly, editorial, no people, no buildings, no text.',
    },
    {
      label: 'Blog cover (with label)',
      use: 'Article covers and social cards with a short headline.',
      prompt:
        'Moody cinematic nature photograph, soft atmospheric haze and shallow depth of field, muted sage and gold earth tones, fine film grain, dark vignette. Centered on the image, one short line of large white Hedvig Letters serif text reading "YOUR LABEL". Calm, editorial, minimal. No other text, no logos, no people.',
    },
    {
      label: 'Square ad',
      use: 'Instagram / paid social with stacked copy.',
      prompt:
        'Square cinematic landscape photograph, foggy rolling hills at golden hour, muted earthy palette, fine film grain, deep shadows toward the edges for text legibility. Three centered lines of clean white Hedvig serif text reading "LINE ONE" / "LINE TWO" / "LINE THREE". Spell every word correctly. Serene, premium, minimal. No logos, no people.',
    },
  ],
  nl: [
    {
      label: 'Hero / achtergrond',
      use: 'Volvlakse sectie-achtergronden en landingshero’s.',
      prompt:
        'Cinematic fine-art landscape photograph at dawn: layered rolling green mountain ridges receding into soft morning mist. The upper third is a calm hazy pale blue-grey sky with vast negative space. Strong aerial depth of field, distant ridges dissolving into fog. Low warm golden side-light grazing sage-green slopes; foreground falls into deep shadow and the bottom edge sinks to near-black. Muted earthy palette, subtle fine film grain, painterly, editorial, no people, no buildings, no text.',
    },
    {
      label: 'Blogcover (met label)',
      use: 'Artikelcovers en social cards met een korte kop.',
      prompt:
        'Moody cinematic nature photograph, soft atmospheric haze and shallow depth of field, muted sage and gold earth tones, fine film grain, dark vignette. Centered on the image, one short line of large white Hedvig Letters serif text reading "YOUR LABEL". Calm, editorial, minimal. No other text, no logos, no people.',
    },
    {
      label: 'Vierkante advertentie',
      use: 'Instagram / betaalde social met gestapelde tekst.',
      prompt:
        'Square cinematic landscape photograph, foggy rolling hills at golden hour, muted earthy palette, fine film grain, deep shadows toward the edges for text legibility. Three centered lines of clean white Hedvig serif text reading "LINE ONE" / "LINE TWO" / "LINE THREE". Spell every word correctly. Serene, premium, minimal. No logos, no people.',
    },
  ],
}

export const getPhotoPrompts = (lang: Lang): PhotoPrompt[] => PHOTO_PROMPTS[lang]

/* ── Downloadable asset bundle (used by "Download all") ── */
export const ALL_ASSETS: string[] = [
  '/brand/nivora-logo.png',
  '/brand/nivora-mark.webp',
  '/brand/nivora-mark-dark.webp',
  '/brand/icon-app.webp',
  '/favicon.png',
]

/* ── Brand voice ── */
export type Voice = { essence: string; dos: string[]; donts: string[] }

const VOICE: Localized<Voice> = {
  en: {
    essence: 'Calm confidence. We say less, and mean it.',
    dos: [
      'Speak plainly: short sentences, concrete nouns.',
      'Lead with the value, not the technology.',
      'Be honest about what AI should and should not do.',
      'Keep restraint: white space, few words, one idea per screen.',
    ],
    donts: [
      'No hype words: "revolutionary", "game-changing", "cutting-edge".',
      'No bright, saturated colour or neon gradients.',
      'No stock-photo people pointing at screens.',
      'Never stretch, recolour or add effects to the logo.',
    ],
  },
  nl: {
    essence: 'Kalme zelfverzekerdheid. We zeggen minder, en menen het.',
    dos: [
      'Praat helder: korte zinnen, concrete woorden.',
      'Begin met de waarde, niet met de technologie.',
      'Wees eerlijk over wat AI wel en niet zou moeten doen.',
      'Houd het sober: witruimte, weinig woorden, één idee per scherm.',
    ],
    donts: [
      'Geen holle woorden: "revolutionair", "baanbrekend", "cutting-edge".',
      'Geen felle, verzadigde kleuren of neon-gradiënten.',
      'Geen stockfoto’s van mensen die naar schermen wijzen.',
      'Het logo nooit uitrekken, herkleuren of er effecten aan toevoegen.',
    ],
  },
}

export const getVoice = (lang: Lang): Voice => VOICE[lang]
