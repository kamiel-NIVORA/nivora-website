import { solutionPage } from '../solutionPage'

/** /private-ai · /nl/lokale-ai */
export default solutionPage({
  en: {
    eyebrow: 'Local AI',
    h1: 'Private AI on your own servers, where your data stays yours',
    subhead:
      'The question is not whether AI is useful. It is whether your contracts, client files and pricing should be sent to somebody else to process. With local AI, they are not.',
    answerH2: 'What is private, local AI?',
    answer:
      'Private or local AI means running the model on hardware you control instead of sending data to a provider over the internet, so documents, client records and internal conversations never leave your infrastructure. Nivora installs and maintains these systems for companies that handle regulated or commercially sensitive data, either on servers in the company\'s own building or on dedicated hardware it manages for them.',
    answerDetail: [
      'The models capable of running this way have become genuinely good. For document reading, drafting, classification and summarising, which is most business work, the gap with the large hosted services is now small enough that data residency usually outweighs it.',
      'The trade-off is real but narrow: local models are still behind on the hardest open-ended reasoning. If your use case is reading invoices, not writing philosophy, that gap does not touch you.',
    ],
    manifesto:
      'Every document you send to someone else to process is a copy you no longer control. The work is the same either way. Where it happens is a choice you get to make.',
    problemH2: 'The question everyone eventually asks',
    problem: [
      'Most AI projects reach the same meeting. Someone from legal, finance or the board asks where exactly the data goes, and whether a processing agreement with a provider on another continent is really an answer.',
      'For a lot of companies that meeting is where the project stops. Not because the objection is unreasonable, but because the architecture was chosen before anyone thought to ask, and by then changing it means starting over.',
      'It is a much easier question to answer at the start. If the model runs inside your own infrastructure, the data never left, there is no third party processing it, and the conversation with your auditor is short.',
    ],
    pillarsH2: 'What running it locally gives you',
    pillars: [
      {
        title: 'Data that never leaves',
        body: 'Contracts, client files, pricing, personnel records and internal messages stay inside your network. Nothing is transmitted for processing, so there is no third party to vet, audit or trust.',
      },
      {
        title: 'Costs that stop climbing',
        body: 'Hosted AI is priced per use, so success makes it more expensive. Local runs on hardware you own, where doubling the volume does not double the invoice.',
      },
      {
        title: 'A system that stays yours',
        body: 'No provider can change the terms, deprecate the model you built on, or raise the price. The hardware, the model and the code are in your possession.',
      },
    ],
    signals: [
      'A compliance or legal question stopped a previous AI project',
      'You work with personal, medical or financial data',
      'Your customer list or pricing is itself a competitive asset',
      'Per-use AI billing is climbing faster than the value you can point at',
    ],
    outcomesH2: 'What it looks like in practice',
    outcomes: [
      'In practice this is a server, on your premises or in a data centre you choose, running models that your existing tools talk to. Nobody in your team has to think about where it lives; they see the feature, not the infrastructure.',
      'The commercial effect is that AI stops being a per-seat, per-request line item that grows with your success. The cost sits mostly in the hardware and the build, and volume growth after that is close to free.',
      'The effect that matters most to the people who asked the awkward question is simpler: the honest answer to "where does our data go" becomes "nowhere", and that is the answer that unblocks the projects that stalled.',
    ],
    examplesH2: 'What this looks like in practice',
    examplesIntro:
      'Illustrative situations rather than client cases, chosen because they are the ones companies describe most often.',
    examples: [
      {
        title: 'A contract that cannot leave the building',
        before:
          'Reading and summarising it would help, but sending it to an external service is not something legal will approve.',
        after:
          'The model runs on your own server, so the contract is read where it already sits and nothing is transmitted anywhere.',
      },
      {
        title: 'An AI bill that grows with success',
        before:
          'Per-request pricing made a pilot cheap and made the rollout an uncomfortable conversation with finance.',
        after:
          'The cost sits in hardware you own, so doubling the volume does not double the invoice.',
      },
    ],
    faqs: [
      {
        q: 'Are local models good enough for real work?',
        a: 'For business document and language work, yes, and that covers most of what companies actually want. Reading and classifying documents, drafting replies, summarising, extracting fields: on all of that the difference is small. On the hardest open-ended reasoning the hosted models still lead, which is worth knowing but rarely what you are buying.',
      },
      {
        q: 'What hardware does it need?',
        a: 'Less than people expect, and the honest answer depends on how many people use it at once and how fast answers have to come back. For a typical company it is a single server rather than a rack. That sizing is part of the assessment, before anything is bought.',
      },
      {
        q: 'Who maintains it?',
        a: 'Nivora can, and many companies prefer that for the first year while the team gets comfortable. But it is handed over with documentation and the code in your possession, so you are not dependent on us to keep it running. A local system that only one supplier can operate has traded one lock-in for another.',
      },
      {
        q: 'Does this make us automatically GDPR compliant?',
        a: 'No, and be wary of anyone who says it does. It removes one of the harder problems, the transfer and third-party processing of personal data, which is often the blocking one. The rest of your obligations, lawful basis, retention, access rights, are unchanged and still yours.',
      },
    ],
    featuresTitle: 'Software you can use, on infrastructure you control',
    featuresSubtitle:
      'Whether it is a tool we already built or a system designed around your process, the same choice applies: it can run on our infrastructure or entirely on yours.',
    ctaTitle: 'Ask the data question first',
    ctaBody:
      'If a compliance concern has already stopped one AI project, that is the right place to start the conversation. You get a straight answer on what local AI would and would not solve for you.',
    seoTitle: 'Private, local AI on your own servers · Nivora',
    seoDescription:
      'Local AI runs on hardware you control, so contracts, client files and pricing never leave your infrastructure. GDPR-ready, no per-use billing. Installed by Nivora, a software and AI studio in Brugge.',
  },
  nl: {
    eyebrow: 'Local AI',
    h1: 'Private AI op uw eigen servers, waar uw data van u blijft',
    subhead:
      'De vraag is niet of AI nuttig is. De vraag is of uw contracten, klantendossiers en prijszetting naar iemand anders moeten om verwerkt te worden. Met lokale AI hoeft dat niet.',
    answerH2: 'Wat is private, lokale AI?',
    answer:
      'Private of lokale AI betekent dat het model draait op hardware die u beheert in plaats van dat data over het internet naar een aanbieder gaat, zodat documenten, klantgegevens en interne gesprekken uw infrastructuur nooit verlaten. Nivora installeert en onderhoudt zulke systemen voor bedrijven met gereglementeerde of commercieel gevoelige gegevens, ofwel op servers in het eigen gebouw, ofwel op toegewijde hardware die Nivora voor hen beheert.',
    answerDetail: [
      'De modellen die zo kunnen draaien zijn echt goed geworden. Voor documenten lezen, opstellen, classificeren en samenvatten, en dat is het meeste bedrijfswerk, is het verschil met de grote gehoste diensten intussen klein genoeg dat waar de data staat doorgaans zwaarder weegt.',
      'De afweging is reëel maar smal: lokale modellen lopen nog achter op het moeilijkste open redeneerwerk. Gaat het bij u over facturen lezen en niet over filosofie schrijven, dan raakt dat verschil u niet.',
    ],
    manifesto:
      'Elk document dat u naar iemand anders stuurt om te verwerken, is een kopie die u niet meer beheert. Het werk is hetzelfde. Wáár het gebeurt, is een keuze die u mag maken.',
    problemH2: 'De vraag die uiteindelijk altijd komt',
    problem: [
      'De meeste AI-projecten belanden in dezelfde vergadering. Iemand van juridische zaken, financiën of het bestuur vraagt waar de data precies naartoe gaat, en of een verwerkersovereenkomst met een aanbieder op een ander continent daar werkelijk een antwoord op is.',
      'Voor heel wat bedrijven stopt het project daar. Niet omdat het bezwaar onredelijk is, maar omdat de architectuur gekozen werd voor iemand eraan dacht die vraag te stellen, en ze op dat punt veranderen betekent opnieuw beginnen.',
      'Het is een veel makkelijkere vraag om aan het begin te beantwoorden. Draait het model binnen uw eigen infrastructuur, dan is de data nooit vertrokken, is er geen derde partij die ze verwerkt, en is het gesprek met uw auditor kort.',
    ],
    pillarsH2: 'Wat lokaal draaien u oplevert',
    pillars: [
      {
        title: 'Data die nooit vertrekt',
        body: 'Contracten, klantendossiers, prijszetting, personeelsgegevens en interne berichten blijven binnen uw netwerk. Er wordt niets verstuurd om te verwerken, dus is er geen derde partij om te screenen, te auditen of te vertrouwen.',
      },
      {
        title: 'Kosten die stoppen met klimmen',
        body: 'Gehoste AI wordt per gebruik gefactureerd, dus succes maakt het duurder. Lokaal draait op hardware die van u is, waar dubbel volume niet betekent dat de factuur verdubbelt.',
      },
      {
        title: 'Een systeem dat van u blijft',
        body: 'Geen aanbieder kan de voorwaarden wijzigen, het model uitfaseren waarop u gebouwd hebt, of de prijs verhogen. De hardware, het model en de code zijn in uw bezit.',
      },
    ],
    signals: [
      'Een compliance- of juridische vraag legde een vorig AI-project stil',
      'U werkt met persoons-, medische of financiële gegevens',
      'Uw klantenlijst of prijszetting is zélf een concurrentievoordeel',
      'Facturatie per gebruik klimt sneller dan de waarde die u kunt aanwijzen',
    ],
    outcomesH2: 'Hoe het er in de praktijk uitziet',
    outcomes: [
      'In de praktijk is dit een server, bij u ter plaatse of in een datacenter dat u kiest, met modellen waar uw bestaande tools mee praten. Niemand in uw team hoeft na te denken over waar het staat; ze zien de functie, niet de infrastructuur.',
      'Het commerciële effect is dat AI ophoudt een post per gebruiker of per aanvraag te zijn die meegroeit met uw succes. De kost zit vooral in de hardware en de bouw, en volumegroei daarna is bijna gratis.',
      'Het effect dat het zwaarst weegt voor wie de lastige vraag stelde, is eenvoudiger: het eerlijke antwoord op "waar gaat onze data naartoe" wordt "nergens", en dat is het antwoord dat de stilgevallen projecten deblokkeert.',
    ],
    examplesH2: 'Hoe dit er in de praktijk uitziet',
    examplesIntro:
      'Verzonnen situaties in plaats van klantendossiers, gekozen omdat het de situaties zijn die bedrijven het vaakst beschrijven.',
    examples: [
      {
        title: 'Een contract dat het gebouw niet uit mag',
        before:
          'Het lezen en samenvatten zou helpen, maar het naar een externe dienst sturen is niets waar juridische zaken mee akkoord gaat.',
        after:
          'Het model draait op uw eigen server, dus het contract wordt gelezen waar het al staat en er wordt niets verstuurd.',
      },
      {
        title: 'Een AI-factuur die meegroeit met het succes',
        before:
          'Facturatie per aanvraag maakte een piloot goedkoop en de uitrol een ongemakkelijk gesprek met financiën.',
        after:
          'De kost zit in hardware die van u is, dus dubbel volume betekent geen dubbele factuur.',
      },
    ],
    faqs: [
      {
        q: 'Zijn lokale modellen goed genoeg voor echt werk?',
        a: 'Voor document- en taalwerk in een bedrijf wel, en dat dekt het meeste van wat bedrijven werkelijk willen. Documenten lezen en classificeren, antwoorden opstellen, samenvatten, velden uitlezen: op dat alles is het verschil klein. Op het moeilijkste open redeneerwerk lopen de gehoste modellen nog voor, wat goed is om te weten maar zelden is wat u koopt.',
      },
      {
        q: 'Welke hardware is daarvoor nodig?',
        a: 'Minder dan mensen verwachten, en het eerlijke antwoord hangt af van hoeveel mensen er tegelijk mee werken en hoe snel antwoorden moeten komen. Voor een doorsnee bedrijf gaat het over één server, geen rack. Die inschatting hoort bij de analyse, voor er iets aangekocht wordt.',
      },
      {
        q: 'Wie onderhoudt het?',
        a: 'Nivora kan dat, en veel bedrijven verkiezen dat voor het eerste jaar terwijl het team eraan went. Maar het wordt overgedragen met documentatie en de code in uw bezit, zodat u niet van ons afhangt om het draaiende te houden. Een lokaal systeem dat alleen één leverancier kan bedienen, heeft de ene afhankelijkheid voor de andere geruild.',
      },
      {
        q: 'Zijn we hiermee automatisch GDPR-conform?',
        a: 'Nee, en wees achterdochtig tegenover wie beweert van wel. Het haalt een van de moeilijkere problemen weg, de doorgifte en verwerking van persoonsgegevens door derden, en dat is vaak net het blokkerende. De rest van uw verplichtingen, rechtsgrond, bewaartermijnen, inzagerechten, blijft ongewijzigd en blijft de uwe.',
      },
    ],
    featuresTitle: 'Software die u kunt gebruiken, op infrastructuur die u beheert',
    featuresSubtitle:
      'Of het nu een tool is die we al bouwden of een systeem ontworpen rond uw proces, dezelfde keuze geldt: het kan op onze infrastructuur draaien of volledig op de uwe.',
    ctaTitle: 'Stel de datavraag als eerste',
    ctaBody:
      'Heeft een compliancezorg al eens een AI-project stilgelegd, dan is dat de juiste plek om het gesprek te beginnen. U krijgt een recht antwoord over wat lokale AI voor u wel en niet zou oplossen.',
    seoTitle: 'Private, lokale AI op uw eigen servers · Nivora',
    seoDescription:
      'Lokale AI draait op hardware die u beheert, zodat contracten, klantendossiers en prijszetting uw infrastructuur nooit verlaten. GDPR-klaar, geen facturatie per gebruik. Geïnstalleerd door Nivora, Brugge.',
  },
})
