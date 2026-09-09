import { nlOnlyPage, TERUGBLIK_CTA } from '../offerPage'

/**
 * De Wedstrijd-Cockpit: de drie onderdelen in één omgeving.
 *
 * De vergelijkende pagina, en dus de plek waar de doorstreepte prijs staat. Die
 * mag alleen staan omdat er ook echt drie losse prijzen naast staan die samen
 * meer zijn; een korting op een prijs die nergens anders bestaat, is een
 * verzonnen korting.
 *
 * De garantie onderaan is bewust smal en meetbaar geformuleerd. Een belofte die
 * niet te meten is, is voor de klant niets waard en voor een eenmanszaak een
 * open einde.
 */
export default nlOnlyPage({
  hero: {
    eyebrow: 'Aanbod voor architectenbureaus',
    h1: 'De Wedstrijd-Cockpit, alles rond de wedstrijd behalve het ontwerp',
    subhead:
      'Vinden, kiezen, indienen, leren. Vier tabbladen in één omgeving in uw huisstijl, gevoed door één bureauprofiel. Wie op de Radar begint heeft de basis al liggen; wie alles ineens neemt betaalt minder en krijgt zes maanden bijsturing in plaats van drie.',
    primaryCta: TERUGBLIK_CTA,
  },
  manifesto:
    'Vier losse hulpmiddelen die niets van elkaar weten, is vier keer hetzelfde opnieuw invoeren.',
  heroImage: '/landing/auto-opl-meetstaat-a.webp',
  manifestoImage: '/landing/auto-sec-architect-b.webp',
  blocks: [
    {
      kind: 'answer',
      h2: 'Wat is de Wedstrijd-Cockpit?',
      answer:
        'De Wedstrijd-Cockpit is de omgeving waarin Nivora Works de Wedstrijd-Radar, de Kandidatuur-Machine en Wedstrijd-Intelligence samen oplevert voor één architectenbureau, met één gedeeld bureauprofiel en één gedeeld bureaugeheugen eronder. Wie in de Radar op go klikt, ziet de leidraad meteen bij de kandidaturen staan en het opdrachtgeversprofiel ernaast; het resultaat gaat terug naar de cijfers en weegt mee in de volgende score.',
      detail: [
        'Dat is het hele verschil met drie losse aankopen: de onderdelen voeden elkaar in plaats van dat u dezelfde gegevens drie keer invoert.',
      ],
    },
    {
      kind: 'pillars',
      h2: 'De vier tabbladen',
      items: [
        { title: 'Radar', body: 'Elke oproep gescoord, een go/no-go-fiche per stuk, en de deadlines in de agenda die het bureau al gebruikt.' },
        { title: 'Kandidaturen', body: 'De leidraad erin, het concept-dossier eruit, en een controle op wat ontbreekt voor u indient.' },
        { title: 'Intelligence', body: 'Het opdrachtgeversprofiel en de briefing voor het ontwerpteam, per oproep, uit publieke bronnen.' },
        { title: 'Cijfers', body: 'Uren, vergoeding en winratio per wedstrijd en per type opdrachtgever, op één scherm voor de bureauvergadering.' },
      ],
    },
    {
      kind: 'compare',
      h2: 'De onderdelen naast elkaar',
      columns: ['Radar', 'Machine', 'Intelligence', 'Cockpit'],
      rows: [
        { label: 'Prijs, eenmalig', values: ['€1.950', '€3.900', '€2.900', '€7.500'] },
        { label: 'Oplevering in werkdagen', values: ['10', '15', '10', '25'] },
        { label: 'Bijsturing', values: ['3 maanden', '3 maanden', '3 maanden', '6 maanden'] },
        { label: 'Kwartaalreview', values: ['geen', 'geen', '1', '2'] },
        { label: 'Grootste hefboom', values: ['de verkeerde wedstrijd vermijden', 'geen vormfout, geen twee weken', 'winratio', 'alle drie'] },
      ],
    },
    {
      kind: 'steps',
      h2: 'Zo verloopt het bouwproject',
      steps: [
        { phase: 'Week 1', title: 'Intake', body: 'Eén uur. Wij nemen uw map met eerdere kandidaturen mee en uw lijst van wedstrijden van de laatste jaren.' },
        { phase: 'Week 2', title: 'Radar live', body: 'De eerste ochtendmails komen binnen en u zegt wat er wel en niet had mogen doorkomen. Dat is meteen de eerste bijsturing.' },
        { phase: 'Week 3 en 4', title: 'Kandidaturen live', body: 'Met uw geheugen erin. De eerste leidraad doen we samen door, zodat u ziet waar de Machine gokt en waar ze zwijgt.' },
        { phase: 'Week 5', title: 'Intelligence en Cijfers live', body: 'Met uw laatste drie jaar ingevoerd, zodat het eerste kwartaalbeeld er meteen staat in plaats van over een jaar.' },
        { phase: 'Maand 2 tot 6', title: 'Bijsturing', body: 'Elk half uur per maand, en een review op het einde van maand drie en maand zes met de cijfers erbij.' },
      ],
    },
    {
      kind: 'prose',
      h2: 'Wat de Cockpit niet is',
      body: [
        'Geen tekensoftware, geen projectbeheer, en geen urenpakket dat u moet vervangen. Wat u vandaag gebruikt om te tekenen en om uren te registreren blijft staan; de Cockpit leest wat eruit komt.',
        'En geen abonnement. U koopt een bouwproject met een vaste prijs, en na de bijsturingsperiode is de omgeving van u.',
      ],
    },
    {
      kind: 'price',
      h2: 'Prijs',
      amount: '€7.500',
      was: '€8.750',
      qualifier: 'eenmalig, excl. btw',
      terms: [
        'Veertig procent bij de start, dertig na oplevering van Radar en Kandidaturen, dertig bij de volledige oplevering.',
        'Zes maanden bijsturing en twee kwartaalreviews.',
        'Vijfentwintig werkdagen tot alles staat.',
      ],
      note: 'De doorgestreepte prijs is de som van de drie onderdelen apart, en die drie zijn los te koop. Wij bouwen de Cockpit in 2026 met vijf Vlaamse bureaus van vijf tot vijftien mensen. In ruil voor de bouwprijs vragen wij twee feedbacksessies en, als het werkt, één case met cijfers voor deze website. Alleen als u dat dan zelf wil.',
    },
    {
      kind: 'calculator',
      h2: 'Reken het na met uw eigen cijfers',
      intro: 'Alle drie de onderdelen samen, tegen wat wedstrijden u vandaag kosten.',
      formula: 'urenPerJaar',
      fields: [
        { key: 'aantal', label: 'Wedstrijden per jaar', value: 12, suffix: 'per jaar' },
        { key: 'urenPer', label: 'Uren per wedstrijd, zonder ontwerp', value: 26, suffix: 'uur' },
        { key: 'urenWeek', label: 'Uren zoeken en opzoeken per week', value: 4, suffix: 'uur' },
        { key: 'uurkost', label: 'Uurkost', value: 80, suffix: 'euro' },
      ],
      priceForPayback: 7500,
      note: 'De standaardwaarden zijn onze schatting. Wij hebben er geen publiek sectoronderzoek voor gevonden, en dan is het beter om u zelf te laten rekenen.',
    },
    {
      kind: 'linkGrid',
      h2: 'De onderdelen apart',
      links: [
        { label: 'Vraag uw gratis Wedstrijd-Terugblik', href: '/architecten/wedstrijd-terugblik' },
        { label: 'De Wedstrijd-Radar', href: '/architecten/wedstrijd-radar' },
        { label: 'De Kandidatuur-Machine', href: '/architecten/kandidatuur-machine' },
        { label: 'Wedstrijd-Intelligence en Cijfers', href: '/architecten/wedstrijd-intelligence' },
        { label: 'AI voor architectenbureaus', href: '/ai-automation-architect' },
      ],
    },
  ],
  faq: [
    {
      q: 'Kunnen wij met één onderdeel starten en later uitbreiden?',
      a: 'Ja. Elk onderdeel bouwt de omgeving en het profiel die de andere gebruiken, dus er gaat niets verloren. U betaalt dan wel de losse prijzen en de bijsturing loopt per onderdeel.',
    },
    {
      q: 'Wat als het na drie maanden niet doet wat hier staat?',
      a: 'Dan spreken we vooraf één meetbaar punt af per onderdeel, met uw eigen uren als maatstaf en een datum erbij. Halen we dat niet, dan bouwen wij door zonder extra kosten tot het wel zo is. De eerste schijf dekt bouwwerk dat dan al gedaan is; dat zeggen wij liever nu dan achteraf.',
    },
    {
      q: 'Wat gebeurt er na zes maanden?',
      a: 'De omgeving blijft draaien en is van u. Wilt u dat wij de bronnen, de score en de bewaking van uw attesten blijven onderhouden, dan spreken we op dat moment een maandbedrag af. Wij leggen dat nu niet vast, omdat wij vandaag nog niet weten wat het onderhoud bij vijf bureaus echt kost, en een te vroege prijs is meestal een verkeerde.',
    },
    {
      q: 'Waarom maar vijf bureaus?',
      a: 'Omdat wij deze onderdelen samen met die vijf bouwen en niet voor hen. Dat vraagt tijd per bureau die er bij twintig niet is, en het is de reden dat de prijs een bouwprijs is en geen productprijs.',
    },
  ],
  finalCta: {
    title: 'Begin met één wedstrijd in plaats van met een offerte',
    body: 'Kies er een van de laatste twee jaar. Wij spelen hem terug zoals hij met de Cockpit gelopen had, en u ziet zelf of het klopt voor uw bureau.',
  },
  seo: {
    title: 'Wedstrijd-Cockpit voor architectenbureaus · Nivora',
    description:
      'Radar, Kandidatuur-Machine en Intelligence in één omgeving in uw huisstijl. €7.500 in plaats van €8.750, zes maanden bijsturing, gebouwd met vijf Vlaamse bureaus.',
  },
})
