/**
 * Resources hub content for stallioni.com/resources.
 *
 * Each article publishes as a standalone page (prerendered for SEO) and
 * automatically appears in the hub listing. Article URLs are
 * /resources/<slug>.
 *
 * When a new affiliate program approves, update the corresponding product's
 * `affiliateUrl` here — every article that references that product picks up
 * the new URL automatically.
 */

export type ResourceCategory = 'ecommerce' | 'hosting' | 'seo' | 'design' | 'tools';

export interface ProductCard {
    /** Display name (e.g., "Shopify"). */
    name: string;
    /** One-line value prop. */
    tagline: string;
    /** Pricing in the article's primary currency. */
    pricing: string;
    /** Star rating from 0-5 — leave undefined to hide. */
    rating?: number;
    /** Honest pros — keep to 3-5 bullets. */
    pros: string[];
    /** Honest cons — keep to 2-3 bullets. */
    cons: string[];
    /** Who this is best for in 1 short phrase. */
    bestFor: string;
    /** Affiliate URL — falls back to canonical product URL if not yet approved. */
    affiliateUrl: string;
    /** Provider key for GA4 click tracking. */
    affiliateProvider: string;
    /** Button text — defaults to "Try {name}". */
    ctaLabel?: string;
}

export interface ArticleSection {
    heading: string;
    /** Paragraphs separated by blank lines; supports inline markdown-style **bold**. */
    body: string;
    /** Product cards rendered inside this section. */
    productCards?: ProductCard[];
}

export interface ComparisonRow {
    feature: string;
    /** Values aligned to ComparisonTable.columns. */
    values: string[];
}

export interface ComparisonTable {
    columns: string[];
    rows: ComparisonRow[];
}

export interface ResourceArticle {
    slug: string;
    category: ResourceCategory;
    /** YYYY-MM-DD. */
    publishedDate: string;
    /** YYYY-MM-DD if revised after publication. */
    updatedDate?: string;
    author: string;
    /** Approximate reading time in minutes. */
    readTimeMinutes: number;
    // SEO
    metaTitle: string;
    metaDescription: string;
    ogImage?: string;
    // Content
    h1: string;
    /** Short summary shown at the top + used for OG description fallback. */
    summary: string;
    /** Hero intro — 2-3 paragraphs, sets context and our angle. */
    intro: string;
    /** Optional quick verdict box (winner / runner-up / budget pick). */
    quickVerdict?: {
        winner: { name: string; reason: string };
        runnerUp?: { name: string; reason: string };
        budget?: { name: string; reason: string };
    };
    /** Optional comparison table — great for "X vs Y" articles. */
    comparisonTable?: ComparisonTable;
    sections: ArticleSection[];
    /** FAQ items used both visually and as FAQPage JSON-LD. */
    faqs?: { question: string; answer: string }[];
    /** Closing paragraph. */
    conclusion: string;
    /** Internal links to related Stallioni services. */
    relatedServices?: { name: string; slug: string }[];
}

// ----------------------------------------------------------------------
// FIRST ARTICLE — uses our already-active Shopify Partners affiliate.
// When other programs approve, swap in their affiliate URLs.
// ----------------------------------------------------------------------

