import { solutionPage } from '../solutionPage'

/** /quote-automation · /nl/offertes-automatiseren */
export default solutionPage({
  en: {
    eyebrow: 'Quote automation',
    h1: 'Automate the quote, keep the judgement',
    subhead:
      'The number still comes from the person who knows what a job costs. What changes is that they stop spending the morning assembling what they need to decide it.',
    answerH2: 'What does quote automation actually automate?',
    answer:
      'Quote automation handles the preparation around pricing rather than the pricing itself: reading the incoming request, extracting the specifications, finding comparable past jobs, applying current material prices and producing a draft for review. Nivora builds these systems around a company\'s existing ERP and price data, so the estimator opens a filled-in sheet instead of a blank one.',
    answerDetail: [
      'Almost nobody should want fully automatic pricing. The margin call, the difficult customer, the job that is technically possible and commercially unwise: those need the person whose experience the business is built on.',
      'But that person spends most of their quoting time not deciding. They spend it hunting for a drawing, checking what a similar job cost last year, and looking up whether steel moved this month.',
    ],
    manifesto:
      'Every hour spent assembling what you need to price a job is an hour the customer waits. The decision takes minutes. The gathering is what takes the morning.',
    problemH2: 'Why quoting is the bottleneck nobody budgets for',
    problem: [
      'In most companies that build or supply something, the quote is the gate everything else waits behind. Nothing gets planned, ordered or scheduled until a number exists.',
      'That gate is usually staffed by one or two experienced people who are also needed for four other things. So quotes queue, and the queue is invisible: it shows up as a customer going quiet rather than as a number on a report.',
      'The commercial cost is larger than the time cost. Companies in this position routinely decline enquiries, not because the work is unattractive, but because quoting it properly would cost half a day they do not have.',
    ],
    pillarsH2: 'What the system does',
    pillars: [
      {
        title: 'Reads the request',
        body: 'Whether it arrives as an email, a PDF, a drawing or a filled-in form, it extracts what matters and flags what is missing, so the first thing anyone does is not re-typing.',
      },
      {
        title: 'Finds the precedent',
        body: 'Surfaces comparable jobs you have already quoted and what they actually cost to deliver. Most companies have this history and no practical way to search it.',
      },
      {
        title: 'Applies today\'s numbers',
        body: 'Current material prices, labour rates and margins from wherever you maintain them, so the draft is not built on figures from last quarter.',
      },
    ],
    signals: [
      'Quotes go out days after the enquiry arrived',
      'You have declined work because quoting it would take too long',
      'The estimator is also the buyer, the planner and half of quality control',
      'What a similar job actually cost lives in someone\'s memory rather than in a system',
    ],
    outcomesH2: 'What changes',
    outcomes: [
      'The first change is speed, and in most markets the first credible quote has an advantage that has nothing to do with price. Answering the same day is often worth more than being five percent cheaper a week later.',
      'The second is capacity. When quoting costs an hour instead of half a day, the enquiries you used to decline become viable, which changes revenue rather than just efficiency.',
      'The third is consistency. Drafts built from the same data and the same rules do not vary with who prepared them or how busy the week was, and the estimator\'s judgement gets applied to the interesting part rather than spent on retrieval.',
    ],
    examplesH2: 'What this looks like in practice',
    examplesIntro:
      'Illustrative situations rather than client cases, chosen because they are the ones companies describe most often.',
    examples: [
      {
        title: 'An enquiry with a drawing attached',
        before:
          'Someone opens the drawing, notes the dimensions and materials by hand, and looks for a comparable job from memory.',
        after:
          'Dimensions, materials and tolerances are extracted, the nearest comparable job is on screen with its real cost, and today\'s prices are applied.',
      },
      {
        title: 'A quote that waits three days',
        before:
          'The estimator is on a site visit, and the enquiry sits until they are back at a desk.',
        after:
          'The draft is ready when they open it, so the delay is a review rather than a whole preparation.',
      },
    ],
    faqs: [
      {
        q: 'Will it set prices without us?',
        a: 'Not unless you want it to, and for most companies that would be the wrong design. The system prepares and proposes; a person reviews and sends. The saving is in the preparation, which is mechanical, and the risk of removing the human step is concentrated in exactly the cases where getting it wrong is expensive.',
      },
      {
        q: 'Our quotes are all different. Can that work?',
        a: 'Custom output does not mean a custom process. The products differ, but the sequence used to price them is usually consistent: read the requirement, find the nearest precedent, adjust for material and complexity. That sequence is what gets automated, not the answer.',
      },
      {
        q: 'Does it need to connect to our ERP?',
        a: 'It works better connected, but it is not a prerequisite for starting. Many first versions read from a price list and a folder of past quotes and still remove most of the preparation time. Deeper integration is a sensible second phase once the value is proven.',
      },
      {
        q: 'What about the drawings and technical documents?',
        a: 'Reading them is one of the more useful parts. Extracting dimensions, materials and tolerances from a drawing or specification sheet is exactly the kind of careful, repetitive reading that consumes an estimator\'s attention and that a system does without getting tired at four in the afternoon.',
      },
    ],
    featuresTitle: 'Ready-made tools, or a system around your quoting',
    featuresSubtitle:
      'Some companies need nothing more than their existing tools connected properly. Others need the quoting process itself rebuilt. The first conversation is the same.',
    ctaTitle: 'Bring your last ten quotes',
    ctaBody:
      'They are the fastest way to see whether this would help. You get a straight answer on how much of that work could be prepared automatically, and what it would take to get there.',
    seoTitle: 'Quote automation for manufacturers and suppliers · Nivora',
    seoDescription:
      'Automate the preparation around quoting: reading requests, finding comparable jobs and applying current prices, with the estimator still deciding. By Nivora, a software and AI studio in Brugge.',
  },
  nl: {
    eyebrow: 'Offertes automatiseren',
    h1: 'Automatiseer de offerte, behoud het oordeel',
    subhead:
      'Het cijfer komt nog altijd van wie weet wat een opdracht kost. Wat verandert, is dat die persoon niet meer de voormiddag besteedt aan verzamelen wat hij nodig heeft om het te beslissen.',
    answerH2: 'Wat automatiseert offerteautomatisering precies?',
    answer:
      'Offerteautomatisering neemt de voorbereiding rond het prijzen over, niet het prijzen zelf: de binnenkomende aanvraag lezen, de specificaties eruit halen, vergelijkbare vorige opdrachten zoeken, actuele materiaalprijzen toepassen en een ontwerp opmaken ter nazicht. Nivora bouwt zulke systemen rond het bestaande ERP en de prijsgegevens van een bedrijf, zodat de calculator een ingevuld blad opent in plaats van een leeg.',
    answerDetail: [
      'Vrijwel niemand zou volautomatische prijszetting moeten willen. De margebeslissing, de moeilijke klant, de opdracht die technisch kan en commercieel onverstandig is: die vragen de persoon op wiens ervaring het bedrijf gebouwd is.',
      'Maar die persoon besteedt het grootste deel van zijn offertetijd niet aan beslissen. Hij besteedt ze aan een tekening zoeken, nakijken wat een gelijkaardige opdracht vorig jaar kostte, en opzoeken of staal deze maand bewoog.',
    ],
    manifesto:
      'Elk uur dat opgaat aan verzamelen wat u nodig hebt om een opdracht te prijzen, is een uur dat de klant wacht. De beslissing duurt minuten. Het verzamelen kost de voormiddag.',
    problemH2: 'Waarom offreren de flessenhals is waar niemand budget voor maakt',
    problem: [
      'In de meeste bedrijven die iets bouwen of leveren, is de offerte de poort waar al de rest achter wacht. Er wordt niets gepland, besteld of ingeroosterd tot er een cijfer is.',
      'Die poort wordt meestal bemand door één of twee ervaren mensen die tegelijk voor vier andere zaken nodig zijn. Dus schuiven offertes aan, en die wachtrij is onzichtbaar: ze uit zich als een klant die stil valt, niet als een cijfer op een rapport.',
      'De commerciële kost is groter dan de tijdskost. Bedrijven in deze positie slaan geregeld aanvragen af, niet omdat het werk onaantrekkelijk is, maar omdat correct offreren een halve dag zou kosten die ze niet hebben.',
    ],
    pillarsH2: 'Wat het systeem doet',
    pillars: [
      {
        title: 'Leest de aanvraag',
        body: 'Of ze nu binnenkomt als mail, PDF, tekening of ingevuld formulier, het haalt eruit wat telt en markeert wat ontbreekt, zodat het eerste wat iemand doet geen overtypen is.',
      },
      {
        title: 'Vindt het precedent',
        body: 'Toont vergelijkbare opdrachten die u al offreerde en wat ze werkelijk kostten om te leveren. De meeste bedrijven hebben die historiek en geen praktische manier om ze te doorzoeken.',
      },
      {
        title: 'Past de cijfers van vandaag toe',
        body: 'Actuele materiaalprijzen, uurtarieven en marges vanuit waar u ze ook bijhoudt, zodat het ontwerp niet gebouwd is op cijfers van vorig kwartaal.',
      },
    ],
    signals: [
      'Offertes vertrekken dagen nadat de aanvraag binnenkwam',
      'U hebt al werk afgeslagen omdat offreren te lang zou duren',
      'De calculator is tegelijk aankoper, planner en de helft van de kwaliteitscontrole',
      'Wat een gelijkaardige opdracht echt kostte, zit in iemands geheugen en niet in een systeem',
    ],
    outcomesH2: 'Wat er verandert',
    outcomes: [
      'De eerste verandering is snelheid, en in de meeste markten heeft de eerste geloofwaardige offerte een voordeel dat niets met prijs te maken heeft. Dezelfde dag antwoorden is vaak meer waard dan een week later vijf procent goedkoper zijn.',
      'De tweede is capaciteit. Wanneer offreren een uur kost in plaats van een halve dag, worden de aanvragen die u vroeger afsloeg haalbaar, en dat verandert omzet in plaats van enkel efficiëntie.',
      'De derde is consistentie. Ontwerpen die uit dezelfde gegevens en dezelfde regels komen, verschillen niet naargelang wie ze klaarmaakte of hoe druk de week was, en het oordeel van de calculator gaat naar het interessante deel in plaats van naar opzoekwerk.',
    ],
    examplesH2: 'Hoe dit er in de praktijk uitziet',
    examplesIntro:
      'Verzonnen situaties in plaats van klantendossiers, gekozen omdat het de situaties zijn die bedrijven het vaakst beschrijven.',
    examples: [
      {
        title: 'Een aanvraag met een tekening erbij',
        before:
          'Iemand opent de tekening, noteert de afmetingen en materialen met de hand, en zoekt uit het geheugen een vergelijkbare opdracht.',
        after:
          'Afmetingen, materialen en toleranties worden uitgelezen, de dichtstbijzijnde vergelijkbare opdracht staat op het scherm met de echte kostprijs, en de prijzen van vandaag zijn toegepast.',
      },
      {
        title: 'Een offerte die drie dagen blijft liggen',
        before:
          'De calculator is op werfbezoek, en de aanvraag wacht tot hij terug aan een bureau zit.',
        after:
          'Het ontwerp ligt klaar wanneer hij het opent, dus de vertraging is een nazicht in plaats van een volledige voorbereiding.',
      },
    ],
    faqs: [
      {
        q: 'Gaat het prijzen bepalen zonder ons?',
        a: 'Niet tenzij u dat wilt, en voor de meeste bedrijven zou dat het verkeerde ontwerp zijn. Het systeem bereidt voor en stelt voor; een mens kijkt na en verstuurt. De winst zit in de voorbereiding, die mechanisch is, en het risico van de menselijke stap weghalen concentreert zich net in de gevallen waar het fout hebben duur is.',
      },
      {
        q: 'Onze offertes zijn allemaal verschillend. Kan dat werken?',
        a: 'Maatwerk in het resultaat betekent geen maatwerk in het proces. De producten verschillen, maar de volgorde waarmee ze geprijsd worden is meestal constant: de vraag lezen, het dichtstbijzijnde precedent zoeken, bijstellen voor materiaal en complexiteit. Die volgorde wordt geautomatiseerd, niet het antwoord.',
      },
      {
        q: 'Moet het aan ons ERP gekoppeld worden?',
        a: 'Het werkt beter gekoppeld, maar het is geen voorwaarde om te starten. Veel eerste versies lezen uit een prijslijst en een map met vorige offertes en halen daarmee al het grootste deel van de voorbereidingstijd weg. Diepere integratie is een verstandige tweede fase zodra de waarde bewezen is.',
      },
      {
        q: 'En de tekeningen en technische documenten?',
        a: 'Die lezen is een van de nuttigste onderdelen. Afmetingen, materialen en toleranties uit een tekening of specificatieblad halen is precies het soort nauwkeurige, herhalende leeswerk dat de aandacht van een calculator opslokt en dat een systeem doet zonder om vier uur ’s namiddags moe te worden.',
      },
    ],
    featuresTitle: 'Kant-en-klare tools, of een systeem rond uw offertes',
    featuresSubtitle:
      'Sommige bedrijven hebben niet meer nodig dan hun bestaande tools deftig gekoppeld. Andere hebben het offerteproces zelf herbouwd nodig. Het eerste gesprek is hetzelfde.',
    ctaTitle: 'Breng uw laatste tien offertes mee',
    ctaBody:
      'Dat is de snelste manier om te zien of dit zou helpen. U krijgt een recht antwoord over hoeveel van dat werk automatisch voorbereid kan worden, en wat daarvoor nodig is.',
    seoTitle: 'Offertes automatiseren voor maakbedrijven en toeleveranciers · Nivora',
    seoDescription:
      'Automatiseer de voorbereiding rond offreren: aanvragen lezen, vergelijkbare opdrachten zoeken en actuele prijzen toepassen, met de calculator die blijft beslissen. Door Nivora, Brugge.',
  },
})
