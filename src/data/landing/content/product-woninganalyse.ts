import { solutionPage } from '../solutionPage'

/**
 * /property-analysis-from-your-photos · /nl/woninganalyse-uit-uw-eigen-fotos
 *
 * Oplossing drie voor de immokantoren, uit het idee van Kamiel: uit de foto's
 * die tijdens het verkoopproces toch genomen worden een analyse halen van het
 * pand én van wat er nog verbeterd kan worden, zodat de prijs beter in te
 * schatten valt en er een verslag uit komt.
 *
 * De grens die deze pagina overal bewaakt: dit is GEEN schatting en GEEN EPC.
 * Beide zijn in Vlaanderen gereglementeerd werk dat bij iemand anders ligt, en
 * een pagina die daar overheen walst kost een kantoor zijn geloofwaardigheid en
 * mogelijk meer. Wat het wel is: onderbouwing voor het opnamegesprek, met bij
 * elke uitspraak de foto waarop ze steunt.
 *
 * De Vlaamse haak die het actueel maakt is de renovatieverplichting: wie een
 * woning met label E of F koopt, moet binnen vijf jaar naar label D. Dat is de
 * vraag die op elk bezoek terugkomt, en het antwoord erop verdedigt de prijs.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Our solutions',
      h1: 'What the property still needs doing, out of the photos you already have',
      subhead:
        'Your photographer walks through the whole house and comes back with two hundred photos. You use eight. In the other hundred and ninety two sits everything you need to defend your asking price.',
      answerH2: 'What do you get out of the intake photos?',
      answer:
        'A property analysis reads the photos taken during an ordinary intake and turns them into an argument: what the state of each room actually shows, what would lift the value and roughly what that costs, and what the energy label means for the buyer who has to renovate to label D within five years. Nivora delivers it as a report your agent takes into the intake meeting. It is not a valuation and it is not an energy certificate, because both of those are regulated work that belongs with somebody else. It is the reasoning underneath the price you are going to defend, with the photo it rests on shown beside every statement.',
      answerDetail: [
        'The hard part of an intake is never the number, it is the conversation. A seller who has lived somewhere for thirty years has a figure in their head, and an agent who cannot show where a lower one comes from either loses the instruction or takes it at a price that will not sell.',
        'So the report is built to be shown. Per room what the images support, what is worth doing before it goes online and what is not worth doing at all, and the renovation obligation set out in years and in an order of cost rather than left as a letter on a certificate.',
      ],
      manifesto:
        'The photographer already walked through the whole house. The pity is that only the nice rooms end up being used.',
      problemH2: 'What those photos are used for today',
      problem: [
        'The photos are shot for the listing, so eight of them get used and the rest sit in a folder. The single-glazed window, the boiler with a date on it, the roof space with nothing under the tiles: all of it was photographed, and none of it makes it into the conversation about the price.',
        'What is worth doing before a property goes online is guesswork per agent. One says paint the hall, another says leave it, and neither of them can show what it does. Meanwhile a seller spends four thousand on a bathroom that adds nothing and skips the two hundred euro job that would have.',
        'And then there is the label. Since the renovation obligation came in, a buyer looking at a home with label E or F is really asking one question: what do I have to do, by when, and what does it cost. If the agent has no answer ready, the candidate either walks away or bids as though the worst case is true.',
      ],
      pillarsH2: 'How we go about it',
      pillars: [
        {
          title: 'Everything comes back to a photo',
          body: 'Every statement in the report carries the image it rests on. Not a score and not a grade, but a sentence and the frame it came from, so the agent can hold it up in front of a seller. Where the photos do not support something, the report says so instead of guessing.',
        },
        {
          title: 'Worth doing, and not worth doing',
          body: 'The list runs both ways, and the second half matters more. What lifts the value, roughly what it costs, and what is simply not going to earn itself back on this property in this street. An agent who can talk a seller out of a bathroom has more credit than one who agrees with everything.',
        },
        {
          title: 'Not a valuation and not a certificate',
          body: 'We do not set a price and we do not issue an energy certificate, because in Flanders both belong to somebody who is qualified and liable for it. What we deliver is the reasoning that sits underneath your own judgement, and your judgement stays yours.',
        },
      ],
      examplesH2: 'What a photo gives you',
      examplesIntro:
        'Two frames out of an ordinary intake, and what ends up in the report because of them. Illustrative examples of the kind of reading this does, not results from a client file.',
      examples: [
        {
          title: 'The roof space, photographed from the hatch',
          before: 'One frame among two hundred, kept because the estate agent wanted to show the attic could be converted. It never comes up again.',
          after: 'The report notes that the underside of the tiles is visible with nothing between the rafters, puts the roof insulation on the list with an order of cost, and links it to the label: this is usually the single cheapest step towards D, and it is the one a buyer can do without moving out.',
        },
        {
          title: 'The back room with the steel windows',
          before: 'Photographed for the light, used in the listing as the second image because it looks generous.',
          after: 'The report reads the single glazing in the frames, puts it beside the year of construction from the file, and marks it as the item that will come back at every viewing. It also says what not to do: replacing these before sale rarely earns itself back, and it is worth more as a negotiating point you have already priced.',
        },
      ],
      signals: [
        'Two hundred photos get taken and eight get used',
        'What a seller should do before going online differs per agent in your office',
        'You lose instructions because you cannot show where your price comes from',
        'A candidate bids low on a label E house because nobody told them what it costs',
      ],
      automationsH2: 'Andere oplossingen',
      automationsIntro:
        'De rest van wat wij bouwen. Elk daarvan is apart aan te vragen.',
      automations: [],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say we value property. Rockestate, Realo and the banks\' own models have done automated valuations in Belgium for years, and a sworn valuation is regulated work with a name and a liability attached. What we build sits before all of that: the reasoning, not the number.',
        'We are not going to say a photo can see everything. Damp behind a wall, a beam that has gone, a foundation: none of that is in an image and the report says nothing about it. Anything that needs opening up needs someone to open it up.',
        'And we are not going to give you a renovation quote. The orders of cost are ranges to have a conversation with, not a price. The moment a seller treats one as a quote you have a problem, so the report says on every line what it is.',
      ],
      faqs: [
        {
          q: 'Is this a valuation?',
          a: 'No, and that is a line we hold rather than a limitation we regret. A valuation in Belgium is regulated work with a qualified name and a liability behind it. What we deliver is the reasoning underneath a price: what the images support per room, what would lift the value, and what the label means in years and in cost. You set the price, exactly as you do now.',
        },
        {
          q: 'Do you issue an energy certificate?',
          a: 'No. An energy certificate is drawn up by a certified assessor on site, and nothing we build changes that. What we do is translate the label that already exists into what it means for this buyer in this house: what has to be done by when under the renovation obligation, and roughly what the usual steps cost. That is a conversation, not a certificate.',
        },
        {
          q: 'How reliable are the cost figures?',
          a: 'They are ranges to talk with, and the report says so on every line. Roof insulation in a standard terraced house sits in a band that is wide but useful; a bathroom in a listed building does not, and there the report says it cannot usefully estimate. A number that pretends to be a quote is worse than no number, because a seller will hold you to it.',
        },
        {
          q: 'Does this work on the photos we already have?',
          a: 'Mostly, and that is the point: they were taken anyway. What helps is that the photographer also shoots the boring things, the meter cupboard, the roof space, the window frames close up. If your set is eight styled images and nothing else, we will tell you the report will be thin rather than filling it with guesses.',
        },
      ],
      featuresTitle: 'What do you get out of the intake photos?',
      featuresSubtitle:
        'Your photographer walks through the whole house and comes back with two hundred photos. You use eight. In the other hundred and ninety two sits everything you need to defend your asking price.',
      ctaTitle: 'Send us one set of intake photos',
      ctaBody:
        'The full set from one property, the boring frames included, with the year of construction and the label out of the file. You get the report back the way we would build it, so you can lay it next to what your own agent concluded at that intake.',
      seoTitle: 'What the property still needs doing, out of your own photos · Nivora',
      seoDescription:
        'What the intake photos already say about a property: the state per room, what would lift the value and roughly what it costs, and what the energy label means under the renovation obligation. Reasoning to defend your price, not a valuation. By Nivora, Brugge.',
    },
    nl:
    {
      eyebrow: 'Onze oplossingen',
      h1: 'Wat er aan het pand te doen valt, uit de foto\'s die u al hebt',
      subhead:
        'Uw fotograaf loopt het hele huis door en komt terug met tweehonderd foto\'s. U gebruikt er acht. In de andere honderdtweeënnegentig zit alles wat u nodig hebt om uw vraagprijs te verdedigen.',
      answerH2: 'Wat haalt u uit de opnamefoto\'s?',
      answer:
        'Een woninganalyse leest de foto\'s die bij een gewone opname toch genomen worden en maakt er een onderbouwing van: wat de staat van elke ruimte effectief toont, wat waarde bijzet en ruwweg wat dat kost, en wat het energielabel betekent voor de koper die binnen vijf jaar naar label D moet renoveren. Nivora levert dat als een verslag dat uw makelaar meeneemt naar het opnamegesprek. Het is geen schatting en geen EPC, want dat is allebei gereglementeerd werk dat bij iemand anders ligt. Het is de redenering onder de prijs die u gaat verdedigen, met bij elke uitspraak de foto waarop ze steunt.',
      answerDetail: [
        'Het moeilijke aan een opname is nooit het cijfer, het is het gesprek. Een verkoper die er dertig jaar gewoond heeft, heeft een bedrag in zijn hoofd, en een makelaar die niet kan tonen waar een lager bedrag vandaan komt, verliest ofwel de opdracht ofwel neemt hij ze aan tegen een prijs waarmee het pand niet zal verkopen.',
        'Het verslag is dus gemaakt om getoond te worden. Per ruimte wat de beelden ondersteunen, wat de moeite is om nog te doen voor het online gaat en wat de moeite niet is, en de renovatieverplichting uitgezet in jaren en in orde van grootte in plaats van als een letter op een attest.',
      ],
      manifesto:
        'De fotograaf is al door het hele huis gelopen. Jammer genoeg gebruiken we alleen de mooie kamers.',
      problemH2: 'Waar die foto\'s vandaag voor dienen',
      problem: [
        'De foto\'s worden genomen voor het zoekertje, dus er worden er acht gebruikt en de rest blijft in een map staan. Het enkelglas, de ketel met een jaartal erop, de zolder waar niets onder de pannen zit: het is allemaal gefotografeerd, en niets ervan raakt in het gesprek over de prijs.',
        'Wat de moeite is om te doen voor een pand online gaat, is gokwerk per makelaar. De ene zegt de gang schilderen, de andere zegt laat maar, en geen van beiden kan tonen wat het oplevert. Ondertussen steekt een verkoper vierduizend euro in een badkamer die niets bijbrengt en slaat hij het werkje van tweehonderd euro over dat het wel gedaan zou hebben.',
        'En dan is er het label. Sinds de renovatieverplichting stelt een koper bij een woning met label E of F eigenlijk één vraag: wat moet ik doen, tegen wanneer, en wat kost dat. Heeft de makelaar daar geen antwoord op klaar, dan haakt de kandidaat af of biedt hij alsof het slechtste scenario waar is.',
      ],
      pillarsH2: 'Hoe wij het aanpakken',
      pillars: [
        {
          title: 'Alles komt terug op een foto',
          body: 'Bij elke uitspraak in het verslag staat het beeld waarop ze steunt. Geen score en geen puntje, maar een zin en het kader waar hij uit komt, zodat de makelaar het voor een verkoper kan openleggen. Waar de foto\'s iets niet ondersteunen, zegt het verslag dat, in plaats van te gokken.',
        },
        {
          title: 'De moeite waard, en niet de moeite waard',
          body: 'De lijst loopt twee kanten uit, en de tweede helft weegt zwaarder. Wat waarde bijzet, ruwweg wat het kost, en wat zich op dit pand in deze straat gewoon niet gaat terugverdienen. Een makelaar die een verkoper een badkamer uit het hoofd praat, heeft meer krediet dan een die met alles instemt.',
        },
        {
          title: 'Geen schatting en geen attest',
          body: 'Wij zetten geen prijs vast en wij maken geen EPC op, want in Vlaanderen hoort dat allebei bij iemand die daarvoor bevoegd is en er ook voor aansprakelijk is. Wat wij leveren is de redenering onder uw eigen oordeel, en dat oordeel blijft van u.',
        },
      ],
      examplesH2: 'Wat één foto oplevert',
      examplesIntro:
        'Twee beelden uit een gewone opname, en wat er daardoor in het verslag terechtkomt. Illustratieve voorbeelden van het soort lezing dat dit doet, geen resultaten uit een klantendossier.',
      examples: [
        {
          title: 'De zolder, gefotografeerd vanaf het luik',
          before: 'Eén beeld tussen tweehonderd, genomen omdat de makelaar wou tonen dat de zolder in te richten valt. Het komt daarna niet meer ter sprake.',
          after: 'Het verslag noteert dat de onderkant van de pannen zichtbaar is met niets tussen de kepers, zet de dakisolatie op de lijst met een orde van grootte, en koppelt dat aan het label: dit is doorgaans de goedkoopste stap richting D, en het is de enige die een koper kan doen zonder te verhuizen.',
        },
        {
          title: 'De achterkamer met de stalen ramen',
          before: 'Gefotografeerd om het licht, in het zoekertje gebruikt als tweede beeld omdat de ruimte royaal oogt.',
          after: 'Het verslag leest het enkelglas in de profielen, legt dat naast het bouwjaar uit het dossier, en markeert het als het punt dat bij elk bezoek terugkomt. Het zegt er ook bij wat u niet moet doen: dit vervangen voor de verkoop verdient zich zelden terug, en het is meer waard als onderhandelingspunt dat u al ingeprijsd hebt.',
        },
      ],
      signals: [
        'Er worden tweehonderd foto\'s genomen en er worden er acht gebruikt',
        'Wat een verkoper nog moet doen voor het online gaat, verschilt per makelaar bij u',
        'U verliest opdrachten omdat u niet kunt tonen waar uw prijs vandaan komt',
        'Een kandidaat biedt laag op een huis met label E omdat niemand hem zei wat het kost',
      ],
      automationsH2: 'Andere oplossingen',
      automationsIntro:
        'De rest van wat wij bouwen. Elk daarvan is apart aan te vragen.',
      automations: [],
      outcomesH2: 'Wat wij niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat wij panden schatten. Rockestate, Realo en de modellen van de banken doen in België al jaren automatische waarderingen, en een schatting met handtekening is gereglementeerd werk met een naam en een aansprakelijkheid eraan vast. Wat wij bouwen zit daarvóór: de redenering, niet het cijfer.',
        'Wij gaan niet zeggen dat een foto alles ziet. Vocht achter een muur, een balk die het begeeft, een fundering: dat zit niet in een beeld en het verslag zegt er dan ook niets over. Wat opengelegd moet worden, moet door iemand opengelegd worden.',
        'En wij gaan u geen renovatieofferte geven. De ordes van grootte zijn vorken om een gesprek mee te voeren, geen prijs. Zodra een verkoper er een offerte in ziet, hebt u een probleem, dus staat er op elke regel bij wat het is.',
      ],
      faqs: [
        {
          q: 'Is dit een schatting?',
          a: 'Nee, en dat is een grens die wij bewust trekken en geen beperking waar wij spijt van hebben. Een schatting is in België gereglementeerd werk met een bevoegde naam en een aansprakelijkheid erachter. Wat wij leveren is de redenering onder een prijs: wat de beelden per ruimte ondersteunen, wat waarde bijzet, en wat het label betekent in jaren en in kosten. U legt de prijs vast, precies zoals nu.',
        },
        {
          q: 'Maken jullie een EPC op?',
          a: 'Nee. Een EPC wordt ter plaatse opgemaakt door een erkend verslaggever, en niets wat wij bouwen verandert daaraan. Wat wij wel doen is het label dat er al is vertalen naar wat het betekent voor deze koper in dit huis: wat er tegen wanneer moet gebeuren onder de renovatieverplichting, en ruwweg wat de gebruikelijke stappen kosten. Dat is een gesprek, geen attest.',
        },
        {
          q: 'Hoe betrouwbaar zijn die kostencijfers?',
          a: 'Het zijn vorken om mee te praten, en dat staat op elke regel. Dakisolatie in een gewoon rijhuis zit in een band die breed maar bruikbaar is; een badkamer in een beschermd pand niet, en daar zegt het verslag dat het geen zinnige inschatting kan maken. Een cijfer dat zich als offerte voordoet is slechter dan geen cijfer, want een verkoper houdt u eraan.',
        },
        {
          q: 'Werkt dit op de foto\'s die wij al hebben?',
          a: 'Meestal wel, en dat is net het punt: ze zijn toch al genomen. Wat helpt is dat de fotograaf ook de saaie dingen schiet, de tellerkast, de zolder, de raamprofielen van dichtbij. Bestaat uw set uit acht gestileerde beelden en verder niets, dan zeggen wij dat het verslag mager zal uitvallen in plaats van het met gissingen op te vullen.',
        },
      ],
      featuresTitle: 'Wat haalt u uit de opnamefoto\'s?',
      featuresSubtitle:
        'Uw fotograaf loopt het hele huis door en komt terug met tweehonderd foto\'s. U gebruikt er acht. In de andere honderdtweeënnegentig zit alles wat u nodig hebt om uw vraagprijs te verdedigen.',
      ctaTitle: 'Stuur ons één reeks opnamefoto\'s',
      ctaBody:
        'De volledige reeks van één pand, de saaie beelden erbij, met het bouwjaar en het label uit het dossier. U krijgt het verslag terug zoals wij het zouden bouwen, zodat u het naast kunt leggen wat uw eigen makelaar bij die opname besloten heeft.',
      seoTitle: 'Wat er aan het pand te doen valt, uit uw eigen foto\'s · Nivora',
      seoDescription:
        'Wat de opnamefoto\'s al over een pand zeggen: de staat per ruimte, wat waarde bijzet en ruwweg wat het kost, en wat het energielabel betekent onder de renovatieverplichting. Onderbouwing om uw prijs te verdedigen, geen schatting. Van Nivora uit Brugge.',
    },
  },
  { hero: '/landing/auto-opl-analyse-a.webp', manifesto: '/landing/auto-opl-analyse-b.webp' },
)
