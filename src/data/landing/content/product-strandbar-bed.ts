import { solutionPage } from '../solutionPage'

/**
 * /who-gets-the-bed · /nl/wie-krijgt-het-bed
 *
 * Oplossing twee voor de strandbars: de laag die bij elke nieuwe reservatie
 * bepaalt of ze meteen bevestigd wordt, in wacht gaat, of langs de uitbater moet.
 *
 * Dit is de gevoeligste van de vijf en de pagina is daarnaar geschreven. Drie
 * dingen liggen vast en staan expliciet in de tekst:
 *
 *  1. Geen score op een mens. Een cijfer van 1 tot 100 op een gast is precies
 *     wat hier niet gebouwd wordt: de uitbater zou het niet vertrouwen en hij
 *     zou gelijk hebben. Wat er staat is de geschiedenis plus het voorstel dat
 *     eruit volgt, met de reden erbij.
 *  2. Alles komt uit de eigen reservaties van de zaak. Geen aangekochte data,
 *     niets van sociale media.
 *  3. De GDPR-vraag wordt niet weggemoffeld maar krijgt de eerste FAQ. Een
 *     "niet meer bevestigen"-lijst is persoonsgegevens, de gast heeft recht op
 *     inzage, en vrije notities over personen zijn af te raden.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Our solutions',
      h1: 'Who gets the bed on the front row, and who waits',
      subhead:
        'On a full Saturday you decide in two seconds who still fits in. That decision is written down nowhere, so nobody else can take it, and on the busiest day of the year it goes through the one person who is already on the floor.',
      answerH2: 'Who decides who still fits in on Saturday?',
      answer:
        'You do, always. Nivora builds the layer that prepares your decision rather than taking it: on every new booking the system reads what that guest has already done with you, how often they came, how often they did not turn up, and whether you have flagged them. A regular gets confirmed straight away. An unfamiliar name on the busiest Saturday in August stays on hold until the day before, when you know what actually comes free. And anyone you would rather not see again never goes through automatically, only past you.',
      answerDetail: [
        'The rules are your rules, written out in plain language and changeable at any moment: from how many people it has to come past you, from which hour, what deposit, and what happens with a group. Nothing in there is a setting we chose for you.',
        'It is not a score per customer and it is not a profile. It is what is already sitting in your own bookings, read back at the moment it matters, with the reason shown next to the proposal so you can disagree with it in one click.',
      ],
      manifesto:
        'The regular of five years and the name you read for the first time this morning get the same answer today: hold on.',
      problemH2: 'Why this lives in one head',
      problem: [
        'You know your people. You know who comes every summer, who did not turn up twice, and who had words at the bar last year. None of that is written down, so you are the only one who can pick up the phone.',
        'On the busy days yes gets said too early. On Wednesday there is room to spare, so everything gets confirmed. On Friday it turns out Saturday filled up with tables of two while three groups of ten had to be turned away.',
        'And saying no costs the most. Turning away somebody who has been here twenty times does not happen on purpose. It happens because at that moment nobody knows they have been here twenty times.',
      ],
      pillarsH2: 'How this is put together',
      pillars: [
        {
          title: 'Your rules, in your words',
          body: 'We write them down with you the way you say them out loud: from eight people it comes past me, after seven in the evening in July nothing goes through by itself, a first booking on a Saturday in August waits. You read them back in a sentence, not in a settings screen, and you change them mid-season when it turns out you were wrong.',
        },
        {
          title: 'Waiting is not refusing',
          body: 'A booking on hold gets a real answer: we are keeping it for you and you will hear on Thursday. That is a different thing from silence, and it is what makes the difference between a guest who books elsewhere and a guest who waits. On the day you decide, they hear either way.',
        },
        {
          title: 'You can always overrule it',
          body: 'Every proposal carries the reason next to it: five previous visits, or two no-shows, or nothing known. One click turns it around, and what you turn around is remembered. If the same kind of proposal keeps getting overruled, that is not the system learning quietly, that is us sitting down with you to fix the rule.',
        },
      ],
      signals: [
        'Only you can decide who still fits in on Saturday',
        'You have turned away somebody who had been coming here for years',
        'Wednesday fills up with tables of two and no group fits in on Saturday',
        'Somebody who did not turn up can simply book again the week after',
      ],
      automationsH2: 'Other solutions for a beach bar',
      automationsIntro:
        'The rest of what we build for this trade. Each one is a separate thing you can ask for.',
      automations: [],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say we know your guests better than you do. Everything in this comes out of your own bookings: how often somebody came, how often they did not, with how many people, and what you noted yourself. We buy no data in and we take nothing off social media.',
        'We are not going to give a customer a score. A number from 1 to 100 on a human being is exactly what we are not building here, because you would not trust it and you would be right. What you see is the history and the proposal that follows from it.',
        'And we are not going to say nobody ever ends up on hold who should not have. That happens, especially in the first weeks. Which is why every proposal sits in your list with its reason attached and takes one click to reverse.',
      ],
      faqs: [
        {
          q: 'Is it allowed, keeping a list like that on people?',
          a: 'The data is your own booking data and you are the one responsible for it under the GDPR, with us as your processor. Three things follow from that and we say them before you start. A guest can ask what you hold on them and you have to be able to answer. Keep to facts, so bookings, no-shows and cancellations, and not free notes about a person you would not read aloud to their face. And it does not stay forever: we agree a retention period with you and it deletes itself. If you want a lawyer to look at that, we would say yes.',
        },
        {
          q: 'What does the guest see?',
          a: 'Confirmed, or on hold with the date on which they will know. Never the reason, and never anything about their history. A guest on hold sees the same message as any other guest on hold, and gets a real answer on the day you said they would.',
        },
        {
          q: 'We are just starting. There is no history.',
          a: 'Then it starts at zero and it does very little for the first months, and we say that up front rather than after the invoice. Everybody is an unfamiliar name in the first season, so almost everything falls back on your rules about groups, hours and deposits, which do work from day one. The recognition comes in the second season.',
        },
        {
          q: 'Does this work without your booking system?',
          a: 'It reads your bookings, so there has to be a list to read. If those bookings sit in a system with an export or an interface, we work from that. If they live in a chat window, this piece cannot run yet and the booking system comes first, which is the order we would advise anyway.',
        },
      ],
      featuresTitle: 'Who decides who still fits in on Saturday?',
      featuresSubtitle:
        'On a full Saturday you decide in two seconds who still fits in. That decision is written down nowhere, so nobody else can take it.',
      ctaTitle: 'Give us twenty names',
      ctaBody:
        'Twenty bookings from last summer exactly as they sit with you, plus what you know about those guests yourself. We show you what the system would have made of them and where it sits next to your own judgement. That difference is the whole point.',
      seoTitle: 'Who gets a spot on a full Saturday, for beach bars · Nivora',
      seoDescription:
        'A layer on top of your bookings that reads what a guest has done with you before, confirms regulars straight away, keeps unfamiliar names on hold until you know, and never lets anyone through automatically that you would rather see yourself. By Nivora, Brugge.',
    },
    nl:
    {
      eyebrow: 'Onze oplossingen',
      h1: 'Wie krijgt het bed op de eerste rij, en wie wacht',
      subhead:
        'Op een volle zaterdag beslist u in twee seconden wie er nog bij kan. Die beslissing staat nergens opgeschreven, dus niemand anders kan ze nemen, en op de drukste dag van het jaar loopt ze langs de enige die al op de vloer staat.',
      answerH2: 'Wie beslist wie er zaterdag nog bij kan?',
      answer:
        'U, altijd. Nivora bouwt de laag die uw beslissing klaarzet in plaats van ze te nemen: bij elke nieuwe reservatie leest het systeem wat die gast bij u al deed, hoeveel keer hij kwam, hoeveel keer hij niet kwam opdagen, en of u hem aangeduid hebt. Een vaste gast wordt meteen bevestigd. Een onbekende naam op de drukste zaterdag van augustus blijft in wacht tot de dag ervoor, wanneer u weet wat er echt vrijkomt. En wie u liever niet meer ziet, gaat nooit automatisch door, alleen langs u.',
      answerDetail: [
        'De regels zijn uw regels, in gewone taal opgeschreven en op elk moment aan te passen: vanaf hoeveel man het langs u moet, vanaf welk uur, welk voorschot, en wat er met een groep gebeurt. Er zit niets in dat wij voor u gekozen hebben.',
        'Het is geen score per klant en het is geen profiel. Het is wat er al in uw eigen reservaties staat, teruggelezen op het moment dat het ertoe doet, met de reden naast het voorstel zodat u er in één klik van kunt afwijken.',
      ],
      manifesto:
        'De vaste gast van vijf jaar en de naam die u vanochtend voor het eerst leest, krijgen vandaag hetzelfde antwoord: even geduld.',
      problemH2: 'Waarom dit in één hoofd zit',
      problem: [
        'U kent uw volk. U weet wie er elke zomer komt, wie er twee keer niet kwam opdagen, en wie er vorig jaar woorden had aan de bar. Dat staat nergens, dus u bent de enige die de telefoon kan opnemen.',
        'Op de drukke dagen wordt te vroeg ja gezegd. Woensdag is er plaats zat, dus wordt alles bevestigd. Vrijdag blijkt dat zaterdag volgelopen is met tafels van twee terwijl er drie groepen van tien hebben moeten afhaken.',
        'En nee zeggen kost het meest. Iemand afwijzen die hier al twintig keer geweest is, gebeurt niet met opzet. Het gebeurt omdat op dat moment niemand weet dat hij hier al twintig keer geweest is.',
      ],
      pillarsH2: 'Hoe dit in elkaar zit',
      pillars: [
        {
          title: 'Uw regels, in uw woorden',
          body: 'Wij schrijven ze met u op zoals u ze hardop zegt: vanaf acht man komt het langs mij, na zeven uur \'s avonds gaat er in juli niets vanzelf door, een eerste reservatie op een zaterdag in augustus wacht. U leest ze terug als een zin en niet als een instellingenscherm, en u past ze midden in het seizoen aan wanneer blijkt dat u het mis had.',
        },
        {
          title: 'Wachten is niet weigeren',
          body: 'Een reservatie in wacht krijgt een echt antwoord: wij houden ze voor u bij en u hoort het donderdag. Dat is iets anders dan stilte, en het is precies het verschil tussen een gast die elders boekt en een gast die wacht. Op de dag dat u beslist, hoort hij het, hoe het ook uitvalt.',
        },
        {
          title: 'U kunt het altijd overrulen',
          body: 'Bij elk voorstel staat de reden ernaast: vijf eerdere bezoeken, of twee keer niet komen opdagen, of niets bekend. Eén klik draait het om, en wat u omdraait wordt onthouden. Wordt hetzelfde soort voorstel telkens overruled, dan is dat geen systeem dat stilletjes bijleert, dan gaan wij met u zitten om de regel recht te zetten.',
        },
      ],
      signals: [
        'Alleen u kunt beslissen wie er zaterdag nog bij kan',
        'U hebt al eens iemand geweigerd die hier al jaren kwam',
        'Woensdag loopt vol met tafels van twee en zaterdag past er geen groep meer bij',
        'Wie niet komt opdagen, kan de week erop gewoon opnieuw boeken',
      ],
      automationsH2: 'Andere oplossingen voor een strandbar',
      automationsIntro:
        'De rest van wat wij voor dit vak bouwen. Elk daarvan is apart aan te vragen.',
      automations: [],
      outcomesH2: 'Wat wij hierover niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat wij uw gasten beter kennen dan u. Alles wat hierin zit komt uit uw eigen reservaties: hoeveel keer iemand kwam, hoeveel keer niet, met hoeveel man, en wat u er zelf bij noteerde. Wij kopen geen gegevens bij en wij halen niets van sociale media.',
        'Wij gaan een klant geen score geven. Een cijfer van 1 tot 100 op een mens is precies wat wij hier niet bouwen, want u zou het niet vertrouwen en u zou gelijk hebben. Wat u ziet is de geschiedenis en het voorstel dat daaruit volgt.',
        'En wij gaan niet zeggen dat er nooit iemand ten onrechte in wacht komt. Dat gebeurt, zeker de eerste weken. Daarom staat elk voorstel in uw lijst met de reden erbij en kost het één klik om het om te draaien.',
      ],
      faqs: [
        {
          q: 'Mag dat wel, zo een lijst bijhouden over mensen?',
          a: 'Het gaat om uw eigen reservatiegegevens en onder de GDPR bent u daar de verantwoordelijke voor, met ons als verwerker. Daar volgen drie dingen uit en die zeggen wij voor u begint. Een gast mag vragen wat u over hem bijhoudt en u moet daarop kunnen antwoorden. Blijf bij feiten, dus reservaties, no-shows en annulaties, en geen vrije notities over een persoon die u hem niet zou voorlezen. En het blijft niet eeuwig staan: wij spreken een bewaartermijn met u af en het wist zichzelf. Wilt u daar een jurist naar laten kijken, dan zeggen wij ja.',
        },
        {
          q: 'Wat ziet de gast?',
          a: 'Bevestigd, of in wacht met de datum waarop hij het weet. Nooit de reden, en nooit iets over zijn geschiedenis. Een gast in wacht krijgt hetzelfde bericht als elke andere gast in wacht, en hij krijgt een echt antwoord op de dag die u genoemd hebt.',
        },
        {
          q: 'Wij beginnen er net aan. Er is geen geschiedenis.',
          a: 'Dan begint het bij nul en doet het de eerste maanden weinig, en dat zeggen wij op voorhand in plaats van na de factuur. In het eerste seizoen is iedereen een onbekende naam, dus valt bijna alles terug op uw regels over groepen, uren en voorschotten, en die werken wel vanaf dag één. Het herkennen komt in het tweede seizoen.',
        },
        {
          q: 'Werkt dit zonder jullie reservatiesysteem?',
          a: 'Het leest uw reservaties, dus er moet een lijst zijn om te lezen. Staan die reservaties in een systeem met een export of een koppeling, dan werken wij daarmee. Leven ze in een gespreksvenster, dan kan dit stuk nog niet draaien en komt het reservatiesysteem eerst, en dat is sowieso de volgorde die wij zouden aanraden.',
        },
      ],
      featuresTitle: 'Wie beslist wie er zaterdag nog bij kan?',
      featuresSubtitle:
        'Op een volle zaterdag beslist u in twee seconden wie er nog bij kan. Die beslissing staat nergens opgeschreven, dus niemand anders kan ze nemen.',
      ctaTitle: 'Geef ons twintig namen',
      ctaBody:
        'Twintig reservaties van vorige zomer precies zoals ze bij u staan, met daarbij wat u zelf over die gasten weet. Wij tonen u wat het systeem ervan gemaakt zou hebben en waar het naast uw eigen oordeel zit. Dat verschil is precies waar dit over gaat.',
      seoTitle: 'Wie krijgt er een plaats op een volle zaterdag, voor strandbars · Nivora',
      seoDescription:
        'Een laag bovenop uw reservaties die leest wat een gast bij u al deed, vaste gasten meteen bevestigt, onbekende namen in wacht houdt tot u het weet, en nooit iemand automatisch doorlaat die u liever zelf ziet. Van Nivora uit Brugge.',
    },
  },
  { hero: '/landing/strandbar-opl-bed.webp', manifesto: '/landing/auto-oostende-kust.webp' },
)
