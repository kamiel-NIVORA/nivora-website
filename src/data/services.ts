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
      eyebrow: 'Custom App Development',
      headline: 'Custom software shaped to your business, so your team stops fighting the tools.',
      subhead: 'We design and build apps, internal tools, portals, and full products around how you actually work. Shipped, in your brand, owned by you.',
      primaryCta: 'Book a strategy call',
      secondaryCta: 'Contact us',
    },
    intro: {
      statement: 'Most software makes you bend to fit it. We build the opposite: a real product shaped around the way your business runs.',
      chips: ['You own it', 'Built to last', 'No templates'],
    },
    reveal:
      'The tool that finally fits your business does not exist yet. So we build it, around the way you already work, and you own it outright.',
    problem: {
      title: "You've outgrown the tools you're running on",
      intro: "There's a point where the workarounds cost more than the tool saves. If this sounds like your week, you're past it.",
      points: [
        { title: 'Spreadsheets holding it together', body: 'Critical work lives in a tangle of sheets only one person fully understands. It breaks quietly, every fix is manual, and one wrong cell can cost you a client.' },
        { title: 'SaaS that almost fits', body: "You pay every month for software that does 70% of the job and fights you on the rest. So you've reshaped your process to suit the tool, instead of the other way around." },
        { title: 'A clear idea, no team to build it', body: "You know exactly what should exist. You just don't have the people to build it properly, and you don't want a throwaway prototype held together with tape." },
      ],
    },
    solution: {
      title: 'A real product, built around you',
      body: 'We design and build custom software from the ground up: discovery, UX, interface, the full-stack build, integrations, and launch. Not a template with your logo on it. A product that maps to how your business actually works, in your brand, that you own outright.',
      outcomes: [
        'Software shaped to your process, not the reverse',
        'A product you own outright: code, data, and all',
        'Something real, shipped and in daily use',
        'Room to grow without a costly rebuild',
      ],
    },
    capabilities: {
      title: "What's included",
      intro: 'End to end, from the first conversation to a product your team opens every day.',
      items: [
        { title: 'Discovery and UX', body: 'We map how your business actually works before we design anything. The app follows your process, not a generic playbook.' },
        { title: 'Custom UI in your brand', body: 'An interface built for the people who use it daily: clear, fast, and unmistakably yours. Nothing off the shelf.' },
        { title: 'Full-stack build', body: 'We build the whole thing: front end, back end, database, auth. One team, accountable for all of it.' },
        { title: 'Integrations with your tools', body: 'Your app talks to the systems you already run on, so it fits your workflow instead of becoming another island.' },
        { title: 'AI where it actually helps', body: 'We add AI only where it saves real time on real tasks. No AI for the sake of it, no bloat.' },
        { title: 'Launch and iterate', body: "We ship it, watch how it's used, and refine. The first version is the start, not the finish." },
      ],
    },
    process: {
      title: 'How we work',
      steps: [
        { label: '01', title: 'We listen first', body: 'We sit with you and your team to understand the idea, the process, and where it hurts. We scope the real problem before writing a line of code.' },
        { label: '02', title: 'We design what fits', body: 'We map the flows, design the interface in your brand, and agree on exactly what the first version does. You watch it take shape, no black box.' },
        { label: '03', title: 'We build it properly', body: 'Full-stack build, connected to your tools, on clean foundations that hold up as you grow. We show progress as we go.' },
        { label: '04', title: 'We stay with you', body: "We launch, watch how it's used, and keep improving it. You're not handed a zip file and left alone." },
      ],
    },
    differentiators: {
      title: 'Why build with us',
      items: [
        { title: 'Builders, not a vendor', body: 'We write the code ourselves. You talk to the people building your product, not an account manager relaying messages.' },
        { title: 'Your process drives the design', body: "We don't make you fit our framework. We learn how you work and build software that matches it." },
        { title: 'You own everything', body: 'The code, the data, the product: yours. No lock-in. If you ever want to take it in-house or elsewhere, you can.' },
        { title: 'Built to last', body: "Clean foundations, no bloat, room to grow. We build it once, properly, so you're not rebuilding in a year." },
      ],
    },
    audience: {
      title: 'Is this the right fit?',
      body: "Custom software pays off when the tool has to fit you exactly. Here's who it's for, and who it isn't.",
      fits: [
        'Founders with a clear idea who want it built properly the first time',
        'Teams whose process has outgrown spreadsheets and generic SaaS',
        'Companies that need an internal tool no product on the market sells',
        'Owners who want to own their software, not rent something that almost fits',
      ],
      notFor: [
        'Anyone after a cheap template or a quick clone',
        'Throwaway MVPs with no scoping or thought behind them',
        '"Build it by next week" with no room for discovery',
      ],
    },
    faq: [
      { q: 'How long does it take?', a: "It depends on what you're building. A focused internal tool is a matter of weeks; a full product takes longer. After our first call we give you an honest timeline for your scope, not a number pulled from thin air." },
      { q: 'What does it cost?', a: "It's priced to the scope, not to a fixed package. Once we understand what you need, we give you a clear number and what it covers, before you commit. No surprise invoices later." },
      { q: 'Do I own the code and data?', a: 'Yes. The code, the data, and the product are yours. No lock-in. If you ever want to bring it in-house or move it elsewhere, you can.' },
      { q: 'What about security and privacy?', a: 'We build with sensible defaults, proper auth, careful data handling, and no unnecessary third parties. If you have specific requirements around where data lives, we work to them.' },
      { q: 'We already use some tools, does this replace them?', a: "Not necessarily. We integrate with what's working and replace only what's holding you back. The goal is one product that fits your workflow, not another disconnected system." },
      { q: 'How do we get started?', a: "Book a strategy call. We'll talk through your idea and your process, and give you a straight answer on whether custom software is the right move and what it would take." },
    ],
    finalCta: {
      title: "Let's build the thing that actually fits",
      body: "Bring us the idea, or the process you've outgrown. We'll tell you honestly what it takes to build it right, and whether we're the team to do it.",
      button: 'Book a strategy call',
      reassurance: 'A 30-minute call. No pitch, no obligation, just a straight answer on whether this is the right fit. We usually reply within a day.',
    },
  },
  'local-ai': {
    slug: 'local-ai',
    name: 'Local AI',
    hero: {
      eyebrow: 'Local / Private AI Installation',
      headline: 'AI as capable as ChatGPT, running inside your walls. Your data never leaves the building.',
      subhead: 'We install private models and assistants on infrastructure you control. Real AI capability, with your confidential data staying exactly where it belongs.',
      primaryCta: 'Book a strategy call',
      secondaryCta: 'Contact us',
    },
    intro: {
      statement: "For companies that need AI but can't put their data in someone else's cloud. You get both.",
      chips: ['You own it', 'Private by design', 'Built to last'],
    },
    reveal:
      'Real AI, as capable as the tools everyone leans on, running entirely inside your own walls. Your most private data never leaves the building.',
    problem: {
      title: "You want AI. Your data won't let you.",
      intro: "The teams that need AI most are often the ones who can't touch the easy tools. Every prompt to a cloud model is a question you can't answer: where does this end up, who can read it, and what did you agree to in the fine print?",
      points: [
        { title: "Your most sensitive data can't go to the cloud", body: 'Legal files, patient records, financials, source code, IP. The moment it goes into a public model, it has left your control. For your business, that is not a convenience, it is a liability.' },
        { title: 'Compliance and client confidentiality are on the line', body: 'Regulators and clients expect you to know exactly where their information lives. "We sent it to a third-party AI vendor" is not an answer you want to give in an audit or a breach review.' },
        { title: 'Per-seat pricing and lock-in keep climbing', body: "Every new user is another monthly fee, and your workflows quietly get welded to one provider's prices and roadmap. You are renting capability you could own outright." },
      ],
    },
    solution: {
      title: 'Private AI that runs on hardware you control.',
      body: 'We deploy self-hosted models and assistants inside your own environment, on your servers or on dedicated hardware we run for you. Nothing goes to OpenAI or any public cloud model. You get a private assistant that reads and reasons over your own documents, with access controls and an audit trail, all behind your own walls. No generic tools, no bloat.',
      outcomes: [
        "AI that runs on hardware you control, not someone else's API",
        'Confidential data that stays in-house, every prompt and every answer',
        'No per-seat bills and no vendor lock-in',
        'Compliance you can actually explain to clients and auditors',
      ],
    },
    capabilities: {
      title: 'What we install',
      intro: 'A complete private AI setup, assessed, deployed, and maintained for the way your business actually works.',
      items: [
        { title: 'Infrastructure assessment', body: 'We look at what you already have and what you would need. You get a straight answer on whether to run on your own servers or on dedicated hardware we manage for you.' },
        { title: 'Model selection and hosting', body: 'We pick the right open models for your work, capability, speed, and a size that fits your hardware, then host them privately. No guessing, no over-built setup you don\'t need.' },
        { title: 'Secure deployment', body: 'The whole system runs inside your perimeter. Data stays in-house by design, not by promise, and we build to your security requirements from day one.' },
        { title: 'A private assistant over your own documents', body: 'It reads your contracts, records, codebase, or knowledge base, so your team asks questions and gets answers grounded in your own material, never sent anywhere else.' },
        { title: 'Access control and audit', body: 'Who can use it, what they can reach, and a record of what happened. The controls and trail your compliance team needs to sign off without hesitation.' },
        { title: 'Ongoing maintenance and updates', body: 'Models improve and threats change. We keep your system current, patched, and running, so private AI stays an asset, not a project you have to babysit.' },
      ],
    },
    process: {
      title: 'How we work',
      steps: [
        { label: '01', title: 'We listen first', body: "We map your data, your compliance obligations, and what you actually want AI to do. Before any hardware or models, we get clear on the constraints you can't break." },
        { label: '02', title: 'We design what fits', body: 'We choose the models, the hosting, and the architecture for your situation, your servers or ours, and show you exactly how data flows and stays contained. You approve it before we build.' },
        { label: '03', title: 'We build and deploy securely', body: 'We install the system inside your environment, connect it to your documents, set up access control and auditing, and test it against real work from your team.' },
        { label: '04', title: 'We stay with you', body: 'We hand over a system you own, then keep it maintained and updated. As your needs grow, the setup grows with you, without dragging you back into the cloud.' },
      ],
    },
    differentiators: {
      title: 'Why a builder, not a vendor',
      items: [
        { title: 'You own the system, not a subscription', body: 'When we are done, the AI runs on your infrastructure under your control. There is no per-seat meter and no switch a provider can flip to change your terms.' },
        { title: 'Built around your data, not a template', body: 'We design the deployment for your specific compliance and confidentiality rules. The assistant reasons over your documents, not a generic model bolted onto your business.' },
        { title: 'We understand the privacy, not just the AI', body: 'Self-hosting AI properly means handling models, infrastructure, access, and audit together. We build the whole thing, so the privacy is real, not a checkbox.' },
        { title: 'We stay after launch', body: 'Private AI needs upkeep as models and threats evolve. We keep yours current, so you keep the capability without inheriting a maintenance burden.' },
      ],
    },
    audience: {
      title: 'Who this is for',
      body: "Local AI is the right fit when keeping data in-house isn't optional. If that's you, this is built for exactly your situation. If it isn't, we'll tell you honestly.",
      fits: [
        'Regulated or confidentiality-bound industries: legal, medical, finance',
        "IP-heavy companies where source code, research, or designs can't leave the building",
        'Teams uneasy about where their data goes when they use cloud AI',
        'Businesses that want to own their AI instead of renting it per seat',
      ],
      notFor: [
        'Small teams perfectly happy on cloud SaaS with no real data sensitivity',
        'Companies chasing the cheapest path regardless of privacy',
        'Anyone who just wants a quick AI subscription with no setup',
      ],
    },
    faq: [
      { q: 'How long does it take to get a private AI running?', a: 'It depends on your infrastructure and how many of your documents the assistant needs to reach. A focused first deployment is a matter of weeks, not months. We give you a clear timeline after the assessment, before any work starts.' },
      { q: 'Do we actually own it, or are we tied to you?', a: 'You own it. The system runs on infrastructure you control, and you are not locked into us. We stay on for maintenance because it is genuinely useful, not because you can\'t leave.' },
      { q: 'How private is it, really?', a: 'Nothing goes to public models like OpenAI. The models run inside your environment, your data stays behind your own walls, and we set up access control and an audit trail so you can prove exactly who touched what.' },
      { q: 'We already use ChatGPT or another cloud tool. Why change?', a: "If your data isn't sensitive, you may not need to. But if you are pasting confidential material into a tool you don't control, you are carrying a risk most teams underestimate. Local AI gives you the capability without the exposure." },
      { q: 'Do we need our own servers and a technical team?', a: 'No. We can deploy on your hardware if you have it, or run it on dedicated infrastructure we manage for you. Either way, we handle the technical side and hand you a system that just works.' },
      { q: 'Will a self-hosted model keep up with the big cloud ones?', a: 'Open models are now strong enough for most real business work: document analysis, drafting, research, internal Q&A. We match the model to your task and your hardware, so you get capability that is genuinely useful, on your terms.' },
    ],
    finalCta: {
      title: "Get AI's capability without giving up your data.",
      body: "If your business can't send confidential information to the cloud, you don't have to settle for falling behind. Let's look at your setup and find the private AI that fits.",
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
