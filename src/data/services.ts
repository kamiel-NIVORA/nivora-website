import type { Lang } from '@/i18n'
import type { ServiceContent, ServiceSlug } from './serviceContent'

/**
 * Service landing-page copy, authored and edited for conversion, in Nivora's
 * voice: calm, direct, honest, no hype, no em-dashes. Conforms to the
 * ServiceContent contract in serviceContent.ts.
 *
 * Bilingual: SERVICE_CONTENT_EN holds the English copy, SERVICE_CONTENT_NL the
 * Dutch. Consumers call getServiceContent(lang) to resolve the active language.
 */
export const SERVICE_CONTENT_EN: Record<ServiceSlug, ServiceContent> = {
  'app-design': {
    slug: 'app-design',
    name: 'App Design',
    hero: {
      eyebrow: 'App Design & Development',
      headline: 'The app you have been picturing Truly built fully yours',
      subhead: 'Consumer apps, business tools, and anything that goes beyond off-the-shelf. Built in your brand, owned by you.',
      primaryCta: 'Book a strategy call',
      secondaryCta: 'Contact us',
    },
    intro: {
      statement: 'An app is only worth building if it is worth using. We design it properly, build it to last, and make it feel like it was made for the people it serves.',
      chips: ['Own the product', 'Any platform', 'No templates'],
    },
    reveal:
      'Anyone can have an app made. An app that grows with you, one you can still extend a year from now without a fight, that is where the real work lives. In the choices you never see and the foundation beneath them. That is what we build for.',
    problem: {
      title: 'Your app idea deserves better than the shortcuts',
      intro: 'Most app ideas stall at the build, not because the idea is wrong, but because turning a concept into a product people love is harder than it looks.',
      points: [
        { title: 'The fast routes hit a ceiling', body: 'Templates and quick tools can stub something out fast. But the edge cases, the polish, and the architecture that holds up when real users arrive still take real craft, and that gap is where most ideas quietly die.' },
        { title: 'A template makes you look like everyone else', body: 'If your app feels like a SaaS template with new colours, users feel it. The apps people open every day have their own look and feel, designed, not assembled.' },
      ],
    },
    solution: {
      title: 'A real product, designed from the ground up',
      body: 'We design and build the whole product: consumer apps, business tools, internal apps, anything too complex for a shortcut. We start with the idea and the people it serves, design the interface in your brand, and build on foundations that hold up as you grow. You walk away with something real, not a prototype.',
      outcomes: [
        'An app made for your users, not assembled from parts',
        'A product you own outright: code, design, data',
        'Foundations that hold up as users and complexity arrive',
        'Shipped, in use, worth opening every day',
      ],
    },
    capabilities: {
      title: 'What we build',
      intro: 'From a first screen idea to a product people open every day. Consumer apps, business tools, and everything between.',
      items: [
        { title: 'Consumer apps', body: 'You have an app idea worth building. We take it from concept to a product real users download, use, and come back to.' },
        { title: 'Business tools and internal apps', body: "The tool that fits how your team works does not exist yet, so we build it. Your process drives the design, not someone else's playbook." },
        { title: 'Brand and visual identity', body: 'From the icon to the last interaction, a visual language your users recognize instantly. Designed in your brand, not a template anyone could rent.' },
        { title: 'Complex builds', body: 'When the idea is too layered for a quick tool or too refined for a template, we take it on. Full-stack, proper architecture, built for real use and real scale.' },
        { title: 'AI where it earns its place', body: 'We add AI only where it saves real time or creates real value for users. Never for the sake of it.' },
        { title: 'Launch and grow', body: 'We ship it, watch how it is used, and refine. A product that wins users on day one builds loyalty by day ninety.' },
      ],
    },
    process: {
      title: 'How we work',
      steps: [
        { label: '01', title: 'We listen first', body: 'We sit with you to understand the idea, who it is for, and what it must do, so nothing gets built on a wrong assumption.' },
        { label: '02', title: 'We design what fits', body: 'We map the flows, design the interface in your brand, and agree exactly what the first version does, with no black box.' },
        { label: '03', title: 'We build it properly', body: 'A full-stack build on clean foundations, connected to your tools, with progress you can see as we go.' },
        { label: '04', title: 'We stay with you', body: 'We launch, watch how it is used, and keep improving it, you are not handed a zip file and left alone.' },
      ],
    },
    differentiators: {
      title: 'Why build with us',
      items: [
        { title: 'Builders, not an agency', body: 'We design and write the code ourselves. You talk to the people building your product, not an account manager relaying messages.' },
        { title: 'The idea drives the design', body: 'We do not fit your app into a template. We learn what it needs to be and who it is for, then design around that.' },
        { title: 'You own everything', body: 'The code, the design files, the data, all yours. No lock-in, no licence fee, no dependency on us to keep it running.' },
        { title: 'We build what others cannot ship', body: 'The ideas too complex for a quick tool, too refined for a template, or too ambitious for a shortcut. That is exactly what we are here for.' },
      ],
    },
    audience: {
      title: 'Is this the right fit?',
      body: 'We build for founders with app ideas and teams that need the right tool. Here is who it fits, and who it does not.',
      fits: [
        'Founders who want their app idea built properly the first time',
        'Teams whose process has outgrown spreadsheets and generic SaaS',
        'Anyone who hit the ceiling of a template or a quick route',
        'Owners who want to own their product, not rent something that almost works',
      ],
      notFor: [
        'Anyone after a cheap clone or a quick template',
        '"Build it by next week" with no room for design or discovery',
        'Throwaway prototypes with no real plan behind them',
      ],
    },
    faq: [
      { q: 'How long does it take?', a: 'It depends on the scope. A focused internal tool takes weeks; a full consumer product takes longer. After our first call you get an honest timeline for your build, not a number pulled from thin air.' },
      { q: 'What does it cost?', a: 'It is priced to the scope, not a fixed package. Once we understand what you need, you get a clear number and what it covers before you commit. No surprise invoices later.' },
      { q: 'Do I own the code and design?', a: 'Yes. The code, the design files, and the data are yours, with no lock-in. If you ever want to bring it in-house or move it elsewhere, you can.' },
      { q: 'Can you build consumer apps, not just business tools?', a: 'Yes, that is a big part of what we do. If you have an app idea and want it turned into a real product people love using, that is exactly the conversation to have with us.' },
      { q: 'We already use some tools, does this replace them?', a: 'Not necessarily. We integrate with what works and replace only what holds you back. The goal is one product that fits your workflow, not another disconnected system.' },
      { q: 'How do we get started?', a: 'Book a strategy call. We talk through your idea and your situation, and give you a straight answer on whether it is the right fit and what it would take.' },
    ],
    finalCta: {
      title: 'The app you have been picturing is closer than it looks.',
      body: 'Bring us the idea. We will show you what it takes to build it properly, and whether we are the right team to do it.',
      button: 'Book a strategy call',
      reassurance: 'A 30-minute call. No pitch, no obligation, just a straight answer on what it would take. We usually reply within a day.',
    },
  },
  'local-ai': {
    slug: 'local-ai',
    name: 'Local AI',
    hero: {
      eyebrow: 'Private AI Installation',
      headline: 'The same AI capability, running inside your own walls.',
      subhead: 'Capable open models, installed on hardware you control. Real AI for your team, with confidential data that never leaves the building.',
      primaryCta: 'Book a strategy call',
      secondaryCta: 'Contact us',
    },
    intro: {
      statement: "For companies that need real AI capability but cannot put their data in someone else's cloud. We build the version that gives you both.",
      chips: ['Your hardware', 'No cloud exposure', 'Owned outright'],
    },
    reveal:
      'Every prompt your team sends to a cloud model leaves your building. We build the version that stays.',
    problem: {
      title: 'You need AI. Your data is not negotiable.',
      intro: 'The teams that need AI most are often the ones who cannot use the easy tools, and there is a structural reason for that.',
      points: [
        {
          title: 'Every cloud prompt leaves your building',
          body: 'Contracts, client records, financial models, source code: the moment any of it goes into ChatGPT, it has left your control. You agreed to that in the terms, and most companies never think about it until something goes wrong.',
        },
        {
          title: 'You cannot prove where the data went',
          body: '"We used an AI" does not hold up in an audit or a client conversation. "It runs on our own servers, nothing leaves our perimeter" does, and cloud AI makes that honest answer impossible.',
        },
      ],
    },
    solution: {
      title: 'Private AI, installed on hardware you control.',
      body: 'We deploy capable AI models inside your environment, on your own servers or dedicated hardware we manage for you. The system reasons over your documents, and every prompt stays in the building: no public API in the chain, no data leaving your perimeter. You get real capability with privacy that holds up under actual scrutiny.',
      outcomes: [
        'AI on infrastructure you control, no cloud API in the chain',
        'Every prompt and answer stays inside your perimeter',
        'A private assistant that reasons over your own documents',
        'No per-seat billing, no lock-in, no API to second-guess',
      ],
    },
    capabilities: {
      title: 'What we install',
      intro: 'A complete private AI setup, from infrastructure assessment to an assistant your team opens every day.',
      items: [
        {
          title: 'Infrastructure assessment',
          body: 'We look at what you have and what you would need, and give you a straight answer on running it on your existing servers or dedicated hardware we manage, before any work starts.',
        },
        {
          title: 'Model selection and deployment',
          body: 'We pick the right open models for your work: capable enough for serious tasks, sized to your hardware, hosted inside your own perimeter.',
        },
        {
          title: 'Secure configuration',
          body: 'The system runs inside your perimeter from day one. Data stays in-house not because we promise it, but because the architecture leaves it nowhere else to go.',
        },
        {
          title: 'A private assistant over your own documents',
          body: 'Your team asks questions and gets answers grounded in your contracts, records, codebase, or knowledge base. Nothing goes outside to answer.',
        },
        {
          title: 'Access control and audit trail',
          body: 'Who can use it, what they can reach, and a complete record of what happened, the controls and trail your compliance team needs to sign off.',
        },
        {
          title: 'Ongoing maintenance',
          body: 'Models improve and threats change. We keep your system updated and running so private AI stays an asset, not a project you babysit.',
        },
      ],
    },
    process: {
      title: 'How we work',
      steps: [
        {
          label: '01',
          title: 'We listen first',
          body: 'We map your data, your compliance obligations, and what you actually want AI to do, so we know the constraints you cannot break.',
        },
        {
          label: '02',
          title: 'We design what fits',
          body: 'We choose the models, hosting, and architecture for your situation, and show you exactly how data stays contained before we build.',
        },
        {
          label: '03',
          title: 'We build and deploy',
          body: 'We install the system in your environment, connect it to your documents, set up access control and auditing, and test it against real work.',
        },
        {
          label: '04',
          title: 'We stay with you',
          body: 'We hand over a system you own, then keep it maintained and updated as your needs grow, without pulling you back toward the cloud.',
        },
      ],
    },
    differentiators: {
      title: 'Why a builder, not a vendor',
      items: [
        {
          title: 'You own the system outright',
          body: 'When we finish, the AI runs on your infrastructure under your control. No per-seat meter, no switch a provider can flip to change your terms.',
        },
        {
          title: 'Privacy that holds up under scrutiny',
          body: 'We build the architecture so the data genuinely cannot leave, a stronger claim than promising not to use it. Your auditors and clients deserve that version.',
        },
        {
          title: 'Built around your specific constraints',
          body: 'Every industry has different obligations and different confidential material. We design the deployment around what you actually cannot expose, not a generic template.',
        },
        {
          title: 'We stay after launch',
          body: 'Private AI needs upkeep as models and threats evolve. We keep your system current so you keep the capability without the burden of running it alone.',
        },
      ],
    },
    audience: {
      title: 'Who this is built for',
      body: 'Local AI is the right fit when keeping data in-house is not optional. If that is your situation, this is built for it; if not, we will tell you honestly.',
      fits: [
        'Regulated industries where data handling is non-negotiable: legal, medical, financial services',
        'Companies whose source code, IP, or research cannot go to a third-party model',
        'Teams who must answer exactly where their data went, for auditors or clients',
        'Businesses that want to own their AI capability, not rent it per seat',
      ],
      notFor: [
        'Teams with no data sensitivity, happy on cloud SaaS as it is',
        'Companies who just want the cheapest path, wherever the data goes',
        'Anyone looking for a quick subscription with no real setup',
      ],
    },
    faq: [
      {
        q: 'How long does deployment take?',
        a: 'It depends on your infrastructure and how much of your document library the assistant needs to read. A focused first deployment is typically a matter of weeks. You get a real timeline after the assessment, before any work starts.',
      },
      {
        q: 'Do we actually own it, or are we tied to you?',
        a: 'You own it. The system runs on infrastructure you control. We stay involved for maintenance because clients find it useful, not because you have no way to leave.',
      },
      {
        q: 'How private is it, really?',
        a: 'Nothing goes to OpenAI or any public cloud model. The models run inside your environment, every prompt and answer stays behind your own walls, and the access control and audit trail show exactly who accessed what and when.',
      },
      {
        q: 'We already use ChatGPT. Why change?',
        a: 'If your data is not sensitive, you may not need to. But if your team pastes confidential material into a tool you do not control, you are carrying a risk most companies underestimate. This gives you the same capability without the exposure.',
      },
      {
        q: 'Do we need our own servers?',
        a: 'No. We can deploy on your existing hardware, or on dedicated infrastructure we manage for you. Either way, we handle the technical side and hand you a system that just works.',
      },
      {
        q: 'How capable are self-hosted models compared to cloud AI?',
        a: 'Strong enough for serious business work: document analysis, drafting, internal Q&A, classification, research. We match the model to your actual tasks and hardware, so what you get is genuinely useful.',
      },
    ],
    finalCta: {
      title: 'Real AI, without giving up your data.',
      body: 'If your business cannot send confidential information into the cloud, you do not have to fall behind. Let us look at your setup and find the private AI that fits.',
      button: 'Book a strategy call',
      reassurance: 'A 30-minute call. No pitch, no obligation, just a straight answer on whether this is the right fit. We usually reply within a day.',
    },
  },
  aios: {
    slug: 'aios',
    name: 'AIOS',
    hero: {
      eyebrow: 'AIOS, Your AI Operating System',
      headline: 'One system to run your whole company, with AI doing the work inside it.',
      subhead: 'One custom system built around how you operate. CRM, projects, operations, and knowledge connected, with AI doing the work across all of it.',
      primaryCta: 'Book a strategy call',
      secondaryCta: 'Contact us',
    },
    intro: {
      statement: 'One brain for your business. Shaped around how you operate, not a template you have to bend yourself into.',
      chips: ['You own it', 'Private by design', 'One source of truth'],
    },
    reveal:
      'All your tools in one place, instead of scattered everywhere. You spend less time keeping it all running, and keep more for what truly matters.',
    problem: {
      title: "Your company runs on a tangle of tools that don't talk to each other",
      intro: 'It grew one app at a time, each one sensible alone, and together they cost your team hours every single day.',
      points: [
        { title: 'You enter the same thing over and over', body: 'A new client lands in the CRM, then gets copied into a spreadsheet, a project board, and an invoice. Every copy is a chance to get it wrong, and someone always does.' },
        { title: 'Nobody knows which number is right', body: 'Two tools show two totals and nobody trusts either. You end up deciding on figures you only half believe, because your tools never agree on the real picture.' },
      ],
    },
    solution: {
      title: 'One system, built around how you actually run',
      body: 'AIOS replaces the scatter of disconnected tools with one system shaped to your operations. We map how your business works, then build a single data model and custom modules for your CRM, projects, ops, and knowledge, all connected underneath. On top, AI agents act across your workflows instead of waiting for someone to click between apps.',
      outcomes: [
        'One system instead of many, your team works in one place',
        'Enter data once, it stays right everywhere',
        'AI that does real work across your operations, not a chatbot in a corner',
        'One source of truth, so every number agrees',
      ],
    },
    capabilities: {
      title: 'What we build into your AIOS',
      intro: 'Not a stack of plugins. One system, designed end to end around how your business works.',
      items: [
        { title: 'Operations mapping', body: 'We start by learning how your business actually runs: every workflow, every handoff, every place data gets re-entered. The system is built on that, not a generic template.' },
        { title: 'One data model underneath', body: 'A client, a project, a task means the same thing everywhere. Enter it once and it stays in sync, nothing typed twice, nothing drifting out of date.' },
        { title: 'Custom modules for how you work', body: "CRM, projects, operations, and knowledge, built to match your process, not someone else's idea of it. No features you will never open." },
        { title: 'AI agents that act across workflows', body: 'Agents that draft, update, route, and follow up between your modules, doing the real work, not just answering questions in a box.' },
        { title: 'Dashboards you can trust', body: 'The real picture of your business in one view, drawn from one source of truth. The numbers agree because they all come from the same place.' },
        { title: 'Rollout and team training', body: 'We install it, move your data in, and train your team so they actually adopt it, then stay with you after launch as the business changes.' },
      ],
    },
    process: {
      title: 'How we build it with you',
      steps: [
        { label: '01', title: 'We listen first', body: 'We sit with you and your team to map how the business runs today, the tools, the workflows, the places that hurt, before anything gets built.' },
        { label: '02', title: 'We design the system', body: 'We shape the data model and modules around your operations and agree what AIOS replaces and in what order, so you see the plan before a line is built.' },
        { label: '03', title: 'We build what fits', body: 'We build your modules, automation, and AI agents, migrate your data, and start with the part that hurts most so you feel the value early.' },
        { label: '04', title: 'We stay with you', body: 'We roll it out, train your team, and keep refining the system as you grow, so AIOS keeps fitting the business as it changes.' },
      ],
    },
    differentiators: {
      title: 'Why work with us',
      items: [
        { title: 'Built around you, not a template', body: 'Off-the-shelf ERPs make you change how you work to fit the software. We do the opposite, so the system fits from day one.' },
        { title: 'You own it', body: "Your system, your data, your platform. No lock-in to a tool you can't change, no per-seat tax on growing your team." },
        { title: 'Private by design', body: "Your knowledge and operations stay yours. We build with privacy and control from the start, so your data isn't quietly feeding someone else's product." },
        { title: 'AI that does the work', body: 'We do not add AI for the sake of it. Agents go where they remove real effort: the re-entry, the chasing, the switching between tools.' },
      ],
    },
    audience: {
      title: 'Who AIOS is for',
      body: 'AIOS is the most ambitious thing we build. It is worth it once you are past patching tools together and ready for one system to run the company.',
      fits: [
        'Companies drowning in disconnected tools and daily re-entry',
        'Teams scaling operations who need a single source of truth',
        'Leaders who want the whole business to run on one system',
        'Owners ready to build the right foundation, not bolt on another patch',
      ],
      notFor: [
        'Very small teams still well served by a couple of apps',
        'Anyone happy with off-the-shelf software exactly as it is',
        'Teams unwilling to change how they work to run on one system',
      ],
    },
    faq: [
      { q: 'How long does it take to build?', a: 'It depends on how much we are replacing and how complex your operations are. We do not build it all at once: we start with the part that hurts most, get it live, and expand from there, so you see value early. You get a real timeline after the strategy call and operations mapping.' },
      { q: 'Do we own the system, or are we locked into you?', a: 'You own it: the system, your data, and the platform it runs on. No per-seat lock-in, no vendor you cannot leave. We stay involved because clients want us to, not because you are trapped.' },
      { q: 'Is our data secure and private?', a: "Yes. We build with privacy and control in mind, your knowledge and operations stay yours, and your data is not used to train or feed anyone else's product. Before we build, we walk you through exactly where your data lives and who can access it." },
      { q: 'We already have a CRM and tools we like. Do we throw them out?', a: 'Not blindly. In the mapping phase we decide together what AIOS replaces and what is worth keeping and connecting. If a tool genuinely serves you, we connect to it instead of rebuilding it.' },
      { q: 'What if our team resists a new system?', a: 'That is exactly why rollout and training are part of the build, not an afterthought. We start with the workflow that removes the most daily pain, so people feel the benefit fast, and we stay with you through adoption. A system nobody uses is not worth building.' },
      { q: 'How do we get started?', a: 'Book a strategy call. We talk through how your business runs today and whether AIOS is the right fit, before any commitment. If it is not right for you yet, we will tell you straight.' },
    ],
    finalCta: {
      title: "Stop running your company on tools that don't talk to each other.",
      body: 'If your business has outgrown the patchwork, AIOS gives it one system to run on, built around how you work and owned by you. Let us map what it would replace.',
      button: 'Book a strategy call',
      reassurance: 'A 30-minute call. No pitch, no obligation, just a straight answer on whether this is the right fit. We usually reply within a day.',
    },
  },
  'ai-consulting': {
    slug: 'ai-consulting',
    name: 'AI Consulting',
    hero: {
      eyebrow: 'AI Consulting & Flows',
      headline: 'Know exactly where AI pays off before you spend a cent building it.',
      subhead: 'We learn how your team works, find where AI earns its place, and hand you a ranked roadmap with pilots that prove value first.',
      primaryCta: 'Book a strategy call',
      secondaryCta: 'Contact us',
    },
    intro: {
      statement: 'Most AI spend fails because it starts with a tool instead of a problem. We start with how you actually work, then find where AI earns its keep.',
      chips: ['Plan first', 'Honest ROI', 'You own it'],
    },
    reveal:
      'AI advice is easy to give, and usually worthless. Anyone can tell you to do something with AI. What is hard is knowing what actually pays off for your business, and you only know that once you have seen up close how it works. So that is where we start. Not a list of trends, but a direction that fits how you really operate.',
    problem: {
      title: "You feel the pressure to do something with AI. You just don't know where to start.",
      intro: 'Most founders we talk to are in the same spot: the expectation is loud, the path is silent.',
      points: [
        { title: 'Pressure with no direction', body: 'Everyone says you should be using AI, but nobody tells you where it fits in your business. So you sit on it, or you guess and hope.' },
        { title: 'Afraid of betting on the wrong thing', body: 'A real AI build is real money, and committing before you know it is the right move is how good companies waste a quarter and lose trust internally.' },
      ],
    },
    solution: {
      title: 'We find where AI fits, prove it works, then tell you what to build.',
      body: 'This is the step before the big build. We get inside how your business runs today, find every place AI could genuinely help, and put honest numbers next to each one. Then we run small, hands-on pilots so you see real results before committing budget, and you leave with a plan you can act on, not a deck that gathers dust.',
      outcomes: [
        'Clear answers on where AI helps you, and where it does not',
        'A ranked roadmap ordered by impact, effort, and honest ROI',
        'Quick automation wins your team feels in weeks',
        'A plan in hand before you spend, so the build is the safe part',
      ],
    },
    capabilities: {
      title: "What's inside the engagement",
      intro: 'No generic frameworks. We look at your actual work, your actual tools, and your actual numbers.',
      items: [
        { title: 'Discovery and audit', body: 'We sit with you and your team to map how the work really gets done today, where time leaks, and what is quietly costing you money.' },
        { title: 'Opportunity mapping with honest ROI', body: 'Every idea gets a number and a verdict: which ones pay off, which ones do not, and why, so you fund the right ones.' },
        { title: 'Workflow and automation design', body: 'We design the flows end to end, so it is clear how the work changes, who touches what, and where the time comes back.' },
        { title: 'Build vs buy calls', body: 'For each opportunity we tell you straight: use an existing tool, or build something custom. No bias toward selling you a build.' },
        { title: 'A ranked roadmap', body: 'Everything lands in one ordered plan, sequenced by impact and effort, that any team could pick up and act on tomorrow.' },
        { title: 'Hands-on pilots', body: 'We do not just recommend. We stand up small working pilots so you see the result with your own eyes before committing real budget.' },
      ],
    },
    process: {
      title: 'How we work',
      steps: [
        { label: '01', title: 'We listen first', body: 'We learn your business from the inside: how the team works, where it hurts, and what good would actually look like.' },
        { label: '02', title: 'We map and prove', body: 'We find every real opportunity, put honest ROI next to each, and run quick pilots so the strongest ones are tested, not just theorized.' },
        { label: '03', title: 'We hand you the plan', body: 'You get a ranked roadmap with clear build vs buy calls, yours to act on with us or without us.' },
        { label: '04', title: 'We stay with you', body: 'When you are ready to build, the same people who wrote the plan can build it, so nothing gets lost in translation.' },
      ],
    },
    differentiators: {
      title: 'Why a builder, not a consultancy',
      items: [
        { title: 'We build, so the plan is buildable', body: 'Our roadmaps come from people who ship real systems. Nothing in your plan is a slide that cannot survive contact with reality.' },
        { title: 'We have no tool to sell you', body: 'Our build vs buy calls are honest because we do not win when you over-build. If an off-the-shelf tool is the right answer, we say so.' },
        { title: 'Proof before spend', body: 'We would rather show you a working pilot than promise an outcome. You commit budget once you have seen it work, not before.' },
        { title: 'Clarity over jargon', body: 'You will understand every recommendation and the reason behind it, in plain language. No black boxes, no buzzwords.' },
      ],
    },
    audience: {
      title: 'Who this is for',
      body: 'This is the right starting point when the destination is not clear yet and you want a plan before you bet.',
      fits: [
        'Leaders who know AI matters but are not sure where to start',
        'Teams burned by AI hype who want a clear-eyed second opinion',
        'Companies that want a real plan and honest ROI before they invest',
        'Founders who would rather prove value small than gamble on a big build',
      ],
      notFor: [
        'People who already know exactly what to build (you want App Design or AIOS, and we will point you there)',
        'Anyone chasing AI as a buzzword rather than a real result',
      ],
    },
    faq: [
      { q: 'How long does this take?', a: 'Most engagements run a few weeks from first conversation to roadmap, with early pilots inside that window. We scope it on the strategy call once we understand your situation, and we do not pad it.' },
      { q: 'Do we own what you produce?', a: 'Yes. The audit, the roadmap, the pilots, all of it is yours. You can act on it with us, with another team, or in-house, with no lock-in built into the plan.' },
      { q: 'How do you handle our data and security?', a: 'We treat your data as yours. We only access what we need to do the work, we are explicit about where anything runs, and if privacy is critical we design around keeping things on your own infrastructure.' },
      { q: 'We already have some AI tools in place. Is this still worth it?', a: 'Often more so. Part of the audit is judging what is already working, what is quietly failing, and what to keep, drop, or replace, so you stop paying for things that do not stick.' },
      { q: "What if the honest answer is that AI doesn't help us much?", a: "Then we tell you, plainly. Knowing where AI does not fit saves you more than another vendor's roadmap ever will. That is a real outcome, not a failed engagement." },
      { q: 'How do we get started?', a: 'Book a strategy call. We talk through where you are and give you a straight answer on whether this is the right fit. We usually reply within a day.' },
    ],
    finalCta: {
      title: 'Get a plan before you spend.',
      body: 'Bring us the pressure and the uncertainty. We will come back with clarity on where AI fits, what it is worth, and what to do first.',
      button: 'Book a strategy call',
      reassurance: 'A 30-minute call. No pitch, no obligation, just a straight answer on whether this is the right fit. We usually reply within a day.',
    },
  },
}

