import { nlOnlyPage, TERUGBLIK_CTA } from '../offerPage'

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
      'Een Open Oproep verschijnt twee keer per jaar, het Bulletin der Aanbestedingen elke dag, en de gemeente die u vorig jaar een school liet ontwerpen zet haar volgende opdracht ook op haar eigen website. De Radar leest die bronnen, houdt over wat bij uw bureau past, en zegt er meteen bij wat de oproep vraagt tegenover wat ze betaalt.',
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
          body: 'Een bureau dat één keer per jaar een Open Oproep probeert: dan volstaat de kalender van de Vlaamse Bouwmeester. En niet voor wie gewoon een melding wil bij elke overheidsopdracht. Dat bestaat al en het is niet duur. Zo’n alert vertelt u dat een oproep bestaat; hij weegt niet of ze bij u past.',
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
          body: 'Het Bulletin der Aanbestedingen op het federale e-Procurementplatform, op de CPV-codes van de 71-reeks: 71200000, 71220000 en 71221000 voor architectuur en bouwkundig ontwerp, 71230000 voor de architectenprijsvraag, 71240000 en 71250000, 71400000 voor stedenbouw en landschap, en 71320000 waar de opdracht bij een ingenieursbureau gecodeerd staat. De Open Oproep en de Oproep aan geïnteresseerden van de Vlaamse Bouwmeester, waarvan die tweede alleen op hun eigen site verschijnt en dus in geen enkele meldingsdienst zit. De Europese publicaties op TED. En tot vijftien bronnen die u zelf aanwijst: de gemeenten en intercommunales waar u werkt, de woonmaatschappijen. Volgt u vandaag al een meldingsdienst, dan nemen we die mee als bron in plaats van hem te vervangen.',
        },
        {
          phase: 'Per oproep',
          title: 'De score',
          body: 'Een cijfer op honderd, opgebouwd uit wat er in de leidraad staat: waarop geselecteerd wordt, hoeveel teams doorgaan naar de volgende ronde, wat er in elke ronde gevraagd wordt, welke biedvergoeding daartegenover staat, en of er een vast ereloonpercentage dan wel een ereloonvork gepubliceerd is, welke clausules risico naar de ontwerper schuiven, en of de timing past in de capaciteit die u opgaf. Bij elk onderdeel staat de zin uit de leidraad waarop het gebaseerd is.',
        },
        {
          phase: 'Op één blad',
          title: 'De go/no-go-fiche',
          body: 'Score en de reden erachter, de geschatte uren voor de kandidatuur en voor de offerte als u doorgaat, de verwachte waarde, en de ladder van data: indiening kandidatuur, selectie, uitnodiging tot offerte, briefing en vragenronde, offerte, onderhandeling en gunning, met de wettelijke minimumtermijnen erbij. De fiche zegt niet dat u het moet doen. Ze zegt wat het kost en wat het kan opbrengen.',
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
            'Drie oproepen in uw mail, geen van de drie een Open Oproep. Twee rood: uitgewerkte gevelbeelden gevraagd in de eerste ronde, twaalf kandidaten, en geen biedvergoeding terwijl er wel grafisch ontwerp gevraagd wordt. Dat laatste mag niet meer: sinds 1 februari 2024 moet een aanbesteder die maquettes, tekeningen of ander ontwerpwerk bij de offerte eist, in een biedvergoeding voorzien (artikel 12/9 van de wet van 17 juni 2016). De Radar zet dat als rode vlag met het artikel erbij. Eén groen: selectie op referenties en ambitienota, vier teams door, biedvergoeding per team, ereloon op een reëel bouwbudget. U opent de fiche, ziet de geschatte uren, en zet hem op go. Vier minuten.',
        },
      ],
    },
    {
      kind: 'calculator',
      h2: 'Wat het uw bureau kost om dit niet te hebben',
      intro:
        'Stel dat het zoeken u drie uur per week kost. Dat is onze aanname en geen sectorcijfer: wij vonden geen onderzoek dat die tijd meet. Het echte getal is trouwens de ene wedstrijd per jaar waar u aan begint en niet aan had moeten beginnen. Vul uw eigen aantallen in.',
      formula: 'urenPerJaar',
      fields: [
        { key: 'aantal', label: 'Wedstrijden per jaar', value: 10, suffix: 'per jaar' },
        { key: 'urenPer', label: 'Uren aan een wedstrijd die u achteraf niet zou doen', value: 38, suffix: 'uur' },
        { key: 'urenWeek', label: 'Uren zoeken per week', value: 3, suffix: 'uur' },
        { key: 'uurkost', label: 'Uurkost', value: 80, suffix: 'euro' },
      ],
      priceForPayback: 1950,
      note: 'De uren zoeken per week zijn onze aanname, daar bestaat geen publieke meting van. De achtendertig uur per wedstrijd steunt op het KU Leuven-onderzoek naar nacalculatie van de architectenopdracht (Rutgeerts, 2015, 687 architecten en 1.974 dossiers). De uurkost mag u zeker aanpassen: het EquiLibre-onderzoek (HIVA KU Leuven, 2025) komt op gemiddeld 74,5 euro voor junior- en 87,1 euro voor seniorprofielen, en in een eenmanszaak ligt dat lager.',
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
      note: 'Dit is een bouwprijs. Wij bouwen de Radar samen met vijf Vlaamse bureaus, en die vijf bepalen mee hoe hij werkt. De bouwprijs geldt tot die vijf vol zijn en niet langer dan tot 31 december 2026; daarna gaat de prijs omhoog. Er komt geen abonnement bij: wilt u dat wij de bronnen en de score na drie maanden blijven onderhouden, dan spreken we dat op dat moment af, want vandaag weten wij nog niet wat dat onderhoud echt kost.',
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
        { label: 'Vraag uw gratis Wedstrijd-Terugblik', href: '/architecten/wedstrijd-terugblik' },
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
      a: 'Uw meldingsdienst toont elke opdracht met de juiste code, en wij filteren nooit op één code: dezelfde ontwerpopdracht duikt bij de ene aanbesteder op onder 71200000 en bij de andere onder 71240000. De Radar zegt of er geselecteerd wordt op ontwerp of op omzet en referenties, hoeveel teams doorgaan, wat de eerste ronde u kost en wat ze betaalt. En hij neemt de oproepen mee die niet via de klassieke kanalen lopen. Hebt u al zo’n dienst, dan nemen wij die feed gewoon op als bron.',
    },
    {
      q: 'Waarom staat een opdracht van vier miljoen bouwkost soms niet op TED?',
      a: 'Omdat de Europese drempel op het ereloon slaat en niet op het bouwbudget. Een school van vier miljoen bouwkost met driehonderdvijftigduizend euro ereloon moet Europees bekendgemaakt worden omdat dat ereloon boven de drempel voor diensten ligt, niet omdat de bouwkost hoog is. Ligt het ereloon eronder, dan blijft de opdracht Belgisch en staat ze alleen in het Bulletin. De Radar volgt daarom allebei.',
    },
    {
      q: 'Kan de score fout zitten?',
      a: 'Ja. Een leidraad kan dubbelzinnig zijn, en dan zegt de fiche dat in plaats van een getal te verzinnen. Daarom staat bij elk onderdeel de zin uit de leidraad waarop het steunt, zodat u het in seconden nakijkt, en daarom zitten er drie maanden bijsturing bij. Na een oproep of tien weet het systeem wat u bedoelt met te veel gevraagd.',
    },
    {
      q: 'Werkt dit ook wanneer wij als combinatie indienen, bijvoorbeeld in een tijdelijke maatschap?',
      a: 'Voor het vinden en het scoren wel. De clausules die in dat soort procedures risico bij de ontwerper leggen, wegen zwaar door in de score, en dat is meestal terecht.',
    },
    {
      q: 'Wie ziet ons bureauprofiel?',
      a: 'Alleen uw bureau. Uw omgeving draait apart, op infrastructuur in de Europese Unie. Wij trainen geen modellen op uw gegevens, en de leveranciers die wij inschakelen mogen dat contractueel evenmin. Onze verwerkersovereenkomst en de lijst van subverwerkers, met naam, land en rol, krijgt u bij de offerte.',
    },
  ],
  finalCta: {
    title: 'Eerst zien wat dit op een van uw eigen wedstrijden had gedaan?',
    body: 'Kies één wedstrijd van de laatste twee jaar, gewonnen of verloren. Wij maken de fiche die de Radar toen gemaakt zou hebben en zetten de uren ernaast. Binnen twee werkdagen, zonder gesprek vooraf.',
  },
  seo: {
    title: 'Wedstrijd-Radar voor architecten: elke oproep gescoord · Nivora',
    description:
      'Elke oproep die voor uw Vlaamse architectenbureau in aanmerking komt, elke ochtend in één mail, gescoord op wat ze vraagt tegenover wat ze betaalt. Vaste bouwprijs vanaf €1.950.',
  },
})
