// OPTIMIZED CONSTANTS FILE
// This file now only exports lightweight data that's needed on every page
// Heavy SERVICE_DETAILS are lazy-loaded via constants/service-loader.ts

// Re-export navigation and contact info
export {
    NAV_LINKS,
    getContactEmail,
    getWhatsAppPhone,
    getTeamsId,
    WHATSAPP_CONTACTS,
    RECAPTCHA_SITE_KEY,
} from './constants/nav';
export type { WhatsAppContact } from './constants/nav';

// Re-export optimized services overview for homepage/cards
export { SERVICES_OVERVIEW } from './constants/services-overview';

// SERVICE_DETAILS is NOT exported here - use getServiceDetails() from './constants/service-loader'
// For SEO that needs sync access, import directly from './constants-full'

// Import remaining lightweight data from the full file
import type { PortfolioItem, BlogPost, TeamMember, JobOpening, Testimonial, Technology } from './types';
import { PortfolioCategory, Industry } from './types';
import {
    ReactIcon, VueIcon, AngularIcon, NodeIcon, LaravelIcon, PHPIcon, PythonIcon, WordPressIcon, MagentoIcon, ShopifyIcon,
    WooCommerceIcon, ReactNativeIcon, FlutterIcon, SwiftIcon, AWSIcon, DockerIcon, SalesforceIcon, HubSpotIcon, ZohoIcon
} from './components/TechnologyIcons';

