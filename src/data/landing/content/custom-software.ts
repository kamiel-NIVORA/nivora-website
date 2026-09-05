import { solutionPage } from '../solutionPage'

/** /custom-software · /nl/software-op-maat */
export default solutionPage({
  en: {
    eyebrow: 'Custom software',
    h1: 'Custom software for the part of your business no package fits',
    subhead:
      'Most companies run fine on standard tools until they hit the one process that makes them different. That is usually the process worth building for.',
    answerH2: 'When is custom software the right answer?',
    answer:
      'Custom software is worth building when a process is genuinely specific to how a company competes, and when the workarounds around a standard package have started to cost more than the package saves. Nivora builds these systems around the tools a company already runs rather than replacing them, and hands over the code so the business owns what it depends on.',
    answerDetail: [
      'The wrong reason to build is that standard software is imperfect. It always is, and living with an imperfect package is usually cheaper than owning a perfect one.',
      'The right reason is that the workaround has become the job: a spreadsheet everyone depends on, a step that only one colleague can do, a system that cannot express something central to how you actually work.',
    ],
    manifesto:
      'Every hour spent working around your software is an hour spent maintaining a compromise. Sometimes the honest answer is to stop compromising on that one thing.',
    problemH2: 'The spreadsheet that became load-bearing',
    problem: [
      'It almost always starts the same way. The package could not do one thing, so somebody built a spreadsheet. It worked, so it grew. Now four people depend on it, one person understands it, and nobody wants to think about what happens if that file is corrupted.',
      'That spreadsheet is a specification. Someone has already worked out exactly what the business needs, in detail, through years of use. What it lacks is not logic but reliability, multi-user access, an audit trail and a future.',
      'This is the clearest case for building something. Not a transformation programme, not a platform, just the one process that outgrew the tool it was improvised in.',
    ],
    pillarsH2: 'How we build it',
    pillars: [
      {
        title: 'Around what you have',
        body: 'It talks to your ERP, your accounting package and your existing data rather than replacing them. Ripping out working software to make room for new software is how budgets disappear.',
      },
      {
        title: 'Narrow first',
        body: 'One process, in production, in weeks. You judge it in daily use before the scope widens, which is the only reliable way to find out whether the design was right.',
      },
      {
        title: 'Yours to keep',
        body: 'Documentation, training and the source code in your possession. A system your business depends on should not be one you rent from the people who built it.',
      },
    ],
    signals: [
      'A spreadsheet has quietly become critical to how you operate',
      'You pay for a module nobody uses because the one you needed did not exist',
      'A key process depends on one person knowing the sequence',
      'Two systems hold the same data and disagree often enough to matter',
    ],
    outcomesH2: 'What you actually get',
    outcomes: [
      'The immediate result is that a fragile process stops being fragile. Multiple people can use it, changes are recorded, and a mistake is recoverable rather than final.',
      'The second is capacity. Processes that required a specific colleague can be done by anyone, which removes a bottleneck that most companies have stopped noticing because they have organised around it.',
      'The third only becomes obvious later: what you built is an asset. It runs without a monthly licence, it can be changed when the business changes, and it does not disappear because a vendor decided to sunset a product.',
    ],
    examplesH2: 'What this looks like in practice',
    examplesIntro:
      'Illustrative situations rather than client cases, chosen because they are the ones companies describe most often.',
    examples: [
      {
        title: 'The spreadsheet everyone depends on',
        before:
          'One file, four users, one person who understands it, and a formula nobody dares touch since 2021.',
        after:
          'The same logic as a proper system: multi-user, recorded changes, recoverable mistakes, and no single point of failure.',
      },
      {
        title: 'A module you pay for and never open',
        before:
          'The package almost fits, so you licence a module for the part it does not do, and the team works around both.',
        after:
          'The missing piece is built alongside the package, so you stop paying for the workaround and stop maintaining it.',
      },
    ],
    faqs: [
      {
        q: 'Is custom software not much more expensive than a package?',
        a: 'Up front, usually yes. Over five years, frequently not, once you count per-seat licences, the modules you pay for and do not use, and the hours spent working around the gaps. The honest comparison is total cost against the workaround you are running today, not against the licence fee alone.',
      },
      {
        q: 'What happens if you disappear?',
        a: 'You keep running, because that is designed for rather than promised. The code, the documentation and the deployment are yours, and the stack is deliberately ordinary so another developer can pick it up. Anything else would make you dependent on a small studio for something your business needs.',
      },
      {
        q: 'Do we have to replace our ERP?',
        a: 'Almost never, and we would argue against it. ERP replacements are eighteen-month programmes with real failure risk. Building the missing piece alongside a working ERP is faster, cheaper and reversible.',
      },
      {
        q: 'How long does a first version take?',
        a: 'Weeks for a single well-scoped process. If a supplier quotes six months before you see anything running, what you are buying is a plan rather than software, and plans are the part most likely to turn out wrong.',
      },
      {
        q: 'Who decides what it should do?',
        a: 'You do, but not in a workshop and not up front. The reliable method is to build a narrow first version from how the work is done today, put it in front of the people who do that work, and change it based on what they say after a fortnight of real use. Requirements gathered in a meeting describe what people think they do; the first version reveals what they actually do.',
      },
    ],
    featuresTitle: 'Buy what fits, build what does not',
    featuresSubtitle:
      'For most of what a company needs, ready-made software is the right answer. Custom is for the part that makes you different, and knowing which is which is most of the decision.',
    ctaTitle: 'Bring the spreadsheet everyone depends on',
    ctaBody:
      'It is usually the fastest way into a useful conversation. You get a straight answer on whether it is worth turning into a proper system, and roughly what that would take.',
    seoTitle: 'Custom software development · Nivora',
    seoDescription:
      'Custom software for the process no package fits, built around your existing ERP and tools, with the code in your possession. By Nivora, a software and AI studio in Brugge.',
  },
  nl: {
    eyebrow: 'Software op maat',
    h1: 'Software op maat voor het deel van uw bedrijf waar geen pakket op past',
    subhead:
      'De meeste bedrijven draaien prima op standaardsoftware tot ze botsen op dat ene proces dat hen anders maakt. Net dat proces is het bouwen meestal waard.',
    answerH2: 'Wanneer is software op maat het juiste antwoord?',
    answer:
      'Software op maat is het bouwen waard wanneer een proces echt eigen is aan hoe een bedrijf concurreert, en wanneer de omwegen rond een standaardpakket meer zijn gaan kosten dan dat pakket bespaart. Nivora bouwt zulke systemen rond de tools die een bedrijf al draait in plaats van ze te vervangen, en draagt de code over zodat het bedrijf bezit waar het van afhangt.',
    answerDetail: [
      'De verkeerde reden om te bouwen is dat standaardsoftware onvolmaakt is. Dat is ze altijd, en leven met een onvolmaakt pakket is meestal goedkoper dan een volmaakt pakket bezitten.',
      'De juiste reden is dat de omweg de job geworden is: een spreadsheet waar iedereen van afhangt, een stap die maar één collega kan, een systeem dat iets centraals aan uw manier van werken niet kan uitdrukken.',
    ],
    manifesto:
      'Elk uur dat opgaat aan rond uw software heen werken, is een uur besteed aan een compromis onderhouden. Soms is het eerlijke antwoord om op dat ene punt te stoppen met compromissen.',
    problemH2: 'De spreadsheet die dragend werd',
    problem: [
      'Het begint vrijwel altijd hetzelfde. Het pakket kon één ding niet, dus bouwde iemand een spreadsheet. Die werkte, dus groeide hij. Nu hangen er vier mensen van af, begrijpt één persoon hem, en denkt niemand graag na over wat er gebeurt als dat bestand beschadigd raakt.',
      'Die spreadsheet ís een specificatie. Iemand heeft al precies uitgezocht wat het bedrijf nodig heeft, in detail, door jaren gebruik. Wat eraan ontbreekt is geen logica maar betrouwbaarheid, toegang voor meerdere mensen, een audittraject en een toekomst.',
      'Dat is het duidelijkste geval om iets te bouwen. Geen transformatieprogramma, geen platform, gewoon het ene proces dat de tool ontgroeide waarin het geïmproviseerd werd.',
    ],
    pillarsH2: 'Hoe we het bouwen',
    pillars: [
      {
        title: 'Rond wat u hebt',
        body: 'Het praat met uw ERP, uw boekhoudpakket en uw bestaande gegevens in plaats van ze te vervangen. Werkende software eruit halen om plaats te maken voor nieuwe, is hoe budgetten verdwijnen.',
      },
      {
        title: 'Eerst smal',
        body: 'Eén proces, in productie, binnen weken. U beoordeelt het in dagelijks gebruik voor de scope groeit, en dat is de enige betrouwbare manier om te weten of het ontwerp klopte.',
      },
      {
        title: 'Van u om te houden',
        body: 'Documentatie, opleiding en de broncode in uw bezit. Een systeem waar uw bedrijf van afhangt, hoort niet iets te zijn dat u huurt van wie het bouwde.',
      },
    ],
    signals: [
      'Een spreadsheet is stilaan cruciaal geworden voor uw werking',
      'U betaalt voor een module die niemand gebruikt omdat de module die u nodig had niet bestond',
      'Een sleutelproces hangt af van één persoon die de volgorde kent',
      'Twee systemen bevatten dezelfde gegevens en spreken elkaar vaak genoeg tegen om te tellen',
    ],
    outcomesH2: 'Wat u er werkelijk aan hebt',
    outcomes: [
      'Het onmiddellijke resultaat is dat een kwetsbaar proces ophoudt kwetsbaar te zijn. Meerdere mensen kunnen ermee werken, wijzigingen worden vastgelegd, en een fout is herstelbaar in plaats van definitief.',
      'Het tweede is capaciteit. Processen die een specifieke collega vroegen, kan iedereen doen, en dat haalt een flessenhals weg die de meeste bedrijven niet meer opmerken omdat ze er zich rond georganiseerd hebben.',
      'Het derde wordt pas later duidelijk: wat u bouwde is een bezit. Het draait zonder maandelijkse licentie, het kan veranderen wanneer het bedrijf verandert, en het verdwijnt niet omdat een leverancier besliste een product stop te zetten.',
    ],
    examplesH2: 'Hoe dit er in de praktijk uitziet',
    examplesIntro:
      'Verzonnen situaties in plaats van klantendossiers, gekozen omdat het de situaties zijn die bedrijven het vaakst beschrijven.',
    examples: [
      {
        title: 'De spreadsheet waar iedereen van afhangt',
        before:
          'Eén bestand, vier gebruikers, één persoon die hem begrijpt, en een formule waar niemand nog aan durft sinds 2021.',
        after:
          'Dezelfde logica als echt systeem: meerdere gebruikers, vastgelegde wijzigingen, herstelbare fouten, en geen enkel punt dat alles kan platleggen.',
      },
      {
        title: 'Een module waarvoor u betaalt en die u nooit opent',
        before:
          'Het pakket past bijna, dus licentieert u een module voor het deel dat het niet doet, en het team werkt om allebei heen.',
        after:
          'Het ontbrekende stuk wordt náást het pakket gebouwd, zodat u stopt met betalen voor de omweg en stopt met hem te onderhouden.',
      },
    ],
    faqs: [
      {
        q: 'Is software op maat niet veel duurder dan een pakket?',
        a: 'Vooraf meestal wel. Over vijf jaar vaak niet, zodra u licenties per gebruiker meetelt, de modules waarvoor u betaalt en die u niet gebruikt, en de uren die opgaan aan rond de gaten heen werken. De eerlijke vergelijking is de totale kost tegenover de omweg die u vandaag draait, niet tegenover het licentiebedrag alleen.',
      },
      {
        q: 'Wat als u verdwijnt?',
        a: 'Dan blijft u draaien, want daar is voor ontworpen in plaats van dat het beloofd wordt. De code, de documentatie en de uitrol zijn van u, en de gebruikte technologie is bewust gewoon, zodat een andere ontwikkelaar het kan overnemen. Iets anders zou u afhankelijk maken van een kleine studio voor iets dat uw bedrijf nodig heeft.',
      },
      {
        q: 'Moeten we ons ERP vervangen?',
        a: 'Bijna nooit, en we zouden ertegen pleiten. ERP-vervangingen zijn programma’s van achttien maanden met reëel faalrisico. Het ontbrekende stuk náást een werkend ERP bouwen is sneller, goedkoper en omkeerbaar.',
      },
      {
        q: 'Hoe lang duurt een eerste versie?',
        a: 'Weken voor één goed afgebakend proces. Offreert een leverancier zes maanden voor u iets ziet draaien, dan koopt u een plan in plaats van software, en net plannen blijken het vaakst niet te kloppen.',
      },
      {
        q: 'Wie beslist wat het moet doen?',
        a: 'U, maar niet in een workshop en niet vooraf. De betrouwbare methode is een smalle eerste versie bouwen vanuit hoe het werk vandaag gebeurt, die voorleggen aan de mensen die dat werk doen, en ze aanpassen op basis van wat ze na twee weken echt gebruik zeggen. Eisen die in een vergadering verzameld worden, beschrijven wat mensen dénken dat ze doen; de eerste versie toont wat ze werkelijk doen.',
      },
    ],
    featuresTitle: 'Koop wat past, bouw wat niet past',
    featuresSubtitle:
      'Voor het meeste dat een bedrijf nodig heeft, is kant-en-klare software het juiste antwoord. Maatwerk is voor het deel dat u anders maakt, en weten welk deel dat is, is het grootste stuk van de beslissing.',
    ctaTitle: 'Breng de spreadsheet mee waar iedereen van afhangt',
    ctaBody:
      'Dat is meestal de snelste weg naar een nuttig gesprek. U krijgt een recht antwoord of het de moeite is om er een echt systeem van te maken, en ongeveer wat dat zou vragen.',
    seoTitle: 'Software op maat laten maken · Nivora',
    seoDescription:
      'Software op maat voor het proces waar geen pakket op past, gebouwd rond uw bestaande ERP en tools, met de code in uw bezit. Door Nivora, software- en AI-studio in Brugge.',
  },
})
