import type { Lang } from '@/i18n'
import type { AutomationCard } from '@/components/landing/AutomationRail'

/**
 * The shared pool of automations that fills the rail beyond a page's own four.
 *
 * A city or niche page opens with the four that fit it best. Keep swiping and
 * these appear: automations that belong to other pages but that any Flemish
 * company might recognise. That is the point of the endless rail. Someone on
 * the Bruges page who keeps scrolling might find the one thing they came for on
 * a card that was written for Antwerp.
 *
 * Deliberately small and generic. The page's OWN four carry the local
 * specificity; these are the recognisable ones that travel.
 *
 * Photographs are reused from the set already generated for the city pages,
 * chosen so a pool card never lands next to its own page's version.
 */
const POOL: Record<Lang, AutomationCard[]> = {
  nl: [
    {
      title: 'Facturen inlezen',
      body: 'Binnenkomende facturen worden gelezen en aan het juiste dossier gekoppeld. Alleen wat niet klopt komt bij een mens.',
      image: '/landing/auto-aalst-kantoor.webp',
      alt: 'Een kantoor met wandplanning en papierbakjes',
    },
    {
      title: 'Mail sorteren',
      body: 'Inkomende mail wordt gesorteerd op wat er gevraagd wordt, met het dossier er al bij. Uw team begint geïnformeerd.',
      image: '/landing/auto-gent-kantoor.webp',
      alt: 'Een open kantoor met plywood bureaus',
    },
    {
      title: 'Offertes voorbereiden',
      body: 'Aanvragen worden uitgelezen en vergelijkbare vorige opdrachten erbij gezocht. U begint met een ingevuld blad.',
      image: '/landing/auto-kortrijk-machine.webp',
      alt: 'Een draaibank en bewerkte stukken in een licht atelier',
    },
    {
      title: 'Vervaldatums bewaken',
      body: 'Certificaten, vergunningen en contracten worden opgevolgd. U wordt verwittigd voor iets vervalt, niet erna.',
      image: '/landing/auto-oostende-offshore.webp',
      alt: 'Een offshore windturbineblad op een kaai',
    },
    {
      title: 'Rapporten opmaken',
      body: 'De cijfers die iemand nu met de hand samenstelt, staan vanzelf klaar. Met de afwijkingen bovenaan.',
      image: '/landing/auto-waregem-productie.webp',
      alt: 'Een productievloer tussen twee ploegen in',
    },
    {
      title: 'Documenten toetsen',
      body: 'De stukken van één dossier worden naast elkaar gelegd en vergeleken. U ziet alleen waar iets niet overeenkomt.',
      image: '/landing/auto-imo-set.webp',
      alt: 'Papieren documenten naast elkaar op een houten bureau',
    },
    {
      title: 'Archief doorzoeken',
      body: 'Vraag in gewone taal wat er ooit is afgesproken. Ook wat in mails en op netwerkschijven staat wordt meegenomen.',
      image: '/landing/auto-imo-archief.webp',
      alt: 'Een open archieflade met hangmappen',
    },
    {
      title: 'AI op eigen server',
      body: 'Alles draait op hardware die van u is. Klantgegevens en prijzen verlaten het gebouw niet.',
      image: '/landing/auto-imo-server.webp',
      alt: 'Een serverkast in de hoek van een licht kantoor',
    },
  ],
  en: [
    {
      title: 'Reading invoices',
      body: 'Incoming invoices are read and matched to the right file. Only what does not add up reaches a person.',
      image: '/landing/auto-aalst-kantoor.webp',
      alt: 'An office with a wall planner and paperwork trays',
    },
    {
      title: 'Sorting mail',
      body: 'Incoming mail is sorted by what is being asked, with the file already attached. Your team starts informed.',
      image: '/landing/auto-gent-kantoor.webp',
      alt: 'An open plan office with plywood desks',
    },
    {
      title: 'Preparing quotes',
      body: 'Requests are read and comparable past jobs surfaced. You start from a filled-in sheet.',
      image: '/landing/auto-kortrijk-machine.webp',
      alt: 'A lathe and machined parts in a bright workshop',
    },
    {
      title: 'Tracking expiry',
      body: 'Certificates, permits and contracts are tracked. You are warned before something lapses, not after.',
      image: '/landing/auto-oostende-offshore.webp',
      alt: 'An offshore wind turbine blade on a quayside',
    },
    {
      title: 'Building reports',
      body: 'The figures someone now assembles by hand are ready by themselves, with the exceptions on top.',
      image: '/landing/auto-waregem-productie.webp',
      alt: 'A production floor between shifts',
    },
    {
      title: 'Checking documents',
      body: 'The papers of one file are laid side by side and compared. You only see where something disagrees.',
      image: '/landing/auto-imo-set.webp',
      alt: 'Paper documents laid side by side on a wooden desk',
    },
    {
      title: 'Searching archives',
      body: 'Ask in plain language what was once agreed. What sits in mail and on network drives is included.',
      image: '/landing/auto-imo-archief.webp',
      alt: 'An open filing drawer with hanging folders',
    },
    {
      title: 'AI on your server',
      body: 'Everything runs on hardware you own. Customer data and pricing never leave the building.',
      image: '/landing/auto-imo-server.webp',
      alt: 'A server cabinet in the corner of a bright office',
    },
  ],
}

/**
 * A page's own cards first, then pool cards to fill the rail out to `total`.
 * Titles already used are skipped so the same automation never appears twice.
 */
export function railFor(own: AutomationCard[], lang: Lang, total = 12): AutomationCard[] {
  const used = new Set(own.map((c) => c.title.toLowerCase()))
  /* `shared: true` marks a card as pool rather than page content. The rail
     renders those with data-boilerplate so the duplicate-content guard in
     scripts/prerender.mjs measures a page's own four and ignores the filler,
     which is navigation and is supposed to repeat, like the footer. */
  const extra = POOL[lang]
    .filter((c) => !used.has(c.title.toLowerCase()))
    .map((c) => ({ ...c, shared: true }))
  return [...own, ...extra].slice(0, total)
}
