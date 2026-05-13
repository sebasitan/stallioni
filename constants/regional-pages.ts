export interface RegionalPageData {
    slug: string;
    regionDisplayName: string;
    badge: string;
    h1Top: string;
    h1Highlight: string;
    subhead: string;
    primaryCta: string;
    whySectionTitle: string;
    whyPoints: { title: string; description: string }[];
    bodyParagraphs: { heading?: string; text: string }[];
    servicesIntro: string;
    featuredServices: { name: string; description: string; slug: string }[];
    faqs: { question: string; answer: string }[];
    ctaHeading: string;
    ctaSubhead: string;
    // SEO
    metaTitle: string;
    metaDescription: string;
}

// Verifiable trust signals from the public Freelancer.com profile
// https://www.freelancer.com/u/graphicaa — used across all regional pages.
//   - 4.8 / 5 rating
//   - 978 reviews
//   - On Freelancer.com since May 2007
//   - Preferred Freelancer status
//   - 82 recommendations
//   - 86% on-time delivery, 96% on-budget

const FEATURED_SERVICES_DEFAULT = [
    { name: 'Custom Web Applications', description: 'SaaS platforms, enterprise portals, and internal tools built for scale.', slug: 'custom-web-application-development' },
    { name: 'WordPress, WooCommerce & Shopify', description: 'Custom WordPress themes, WooCommerce stores, and Shopify builds with migrations.', slug: 'shopify-development' },
    { name: 'Mobile App Development', description: 'iOS, Android, React Native, and Flutter apps for startups and businesses.', slug: 'mobile-app-development' },
    { name: 'E-Commerce Development', description: 'Shopify, WooCommerce, Magento, BigCommerce, and headless commerce builds.', slug: 'ecommerce-development' },
    { name: 'UI/UX Design', description: 'User research, Figma prototypes, design systems, and conversion-focused design.', slug: 'ui-ux-design' },
    { name: 'PHP & Laravel Development', description: 'Custom PHP, Laravel, and CodeIgniter applications with API and CMS work.', slug: 'php-development' },
];