/**
 * Dutch service copy. Professional, neutral Standard Dutch for BE + NL,
 * addresses the reader formally as "u/uw", calm and confident, faithful to the
 * English meaning without translating word for word. Brand names stay as-is.
 */
export const SERVICE_CONTENT_NL: Record<ServiceSlug, ServiceContent> = {
  'app-design': {
    slug: 'app-design',
    name: 'App Design',
    hero: {
      eyebrow: 'App Design & Ontwikkeling',
      headline: 'De app die u voor ogen hebt Echt gebouwd helemaal van u',
      subhead: 'Consumenten-apps, zakelijke tools, en alles wat verder gaat dan een standaardoplossing. Gebouwd in uw merk, in uw bezit.',
      primaryCta: 'Boek een strategiegesprek',
      secondaryCta: 'Neem contact op',
    },
    intro: {
      statement: 'Een app is alleen het bouwen waard als hij het gebruiken waard is. We ontwerpen hem zoals het hoort, bouwen hem om te blijven, en laten hem aanvoelen alsof hij gemaakt is voor de mensen die hij bedient.',
      chips: ['Eigenaar van het product', 'Elk platform', 'Geen templates'],
    },
    reveal:
      'Een app láten maken kan iedereen. Een app die meegroeit en die u over een jaar nog rustig kunt uitbreiden, dat is waar het echte werk zit. In de keuzes die u niet ziet en de basis eronder. Daar bouwen wij voor.',
    problem: {
      title: 'Uw app-idee verdient beter dan de shortcuts',
      intro: 'De meeste app-ideeën stranden bij het bouwen, niet omdat het idee verkeerd is, maar omdat een concept omzetten in een product waar mensen van houden moeilijker is dan het lijkt.',
      points: [
        { title: 'De snelle routes lopen tegen een plafond aan', body: 'Templates en snelle tools zetten razendsnel iets in elkaar. Maar de uitzonderingsgevallen, de afwerking en de architectuur die overeind blijft wanneer echte gebruikers komen vragen nog altijd echt vakwerk, en precies in die kloof sterven de meeste ideeën een stille dood.' },
        { title: 'Een template laat u op iedereen lijken', body: 'Als uw app aanvoelt als een SaaS-template met nieuwe kleuren, voelen gebruikers dat. De apps die mensen elke dag openen hebben hun eigen look en gevoel, ontworpen, niet samengesteld.' },
      ],
    },
    solution: {
      title: 'Een echt product, ontworpen vanaf de grond',
      body: 'We ontwerpen en bouwen het volledige product: consumenten-apps, zakelijke tools, interne apps, alles wat te complex is voor een shortcut. We beginnen bij het idee en de mensen die het bedient, ontwerpen de interface in uw merk, en bouwen op fundamenten die overeind blijven terwijl u groeit. U houdt er iets echts aan over, geen prototype.',
      outcomes: [
        'Een app gemaakt voor uw gebruikers, niet uit onderdelen samengesteld',
        'Een product dat volledig van u is: code, ontwerp, data',
        'Fundamenten die overeind blijven wanneer gebruikers en complexiteit komen',
        'Gelanceerd, in gebruik, en het waard om elke dag te openen',
      ],
    },
    capabilities: {
      title: 'Wat we bouwen',
      intro: 'Van een eerste schermidee tot een product dat mensen elke dag openen. Consumenten-apps, zakelijke tools, en alles daartussenin.',
      items: [
        { title: 'Consumenten-apps', body: 'U hebt een app-idee dat het bouwen waard is. Wij brengen het van concept naar een product dat echte gebruikers downloaden, gebruiken en waar ze naar terugkeren.' },
        { title: 'Zakelijke tools en interne apps', body: 'De tool die past bij hoe uw team werkt bestaat nog niet, dus bouwen wij hem. Uw proces stuurt het ontwerp, niet het draaiboek van iemand anders.' },
        { title: 'Merk en visuele identiteit', body: 'Van het icoon tot de laatste interactie, een visuele taal die uw gebruikers meteen herkennen. Ontworpen in uw merk, niet een template die iedereen kan huren.' },
        { title: 'Complexe builds', body: 'Wanneer het idee te gelaagd is voor een snelle tool of te verfijnd voor een template, nemen wij het aan. Full-stack, degelijke architectuur, gebouwd voor echt gebruik en echte schaal.' },
        { title: 'AI waar het zijn plek verdient', body: 'We voegen AI alleen toe waar het echt tijd bespaart of echte waarde creëert voor gebruikers. Nooit omwille van zichzelf.' },
        { title: 'Lanceren en groeien', body: 'We lanceren het, kijken hoe het gebruikt wordt, en verfijnen. Een product dat op dag één gebruikers wint, bouwt tegen dag negentig loyaliteit op.' },
      ],
    },
    process: {
      title: 'Hoe we werken',
      steps: [
        { label: '01', title: 'We luisteren eerst', body: 'We gaan met u samenzitten om het idee te begrijpen, voor wie het is, en wat het moet doen, zodat er niets gebouwd wordt op een verkeerde aanname.' },
        { label: '02', title: 'We ontwerpen wat past', body: 'We brengen de flows in kaart, ontwerpen de interface in uw merk, en spreken precies af wat de eerste versie doet, zonder black box.' },
        { label: '03', title: 'We bouwen het goed', body: 'Een full-stack build op zuivere fundamenten, gekoppeld aan uw tools, met voortgang die u onderweg ziet.' },
        { label: '04', title: 'We blijven aan uw zijde', body: 'We lanceren, kijken hoe het gebruikt wordt, en blijven het verbeteren, u krijgt geen zip-bestand in de hand gedrukt om er alleen voor te staan.' },
      ],
    },
    differentiators: {
      title: 'Waarom met ons bouwen',
      items: [
        { title: 'Bouwers, geen bureau', body: 'We ontwerpen en schrijven de code zelf. U praat met de mensen die uw product bouwen, niet met een accountmanager die berichten doorgeeft.' },
        { title: 'Het idee stuurt het ontwerp', body: 'We persen uw app niet in een template. We leren wat het moet zijn en voor wie het is, en ontwerpen daaromheen.' },
        { title: 'Alles is van u', body: 'De code, de ontwerpbestanden, de data, allemaal van u. Geen lock-in, geen licentiekost, geen afhankelijkheid van ons om het draaiend te houden.' },
        { title: 'We bouwen wat anderen niet gelanceerd krijgen', body: 'De ideeën die te complex zijn voor een snelle tool, te verfijnd voor een template, of te ambitieus voor een shortcut. Daar zijn wij net voor.' },
      ],
    },
    audience: {
      title: 'Is dit de juiste match?',
      body: 'We bouwen voor oprichters met app-ideeën en teams die de juiste tool nodig hebben. Dit is voor wie het past, en voor wie niet.',
      fits: [
        'Oprichters die hun app-idee de eerste keer goed gebouwd willen',
        'Teams waarvan het proces spreadsheets en generieke SaaS ontgroeid is',
        'Iedereen die tegen het plafond van een template of een snelle route aanliep',
        'Eigenaars die hun product willen bezitten, niet iets huren dat bijna werkt',
      ],
      notFor: [
        'Wie op zoek is naar een goedkope kloon of een snelle template',
        '"Bouw het tegen volgende week" zonder ruimte voor ontwerp of ontdekking',
        'Wegwerpprototypes zonder een echt plan erachter',
      ],
    },
    faq: [
      { q: 'Hoe lang duurt het?', a: 'Dat hangt af van de scope. Een gerichte interne tool is een kwestie van weken; een volwaardig consumentenproduct duurt langer. Na ons eerste gesprek krijgt u een eerlijke timing voor uw build, geen getal uit de lucht gegrepen.' },
      { q: 'Wat kost het?', a: 'De prijs hangt af van de scope, niet van een vast pakket. Zodra we begrijpen wat u nodig hebt, krijgt u een helder bedrag en wat het dekt, voordat u zich vastlegt. Geen verrassingsfacturen achteraf.' },
      { q: 'Bezit ik de code en het ontwerp?', a: 'Ja. De code, de ontwerpbestanden en de data zijn van u, zonder lock-in. Als u het ooit in eigen huis wilt halen of ergens anders naartoe wilt verhuizen, kan dat.' },
      { q: 'Bouwen jullie consumenten-apps, niet alleen zakelijke tools?', a: 'Ja, dat is een groot deel van wat we doen. Als u een app-idee hebt en het wilt omzetten in een echt product waar mensen graag mee werken, is dat precies het juiste gesprek om met ons te voeren.' },
      { q: 'We gebruiken al enkele tools, vervangt dit die?', a: 'Niet noodzakelijk. We integreren met wat werkt en vervangen alleen wat u tegenhoudt. Het doel is één product dat in uw workflow past, niet nog een losstaand systeem.' },
      { q: 'Hoe gaan we van start?', a: 'Boek een strategiegesprek. We overlopen uw idee en uw situatie, en geven u een eerlijk antwoord over of dit de juiste match is en wat het zou vergen.' },
    ],
    finalCta: {
      title: 'De app die u voor ogen hebt is dichterbij dan hij lijkt.',
      body: 'Breng ons het idee. We tonen u wat er nodig is om het goed te bouwen, en of wij het juiste team zijn om het te doen.',
      button: 'Boek een strategiegesprek',
      reassurance: 'Een gesprek van 30 minuten. Geen verkooppraatje, geen verplichting, gewoon een eerlijk antwoord over wat het zou vergen. We reageren meestal binnen een dag.',
    },
  },
  'local-ai': {
    slug: 'local-ai',
    name: 'Local AI',
    hero: {
      eyebrow: 'Private AI-installatie',
      headline: 'Dezelfde AI-kracht, draaiend binnen uw eigen muren.',
      subhead: 'Krachtige open modellen, geïnstalleerd op hardware die u beheert. Echte AI voor uw team, met vertrouwelijke data die nooit het gebouw verlaat.',
      primaryCta: 'Boek een strategiegesprek',
      secondaryCta: 'Neem contact op',
    },
    intro: {
      statement: 'Voor bedrijven die echte AI-kracht nodig hebben maar hun data niet in de cloud van iemand anders kunnen zetten. Wij bouwen de versie die u beide geeft.',
      chips: ['Uw hardware', 'Geen cloudblootstelling', 'Volledig in eigen bezit'],
    },
    reveal:
      'Elke prompt die uw team naar een cloudmodel stuurt, verlaat uw gebouw. Wij bouwen de versie die binnen blijft.',
    problem: {
      title: 'U hebt AI nodig. Over uw data valt niet te onderhandelen.',
      intro: 'De teams die AI het hardst nodig hebben, zijn vaak degene die de makkelijke tools niet kunnen gebruiken, en daar is een structurele reden voor.',
      points: [
        {
          title: 'Elke cloudprompt verlaat uw gebouw',
          body: 'Contracten, klantgegevens, financiële modellen, broncode: op het moment dat het in ChatGPT terechtkomt, heeft het uw controle verlaten. Daar bent u in de voorwaarden mee akkoord gegaan, en de meeste bedrijven staan er pas bij stil als er iets misgaat.',
        },
        {
          title: 'U kunt niet bewijzen waar de data heen ging',
          body: '"We hebben een AI gebruikt" houdt niet stand in een audit of een klantgesprek. "Het draait op onze eigen servers, er verlaat niets onze perimeter" wel, en cloud-AI maakt dat eerlijke antwoord onmogelijk.',
        },
      ],
    },
    solution: {
      title: 'Private AI, geïnstalleerd op hardware die u beheert.',
      body: 'We zetten krachtige AI-modellen op binnen uw omgeving, op uw eigen servers of dedicated hardware die wij voor u beheren. Het systeem redeneert over uw documenten, en elke prompt blijft in het gebouw: geen publieke API in de keten, geen data die uw perimeter verlaat. U krijgt echte kracht met privacy die standhoudt onder echte controle.',
      outcomes: [
        'AI op infrastructuur die u beheert, geen cloud-API in de keten',
        'Elke prompt en elk antwoord blijft binnen uw perimeter',
        'Een private assistent die over uw eigen documenten redeneert',
        'Geen facturatie per gebruiker, geen lock-in, geen onbetrouwbare API',
      ],
    },
    capabilities: {
      title: 'Wat we installeren',
      intro: 'Een volledige private AI-opstelling, van infrastructuuranalyse tot een assistent die uw team elke dag opent.',
      items: [
        {
          title: 'Infrastructuuranalyse',
          body: 'We bekijken wat u hebt en wat u nodig zou hebben, en geven u een eerlijk antwoord over draaien op uw bestaande servers of op dedicated hardware die wij beheren, voordat er werk begint.',
        },
        {
          title: 'Modelselectie en uitrol',
          body: 'We kiezen de juiste open modellen voor uw werk: krachtig genoeg voor serieuze taken, op maat van uw hardware, gehost binnen uw eigen perimeter.',
        },
        {
          title: 'Veilige configuratie',
          body: 'Het systeem draait vanaf de eerste dag binnen uw perimeter. Data blijft in eigen huis, niet omdat we het beloven, maar omdat de architectuur het nergens anders heen laat gaan.',
        },
        {
          title: 'Een private assistent over uw eigen documenten',
          body: 'Uw team stelt vragen en krijgt antwoorden die gegrond zijn in uw contracten, gegevens, codebase of kennisbank. Er gaat niets naar buiten om te antwoorden.',
        },
        {
          title: 'Toegangsbeheer en audit trail',
          body: 'Wie het mag gebruiken, wat ze kunnen bereiken, en een volledig logboek van wat er gebeurd is, de controles en het spoor die uw complianceteam nodig heeft om goed te keuren.',
        },
        {
          title: 'Doorlopend onderhoud',
          body: 'Modellen worden beter en dreigingen veranderen. We houden uw systeem up-to-date en draaiend, zodat private AI een troef blijft, geen project dat u moet babysitten.',
        },
      ],
    },
    process: {
      title: 'Hoe we werken',
      steps: [
        {
          label: '01',
          title: 'We luisteren eerst',
          body: 'We brengen uw data, uw complianceverplichtingen en wat u AI echt wilt laten doen in kaart, zodat we de grenzen kennen die u niet mag overschrijden.',
        },
        {
          label: '02',
          title: 'We ontwerpen wat past',
          body: 'We kiezen de modellen, de hosting en de architectuur voor uw situatie, en tonen u precies hoe data binnen blijft voordat we bouwen.',
        },
        {
          label: '03',
          title: 'We bouwen en rollen uit',
          body: 'We installeren het systeem in uw omgeving, koppelen het aan uw documenten, zetten toegangsbeheer en auditing op, en testen het tegen echt werk.',
        },
        {
          label: '04',
          title: 'We blijven aan uw zijde',
          body: 'We dragen een systeem over dat van u is, en houden het onderhouden en up-to-date naarmate uw behoeften groeien, zonder u terug naar de cloud te trekken.',
        },
      ],
    },
    differentiators: {
      title: 'Waarom een bouwer, geen leverancier',
      items: [
        {
          title: 'U bezit het systeem volledig',
          body: 'Wanneer we klaar zijn, draait de AI op uw infrastructuur onder uw beheer. Geen teller per gebruiker, geen knop die een leverancier kan omzetten om uw voorwaarden te wijzigen.',
        },
        {
          title: 'Privacy die standhoudt onder controle',
          body: 'We bouwen de architectuur zo dat de data echt niet weg kan, een sterkere belofte dan beloven het niet te gebruiken. Uw auditors en klanten verdienen die versie.',
        },
        {
          title: 'Gebouwd rond uw specifieke grenzen',
          body: 'Elke sector heeft andere verplichtingen en ander vertrouwelijk materiaal. We ontwerpen de uitrol rond wat u echt niet mag blootgeven, niet rond een generieke template.',
        },
        {
          title: 'We blijven na de lancering',
          body: 'Private AI vraagt onderhoud naarmate modellen en dreigingen evolueren. We houden uw systeem actueel zodat u de kracht behoudt zonder de last om het alleen draaiende te houden.',
        },
      ],
    },
    audience: {
      title: 'Voor wie dit gebouwd is',
      body: 'Local AI is de juiste match wanneer data in eigen huis houden geen optie maar een vereiste is. Als dat uw situatie is, is dit daar precies voor gebouwd; zo niet, dan zeggen we het u eerlijk.',
      fits: [
        'Gereguleerde sectoren waar dataverwerking niet onderhandelbaar is: juridisch, medisch, financiële diensten',
        'Bedrijven waarvan de broncode, IP of onderzoek niet naar een extern model mag',
        'Teams die precies moeten kunnen antwoorden waar hun data heen ging, voor auditors of klanten',
        'Bedrijven die hun AI-kracht willen bezitten, niet per gebruiker huren',
      ],
      notFor: [
        'Teams zonder gevoelige data, tevreden met cloud-SaaS zoals het is',
        'Bedrijven die gewoon de goedkoopste weg willen, waar de data ook heen gaat',
        'Wie op zoek is naar een snel abonnement zonder echte opzet',
      ],
    },
    faq: [
      {
        q: 'Hoe lang duurt de uitrol?',
        a: 'Dat hangt af van uw infrastructuur en hoeveel van uw documentenbibliotheek de assistent moet lezen. Een gerichte eerste uitrol is doorgaans een kwestie van weken. U krijgt een echte timing na de analyse, voordat er werk begint.',
      },
      {
        q: 'Bezitten we het echt, of zitten we aan jullie vast?',
        a: 'U bezit het. Het systeem draait op infrastructuur die u beheert. We blijven betrokken voor onderhoud omdat klanten dat nuttig vinden, niet omdat u niet weg kunt.',
      },
      {
        q: 'Hoe privé is het echt?',
        a: 'Er gaat niets naar OpenAI of welk publiek cloudmodel dan ook. De modellen draaien binnen uw omgeving, elke prompt en elk antwoord blijft achter uw eigen muren, en het toegangsbeheer en de audit trail tonen precies wie wat wanneer raadpleegde.',
      },
      {
        q: 'We gebruiken al ChatGPT. Waarom veranderen?',
        a: 'Als uw data niet gevoelig is, hoeft het misschien niet. Maar als uw team vertrouwelijk materiaal plakt in een tool die u niet beheert, draagt u een risico dat de meeste bedrijven onderschatten. Dit geeft u dezelfde kracht zonder de blootstelling.',
      },
      {
        q: 'Hebben we onze eigen servers nodig?',
        a: 'Nee. We kunnen uitrollen op uw bestaande hardware, of op dedicated infrastructuur die wij voor u beheren. Hoe dan ook, wij nemen de technische kant op ons en geven u een systeem dat gewoon werkt.',
      },
      {
        q: 'Hoe krachtig zijn zelf-gehoste modellen vergeleken met cloud-AI?',
        a: 'Sterk genoeg voor serieus zakelijk werk: documentanalyse, teksten opstellen, interne Q&A, classificatie, onderzoek. We stemmen het model af op uw echte taken en hardware, zodat wat u krijgt echt nuttig is.',
      },
    ],
    finalCta: {
      title: 'Echte AI, zonder uw data op te geven.',
      body: 'Als uw bedrijf geen vertrouwelijke informatie naar de cloud kan sturen, hoeft u niet achterop te raken. Laat ons naar uw opstelling kijken en de private AI vinden die past.',
      button: 'Boek een strategiegesprek',
      reassurance: 'Een gesprek van 30 minuten. Geen verkooppraatje, geen verplichting, gewoon een eerlijk antwoord over of dit de juiste match is. We reageren meestal binnen een dag.',
    },
  },
  aios: {
    slug: 'aios',
    name: 'AIOS',
    hero: {
      eyebrow: 'AIOS, uw AI-besturingssysteem',
      headline: 'Eén systeem om uw hele bedrijf op te draaien, met AI die het werk erin doet.',
      subhead: 'Eén systeem op maat, gebouwd rond hoe u werkt. CRM, projecten, operations en kennis verbonden, met AI die er het werk in doet.',
      primaryCta: 'Boek een strategiegesprek',
      secondaryCta: 'Neem contact op',
    },
    intro: {
      statement: 'Eén brein voor uw bedrijf. Gevormd rond hoe u werkt, niet een template waar u uzelf in moet wringen.',
      chips: ['U bezit het', 'Privé vanaf het ontwerp', 'Eén bron van waarheid'],
    },
    reveal:
      'Al uw tools op één plek, in plaats van overal apart. U bent minder tijd kwijt aan het draaiend houden, en houdt meer over voor wat er echt toe doet.',
    problem: {
      title: 'Uw bedrijf draait op een kluwen van tools die niet met elkaar praten',
      intro: 'Het groeide één app per keer, elk apart logisch, en samen kosten ze uw team elke dag uren.',
      points: [
        { title: 'U voert steeds opnieuw hetzelfde in', body: 'Een nieuwe klant komt in de CRM terecht, wordt dan gekopieerd naar een spreadsheet, een projectbord en een factuur. Elke kopie is een kans om het fout te doen, en iemand doet dat altijd.' },
        { title: 'Niemand weet welk cijfer klopt', body: 'Twee tools tonen twee totalen en niemand vertrouwt er een. U beslist uiteindelijk op cijfers die u maar half gelooft, omdat uw tools het nooit eens zijn over het echte plaatje.' },
      ],
    },
    solution: {
      title: 'Eén systeem, gebouwd rond hoe u echt werkt',
      body: 'AIOS vervangt de wirwar van losstaande tools door één systeem dat gevormd is naar uw operations. We brengen in kaart hoe uw bedrijf werkt, en bouwen dan één datamodel en modules op maat voor uw CRM, projecten, operations en kennis, allemaal onderhuids verbonden. Daarbovenop handelen AI-agents over uw workflows heen, in plaats van te wachten tot iemand tussen apps klikt.',
      outcomes: [
        'Eén systeem in plaats van vele, uw team werkt op één plek',
        'Voer data één keer in, het klopt overal',
        'AI die echt werk doet over uw operations heen, geen chatbot in een hoekje',
        'Eén bron van waarheid, zodat elk cijfer klopt',
      ],
    },
    capabilities: {
      title: 'Wat we in uw AIOS bouwen',
      intro: 'Geen stapel plug-ins. Eén systeem, van begin tot eind ontworpen rond de manier waarop uw bedrijf werkt.',
      items: [
        { title: 'Operations in kaart brengen', body: 'We beginnen met leren hoe uw bedrijf echt draait: elke workflow, elke overdracht, elke plek waar data opnieuw wordt ingevoerd. Het systeem wordt daarop gebouwd, niet op een generieke template.' },
        { title: 'Eén datamodel eronder', body: 'Een klant, een project, een taak betekent overal hetzelfde. Voer het één keer in en het blijft synchroon, niets dubbel getypt, niets dat verouderd raakt.' },
        { title: 'Modules op maat van hoe u werkt', body: 'CRM, projecten, operations en kennis, gebouwd om bij uw proces te passen, niet bij iemands idee daarover. Geen functies die u nooit opent.' },
        { title: 'AI-agents die over workflows heen handelen', body: 'Agents die opstellen, bijwerken, routeren en opvolgen tussen uw modules, die het echte werk doen, niet alleen vragen beantwoorden in een vakje.' },
        { title: 'Dashboards die u kunt vertrouwen', body: 'Het echte beeld van uw bedrijf in één overzicht, getrokken uit één bron van waarheid. De cijfers kloppen omdat ze allemaal van dezelfde plek komen.' },
        { title: 'Uitrol en teamtraining', body: 'We installeren het, brengen uw data binnen, en trainen uw team zodat ze het ook echt gebruiken, en blijven na de lancering aan uw zijde terwijl het bedrijf verandert.' },
      ],
    },
    process: {
      title: 'Hoe we het samen met u bouwen',
      steps: [
        { label: '01', title: 'We luisteren eerst', body: 'We gaan samen met u en uw team zitten om in kaart te brengen hoe het bedrijf vandaag draait, de tools, de workflows, de plekken die pijn doen, voordat er iets gebouwd wordt.' },
        { label: '02', title: 'We ontwerpen het systeem', body: 'We vormen het datamodel en de modules rond uw operations en spreken af wat AIOS vervangt en in welke volgorde, zodat u het plan ziet voordat er een regel gebouwd is.' },
        { label: '03', title: 'We bouwen wat past', body: 'We bouwen uw modules, automatisering en AI-agents, migreren uw data, en beginnen met het deel dat het meest pijn doet zodat u de waarde vroeg voelt.' },
        { label: '04', title: 'We blijven aan uw zijde', body: 'We rollen het uit, trainen uw team, en blijven het systeem verfijnen terwijl u groeit, zodat AIOS bij het bedrijf blijft passen terwijl het verandert.' },
      ],
    },
    differentiators: {
      title: 'Waarom werken met ons',
      items: [
        { title: 'Gebouwd rond u, geen template', body: 'Kant-en-klare ERP-systemen laten u veranderen hoe u werkt om in de software te passen. Wij doen het omgekeerde, zodat het systeem vanaf dag één past.' },
        { title: 'U bezit het', body: 'Uw systeem, uw data, uw platform. Geen lock-in aan een tool die u niet kunt veranderen, geen taks per gebruiker als uw team groeit.' },
        { title: 'Privé vanaf het ontwerp', body: 'Uw kennis en operations blijven van u. We bouwen met privacy en controle vanaf de start, zodat uw data niet stilletjes het product van iemand anders voedt.' },
        { title: 'AI die het werk doet', body: 'We voegen geen AI toe omwille van zichzelf. Agents gaan waar ze echte moeite wegnemen: het opnieuw invoeren, het achternazitten, het schakelen tussen tools.' },
      ],
    },
    audience: {
      title: 'Voor wie AIOS is',
      body: 'AIOS is het meest ambitieuze dat we bouwen. Het is de moeite waard zodra u voorbij het aan elkaar lappen van tools bent en klaar voor één systeem om het bedrijf op te draaien.',
      fits: [
        'Bedrijven die verzuipen in losstaande tools en dagelijks overtypen',
        'Teams die hun operations opschalen en één bron van waarheid nodig hebben',
        'Leiders die willen dat het hele bedrijf op één systeem draait',
        'Eigenaars die klaar zijn om het juiste fundament te bouwen, niet er nog een lapmiddel op te schroeven',
      ],
      notFor: [
        'Heel kleine teams die nog prima geholpen zijn met een paar apps',
        'Wie tevreden is met kant-en-klare software precies zoals ze is',
        'Teams die niet bereid zijn te veranderen hoe ze werken om op één systeem te draaien',
      ],
    },
    faq: [
      { q: 'Hoe lang duurt het om te bouwen?', a: 'Dat hangt af van hoeveel we vervangen en hoe complex uw operations zijn. We bouwen het niet in één keer: we beginnen met het deel dat het meest pijn doet, krijgen het live, en breiden van daaruit uit, zodat u vroeg waarde ziet. U krijgt een echte timing na het strategiegesprek en het in kaart brengen van uw operations.' },
      { q: 'Bezitten we het systeem, of zitten we aan jullie vast?', a: 'U bezit het: het systeem, uw data, en het platform waarop het draait. Geen lock-in per gebruiker, geen leverancier waar u niet weg kunt. We blijven betrokken omdat klanten dat willen, niet omdat u vastzit.' },
      { q: 'Is onze data veilig en privé?', a: 'Ja. We bouwen met privacy en controle in gedachten, uw kennis en operations blijven van u, en uw data wordt niet gebruikt om het product van iemand anders te trainen of te voeden. Voordat we bouwen, overlopen we precies waar uw data leeft en wie er toegang toe heeft.' },
      { q: 'We hebben al een CRM en tools die we graag gebruiken. Gooien we die weg?', a: 'Niet blindelings. In de fase van in kaart brengen beslissen we samen wat AIOS vervangt en wat de moeite waard is om te houden en te koppelen. Als een tool u echt van dienst is, koppelen we eraan in plaats van hem te herbouwen.' },
      { q: 'Wat als ons team weerstand biedt tegen een nieuw systeem?', a: 'Net daarom maken uitrol en training deel uit van de build, geen bijzaak achteraf. We beginnen met de workflow die de meeste dagelijkse pijn wegneemt, zodat mensen het voordeel snel voelen, en we blijven aan uw zijde tijdens de adoptie. Een systeem dat niemand gebruikt is het bouwen niet waard.' },
      { q: 'Hoe gaan we van start?', a: 'Boek een strategiegesprek. We overlopen hoe uw bedrijf vandaag draait en of AIOS de juiste match is, voordat u zich vastlegt. Als het nog niet juist is voor u, zeggen we het rechtuit.' },
    ],
    finalCta: {
      title: 'Stop met uw bedrijf draaien op tools die niet met elkaar praten.',
      body: 'Als uw bedrijf het lappendeken ontgroeid is, geeft AIOS het één systeem om op te draaien, gebouwd rond hoe u werkt en in uw bezit. Laten we in kaart brengen wat het zou vervangen.',
      button: 'Boek een strategiegesprek',
      reassurance: 'Een gesprek van 30 minuten. Geen verkooppraatje, geen verplichting, gewoon een eerlijk antwoord over of dit de juiste match is. We reageren meestal binnen een dag.',
    },
  },
  'ai-consulting': {
    slug: 'ai-consulting',
    name: 'AI Consulting',
    hero: {
      eyebrow: 'AI Consulting & Flows',
      headline: 'Weet precies waar AI loont voordat u er één cent aan bouwt.',
      subhead: 'We leren hoe uw team werkt, vinden waar AI zijn plek verdient, en geven u een geprioriteerde roadmap met pilots die eerst de waarde bewijzen.',
      primaryCta: 'Boek een strategiegesprek',
      secondaryCta: 'Neem contact op',
    },
    intro: {
      statement: 'De meeste AI-uitgaven mislukken omdat ze beginnen bij een tool in plaats van een probleem. Wij beginnen bij hoe u echt werkt, en vinden dan waar AI zijn waarde bewijst.',
      chips: ['Eerst een plan', 'Eerlijke ROI', 'U bezit het'],
    },
    reveal:
      'Advies over AI is makkelijk te geven en meestal waardeloos. Iedereen kan zeggen dat je iets met AI moet doen. Wat moeilijk is, is weten wat voor jouw bedrijf echt loont, en dat weet je pas als je van dichtbij hebt gezien hoe het werkt. Daarom beginnen wij daar. Geen lijstje met trends, maar een richting die klopt met jouw praktijk.',
    problem: {
      title: 'U voelt de druk om iets met AI te doen. U weet alleen niet waar te beginnen.',
      intro: 'De meeste oprichters met wie we praten zitten in dezelfde situatie: de verwachting is luid, het pad is stil.',
      points: [
        { title: 'Druk zonder richting', body: 'Iedereen zegt dat u AI zou moeten gebruiken, maar niemand vertelt u waar het in uw bedrijf past. Dus blijft u erop zitten, of u gokt en hoopt.' },
        { title: 'Bang om op het verkeerde te wedden', body: 'Een echte AI-build is echt geld, en uzelf vastleggen voordat u weet dat het de juiste zet is, is hoe goede bedrijven een kwartaal verspillen en intern vertrouwen verliezen.' },
      ],
    },
    solution: {
      title: 'We vinden waar AI past, bewijzen dat het werkt, en vertellen u dan wat te bouwen.',
      body: 'Dit is de stap voor de grote build. We kruipen in hoe uw bedrijf vandaag draait, vinden elke plek waar AI echt zou kunnen helpen, en zetten eerlijke cijfers naast elke ervan. Daarna draaien we kleine, hands-on pilots zodat u echte resultaten ziet voordat u budget vastlegt, en u vertrekt met een plan waar u mee aan de slag kunt, geen presentatie die stof ligt te vergaren.',
      outcomes: [
        'Heldere antwoorden over waar AI u helpt, en waar niet',
        'Een geprioriteerde roadmap, geordend op impact, inspanning en eerlijke ROI',
        'Snelle automatiseringswinsten die uw team voelt in weken',
        'Een plan in handen voordat u uitgeeft, zodat de build het veilige deel is',
      ],
    },
    capabilities: {
      title: 'Wat de samenwerking omvat',
      intro: 'Geen generieke frameworks. We kijken naar uw echte werk, uw echte tools, en uw echte cijfers.',
      items: [
        { title: 'Verkenning en audit', body: 'We gaan samen met u en uw team zitten om in kaart te brengen hoe het werk vandaag echt gebeurt, waar tijd weglekt, en wat u stilletjes geld kost.' },
        { title: 'Kansen in kaart brengen met eerlijke ROI', body: 'Elk idee krijgt een cijfer en een oordeel: welke lonen, welke niet, en waarom, zodat u de juiste financiert.' },
        { title: 'Ontwerp van workflows en automatisering', body: 'We ontwerpen de flows van begin tot eind, zodat duidelijk is hoe het werk verandert, wie wat aanraakt, en waar de tijd terugkomt.' },
        { title: 'Bouwen-of-kopen-beslissingen', body: 'Voor elke kans zeggen we u rechtuit: gebruik een bestaande tool, of bouw iets op maat. Geen voorkeur om u een build te verkopen.' },
        { title: 'Een geprioriteerde roadmap', body: 'Alles komt samen in één geordend plan, gerangschikt op impact en inspanning, dat elk team morgen zou kunnen oppakken en uitvoeren.' },
        { title: 'Hands-on pilots', body: 'We geven niet alleen advies. We zetten kleine werkende pilots op zodat u het resultaat met eigen ogen ziet voordat u echt budget vastlegt.' },
      ],
    },
    process: {
      title: 'Hoe we werken',
      steps: [
        { label: '01', title: 'We luisteren eerst', body: 'We leren uw bedrijf van binnenuit kennen: hoe het team werkt, waar het pijn doet, en hoe goed er echt zou uitzien.' },
        { label: '02', title: 'We brengen in kaart en bewijzen', body: 'We vinden elke echte kans, zetten eerlijke ROI naast elk ervan, en draaien snelle pilots zodat de sterkste getest zijn, niet alleen in theorie.' },
        { label: '03', title: 'We geven u het plan', body: 'U krijgt een geprioriteerde roadmap met heldere bouwen-of-kopen-beslissingen, van u om mee aan de slag te gaan, met ons of zonder ons.' },
        { label: '04', title: 'We blijven aan uw zijde', body: 'Wanneer u klaar bent om te bouwen, kunnen dezelfde mensen die het plan schreven het bouwen, zodat er niets verloren gaat in de vertaling.' },
      ],
    },
    differentiators: {
      title: 'Waarom een bouwer, geen consultancy',
      items: [
        { title: 'Wij bouwen, dus het plan is bouwbaar', body: 'Onze roadmaps komen van mensen die echte systemen lanceren. Niets in uw plan is een slide die het contact met de realiteit niet overleeft.' },
        { title: 'We hebben geen tool om u te verkopen', body: 'Onze bouwen-of-kopen-beslissingen zijn eerlijk omdat wij er niet bij winnen als u te veel bouwt. Als een kant-en-klare tool het juiste antwoord is, zeggen we dat.' },
        { title: 'Bewijs voor uitgave', body: 'We tonen u liever een werkende pilot dan een uitkomst te beloven. U legt budget vast nadat u het hebt zien werken, niet ervoor.' },
        { title: 'Helderheid boven jargon', body: 'U begrijpt elke aanbeveling en de reden erachter, in heldere taal. Geen black boxes, geen buzzwords.' },
      ],
    },
    audience: {
      title: 'Voor wie dit is',
      body: 'Dit is het juiste startpunt wanneer de bestemming nog niet duidelijk is en u een plan wilt voordat u inzet.',
      fits: [
        'Leiders die weten dat AI ertoe doet maar niet zeker weten waar te beginnen',
        'Teams die teleurgesteld zijn door de AI-hype en een nuchtere second opinion willen',
        'Bedrijven die een echt plan en eerlijke ROI willen voordat ze investeren',
        'Oprichters die liever klein de waarde bewijzen dan te gokken op een grote build',
      ],
      notFor: [
        'Mensen die al precies weten wat te bouwen (u wilt App Design of AIOS, en daar wijzen we u naartoe)',
        'Wie AI najaagt als buzzword in plaats van een echt resultaat',
      ],
    },
    faq: [
      { q: 'Hoe lang duurt dit?', a: 'De meeste samenwerkingen lopen enkele weken van eerste gesprek tot roadmap, met vroege pilots binnen dat venster. We bakenen het af tijdens het strategiegesprek zodra we uw situatie begrijpen, en we rekken het niet kunstmatig.' },
      { q: 'Bezitten we wat jullie maken?', a: 'Ja. De audit, de roadmap, de pilots, alles is van u. U kunt ermee aan de slag met ons, met een ander team, of in eigen huis, zonder lock-in in het plan.' },
      { q: 'Hoe gaan jullie om met onze data en beveiliging?', a: 'We behandelen uw data als de uwe. We raadplegen alleen wat we nodig hebben om het werk te doen, we zijn duidelijk over waar alles draait, en als privacy cruciaal is ontwerpen we eromheen om dingen op uw eigen infrastructuur te houden.' },
      { q: 'We hebben al enkele AI-tools draaien. Is dit dan nog de moeite?', a: 'Vaak des te meer. Een deel van de audit is beoordelen wat al werkt, wat stilletjes faalt, en wat te houden, te schrappen of te vervangen, zodat u stopt met betalen voor dingen die niet beklijven.' },
      { q: 'Wat als het eerlijke antwoord is dat AI ons niet veel helpt?', a: 'Dan zeggen we het u, rechtuit. Weten waar AI niet past, bespaart u meer dan de roadmap van nog een leverancier ooit zal doen. Dat is een echt resultaat, geen mislukte samenwerking.' },
      { q: 'Hoe gaan we van start?', a: 'Boek een strategiegesprek. We overlopen waar u staat en geven u een eerlijk antwoord over of dit de juiste match is. We reageren meestal binnen een dag.' },
    ],
    finalCta: {
      title: 'Krijg een plan voordat u uitgeeft.',
      body: 'Breng ons de druk en de onzekerheid. Wij komen terug met helderheid over waar AI past, wat het waard is, en wat eerst te doen.',
      button: 'Boek een strategiegesprek',
      reassurance: 'Een gesprek van 30 minuten. Geen verkooppraatje, geen verplichting, gewoon een eerlijk antwoord over of dit de juiste match is. We reageren meestal binnen een dag.',
    },
  },
}

/** Resolve the service copy for the active language. */
export const getServiceContent = (lang: Lang): Record<ServiceSlug, ServiceContent> =>
  lang === 'nl' ? SERVICE_CONTENT_NL : SERVICE_CONTENT_EN
