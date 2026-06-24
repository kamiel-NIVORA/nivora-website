import type { ServiceContent, ServiceSlug } from './serviceContent'

/**
 * Service landing-page copy, authored and edited for conversion, in Nivora's
 * voice: calm, direct, honest, no hype, no em-dashes. Conforms to the
 * ServiceContent contract in serviceContent.ts.
 */
export const SERVICE_CONTENT: Record<ServiceSlug, ServiceContent> = {
  'app-design': {
    slug: 'app-design',
    name: 'App Design',
    hero: {
      eyebrow: 'App Design & Development',
      headline: 'The app you have been picturing. Designed and built, from first idea to final screen.',
      subhead: 'We build consumer apps, business tools, and anything too refined or too complex for a template. In your brand, owned by you, built to last.',
      primaryCta: 'Book a strategy call',
      secondaryCta: 'Contact us',
    },
    intro: {
      statement: 'An app is only worth building if it is worth using. We design it properly, build it to last, and make it feel like it was made for the people it serves.',
      chips: ['Own the product', 'Any platform', 'No templates'],
    },
    reveal:
      'The apps people actually use were not assembled from parts. They were designed with intention, built on solid foundations, and shipped to earn their place on someone\'s screen.',
    problem: {
      title: 'Your app idea deserves better than the shortcuts',
      intro: 'Most app ideas stall at the build. Not because the idea is wrong, but because the gap between a concept and a product people love is harder to cross than it looks.',
      points: [
        { title: 'The fast routes hit a ceiling', body: "Templates and quick tools can stub something out fast. But the edge cases, the polish, the architecture that holds up when real users arrive, that part still takes real craft. And that gap is usually where good ideas quietly die." },
        { title: 'Templates make you look like everyone else', body: 'If your app feels like a SaaS template with new colours, users feel it. Premium apps have their own visual language, their own feel. The ones people open every day were designed, not assembled.' },
        { title: 'A rough prototype is not a product', body: "Something held together with workarounds is not a foundation, it is a liability. At some point you have to rebuild anyway. Starting properly costs less than starting fast and regretting it." },
      ],
    },
    solution: {
      title: 'A real product, designed from the ground up',
      body: 'We design and build apps end to end: consumer products, business tools, internal apps, and anything too complex or too refined for a shortcut. We start with the idea and the people it serves, design the interface in your brand, and build the full product on foundations that hold up. You walk away with something real.',
      outcomes: [
        'An app that feels like it was made for your users, not assembled from parts',
        'A product you own outright: code, design files, and data',
        'Clean foundations that hold up when users and complexity arrive',
        'Something shipped, in use, and worth opening every day',
      ],
    },
    capabilities: {
      title: 'What we build',
      intro: 'From your first screen idea to a product people actually open. Consumer apps, business tools, and everything in between.',
      items: [
        { title: 'Consumer apps', body: "You have an app idea that deserves to exist. We take it from concept to a product real users download, use, and come back to. Designed to earn its place on someone's screen, not just ship." },
        { title: 'Business tools and internal apps', body: "The tool that fits how your team works doesn't exist yet, so we build it. Your process drives the design, not someone else's playbook." },
        { title: 'Brand and visual identity', body: 'From the icon to the last interaction: a visual language your users recognize instantly. We design the interface in your brand, not a template anyone else could rent.' },
        { title: 'Complex builds', body: 'When the idea is too layered for a quick tool or too refined for a template, we take it on. Full-stack, proper architecture, built to survive real use and real scale.' },
        { title: 'AI where it earns its place', body: 'We add AI only where it saves real time or creates genuine value for users. Never for the sake of it, never as a feature nobody asked for.' },
        { title: 'Launch and grow', body: "We ship it, watch how it is used, and refine. A product that earns users on day one builds loyalty on day ninety." },
      ],
    },
    process: {
      title: 'How we work',
      steps: [
        { label: '01', title: 'We listen first', body: 'We sit with you to understand the idea, who it is for, and what it needs to do. We scope the real product before designing anything, so nothing gets built on a wrong assumption.' },
        { label: '02', title: 'We design what fits', body: 'We map the flows, design the interface in your brand, and agree on exactly what the first version does. You watch it take shape as we go, no black box.' },
        { label: '03', title: 'We build it properly', body: 'Full-stack build, connected to your tools and infrastructure, on clean foundations that hold up as you grow. We show progress as we go.' },
        { label: '04', title: 'We stay with you', body: "We launch, watch how it is used, and keep improving it. You are not handed a zip file and left alone." },
      ],
    },
    differentiators: {
      title: 'Why build with us',
      items: [
        { title: 'Builders, not an agency', body: 'We write the code and design the interface ourselves. You talk to the people building your product, not an account manager passing messages to a team you never meet.' },
        { title: 'The idea drives the design', body: "We don't fit your app into a template. We learn what it needs to be, who it is for, and what makes it worth using, then design around that." },
        { title: 'You own everything', body: 'The code, the design files, the data: all yours. No lock-in, no licence fee, no hidden dependency on us to keep it running. Take it anywhere, any time.' },
        { title: 'We build what others cannot ship', body: 'The ideas too complex for a quick tool, too refined for a template, or too ambitious for a shortcut. That is exactly what we are here for.' },
      ],
    },
    audience: {
      title: 'Is this the right fit?',
      body: "We build for founders with app ideas and companies that need the right tool. Here is who it is for, and who it is not.",
      fits: [
        'Founders who have a real app idea and want it built properly the first time',
        'Teams whose process has outgrown spreadsheets and generic SaaS',
        'Anyone who tried a template or a quick route and hit the ceiling',
        'Owners who want to own their product, not rent something that almost works',
      ],
      notFor: [
        'Anyone after a cheap clone or a quick template',
        '"Build it by next week" with no room for design or discovery',
        'Throwaway prototypes with no real plan behind them',
      ],
    },
    faq: [
      { q: 'How long does it take?', a: "It depends on what you are building. A focused internal tool is a matter of weeks; a full consumer product takes longer. After our first call we give you an honest timeline for your scope, not a number pulled from thin air." },
      { q: 'What does it cost?', a: "It is priced to the scope, not to a fixed package. Once we understand what you need, we give you a clear number and what it covers, before you commit. No surprise invoices later." },
      { q: 'Do I own the code and design?', a: 'Yes. The code, the design files, and the data are yours. No lock-in. If you ever want to bring it in-house or move it elsewhere, you can.' },
      { q: 'Can you build consumer apps, not just business tools?', a: "Yes, that is a big part of what we do. If you have an app idea and want it turned into a real product people love using, that is exactly the right conversation to have with us." },
      { q: 'We already use some tools, does this replace them?', a: "Not necessarily. We integrate with what is working and replace only what is holding you back. The goal is one product that fits your workflow, not another disconnected system." },
      { q: 'How do we get started?', a: "Book a strategy call. We will talk through your idea and your situation, and give you a straight answer on whether this is the right fit and what it would take." },
    ],
    finalCta: {
      title: 'The app you have been picturing is closer than it looks.',
      body: "Bring us the idea. We will show you what it takes to build it properly, and whether we are the right team to do it.",
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
      subhead: 'We install capable open models on infrastructure you control. Your team gets a powerful private assistant. Your most confidential data never leaves the building.',
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
      intro: 'The teams that need AI most are usually the ones who cannot use the easy tools. There is a structural reason for that.',
      points: [
        {
          title: 'Every prompt to a cloud model is a disclosure',
          body: 'Contracts, client records, financial models, source code. The moment it goes into ChatGPT, it has left your building. You agreed to that in the terms. Most companies do not think about it until something goes wrong.',
        },
        {
          title: 'Compliance means knowing exactly where your data went',
          body: '"We used an AI" is not an answer that holds up in an audit or a client conversation. "It runs on our own servers, nothing leaves our perimeter" is. Cloud AI makes the second answer impossible to give honestly.',
        },
        {
          title: 'You are building on a foundation you do not control',
          body: "Per-seat pricing, model changes, rate limits, deprecations. Every workflow you build on someone else's API is one policy change away from breaking. You rent the capability but own none of it.",
        },
      ],
    },
    solution: {
      title: 'Private AI, installed on hardware you control.',
      body: 'We deploy capable AI models inside your environment: your own servers, or dedicated hardware we manage for you. The system reasons over your documents. Every prompt stays in your building. There is no API call to a public model, no data leaving your perimeter, no terms-of-service exposure. You get real capability with privacy that holds up under actual scrutiny.',
      outcomes: [
        'AI running on infrastructure you control, no cloud API in the chain',
        'Every prompt and answer stays inside your own perimeter',
        'A private assistant that reads and reasons over your own documents',
        'No per-seat billing, no vendor lock-in, no API you cannot trust',
      ],
    },
    capabilities: {
      title: 'What we install',
      intro: 'A complete private AI setup, from infrastructure assessment to a working assistant your team opens every day.',
      items: [
        {
          title: 'Infrastructure assessment',
          body: 'We look at what you have and what you would need. You get a straight answer on whether to run on your existing servers or on dedicated hardware we manage, before any work starts.',
        },
        {
          title: 'Model selection and deployment',
          body: 'We choose the right open models for your work: capable enough for serious tasks, sized to your hardware, and hosted inside your own perimeter. Nothing sends data anywhere else.',
        },
        {
          title: 'Secure configuration',
          body: 'The system runs inside your perimeter from the first day. Data stays in-house not because we promise it, but because the architecture makes it impossible for it to go anywhere else.',
        },
        {
          title: 'A private assistant over your own documents',
          body: 'Your team can ask questions and get answers grounded in your contracts, records, codebase, or knowledge base. Nothing goes outside to answer.',
        },
        {
          title: 'Access control and audit trail',
          body: 'Who can use it, what they can reach, and a complete record of what happened. The controls and trail your compliance team needs to sign off with confidence.',
        },
        {
          title: 'Ongoing maintenance',
          body: 'Models improve and threats change. We keep your system updated and running so private AI stays an asset instead of a project you have to babysit.',
        },
      ],
    },
    process: {
      title: 'How we work',
      steps: [
        {
          label: '01',
          title: 'We listen first',
          body: 'We map your data, your compliance obligations, and what you actually want AI to do. Before any hardware or models, we get clear on the constraints you cannot break.',
        },
        {
          label: '02',
          title: 'We design what fits',
          body: 'We choose the models, the hosting, and the architecture for your situation, and show you exactly how data flows and stays contained. You approve the plan before we build.',
        },
        {
          label: '03',
          title: 'We build and deploy',
          body: 'We install the system inside your environment, connect it to your documents, set up access control and auditing, and test it against real work from your team.',
        },
        {
          label: '04',
          title: 'We stay with you',
          body: 'We hand over a system you own, then keep it maintained and updated. As your needs grow, the setup grows with you, without pulling you back toward the cloud.',
        },
      ],
    },
    differentiators: {
      title: 'Why a builder, not a vendor',
      items: [
        {
          title: 'You own the system outright',
          body: 'When we finish, the AI runs on your infrastructure under your control. No per-seat meter. No switch a provider can flip to change your terms or cut off your access.',
        },
        {
          title: 'Privacy that holds up under scrutiny',
          body: 'We build the architecture so the data genuinely cannot leave. That is a different claim from promising not to use it. Your auditors and clients deserve the stronger version.',
        },
        {
          title: 'Built around your specific constraints',
          body: 'Every industry has different obligations and different confidential material. We design the deployment around what you actually cannot expose, not around a generic template.',
        },
        {
          title: 'We stay after launch',
          body: 'Private AI needs upkeep as models and threats evolve. We keep your system current and maintained so you keep the capability without inheriting the burden of running it alone.',
        },
      ],
    },
    audience: {
      title: 'Who this is built for',
      body: 'Local AI is the right fit when keeping data in-house is not optional. If that is your situation, this is designed for exactly it. If it is not, we will tell you honestly.',
      fits: [
        'Regulated industries where data handling is non-negotiable: legal, medical, financial services',
        'Companies whose source code, IP, or research cannot be sent to a third-party model',
        'Teams who need to answer exactly where their data went, when asked by auditors or clients',
        'Businesses that want to own their AI capability instead of renting it per seat',
      ],
      notFor: [
        'Teams with no data sensitivity who are happy on cloud SaaS as it is',
        'Companies who just want the cheapest path without thinking about where data goes',
        'Anyone looking for a quick subscription with no real setup',
      ],
    },
    faq: [
      {
        q: 'How long does deployment take?',
        a: 'It depends on your infrastructure and how much of your document library the assistant needs to read. A focused first deployment is typically a matter of weeks. We give you a real timeline after the assessment, before any work starts, not a number we revise later.',
      },
      {
        q: 'Do we actually own it, or are we tied to you?',
        a: 'You own it. The system runs on infrastructure you control. We stay involved for maintenance because clients find it useful, not because you have no way to leave.',
      },
      {
        q: 'How private is it, really?',
        a: 'Nothing goes to OpenAI or any public cloud model. The models run inside your environment, every prompt and answer stays behind your own walls, and we build access control and an audit trail so you can show exactly who accessed what and when.',
      },
      {
        q: 'We already use ChatGPT. Why change?',
        a: 'If your data is not sensitive, you may not need to. But if your team pastes confidential material into a tool you do not control, you are carrying a risk most companies underestimate. This gives you the same capability without the exposure.',
      },
      {
        q: 'Do we need our own servers?',
        a: 'No. We can deploy on your existing hardware if you have it, or on dedicated infrastructure we manage for you. Either way, we handle the technical side and hand you a system that just works.',
      },
      {
        q: 'How capable are self-hosted models compared to cloud AI?',
        a: 'Strong enough for serious business work: document analysis, drafting, internal Q&A, classification, research. We match the model to your actual tasks and hardware so what you get is genuinely useful, on your own terms.',
      },
    ],
    finalCta: {
      title: "Get AI's capability without giving up control of your data.",
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
      subhead: 'AIOS is a custom AI-native ERP built around how you actually operate. Your CRM, projects, ops, and knowledge, connected, with AI acting across all of it.',
      primaryCta: 'Book a strategy call',
      secondaryCta: 'Contact us',
    },
    intro: {
      statement: 'One brain for your business. Shaped around how you operate, not a template you have to bend yourself into.',
      chips: ['You own it', 'Private by design', 'One source of truth'],
    },
    reveal:
      'All your disconnected tools, replaced by one system your whole company runs on. You enter it once, and it stays true everywhere.',
    problem: {
      title: "Your company runs on a tangle of tools that don't talk to each other",
      intro: 'It grew one app at a time. Notion for docs, Sheets for numbers, a CRM, Slack, a dozen tabs. Each made sense alone. Together they cost your team hours every single day.',
      points: [
        { title: 'You enter the same thing over and over', body: 'A new client lands in the CRM, then gets copied into a spreadsheet, a project board, and an invoice. Every copy is a chance to get it wrong, and someone always does.' },
        { title: 'Your knowledge scatters, then walks out the door', body: "The answer is somewhere: a doc, a thread, someone's head. Finding it takes longer than redoing the work. And when people leave, what they knew leaves with them." },
        { title: 'Nobody knows which number is right', body: 'Two tools show two totals and nobody trusts either. You end up deciding on figures you only half believe, because your tools never agree on the real picture.' },
      ],
    },
    solution: {
      title: 'One system, built around how you actually run',
      body: 'AIOS replaces the scatter of disconnected tools with a single system shaped to your operations. We map how your business works, then build one data model and custom modules for your CRM, projects, ops, and knowledge, all connected underneath. On top of that, AI agents act across your workflows instead of waiting for someone to click between apps.',
      outcomes: [
        'One system instead of many, your team works in a single place',
        'Enter data once, it stays right everywhere, no more re-typing',
        'AI that does real work across your operations, not a chatbot in a corner',
        'One source of truth, so every number finally agrees',
      ],
    },
    capabilities: {
      title: 'What we build into your AIOS',
      intro: 'Not a stack of plugins. One system, designed end to end around the way your business works. No generic tools, no bloat.',
      items: [
        { title: 'Operations mapping', body: 'We start by learning how your business actually runs: every workflow, every handoff, every place data gets re-entered. The system is built on that, not on a generic template.' },
        { title: 'One data model underneath', body: 'A client, a project, a task means the same thing everywhere. Enter it once and it stays in sync, nothing typed twice, nothing drifting out of date.' },
        { title: 'Custom modules for how you work', body: "CRM, projects, operations, and knowledge, built to match your process, not someone else's idea of it. No features you'll never open." },
        { title: 'AI agents that act across workflows', body: 'Agents that draft, update, route, and follow up between your modules, doing the real work, not just answering questions in a box.' },
        { title: 'Dashboards you can trust', body: 'The real picture of your business in one view, drawn from one source of truth. The numbers agree because they all come from the same place.' },
        { title: 'Rollout and team training', body: 'We install it, move your data in, and train your team so they actually adopt it. Then we stay with you after launch as the business changes.' },
      ],
    },
    process: {
      title: 'How we build it with you',
      steps: [
        { label: '01', title: 'We listen first', body: 'We sit with you and your team to map how the business runs today: the tools, the workflows, the places that hurt. Nothing gets built until we understand how you actually operate.' },
        { label: '02', title: 'We design the system', body: 'We shape the data model and the modules around your operations, and agree on what AIOS replaces and in what order. You see the plan before a single line is built.' },
        { label: '03', title: 'We build what fits', body: 'We build your modules, automation, and AI agents, then migrate your data and connect what stays. We start with the part that hurts most, so you feel the value early.' },
        { label: '04', title: 'We stay with you', body: 'We roll it out, train your team, and keep refining the system as you grow. AIOS is your platform, it should keep fitting the business as it changes.' },
      ],
    },
    differentiators: {
      title: 'Why a builder, not a vendor',
      items: [
        { title: 'Built around you, not a template', body: 'Off-the-shelf ERPs make you change how you work to fit the software. We do the opposite: the system is shaped to your operations, so it fits from day one.' },
        { title: 'You own it', body: "Your system, your data, your platform. No lock-in to a tool you can't change, no per-seat tax on growing your team. It runs for the business, not for the vendor." },
        { title: 'Private by design', body: "Your knowledge and operations stay yours. We build with privacy and control from the start, so your data isn't quietly feeding someone else's product." },
        { title: 'AI that does the work', body: "We don't add AI for the sake of it. Agents go where they remove real effort: the re-entry, the chasing, the switching between tools." },
      ],
    },
    audience: {
      title: 'Who AIOS is for',
      body: "AIOS is a platform replacement, the most ambitious thing we build. It's worth it when you're past patching tools together and ready for one system to run the company.",
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
      { q: 'How long does it take to build?', a: "It depends on how much we're replacing and how complex your operations are. We don't build the whole thing at once. We start with the part that hurts most, get it live, and expand from there, so you see value early instead of waiting for one big launch. You'll get a real timeline after the strategy call and the operations mapping." },
      { q: 'Do we own the system, or are we locked into you?', a: "You own it: the system, your data, and the platform it runs on. No per-seat lock-in, no vendor you can't leave. We stay involved because clients want us to, not because you're trapped." },
      { q: 'Is our data secure and private?', a: "Yes. We build with privacy and control in mind, your knowledge and operations stay yours, and your data isn't used to train or feed anyone else's product. Before we build, we walk you through exactly where your data lives and who can access it." },
      { q: 'We already have a CRM and tools we like. Do we throw them out?', a: "Not blindly. In the mapping phase we decide together what AIOS replaces and what's worth keeping and connecting. The goal is one source of truth, not change for its own sake. If a tool genuinely serves you, we connect to it instead of rebuilding it." },
      { q: 'What if our team resists a new system?', a: "That's exactly why rollout and training are part of the build, not an afterthought. We start with the workflow that removes the most daily pain, so people feel the benefit fast, and we stay with you through adoption. A system nobody uses isn't worth building." },
      { q: 'How do we get started?', a: "Book a strategy call. We'll talk through how your business runs today and whether AIOS is the right fit, before any commitment. If it's not right for you yet, we'll tell you straight." },
    ],
    finalCta: {
      title: "Stop running your company on tools that don't talk to each other.",
      body: "If your business has outgrown the patchwork, AIOS gives it one system to run on, built around how you actually work, owned by you. Let's map what it would replace and whether it's the right move.",
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
      'Most AI budgets get spent before anyone knows what actually works. We find where it pays off, prove it small, then hand you the plan.',
    problem: {
      title: "You feel the pressure to do something with AI. You just don't know where to start.",
      intro: 'Most founders we talk to are in the same spot: the expectation is loud, the path is silent.',
      points: [
        { title: 'Pressure with no direction', body: 'Everyone says you should be using AI. Nobody tells you where it fits in your business. So you sit on it, or you guess and hope.' },
        { title: 'Burned by the hype', body: "You tried a tool or two. They demoed well, then quietly died in the team. Now you're skeptical of the next shiny thing, and you're right to be." },
        { title: 'Afraid of betting on the wrong thing', body: "A real AI build is real money. Committing before you know it's the right move is how good companies waste a quarter and lose trust internally." },
      ],
    },
    solution: {
      title: 'We find where AI fits, prove it works, then tell you what to build.',
      body: 'This is the step before the big build. We get inside how your business runs today, find every place AI could genuinely help, and put honest numbers next to each one. Then we run small, hands-on pilots so you see real results before you commit budget to anything. You leave with a plan you can act on, not a slide deck that gathers dust.',
      outcomes: [
        "Clear answers on where AI helps you, and where it doesn't",
        'A ranked roadmap ordered by impact, effort, and honest ROI',
        'Quick automation wins your team feels in weeks, not quarters',
        'A plan in hand before you spend, so the build is the safe part',
      ],
    },
    capabilities: {
      title: "What's inside the engagement",
      intro: 'No generic frameworks. We look at your actual work, your actual tools, and your actual numbers.',
      items: [
        { title: 'Discovery and audit', body: "We sit with you and your team to map how the work really gets done today, where time leaks, and what's quietly costing you money." },
        { title: 'Opportunity mapping with honest ROI', body: "Every idea gets a number and a verdict. We tell you which ones pay off, which ones don't, and why, so you fund the right ones." },
        { title: 'Workflow and automation design', body: "We design the flows end to end, so it's clear exactly how the work changes, who touches what, and where the time comes back." },
        { title: 'Build vs buy calls', body: 'For each opportunity we tell you straight: use an existing tool, or build something custom. No bias toward selling you a build.' },
        { title: 'A ranked roadmap', body: 'Everything lands in one ordered plan, sequenced by impact and effort, that any team could pick up and act on tomorrow.' },
        { title: 'Hands-on pilots', body: "We don't just recommend. We stand up small working pilots so you see the result with your own eyes before committing real budget." },
      ],
    },
    process: {
      title: 'How we work',
      steps: [
        { label: '01', title: 'We listen first', body: 'We learn your business from the inside: how the team works, where it hurts, what good would actually look like. No assumptions, no template.' },
        { label: '02', title: 'We map and prove', body: 'We find every real opportunity, put honest ROI next to each, and run quick pilots so the strongest ones are tested, not just theorized.' },
        { label: '03', title: 'We hand you the plan', body: "You get a ranked roadmap with clear build vs buy calls. It's yours to act on, with us or without us." },
        { label: '04', title: 'We stay with you', body: "When you're ready to build, we're still here. The same people who wrote the plan can build it, so nothing gets lost in translation." },
      ],
    },
    differentiators: {
      title: 'Why a builder, not a consultancy',
      items: [
        { title: 'We build, so the plan is buildable', body: "Our roadmaps come from people who ship real systems. Nothing in your plan is a slide that can't survive contact with reality." },
        { title: 'We have no tool to sell you', body: "Our build vs buy calls are honest because we don't win when you over-build. If an off-the-shelf tool is the right answer, we'll say so." },
        { title: 'Proof before spend', body: "We'd rather show you a working pilot than promise an outcome. You commit budget once you've seen it work, not before." },
        { title: 'Clarity over jargon', body: "You'll understand every recommendation and the reason behind it, in plain language. No black boxes, no buzzwords." },
      ],
    },
    audience: {
      title: 'Who this is for',
      body: "This is the right starting point when the destination isn't clear yet and you want a plan before you bet.",
      fits: [
        "Leaders who know AI matters but aren't sure where to start",
        'Teams burned by AI hype that want a clear-eyed second opinion',
        'Companies that want a real plan and honest ROI before they invest',
        "Founders who'd rather prove value small than gamble on a big build",
      ],
      notFor: [
        "People who already know exactly what to build (you want App Design or AIOS, and we'll point you there)",
        'Anyone chasing AI as a buzzword rather than a real result',
      ],
    },
    faq: [
      { q: 'How long does this take?', a: "Most engagements run a few weeks from first conversation to roadmap, with early pilots inside that window. We scope it on the strategy call once we understand your situation, and we don't pad it." },
      { q: 'Do we own what you produce?', a: "Yes. The audit, the roadmap, the pilots, all of it is yours. You can act on it with us, with another team, or in-house. There's no lock-in built into the plan." },
      { q: 'How do you handle our data and security?', a: "We treat your data as yours. We only access what we need to do the work, we're explicit about where anything runs, and if privacy is critical we'll design around keeping things on your own infrastructure." },
      { q: 'We already have some AI tools in place. Is this still worth it?', a: "Often more so. Part of the audit is judging what's already working, what's quietly failing, and what to keep, drop, or replace, so you stop paying for things that don't stick." },
      { q: "What if the honest answer is that AI doesn't help us much?", a: "Then we'll tell you, plainly. Knowing where AI doesn't fit saves you more than another vendor's roadmap ever will. That's a real outcome, not a failed engagement." },
      { q: 'How do we get started?', a: "Book a strategy call. We'll talk through where you are and give you a straight answer on whether this is the right fit. We usually reply within a day." },
    ],
    finalCta: {
      title: 'Get a plan before you spend.',
      body: "Bring us the pressure and the uncertainty. We'll come back with clarity on where AI fits, what it's worth, and what to do first. No guessing, no hype.",
      button: 'Book a strategy call',
      reassurance: 'A 30-minute call. No pitch, no obligation, just a straight answer on whether this is the right fit. We usually reply within a day.',
    },
  },
}
