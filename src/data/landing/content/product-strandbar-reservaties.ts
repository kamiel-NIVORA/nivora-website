import { solutionPage } from '../solutionPage'

/**
 * /beach-bar-reservations · /nl/reservaties-voor-een-strandbar
 *
 * Oplossing één voor de strandbars, en in de praktijk bijna altijd de eerste die
 * gebouwd wordt: alles hierna (wie krijgt een plaats, het dagscherm, de uren)
 * leest uit deze lijst.
 *
 * De cijfers op deze pagina komen uit een echt seizoen bij een strandbar aan de
 * kust: drie- tot vierhonderd reservaties per week, met de hand beantwoord. Ze
 * staan er als ordegrootte van die zaak en nooit als belofte aan een andere.
 *
 * Twee harde grenzen, allebei expliciet op de pagina:
 *  1. WhatsApp gaat niet dicht. Wie een bericht wil sturen, stuurt een bericht.
 *     Een oplossing die vraagt dat uw gasten zich anders gedragen, is geen
 *     oplossing.
 *  2. Geen percentage op no-shows. Herinneringen helpen aantoonbaar, maar
 *     hoeveel dat bij deze zaak scheelt weten wij pas nadat wij het bij deze
 *     zaak gemeten hebben.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Our solutions',
      h1: 'Three hundred messages a week, and you read every one',
      subhead:
        'Bookings arrive by WhatsApp, by Instagram, on the landline and through the form on your site. Somebody types out every answer again, in the middle of a service, and the only person who knows what Saturday looks like is that somebody.',
      answerH2: 'How does a beach bar get its bookings out of WhatsApp?',
      answer:
        'Nivora builds a booking system your guest uses directly, through your own site or an app on their phone, with a waiting list when you are full and a reminder twenty four hours and two hours before they arrive. What comes in today as three to four hundred loose messages a week stands there instead as one list per day: confirmed, waiting, cancelled. The guest can see their own status without having to message you again, and you read a list rather than a chat window.',
      answerDetail: [
        'A regular sets up an account once and books in twenty seconds the time after. Somebody who has never been fills in the same four things they would have typed into a message anyway: which day, how many people, what time, and anything you need to know beforehand.',
        'WhatsApp does not close. Whoever would rather send a message still sends a message, and it lands in the same list instead of in a separate window. The difference is that the reply is already prepared, with your own hours and your own house rules in it, and someone on your team presses send.',
      ],
      manifesto:
        'One booking is thirty seconds of work. Three hundred bookings are half a working week, every week.',
      problemH2: 'Where those hours actually go',
      problem: [
        'Every message is small. Somebody asks whether there is still room for four on Saturday at seven. You check in your head or on a sheet, you type back, they answer half an hour later, you type again. Three minutes, and then the next one.',
        'None of it sits together. Saturday\'s bookings are spread over a chat window, a notebook, two Instagram conversations and an email. Anyone who wants to know on Saturday morning how many people are coming has to gather it all up again.',
        'And what gets cancelled does not always get cancelled. A table that stays empty at eight is a table you will not sell again that evening, and you find out at eight.',
      ],
      pillarsH2: 'How this is put together',
      pillars: [
        {
          title: 'The guest books it themselves',
          body: 'Through your site or the app, choosing from what you actually offer: a bed on the front row, a table inside, a table on the terrace. What they see is what you genuinely have free at that hour, not a general calendar that says yes to everything and leaves you to sort it out.',
        },
        {
          title: 'Full is not the same as no',
          body: 'When you are full they go on a waiting list instead of hearing a flat no. If somebody drops out, the first name moves up and gets a message. Today, full usually just means a guest you never hear from again, and on a coast where half your trade is passing through, that is the expensive kind of no.',
        },
        {
          title: 'Two reminders, and no nagging',
          body: 'One twenty four hours before, one two hours before, both with a link to cancel in a single tap. Cancelling has to be easier than not turning up, or people simply do not turn up. Nothing else goes out: your guests are on holiday and you are not a mailing list.',
        },
      ],
      signals: [
        'Your bookings live in a chat window on your own phone',
        'On Saturday morning somebody pieces together who is coming',
        'When you are full you say no, and you never hear from that guest again',
        'A table stays empty without anyone having cancelled it',
      ],
      automationsH2: 'Other solutions for a beach bar',
      automationsIntro:
        'The rest of what we build for this trade. Each one is a separate thing you can ask for.',
      automations: [],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say booking software does not exist. Formitable, Zenchef, Resengo, TheFork and SevenRooms all sell it, and if you have a normal table plan and you are happy with it, we will say so at the first meeting. This is built for the business where beds, tables, groups and a waiting list run through each other and where all of it goes by message today.',
        'We are not going to put a percentage on no-shows. A reminder demonstrably helps, but how much it helps at your place is something we only know once we have measured it at your place. You get the count of what came in, what was confirmed and who did not turn up, from the first week, and you can judge it yourself after a month.',
        'And we are not going to say the phone stops ringing. A group of twenty with a birthday in it will call, and should call. What changes is that the eighty small ones no longer need you.',
      ],
      faqs: [
        {
          q: 'Do our guests have to install an app?',
          a: 'No. Booking runs through a link on your site or in your Instagram bio, in the browser, with nothing to install and no account needed. The app exists for the guest who comes back often and would rather not fill in the same details every time, and for the guest who wants to see their own status without messaging you. Most people never install it and that is fine.',
        },
        {
          q: 'What about the people who keep messaging anyway?',
          a: 'They keep messaging, and that is the point. What we do is put those messages into the same list as everything else, with a reply prepared underneath that already carries your hours, your deposit and your cancellation rule. Someone on your team reads it, adjusts a line if they want to, and sends. Nothing goes out to a guest that nobody at your place has read.',
        },
        {
          q: 'We already have bookings in for this season. Do those have to be retyped?',
          a: 'No. Whatever sits in a list, a spreadsheet or an export from another system we bring over before you go live. What lives only in a chat window we go through with you once, and we say up front that this is the one piece of manual work in the whole thing. It is an afternoon, once.',
        },
        {
          q: 'Who owns the guest data?',
          a: 'You do. It sits in your system, you can export it whole at any moment, and it does not go to us or to a third party for anything other than running your bookings. We do not sell it on, we do not enrich it with data bought elsewhere, and if you stop, you take it with you.',
        },
      ],
      featuresTitle: 'How does a beach bar get its bookings out of WhatsApp?',
      featuresSubtitle:
        'Bookings arrive by WhatsApp, by Instagram, on the landline and through the form on your site. Somebody types out every answer again, in the middle of a service.',
      ctaTitle: 'Send us one weekend of messages',
      ctaBody:
        'One Saturday and one Sunday exactly as they came in: the messages, the calls, the form. We count how many there really were, how many were the same person twice, and how many could have been answered without you. You get that back before anything is agreed or signed.',
      seoTitle: 'Bookings for a beach bar, off WhatsApp and into one list · Nivora',
      seoDescription:
        'A booking system for beach bars: your guest books through your own site or app, a waiting list when you are full, and reminders twenty four hours and two hours out. Three hundred messages a week become one list per day. By Nivora, Brugge.',
    },
    nl:
    {
      eyebrow: 'Onze oplossingen',
      h1: 'Driehonderd berichten per week, en u leest ze allemaal',
      subhead:
        'Reservaties komen binnen via WhatsApp, via Instagram, op de vaste telefoon en via het formulier op uw site. Iemand tikt elk antwoord opnieuw, middenin een dienst, en de enige die weet hoe zaterdag eruitziet is die iemand.',
      answerH2: 'Hoe krijgt een strandbar zijn reservaties weg uit WhatsApp?',
      answer:
        'Nivora bouwt een reservatiesysteem waar uw gast zelf boekt, via uw eigen site of via een app op zijn telefoon, met een wachtlijst wanneer het vol zit en een herinnering vierentwintig uur en twee uur voor hij komt. Wat vandaag als drie- tot vierhonderd losse berichten per week binnenkomt, staat er dan als één lijst per dag: bevestigd, in wacht, geannuleerd. De gast ziet zijn eigen status zonder u nog eens aan te moeten schrijven, en u leest een lijst in plaats van een gespreksvenster.',
      answerDetail: [
        'Een vaste gast maakt één keer een account aan en boekt de keer daarna in twintig seconden. Wie hier nog nooit geweest is, vult dezelfde vier dingen in die hij anders in een bericht zou tikken: welke dag, met hoeveel, welk uur, en wat u op voorhand moet weten.',
        'WhatsApp gaat niet dicht. Wie liever een bericht stuurt, stuurt een bericht, en dat komt in dezelfde lijst terecht in plaats van in een apart venster. Het verschil is dat het antwoord al klaarstaat, met uw eigen uren en uw eigen afspraken erin, en dat iemand van uw ploeg op verzenden drukt.',
      ],
      manifesto:
        'Eén reservatie is dertig seconden werk. Driehonderd reservaties zijn een halve werkweek, elke week opnieuw.',
      problemH2: 'Waar die uren precies in kruipen',
      problem: [
        'Elk bericht is klein. Iemand vraagt of er zaterdag om zeven uur nog plaats is voor vier man. U kijkt in uw hoofd of op een blad, u tikt terug, hij antwoordt een half uur later, u tikt opnieuw. Drie minuten, en dan het volgende.',
        'Het staat nergens samen. De reservaties van zaterdag zitten verspreid over een gespreksvenster, een schriftje, twee Instagram-gesprekken en een mail. Wie op zaterdagochtend wil weten hoeveel volk er komt, moet dat allemaal opnieuw bij elkaar zoeken.',
        'En wat afgezegd wordt, wordt niet altijd afgezegd. Een tafel die om acht uur leeg blijft, is een tafel die u die avond niet meer verkoopt, en dat weet u om acht uur.',
      ],
      pillarsH2: 'Hoe dit in elkaar zit',
      pillars: [
        {
          title: 'De gast boekt zelf',
          body: 'Via uw site of via de app, en hij kiest uit wat u echt aanbiedt: een bed op de eerste rij, een tafel binnen, een tafel op het terras. Wat hij te zien krijgt, is wat u op dat uur werkelijk vrij hebt, en geen algemene kalender die overal ja op zegt en het aan u overlaat om het recht te trekken.',
        },
        {
          title: 'Vol is niet hetzelfde als nee',
          body: 'Zit het vol, dan komt hij op een wachtlijst in plaats van een kale nee te horen. Valt er iemand weg, dan schuift de eerste naam door en krijgt hij een bericht. Vandaag betekent vol meestal gewoon een gast die u niet meer terugziet, en aan een kust waar de helft van uw volk passanten zijn, is dat de dure soort nee.',
        },
        {
          title: 'Twee herinneringen, en verder geen gezeur',
          body: 'Eén vierentwintig uur op voorhand, één twee uur op voorhand, allebei met een link om in één tik af te zeggen. Annuleren moet makkelijker zijn dan niet komen opdagen, anders komen mensen gewoon niet opdagen. Er gaat verder niets uit: uw gasten zijn met vakantie en u bent geen mailinglijst.',
        },
      ],
      signals: [
        'Uw reservaties staan in een gespreksvenster op uw eigen telefoon',
        'Op zaterdagochtend zoekt iemand bij elkaar wie er komt',
        'Als het vol zit, zegt u nee en hoort u die gast niet meer terug',
        'Een tafel blijft leeg zonder dat er iemand afgezegd heeft',
      ],
      automationsH2: 'Andere oplossingen voor een strandbar',
      automationsIntro:
        'De rest van wat wij voor dit vak bouwen. Elk daarvan is apart aan te vragen.',
      automations: [],
      outcomesH2: 'Wat wij hierover niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat reservatiesoftware niet bestaat. Formitable, Zenchef, Resengo, TheFork en SevenRooms verkopen dat allemaal, en hebt u een gewone tafelplattegrond waar u tevreden mee bent, dan zeggen wij dat op het eerste gesprek. Dit is gebouwd voor de zaak waar bedden, tafels, groepen en een wachtlijst door elkaar lopen en waar dat vandaag allemaal per bericht gaat.',
        'Wij gaan geen percentage op no-shows plakken. Een herinnering helpt aantoonbaar, maar hoeveel ze bij u helpt weten wij pas nadat wij het bij u gemeten hebben. Wat u vanaf de eerste week wel krijgt, is de telling: wat er binnenkwam, wat er bevestigd werd en wie er niet kwam opdagen. Na een maand oordeelt u zelf.',
        'En wij gaan niet zeggen dat de telefoon stopt met rinkelen. Een groep van twintig met een verjaardag erbij belt, en die moet ook bellen. Wat verandert is dat de tachtig kleine dat niet meer hoeven.',
      ],
      faqs: [
        {
          q: 'Moeten onze gasten een app installeren?',
          a: 'Nee. Boeken gaat via een link op uw site of in uw Instagram-bio, gewoon in de browser, zonder installatie en zonder account. De app bestaat voor de gast die vaak terugkomt en niet elke keer opnieuw dezelfde gegevens wil invullen, en voor wie zijn eigen status wil zien zonder u aan te schrijven. De meeste mensen installeren ze nooit, en dat is prima.',
        },
        {
          q: 'En de mensen die toch blijven appen?',
          a: 'Die blijven appen, en dat is net de bedoeling. Wat wij doen is die berichten in dezelfde lijst zetten als de rest, met eronder een antwoord dat al klaarstaat met uw uren, uw voorschot en uw annulatieregel erin. Iemand van uw ploeg leest het, past desnoods een regel aan, en verzendt. Er vertrekt niets naar een gast dat niemand bij u gelezen heeft.',
        },
        {
          q: 'Wij hebben al reservaties staan voor dit seizoen. Moeten die overgetikt worden?',
          a: 'Nee. Wat in een lijst, een Excel of een export uit een ander systeem staat, halen wij over voor u live gaat. Wat alleen in een gespreksvenster leeft, lopen wij één keer samen met u door, en wij zeggen op voorhand dat dat het enige handwerk in het hele traject is. Het is één namiddag, één keer.',
        },
        {
          q: 'Van wie zijn die gastgegevens?',
          a: 'Van u. Ze staan in uw systeem, u kunt ze op elk moment volledig exporteren, en ze gaan niet naar ons of naar een derde partij voor iets anders dan het draaien van uw reservaties. Wij verkopen ze niet door, wij vullen ze niet aan met gegevens die elders gekocht zijn, en stopt u ermee, dan neemt u ze mee.',
        },
      ],
      featuresTitle: 'Hoe krijgt een strandbar zijn reservaties weg uit WhatsApp?',
      featuresSubtitle:
        'Reservaties komen binnen via WhatsApp, via Instagram, op de vaste telefoon en via het formulier op uw site. Iemand tikt elk antwoord opnieuw, middenin een dienst.',
      ctaTitle: 'Stuur ons één weekend aan berichten',
      ctaBody:
        'Eén zaterdag en één zondag precies zoals ze binnenkwamen: de berichten, de telefoons, het formulier. Wij tellen hoeveel er echt waren, hoeveel er twee keer dezelfde persoon zijn, en hoeveel er zonder u beantwoord hadden kunnen worden. Dat krijgt u terug voor er iets afgesproken of getekend is.',
      seoTitle: 'Reservaties voor een strandbar, weg uit WhatsApp · Nivora',
      seoDescription:
        'Een reservatiesysteem voor strandbars: uw gast boekt via uw eigen site of app, een wachtlijst wanneer het vol zit, en herinneringen vierentwintig uur en twee uur op voorhand. Driehonderd berichten per week worden één lijst per dag. Van Nivora uit Brugge.',
    },
  },
  { hero: '/landing/strandbar-opl-reservaties.webp', manifesto: '/landing/auto-sec-strandbar-a.webp' },
)
