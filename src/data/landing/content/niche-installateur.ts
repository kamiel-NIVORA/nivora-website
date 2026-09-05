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
      h1: 'AI automation for installers, electrical, plumbing and heating',
      subhead:
        'Four crews out on the road, a quote five weeks old with the copper price having moved underneath it, and a Friday evening spent typing up the dockets you emptied out of the van. We know that half hour, and that is where we come in.',
      answerH2: 'What does AI automation mean for an installation company?',
      answer:
        'AI automation for an installation company means the paperwork around a job fills itself in: the work docket, the extras, the order at the wholesaler, the grant file and the invoice that follows from it, with the right VAT rate on it. Nivora is a software and AI studio in Bruges that builds this for installers in electrical, plumbing, heating and cooling, bolted onto what you already run rather than sitting beside it. We do not replace your bookkeeping or your planning, we make sure that what your fitters see and say on site actually gets recorded.',
      answerDetail: [
        'Your people are technicians, not administrators. A fitter still finishing an underfloor heating manifold at a quarter to six is not going to type out a fourteen line docket, and that is not a question of discipline.',
        'The money does not leak in one big moment, it leaks in pieces: two extra sockets nobody wrote down, an expansion vessel that came out of the van without landing on a docket, a part reel of cable that never came back to the store and so got ordered a second time, and a Cebeo discount that now sits in a different volume tier than the one you calculated with.',
      ],
      manifesto:
        'An installation company rarely loses its margin in the calculation. It loses it in the forty minutes between the site and the bookkeeping.',
      problemH2: 'Where the time and the margin go',
      problem: [
        'The docket arrives late or never arrives at all. Three weeks later the customer rings to say he never ordered that extra tap, and all you have is the word of a fitter who is now on another site.',
        'Extras get agreed verbally on site and never get ordered in writing. Before you carry them out, they should be ordered by the client, or by the main contractor if you are working as a subcontractor. An email is enough. An architect nodding is worth nothing, at best he writes it into the site report.',
        'Your trade list price stays put, it is your discount and the copper that move: your discount group, your volume tier, your annual agreement, and on cable a copper price that shifts by the day. Your quote is valid for thirty days and carries a price revision clause, only nobody checks which files have run past their date.',
      ],
      pillarsH2: 'How we work',
      pillars: [
        {
          title: 'We ride along first',
          body: 'Half a day on the road with one of your crews tells us more than ten meetings. We want to see which docket still gets filled in by hand, where the signal drops out in a basement, which van the press tool is sitting in, and what is on the back seat waiting until Friday. After that we pick one thing together that hurts most, usually the work that never got invoiced. It runs within a few weeks with one crew, and only once it sticks there without anyone having to be reminded does it go to the rest.',
        },
        {
          title: 'Bolted onto what is already there',
          body: 'You already have something for your quotes and invoices, and probably an accountant attached to his own program. We build against that and not beside it, because a second place to type things into stops being used after three weeks.',
        },
        {
          title: 'Running locally where it has to',
          body: 'Customer records, inspection reports and photos of installations do not have to leave for an American service. We can run the AI on your own hardware, at your premises or on a machine we look after in Bruges, including in a plant room with no decent connection.',
        },
      ],
      signals: [
        'Your crews still fill in paper dockets that you sit deciphering in the evening',
        'You never put your estimate next to your actual costing, so you only find out at the final account whether a job made money',
        'The grant file for a heat pump or a ventilation system sits there until the customer rings to chase it',
        'There is a press tool or a core drill in one of your vans and nobody knows which one',
      ],
      automationsH2: 'What we can automate in an installation company',
      automationsIntro:
        'Four examples from electrical, plumbing and heating. Not general promises, but the kind of work that is still sitting there between half five and seven.',
      automations: [
        {
          title: 'After-hours callout',
          body: 'Saturday morning, no hot water, and the customer rings your mobile. One rule is hard wired: if the caller reports a gas smell or a CO alarm, nothing gets asked. Close the gas tap, open the windows, touch no switches, go and stand outside, call 0800 65 0 65. Everything else gets questioned through in order: is this a contract customer, because that decides whether you drive out, at what rate and within which response time you agreed, then the pressure on the gauge, combi or cylinder, any fault lamp, the make and the fault code. Half of your Saturday mornings end with "open that tap under the boiler until it reads one and a half bar".',
          image: '/landing/auto-sec-install-a.webp',
          alt: 'A plant room with new pipework and a manifold',
        },
        {
          title: 'Inspection report',
          body: 'The report from Vinçotte or BTV comes back with eleven non-conformities, written per AREI article, Book 1 since 2020, from either a conformity inspection or a control visit, with a deadline on the re-inspection. And then it sits there for a fortnight. Out of that comes a plain list of what actually has to be done and what materials it takes, split the right way: if it is your own new installation, the non-conformities are yours to fix and you pay the re-inspection yourself. Only on an older installation, at a sale or a renovation where you were not the installer, does it become a quote for the customer.',
          image: '/landing/auto-opl-nietgefact-a.webp',
          alt: 'A tidy desk with folders and a plant',
        },
        {
          title: 'Net price and copper',
          body: 'Your trade list price stays put, it is your discount group, your volume tier and your annual agreement that shift, and on cable the copper price, sometimes day by day. You already see your net price in the wholesaler\'s webshop when you order at Cebeo or Van Marcke. What you do not see is which open quotes have run past their thirty days and what your price revision clause would give you there. That comes out as a short list, with the difference per line, before the customer signs.',
          image: '/landing/auto-sec-install-b.webp',
          alt: 'A van with the side door open and ordered stock',
        },
        {
          title: 'Service round',
          body: 'Gas boilers every two years, oil fired every year, and the date counts from the previous inspection, not from the day you installed it. That is what the round for next year gets built on, and the customer gets his offer without you chasing it, which is exactly where a maintenance contract quietly dies. The certificate itself is not produced at a desk: the cleaning and combustion certificate is filled in and signed on site by your approved technician for gaseous or liquid fuel, after measuring CO, flue gases and draught. We plan the round, you do the measurement.',
          image: '/landing/auto-opl-marge-a.webp',
          alt: 'Two blank quotation sheets side by side on a light desk',
        },
      ],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say you have no software. Robaws, Bouwsoft, Teamleader Focus and Odoo already handle quotes, dockets and invoicing in Belgium, and in the Netherlands Syntess Atrium, Admicom and Bouw7 have served the installation trade for years. If that runs well for you, we build against it rather than over it.',
        'We are not going to say we are the first with AI in this trade. ServiceTitan sells it to heating and plumbing firms in the United States, Klippa and Blue10 have been reading invoices and dockets in the Netherlands for years, and Billit handles your Peppol invoicing now that e-invoicing is mandatory in Belgium.',
        'And we are not going to say this saves your margin. What we can do is make sure that what happened on site ends up on the invoice, and that your actual costing lands next to your estimate. Whether you then calculate properly and buy well at Cebeo or Facq stays your work. We are not accountants and not approved technicians either: the VAT rate, the inspection and the certificate stay with the people who are certified for them.',
      ],
      faqs: [
        {
          q: 'Does this work if my fitters are not computer people?',
          a: 'That is exactly what it is built for. What we make has to work with wet gloves on a phone in a crawl space: take a photo, tap twice, done. If a foreman of fifty five does not get it the first time, it is not finished, and that is on us.',
        },
        {
          q: 'We already run a package for our quotes and invoices. Do we have to drop it?',
          a: 'No. We first ask which program holds the truth for your customers, hours and invoices, and that stays the truth. What we build writes into it and reads out of it, so your accountant gets nothing in front of him that he is not used to.',
        },
        {
          q: 'Can you do anything with VAT, grants and the rest of the paperwork?',
          a: 'That is where the hours disappear. Six per cent on a home older than ten years, with the statement on the invoice since 2022, and reverse charge when you work for a contractor: getting that wrong is the most expensive administrative mistake in your trade, so we do not let it be guessed. It gets proposed and you or your accountant confirm it. The same goes for the grant file on a heat pump, a solar water heater or ventilation, where the invoices, photos and certificates have to be in the right format, for the F-gas logbook and the leak tightness check on air conditioning and heat pumps, for the water inspection of the internal installation on a new connection, and for check-in-at-work, the withholding obligation and the social security check on your subcontractors.',
        },
        {
          q: 'What happens to our customer records and the photos of installations?',
          a: 'For anyone who wants it, the AI side runs on your own hardware, at your premises or on a machine we look after in Bruges. An inspection report or a customer file then never leaves your building, which is also easier to explain to a hospital or a school that lets you in.',
        },
      ],
      featuresTitle: 'What does AI automation mean for an installation company?',
      featuresSubtitle:
        'Four crews out on the road, a quote five weeks old with the copper price having moved underneath it, and a Friday evening spent typing up the dockets you emptied out of the van. We know that half hour, and that is where we come in.',
      ctaTitle: 'Send us the paperwork from one job',
      ctaBody:
        'The dockets, the emails about extras and the final invoice from one completed job. We put next to it what actually happened on site and show you where the difference sits, including the extras that were never ordered in writing and the VAT rate or grant file that got stuck. The pieces that usually come out of that are listed at the bottom of this page, and you are welcome to point at one straight away.',
      seoTitle: 'AI automation for installers, electrical, plumbing and heating · Nivora',
      seoDescription:
        'Dockets, extras, inspection reports, grant files and net prices that keep up with you. Nivora, a software and AI studio in Bruges, builds AI automation for installation companies in electrical, plumbing and heating, bolted onto Robaws, Teamleader, Odoo or Syntess rather than beside them.',
    },
    nl:
    {
      eyebrow: 'Sectoren',
      h1: 'AI-automatisering voor installateurs, elektro, sanitair en verwarming',
      subhead:
        'Vier ploegen buiten, een offerte van vijf weken oud waar de koperkoers intussen doorheen is gelopen, en een vrijdagavond waarop u de werkbonnen zit over te typen die u uit de bestelwagen hebt gehaald. Wij kennen dat halfuur, en daar sluiten wij op aan.',
      answerH2: 'Wat betekent AI-automatisering voor een installatiebedrijf?',
      answer:
        'AI-automatisering voor een installatiebedrijf betekent dat het papierwerk rond een werf zichzelf invult: de werkbon, het meerwerk, de bestelling bij de groothandel, het premiedossier en de factuur die daaruit volgt, met het juiste btw-tarief erop. Nivora is een software- en AI-studio uit Brugge die dat bouwt voor installateurs in elektro, sanitair, verwarming en koeling, vastgemaakt aan wat u vandaag al gebruikt in plaats van ernaast. Wij vervangen uw boekhouding of uw planning niet, wij zorgen dat wat uw gasten op de werf zien en zeggen, er ook effectief in geraakt.',
      answerDetail: [
        'Uw mensen zijn technici, geen administratie. Een monteur die om kwart voor zes nog een vloerverwarmingsverdeler afwerkt, gaat geen werkbon van veertien regels zitten typen, en dat is geen kwestie van discipline.',
        'Het geld lekt niet weg op één groot moment, het lekt in stukjes: twee extra stopcontacten die niemand noteerde, een expansievat dat uit de bestelwagen ging zonder op een bon te landen, een haspel restmateriaal die nooit naar het magazijn terugkwam en dus een tweede keer besteld werd, en een korting bij Cebeo die intussen in een andere staffel zit dan toen u calculeerde.',
      ],
      manifesto:
        'Een installatiebedrijf verliest zijn marge zelden in de calculatie. Het verliest ze in de veertig minuten tussen de werf en de boekhouding.',
      problemH2: 'Waar de tijd en de marge weglopen',
      problem: [
        'De werkbon komt te laat of komt niet. De klant belt drie weken later dat hij die extra kraan nooit besteld heeft, en u hebt alleen het woord van een gast die intussen op een andere werf staat.',
        'Meerwerk wordt op de werf mondeling afgesproken en raakt nooit schriftelijk besteld. Voor u het uitvoert, hoort het besteld te zijn door de bouwheer, of door de hoofdaannemer als u in onderaanneming zit. Een mail volstaat, een architect die knikt is niets waard, die schrijft het hoogstens in het werfverslag.',
        'Uw bruto blijft staan, het zijn uw korting en de koper die schuiven: uw kortingsgroep, uw staffel, uw jaarafspraak, en bij kabel een koperkoers die soms dag per dag beweegt. Uw offerte is dertig dagen geldig en heeft een prijsherzieningsclausule, alleen kijkt niemand na welke dossiers over datum staan.',
      ],
      pillarsH2: 'Hoe wij te werk gaan',
      pillars: [
        {
          title: 'Wij komen eerst mee rijden',
          body: 'Een halve dag op de baan met een van uw ploegen zegt meer dan tien vergaderingen. Wij willen zien welke bon nog met de hand wordt ingevuld, waar het bereik wegvalt in een kelder, in welke bestelwagen de persmachine staat, en wat er op de achterbank ligt te wachten tot vrijdag. Daarna kiezen wij samen één ding dat het meeste pijn doet, meestal het werk dat nooit gefactureerd raakte. Dat draait binnen enkele weken bij één ploeg, en pas als het daar blijft plakken zonder dat iemand eraan herinnerd moet worden, gaat het naar de rest.',
        },
        {
          title: 'Vastmaken aan wat er al staat',
          body: 'U hebt al iets voor uw offertes en facturen, en waarschijnlijk een boekhouder die aan zijn eigen programma hangt. Wij bouwen daartegen aan en niet ernaast, want een tweede plek om dingen in te typen wordt na drie weken niet meer gebruikt.',
        },
        {
          title: 'Lokaal draaien waar het moet',
          body: 'Klantgegevens, keuringsverslagen en foto\'s van installaties hoeven niet naar een Amerikaanse dienst te vertrekken. Wij kunnen de AI op uw eigen hardware laten draaien, bij u in het bedrijf of op een machine die wij in Brugge beheren, ook in een stookplaats zonder degelijke verbinding.',
        },
      ],
      signals: [
        'Uw ploegen vullen nog papieren werkbonnen in die u \'s avonds zit te ontcijferen',
        'U legt uw voorcalculatie nooit naast uw nacalculatie, dus weet u pas bij de eindafrekening of een werf iets heeft opgebracht',
        'Het premiedossier van een warmtepomp of een ventilatie blijft liggen tot de klant erachter belt',
        'Er staat een persmachine of een kernboor in een van uw bestelwagens en niemand weet in welke',
      ],
      automationsH2: 'Wat we kunnen automatiseren in een installatiebedrijf',
      automationsIntro:
        'Vier voorbeelden uit elektro, sanitair en verwarming. Geen algemene beloftes, maar het soort werk dat bij u tussen half zes en zeven blijft liggen.',
      automations: [
        {
          title: 'Wachtdienstoproep',
          body: 'Zaterdagochtend, geen warm water, en de klant belt uw gsm. Eén regel zit hard ingebakken: bij gasgeur of een CO-alarm wordt er niet uitgevraagd. Gaskraan dicht, ramen open, geen schakelaars aanraken, buiten gaan staan, 0800 65 0 65. Al de rest wordt in volgorde uitgevraagd: is dit een contractklant, want dat bepaalt of u rijdt, aan welk tarief en binnen welke interventietermijn u zich verbonden hebt, en daarna de druk op de manometer, combiketel of boiler, een storingslampje, het merk en de foutcode. De helft van uw zaterdagochtenden eindigt met "draai die kraan onder de ketel open tot anderhalve bar".',
          image: '/landing/auto-sec-install-a.webp',
          alt: 'Een technische ruimte met nieuwe leidingen en een verdeler',
        },
        {
          title: 'Keuringsverslag',
          body: 'Het verslag van Vinçotte of BTV komt terug met elf inbreuken, geschreven per AREI-artikel, Boek 1 sinds 2020, uit een gelijkvormigheidsonderzoek of een controlebezoek, met een termijn op de herkeuring. En dan blijft het twee weken liggen. Daar rolt een klare lijst uit met wat er effectief moet gebeuren en welk materiaal daarvoor nodig is, met het onderscheid erin: gaat het om uw eigen nieuwe installatie, dan zijn die inbreuken uw werk en betaalt u de herkeuring zelf. Alleen bij een oudere installatie, bij verkoop of renovatie waar u niet de plaatser was, wordt het een offerte voor de klant.',
          image: '/landing/auto-opl-nietgefact-a.webp',
          alt: 'Een opgeruimd bureau met dossiermappen en een plant',
        },
        {
          title: 'Netto en koperkoers',
          body: 'Uw bruto blijft staan, het zijn uw kortingsgroep, uw staffel en uw jaarafspraak die schuiven, en bij kabel de koperkoers, soms dag per dag. Uw netto ziet u al in de webshop bij het bestellen bij Cebeo of Van Marcke. Wat u niet ziet, is welke openstaande offertes intussen over hun dertig dagen zijn en wat uw prijsherzieningsclausule daar zou opleveren. Dat komt eruit als een kort lijstje, met het verschil per post, voor de klant tekent.',
          image: '/landing/auto-sec-install-b.webp',
          alt: 'Een bestelwagen met open zijdeur en geordend materiaal',
        },
        {
          title: 'Onderhoudsronde',
          body: 'Gasketels om de twee jaar, mazout elk jaar, en de datum telt vanaf de vorige keuring, niet vanaf de plaatsing. Daarop wordt de ronde van het komende jaar samengesteld en krijgt de klant zijn voorstel zonder dat u erachteraan moet, want dat is precies waar een servicecontract stilletjes doodbloedt. Het attest zelf maakt niemand aan een bureau: het reinigings- en verbrandingsattest wordt ter plaatse ingevuld en getekend door uw erkend technicus gasvormige of vloeibare brandstof, na de meting van CO, rookgassen en trek. Wij plannen de ronde, u doet de meting.',
          image: '/landing/auto-opl-marge-a.webp',
          alt: 'Twee blanco offertebladen naast elkaar op een licht bureau',
        },
      ],
      outcomesH2: 'Wat wij hierover niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat u nog geen software hebt. Robaws, Bouwsoft, Teamleader Focus en Odoo doen in België al offertes, werkbonnen en facturatie, en in Nederland doen Syntess Atrium, Admicom en Bouw7 dat al jaren voor de installatiebranche. Draait dat bij u goed, dan bouwen wij ertegen aan en niet eroverheen.',
        'Wij gaan niet zeggen dat wij de eerste zijn met AI in dit vak. ServiceTitan verkoopt dat in de Verenigde Staten aan verwarmings- en sanitairbedrijven, Klippa en Blue10 lezen in Nederland al jaren facturen en bonnen uit, en Billit verzorgt uw Peppol-facturatie nu de e-factuur in België verplicht is.',
        'En wij gaan niet zeggen dat dit uw marge redt. Wat wij kunnen, is zorgen dat wat op de werf gebeurd is ook op de factuur staat en dat uw nacalculatie naast uw voorcalculatie komt te liggen. Of u daarna juist calculeert en juist inkoopt bij Cebeo of Facq, blijft uw werk. En wij zijn geen boekhouder en geen erkend technicus: het btw-tarief, de keuring en het attest blijven bij de mensen die daarvoor erkend zijn.',
      ],
      faqs: [
        {
          q: 'Werkt dit ook als mijn gasten geen computermensen zijn?',
          a: 'Daar is het net op gemaakt. Wat wij bouwen moet met natte handschoenen op een gsm in een kruipkelder werken: foto nemen, twee keer tikken, klaar. Als een ploegbaas van vijfenvijftig het niet in één keer snapt, dan is het niet af en dan ligt het aan ons.',
        },
        {
          q: 'Wij werken al met een pakket voor onze offertes en facturen. Moeten wij daarvan af?',
          a: 'Nee. Wij vragen eerst welk programma bij u de waarheid bevat voor klanten, uren en facturen, en dat blijft de waarheid. Wat wij bouwen schrijft daarin en haalt daaruit, zodat uw boekhouder niets anders voor zich krijgt dan hij gewoon is.',
        },
        {
          q: 'Kunnen jullie iets met btw, premies en de rest van het papier?',
          a: 'Daar kruipen net de uren in. Zes procent bij een woning ouder dan tien jaar, met de verklaring op de factuur sinds 2022, en verlegd wanneer u voor een aannemer werkt: dat verkeerd zetten is de duurste administratieve fout in uw vak, dus laten wij het niet raden. Het wordt voorgesteld en u of uw boekhouder bevestigt. Hetzelfde voor het premiedossier bij een warmtepomp, een zonneboiler of ventilatie, waar de facturen, foto\'s en attesten in het juiste formaat moeten zitten, voor het F-gassenlogboek en de lekdichtheidscontrole bij airco en warmtepompen, voor de waterkeuring van de binneninstallatie bij een nieuwe aansluiting, en voor check-in-at-work, de inhoudingsplicht en de RSZ-check van uw onderaannemers.',
        },
        {
          q: 'Wat gebeurt er met onze klantgegevens en de foto\'s van installaties?',
          a: 'Voor wie dat wil, draait het AI-gedeelte op uw eigen hardware, bij u in het bedrijf of op een machine die wij in Brugge beheren. Dan verlaat een keuringsverslag of een klantendossier uw huis niet, en dat is ook makkelijker uit te leggen aan een ziekenhuis of een school waar u binnen mag.',
        },
      ],
      featuresTitle: 'Wat betekent AI-automatisering voor een installatiebedrijf?',
      featuresSubtitle:
        'Vier ploegen buiten, een offerte van vijf weken oud waar de koperkoers intussen doorheen is gelopen, en een vrijdagavond waarop u de werkbonnen zit over te typen die u uit de bestelwagen hebt gehaald. Wij kennen dat halfuur, en daar sluiten wij op aan.',
      ctaTitle: 'Stuur ons het papierwerk van één werf',
      ctaBody:
        'De werkbonnen, de mails over meerwerk en de eindfactuur van één afgewerkte werf. Wij zetten daarnaast wat er op de werf effectief gebeurd is en tonen u waar het verschil zit, ook het meerwerk dat nooit schriftelijk besteld raakte en het btw-tarief of het premiedossier dat is blijven hangen. De stukken die daar meestal uitkomen, staan onderaan deze pagina, en u mag er meteen een aanwijzen.',
      seoTitle: 'AI-automatisering voor installateurs, elektro, sanitair en verwarming · Nivora',
      seoDescription:
        'Werkbonnen, meerwerk, keuringsverslagen, premiedossiers en nettoprijzen die met u meebewegen. Nivora uit Brugge bouwt AI-automatisering voor installatiebedrijven in elektro, sanitair en verwarming, vastgemaakt aan Robaws, Teamleader, Odoo of Syntess in plaats van ernaast.',
    },
  },
  { hero: '/landing/auto-sec-install-a.webp', manifesto: '/landing/auto-sec-install-b.webp' },
)
