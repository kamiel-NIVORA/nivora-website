import { solutionPage } from '../solutionPage'

/**
 * Sectorpagina voor immokantoren.
 *
 * Deze versie is vooral KORTER. De vorige had drie alinea's proza, drie
 * pijlers, een fotoband en nog een blok proza onderaan, en een makelaar leest
 * dat niet. Wat er nu staat:
 *
 *   antwoord (kort) → de drie oplossingen → drie genummerde momenten →
 *   drie korte redenen om het te durven → herkenningslijst → vraag stellen
 *
 * De fotoband en het blok "wat wij niet gaan beweren" zijn eruit. Dat laatste
 * was bedoeld als eerlijkheid maar leest als een lijst voorbehouden, en het
 * vertrouwen moet uit de taal komen, niet uit een disclaimer.
 *
 * Het probleemblok is nu `problemSteps`: drie genummerde momenten in plaats van
 * drie alinea's. Dat is meteen het visuele kader dat deze pagina miste, en het
 * loopt in dezelfde volgorde als de kaartenrij erboven.
 *
 * Wat er NIET in staat, met opzet: cijfers over rendement, beloftes over
 * doorlooptijd, en de precieze werking van de koppelingen. Dat kan veranderen
 * en dan staat er iets fout op een pagina die vertrouwen moet wekken.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Sectors',
      h1: 'AI automation for estate agencies',
      subhead:
        'Three things, built for the moments an agency wins or loses a property: the listing that gets opened, the viewing that comes back, and the price you can defend. More can follow, these are the ones that are ready.',
      answerH2: 'What does Nivora Works do for an estate agency?',
      answer:
        'Nivora Works is a software and AI studio in Bruges that builds AI solutions for estate agencies: empty rooms furnished digitally, a personal page per candidate after a viewing, and a report that backs up an asking price. Each of them is made to be shown to a client, with the source document beside every figure, and an agent signs it off before anything leaves the office.',
      answerDetail: [
        'It sits beside the package your properties are already in, not in front of it.',
        'Three are ready today. Which one comes next depends on what agencies keep asking for.',
      ],
      manifesto:
        'An agent sells viewings and trust. Whatever else sits on the desk is work someone else can do.',
      problemH2: 'Where is a property won or lost?',
      problemSteps: [
        { phase: 'Before', title: 'The listing that is never opened' },
        { phase: 'After', title: 'The viewing that does not come back' },
        { phase: 'At intake', title: 'The price you cannot show' },
      ],
      problem: [
        'Empty rooms go online exactly as the photographer delivered them. A buyer cannot judge an empty space and scrolls on.',
        'Your candidate saw five properties that Saturday. By Sunday evening they have run together, and what you send afterwards is the listing they had already read.',
        'A seller has a figure in their head. An agent who cannot show where a different one comes from either loses the instruction or takes it at a price that will not sell.',
      ],
      pillarsH2: 'Why would you dare put your name under this?',
      pillars: [
        {
          title: 'The source is always there',
          body: 'Every figure comes with the document it came from. Checking takes a minute.',
        },
        {
          title: 'You send it, not us',
          body: 'Nothing reaches a portal, a candidate or a seller before someone at your office has read it.',
        },
        {
          title: 'It stays in the office',
          body: 'Applicant payslips, ID cards, valuation reports: where it matters, the model runs on your own hardware.',
        },
      ],
      signals: [
        'Your photographer delivers empty rooms and they go online exactly like that',
        'After a viewing you send the same listing everybody had already read',
        'You lose instructions because you cannot show where your price comes from',
        'A candidate walked away over an energy label without ever hearing what it would cost',
      ],
      band: false,
      faqs: [
        {
          q: 'Do we have to change CRM?',
          a: 'No. Your properties stay where they are and keep going out to the portals you are on. What we build sits beside your package and works with the same data. If yours cannot exchange anything at all, we say so up front.',
        },
        {
          q: 'Can a furnished photo simply go into a listing?',
          a: 'Not simply. In Belgium it has to be clear that the image is a digital rendering, so the empty photo always goes with it and the notice is on the image by default. Nothing about the property itself is changed: no cracks removed, no damp patches, no worn floor.',
        },
        {
          q: 'Who is liable for what ends up in the listing?',
          a: 'You are. The listing goes out under your BIV number, so compulsory particulars are copied literally from the source and never generated, with that source shown beside each field. The free text around them is a draft you sign off on.',
        },
        {
          q: 'Is three all there is?',
          a: 'Three are ready and each can be requested on its own. What comes next depends on what agencies keep asking for, and that is a large part of why the question box below this page exists.',
        },
      ],
      featuresTitle: 'What does Nivora Works do for an estate agency?',
      featuresSubtitle:
        'Three things, built for the moments an agency wins or loses a property: the listing that gets opened, the viewing that comes back, and the price you can defend.',
      ctaTitle: 'Send us one property',
      ctaBody:
        'One property that is online now, with the photos as your photographer delivered them. You get back what we would make of it, and you judge whether you would put your name under it.',
      seoTitle: 'AI automation for estate agencies · Nivora Works',
      seoDescription:
        'Nivora Works in Bruges builds three things for estate agencies: empty rooms furnished digitally, a personal page per candidate after a viewing, and a report that backs up your asking price.',
    },
    nl:
    {
      eyebrow: 'Sectoren',
      h1: 'AI-automatisering voor immokantoren',
      subhead:
        'Drie dingen, gebouwd voor de momenten waarop een kantoor een pand wint of verliest: het zoekertje dat opengeklikt wordt, het bezoek dat terugkomt, en de prijs die u kunt verdedigen. Er kan meer bij komen, dit zijn de drie die klaar zijn.',
      answerH2: 'Wat doet Nivora Works voor een immokantoor?',
      answer:
        'Nivora Works is een software- en AI-studio in Brugge die AI-oplossingen bouwt voor immokantoren: lege kamers digitaal inrichten, een persoonlijk blad per kandidaat na een bezoek, en een verslag dat een vraagprijs onderbouwt. Elk daarvan is gemaakt om aan een klant te tonen, met bij elk cijfer het brondocument ernaast, en een makelaar tekent af voor er iets het kantoor verlaat.',
      answerDetail: [
        'Het hangt naast het pakket waar uw panden al in staan, niet ervoor.',
        'Drie zijn er vandaag klaar. Welke er daarna bij komt, hangt af van wat kantoren blijven vragen.',
      ],
      manifesto:
        'Een makelaar verkoopt bezoeken en vertrouwen. Wat daarnaast op zijn bureau ligt, is werk dat iemand anders kan doen.',
      problemH2: 'Waar wordt een pand gewonnen of verloren?',
      problemSteps: [
        { phase: 'Vooraf', title: 'Het zoekertje dat niet opengaat' },
        { phase: 'Erna', title: 'Het bezoek dat niet terugkomt' },
        { phase: 'Bij de opname', title: 'De prijs die u niet kunt tonen' },
      ],
      problem: [
        'Lege kamers gaan online zoals de fotograaf ze aanleverde. Een zoeker kan een lege ruimte niet inschatten en scrollt door.',
        'Uw kandidaat zag die zaterdag vijf panden. Tegen zondagavond lopen ze door elkaar, en wat u daarna doorstuurt is het zoekertje dat hij al gelezen had.',
        'Een verkoper heeft een bedrag in zijn hoofd. Een makelaar die niet kan tonen waar een ander bedrag vandaan komt, verliest de opdracht of neemt ze aan tegen een prijs waarmee het pand niet verkoopt.',
      ],
      pillarsH2: 'Waarom zou u hier uw naam onder zetten?',
      pillars: [
        {
          title: 'De bron staat er altijd bij',
          body: 'Bij elk cijfer hoort het document waar het uit komt. Nakijken kost een minuut.',
        },
        {
          title: 'U verstuurt, niet wij',
          body: 'Er gaat niets naar een portaal, een kandidaat of een verkoper voor iemand van uw kantoor het gelezen heeft.',
        },
        {
          title: 'Het blijft op kantoor',
          body: 'Loonfiches van kandidaat-huurders, identiteitskaarten, schattingsverslagen: waar het erop aankomt draait het model op uw eigen hardware.',
        },
      ],
      signals: [
        'Uw fotograaf levert lege kamers en die gaan zo online',
        'Na een bezoek stuurt u het zoekertje door dat iedereen al gelezen had',
        'U verliest opdrachten omdat u niet kunt tonen waar uw prijs vandaan komt',
        'Een kandidaat haakte af op een energielabel zonder ooit gehoord te hebben wat het zou kosten',
      ],
      band: false,
      faqs: [
        {
          q: 'Moeten wij van CRM veranderen?',
          a: 'Nee. Uw panden blijven staan waar ze staan en blijven naar de portalen gaan waar u op zit. Wat wij bouwen hangt naast uw pakket en werkt met dezelfde gegevens. Kan het uwe niets uitwisselen, dan zeggen wij dat vooraf.',
        },
        {
          q: 'Mag een ingerichte foto zomaar in een zoekertje?',
          a: 'Niet zomaar. In België moet duidelijk zijn dat het beeld een digitale weergave is, dus de lege foto gaat altijd mee en de vermelding staat standaard bij het beeld. Aan het pand zelf verandert er niets: geen scheuren weg, geen vochtvlekken, geen versleten vloer.',
        },
        {
          q: 'Wie is aansprakelijk voor wat er in het zoekertje staat?',
          a: 'U. Het zoekertje verschijnt onder uw BIV-nummer, dus verplichte vermeldingen worden letterlijk uit de bron overgenomen en nooit gegenereerd, met die bron zichtbaar naast elk veld. De vrije tekst errond is een voorstel dat u aftekent.',
        },
        {
          q: 'Blijft het bij deze drie?',
          a: 'Drie zijn er klaar en elk is apart aan te vragen. Wat erbij komt hangt af van wat kantoren blijven vragen, en daarvoor staat het vragenkader onderaan deze pagina.',
        },
      ],
      featuresTitle: 'Wat doet Nivora Works voor een immokantoor?',
      featuresSubtitle:
        'Drie dingen, gebouwd voor de momenten waarop een kantoor een pand wint of verliest: het zoekertje dat opengeklikt wordt, het bezoek dat terugkomt, en de prijs die u kunt verdedigen.',
      ctaTitle: 'Stuur ons één pand',
      ctaBody:
        'Eén pand dat nu online staat, met de foto\'s zoals uw fotograaf ze aanleverde. U krijgt terug wat wij ervan zouden maken, en u oordeelt of u er uw naam onder zou zetten.',
      seoTitle: 'AI-automatisering voor immokantoren · Nivora Works',
      seoDescription:
        'Nivora Works uit Brugge bouwt drie dingen voor immokantoren: lege kamers digitaal inrichten, een persoonlijk blad per kandidaat na het bezoek, en een verslag dat uw vraagprijs onderbouwt.',
    },
  },
  { hero: '/landing/auto-sec-immo-hero.webp', manifesto: '/landing/auto-sec-immo-handdruk.webp' },
)
