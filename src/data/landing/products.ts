import type { Lang, Localized } from '@/i18n'
import type { AutomationCard } from '@/components/landing/AutomationRail'
import { SECTORS } from './sectors'

/**
 * De oplossingen die Nivora bouwt, in één regel per stuk.
 *
 * Deze lijst wordt SECTOR PER SECTOR opgebouwd, drie tot vijf oplossingen per
 * vak. Vandaag staan alleen de immokantoren erin. De vorige set liep generiek
 * over alle sectoren heen en stond daardoor overal een beetje en nergens
 * helemaal juist; die vijftien bestanden staan geparkeerd in
 * .nivora/geparkeerde-oplossingen/ en komen terug wanneer hun sector aan de
 * beurt is.
 *
 * Dit bestand bestaat om één reden: op een oplossingspagina hoort de kaartenrij
 * de ANDERE oplossingen te tonen, niet nog eens dezelfde uitgesplitst per
 * beroep. Dat kan alleen als elke oplossing zichzelf ergens kort beschrijft
 * zonder de contentbestanden van de andere in te laden, want dat zou een
 * kringverwijzing zijn en zou elke pagina alle andere laten meewegen in zijn
 * bundel.
 *
 * Namen zijn kort gehouden: de kaarttitel mag maximaal 22 tekens zijn (de guard
 * in scripts/prerender.mjs faalt daarboven), en een korte productnaam leest op
 * een kaart hoe dan ook beter dan de volledige paginatitel.
 */

export type ProductSummary = {
  id: string
  /** Canoniek Engels pad, <LangLink> vertaalt het per taal. */
  href: string
  name: Localized<string>
  blurb: Localized<string>
  image: string
  alt: Localized<string>
  /** Welke van onze vier diensten hierin zitten. Verschijnt als labelrij onder
   *  de titel, zodat de lezer in één oogopslag ziet wat hij afneemt zonder dat
   *  de pagina er een alinea aan hoeft te wijden. */
  services: ('Local AI' | 'AIOS' | 'AI Consulting' | 'App Design')[]
}