const SHOPIFY_VS_WOO: ResourceArticle = {
    slug: 'shopify-vs-woocommerce-2026',
    category: 'ecommerce',
    publishedDate: '2026-06-13',
    author: 'Sebastian Yesuraj',
    readTimeMinutes: 12,
    metaTitle: 'Shopify vs WooCommerce 2026: Honest Comparison from an Agency',
    metaDescription:
        'We have built dozens of stores on both. Here is when to pick Shopify, when to pick WooCommerce, and the hidden costs no one talks about.',
    ogImage:
        'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&h=630&auto=format&fit=crop',
    h1: 'Shopify vs WooCommerce in 2026: Which Should You Actually Pick?',
    summary:
        'A working agency perspective on Shopify vs WooCommerce — total cost of ownership, time to launch, who each one is really for, and the trade-offs no one mentions until you are six months in.',
    intro:
        'We have shipped stores on both platforms — from small artisan brands on Shopify to high-traffic WooCommerce sites with custom checkout flows. Every founder who asks us "Shopify or WooCommerce?" gets the same first answer: the right pick depends less on the platform features and more on who is going to maintain the store, how much customization you really need, and how comfortable you are owning hosting and security.\n\nThis article is the honest version of that conversation — the same one we have when scoping projects. We have no neutral horse in this race: we build on both, and we are a Shopify Partner. We will flag where our incentives might bias us. Everything below is what we tell paying clients, not what the marketing pages say.\n\nIf you are completely new to e-commerce, jump to the "Quick verdict" box. If you are evaluating a migration, scroll to the cost section first — that is where the surprises live.',
    quickVerdict: {
        winner: {
            name: 'Shopify',
            reason:
                'For 80% of new e-commerce founders — fastest to launch, fewest moving parts, scales to millions in revenue without infrastructure work.',
        },
        runnerUp: {
            name: 'WooCommerce',
            reason:
                'For brands that need deep customization, run content-heavy sites, or already operate on WordPress and have a developer on call.',
        },
        budget: {
            name: 'Shopify (still)',
            reason:
                'Once you add up hosting, security, plugins, and developer time, WooCommerce is rarely cheaper for a real store under $50k/month revenue.',
        },
    },
    comparisonTable: {
        columns: ['Factor', 'Shopify', 'WooCommerce'],
        rows: [
            {
                feature: 'Monthly platform cost',
                values: ['$29 – $399 (Basic to Advanced)', 'Free, but you pay hosting + plugins'],
            },
            {
                feature: 'Realistic total monthly cost',
                values: ['$50 – $500', '$50 – $300 (lean) up to $1,000+ (apps + premium hosting)'],
            },
            {
                feature: 'Time to launch (basic store)',
                values: ['1 – 2 weeks', '3 – 6 weeks'],
            },
            {
                feature: 'Hosting & security',
                values: ['Handled by Shopify', 'Your responsibility'],
            },
            {
                feature: 'Customization ceiling',
                values: ['Medium — Liquid templates + apps', 'Very high — full WordPress + PHP'],
            },
            {
                feature: 'SEO control',
                values: ['Good — limited URL structure', 'Excellent — Yoast/RankMath + full control'],
            },
            {
                feature: 'Best for',
                values: ['DTC brands, fast launches, non-technical founders', 'Content-heavy stores, custom flows, WP-native teams'],
            },
            {
                feature: 'Transaction fees',
                values: ['0% on Shopify Payments, 0.5–2% on others', '0% — your payment processor only'],
            },
        ],
    },
    sections: [
        {
            heading: 'The real cost difference (it is not what you think)',
            body:
                'The internet says "WooCommerce is free." Technically true. Practically misleading.\n\nA working WooCommerce store typically needs: managed WordPress hosting ($30–$200/month), a paid theme ($60–$150 one-off), security/backup plugins ($60–$100/year), an SEO plugin ($99/year for the paid tier), an email/marketing plugin, a page builder if you want one, and a developer on retainer or available when something breaks ($75–$200/hour). For most real stores, that adds up to $80–$250 per month before you have sold a single thing.\n\nShopify Basic starts at $29/month and includes hosting, SSL, automatic security updates, 24/7 support, and a baseline checkout that just works. Add a couple of apps (Klaviyo, a review tool, maybe a bundle app) and you are at $80–$150 all-in. The price difference is real but smaller than people assume — and Shopify includes the "boring" infrastructure work you would otherwise pay a developer to maintain.\n\n**Where WooCommerce genuinely wins on cost**: very high-volume stores ($500k+/month) where Shopify Plus pricing kicks in, and very low-volume stores ($0-2k/month) where you can run on cheap shared hosting and the founder maintains everything personally.',
        },
        {
            heading: 'When to pick Shopify',
            body:
                'Pick Shopify if any of these are true:\n\n• You are launching your first store and want to be selling within 2 weeks\n• Your founder team has no developer and no plans to hire one\n• You want predictable monthly costs without "surprise" plugin upgrades\n• You are running paid ads and need conversion-optimized checkout out of the box\n• You will sell across multiple channels (Instagram, TikTok, Amazon, in-person POS)\n• You are migrating from Etsy, Squarespace Commerce, or BigCartel and want a smooth upgrade\n• Your product catalog is under 1,000 SKUs and you do not need exotic custom logic\n\nReal example from our agency work: a Coimbatore-based home decor brand launched on Shopify in 11 days, hit $4k revenue in the first month with zero developer involvement, and added a B2B wholesale portal via the Shopify B2B feature six months later — all without touching code.',
            productCards: [
                {
                    name: 'Shopify',
                    tagline: 'The fastest path from idea to a working store',
                    pricing: 'From $29 / month',
                    rating: 4.5,
                    pros: [
                        'Production-ready in days, not weeks',
                        'Hosting, security, updates handled for you',
                        'Best-in-class checkout conversion rates',
                        'Massive app ecosystem (8,000+ apps)',
                        'Native multi-channel selling (social, Amazon, POS)',
                    ],
                    cons: [
                        'Transaction fees if you use a non-Shopify payment processor',
                        'Theme customization is limited compared to full WordPress',
                        'URL structure is rigid — SEO purists notice the /products/ and /collections/ prefixes',
                    ],
                    bestFor: 'New DTC brands, non-technical founders, multi-channel sellers',
                    affiliateUrl: 'https://www.shopify.com/free-trial',
                    affiliateProvider: 'shopify',
                    ctaLabel: 'Try Shopify Free for 3 Days',
                },
            ],
        },
        {
            heading: 'When to pick WooCommerce',
            body:
                'Pick WooCommerce if any of these are true:\n\n• You already run WordPress for your main site and want a unified stack\n• Your store is genuinely unusual — subscription bundles, custom configurators, wholesale-only pricing, complex tax rules\n• You publish a LOT of content (blogs, guides, learn-center) and want it tightly integrated with your store\n• You have a developer on staff or a long-term agency relationship\n• You want to own your data and infrastructure end-to-end\n• You are price-sensitive at the very low end ($0–$2k/month revenue) and willing to do maintenance yourself\n• You need SEO control beyond what hosted platforms offer — exact URL structure, schema control, structured content models\n\nReal example: a B2B industrial supplies catalog we built on WooCommerce with 15,000+ SKUs, customer-specific pricing tiers, and quote-to-order flows. Shopify could have handled the catalog size but not the custom pricing logic without significant app spending. WooCommerce + custom plugins came in cheaper and more maintainable over a three-year horizon.',
            productCards: [
                {
                    name: 'WooCommerce',
                    tagline: 'Maximum control, on top of WordPress',
                    pricing: 'Free plugin + hosting ($30+/mo)',
                    rating: 4.0,
                    pros: [
                        'Total control — own your data and infrastructure',
                        'Best-in-class SEO via WordPress',
                        'Massive plugin ecosystem (paid and free)',
                        'No platform transaction fees ever',
                        'Tight integration with WordPress content',
                    ],
                    cons: [
                        'You are the sysadmin — hosting, security, backups, updates are on you',
                        'Plugin conflicts can break the site silently',
                        'Setup time is 3-4x longer than Shopify for the same result',
                    ],
                    bestFor: 'WordPress-native teams, content-heavy stores, complex custom logic',
                    affiliateUrl: 'https://woocommerce.com/',
                    affiliateProvider: 'woocommerce',
                    ctaLabel: 'See WooCommerce',
                },
                {
                    name: 'Cloudways (recommended WooCommerce hosting)',
                    tagline: 'The managed hosting our team picks for WooCommerce clients',
                    pricing: 'From $14 / month (pay-as-you-go)',
                    rating: 4.7,
                    pros: [
                        'Hourly billing — pause or resize servers without long-term contracts',
                        'Free SSL, free CDN, daily backups, server-level caching built in',
                        'Choose your cloud (DigitalOcean, Vultr, Linode, AWS, GCP) — same dashboard',
                        '24/7 live chat — actually responds in minutes, not hours',
                        'WooCommerce-tuned PHP and Redis cache configurations out of the box',
                    ],
                    cons: [
                        'Not the absolute cheapest option (Bluehost shared is cheaper, but slower and less reliable)',
                        'No email hosting — you will need Google Workspace or Zoho separately',
                    ],
                    bestFor: 'WooCommerce stores doing $2k–$200k/month that want managed hosting without the agency price tag',
                    affiliateUrl: 'https://www.cloudways.com/en/?id=2179273',
                    affiliateProvider: 'cloudways',
                    ctaLabel: 'Try Cloudways Free for 3 Days',
                },
            ],
        },
        {
            heading: 'The hidden trade-offs nobody mentions',
            body:
                '**Migration is harder than they say — both ways.** Moving from Shopify to WooCommerce (or back) means re-mapping product URLs, redirecting 301s, exporting customer accounts (passwords cannot be migrated — customers will need to reset), and re-implementing every integration. Plan for 6-12 weeks of cleanup, not the "easy CSV import" the marketing pages suggest.\n\n**SEO is real but overstated.** WooCommerce gets praised for SEO. The truth: Shopify ranks fine for the vast majority of stores. The "SEO advantage" only matters at scale (10,000+ products, content-heavy strategies) or for very niche optimization. For most stores, your SEO is determined by your content and link-building, not your platform.\n\n**Apps and plugins are a tax.** Both platforms suffer from "death by a thousand subscriptions." Shopify apps average $10-30/month each; ten apps quickly become $200/month. WooCommerce plugins are often one-time purchases ($50-200) but require renewal for updates and support. Budget $100-300/month for apps regardless of platform.\n\n**Support quality is night and day.** Shopify has 24/7 chat support that genuinely helps in minutes. WooCommerce official support is community forums + plugin-specific support; getting help during an outage on a Saturday at 2 AM is on you.',
        },
        {
            heading: 'Our agency recommendation',
            body:
                'If we had to give one recommendation to a founder who has not started yet: **pick Shopify, launch in 2 weeks, validate your product, and only migrate to WooCommerce if you hit a specific limitation that affects revenue.**\n\nThe biggest mistake we see is founders spending 6 weeks comparing platforms and 6 more weeks setting up WooCommerce when they could have been selling on Shopify for 12 weeks. Time-to-revenue beats theoretical flexibility every time.\n\nIf you have already validated your product, you do thousands of orders/month, and you have hit a specific Shopify limitation (subscription complexity, wholesale tiers, custom checkout flow), WooCommerce becomes the better long-term home. That decision should be data-driven, not theoretical.',
        },
    ],
    faqs: [
        {
            question: 'Is Shopify cheaper than WooCommerce?',
            answer:
                'For most stores doing under $50,000/month revenue, Shopify is cheaper once you factor in hosting, security plugins, premium themes, and developer time. WooCommerce only becomes meaningfully cheaper at very low volume (you do maintenance yourself) or very high volume (Shopify Plus pricing kicks in).',
        },
        {
            question: 'Can I migrate from Shopify to WooCommerce later?',
            answer:
                'Yes, but it is a multi-week project. You will need to export products and customers (passwords cannot transfer), set up 301 redirects for product URLs, re-implement integrations, and rebuild theme customizations. Plan for 6-12 weeks of work and budget accordingly.',
        },
        {
            question: 'Which is better for SEO?',
            answer:
                'WooCommerce gives you more SEO control via plugins like Yoast and RankMath, but Shopify ranks fine for the vast majority of stores. Your SEO success depends 90% on content and backlinks, not platform choice. Pick based on your team and operations, not SEO theory.',
        },
        {
            question: 'Does Shopify charge transaction fees?',
            answer:
                'Shopify charges 0% transaction fees if you use Shopify Payments (their built-in processor). If you use a third-party processor like Stripe or PayPal directly, Shopify adds 0.5%-2% depending on your plan. WooCommerce has no platform transaction fees — only your payment processor charges.',
        },
        {
            question: 'How long does it take to launch a Shopify store?',
            answer:
                'A basic store with 10-50 products can launch in 1-2 weeks with a Shopify theme and minimal customization. A custom-built store with branded design and apps configured properly typically takes 3-5 weeks. WooCommerce equivalents take 2-3x longer because of hosting setup, plugin installation, and theme customization.',
        },
        {
            question: 'Should I hire an agency or do this myself?',
            answer:
                'If you are non-technical and Shopify, you can absolutely build a basic store yourself in a few days using a Shopify theme. If you want custom design, complex integrations, or you are choosing WooCommerce, hiring an agency or developer saves significant time and avoids costly mistakes. For WooCommerce specifically, having ongoing developer access (in-house or on retainer) is practically essential.',
        },
    ],
    conclusion:
        'Both platforms are legitimate, mature, and capable of running multi-million-dollar businesses. The question is not which is "better" but which fits your team, timeline, and operational comfort.\n\nIf you are starting fresh and want to be selling quickly: Shopify. If you are deep in WordPress and need custom logic: WooCommerce. If you are migrating between them: budget more time and money than the migration guides suggest.\n\nWe build on both. If you want a frank scoping conversation about your specific situation, we offer free 30-minute consultations — no pitch, just an honest answer about which platform fits your project.',
    relatedServices: [
        { name: 'Shopify Development', slug: 'shopify-development' },
        { name: 'WooCommerce Development', slug: 'woocommerce-devel' },
        { name: 'E-commerce Development', slug: 'ecommerce-development' },
    ],
};

export const RESOURCE_ARTICLES: ResourceArticle[] = [SHOPIFY_VS_WOO];

export const CATEGORY_LABELS: Record<ResourceCategory, string> = {
    ecommerce: 'E-Commerce',
    hosting: 'Hosting',
    seo: 'SEO & Marketing',
    design: 'Design',
    tools: 'Developer Tools',
};

export const CATEGORY_ORDER: ResourceCategory[] = ['ecommerce', 'hosting', 'seo', 'design', 'tools'];

/** Find article by slug — used by the article page route. */
export function getArticleBySlug(slug: string): ResourceArticle | undefined {
    return RESOURCE_ARTICLES.find((a) => a.slug === slug);
}

/** Articles grouped by category for the hub page. */
export function getArticlesByCategory(): Record<ResourceCategory, ResourceArticle[]> {
    const grouped: Record<ResourceCategory, ResourceArticle[]> = {
        ecommerce: [],
        hosting: [],
        seo: [],
        design: [],
        tools: [],
    };
    RESOURCE_ARTICLES.forEach((article) => {
        grouped[article.category].push(article);
    });
    return grouped;
}
