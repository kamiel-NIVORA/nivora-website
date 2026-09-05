/**
 * Automatische taalkeuze op basis van LAND (geo) + browsertaal, voor de
 * URL-gebaseerde i18n (Engels op `/`, Nederlands onder `/nl`, zie src/i18n.tsx).
 *
 * Het probleem: een bezoeker in Belgie/Nederland/Luxemburg die de site opent op
 * `/` (bv. door "nivoraworks.com" te typen) kreeg altijd Engels, ook al is er een
 * Nederlandse versie. Deze Edge Middleware stuurt zo'n bezoeker automatisch door
 * naar de Nederlandse `/nl`-variant.
 *
 * Beslissing per navigatie-request (alleen documenten):
 *   1. Pad staat al onder /nl        -> niets doen (al Nederlands).
 *   2. Cookie `nivora.lang` gezet     -> die keuze respecteren (handmatige toggle
 *                                        op de site zet deze cookie).
 *   3. Geen cookie (eerste bezoek)    -> land in {BE,NL,LU} of Nederlandse browser
 *                                        -> redirect naar /nl, anders Engels laten.
 *
 * Geen dependency nodig: het land komt uit de door Vercel gezette header
 * `x-vercel-ip-country`. Zonder Response gaat het request gewoon door.
 */

export const config = {
  // Alleen documenten: sla de api-routes, /assets en bestanden-met-extensie over.
  matcher: ['/((?!api/|assets/|.*\\.).*)'],
}

const DUTCH_COUNTRIES = new Set(['BE', 'NL', 'LU'])

function cookieValue(request: Request, name: string): string | null {
  const raw = request.headers.get('cookie') || ''
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const m = raw.match(new RegExp('(?:^|;\\s*)' + escaped + '=([^;]*)'))
  return m ? decodeURIComponent(m[1]) : null
}

function prefersDutch(request: Request): boolean {
  const country = (request.headers.get('x-vercel-ip-country') || '').toUpperCase()
  if (country && DUTCH_COUNTRIES.has(country)) return true
  const accept = (request.headers.get('accept-language') || '').toLowerCase()
  // "nl" als losstaande taalcode (nl, nl-BE, nl-NL), niet toevallig in een woord.
  return /(^|[,;\s])nl\b/.test(accept)
}

export default function middleware(request: Request) {
  const url = new URL(request.url)
  const path = url.pathname

  // Al Nederlands: niets doen.
  if (path === '/nl' || path.startsWith('/nl/')) return

  // Bepaal de gewenste taal.
  const choice = cookieValue(request, 'nivora.lang')
  let wantNl: boolean
  if (choice === 'nl') wantNl = true
  else if (choice === 'en') wantNl = false
  else wantNl = prefersDutch(request)

  if (!wantNl) return // Engels: het Engelse pad zo laten.

  // Doorsturen naar de Nederlandse variant, met query + hash behouden.
  url.pathname = path === '/' ? '/nl' : `/nl${path}`
  return Response.redirect(url.toString(), 307)
}