export const REGIONAL_PAGES: Record<string, RegionalPageData> = {
    'usa': {
        slug: 'usa',
        regionDisplayName: 'USA',
        badge: 'For US-Based Businesses',
        h1Top: 'IT Outsourcing for US Companies',
        h1Highlight: 'Trusted Partner Since 2007',
        subhead: 'We have been delivering web, mobile, and e-commerce projects for US clients on Freelancer.com since 2007 — 4.8★ rating, 978 reviews, Preferred Freelancer status. Hire dedicated remote developers from India at a fraction of US in-house cost.',
        primaryCta: 'Get a Free Quote',
        whySectionTitle: 'Why US Companies Hire Stallioni',
        whyPoints: [
            { title: '19+ Years of Cross-Border Delivery', description: 'We have been working with US clients on Freelancer.com since May 2007. With 978 reviews and 4.8★ average, our track record across nearly two decades is publicly verifiable, not a sales pitch.' },
            { title: 'Significant Cost Saving vs US Salaries', description: 'A senior full-stack developer hired in-house in the US costs $150K–$250K all-in. Our hourly rates start at $12 USD on Freelancer and our project-based pricing is similarly competitive — same level of output, far lower cost.' },
            { title: 'Working Hours That Overlap Your Day', description: 'Our team in Coimbatore, India is online during the late-afternoon and evening US business hours (roughly 6 PM IST to 2 AM IST), giving 3–4 hours of real-time overlap with EST mornings and 6–7 hours with PST mornings.' },
            { title: 'No Hiring, No Recruitment Fees, No Visas', description: 'You sign a contract with Stallioni — not 10 individual contractors. No 1099 paperwork, no H-1B sponsorship, no recruiter fees, no benefits/payroll setup. You get experienced engineers on a single monthly invoice.' },
            { title: 'Preferred Freelancer Status', description: 'Out of millions of providers on Freelancer.com, we hold Preferred Freelancer status — a vetting tier reserved for established providers with consistent high ratings and on-budget delivery (96% on-budget, 86% on-time on our public profile).' },
            { title: 'Direct Engagement, No Account Hand-offs', description: 'Most large agencies pass you between sales, account managers, and project managers. With us, the same small team that scoped your project also builds it. Conversations happen on Slack, email, or whichever tool you prefer — no ticketing system.' },
        ],
        bodyParagraphs: [
            {
                heading: 'Why US Businesses Outsource Development to India',
                text: 'The cost gap between US engineering salaries and offshore equivalents has only widened since 2022. A mid-level full-stack engineer in San Francisco now expects $160K+ base, $200K+ all-in. Recruiting cycles run 3–6 months. The cost of a bad hire (severance, productivity loss, re-recruitment) is six figures. Meanwhile, every business — from a 10-person startup to a Fortune 500 — needs to ship software faster than its competitors. Outsourcing to a long-established India-based team is not just a cost play anymore. It is a velocity play: senior talent online within weeks, no 90-day notice periods, and your in-house engineers free to focus on the highest-leverage work.',
            },
            {
                heading: 'Our Track Record with US-Style Clients',
                text: 'Although our office is in Coimbatore, India, the majority of the projects on our public Freelancer.com profile have been for clients in the US, UK, Europe, and Australia. Recent examples include a custom WooCommerce poster shop, a Shopify grocery store with Loyverse POS integration, a WordPress beer-shop platform, and a holiday villa booking system. The breadth signals what matters most for US buyers: we routinely deliver Western e-commerce, content, and SaaS work to international quality standards — and we have done so consistently for nearly two decades.',
            },
            {
                heading: 'How We Work with US Clients',
                text: 'Most US engagements start with a free 30-minute scoping call over Zoom or Google Meet. Within 48 hours we send a fixed-scope proposal with milestones, deliverables, and pricing in USD. After approval, work typically begins within 5–7 working days. We use whichever tools your team already uses — Slack, GitHub, Linear, Notion, Figma. Weekly demos, milestone-based invoicing, and full IP transfer on payment. We do not work hourly unless a client specifically prefers it; fixed-scope is fairer to both sides.',
            },
            {
                heading: 'Communication & Time Zone',
                text: 'India is 9.5–13 hours ahead of US time zones depending on coast and daylight saving. In practice, our developers are available for live calls during your morning hours (your 8 AM EST is our 5:30 PM IST; your 8 AM PST is our 8:30 PM IST). Async work happens on Slack during your evening / our night, and responses are typically ready when you start the next day. For projects requiring tight collaboration, we shift schedules to maximize overlap.',
            },
            {
                heading: 'Pricing for US Clients',
                text: 'Our Freelancer.com profile shows a public hourly rate of $12 USD, which reflects the entry-level rate for smaller projects. For dedicated team engagements, monthly rates per developer range based on stack, seniority, and team size. Most fixed-scope MVPs and redesigns fall between $5,000 and $40,000. There are no setup fees, no recruitment fees, and no markups on third-party costs like AWS or domain registration. We invoice in USD via wire transfer or PayPal (Freelancer.com escrow is also available for first-time clients).',
            },
        ],
        servicesIntro: 'These are the services US clients most often hire us for. Each links to a detailed page with our stack, deliverables, and typical timelines.',
        featuredServices: FEATURED_SERVICES_DEFAULT,
        faqs: [
            { question: 'How can I verify your track record before hiring you?', answer: 'Our public Freelancer.com profile at freelancer.com/u/graphicaa shows 978 reviews, a 4.8 / 5 rating since 2007, and 82 recommendations. You can read individual client reviews, view project case studies, and verify our Preferred Freelancer status. For first-time US clients who prefer the safety of an escrow platform, we are happy to run the initial project through Freelancer.com itself.' },
            { question: 'How do you handle the time zone difference?', answer: 'Our developers in Coimbatore, India are online during late afternoon and evening IST — which overlaps with US morning hours (3–4 hour overlap with EST, 6–7 hour overlap with PST). Daily standups can happen at the start of your day. Async messages on Slack are responded to within hours during business days.' },
            { question: 'What about IP ownership and NDAs?', answer: 'You own 100% of the code and assets we produce from the moment they are committed to your repository. Standard contract terms include mutual NDA and work-for-hire IP assignment. We can sign your existing MSA or use a simple one of ours.' },
            { question: 'How do we pay you from the US?', answer: 'We accept wire transfer, PayPal, and Freelancer.com escrow. Invoicing is in USD, typically net-15 for new clients and net-30 for ongoing engagements. For US tax purposes we are a foreign entity (W-8BEN-E available on request); you do not need to issue a 1099.' },
            { question: 'Do you have a US office or US phone number?', answer: 'No — our office is in Coimbatore, India. We are honest about this because our value to US clients is the cost and time-zone advantage of being remote. All communication happens over Slack, email, Zoom, or your preferred tool. We do not pretend to be local; we work hard to be excellent partners from where we are.' },
            { question: 'Is the US client work on Freelancer.com still active?', answer: 'Yes — we continue to maintain our Freelancer.com presence with active engagements alongside direct contracts with returning clients. Many clients who started on Freelancer have moved to direct retainers with us over the years.' },
        ],
        ctaHeading: 'Ready to ship faster with a partner who has done this since 2007?',
        ctaSubhead: 'Free 30-minute call. Fixed-price proposal in 48 hours. Verifiable track record on Freelancer.com.',
        metaTitle: 'IT Outsourcing for US Companies | Hire Indian Developers',
        metaDescription: 'US businesses trust Stallioni for web, mobile, and e-commerce builds. 4.8★ on Freelancer.com since 2007, 978 reviews. Free quote, USD invoicing.',
    },

    'australia': {
        slug: 'australia',
        regionDisplayName: 'Australian',
        badge: 'For Australian Businesses',
        h1Top: 'IT Outsourcing for Australian Businesses',
        h1Highlight: 'India-Based, Australia-Friendly Hours',
        subhead: 'We have built websites, e-commerce stores, and apps for Australian clients via Freelancer.com since 2007 — 4.8★ rating, 978 reviews, Preferred Freelancer status. Including Australian e-commerce builds like a Shopify honey store.',
        primaryCta: 'Get a Free Sydney-Hours Call',
        whySectionTitle: 'Why Australian Companies Hire Stallioni',
        whyPoints: [
            { title: 'Real Experience with Australian Projects', description: 'Australian clients appear repeatedly on our Freelancer.com profile, including a Shopify e-commerce store for an Australian honey brand. We understand AUD pricing, AU consumer expectations, and the design sensibilities of Australian brands.' },
            { title: 'Useful Time Zone Overlap', description: 'India is 4.5 hours behind AEST (5.5 behind AEDT). Our team is online from 8 AM IST, which is 12:30 PM Sydney/Melbourne. That gives Australian clients a full afternoon of real-time collaboration every single working day — no other major outsourcing region offers this.' },
            { title: 'Significant Cost Saving vs AU Salaries', description: 'Senior developers in Sydney and Melbourne now cost AU$150K–$220K plus super and on-costs. Our public Freelancer.com hourly rate of $12 USD (~AU$18) and our project-based pricing offer a major cost saving — often 50–60% reduction in total engineering spend.' },
            { title: 'Solves the AU Tech Skill Shortage', description: 'Australia has a well-documented shortage of senior developers, with 60,000+ unfilled tech roles per recent industry reports. We give you access to senior engineers without 6-month recruitment cycles or 482 visa sponsorship hurdles.' },
            { title: 'Preferred Freelancer + 19 Years of Reviews', description: '978 reviews on Freelancer.com over 19 years, 4.8★ average, Preferred Freelancer status, 96% on-budget delivery rate. Australian buyers can verify our track record on the public profile before signing anything.' },
            { title: 'Direct Communication, No Account Hand-offs', description: 'Most large outsourcing firms pass you between sales, account, and delivery teams. With us, you talk directly to the people building your project. Communication on Slack, email, or Zoom — whichever your team prefers.' },
        ],
        bodyParagraphs: [
            {
                heading: 'The Australian Tech Talent Gap',
                text: 'Australia faces one of the most acute software-developer shortages in the developed world. Vacancy rates in tech roles sit around 8% — one in twelve roles cannot be filled locally. Sydney and Melbourne salaries for senior engineers have climbed past AU$180K base before bonuses, and recruitment fees of 20–25% of first-year salary are the norm. For startups, Series A teams, and established businesses trying to ship a new product, this combination of cost and scarcity is paralyzing. Outsourcing to a long-trusted India-based team like Stallioni gives you access to similar senior-level talent in your business hours — at a significantly lower all-in cost — within weeks rather than months.',
            },
            {
                heading: 'Our Australian Project Track Record',
                text: 'Australia is one of our recurring client regions on Freelancer.com. Our public portfolio includes a Shopify build for an Australian honey brand, e-commerce work for AU-focused stores, and various smaller WordPress and design projects for Australian agencies. The pattern: clean delivery, AUD-friendly pricing, and Australian-business-hour availability.',
            },
            {
                heading: 'How We Work with Australian Clients',
                text: 'Australian engagements typically start with a 30-minute call between 1 PM and 5 PM Sydney/Melbourne time (8:30 AM and 12:30 PM IST). Within 48 hours we deliver a fixed-scope proposal with milestones and AUD-equivalent pricing. Work begins within 5–7 working days of signing. We use Slack, GitHub, Linear or Jira, and Figma — or adapt to whatever your team already uses. Weekly demos every Friday afternoon Sydney time. Milestone-based invoicing keeps both sides aligned on progress.',
            },
            {
                heading: 'Pricing for Australian Clients',
                text: 'Our hourly rate starts at $12 USD (around AU$18). For dedicated team engagements, monthly rates per developer typically run AU$3,500–$6,500 depending on seniority and stack. Fixed-scope MVPs and redesigns generally run AU$10K–$70K. Invoicing in USD or AUD (your choice), payable via wire transfer or PayPal. Freelancer.com escrow is available for first-time clients who prefer that safety. No setup fees, no recruitment fees, no markup on third-party costs.',
            },
            {
                heading: 'Important: We Are Based in India, Not Australia',
                text: 'We do not have an Australian office, an AU phone number, or Australian Business Number. We work with Australian clients remotely from Coimbatore, India — same as we have for nearly two decades. Our advantage is the time-zone overlap and cost saving that comes from being in India; we do not try to disguise our location. All meetings happen on Zoom or Google Meet, all collaboration on Slack and your project tools. Many Australian clients have engaged us repeatedly over years, so this model clearly works — but it is right to be upfront about it.',
            },
        ],
        servicesIntro: 'Australian clients most commonly engage us for these services. Click any to see our detailed approach and typical timelines.',
        featuredServices: FEATURED_SERVICES_DEFAULT,
        faqs: [
            { question: 'How can I verify your work with Australian clients?', answer: 'Our public Freelancer.com profile at freelancer.com/u/graphicaa shows reviews from clients including some in Australia, plus a portfolio that includes Australian-specific projects (e.g. the Australian honey e-commerce store). You can read individual reviews, see project case studies, and verify our Preferred Freelancer status before contacting us.' },
            { question: 'How does the time zone work day-to-day?', answer: 'India is 4.5 hours behind AEST and 5.5 behind AEDT. Our team is online from 8 AM IST, which is 12:30 PM Sydney/Melbourne time. You get a full afternoon (12:30 PM to 8 PM local) of overlapping real-time work every business day. Slack messages get responses within an hour during overlap.' },
            { question: 'Can you invoice in AUD?', answer: 'Yes, we can invoice in AUD or USD — your preference. Payment via international wire transfer or PayPal. For first-time clients who prefer the safety of an escrow platform, we are happy to run the initial project through Freelancer.com itself.' },
            { question: 'Do you have an Australian office, phone number, or ABN?', answer: 'No — we are honest about this. Our only office is in Coimbatore, India. We do not have an ABN, an Australian phone number, or a local representative. Our value to Australian clients is the time-zone overlap and cost advantage of being India-based, not a fake local presence. All communication happens remotely on Slack, email, and Zoom.' },
            { question: 'How do you handle data residency for AU privacy compliance?', answer: 'We deploy your application to whichever cloud region you prefer — including AWS Sydney (ap-southeast-2), Azure Australia East, or any other Australian region. Customer data stays where you want it. Our developers access your systems via secure means without copying production data offshore.' },
            { question: 'Have you worked with Australian businesses before?', answer: 'Yes — Australian clients appear on our Freelancer.com profile, including the Shopify e-commerce store for an Australian honey brand mentioned in our portfolio. We have done WordPress, e-commerce, and design work for various AU-focused businesses since 2007.' },
        ],
        ctaHeading: 'Let\'s build your project — with an Australian-hours-friendly remote team',
        ctaSubhead: 'Free 30-minute scoping call. Fixed-price proposal in 48 hours. Verifiable track record on Freelancer.com since 2007.',
        metaTitle: 'IT Outsourcing for Australian Businesses | Indian Developers',
        metaDescription: 'Australian businesses trust Stallioni for web, e-commerce, and app builds. 4.8★ on Freelancer.com since 2007, AEST-friendly hours, AUD-friendly pricing.',
    },

    'india': {
        slug: 'india',
        regionDisplayName: 'Indian',
        badge: 'For Indian Businesses & Startups',
        h1Top: 'IT Outsourcing for Indian Businesses',
        h1Highlight: 'Coimbatore-Based, Trusted Since 2007',
        subhead: 'Indian startups, MSMEs, and growth-stage companies hire Stallioni for websites, mobile apps, and SaaS products. Same time zone, same language, local team — and 19 years of cross-border delivery experience to prove it works.',
        primaryCta: 'Talk to Our Coimbatore Team',
        whySectionTitle: 'Why Indian Companies Hire Stallioni',
        whyPoints: [
            { title: 'Local Team in Coimbatore, Tamil Nadu', description: 'Our office is at 23 Jayanth Complex, TP Road, Annur, Coimbatore-641653. Tamil Nadu and Bangalore clients can meet our team in person for kickoffs or major milestones if helpful.' },
            { title: 'Same Time Zone, Same Working Day', description: 'No time zone gap, no waiting until next morning for a reply. Standups, code reviews, and demos happen during your normal business hours. WhatsApp and phone calls work in real time.' },
            { title: 'Hindi, English, and Tamil Speaking Team', description: 'Most technical conversation happens in English, but founder and stakeholder discussions can happen in Hindi, English, or Tamil — whichever is most comfortable for your team.' },
            { title: '19+ Years of Cross-Border Delivery', description: 'We have been delivering to international clients on Freelancer.com since 2007 — 4.8★ rating, 978 reviews, Preferred Freelancer status. Indian businesses get the same offshore-grade engineering, without the cross-border complications.' },
            { title: 'INR Invoicing, Indian Payment Methods', description: 'We invoice in INR with proper tax treatment. Payment via NEFT, IMPS, RTGS, or UPI — no FOREX, no TT fees, no LRS limits. Settlement happens in your own bank within 24 hours.' },
            { title: 'Familiarity with India Stack & Indian Payments', description: 'We have worked with Razorpay, Cashfree, PhonePe, and Paytm Business for payment integrations. We can integrate with Aadhaar eKYC, UPI deep links, and DigiLocker where required for your industry.' },
        ],
        bodyParagraphs: [
            {
                heading: 'Why Indian Businesses Should Hire an Indian Outsourcing Partner',
                text: 'India\'s IT outsourcing industry is well known for serving foreign clients — but Indian businesses themselves often struggle to find a reliable local development partner. The large IT firms (TCS, Infosys, Wipro) have minimum engagement sizes that put them out of reach for most startups and mid-market companies. Freelancers from job portals are inconsistent and rarely senior. Stallioni is built for the middle ground: senior offshore-grade engineering, priced and contracted in a way that works for Indian businesses. Same language, same time zone, same banking system — none of the cross-border friction.',
            },
            {
                heading: 'How We Work with Indian Clients',
                text: 'Indian engagements are simpler than international ones because there is no time zone, currency, or compliance gap. We start with a 30-minute discovery call — in person if you are in Coimbatore, Chennai, or nearby, video otherwise. Within 48 hours we deliver a fixed-scope proposal in INR with milestones and timelines. Work typically begins within 5 working days. We use Slack, GitHub, and Notion as defaults, but adapt to whatever your team uses (including WhatsApp groups for stakeholder communication, which is common in Indian businesses). Weekly demos in your time zone, milestone-based invoicing in INR.',
            },
            {
                heading: 'Verifiable Track Record',
                text: 'Although most of our public reviews come from international clients on Freelancer.com (4.8★, 978 reviews since 2007), the same team, the same office, and the same engineering standards serve Indian businesses too. The advantage of working with us locally is that you can verify our work in person, meet the engineers building your project, and avoid the cross-border friction that international clients have to accept. The downside, honestly, is that our pricing reflects the international rates we are accustomed to — we are not the cheapest option in the Indian market, but we are not the most expensive either.',
            },
            {
                heading: 'Pricing for Indian Clients',
                text: 'Our Freelancer.com profile shows a public hourly rate of $12 USD (~₹1,000). For Indian businesses, dedicated developer rates typically run ₹40,000–₹1,20,000 per developer per month depending on stack, seniority, and team size. Most fixed-scope projects (MVPs, e-commerce builds, mobile apps) range from ₹3 lakh to ₹40 lakh. Invoicing in INR with applicable GST, payable via NEFT, IMPS, RTGS, or UPI. No setup fees. No recruitment fees. No markup on third-party costs.',
            },
        ],
        servicesIntro: 'Indian clients most often hire us for these services. Click any for detailed scope, typical timelines, and INR pricing ranges.',
        featuredServices: FEATURED_SERVICES_DEFAULT,
        faqs: [
            { question: 'Can I visit your office to meet the team?', answer: 'Yes — for Indian clients we welcome in-person meetings at our Coimbatore office (23 Jayanth Complex, TP Road, Annur, Coimbatore-641653, Tamil Nadu). For clients in Chennai, Bangalore, Madurai, and nearby cities, travel for kickoffs and major milestones can also be arranged.' },
            { question: 'Do you invoice in INR with GST?', answer: 'Yes. We invoice in INR with applicable tax treatment. Payment via NEFT, IMPS, RTGS, or UPI. We can issue advance receipts and final tax invoices per Indian accounting practice. Most engagements are net-30 from invoice date.' },
            { question: 'Do you handle India-specific integrations like Razorpay, UPI, and Aadhaar?', answer: 'Yes. We have built integrations with Razorpay, Cashfree, PhonePe, and Paytm Business for payments; UPI deep links for QR-based and in-app payments; and Aadhaar eKYC / DigiLocker for verification where required. We also work with FASTag and IRCTC APIs where relevant for travel and logistics businesses.' },
            { question: 'What is the minimum engagement size?', answer: 'For fixed-scope projects, we typically take on builds starting around ₹3 lakh. For dedicated team engagements, the minimum is one developer for 3 months. For smaller, one-off needs (a quick landing page, a small WordPress fix), we recommend you use our Freelancer.com profile for safety and structure.' },
            { question: 'How can I verify your work before hiring?', answer: 'Our public Freelancer.com profile at freelancer.com/u/graphicaa shows 978 reviews, a 4.8 / 5 rating since 2007, and Preferred Freelancer status. Most reviews are from international clients (US, UK, Australia, Europe) which speaks to our engineering and communication standards. We can also share Indian client references on request after a first call.' },
            { question: 'Are you the cheapest Indian outsourcing option?', answer: 'No — we are honest about this. Our pricing reflects 19+ years of international client work and is comparable to what we charge US, UK, and Australian clients. If you are looking for the absolute lowest hourly rate, there are cheaper options in the market. What we offer is reliability, verified track record, and engineering quality that has held up across 978 international reviews.' },
        ],
        ctaHeading: 'Build your next product with a Coimbatore-based partner you can verify',
        ctaSubhead: 'Free 30-minute call (in person if you are nearby). INR proposal within 48 hours. Verifiable Freelancer.com track record since 2007.',
        metaTitle: 'IT Outsourcing for Indian Businesses | Coimbatore Development',
        metaDescription: 'Indian businesses hire Stallioni for web, mobile, and SaaS development. Coimbatore team, INR pricing, 4.8★ on Freelancer.com since 2007, in-person meetings.',
    },
};
