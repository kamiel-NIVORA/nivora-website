import { nlOnlyPage, TERUGBLIK_CTA } from '../offerPage'

/**
 * Kandidatuur-Machine: van selectieleidraad naar ingediend dossier.
 *
 * De duurste van de vier, en de enige waar de belofte hard te meten is: een
 * kandidatuur kost vandaag dagen en zou uren moeten kosten. Twee grenzen staan
 * daarom expliciet in de tekst. De Machine schrijft de visie niet, want dat is
 * het vak van de architect en een bureau dat zijn nota laat schrijven verkoopt
 * zichzelf niet. En ze dient niet in, want de handtekening onder een dossier
 * hoort bij wie ervoor tekent.
 */
export default nlOnlyPage({
  hero: {
    eyebrow: 'Aanbod voor architectenbureaus',
    h1: 'De Kandidatuur-Machine, van leidraad naar dossier in een dag',
    subhead:
      'Elke kandidatuur vraagt hetzelfde: het aanbestedingsdocument, drie referenties in het formaat van déze opdrachtgever, de cv’s van het team, de attesten, en een nota waarom dit team voor deze opgave. Het grootste deel daarvan schreef u vorige keer ook al.',
    primaryCta: TERUGBLIK_CTA,
  },
  manifesto:
    'Een dossier sneuvelt zelden op het ontwerp. Het sneuvelt op een attest van vorige zomer.',
  heroImage: '/landing/auto-sec-kantoor-a.webp',
  manifestoImage: '/landing/auto-opl-overname-a.webp',
  blocks: [
    {
      kind: 'answer',
      h2: 'Wat doet de Kandidatuur-Machine?',
      answer:
        'De Kandidatuur-Machine is een systeem van Nivora Works dat het geheugen van een architectenbureau vasthoudt, uit een selectieleidraad haalt wat er precies gevraagd wordt, en daaruit het concept-dossier klaarzet: de referentiefiches in het gevraagde formaat, de cv’s toegespitst op de gevraagde rollen, de attesten gebundeld en een eerste versie van de motivatienota. Vlak voor indiening legt hij het dossier naast de eisen en zegt wat er ontbreekt.',
      detail: [
        'Wat de Machine niet doet is even belangrijk als wat ze wel doet. Ze schrijft uw visie niet en ze dient niet in uw plaats in. Die twee grenzen staan hieronder uitgeschreven, want ze zijn de reden dat een bureau dit kan gebruiken zonder zichzelf weg te geven.',
      ],
    },
    {
      kind: 'pillars',
      h2: 'Voor wie dit is, en voor wie niet',
      items: [
        {
          title: 'Wel',
          body: 'Bureaus die per jaar acht of meer kandidaturen indienen, en waar dat werk nu bij twee of drie mensen tegelijk ligt en over twee weken uitgesmeerd raakt.',
        },
        {
          title: 'Niet',
          body: 'Wie de kandidatuur uitbesteedt aan een externe schrijver. En niet voor een procedure waar in de eerste ronde alleen ontwerpwerk gevraagd wordt: daar valt niets te automatiseren, en dat zeggen wij vooraf in plaats van achteraf.',
        },
      ],
    },
    {
      kind: 'steps',
      h2: 'Wat de Machine precies doet',
      steps: [
        {
          phase: 'Eenmalig',
          title: 'Het bureaugeheugen',
          body: 'U geeft ons uw eerdere kandidaturen, uw referentieprojecten met hun cijfers en beelden, de cv’s van het team, de gegevens van uw vaste partners en uw attesten. Wij maken daar één geordend geheugen van waarin elk stuk een datum en een eigenaar heeft. Loopt een attest af, dan hoort u dat weken op voorhand in plaats van op de dag van indiening.',
        },
        {
          phase: 'Per oproep',
          title: 'De leidraad lezen',
          body: 'U stuurt de leidraad door. Eruit komt wat er echt gevraagd wordt: het aantal referenties en hun formaat, de paginalimieten, de selectie- en gunningscriteria met hun gewicht, de uitsluitingsgronden, de data, en de stukken die u bij een partner moet opvragen. Dat wordt de checklist voor deze ene kandidatuur.',
        },
        {
          phase: 'Daarna',
          title: 'Het concept-dossier',
          body: 'De vaste stukken vooringevuld, de referentiefiches in het gevraagde formaat met een voorstel van welke van uw projecten hier het sterkst staan en waarom, de teamsamenstelling met cv-uittreksels op maat van de gevraagde rollen, de attesten gebundeld, en een eerste versie van de motivatienota met de criteria van de leidraad als structuur.',
        },
        {
          phase: 'Voor indiening',
          title: 'De controle',
          body: 'Het dossier naast de checklist. Welk stuk ontbreekt, welke fiche gaat over de paginalimiet, welk attest is te oud, welke bijlage staat in het verkeerde formaat. Groen betekent dat alles wat gevraagd is erin zit. Het betekent niet dat u geselecteerd wordt, en die twee dingen worden nergens door elkaar gehaald.',
        },
        {
          phase: 'Doorlopend',
          title: 'Het overzicht per wedstrijd',
          body: 'Wie welk stuk voor zijn rekening neemt, welke versie de laatste is, en de mail naar de partner die klaarstaat om te versturen wanneer u zijn cv en attest nodig hebt.',
        },
      ],
    },
    {
      kind: 'prose',
      h2: 'Wat de Machine niet doet',
      body: [
        'Ze schrijft uw visie niet en ze tekent niets. Het ontwerpend onderzoek en de nota waarin u uitlegt hoe u naar de opgave kijkt: dat is uw vak, en een bureau dat dat laat schrijven verkoopt zichzelf niet meer. U krijgt de structuur die de leidraad vraagt en de woorden die de opdrachtgever zelf gebruikt. Wat u erin zet, is van u.',
        'Ze dient ook niet in. U krijgt de map in de juiste opbouw; de handtekening en het opladen doet u zelf, want dat hoort bij wie ervoor tekent.',
      ],
    },
    {
      kind: 'examples',
      h2: 'Zo ziet één kandidatuur eruit',
      items: [
        {
          title: 'Van dinsdagochtend tot donderdag',
          before:
            'Acht werkdagen, verdeeld over drie mensen, met op de laatste dag de ontdekking dat een attest van de vorige zomer dateert en opnieuw opgevraagd moet worden.',
          after:
            'Dinsdag tien uur gaat de leidraad erin, twaalf minuten later staat de checklist er met het concept grotendeels ingevuld. De projectleider vervangt één voorgestelde referentie, want hij weet iets dat het geheugen niet weet. Woensdag anderhalf uur aan de nota, vanuit een skelet in plaats van vanaf een leeg blad. Donderdag staat de controle op groen. Zes uur werk van één persoon.',
        },
      ],
    },
    {
      kind: 'calculator',
      h2: 'Wat een kandidatuur u vandaag kost',
      intro:
        'Reken met uw eigen aantallen. Tel alleen de uren zonder ontwerpwerk, want dat is het deel dat blijft.',
      formula: 'urenPerJaar',
      fields: [
        { key: 'aantal', label: 'Kandidaturen per jaar', value: 12, suffix: 'per jaar' },
        { key: 'urenPer', label: 'Uren per kandidatuur, zonder ontwerp', value: 20, suffix: 'uur' },
        { key: 'uurkost', label: 'Uurkost', value: 80, suffix: 'euro' },
      ],
      priceForPayback: 3900,
      note: 'De standaardwaarden zijn onze schatting en geen sectorcijfer. Wij vonden er geen publiek onderzoek over, en dan is het eerlijker om dat te zeggen dan om een bron te suggereren.',
    },
    {
      kind: 'price',
      h2: 'Prijs en oplevering',
      amount: '€3.900',
      qualifier: 'eenmalig, excl. btw',
      terms: [
        'De helft bij de start, de helft bij oplevering.',
        'Opgeleverd binnen vijftien werkdagen na ontvangst van uw map.',
        'Wij bouwen het bureaugeheugen op; u levert de map aan.',
        'Drie maanden bijsturing, waarin wij de eerste drie kandidaturen samen met u doorlopen.',
      ],
      note: 'Bouwprijs voor de eerste vijf bureaus, daarna hoger. Geen abonnement, en na de bijsturingsperiode is de omgeving van u.',
    },
    {
      kind: 'checklist',
      h2: 'Wat wij van u nodig hebben',
      items: [
        'Uw laatste vijf kandidaturen zoals ze ingediend zijn.',
        'Uw referentiefiches, de cv’s van het team en uw attesten.',
        'De contactgegevens van uw vaste partners.',
        'Eén uur om samen door het geheugen te lopen. Daarna stuurt u alleen nog leidraden door.',
      ],
    },
    {
      kind: 'linkGrid',
      h2: 'Past hierbij',
      links: [
        { label: 'Vraag uw gratis Wedstrijd-Terugblik', href: '/architecten/wedstrijd-terugblik' },
        { label: 'De Wedstrijd-Radar', href: '/architecten/wedstrijd-radar' },
        { label: 'Wedstrijd-Intelligence en Cijfers', href: '/architecten/wedstrijd-intelligence' },
        { label: 'Alle drie samen in de Cockpit', href: '/architecten/wedstrijd-cockpit' },
        { label: 'AI voor architectenbureaus', href: '/ai-automation-architect' },
      ],
    },
  ],
  faq: [
    {
      q: 'Wat als de leidraad iets vraagt dat er nooit eerder was?',
      a: 'Dan staat het in de checklist als nieuw en maakt de Machine er geen concept voor. Zij vult niets in wat ze niet weet. Dat is de enige manier waarop een controle iets waard is: een systeem dat gaten opvult die het niet kan opvullen, leert u de controle negeren.',
    },
    {
      q: 'Onze motivatienota is ons visitekaartje. Wordt dat nu een tekst van een machine?',
      a: 'Nee. U krijgt een skelet met de criteria van de leidraad als kapstok, en een eerste versie opgebouwd uit uw eigen eerdere nota’s. De meeste bureaus herschrijven die in een uur. Dat uur was vroeger een halve dag, omdat u van een leeg blad vertrok.',
    },
    {
      q: 'Blijven onze dossiers bij ons?',
      a: 'Ja. Uw geheugen staat in uw eigen omgeving binnen Europa. Wij gebruiken uw stukken niet om modellen te trainen en wij kijken er niet in, tenzij u ons vraagt mee te kijken tijdens de bijsturing.',
    },
    {
      q: 'Wij werken vaak samen met andere bureaus. Kan dat?',
      a: 'Ja. Per kandidatuur komt er een teamstructuur met de stukken van elke partner, en de vraag naar hun documenten vertrekt automatisch naar hen met de juiste deadline erbij.',
    },
  ],
  finalCta: {
    title: 'Zien wat dit op een van uw eigen kandidaturen had gedaan?',
    body: 'Kies een wedstrijd van de laatste twee jaar. Wij lezen de originele leidraad, maken de checklist, en tonen welke van uw referenties de Machine had voorgesteld en waarom.',
  },
  seo: {
    title: 'Kandidatuur-Machine: selectiedossier in één dag · Nivora',
    description:
      'Van selectieleidraad naar ingediend dossier: referentiefiches in het gevraagde formaat, cv’s, attesten, en een controle op wat ontbreekt. Voor Vlaamse architectenbureaus, vanaf €3.900.',
  },
})
