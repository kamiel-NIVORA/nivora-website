import { solutionPage } from '../solutionPage'

/**
 * Sectorpagina, geschreven met marktonderzoek en daarna nagelezen door iemand
 * die al jaren in deze sector werkt en geen IT-achtergrond heeft. Die ronde
 * bepaalde de titel, de woordkeuze en welke details eruit moesten omdat een
 * vakgenoot ze meteen als buitenstaanderstaal herkent.
 *
 * De rij met oplossingen onderaan komt niet uit dit bestand: die wordt gevuld
 * vanuit src/data/landing/sectors.ts, zodat een nieuwe oplossing vanzelf op de
 * sectoren verschijnt waar ze thuishoort.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Sectors',
      h1: 'AI automation for contractors, from site to invoice',
      subhead:
        'Your men knock off at half four, and then your second job starts: the delivery notes still lying in the van, the extra work the client asked for on Thursday that nobody has signed, the quote that has to be in tomorrow. We make sure that what you say and photograph on site ends up on paper by itself, on the right job and with a signature under it.',
      answerH2: 'What is AI automation for a building contractor?',
      answer:
        'AI automation for a building contractor means the paperwork around a job writes itself out of what already exists: a photo, a spoken note, a PDF drawing, a delivery note left in the van. Nivora is a software and AI studio in Brugge that builds this to fit one contracting business, rather than selling a ready-made package for it. It sits next to what you already use today, whether that is Bouwsoft, KPD or Exact voor Bouw with Octopus at your bookkeeper, or simply a folder of spreadsheets and a WhatsApp group per site. It does not become an eleventh separate programme your foreman has to click into.',
      answerDetail: [
        'It starts at the moment itself. The client points at a wall and says a door has to go in after all, you say you will price it up, and meanwhile the supplier rings about tomorrow\'s delivery. On a fixed-price contract for a building, you will not get that extra work through in an argument without a written and signed agreement. What we build lets you speak that agreement in thirty seconds on site, with the photo attached, so that out of it comes a variation note with a price that the client signs there and then on your screen.',
        'And it carries through to your money. An interim valuation is approved by the architect, but paid by the client, and on a house build that money comes from the bank, which only releases a stage payment against that approved valuation. A valuation that sits for two weeks is your money standing still. On private house building you invoice by stage anyway, foundations, shell wind and watertight, and so on, not with a percentage against each item the way public works run.',
      ],
      manifesto:
        'A contractor rarely loses money on the site. He loses it on the Friday evening when he is too tired to write it down.',
      problemH2: 'Where the time and the margin run out',
      problem: [
        'Most of the money is lost between the moment something is agreed and the moment it is signed. The client asks on site for a wider threshold, you nod while the pump is running and the standing time is charged by the started hour, and three weeks later nobody can say whether that was in the price. The two extra sockets he mentioned at the pre-start meeting with the electrician are written down nowhere either.',
        'Putting a quote together costs evenings. You sit with the specification open, count the square metres of facing brick off the bill of quantities, ring the roofer for a price that is valid for thirty days and therefore has to be done again as soon as the job shifts, and by eleven you are typing it all into a document you will have to change again next week. Material prices keep moving in the meantime, and whether your price revision formula catches that only shows at the first valuation.',
        'And then there is the work that genuinely got done and never reached an invoice or a claim. The soil taken off site with the technical report and the disposal paperwork nobody had priced in, a pallet of blocks you fetched yourself, frost days that were never declared to the RVA, a day the subcontractor lost because the screed was not dry. On one job you do not feel it, over a year you do.',
      ],
      pillarsH2: 'Where we plug in',
      pillars: [
        {
          title: 'A day on site first',
          body: 'Before anything gets built, we come and watch how it actually runs: who keeps the delivery notes, who fills in the day book of works, where the drawings live, who puts the post-intervention safety file together and who makes sure the 6 percent VAT statement appears on the right invoices, which since 2022 goes on the invoice itself instead of on a separate certificate. A contractor who mostly renovates in the old town works differently from one putting up shells on a new estate, and that difference decides what is worth automating.',
        },
        {
          title: 'Small things that actually get opened on site',
          body: 'We would rather build something small that the man with dirty hands really uses than something large that stops after three weeks. Usually it becomes one button on the phone, big type and a single action, because nobody fills in a form wearing work gloves.',
        },
        {
          title: 'Your numbers stay with you',
          body: 'Where we can, the model runs on your own hardware or on European servers, because your prices carry your margins, your subcontractors and your supplier discounts. That is exactly the kind of information you do not want appearing on a screen at the contractor two streets away.',
        },
      ],
      signals: [
        'Your extra work is signed nowhere, it lives in WhatsApp and in your head',
        'Putting a quote together still costs you two evenings a time',
        'Checkinatwerk and the checks on your subcontractors are done by hand, every week again',
        'You only know at handover whether a job made anything',
      ],
      automationsH2: 'What we can automate in a contracting business',
      automationsIntro:
        'Four examples, not a catalogue. Each one is something that only happens in construction, and each one is still done today with a biro on the back of a docket. The declaration of works and the attendance registration through Checkinatwerk belong in the same list, a weekly burden that a machine watches perfectly well. It all comes back to the same thing: money that is already gone before you have seen it.',
      automations: [
        {
          title: 'Signed variations',
          body: 'You say it into your phone on site, out comes a variation note with a price, and the client signs it there and then on your screen. On a fixed-price contract for a building, that signed sheet is the difference between extra work you get paid for and an argument you lose. The note attaches itself straight away to the right job and the right file.',
          image: '/landing/auto-sec-bouw-a.webp',
          alt: 'A building site at shell stage with daylight through the openings',
        },
        {
          title: 'Your own site diary',
          body: 'The site report comes from the architect, who chairs the site meeting, and you then have a set number of days to raise remarks before it counts as accepted. Out of your photos and voice memos comes your own site diary, plus a prepared reply to the architect\'s site report, so you can answer within the deadline instead of letting it pass. The snagging list sits with it, including who is in default.',
          image: '/landing/auto-opl-werfbon-a.webp',
          alt: 'A phone in a work glove on a building site',
        },
        {
          title: 'Before you pay',
          body: 'The merchant\'s delivery note gives the quantities and the items, the amounts come from your price agreement and your discount percentage off the catalogue value, and that is where things get shaved. We lay the order note, the price agreement and the purchase invoice side by side and hang it all on the right job, so a discount that has quietly slipped shows itself before you pay. For a subcontractor the check on social and tax debts rides along, because without that withholding you are on the hook for his debts.',
          image: '/landing/auto-brugge-bouw.webp',
          alt: 'A building site with scaffolding against a facade',
        },
        {
          title: 'Frost and lost days',
          body: 'It is rarely plain rain that stops the shell, it is frost, wind for the crane, and rain on the groundworks, where in clay one day is already enough. From the figures of the KMI or the approved weather station named in your contract, together with your own programme, come two things: the declaration of temporary unemployment for bad weather to the RVA, per man and per day within the deadline, and the registered notice to the architect and the client for the extension of the completion date.',
          image: '/landing/auto-opl-meetstaat-a.webp',
          alt: 'A rolled building drawing and a tape measure on a wooden table',
        },
      ],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say there is no software for contractors yet. Bouwsoft in Kortrijk, KPD, Exact voor Bouw (formerly Bouw7), Teamleader and Odoo have sold this for years, and for a firm that mainly needs tidy quotes, hours and invoices, a package like that is often the better and the cheaper choice.',
        'We are not going to say we invented the digital site report. PlanRadar and ArchiSnapper, the latter out of Ghent and now part of Deltek, have long let you put photos, defects and snagging lists straight onto the drawing, and 12Build does the same for sending enquiries out to subcontractors.',
        'And we are not going to say a machine reads a construction drawing without error. Kreo, Bluebeam Revu, Autodesk Takeoff and Togal.AI have been measuring off PDF drawings for years, and as with them, a person still has to go over the take-off before a price is put on it. One misread scale on an elevation costs you a job.',
      ],
      faqs: [
        {
          q: 'Do we have to drop Bouwsoft or Exact then?',
          a: 'No, and usually we advise against it. What we build sits beside or on top of it: the extra work you speak into your phone on site and have signed simply lands as a line in your existing job file, and your bookkeeper carries on in Octopus or in whatever he uses today. If this turns into an eleventh separate programme your foreman has to click into, it is rightly a no before the price even comes up, and then we have not done our job properly.',
        },
        {
          q: 'Will this work if my people are not good with computers?',
          a: 'That is usually the question that decides it. We design on the assumption that there is one button, that you may speak instead of type, and that it also works in a cellar with no signal, sending as soon as the phone picks up a network again. If a site manager is not using it of his own accord in the first week, that is on us and we change it.',
        },
        {
          q: 'What does something like this cost and how long does it take?',
          a: 'We start small and with one thing, usually usable on a single job within a few weeks. We cannot put a figure on what it returns in advance, because we have no measurement of what you lose today. What we can do is count together after two months how many signed variation notes are sitting there that were not there before.',
        },
        {
          q: 'Do my drawings and prices stay in house?',
          a: 'Your drawings, prices and client details stay yours, and where we can the models run locally or on European servers so nothing leaves. With a specification from a public tender or an architect\'s drawing that is not a luxury, because there are agreements and prices in there that do not belong with a competitor.',
        },
      ],
      featuresTitle: 'What is AI automation for a building contractor?',
      featuresSubtitle:
        'Your men knock off at half four, and then your second job starts: the delivery notes still lying in the van, the extra work the client asked for on Thursday that nobody has signed, the quote that has to be in tomorrow. We make sure that what you say and photograph on site ends up on paper by itself, on the right job and with a signature under it.',
      ctaTitle: 'Send us one job',
      ctaBody:
        'Take a job you have just handed over: the quote, the extra work as it was written down or not written down at all, and the hours your men actually worked along with the purchase invoices booked against it. We go through it ourselves and tell you where the money was left behind and which part of that is worth automating. If there is nothing in it, we say so too, and you will have lost an afternoon instead of a budget.',
      seoTitle: 'AI automation for contractors: variations, take-off and margin · Nivora',
      seoDescription:
        'AI automation for building contractors in Belgium and the Netherlands: extra work signed on site, your own site diary alongside the architect\'s site report, delivery notes and invoices tied to the right job, and the check on your subcontractor before you pay. Connects to Bouwsoft, KPD or Exact voor Bouw and to Octopus at your bookkeeper. By Nivora, software and AI studio in Brugge.',
    },
    nl:
    {
      eyebrow: 'Sectoren',
      h1: 'AI-automatisering voor aannemers, van werf tot factuur',
      subhead:
        'Uw gasten stoppen om half vijf, en dan begint uw tweede werk: de bonnen die nog in de bestelwagen liggen, het meerwerk dat de bouwheer donderdag vroeg en dat nergens getekend staat, de offerte die morgen binnen moet. Wij zorgen dat wat u op de werf zegt en fotografeert vanzelf op papier komt, op de juiste werf en met een handtekening eronder.',
      answerH2: 'Wat is AI-automatisering voor een aannemer?',
      answer:
        'AI-automatisering voor een aannemer betekent dat het papierwerk rond een werf zichzelf opmaakt uit wat er toch al is: een foto, een ingesproken notitie, een PDF-plan, een leveringsbon uit de bestelwagen. Nivora is een software- en AI-studio uit Brugge die dat op maat van één bouwbedrijf bouwt, in plaats van er een kant-en-klaar pakket voor te verkopen. Het komt naast wat u vandaag al gebruikt, of dat nu Bouwsoft, KPD of Exact voor Bouw is met Octopus bij uw boekhouder, of gewoon een map met Excel-bestanden en een WhatsApp-groep per werf. Het wordt geen elfde los programma waar uw ploegbaas nog eens moet in klikken.',
      answerDetail: [
        'Het begint bij het moment zelf. De bouwheer wijst naar een muur en zegt dat er toch een deur in moet, u zegt dat u het zult doorrekenen, en ondertussen belt de leverancier over de levering van morgen. Bij een aanneming tegen vaste prijs voor een gebouw krijgt u dat meerwerk er zonder geschreven en getekend akkoord niet door als er later discussie komt. Wat wij bouwen laat u die afspraak in dertig seconden inspreken, met de foto erbij, zodat er een meerwerkbon met prijs uit komt die de bouwheer ter plaatse op uw scherm tekent.',
        'En het loopt door tot aan uw geld. Een vorderingsstaat wordt goedgekeurd door de architect, maar betaald door de bouwheer, en bij een woningbouw komt dat geld van de bank, die pas een schijf vrijgeeft tegen die goedgekeurde staat. Een staat die twee weken blijft liggen is dus uw geld dat stilstaat. Bij particuliere woningbouw factureert u trouwens per fase, funderingen, ruwbouw wind- en waterdicht, en zo verder, en niet met percentages per post zoals bij openbare werken.',
      ],
      manifesto:
        'Een aannemer verliest zijn geld zelden op de werf. Hij verliest het op de vrijdagavond dat hij te moe is om het nog op te schrijven.',
      problemH2: 'Waar de tijd en de marge weglopen',
      problem: [
        'Het meeste geld gaat verloren tussen het moment dat iets afgesproken wordt en het moment dat het getekend staat. De bouwheer vraagt op de werf om een bredere dorpel, u knikt terwijl de pomp staat te draaien en de wachtvergoeding per begonnen uur loopt, en drie weken later weet niemand nog of dat in de prijs zat. De twee extra stopcontacten die hij bij de voorbespreking met de elektricien noemde, staan intussen ook nergens.',
        'Een offerte maken kost avonden. U zit met het bestek open, telt de vierkante meters gevelsteen na op de meetstaat, belt de dakwerker voor een prijs die dertig dagen geldig is en dus opnieuw moet zodra de werf verschuift, en tegen elf uur tikt u alles over in een document dat u volgende week weer mag aanpassen. De materiaalprijzen schuiven ondertussen door, en of uw prijsherzieningsformule dat opvangt, merkt u pas bij de eerste vorderingsstaat.',
        'En dan is er het werk dat wel degelijk gebeurd is en nooit op een factuur of op een aangifte belandde. De afvoer van de grond met het technisch verslag en de papieren van het grondverzet die niemand had ingerekend, een pallet stenen die u zelf bent gaan halen, vorstdagen die nooit bij de RVA aangegeven raakten, een dag die de onderaannemer verloor omdat de chape niet droog was. Op één werf voelt u dat niet, over een jaar gerekend wel.',
      ],
      pillarsH2: 'Waar wij aansluiten',
      pillars: [
        {
          title: 'Eerst een dag mee op de werf',
          body: 'Voor er iets gebouwd wordt, komen wij kijken hoe het bij u loopt: wie de bonnen bijhoudt, wie het dagboek der werken invult, waar de plannen staan, wie het postinterventiedossier samenstelt en wie erop let dat de verklaring voor het btw-tarief van 6 procent op de juiste facturen staat, sinds 2022 op de factuur zelf in plaats van op een apart attest. Een aannemer die vooral renoveert in de binnenstad werkt anders dan een die casco optrekt op een verkaveling, en dat verschil bepaalt wat er zinvol te automatiseren valt.',
        },
        {
          title: 'Kleine dingen die op de werf ook echt open gaan',
          body: 'Wij bouwen liever iets kleins dat de gast met vuile handen ook effectief gebruikt, dan iets groots dat na drie weken stilvalt. Meestal wordt het één knop op de gsm, met dikke letters en één handeling, want met werkhandschoenen aan tikt niemand een formulier in.',
        },
        {
          title: 'Uw cijfers blijven bij u',
          body: 'Waar het kan draait het model op uw eigen hardware of op Europese servers, want in uw prijzen zitten uw marges, uw onderaannemers en uw leverancierskortingen. Dat is precies het soort informatie waarvan u niet wil dat ze bij de aannemer twee straten verder op een scherm verschijnt.',
        },
      ],
      signals: [
        'Uw meerwerk staat nergens getekend, het zit in WhatsApp en in uw hoofd',
        'Een offerte opmaken kost u nog altijd twee avonden per stuk',
        'Checkinatwerk en de controle op uw onderaannemers doet u elke week opnieuw met de hand',
        'U weet pas bij de oplevering of een werf iets heeft opgebracht',
      ],
      automationsH2: 'Wat we kunnen automatiseren in een aannemersbedrijf',
      automationsIntro:
        'Vier voorbeelden, geen catalogus. Elk daarvan is iets dat alleen in de bouw voorkomt, en elk daarvan gebeurt vandaag nog met een balpen op de achterkant van een bon. De aangifte van werken en de aanwezigheidsregistratie via Checkinatwerk horen in hetzelfde rijtje thuis, dat is wekelijkse last die zich netjes laat bewaken. Het komt allemaal op hetzelfde neer: geld dat al weg is voordat u het gezien hebt.',
      automations: [
        {
          title: 'Meerwerk, getekend',
          body: 'U zegt het in uw telefoon op de werf, er komt een meerwerkbon met prijs uit, de bouwheer tekent ter plaatse op uw scherm. Bij een aanneming tegen vaste prijs voor een gebouw is dat getekende blad het verschil tussen betaald meerwerk en een discussie die u verliest. De bon hangt meteen aan de juiste werf en aan het juiste dossier.',
          image: '/landing/auto-sec-bouw-a.webp',
          alt: 'Een werf in de ruwbouwfase met daglicht door de raamopeningen',
        },
        {
          title: 'Uw eigen werfdagboek',
          body: 'Het werfverslag komt van de architect, die de werfvergadering leidt, en u hebt daarna een aantal dagen om opmerkingen te maken vóór het als aanvaard geldt. Uit uw foto\'s en spraakmemo\'s komt uw eigen werfdagboek, plus een klaargezette reactie op het werfverslag van de architect, zodat u binnen de termijn kunt antwoorden in plaats van het te laten passeren. De puntenlijst staat erbij, met wie in gebreke is.',
          image: '/landing/auto-opl-werfbon-a.webp',
          alt: 'Een telefoon in een werkhandschoen op een werf',
        },
        {
          title: 'Vóór u betaalt',
          body: 'De leveringsbon van de handel geeft de aantallen en de artikels, de bedragen komen uit uw prijsafspraak en uw kortingspercentage op de cataloguswaarde, en daar wordt aan geschoven. Wij leggen bestelbon, prijsafspraak en aankoopfactuur naast elkaar en hangen alles aan de juiste werf, zodat een korting die stilletjes gezakt is opvalt vóór u betaalt. Bij een onderaannemer gaat de controle op sociale en fiscale schulden mee, want zonder die inhouding hangt u voor zijn schulden.',
          image: '/landing/auto-brugge-bouw.webp',
          alt: 'Een werf met stelling tegen een gevel',
        },
        {
          title: 'Vorst en weerverlet',
          body: 'Het is zelden gewone regen die de ruwbouw stillegt, het is vorst, wind voor de kraan, en regen op de grondwerken, waar in kleigrond één dag al genoeg is. Uit de cijfers van het KMI of van het erkende weerstation dat in uw contract staat en uit uw eigen planning komen twee dingen: de aangifte tijdelijke werkloosheid wegens slecht weer bij de RVA, per werkman en per dag binnen de termijn, en de aangetekende verwittiging aan architect en bouwheer voor de verlenging van de uitvoeringstermijn.',
          image: '/landing/auto-opl-meetstaat-a.webp',
          alt: 'Een opgerold bouwplan en een rolmaat op een houten tafel',
        },
      ],
      outcomesH2: 'Wat wij hierover niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat er nog geen software voor aannemers bestaat. Bouwsoft in Kortrijk, KPD, Exact voor Bouw (het vroegere Bouw7), Teamleader en Odoo verkopen dit al jaren, en voor een bedrijf dat vooral nette offertes, uren en facturen nodig heeft, is zo een pakket vaak de betere en de goedkopere keuze.',
        'Wij gaan niet zeggen dat wij het digitale werfverslag hebben uitgevonden. PlanRadar en ArchiSnapper, dat laatste uit Gent en intussen onderdeel van Deltek, laten al lang foto\'s, gebreken en opleveringslijsten op het plan zetten, en 12Build doet hetzelfde voor offerteaanvragen bij onderaannemers.',
        'En wij gaan niet zeggen dat een machine een bouwplan foutloos leest. Kreo, Bluebeam Revu, Autodesk Takeoff en Togal.AI meten al jaren uit PDF-plannen, en net als bij hen moet er een mens over de meetstaat gaan voor er een prijs op komt. Een verkeerd gelezen schaal in een gevelaanzicht kost u een werf.',
      ],
      faqs: [
        {
          q: 'Moeten wij dan van Bouwsoft of Exact af?',
          a: 'Nee, en meestal raden wij dat af. Wat wij bouwen komt ernaast of erbovenop te staan: het meerwerk dat u op de werf inspreekt en laat tekenen, komt gewoon als een lijn in uw bestaande dossier terecht, en uw boekhouder blijft in Octopus of in wat hij vandaag gebruikt. Wordt dit een elfde los programma waar uw ploegbaas nog eens in moet klikken, dan is het terecht een neen nog voor de prijs ter sprake komt, en dan hebben wij ons werk niet goed gedaan.',
        },
        {
          q: 'Werkt dit ook als mijn mensen niet met computers overweg kunnen?',
          a: 'Dat is meestal de bepalende vraag. Wij ontwerpen ervan uit dat er één knop is, dat er ingesproken mag worden in plaats van getikt, en dat het ook werkt in een kelder zonder bereik, met verzending zodra de gsm weer netwerk pakt. Als een werfleider het in de eerste week niet uit zichzelf gebruikt, ligt dat aan ons en passen wij het aan.',
        },
        {
          q: 'Wat kost zoiets en hoe lang duurt het?',
          a: 'Wij beginnen klein en met één ding, meestal in enkele weken bruikbaar op één werf. Wat het opbrengt kunnen wij vooraf niet in cijfers zetten, want wij hebben geen meting van wat u vandaag verliest. Wat wij wel kunnen, is na twee maanden samen tellen hoeveel getekende meerwerkbonnen er liggen die er vroeger niet lagen.',
        },
        {
          q: 'Blijven mijn plannen en prijzen binnenshuis?',
          a: 'Uw plannen, prijzen en klantengegevens blijven van u, en waar het kan draaien de modellen lokaal of op Europese servers zodat er niets naar buiten gaat. Bij een bestek van een openbare aanbesteding of een plan van een architect is dat geen luxe, want daar zitten afspraken en prijzen in die niet bij een concurrent thuishoren.',
        },
      ],
      featuresTitle: 'Wat is AI-automatisering voor een aannemer?',
      featuresSubtitle:
        'Uw gasten stoppen om half vijf, en dan begint uw tweede werk: de bonnen die nog in de bestelwagen liggen, het meerwerk dat de bouwheer donderdag vroeg en dat nergens getekend staat, de offerte die morgen binnen moet. Wij zorgen dat wat u op de werf zegt en fotografeert vanzelf op papier komt, op de juiste werf en met een handtekening eronder.',
      ctaTitle: 'Stuur ons één werf',
      ctaBody:
        'Neem een werf die net opgeleverd is: de offerte, het meerwerk zoals het genoteerd staat of net niet, en de gepresteerde uren van uw gasten en de aankoopfacturen die erop geboekt zijn. Wij gaan er zelf door en zeggen u waar het geld is blijven liggen en welk stuk daarvan wij zinvol kunnen automatiseren. Valt er niets te halen, dan zeggen wij dat ook, en dan hebt u een namiddag verloren in plaats van een budget.',
      seoTitle: 'AI-automatisering voor aannemers: meerwerk, meetstaat en marge · Nivora',
      seoDescription:
        'AI-automatisering voor aannemers in Vlaanderen en Nederland: meerwerk dat op de werf getekend raakt, uw eigen werfdagboek naast het werfverslag van de architect, bonnen en facturen aan de juiste werf, en de controle op uw onderaannemer vóór u betaalt. Sluit aan op Bouwsoft, KPD of Exact voor Bouw en op Octopus bij uw boekhouder. Door Nivora, software- en AI-studio in Brugge.',
    },
  },
  { hero: '/landing/auto-sec-bouw-a.webp', manifesto: '/landing/auto-brugge-bouw.webp' },
)