export const PRODUCTS: ProductSummary[] = [
  {
    id: 'product-virtual-staging',
    href: '/virtual-staging-empty-properties',
    name: { en: 'More viewings booked', nl: 'Meer bezoeken per pand' },
    blurb: {
      en: 'Not one image out of a generator. The room is read first, several versions are made, and only what holds up on scale and style survives.',
      nl: 'Geen één beeld uit een generator. De ruimte wordt eerst gelezen, er komen meerdere versies, en enkel wat klopt op schaal en stijl blijft over.',
    },
    image: '/landing/auto-opl-kaart-staging.webp',
    alt: {
      en: 'A furnished reception room with tall arched windows onto a garden and a framed landscape on the right wall',
      nl: 'Een ingerichte ontvangstruimte met hoge boogramen op de tuin en een ingelijst landschap aan de rechtermuur',
    },
    services: ['Local AI', 'AIOS', 'AI Consulting'],
  },
  {
    id: 'product-pandboek',
    href: '/property-book-for-every-viewer',
    name: { en: 'Remembered on Monday', nl: 'Maandag nog onthouden' },
    blurb: {
      en: 'After the viewing the candidate gets one page about the property, around what they asked.',
      nl: 'Na het bezoek krijgt de kandidaat één blad over het pand, opgebouwd rond wat hij in de gang vroeg.',
    },
    image: '/landing/auto-opl-kaart-pandblad.webp',
    alt: {
      en: 'The hall of a Flemish townhouse with the front door standing open onto a sunlit street',
      nl: 'De hal van een Vlaams rijhuis met de voordeur open naar een zonnige straat',
    },
    services: ['App Design', 'Local AI', 'AIOS'],
  },
  {
    id: 'product-woninganalyse',
    href: '/property-analysis-from-your-photos',
    name: { en: 'Your price, backed up', nl: 'Uw prijs onderbouwd' },
    blurb: {
      en: 'A report out of your intake photos: the state per room, what would lift the value and what it roughly costs.',
      nl: 'Een verslag uit uw opnamefoto\'s: de staat per ruimte, wat waarde bijzet en ruwweg wat dat kost.',
    },
    image: '/landing/auto-opl-kaart-analyse.webp',
    alt: {
      en: 'An empty, sunlit but dated Flemish room with a worn parquet floor and an old radiator',
      nl: 'Een lege, zonovergoten maar verouderde Vlaamse kamer met versleten parket en een oude radiator',
    },
    services: ['Local AI', 'AI Consulting', 'AIOS'],
  },

  /* ── strandbars ──
     De volgorde is de bouwvolgorde. De reservatielijst uit de eerste is waar de
     tweede, de derde en de vierde uit lezen; de vijfde staat er los van en kan
     ook alleen. */
  {
    id: 'product-strandbar-reservaties',
    href: '/beach-bar-reservations',
    name: { en: 'Off WhatsApp', nl: 'Weg uit WhatsApp' },
    blurb: {
      en: 'Your guest books through your own site or app, with a waiting list when you are full. Three hundred messages a week become one list per day.',
      nl: 'Uw gast boekt via uw eigen site of app, met een wachtlijst wanneer het vol zit. Driehonderd berichten per week worden één lijst per dag.',
    },
    image: '/landing/strandbar-opl-reservaties.webp',
    alt: {
      en: 'A full beach bar terrace at golden hour, guests seated along long timber tables with the sea behind',
      nl: 'Een vol strandbarterras in het gouden uur, gasten aan lange houten tafels met de zee erachter',
    },
    services: ['App Design', 'AIOS'],
  },
  {
    id: 'product-strandbar-bed',
    href: '/who-gets-the-bed',
    name: { en: 'Who gets the bed', nl: 'Wie krijgt het bed' },
    blurb: {
      en: 'Regulars confirmed straight away, unfamiliar names on hold until you know. You keep the decision, the system prepares it.',
      nl: 'Vaste gasten meteen bevestigd, onbekende namen in wacht tot u het weet. De beslissing blijft van u, het systeem zet ze klaar.',
    },
    image: '/landing/strandbar-opl-bed.webp',
    alt: {
      en: 'The front row of a beach club, wide white daybeds under parasols at the edge of the sand',
      nl: 'De eerste rij van een strandclub, brede witte ligbedden onder parasols aan de rand van het zand',
    },
    services: ['AIOS', 'Local AI'],
  },
  {
    id: 'product-strandbar-dag',
    href: '/your-day-on-one-screen',
    name: { en: 'The day on one screen', nl: 'De dag op één scherm' },
    blurb: {
      en: 'Every booking, the places still free, who is working and the forecast per hour. One picture, behind the bar, for whoever opens the shift.',
      nl: 'Elke reservatie, de plaatsen die nog vrij zijn, wie er werkt en het weer per uur. Eén beeld, achter de toog, voor wie de dienst opent.',
    },
    image: '/landing/strandbar-opl-dag.webp',
    alt: {
      en: 'The counter of a beach bar on a busy afternoon, a full terrace and the sea beyond the open frontage',
      nl: 'De toog van een strandbar op een drukke namiddag, een vol terras en de zee door de open gevel',
    },
    services: ['App Design', 'AIOS'],
  },
  {
    id: 'product-strandbar-uren',
    href: '/staff-hours-and-availability',
    name: { en: 'Who works Saturday', nl: 'Wie werkt er zaterdag' },
    blurb: {
      en: 'Your team marks its own availability and enters its own hours after the shift. You confirm one list instead of counting fifteen messages.',
      nl: 'Uw ploeg duidt zelf haar beschikbaarheid aan en geeft na de shift zelf haar uren in. U bevestigt één lijst in plaats van vijftien berichten te tellen.',
    },
    image: '/landing/strandbar-opl-uren.webp',
    alt: {
      en: 'Waiting staff crossing the deck of a busy beach bar, seen from behind, guests at tables on either side',
      nl: 'Bedienend personeel dat over de vlonder van een drukke strandbar loopt, van achteren gezien, gasten aan weerszijden',
    },
    services: ['App Design', 'AIOS'],
  },
  {
    id: 'product-strandbar-drukte',
    href: '/how-busy-it-gets',
    name: { en: 'How busy it gets', nl: 'Hoe druk het wordt' },
    blurb: {
      en: 'One sheet every evening for the day after tomorrow, out of your own till, the weather and the tide, with an honest monthly score.',
      nl: 'Elke avond één blad voor overmorgen, uit uw eigen kassa, het weer en het tij, met elke maand een eerlijke score erbij.',
    },
    image: '/landing/strandbar-opl-drukte.webp',
    alt: {
      en: 'A beach bar terrace at its busiest, every table taken and people standing along the seaward edge',
      nl: 'Een strandbarterras op zijn drukst, elke tafel bezet en mensen aan de zeekant van de vlonder',
    },
    services: ['AIOS', 'AI Consulting', 'Local AI'],
  },
]

/**
 * Andere oplossingen dan deze, als kaarten voor de rij.
 *
 * Begrensd op zes. Vijftien kaarten achter elkaar is geen keuze meer maar een
 * muur.
 *
 * De volgorde is eerst de oplossingen uit HETZELFDE vak, dan pas de rest. Zolang
 * er één sector geschreven was viel dat samen met de volgorde in deze lijst,
 * maar met immokantoren en strandbars naast elkaar niet meer: onderaan een
 * pagina over reservaties in een strandbar hoort geen virtual staging van een
 * lege woning. Wie hier leest, leest verder in zijn eigen vak.
 */
export function otherProducts(selfId: string, lang: Lang, limit = 6): AutomationCard[] {
  const i = PRODUCTS.findIndex((p) => p.id === selfId)
  const rotated = i < 0 ? PRODUCTS : [...PRODUCTS.slice(i + 1), ...PRODUCTS.slice(0, i)]
  /* Het vak waar deze oplossing bij hoort, opgezocht in ./sectors.ts zodat de
     koppeling op één plaats staat. Een oplossing die (nog) bij geen enkele
     sector hangt, valt gewoon achteraan. */
  const sectorOf = (id: string) => SECTORS.find((s) => s.solutions.includes(id))?.id
  const own = sectorOf(selfId)
  const siblings = own ? rotated.filter((p) => sectorOf(p.id) === own) : []
  /* Zijn er broers en zussen in hetzelfde vak, dan is de rij precies die en
     niets anders. Pas wanneer een oplossing alleen in haar sector staat, valt ze
     terug op de rest, want een lege rij is geen rij. */
  const ordered = siblings.length ? siblings : rotated
  return ordered.slice(0, limit).map((p) => ({
    title: p.name[lang],
    body: p.blurb[lang],
    image: p.image,
    alt: p.alt[lang],
    href: p.href,
    /* Deze kaarten staan op elke oplossingspagina, dus ze tellen niet mee als
       eigen tekst van de pagina waarop ze toevallig staan. */
    shared: true,
  }))
}
