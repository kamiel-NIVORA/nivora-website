/**
 * Blog content for Nivora Works.
 *
 * A post body is an ordered list of blocks. A plain string is a paragraph; the
 * object forms add a subheading, a pull quote, or an inline image. Rendering
 * lives in `src/pages/BlogPost.tsx`. House voice: calm, plain-spoken, no hype,
 * and no em-dashes in copy (Kamiel's hard preference).
 */
import type { Lang, Localized } from '@/i18n'

/** Per-block typography the AIOS editor can write.
 *  `serif` = Hedvig (font-serif), `sans` = Inter (font-sans). */
export type BlockFont = 'serif' | 'sans'

export type PostBlock =
  | string
  /** Paragraph with optional per-block font/size (a bare string is the same,
   *  using the defaults). */
  | { p: string; font?: BlockFont; size?: number }
  | { h2: string; font?: BlockFont; size?: number }
  | { h3: string; font?: BlockFont; size?: number }
  | { quote: string; font?: BlockFont; size?: number }
  /** Bullet or numbered list (ordered:true = numbered). */
  | { list: string[]; ordered?: boolean }
  /** Highlighted note with an optional small label. */
  | { callout: string; title?: string }
  /** Thin section break. */
  | { divider: true }
  | { image: string; alt: string; caption?: string; feather?: boolean }
  /** Inline call to action, e.g. a link to the waiting list. */
  | { cta: { label: string; href: string } }

/** A logo/photo placed on the cover. x/y/size are percentages of the cover box
 *  (set by the AIOS cover editor); legacy icons without them lay out as a row. */
export type CoverIcon = {
  src: string
  name?: string
  x?: number
  y?: number
  size?: number
}

export type Post = {
  slug: string
  title: string
  category: string
  author: string
  date: string
  image: string
  excerpt: string
  body: PostBlock[]
  /** Optional object-position for the cover image (e.g. "center 40%"). */
  imagePosition?: string
  /** Optional cover overlay authored in the AIOS (rendered by BlogCover). */
  coverLabel?: string
  /** Vertical position of the label (e.g. "42%"). */
  coverLabelY?: string
  /** Horizontal position of the label (e.g. "42%"). Undefined = centered. */
  coverLabelX?: string
  /** Label font size in cqw units (relative to cover width). Undefined = ~7. */
  coverLabelSize?: number
  coverOcclude?: boolean
  coverIcons?: CoverIcon[]
}

export const AUTHOR_ROLE = 'Founder'

