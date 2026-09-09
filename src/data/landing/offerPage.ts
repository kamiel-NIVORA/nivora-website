import type { LandingContent, LandingPage } from './types'

/**
 * Eén aanbod, één pagina, één taal.
 *
 * De offerpagina's voor architectenbureaus zijn anders van vorm dan de sector-
 * en oplossingspagina's: ze noemen een prijs, ze zeggen voor wie ze niet zijn,
 * en ze laten de lezer zelf narekenen wat het hem oplevert. Die vorm zit in de
 * blokken (zie ./types.ts, kinds `price` en `calculator`), niet in een
 * samensteller zoals ./solutionPage.ts, want elke offerpagina heeft een andere
 * volgorde nodig en een vaste volgorde zou hier tegenwerken.
 *
 * Wat hier wel staat is de taalbrug. `LandingContent` vraagt een Engelse en een
 * Nederlandse versie, maar deze pagina's gaan over de Open Oproep, e-Procurement
 * en het UEA. Dat bestaat in Vlaanderen en nergens anders, dus is er niets te
 * vertalen dat een lezer zou helpen. De entry in ./slugs.ts draagt daarom
 * `nlOnly`, en dit is de plek waar dat zichtbaar is in plaats van dat er ergens
 * een Engelse versie ligt die per ongeluk toch gepubliceerd raakt.
 *
 * Wie hier later wél een Engelse versie wil, schrijft die en haalt `nlOnly` uit
 * de registry. Dan komt de Engelse URL, de hreflang en de sitemapregel er
 * vanzelf bij.
 */
export const nlOnlyPage = (page: LandingPage): LandingContent => ({ en: page, nl: page })

/** De vaste tweede knop op elke offerpagina. Eén primaire actie per pagina, en
 *  dit is hem: de Terugblik kost de lezer niets en ons één avond. */
export const TERUGBLIK_CTA = 'Vraag uw gratis Wedstrijd-Terugblik'
