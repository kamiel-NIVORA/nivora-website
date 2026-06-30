/**
 * Ambient sea inside the waitlist card. Three translucent wave bands drift
 * sideways at different speeds (parallax) and rise from the bottom edge, with a
 * faint crest of light on the front swell, like a calm horizon catching the
 * last light. Pure SVG + CSS keyframes (`seaDrift`), no canvas, no deps.
 *
 * Each band is drawn twice across a tile that is 2× the viewBox width and
 * animated translateX 0 → -50%, so the loop is seamless. Reduced-motion users
 * get the still frame for free: `motion-reduce:animate-none` parks each band at
 * a valid, seamless position.
 *
 * Render absolutely-positioned inside a relative parent; size with className.
 */

const VBW = 1200
const VBH = 360
const STEP = 10

/** Smooth wave across two tiles; `close` grounds it to a filled band. */
function wave(cycles: number, amp: number, baseFrac: number, phase: number, close: boolean): string {
  const base = VBH * baseFrac
  const L = VBW / cycles // integer cycles per tile ⇒ y(x) === y(x + VBW), loop is seamless
  const y = (x: number) => base + amp * Math.sin((2 * Math.PI * x) / L + phase)
  let d = `M 0 ${y(0).toFixed(2)}`
  for (let x = STEP; x <= 2 * VBW; x += STEP) d += ` L ${x} ${y(x).toFixed(2)}`
  return close ? `${d} L ${2 * VBW} ${VBH} L 0 ${VBH} Z` : d
}

// A calm horizon low in the card: back = faint small ripples, front = the slow
// swell that catches the light. Baselines sit in the bottom quarter so the
// water never reaches the input or the hint above it.
const BANDS = [
  { d: wave(4, 7, 0.76, 0, true), dur: '30s', top: '#6691a3', topA: 0.14, bot: '#3a5360', botA: 0.05 },
  { d: wave(3, 11, 0.84, 1.2, true), dur: '22s', top: '#7aa1ad', topA: 0.18, bot: '#2f4954', botA: 0.1 },
  { d: wave(2, 15, 0.92, 0.5, true), dur: '34s', top: '#8fae9a', topA: 0.24, bot: '#243a40', botA: 0.3 },
]
const FRONT_CREST = wave(2, 15, 0.92, 0.5, false)

export function SeaWaves({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`overflow-hidden ${className ?? ''}`}>
      {/* light pooling on the water, low and central */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(80%_120%_at_50%_100%,rgba(102,145,163,0.16),transparent_72%)]" />

      {/* the bands fade up into the glass so the form above stays crisp */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_top,black_34%,transparent_70%)]">
        {BANDS.map((w, i) => (
          <svg
            key={i}
            viewBox={`0 0 ${2 * VBW} ${VBH}`}
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-full w-[200%] animate-[seaDrift_var(--dur)_linear_infinite] motion-reduce:animate-none"
            style={{ ['--dur' as string]: w.dur }}
          >
            <defs>
              <linearGradient id={`sw-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={w.top} stopOpacity={w.topA} />
                <stop offset="1" stopColor={w.bot} stopOpacity={w.botA} />
              </linearGradient>
            </defs>
            <path d={w.d} fill={`url(#sw-${i})`} />
          </svg>
        ))}

        {/* crest of light riding the front swell (shares the front band's speed) */}
        <svg
          viewBox={`0 0 ${2 * VBW} ${VBH}`}
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-full w-[200%] animate-[seaDrift_34s_linear_infinite] motion-reduce:animate-none"
        >
          <path
            d={FRONT_CREST}
            fill="none"
            stroke="rgba(206,222,228,0.42)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
            style={{ filter: 'drop-shadow(0 0 5px rgba(160,196,208,0.4))' }}
          />
        </svg>
      </div>
    </div>
  )
}
