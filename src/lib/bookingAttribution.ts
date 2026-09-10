import { useEffect } from 'react'
import { BOOKING_URL } from '@/data/contact'

/**
 * Waar een boeking vandaan komt, meegegeven aan de boekingsapp.
 *
 * Het probleem: booking.nivoraworks.com draait op een ander domein. Wie via
 * Google op nivoraworks.com landt en daarna op "Boek een gesprek" klikt, komt
 * daar aan met `document.referrer` op nivoraworks.com. De echte bron is dan al
 * weg, en de boeking landt in de database met `source: 'booking_page'`, wat over
 * elke boeking hetzelfde zegt: niets.
 *
 * De oplossing is de bron meesturen in de URL. Twee parameters, kort genoeg om
 * in een databasekolom leesbaar te blijven:
 *
 *   via  de bron: utm_source als die er staat, anders het domein van de
 *        verwijzer, anders "direct" (iemand die het adres intikt of uit een
 *        bladwijzer komt).
 *   lp   het pad waarop het bezoek begon. Dat zegt welke pagina het gesprek
 *        opleverde, en dat is precies wat een sectorpagina moet bewijzen.
 *
 * Waarom dit één luisteraar op het document is en geen prop op tien knoppen:
 * er zijn vandaag tien plekken die naar de boeking linken, en de elfde die
 * iemand morgen toevoegt zou de meting stil verliezen. Dat is exact het soort
 * fout dat je pas maanden later merkt, wanneer je je afvraagt waarom de helft
 * van de boekingen geen bron heeft.
 *
 * Privacy: alleen het DOMEIN van de verwijzer, nooit de volledige URL, en het
 * pad op de eigen site. Geen persoonsgegevens, geen blijvende identificatie, en
 * de opslag is sessionStorage, dus ze is weg zodra het tabblad sluit. Hetzelfde
 * gegeven gaat vandaag al server-side mee in src/lib/siteAnalytics.ts.
 */

const KEY = 'nv_attr'

type Attribution = { via: string; lp: string }

/** Het domein van de verwijzer, of leeg wanneer die er niet is of intern is. */
function referrerHost(): string {
  try {
    if (!document.referrer) return ''
    const u = new URL(document.referrer)
    if (u.hostname === location.hostname) return ''
    return u.hostname.replace(/^www\./, '').slice(0, 120)
  } catch {
    return ''
  }
}

/**
 * De bron van dit bezoek, één keer per sessie vastgelegd.
 *
 * Eén keer, want na een klik naar een andere pagina is de verwijzer op de eigen
 * site "intern" en zou de bron zichzelf overschrijven. Wat als eerste
 * binnenkwam, is wat telt.
 */
function remember(): Attribution | null {
  try {
    const bestaand = sessionStorage.getItem(KEY)
    if (bestaand) return JSON.parse(bestaand) as Attribution

    const params = new URLSearchParams(location.search)
    const via = params.get('utm_source') || referrerHost() || 'direct'
    const attr: Attribution = { via: via.slice(0, 120), lp: location.pathname.slice(0, 200) }
    sessionStorage.setItem(KEY, JSON.stringify(attr))
    return attr
  } catch {
    /* Privémodus of geblokkeerde opslag: dan meten we deze sessie gewoon niet.
       Een meting mag nooit een knop breken. */
    return null
  }
}

/** Wijst deze link naar de boekingsapp? */
const isBookingLink = (href: string): boolean =>
  Boolean(BOOKING_URL) && href.startsWith(BOOKING_URL)

/**
 * Hangt de bron aan een boekings-URL. Laat een URL die de parameters al draagt
 * met rust, zodat een handmatig gezette campagnelink zichzelf niet overschrijft.
 */
export function withAttribution(href: string, attr: Attribution): string {
  try {
    const u = new URL(href)
    if (u.searchParams.has('via')) return href
    u.searchParams.set('via', attr.via)
    u.searchParams.set('lp', attr.lp)
    return u.toString()
  } catch {
    return href
  }
}

/**
 * Legt de bron vast en vult elke klik naar de boekingsapp onderweg aan.
 *
 * De luisteraar staat in de capture-fase, dus hij komt aan de beurt voor de
 * browser de link volgt, en hij past het href-attribuut aan in plaats van de
 * navigatie over te nemen. Zo blijft rechtsklikken, "openen in nieuw tabblad"
 * en een middenklik gewoon werken, en werkt het ook wanneer JavaScript later
 * faalt: dan is de link nog altijd de gewone boekings-URL.
 */
export function useBookingAttribution(): void {
  useEffect(() => {
    const attr = remember()
    if (!attr) return

    const onClick = (e: MouseEvent) => {
      const el = e.target instanceof Element ? e.target.closest('a[href]') : null
      if (!el) return
      const href = el.getAttribute('href') || ''
      if (!isBookingLink(href)) return
      el.setAttribute('href', withAttribution(href, attr))
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])
}
