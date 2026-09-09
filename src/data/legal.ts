import type { Lang, Localized } from '@/i18n'
import {
  COMPANY,
  COMPANY_ADDRESS_EN,
  COMPANY_ADDRESS_NL,
  DPA,
} from '@/data/company'

/**
 * De drie juridische documenten van nivoraworks.com.
 *
 * Twee regels waar niet van afgeweken wordt:
 *
 *  1. Elk feit hier moet kloppen met wat de site echt doet. De vorige versie
 *     schreef "als we later analytics toevoegen, vermelden we ze hier", terwijl
 *     lib/siteAnalytics.ts en lib/blogAnalytics.ts al maanden meten en op IP
 *     bedrijven herkennen. Een privacybeleid dat iets anders zegt dan de code
 *     doet, is erger dan geen privacybeleid. Wijzigt de meting, wijzigt deze
 *     tekst mee.
 *  2. Bedrijfsgegevens komen uit data/company.ts, nooit hardgecodeerd.
 *
 * Aansprakelijkheid: sinds 1 december 2020 toetst Boek VI WER ook B2B-bedingen.
 * Een clausule die opzet of zware fout uitsluit staat op de grijze lijst
 * (art. VI.91/5, 5°) en wordt dan voor NIET GESCHREVEN gehouden, waardoor je
 * zonder enige beperking overblijft. Daarom staat de uitzondering voor opzet,
 * zware fout en essentiële verbintenissen uitdrukkelijk in de tekst.
 */

