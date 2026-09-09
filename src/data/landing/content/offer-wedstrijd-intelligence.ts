import { nlOnlyPage, TERUGBLIK_CTA, TERUGBLIK_HREF } from '../offerPage'

/**
 * Wedstrijd-Intelligence en Cijfers: wie u tegenover u hebt, en wat het kostte.
 *
 * Het onderdeel dat het minste uren bespaart en het meeste kan opleveren, want
 * het raakt de winratio en niet de administratie. Precies daarom is dit ook de
 * pagina waar het makkelijkst te ver gegaan wordt. Ze belooft nergens winst, ze
 * zegt uitdrukkelijk dat ze niets weet wat niet publiek is, en de rekenmodule
 * toont een scenario en geen voorspelling.
 */
export default nlOnlyPage({
  hero: {
    eyebrow: 'Aanbod voor architectenbureaus',
    h1: 'Wedstrijd-Intelligence en Cijfers, weet vooraf wie u tegenover u hebt',
    subhead:
      'Wie vaak wint, tekent zelden beter dan de rest. Hij zoekt vooraf uit wie deze opdrachtgever eerder koos en waar de punten liggen, en hij schrijft achteraf op wat de deelname gekost heeft. Dat is geen ontwerpwerk, het is opzoekwerk en boekhouding, en het is precies wat in een druk bureau blijft liggen.',
    primaryCta: TERUGBLIK_CTA,
  },
  manifesto:
    'Elk bureau weet welke wedstrijden het won. Bijna geen enkel weet wat de verloren wedstrijden gekost hebben.',
  heroImage: '/landing/auto-opl-marge-a.webp',
  manifestoImage: '/landing/auto-opl-kennis-a.webp',
  blocks: [
    {
      kind: 'answer',
      h2: 'Wat doet Wedstrijd-Intelligence en Cijfers?',
      answer:
        'Wedstrijd-Intelligence en Cijfers is een systeem van Nivora Works dat per oproep uit publieke bronnen samenvat wie de opdrachtgever eerder koos en welke thema’s in zijn projectdefinities terugkeren, daaruit een briefing van één blad maakt voor het ontwerpteam, en per wedstrijd bijhoudt wat de deelname aan uren kostte tegenover wat ze opbracht. Na een handvol wedstrijden ziet een bureau waar het wint en waar het structureel geld verliest.',
      detail: [
        'Dit onderdeel bespaart de minste uren van de vier en kan het meeste opleveren, want het raakt niet de administratie maar de vraag of u aan de juiste wedstrijden meedoet.',
      ],
    },
    {
      kind: 'pillars',
      h2: 'Voor wie dit is, en voor wie niet',
      items: [
        {
          title: 'Wel',
          body: 'Bureaus die al meedoen, zes of meer keer per jaar, en die willen weten waarom ze winnen of verliezen in plaats van het te vermoeden.',
        },
        {
          title: 'Niet',
          body: 'Wie net begint. Dan is er nog niets om op terug te kijken, en is de Radar de betere eerste stap. Dat zeggen wij liever nu dan na de factuur.',
        },
      ],
    },
    {
      kind: 'steps',
      h2: 'Wat het precies doet',
      steps: [
        {
          phase: 'Bij elke go',
          title: 'Het opdrachtgeversprofiel',
          body: 'Wie is deze opdrachtgever, welke ontwerpers werden bij zijn vorige opdrachten geselecteerd en aangesteld, welke thema’s en woorden keren terug in zijn projectdefinities, en kiest hij eerder jonge of gevestigde bureaus. Twee bladzijden, te lezen in vijf minuten, opgebouwd uit wat publiek gepubliceerd is.',
        },
        {
          phase: 'Voor de eerste schets',
          title: 'De briefing voor de ontwerpers',
          body: 'Waar de punten liggen, in welke volgorde, en welke ambities de opdrachtgever letterlijk benoemt. Met daarbij wat er niet gevraagd wordt, want daar gaat het meeste verloren werk naartoe: een uitgewerkt plan waar om een visie op fasering gevraagd was.',
        },
        {
          phase: 'Na elke indiening',
          title: 'De nacalculatie',
          body: 'De uren per ronde, de vergoeding die ertegenover stond, het resultaat, en bij winst het ereloon. Hebt u urenregistratie, dan komt het daaruit. Hebt u die niet, dan vult iemand het na afloop in tien minuten in.',
        },
        {
          phase: 'Per kwartaal',
          title: 'Het beeld op één scherm',
          body: 'Winratio per type opdrachtgever, per schaal, per regio en per procedure. Wat een verloren wedstrijd u gemiddeld kost. Welke oproepen u achteraf niet meer zou doen, en welke u vaker zou moeten doen. Eén scherm voor de bureauvergadering.',
        },
        {
          phase: 'Terug naar het begin',
          title: 'De terugkoppeling',
          body: 'Elk resultaat voedt de score van de Radar, als u die hebt. Een opdrachtgever waar u drie keer verloor, weegt daarna anders. En de Machine leert welke referenties in welk soort selectie doorgingen.',
        },
      ],
    },
    {
      kind: 'prose',
      h2: 'Wat het niet doet',
      body: [
        'Het belooft geen winst, en het weet niets wat niet publiek is. Geen namen van juryleden die nergens gepubliceerd zijn, geen interne verslagen, geen inside-informatie. Waar een bron ontbreekt, staat er dat de bron ontbreekt.',
        'En het zegt niet hoe u moet ontwerpen. Het zegt waar de punten liggen. Wat u daarmee doet, is het werk waarvoor u betaald wordt.',
      ],
    },
    {
      kind: 'calculator',
      h2: 'Wat een hogere winratio waard is',
      intro:
        'Dit is een scenario en geen voorspelling: het rekent uit wat een verschuiving in uw winratio zou betekenen, niet dat die er komt.',
      formula: 'winratio',
      fields: [
        { key: 'wedstrijden', label: 'Wedstrijden per jaar', value: 12, suffix: 'per jaar' },
        { key: 'ereloon', label: 'Gemiddeld ereloon bij winst', value: 200000, suffix: 'euro' },
      ],
      note: 'Reken met uw eigen ereloon en uw eigen aantal. Het getal dat eruit komt is wat een hogere winratio zou opleveren, en dus wat het waard is om uit te zoeken waarom u verliest.',
    },
    {
      kind: 'price',
      h2: 'Prijs en oplevering',
      amount: '€2.900',
      qualifier: 'eenmalig, excl. btw',
      terms: [
        'De helft bij de start, de helft bij oplevering. Tien werkdagen.',
        'Vraagt de Radar of de Machine als basis, want daar worden het bureauprofiel en de omgeving gebouwd. Los ervan komt er €500 bij voor die basis.',
        'Wij voeren uw wedstrijden van de laatste drie jaar in, op basis van uw lijst.',
        'Drie maanden bijsturing, met één kwartaalreview.',
      ],
      note: 'Bouwprijs voor de eerste vijf bureaus. Geen abonnement.',
    },
    {
      kind: 'checklist',
      h2: 'Wat wij van u nodig hebben',
      items: [
        'Een lijst van uw wedstrijden van de laatste drie jaar, met het resultaat.',
        'De uren erbij, als u ze hebt.',
        'Toegang tot uw urenregistratie als die er is. Eén uur van uw tijd.',
      ],
    },
    {
      kind: 'linkGrid',
      h2: 'Past hierbij',
      links: [
        { label: 'De Wedstrijd-Radar', href: '/architecten/wedstrijd-radar' },
        { label: 'De Kandidatuur-Machine', href: '/architecten/kandidatuur-machine' },
        { label: 'Alle drie samen in de Cockpit', href: '/architecten/wedstrijd-cockpit' },
        { label: 'AI voor architectenbureaus', href: '/ai-automation-architect' },
      ],
    },
  ],
  faq: [
    {
      q: 'Is dit niet gewoon de publieke archieven doorbladeren?',
      a: 'Dat, plus de gepubliceerde gunningen, plus de aankondigingen van de gemeenten waar u werkt, plus uw eigen cijfers, en dan bij elke oproep automatisch naast elkaar gelegd. Het doorbladeren is precies wat u vandaag niet doet, omdat er geen tijd voor is op het moment dat het zou helpen.',
    },
    {
      q: 'Wij registreren onze uren niet per wedstrijd.',
      a: 'Dan vult iemand na elke indiening tien minuten in: wie eraan werkte en hoeveel dagen. Na zes wedstrijden hebt u meer cijfers over uw eigen deelnames dan de meeste bureaus ooit gehad hebben.',
    },
    {
      q: 'Duwt zo’n briefing het ontwerp niet richting wat de jury verwacht, en dus naar middelmaat?',
      a: 'De briefing zegt wat gevraagd wordt en wat gewogen wordt. Verrassen mag, en de bureaus die winnen doen dat ook. Maar ze verrassen binnen de criteria en niet ernaast. Dat verschil kennen voor u begint, is het hele punt.',
    },
    {
      q: 'Hoe hard zijn de cijfers over de opdrachtgever?',
      a: 'Zo hard als wat er publiek gepubliceerd is, en niet harder. Bij elk gegeven staat waar het vandaan komt en van wanneer het dateert. Waar wij niets vonden, staat dat er, want een leeg vakje is bruikbaarder dan een ingevuld vakje waar u niet op kunt bouwen.',
    },
  ],
  finalCta: {
    title: 'Zien wat dit bij een verloren wedstrijd had opgeleverd?',
    body: 'Kies er een die u verloor. Wij maken het opdrachtgeversprofiel en de briefing zoals ze er toen uitgezien hadden, en u beoordeelt zelf of het iets veranderd zou hebben.',
  },
  related: [{ label: 'Vraag uw Wedstrijd-Terugblik', href: TERUGBLIK_HREF }],
  seo: {
    title: 'Wedstrijd-Intelligence: wie won, en wat het kostte · Nivora',
    description:
      'Wie deze opdrachtgever eerder koos, waar de punten in de gunning liggen, en wat elke wedstrijd uw bureau kostte en opbracht. Voor Vlaamse architectenbureaus, vanaf €2.900.',
  },
})
