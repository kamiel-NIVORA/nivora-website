import { solutionPage } from '../solutionPage'

/**
 * /property-book-for-every-viewer · /nl/pandboek-voor-de-kandidaat-koper
 *
 * Oplossing twee voor de immokantoren, uit het idee van Kamiel: de kandidaat-
 * koper krijgt een persoonlijk document over het pand, gemaakt om hem te
 * overtuigen.
 *
 * Twee beslissingen die de hele pagina sturen:
 *
 *  1. De standaardvorm is een ONEPAGER, niet een brochure. Een kandidaat die
 *     vijf panden bekijkt leest geen twintig bladzijden, en een blad dat hij
 *     wél helemaal leest doet meer dan een boek dat op de achterbank blijft
 *     liggen. Het volledige pandboek zit erachter voor wie doorbijt.
 *  2. Persoonlijk betekent hier: geschreven rond wat DEZE kandidaat gevraagd
 *     heeft. Niet zijn naam bovenaan zetten, want dat is geen personalisatie.
 *
 * De harde grens staat expliciet op de pagina: alles komt uit het dossier, er
 * wordt niets bij verzonnen, en er staat geen prijsadvies of financieel advies
 * in. Een makelaar tekent af voor het vertrekt.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Our solutions',
      h1: 'Every candidate gets their own page, answering their own questions',
      subhead:
        'A candidate sees five properties on one Saturday and by Sunday evening they have run together. Give them one page they will actually read, and yours is the one they can still describe on Monday.',
      answerH2: 'What does a candidate get after a viewing?',
      answer:
        'A property book is a personal document a candidate buyer receives after a viewing, or on request from the listing, about that one property. Nivora builds it so it is written around what that particular candidate asked: a young couple who asked about the garden and the school gets a different page from an investor who asked about the rent. The standard form is a single page, because someone who saw five properties does not read twenty. Everything on it comes out of the file your office already assembled, and an agent signs it off before it goes out.',
      answerDetail: [
        'The one page carries more than it looks. The property in plain language, the rooms with the furnished versions beside them, what the energy label actually means for this buyer in this house, what has to happen in the next five years, and what comes on top of the asking price in registration duty and notary costs.',
        'Behind that page sits the full property book for the candidate who keeps going: every room, every certificate translated out of official language, the neighbourhood, and the works with a rough order of cost. They request it, and you can see who did.',
      ],
      manifesto:
        'A candidate does not choose the best property. They choose the one they can still picture on Monday morning.',
      problemH2: 'What a candidate leaves with today',
      problem: [
        'The candidate leaves with a phone full of photos they will never look at again, and with three things the agent said that they half remember. On Sunday evening the kitchen of one property has merged with the garden of another. Nothing is left except a price and a feeling.',
        'What you do send after a viewing is the same for everybody. The listing they had already read, the energy certificate as a pdf in official language, and if it is a good office, the plan. None of it answers what they actually asked while standing in the hall.',
        'Meanwhile the thing that decides it is often the thing nobody wrote down. A buyer looking at a house with label F wants to know what that means for them, in this house, in euros and in years. If they do not get that answer from you, they get it from a forum, and there it always sounds worse than it is.',
      ],
      pillarsH2: 'How we go about it',
      pillars: [
        {
          title: 'Built around their questions',
          body: 'Your agent notes two or three things during the viewing, or the request form on the listing asks them. Those become the spine of the page. Somebody who asked about the roof gets the roof first, not the kitchen. Putting their name at the top is not personalisation and we do not pretend it is.',
        },
        {
          title: 'Everything out of the file',
          body: 'The certificates, the year of construction, the works that were done, the plan, the photos: your office already has all of it, scattered across the CRM and the mailbox. This gathers it into one place. Nothing is invented and nothing is inferred, because a figure on that page comes back to you at the deed.',
        },
        {
          title: 'The agent signs it off',
          body: 'Nothing goes to a candidate before somebody at your office has read it. It appears as a draft with the source shown next to each fact, so checking it takes a minute rather than an evening. What leaves your office leaves under your name, and that stays true.',
        },
      ],
      examplesH2: 'The same property, two candidates',
      examplesIntro:
        'A townhouse with label E, viewed on the same Saturday afternoon by two very different people. Same file, same facts, two pages that read nothing alike.',
      examples: [
        {
          title: 'A couple with a small child',
          before: 'They asked about the garden, about whether the third bedroom is really a bedroom, and about the school on the corner. They leave with the standard listing and the energy certificate as a pdf.',
          after: 'Their page opens on the garden with its orientation and the hours of sun it gets, then the third room with its actual measurements and the staged version, then what is within walking distance. The label E section says what has to be done within five years and roughly what that costs, so they are not reading it for the first time on a forum.',
        },
        {
          title: 'A buyer looking to let it',
          before: 'He asked what it would let for, whether it can be split, and what the roof and the wiring are like. He leaves with exactly the same listing and the same pdf.',
          after: 'His page opens on the rooms and their measurements, what the electrical inspection actually said, and what the file shows about the roof. The letting question is answered with what your own office has seen let in this street, with the properties named, rather than with a yield we would have to invent.',
        },
      ],
      signals: [
        'After a viewing you send the same listing everybody had already read',
        'Candidates ask you the same question again two days later',
        'You have the file complete but nobody outside the office ever sees it',
        'A buyer walked away over an energy label without ever hearing what it would cost',
      ],
      automationsH2: 'Andere oplossingen',
      automationsIntro:
        'De rest van wat wij bouwen. Elk daarvan is apart aan te vragen.',
      automations: [],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say a brochure is new. Every office makes them, and most CRMs will produce a pdf of a property in two clicks. The difference is that theirs is the same document for everybody and comes out of the listing, while this one is built around what one person asked and comes out of the whole file.',
        'We are not going to put a price advice or a financial advice on that page. What a loan costs a month and what a property is worth is not our work and not yours to hand out lightly. What can be on it is what the property costs on top of the asking price in registration duty and notary fees, because that is a calculation and not an opinion.',
        'And we are not going to say this makes a property sell. It gets you the second viewing and it stops a candidate walking away over a number they misunderstood. Whether they buy is still down to the property and to you.',
      ],
      faqs: [
        {
          q: 'Do we have to do extra work per viewing for this?',
          a: 'Two or three lines from your agent, which is roughly what already ends up in the CRM after a viewing anyway. Everything else comes out of the file that was assembled to publish the property. If your office does not keep viewing notes at all, we will say up front that the page will be more generic, rather than pretending it makes no difference.',
        },
        {
          q: 'Who is responsible for what is on that page?',
          a: 'You are, and we build accordingly. Every fact carries the document it came from, shown next to it, so your agent checks it in a minute. Compulsory particulars such as the energy label and its certificate number are copied literally from the source and never generated, exactly as they are for a listing. Nothing goes out before someone at your office has read it.',
        },
        {
          q: 'What happens to the candidate\'s data?',
          a: 'As little as possible. What we need is what they asked about a property, and that goes into their file with you, not to us. Where you would rather nothing left the building at all, we run the model on hardware in your own office. We are not building a profile of a buyer and we would advise against anyone who offers to.',
        },
        {
          q: 'One page or the full book?',
          a: 'The page by default, because that is what gets read. The full book sits behind a link and comes when they ask for it, and the fact that they asked is worth knowing on its own: a candidate who requests the whole file on Sunday evening is a different candidate from one who does not. You see who did.',
        },
      ],
      featuresTitle: 'What does a candidate get after a viewing?',
      featuresSubtitle:
        'A candidate sees five properties on one Saturday and by Sunday evening they have run together. Give them one page they will actually read, and yours is the one they can still describe on Monday.',
      ctaTitle: 'Send us one property and one viewing',
      ctaBody:
        'One property that is online now, with the file as you have it, and the two or three things a candidate asked while standing in it. You get the page back the way we would build it, and you can judge for yourself whether you would put your name under it.',
      seoTitle: 'A personal page per candidate after a viewing, for estate agencies · Nivora',
      seoDescription:
        'After a viewing the candidate gets one page about that property, written around what they actually asked, out of the file your office already has. With the full property book behind it. For Flemish estate agencies. By Nivora, Brugge.',
    },
    nl:
    {
      eyebrow: 'Onze oplossingen',
      h1: 'Elke kandidaat krijgt zijn eigen blad, met antwoord op zijn eigen vragen',
      subhead:
        'Een kandidaat bekijkt op één zaterdag vijf panden en tegen zondagavond lopen ze door elkaar. Geef hem één blad dat hij echt leest, en het uwe is het pand dat hij maandag nog kan beschrijven.',
      answerH2: 'Wat krijgt een kandidaat na een bezoek?',
      answer:
        'Een pandboek is een persoonlijk document dat een kandidaat-koper krijgt na een bezoek, of op aanvraag vanuit het zoekertje, over dat ene pand. Nivora bouwt het zo dat het geschreven staat rond wat die welbepaalde kandidaat gevraagd heeft: een jong gezin dat naar de tuin en de school vroeg, krijgt een ander blad dan een koper die naar de huurprijs vroeg. De standaardvorm is één blad, want wie vijf panden gezien heeft leest er geen twintig. Alles wat erop staat komt uit het dossier dat uw kantoor toch al samengesteld heeft, en een makelaar tekent het af voor het vertrekt.',
      answerDetail: [
        'Dat ene blad draagt meer dan het lijkt. Het pand in gewone taal, de kamers met de ingerichte versies ernaast, wat het energielabel echt betekent voor deze koper in dit huis, wat er de komende vijf jaar moet gebeuren, en wat er bovenop de vraagprijs komt aan registratierechten en notariskosten.',
        'Achter dat blad zit het volledige pandboek voor de kandidaat die doorbijt: elke kamer, elk attest vertaald uit het ambtelijke, de buurt, en de werken met een orde van grootte erbij. Hij vraagt het aan, en u ziet wie dat gedaan heeft.',
      ],
      manifesto:
        'Een kandidaat kiest niet het beste pand. Hij kiest het pand dat hij maandagochtend nog voor zich ziet.',
      problemH2: 'Waar een kandidaat vandaag mee buitengaat',
      problem: [
        'De kandidaat vertrekt met een gsm vol foto\'s die hij nooit meer opent, en met drie dingen die de makelaar gezegd heeft en die hij half onthouden heeft. Tegen zondagavond is de keuken van het ene pand versmolten met de tuin van het andere. Wat overblijft is een prijs en een gevoel.',
        'Wat u na een bezoek wél doorstuurt, is voor iedereen hetzelfde. Het zoekertje dat hij al gelezen had, het EPC als pdf in ambtelijke taal, en bij een goed kantoor het plan erbij. Niets daarvan beantwoordt wat hij in de gang effectief gevraagd heeft.',
        'Ondertussen is wat de doorslag geeft vaak net wat niemand opgeschreven heeft. Een koper bij een huis met label F wil weten wat dat voor hém betekent, in dit huis, in euro en in jaren. Krijgt hij dat antwoord niet van u, dan haalt hij het van een forum, en daar klinkt het altijd erger dan het is.',
      ],
      pillarsH2: 'Hoe wij het aanpakken',
      pillars: [
        {
          title: 'Opgebouwd rond zijn vragen',
          body: 'Uw makelaar noteert tijdens het bezoek twee of drie dingen, of het aanvraagformulier bij het zoekertje vraagt ze. Die worden de ruggengraat van het blad. Wie naar het dak vroeg, krijgt het dak eerst en niet de keuken. Zijn naam bovenaan zetten is geen personalisatie en wij doen niet alsof.',
        },
        {
          title: 'Alles uit het dossier',
          body: 'De attesten, het bouwjaar, de uitgevoerde werken, het plan, de foto\'s: uw kantoor heeft dat allemaal al, verspreid over het CRM en de mailbox. Dit brengt het samen op één plek. Er wordt niets verzonnen en niets afgeleid, want een cijfer op dat blad komt bij de akte bij u terug.',
        },
        {
          title: 'De makelaar tekent af',
          body: 'Er vertrekt niets naar een kandidaat voor iemand van uw kantoor het gelezen heeft. Het staat klaar als voorstel met bij elk gegeven de bron ernaast, zodat nakijken een minuut kost in plaats van een avond. Wat uw kantoor verlaat, verlaat het onder uw naam, en dat blijft zo.',
        },
      ],
      examplesH2: 'Hetzelfde pand, twee kandidaten',
      examplesIntro:
        'Een rijhuis met label E, op dezelfde zaterdagnamiddag bezocht door twee heel verschillende mensen. Zelfde dossier, zelfde gegevens, twee bladen die nergens op elkaar lijken.',
      examples: [
        {
          title: 'Een koppel met een klein kind',
          before: 'Zij vroegen naar de tuin, of de derde slaapkamer echt een slaapkamer is, en naar de school op de hoek. Ze vertrekken met het standaardzoekertje en het EPC als pdf.',
          after: 'Hun blad opent op de tuin met de oriëntatie en het aantal uren zon, dan de derde kamer met haar echte afmetingen en de ingerichte versie, dan wat er op wandelafstand ligt. Bij label E staat wat er binnen vijf jaar moet gebeuren en ruwweg wat dat kost, zodat ze dat niet voor het eerst op een forum lezen.',
        },
        {
          title: 'Een koper die wil verhuren',
          before: 'Hij vroeg wat het zou opbrengen, of het te splitsen valt, en hoe het met het dak en de elektriciteit zit. Hij vertrekt met precies hetzelfde zoekertje en dezelfde pdf.',
          after: 'Zijn blad opent op de kamers en hun afmetingen, wat de keuring van de elektrische installatie echt zei, en wat het dossier over het dak toont. De huurvraag wordt beantwoord met wat uw eigen kantoor in deze straat verhuurd zag gaan, met die panden erbij genoemd, in plaats van met een rendement dat wij zouden moeten verzinnen.',
        },
      ],
      signals: [
        'Na een bezoek stuurt u het zoekertje door dat iedereen al gelezen had',
        'Kandidaten stellen u twee dagen later dezelfde vraag opnieuw',
        'Uw dossier is volledig maar buiten het kantoor ziet niemand het ooit',
        'Een koper haakte af op een energielabel zonder ooit gehoord te hebben wat het zou kosten',
      ],
      automationsH2: 'Andere oplossingen',
      automationsIntro:
        'De rest van wat wij bouwen. Elk daarvan is apart aan te vragen.',
      automations: [],
      outcomesH2: 'Wat wij niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat een brochure nieuw is. Elk kantoor maakt ze, en de meeste CRM-pakketten zetten in twee klikken een pdf van een pand klaar. Het verschil is dat die voor iedereen hetzelfde document is en uit het zoekertje komt, terwijl dit blad opgebouwd is rond wat één iemand gevraagd heeft en uit het volledige dossier komt.',
        'Wij gaan geen prijsadvies of financieel advies op dat blad zetten. Wat een lening per maand kost en wat een pand waard is, is ons werk niet en het is ook niet iets dat u zomaar uitdeelt. Wat er wel op kan staan is wat het pand bovenop de vraagprijs kost aan registratierechten en notariskosten, want dat is een berekening en geen mening.',
        'En wij gaan niet zeggen dat dit een pand verkoopt. Het levert u het tweede bezoek op en het houdt tegen dat een kandidaat afhaakt op een cijfer dat hij verkeerd begrepen heeft. Of hij koopt, hangt nog altijd af van het pand en van u.',
      ],
      faqs: [
        {
          q: 'Moeten wij hier per bezoek extra werk voor doen?',
          a: 'Twee of drie regels van uw makelaar, en dat is ongeveer wat er na een bezoek toch al in het CRM belandt. De rest komt uit het dossier dat samengesteld is om het pand te publiceren. Houdt uw kantoor helemaal geen bezoeknota\'s bij, dan zeggen wij op voorhand dat het blad algemener zal uitvallen, in plaats van te doen alsof dat niets uitmaakt.',
        },
        {
          q: 'Wie is verantwoordelijk voor wat er op dat blad staat?',
          a: 'U, en daar bouwen wij naar. Bij elk gegeven staat het document waar het uit komt, ernaast, zodat uw makelaar het in een minuut nakijkt. Verplichte vermeldingen zoals het EPC-label en het certificaatnummer worden letterlijk uit de bron overgenomen en nooit gegenereerd, precies zoals bij een zoekertje. Er vertrekt niets voor iemand van uw kantoor het gelezen heeft.',
        },
        {
          q: 'Wat gebeurt er met de gegevens van de kandidaat?',
          a: 'Zo weinig mogelijk. Wat wij nodig hebben is wat hij over een pand gevraagd heeft, en dat gaat in zijn dossier bij u, niet bij ons. Waar u liever hebt dat er helemaal niets buitengaat, zetten wij het model op hardware in uw eigen kantoor. Wij bouwen geen profiel van een koper op, en wie u dat aanbiedt zouden wij afraden.',
        },
        {
          q: 'Eén blad of het volledige boek?',
          a: 'Standaard het blad, want dat wordt gelezen. Het volledige boek zit achter een link en komt er wanneer hij het vraagt, en dat hij het vraagt is op zich al iets waard: een kandidaat die op zondagavond het hele dossier opvraagt, is een andere kandidaat dan een die dat niet doet. U ziet wie het deed.',
        },
      ],
      featuresTitle: 'Wat krijgt een kandidaat na een bezoek?',
      featuresSubtitle:
        'Een kandidaat bekijkt op één zaterdag vijf panden en tegen zondagavond lopen ze door elkaar. Geef hem één blad dat hij echt leest, en het uwe is het pand dat hij maandag nog kan beschrijven.',
      ctaTitle: 'Stuur ons één pand en één bezoek',
      ctaBody:
        'Eén pand dat nu online staat, met het dossier zoals u het hebt, en de twee of drie dingen die een kandidaat er ter plaatse gevraagd heeft. U krijgt het blad terug zoals wij het zouden bouwen, en u oordeelt zelf of u er uw naam onder zou zetten.',
      seoTitle: 'Elke kandidaat zijn eigen blad na het bezoek, voor immokantoren · Nivora',
      seoDescription:
        'Na een bezoek krijgt de kandidaat één blad over dat pand, geschreven rond wat hij zelf gevraagd heeft, uit het dossier dat uw kantoor al heeft. Met het volledige pandboek erachter. Voor Vlaamse immokantoren. Van Nivora uit Brugge.',
    },
  },
  { hero: '/landing/auto-opl-pandboek-a.webp', manifesto: '/landing/auto-opl-pandboek-b.webp' },
)
