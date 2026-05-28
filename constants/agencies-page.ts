export interface AgenciesPageData {
    badge: string;
    h1Top: string;
    h1Highlight: string;
    subhead: string;
    primaryCta: string;
    whyTitle: string;
    whyPoints: { title: string; description: string }[];
    bodyParagraphs: { heading: string; text: string }[];
    servicesIntro: string;
    featuredServices: { name: string; description: string; slug: string }[];
    faqs: { question: string; answer: string }[];
    ctaHeading: string;
    ctaSubhead: string;
    metaTitle: string;
    metaDescription: string;
}

export const AGENCIES_PAGE: AgenciesPageData = {
    badge: 'For Digital Agencies',
    h1Top: 'White-Label Development Capacity for Digital Agencies',
    h1Highlight: 'Your Brand, Your Timezone, IR35-Free',
    subhead: 'A senior India-based dev team that delivers under your name. 19 years on Freelancer.com — 978 reviews at 4.8★, Preferred Freelancer status. We slot in behind your account managers so you can take on more work without hiring more headcount.',
    primaryCta: 'Book a 15-min capacity chat',

    whyTitle: 'Why Agencies Pick Stallioni',
    whyPoints: [
        { title: 'White-Label by Default', description: 'We never appear to your client. Communication, deliverables, code repositories, screenshots — all under your brand. Your account manager owns the relationship; we own the build.' },
        { title: 'Senior Engineers, Not Body-Shopping', description: 'Every engagement is staffed with senior developers who can own scope, not juniors needing constant supervision. Small, focused teams — typically 1–3 engineers per project, not a pod of ten.' },
        { title: 'Scale Up & Down with No Fixed Cost', description: 'Spin up a dedicated developer for a 6-week sprint, scale to three for an enterprise build, then back to zero next month. No hiring, no severance, no benching costs — you pay only for the months you use.' },
        { title: 'IR35-Free, NDA & MSA Standard', description: 'You contract with Stallioni as a company for project deliverables — cleanly outside UK IR35 / US 1099 worker rules. Mutual NDA and your standard MSA signed before kickoff. Full IP transfer to your agency on payment.' },
        { title: 'Your Timezone, Your Tools', description: 'We work your business hours (we cover US, UK, AU mornings live), in Slack / Jira / Linear / Notion / GitHub / Figma — whichever stack you already use. No new tools forced on you, no portals, no ticketing systems.' },
        { title: '19 Years of Verifiable Track Record', description: '978 reviews at 4.8★ on our public Freelancer.com profile since 2007, Preferred Freelancer status, 96% on-budget delivery. Verify before you sign anything — most of our work has been for US, UK and AU clients.' },
    ],

    bodyParagraphs: [
        {
            heading: 'Why Agencies Outsource Development to Us',
            text: 'Most small and mid-size digital agencies face the same painful cycle: a big project closes, you scramble to staff it, you hire too late, the project slips, or you turn it down because you can\'t deliver in time. Recruiting senior in-house developers costs 20–25% of first-year salary in fees and takes 2–4 months to close — by which point the work has moved on. Stallioni gives you a senior dev bench you can call on within a week, under your brand, with a 19-year-old track record you can show your client if they ever ask who built the work.',
        },
        {
            heading: 'How White-Label Delivery Works in Practice',
            text: 'After we sign your MSA + NDA, we operate as an invisible extension of your team. All git commits go to your organization. All Figma comments and Slack messages use your branded accounts. All client-facing communication is done by your account manager — we feed them updates, screenshots, and demo videos to share as their own. If your client ever asks to meet the dev team, we can join under your brand (your domain email, your Zoom background) or stay in the background entirely. The choice is yours, agreed up front in writing.',
        },
        {
            heading: 'Engagement Models We Offer Agencies',
            text: 'Pick whichever fits the work: (1) Fixed-price projects — clean scope, milestone billing, used by most agencies for client-paid deliverables. (2) Dedicated developer per month — a senior engineer reserved for your agency, billed monthly, used for ongoing accounts or retainer work. (3) Burst capacity — overflow help for a defined sprint, billed by sprint, used when you suddenly land more work than your team can ship. Most agency partners start with fixed-price for the first project, then move to dedicated as trust builds.',
        },
        {
            heading: 'Pricing for Agency Partners',
            text: 'Our public Freelancer rate starts at $12 USD/hour. For agency partners, dedicated-developer rates typically run $2,800–$5,500 per developer per month depending on stack and seniority, with multi-developer discounts. Fixed-price projects are scoped and quoted individually — usually $4K–$40K for the kinds of builds agencies bring us. We invoice in USD, GBP, EUR or AUD with reverse-charge VAT handling for UK/EU partners. No setup fees, no recruitment fees, no markup on third-party costs (AWS, domains, plugins).',
        },
    ],

    servicesIntro: 'What agency partners most commonly engage us for. We cover the full web/mobile/e-commerce/AI stack — pick what fits each client engagement.',
    featuredServices: [
        { name: 'Custom Web Applications', description: 'SaaS platforms, enterprise portals, and internal tools built for scale.', slug: 'custom-web-application-development' },
        { name: 'WordPress, WooCommerce & Shopify', description: 'Custom themes, custom checkout flows, migrations, performance fixes.', slug: 'shopify-development' },
        { name: 'Mobile App Development', description: 'iOS, Android, React Native and Flutter apps for your agency clients.', slug: 'mobile-app-development' },
        { name: 'E-Commerce Development', description: 'Shopify, WooCommerce, Magento, BigCommerce, headless commerce.', slug: 'ecommerce-development' },
        { name: 'UI/UX Design', description: 'User research, Figma prototypes, design systems, conversion-focused redesigns.', slug: 'ui-ux-design' },
        { name: 'AI Integrations', description: 'OpenAI / Claude chatbots, recommendation engines, automation — under your brand.', slug: 'ai-chatbots' },
    ],

    faqs: [
        { question: 'Can you really stay invisible to my client?', answer: 'Yes — that\'s the default and we have done it across hundreds of engagements. We work in your branded Slack / Jira / GitHub accounts, commit to your repositories, and never communicate directly with your client unless you specifically invite us into a call (using your domain email and your branding). NDA covers this in writing before any work starts.' },
        { question: 'Who owns the intellectual property?', answer: 'Your agency does — 100%. Standard contract terms include work-for-hire IP assignment to Stallioni, then a clean assignment from Stallioni to your agency on each milestone payment. Your client receives the IP from you under your own agency MSA. Same as if your in-house team had built it.' },
        { question: 'How fast can you start a new project?', answer: 'Typically 5–7 working days from a signed MSA. For existing agency partners with an active retainer, we can usually pull a developer onto a new project within 48 hours. The bottleneck is almost always your scope being ready, not our availability.' },
        { question: 'What is the minimum engagement size for an agency?', answer: 'For fixed-price projects, we will take on builds starting around $4,000 USD. For dedicated developers, the minimum is one developer for one month. For burst / sprint capacity, the minimum is a 2-week sprint. Smaller one-off fixes (a quick plugin patch, a single landing page tweak) are not a good fit — we recommend Freelancer.com for those.' },
        { question: 'How do you handle the time-zone difference?', answer: 'Our team in Coimbatore is online during your business hours — full afternoon overlap with the UK (4.5–5.5 hours ahead), good overlap with US Eastern mornings (3–4 hours), and full working-day overlap with Australia (we start at 12:30 PM Sydney time). Daily standups, weekly demos, async Slack throughout.' },
        { question: 'Can my client meet the dev team if they insist?', answer: 'Yes — by your call. We can join your client calls under your brand (your domain email address, your Zoom background, no Stallioni references), or stay completely behind the curtain. Both work; we agree the approach up front. Many partners keep us in the background for years without their clients ever asking.' },
        { question: 'How do we verify your work quality before signing?', answer: 'Three ways: (1) our public Freelancer.com profile (graphicaa) shows 978 reviews at 4.8★ since 2007 — most from US/UK/AU clients; (2) we can share live code samples and case studies from past white-label work (anonymised by agreement with previous partners); (3) for first-time partners we are happy to start with a small paid pilot project so you can evaluate us before any retainer commitment.' },
        { question: 'How do invoicing and payment work?', answer: 'We invoice your agency directly in USD, GBP, EUR or AUD (your choice), payable by wire transfer or PayPal. Typical terms: net-15 for new partners, net-30 for ongoing retainers. UK/EU partners benefit from reverse-charge VAT treatment (we do not add VAT; you account for it). No setup fees, no recruitment fees, no markup on third-party costs.' },
    ],

    ctaHeading: 'Need backup dev capacity for your next agency project?',
    ctaSubhead: 'Book a 15-minute capacity chat. No pitch, no pressure — just see if there is a fit for future work. Fixed-price proposal within 48 hours if you have a live project.',

    metaTitle: 'White-Label Development for Digital Agencies | Stallioni',
    metaDescription: 'Senior India-based dev team for digital agencies. White-label delivery under your brand, IR35-free, NDA standard. Web, mobile, e-commerce, AI. 4.8★ on Freelancer.com since 2007.',
};
