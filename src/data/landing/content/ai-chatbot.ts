import { solutionPage } from '../solutionPage'

/** /build-an-ai-chatbot · /nl/ai-chatbot-laten-bouwen */
export default solutionPage({
  en: {
    eyebrow: 'AI chatbots',
    h1: 'An AI chatbot that knows your company, not just the internet',
    subhead:
      'A chatbot is only as good as what it can look up. The difference between useful and embarrassing is whether it reads your actual documents, prices and history.',
    answerH2: 'What makes a company chatbot actually work?',
    answer:
      'A company chatbot works when it answers from your own material, your products, prices, policies and past cases, rather than from general knowledge, and when it says it does not know instead of inventing an answer. Nivora builds chatbots on top of a company\'s existing documents and systems, with the option to run entirely on the company\'s own servers so customer conversations never leave the building.',
    answerDetail: [
      'A general model with your logo on it will confidently make up a delivery time, a warranty term or a price. That is not a bug that gets patched; it is what a model does when it has no source to check against.',
      'The engineering that matters is retrieval and refusal: finding the right passage in your material before answering, and declining cleanly when there is nothing to find. Most of the build sits there rather than in the conversation itself.',
    ],
    manifesto:
      'Every hour your team spends answering the same question is an hour that could go to the customer who has a different one. Handle the repeat, escalate the rest.',
    problemH2: 'Why most chatbots disappoint',
    problem: [
      'The first version is always impressive. It answers fluently, it is available at midnight, and everyone is pleased. The disappointment arrives three weeks later when someone notices it has been giving a wrong lead time since launch.',
      'Behind that is a design choice nobody made explicitly: the bot was allowed to answer everything. Once it can answer anything, it will answer things it should not, and the trust that took a month to build goes in one screenshot.',
      'The second failure mode is quieter. The bot handles the easy questions, so the ones reaching your team are now uniformly hard, and nobody accounted for that in how the team is staffed or measured.',
    ],
    pillarsH2: 'What we build into it',
    pillars: [
      {
        title: 'It answers from your material',
        body: 'Product documentation, price lists, policies, previous tickets. Answers cite what they came from, so a colleague can check whether the bot read the right page.',
      },
      {
        title: 'It knows when to stop',
        body: 'A clear boundary between what it may answer and what goes to a person, with the awkward categories, pricing exceptions, complaints, anything legal, routed to a human by default.',
      },
      {
        title: 'It runs where you want',
        body: 'On your infrastructure if conversations contain customer data you would rather not send anywhere. For many companies that is the difference between deploying it and shelving the idea.',
      },
    ],
    signals: [
      'The same five questions arrive every day in slightly different words',
      'Enquiries outside office hours wait until the next morning',
      'A colleague spends twenty minutes finding context before answering anything',
      'You tried a generic chatbot and turned it off again',
    ],
    outcomesH2: 'What changes once it runs',
    outcomes: [
      'The visible change is response time, especially in the evenings and at weekends when a good answer within minutes is the difference between an enquiry and a lost one.',
      'The change your team notices is different. The volume drops, but the mix shifts: the questions that reach a person are the ones that genuinely need judgement, which is more demanding work and considerably more satisfying than answering the same delivery question forty times.',
      'The change nobody predicts is the reporting. A bot that logs what people asked and where it had to give up is the clearest map of your customers\' confusion you will ever get, and it usually points at two or three things worth fixing in the product or the documentation.',
    ],
    examplesH2: 'What this looks like in practice',
    examplesIntro:
      'Illustrative situations rather than client cases, chosen because they are the ones companies describe most often.',
    examples: [
      {
        title: 'The same five questions',
        before:
          'Delivery times, opening hours, return policy and stock arrive all day in slightly different words, and each one interrupts someone.',
        after:
          'They are answered from your own documentation within seconds, at any hour, with a source a colleague can check.',
      },
      {
        title: 'A question about a specific order',
        before:
          'The bot cannot see the order, so it either guesses or tells the customer to email, which is where they started.',
        after:
          'It looks up the order, gives the real status, and hands anything involving a complaint or an exception straight to a person.',
      },
    ],
    faqs: [
      {
        q: 'How is this different from putting ChatGPT on our website?',
        a: 'A general model has no access to your prices, stock, policies or history, so it answers from general knowledge and fills gaps with plausible invention. The build here is mostly about connecting it to your material and constraining it to that, which is exactly the part a generic tool leaves out.',
      },
      {
        q: 'What happens when it does not know the answer?',
        a: 'It says so and hands over, and that behaviour is designed in rather than hoped for. A bot that admits ignorance keeps its credibility on everything else; one that guesses loses trust on every answer at once, including the correct ones.',
      },
      {
        q: 'Can it work in several languages?',
        a: 'Yes, and it is one of the stronger reasons to build one in Belgium. Answering in Dutch, French and English at the same quality removes the delay where a message waits for the colleague who speaks that language to be available.',
      },
      {
        q: 'Where do the conversations end up?',
        a: 'Wherever you decide. With Local AI the model runs on your own servers and no conversation leaves your infrastructure, which matters when customers paste order details, addresses or complaints into a chat window. That option exists precisely because for many companies it is the deciding question.',
      },
    ],
    featuresTitle: 'A bot on our software, or one built around yours',
    featuresSubtitle:
      'Some companies want conversation handled inside a tool we already made. Others need it wired into an ERP, a stock system and a price list. Both are the same conversation to start.',
    ctaTitle: 'Bring the five questions you answer every day',
    ctaBody:
      'The best starting point is the handful of questions your team is tired of. You get a straight answer on whether a chatbot would handle them well, and what it would take to make it reliable.',
    seoTitle: 'Build an AI chatbot for your company · Nivora',
    seoDescription:
      'AI chatbots that answer from your own documents, prices and history, and hand over when they should. Optionally on your own servers. Built by Nivora, a software and AI studio in Brugge.',
  },
  nl: {
    eyebrow: 'AI-chatbots',
    h1: 'Een AI-chatbot die uw bedrijf kent, niet alleen het internet',
    subhead:
      'Een chatbot is maar zo goed als wat hij kan opzoeken. Het verschil tussen nuttig en gênant is of hij uw échte documenten, prijzen en historiek leest.',
    answerH2: 'Wat maakt een bedrijfschatbot echt bruikbaar?',
    answer:
      'Een bedrijfschatbot werkt wanneer hij antwoordt vanuit uw eigen materiaal, uw producten, prijzen, voorwaarden en eerdere dossiers, in plaats van vanuit algemene kennis, én wanneer hij zegt dat hij het niet weet in plaats van iets te verzinnen. Nivora bouwt chatbots bovenop de bestaande documenten en systemen van een bedrijf, met de mogelijkheid om alles op de eigen servers te draaien zodat klantgesprekken het gebouw nooit verlaten.',
    answerDetail: [
      'Een algemeen model met uw logo erop verzint met volle overtuiging een levertermijn, een garantievoorwaarde of een prijs. Dat is geen fout die later gepatcht wordt; het is wat een model doet wanneer het geen bron heeft om aan te toetsen.',
      'Het technische werk dat telt, zit in opzoeken en weigeren: de juiste passage in uw materiaal vinden voor er geantwoord wordt, en netjes afhaken wanneer er niets te vinden is. Daar zit het grootste deel van de bouw, niet in het gesprek zelf.',
    ],
    manifesto:
      'Elk uur dat uw team dezelfde vraag beantwoordt, is een uur dat naar de klant kon gaan die een andere vraag heeft. Vang de herhaling op, geef de rest door.',
    problemH2: 'Waarom de meeste chatbots tegenvallen',
    problem: [
      'De eerste versie is altijd indrukwekkend. Hij antwoordt vlot, hij is om middernacht bereikbaar, en iedereen is tevreden. De ontgoocheling komt drie weken later, wanneer iemand merkt dat hij sinds de lancering een verkeerde levertermijn geeft.',
      'Daarachter zit een ontwerpkeuze die niemand bewust maakte: de bot mocht alles beantwoorden. Zodra hij alles kán beantwoorden, beantwoordt hij ook dingen die hij niet zou mogen, en het vertrouwen dat een maand kostte, verdwijnt met één schermafbeelding.',
      'De tweede faalvorm is stiller. De bot vangt de makkelijke vragen op, dus wat uw team bereikt is voortaan uniform moeilijk, en niemand hield daar rekening mee in de bezetting of de doelstellingen.',
    ],
    pillarsH2: 'Wat we erin bouwen',
    pillars: [
      {
        title: 'Hij antwoordt uit uw materiaal',
        body: 'Productdocumentatie, prijslijsten, voorwaarden, eerdere tickets. Antwoorden verwijzen naar waar ze vandaan komen, zodat een collega kan nakijken of de bot de juiste pagina las.',
      },
      {
        title: 'Hij weet wanneer te stoppen',
        body: 'Een duidelijke grens tussen wat hij mag beantwoorden en wat naar een mens gaat, met de lastige categorieën, prijsuitzonderingen, klachten, alles juridisch, standaard naar een collega.',
      },
      {
        title: 'Hij draait waar u wilt',
        body: 'Op uw eigen infrastructuur als gesprekken klantgegevens bevatten die u liever nergens naartoe stuurt. Voor veel bedrijven is dat het verschil tussen uitrollen en het idee opbergen.',
      },
    ],
    signals: [
      'Dezelfde vijf vragen komen elke dag binnen in net iets andere bewoordingen',
      'Vragen buiten de kantooruren blijven liggen tot de volgende ochtend',
      'Een collega zoekt twintig minuten context op voor hij iets kan beantwoorden',
      'U hebt een generieke chatbot geprobeerd en weer uitgezet',
    ],
    outcomesH2: 'Wat er verandert zodra hij draait',
    outcomes: [
      'De zichtbare verandering is reactietijd, vooral ’s avonds en in het weekend, wanneer een goed antwoord binnen enkele minuten het verschil is tussen een aanvraag en een gemiste kans.',
      'Wat uw team merkt, is iets anders. Het volume daalt, maar de mix verschuift: de vragen die een mens bereiken zijn die waar echt oordeel bij komt kijken. Dat is veeleisender werk en aanzienlijk voldoeningsgevender dan veertig keer dezelfde leveringsvraag beantwoorden.',
      'Wat niemand voorspelt, is de rapportering. Een bot die bijhoudt wat mensen vroegen en waar hij moest afhaken, is de helderste kaart van de verwarring bij uw klanten die u ooit krijgt, en ze wijst meestal twee of drie dingen aan die in het product of de documentatie beter kunnen.',
    ],
    examplesH2: 'Hoe dit er in de praktijk uitziet',
    examplesIntro:
      'Verzonnen situaties in plaats van klantendossiers, gekozen omdat het de situaties zijn die bedrijven het vaakst beschrijven.',
    examples: [
      {
        title: 'Dezelfde vijf vragen',
        before:
          'Levertermijnen, openingsuren, retourvoorwaarden en voorraad komen de hele dag binnen in net iets andere bewoordingen, en elke vraag onderbreekt iemand.',
        after:
          'Ze worden binnen enkele seconden beantwoord vanuit uw eigen documentatie, op elk uur, met een bron die een collega kan nakijken.',
      },
      {
        title: 'Een vraag over een specifiek order',
        before:
          'De bot ziet het order niet, dus gokt hij of zegt hij dat de klant moet mailen, en daar was die al.',
        after:
          'Hij zoekt het order op, geeft de echte status, en geeft alles met een klacht of een uitzondering meteen door aan een mens.',
      },
    ],
    faqs: [
      {
        q: 'Hoe verschilt dit van ChatGPT op onze website plakken?',
        a: 'Een algemeen model heeft geen toegang tot uw prijzen, voorraad, voorwaarden of historiek, dus antwoordt het uit algemene kennis en vult het gaten met plausibele verzinsels. De bouw hier gaat vooral over het koppelen aan uw materiaal en het daartoe beperken, en dat is precies het deel dat een generieke tool weglaat.',
      },
      {
        q: 'Wat gebeurt er als hij het antwoord niet weet?',
        a: 'Dan zegt hij dat en geeft hij door, en dat gedrag is ingebouwd in plaats van gehoopt. Een bot die toegeeft dat hij iets niet weet, behoudt zijn geloofwaardigheid op al de rest; een die gokt, verliest het vertrouwen op elk antwoord tegelijk, ook op de juiste.',
      },
      {
        q: 'Kan hij in meerdere talen werken?',
        a: 'Ja, en het is een van de sterkere redenen om er in België een te bouwen. Antwoorden in het Nederlands, Frans en Engels op hetzelfde niveau haalt de vertraging weg waarbij een bericht blijft liggen tot de collega die die taal spreekt beschikbaar is.',
      },
      {
        q: 'Waar komen de gesprekken terecht?',
        a: 'Waar u beslist. Met Local AI draait het model op uw eigen servers en verlaat geen enkel gesprek uw infrastructuur, en dat telt wanneer klanten orderdetails, adressen of klachten in een chatvenster plakken. Die optie bestaat net omdat het voor veel bedrijven de doorslaggevende vraag is.',
      },
    ],
    featuresTitle: 'Een bot op onze software, of een rond de uwe gebouwd',
    featuresSubtitle:
      'Sommige bedrijven willen gesprekken afgehandeld binnen een tool die we al maakten. Andere hebben het nodig gekoppeld aan een ERP, een voorraadsysteem en een prijslijst. Beide beginnen met hetzelfde gesprek.',
    ctaTitle: 'Breng de vijf vragen mee die u elke dag beantwoordt',
    ctaBody:
      'Het beste vertrekpunt is het handvol vragen waar uw team het moe van is. U krijgt een recht antwoord of een chatbot die goed zou opvangen, en wat het zou vragen om hem betrouwbaar te maken.',
    seoTitle: 'AI-chatbot laten bouwen voor uw bedrijf · Nivora',
    seoDescription:
      'AI-chatbots die antwoorden vanuit uw eigen documenten, prijzen en historiek, en doorgeven wanneer het moet. Desgewenst op uw eigen servers. Gebouwd door Nivora, software- en AI-studio in Brugge.',
  },
})
