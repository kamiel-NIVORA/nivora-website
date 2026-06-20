/**
 * Brand kit — the single source of truth for Nivora's visual identity.
 *
 * Everything the Media page renders (colours, type, logos, photo prompts,
 * downloadable assets) is described here so partners, affiliates and the team
 * always pull from one consistent place. Update a value once and the public
 * brand page updates with it.
 */

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

export const COLOR_GROUPS: SwatchGroup[] = [
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
    note: 'A pure grayscale ladder — contrast carries the hierarchy, never colour.',
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
    note: 'Lifted straight from the landscape photography. Used sparingly — glows, dots, selection.',
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
]

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

export const FONTS: FontSpec[] = [
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
    usage: 'Paragraphs, navigation, buttons, captions — the workhorse voice.',
    specimen: 'We build only what genuinely helps your business.',
    family: '"Inter", sans-serif',
    weights: 'Regular 400 · Medium 500 · Semibold 600',
  },
  {
    name: 'Geist Mono',
    token: '--font-mono',
    role: 'Labels & eyebrows',
    usage: 'Uppercase mono labels above sections and small technical tags.',
    specimen: 'BRAND & MEDIA KIT — 2026',
    family: '"Geist Mono", monospace',
    weights: 'Regular 400',
  },
]

/* ── Logos & marks ── */
export type LogoAsset = {
  name: string
  desc: string
  src: string
  surface: 'dark' | 'light'
  filename: string
}

export const LOGOS: LogoAsset[] = [
  {
    name: 'Primary wordmark',
    desc: 'The full Nivora lockup — mark plus wordmark. The default everywhere.',
    src: '/nivora-logo.png',
    surface: 'dark',
    filename: 'nivora-wordmark-light.png',
  },
  {
    name: 'Arrow mark — light',
    desc: 'The standalone growth mark for tight spaces, avatars and favicons.',
    src: '/nivora-mark.png',
    surface: 'dark',
    filename: 'nivora-mark-light.png',
  },
  {
    name: 'Arrow mark — dark',
    desc: 'The mark in black, for light backgrounds and printed material.',
    src: '/nivora-mark-dark.png',
    surface: 'light',
    filename: 'nivora-mark-dark.png',
  },
  {
    name: 'App icon',
    desc: 'Rounded app/touch icon for mobile, bookmarks and store listings.',
    src: '/icon-app.png',
    surface: 'dark',
    filename: 'nivora-app-icon.png',
  },
]

/* ── Corner radius scale ── */
export type RadiusToken = { name: string; value: string; usage: string; px: number }

export const RADII: RadiusToken[] = [
  { name: 'lg', value: '0.5rem', px: 8, usage: 'Inputs, small chips' },
  { name: 'xl', value: '0.75rem', px: 12, usage: 'Menu rows, icon tiles' },
  { name: '2xl', value: '1rem', px: 16, usage: 'Cards, nav bar, panels' },
  { name: '3xl', value: '1.5rem', px: 24, usage: 'Blog covers, hero frames' },
  { name: 'full', value: '9999px', px: 9999, usage: 'Buttons & pills' },
]

/* ── Photography & prompt formulas ── */
export type PhotoPrompt = {
  label: string
  use: string
  prompt: string
}

/** The visual rules every Nivora image follows — so any generated photo feels
 *  like it came from the same shoot. */
export const PHOTO_PRINCIPLES = [
  'Cinematic, calm nature — misty mountains, rolling hills, open fields.',
  'Soft hazy light at the top, deep shadow fading to near-black at the bottom.',
  'Strong atmospheric depth of field; distant layers dissolve into fog.',
  'Muted earthy palette: sage & olive green, warm gold, slate blue-grey.',
  'Subtle fine film grain. Never glossy, never saturated, never busy.',
  'When text is added: one short line, centered, in white Hedvig serif.',
]

/** On-brand reference shots already in use across the site — the gallery shows
 *  partners exactly what "a Nivora photo" looks like, and each is downloadable. */
export type GalleryShot = { src: string; caption: string; span?: 'wide' | 'tall' }

export const PHOTO_GALLERY: GalleryShot[] = [
  { src: '/images/hero-nivora.png', caption: 'Hero — misty ridges at dawn', span: 'wide' },
  { src: '/images/2S9MZkkrhQhX1BXE7eQesdMNEk.jpg', caption: 'Cover — labelled "24M"' },
  { src: '/images/89dxBkhlY82YRVjvzzxceldnL0.jpg', caption: 'Cover — labelled "REPORT #127"' },
  { src: '/images/landscape-ridges.png', caption: 'Open ridges, generous sky' },
  { src: '/cta-landscape.jpg', caption: 'Lone subject, deep green field' },
  { src: '/IMG_0743.jpg', caption: 'Aerial field texture', span: 'tall' },
]

export const PHOTO_PROMPTS: PhotoPrompt[] = [
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
]

/* ── Downloadable asset bundle (used by "Download all") ── */
export const ALL_ASSETS: string[] = [
  '/nivora-logo.png',
  '/nivora-mark.png',
  '/nivora-mark-dark.png',
  '/icon-app.png',
  '/favicon.png',
]

/* ── Brand voice ── */
export const VOICE = {
  essence: 'Calm confidence. We say less, and mean it.',
  dos: [
    'Speak plainly — short sentences, concrete nouns.',
    'Lead with the value, not the technology.',
    'Be honest about what AI should and should not do.',
    'Keep restraint: white space, few words, one idea per screen.',
  ],
  donts: [
    'No hype words — “revolutionary”, “game-changing”, “cutting-edge”.',
    'No bright, saturated colour or neon gradients.',
    'No stock-photo people pointing at screens.',
    'Never stretch, recolour or add effects to the logo.',
  ],
}