const POSTS_BY_LANG: Localized<Post[]> = {
  en: [
    {
      slug: 'meet-box-and-voice',
      title: 'We are building Box and Voice. Here is what they will do.',
      category: 'Product',
      author: 'Kamiel Niville',
      date: 'Jun 20, 2026',
      image: '/blog/blog-box-voice-launch.webp',
      excerpt:
        'The news from our workshop: the first two Nivora apps are officially in the making. Box brings email, chat and DMs together in one calm inbox. Voice turns the way you talk into finished text in your own style. Here is what they will do, and how to be first in line.',
      body: [
        'Today we are making it official. We are building our first two own apps, Box and Voice, and we want you to hear it from us while it happens, not after. This is the announcement, the honest kind: here is what we are working on, why we are building it, and exactly what these two apps will do for you.',
        { h2: 'Box: all your communication in one calm inbox' },
        'Your attention lives across ten apps. An email here, a chat there, a DM you only spot at night. Box pulls all of it into one calm inbox, so nothing slips past you anymore and communication becomes just one app to check. Read, sort, reply, all in one quiet place.',
        'We are building it to feel quiet on purpose. No badges screaming for attention, no inbox that resets your focus every time you blink. You open Box, you see what genuinely needs you, you reply, and you close it again. That is the whole idea.',
        { h2: 'Voice: speak, and get text that is ready to send' },
        'Talking is faster than typing, everyone knows that. Dictation just never delivered on it, spitting out text that sounded like a machine and needed redoing anyway. Voice flips that around. You speak, and Voice picks up not just what you say, but the shape it should take. List a few things and they become clean bullet points. Say "write an email" and out comes an email, opening and sign-off included. Send a message and it reads short and direct, the way you would actually type it yourself. Ready to send, not to rewrite.',
        {
          quote:
            'We are not trying to add more apps to your day. We are trying to take a few away.',
        },
        'That line sits behind everything we make. Box replaces the tab-hopping. Voice replaces the retyping. Both are designed to disappear into your work instead of demanding a place in it.',
        { h2: 'Where we are, and what happens next' },
        'Both apps are in the making right now, and we are building them in the open. They will land on iPhone, Mac, Android and Windows. They are not available to download yet, so the one thing you can do today is claim your spot: the waiting list gets first access on launch day, and it is where we share the real behind-the-scenes updates first.',
        'We would rather tell you now, while we are building, than surprise you later with a finished product you never saw coming. This is what we are working on. Come along early.',
        { cta: { label: 'Get notified at launch', href: '/waitlist' } },
      ],
    },
    {
      slug: 'how-the-ai-is-actually-going',
      title: 'How our AI is actually going, in plain words.',
      category: 'Progress',
      author: 'Kamiel Niville',
      date: 'Jun 6, 2026',
      image: '/blog/blog-ai-progress.webp',
      excerpt:
        'An honest progress update from inside the build. What is working now, what we changed our minds about, and why the quiet, unglamorous parts are the ones we are proudest of.',
      body: [
        'People ask us how the AI side is going more than almost anything else, so we want to answer it properly, without the usual fog. No grand claims, no roadmap theatre. Just where things actually stand right now.',
        { h2: 'The models got good enough, quietly' },
        'A year ago, running capable AI close to your own data meant giving something up on quality. That is no longer true. The models we build on can read a long contract, search years of internal files, and draft a careful reply, and they do it fast enough to feel instant. The leap happened without much noise, and it quietly changed what we are able to promise you.',
        'What that means in practice is simple. A lot of the things we used to describe as coming soon are now just things the software does. That is a good place to be standing.',
        { h2: 'We spent more time on trust than on features' },
        'If we are honest about where the hours went, it was not into piling on more. It went into making the system explain itself. Showing where an answer came from, making it easy to correct, and making sure nothing surprising happens behind your back. A clever feature you do not trust gets used once. A plain one you do trust gets used every day. We optimised hard for the second kind.',
        {
          quote:
            'The quiet parts, the ones nobody puts in a demo, are the parts that decide whether a system survives its first month with a real team.',
        },
        'So a lot of our recent work looks unremarkable from the outside. Better handling when a request is unclear. Clearer limits on what the system will and will not do. Faster answers on smaller hardware. None of it makes a flashy screenshot. All of it is why the people testing early builds keep coming back.',
        { h2: 'What is next' },
        'The near-term goal has not changed. We want a system that one person can fully understand and rely on, that runs close to your business, and that gets sharper every month without you lifting a finger. We are closer to that than we have ever been, and the pace is picking up rather than slowing down.',
        'We will keep sharing these updates as they happen, the real ones rather than the tidy ones. If you want them first, the waiting list is the best seat in the house.',
        { cta: { label: 'Get notified at launch', href: '/waitlist' } },
      ],
    },
    {
      slug: 'why-we-are-betting-on-local',
      title: 'Why we are betting on local, the AI that lives inside your business.',
      category: 'Local',
      author: 'Kamiel Niville',
      date: 'May 22, 2026',
      image: '/blog/blog-local-peak.webp',
      excerpt:
        'Most AI sends your data to someone else’s cloud. We think the bigger opportunity is the opposite. AI that runs on hardware you own, where what is yours stays yours.',
      body: [
        'Almost every AI tool you can buy today works the same way. Your words, your files, and your customers’ details get sent off to a server somewhere, processed there, and sent back. For plenty of tasks that is perfectly fine. But the more we build, the more convinced we become that the real opportunity sits in the other direction. We call it local, and we think it is where a lot of this is quietly heading.',
        { h2: 'What local actually means' },
        'Local AI runs inside your own walls. The model lives on hardware you control, your data never leaves it, and the answers come from your own knowledge instead of a shared cloud. Nothing gets logged on a server you cannot see. Your information stays exactly where it already is, which is with you.',
        'For a long time that came with a catch. Local meant slower, smaller, and noticeably worse. That trade is mostly gone now. Models you can run privately have become strong enough for real work. Reading documents, drafting replies, searching everything you have ever written in seconds. You no longer have to choose between private and capable.',
        { h2: 'Why this matters more than it sounds' },
        'When the AI lives with you, a few things shift at once. Your data stops being a liability you handed to a third party. Your costs stop being tied to someone else’s per-message pricing. And your system stops being something that can change or vanish because a provider updated their roadmap. You own the thing you rely on, end to end.',
        {
          quote:
            'Private should not mean primitive. The whole point is to get the upside of AI without giving away the thing that makes your company yours.',
        },
        'There is a strategic edge here too. The work you do, the knowledge you have built, the way you speak to your customers, all of it becomes something only your system understands and only you can reach. That is hard to copy. It compounds quietly, month after month, the way a real advantage should.',
        { h2: 'Where we are taking it' },
        'This is the part of Nivora we are most excited about, and the part we are investing in hardest. We do not see local AI as a niche for the privacy-obsessed. We see it as the sensible default for any business that takes its own data seriously. The mountain is big and we are early on it, which is exactly why we like the view.',
        'We will keep writing about what we learn as we climb. Box and Voice, the first apps built on this thinking, are almost here. If local is something you have quietly been wondering about, join the waiting list and follow along from the start.',
        { cta: { label: 'Get notified at launch', href: '/waitlist' } },
      ],
    },
  ],
  nl: [
    {
      slug: 'meet-box-and-voice',
      title: 'We bouwen aan Box en Voice. Dit is wat ze gaan doen.',
      category: 'Product',
      author: 'Kamiel Niville',
      date: 'Jun 20, 2026',
      image: '/blog/blog-box-voice-launch.webp',
      excerpt:
        'Het nieuws uit ons atelier: de eerste twee Nivora-apps zijn officieel in de maak. Box brengt e-mail, chat en DM’s samen in één rustige inbox. Voice zet de manier waarop u praat om in afgewerkte tekst in uw eigen stijl. Dit is wat ze gaan doen, en hoe u er als eerste bij bent.',
      body: [
        'Vandaag maken we het officieel. We bouwen aan onze eerste twee eigen apps, Box en Voice, en we willen dat u het van ons hoort terwijl het gebeurt, niet erna. Dit is de aankondiging, de eerlijke soort: dit is waar we aan werken, waarom we het bouwen, en wat deze twee apps precies voor u gaan doen.',
        { h2: 'Box: al uw communicatie in één rustige inbox' },
        'Uw aandacht ligt verspreid over tien apps. Een mail hier, een chat daar, een DM die u pas ’s avonds opmerkt. Box brengt het allemaal samen in één rustige inbox, zodat u niets meer over het hoofd ziet en u nog maar één app hoeft te checken voor al uw communicatie. Lezen, sorteren, antwoorden, op één rustige plek.',
        'We bouwen het bewust om rustig aan te voelen. Geen badges die om aandacht schreeuwen, geen inbox die uw focus reset elke keer dat u knippert. U opent Box, u ziet wat u echt nodig heeft, u antwoordt, en u sluit het weer. Dat is het hele idee.',
        { h2: 'Voice: spreek, en krijg tekst die klaar is om te versturen' },
        'Praten gaat sneller dan typen, dat weet iedereen. Alleen leverde dicteren dat nooit op: tekst die klonk als een machine en die u toch weer moest herschrijven. Voice draait dat om. U spreekt, en Voice hoort niet alleen wát u zegt, maar ook welke vorm het moet krijgen. Somt u iets op, dan worden het nette bullet points. Zegt u "schrijf een e-mail", dan komt er een e-mail uit, met aanhef en afsluiting. Stuurt u een bericht, dan klinkt het kort en direct, zoals u het zelf zou typen. Klaar om te versturen, niet om over te doen.',
        {
          quote:
            'We proberen geen apps toe te voegen aan uw dag. We proberen er een paar weg te nemen.',
        },
        'Die gedachte zit achter alles wat we maken. Box vervangt het gespring tussen tabbladen. Voice vervangt het hertikken. Beide zijn ontworpen om te verdwijnen in uw werk in plaats van er een plek in op te eisen.',
        { h2: 'Waar we staan, en wat er nu komt' },
        'Beide apps zijn op dit moment in de maak, en we bouwen ze in de openheid. Ze komen op iPhone, Mac, Android en Windows. Ze zijn nog niet te downloaden, dus het enige wat u vandaag kunt doen is uw plek vastleggen: de wachtlijst krijgt als eerste toegang op de dag van de lancering, en het is de plek waar we de echte updates van achter de schermen als eerste delen.',
        'We vertellen het u liever nu, terwijl we bouwen, dan u later te verrassen met een afgewerkt product dat u nooit zag aankomen. Dit is waar we aan werken. Volg vanaf het begin mee.',
        { cta: { label: 'Word op de hoogte gebracht bij de lancering', href: '/waitlist' } },
      ],
    },
    {
      slug: 'how-the-ai-is-actually-going',
      title: 'Hoe het echt gaat met onze AI, in gewone taal.',
      category: 'Voortgang',
      author: 'Kamiel Niville',
      date: 'Jun 6, 2026',
      image: '/blog/blog-ai-progress.webp',
      excerpt:
        'Een eerlijke voortgangsupdate van binnenuit. Wat nu werkt, waarover we van gedachten veranderden, en waarom we het meest trots zijn op de stille, weinig glamoureuze onderdelen.',
      body: [
        'Mensen vragen ons hoe het met de AI-kant gaat vaker dan bijna al de rest, dus dat willen we naar behoren beantwoorden, zonder de gebruikelijke mist. Geen grootse beloftes, geen roadmaptheater. Gewoon waar het nu echt staat.',
        { h2: 'De modellen werden goed genoeg, in stilte' },
        'Een jaar geleden betekende capabele AI dicht bij uw eigen data draaien dat u inleverde op kwaliteit. Dat klopt niet meer. De modellen waarop we bouwen kunnen een lang contract lezen, jarenlange interne bestanden doorzoeken en een zorgvuldig antwoord opstellen, en ze doen het snel genoeg om instant aan te voelen. De sprong gebeurde zonder veel kabaal, en veranderde stilletjes wat we u kunnen beloven.',
        'Wat dat in de praktijk betekent is simpel. Veel van de dingen die we vroeger als binnenkort omschreven, zijn nu gewoon dingen die de software doet. Dat is een goede plek om te staan.',
        { h2: 'We staken meer tijd in vertrouwen dan in features' },
        'Als we eerlijk zijn over waar de uren naartoe gingen, dan was het niet naar méér opstapelen. Het ging naar het systeem zichzelf laten uitleggen. Tonen waar een antwoord vandaan komt, het makkelijk maken om te corrigeren, en zorgen dat er niets verrassends achter uw rug gebeurt. Een slimme feature die u niet vertrouwt, gebruikt u één keer. Een gewone die u wel vertrouwt, gebruikt u elke dag. We hebben hard geoptimaliseerd voor het tweede soort.',
        {
          quote:
            'De stille onderdelen, die niemand in een demo stopt, bepalen of een systeem zijn eerste maand met een echt team overleeft.',
        },
        'Dus veel van ons recente werk oogt onopvallend van buitenaf. Betere afhandeling als een vraag onduidelijk is. Helderdere grenzen aan wat het systeem wel en niet doet. Snellere antwoorden op kleinere hardware. Niets ervan levert een flitsende screenshot op. Het is allemaal de reden waarom de mensen die vroege versies testen, blijven terugkomen.',
        { h2: 'Wat nu volgt' },
        'Het doel op korte termijn is niet veranderd. We willen een systeem dat één persoon volledig kan begrijpen en waarop die kan rekenen, dat dicht bij uw business draait, en dat elke maand scherper wordt zonder dat u een vinger uitsteekt. We zijn daar dichter bij dan ooit, en het tempo gaat eerder omhoog dan omlaag.',
        'We blijven deze updates delen wanneer ze gebeuren, de echte in plaats van de opgepoetste. Wilt u ze als eerste, dan is de wachtlijst de beste plek in de zaal.',
        { cta: { label: 'Word op de hoogte gebracht bij de lancering', href: '/waitlist' } },
      ],
    },
    {
      slug: 'why-we-are-betting-on-local',
      title: 'Waarom we inzetten op local, de AI die in uw bedrijf zelf leeft.',
      category: 'Local',
      author: 'Kamiel Niville',
      date: 'May 22, 2026',
      image: '/blog/blog-local-peak.webp',
      excerpt:
        'De meeste AI stuurt uw data naar de cloud van iemand anders. Wij denken dat de grotere kans net andersom ligt. AI die draait op hardware die u bezit, waar wat van u is, van u blijft.',
      body: [
        'Bijna elke AI-tool die u vandaag kunt kopen werkt op dezelfde manier. Uw woorden, uw bestanden en de gegevens van uw klanten worden naar een server ergens gestuurd, daar verwerkt en teruggestuurd. Voor heel wat taken is dat prima. Maar hoe meer we bouwen, hoe overtuigder we raken dat de echte kans in de andere richting ligt. Wij noemen het local, en we denken dat veel hiervan stilletjes die kant op gaat.',
        { h2: 'Wat local eigenlijk betekent' },
        'Local AI draait binnen uw eigen muren. Het model leeft op hardware die u beheert, uw data verlaat die nooit, en de antwoorden komen uit uw eigen kennis in plaats van uit een gedeelde cloud. Niets wordt gelogd op een server die u niet kunt zien. Uw informatie blijft precies waar ze al is, namelijk bij u.',
        'Lange tijd zat daar een addertje onder het gras. Local betekende trager, kleiner en merkbaar slechter. Die afweging is grotendeels verdwenen. Modellen die u privé kunt draaien zijn sterk genoeg geworden voor echt werk. Documenten lezen, antwoorden opstellen, alles wat u ooit hebt geschreven in seconden doorzoeken. U hoeft niet meer te kiezen tussen privé en capabel.',
        { h2: 'Waarom dit meer uitmaakt dan het klinkt' },
        'Wanneer de AI bij u woont, verschuiven er een paar dingen tegelijk. Uw data is niet langer een risico dat u aan een derde partij hebt gegeven. Uw kosten zijn niet langer gekoppeld aan de prijs per bericht van iemand anders. En uw systeem is niet langer iets dat kan veranderen of verdwijnen omdat een aanbieder zijn roadmap aanpaste. U bezit het ding waarop u rekent, van begin tot eind.',
        {
          quote:
            'Privé zou niet primitief mogen betekenen. Het hele punt is de voordelen van AI krijgen zonder weg te geven wat uw bedrijf van u maakt.',
        },
        'Er zit hier ook een strategisch voordeel in. Het werk dat u doet, de kennis die u hebt opgebouwd, de manier waarop u met uw klanten praat, dat alles wordt iets wat alleen uw systeem begrijpt en alleen u kunt bereiken. Dat is moeilijk te kopiëren. Het stapelt stilletjes op, maand na maand, zoals een echt voordeel dat hoort te doen.',
        { h2: 'Waar we het naartoe brengen' },
        'Dit is het deel van Nivora waar we het meest enthousiast over zijn, en het deel waarin we het hardst investeren. We zien local AI niet als een niche voor de privacygevoeligen. We zien het als de verstandige standaard voor elk bedrijf dat zijn eigen data serieus neemt. De berg is groot en we staan er vroeg op, en net daarom bevalt het uitzicht ons.',
        'We blijven schrijven over wat we leren terwijl we klimmen. Box en Voice, de eerste apps gebouwd op dit denken, zijn er bijna. Is local iets waar u zich stilletjes al over afvroeg, schrijf u dan in op de wachtlijst en volg mee vanaf het begin.',
        { cta: { label: 'Word op de hoogte gebracht bij de lancering', href: '/waitlist' } },
      ],
    },
  ],
}

/** Bundled posts in the active language (instant first paint + offline fallback). */
export const getPosts = (lang: Lang): Post[] => POSTS_BY_LANG[lang]

/** Backwards-compatible English export for any consumer that has not adopted the
 *  language selector yet. */
export const POSTS: Post[] = POSTS_BY_LANG.en
