export type LegalBlock = string | { list: string[] }
export type LegalSection = { heading: string; blocks: LegalBlock[] }
export type LegalDoc = {
  slug: 'terms' | 'privacy'
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

/** Shared facts so both documents stay consistent. Fill in the bracketed
 *  company details once they are registered. */
const CONTACT_EMAIL = 'kamiel@nivoraworks.com'
const CONTACT_PHONE = '+32 489 00 77 37'
const COMPANY = 'Nivora'
const UPDATED = 'June 20, 2026'

export const TERMS: LegalDoc = {
  slug: 'terms',
  title: 'Terms of Service',
  updated: UPDATED,
  intro:
    'These terms cover how we work together when you engage Nivora to advise on, design, build, or support an AI system. By working with us or using this website, you agree to what is set out below.',
  sections: [
    {
      heading: 'Who we are',
      blocks: [
        `${COMPANY} is a studio based in Belgium that designs and builds custom AI systems for businesses. We work across three stages: consulting to find what is worth building, implementation to design and ship it, and support to keep it running and improving.`,
        `You can reach us at ${CONTACT_EMAIL} or ${CONTACT_PHONE}. Company registration details: [company registration number], [registered address].`,
      ],
    },
    {
      heading: 'How an engagement works',
      blocks: [
        'Before a full project, we usually prove the value on a small, real slice of your work. That means taking one concrete task and building a working version of the system around it, using your data and your process. If it clearly helps, we scope the full build from there. If it does not, you have lost a small step instead of a large one.',
        'The exact scope, deliverables, timeline, and price for each engagement are set out in a separate proposal or statement of work. Where that document and these terms disagree, the proposal wins for that project.',
      ],
    },
    {
      heading: 'Quotes, fees, and payment',
      blocks: [
        'Quotes are valid for the period stated in the proposal. Unless agreed otherwise:',
        {
          list: [
            'Fees and any payment schedule are defined per project in the proposal.',
            'Invoices are due within the term shown on the invoice.',
            'Stated prices exclude VAT and any third-party costs, such as hosting, model usage, or licences, unless we say otherwise.',
            'Recurring support or hosting is billed on the cycle agreed in writing.',
          ],
        },
      ],
    },
    {
      heading: 'What we need from you',
      blocks: [
        'To build something that works, we rely on you to give us timely access to the people, systems, data, and decisions a project needs. You confirm that you have the right to share any data and accounts you give us access to, and that doing so does not break a law or another agreement you are bound by.',
        'Delays or missing access on your side can affect timelines and cost. We will flag this as early as we can.',
      ],
    },
    {
      heading: 'Ownership of what we build',
      blocks: [
        'Your data stays yours. The custom work we deliver for your project, including the configuration and code written specifically for you, becomes yours once the related invoices are paid in full.',
        'We keep ownership of the general tools, libraries, methods, and know-how we bring to the work and reuse across clients. We grant you a licence to use these as part of your delivered system. Open-source and third-party components stay under their own licences.',
      ],
    },
    {
      heading: 'Private by design',
      blocks: [
        'Where a project calls for it, we build systems that run inside your own environment or on infrastructure you control, so your data does not have to leave your walls. The specifics of where a system runs and who can access it are agreed per project. Handling of personal data in a project is covered by a separate data processing agreement where the law requires one.',
      ],
    },
    {
      heading: 'AI outputs and human oversight',
      blocks: [
        'AI systems produce useful results but they are not perfect and can be wrong or incomplete. The systems we build are tools to support your work, not a replacement for human judgement. You are responsible for reviewing outputs before relying on them for decisions, and for keeping a human in the loop where the stakes call for it. We will tell you plainly where a system is strong and where it needs checking.',
      ],
    },
    {
      heading: 'Confidentiality',
      blocks: [
        'Each side will keep the other side’s non-public information confidential and use it only to carry out the work. This does not apply to information that is already public, that you or we already had, or that the law requires us to disclose. This duty continues after the engagement ends.',
      ],
    },
    {
      heading: 'Warranties and liability',
      blocks: [
        'We carry out our work with reasonable skill and care. Beyond that, and to the extent the law allows, our services and this website are provided as is, without other warranties.',
        'To the extent the law allows, we are not liable for indirect or consequential loss, lost profit, or lost data, and our total liability for any engagement is limited to the fees you paid us for that engagement in the twelve months before the claim. Nothing here limits liability that cannot be limited by law.',
      ],
    },
    {
      heading: 'Ending an engagement',
      blocks: [
        'Either side can end an engagement as set out in the relevant proposal, or on reasonable written notice if there is no fixed term. If you end a project early, you pay for work done and committed costs up to that point. We can pause or stop work if invoices are seriously overdue.',
      ],
    },
    {
      heading: 'Changes to these terms',
      blocks: [
        'We may update these terms as our work evolves. The current version is always the one on this page, with the date it was last updated. For active engagements, the terms in force when the proposal was signed continue to apply unless we agree otherwise.',
      ],
    },
    {
      heading: 'Governing law',
      blocks: [
        'These terms are governed by Belgian law, and any dispute falls under the courts competent for our registered office, unless mandatory law says otherwise.',
      ],
    },
    {
      heading: 'Contact',
      blocks: [
        `Questions about these terms? Email ${CONTACT_EMAIL} or call ${CONTACT_PHONE}.`,
      ],
    },
  ],
}

export const PRIVACY: LegalDoc = {
  slug: 'privacy',
  title: 'Privacy Policy',
  updated: UPDATED,
  intro:
    'This policy explains what personal data Nivora handles when you visit this website or get in touch, why we handle it, and the rights you have. We keep the data we hold to a minimum, on purpose.',
  sections: [
    {
      heading: 'Who is responsible',
      blocks: [
        `${COMPANY}, based in Belgium, is the controller for the personal data described here. You can reach us at ${CONTACT_EMAIL} or ${CONTACT_PHONE}. Company registration details: [company registration number], [registered address].`,
        'This policy covers the website and our direct contact with you. Personal data we process inside a client project, on your behalf, is governed by the engagement agreement and a separate data processing agreement where the law requires one.',
      ],
    },
    {
      heading: 'What we collect',
      blocks: [
        'We only collect what we need to talk with you and run our business:',
        {
          list: [
            'Contact and message details you give us when you email, call, book a call, or fill in a form, such as your name, company, email, phone number, and what you write to us.',
            'Records of our correspondence and meetings, so we can follow up properly.',
            'Basic technical data that any web server receives, such as your IP address, browser type, and the pages you view. Our hosting provider logs this to keep the site secure and working.',
          ],
        },
        'We do not ask for special categories of data, and we ask you not to send sensitive personal data through general contact channels.',
      ],
    },
    {
      heading: 'Why we use it, and our legal basis',
      blocks: [
        'Under the GDPR, we rely on these grounds:',
        {
          list: [
            'To answer your questions and prepare or carry out an engagement, on the basis of taking steps at your request and performing our contract.',
            'To run, secure, and improve our website and business, on the basis of our legitimate interest in operating safely and well.',
            'To send you information you asked for, on the basis of your consent, which you can withdraw at any time.',
            'To meet legal and accounting obligations, on the basis of compliance with the law.',
          ],
        },
      ],
    },
    {
      heading: 'Private by design',
      blocks: [
        'The systems we build are often designed to run inside your own environment so your operational data does not leave your control. We carry that same restraint into our own business: we collect little, we do not build profiles on you, and we do not sell personal data to anyone.',
      ],
    },
    {
      heading: 'Who we share it with',
      blocks: [
        'We do not sell your data. We share it only with service providers that help us operate, and only as far as needed. These typically include our website hosting, email, and similar business tools. These providers act on our instructions and are bound to protect your data. We may also disclose data where the law requires it.',
      ],
    },
    {
      heading: 'International transfers',
      blocks: [
        'We prefer providers that keep data within the European Economic Area. Where data is processed outside the EEA, we make sure an approved safeguard is in place, such as the European Commission’s standard contractual clauses.',
      ],
    },
    {
      heading: 'How long we keep it',
      blocks: [
        'We keep personal data only as long as we need it for the purpose we collected it, then delete or anonymise it. Enquiries that do not lead to work are kept for a limited period and then removed. Records tied to a contract or a legal obligation, such as invoices, are kept for as long as the law requires.',
      ],
    },
    {
      heading: 'Cookies',
      blocks: [
        'This website uses only what it needs to function. We do not run advertising trackers. If we add analytics or other non-essential cookies later, we will list them here and ask for your consent first where the law requires it.',
      ],
    },
    {
      heading: 'How we protect it',
      blocks: [
        'We use reasonable technical and organisational measures to protect personal data against loss, misuse, and unauthorised access, and we keep access limited to those who need it. No system is perfectly secure, but we take this seriously and design for it.',
      ],
    },
    {
      heading: 'Your rights',
      blocks: [
        'Under the GDPR you can ask us to:',
        {
          list: [
            'Give you a copy of the personal data we hold about you.',
            'Correct data that is wrong or incomplete.',
            'Delete your data, where there is no overriding reason to keep it.',
            'Restrict or object to how we use it.',
            'Receive your data in a portable format, where that right applies.',
            'Withdraw consent at any time, without affecting use before you withdrew it.',
          ],
        },
        `To exercise any of these, email ${CONTACT_EMAIL}. If you believe we have mishandled your data, you can also lodge a complaint with the Belgian Data Protection Authority (Gegevensbeschermingsautoriteit / Autorité de protection des données).`,
      ],
    },
    {
      heading: 'Changes to this policy',
      blocks: [
        'We may update this policy as our practices change. The current version, with the date it was last updated, is always the one on this page.',
      ],
    },
    {
      heading: 'Contact',
      blocks: [
        `For anything about your privacy or this policy, email ${CONTACT_EMAIL} or call ${CONTACT_PHONE}.`,
      ],
    },
  ],
}

export const LEGAL_DOCS: Record<LegalDoc['slug'], LegalDoc> = {
  terms: TERMS,
  privacy: PRIVACY,
}
