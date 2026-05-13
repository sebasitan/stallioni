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

const FEATURED_SERVICES_DEFAULT = [
    { name: 'Custom Web Applications', description: 'SaaS platforms, enterprise portals, and internal tools built for scale.', slug: 'custom-web-application-development' },
    { name: 'SaaS Development', description: 'End-to-end SaaS — multi-tenant architecture, Stripe billing, MVP in 90 days.', slug: 'saas-development' },
    { name: 'Mobile App Development', description: 'iOS, Android, React Native, and Flutter apps for startups and enterprises.', slug: 'mobile-app-development' },
    { name: 'E-Commerce Development', description: 'Shopify, WooCommerce, BigCommerce, and headless commerce builds.', slug: 'ecommerce-development' },
    { name: 'UI/UX Design', description: 'User research, Figma prototypes, design systems, and accessibility-first design.', slug: 'ui-ux-design' },
    { name: 'API Development', description: 'REST and GraphQL APIs documented with OpenAPI and tested for production load.', slug: 'api-development' },
];

export const REGIONAL_PAGES: Record<string, RegionalPageData> = {
    'usa': {
        slug: 'usa',
        regionDisplayName: 'USA',
        badge: 'For US-Based Businesses',
        h1Top: 'IT Outsourcing for US Companies',
        h1Highlight: 'Save 60% on Development Costs',
        subhead: 'Hire dedicated remote developers from India to scale your engineering team without the overhead of US salaries, recruiting fees, or office space. Built for US startups, agencies, and growth-stage SaaS companies.',
        primaryCta: 'Schedule a Free Consultation',
        whySectionTitle: 'Why US Companies Choose Stallioni',
        whyPoints: [
            { title: '60–70% Lower Engineering Cost', description: 'A senior full-stack developer in San Francisco costs $180K–$250K all-in. Our equivalent talent costs you $50K–$80K — same quality, same English fluency, no recruiter fees.' },
            { title: 'Overlap with US Working Hours', description: 'Our team works 6 PM IST to 2 AM IST — a 4-hour overlap with EST and 7-hour overlap with PST. Daily standups happen in your morning, not the middle of our night.' },
            { title: 'No H-1B, No Sponsorship, No Compliance Burden', description: 'You sign a contract with Stallioni, not 10 individual contractors. We handle taxes, payroll, IP assignment, and equipment in India. You get senior engineers on a single monthly invoice.' },
            { title: 'US Time Zone Project Managers', description: 'Every account has a US-hours-aligned PM as your single point of contact. No 12-hour delays. No language friction. Slack and Zoom are the default.' },
            { title: 'Battle-Tested Stack Familiar to US Teams', description: 'React, Next.js, Node.js, TypeScript, Python, Go, AWS, Vercel, PostgreSQL — the same stack as your US team. Code that lands in your repo passes your code review.' },
            { title: '900+ Projects Across Fintech, SaaS & Healthcare', description: 'We have shipped production code for US startups in YC, Series A SaaS companies, and Fortune 500 enterprise teams. References available on request.' },
        ],
        bodyParagraphs: [
            {
                heading: 'Why US Businesses Outsource to India in 2026',
                text: 'The US tech talent market has been brutal since 2022. Senior developers cost $200K+, recruiting cycles run 4–6 months, and the cost of a bad hire is six figures. Meanwhile, the demand for software has not slowed — every business, from a 10-person startup to a Fortune 500, needs to ship faster than competitors. Outsourcing to India is no longer a cost-only play. It is now a velocity play: get senior talent online in 2 weeks, scale your team up or down without 90-day notice periods, and stay focused on customers and product rather than recruiting and HR.',
            },
            {
                heading: 'How We Work with US Clients',
                text: 'After a free 30-minute scoping call, we put together a fixed-scope proposal within 48 hours. You approve, sign the SOW, and within 7–10 days a dedicated team — typically a tech lead, 2–3 engineers, a designer if needed, and a US-hours PM — is in your Slack and pushing to your repo. We use the tools you use: GitHub or GitLab, Jira or Linear, Slack, Figma, Notion. Weekly demos, biweekly retros. You own all IP from day one (we sign a standard mutual NDA and IP assignment).',
            },
            {
                heading: 'Pricing Transparency',
                text: 'For US clients, a typical engagement is $5,000–$15,000 per month for a 2–3 person team. Fixed-scope projects run $15K–$80K for an MVP. We do not charge setup fees, recruiting fees, or markup on AWS or third-party API costs — those are passed through at cost with monthly invoices. If you want to scale up, give us 2 weeks notice and we have a vetted bench. If you want to scale down, the same.',
            },
        ],
        servicesIntro: 'These are the services US clients most often hire us for. Click any to see specifics, our stack, and case studies.',
        featuredServices: FEATURED_SERVICES_DEFAULT,
        faqs: [
            { question: 'How do you handle the time zone difference?', answer: 'Our developers work India evening hours (6 PM IST to 2 AM IST) which gives 4 hours overlap with US East Coast morning and 7 hours overlap with West Coast morning. Daily standups happen in your time zone, not ours. Slack is async-first, but we are available for real-time calls during overlap windows.' },
            { question: 'What about IP ownership and NDAs?', answer: 'You own 100% of all code, designs, and assets we produce from the moment they are committed to your repo. Standard contract terms include mutual NDA, work-for-hire IP assignment, and a no-compete clause. We can sign your existing MSA or use ours.' },
            { question: 'Can you pass US clients\' security and compliance reviews?', answer: 'Yes. We have completed SOC 2 vendor reviews for clients in fintech and healthcare, and we follow secure SDLC practices: code reviews, dependency scanning, secrets management via AWS Secrets Manager or Vault, and 2FA on every developer account. We can sign BAAs for HIPAA clients.' },
            { question: 'How do we pay you — wire, ACH, credit card?', answer: 'Wire transfer or ACH are standard. We invoice monthly net-30 in USD. For larger engagements (>$25K/mo), we offer net-15 with a 2% prompt-pay discount. We are registered as a foreign entity for US tax reporting (W-8BEN-E provided on signup).' },
            { question: 'What if a developer we like leaves Stallioni?', answer: 'We have a 0.4% annual attrition rate on long-term client teams (industry average is 18%). If a developer does leave, we provide a paid 30-day overlap with the replacement and reimburse the cost of any ramp-up time. Your knowledge transfer is documented in your Notion/Confluence, not in their heads.' },
        ],
        ctaHeading: 'Ready to ship faster with a US-aligned offshore team?',
        ctaSubhead: 'Free scoping call. Fixed-price proposal in 48 hours. First developers in your Slack within 10 days.',
        metaTitle: 'IT Outsourcing for US Companies | Hire Indian Developers',
        metaDescription: 'Cut engineering costs by 60% with dedicated remote developers from India. US-aligned project managers, EST/PST overlap hours, and SOC 2 compliance.',
    },

    'australia': {
        slug: 'australia',
        regionDisplayName: 'Australian',
        badge: 'For Australian Businesses',
        h1Top: 'IT Outsourcing for Australian Businesses',
        h1Highlight: 'Hire Indian Developers in AEST Hours',
        subhead: 'Build your engineering team with dedicated remote developers from India who work in your Sydney, Melbourne, or Brisbane business hours. Save 50% on tech salaries without sacrificing quality.',
        primaryCta: 'Book a Sydney-Hours Call',
        whySectionTitle: 'Why Australian Companies Choose Stallioni',
        whyPoints: [
            { title: 'Full AEST/AEDT Overlap', description: 'India and Australia have a 4.5–5.5 hour time difference. Our team starts at 8 AM IST (12:30 PM AEST) — your full afternoon is real-time collaboration. No more "let\'s wait until tomorrow for an answer".' },
            { title: '50% Lower Cost Than Australian Salaries', description: 'A senior dev in Sydney costs AU$150K–$220K plus super and on-costs. Our equivalent talent is AU$70K–$90K all-in. Same quality, same English fluency, half the cost.' },
            { title: 'Solves Australia\'s Tech Skill Shortage', description: 'Australia has 60,000+ unfilled tech roles (per the 2025 Tech Council report). We give you instant access to senior engineers, designers, and DevOps specialists you cannot find locally in under 6 months.' },
            { title: 'No 482 Visa, No Sponsorship Risk', description: 'Hiring offshore via Stallioni avoids the 482 TSS visa process entirely. You get the same skilled talent without 6 months of immigration paperwork, sponsorship fees, or visa rejection risk.' },
            { title: 'GST-Compliant Invoicing for Australian Tax', description: 'We invoice in AUD with proper GST treatment for B2B service imports. Our entity is registered for Australian business dealings. Your accountant gets a clean tax invoice every month.' },
            { title: 'Australian Privacy Act & GDPR Aware', description: 'Our security practices comply with the Australian Privacy Principles (APP 1–13), GDPR for EU subsidiaries, and SOC 2 vendor expectations. We sign Australia-compatible NDAs and IP transfer agreements.' },
        ],
        bodyParagraphs: [
            {
                heading: 'The Australian Tech Talent Crisis',
                text: 'Australia faces one of the most severe technology skill shortages in the developed world. Job vacancy rates in software development hover around 8% — meaning one in twelve roles cannot be filled locally. Salaries have ballooned: senior software engineers in Sydney now command AU$180K+ base, before bonuses and equity. Recruitment fees of 20–25% of first-year salary are the norm. For a startup, a Series A team, or even an established business trying to ship a new product, this combination of cost and scarcity is paralyzing. Outsourcing to a proven India-based team like Stallioni gives you access to the same level of senior talent in the same time zone — at half the all-in cost — within weeks rather than quarters.',
            },
            {
                heading: 'Working with Stallioni from Australia',
                text: 'Our partnership model with Australian businesses is built around the AEST/AEDT working day. Our developers start at 8 AM IST (12:30 PM AEST) and work until 5 PM IST (9:30 PM AEDT). That gives you a full overlap from lunch through end-of-day Sydney/Melbourne time — perfect for daily standups in your afternoon, code reviews in your evening, and real-time pairing sessions for complex problems. Most clients use Slack and Zoom; we adapt to whatever your team already uses. Every account has an Australian-hours project manager as your single point of contact, so you are never waiting until next morning for an answer.',
            },
            {
                heading: 'Pricing & Engagement Models',
                text: 'For Australian clients, dedicated developer rates range from AU$3,500 to AU$6,500 per developer per month, depending on seniority and specialty. Most engagements are 3+ months on a rolling basis with 2 weeks notice to scale up or down. Fixed-scope MVP builds typically range from AU$25K to AU$120K. All pricing is in AUD with GST-compliant invoicing, payable via wire transfer or BPay. No setup fees, no markup on AWS or third-party API costs, no recruitment fees — just the hourly or monthly rate for your team.',
            },
        ],
        servicesIntro: 'Australian clients most commonly hire us for these services. Click any to see specifics and our typical project timelines.',
        featuredServices: FEATURED_SERVICES_DEFAULT,
        faqs: [
            { question: 'How does the time zone work day-to-day?', answer: 'India is 4.5 hours behind AEST (or 5.5 behind AEDT in summer). Our team works 8 AM to 5 PM IST, which is 12:30 PM to 9:30 PM AEST — meaning we are online for your entire afternoon. Daily standups typically happen at 1–2 PM Sydney/Melbourne time. Slack messages get answered within an hour during work hours.' },
            { question: 'Do you charge GST on invoices?', answer: 'For Australian B2B clients, our services are typically GST-free imports of services under the GST Act, but we can structure invoices to include GST where your accounting team prefers. We provide compliant tax invoices in AUD every month.' },
            { question: 'Is data hosted in Australia for compliance?', answer: 'We can deploy and host your application in AWS Sydney (ap-southeast-2) or Azure Australia East. Customer data stays in Australia for Australian Privacy Principle compliance. Our developers access systems via VPN and audit-logged sessions — they do not need to copy data offshore to do their work.' },
            { question: 'What about ATO and contractor compliance?', answer: 'You contract with Stallioni Net Solutions Pvt Ltd (Indian entity) for services, not with individual developers as contractors. This removes any sham contracting risk under the Fair Work Act. You receive a standard service invoice, not a contractor invoice.' },
            { question: 'Have you worked with Australian businesses before?', answer: 'Yes. We have ongoing engagements with Sydney-based fintech startups, a Melbourne-based health platform, a Brisbane construction tech company, and several agencies that white-label our work for their AU clients. References available after a first call.' },
        ],
        ctaHeading: 'Let\'s build your Australian tech team — without the AU price tag',
        ctaSubhead: 'Free 30-minute scoping call in your time zone. Detailed proposal within 48 hours.',
        metaTitle: 'IT Outsourcing for Australian Businesses | Indian Developers AEST',
        metaDescription: 'Hire dedicated Indian developers in AEST/AEDT hours. Save 50% vs Sydney salaries, skip 482 visa hassles, GST-compliant invoicing. Free consultation.',
    },

    'india': {
        slug: 'india',
        regionDisplayName: 'Indian',
        badge: 'For Indian Businesses & Startups',
        h1Top: 'IT Outsourcing for Indian Businesses',
        h1Highlight: 'Coimbatore-Based Development Partner',
        subhead: 'Indian startups, MSMEs, and growth-stage companies trust Stallioni to build web platforms, mobile apps, and SaaS products. Local team, GST invoicing, INR pricing, and no time zone friction.',
        primaryCta: 'Talk to Our Coimbatore Team',
        whySectionTitle: 'Why Indian Companies Choose Stallioni',
        whyPoints: [
            { title: 'Local Team, INR Invoicing, GST Compliant', description: 'Based in Coimbatore, Tamil Nadu. We invoice in INR with full GST compliance (GSTIN provided). Pay via NEFT, IMPS, RTGS, or UPI. No FOREX hassles, no TDS deductions on you, no compliance worries.' },
            { title: 'In-Person Meetings Possible', description: 'For Coimbatore, Chennai, Bangalore, Mumbai, and Delhi clients — we travel for kickoff meetings, quarterly reviews, and major milestones. Our office welcomes in-person walkthroughs of work in progress.' },
            { title: 'Built for Indian SaaS, D2C, and EdTech', description: 'We have shipped products for Indian D2C brands on Shopify and Magento, EdTech startups using AWS and PostgreSQL, and SaaS founders building for the Indian SMB market. We understand Razorpay, UPI, India Stack APIs, and DigiLocker integrations.' },
            { title: 'No Surprise Costs — Fixed INR Pricing', description: 'Our INR pricing is locked at signing — no exchange rate fluctuations, no quarterly increases. Most engagements run ₹2L–₹8L per month for a small team. Fixed-scope MVPs from ₹5L to ₹40L.' },
            { title: 'Hindi, English, Tamil, Telugu Speaking Team', description: 'Communicate in the language your founders or stakeholders are most comfortable with. Most technical discussion happens in English, but business calls happen in whatever works.' },
            { title: 'Made in India — DPIIT-Recognized', description: 'We are a registered Indian company contributing to the Digital India mission. Hiring us keeps your tech spend within the country and supports the local tech ecosystem.' },
        ],
        bodyParagraphs: [
            {
                heading: 'Why Indian Businesses Should Hire an Indian Outsourcing Partner',
                text: 'India\'s tech outsourcing industry is famous for serving foreign clients. But Indian businesses themselves often struggle to find a reliable local development partner. The big IT companies (TCS, Infosys, Wipro) have minimum engagement sizes of ₹50L+ and 6-month commitments — out of reach for most startups and mid-market businesses. Freelancers on Upwork or local hires from job portals are inconsistent and rarely senior. Stallioni is built for the middle ground: senior offshore-quality engineering, but priced and contracted for Indian businesses. We have shipped products for Bangalore-based SaaS founders, Mumbai e-commerce brands, Delhi consumer-tech startups, and Coimbatore manufacturing companies digitalizing their operations.',
            },
            {
                heading: 'How We Work with Indian Clients',
                text: 'Our process for Indian clients is simpler than for international ones because there are no time zone, currency, or compliance gaps. After a 30-minute call (in person if you are in Tamil Nadu, video if elsewhere), we deliver a fixed-scope proposal within 48 hours in Indian Rupees with GST. You approve, sign the SOW, and within 5 working days a dedicated team is set up. We use Slack, GitHub, Notion, and Figma — but we also work with WhatsApp groups, ClickUp, or whatever your team already uses. Weekly demos happen on Friday evenings (or anytime that works for you). Quarterly in-person reviews are included for clients in major Indian cities.',
            },
            {
                heading: 'Pricing for Indian Businesses',
                text: 'Dedicated developer pricing for Indian clients ranges from ₹40,000 to ₹1,20,000 per developer per month, depending on stack, seniority, and team size. Most engagements are 3 months minimum on a rolling basis. Fixed-scope projects (MVPs, redesigns, integrations) run from ₹3 lakhs to ₹40 lakhs depending on scope. All invoicing is in INR with 18% GST, payable via NEFT/IMPS/RTGS net 30. We can also work on retainer models for ongoing maintenance and growth work at predictable monthly fees.',
            },
        ],
        servicesIntro: 'Indian clients most often hire us for these services. Click to see our typical timelines, INR pricing ranges, and case studies.',
        featuredServices: FEATURED_SERVICES_DEFAULT,
        faqs: [
            { question: 'Do you invoice in INR with GST?', answer: 'Yes. We are GST-registered (GSTIN available on request) and issue tax invoices in INR with 18% GST. Payment via NEFT, IMPS, RTGS, or UPI. We can issue advance receipts and final tax invoices per Indian accounting standards.' },
            { question: 'Can you visit our office for meetings?', answer: 'Yes. For clients in Tamil Nadu (Coimbatore, Chennai, Madurai), travel is included. For other Indian cities (Bangalore, Mumbai, Delhi, Hyderabad, Pune), we travel for major milestones (kickoff, mid-project review, launch) and bill travel costs at cost. Most communication is over Slack and Zoom — physical meetings are not required for project success.' },
            { question: 'Do you handle India-specific integrations like UPI, Razorpay, and India Stack?', answer: 'Yes. We have built integrations with Razorpay, Cashfree, PhonePe, Paytm Business, BharatPe for payments; Aadhaar eKYC, DigiLocker, and UIDAI APIs for verification; and FASTag and IRCTC APIs for travel/logistics. We know the certification process for India Stack API access.' },
            { question: 'What is the minimum engagement size?', answer: 'For fixed-scope projects, we typically take on builds from ₹3 lakhs and up. For dedicated team engagements, the minimum is 1 developer for 3 months (~₹1.5L). For smaller needs (logo design, quick landing page fixes), we recommend our hourly retainer model at ₹3,500/hour.' },
            { question: 'What is your refund or cancellation policy?', answer: 'For monthly dedicated team engagements, we require 14 days notice to scale down or pause. For fixed-scope projects, payment is milestone-based — if you cancel mid-project, you pay only for completed milestones plus 50% of the next in-progress milestone. We have a 99.2% client retention rate, so cancellations are rare.' },
        ],
        ctaHeading: 'Build your next product with a trusted Indian development partner',
        ctaSubhead: 'Free 30-minute call. INR proposal in 48 hours. Team ready in under a week.',
        metaTitle: 'IT Outsourcing for Indian Businesses | Coimbatore Development',
        metaDescription: 'Indian businesses hire Stallioni for web, mobile, and SaaS development. INR pricing, GST invoicing, Coimbatore-based team. Free consultation in Hindi or English.',
    },
};
