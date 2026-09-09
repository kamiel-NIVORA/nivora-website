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
 *   1. Zoekmachine of AI-crawler      -> niets doen (zie CRAWLER hieronder).
 *   2. Pad staat al onder /nl         -> niets doen (al Nederlands).
 *   3. Cookie `nivora.lang` gezet      -> die keuze respecteren (handmatige toggle
 *                                        op de site zet deze cookie).
 *   4. Geen cookie (eerste bezoek)     -> land in {BE,NL,LU} of Nederlandse browser
 *                                        -> redirect naar /nl, anders Engels laten.
 *
 * VOETANGEL, en de reden dat dit bestand de sluglijst inleest: de programmatische
 * landingspagina's hebben PER TAAL EEN ANDERE SLUG. `/ai-automation-estate-agency`
 * heet in het Nederlands `/nl/ai-automatisering-immokantoor`. Deze middleware
 * plakte er vroeger blind `/nl` voor, en stuurde iedere Vlaamse bezoeker dus naar
 * `/nl/ai-automation-estate-agency`, een pad dat niet bestaat. Alle negen
 * sector- en alle acht oplossingspagina's gaven daardoor een 404 voor precies het
 * publiek waarvoor ze geschreven zijn, terwijl ze in sitemap.xml stonden en de
 * hreflang- en x-default-annotatie van de Nederlandse pagina's ernaar wees.
 * Vertalen dus, niet prefixen. De tabel komt uit dezelfde bron als de rest van de
 * site (src/data/landing/slugs.ts), zodat een nieuwe landingspagina hier nooit
 * apart hoeft te worden bijgehouden.
 *
 * Geen dependency nodig: het land komt uit de door Vercel gezette header
 * `x-vercel-ip-country`. Zonder Response gaat het request gewoon door.
 */
import { LANDING_ENTRIES } from './src/data/landing/slugs'
import { RETIRED_PATHS } from './src/data/landing/retired'

export const config = {
  // Alleen documenten: sla de api-routes, /assets en bestanden-met-extensie over.
  matcher: ['/((?!api/|assets/|.*\\.).*)'],
}

const DUTCH_COUNTRIES = new Set(['BE', 'NL', 'LU'])

/* Engelse basispaden naar hun Nederlandse spelling, en omgekeerd. Alleen de
   landingspagina's staan hierin; elke andere route (/about, /services/:slug,
   /blog, ...) deelt één pad in beide talen en blijft dus ongewijzigd. */
const EN_TO_NL = new Map<string, string>()
const NL_AT_ROOT = new Map<string, string>()
for (const entry of LANDING_ENTRIES) {
  const en: string = entry.slugs.en
  const nl: string = entry.slugs.nl
  if (en === nl) continue
  EN_TO_NL.set(`/${en}`, `/${nl}`)
  NL_AT_ROOT.set(`/${nl}`, `/${nl}`)
}

/* Zoekmachines en AI-antwoordmachines krijgen de pagina die ze opvragen, niet de
   pagina die bij hun IP-land hoort. Google raadt automatische taalredirects af
   juist omdat een crawler dan nooit alle taalversies te zien krijgt, en dat is
   precies wat hreflang moet kunnen bevestigen. Mensen blijven de redirect wel
   krijgen: die willen hun eigen taal, geen keuzescherm. */
const CRAWLER =
  /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|whatsapp|telegrambot|discordbot|linkedinbot|pinterest|vkshare|redditbot|applebot|petalbot|yandex|duckduckgo|gptbot|oai-searchbot|chatgpt-user|claudebot|claude-web|perplexity|ccbot|google-extended|amazonbot|bytespider|meta-externalagent/i

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

/** Het Nederlandse pad voor een Engels pad. Vertaalt de landingsslug wanneer die
 *  per taal anders geschreven wordt, en prefixt in alle andere gevallen. */
function dutchPath(path: string): string {
  if (path === '/') return '/nl'
  const translated = EN_TO_NL.get(path)
  if (translated) return `/nl${translated}`
  return `/nl${path}`
}

export default function middleware(request: Request) {
  const url = new URL(request.url)
  const path = url.pathname

  // Crawlers: laat het opgevraagde pad met rust, in beide talen.
  if (CRAWLER.test(request.headers.get('user-agent') || '')) return

  /* Verdwenen pagina's laten we hier los. Vercel draait deze middleware VÓÓR de
     rewrites, dus zouden we een verdwenen Engelse URL alsnog naar /nl sturen:
     de slug staat niet meer in EN_TO_NL, dus zou hij blind geprefixt worden en
     eindigen op een pad dat nooit bestaan heeft. De 410 uit vercel.json kwam
     dan niet meer aan bod en werd een 404. Niets doen betekent hier dat beide
     talen hetzelfde antwoord krijgen, rechtstreeks en zonder omweg. */
  if (RETIRED_PATHS.has(path)) return

  // Al Nederlands: niets doen.
  if (path === '/nl' || path.startsWith('/nl/')) return

  /* Een Nederlandse landingsslug aan de wortel (`/ai-automatisering-immokantoor`)
     bestaat daar niet: die pagina woont onder /nl. Ongeacht taalvoorkeur hoort
     zo'n URL naar zijn eigen plek te gaan in plaats van op een 404 te eindigen. */
  if (NL_AT_ROOT.has(path)) {
    url.pathname = `/nl${path}`
    return Response.redirect(url.toString(), 308)
  }

  // Bepaal de gewenste taal.
  const choice = cookieValue(request, 'nivora.lang')
  let wantNl: boolean
  if (choice === 'nl') wantNl = true
  else if (choice === 'en') wantNl = false
  else wantNl = prefersDutch(request)

  if (!wantNl) return // Engels: het Engelse pad zo laten.

  // Doorsturen naar de Nederlandse variant, met query + hash behouden.
  url.pathname = dutchPath(path)
  return Response.redirect(url.toString(), 307)
}
