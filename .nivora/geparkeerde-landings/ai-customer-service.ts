import { solutionPage } from '../solutionPage'

/** /ai-customer-service · /nl/ai-klantenservice */
export default solutionPage({
  en: {
    eyebrow: 'AI customer service',
    h1: 'AI in customer service, without the part customers hate',
    subhead:
      'Nobody dislikes fast answers. What people dislike is being trapped in a loop with something that cannot help and will not let them out.',
    answerH2: 'How should AI be used in customer service?',
    answer:
      'AI works in customer service when it removes the retrieval work before a reply and hands over the moment judgement is needed, rather than when it stands between the customer and a person. Nivora builds systems that sort incoming messages by intent, pull the relevant order and history into view, and draft a reply for a colleague to check, which is faster for the customer and less tedious for the team.',
    answerDetail: [
      'The failure everyone has experienced is a deflection system: something designed to reduce contact rather than to resolve it. It saves money on the support line and spends it on churn nobody attributes to the change.',
      'The version that works is unglamorous. Most of the time spent on a support message is not writing it, it is finding the order, the delivery status and what was agreed last time. That is the part worth automating.',
    ],
    manifesto:
      'Every hour spent looking up an order before answering a customer is an hour not spent solving anything. Put the context on the screen, and let your people do the part that needs a person.',
    problemH2: 'What actually slows a support team down',
    problem: [
      'Watch a support colleague handle a message and the writing is the quick part. Before that comes finding the customer, opening the order, checking the delivery, reading the previous thread and working out what was promised.',
      'That retrieval happens on every single message, including the trivial ones, and it is invisible in every metric anyone tracks. Response times get explained as a staffing problem when they are mostly a lookup problem.',
      'The second drag is uneven load. Support volume is spiky, and a team sized for the average is underwater during the peaks and idle between them, which is why quality varies in a way customers notice and reports do not.',
    ],
    pillarsH2: 'Where AI belongs in the flow',
    pillars: [
      {
        title: 'Sorting by intent',
        body: 'A complaint, a delivery question, a technical issue and a sales enquiry need different people and different urgency. Getting that right at the door is worth more than anything downstream.',
      },
      {
        title: 'Context before reply',
        body: 'Order, history, delivery status and previous conversation pulled up automatically, so a colleague starts the message informed rather than starting a search.',
      },
      {
        title: 'A draft, not a decision',
        body: 'A suggested reply in your tone that a person edits and sends. Faster than writing from nothing, and it keeps a human accountable for what goes out.',
      },
    ],
    signals: [
      'Most of handling a message is finding out what happened',
      'The same questions arrive in slightly different words all day',
      'Evening and weekend messages wait until the next working day',
      'Quality drops during busy weeks in a way customers mention',
    ],
    outcomesH2: 'What good looks like afterwards',
    outcomes: [
      'Response times drop, but the more interesting change is variance. The difference between a quiet Tuesday and a chaotic Monday shrinks, because the retrieval work that used to scale with volume no longer does.',
      'The team\'s work gets harder and better. Once the repetitive messages are handled, what reaches a person is the genuinely difficult material, which is more demanding and considerably more satisfying than answering the same delivery question for the fortieth time.',
      'And you get a map of what confuses people. A system that logs what was asked and where it could not help points straight at the two or three things worth fixing in the product, the documentation or the checkout.',
    ],
    examplesH2: 'What this looks like in practice',
    examplesIntro:
      'Illustrative situations rather than client cases, chosen because they are the ones companies describe most often.',
    examples: [
      {
        title: 'A message about a late delivery',
        before:
          'The colleague finds the customer, opens the order, checks the carrier, reads the previous thread, and only then writes three sentences.',
        after:
          'All of that is on screen when they open the message, and the three sentences are drafted for them to adjust.',
      },
      {
        title: 'A Sunday evening enquiry',
        before:
          'It is answered on Monday morning, by which time the customer has asked somebody else.',
        after:
          'It is answered within minutes if it is routine, and flagged for Monday with the context ready if it is not.',
      },
    ],
    faqs: [
      {
        q: 'Will customers know they are talking to AI?',
        a: 'They should, wherever they are talking to it directly, and pretending otherwise tends to be found out. In the model we usually recommend the customer is talking to your team the whole time; the AI is working behind the reply rather than in front of it, which sidesteps the question.',
      },
      {
        q: 'Does this mean fewer support staff?',
        a: 'That is not usually what happens, and it is worth being honest about why. The volume a team can handle rises, so most companies use it to absorb growth and to answer outside office hours rather than to reduce headcount. If the goal is purely to cut a team, this is a poor way to get there.',
      },
      {
        q: 'What about complaints and angry customers?',
        a: 'Those are routed to a person by default, and that is a deliberate boundary rather than a limitation. A complaint is where the relationship is decided, the tone matters, and an automated reply that misses the emotional register does damage that no efficiency gain covers.',
      },
      {
        q: 'Where do customer messages get processed?',
        a: 'On your infrastructure if you want. Support conversations contain names, addresses, order details and sometimes health or financial information, so for many companies local AI is the only version that passes review, and it is designed for from the start rather than retrofitted.',
      },
    ],
    featuresTitle: 'One calm inbox, or a system around yours',
    featuresSubtitle:
      'Nivora makes Box, which brings communication together in one place, and builds custom systems around existing helpdesks. Which one fits depends on what you already run.',
    ctaTitle: 'Bring a week of support messages',
    ctaBody:
      'A real week says more than any description. You get a straight answer on how much of it could be sorted, prepared or handled, and which parts should always reach a person.',
    seoTitle: 'AI for customer service · Nivora',
    seoDescription:
      'AI that sorts incoming messages, pulls up order history and drafts replies for your team to check, with complaints always reaching a person. By Nivora, a software and AI studio in Brugge.',
  },
  nl: {
    eyebrow: 'AI-klantenservice',
    h1: 'AI in klantenservice, zonder het deel waar klanten een hekel aan hebben',
    subhead:
      'Niemand heeft iets tegen snelle antwoorden. Waar mensen een hekel aan hebben, is vastzitten in een lus met iets dat niet kan helpen en hen er niet uit laat.',
    answerH2: 'Hoe hoort AI ingezet te worden in klantenservice?',
    answer:
      'AI werkt in klantenservice wanneer ze het opzoekwerk vóór een antwoord wegneemt en doorgeeft zodra er oordeel nodig is, en niet wanneer ze tussen de klant en een mens gaat staan. Nivora bouwt systemen die inkomende berichten sorteren op intentie, het juiste order en de historiek erbij halen, en een antwoord opstellen dat een collega nakijkt. Sneller voor de klant, minder saai voor het team.',
    answerDetail: [
      'De mislukking die iedereen kent, is een afweersysteem: iets dat bedoeld is om contact te verminderen in plaats van op te lossen. Het bespaart op de supportlijn en geeft het uit aan klantverlies dat niemand aan die verandering toeschrijft.',
      'De versie die wél werkt, is weinig spectaculair. Het meeste van de tijd aan een supportbericht gaat niet naar schrijven, maar naar het order vinden, de leverstatus nakijken en uitzoeken wat er vorige keer is afgesproken. Dat is het deel dat het automatiseren waard is.',
    ],
    manifesto:
      'Elk uur dat opgaat aan een order opzoeken voor u een klant antwoordt, is een uur dat niets oplost. Zet de context op het scherm en laat uw mensen het deel doen waar een mens voor nodig is.',
    problemH2: 'Wat een supportteam werkelijk vertraagt',
    problem: [
      'Kijk mee met een supportcollega en het schrijven is het snelle deel. Daarvoor komt de klant vinden, het order openen, de levering nakijken, de vorige conversatie lezen en uitzoeken wat er beloofd is.',
      'Dat opzoekwerk gebeurt bij élk bericht, ook bij de triviale, en het is onzichtbaar in elke metriek die iemand bijhoudt. Reactietijden worden uitgelegd als een bezettingsprobleem terwijl het vooral een opzoekprobleem is.',
      'De tweede rem is ongelijke belasting. Supportvolume komt in golven, en een team op maat van het gemiddelde staat kopje onder tijdens de pieken en stil ertussen, en daarom varieert de kwaliteit op een manier die klanten merken en rapporten niet.',
    ],
    pillarsH2: 'Waar AI thuishoort in de stroom',
    pillars: [
      {
        title: 'Sorteren op intentie',
        body: 'Een klacht, een leveringsvraag, een technisch probleem en een verkoopvraag vragen andere mensen en een andere urgentie. Dat aan de deur juist krijgen, weegt zwaarder dan wat er daarna gebeurt.',
      },
      {
        title: 'Context voor het antwoord',
        body: 'Order, historiek, leverstatus en vorige conversatie automatisch erbij, zodat een collega geïnformeerd begint in plaats van met zoeken te beginnen.',
      },
      {
        title: 'Een ontwerp, geen beslissing',
        body: 'Een voorgesteld antwoord in uw toon dat een mens bijwerkt en verstuurt. Sneller dan van nul schrijven, en er blijft een mens verantwoordelijk voor wat buitengaat.',
      },
    ],
    signals: [
      'Het grootste deel van een bericht afhandelen is uitzoeken wat er gebeurd is',
      'Dezelfde vragen komen de hele dag binnen in net iets andere bewoordingen',
      'Berichten ’s avonds en in het weekend blijven liggen tot de volgende werkdag',
      'De kwaliteit zakt in drukke weken op een manier die klanten vermelden',
    ],
    outcomesH2: 'Hoe het er daarna uitziet',
    outcomes: [
      'Reactietijden dalen, maar de interessantere verandering is de spreiding. Het verschil tussen een rustige dinsdag en een chaotische maandag krimpt, omdat het opzoekwerk dat vroeger meegroeide met het volume dat niet meer doet.',
      'Het werk van het team wordt zwaarder en beter. Zodra de herhalende berichten opgevangen zijn, bereikt een mens vooral het echt moeilijke materiaal. Dat is veeleisender en aanzienlijk voldoeningsgevender dan voor de veertigste keer dezelfde leveringsvraag beantwoorden.',
      'En u krijgt een kaart van wat mensen verwart. Een systeem dat bijhoudt wat er gevraagd werd en waar het niet kon helpen, wijst rechtstreeks de twee of drie dingen aan die beter kunnen in het product, de documentatie of het bestelproces.',
    ],
    examplesH2: 'Hoe dit er in de praktijk uitziet',
    examplesIntro:
      'Verzonnen situaties in plaats van klantendossiers, gekozen omdat het de situaties zijn die bedrijven het vaakst beschrijven.',
    examples: [
      {
        title: 'Een bericht over een late levering',
        before:
          'De collega zoekt de klant, opent het order, kijkt de vervoerder na, leest de vorige conversatie, en schrijft dan pas drie zinnen.',
        after:
          'Dat alles staat op het scherm zodra hij het bericht opent, en die drie zinnen liggen klaar om bij te werken.',
      },
      {
        title: 'Een aanvraag op zondagavond',
        before:
          'Ze wordt maandagochtend beantwoord, en tegen dan heeft de klant het aan iemand anders gevraagd.',
        after:
          'Ze wordt binnen enkele minuten beantwoord als ze routine is, en gemarkeerd voor maandag met de context klaar als dat niet zo is.',
      },
    ],
    faqs: [
      {
        q: 'Weten klanten dat ze met AI praten?',
        a: 'Dat horen ze te weten waar ze er rechtstreeks mee praten, en doen alsof komt meestal uit. In het model dat we doorgaans aanraden praat de klant de hele tijd met uw team; de AI werkt achter het antwoord in plaats van ervoor, waarmee de vraag zich niet stelt.',
      },
      {
        q: 'Betekent dit minder supportmedewerkers?',
        a: 'Dat is meestal niet wat er gebeurt, en het is de moeite om eerlijk te zeggen waarom. Het volume dat een team aankan stijgt, dus de meeste bedrijven gebruiken het om groei op te vangen en buiten de kantooruren te antwoorden in plaats van om personeel af te bouwen. Is het doel puur een team inkrimpen, dan is dit een zwakke manier om daar te geraken.',
      },
      {
        q: 'En klachten en boze klanten?',
        a: 'Die gaan standaard naar een mens, en dat is een bewuste grens in plaats van een beperking. Bij een klacht wordt de relatie beslist, telt de toon, en richt een automatisch antwoord dat de emotionele lading mist schade aan die geen enkele efficiëntiewinst dekt.',
      },
      {
        q: 'Waar worden klantberichten verwerkt?',
        a: 'Op uw infrastructuur als u dat wilt. Supportgesprekken bevatten namen, adressen, orderdetails en soms gezondheids- of financiële informatie, dus voor veel bedrijven is lokale AI de enige versie die door de toetsing raakt. Daar wordt van bij het begin voor ontworpen in plaats van achteraf.',
      },
    ],
    featuresTitle: 'Eén rustige inbox, of een systeem rond de uwe',
    featuresSubtitle:
      'Nivora maakt Box, dat communicatie samenbrengt op één plek, en bouwt systemen op maat rond bestaande helpdesks. Wat past, hangt af van wat u al draait.',
    ctaTitle: 'Breng een week supportberichten mee',
    ctaBody:
      'Een echte week zegt meer dan eender welke beschrijving. U krijgt een recht antwoord over hoeveel ervan gesorteerd, voorbereid of afgehandeld kan worden, en welke delen altijd een mens horen te bereiken.',
    seoTitle: 'AI voor klantenservice · Nivora',
    seoDescription:
      'AI die inkomende berichten sorteert, orderhistoriek erbij haalt en antwoorden opstelt die uw team nakijkt, met klachten die altijd bij een mens komen. Door Nivora, software- en AI-studio in Brugge.',
  },
})
