import { cityPage } from '../cityPage'

/** /ai-automation-leuven · /nl/ai-automatisering-leuven */
export default cityPage({
  geo: {
    city: { en: 'Leuven', nl: 'Leuven' },
    province: { en: 'Flemish Brabant', nl: 'Vlaams-Brabant' },
    distanceKm: 120,
    nearby: ['ai-automation-mechelen', 'ai-automation-hasselt', 'ai-automation-ghent'],
  },
  copy: {
    en: {
      h1: 'AI automation in Leuven, for research-heavy companies drowning in reporting',
      subhead:
        'Leuven produces companies that are extremely good at the hard technical problem and much less good at the paperwork attached to being funded to solve it.',
      answer:
        'AI automation in Leuven typically addresses the administrative weight around research and funded work: grant reporting, consortium documentation, technical writing and the traceability that funders and regulators require. Nivora, a software and AI studio in Brugge, builds systems that assemble these from the tools where the work actually happened, rather than from someone reconstructing it before a deadline.',
      manifesto:
        'Every hour a researcher spends reconstructing what was already done is an hour of the thing you are actually funded to do. The trail can build itself while the work happens.',
      automations: [
        {
          title: 'Grant reports',
          body: 'Reports are assembled from commits, tickets and time records. Your researcher edits rather than reconstructs.',
          image: '/landing/auto-leuven-onderzoek.webp',
          alt: 'A university laboratory corridor with steel doors',
        },
        {
          title: 'Batch records',
          body: 'Measurements and protocols are filed against the right batch. The record is complete at any moment.',
          image: '/landing/auto-leuven-biotech.webp',
          alt: 'Cryogenic storage vessels in a research facility',
        },
        {
          title: 'Documentation',
          body: 'Documentation keeps up with the system it describes. An auditor reads the version that actually runs.',
          image: '/landing/auto-leuven-bibliotheek.webp',
          alt: 'An empty university reading room with wooden tables',
        },
        {
          title: 'Consortium mail',
          body: 'Partner correspondence is sorted with the right work package attached. Nothing waits until the deadline.',
          image: '/landing/auto-leuven-kantoor.webp',
          alt: 'A spin-off office with wiped whiteboards',
        },
      ],
      faqs: [
        {
          q: 'Our engineers could build this themselves. Should they?',
          a: 'Usually not, and the reason is priority rather than skill. Internal tooling in a research-driven company sits permanently below the product on the backlog, gets built by whoever has a quiet week, and is orphaned when that person moves on. If the work is genuinely interesting to your team, build it in-house. If it is the thing that keeps getting postponed, that is the signal.',
        },
        {
          q: 'Can the system be trusted with content that goes to a funder?',
          a: 'It should never be trusted unattended, and these are not built that way. The system assembles and drafts; a researcher reviews and signs off. The saving is in the assembly, which is mechanical, not in the judgement about what to claim, which is not. Anything that submits on your behalf without review is a liability rather than a feature.',
        },
        {
          q: 'Our IP is the company. Where does the data go?',
          a: 'Nowhere, if you run it locally, which most deep-tech companies choose. The model runs inside your own infrastructure so source code, research data and unpublished results are never sent to a third party. For a company whose valuation rests on what it knows, that is normally non-negotiable and it is the default we design for.',
        },
        {
          q: 'We are a spin-off with limited runway. Is this affordable now?',
          a:
            'It depends entirely on what you are spending senior time on. If reporting obligations cost your team several weeks a year, the arithmetic tends to be favourable; if they cost a few days, it does not, and that is worth establishing in the first conversation. A supplier who cannot tell you when the answer is no is not a useful supplier at this stage.',
        },
      ],
      seoTitle: 'AI automation in Leuven · Nivora',
      seoDescription:
        'AI automation for research-driven companies in Leuven: grant and project reporting, technical documentation and consortium admin, on your own infrastructure. By Nivora, a software and AI studio in Brugge.',
    },
    nl: {
      h1: 'AI-automatisering in Leuven, voor onderzoeksbedrijven die verzuipen in rapportering',
      subhead:
        'Leuven brengt bedrijven voort die uitzonderlijk goed zijn in het moeilijke technische probleem, en veel minder goed in het papierwerk dat hoort bij gefinancierd worden om het op te lossen.',
      answer:
        'AI-automatisering in Leuven pakt doorgaans de administratieve last rond onderzoek en gefinancierd werk aan: subsidierapportering, consortiumdocumentatie, technisch schrijfwerk en de traceerbaarheid die financiers en regelgevers eisen. Nivora, een software- en AI-studio in Brugge, bouwt systemen die dat samenstellen uit de tools waar het werk werkelijk gebeurde, in plaats van uit iemand die het vóór een deadline reconstrueert.',
      manifesto:
        'Elk uur dat een onderzoeker besteedt aan reconstrueren wat al gebeurd is, is een uur van net dat waarvoor u gefinancierd wordt. Het spoor kan zichzelf aanleggen terwijl het werk gebeurt.',
      automations: [
        {
          title: 'Subsidierapporten',
          body: 'Rapporten worden opgebouwd uit commits, tickets en tijdsregistratie. Uw onderzoeker redigeert in plaats van te reconstrueren.',
          image: '/landing/auto-leuven-onderzoek.webp',
          alt: 'Een universitaire labogang met stalen deuren',
        },
        {
          title: 'Batchdossiers',
          body: 'Meetgegevens en protocollen worden aan de juiste batch gekoppeld. Het dossier is compleet op elk moment.',
          image: '/landing/auto-leuven-biotech.webp',
          alt: 'Cryogene opslagvaten in een onderzoeksfaciliteit',
        },
        {
          title: 'Documentatie',
          body: 'Documentatie volgt het systeem dat ze beschrijft. Een auditor leest de versie die ook echt draait.',
          image: '/landing/auto-leuven-bibliotheek.webp',
          alt: 'Een lege universitaire leeszaal met houten tafels',
        },
        {
          title: 'Consortiummail',
          body: 'Partnercorrespondentie wordt gesorteerd met het juiste werkpakket erbij. Niets blijft liggen tot de deadline.',
          image: '/landing/auto-leuven-kantoor.webp',
          alt: 'Een spin-offkantoor met schoongeveegde whiteboards',
        },
      ],
      faqs: [
        {
          q: 'Onze ingenieurs zouden dit zelf kunnen bouwen. Moeten ze dat doen?',
          a: 'Meestal niet, en de reden is prioriteit, geen kunde. Interne tooling in een onderzoeksbedrijf staat permanent onder het product op de backlog, wordt gebouwd door wie een rustige week heeft, en blijft verweesd achter wanneer die persoon vertrekt. Vindt uw team het werk echt interessant, bouw het dan intern. Is het net dat wat altijd uitgesteld wordt, dan is dát het signaal.',
        },
        {
          q: 'Kan het systeem vertrouwd worden met inhoud die naar een financier gaat?',
          a: 'Het mag nooit onbewaakt vertrouwd worden, en zo worden ze ook niet gebouwd. Het systeem verzamelt en stelt op; een onderzoeker kijkt na en tekent af. De winst zit in het verzamelen, wat mechanisch is, niet in het oordeel over wat u claimt, wat dat niet is. Alles wat namens u indient zonder nazicht is een risico in plaats van een functie.',
        },
        {
          q: 'Onze IP ís het bedrijf. Waar gaat de data naartoe?',
          a: 'Nergens, als u het lokaal draait, en dat kiezen de meeste deeptech-bedrijven. Het model draait binnen uw eigen infrastructuur, zodat broncode, onderzoeksdata en ongepubliceerde resultaten nooit naar een derde partij gaan. Voor een bedrijf waarvan de waardering rust op wat het weet, is dat doorgaans niet onderhandelbaar, en het is de opzet waar we standaard voor ontwerpen.',
        },
        {
          q: 'We zijn een spin-off met beperkte runway. Is dit nu al betaalbaar?',
          a:
            'Dat hangt volledig af van waar uw senior tijd naartoe gaat. Kosten de rapporteringsverplichtingen uw team meerdere weken per jaar, dan valt de rekensom meestal gunstig uit; kosten ze enkele dagen, dan niet, en dat stelt u beter vast in het eerste gesprek. Een leverancier die u niet kan zeggen wanneer het antwoord nee is, is in deze fase geen nuttige leverancier.',
        },
      ],
      seoTitle: 'AI-automatisering in Leuven · Nivora',
      seoDescription:
        'AI-automatisering voor onderzoeksgedreven bedrijven in Leuven: subsidie- en projectrapportering, technische documentatie en consortiumadministratie, op uw eigen infrastructuur. Door Nivora, software- en AI-studio in Brugge.',
    },
  },
})
