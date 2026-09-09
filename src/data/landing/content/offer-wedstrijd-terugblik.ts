import { nlOnlyPage } from '../offerPage'

/**
 * De Wedstrijd-Terugblik: gratis, en de enige CTA van de vier andere pagina's.
 *
 * Dit is geen aanbod maar een aanleiding. Ze bestaat om de vraag te beantwoorden
 * die anders een half uur van elk eerste gesprek opeet: werkt dit ook bij ons.
 *
 * Twee dingen mogen hier nooit uit verdwijnen. Dat de pagina zelf zegt waarom ze
 * gratis is, want een lezer die dat niet weet vermoedt het ergere. En dat het
 * geen verkoopgesprek is: één pagina, één mail, en verder stilte tenzij hij zelf
 * iets vraagt. Beloofd is beloofd, ook wanneer niemand het narekent.
 */
export default nlOnlyPage({
  hero: {
    eyebrow: 'Gratis, binnen twee werkdagen',
    h1: 'De Wedstrijd-Terugblik, één van uw wedstrijden teruggespeeld',
    subhead:
      'Kies één wedstrijd van de laatste twee jaar, liefst een die publiek gedocumenteerd is. Wij zoeken de leidraad en de gunning op, zetten de tijdlijn op een rij, en leggen ernaast hoe ze gelopen zou zijn met de Cockpit. Gewonnen of verloren maakt niet uit; verloren is meestal leerzamer.',
    primaryCta: 'Vraag uw Terugblik aan',
  },
  manifesto:
    'De duurste wedstrijd van vorig jaar is die waarvan niemand meer weet wat ze gekost heeft.',
  heroImage: '/landing/auto-opl-analyse-a.webp',
  manifestoImage: '/landing/auto-opl-marge-b.webp',
  blocks: [
    {
      kind: 'answer',
      h2: 'Wat is de Wedstrijd-Terugblik?',
      answer:
        'De Wedstrijd-Terugblik is een gratis analyse van Nivora Works van één architectuurwedstrijd waaraan uw bureau deelnam. Wij reconstrueren de tijdlijn uit de publieke stukken, zetten de uren ernaast die de deelname kostte, en tonen wat de Wedstrijd-Radar, de Kandidatuur-Machine en Wedstrijd-Intelligence op dat dossier gedaan zouden hebben. U krijgt één pagina op een adres dat alleen u kent, binnen twee werkdagen, en één mail.',
    },
    {
      kind: 'checklist',
      h2: 'Wat u krijgt',
      items: [
        'De tijdlijn: publicatie, vragenronde, indiening, selectie, offerte, gunning, met per stap de uren zoals u ze opgeeft.',
        'Wat de Radar toen gezegd had: de fiche voor die ene oproep, achteraf gemaakt, met de score en de reden erachter.',
        'Wat de Machine gemaakt had: de checklist uit de originele leidraad, en welke van uw referenties ze had voorgesteld.',
        'Wat Intelligence geweten had: wie deze opdrachtgever eerder koos, en wat er in de projectdefinitie zwaar woog.',
        'De teller onderaan: de geschatte tijdwinst op dit ene dossier, in uren en in euro.',
      ],
    },
    {
      kind: 'prose',
      h2: 'Wat het niet is',
      body: [
        'Geen verkoopgesprek. U krijgt de pagina en één mail. Wilt u erover praten, dan staat er een link; wilt u dat niet, dan hoort u ons niet meer.',
        'En geen oordeel over uw ontwerp. Wij zeggen niets over waarom een jury koos wat ze koos. Wij kijken alleen naar de uren die rond het ontwerp gingen zitten, want dat is het enige waar wij iets aan kunnen doen.',
      ],
    },
    {
      kind: 'steps',
      h2: 'Hoe het loopt',
      steps: [
        { phase: 'U', title: 'Kiest één wedstrijd', body: 'Van de laatste twee jaar. Liefst een waar de leidraad en de gunning publiek zijn, want dan kunnen wij met de echte stukken werken in plaats van met wat u zich herinnert. Weet u er geen, dan kiezen wij er zelf een uit uw referenties.' },
        { phase: 'Wij', title: 'Zoeken de stukken op', body: 'De originele leidraad, de publicatie en de gunning. Dat is het werk waar u zelf nooit aan toekomt, en het duurt bij ons ongeveer een avond.' },
        { phase: 'Wij', title: 'Spelen hem terug', body: 'De tijdlijn met uw uren ernaast, en de drie onderdelen toegepast op dat ene dossier alsof ze er toen geweest waren.' },
        { phase: 'U', title: 'Krijgt één pagina', body: 'Binnen twee werkdagen, in uw huisstijl, op een adres dat alleen u kent. Daarna is het aan u.' },
      ],
    },
    {
      kind: 'cta',
      h2: 'Vraag uw Terugblik aan',
      body: 'Stuur ons de naam van uw bureau, de wedstrijd die u wil laten terugspelen, en, als u het weet, hoeveel uren die kandidatuur ongeveer kostte. Weet u dat laatste niet, dan rekenen wij met een schatting en zeggen wij dat erbij.',
      button: 'Boek een gesprek',
      reassurance: 'Eén pagina, één mail, geen gesprek tenzij u het wil. Uw gegevens blijven bij Nivora Works, binnen Europa.',
    },
    {
      kind: 'linkGrid',
      h2: 'Waar dit over gaat',
      links: [
        { label: 'De Wedstrijd-Radar', href: '/architecten/wedstrijd-radar' },
        { label: 'De Kandidatuur-Machine', href: '/architecten/kandidatuur-machine' },
        { label: 'Wedstrijd-Intelligence en Cijfers', href: '/architecten/wedstrijd-intelligence' },
        { label: 'Alle drie samen in de Cockpit', href: '/architecten/wedstrijd-cockpit' },
      ],
    },
  ],
  faq: [
    {
      q: 'Waarom is dit gratis?',
      a: 'Omdat het ons de vraag bespaart die anders in elk eerste gesprek een half uur kost: werkt dit ook bij ons. Na de Terugblik weet u het, en wij ook. En omdat een deel van de bureaus daarna iets koopt. Dat zeggen we liever meteen dan dat u het zelf moet vermoeden.',
    },
    {
      q: 'Wat als wij die wedstrijd liever niet publiek maken?',
      a: 'Dan blijft ze dat. De pagina staat op een adres dat alleen u kent en komt niet in onze voorbeelden terecht, tenzij u dat zelf voorstelt en er dan uitdrukkelijk mee instemt.',
    },
    {
      q: 'Wij houden geen uren bij per wedstrijd.',
      a: 'Dan rekenen wij met een schatting en zetten wij erbij dat het er een is. De meeste bureaus corrigeren dat getal in de eerste zin van hun antwoordmail, en dan klopt het alsnog.',
    },
    {
      q: 'Hoeveel Terugblikken maken jullie?',
      a: 'Zoveel als er in een week passen, en dat zijn er een paar. Het is handwerk zolang het handwerk is. Duurt het langer dan twee werkdagen, dan laten wij dat weten in plaats van de datum te laten passeren.',
    },
  ],
  finalCta: {
    title: 'Eén wedstrijd, twee werkdagen, geen verplichting',
    body: 'Het kost u de naam van een project en vijf minuten. Het levert u een blad op waar u met uw vennoot naar kunt kijken, of het nu bij ons uitkomt of niet.',
  },
  seo: {
    title: 'Wedstrijd-Terugblik: wat één wedstrijd u kostte · Nivora',
    description:
      'Kies één wedstrijd van uw architectenbureau. Wij reconstrueren de tijdlijn en tonen wat een systeem eraan gescheeld had, in uren en in euro. Gratis, binnen twee werkdagen.',
  },
})
