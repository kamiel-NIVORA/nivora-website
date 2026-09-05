import { solutionPage } from '../solutionPage'

/**
 * Sectorpagina voor boekhoudkantoren.
 *
 * Dit was eerder één pagina voor boekhouders én verzekeringsmakelaars samen.
 * Dat waren twee werelden met andere software, andere deadlines en een andere
 * toezichthouder, en die pagina moest dus voortdurend uitleggen voor wie welke
 * alinea bedoeld was. De makelaarshelft is eruit; het schadewerk staat nu op
 * ./niche-expertise.ts, geschreven vanuit de expert in plaats van de makelaar.
 *
 * De rij met oplossingen onderaan komt uit src/data/landing/sectors.ts.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Sectors',
      h1: 'AI automation for accountancy firms, alongside your own package',
      subhead:
        'Friday, quarter to six. The VAT return can go out as soon as three clients hand in the costs they paid privately and one supplier finally sorts out his Peppol address. At that moment nobody in the office is doing the work a client actually pays you for.',
      answerH2: 'What does Nivora Works do for an accountancy firm?',
      answer:
        'Nivora Works is a software and AI studio in Bruges working for accountancy firms in Flanders and the Netherlands. We take over one clearly bounded piece of office work, for instance tracking what is still missing per client before the quarterly VAT return due on the 25th, or knowing which files are stuck on a single certificate in October. We build it alongside what you already use: Exact Online, Yuki, Octopus, Adsolut, WinBooks or Silverfin keeps holding the file. Where professional secrecy demands it, the model runs on a machine inside your own office so payslips and identity details never leave the building.',
      answerDetail: [
        'We do not replace your package and we do not want to. Your files, your mandates and your history sit there, and a firm that switches packages in September with the personal tax returns on the clock does itself a harm no automation makes up for.',
        'We start with one bounded piece, we let it run alongside your own way of working for two weeks, and only then do you decide what comes next. Not a platform for the office and not a project that starts with a three month analysis.',
      ],
      manifesto:
        'A firm earns on what it knows. Not on hunting down what the client already sent you himself last month.',
      problemH2: 'Where the time leaks away in this trade',
      problem: [
        'Most of the work in a firm is not hard, it is fragmented. A client sends a photo of a fuel receipt by WhatsApp, another emails a pdf that fits nowhere, a third hands in nothing at all, and before a return can go out somebody has chased four things that already existed somewhere.',
        'The knowledge sits in people\'s heads, not in the file. Someone who has been with you twenty years knows why that client\'s director account was corrected in 2021 and what was agreed with the inspector at the time. Put that person on the coast for a fortnight and a colleague starts from zero, ringing the client to ask things that have already been answered three times.',
        'The peaks always land on top of each other. VAT on the 20th for monthly filers and the 25th for quarterly filers, the annual client listing on 31 March, the tax forms at the end of June, the filing of the annual accounts seven months after year end, and the personal tax returns that you, as an authorised agent, only really feel in September and October. On exactly those days nobody gets round to the advice a client pays you for.',
      ],
      pillarsH2: 'How we work',
      pillars: [
        {
          title: 'Sit in first, build later',
          body: 'We spend a few days in the mailbox before anything gets built. We are not counting your hours, we are counting how often the same answer gets typed again: the same explanation about an advance tax payment, the same question about what does and does not go through the company. That count decides what goes first, and sometimes the honest answer is that you do not need us for it.',
        },
        {
          title: 'Your package stays your package',
          body: 'Exact Online, Octopus, Yuki, Adsolut, WinBooks or Silverfin keeps holding the file, with the mandates and the history in it. We put something beside it that reads what comes in and either writes the result back or puts it ready for approval. Your people keep working in the screen they have known for ten years, and no second place appears where things can quietly get stuck.',
        },
        {
          title: 'What is sensitive stays inside the walls',
          body: 'National register numbers, payslips, a client\'s private bank statements: that does not belong on a server on the other side of the world. In those cases we put a model on a machine in your own office so the documents never leave the building. Professional secrecy under the ITAA is not a detail you fix afterwards.',
        },
      ],
      signals: [
        'In March and October nobody in the office gets near advisory work',
        'Your best account handler is the only one who really knows how that one file fits together',
        'You retype figures out of a pdf that you sent out yourself a month earlier',
        'The same reminder email gets written fresh for thirty clients',
      ],
      automationsH2: 'What we can automate in an accountancy firm',
      automationsIntro:
        'Four examples out of this trade. One bounded piece of work each time, with someone on your side keeping the last word.',
      automations: [
        {
          title: 'VAT by the 25th',
          body: 'Monthly filers are on the 20th, quarterly filers on the 25th, and since 1 January 2026 the Belgian business to business purchase side largely arrives over Peppol. What is left over is precisely what does not: the client who never hands in the costs he paid privately, the supplier whose Peppol address is still not sorted, the fuel invoice in the company name that was never sent through. We line that up file by file and put the reminder email ready in the wording your firm always uses.',
          image: '/landing/auto-sec-kantoor-b.webp',
          alt: 'A plain desk with a chair and a potted plant in a bright modern office',
        },
        {
          title: 'Forms and certificates',
          body: 'In September and October half your returns are stuck on one missing item: a 281.10 form, a 281.20 for the company director, the pension savings certificate, the childcare certificate, the bank certificates or the lender\'s certificate for the mortgage. We track per file what has come in and what has not, and who needs to be called today before the filing deadline in the agents\' portal runs out.',
          image: '/landing/auto-opl-antwoord-a.webp',
          alt: 'One fixed answer per recurring question, ready to paste into Outlook',
        },
        {
          title: 'Taking over a file',
          body: 'One sheet per client: where the file stands, what has been asked for and when, what was promised by email, and what has to happen this week. Made for the colleague who has to pick it up on Monday because your handler is on leave, and built from what is already in the file rather than from a handover form nobody fills in on a Friday afternoon.',
          image: '/landing/auto-opl-overname-a.webp',
          alt: 'One sheet per file, with everything your colleague promised by email',
        },
        {
          title: 'Before he retires',
          body: 'Your most experienced handler knows why a correction was made in 2021 and what was agreed with the inspector at the time. That sits in old emails, in loose notes and in his head. We put it into something the office can actually search, with the document behind each answer, before the year he leaves rather than the week after.',
          image: '/landing/auto-sec-kantoor-a.webp',
          alt: 'Two desks facing each other in a modern office, one of them empty',
        },
      ],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to pretend nothing in your office is automated yet. CodaBox already delivers your bank statements and payroll entries, Clearfacts, Billtobox, Basecone and Dext already pull in the purchase invoices, Peppol has been bringing a growing share in structured form since 1 January 2026, and Exact Online, Yuki, Octopus, Adsolut, WinBooks, Silverfin and Twinfield each do their part. We are not there to replace any of that.',
        'We are not going to say nobody else in this trade is working on AI. Clearfacts puts up booking proposals itself, Silverfin and Wolters Kluwer are building it into their reporting and filing products, and Microsoft 365 Copilot is already sitting in half the mailboxes in Flanders. If your answer is already in one of those, we will say so and stop.',
        'And we are not going to quote a percentage or a payback period. We have no baseline measurement at your firm, so any figure we gave you up front would be invented. What we do instead is let one piece of work run alongside your own way of doing it for two weeks, so you can see for yourself what is left.',
      ],
      faqs: [
        {
          q: 'Do we have to change software for this?',
          a: 'No. Your files stay in Exact Online, Yuki, Octopus, Adsolut, WinBooks or Silverfin, with the mandates and the history in them. We read what comes in and either deliver the result there or put it ready for approval. A firm that switches packages in September, with the personal tax returns on the clock, does itself a harm that no amount of automation makes up for.',
        },
        {
          q: 'Where does our clients\' data end up?',
          a: 'Wherever you want it. For ordinary office correspondence a European provider is perfectly fine. For anything covered by your professional secrecy, such as a client\'s payslips or private bank statements, we put a model on a machine in your own office so those documents never leave the building. We write down what runs where, so you can simply show it at a quality review.',
        },
        {
          q: 'Who is responsible if the model gets it wrong?',
          a: 'You are, which is why we build it so that you always sit in between. Nothing goes to a client or to the tax authorities without someone at your firm having seen it and signed off. What we prepare is a proposal with its source attached, so your handler can see in ten seconds where a figure came from instead of having to take it on trust.',
        },
        {
          q: 'Does mandatory e-invoicing change any of this?',
          a: 'It shifts the pain, it does not remove it. Since 1 January 2026 invoicing between Belgian VAT registered businesses runs in structured form over Peppol, so a growing share of the purchase side already arrives cleanly. What is left is what never arrives structured: the client who does not hand in the costs he paid privately, the supplier whose Peppol address is still not sorted, the bank certificates, and the client emails asking something they also asked last month.',
        },
      ],
      featuresTitle: 'What does Nivora Works do for an accountancy firm?',
      featuresSubtitle:
        'Friday, quarter to six. The VAT return can go out as soon as three clients hand in the costs they paid privately and one supplier finally sorts out his Peppol address. At that moment nobody in the office is doing the work a client actually pays you for.',
      ctaTitle: 'Send us one busy morning',
      ctaBody:
        'Take the emails and documents from a single busy morning, anonymised, exactly as they came in. We will prepare the files from them the way we would build it, and you put that next to what your own people did that morning.',
      seoTitle: 'AI automation for accountancy firms in Flanders and the Netherlands · Nivora Works',
      seoDescription:
        'Nivora Works in Bruges builds AI automation for accountancy firms. One bounded piece of office work, alongside Exact Online, Yuki, Octopus, Adsolut or WinBooks, with your people signing off and sensitive documents staying in the office.',
    },
    nl:
    {
      eyebrow: 'Sectoren',
      h1: 'AI-automatisering voor boekhoudkantoren, naast uw eigen pakket',
      subhead:
        'Vrijdag kwart voor zes. De btw-aangifte kan buiten zodra drie klanten hun privé betaalde kosten aanleveren en één leverancier zijn Peppol-adres in orde brengt. Op dat moment is niemand op kantoor bezig met het werk waarvoor een klant u eigenlijk betaalt.',
      answerH2: 'Wat doet Nivora Works voor een boekhoudkantoor?',
      answer:
        'Nivora Works is een software- en AI-studio uit Brugge die werkt voor boekhoudkantoren in Vlaanderen en Nederland. Wij nemen één afgebakend stuk kantoorwerk over, bijvoorbeeld het opvolgen van wat er per klant nog ontbreekt voor de kwartaalaangifte van de 25e, of weten welke dossiers in oktober op één attest vasthangen. Wij bouwen dat naast wat u vandaag al gebruikt: Exact Online, Yuki, Octopus, Adsolut, WinBooks of Silverfin blijft het dossier houden. Waar het beroepsgeheim erom vraagt, draait het model op een machine in uw eigen kantoor zodat loonbrieven en identiteitsgegevens het gebouw niet verlaten.',
      answerDetail: [
        'Wij vervangen uw pakket niet en dat willen wij ook niet. Uw dossiers, uw mandaten en uw historiek zitten daar, en een kantoor dat in september van pakket wisselt met de aangiftes personenbelasting op de teller, doet zichzelf iets aan wat geen enkele automatisering goedmaakt.',
        'Wij starten met één afgebakend stuk, laten dat twee weken meelopen naast uw eigen manier van werken, en pas daarna beslist u wat het volgende is. Geen platform voor het kantoor en geen project dat begint met een analyse van drie maanden.',
      ],
      manifesto:
        'Een kantoor verdient aan wat het weet. Niet aan het bijeenzoeken van wat de klant vorige maand zelf al gestuurd heeft.',
      problemH2: 'Waar de tijd in dit vak weglekt',
      problem: [
        'Het meeste werk op een kantoor is niet moeilijk, het is versnipperd. De ene klant stuurt een foto van een tankticket via WhatsApp, de tweede mailt een pdf die nergens in past, de derde levert helemaal niets aan, en voor een aangifte buiten kan heeft iemand vier dingen achternagebeld die al ergens stonden.',
        'De kennis zit in hoofden, niet in het dossier. Wie twintig jaar bij u werkt, weet waarom de rekening-courant van die klant in 2021 rechtgezet is en wat er toen met de controleur afgesproken was. Staat die persoon twee weken aan zee, dan begint zijn collega van nul en belt hij de klant dingen na die al drie keer beantwoord zijn.',
        'De pieken vallen altijd samen. De btw op de 20e voor maandaangevers en op de 25e voor kwartaalaangevers, de klantenlisting van 31 maart, de fiches eind juni, de neerlegging van de jaarrekening zeven maanden na afsluit, en de personenbelasting die u als mandataris pas in september en oktober echt voelt. Precies op die dagen komt niemand toe aan het advies waarvoor een klant u betaalt.',
      ],
      pillarsH2: 'Hoe wij te werk gaan',
      pillars: [
        {
          title: 'Eerst meekijken, dan pas bouwen',
          body: 'Wij komen een paar dagen in de mailbox meezitten voor er iets gebouwd wordt. Wij tellen niet uw uren, wij tellen hoe vaak hetzelfde antwoord opnieuw getypt wordt: dezelfde uitleg over een voorafbetaling, dezelfde vraag over wat wel en niet door de vennootschap kan. Uit die telling volgt wat het eerst aan de beurt is, en soms is het antwoord dat u ons daar niet voor nodig hebt.',
        },
        {
          title: 'Uw pakket blijft uw pakket',
          body: 'Exact Online, Octopus, Yuki, Adsolut, WinBooks of Silverfin blijft het dossier houden, met de mandaten en de historiek erin. Wij zetten er iets naast dat leest wat binnenkomt en het resultaat terugschrijft of ter goedkeuring klaarlegt. Uw mensen blijven in het scherm werken dat ze al tien jaar kennen, en er komt geen tweede plaats bij waar dingen kunnen blijven hangen.',
        },
        {
          title: 'Wat gevoelig is, blijft binnen de muren',
          body: 'Rijksregisternummers, loonbrieven, de privérekeninguittreksels van een klant: dat hoort niet zomaar naar een server aan de andere kant van de wereld. Wij zetten in dat geval een model op een machine in uw eigen kantoor, zodat de stukken de deur niet uit gaan. Het beroepsgeheim van het ITAA is geen detail dat je achteraf oplost.',
        },
      ],
      signals: [
        'In maart en oktober raakt niemand op kantoor aan advieswerk',
        'Uw beste beheerder is de enige die weet hoe dat ene dossier echt in elkaar zit',
        'U typt cijfers over uit een pdf die u zelf een maand eerder verstuurd hebt',
        'Dezelfde herinneringsmail wordt voor dertig klanten opnieuw geschreven',
      ],
      automationsH2: 'Wat we kunnen automatiseren in een boekhoudkantoor',
      automationsIntro:
        'Vier voorbeelden uit dit vak. Telkens één stuk werk, afgebakend, met iemand van u die het laatste woord houdt.',
      automations: [
        {
          title: 'Btw voor de 25e',
          body: 'Maandaangevers zitten op de 20e, kwartaalaangevers op de 25e, en sinds 1 januari 2026 komt de Belgische B2B-aankoopzijde grotendeels via Peppol binnen. Wat overblijft is precies wat dat niet doet: de klant die zijn privé betaalde kosten niet aanlevert, de leverancier die zijn Peppol-adres nog altijd niet in orde heeft, de tankfactuur op naam die nooit is doorgestuurd. Wij zetten dat per dossier op een rij en leggen de herinneringsmail klaar in de bewoording die uw kantoor altijd gebruikt.',
          image: '/landing/auto-sec-kantoor-b.webp',
          alt: 'Een sober bureau met een stoel en een plant in een licht modern kantoor',
        },
        {
          title: 'Fiches en attesten',
          body: 'In september en oktober hangt de helft van uw aangiftes vast op één ontbrekend stuk: een fiche 281.10, een 281.20 voor de bedrijfsleider, het attest pensioensparen, het attest kinderopvang, de bankattesten of het attest van de kredietinstelling voor de hypothecaire lening. Wij houden per dossier bij wat binnen is en wat niet, en wie er vandaag gebeld moet worden voordat de indieningstermijn in het mandatarissenscherm verstrijkt.',
          image: '/landing/auto-opl-antwoord-a.webp',
          alt: 'Eén vast antwoord per terugkerende vraag, klaar om in te voegen in Outlook',
        },
        {
          title: 'Dossier overnemen',
          body: 'Eén blad per klant: hoe het dossier ervoor staat, wat er gevraagd is en wanneer, wat er per mail beloofd is, en wat er deze week moet gebeuren. Gemaakt voor de collega die het maandag moet oppakken omdat uw beheerder verlof heeft, en opgebouwd uit wat al in het dossier zit in plaats van uit een overdrachtsformulier dat niemand op vrijdagnamiddag invult.',
          image: '/landing/auto-opl-overname-a.webp',
          alt: 'Eén blad per dossier, met alles wat uw collega per mail beloofd heeft',
        },
        {
          title: 'Voor hij met pensioen gaat',
          body: 'Uw meest ervaren beheerder weet waarom er in 2021 een rechtzetting gebeurd is en wat er toen met de controleur afgesproken werd. Dat zit in oude mails, in losse nota\'s en in zijn hoofd. Wij zetten het in iets dat het kantoor echt kan doorzoeken, met het document bij elk antwoord, in het jaar voor hij vertrekt in plaats van de week erna.',
          image: '/landing/auto-sec-kantoor-a.webp',
          alt: 'Twee bureaus tegenover elkaar in een modern kantoor, één ervan leeg',
        },
      ],
      outcomesH2: 'Wat wij hierover niet gaan beweren',
      outcomes: [
        'Wij gaan niet doen alsof er in uw kantoor nog niets geautomatiseerd is. CodaBox levert uw rekeninguittreksels en loonboekingen al binnen, Clearfacts, Billtobox, Basecone en Dext halen de aankoopfacturen al op, Peppol brengt sinds 1 januari 2026 een groeiend deel gestructureerd binnen, en Exact Online, Yuki, Octopus, Adsolut, WinBooks, Silverfin en Twinfield doen elk hun stuk. Wij komen daar niet voor in de plaats.',
        'Wij gaan niet zeggen dat niemand anders in dit vak met AI bezig is. Clearfacts zet zelf boekingsvoorstellen klaar, Silverfin en Wolters Kluwer bouwen het in hun rapportering en aangiftes, en Microsoft 365 Copilot zit intussen in de mailbox van half Vlaanderen. Zit uw antwoord daar al in, dan zeggen wij dat en stoppen we.',
        'En wij gaan geen percentage of terugverdientijd noemen. Wij hebben geen nulmeting bij u, dus elk cijfer dat wij vooraf zouden geven is verzonnen. Wat wij wel doen is één stuk werk twee weken laten meelopen naast uw eigen manier, zodat u zelf ziet wat er overblijft.',
      ],
      faqs: [
        {
          q: 'Moeten wij hiervoor van pakket veranderen?',
          a: 'Nee. Uw dossiers blijven in Exact Online, Yuki, Octopus, Adsolut, WinBooks of Silverfin staan, met de mandaten en de historiek erin. Wij lezen wat binnenkomt en leveren het resultaat daar af of leggen het klaar ter goedkeuring. Een kantoor dat in september van pakket wisselt, met de aangiftes personenbelasting op de teller, doet zichzelf iets aan wat geen enkele automatisering goedmaakt.',
        },
        {
          q: 'Waar blijven de gegevens van onze klanten?',
          a: 'Waar u dat wil. Voor gewone kantoorpost werkt een Europese leverancier prima. Voor stukken waar uw beroepsgeheim op rust, zoals de loonbrieven of de privérekeninguittreksels van een klant, zetten wij een model op een machine bij u op kantoor, zodat die stukken de deur niet uit gaan. Wij zetten op papier wat waar draait, zodat u dat bij een kwaliteitstoetsing gewoon kunt tonen.',
        },
        {
          q: 'Wie is verantwoordelijk als het model zich vergist?',
          a: 'U, en daarom bouwen wij het zo dat u er altijd tussen zit. Er vertrekt niets naar een klant of naar de administratie zonder dat iemand van uw kantoor het gezien en getekend heeft. Wat wij klaarzetten is een voorstel met de bron erbij, zodat uw beheerder in tien seconden ziet waar het cijfer vandaan komt in plaats van het te moeten geloven.',
        },
        {
          q: 'Verandert de verplichte e-facturatie hier iets aan?',
          a: 'Ze verschuift de pijn, ze haalt hem niet weg. Sinds 1 januari 2026 loopt de facturatie tussen Belgische btw-plichtigen gestructureerd via Peppol, dus komt een groeiend deel van de aankoopzijde al netjes binnen. Wat overblijft is wat nooit gestructureerd binnenkomt: de klant die zijn privé betaalde kosten niet aanlevert, de leverancier wiens Peppol-adres nog altijd niet in orde is, de bankattesten, en de mails van klanten die iets vragen wat ze vorige maand ook al vroegen.',
        },
      ],
      featuresTitle: 'Wat doet Nivora Works voor een boekhoudkantoor?',
      featuresSubtitle:
        'Vrijdag kwart voor zes. De btw-aangifte kan buiten zodra drie klanten hun privé betaalde kosten aanleveren en één leverancier zijn Peppol-adres in orde brengt. Op dat moment is niemand op kantoor bezig met het werk waarvoor een klant u eigenlijk betaalt.',
      ctaTitle: 'Stuur ons één drukke voormiddag',
      ctaBody:
        'Neem de mails en stukken van één drukke voormiddag, geanonimiseerd, zoals ze binnenkwamen. Wij zetten er de dossiers van klaar zoals wij het zouden bouwen, en u legt dat naast wat uw eigen mensen die ochtend gedaan hebben.',
      seoTitle: 'AI-automatisering voor boekhoudkantoren in Vlaanderen en Nederland · Nivora Works',
      seoDescription:
        'Nivora Works uit Brugge bouwt AI-automatisering voor boekhoudkantoren. Eén afgebakend stuk kantoorwerk, naast Exact Online, Yuki, Octopus, Adsolut of WinBooks, met uw mensen die tekenen en gevoelige stukken die op kantoor blijven.',
    },
  },
  { hero: '/landing/auto-sec-kantoor-a.webp', manifesto: '/landing/auto-sec-kantoor-b.webp' },
)