// NOTE: SERVICE_DETAILS is NO LONGER exported here to reduce bundle size!
// Use getServiceDetails() or getServiceDetail(id) from './constants/service-loader' instead

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
    { id: 1, title: 'Pergigian Setapak (Sri Rampai) — Dental Clinic Appointment Portal', category: PortfolioCategory.WEB, industry: Industry.HEALTHCARE, technologies: ['React', 'Node.js', 'MySQL', 'Tailwind CSS'], description: 'A modern appointment booking portal for Klinik Pergigian Setapak (Sri Rampai), a Malaysian dental clinic established in 1987. Patients can browse doctors, check schedules, and book consultations online — streamlining the front-desk workflow.', imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&h=900&auto=format&fit=crop', clientLocation: 'Kuala Lumpur, Malaysia', testimonial: 'A clean, fast appointment system that transformed how our patients connect with us. Modern, professional, and reliable.', projectUrl: 'https://www.kpsrirampai.com/' },
    { id: 2, title: 'AI-Powered Diagnostics Platform', category: PortfolioCategory.AI, industry: Industry.HEALTHCARE, technologies: ['Python', 'TensorFlow', 'React', 'Google Cloud'], description: 'An AI platform that assists radiologists by detecting anomalies in medical images with over 95% accuracy.', imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&h=400&auto=format&fit=crop', clientLocation: 'San Francisco, USA', testimonial: 'Their AI expertise is top-notch. The platform has transformed our diagnostic workflow and improved patient outcomes.' },
    { id: 3, title: 'Shopify Plus Headless Commerce', category: PortfolioCategory.ECOMMERCE, industry: Industry.ECOMMERCE_RETAIL, technologies: ['Shopify Plus', 'Next.js', 'GraphQL', 'Vercel'], description: 'A high-performance headless e-commerce build for a luxury fashion brand, resulting in a 200% conversion uplift.', imageUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=600&h=400&auto=format&fit=crop', clientLocation: 'Paris, France', testimonial: 'The new site is incredibly fast and flexible. Our content team can now launch campaigns in minutes, not days.' },
    { id: 4, title: 'Corporate Intranet & CMS', category: PortfolioCategory.WEB, industry: Industry.SAAS, technologies: ['WordPress', 'PHP', 'React', 'Docker'], description: 'A custom-built corporate intranet for a German engineering firm, enhancing internal communication for 5,000+ employees.', imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c7da?q=80&w=600&h=400&auto=format&fit=crop', clientLocation: 'Berlin, Germany', testimonial: 'The new intranet has boosted our employee engagement and streamlined our internal processes.' },
    { id: 5, title: 'National SEO Strategy for Law Firm', category: PortfolioCategory.SEO, industry: Industry.SAAS, technologies: ['SEMrush', 'Ahrefs', 'Google Analytics'], description: 'A comprehensive SEO campaign for a leading Canadian law firm, achieving page-one rankings for 50+ high-competition keywords.', imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&h=400&auto=format&fit=crop', clientLocation: 'Toronto, Canada', testimonial: 'Our organic traffic has tripled, and lead quality is higher than ever. Incredible results.' },
    {
        id: 6,
        title: 'Online Conveyancing Platform',
        category: PortfolioCategory.WEB,
        industry: Industry.REAL_ESTATE,
        technologies: ['PHP', 'MySQL', 'JavaScript', 'Custom CMS'],
        description: 'A comprehensive online platform for comparing conveyancing quotes from specialist solicitors, streamlining the UK property legal process.',
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Northampton, UK',
        testimonial: 'Making the conveyancing process clearer, easier, and hassle-free for property buyers across the UK.'
    },
    {
        id: 7,
        title: 'Advanced Natural Skincare',
        category: PortfolioCategory.ECOMMERCE,
        industry: Industry.HEALTHCARE,
        technologies: ['WooCommerce', 'WordPress', 'PHP', 'Elementor'],
        description: 'A premium e-commerce store for natural, toxin-free skincare products manufactured in Australia, featuring a clean and organic aesthetic.',
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Melbourne, Australia',
        testimonial: '100% Australian-made beauty products that deliver natural and highly-effective results for all ages.'
    },
    {
        id: 8,
        title: 'Danreise Norway Travel',
        category: PortfolioCategory.WEB,
        industry: Industry.TRAVEL_HOSPITALITY,
        technologies: ['PHP', 'Laravel', 'Vue.js', 'Google Maps API'],
        description: 'A specialized travel portal for Norwegian travelers, offering curated destination guides and booking integrations.',
        imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Oslo, Norway',
        testimonial: 'Exploring the world with personalized travel experiences and expert Norwegian guidance.'
    },
    {
        id: 9,
        title: 'Dunlevy Homeware Distribution',
        category: PortfolioCategory.WEB,
        industry: Industry.ECOMMERCE_RETAIL,
        technologies: ['PHP', 'SQL Server', 'B2B Portal', 'ERP Integration'],
        description: 'A legacy homeware distribution platform serving independent retailers and department stores across Ireland and the UK since 1870.',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Donegal, Ireland',
        testimonial: 'Design, import, and distribution excellence for homeware and giftware sectors in the UK and Ireland.'
    },
    {
        id: 10,
        title: 'Barbarossa Beer Brand Site',
        category: PortfolioCategory.WEB,
        industry: Industry.ECOMMERCE_RETAIL,
        technologies: ['WordPress', 'HTML5', 'GSAP', 'CSS3'],
        description: 'A high-impact brand website for Barbarossa Beer, featuring slow-aged lager history and interactive product showcases.',
        imageUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee8c796d?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Cincinnati, USA',
        testimonial: 'Honoring German tradition with slow-aged, deep reddish-brown lager excellence.'
    },
    {
        id: 11,
        title: 'C&R Design Remodel',
        category: PortfolioCategory.WEB,
        industry: Industry.REAL_ESTATE,
        technologies: ['WordPress', 'PHP', 'Portfolio Manager', 'SEO'],
        description: 'A long-standing Oregon remodeling firm website, showcasing a third-generation portfolio of kitchen and bathroom transformations.',
        imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Salem, Oregon, USA',
        testimonial: 'Custom-tailored remodeling solutions from a third-generation, family-owned business.'
    },
    {
        id: 12,
        title: 'Supreme Oil & Service',
        category: PortfolioCategory.WEB,
        industry: Industry.LOGISTICS,
        technologies: ['PHP', 'MySQL', 'Contact Management', 'Responsive UI'],
        description: 'A specialized service portal for heating oil delivery and maintenance in the White Plains area of New York.',
        imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'White Plains, NY, USA',
        testimonial: 'Reliable heating oil delivery with fixed-price and automatic delivery plans.'
    },
    {
        id: 13,
        title: 'Amanda Services Property Management',
        category: PortfolioCategory.WEB,
        industry: Industry.REAL_ESTATE,
        technologies: ['WordPress', 'Property Portal', 'Maintenance Logs', 'SEO'],
        description: 'A professional property management platform offering rent collection, inspections, and maintenance oversight for owners.',
        imageUrl: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Yonkers, NY, USA',
        testimonial: 'Professional, reliable, and personalized solutions for property owners and tenants.'
    },
    {
        id: 14,
        title: 'She Said YES! Photography',
        category: PortfolioCategory.WEB,
        industry: Industry.MEDIA_ENTERTAINMENT,
        technologies: ['WordPress', 'Gallery Engine', 'Booking System', 'CDN'],
        description: 'An elegant wedding photography and videography portfolio for an Australian boutique agency, focusing on timeless storytelling.',
        imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e80353?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Redcliffe, QLD, Australia',
        testimonial: 'Capturing timeless love stories and authentic emotions across Queensland.'
    },
    {
        id: 15,
        title: 'Manuka Honey London',
        category: PortfolioCategory.ECOMMERCE,
        industry: Industry.ECOMMERCE_RETAIL,
        technologies: ['Shopify', 'Liquid', 'Logistics API', 'Payment Gateway'],
        description: 'A premium Shopify-based e-commerce store selling 100% pure New Zealand Manuka Honey with high MGO ratings.',
        imageUrl: 'https://images.unsplash.com/photo-1587049352826-384196144ade?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'London, UK',
        testimonial: 'Pure New Zealand Manuka Honey delivered with verified antibacterial strength to London and beyond.'
    },
    {
        id: 16,
        title: 'Travel Inspirations Advisor',
        category: PortfolioCategory.WEB,
        industry: Industry.TRAVEL_HOSPITALITY,
        technologies: ['WordPress', 'Virtuoso Integration', 'Interactive Maps', 'Travel API'],
        description: 'A high-end travel advisory platform providing curated, tailor-made holiday experiences via the Virtuoso network.',
        imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Cranbourne, Australia',
        testimonial: 'Curating personalized and tailor-made holidays with expert travel logistics since the 1980s.'
    },
    {
        id: 17,
        title: 'Eyeforce Film Production',
        category: PortfolioCategory.WEB,
        industry: Industry.MEDIA_ENTERTAINMENT,
        technologies: ['Next.js', 'Vimeo API', 'Framer Motion', 'Tailwind CSS'],
        description: 'A visually stunning film production portfolio with offices in Amsterdam, Cape Town, and Lisbon, featuring extreme sports and environmental content.',
        imageUrl: 'https://images.unsplash.com/photo-1492691523567-6a7e5899938d?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Amsterdam, Netherlands',
        testimonial: 'Sports, environmental content, and authentic storytelling through world-class film and photography.'
    },
    {
        id: 18,
        title: 'HomeVast Romania',
        category: PortfolioCategory.ECOMMERCE,
        industry: Industry.ECOMMERCE_RETAIL,
        technologies: ['PrestaShop', 'PHP', 'Custom Product Configurator', 'MySQL'],
        description: 'An innovative Romanian e-commerce platform for home products, featuring a deep focus on product testing and quality assurance.',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Ilfov, Romania',
        testimonial: 'Prioritizing product quality and customer satisfaction through rigorous testing for the modern Romanian home.'
    },
    {
        id: 19,
        title: '&bouqu Creative Culture',
        category: PortfolioCategory.WEB,
        industry: Industry.MEDIA_ENTERTAINMENT,
        technologies: ['Shopify', 'Three.js', 'Custom CSS', 'Narrative Planning'],
        description: 'A creative culture catalyst platform offering narrative masterplanning and artisan scent products through a artistic interface.',
        imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Global',
        testimonial: 'Creative culture catalysts shaping narratives and designing unique customer journeys.'
    },
    {
        id: 20,
        title: 'Queen Esther Hair Covers',
        category: PortfolioCategory.ECOMMERCE,
        industry: Industry.ECOMMERCE_RETAIL,
        technologies: ['WooCommerce', 'WordPress', 'Inventory Sync', 'Custom Checkout'],
        description: 'A heritage fashion brand platform for handmade, kosher women’s head covers and wedding accessories from Beverly Hills.',
        imageUrl: 'https://images.unsplash.com/photo-1549462229-7d84f7b13f06?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Beverly Hills, CA, USA',
        testimonial: 'Handmade and kosher accessories honoring family tradition for 38 years.'
    },
    {
        id: 21,
        title: 'Moving Sheriff Reviews',
        category: PortfolioCategory.WEB,
        industry: Industry.LOGISTICS,
        technologies: ['PHP', 'Review Engine', 'Geolocation', 'SEO'],
        description: 'An unbiased moving company review platform that aggregates real user data to provide transparent recommendations in the logistics sector.',
        imageUrl: 'https://images.unsplash.com/photo-1586769852044-692d6e3703a0?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'USA',
        testimonial: 'Providing unbiased reviews and recommendations for a transparent moving experience.'
    },
    {
        id: 22,
        title: 'Mariposa Coffee Roasters',
        category: PortfolioCategory.ECOMMERCE,
        industry: Industry.ECOMMERCE_RETAIL,
        technologies: ['WooCommerce', 'WordPress', 'Subscription Engine', 'Mailchimp'],
        description: 'A family-run coffee roasting e-commerce platform near Yosemite, specializing in fair trade, low-acid handcrafted blends.',
        imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Mariposa, CA, USA',
        testimonial: 'Roasting high-quality, handcrafted coffees with flavor without bitterness near Yosemite.'
    },
    {
        id: 23,
        title: 'Makluxe Luxury Timepieces',
        category: PortfolioCategory.WEB,
        industry: Industry.ECOMMERCE_RETAIL,
        technologies: ['Next.js', 'Algolia Search', 'Valuation Engine', 'CRM'],
        description: 'A high-end luxury watch platform for buying, selling, and trading pre-owned Rolex, AP, and Omega timepieces.',
        imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Los Angeles, CA, USA',
        testimonial: 'Reliable resource for understanding and navigating the high-end luxury watch market.'
    },
    {
        id: 24,
        title: 'Organic Erotic Home Goods',
        category: PortfolioCategory.ECOMMERCE,
        industry: Industry.ECOMMERCE_RETAIL,
        technologies: ['Shopify Plus', 'Custom Theme', 'Try Before You Buy API', 'Sustainability Logs'],
        description: 'A sensory-focused home goods e-commerce experience curated by women in Harlem, promoting ethical production and circulation.',
        imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Harlem, NY, USA',
        testimonial: 'Awakening the senses and aligning your home with your true nature through ethical design.'
    },
    {
        id: 25,
        title: 'GRAV Glassware Innovation',
        category: PortfolioCategory.ECOMMERCE,
        industry: Industry.ECOMMERCE_RETAIL,
        technologies: ['Shopify Plus', 'ERP Integration', 'Age Verification', 'B2B Portal'],
        description: 'A market-leading e-commerce platform for scientific glassware and accessories based in Austin, featuring robust wholesale and retail funnels.',
        imageUrl: 'https://images.unsplash.com/photo-1563200022-df38f8cf6bfb?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Austin, TX, USA',
        testimonial: 'Quality, affordable scientific glassware with integrity and accountability since 2004.'
    },
    {
        id: 26,
        title: 'MG Asia Food Thailand',
        category: PortfolioCategory.ECOMMERCE,
        industry: Industry.ECOMMERCE_RETAIL,
        technologies: ['Shopify', 'Line Pay Integration', 'Cold Chain API', 'Thai/English Localization'],
        description: 'A multi-language Shopify store delivering German and Filipino products across Thailand with cold-chain logistics management.',
        imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Chonburi, Thailand',
        testimonial: 'Delivering German and Filipino food favorites anywhere in Thailand with fresh and frozen logistics.'
    },
    {
        id: 27,
        title: 'Bee Sante Manuka',
        category: PortfolioCategory.ECOMMERCE,
        industry: Industry.ECOMMERCE_RETAIL,
        technologies: ['Shopify', 'Manuka AMHA Certification API', 'Subscription API', 'Global Shipping'],
        description: 'A high-conversion Shopify store specializing in authentic Australian Manuka Honey with certified MGO levels up to 1200+.',
        imageUrl: 'https://images.unsplash.com/photo-1471943311107-164742e9712a?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'London, UK',
        testimonial: 'Sourcing authentic Australian Manuka Honey with higher quality, verification, and certification.'
    },
    {
        id: 28,
        title: 'Nexus Cultural Foundation',
        category: PortfolioCategory.WEB,
        industry: Industry.EDUCATION,
        technologies: ['WordPress', 'Non-Profit Tools', 'Events Calendar', 'Kreol Magazine API'],
        description: 'A non-profit foundation platform dedicated to preserving Creole culture through educational programs and global cultural exchanges.',
        imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Lafayette, LA, USA',
        testimonial: 'Preserving and promoting Creole culture while fostering cross-cultural understanding globally.'
    },
    {
        id: 29,
        title: 'Mobile Massage & Wellness',
        category: PortfolioCategory.WEB,
        industry: Industry.HEALTHCARE,
        technologies: ['PHP', 'Laravel', 'Provider Verification API', 'Geolocation Search'],
        description: 'An Australian wellness marketplace connecting professional therapists with clients for in-home and corporate massage services.',
        imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Sydney, Australia',
        testimonial: 'Connecting customers with screened, skilled, and professional massage and wellness providers.'
    },
    {
        id: 30,
        title: 'USMLE Studio Learning Platform',
        category: PortfolioCategory.WEB,
        industry: Industry.EDUCATION,
        technologies: ['React', 'Node.js', 'LMS Engine', 'AWS S3'],
        description: 'A comprehensive medical education platform for USMLE preparation, featuring interactive quizzes and performance analytics.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'USA',
        testimonial: 'Empowering medical students with the tools they need to excel in their USMLE exams.'
    },
    {
        id: 31,
        title: 'Villa Glaykos Luxury Stay',
        category: PortfolioCategory.WEB,
        industry: Industry.TRAVEL_HOSPITALITY,
        technologies: ['WordPress', 'Booking API', 'Google Maps', 'SEO'],
        description: 'A premium vacation rental website for a high-end villa in Greece, featuring automated booking and virtual tours.',
        imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Crete, Greece',
        testimonial: 'Showcasing the beauty of Greece with a seamless booking experience for our luxury guests.'
    },
    {
        id: 32,
        title: 'The Violin Channel',
        category: PortfolioCategory.WEB,
        industry: Industry.MEDIA_ENTERTAINMENT,
        technologies: ['PHP', 'YouTube API', 'Vimeo Integration', 'Custom CMS'],
        description: 'A global hub for classical music news, masterclasses, and live performances, reaching millions of viewers worldwide.',
        imageUrl: 'https://images.unsplash.com/photo-1465821185615-93455a7ee944?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'New York, USA',
        testimonial: 'The world’s leading classical music news source, now with a high-performance digital presence.'
    },
    {
        id: 33,
        title: 'The Smiling Frog Boutique',
        category: PortfolioCategory.ECOMMERCE,
        industry: Industry.ECOMMERCE_RETAIL,
        technologies: ['Shopify', 'Liquid', 'Instagram Feed Pro', 'Email Marketing'],
        description: 'A curated children’s boutique e-commerce store focusing on boutique clothing and unique nursery gifts.',
        imageUrl: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'USA',
        testimonial: 'Spreading joy through unique, high-quality children’s products and a delightful shopping experience.'
    },
    {
        id: 34,
        title: 'Nationwide Van Lines',
        category: PortfolioCategory.WEB,
        industry: Industry.LOGISTICS,
        technologies: ['PHP', 'Moving Quote Engine', 'Geolocation', 'SEO'],
        description: 'A comprehensive logistics platform for a major US moving company, specializing in long-distance relocations.',
        imageUrl: 'https://images.unsplash.com/photo-1519003722824-192d9978e8ee?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Fort Lauderdale, FL, USA',
        testimonial: 'Streamlining long-distance moves with transparent pricing and expert logistics management.'
    },
    {
        id: 35,
        title: 'KP Srirampai Industrial',
        category: PortfolioCategory.WEB,
        industry: Industry.LOGISTICS,
        technologies: ['PHP', 'Inventory Management', 'B2B Portal', 'MySQL'],
        description: 'An industrial supply chain portal for crane and heavy equipment rentals and sales in Thailand.',
        imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Bangkok, Thailand',
        testimonial: 'Reliable industrial equipment solutions for Thailand’s growing infrastructure needs.'
    },
    {
        id: 36,
        title: 'Jen Hatmaker Shop',
        category: PortfolioCategory.ECOMMERCE,
        industry: Industry.ECOMMERCE_RETAIL,
        technologies: ['Shopify Plus', 'Custom Theme', 'Klaviyo', 'Recharge API'],
        description: 'A high-traffic e-commerce store for the famous author and speaker Jen Hatmaker, featuring merchandise and memberships.',
        imageUrl: 'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Austin, TX, USA',
        testimonial: 'Connecting with our community through a premium shopping and membership experience.'
    },
    {
        id: 37,
        title: 'The Alinker Mobility Specialist',
        category: PortfolioCategory.ECOMMERCE,
        industry: Industry.HEALTHCARE,
        technologies: ['WooCommerce', 'WordPress', 'Subscription Engine', 'Stripe'],
        description: 'An ethical e-commerce platform for a revolutionary walking bike designed for people with mobility challenges.',
        imageUrl: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Global',
        testimonial: 'Challenging how society views mobility through inclusive design and ethical commerce.'
    },
    {
        id: 38,
        title: 'Psarou Mykonos Guide',
        category: PortfolioCategory.WEB,
        industry: Industry.TRAVEL_HOSPITALITY,
        technologies: ['Next.js', 'Google Maps API', 'Event Booking', 'Tailwind CSS'],
        description: 'An exclusive digital guide to the famous Psarou Beach in Mykonos, featuring VIP booking and lifestyle guides.',
        imageUrl: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=600&h=400&auto=format&fit=crop',
        clientLocation: 'Mykonos, Greece',
        testimonial: 'Developing a premium digital gateway to Mykonos’ most exclusive beach destination.'
    }
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: '10 Reasons Why Your Business Needs a Professional Website in 2026',
        metaTitle: '10 Reasons Your Business Needs a Professional Website in 2026',
        metaDescription: 'A professional website builds trust, improves visibility, and drives growth. Discover 10 reasons every business needs one in 2026.',
        keywords: 'professional website, business website, web design 2026, why every business needs a website',
        excerpt: "A professional website builds trust, improves visibility, and drives growth. Here are ten reasons every business needs one in 2026 — even if you live on social media.",
        author: 'Seba Sebastian',
        date: '2026-04-22',
        readTime: '6 min read',
        category: 'Web Development',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&h=720&auto=format&fit=crop',
        content: `
<p class="lead">Most small business owners we speak to in 2026 still ask the same question: <em>"Do I really need a website if I'm already on Instagram and WhatsApp?"</em> The short answer is yes — and the long answer is more interesting than you'd think.</p>

<p>Social media is a great place to be discovered. But it's a terrible place to be the final stop. Platforms change algorithms overnight, throttle organic reach, and force your customers through three taps and a sign-in just to find your phone number. A professional website is the only piece of digital real estate you actually <strong>own</strong>.</p>

<p>Here are ten reasons every serious business needs one in 2026.</p>

<h2>1. Credibility (the silent deal-breaker)</h2>
<p>According to a 2025 Verisign survey, <strong>83% of consumers</strong> say they trust a business more when it has a professional website. When a potential customer Googles your name and finds nothing but a Facebook page, they assume one of two things: you're not serious, or you're hiding something. Both kill the deal before you ever get the call.</p>

<h2>2. You own the relationship</h2>
<p>An Instagram follower is not your customer — they're Meta's customer. The day Meta deprecates Reels, throttles your reach, or suspends your account by mistake, you lose them. A website with email capture, blog content, and a clear contact path gives you a direct line to your audience that no algorithm can break.</p>

<h2>3. SEO compounds for years</h2>
<p>A well-optimised website earns Google rankings that work 24/7, for years. A single blog post that ranks well can bring qualified leads every month, indefinitely, with zero ad spend. Compare that to a social post that gets 48 hours of attention and then disappears.</p>

<h2>4. You can sell while you sleep</h2>
<p>An e-commerce store, a booking system, or even a simple "Request a Quote" form turns your website into a 24/7 salesperson. We've seen clients double their monthly revenue just by adding clear product pages and a frictionless checkout to a previously brochure-only site.</p>

<h2>5. Mobile-first is now the default</h2>
<p>Over <strong>65% of web traffic</strong> in 2026 is mobile. Google ranks sites on its mobile-first index, meaning your site's mobile version <em>is</em> the canonical version. A modern responsive website wins on mobile speed, accessibility, and conversion — all signals that affect ranking and revenue.</p>

<h2>6. Analytics tells you the truth</h2>
<p>How many people viewed your last social post? Roughly. How many clicked through? Maybe. How many came back next week? You have no idea. A website with proper analytics tells you exactly where visitors come from, what they read, where they drop off, and what they buy. That data is what lets you improve.</p>

<h2>7. Integration with the tools you already use</h2>
<ul>
  <li><strong>CRM</strong> — capture leads directly into HubSpot, Pipedrive or Salesforce</li>
  <li><strong>Email marketing</strong> — sync new subscribers with Mailchimp or ConvertKit</li>
  <li><strong>Payments</strong> — accept Stripe, Razorpay or PayPal with one-click checkout</li>
  <li><strong>Chat</strong> — drop in WhatsApp, Intercom or your own chatbot</li>
</ul>
<p>A professional website becomes the hub your whole business orbits around.</p>

<h2>8. It's cheaper than ever to build well</h2>
<p>The narrative that "a good website costs lakhs" is outdated. With modern frameworks like Next.js, Astro, and Webflow, a senior team can deliver a fast, SEO-optimised, conversion-focused site in 2–4 weeks. The total cost is usually less than three months of Facebook ads.</p>

<h2>9. AI tools work better with a real site</h2>
<p>In 2026, customers don't just Google you — they ask ChatGPT, Claude, and Perplexity. These tools cite websites with clean structure, schema markup, and authoritative content. If you have nothing for them to read, you don't exist in the AI answer layer at all.</p>

<h2>10. It future-proofs your business</h2>
<p>Trends change. TikTok will eventually fade. Instagram will pivot again. But the open web — and your domain name — will still be there. The earlier you start building authority on a site you control, the more valuable that asset becomes every single year.</p>

<h2>Where to start</h2>
<p>You don't need a $50,000 enterprise site to get the benefits. Start with the essentials: a clear homepage, an honest about page, a services or products page with real photos, a contact form that works, and a single piece of evergreen content that answers your customer's biggest question. Then iterate.</p>

<blockquote>A professional website isn't a cost. It's the lowest-risk, highest-leverage marketing investment most small businesses will make this decade.</blockquote>

<p>If you're thinking about building or rebuilding your site in 2026, we'd be happy to scope it with you. Our team has shipped over 900 production websites across 35+ countries — and we'd be glad to share what works.</p>
        `
    },
    {
        id: 2,
        title: 'How AI Is Reshaping IT Outsourcing in 2026',
        metaTitle: 'How AI Is Reshaping IT Outsourcing in 2026 | Stallioni',
        metaDescription: 'AI is transforming offshore development — from code review to project scoping. Here is how AI tools are changing the way companies hire and ship in 2026.',
        keywords: 'AI outsourcing, AI in software development, offshore AI, AI code review, AI project management, Claude code, Cursor, GitHub Copilot',
        excerpt: "AI doesn't replace your team — it amplifies it. We unpack how senior outsourced teams are using Claude, Cursor and Copilot to ship 2× faster without sacrificing quality.",
        author: 'Aarav Rao',
        date: '2026-05-08',
        readTime: '8 min read',
        category: 'AI & Automation',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&h=720&auto=format&fit=crop',
        content: `
<p class="lead">Every CTO we speak to in 2026 has the same question: <em>"How is AI changing how we should hire?"</em> The honest answer: AI doesn't replace your offshore team — it amplifies the senior ones and exposes the junior ones. Here's what we've actually seen across 200+ engagements this year.</p>

<h2>The old outsourcing model is dying</h2>
<p>For two decades, the IT outsourcing pitch was simple: cheaper labour. Hire ten developers offshore for the cost of two in-house, accept lower velocity per head, and come out ahead on cost. AI breaks that math entirely.</p>

<p>With Claude Code, Cursor, GitHub Copilot, and the new agentic IDEs, a single <strong>senior engineer can now deliver what a team of three did in 2022</strong>. The cost advantage of offshore body-shopping evaporates because raw bodies aren't the bottleneck anymore.</p>

<h2>What's actually winning: AI-amplified senior teams</h2>
<p>The new outsourcing model looks completely different:</p>
<ul>
  <li><strong>Smaller teams</strong> — 2–3 senior engineers instead of 8–10 mixed-seniority</li>
  <li><strong>Tighter scope</strong> — clear sprint goals, AI-generated boilerplate, human-driven architecture</li>
  <li><strong>Higher rates per head</strong> — but the total project cost is still lower</li>
  <li><strong>Faster delivery</strong> — what used to take 12 weeks now ships in 6</li>
</ul>

<p>Our internal data: projects staffed with AI-fluent senior engineers ship <strong>2.1× faster</strong> than the same scope handled by traditional offshore pods, with <strong>34% fewer defects</strong> reported in the first 60 days post-launch.</p>

<h2>Where AI helps the most</h2>

<h3>1. Boilerplate and CRUD</h3>
<p>Form scaffolding, database schemas, API routes, admin dashboards — AI handles all of this in minutes. A senior engineer reviews the output, adjusts edge cases, and moves on. This is where the biggest time savings come from.</p>

<h3>2. Code review and refactoring</h3>
<p>Claude and Cursor can review pull requests, suggest cleaner patterns, and catch obvious bugs before a human even looks at the diff. We've seen review cycles shrink from 2 days to 4 hours.</p>

<h3>3. Test generation</h3>
<p>Unit tests and integration tests, traditionally the chore engineers skip when deadlines hit, are now generated alongside the code. Test coverage went from 60% average to 88% average on our 2026 projects.</p>

<h3>4. Documentation</h3>
<p>Auto-generated README files, API docs, and inline comments. Not perfect — but a far better starting point than the blank file most projects shipped with.</p>

<h2>Where AI still struggles</h2>
<p>If you've ever asked AI to design a clean component architecture from scratch, you know it tends to over-engineer. It also struggles with:</p>
<ul>
  <li><strong>Domain logic</strong> — anything that requires understanding your business context</li>
  <li><strong>Subtle race conditions</strong> — concurrent code, distributed systems</li>
  <li><strong>Security boundaries</strong> — auth, permissions, multi-tenancy</li>
  <li><strong>Design taste</strong> — knowing when a UI is "good enough"</li>
</ul>

<p>This is exactly where you still need senior humans. AI is a tireless junior. It needs an architect.</p>

<blockquote>The 2026 offshore team is two seniors with AI, not eight juniors without it. The math has flipped entirely.</blockquote>

<h2>How to evaluate an AI-fluent outsourcing partner</h2>
<p>If you're vetting agencies in 2026, here's what to look for:</p>
<ol>
  <li><strong>Ask about their AI tooling stack.</strong> If they're still doing everything by hand, they're either slow or expensive.</li>
  <li><strong>Ask for code review samples.</strong> Good teams use AI to <em>review</em>, not just <em>write</em>.</li>
  <li><strong>Ask about test coverage.</strong> AI makes high coverage easy. Teams below 80% are leaving wins on the table.</li>
  <li><strong>Ask who reviews AI output.</strong> The answer should be a senior engineer, not the same junior who prompted it.</li>
</ol>

<h2>What this means for clients</h2>
<p>If you're a startup founder or a mid-market CTO, the takeaway is clear: stop optimising for headcount and start optimising for senior engineer hours. A small, AI-fluent team will ship faster, cleaner, and cheaper than a bigger traditional pod — and the gap is widening every quarter.</p>

<p>At Stallioni, every project in 2026 is staffed with AI-fluent senior engineers by default. If you'd like to see how it changes the velocity on your roadmap, we'd be happy to scope a pilot with you.</p>
        `
    },
    {
        id: 3,
        title: '5 Signs Your Tech Team Should Scale With Offshore Talent',
        metaTitle: '5 Signs You Should Scale With Offshore Developers | Stallioni',
        metaDescription: 'Backlog growing, hiring slow, burn rate climbing? Five clear signals that your team is ready to scale with offshore developers — and the trade-offs to know up front.',
        keywords: 'offshore developers, hire remote developers, scale tech team, when to outsource, IT outsourcing signs',
        excerpt: "Backlog growing, hiring slow, burn rate climbing? Here are the five signals our customers most often missed before deciding to scale offshore — and what to do about each.",
        author: 'Priya Shah',
        date: '2026-05-02',
        readTime: '5 min read',
        category: 'Outsourcing',
        imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&h=720&auto=format&fit=crop',
        content: `
<p class="lead">Deciding to scale your team offshore is rarely a single dramatic moment. It's usually five months of quiet frustration followed by one missed deadline that finally forces the conversation. Here are the five signs we see most often in clients who waited too long.</p>

<h2>1. Your backlog has stopped shrinking</h2>
<p>Every sprint, your team closes 20 tickets and 25 new ones get created. The backlog isn't a list anymore — it's a graveyard. Things that mattered six months ago are still sitting there because they were never urgent enough to bump everything else.</p>

<p>This is the clearest signal of all. It means your <strong>demand exceeds your capacity</strong>, and no amount of process tweaking will fix it. You need more senior hands.</p>

<h2>2. Hiring is taking 4+ months</h2>
<p>The 2026 senior developer market in the US, UK and Western Europe is brutal. From job posting to signed offer, the average is now <strong>14 weeks for a senior engineer</strong>. Add 4–6 weeks for onboarding and you're looking at half a year before that hire ships a single feature.</p>

<p>If you're losing this race repeatedly, offshore staffing isn't a compromise — it's just a faster path to the same outcome. Our average onboarding is 48 hours; first PR usually lands in week one.</p>

<h2>3. Your senior engineers are doing junior work</h2>
<p>If your $180k principal engineer is writing CRUD endpoints and admin dashboards on a Wednesday afternoon, you have a leverage problem. Senior engineers should be designing systems, mentoring, and unblocking — not shipping boilerplate.</p>

<p>This is one of the cleanest cases for offshore augmentation. Hand the boilerplate, integrations, and feature-completion work to a senior offshore pod, and let your in-house principals focus on the work only they can do.</p>

<h2>4. You're burning cash faster than runway grows</h2>
<p>For startups in particular, the cost differential matters. A senior US/UK engineer all-in (salary + benefits + tax + office) runs <strong>$200k–$280k</strong> a year. A senior offshore engineer through a vetted partner runs $48k–$84k. That's not a small difference — that's the difference between hitting the next milestone and not.</p>

<blockquote>Cost isn't the only reason to scale offshore. But if it lets you ship six months earlier, it might be the only reason that matters.</blockquote>

<h2>5. Your roadmap depends on a single point of failure</h2>
<p>This one is dangerous because it's invisible until it bites. If the entire mobile rebuild rests on one engineer who could leave next quarter — or if the payment integration only one person in the company understands — you have a bus-factor problem.</p>

<p>Bringing in an external senior team forces you to document, modularise, and share context. Even if you only use them for six months, the structural improvements outlast the engagement.</p>

<h2>The trade-offs (so you go in with eyes open)</h2>
<p>Offshore scaling isn't free of friction. The honest list of trade-offs:</p>
<ul>
  <li><strong>Timezone overlap</strong> — you'll need at least 3–4 hours of overlap for sync work. Most Indian offshore teams flex to Europe and East Coast US easily; West Coast is harder.</li>
  <li><strong>Cultural and communication norms</strong> — a good partner has done this many times and trains for it. A cheap one hasn't.</li>
  <li><strong>Onboarding cost</strong> — even with a fast-moving partner, the first two weeks are about getting them productive. Plan for it.</li>
  <li><strong>Vendor lock-in risk</strong> — make sure the work product, IP, and documentation are yours. Always.</li>
</ul>

<h2>How to start small</h2>
<p>If you're on the fence, don't bet the company on the first engagement. Start with a 4-week scoped pilot — a single feature, a single bug-fix sprint, or a documentation effort. You'll learn more about the partner in 4 weeks than from any sales call.</p>

<p>If you'd like to talk through whether offshore scaling makes sense for your situation, we'd be happy to do a no-pressure scoping call. We say no to 30% of opportunities because they're a bad fit. Ours is to find the ones where it really moves the needle.</p>
        `
    },
    {
        id: 4,
        title: 'Building a Production-Ready SaaS in 90 Days: A Playbook',
        metaTitle: 'Build a Production-Ready SaaS in 90 Days — Playbook | Stallioni',
        metaDescription: 'Multi-tenancy, billing, auth and dashboards — the four pillars of every SaaS MVP. A practical 90-day playbook for founders who want to launch without burning runway.',
        keywords: 'build SaaS in 90 days, SaaS MVP, multi-tenancy, Stripe billing, SaaS playbook 2026',
        excerpt: "Multi-tenancy, Stripe billing, auth, dashboards. We break down the 90-day plan our team uses to ship production-ready SaaS MVPs — and the three corners founders should never cut.",
        author: 'Marcus Khan',
        date: '2026-04-15',
        readTime: '10 min read',
        category: 'Web Development',
        imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&h=720&auto=format&fit=crop',
        content: `
<p class="lead">We've built and shipped over forty SaaS products in the past three years — from solo-founder MVPs to enterprise-grade platforms. The pattern is clear: <strong>production-ready in 90 days is achievable</strong>, but only if you make the right architectural decisions in the first two weeks. Here's our playbook.</p>

<h2>The four pillars (everything else is feature work)</h2>
<p>Every SaaS, regardless of vertical, has four foundational systems. If any one of them is wrong on day 90, you'll spend the next year rebuilding instead of growing:</p>
<ol>
  <li><strong>Authentication</strong> — sign-up, login, password reset, SSO if B2B</li>
  <li><strong>Multi-tenancy</strong> — how customer data is isolated</li>
  <li><strong>Billing</strong> — plans, subscriptions, invoices, dunning</li>
  <li><strong>Admin dashboards</strong> — for you to operate the business</li>
</ol>
<p>Get these four right and the rest is feature delivery. Get any one of them wrong and the business slowly chokes.</p>

<h2>Week 1–2: Architecture and scoping</h2>
<p>The biggest mistake founders make is starting with code. Don't. Spend two weeks on:</p>
<ul>
  <li><strong>User stories</strong> — the 5 things a customer must be able to do in week 1 of using your product</li>
  <li><strong>Data model</strong> — every entity, every relationship, drawn before a single migration is written</li>
  <li><strong>Tech stack decisions</strong> — language, framework, hosting, payment provider, email provider</li>
  <li><strong>Tenancy model</strong> — shared schema vs schema-per-tenant vs database-per-tenant (each has hard-to-reverse implications)</li>
</ul>

<p>Our default 2026 stack: <strong>Next.js 15 + Node.js + PostgreSQL + Stripe + AWS</strong>. Battle-tested, well-staffed in the hiring market, and AI tools support it best. We deviate only when the customer requires it.</p>

<h2>Week 3–4: Auth and tenancy foundations</h2>
<p>Get authentication right once and you'll never think about it again. Get it wrong and every future feature will have to work around it.</p>

<p>For B2C: Clerk, Auth0, or Supabase Auth. For B2B: roll your own with NextAuth.js + magic links + SSO via WorkOS. Don't write your own password hashing — every founder we've seen try this has regretted it.</p>

<p>For multi-tenancy, our default is <strong>shared schema with a tenant_id column on every table</strong>. It's simpler to scale, easier to back up, and only causes problems above 10,000 tenants — which is a problem you'd love to have.</p>

<h2>Week 5–8: Core feature build</h2>
<p>Now you ship features. This is where AI tooling earns its keep — boilerplate generation, CRUD scaffolding, test generation, and database migrations all move 2–3× faster than they did in 2022.</p>

<p>The rule we apply: <strong>every feature must have a corresponding billable event</strong>. If a feature doesn't move a customer toward upgrading or sticking around, it doesn't ship in v1.</p>

<h2>Week 9–10: Billing and Stripe</h2>
<p>Stripe is the easy part. Billing logic is the hard part. Questions you need answers to before writing the first webhook:</p>
<ul>
  <li>What happens when a card fails on renewal? (dunning emails, grace period, feature downgrade)</li>
  <li>Can users upgrade mid-cycle? Pro-rate or charge full?</li>
  <li>What happens to data when they downgrade or cancel?</li>
  <li>Do you offer annual discounts? How is renewal communicated?</li>
</ul>

<p>These decisions live in your business model, not your code. Get them written down before any engineer touches the Stripe SDK.</p>

<h2>Week 11–12: Admin tools and dashboards</h2>
<p>If you can't manage your customers, your customers can't trust you. Build (at minimum):</p>
<ul>
  <li>A customer list with search and filter</li>
  <li>Per-customer detail page (subscription status, usage, last login, support history)</li>
  <li>Impersonation (with audit log) — so support can see what the customer sees</li>
  <li>Manual subscription overrides — refund, extend, comp accounts</li>
</ul>

<p>Skip the fancy charts. Build the operational tools first; the BI dashboards can wait until month four.</p>

<h2>Week 13 (the buffer week)</h2>
<p>This is the week founders always forget to budget. <strong>Reserve a full week for QA, security hardening, performance audits, and launch logistics.</strong> Things you'll discover here:</p>
<ul>
  <li>That one form that doesn't sanitise input</li>
  <li>The N+1 query in the dashboard that's fine with 5 users but dies at 50</li>
  <li>The transactional email that goes to spam in Gmail</li>
  <li>The OG image that breaks on iMessage previews</li>
</ul>

<p>These don't get fixed in feature sprints. They get fixed in the buffer week.</p>

<blockquote>The teams that ship in 90 days are the teams that protect the buffer week. The teams that ship in 120 days are the teams that thought they didn't need it.</blockquote>

<h2>Three corners you should never cut</h2>
<ol>
  <li><strong>Backups.</strong> Automated daily PostgreSQL snapshots, retention of 30 days, restore-tested at least once before launch.</li>
  <li><strong>Observability.</strong> Sentry (or equivalent) for errors, structured logs in CloudWatch, basic uptime monitoring. Costs $30/month, saves hours every week.</li>
  <li><strong>Email deliverability.</strong> Use a transactional provider (Resend, Postmark, SES with proper DKIM/SPF). Inbox placement is a launch-day make-or-break.</li>
</ol>

<h2>What 90 days will not get you</h2>
<p>Let's be honest. 90 days gets you a focused, well-built MVP that real customers can pay for. It does not get you:</p>
<ul>
  <li>SOC 2 / HIPAA / GDPR compliance certifications</li>
  <li>Native mobile apps (iOS and Android)</li>
  <li>Complex billing models (usage-based, tiered, with overage)</li>
  <li>Enterprise SSO and SCIM provisioning</li>
</ul>

<p>Those are months 4–9. The 90-day product is the platform you use to validate, charge, and grow toward those.</p>

<h2>The hard part isn't the build</h2>
<p>It's the discipline. Every founder we've worked with wanted to add "just one more feature" before launch. Every one of them, in retrospect, wished they had launched two weeks earlier and gotten that feature from customer feedback instead of from inside their own head.</p>

<p>If you're building a SaaS in 2026, we'd be glad to compare notes on your scope or share our boilerplate. We've shipped this same playbook dozens of times — happy to save you the first six months of mistakes.</p>
        `
    },
    {
        id: 5,
        title: 'Mobile-First Design Still Wins: Why It Matters in 2026',
        metaTitle: 'Why Mobile-First Design Still Wins in 2026 | Stallioni',
        metaDescription: 'Over 65% of web traffic is mobile and Google ranks on mobile-first indexing. Here is why mobile-first design still wins — and the common mistakes that lose conversions.',
        keywords: 'mobile-first design, responsive design, mobile UX, mobile SEO, mobile conversion, Core Web Vitals',
        excerpt: "65% of web traffic is mobile. Google ranks on mobile-first indexing. Yet most agencies still design desktop-first. Here's why that's costing you — and the fix.",
        author: 'Nisha Verma',
        date: '2026-04-03',
        readTime: '4 min read',
        category: 'Design',
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&h=720&auto=format&fit=crop',
        content: `
<p class="lead">"Mobile-first" was the design buzzword of 2014. A decade later, in 2026, most websites are still secretly designed desktop-first and squished onto mobile as an afterthought. The data says this is costing real money.</p>

<h2>The numbers haven't moved in your favour</h2>
<ul>
  <li><strong>65.2%</strong> of global web traffic comes from mobile devices (Statista, Q1 2026)</li>
  <li><strong>53%</strong> of mobile users abandon a site that takes longer than 3 seconds to load</li>
  <li>Google has indexed all websites with mobile-first indexing since 2023 — meaning <em>the mobile version is the canonical version</em></li>
  <li>Mobile conversion rates are still <strong>2.3× lower</strong> than desktop on average — a number that's barely budged in five years</li>
</ul>

<p>Translation: most of your audience is mobile, Google ranks you on mobile, and your mobile experience is silently bleeding revenue.</p>

<h2>The honest reason most sites are still desktop-first</h2>
<p>It's not that designers don't know better. It's that the workflow rewards desktop. You design in Figma on a 27-inch monitor. You demo to stakeholders on a 27-inch monitor. The CEO approves the mockup on a 27-inch monitor. Then a developer "makes it responsive" and the mobile version gets 10% of the attention.</p>

<p>If you genuinely want mobile-first design, you need to invert the workflow: design the mobile screen first, get it approved on a phone, <em>then</em> stretch up to tablet and desktop.</p>

<h2>What mobile-first actually means in 2026</h2>
<p>It's not "responsive design." Responsive means the layout doesn't break. Mobile-first means the entire experience is <strong>designed for the thumb</strong>:</p>

<h3>Touch-first interactions</h3>
<p>Buttons sized for thumbs (minimum 44×44px tap targets), comfortable spacing between tappable elements, no hover-only menus, and a clear primary action visible without scrolling.</p>

<h3>Performance budget enforced from day one</h3>
<p>Mobile networks aren't gigabit fibre. They're 4G in a coffee shop with two bars. Your homepage should be under 200KB of critical resources, hit LCP under 2.5 seconds, and pass Core Web Vitals on a mid-range Android device — not on your developer's M3 MacBook over Wi-Fi.</p>

<h3>Progressive disclosure</h3>
<p>You don't have desktop real estate to show eight calls-to-action. Pick one primary CTA, two secondary, and hide the rest behind taps. The discipline this forces is good for desktop too.</p>

<h3>Fluid typography and spacing</h3>
<p>Stop using fixed font sizes. Use <code>clamp()</code> in CSS so your headlines scale smoothly from 320px to 1920px viewports. No more text that's huge on desktop and microscopic on a small phone.</p>

<blockquote>If your mobile experience feels like a "smaller version of the desktop", you've already lost. The mobile experience <em>is</em> the experience — the desktop is the bonus.</blockquote>

<h2>The five mistakes that kill mobile conversion</h2>
<ol>
  <li><strong>Interstitial pop-ups on landing.</strong> Google penalises sites that show full-screen interstitials on mobile within seconds of arrival. Use slide-up banners instead.</li>
  <li><strong>Carousels for primary content.</strong> Mobile carousels get less than 1% engagement past the first slide. Stack the content vertically.</li>
  <li><strong>Hamburger menus hiding the primary CTA.</strong> If your "Get a quote" button is buried in a hamburger, you're hiding revenue. Pin a sticky CTA bar instead.</li>
  <li><strong>Form fields that don't use the right keyboard.</strong> An email field should trigger the email keyboard. A phone field should trigger the numeric one. <code>inputmode="email"</code> and <code>type="tel"</code>.</li>
  <li><strong>Tiny touch targets in tables and lists.</strong> If a user has to pinch-zoom to tap a row, you have a 44px problem.</li>
</ol>

<h2>How to audit your own site in five minutes</h2>
<p>Open your site on your phone. Pretend you've never seen it before. Try to:</p>
<ul>
  <li>Find your primary product/service within 5 seconds of landing</li>
  <li>Submit your contact form using only your thumb</li>
  <li>Read a long article without your eyes hurting</li>
  <li>Tap any nav item without missing</li>
</ul>

<p>If any of those fail, mobile-first isn't a 2026 strategy — it's a 2026 emergency.</p>

<p>If you'd like a free 5-point mobile audit of your current site, our design team will run one and report back within 48 hours. No commitment, no sales call — just an honest read on what's losing you conversions.</p>
        `
    },
    {
        id: 6,
        title: 'How We Cut Cloud Costs by 60% With AWS Right-Sizing',
        metaTitle: 'Cut AWS Cloud Costs by 60% with Right-Sizing | Stallioni',
        metaDescription: 'A practical case study on cutting AWS infrastructure costs by 60% through right-sizing, reserved instances, and architectural cleanup — without sacrificing performance.',
        keywords: 'AWS cost optimization, cloud cost reduction, reduce AWS bill, right-sizing AWS, FinOps, cloud cost case study',
        excerpt: "A real case study: how we trimmed a SaaS client's AWS bill from $14k to $5.6k a month without touching their feature roadmap. The five levers that did 80% of the work.",
        author: 'Diego Alvarez',
        date: '2026-03-19',
        readTime: '7 min read',
        category: 'Cloud',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&h=720&auto=format&fit=crop',
        content: `
<p class="lead">A B2B SaaS client came to us in October 2025 with an AWS bill that had crept from $4k to $14k a month over eighteen months. Their CFO asked the obvious question: <em>"What are we actually paying for?"</em> Nobody on the team had a great answer. Here's how we got it down to $5.6k a month over the following ten weeks.</p>

<h2>The starting picture</h2>
<p>The client ran a typical mid-sized SaaS: <strong>~3,000 active customers, ~50k MAU, multi-tenant Node.js + PostgreSQL on AWS</strong>. Their stack:</p>
<ul>
  <li>5× <code>m5.xlarge</code> EC2 instances running the API</li>
  <li>2× <code>db.r5.2xlarge</code> RDS instances (primary + replica)</li>
  <li>1× ElastiCache Redis (<code>cache.m5.large</code>)</li>
  <li>S3 for assets, CloudFront for delivery</li>
  <li>NAT Gateway, Application Load Balancer, Route 53, CloudWatch logs</li>
</ul>

<p>Nothing exotic. The problem wasn't the architecture — it was that nothing had been re-evaluated since the original provisioning during a 2022 traffic spike that never repeated.</p>

<h2>Lever 1: Right-sizing EC2 (saved ~$2,800/mo)</h2>
<p>The first thing we did was pull two weeks of CloudWatch metrics. The story was clear: <strong>peak CPU across all five EC2 instances rarely exceeded 22%</strong>. They were running 4× the compute they needed.</p>

<p>The fix: dropped to 3× <code>m6i.large</code> instances (newer generation, smaller, cheaper per hour). Performance was actually slightly better — newer Intel chips, faster network — and the monthly EC2 line dropped from $3,400 to about $600.</p>

<h2>Lever 2: RDS right-sizing + reserved instances (saved ~$2,400/mo)</h2>
<p>RDS was the single biggest line item. The <code>db.r5.2xlarge</code> primary was running at 8% average CPU. The replica was running at 3%.</p>

<p>We dropped the primary to <code>db.r6g.large</code> (Graviton — 30% cheaper per core for the same workload) and the replica to <code>db.r6g.large</code> as well. Then we committed to <strong>1-year reserved instances</strong> for both — another 35% off the on-demand rate.</p>

<p>The catch: <em>you must be sure you'll keep the instances running for the term</em>. RIs are not refundable. We only commit to RIs after eight weeks of stable post-optimisation metrics.</p>

<h2>Lever 3: S3 lifecycle policies (saved ~$900/mo)</h2>
<p>The client had three years of accumulated customer uploads sitting in S3 Standard. Most of it hadn't been accessed in over six months. We set up a lifecycle policy:</p>
<ul>
  <li>After 30 days → S3 Standard-IA</li>
  <li>After 90 days → S3 Glacier Instant Retrieval</li>
  <li>After 365 days → S3 Glacier Deep Archive</li>
</ul>

<p>Total S3 storage cost dropped by about 70%. The customer-facing impact was zero — recent uploads stayed on Standard, and the older files still came back in milliseconds when occasionally needed.</p>

<h2>Lever 4: NAT Gateway → NAT Instance (saved ~$700/mo)</h2>
<p>This one is controversial. NAT Gateway is AWS's managed service — easy, reliable, and surprisingly expensive at $0.045/hour plus data processing fees. The client was paying about $750/month just for NAT.</p>

<p>We replaced it with a single <code>t4g.nano</code> NAT instance running fck-nat. Cost: about $4/month. Caveat: we set up a clear runbook for failover, and the client accepted the slightly higher operational responsibility. Not the right call for every team, but the right call here.</p>

<h2>Lever 5: CloudWatch logs retention (saved ~$600/mo)</h2>
<p>CloudWatch was quietly accumulating logs with infinite retention. Three years of debug logs from every Node.js process. We:</p>
<ul>
  <li>Set log group retention to 30 days for app logs, 90 days for audit logs</li>
  <li>Deleted accumulated logs older than 6 months</li>
  <li>Moved long-term audit retention to S3 Glacier (cheaper, still compliant)</li>
</ul>

<p>Result: CloudWatch ingest and storage charges dropped from $720 to under $100 a month.</p>

<h2>The smaller wins that added up</h2>
<ul>
  <li>Switched ElastiCache to a smaller node ($120/mo saved)</li>
  <li>Deleted three unused EBS volumes from a deprecated service ($45/mo)</li>
  <li>Moved CloudFront to the new pricing tier ($90/mo)</li>
  <li>Killed an unused Elastic IP ($4/mo)</li>
  <li>Right-sized the ALB targets ($60/mo)</li>
</ul>

<p>Individually small. Together they trimmed another $300/month.</p>

<blockquote>The biggest lesson: nothing here was novel. Every win was a config that hadn't been re-evaluated in 12+ months. AWS bills don't grow because of architecture — they grow because nobody is looking.</blockquote>

<h2>How to start on your own bill</h2>
<p>Before you call us (or any consultant), here's the 90-minute audit you can do this afternoon:</p>
<ol>
  <li>Open AWS Cost Explorer. Sort by service. Find your top 3 line items.</li>
  <li>For each top line item, pull two weeks of CloudWatch metrics. Look for peak utilisation.</li>
  <li>If peak is under 40%, you're probably over-provisioned.</li>
  <li>Check S3 lifecycle policies. If they don't exist, set them up.</li>
  <li>Check CloudWatch log retention. If it's "Never expire", it's costing you.</li>
</ol>

<p>That alone will usually find 20–30% of savings. The remaining 30% comes from RIs, Savings Plans, and the deeper architectural work — which is where having someone who does this every week actually helps.</p>

<p>If you'd like us to take a look at your AWS bill, we offer a one-time fixed-fee cloud audit. You get a written report of every line item, every recommendation, and the expected savings — yours to act on with us, with someone else, or on your own.</p>
        `
    },
    {
        id: 7,
        title: 'React vs Vue in 2026: Which Should Your Startup Pick?',
        metaTitle: 'React vs Vue 2026: Which Framework Should Startups Choose? | Stallioni',
        metaDescription: 'React and Vue have both matured. Which one is better for your 2026 startup? An opinionated comparison from a team that has shipped both — covering hiring, ecosystem, performance.',
        keywords: 'React vs Vue 2026, choose frontend framework, React for startups, Vue for startups, Vue 3 vs React 19',
        excerpt: "React 19 vs Vue 3.5: both have matured. The honest answer depends on three things — your hiring pool, your appetite for tooling, and the long-term shape of your product.",
        author: 'Marcus Khan',
        date: '2026-02-26',
        readTime: '9 min read',
        category: 'Web Development',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&h=720&auto=format&fit=crop',
        content: `
<p class="lead">Every quarter a founder asks us the same question: <em>"Should we use React or Vue?"</em> The honest answer in 2026 is the same as it was in 2022 — it depends. But the variables have shifted, and the gap has narrowed. Here's how we think about it after shipping production apps with both.</p>

<h2>The short version</h2>
<p>If you're optimising for hiring depth, ecosystem maturity, and "this is what everyone else uses" — pick <strong>React</strong>. If you're optimising for developer experience, smaller bundle sizes, and a less fragmented stack — pick <strong>Vue</strong>. Neither will be a wrong answer in five years.</p>

<h2>Where each one wins</h2>

<h3>React 19 — what it does well</h3>
<ul>
  <li><strong>Hiring depth.</strong> The 2026 senior React talent pool is roughly 4× larger than Vue's globally. For US, UK, and India hiring this matters.</li>
  <li><strong>Ecosystem breadth.</strong> Every third-party SaaS that ships a UI SDK ships a React component first. Headless UI libraries (shadcn/ui, Radix, HeadlessUI) are React-first.</li>
  <li><strong>Server Components.</strong> React 19 + Next.js 15 server components are genuinely powerful — they let you ship less JavaScript for content-heavy pages.</li>
  <li><strong>AI tooling support.</strong> Claude, Cursor, and Copilot all generate cleaner React code than Vue code because there's simply more React training data.</li>
</ul>

<h3>Vue 3.5 — what it does well</h3>
<ul>
  <li><strong>Single-file components.</strong> <code>&lt;template&gt;</code>, <code>&lt;script setup&gt;</code>, <code>&lt;style scoped&gt;</code> in one file. It's the cleanest mental model in mainstream frontend.</li>
  <li><strong>Smaller bundle sizes.</strong> A starter Vue app is ~30% smaller than a starter React+Next.js app. For sites where first-load matters (LCP, conversion), that's real.</li>
  <li><strong>Better defaults out of the box.</strong> Pinia for state, Vue Router for routing, Nuxt for SSR — all maintained by the core team. No "which library should I use this month" decision fatigue.</li>
  <li><strong>Composition API.</strong> Once you're past the learning curve, it's arguably more ergonomic than React hooks for complex state.</li>
</ul>

<h2>Where the gap has closed</h2>
<p>A few things people still believe that aren't true in 2026:</p>
<ul>
  <li>"Vue is faster than React." Not meaningfully. Both perform similarly on real workloads since React 19's concurrent rendering landed in 2024.</li>
  <li>"React is harder to learn." For a developer coming from vanilla JS, both have a similar ramp. Vue is gentler in the first week; React is faster in the first month.</li>
  <li>"Vue doesn't have TypeScript support." It does, fully, since Vue 3.</li>
  <li>"React has no opinions." With Next.js as the default, it actually has plenty.</li>
</ul>

<h2>The variables that actually matter</h2>

<h3>1. Who's hiring in your market?</h3>
<p>This is the biggest factor. If you're hiring senior frontend developers in San Francisco, New York, or London, the React pool is 5–10× deeper. If you're hiring in Shanghai, Beijing, or parts of Eastern Europe, Vue is much closer in size — and sometimes preferred.</p>

<p>The corollary: if you go React in a Vue-strong market, you'll pay a premium. If you go Vue in a React-strong market, you'll wait longer to hire.</p>

<h3>2. What's the shape of your product?</h3>
<p>For <strong>complex SaaS dashboards with hundreds of states and many integrations</strong>, React's ecosystem is hard to beat. Stripe Dashboard, Linear, Notion — all React-based, and the patterns at that scale are mature.</p>

<p>For <strong>content-heavy marketing sites, e-commerce storefronts, or apps where bundle size and SEO matter most</strong>, Vue + Nuxt is genuinely faster to ship and lighter to ship.</p>

<h3>3. How opinionated do you want your stack?</h3>
<p>React itself has no opinions. You'll choose: routing (React Router vs TanStack Router vs Next.js), state (Zustand vs Jotai vs Redux Toolkit), forms (React Hook Form vs Formik), data fetching (TanStack Query vs SWR vs Apollo). Every choice means a learning curve and a maintenance commitment.</p>

<p>Vue ships with batteries: Vue Router, Pinia, the official testing tools, all maintained by the core team. Less choice, less decision fatigue.</p>

<blockquote>If you have a strong opinion about your stack, React gives you the freedom to express it. If you'd rather get to v1 without debates, Vue removes the debates entirely.</blockquote>

<h2>Performance is no longer the deciding factor</h2>
<p>People used to compare React vs Vue by re-rendering 10,000 rows of a table. Both can do it. The differences in the benchmark are measured in 5–15ms. Your users will never notice. Optimise for hiring, ecosystem, and team familiarity instead.</p>

<h2>What we'd pick today, by scenario</h2>
<ul>
  <li><strong>B2B SaaS, US/UK market, complex dashboards →</strong> React + Next.js + shadcn/ui + TanStack Query</li>
  <li><strong>D2C e-commerce, conversion-focused →</strong> Vue + Nuxt + Tailwind. Smaller bundles, faster LCP, better SEO.</li>
  <li><strong>Marketing site for a non-tech business →</strong> Astro (which can render React or Vue components, but ships pure HTML by default).</li>
  <li><strong>Mobile-first PWA with offline support →</strong> React Native or Capacitor + Vue. Both work, React Native is more mature.</li>
  <li><strong>Internal admin tools, fast iteration →</strong> Vue + Nuxt. The opinionated stack pays off when nobody has time to debate libraries.</li>
</ul>

<h2>The bigger truth</h2>
<p>The framework matters less than the people writing it. A senior team will ship a great product in React, Vue, Svelte, or Solid. A weak team will ship a bad product in any of them.</p>

<p>If you'd like a second opinion on your stack before you commit, we're happy to do a 30-minute architecture review. We've shipped both — we have no horse in this race and we'll tell you what fits your team and your roadmap.</p>
        `
    }
];

export const JOB_OPENINGS: JobOpening[] = [
    {
        title: 'Senior Full Stack Developer',
        department: 'Engineering',
        location: 'Remote (India)',
        description: 'We are looking for an experienced Full Stack Developer...',
        employmentType: 'FULL_TIME'
    }
];

export const TECHNOLOGIES: Technology[] = [
    { name: 'React', icon: <ReactIcon /> },
    { name: 'Node.js', icon: <NodeIcon /> },
    { name: 'AWS', icon: <AWSIcon /> },
    { name: 'Python', icon: <PythonIcon /> },
    { name: 'Flutter', icon: <FlutterIcon /> },
    { name: 'Laravel', icon: <LaravelIcon /> },
    { name: 'Docker', icon: <DockerIcon /> },
    { name: 'Shopify', icon: <ShopifyIcon /> },
    { name: 'Salesforce', icon: <SalesforceIcon /> },
    { name: 'Vue.js', icon: <VueIcon /> },
    { name: 'Angular', icon: <AngularIcon /> },
    { name: 'Magento', icon: <MagentoIcon /> },
];

export const TESTIMONIALS: Testimonial[] = [
    {
        quote: "Stallioni's team seamlessly integrated with our workflow. Their technical expertise and dedication were instrumental in launching our new platform ahead of schedule.",
        author: "Sarah Jenkins",
        company: "CTO, FinInnova UK"
    },
    {
        quote: "Outsourcing to India was a big decision, but Stallioni made it easy. We got top-tier talent at a fraction of the cost, and the communication was flawless.",
        author: "Mark Davis",
        company: "Founder, TechScale USA"
    },
    {
        quote: "The quality of their code and their proactive approach to problem-solving separates them from other agencies. Highly recommended.",
        author: "Liam O'Connor",
        company: "Director, RetailFlow Ireland"
    }
];

export const TEAM_MEMBERS: TeamMember[] = [
    {
        name: 'Seba Sebastian',
        role: 'Founder & CEO',
        bio: 'Visionary leader with 10+ years in digital solutions...',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop'
    }
];
