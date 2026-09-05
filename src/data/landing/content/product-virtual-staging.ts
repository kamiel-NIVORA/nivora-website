import { solutionPage } from '../solutionPage'

/**
 * /virtual-staging-empty-properties · /nl/virtual-staging-lege-woning
 *
 * De eerste oplossing die geschreven is naar het voorbeeld dat Kamiel zelf gaf,
 * en meteen de maatstaf voor de andere: een makelaar moet na de titel al weten
 * waarover het gaat, en na het voor-en-na-blok zien waarom het bij ons anders
 * uitvalt.
 *
 * De eerlijke hoek is NIET dat virtual staging niet bestaat, want het bestaat
 * volop. BoxBrownie, Styldod, ApplyDesign, REimagineHome en Virtual Staging AI
 * staan daarom met naam in het blok "wat wij niet gaan beweren". Wat overblijft
 * is de beoordelingsstap: meerdere versies laten maken en er zelf op schaal,
 * verhouding en passendheid door gaan, zodat de makelaar niet zelf vijf beelden
 * moet zitten uitzoeken.
 *
 * Twee harde grenzen staan expliciet op de pagina omdat ze juridisch zijn: wij
 * veranderen niets aan het pand zelf (geen scheuren of vochtvlekken weg), en de
 * lege foto gaat altijd mee zodat de digitale weergave als zodanig herkenbaar
 * blijft.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Our solutions',
      h1: 'From an empty room to a furnished home, in seconds',
      subhead:
        'Your photographer delivers empty rooms and the buyer scrolls straight past them. We put furniture in that fits the room, and we check every image ourselves before you see it.',
      answerH2: 'What is virtual staging?',
      answer:
        'Virtual staging means furnishing an empty room digitally in the photo, so a candidate can see how they would live there. Nivora does it per property. We first look at what kind of home it is and who usually comes to view it, then have several versions made, and go through them ourselves: is everything standing on the floor, does the sofa match the room, does the style suit the house. You only get the version that survives that, so you never have to sit and choose.',
      answerDetail: [
        'The architecture is left alone. Walls, windows, radiators, floor and camera position stay exactly as your photographer shot them. Only the furniture is added, so you still recognise your own property.',
        'Where the ordinary tools fall down is scale. A sofa reaching the ceiling, a rug hovering half a metre above the floor, a dining table for eight in a room four metres square. One image like that and the viewer stops trusting the whole listing.',
      ],
      manifesto:
        'An empty room sells nothing. A room with a sofa that is too big sells less than nothing.',
      problemH2: 'Why an empty room costs you viewings',
      problem: [
        'A viewer cannot judge an empty space. They do not know whether their own sofa fits, and when in doubt they click on to the next property.',
        'Physically staging with hired furniture costs a day of work, a van and a sum you never recover on an ordinary terraced house. So it only happens on the expensive listings.',
        'The tools that exist deliver something within seconds, but you have to sit and work out which of the five images is usable. At an agency with thirty properties a month, nobody does that.',
      ],
      pillarsH2: 'How we go about it',
      pillars: [
        {
          title: 'Read the property first',
          body: 'A townhouse in Ghent, a coastal apartment and a villa on the edge of town do not get the same furniture. A five thousand euro designer sofa in a sixty square metre starter flat does not add up, and the viewer feels it straight away. We fix per property what kind of home it is and who comes to see it, and that drives the furnishing.',
        },
        {
          title: 'Several versions, then the choice',
          body: 'We produce several per room. Each version then goes through a check on scale, on whether everything sits on the floor, on whether the shadows match the daylight from the window, and on whether the style suits the property. What fails, you never see.',
        },
        {
          title: 'The photo stays yours',
          body: 'You get an ordinary image file back, ready for the portal, your own site and the brochure. No licence per user and no second system for your properties to live in.',
        },
      ],
      beforeAfterH2: 'Before and after, on the same property',
      beforeAfterIntro:
        'Drag across the image and watch the furniture appear against the very same wall, window and floor. A small townhouse and a large reception room, because that is where the ordinary tools come apart fastest.',
      beforeAfter: [
        {
          before: '/landing/auto-staging-rijhuis-leeg.webp',
          beforeAlt: 'An empty living room in a Flemish townhouse with a wooden floor and tall windows onto the street',
          after: '/landing/auto-staging-rijhuis-vol.webp',
          afterAlt: 'The same living room, furnished with a linen sofa, a low oak table, a jute rug and one bright abstract painting above the sofa',
          caption: 'A townhouse in the city is viewed by young families, so it gets a three-seat sofa, a low table and a rug that actually fits under the seating. Note the radiator and the window: they are still exactly where the photographer found them.',
        },
        {
          before: '/landing/auto-staging-villa-leeg.webp',
          beforeAlt: 'An empty reception room in a villa with herringbone parquet and three tall windows onto the garden',
          after: '/landing/auto-staging-villa-vol.webp',
          afterAlt: 'The same room, furnished with a sofa, an ottoman, two armchairs, a wool rug and one framed landscape on the right hand wall',
          caption: 'A room this size works against you when it is empty, because there is nothing to measure it by. Two armchairs opposite the sofa and a rug carrying the whole seating group give the viewer that measure.',
        },
      ],
      signals: [
        'Your photographer delivers empty rooms and you post them as they are',
        'You have tried virtual staging and the sofa was wrong',
        'Only your most expensive properties get physically staged',
        'You handle dozens of properties a month and have no time to vet images',
      ],
      automationsH2: 'Andere oplossingen',
      automationsIntro:
        'De rest van wat wij bouwen. Elk daarvan is apart aan te vragen.',
      automations: [],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say virtual staging is new. BoxBrownie, Styldod, ApplyDesign, REimagineHome and Virtual Staging AI have sold this for years, and some of them are cheaper per image than we are.',
        'We are not going to say nothing ever goes wrong. Versions fail our check too, and on a difficult room with a sloped ceiling or a mirror it takes longer before a good one comes out.',
        'And we are not going to say a furnished photo sells a property. It gets the click and the viewing. What happens after that is your work, not an image\'s.',
      ],
      faqs: [
        {
          q: 'Can a furnished photo simply go into a listing?',
          a: 'Not simply. In Belgium it has to be clear that this is a digital rendering, and the property must not appear different from what it is. So we always deliver the empty photo alongside and put the notice on the image by default. What you do with it remains your responsibility as an agent.',
        },
        {
          q: 'Does anything about the property itself change?',
          a: 'No, and that is a hard line. We do not remove cracks, damp patches, old wallpaper or a worn floor. Only furniture is added. Making a property look better than it is, is exactly how you collect a complaint.',
        },
        {
          q: 'How long does a property take?',
          a: 'For an ordinary home with a handful of rooms, half a day, because the versions have to be produced and judged. Anyone who needs images within the hour is better served by one of the existing services, and we will say so.',
        },
        {
          q: 'Does this work on a poor photo?',
          a: 'Only up to a point. A crooked shot, a dark room or a wide angle that bows the walls makes the furnishing crooked too. On properties like that we advise against it or ask for a better shot first. A good photo is still the basis.',
        },
      ],
      featuresTitle: 'What is virtual staging?',
      featuresSubtitle:
        'Your photographer delivers empty rooms and the buyer scrolls straight past them. We put furniture in that fits the room, and we check every image ourselves before you see it.',
      ctaTitle: 'Send us three empty rooms',
      ctaBody:
        'Three photos of a property that is online now, exactly as your photographer delivered them. You get them back furnished with the empty version beside them, so you can judge the proportions yourself before anything is agreed.',
      seoTitle: 'Virtual staging for estate agents, empty properties furnished digitally · Nivora',
      seoDescription:
        'Furnishing empty property photos digitally, per property: first read what kind of home it is, then several versions, then a check on scale and proportion. You only get what passes. For Flemish estate agencies. By Nivora, Brugge.',
    },
    nl:
    {
      eyebrow: 'Onze oplossingen',
      h1: 'Van lege kamer naar ingericht huis, in enkele seconden',
      subhead:
        'Uw fotograaf levert lege kamers en de zoeker op Immoweb scrollt eroverheen. Wij zetten er meubels in die kloppen met de kamer, en wij kijken elk beeld zelf na voor u het ziet.',
      answerH2: 'Wat is virtual staging?',
      answer:
        'Virtual staging is een lege kamer op de foto digitaal inrichten, zodat een kandidaat ziet hoe hij er zou wonen. Nivora doet dat per pand. Wij kijken eerst wat voor woning het is en wie er meestal komt kijken, laten dan meerdere versies maken, en gaan die daarna zelf na: staat alles op de vloer, klopt de zetel met de kamer, past de stijl bij het huis. U krijgt alleen de versie die daardoor geraakt, dus u moet zelf niet gaan zitten kiezen.',
      answerDetail: [
        'De architectuur blijft ongemoeid. Muren, ramen, radiatoren, vloer en camerastandpunt blijven exact zoals uw fotograaf ze trok. Alleen de inrichting komt erbij, dus u herkent uw eigen pand nog.',
        'Waar het bij de gewone gereedschappen misgaat is de schaal. Een zetel die tot tegen het plafond komt, een tapijt dat een halve meter boven de vloer zweeft, een eettafel voor acht in een kamer van vier op vier. Eén zo een beeld en de bezoeker vertrouwt de hele zoekertje niet meer.',
      ],
      manifesto:
        'Een lege kamer verkoopt niets. Een kamer met een zetel die te groot is, verkoopt minder dan niets.',
      problemH2: 'Waarom een lege kamer u bezoeken kost',
      problem: [
        'Een bezoeker kan een lege ruimte niet inschatten. Hij weet niet of zijn eigen zetel erin past, en bij twijfel klikt hij door naar het volgende pand.',
        'Echt inrichten met geleende meubels kost een dag werk, een bestelwagen en een bedrag dat u bij een gewoon rijhuis nooit terugverdient. Dus gebeurt het alleen bij de dure panden.',
        'De gereedschappen die er zijn, leveren in enkele seconden iets op, maar u moet zelf gaan zitten kijken welke van de vijf beelden bruikbaar is. Bij een kantoor met dertig panden per maand doet niemand dat.',
      ],
      pillarsH2: 'Hoe wij het aanpakken',
      pillars: [
        {
          title: 'Eerst het pand lezen',
          body: 'Een rijhuis in Gent, een appartement aan de kust en een villa in de rand krijgen niet dezelfde meubels. Een designzetel van vijfduizend euro in een starterswoning van zestig vierkante meter klopt niet, en de kandidaat voelt dat meteen. Wij zetten per pand vast wat voor woning het is en wie er komt kijken, en dat stuurt de inrichting.',
        },
        {
          title: 'Meerdere versies, en dan de keuze',
          body: 'Per kamer maken wij er verschillende. Daarna gaat elke versie door een controle op schaal, op of alles op de vloer staat, op of de schaduwen kloppen met het licht uit het raam, en op of de stijl bij het pand past. Wat zakt, ziet u niet.',
        },
        {
          title: 'De foto blijft van u',
          body: 'U krijgt een gewoon beeldbestand terug, klaar voor Immoweb, uw eigen site en de brochure. Geen abonnement per gebruiker en geen tweede systeem waarin uw panden gaan wonen.',
        },
      ],
      beforeAfterH2: 'Voor en na, op hetzelfde pand',
      beforeAfterIntro:
        'Sleep over het beeld en zie de meubels verschijnen tegen exact dezelfde muur, hetzelfde raam en dezelfde vloer. Een klein rijhuis en een grote ontvangstruimte, want daar loopt het bij de gewone gereedschappen het snelst mis.',
      beforeAfter: [
        {
          before: '/landing/auto-staging-rijhuis-leeg.webp',
          beforeAlt: 'Een lege leefruimte in een Vlaams rijhuis met houten vloer en hoge ramen op de straat',
          after: '/landing/auto-staging-rijhuis-vol.webp',
          afterAlt: 'Dezelfde leefruimte, ingericht met een linnen zetel, een lage eiken tafel, een juten tapijt en één kleurrijk schilderij boven de zetel',
          caption: 'Een rijhuis in de stad wordt bezocht door jonge gezinnen, dus staat er een zetel voor drie, een lage tafel en een tapijt dat onder de zithoek past. Let op de radiator en het raam: die staan er nog exact zoals de fotograaf ze trok.',
        },
        {
          before: '/landing/auto-staging-villa-leeg.webp',
          beforeAlt: 'Een lege ontvangstruimte in een villa met visgraatparket en drie hoge ramen op de tuin',
          after: '/landing/auto-staging-villa-vol.webp',
          afterAlt: 'Dezelfde ruimte, ingericht met een zetel, een poef, twee fauteuils, een wollen tapijt en één ingelijst landschap aan de rechtermuur',
          caption: 'Een ruimte van deze afmeting valt leeg juist tegen, want er is niets om ze aan af te meten. Twee fauteuils tegenover de zetel en een tapijt dat de hele zithoek draagt, geven de bezoeker die maat wel.',
        },
      ],
      signals: [
        'Uw fotograaf levert lege kamers en u zet ze zo online',
        'U hebt virtual staging al eens geprobeerd en de zetel klopte niet',
        'Alleen uw duurste panden worden echt ingericht',
        'U hebt tientallen panden per maand en geen tijd om beelden na te kijken',
      ],
      automationsH2: 'Andere oplossingen',
      automationsIntro:
        'De rest van wat wij bouwen. Elk daarvan is apart aan te vragen.',
      automations: [],
      outcomesH2: 'Wat wij hierover niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat virtual staging nieuw is. BoxBrownie, Styldod, ApplyDesign, REimagineHome en Virtual Staging AI verkopen dit al jaren, en sommige daarvan zijn goedkoper per beeld dan wij.',
        'Wij gaan niet zeggen dat er nooit iets misgaat. Er zakken bij ons ook versies door de controle, en bij een moeilijke kamer met een schuin dak of een spiegel duurt het langer voor er een goede uitkomt.',
        'En wij gaan niet zeggen dat een ingerichte foto een pand verkoopt. Ze zorgt dat er geklikt en bezocht wordt. Wat daarna gebeurt is uw werk, niet dat van een beeld.',
      ],
      faqs: [
        {
          q: 'Mag een ingerichte foto zomaar in een zoekertje?',
          a: 'Niet zomaar. In België moet duidelijk zijn dat het om een digitale weergave gaat, en de woning mag er niet anders door lijken dan ze is. Wij leveren daarom altijd de lege foto mee en zetten de vermelding standaard bij het beeld. Wat u ermee doet blijft uw verantwoordelijkheid als makelaar.',
        },
        {
          q: 'Verandert er iets aan het pand zelf?',
          a: 'Nee, en dat is een harde grens. Wij halen geen scheuren weg, geen vochtvlekken, geen oud behang en geen versleten vloer. Alleen meubels komen erbij. Een pand mooier maken dan het is, is precies waar u een klacht mee oploopt.',
        },
        {
          q: 'Hoe lang duurt het per pand?',
          a: 'Voor een gewone woning met een handvol kamers is dat een halve dag, want de versies moeten gemaakt en beoordeeld worden. Wie beelden binnen het uur nodig heeft, is bij een van de bestaande diensten beter af, en dat zeggen wij dan ook.',
        },
        {
          q: 'Werkt dit ook op een slechte foto?',
          a: 'Beperkt. Een scheve foto, een donkere kamer of een groothoek die de muren doet bollen, maakt de inrichting mee scheef. Op zulke panden raden wij het af of vragen wij eerst een betere opname. Een goede foto is nog altijd de basis.',
        },
      ],
      featuresTitle: 'Wat is virtual staging?',
      featuresSubtitle:
        'Uw fotograaf levert lege kamers en de zoeker op Immoweb scrollt eroverheen. Wij zetten er meubels in die kloppen met de kamer, en wij kijken elk beeld zelf na voor u het ziet.',
      ctaTitle: 'Stuur ons drie lege kamers',
      ctaBody:
        'Drie foto\'s van een pand dat nu online staat, zoals uw fotograaf ze aanleverde. U krijgt ze ingericht terug met de lege versie ernaast, zodat u zelf op de verhoudingen kunt kijken voor er iets afgesproken is.',
      seoTitle: 'Virtual staging voor immokantoren, van lege kamer naar ingericht huis · Nivora',
      seoDescription:
        'Lege woningfoto\'s digitaal inrichten per pand: eerst kijken wat voor woning het is, dan meerdere versies, dan een controle op schaal en verhouding. U krijgt alleen wat door die controle geraakt. Voor Vlaamse immokantoren. Door Nivora, Brugge.',
    },
  },
  { hero: '/landing/auto-staging-rijhuis-vol.webp', manifesto: '/landing/auto-staging-appartement-leeg.webp' },
)
