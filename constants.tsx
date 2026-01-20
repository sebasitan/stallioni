// OPTIMIZED CONSTANTS FILE
// This file now only exports lightweight data that's needed on every page
// Heavy SERVICE_DETAILS are lazy-loaded via constants/service-loader.ts

// Re-export navigation and contact info
export { NAV_LINKS, getContactEmail, getWhatsAppPhone, getCallPhone, RECAPTCHA_SITE_KEY } from './constants/nav';

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
    { id: 1, title: 'Global Fintech Super-App', category: PortfolioCategory.MOBILE, industry: Industry.FINTECH, technologies: ['React Native', 'Node.js', 'AWS', 'PostgreSQL'], description: 'A comprehensive mobile banking and investment application for a UK challenger bank, serving over a million users.', imageUrl: 'https://images.unsplash.com/photo-1579621970795-87f54f597587?q=80&w=600&h=400&auto=format&fit=crop', clientLocation: 'London, UK', testimonial: 'Stallioni delivered a world-class application that is robust, secure, and beautiful. A true partner in our success.' },
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
        title: '10 Reasons Why Your Business Needs a Professional Website in 2025',
        excerpt: 'A professional website builds trust, improves visibility, and drives growth. Learn why every business needs one.',
        author: 'Seba Sebastian',
        date: '2025-01-15',
        category: 'Web Development',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&h=400&auto=format&fit=crop',
        content: '<p>Content...</p>'
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
