import { nlOnlyPage, TERUGBLIK_CTA, TERUGBLIK_HREF } from '../offerPage'

/**
 * Wedstrijd-Radar: oproepen vinden en scoren voor er tijd in gaat.
 *
 * De eerste van vier betaalde offerpagina's onder /architecten/. Alleen in het
 * Nederlands, zie ../offerPage.ts.
 *
 * Twee dingen sturen deze tekst. Ten eerste dat het zoeken zelf niet het dure
 * deel is: dat is de wedstrijd waar een bureau aan begint en achteraf niet aan
 * had moeten beginnen. De pagina zegt dat ook in die volgorde. Ten tweede dat
 * een score een mening is en geen feit, dus staat overal waar een cijfer valt
 * ook waar dat cijfer vandaan komt en dat de lezer beslist.
 */
export default nlOnlyPage({
  hero: {
    eyebrow: 'Aanbod voor architectenbureaus',
    h1: 'De Wedstrijd-Radar, elke oproep gescoord voor u er tijd in steekt',
    subhead:
      'Een Open Oproep verschijnt twee keer per jaar, e-Procurement elke dag, en de gemeente die u vorig jaar een school liet ontwerpen zet haar volgende opdracht op haar eigen website. De Radar leest die bronnen, houdt over wat bij uw bureau past, en zegt er meteen bij wat de oproep vraagt tegenover wat ze betaalt.',
    primaryCta: TERUGBLIK_CTA,
  },
  manifesto:
    'De verkeerde wedstrijd kost u geen avond. Ze kost u de beste ontwerper van het bureau, twee weken lang.',
  heroImage: '/landing/auto-sec-architect-a.webp',
  manifestoImage: '/landing/auto-opl-termijnwachter-hero.webp',
  blocks: [
    {
      kind: 'answer',
      h2: 'Wat doet de Wedstrijd-Radar?',
      answer:
        'De Wedstrijd-Radar is een systeem van Nivora Works dat voor een Vlaams architectenbureau elke dag de publicatiekanalen voor ontwerpopdrachten afleest, elke nieuwe oproep beoordeelt tegen het profiel van dat bureau, en er een fiche van één bladzijde bij levert met wat de oproep vraagt, wat ze betaalt en hoeveel uren de kandidatuur zal kosten. Hij beslist niets: hij zet de kost en de opbrengst naast elkaar zodat de zaakvoerder dat in vier minuten kan doen in plaats van in twee uur.',
      detail: [
        'Het zoeken is het kleinste deel van het probleem. Het dure deel is de wedstrijd waar een bureau aan begint omdat ze er nu eenmaal is, en waarvan achteraf iedereen wist dat ze niet paste. Daarom is de Radar geen alarmdienst maar een weegschaal.',
      ],
    },
    {
      kind: 'pillars',
      h2: 'Voor wie dit is, en voor wie niet',
      items: [
        {
          title: 'Wel',
          body: 'Bureaus van vijf tot vijftien mensen die per jaar aan meer dan vijf wedstrijden of aanbestedingen meedoen, of dat zouden doen als ze er de tijd voor hadden.',
        },
        {
          title: 'Niet',
          body: 'Een bureau dat één keer per jaar een Open Oproep probeert: dan volstaat de kalender van de Vlaamse Bouwmeester. En niet voor wie gewoon een melding wil bij elke overheidsopdracht, want dat bestaat al, het is goedkoop, en het weegt niets.',
        },
      ],
    },
    {
      kind: 'steps',
      h2: 'Wat de Radar precies doet',
      steps: [
        {
          phase: 'Eerst',
          title: 'Uw bureauprofiel',
          body: 'Samen op papier wat een goede opdracht voor u is: de types waar u sterk in staat, de schaal, de regio’s, de partners die u standaard meeneemt, hoeveel capaciteit er per kwartaal vrij is, en wat u niet meer doet. Dat profiel is de maat waarmee alles gemeten wordt, en het is het enige deel waar u echt bij moet zitten.',
        },
        {
          phase: 'Dan',
          title: 'De bronnen',
          body: 'De Belgische publicatiekanalen voor overheidsopdrachten op de codes voor ontwerpdiensten, de oproepen van de Vlaamse Bouwmeester, de Europese publicaties, en tot vijftien bronnen die u zelf aanwijst: de gemeenten en intercommunales waar u werkt, de woonmaatschappijen, de agentschappen die scholen en zorg financieren. Volgt u vandaag al een meldingsdienst, dan nemen we die mee als bron in plaats van hem te vervangen.',
        },
        {
          phase: 'Per oproep',
          title: 'De score',
          body: 'Een cijfer op honderd, opgebouwd uit wat er in de leidraad staat: waarop geselecteerd wordt, hoeveel teams doorgaan naar de volgende ronde, wat er in elke ronde gevraagd wordt, welke vergoeding daartegenover staat, hoe het ereloon berekend wordt, welke clausules risico naar de ontwerper schuiven, en of de timing past in de capaciteit die u opgaf. Bij elk onderdeel staat de zin uit de leidraad waarop het gebaseerd is.',
        },
        {
          phase: 'Op één blad',
          title: 'De go/no-go-fiche',
          body: 'Score en de reden erachter, de geschatte uren voor de kandidatuur en voor de offerte als u doorgaat, de verwachte waarde, en de ladder van data van vragenronde tot gunning. De fiche zegt niet dat u het moet doen. Ze zegt wat het kost en wat het kan opbrengen.',
        },
        {
          phase: 'Elke ochtend',
          title: 'Waar het terechtkomt',
          body: 'Eén mail met de nieuwe oproepen boven de drempel die u zelf instelt, het tabblad in uw eigen omgeving, en de deadlines in de agenda die het bureau al gebruikt. Niemand hoeft ergens in te loggen om dit te laten werken.',
        },
      ],
    },
    {
      kind: 'prose',
      h2: 'Wat de Radar niet doet',
      body: [
        'Hij dient niet in en hij schrijft geen stukken. Hij kijkt ook niet terug naar wat u vorige jaren won of verloor; dat is een ander onderdeel.',
        'En hij beslist niet. Een oproep met een lage score kan de juiste zijn omdat u die opdrachtgever al tien jaar kent. Staat die reden in uw profiel, dan staat ze ook op de fiche.',
      ],
    },
    {
      kind: 'examples',
      h2: 'Zo ziet een week eruit',
      items: [
        {
          title: 'Maandagochtend, half negen',
          before:
            'Twee uur zoeken op woensdagavond, langs zeven websites, en de oproep die het best paste stond op de site van een intercommunale die u niet volgt.',
          after:
            'Drie oproepen in uw mail. Twee rood: uitgewerkte gevelbeelden gevraagd in de eerste ronde, twaalf kandidaten, geen vergoeding. Eén groen: selectie op visie, vijf teams naar de volgende ronde, een vergoeding per team, ereloon op een reëel bouwbudget. U opent de fiche, ziet de geschatte uren, en zet hem op go. Vier minuten.',
        },
      ],
    },
    {
      kind: 'calculator',
      h2: 'Wat het uw bureau kost om dit niet te hebben',
      intro:
        'Het zoeken is drie uur per week. Het echte getal is de ene wedstrijd per jaar waar u aan begint en niet aan had moeten beginnen. Vul uw eigen aantallen in.',
      formula: 'urenPerJaar',
      fields: [
        { key: 'aantal', label: 'Wedstrijden per jaar', value: 10, suffix: 'per jaar' },
        { key: 'urenPer', label: 'Uren aan een wedstrijd die u achteraf niet zou doen', value: 18, suffix: 'uur' },
        { key: 'urenWeek', label: 'Uren zoeken per week', value: 3, suffix: 'uur' },
        { key: 'uurkost', label: 'Uurkost', value: 80, suffix: 'euro' },
      ],
      priceForPayback: 1950,
      note: 'De standaardwaarden zijn onze schatting, niet een cijfer uit onderzoek. Pas ze aan naar wat u zelf ziet; het rekent mee.',
    },
    {
      kind: 'price',
      h2: 'Prijs en oplevering',
      amount: '€1.950',
      qualifier: 'eenmalig, excl. btw',
      terms: [
        'De helft bij de start, de helft bij oplevering.',
        'Opgeleverd binnen tien werkdagen na de intake.',
        'De omgeving in uw eigen huisstijl, en tot vijftien bronnen die u zelf aanwijst.',
        'Drie maanden bijsturen van de score en de bronnen, op basis van wat u wel en niet had willen zien.',
      ],
      note: 'Dit is een bouwprijs. Wij bouwen de Radar in 2026 samen met vijf Vlaamse bureaus, en die vijf bepalen mee hoe hij werkt. Daarna ligt de prijs hoger. Er komt geen abonnement bij: wilt u dat wij de bronnen en de score na drie maanden blijven onderhouden, dan spreken we dat op dat moment af, want vandaag weten wij nog niet wat dat onderhoud echt kost.',
    },
    {
      kind: 'checklist',
      h2: 'Wat wij van u nodig hebben',
      items: [
        'Eén uur voor het bureauprofiel.',
        'De lijst van websites die u nu volgt.',
        'De laatste vijf oproepen waaraan u meedeed, met erbij of u ze opnieuw zou doen.',
      ],
    },
    {
      kind: 'linkGrid',
      h2: 'Past hierbij',
      links: [
        { label: 'De Kandidatuur-Machine', href: '/architecten/kandidatuur-machine' },
        { label: 'Wedstrijd-Intelligence en Cijfers', href: '/architecten/wedstrijd-intelligence' },
        { label: 'Alle drie samen in de Cockpit', href: '/architecten/wedstrijd-cockpit' },
        { label: 'AI voor architectenbureaus', href: '/ai-automation-architect' },
      ],
    },
  ],
  faq: [
    {
      q: 'Wij hebben al een meldingsdienst voor overheidsopdrachten. Wat voegt de Radar toe?',
      a: 'Uw meldingsdienst toont elke opdracht met de juiste code. De Radar zegt of er geselecteerd wordt op ontwerp of op omzet en referenties, hoeveel teams doorgaan, wat de eerste ronde u kost en wat ze betaalt. En hij neemt de oproepen mee die niet via de klassieke kanalen lopen. Hebt u al zo’n dienst, dan nemen wij die feed gewoon op als bron.',
    },
    {
      q: 'Kan de score fout zitten?',
      a: 'Ja. Een leidraad kan dubbelzinnig zijn, en dan zegt de fiche dat in plaats van een getal te verzinnen. Daarom staat bij elk onderdeel de zin uit de leidraad waarop het steunt, zodat u het in seconden nakijkt, en daarom zitten er drie maanden bijsturing bij. Na een oproep of tien weet het systeem wat u bedoelt met te veel gevraagd.',
    },
    {
      q: 'Werkt dit ook voor grotere procedures met een consortium?',
      a: 'Voor het vinden en het scoren wel. De clausules die in dat soort procedures risico bij de ontwerper leggen, wegen zwaar door in de score, en dat is meestal terecht.',
    },
    {
      q: 'Wie ziet ons bureauprofiel?',
      a: 'Alleen uw bureau. Uw omgeving staat apart en binnen Europa, en wij gebruiken uw gegevens niet om modellen te trainen.',
    },
  ],
  finalCta: {
    title: 'Eerst zien wat dit op een van uw eigen wedstrijden had gedaan?',
    body: 'Kies één wedstrijd van de laatste twee jaar, gewonnen of verloren. Wij maken de fiche die de Radar toen gemaakt zou hebben en zetten de uren ernaast. Binnen twee werkdagen, zonder gesprek vooraf.',
  },
  related: [{ label: 'Vraag uw Wedstrijd-Terugblik', href: TERUGBLIK_HREF }],
  seo: {
    title: 'Wedstrijd-Radar voor architecten: elke oproep gescoord · Nivora',
    description:
      'Elke oproep die voor uw Vlaamse architectenbureau in aanmerking komt, elke ochtend in één mail, gescoord op wat ze vraagt tegenover wat ze betaalt. Vaste bouwprijs vanaf €1.950.',
  },
})