export type LegalBlock = string | { list: string[] }
export type LegalSection = { heading: string; blocks: LegalBlock[] }
export type LegalSlug = 'terms' | 'privacy'
export type LegalDoc = {
  slug: LegalSlug
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

const CONTACT_EMAIL = COMPANY.email
const CONTACT_PHONE = COMPANY.phone
const UPDATED_EN = 'September 9, 2026'
const UPDATED_NL = '9 september 2026'

const IDENTITY_NL = `${COMPANY.legalName}, ${COMPANY_ADDRESS_NL}. Ondernemingsnummer en btw-nummer ${COMPANY.enterpriseNumber}. E-mail ${CONTACT_EMAIL}, telefoon ${CONTACT_PHONE}.`
const IDENTITY_EN = `${COMPANY.legalNameEn}, ${COMPANY_ADDRESS_EN}. Company and VAT number ${COMPANY.enterpriseNumber}. Email ${CONTACT_EMAIL}, phone ${CONTACT_PHONE}.`

/* ────────────────────────────────────────────────────────────────────────────
   VOORWAARDEN
   ──────────────────────────────────────────────────────────────────────── */

const TERMS_EN: LegalDoc = {
  slug: 'terms',
  title: 'Terms of Service',
  updated: UPDATED_EN,
  intro:
    'These terms cover how we work together when you engage Nivora to advise on, design, build, or support an AI system. Most of it is written for work with businesses; a separate chapter sets out the rights you have if you engage us as a private individual. By working with us or using this website, you agree to what is set out below.',
  sections: [
    {
      heading: 'Who we are',
      blocks: [
        IDENTITY_EN,
        'Nivora is a software and AI studio based in Bruges, Belgium. We design and build custom AI systems for businesses, across three stages: consulting to find what is worth building, implementation to design and ship it, and support to keep it running and improving.',
      ],
    },
    {
      heading: 'What these terms apply to',
      blocks: [
        'These terms apply to this website and to the services we sell from it.',
        'Most of what follows is written for work with businesses. We also work with private individuals, and Belgian consumer law gives them rights that a set of terms cannot take away. If you are engaging us privately, outside any professional activity, read the chapter “If you are a consumer” below. That chapter overrides anything elsewhere in these terms that would give you less.',
        'Our own applications have their own agreements. Box, Voice and the Nivora platform at app.nivoraworks.com are covered by the terms published on their own pages, not by this document.',
        'The exact scope, deliverables, timeline, and price for each engagement are set out in a separate proposal or statement of work. Where that document and these terms disagree, the proposal wins for that project.',
      ],
    },
    {
      heading: 'How an engagement works',
      blocks: [
        'Before a full project, we usually prove the value on a small, real slice of your work. That means taking one concrete task and building a working version of the system around it, using your data and your process. If it clearly helps, we scope the full build from there. If it does not, you have lost a small step instead of a large one.',
        'A proposal becomes an agreement once you accept it in writing, which includes email. We confirm that acceptance, and you receive the proposal and these terms at that point in a form you can keep.',
        'We conclude agreements in Dutch or in English, whichever you prefer. We keep the proposal and the acceptance on file; ask for a copy later and we will send it.',
      ],
    },
    {
      heading: 'Quotes, fees, and payment',
      blocks: [
        'Unless the proposal says otherwise:',
        {
          list: [
            'A quote stays valid for 30 days.',
            'We ask 30% on order, and the rest according to the stages in the proposal.',
            'Invoices are payable within 14 days of the invoice date.',
            'Prices exclude VAT and any third-party costs, such as hosting, model usage, or licences.',
            'Recurring support or hosting is billed on the cycle agreed in writing.',
          ],
        },
        'If an invoice is not paid on time, interest runs by operation of law and without notice, at the statutory rate for commercial transactions under the Belgian Act of 2 August 2002, together with the fixed 40 euro compensation for recovery costs provided by that Act. On top of that, a fixed indemnity of 10% of the outstanding amount is owed, with a minimum of 125 euro. This paragraph applies between businesses only; if you are a consumer, the free reminder and the legal caps in the consumer chapter apply instead.',
        'We can suspend work while an invoice is seriously overdue. We will tell you before we do.',
      ],
    },
    {
      heading: 'What we need from you',
      blocks: [
        'To build something that works, we rely on you to give us timely access to the people, systems, data, and decisions a project needs. You confirm that you have the right to share any data and accounts you give us access to, and that doing so does not break a law or another agreement you are bound by.',
        'Delays or missing access on your side can affect timelines and cost. We will flag this as early as we can.',
      ],
    },
    {
      heading: 'Delivery and warranty',
      blocks: [
        'We deliver in stages. You have ten working days after each delivery to report anything that does not match the agreed scope. Without a report in that window, and in any case once you start using the delivery in production, the stage counts as accepted.',
        'For 30 days after delivery we fix defects in what we built free of charge. After that, corrections and changes run through a maintenance agreement or a new assignment. The warranty does not cover changes you or a third party made yourself, faults in third-party software, or use outside what was agreed.',
      ],
    },
    {
      heading: 'Ownership of what we build',
      blocks: [
        'Your data stays yours. The custom work we deliver for your project, including the configuration and code written specifically for you, becomes yours once the related invoices are paid in full.',
        'We keep ownership of the general tools, libraries, methods, and know-how we bring to the work and reuse across clients. We grant you a perpetual, non-exclusive licence to use these as part of your delivered system. Open-source and third-party components stay under their own licences.',
      ],
    },
    {
      heading: 'Private by design',
      blocks: [
        'Where a project calls for it, we build systems that run inside your own environment or on infrastructure you control, so your data does not have to leave your walls. Where a system runs and who can access it is agreed per project.',
        'Where we process personal data on your behalf, we act as your processor and we sign a data processing agreement under article 28 GDPR before that processing starts.',
      ],
    },
    {
      /* See the Dutch version: the first question a large client's legal team
         asks anyone building AI. Keep this in step with which providers we
         actually use. */
      heading: 'Your data does not train models',
      blocks: [
        'What you give us, and what runs through a system we build for you, is not used to train or improve AI models. Not for us, not for the next client, and not to turn into a product.',
        'We pick our providers on that too. The models we use run on business terms in which the provider contractually commits not to train on your content.',
        'If we want to improve a system using real examples from your work, we ask separately and in writing. You can say no, and it changes nothing else about the engagement.',
      ],
    },
    {
      heading: 'AI outputs and human oversight',
      blocks: [
        'AI systems produce useful results but they are not perfect and can be wrong or incomplete. The systems we build are tools to support your work, not a replacement for human judgement. You are responsible for reviewing outputs before relying on them for decisions, and for keeping a human in the loop where the stakes call for it. We will tell you plainly where a system is strong and where it needs checking.',
        'The assistant on this website is an AI system. It says so before you start, as article 50 of the European AI Act requires. Its answers are informative and never form an offer or an agreement.',
        'Where we build an AI system for you, you are its deployer under the AI Act. We tell you which obligations that brings for your use, and we build the transparency and logging the system needs to meet them.',
      ],
    },
    {
      heading: 'Confidentiality',
      blocks: [
        'Each side will keep the other side’s non-public information confidential and use it only to carry out the work. This does not apply to information that is already public, that you or we already had, or that the law requires us to disclose. This duty continues for five years after the engagement ends.',
        'We may work with freelancers or subcontractors. They are bound by the same confidentiality, and we stay responsible for their work towards you.',
      ],
    },
    {
      heading: 'Naming you as a client',
      blocks: [
        'We may mention your name and logo as a client, and describe the work in general terms. You can object in writing at any time, and we then remove it. We never publish anything confidential about your business without your explicit approval.',
      ],
    },
    {
      heading: 'Liability',
      blocks: [
        'We carry out our work with reasonable skill and care, as an obligation of means. Beyond what is agreed in the proposal, our services and this website are provided as is.',
        'To the extent the law allows, we are not liable for indirect or consequential loss, lost profit, lost turnover, lost savings, or lost data, and our total liability for an engagement is limited to the fees you paid us for that engagement in the twelve months before the event that caused the damage.',
        'These limits never apply to:',
        {
          list: [
            'our own intent or gross negligence, or that of the people we bring in;',
            'failure to perform the essential obligations that form the subject of the agreement, except in case of force majeure;',
            'damage to life, limb or health;',
            'any liability that cannot be limited under Belgian law.',
          ],
        },
        'This carve-out is deliberate. Under the Belgian rules on unfair terms between businesses, a clause that excludes intent or gross negligence is presumed unlawful and is then treated as not written, which would leave no limit at all.',
      ],
    },
    {
      /* Article VI.45, §1, 7° WER: the complaint handling policy has to be
         known up front. See the Dutch version. */
      heading: 'If something goes wrong',
      blocks: [
        `Tell us first. Email ${CONTACT_EMAIL} or call ${CONTACT_PHONE}, with what happened and what you would like to see. We confirm within two working days that we have read it, and within ten working days we come back with an answer or a proposal to put it right. If working it out takes longer, we say so and we say when you will hear from us.`,
        'If we cannot resolve it together, the way to court stays open. If you are a consumer, you can go to the Belgian Consumer Mediation Service free of charge first; the consumer chapter above explains how.',
        'We are not bound by any code of conduct.',
      ],
    },
    {
      heading: 'Force majeure',
      blocks: [
        'Neither side is liable for a delay or failure caused by something outside its reasonable control, such as an outage at a hosting or model provider, a cyber attack, a strike, or a government measure. If that situation lasts longer than 60 days, either side can end the engagement in writing, and you pay for work done up to that point.',
      ],
    },
    {
      heading: 'Ending an engagement',
      blocks: [
        'A project ends when it is delivered and paid. Recurring support or hosting runs for a month at a time and renews automatically. You can end it with one month’s written notice, we with three months’ written notice.',
        'If you end a project early, you pay for work done and for costs we already committed to. Either side can end the agreement immediately, in writing, if the other side is in serious breach and has not fixed it within 15 days of a written notice.',
      ],
    },
    {
      /* See the Dutch chapter for why this exists: Belgian consumer law is
         mandatory, so this restores what the rest of the document would
         otherwise take away. Keep both language versions in step. */
      heading: 'If you are a consumer',
      blocks: [
        'If you engage us privately, outside any professional activity, you are a consumer. This chapter then overrides the rest of these terms. Wherever the rest would give you less than mandatory Belgian consumer law, the law applies and our wording does not.',
        'What you get up front. Before you order, the proposal sets out exactly what we do, what it costs including VAT, when we deliver, and what happens afterwards. You only order once you agree to that.',
        'Your right of withdrawal. If we conclude the agreement at a distance or away from our premises, you have fourteen days to withdraw from it without giving a reason. That period runs from the day the agreement is concluded. A clear statement by email to ' + CONTACT_EMAIL + ' is enough, and you may also use the model form below. We confirm receipt and refund everything you have already paid within fourteen days.',
        'If you want us to start sooner. At your express request we will begin within those fourteen days. If you then still withdraw, you pay only for the part already done, in proportion to the full price. If the work is fully performed at your request before the fourteen days are up, and you acknowledged beforehand that this ends your right of withdrawal, you can no longer withdraw. We always ask for both of those separately and in writing, never through a pre-ticked box.',
        'Model withdrawal form. Copy these lines into an email or a letter:',
        {
          list: [
            'To ' + COMPANY.legalNameEn + ', ' + COMPANY_ADDRESS_EN + ', ' + CONTACT_EMAIL + '.',
            'I hereby give notice that I withdraw from our agreement for the following service: (description).',
            'Ordered on: (date).',
            'Name and address of the consumer.',
            'Date, and on paper your signature as well.',
          ],
        },
        'Your legal guarantee. If what we deliver does not match what we agreed, you have the rights Belgian consumer law gives you: repair, replacement, a price reduction, or termination of the agreement. For digital content and digital services that legal conformity guarantee runs for two years, and for as long as we keep supplying where supply is continuous. Our thirty-day warranty above comes on top of that and does not limit those rights. The ten working days for checking a delivery do not run against you either: your legal rights do not lapse because you reported something later.',
        'If you pay late. We send you a free reminder first. Costs can only be added fourteen calendar days after the day you receive that reminder, and they stay within the limits of Book XIX of the Belgian Code of Economic Law:',
        {
          list: [
            'up to 150 euro outstanding: 20 euro at most;',
            'from 150.01 to 500 euro: 30 euro at most, plus 10% of the amount above 150 euro;',
            'above 500 euro: 65 euro at most, plus 5% of the amount above 500 euro, capped at 2,000 euro.',
          ],
        },
        'Interest stays limited to the statutory rate. The 10% indemnity with a 125 euro minimum and the fixed 40 euro recovery costs from the payment chapter therefore do not apply to you.',
        'Our liability towards you. The cap above only works as far as consumer law allows. It never applies to damage to life, body or health, and never to our own intent or gross fault.',
        'If we cannot work it out together. You can go to the Belgian Consumer Mediation Service free of charge: North Gate II, Koning Albert II-laan 8 bus 1, 1000 Brussels, contact@consumentenombudsdienst.be, consumentenombudsdienst.be. That service mediates before a court gets involved. You can also go straight to court: the clause naming the courts of ' + COMPANY.courtEn + ' below does not bind you, and you can bring your case before the court where you live.',
      ],
    },
    {
      heading: 'Changes to these terms',
      blocks: [
        'We may update these terms as our work evolves. The current version is always the one on this page, with the date it was last updated. For engagements already running, the version in force when the proposal was accepted keeps applying unless we agree otherwise.',
      ],
    },
    {
      heading: 'Governing law and courts',
      blocks: [
        `These terms are governed by Belgian law. Any dispute falls under the courts of ${COMPANY.courtEn}, unless mandatory law says otherwise. That reservation matters for consumers: this clause does not bind you, see the consumer chapter above. Before going to court, we will always try to sort it out in a conversation first.`,
      ],
    },
    {
      heading: 'Contact',
      blocks: [
        `Questions about these terms? Email ${CONTACT_EMAIL} or call ${CONTACT_PHONE}.`,
      ],
    },
  ],
}

const TERMS_NL: LegalDoc = {
  slug: 'terms',
  title: 'Algemene voorwaarden',
  updated: UPDATED_NL,
  intro:
    'Deze voorwaarden beschrijven hoe we samenwerken wanneer u Nivora inschakelt om te adviseren over, te ontwerpen, te bouwen of te ondersteunen bij een AI-systeem. Ze zijn geschreven voor werk met ondernemingen. Door met ons samen te werken of deze website te gebruiken, gaat u akkoord met wat hieronder staat.',
  sections: [
    {
      heading: 'Wie we zijn',
      blocks: [
        IDENTITY_NL,
        'Nivora is een software- en AI-studio uit Brugge. We ontwerpen en bouwen AI-systemen op maat voor bedrijven, in drie fases: consulting om te bepalen wat de moeite waard is om te bouwen, implementatie om het te ontwerpen en uit te rollen, en support om het draaiende en in verbetering te houden.',
      ],
    },
    {
      heading: 'Waarop deze voorwaarden van toepassing zijn',
      blocks: [
        'Deze voorwaarden gelden voor deze website en voor de diensten die we van hieruit verkopen.',
        'Het meeste hieronder is geschreven voor werk met ondernemingen. We werken ook met particulieren, en het Belgische consumentenrecht geeft hen rechten die geen enkele voorwaarde kan afnemen. Werkt u met ons als privépersoon, buiten elke beroepsactiviteit, lees dan het hoofdstuk “Als u een particulier bent” verderop. Dat hoofdstuk gaat vóór op alles wat elders in deze voorwaarden minder zou geven.',
        'Onze eigen apps hebben hun eigen overeenkomst. Box, Voice en het Nivora-platform op app.nivoraworks.com vallen onder de voorwaarden op hun eigen pagina, niet onder dit document.',
        'De exacte scope, opleveringen, timing en prijs van elke opdracht staan in een aparte offerte of opdrachtbeschrijving. Waar dat document en deze voorwaarden van elkaar verschillen, geldt voor dat project de offerte.',
      ],
    },
    {
      heading: 'Hoe een opdracht verloopt',
      blocks: [
        'Voor we aan een volledig project beginnen, bewijzen we de waarde meestal eerst op een klein, echt stuk van uw werk. Dat betekent dat we één concrete taak nemen en daar een werkende versie van het systeem omheen bouwen, met uw data en uw proces. Als het duidelijk helpt, bepalen we van daaruit de scope van de volledige bouw. Zo niet, dan hebt u een kleine stap verloren in plaats van een grote.',
        'Een offerte wordt een overeenkomst zodra u ze schriftelijk aanvaardt. Een e-mail volstaat. We bevestigen die aanvaarding, en u krijgt de offerte en deze voorwaarden op dat moment in een vorm die u kunt bewaren.',
        'We sluiten overeenkomsten in het Nederlands of in het Engels, wat u verkiest. We bewaren de offerte en de aanvaarding in ons dossier; vraagt u er later een kopie van, dan bezorgen we die.',
      ],
    },
    {
      heading: 'Offertes, prijzen en betaling',
      blocks: [
        'Tenzij de offerte iets anders zegt:',
        {
          list: [
            'Een offerte blijft 30 dagen geldig.',
            'We vragen 30% bij bestelling, de rest volgens de fases in de offerte.',
            'Facturen zijn betaalbaar binnen 14 dagen na factuurdatum.',
            'Prijzen zijn exclusief btw en exclusief kosten van derden, zoals hosting, modelgebruik of licenties.',
            'Terugkerende support of hosting wordt gefactureerd volgens de schriftelijk afgesproken cyclus.',
          ],
        },
        'Wordt een factuur niet op tijd betaald, dan loopt van rechtswege en zonder ingebrekestelling interest aan de wettelijke rentevoet voor handelstransacties uit de wet van 2 augustus 2002, samen met de forfaitaire vergoeding van 40 euro voor invorderingskosten die diezelfde wet voorziet. Daarbovenop is een forfaitaire schadevergoeding verschuldigd van 10% van het openstaande bedrag, met een minimum van 125 euro. Deze paragraaf geldt enkel tussen ondernemingen; bent u een consument, dan gelden in de plaats de gratis herinnering en de wettelijke bovengrenzen uit het consumentenhoofdstuk.',
        'We kunnen het werk opschorten zolang een factuur ernstig achterstallig is. We laten dat op voorhand weten.',
      ],
    },
    {
      heading: 'Wat we van u nodig hebben',
      blocks: [
        'Om iets te bouwen dat werkt, rekenen we erop dat u ons tijdig toegang geeft tot de mensen, systemen, data en beslissingen die een project nodig heeft. U bevestigt dat u het recht hebt om de data en accounts waartoe u ons toegang geeft te delen, en dat dit geen wet of andere overeenkomst schendt waaraan u gebonden bent.',
        'Vertraging of ontbrekende toegang aan uw kant kan de timing en de kosten beïnvloeden. We melden dit zo vroeg mogelijk.',
      ],
    },
    {
      heading: 'Oplevering en garantie',
      blocks: [
        'We leveren op in fases. U hebt na elke oplevering tien werkdagen om te melden wat niet overeenkomt met de afgesproken scope. Zonder melding binnen die termijn, en in elk geval zodra u de oplevering in productie gebruikt, geldt die fase als aanvaard.',
        'Gedurende 30 dagen na oplevering herstellen we gebreken in wat we bouwden kosteloos. Daarna verlopen correcties en wijzigingen via een onderhoudsovereenkomst of een nieuwe opdracht. De garantie dekt niet wat u of een derde zelf wijzigde, fouten in software van derden, of gebruik buiten wat werd afgesproken.',
      ],
    },
    {
      heading: 'Eigendom van wat we bouwen',
      blocks: [
        'Uw data blijft van u. Het maatwerk dat we voor uw project opleveren, inclusief de configuratie en code die specifiek voor u is geschreven, wordt van u zodra de bijhorende facturen volledig betaald zijn.',
        'Wij behouden het eigendom van de algemene tools, libraries, methodes en knowhow die we naar het werk meebrengen en hergebruiken bij verschillende klanten. We geven u daarop een eeuwigdurende, niet-exclusieve licentie om ze te gebruiken als onderdeel van uw opgeleverde systeem. Open source- en componenten van derden blijven onder hun eigen licenties vallen.',
      ],
    },
    {
      heading: 'Privé van bij het ontwerp',
      blocks: [
        'Waar een project erom vraagt, bouwen we systemen die draaien binnen uw eigen omgeving of op infrastructuur die u beheert, zodat uw data uw muren niet hoeft te verlaten. Waar een systeem draait en wie er toegang toe heeft, spreken we per project af.',
        'Waar we persoonsgegevens verwerken in uw opdracht, treden we op als uw verwerker en sluiten we vóór die verwerking begint een verwerkersovereenkomst volgens artikel 28 AVG.',
      ],
    },
    {
      /* De vraag die de juridische dienst van een grote klant als eerste
         stelt aan wie AI bouwt. Ze stond nergens, terwijl het antwoord in ons
         voordeel is: de modellen die we gebruiken draaien op zakelijke
         voorwaarden waarin de aanbieder zich ertoe verbindt niet op klant-
         inhoud te trainen. Verandert die leverancierskeuze, dan verandert
         deze belofte mee, of ze gaat eruit. */
      heading: 'Uw data traint geen modellen',
      blocks: [
        'Wat u ons geeft, en wat door een systeem loopt dat we voor u bouwen, gebruiken we niet om AI-modellen te trainen of te verbeteren. Niet voor onszelf, niet voor een volgende klant, en niet om er een product van te maken.',
        'We kiezen onze leveranciers ook daarop. De modellen die we inzetten draaien op zakelijke voorwaarden waarin de aanbieder zich er contractueel toe verbindt niet op uw inhoud te trainen.',
        'Willen we een systeem verbeteren met echte voorbeelden uit uw werk, dan vragen we dat apart en schriftelijk. U mag nee zeggen, en dat heeft geen gevolg voor de rest van de opdracht.',
      ],
    },
    {
      heading: 'AI-output en menselijk toezicht',
      blocks: [
        'AI-systemen leveren nuttige resultaten, maar ze zijn niet perfect en kunnen fout of onvolledig zijn. De systemen die we bouwen zijn tools die uw werk ondersteunen, geen vervanging van menselijk oordeel. U bent zelf verantwoordelijk om output te controleren voor u er beslissingen op baseert, en om een mens in de lus te houden waar de inzet dat vraagt. We zeggen u duidelijk waar een systeem sterk in is en waar het nagekeken moet worden.',
        'De assistent op deze website is een AI-systeem. Dat staat er ook bij voor u begint, zoals artikel 50 van de Europese AI-verordening vraagt. Zijn antwoorden zijn informatief en vormen nooit een aanbod of een overeenkomst.',
        'Bouwen we een AI-systeem voor u, dan bent u daarvan de gebruiksverantwoordelijke onder de AI-verordening. We zeggen u welke verplichtingen dat voor uw gebruik meebrengt, en we bouwen de transparantie en logging die het systeem nodig heeft om eraan te voldoen.',
      ],
    },
    {
      heading: 'Vertrouwelijkheid',
      blocks: [
        'Elke partij houdt de niet-publieke informatie van de andere partij vertrouwelijk en gebruikt die enkel om het werk uit te voeren. Dit geldt niet voor informatie die al publiek is, die u of wij al hadden, of die we wettelijk verplicht zijn vrij te geven. Deze plicht blijft vijf jaar gelden nadat de opdracht is afgelopen.',
        'We kunnen met freelancers of onderaannemers werken. Zij zijn gebonden door dezelfde geheimhouding, en wij blijven tegenover u verantwoordelijk voor hun werk.',
      ],
    },
    {
      heading: 'U als referentie noemen',
      blocks: [
        'We mogen uw naam en logo als klant vermelden en het werk in algemene bewoordingen beschrijven. U kunt daar op elk moment schriftelijk bezwaar tegen maken, en dan halen we het weg. We publiceren nooit iets vertrouwelijks over uw zaak zonder uw uitdrukkelijke akkoord.',
      ],
    },
    {
      heading: 'Aansprakelijkheid',
      blocks: [
        'We voeren ons werk uit met redelijke vakkundigheid en zorg, als een middelenverbintenis. Buiten wat in de offerte is afgesproken, worden onze diensten en deze website geleverd in de staat waarin ze zich bevinden.',
        'Voor zover de wet dit toelaat, zijn we niet aansprakelijk voor indirecte schade of gevolgschade, gederfde winst, gemiste omzet, gemiste besparingen of verloren data, en is onze totale aansprakelijkheid voor een opdracht beperkt tot de vergoedingen die u ons voor die opdracht hebt betaald in de twaalf maanden vóór het schadegeval.',
        'Deze beperkingen gelden nooit voor:',
        {
          list: [
            'ons eigen opzet of onze zware fout, of die van de mensen die we inschakelen;',
            'het niet uitvoeren van de essentiële verbintenissen die het voorwerp van de overeenkomst uitmaken, behalve bij overmacht;',
            'schade aan leven, lichaam of gezondheid;',
            'elke aansprakelijkheid die naar Belgisch recht niet beperkt kan worden.',
          ],
        },
        'Die uitzondering staat er bewust in. Onder de Belgische regels rond onrechtmatige bedingen tussen ondernemingen wordt een clausule die opzet of zware fout uitsluit vermoed onrechtmatig te zijn, en dan voor niet geschreven gehouden. Zonder deze uitzondering zou er dus helemaal geen beperking overblijven.',
      ],
    },
    {
      /* Artikel VI.45, §1, 7° WER: het klachtenbehandelingsbeleid moet vooraf
         bekend zijn. Het stond nergens, terwijl het het goedkoopste artikel
         van het hele document is om waar te maken. */
      heading: 'Als er iets misloopt',
      blocks: [
        `Vertel het ons eerst. Mail naar ${CONTACT_EMAIL} of bel ${CONTACT_PHONE}, met wat er gebeurd is en wat u zou willen. We bevestigen binnen twee werkdagen dat we het gelezen hebben, en we komen binnen tien werkdagen met een antwoord of met een voorstel om het recht te zetten. Duurt het uitzoeken langer, dan zeggen we dat en zeggen we ook wanneer u wel iets hoort.`,
        'Raken we er samen niet uit, dan staat de weg naar de rechter open. Bent u een consument, dan kunt u eerst gratis terecht bij de Consumentenombudsdienst; het consumentenhoofdstuk hierboven zegt hoe.',
        'We zijn niet aangesloten bij een gedragscode.',
      ],
    },
    {
      heading: 'Overmacht',
      blocks: [
        'Geen van beide partijen is aansprakelijk voor vertraging of niet-uitvoering door iets buiten haar redelijke controle, zoals een storing bij een hosting- of modelleverancier, een cyberaanval, een staking of een overheidsmaatregel. Duurt zo’n situatie langer dan 60 dagen, dan kan elke partij de opdracht schriftelijk beëindigen, en betaalt u het werk dat tot dan geleverd is.',
      ],
    },
    {
      heading: 'Een opdracht beëindigen',
      blocks: [
        'Een project eindigt wanneer het opgeleverd en betaald is. Terugkerende support of hosting loopt per maand en verlengt automatisch. U kunt ze schriftelijk opzeggen met één maand opzegtermijn, wij met drie maanden.',
        'Stopt u een project vroegtijdig, dan betaalt u het geleverde werk en de kosten die we al aangingen. Elke partij kan de overeenkomst onmiddellijk en schriftelijk beëindigen als de andere partij ernstig tekortschiet en dat niet herstelt binnen 15 dagen na een schriftelijke aanmaning.',
      ],
    },
    {
      /* Boek VI en boek XIX WER zijn van dwingend recht: wat hier onder staat
         kan een consument niet contractueel worden afgenomen. Dit hoofdstuk
         staat er daarom niet "voor de zekerheid" bij, het herstelt de tekst.
         Drie dingen die elders in deze voorwaarden staan, gelden niet voor een
         consument: het schadebeding van 10%, de forfaitaire 40 euro, en de
         bevoegde rechtbank van Brugge. */
      heading: 'Als u een particulier bent',
      blocks: [
        'Werkt u met ons als privépersoon, buiten elke beroepsactiviteit, dan bent u een consument. Dit hoofdstuk gaat dan vóór op de rest van deze voorwaarden. Waar de rest u minder zou geven dan het dwingende consumentenrecht, geldt de wet en niet onze tekst.',
        'Wat u vooraf krijgt. Voor u bestelt, zetten we in de offerte wat we precies doen, wat het kost inclusief btw, wanneer we opleveren en wat er daarna gebeurt. U bestelt pas als u daarmee akkoord gaat.',
        'Uw herroepingsrecht. Sluiten we de overeenkomst op afstand of buiten onze kantoren, dan hebt u veertien dagen om ze te herroepen zonder een reden op te geven. Die termijn loopt vanaf de dag waarop de overeenkomst wordt gesloten. Een duidelijke verklaring per mail naar ' + CONTACT_EMAIL + ' volstaat, en u mag ook het modelformulier hieronder gebruiken. We bevestigen de ontvangst en betalen binnen veertien dagen alles terug wat u al betaalde.',
        'Wilt u dat we vroeger beginnen. Op uw uitdrukkelijk verzoek starten we al binnen die veertien dagen. Herroept u daarna alsnog, dan betaalt u enkel het deel dat op dat moment al gedaan was, in verhouding tot de volledige prijs. Is het werk op uw verzoek volledig uitgevoerd voor het einde van de veertien dagen, en hebt u vooraf erkend dat u daardoor uw herroepingsrecht verliest, dan kunt u niet meer herroepen. We vragen die twee dingen altijd apart en schriftelijk, nooit in een vinkje dat al aanstaat.',
        'Modelformulier voor herroeping. Neem deze regels over in een mail of een brief:',
        {
          list: [
            'Aan ' + COMPANY.legalName + ', ' + COMPANY_ADDRESS_NL + ', ' + CONTACT_EMAIL + '.',
            'Ik deel u hierbij mee dat ik onze overeenkomst voor de volgende dienst herroep: (omschrijving).',
            'Besteld op: (datum).',
            'Naam en adres van de consument.',
            'Datum, en op papier ook uw handtekening.',
          ],
        },
        'Uw wettelijke garantie. Beantwoordt wat we leveren niet aan wat we afgesproken hadden, dan hebt u de rechten die het Belgische consumentenrecht u geeft: herstel, vervanging, een prijsvermindering of de ontbinding van de overeenkomst. Voor digitale inhoud en digitale diensten loopt die wettelijke conformiteitsgarantie twee jaar, en bij doorlopende levering zolang we leveren. Onze garantie van dertig dagen hierboven komt daar bovenop en beperkt die rechten niet. Ook de termijn van tien werkdagen om een oplevering na te kijken geldt niet tegen u: uw wettelijke rechten vervallen niet omdat u iets later meldt.',
        'Als u te laat betaalt. Dan sturen we u eerst een gratis herinnering. Pas veertien kalenderdagen na de dag waarop u die herinnering ontvangt, kunnen er kosten bijkomen, en die blijven binnen de grenzen van boek XIX van het Wetboek van economisch recht:',
        {
          list: [
            'tot 150 euro openstaand: hoogstens 20 euro;',
            'van 150,01 tot 500 euro: hoogstens 30 euro plus 10% van het bedrag boven 150 euro;',
            'boven 500 euro: hoogstens 65 euro plus 5% van het bedrag boven 500 euro, met een absolute bovengrens van 2.000 euro.',
          ],
        },
        'De interest blijft daarbij beperkt tot de wettelijke interestvoet. Het schadebeding van 10% met een minimum van 125 euro en de forfaitaire 40 euro invorderingskosten uit het hoofdstuk over betaling gelden dus niet voor u.',
        'Onze aansprakelijkheid tegenover u. De beperking hierboven werkt alleen voor zover het consumentenrecht dat toelaat. Ze geldt nooit voor schade aan leven, lichaam of gezondheid, en nooit voor ons opzet of onze zware fout.',
        'Als we er samen niet uitraken. Dan kunt u gratis terecht bij de Consumentenombudsdienst, North Gate II, Koning Albert II-laan 8 bus 1, 1000 Brussel, contact@consumentenombudsdienst.be, consumentenombudsdienst.be. Die dienst bemiddelt voor er een rechtbank aan te pas komt. U kunt ook meteen naar de rechter stappen: de bevoegdheidsregel van ' + COMPANY.court + ' verderop geldt niet voor u, u kunt terecht bij de rechtbank van uw eigen woonplaats.',
      ],
    },
    {
      heading: 'Wijzigingen aan deze voorwaarden',
      blocks: [
        'We kunnen deze voorwaarden aanpassen naarmate ons werk evolueert. De geldende versie is altijd die op deze pagina, met de datum van de laatste update. Voor lopende opdrachten blijft de versie gelden die van kracht was toen de offerte werd aanvaard, tenzij we iets anders afspreken.',
      ],
    },
    {
      heading: 'Toepasselijk recht en bevoegde rechtbank',
      blocks: [
        `Deze voorwaarden worden beheerst door het Belgisch recht. Elk geschil valt onder de rechtbanken van ${COMPANY.court}, tenzij dwingend recht anders bepaalt. Dat voorbehoud telt voor consumenten: dit beding bindt u niet, zie het consumentenhoofdstuk hierboven. Voor we naar de rechtbank stappen, proberen we het altijd eerst in een gesprek op te lossen.`,
      ],
    },
    {
      heading: 'Contact',
      blocks: [
        `Vragen over deze voorwaarden? Mail naar ${CONTACT_EMAIL} of bel ${CONTACT_PHONE}.`,
      ],
    },
  ],
}

/* ────────────────────────────────────────────────────────────────────────────
   PRIVACYBELEID
   ──────────────────────────────────────────────────────────────────────── */

const PRIVACY_EN: LegalDoc = {
  slug: 'privacy',
  title: 'Privacy Policy',
  updated: UPDATED_EN,
  intro:
    'This policy explains what personal data Nivora handles, why, and the rights you have. It describes what actually happens on this website, including the measurement that runs on it. We keep the data we hold to a minimum, on purpose.',
  sections: [
    {
      heading: 'Who is responsible',
      blocks: [
        `${IDENTITY_EN} We are the controller for the personal data described here.`,
        'This policy covers this website, our direct contact with you, and the business emails we send. Personal data we process inside a client project, on your behalf, is governed by the engagement agreement and a separate data processing agreement, where we act as processor and not as controller. Box and the Nivora platform have their own privacy policies.',
      ],
    },
    {
      heading: 'What we collect, and when',
      blocks: [
        'When you contact us or fill in a form: your name, company, email address, phone number, the page you were on, and whatever you write to us. This lands in our own CRM.',
        'When you subscribe to our newsletter: your email address, and your name and phone number if you give them. We use double opt-in, so nothing is sent until you confirm through a link in an email.',
        'When you use the assistant on this site: the messages you type and the answers it gives. Those messages are sent to Anthropic, which runs the model, and are not used to train it.',
        'When you visit the site: measurement data, described in the next section.',
        'When you become a client: the contract, correspondence and invoicing data we need to do the work and keep our books.',
        'We do not ask for special categories of data, and we ask you not to send sensitive personal data through general contact channels.',
      ],
    },
    {
      heading: 'How we measure this website',
      blocks: [
        'We run our own measurement instead of an external analytics platform. Nothing here is shared with an advertising network. Per visit we record:',
        {
          list: [
            'the pages you view, and the moment you view them;',
            'how long a page was actively open, and how far down you scrolled;',
            'which site or search engine you arrived from;',
            'your browser type and approximate country;',
            'a salted hash of your IP address. The raw IP address is never stored.',
          ],
        },
        'From that IP address, before it is hashed, we try to recognise the organisation a visit comes from, so we can see which companies read our pages. This is company-level information, not an attempt to identify you as a person. We do not combine it with your name unless you contact us yourself.',
        'This aggregate measurement runs without cookies and without an identifier on your device. Only if you accept cookies do we also store a random visitor id in your browser, so repeat visits can be counted as one reader. Decline, and that identifier is never created.',
        'You can object to this measurement at any time by emailing us. Our cookie policy lists exactly what is stored in your browser.',
      ],
    },
    {
      /* See the Dutch version: the full cookie list lives here on purpose,
         not on a separate /cookies page. Keep both in step with the code. */
      heading: 'What we store in your browser',
      blocks: [
        'This is the complete list. It is short, because we run no advertising trackers and no external analytics platform.',
        'Necessary, no consent needed. These stay whatever you choose:',
        {
          list: [
            'nivora.lang, one year. Remembers whether you read the site in Dutch or English.',
            'nivora.consent, until you clear it. Remembers your answer to the cookie question, so we stop asking.',
            'nivora.launchBanner.dismissed, until you clear it. Remembers that you closed the announcement bar.',
          ],
        },
        'Only if you accept:',
        {
          list: [
            'nv_vid, until you clear it. A random number with no meaning outside this site, so repeat visits count as one reader instead of several.',
          ],
        },
        'If you decline, that number is never created, and any earlier copy is removed the moment you decline. Everything on the site keeps working.',
        'What we never do. No advertising cookies. No Google Analytics, no Meta pixel, no TikTok or LinkedIn tag. No profiles built about you, no data sold to anyone.',
        'Changing your mind. Use the “Cookie settings” link at the bottom of any page to bring the question back and answer again. Withdrawing is as easy as giving. Clearing your browser data for this site removes everything in the lists above.',
      ],
    },
    {
      heading: 'If you got an email from us and never gave us your details',
      blocks: [
        'We contact businesses that we think our work could help. When we do, we did not get your details from you, so the law requires us to tell you where they came from and why we hold them.',
        {
            list: [
            'Where from: public sources, such as the company website, the Belgian Companies Register, and professional networks such as LinkedIn.',
            'What we hold: your name, role, business email address, company, and public information about what the company does.',
            'Why: to reach a business that we believe has a concrete use for what we build. Our legal basis is legitimate interest, article 6.1.f GDPR.',
            'How to stop it: reply to any message, or email us, and we remove you and keep a note of your address so it is never approached again.',
          ],
        },
        'We only approach professional addresses about professional matters, never private ones.',
      ],
    },
    {
      heading: 'Why we use it, and our legal basis',
      blocks: [
        {
          list: [
            'To answer your questions and prepare or carry out an engagement: taking steps at your request, and performance of our contract.',
            'To measure and secure our website and reach businesses that could use our work: our legitimate interest, balanced against your rights, and you can object.',
            'To send you the newsletter: your consent, which you can withdraw at any time through the link in every message.',
            'To store or read anything on your device that is not strictly necessary: your consent.',
            'To meet legal, accounting and tax obligations: compliance with the law.',
          ],
        },
        'We do not make decisions about you by automated means that produce legal effects for you.',
      ],
    },
    {
      heading: 'Who we share it with',
      blocks: [
        'We do not sell your data. We use these providers, each only as far as needed, and each bound to protect your data:',
        {
          list: [
            'Vercel, for hosting this website.',
            'Supabase, for our database. Our projects run in Ireland and Germany.',
            'Hostinger, for the server that runs our backend. That server sits in a data centre in Paris, France.',
            'Anthropic, for the model behind the assistant on this site.',
            'Resend, for sending email such as the newsletter confirmation.',
            'Instantly, for our business outreach email.',
            'Google Workspace, for our own mailbox and calendar.',
            'Stripe, for payments.',
          ],
        },
        'We may also disclose data where the law requires it.',
      ],
    },
    {
      heading: 'International transfers',
      blocks: [
        'We prefer providers that keep data within the European Economic Area. Our databases run in Ireland and Germany, and our own server runs in Paris.',
        'The assistant on this site is an exception: your messages go to Anthropic in the United States. That transfer runs on the European Commission’s standard contractual clauses, together with the supplementary measures that go with them. If you would like to see a copy of those clauses, ask for them at ' + CONTACT_EMAIL + ' and we will send them to you. If you would rather not have a conversation leave the EU, email or call us instead of using the assistant.',
      ],
    },
    {
      heading: 'How long we keep it',
      blocks: [
        {
          list: [
            'Enquiries that do not lead to work: 12 months.',
            'Client files: 10 years after the engagement ends, which matches how long a claim can run.',
            'Invoices and accounting records: 7 years, as Belgian law requires.',
            'Newsletter: until you unsubscribe, plus a record of the unsubscribe so we do not mail you again.',
            'Assistant conversations: 30 days.',
            'Website measurement: aggregated and kept without an identifier.',
          ],
        },
      ],
    },
    {
      /* Article 13(2)(e) and (f) GDPR. Almost always forgotten, and both short
         to answer honestly here. */
      heading: 'What you have to give, and what happens if you do not',
      blocks: [
        'Nothing on this site requires you to hand anything over to read what you are reading. If you want something from us, we do need the minimum to answer:',
        {
          list: [
            'A question or a quote: an email address, and enough about your situation to give a sensible answer. Without an address we cannot get back to you.',
            'Booking a call: a name and an email address, so the invitation lands somewhere.',
            'The newsletter: an email address. We ask for nothing else.',
            'An engagement and an invoice: the details Belgian accounting and VAT law require. Those we cannot leave out, not even on request.',
          ],
        },
        'Apart from that last point, none of this is a legal obligation. Leave something out and we simply cannot do that one thing; nothing else follows from it.',
      ],
    },
    {
      heading: 'No automated decisions about you',
      blocks: [
        'We take no decisions about you based solely on automated processing that produce legal effects or significantly affect you. There is no score, no profile deciding what you get to see, and no system that accepts or rejects you.',
        'The company recognition described above is the only place where something happens automatically, and it says something about an organisation, not about you. Whether we contact someone, and what we write in that email, is decided by a person.',
      ],
    },
    {
      heading: 'Minors, and links to other sites',
      blocks: [
        'This site and our services are aimed at businesses and at adults. We do not knowingly collect personal data from minors. If you notice that it happened anyway, tell us and we will delete it.',
        'Our pages and our emails sometimes link to other people’s sites. Their policy applies there, not ours. We choose carefully where we link, but we have no control over what they do with your data. Read their policy before you leave anything behind.',
        `What you write to the assistant on this site is not used to train AI models. The same holds for client data in the systems we build; the terms put that in writing.`,
      ],
    },
    {
      heading: 'How we protect it',
      blocks: [
        'Access is limited to the people who need it, traffic runs over TLS, our databases sit behind row-level security, and secrets never reach the browser. No system is perfectly secure, but we take this seriously and design for it. If a breach ever puts your rights at real risk, we tell the supervisory authority within 72 hours and we tell you.',
      ],
    },
    {
      heading: 'Your rights',
      blocks: [
        'Under the GDPR you can ask us to:',
        {
          list: [
            'Give you a copy of the personal data we hold about you.',
            'Correct data that is wrong or incomplete.',
            'Delete your data, where there is no overriding reason to keep it.',
            'Restrict how we use it.',
            'Object to use based on our legitimate interest, including the measurement and our outreach.',
            'Receive your data in a portable format, where that right applies.',
            'Withdraw consent at any time, without affecting use before you withdrew it.',
          ],
        },
        `Email ${CONTACT_EMAIL} and we answer within one month. If you think we handled your data badly, you can lodge a complaint with the ${DPA.nameEn}, ${DPA.address}, ${DPA.email}, ${DPA.phone}.`,
        /* Article 21(4) GDPR wants this right brought to attention explicitly
           and separately, not buried in the list above. */
        `One right on its own, because the law wants us to say it explicitly: you can object at any time to your data being used for direct marketing, including our newsletter and our cold emails. You do not need a reason and there is nothing to weigh up. Say so and it stops, and all we keep is the fact that you do not want to be approached again. A reply to any message, or an email to ${CONTACT_EMAIL}, is enough.`,
      ],
    },
    {
      heading: 'Changes to this policy',
      blocks: [
        'We may update this policy as our practices change. The current version, with the date it was last updated, is always the one on this page.',
      ],
    },
    {
      heading: 'Contact',
      blocks: [
        `For anything about your privacy or this policy, email ${CONTACT_EMAIL} or call ${CONTACT_PHONE}.`,
      ],
    },
  ],
}

const PRIVACY_NL: LegalDoc = {
  slug: 'privacy',
  title: 'Privacybeleid',
  updated: UPDATED_NL,
  intro:
    'Dit beleid legt uit welke persoonsgegevens Nivora verwerkt, waarom, en welke rechten u hebt. Het beschrijft wat er echt gebeurt op deze website, inclusief de meting die erop draait. We houden de gegevens die we bewaren bewust tot een minimum beperkt.',
  sections: [
    {
      heading: 'Wie verantwoordelijk is',
      blocks: [
        `${IDENTITY_NL} Wij zijn de verwerkingsverantwoordelijke voor de persoonsgegevens die hier beschreven staan.`,
        'Dit beleid gaat over deze website, ons rechtstreekse contact met u, en de zakelijke e-mails die we versturen. Persoonsgegevens die we binnen een klantproject, in uw opdracht, verwerken, worden geregeld door de opdrachtovereenkomst en een aparte verwerkersovereenkomst, waarbij wij optreden als verwerker en niet als verantwoordelijke. Box en het Nivora-platform hebben hun eigen privacybeleid.',
      ],
    },
    {
      heading: 'Wat we verzamelen, en wanneer',
      blocks: [
        'Als u contact opneemt of een formulier invult: uw naam, bedrijf, e-mailadres, telefoonnummer, de pagina waarop u zat, en wat u ons schrijft. Dat komt terecht in ons eigen CRM.',
        'Als u zich inschrijft op de nieuwsbrief: uw e-mailadres, en uw naam en telefoonnummer als u die meegeeft. We werken met dubbele opt-in, dus er vertrekt niets tot u bevestigt via een link in een e-mail.',
        'Als u de assistent op deze site gebruikt: de berichten die u typt en de antwoorden die hij geeft. Die berichten gaan naar Anthropic, dat het model draait, en worden er niet mee getraind.',
        'Als u de site bezoekt: meetgegevens, beschreven in de volgende sectie.',
        'Als u klant wordt: de overeenkomst, de correspondentie en de facturatiegegevens die we nodig hebben om te werken en onze boekhouding te voeren.',
        'We vragen geen bijzondere categorieën van gegevens, en we vragen u om geen gevoelige persoonsgegevens te versturen via algemene contactkanalen.',
      ],
    },
    {
      heading: 'Hoe we deze website meten',
      blocks: [
        'We doen onze eigen meting in plaats van een extern analyticsplatform te gebruiken. Niets hiervan wordt gedeeld met een advertentienetwerk. Per bezoek registreren we:',
        {
          list: [
            'welke pagina’s u bekijkt, en op welk moment;',
            'hoelang een pagina actief openstond, en hoever u naar beneden scrolde;',
            'via welke site of zoekmachine u binnenkwam;',
            'uw browsertype en uw land bij benadering;',
            'een gezouten hash van uw IP-adres. Het ruwe IP-adres wordt nooit bewaard.',
          ],
        },
        'Uit dat IP-adres, vóór het gehasht wordt, proberen we te herkennen vanuit welke organisatie een bezoek komt, zodat we zien welke bedrijven onze pagina’s lezen. Dat is informatie op bedrijfsniveau, geen poging om u als persoon te identificeren. We koppelen het niet aan uw naam, tenzij u zelf contact opneemt.',
        'Die geaggregeerde meting draait zonder cookies en zonder herkenningsteken op uw toestel. Alleen als u cookies aanvaardt, bewaren we daarnaast een willekeurig bezoekers-id in uw browser, zodat herhaalbezoek als één lezer geteld kan worden. Weigert u, dan wordt dat id nooit aangemaakt.',
        'U kunt op elk moment bezwaar maken tegen deze meting door ons te mailen. Het hoofdstuk hieronder somt op wat er precies in uw browser terechtkomt.',
      ],
    },
    {
      /* Kamiel koos bewust voor twee juridische pagina's in plaats van drie:
         de volledige cookielijst hoort hier, niet op een eigen /cookies.
         Wijzigt er iets aan wat de site in de browser zet, dan wijzigt deze
         lijst mee. Vandaag is dat i18n.tsx (nivora.lang), CookieConsent.tsx
         (nivora.consent), de aankondigingsbalk, en nv_vid uit siteAnalytics.ts
         en blogAnalytics.ts. */
      heading: 'Wat we in uw browser bewaren',
      blocks: [
        'Dit is de volledige lijst. Ze is kort, want we draaien geen advertentietrackers en geen extern analyticsplatform.',
        'Noodzakelijk, hiervoor is geen toestemming nodig. Deze blijven staan wat u ook kiest:',
        {
          list: [
            'nivora.lang, één jaar. Onthoudt of u de site in het Nederlands of het Engels leest.',
            'nivora.consent, tot u het wist. Onthoudt uw antwoord op de cookievraag, zodat we stoppen met vragen.',
            'nivora.launchBanner.dismissed, tot u het wist. Onthoudt dat u de aankondigingsbalk hebt gesloten.',
          ],
        },
        'Alleen als u aanvaardt:',
        {
          list: [
            'nv_vid, tot u het wist. Een willekeurig getal zonder betekenis buiten deze site, zodat herhaalbezoek als één lezer telt in plaats van als meerdere.',
          ],
        },
        'Weigert u, dan wordt dat getal nooit aangemaakt, en een eerder aangemaakt exemplaar wissen we op het moment dat u weigert. Alles op de site blijft gewoon werken.',
        'Wat we nooit doen. Geen advertentiecookies. Geen Google Analytics, geen Meta-pixel, geen TikTok- of LinkedIn-tag. Geen profielen die over u worden opgebouwd, geen gegevens die aan iemand verkocht worden.',
        'Van gedacht veranderen. Gebruik de link “Cookievoorkeuren” onderaan elke pagina om de vraag terug te halen en opnieuw te antwoorden. Intrekken is even makkelijk als geven. Uw browsergegevens voor deze site wissen verwijdert alles uit de lijsten hierboven.',
      ],
    },
    {
      heading: 'Als u een mail van ons kreeg zonder ons ooit iets te geven',
      blocks: [
        'We nemen contact op met bedrijven waarvan we denken dat ons werk hen kan helpen. In dat geval hebben we uw gegevens niet van uzelf gekregen, en dan vraagt de wet dat we zeggen waar ze vandaan komen en waarom we ze hebben.',
        {
          list: [
            'Waar vandaan: publieke bronnen, zoals de website van het bedrijf, de Kruispuntbank van Ondernemingen en professionele netwerken zoals LinkedIn.',
            'Wat we hebben: uw naam, functie, professioneel e-mailadres, bedrijf, en publieke informatie over wat het bedrijf doet.',
            'Waarom: om een onderneming te bereiken waarvan we denken dat ze een concreet nut heeft aan wat we bouwen. Onze rechtsgrond is het gerechtvaardigd belang, artikel 6.1.f AVG.',
            'Hoe u het stopt: antwoord op eender welk bericht, of mail ons, en we halen u eruit en houden uw adres bij zodat het nooit opnieuw benaderd wordt.',
          ],
        },
        'We benaderen enkel professionele adressen over professionele zaken, nooit privéadressen.',
      ],
    },
    {
      heading: 'Waarom we ze gebruiken, en onze rechtsgrond',
      blocks: [
        {
          list: [
            'Om uw vragen te beantwoorden en een opdracht voor te bereiden of uit te voeren: stappen op uw verzoek, en de uitvoering van onze overeenkomst.',
            'Om onze website te meten en te beveiligen en om bedrijven te bereiken die iets aan ons werk hebben: ons gerechtvaardigd belang, afgewogen tegen uw rechten, en u kunt bezwaar maken.',
            'Om u de nieuwsbrief te sturen: uw toestemming, die u op elk moment kunt intrekken via de link in elk bericht.',
            'Om iets op uw toestel te plaatsen of te lezen dat niet strikt noodzakelijk is: uw toestemming.',
            'Om te voldoen aan wettelijke, boekhoudkundige en fiscale verplichtingen: naleving van de wet.',
          ],
        },
        'We nemen over u geen besluiten op basis van uitsluitend geautomatiseerde verwerking die rechtsgevolgen voor u hebben.',
      ],
    },
    {
      heading: 'Met wie we ze delen',
      blocks: [
        'We verkopen uw gegevens niet. We gebruiken deze dienstverleners, elk enkel voor zover nodig, en elk gebonden om uw gegevens te beschermen:',
        {
          list: [
            'Vercel, voor de hosting van deze website.',
            'Supabase, voor onze database. Onze projecten draaien in Ierland en Duitsland.',
            'Hostinger, voor de server waarop onze backend draait. Die server staat in een datacenter in Parijs, Frankrijk.',
            'Anthropic, voor het model achter de assistent op deze site.',
            'Resend, voor het versturen van e-mail zoals de bevestiging van de nieuwsbrief.',
            'Instantly, voor onze zakelijke outreach per e-mail.',
            'Google Workspace, voor onze eigen mailbox en agenda.',
            'Stripe, voor betalingen.',
          ],
        },
        'We kunnen gegevens ook vrijgeven waar de wet dit vereist.',
      ],
    },
    {
      heading: 'Internationale doorgiften',
      blocks: [
        'We geven de voorkeur aan dienstverleners die gegevens binnen de Europese Economische Ruimte houden. Onze databanken draaien in Ierland en Duitsland, en onze eigen server staat in Parijs.',
        'De assistent op deze site is de uitzondering: uw berichten gaan naar Anthropic in de Verenigde Staten. Die doorgifte steunt op de standaardcontractbepalingen van de Europese Commissie, samen met de bijkomende maatregelen die daarbij horen. Wilt u een kopie van die bepalingen inkijken, vraag ze op via ' + CONTACT_EMAIL + ' en we bezorgen ze u. Wilt u liever niet dat een gesprek de EU verlaat, mail of bel ons dan in plaats van de assistent te gebruiken.',
      ],
    },
    {
      heading: 'Hoelang we ze bewaren',
      blocks: [
        {
          list: [
            'Aanvragen die niet tot werk leiden: 12 maanden.',
            'Klantendossiers: 10 jaar na het einde van de samenwerking, wat overeenkomt met de termijn waarin een vordering kan lopen.',
            'Facturen en boekhoudkundige stukken: 7 jaar, zoals de Belgische wet vereist.',
            'Nieuwsbrief: tot u zich uitschrijft, plus een spoor van de uitschrijving zodat we u niet opnieuw mailen.',
            'Gesprekken met de assistent: 30 dagen.',
            'Websitemeting: geaggregeerd en zonder herkenningsteken bewaard.',
          ],
        },
      ],
    },
    {
      /* Artikel 13, lid 2, e) AVG: zeggen of gegevens verplicht zijn en wat er
         gebeurt als iemand ze niet geeft. Artikel 13, lid 2, f): zeggen of er
         automatische beslissingen worden genomen. Allebei worden ze bijna
         altijd vergeten, en allebei zijn ze hier kort te beantwoorden. */
      heading: 'Wat u moet geven, en wat er gebeurt als u het niet geeft',
      blocks: [
        'Niets op deze site is verplicht om te lezen wat u leest. Wilt u iets van ons, dan hebben we wel het minimum nodig om te antwoorden:',
        {
          list: [
            'Een vraag of een offerte: een e-mailadres, en genoeg over uw situatie om een zinnig antwoord te geven. Zonder adres kunnen we niet terugkoppelen.',
            'Een gesprek inplannen: naam en e-mailadres, zodat de uitnodiging ergens toekomt.',
            'De nieuwsbrief: een e-mailadres. Meer vragen we niet.',
            'Een opdracht en een factuur: de gegevens die de boekhoudwet en de btw-wetgeving verplicht maken. Die kunnen we niet weglaten, ook niet op vraag.',
          ],
        },
        'Buiten dat laatste punt is niets een wettelijke verplichting. Geeft u iets niet, dan kunnen we die ene zaak niet doen, en verder gebeurt er niets.',
      ],
    },
    {
      heading: 'Geen automatische beslissingen over u',
      blocks: [
        'We nemen geen beslissingen over u die enkel op een geautomatiseerde verwerking steunen en die u in rechte treffen of u aanzienlijk raken. Er is geen score, geen profiel dat bepaalt wat u te zien krijgt, en geen systeem dat u aanvaardt of weigert.',
        'De bedrijfsherkenning hierboven is de enige plek waar iets automatisch gebeurt, en die zegt iets over een organisatie, niet over u. Of we iemand contacteren, en wat we in die mail schrijven, beslist een mens.',
      ],
    },
    {
      heading: 'Minderjarigen, en links naar andere sites',
      blocks: [
        'Deze site en onze diensten richten zich op ondernemingen en op volwassenen. We verzamelen niet bewust persoonsgegevens van minderjarigen. Merkt u dat het toch gebeurd is, laat het ons weten en we verwijderen ze.',
        'Onze pagina’s en onze mails verwijzen soms naar sites van anderen. Daar geldt hun beleid en niet het onze. We kiezen met zorg waar we naartoe linken, maar we hebben geen controle over wat zij met uw gegevens doen. Lees hun beleid voor u er iets achterlaat.',
        `Wat u aan de assistent op deze site schrijft, wordt niet gebruikt om AI-modellen te trainen. Hetzelfde geldt voor de data van klanten in de systemen die we bouwen; de voorwaarden leggen dat vast.`,
      ],
    },
    {
      heading: 'Hoe we ze beschermen',
      blocks: [
        'De toegang is beperkt tot wie ze nodig heeft, het verkeer loopt over TLS, onze databanken zitten achter row-level security, en sleutels komen nooit in de browser terecht. Geen enkel systeem is perfect veilig, maar we nemen dit serieus en ontwerpen ervoor. Als een lek ooit een echt risico voor uw rechten oplevert, melden we het binnen 72 uur aan de toezichthouder en brengen we u op de hoogte.',
      ],
    },
    {
      heading: 'Uw rechten',
      blocks: [
        'Onder de AVG kunt u ons vragen om:',
        {
          list: [
            'U een kopie te geven van de persoonsgegevens die we over u bewaren.',
            'Gegevens te corrigeren die fout of onvolledig zijn.',
            'Uw gegevens te verwijderen, waar er geen doorslaggevende reden is om ze te bewaren.',
            'Het gebruik ervan te beperken.',
            'Bezwaar te maken tegen gebruik op basis van ons gerechtvaardigd belang, inclusief de meting en onze outreach.',
            'Uw gegevens in een overdraagbaar formaat te ontvangen, waar dat recht van toepassing is.',
            'Uw toestemming op elk moment in te trekken, zonder gevolgen voor het gebruik daarvoor.',
          ],
        },
        `Mail naar ${CONTACT_EMAIL} en we antwoorden binnen één maand. Vindt u dat we uw gegevens slecht behandeld hebben, dan kunt u klacht indienen bij de ${DPA.nameNl}, ${DPA.address}, ${DPA.email}, ${DPA.phone}.`,
        /* Artikel 21, lid 4 AVG wil dat dit recht apart en uitdrukkelijk onder
           de aandacht komt, niet weggestopt tussen de andere rechten. */
        `Eén recht apart, omdat de wet wil dat we het uitdrukkelijk zeggen: u kunt op elk moment bezwaar maken tegen het gebruik van uw gegevens voor direct marketing, waaronder onze nieuwsbrief en onze koude e-mails. Daar hoeft u geen reden voor te geven en er valt niets af te wegen. Zegt u het, dan stopt het, en dan houden we enkel bij dat u niet meer benaderd wil worden. Een antwoord op eender welk bericht of een mail naar ${CONTACT_EMAIL} volstaat.`,
      ],
    },
    {
      heading: 'Wijzigingen aan dit beleid',
      blocks: [
        'We kunnen dit beleid aanpassen naarmate onze werkwijze verandert. De geldende versie, met de datum van de laatste update, is altijd die op deze pagina.',
      ],
    },
    {
      heading: 'Contact',
      blocks: [
        `Voor alles over uw privacy of dit beleid, mail naar ${CONTACT_EMAIL} of bel ${CONTACT_PHONE}.`,
      ],
    },
  ],
}

export const TERMS: Localized<LegalDoc> = { en: TERMS_EN, nl: TERMS_NL }
export const PRIVACY: Localized<LegalDoc> = { en: PRIVACY_EN, nl: PRIVACY_NL }

const LEGAL_DOCS: Record<LegalSlug, Localized<LegalDoc>> = {
  terms: TERMS,
  privacy: PRIVACY,
}

export const getLegalDoc = (lang: Lang, slug: LegalSlug): LegalDoc =>
  LEGAL_DOCS[slug][lang]
