import { solutionPage } from '../solutionPage'

/**
 * /ai-maritime-survey · /nl/ai-maritieme-survey
 *
 * Geschreven binnen .nivora/research/niches-groep-1-marktonderzoek.md, niche 2.
 * Fotodossier per lot is volgens dat onderzoek het ENIGE voorstel uit vijf
 * niches dat inhoudelijk uniek bleef, dus dat is hier de kern.
 *
 * Verboden en hier vermeden: dat surveysoftware pas bij de inspectie begint
 * (Shipfix en Sedna doen nominatiebeheer), dat offline containernummer-OCR niet
 * bestaat (Anyline, AllRead), dat Nederlandstalig dicteren niet bestaat
 * (Dictum, Kadero, Whisper), en elke claim over archiefdoorzoeking als vinding.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'AI for survey and expertise firms',
      h1: 'AI for a survey firm, with the file kept in house',
      subhead:
        'Damage photographs and survey reports are evidence in arbitration. Running locally is not a sales line here, it is often a contractual requirement.',
      answerH2: 'What can AI do in a survey firm?',
      answer:
        'In a maritime survey or expertise firm, AI takes over the sorting around a file: reading nomination mails, matching hundreds of damage photographs to the right lots, and turning weight notes into figures in your own report format. Nivora, a software and AI studio in Brugge, builds this for firms of five to thirty people, running on their own server so images and reports never leave the office.',
      answerDetail: [
        'The arithmetic is commodity, and comparing ship figure to shore figure is part of the survey method itself. Nomination handling exists too: Veson’s Shipfix and Sedna have been reading shipping mail for years.',
        'What stays empty is the format: a breakbulk file with four hundred to a thousand images that have to hang off a packing list, with marks that follow no standard, at a firm that will not buy a per-seat subscription.',
      ],
      manifesto:
        'A survey report is evidence. Where the photographs sit while they are processed is therefore not a technical question but a contractual one.',
      problemH2: 'Three worlds that barely touch',
      problem: [
        'The classification societies have their own closed systems. The report software for yacht and pleasure craft surveyors is English-only. Alongside those sit standalone calculators for draft survey and tally.',
        'A Belgian firm of five to thirty people falls between all three and works its files in Word, Outlook and a photo folder on the NAS.',
        'That is not backwardness. It is a rational choice, because none of those packages was built for a breakbulk file with a thousand images in Dutch.',
      ],
      pillarsH2: 'Where we differ',
      pillars: [
        {
          title: 'On your own hardware',
          body: 'Damage photographs, reports and client names stay inside. For material that may reach arbitration, that is often what the principal contractually requires.',
        },
        {
          title: 'Built for a small firm',
          body: 'No per-seat licence and no platform to move into. What you already use stays, we take the sorting in between.',
        },
        {
          title: 'In your own report language',
          body: 'Captions and totals arrive in the Dutch phrasing your firm has used for years, not in a translated template.',
        },
      ],
      signals: [
        'A file holds hundreds of photographs matched to lots by hand',
        'Weight notes and tally sheets are re-typed into a spreadsheet',
        'Nomination mails arrive mixed in Dutch, French and English',
        'An old report on the same ship is unfindable because the name changed',
      ],
      automationsH2: 'What we can automate for a survey firm',
      automationsIntro:
        'Four examples. Not client cases, but the work Belgian expertise firms describe most often.',
      automations: [
        {
          title: 'Booking in jobs',
          body: 'Your nomination mails are read on your own server and set up as a file with vessel, cargo, berth and principal. Even when they arrive mixed in three languages.',
          image: '/landing/auto-survey-opdracht.webp',
          alt: 'A desk by a window overlooking harbour cranes, a laptop and a marine radio',
        },
        {
          title: 'Photos per lot',
          body: 'Hundreds of images checked off against the packing list, including lot numbers without a check digit. With the list of lots that have no image at all.',
          image: '/landing/auto-survey-foto.webp',
          alt: 'Looking down into a ship hold at stacked steel coils, a gloved hand with a tablet',
        },
        {
          title: 'Reading weight notes',
          body: 'Weighbridge tickets, tally sheets and mate’s receipts are read locally. The totals arrive in your own report format.',
          image: '/landing/auto-survey-weegbon.webp',
          alt: 'A draft table and a paper receipt with a calculator and a ship plan',
        },
        {
          title: 'Archive by IMO',
          body: 'A ship changes name, its IMO number does not. We normalise your archive on that, so old reports under a former name become findable.',
          image: '/landing/auto-survey-archief.webp',
          alt: 'A filing cabinet with binders showing ship names on the spines',
        },
      ],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say reading mail is new. Shipfix works out by itself whether a mail is a cargo order or an operational message, and pulls vessel, cargo and laycan out of it.',
        'We are not going to say offline container number reading is ours alone. Anyline runs it entirely on the device, AllRead on your own server.',
        'And we are not going to say Dutch dictation does not exist. Dictum runs fully locally with trade vocabulary. What we build is the photo file per lot, and that we found at no supplier at all.',
      ],
      faqs: [
        {
          q: 'Our archive is already in Microsoft 365. Is there still a point?',
          a: 'For searching, probably not, and we would rather say so now than in month three. Copilot and Synology Deep Search do that well. The photo file per lot is a different matter: that is about matching images to a packing list, and neither of them does it.',
        },
        {
          q: 'Why would it have to run locally?',
          a: 'Because damage photographs and reports are evidence. In arbitration you get asked where that material has been and who processed it. That is the reason, not a technical preference.',
        },
        {
          q: 'There are eight of us. Is this not too big for us?',
          a: 'The opposite. The existing players sell per seat or per platform, and that never adds up for a firm of eight. Building once on your own hardware does, because the cost does not grow with your turnover.',
        },
        {
          q: 'Can it use our existing report templates?',
          a: 'Yes, and that is usually the first requirement. Your report form has been refined over years and changing it would invert the job. We fill your template, you change nothing.',
        },
      ],
      featuresTitle: 'Use what exists, build the rest',
      featuresSubtitle:
        'For arithmetic and dictation good tools exist and you should simply use them. What we build is the piece no supplier makes for a firm your size.',
      ctaTitle: 'Bring a file with too many photographs',
      ctaBody:
        'A real breakbulk file says more than any explanation. You get a straight answer on how much of that sorting can be automated, and what stays manual.',
      seoTitle: 'AI for maritime survey and expertise firms · Nivora',
      seoDescription:
        'AI for Belgian survey and expertise firms: photo files per lot, reading weight notes and booking in nomination mails, running locally so evidence stays in house. By Nivora, Brugge.',
    },
    nl:
    {
      eyebrow: 'AI voor survey- en expertisebureaus',
      h1: 'AI voor een expertisebureau, met het dossier binnenshuis',
      subhead:
        'Schadefoto’s en surveyrapporten zijn bewijsmateriaal in arbitrage. Lokaal draaien is hier geen verkooppraatje maar vaak een contractvoorwaarde.',
      answerH2: 'Wat kan AI doen in een surveybureau?',
      answer:
        'In een maritiem survey- of expertisebureau neemt AI het sorteerwerk over rond een dossier: nominatiemails uitlezen, honderden schadefoto’s aan de juiste loten koppelen, en weegbonnen omzetten naar cijfers in uw rapportformaat. Nivora, een software- en AI-studio in Brugge, bouwt dat voor bureaus van vijf tot dertig man, draaiend op de eigen server zodat beeldmateriaal en rapporten het kantoor niet verlaten.',
      answerDetail: [
        'Het rekenwerk is commodity en de vergelijking tussen ship figure en shore figure zit al in de surveymethodiek zelf. Nominatiebeheer bestaat ook: Shipfix van Veson en Sedna lezen scheepvaartmails al jaren uit.',
        'Wat wel leeg blijft is het formaat: een breakbulkdossier met vierhonderd tot duizend beelden die aan een packing list moeten hangen, met merktekens die geen norm volgen, bij een bureau dat geen abonnement per gebruiker gaat kopen.',
      ],
      manifesto:
        'Een surveyrapport is bewijs. Waar de foto’s staan terwijl ze verwerkt worden, is dus geen technische vraag maar een contractuele.',
      problemH2: 'Drie werelden die elkaar nauwelijks raken',
      problem: [
        'De classificatiebureaus hebben hun eigen gesloten systemen. De rapportsoftware voor jacht- en pleziervaartsurveyors is Engelstalig. En daarnaast staan losse rekentools voor draft survey en tally.',
        'Een Belgisch bureau van vijf tot dertig man valt tussen die drie in en werkt zijn dossiers vandaag af in Word, Outlook en een fotomap op de NAS.',
        'Dat is geen achterstand. Het is een rationele keuze, want geen van die pakketten is gebouwd voor een breakbulkdossier met duizend beelden in het Nederlands.',
      ],
      pillarsH2: 'Waar wij verschillen',
      pillars: [
        {
          title: 'Op uw eigen hardware',
          body: 'Schadefoto’s, rapporten en klantnamen blijven binnen. Voor materiaal dat naar arbitrage kan gaan, is dat vaak wat de opdrachtgever contractueel oplegt.',
        },
        {
          title: 'Voor een klein bureau',
          body: 'Geen licentie per gebruiker en geen platform waar u in moet stappen. Wat u al gebruikt blijft staan, wij nemen het sorteerwerk ertussen.',
        },
        {
          title: 'In uw eigen rapporttaal',
          body: 'Bijschriften en totalen komen binnen in de Nederlandstalige formuleringen die uw bureau al jaren gebruikt, niet in een vertaald sjabloon.',
        },
      ],
      signals: [
        'Een dossier bevat honderden foto’s die met de hand aan loten gekoppeld worden',
        'Weegbonnen en tally sheets worden overgetypt in een rekenblad',
        'Nominatiemails komen door elkaar in het Nederlands, Frans en Engels binnen',
        'Een oud rapport over hetzelfde schip is onvindbaar omdat de naam veranderde',
      ],
      automationsH2: 'Wat we kunnen automatiseren voor een surveybureau',
      automationsIntro:
        'Vier voorbeelden. Geen klantendossiers, wel het werk dat Belgische expertisebureaus het vaakst beschrijven.',
      automations: [
        {
          title: 'Opdracht inboeken',
          body: 'Uw nominatiemails worden op uw eigen server gelezen en klaargezet als dossier met schip, lading, kaai en opdrachtgever. Ook door elkaar in drie talen.',
          image: '/landing/auto-survey-opdracht.webp',
          alt: 'Een bureau bij een raam met zicht op havenkranen, laptop en marifoon',
        },
        {
          title: 'Fotodossier per lot',
          body: 'Honderden beelden afgevinkt tegen de packing list, ook op lotnummers zonder check digit. Inclusief de lijst van loten zonder enkel beeld.',
          image: '/landing/auto-survey-foto.webp',
          alt: 'Een scheepsruim van bovenaf met gestapelde staalrollen en een hand met tablet',
        },
        {
          title: 'Weegbonnen uitlezen',
          body: 'Weegbrugtickets, tally sheets en mate’s receipts worden lokaal uitgelezen. De totalen staan klaar in uw eigen rapportformaat.',
          image: '/landing/auto-survey-weegbon.webp',
          alt: 'Een drafttabel en een papieren ontvangstbewijs met rekenmachine en scheepsplan',
        },
        {
          title: 'Archief op IMO',
          body: 'Een schip wisselt van naam, het IMO-nummer niet. Wij normaliseren uw archief daarop, zodat oude rapporten onder een vroegere naam terugvindbaar worden.',
          image: '/landing/auto-survey-archief.webp',
          alt: 'Een archiefkast met ordners met scheepsnamen op de rug',
        },
      ],
      outcomesH2: 'Wat wij niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat mail uitlezen nieuw is. Shipfix herkent zelf of een mail een cargo order of een operationele mail is, en haalt schip, lading en laycan eruit.',
        'Wij gaan niet zeggen dat offline containernummers lezen alleen bij ons kan. Anyline draait dat volledig op het toestel, AllRead op uw eigen server.',
        'En wij gaan niet zeggen dat Nederlandstalig dicteren niet bestaat. Dictum draait honderd procent lokaal met vaktermenpakketten. Wat wij bouwen is het fotodossier per lot, en dat vonden we bij geen enkele leverancier terug.',
      ],
      faqs: [
        {
          q: 'Ons archief zit al in Microsoft 365. Heeft dit dan nog zin?',
          a: 'Voor het doorzoeken waarschijnlijk niet, en dat zeggen we liever nu dan in maand drie. Copilot en Synology Deep Search doen dat prima. Het fotodossier per lot is een ander verhaal: dat gaat over beelden koppelen aan een packing list, en dat doet geen van beide.',
        },
        {
          q: 'Waarom zou het lokaal moeten draaien?',
          a: 'Omdat schadefoto’s en rapporten bewijsmateriaal zijn. In arbitrage wordt gevraagd waar dat materiaal is geweest en wie het verwerkt heeft. Dat is de reden, niet een technische voorkeur.',
        },
        {
          q: 'Wij zijn met acht. Is dit niet te groot voor ons?',
          a: 'Net omgekeerd. De bestaande spelers verkopen per gebruiker of per platform, en dat rekent nooit uit voor een bureau van acht. Eenmalig bouwen op eigen hardware wel, want de kost groeit niet mee met uw omzet.',
        },
        {
          q: 'Kan het onze bestaande rapportsjablonen gebruiken?',
          a: 'Ja, en dat is meestal de eerste eis. Uw rapportvorm is jarenlang bijgeschaafd en die veranderen zou de opdracht omdraaien. Wij vullen uw sjabloon, u verandert niets.',
        },
      ],
      featuresTitle: 'Wat bestaat gebruiken, de rest laten bouwen',
      featuresSubtitle:
        'Voor rekenwerk en dictaat bestaan goede tools en die moet u gewoon gebruiken. Wat wij bouwen is het stuk dat geen enkele leverancier voor een bureau van uw omvang maakt.',
      ctaTitle: 'Breng een dossier met te veel foto’s mee',
      ctaBody:
        'Een echt breakbulkdossier zegt meer dan eender welke uitleg. U krijgt een recht antwoord over hoeveel van dat sorteerwerk automatisch kan, en wat er handwerk blijft.',
      seoTitle: 'AI voor maritieme survey- en expertisebureaus · Nivora',
      seoDescription:
        'AI voor Belgische survey- en expertisebureaus: fotodossiers per lot, weegbonnen uitlezen en nominatiemails inboeken, lokaal draaiend zodat bewijsmateriaal binnen blijft. Door Nivora, Brugge.',
    },
  },
  { hero: '/landing/auto-survey-foto.webp', manifesto: '/landing/auto-survey-archief.webp' },
)
