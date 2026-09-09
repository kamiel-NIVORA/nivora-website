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

/* Leeg, en dat is de stand van zaken.

   Hier stonden acht oplossingen: drie voor de verkoopkant van de immo en vijf
   voor strandbars. Ze zijn in september 2026 verwijderd toen de sectorenlijst
   van negen naar drie ging; zie het commentaar in ./slugs.ts voor het waarom.

   De lijst blijft bestaan omdat de opzet eromheen klopt en er nieuwe
   oplossingen aan komen. Zolang hij leeg is, toont een sectorpagina geen
   oplossingenrij en tonen de dienstlabels op een oplossingspagina niets, allebei
   vanzelf: solutionRailFor() en ServiceBadges in src/pages/LandingPage.tsx
   rekenen op een lege lijst en niet op een ontbrekende. */
export const PRODUCTS: ProductSummary[] = [

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
