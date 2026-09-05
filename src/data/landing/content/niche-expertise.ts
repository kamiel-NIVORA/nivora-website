import { solutionPage } from '../solutionPage'

/**
 * Sectorpagina voor schade-expertisekantoren.
 *
 * Dit vak verschilt op één punt van alle andere sectoren hier: het werk komt
 * niet gelijkmatig binnen maar in golven. Eén hagelbui levert in twee dagen wat
 * er anders in twee maanden binnenkomt. De hele tekst is daarrond geschreven,
 * want dat is ook waar automatisering hier het meeste verschil maakt.
 *
 * De rij met oplossingen onderaan komt uit src/data/landing/sectors.ts.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Sectors',
      h1: 'AI automation for loss adjusters, from instruction to report',
      subhead:
        'A hailstorm on Saturday afternoon and by Monday there are eighty instructions in the mailbox, each with photos, each with an insurer waiting for a report. We first look at what happens between the site visit and the report going out, and then take over the part that is the same every time.',
      answerH2: 'What does Nivora Works do for a loss adjuster?',
      answer:
        'Nivora Works is a software and AI studio in Bruges that takes over the paperwork around a claim for expert practices: turning the instruction into a file that is ready before you get in the car, sorting the two hundred photos of a site visit by room and by damage item, and drafting a first version of the report from your own notes in your own house format. The valuation stays yours. What we build never puts a figure on damage and never decides on cover: it gathers, it sorts and it drafts, and the expert who signs is the expert who has always signed.',
      answerDetail: [
        'The trade is bursty and that is the whole problem. Between two storms there is time, and in the week after one there is none. Everything we build is measured against that week, because something that works in March and falls over on the Monday after a hailstorm has not solved anything.',
        'We connect to how the instruction reaches you, whether that is the insurer\'s portal, a shared mailbox or both at once. Your own file package stays where it is. We take the retyping out from between them.',
      ],
      manifesto:
        'An expert is paid for what he sees on site. Not for typing it out three times afterwards.',
      problemH2: 'Where the hours go in this trade',
      problem: [
        'The instruction arrives as an email with an attachment and a policy number, and before you get in the car somebody has retyped the address, the policy number, the date of loss and the details of the insured into your own file. Half of that was already in the attachment. On a normal week that is fifteen minutes a file, and in the week after a storm it is a full day of somebody who should have been out doing site visits.',
        'You come back from a site visit with two hundred photos and a page of notes. The photos are numbered in the order you happened to take them: three of the ceiling, one of the meter cupboard, seven of a floor from every angle because you were not sure yet which one would show it best. Sorting those by room and by damage item is an evening of work, and it is the part that no client ever sees.',
        'The report itself is largely the same report. The heading, the description of the building, the passage on the cause, the way you set out what falls inside and outside the cover: your office has written that a thousand times in the same words. What differs is the middle, and that is precisely the part that goes fastest. So the typing takes longer than the thinking.',
      ],
      pillarsH2: 'How we go about it',
      pillars: [
        {
          title: 'Come in on a busy week',
          body: 'We do not want to see a quiet Tuesday, we want the week after something happened. Who assigns the files, where the photos land, who chases the contractor for a quote, what gets postponed when eighty instructions come in at once: none of that is written down, and it is exactly what determines what is worth building.',
        },
        {
          title: 'We do not value damage',
          body: 'What a loss is worth, what falls under the policy and what does not, and what depreciation applies: that is your professional judgement and your liability, and it does not transfer to a system. So we stop one step before it. We put the file, the photos and the figures out of the quotes side by side, and you decide. Every figure carries the document it came from.',
        },
        {
          title: 'Sensitive files stay in the office',
          body: 'A claim involving injury carries medical records, a fire file often carries a police report, and both carry the identity details of people who never asked to be in a file. For those we run the model on hardware in your own office so nothing leaves the building. For the rest, inside Europe with a data processing agreement on paper.',
        },
      ],
      signals: [
        'The Monday after a storm nobody gets round to writing reports',
        'You sort the photos of a site visit in the evening, at home',
        'The same three paragraphs get retyped in every report',
        'A file gets chased because a quote never arrived and nobody was watching',
      ],
      automationsH2: 'What we can automate in an expert practice',
      automationsIntro:
        'Four things out of this trade, not a general list. We build them one at a time, and it usually starts with the second one because that is the evening work.',
      automations: [
        {
          title: 'Ready before you go',
          body: 'The instruction from the insurer comes in and the file is ready: address, policy number, cover, date of loss, the details of the insured and whatever the insurer already sent along. Anything the mail does not contain is listed as missing rather than left blank. You get in the car with a file instead of with an email.',
          image: '/landing/auto-sec-expertise-a.webp',
          alt: 'An empty room after a water leak, a stain across the ceiling and lifted parquet',
        },
        {
          title: 'Photos per damage item',
          body: 'Two hundred photos come back sorted per room and per damage item, in the order your report runs in, with the duplicates and the seven shots of the same floor put together. What has no photo at all is flagged, because that is what you find out at the wrong moment. You reorder what you want reordered, which is a great deal less than reordering all of them.',
          image: '/landing/auto-sec-expertise-b.webp',
          alt: 'A room after a small fire, soot fanned up one plastered wall above a scorched skirting',
        },
        {
          title: 'A first draft report',
          body: 'From your notes, the photos and the quotes comes a first version in your own house format, with the standing passages already in place and the figures from the quotes copied literally with the source shown next to each one. Nothing is valued and nothing is decided about cover: those parts stay open for you to fill. You rewrite the middle, which is the part that was worth your time anyway.',
          image: '/landing/auto-opl-documentlaag-hero.webp',
          alt: 'A wooden paper tray heaped with plain sheets beside a keyboard in morning light',
        },
        {
          title: 'The week after a storm',
          body: 'Eighty instructions in two days, and the question is not who is best but who is free and who is nearest. You see per file how long it has been open, which insurer expects what by when, and which four files are stuck on a quote that never arrived. Assigning stays a human decision, and it stays yours.',
          image: '/landing/auto-sec-expertise-c.webp',
          alt: 'The roof of a Flemish brick house after a storm, tiles torn away and battens exposed',
        },
      ],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say expert practices work on paper. Most insurers have had their own portal for years, instructions come in digitally, and there are packages that hold a claim file together perfectly well. What we are after is the part between two systems that a person is currently bridging by retyping.',
        'We are not going to say a model can assess damage from a photo. There are parties selling exactly that, mostly for motor claims where the damage patterns are standard and the parts have a price list. A wet ceiling in a house from 1962 is not that, and neither is the question of whether the water came from the roof or from a pipe. That judgement is why the insurer instructs you and not a photo app.',
        'And we are not going to quote you a percentage. We have no baseline measurement at your practice, so a figure we gave you up front would be invented. What we do instead is run one piece alongside your own way of working for two weeks, in a real week, so you can see for yourself what is left.',
      ],
      faqs: [
        {
          q: 'Do we have to change our claim software?',
          a: 'No. Whatever holds your files keeps holding them, and the insurer portals stay exactly as they are. What we build reads what comes in and puts the result ready in the place your people already look. If a portal releases nothing at all we say so up front, and then we come in through the mailbox instead.',
        },
        {
          q: 'Do you put a value on the damage?',
          a: 'No, and that is a deliberate line rather than a technical limitation. What a loss is worth, what the policy covers and what depreciation applies is your professional judgement, your signature and your liability. We put the file, the photos and the figures out of the quotes side by side with their sources attached, and you decide. A system that quietly proposed a figure would be doing exactly the part you are instructed for.',
        },
        {
          q: 'What happens to medical records and police reports?',
          a: 'Those stay in the building. For files with personal injury, with medical certificates or with a police report we put a model on hardware in your own office, so those documents never go to an outside server. For ordinary correspondence a European provider is fine, with a data processing agreement alongside. We write down which mailboxes and which folders went in, and you can take it back out.',
        },
        {
          q: 'We are three experts and a secretary. Is this not built for large practices?',
          a: 'The evening spent sorting photos is the same evening whether you are three or thirty, and in a small practice there is nobody to hand it to. We start with one thing, usually the photos or the first draft, and it has to earn its place within a fortnight. If it does not, we say so and stop rather than adding a second piece on top.',
        },
      ],
      featuresTitle: 'What does Nivora Works do for a loss adjuster?',
      featuresSubtitle:
        'A hailstorm on Saturday afternoon and by Monday there are eighty instructions in the mailbox, each with photos, each with an insurer waiting for a report. We first look at what happens between the site visit and the report going out, and then take over the part that is the same every time.',
      ctaTitle: 'Send us one week after a storm',
      ctaBody:
        'Take the instructions and photos of a single busy week, anonymised, exactly as they came in. We will put the files together the way we would build it, and you can lay that next to what your own people did that week.',
      seoTitle: 'AI automation for loss adjusters and expert practices · Nivora Works',
      seoDescription:
        'Nivora Works in Bruges takes over the paperwork around a claim: the instruction turned into a ready file, two hundred site photos sorted per damage item, and a first draft report in your own format. The valuation stays with the expert who signs.',
    },
    nl:
    {
      eyebrow: 'Sectoren',
      h1: 'AI-automatisering voor expertisekantoren, van opdracht tot verslag',
      subhead:
        'Zaterdagnamiddag een hagelbui en maandag staan er tachtig opdrachten in de mailbox, elk met foto\'s, elk met een maatschappij die op een verslag wacht. Wij kijken eerst wat er gebeurt tussen het plaatsbezoek en het vertrek van het verslag, en nemen daarna het stuk over dat elke keer hetzelfde is.',
      answerH2: 'Wat doet Nivora Works voor een expertisekantoor?',
      answer:
        'Nivora Works is een software- en AI-studio in Brugge die voor expertisekantoren het papierwerk rond een schadegeval overneemt: van de opdracht een dossier maken dat klaarstaat voor u in de auto stapt, de tweehonderd foto\'s van een plaatsbezoek ordenen per ruimte en per schadepost, en uit uw eigen nota\'s een eerste versie van het verslag opstellen in de huisstijl van uw kantoor. De raming blijft van u. Wat wij bouwen zet nooit een bedrag op schade en beslist nooit over dekking: het verzamelt, het ordent en het stelt op, en de expert die tekent is de expert die altijd getekend heeft.',
      answerDetail: [
        'Het vak komt in golven binnen en daar zit het hele probleem. Tussen twee stormen is er tijd, en in de week erna is er geen. Alles wat wij bouwen wordt afgemeten aan die week, want iets dat in maart werkt en op de maandag na een hagelbui omvalt, heeft niets opgelost.',
        'Wij sluiten aan op de manier waarop de opdracht bij u binnenkomt, of dat nu het portaal van de maatschappij is, een gedeelde mailbox of allebei tegelijk. Uw eigen dossierpakket blijft staan waar het staat. Wij halen het overtypen ertussenuit.',
      ],
      manifesto:
        'Een expert wordt betaald voor wat hij ter plaatse ziet. Niet voor het achteraf drie keer uittypen.',
      problemH2: 'Waar de uren in dit vak blijven hangen',
      problem: [
        'De opdracht komt binnen als een mail met een bijlage en een polisnummer, en voor u in de auto stapt heeft iemand het adres, het polisnummer, de schadedatum en de gegevens van de verzekerde overgetypt in uw eigen dossier. De helft daarvan stond al in die bijlage. Op een gewone week is dat een kwartier per dossier, en in de week na een storm is dat een volle dag van iemand die had moeten gaan kijken.',
        'U komt terug van een plaatsbezoek met tweehonderd foto\'s en een blad nota\'s. Die foto\'s staan genummerd in de volgorde waarin u ze toevallig genomen hebt: drie van het plafond, één van de tellerkast, zeven van een vloer vanuit elke hoek omdat u nog niet wist welke het duidelijkst zou tonen. Die ordenen per ruimte en per schadepost is een avond werk, en het is net het stuk dat geen enkele klant ooit ziet.',
        'Het verslag zelf is grotendeels hetzelfde verslag. De hoofding, de beschrijving van het gebouw, de passage over de oorzaak, de manier waarop u uiteenzet wat binnen en buiten de dekking valt: dat heeft uw kantoor duizend keer in dezelfde woorden geschreven. Wat verschilt zit in het midden, en dat is net het stuk dat het snelst gaat. Het tikken duurt dus langer dan het denken.',
      ],
      pillarsH2: 'Hoe wij te werk gaan',
      pillars: [
        {
          title: 'Meekijken op een drukke week',
          body: 'Wij willen geen rustige dinsdag zien maar de week nadat er iets gebeurd is. Wie de dossiers verdeelt, waar de foto\'s belanden, wie de aannemer achternabelt voor een bestek, wat er uitgesteld wordt als er tachtig opdrachten tegelijk binnenkomen: dat staat nergens opgeschreven, en het bepaalt net wat de moeite is om te bouwen.',
        },
        {
          title: 'Wij ramen geen schade',
          body: 'Wat een schadegeval waard is, wat wel en niet onder de polis valt en welke slijtage er speelt: dat is uw vakoordeel en uw aansprakelijkheid, en dat verhuist niet naar een systeem. Wij stoppen dus één stap ervoor. Wij leggen het dossier, de foto\'s en de cijfers uit de bestekken naast elkaar, en u beslist. Bij elk cijfer staat het stuk waar het vandaan komt.',
        },
        {
          title: 'Gevoelige dossiers blijven op kantoor',
          body: 'Een dossier met lichamelijke schade bevat medische stukken, een branddossier vaak een politieverslag, en allebei bevatten ze identiteitsgegevens van mensen die er niet om gevraagd hebben. Daarvoor zetten wij het model op hardware in uw eigen kantoor, zodat er niets naar buiten gaat. De rest binnen Europa, met een verwerkersovereenkomst op papier.',
        },
      ],
      signals: [
        'De maandag na een storm komt niemand toe aan het schrijven van verslagen',
        'U ordent de foto\'s van een plaatsbezoek \'s avonds, thuis',
        'Dezelfde drie alinea\'s worden in elk verslag opnieuw getikt',
        'Een dossier blijft liggen omdat een bestek nooit binnenkwam en niemand keek',
      ],
      automationsH2: 'Wat we kunnen automatiseren in een expertisekantoor',
      automationsIntro:
        'Vier dingen uit dit vak, geen algemene lijst. Wij bouwen ze één voor één, en meestal begint het bij de tweede, want dat is het avondwerk.',
      automations: [
        {
          title: 'Klaar voor u vertrekt',
          body: 'De opdracht van de maatschappij komt binnen en het dossier staat klaar: adres, polisnummer, waarborg, schadedatum, de gegevens van de verzekerde en wat de maatschappij al meegestuurd heeft. Wat er in die mail niet in staat, wordt als ontbrekend gemeld in plaats van leeg gelaten. U stapt in de auto met een dossier in plaats van met een mail.',
          image: '/landing/auto-sec-expertise-a.webp',
          alt: 'Een lege kamer na een waterlek, een vlek over het plafond en opgestoken parket',
        },
        {
          title: 'Foto\'s per schadepost',
          body: 'Tweehonderd foto\'s komen geordend terug per ruimte en per schadepost, in de volgorde waarin uw verslag loopt, met de dubbels en de zeven opnames van dezelfde vloer bij elkaar gezet. Waar helemaal geen foto van bestaat, wordt gemeld, want dat is wat u op het verkeerde moment ontdekt. U verschuift wat u wil verschuiven, en dat is heel wat minder dan ze allemaal verschuiven.',
          image: '/landing/auto-sec-expertise-b.webp',
          alt: 'Een kamer na een kleine brand, roet uitgewaaierd over een muur boven een verschroeide plint',
        },
        {
          title: 'Verslag uit uw nota\'s',
          body: 'Uit uw nota\'s, de foto\'s en de bestekken komt een eerste versie in de huisstijl van uw kantoor, met de vaste passages al ingevuld en de cijfers uit de bestekken letterlijk overgenomen met de bron ernaast. Er wordt niets geraamd en niets beslist over dekking: die stukken blijven open om zelf in te vullen. U herschrijft het midden, en dat was toch het stuk dat uw tijd waard was.',
          image: '/landing/auto-opl-documentlaag-hero.webp',
          alt: 'Een houten postbak vol blanco bladen naast een toetsenbord in ochtendlicht',
        },
        {
          title: 'De week na de storm',
          body: 'Tachtig opdrachten in twee dagen, en de vraag is niet wie de beste is maar wie vrij is en wie het dichtst zit. U ziet per dossier hoelang het openstaat, welke maatschappij wat tegen wanneer verwacht, en welke vier dossiers vasthangen op een bestek dat nooit binnenkwam. Toewijzen blijft een menselijke beslissing, en ze blijft de uwe.',
          image: '/landing/auto-sec-expertise-c.webp',
          alt: 'Het dak van een Vlaamse rijwoning na een storm, pannen weggeslagen en panlatten bloot',
        },
      ],
      outcomesH2: 'Wat wij niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat expertisekantoren op papier werken. De meeste maatschappijen hebben al jaren hun eigen portaal, opdrachten komen digitaal binnen, en er bestaan pakketten die een schadedossier prima bijeenhouden. Waar wij op mikken is het stuk tussen twee systemen dat vandaag door een mens overbrugd wordt met overtypen.',
        'Wij gaan niet zeggen dat een model schade kan beoordelen op een foto. Er zijn partijen die precies dat verkopen, meestal voor autoschade, waar de schadebeelden standaard zijn en de onderdelen een prijslijst hebben. Een nat plafond in een huis uit 1962 is dat niet, en de vraag of het water van het dak kwam of uit een leiding evenmin. Dat oordeel is waarom de maatschappij ú aanstelt en geen fotoapp.',
        'En wij gaan u geen percentage noemen. Wij hebben geen nulmeting bij u, dus elk cijfer dat wij vooraf zouden geven is verzonnen. Wat wij wel doen is één stuk twee weken laten meelopen naast uw eigen manier van werken, in een echte week, zodat u zelf ziet wat er overblijft.',
      ],
      faqs: [
        {
          q: 'Moeten wij van schadesoftware veranderen?',
          a: 'Nee. Wat uw dossiers bijhoudt, blijft ze bijhouden, en de portalen van de maatschappijen blijven precies zoals ze zijn. Wat wij bouwen leest wat binnenkomt en legt het resultaat klaar op de plek waar uw mensen toch al kijken. Geeft een portaal helemaal niets vrij, dan zeggen wij dat op voorhand en komen wij via de mailbox binnen.',
        },
        {
          q: 'Zetten jullie een bedrag op de schade?',
          a: 'Nee, en dat is een bewuste grens en geen technische beperking. Wat een schadegeval waard is, wat de polis dekt en welke slijtage er speelt, is uw vakoordeel, uw handtekening en uw aansprakelijkheid. Wij leggen het dossier, de foto\'s en de cijfers uit de bestekken naast elkaar met hun bron erbij, en u beslist. Een systeem dat stilzwijgend een bedrag voorstelt, doet net het stuk waarvoor u aangesteld bent.',
        },
        {
          q: 'Wat gebeurt er met medische stukken en politieverslagen?',
          a: 'Die blijven in het gebouw. Voor dossiers met lichamelijke schade, met medische attesten of met een politieverslag zetten wij een model op hardware in uw eigen kantoor, zodat die stukken niet naar een server buitenshuis gaan. Voor gewone briefwisseling werkt een Europese leverancier prima, met een verwerkersovereenkomst erbij. Wij schrijven op welke mailboxen en welke mappen erin zitten, en u haalt het er ook weer uit.',
        },
        {
          q: 'Wij zijn met drie experten en een secretaresse. Is dit niet voor grote kantoren?',
          a: 'De avond die aan het ordenen van foto\'s opgaat, is dezelfde avond of u nu met drie of met dertig bent, en in een klein kantoor is er niemand om ze aan door te geven. Wij starten met één ding, meestal de foto\'s of het eerste ontwerp, en het moet binnen de veertien dagen zijn plaats verdienen. Doet het dat niet, dan zeggen wij dat en stoppen wij, in plaats van er een tweede stuk bovenop te zetten.',
        },
      ],
      featuresTitle: 'Wat doet Nivora Works voor een expertisekantoor?',
      featuresSubtitle:
        'Zaterdagnamiddag een hagelbui en maandag staan er tachtig opdrachten in de mailbox, elk met foto\'s, elk met een maatschappij die op een verslag wacht. Wij kijken eerst wat er gebeurt tussen het plaatsbezoek en het vertrek van het verslag, en nemen daarna het stuk over dat elke keer hetzelfde is.',
      ctaTitle: 'Stuur ons één week na een storm',
      ctaBody:
        'Neem de opdrachten en foto\'s van één drukke week, geanonimiseerd, zoals ze binnenkwamen. Wij zetten er de dossiers van klaar zoals wij het zouden bouwen, en u legt dat naast wat uw eigen mensen die week gedaan hebben.',
      seoTitle: 'AI-automatisering voor expertisekantoren en schade-experten · Nivora Works',
      seoDescription:
        'Nivora Works uit Brugge neemt het papierwerk rond een schadegeval over: van de opdracht een klaar dossier maken, tweehonderd plaatsfoto\'s ordenen per schadepost, en een eerste ontwerpverslag in uw eigen huisstijl. De raming blijft bij de expert die tekent.',
    },
  },
  { hero: '/landing/auto-sec-expertise-a.webp', manifesto: '/landing/auto-sec-expertise-c.webp' },
)
