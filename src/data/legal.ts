import type { Lang, Localized } from '@/i18n'

export type LegalBlock = string | { list: string[] }
export type LegalSection = { heading: string; blocks: LegalBlock[] }
export type LegalDoc = {
  slug: 'terms' | 'privacy'
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

/** Shared facts so both documents stay consistent. Fill in the bracketed
 *  company details once they are registered. */
const CONTACT_EMAIL = 'kamiel@nivoraworks.com'
const CONTACT_PHONE = '+32 489 00 77 37'
const COMPANY = 'Nivora'
const UPDATED_EN = 'June 20, 2026'
const UPDATED_NL = '20 juni 2026'

const TERMS_EN: LegalDoc = {
  slug: 'terms',
  title: 'Terms of Service',
  updated: UPDATED_EN,
  intro:
    'These terms cover how we work together when you engage Nivora to advise on, design, build, or support an AI system. By working with us or using this website, you agree to what is set out below.',
  sections: [
    {
      heading: 'Who we are',
      blocks: [
        `${COMPANY} is a studio based in Belgium that designs and builds custom AI systems for businesses. We work across three stages: consulting to find what is worth building, implementation to design and ship it, and support to keep it running and improving.`,
        `You can reach us at ${CONTACT_EMAIL} or ${CONTACT_PHONE}. Company registration details: [company registration number], [registered address].`,
      ],
    },
    {
      heading: 'How an engagement works',
      blocks: [
        'Before a full project, we usually prove the value on a small, real slice of your work. That means taking one concrete task and building a working version of the system around it, using your data and your process. If it clearly helps, we scope the full build from there. If it does not, you have lost a small step instead of a large one.',
        'The exact scope, deliverables, timeline, and price for each engagement are set out in a separate proposal or statement of work. Where that document and these terms disagree, the proposal wins for that project.',
      ],
    },
    {
      heading: 'Quotes, fees, and payment',
      blocks: [
        'Quotes are valid for the period stated in the proposal. Unless agreed otherwise:',
        {
          list: [
            'Fees and any payment schedule are defined per project in the proposal.',
            'Invoices are due within the term shown on the invoice.',
            'Stated prices exclude VAT and any third-party costs, such as hosting, model usage, or licences, unless we say otherwise.',
            'Recurring support or hosting is billed on the cycle agreed in writing.',
          ],
        },
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
      heading: 'Ownership of what we build',
      blocks: [
        'Your data stays yours. The custom work we deliver for your project, including the configuration and code written specifically for you, becomes yours once the related invoices are paid in full.',
        'We keep ownership of the general tools, libraries, methods, and know-how we bring to the work and reuse across clients. We grant you a licence to use these as part of your delivered system. Open-source and third-party components stay under their own licences.',
      ],
    },
    {
      heading: 'Private by design',
      blocks: [
        'Where a project calls for it, we build systems that run inside your own environment or on infrastructure you control, so your data does not have to leave your walls. The specifics of where a system runs and who can access it are agreed per project. Handling of personal data in a project is covered by a separate data processing agreement where the law requires one.',
      ],
    },
    {
      heading: 'AI outputs and human oversight',
      blocks: [
        'AI systems produce useful results but they are not perfect and can be wrong or incomplete. The systems we build are tools to support your work, not a replacement for human judgement. You are responsible for reviewing outputs before relying on them for decisions, and for keeping a human in the loop where the stakes call for it. We will tell you plainly where a system is strong and where it needs checking.',
      ],
    },
    {
      heading: 'Confidentiality',
      blocks: [
        'Each side will keep the other side’s non-public information confidential and use it only to carry out the work. This does not apply to information that is already public, that you or we already had, or that the law requires us to disclose. This duty continues after the engagement ends.',
      ],
    },
    {
      heading: 'Warranties and liability',
      blocks: [
        'We carry out our work with reasonable skill and care. Beyond that, and to the extent the law allows, our services and this website are provided as is, without other warranties.',
        'To the extent the law allows, we are not liable for indirect or consequential loss, lost profit, or lost data, and our total liability for any engagement is limited to the fees you paid us for that engagement in the twelve months before the claim. Nothing here limits liability that cannot be limited by law.',
      ],
    },
    {
      heading: 'Ending an engagement',
      blocks: [
        'Either side can end an engagement as set out in the relevant proposal, or on reasonable written notice if there is no fixed term. If you end a project early, you pay for work done and committed costs up to that point. We can pause or stop work if invoices are seriously overdue.',
      ],
    },
    {
      heading: 'Changes to these terms',
      blocks: [
        'We may update these terms as our work evolves. The current version is always the one on this page, with the date it was last updated. For active engagements, the terms in force when the proposal was signed continue to apply unless we agree otherwise.',
      ],
    },
    {
      heading: 'Governing law',
      blocks: [
        'These terms are governed by Belgian law, and any dispute falls under the courts competent for our registered office, unless mandatory law says otherwise.',
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
  title: 'Servicevoorwaarden',
  updated: UPDATED_NL,
  intro:
    'Deze voorwaarden beschrijven hoe we samenwerken wanneer u Nivora inschakelt om te adviseren over, te ontwerpen, te bouwen of te ondersteunen bij een AI-systeem. Door met ons samen te werken of deze website te gebruiken, gaat u akkoord met wat hieronder staat.',
  sections: [
    {
      heading: 'Wie we zijn',
      blocks: [
        `${COMPANY} is een studio in België die op maat gemaakte AI-systemen ontwerpt en bouwt voor bedrijven. We werken in drie fases: consulting om te bepalen wat de moeite waard is om te bouwen, implementatie om het te ontwerpen en uit te rollen, en support om het draaiende en in verbetering te houden.`,
        `U bereikt ons op ${CONTACT_EMAIL} of ${CONTACT_PHONE}. Bedrijfsgegevens: [company registration number], [registered address].`,
      ],
    },
    {
      heading: 'Hoe een opdracht verloopt',
      blocks: [
        'Voor we aan een volledig project beginnen, bewijzen we de waarde meestal eerst op een klein, echt stuk van uw werk. Dat betekent dat we één concrete taak nemen en daar een werkende versie van het systeem omheen bouwen, met uw data en uw proces. Als het duidelijk helpt, bepalen we van daaruit de scope van de volledige bouw. Zo niet, dan hebt u een kleine stap verloren in plaats van een grote.',
        'De exacte scope, opleveringen, timing en prijs van elke opdracht staan in een aparte offerte of opdrachtbeschrijving. Waar dat document en deze voorwaarden van elkaar verschillen, geldt voor dat project de offerte.',
      ],
    },
    {
      heading: 'Offertes, vergoedingen en betaling',
      blocks: [
        'Offertes zijn geldig voor de periode die in de offerte staat. Tenzij anders afgesproken:',
        {
          list: [
            'Vergoedingen en een eventueel betalingsschema worden per project in de offerte vastgelegd.',
            'Facturen zijn betaalbaar binnen de termijn die op de factuur staat.',
            'Vermelde prijzen zijn exclusief btw en eventuele kosten van derden, zoals hosting, modelgebruik of licenties, tenzij we anders aangeven.',
            'Terugkerende support of hosting wordt gefactureerd volgens de schriftelijk afgesproken cyclus.',
          ],
        },
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
      heading: 'Eigendom van wat we bouwen',
      blocks: [
        'Uw data blijft van u. Het maatwerk dat we voor uw project opleveren, inclusief de configuratie en code die specifiek voor u is geschreven, wordt van u zodra de bijhorende facturen volledig betaald zijn.',
        'Wij behouden het eigendom van de algemene tools, libraries, methodes en knowhow die we naar het werk meebrengen en hergebruiken bij verschillende klanten. We geven u een licentie om die te gebruiken als onderdeel van uw opgeleverde systeem. Open source- en componenten van derden blijven onder hun eigen licenties vallen.',
      ],
    },
    {
      heading: 'Privé van bij het ontwerp',
      blocks: [
        'Waar een project erom vraagt, bouwen we systemen die draaien binnen uw eigen omgeving of op infrastructuur die u beheert, zodat uw data uw muren niet hoeft te verlaten. Waar een systeem precies draait en wie er toegang toe heeft, spreken we per project af. De verwerking van persoonsgegevens binnen een project wordt geregeld in een aparte verwerkersovereenkomst waar de wet er een vereist.',
      ],
    },
    {
      heading: 'AI-output en menselijk toezicht',
      blocks: [
        'AI-systemen leveren nuttige resultaten, maar ze zijn niet perfect en kunnen fout of onvolledig zijn. De systemen die we bouwen zijn tools die uw werk ondersteunen, geen vervanging van menselijk oordeel. U bent zelf verantwoordelijk om output te controleren voor u er beslissingen op baseert, en om een mens in de lus te houden waar de inzet dat vraagt. We zeggen u duidelijk waar een systeem sterk in is en waar het nagekeken moet worden.',
      ],
    },
    {
      heading: 'Vertrouwelijkheid',
      blocks: [
        'Elke partij houdt de niet-publieke informatie van de andere partij vertrouwelijk en gebruikt die enkel om het werk uit te voeren. Dit geldt niet voor informatie die al publiek is, die u of wij al hadden, of die we wettelijk verplicht zijn vrij te geven. Deze plicht blijft gelden nadat de opdracht is afgelopen.',
      ],
    },
    {
      heading: 'Garanties en aansprakelijkheid',
      blocks: [
        'We voeren ons werk uit met redelijke vakkundigheid en zorg. Daarnaast worden onze diensten en deze website, voor zover de wet dit toelaat, geleverd in de staat waarin ze zich bevinden, zonder andere garanties.',
        'Voor zover de wet dit toelaat, zijn we niet aansprakelijk voor indirecte of gevolgschade, gederfde winst of verloren data, en is onze totale aansprakelijkheid voor een opdracht beperkt tot de vergoedingen die u ons voor die opdracht hebt betaald in de twaalf maanden voor de claim. Niets hierin beperkt aansprakelijkheid die wettelijk niet beperkt kan worden.',
      ],
    },
    {
      heading: 'Een opdracht beëindigen',
      blocks: [
        'Beide partijen kunnen een opdracht beëindigen zoals beschreven in de betreffende offerte, of met een redelijke schriftelijke opzegtermijn als er geen vaste looptijd is. Als u een project vroegtijdig stopzet, betaalt u voor het geleverde werk en de tot dan toe aangegane kosten. We kunnen het werk pauzeren of stopzetten als facturen ernstig achterstallig zijn.',
      ],
    },
    {
      heading: 'Wijzigingen aan deze voorwaarden',
      blocks: [
        'We kunnen deze voorwaarden aanpassen naarmate ons werk evolueert. De geldende versie is altijd die op deze pagina, met de datum van de laatste update. Voor lopende opdrachten blijven de voorwaarden gelden die van kracht waren toen de offerte werd ondertekend, tenzij we iets anders afspreken.',
      ],
    },
    {
      heading: 'Toepasselijk recht',
      blocks: [
        'Deze voorwaarden worden beheerst door het Belgisch recht, en elk geschil valt onder de rechtbanken die bevoegd zijn voor onze maatschappelijke zetel, tenzij dwingend recht anders bepaalt.',
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

const PRIVACY_EN: LegalDoc = {
  slug: 'privacy',
  title: 'Privacy Policy',
  updated: UPDATED_EN,
  intro:
    'This policy explains what personal data Nivora handles when you visit this website or get in touch, why we handle it, and the rights you have. We keep the data we hold to a minimum, on purpose.',
  sections: [
    {
      heading: 'Who is responsible',
      blocks: [
        `${COMPANY}, based in Belgium, is the controller for the personal data described here. You can reach us at ${CONTACT_EMAIL} or ${CONTACT_PHONE}. Company registration details: [company registration number], [registered address].`,
        'This policy covers the website and our direct contact with you. Personal data we process inside a client project, on your behalf, is governed by the engagement agreement and a separate data processing agreement where the law requires one.',
      ],
    },
    {
      heading: 'What we collect',
      blocks: [
        'We only collect what we need to talk with you and run our business:',
        {
          list: [
            'Contact and message details you give us when you email, call, book a call, or fill in a form, such as your name, company, email, phone number, and what you write to us.',
            'Records of our correspondence and meetings, so we can follow up properly.',
            'Basic technical data that any web server receives, such as your IP address, browser type, and the pages you view. Our hosting provider logs this to keep the site secure and working.',
          ],
        },
        'We do not ask for special categories of data, and we ask you not to send sensitive personal data through general contact channels.',
      ],
    },
    {
      heading: 'Why we use it, and our legal basis',
      blocks: [
        'Under the GDPR, we rely on these grounds:',
        {
          list: [
            'To answer your questions and prepare or carry out an engagement, on the basis of taking steps at your request and performing our contract.',
            'To run, secure, and improve our website and business, on the basis of our legitimate interest in operating safely and well.',
            'To send you information you asked for, on the basis of your consent, which you can withdraw at any time.',
            'To meet legal and accounting obligations, on the basis of compliance with the law.',
          ],
        },
      ],
    },
    {
      heading: 'Private by design',
      blocks: [
        'The systems we build are often designed to run inside your own environment so your operational data does not leave your control. We carry that same restraint into our own business: we collect little, we do not build profiles on you, and we do not sell personal data to anyone.',
      ],
    },
    {
      heading: 'Who we share it with',
      blocks: [
        'We do not sell your data. We share it only with service providers that help us operate, and only as far as needed. These typically include our website hosting, email, and similar business tools. These providers act on our instructions and are bound to protect your data. We may also disclose data where the law requires it.',
      ],
    },
    {
      heading: 'International transfers',
      blocks: [
        'We prefer providers that keep data within the European Economic Area. Where data is processed outside the EEA, we make sure an approved safeguard is in place, such as the European Commission’s standard contractual clauses.',
      ],
    },
    {
      heading: 'How long we keep it',
      blocks: [
        'We keep personal data only as long as we need it for the purpose we collected it, then delete or anonymise it. Enquiries that do not lead to work are kept for a limited period and then removed. Records tied to a contract or a legal obligation, such as invoices, are kept for as long as the law requires.',
      ],
    },
    {
      heading: 'Cookies',
      blocks: [
        'This website uses only what it needs to function. We do not run advertising trackers. If we add analytics or other non-essential cookies later, we will list them here and ask for your consent first where the law requires it.',
      ],
    },
    {
      heading: 'How we protect it',
      blocks: [
        'We use reasonable technical and organisational measures to protect personal data against loss, misuse, and unauthorised access, and we keep access limited to those who need it. No system is perfectly secure, but we take this seriously and design for it.',
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
            'Restrict or object to how we use it.',
            'Receive your data in a portable format, where that right applies.',
            'Withdraw consent at any time, without affecting use before you withdrew it.',
          ],
        },
        `To exercise any of these, email ${CONTACT_EMAIL}. If you believe we have mishandled your data, you can also lodge a complaint with the Belgian Data Protection Authority (Gegevensbeschermingsautoriteit / Autorité de protection des données).`,
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
    'Dit beleid legt uit welke persoonsgegevens Nivora verwerkt wanneer u deze website bezoekt of contact opneemt, waarom we ze verwerken, en welke rechten u hebt. We houden de gegevens die we bewaren bewust tot een minimum beperkt.',
  sections: [
    {
      heading: 'Wie verantwoordelijk is',
      blocks: [
        `${COMPANY}, gevestigd in België, is de verwerkingsverantwoordelijke voor de persoonsgegevens die hier beschreven staan. U bereikt ons op ${CONTACT_EMAIL} of ${CONTACT_PHONE}. Bedrijfsgegevens: [company registration number], [registered address].`,
        'Dit beleid heeft betrekking op de website en ons rechtstreekse contact met u. Persoonsgegevens die we binnen een klantproject, in uw opdracht, verwerken, worden geregeld door de opdrachtovereenkomst en een aparte verwerkersovereenkomst waar de wet er een vereist.',
      ],
    },
    {
      heading: 'Wat we verzamelen',
      blocks: [
        'We verzamelen enkel wat we nodig hebben om met u te praten en onze zaak te runnen:',
        {
          list: [
            'Contact- en berichtgegevens die u ons geeft wanneer u mailt, belt, een gesprek boekt of een formulier invult, zoals uw naam, bedrijf, e-mail, telefoonnummer en wat u ons schrijft.',
            'Een verslag van onze correspondentie en gesprekken, zodat we correct kunnen opvolgen.',
            'Basis technische gegevens die elke webserver ontvangt, zoals uw IP-adres, browsertype en de pagina’s die u bekijkt. Onze hostingprovider logt dit om de site veilig en werkend te houden.',
          ],
        },
        'We vragen geen bijzondere categorieën van gegevens, en we vragen u om geen gevoelige persoonsgegevens te versturen via algemene contactkanalen.',
      ],
    },
    {
      heading: 'Waarom we ze gebruiken, en onze rechtsgrond',
      blocks: [
        'Onder de GDPR steunen we op de volgende gronden:',
        {
          list: [
            'Om uw vragen te beantwoorden en een opdracht voor te bereiden of uit te voeren, op basis van het nemen van stappen op uw verzoek en de uitvoering van onze overeenkomst.',
            'Om onze website en onze zaak te laten draaien, te beveiligen en te verbeteren, op basis van ons gerechtvaardigd belang om veilig en goed te werken.',
            'Om u informatie te sturen waar u om vroeg, op basis van uw toestemming, die u op elk moment kunt intrekken.',
            'Om te voldoen aan wettelijke en boekhoudkundige verplichtingen, op basis van naleving van de wet.',
          ],
        },
      ],
    },
    {
      heading: 'Privé van bij het ontwerp',
      blocks: [
        'De systemen die we bouwen zijn vaak ontworpen om binnen uw eigen omgeving te draaien, zodat uw operationele data niet uit uw controle verdwijnt. We trekken diezelfde terughoudendheid door in onze eigen zaak: we verzamelen weinig, we bouwen geen profielen van u op, en we verkopen persoonsgegevens aan niemand.',
      ],
    },
    {
      heading: 'Met wie we ze delen',
      blocks: [
        'We verkopen uw gegevens niet. We delen ze enkel met dienstverleners die ons helpen om te werken, en enkel voor zover nodig. Dat zijn doorgaans onze websitehosting, e-mail en gelijkaardige bedrijfstools. Deze dienstverleners handelen volgens onze instructies en zijn gebonden om uw gegevens te beschermen. We kunnen gegevens ook vrijgeven waar de wet dit vereist.',
      ],
    },
    {
      heading: 'Internationale doorgiften',
      blocks: [
        'We geven de voorkeur aan dienstverleners die gegevens binnen de Europese Economische Ruimte houden. Waar gegevens buiten de EER worden verwerkt, zorgen we dat er een goedgekeurde waarborg geldt, zoals de standaardcontractbepalingen van de Europese Commissie.',
      ],
    },
    {
      heading: 'Hoelang we ze bewaren',
      blocks: [
        'We bewaren persoonsgegevens enkel zolang we ze nodig hebben voor het doel waarvoor we ze verzamelden, en verwijderen of anonimiseren ze daarna. Aanvragen die niet tot werk leiden, bewaren we voor een beperkte periode en verwijderen we daarna. Gegevens die gekoppeld zijn aan een overeenkomst of een wettelijke verplichting, zoals facturen, bewaren we zolang de wet dit vereist.',
      ],
    },
    {
      heading: 'Cookies',
      blocks: [
        'Deze website gebruikt enkel wat ze nodig heeft om te functioneren. We draaien geen advertentietrackers. Als we later analytics of andere niet-essentiële cookies toevoegen, vermelden we ze hier en vragen we eerst uw toestemming waar de wet dit vereist.',
      ],
    },
    {
      heading: 'Hoe we ze beschermen',
      blocks: [
        'We gebruiken redelijke technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen verlies, misbruik en ongeoorloofde toegang, en we houden de toegang beperkt tot wie ze nodig heeft. Geen enkel systeem is perfect veilig, maar we nemen dit serieus en ontwerpen ervoor.',
      ],
    },
    {
      heading: 'Uw rechten',
      blocks: [
        'Onder de GDPR kunt u ons vragen om:',
        {
          list: [
            'U een kopie te geven van de persoonsgegevens die we over u bewaren.',
            'Gegevens te corrigeren die fout of onvolledig zijn.',
            'Uw gegevens te verwijderen, waar er geen doorslaggevende reden is om ze te bewaren.',
            'Het gebruik ervan te beperken of er bezwaar tegen te maken.',
            'Uw gegevens in een overdraagbaar formaat te ontvangen, waar dat recht van toepassing is.',
            'Uw toestemming op elk moment in te trekken, zonder dat dit gevolgen heeft voor het gebruik daarvan vóór de intrekking.',
          ],
        },
        `Om een van deze rechten uit te oefenen, mail naar ${CONTACT_EMAIL}. Als u denkt dat we uw gegevens verkeerd hebben behandeld, kunt u ook een klacht indienen bij de Belgische Gegevensbeschermingsautoriteit (Gegevensbeschermingsautoriteit / Autorité de protection des données).`,
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

const LEGAL_DOCS: Record<LegalDoc['slug'], Localized<LegalDoc>> = {
  terms: TERMS,
  privacy: PRIVACY,
}

export const getLegalDoc = (lang: Lang, slug: 'terms' | 'privacy'): LegalDoc =>
  LEGAL_DOCS[slug][lang]
