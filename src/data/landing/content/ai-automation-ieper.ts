import { cityPage } from '../cityPage'

/** /ai-automation-ypres · /nl/ai-automatisering-ieper */
export default cityPage({
  geo: {
    city: { en: 'Ypres', nl: 'Ieper' },
    province: { en: 'West Flanders', nl: 'West-Vlaanderen' },
    distanceKm: 55,
    nearby: ['ai-automation-roeselare', 'ai-automation-kortrijk', 'ai-automation-bruges'],
  },
  copy: {
    en: {
      h1: 'AI automation in Ypres, for companies that cannot simply hire their way out',
      subhead:
        'The Westhoek has good businesses and a thin labour market. When the answer to more work cannot be more people, the question becomes which work still needs people.',
      answer:
        'AI automation around Ypres is usually driven by staffing rather than by efficiency: manufacturers, food processors and service businesses in a region where administrative vacancies stay open for months. Nivora, a software and AI studio in Brugge, fifty-five kilometres away, builds systems that absorb the routine work so the roles that remain are the ones people actually want.',
      manifesto:
        'Every hour spent on routine admin is an hour a stretched team does not have, in a region where hiring another pair of hands is not a realistic answer.',
      automations: [
        {
          title: 'Labels and sheets',
          body: 'Allergens, shelf life and composition are checked before the label leaves. Mistakes are expensive here.',
          image: '/landing/auto-ieper-voeding.webp',
          alt: 'A small food workshop with stainless steel tables',
        },
        {
          title: 'Deliveries',
          body: 'Notes from growers are read and matched to the order. No more pile of paper on the desk.',
          image: '/landing/auto-ieper-landbouw.webp',
          alt: 'Flat Flemish farmland with poplars',
        },
        {
          title: 'Site admin',
          body: 'Notes, hours and materials come together per site. The evening admin disappears.',
          image: '/landing/auto-ieper-bouw.webp',
          alt: 'A rural builders yard with stacked blocks',
        },
        {
          title: 'Unfilled role',
          body: 'The routine work from a vacancy you cannot fill gets taken over. The rest fits alongside someone’s role.',
          image: '/landing/auto-ieper-kantoor.webp',
          alt: 'A small country office with a wooden desk',
        },
      ],
      faqs: [
        {
          q: 'We cannot fill an administrative role. Can a system take it over?',
          a: 'Part of it, and being honest about which part matters. The routine, describable work can move to a system; the judgement, the difficult customer call and the exceptions cannot. In practice that often turns an unfillable full role into a manageable part of someone else’s, which is a realistic outcome rather than an optimistic one.',
        },
        {
          q: 'We are in the Westhoek. Is that too far for a Brugge studio?',
          a: 'Fifty-five kilometres, so a comfortable drive and one of the closer projects we take on. The Westhoek is often underserved by technology suppliers precisely because of distance, which is one reason the region tends to be behind on this rather than uninterested in it.',
        },
        {
          q: 'Our team is not technical. Will they be able to work with it?',
          a: 'They have to be able to, or the project has failed regardless of how well it is built. That means the interface has to look like the work rather than like software, and the training has to happen with the people who will actually use it rather than with a manager who will relay it. If a system needs enthusiasm to survive, it will not survive a busy week.',
        },
        {
          q: 'What happens if the person who understands it leaves?',
          a:
            'Nothing should, and that is a fair thing to test before signing anything. The system is handed over with documentation and the code in your possession, and it is built to keep running without maintenance rather than to require a specialist. In a region where filling any technical role is difficult, a system that needs an expert on staff is not a solution, it is another vacancy.',
        },
      ],
      seoTitle: 'AI automation in Ypres · Nivora',
      seoDescription:
        'AI automation for companies in Ypres and the Westhoek facing a tight labour market: absorbing routine administration, supplier documents and reporting. By Nivora, a software and AI studio in Brugge.',
    },
    nl: {
      h1: 'AI-automatisering in Ieper, voor bedrijven die er niet zomaar volk bij kunnen nemen',
      subhead:
        'De Westhoek heeft goede bedrijven en een krappe arbeidsmarkt. Wanneer het antwoord op meer werk niet meer mensen kan zijn, wordt de vraag welk werk nog mensen nodig heeft.',
      answer:
        'AI-automatisering rond Ieper wordt meestal gedreven door personeel in plaats van door efficiëntie: maakbedrijven, voedingsverwerkers en dienstverleners in een regio waar administratieve vacatures maandenlang openstaan. Nivora, een software- en AI-studio in Brugge op vijfenvijftig kilometer, bouwt systemen die het routinewerk opvangen, zodat de functies die overblijven de functies zijn die mensen ook echt willen.',
      manifesto:
        'Elk uur dat naar routineadministratie gaat, is een uur dat een uitgerekt team niet heeft, in een streek waar er nog iemand bij nemen geen realistisch antwoord is.',
      automations: [
        {
          title: 'Etiketten en fiches',
          body: 'Allergenen, houdbaarheid en samenstelling worden gecontroleerd voor het etiket vertrekt. Fouten kosten hier veel.',
          image: '/landing/auto-ieper-voeding.webp',
          alt: 'Een kleine voedingswerkplaats met roestvrijstalen tafels',
        },
        {
          title: 'Leveringen',
          body: 'Bonnen van telers worden gelezen en aan de order gekoppeld. Geen stapel papier meer op het bureau.',
          image: '/landing/auto-ieper-landbouw.webp',
          alt: 'Vlak Vlaams akkerland met populieren',
        },
        {
          title: 'Werfadministratie',
          body: 'Bonnen, uren en materiaal komen samen per werf. De avondadministratie verdwijnt.',
          image: '/landing/auto-ieper-bouw.webp',
          alt: 'Een landelijke bouwwerf met gestapelde blokken',
        },
        {
          title: 'Openstaande functie',
          body: 'Het routinewerk uit een vacature die niet ingevuld raakt, wordt overgenomen. De rest past naast iemands job.',
          image: '/landing/auto-ieper-kantoor.webp',
          alt: 'Een klein plattelandskantoor met houten bureau',
        },
      ],
      faqs: [
        {
          q: 'We krijgen een administratieve functie niet ingevuld. Kan een systeem die overnemen?',
          a: 'Een deel ervan, en eerlijk zijn over welk deel is belangrijk. Het routinematige, beschrijfbare werk kan naar een systeem; het oordeel, het lastige klantgesprek en de uitzonderingen niet. In de praktijk maakt dat van een onvervulbare volledige functie vaak een behapbaar onderdeel van iemand anders zijn job, en dat is een realistische uitkomst in plaats van een optimistische.',
        },
        {
          q: 'Wij zitten in de Westhoek. Is dat te ver voor een Brugse studio?',
          a: 'Vijfenvijftig kilometer, dus een vlotte rit en een van de kortere verplaatsingen die we doen. De Westhoek wordt door technologieleveranciers vaak minder bediend, juist door die afstand, en dat is een van de redenen waarom de regio hierop eerder achterloopt dan dat ze niet geïnteresseerd zou zijn.',
        },
        {
          q: 'Ons team is niet technisch. Zullen zij ermee kunnen werken?',
          a: 'Dat moet, anders is het project mislukt hoe goed het ook gebouwd is. Dat betekent dat het scherm eruit moet zien als het werk in plaats van als software, en dat de opleiding moet gebeuren met de mensen die het echt gaan gebruiken in plaats van met een leidinggevende die het doorgeeft. Heeft een systeem enthousiasme nodig om te overleven, dan overleeft het geen drukke week.',
        },
        {
          q: 'Wat als de persoon die het begrijpt vertrekt?',
          a:
            'Er zou niets mogen gebeuren, en dat is een terechte vraag om te stellen voor u iets tekent. Het systeem wordt overgedragen met documentatie en de code in uw bezit, en het is gebouwd om te blijven draaien zonder onderhoud in plaats van om een specialist te vragen. In een regio waar elke technische functie moeilijk in te vullen is, is een systeem dat een expert in dienst vraagt geen oplossing maar een extra vacature.',
        },
      ],
      seoTitle: 'AI-automatisering in Ieper · Nivora',
      seoDescription:
        'AI-automatisering voor bedrijven in Ieper en de Westhoek met een krappe arbeidsmarkt: routineadministratie, leveranciersdocumenten en rapportering opgevangen. Door Nivora, software- en AI-studio in Brugge.',
    },
  },
})
