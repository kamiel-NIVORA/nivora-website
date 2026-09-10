import { solutionPage } from '../solutionPage'

/**
 * Sectorpagina voor architectenbureaus.
 *
 * Twee dingen sturen deze tekst. Ten eerste dat een architect in België een
 * wettelijke opdracht heeft: controle op de werf hoort erbij en delegeert niet,
 * dus alles wat wij bouwen bereidt voor en beslist niet. Ten tweede dat het
 * ereloon meestal vastligt terwijl het ontwerp blijft schuiven, en dat is waar
 * de uren onzichtbaar weglekken.
 *
 * De rij met oplossingen onderaan komt uit src/data/landing/sectors.ts.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Sectors',
      h1: 'AI automation for architects, from sketch to handover',
      subhead:
        'The fee was agreed on the first sketch, and since then the kitchen has moved twice, the roof structure once and the client has asked for a third variant. We first work out where those hours actually go, and only then what a system can take off your desk.',
      answerH2: 'What does Nivora Works do for an architecture practice?',
      answer:
        'Nivora Works is a software and AI studio in Bruges that takes over the administrative half of an architecture practice: counting the quantities out of your own drawing, writing up a site meeting the same afternoon it happened, checking a permit file against what actually has to be in it, and knowing per project how many hours have gone in against the fee that was agreed. Your drawing software stays your drawing software. Whether you work in ArchiCAD, Revit, BricsCAD out of Ghent, Vectorworks or SketchUp, we read what comes out of it and we do not ask you to draw anywhere else.',
      answerDetail: [
        'We are not going to redesign your design process. What happens between the sketch and the permit is the part your practice is actually good at, and there is no system that improves it. The part we take is what happens around it, and that part is nearly the same in every office we have seen.',
        'We start with one thing. In most practices that is the take-off out of the drawing or the site report, because both of those are evening work and both of them are exactly the same work every time. You watch it run for a fortnight before anything else is added.',
      ],
      manifesto:
        'An architect is paid for the design. Everything measured, typed and chased around it is somebody else\'s work.',
      problemH2: 'Where the hours go',
      problem: [
        'The fee is set early and the design keeps moving. A client who wants to see a third variant, a structural engineer whose beam changes the ceiling height, an official remark in the permit procedure that shifts the facade: each of those is reasonable on its own and none of them was in the figure you quoted. By the time the file goes out, nobody at the practice can still say what that project actually cost you.',
        'After every site meeting there is a report to write. Who was there, what was decided, what the contractor has to have ready by the next meeting, and which point has now been open for three meetings running. Written the same day it is worth something; written on Friday for three meetings at once it is a list of things half-remembered, and it is exactly the document you reach for when there is a discussion later.',
        'A take-off out of your own drawing is two evenings of counting. The drawing already knows how many square metres of screed, how many running metres of skirting and how many window openings there are, and somebody counts them again by hand because getting them out is more work than counting. Then the client asks what it costs if the kitchen moves a metre, and it starts over.',
      ],
      pillarsH2: 'How we go about it',
      pillars: [
        {
          title: 'Look at one running project',
          body: 'Not a workshop and not a survey, but one project that is somewhere between permit and handover right now. We go through the correspondence, the site reports and the hours with you and mark where the same work happens twice. In most practices two of the four things on this page fall away immediately because the office already has them covered.',
        },
        {
          title: 'Beside your drawing software',
          body: 'ArchiCAD, Revit, BricsCAD, Vectorworks or SketchUp stays where the model lives. We read what comes out of it and write nothing back into it, because a system that quietly edits a drawing is a system nobody can trust. What we make lands as a list, a document or a sheet, in the place your people already look.',
        },
        {
          title: 'Nothing that decides on the works',
          body: 'Your supervision on site is a legal duty and it carries personal liability, so no system is going to approve, reject or accept anything. What we build writes down what was said, flags what is still open and compares against what was agreed. The judgement on the works stays with the architect who has to sign for it.',
        },
      ],
      signals: [
        'You measure up a quantity list by hand while the drawing already contains it',
        'Site reports get written on Friday for three meetings at once',
        'Nobody can say what that project has cost the practice in hours',
        'A permit file goes back because one annex was missing',
      ],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say architects have no software. ArchiCAD, Revit, Vectorworks and BricsCAD do the drawing, there are Belgian packages that do the project administration and the hours, and BIM has been doing quantities out of the model for years in the practices that work that way. If your model already gives you a clean take-off, you do not need us for it and we will say so.',
        'We are not going to say a model can design. It cannot, and it is not close. What it can do is count, sort, compare against a list and write up what was said, and that happens to be most of what keeps an architect at his desk after six.',
        'And we are not going to say the permit comes back faster. The procedure has its terms, an advisory body answers when it answers, and a public inquiry runs for as long as it runs. What changes is that a file does not come back because an annex was missing.',
      ],
      faqs: [
        {
          q: 'Does this work with the way we draw?',
          a: 'That is the first thing we check. If you model in ArchiCAD, Revit or BricsCAD there is structured information in the file and a take-off comes out cleanly. If you draw in two dimensions the yield is lower and we say so before we build anything, rather than delivering a quantity list you cannot rely on. We would rather tell you in week one that this is not for you.',
        },
        {
          q: 'Who is liable if a quantity is wrong?',
          a: 'You are, and that is why every figure comes with the place in the drawing it came from, so a check takes seconds instead of a re-count. What the drawing does not unambiguously contain is not estimated but flagged as a question. A quantity list that silently fills in a gap is worse than one that leaves it open, because you find out about it at tender stage.',
        },
        {
          q: 'Does this touch our supervision on site?',
          a: 'No. Your supervision is a legal duty with personal liability attached, and no system is going to approve, reject or accept anything. What we build writes up what was said, carries the open points forward and compares them with what was agreed. What that means for the works is your judgement, exactly as it is now.',
        },
        {
          q: 'We are two architects and a draughtsman. Is this not for large practices?',
          a: 'The two evenings that go into a take-off are the same two evenings whether you are two or twenty, and in a small practice they come out of your own week. We start with one thing and it has to earn its place within a fortnight. If it turns out your projects are too varied for it to pay off, we say that and stop.',
        },
      ],
      featuresTitle: 'What does Nivora Works do for an architecture practice?',
      featuresSubtitle:
        'The fee was agreed on the first sketch, and since then the kitchen has moved twice, the roof structure once and the client has asked for a third variant. We first work out where those hours actually go, and only then what a system can take off your desk.',
      ctaTitle: 'Send us one drawing',
      ctaBody:
        'Take one project you are working on and the last three site reports from it. We will tell you within the week what we would get out of that drawing and where it would fall short, with nothing agreed.',
      seoTitle: 'AI automation for architecture practices in Flanders · Nivora Works',
      seoDescription:
        'Nivora Works in Bruges takes over the administrative half of an architecture practice: quantities out of your own drawing, site reports the same day, permit files checked against what they need, and hours against the fee that was agreed.',
    },
    nl:
    {
      eyebrow: 'Sectoren',
      h1: 'AI-automatisering voor architectenbureaus die wedstrijden doen',
      subhead:
        'Een kandidatuur kost een bureau gemiddeld achtendertig uur, zonder ontwerpwerk. Doet u er tien per jaar, dan is dat tien werkweken die u weggeeft voor er ook maar één opdracht is. Wij nemen daar drie stukken van over.',
      answerH2: 'Wat doet Nivora Works voor een wedstrijdbureau?',
      answer:
        'Nivora Works is een software- en AI-studio in Brugge die het werk rond een architectuurwedstrijd overneemt, behalve het ontwerp. Wij vinden de oproepen die bij uw bureau passen en scoren ze op wat ze vragen tegenover wat ze betalen, wij maken het kandidatuurdossier op uit uw eigen referenties en attesten, en wij houden per wedstrijd bij wat de deelname gekost en opgebracht heeft. Het ontwerpend onderzoek en de visienota blijven van u; daar komt geen systeem aan.',
      answerDetail: [
        'Wij gaan uw ontwerpproces niet hertekenen. Wat er tussen de schets en de vergunning gebeurt, is net waar uw bureau goed in is, en daar bestaat geen systeem voor dat het beter maakt. Wat wij overnemen is wat eromheen hangt, en dat is in zowat elk bureau dat wij gezien hebben hetzelfde.',
        'Wij starten met één ding. In de meeste bureaus is dat de meetstaat uit het plan of het werfverslag, want allebei zijn het avondwerk en allebei zijn ze elke keer precies hetzelfde werk. Dat laat u veertien dagen meelopen voor er iets bijkomt.',
      ],
      manifesto:
        'Een architect wordt betaald voor het ontwerp. De weken die aan een kandidatuur voorafgaan, betaalt niemand.',
      problemH2: 'Waar de weken heen gaan',
      problem: [
        'Elke kandidatuur vraagt hetzelfde en wordt elke keer opnieuw gemaakt. Het aanbestedingsdocument, drie referenties in het formaat van deze opdrachtgever, de cv’s van het team, de attesten, en een nota waarom dit team voor deze opgave. Het meeste daarvan schreef u vorige keer ook al, alleen ligt het verspreid over vijf mappen en twee laptops.',
        'Zoeken kost drie uur per week, en dat is het kleinste verlies. Het grootste is de ene wedstrijd per jaar waar u aan begint omdat ze er nu eenmaal is, en waarvan achteraf iedereen wist dat ze niet paste: gevelbeelden gevraagd in de eerste ronde, twaalf kandidaten, geen biedvergoeding.',
        'En na afloop schrijft niemand op wat het gekost heeft. Daardoor weet het bureau na vijf jaar nog altijd niet bij welk soort opdrachtgever het wint en bij welk soort het structureel geld verliest.',
      ],
      pillarsH2: 'Hoe wij te werk gaan',
      pillars: [
        {
          title: 'Meekijken op één lopend project',
          body: 'Geen workshop en geen vragenlijst, maar één project dat vandaag ergens tussen vergunning en oplevering zit. Wij lopen de briefwisseling, de werfverslagen en de uren met u door en tekenen aan waar hetzelfde werk twee keer gebeurt. In de meeste bureaus vallen twee van de vier dingen op deze pagina meteen weg omdat het bureau ze al opgelost heeft.',
        },
        {
          title: 'Naast uw tekensoftware',
          body: 'ArchiCAD, Revit, BricsCAD, Vectorworks of SketchUp blijft de plek waar het model leeft. Wij lezen wat eruit komt en schrijven er niets in terug, want een systeem dat stilzwijgend een plan aanpast, is een systeem dat niemand kan vertrouwen. Wat wij maken komt terecht als een lijst, een document of een blad, op de plek waar uw mensen toch al kijken.',
        },
        {
          title: 'Niets dat over de werken beslist',
          body: 'Uw controle op de werf is een wettelijke opdracht met persoonlijke aansprakelijkheid eraan vast, dus geen enkel systeem gaat iets goedkeuren, afkeuren of aanvaarden. Wat wij bouwen schrijft op wat er gezegd is, meldt wat er openblijft en vergelijkt met wat afgesproken was. Het oordeel over de werken blijft bij de architect die ervoor moet tekenen.',
        },
      ],
      signals: [
        'Een kandidatuur kost het bureau twee weken, ontwerp niet meegerekend',
        'De oproep die het best paste, stond op een site die niemand volgt',
        'Op de laatste dag blijkt een attest van een partner vervallen',
        'Achteraf wist iedereen dat we die wedstrijd niet hadden moeten doen',
      ],
      offersH2: 'Drie dingen die wij bouwen, en één die gratis is',
      offersIntro:
        'Elk stuk staat op zichzelf, met de prijs op de pagina. Begin waar uw week het meest aan lekt; de andere twee passen er later naast.',
      offers: [
        {
          title: 'Wedstrijd-Radar',
          body: 'Elke oproep die voor uw bureau in aanmerking komt, elke ochtend in één mail, gescoord op wat ze vraagt tegenover wat ze betaalt, met een go of no-go-fiche per stuk. Vanaf €1.950, eenmalig.',
          image: '/landing/card-radar.webp',
          alt: 'Een witte kartonnen maquette van een schoolgebouw op een lichte houten tafel in strijklicht',
          href: '/architecten/wedstrijd-radar',
        },
        {
          title: 'Kandidatuur-Machine',
          body: 'De selectieleidraad erin, het dossier eruit: referentiefiches in het gevraagde formaat, cv\u2019s, attesten, en een lijst van wat er nog ontbreekt voor u indient. Vanaf €3.900, eenmalig.',
          image: '/landing/card-machine.webp',
          alt: 'Een lange lichte tafel met drie gelijke stapels blanco vellen en een opengevouwen plan ernaast',
          href: '/architecten/kandidatuur-machine',
        },
        {
          title: 'Intelligence',
          body: 'Wie deze opdrachtgever eerder koos, waar de punten in de gunning liggen, en wat elke wedstrijd uw bureau tot nu toe gekost en opgeleverd heeft. Vanaf €2.900, eenmalig.',
          image: '/landing/card-intel.webp',
          alt: 'Iemand bekijkt van achteren een rij witte maquettes op een lange plank tegen een witte muur',
          href: '/architecten/wedstrijd-intelligence',
        },
        {
          title: 'Gratis: de Terugblik',
          body: 'Nog niet zeker of dit bij uw bureau past? Kies één wedstrijd van de laatste twee jaar en wij spelen hem terug: wat het kostte, en wat een systeem eraan gescheeld had. Binnen twee werkdagen, zonder gesprek vooraf.',
          image: '/landing/arch-zaal.webp',
          alt: 'Een lege vergaderzaal met een lange houten tafel en daglicht over de daken',
          href: '/architecten/wedstrijd-terugblik',
        },
        {
          title: 'De Cockpit',
          body: 'De drie samen in één omgeving in uw huisstijl, met één bureauprofiel eronder. €7.500 in plaats van €8.750, en zes maanden bijsturing in plaats van drie.',
          image: '/landing/card-cockpit.webp',
          alt: 'Het glazen atrium van een hedendaags openbaar gebouw met daglicht van boven en twee mensen ver weg',
          href: '/architecten/wedstrijd-cockpit',
        },
      ],
      outcomesH2: 'Wat wij niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat architecten geen software hebben. ArchiCAD, Revit, Vectorworks en BricsCAD doen het tekenwerk, er bestaan Belgische pakketten die de projectadministratie en de uren bijhouden, en BIM haalt in bureaus die zo werken al jaren hoeveelheden uit het model. Geeft uw model u vandaag al een propere meetstaat, dan hebt u ons daar niet voor nodig en zeggen wij dat.',
        'Wij gaan niet zeggen dat een model kan ontwerpen. Dat kan het niet, en het zit er niet dicht bij. Wat het wel kan is tellen, ordenen, vergelijken met een lijst en uitschrijven wat er gezegd is, en dat is toevallig het meeste van wat een architect na zessen aan zijn bureau houdt.',
        'En wij gaan niet zeggen dat de vergunning sneller terugkomt. De procedure heeft haar termijnen, een adviesinstantie antwoordt wanneer ze antwoordt, en een openbaar onderzoek loopt zolang het loopt. Wat verandert is dat een dossier niet terugkomt omdat er een bijlage ontbrak.',
      ],
      faqs: [
        {
          q: 'Werkt dit met de manier waarop wij tekenen?',
          a: 'Dat is het eerste wat wij nakijken. Modelleert u in ArchiCAD, Revit of BricsCAD, dan zit er gestructureerde informatie in het bestand en komt een meetstaat er netjes uit. Tekent u in twee dimensies, dan is de opbrengst lager en zeggen wij dat voor wij iets bouwen, in plaats van u een meetstaat te leveren waarop u niet kunt bouwen. Wij zeggen liever in week één dat dit niets voor u is.',
        },
        {
          q: 'Wie is aansprakelijk als een hoeveelheid fout is?',
          a: 'U, en daarom staat bij elk cijfer de plek in het plan waar het vandaan komt, zodat nakijken seconden kost in plaats van een hertelling. Wat het plan niet ondubbelzinnig bevat, wordt niet geschat maar als vraag gemeld. Een meetstaat die stilzwijgend een gat invult, is slechter dan een die het openlaat, want u komt het pas bij de aanbesteding te weten.',
        },
        {
          q: 'Raakt dit aan onze controle op de werf?',
          a: 'Nee. Uw controle is een wettelijke opdracht met persoonlijke aansprakelijkheid eraan vast, en geen enkel systeem gaat iets goedkeuren, afkeuren of aanvaarden. Wat wij bouwen schrijft uit wat er gezegd is, neemt de openstaande punten mee en legt ze naast wat afgesproken was. Wat dat voor de werken betekent, is uw oordeel, precies zoals vandaag.',
        },
        {
          q: 'Wij zijn met twee architecten en een tekenaar. Is dit niet voor grote bureaus?',
          a: 'De twee avonden die in een meetstaat kruipen zijn dezelfde twee avonden of u nu met twee of met twintig bent, en in een klein bureau komen ze uit uw eigen week. Wij starten met één ding en het moet binnen de veertien dagen zijn plaats verdienen. Blijkt uw projectenmix te wisselend om het te laten renderen, dan zeggen wij dat en stoppen wij.',
        },
      ],
      featuresTitle: 'Wat doet Nivora Works voor een wedstrijdbureau?',
      featuresSubtitle:
        'Het ereloon lag vast bij de eerste schets, en sindsdien is de keuken twee keer verschoven, de dakstructuur één keer en vraagt de bouwheer een derde variant. Wij kijken eerst waar die uren echt blijven hangen, en pas daarna wat een systeem van uw bureau kan wegnemen.',
      ctaTitle: 'Begin met één wedstrijd, niet met een offerte',
      ctaBody:
        'Kies er een van de laatste twee jaar, gewonnen of verloren. Wij zoeken de leidraad en de gunning op, zetten de tijdlijn op een rij, en tonen wat een systeem eraan gescheeld had, in uren en in euro. Binnen twee werkdagen, zonder gesprek vooraf.',
      seoTitle: 'AI-automatisering voor architectenbureaus in Vlaanderen · Nivora Works',
      seoDescription:
        'Nivora Works uit Brugge neemt de administratieve helft van een architectenbureau over: hoeveelheden uit uw plan, werfverslagen dezelfde dag, en uren tegenover het ereloon. En voor wedstrijdbureaus: oproepen gescoord, kandidaturen opgemaakt, cijfers per wedstrijd.',
    },
  },
  { hero: '/landing/arch-gebouw.webp', manifesto: '/landing/arch-atelier.webp' },
)
