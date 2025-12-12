// OPTIMIZED CONSTANTS FILE
// This file now only exports lightweight data that's needed on every page
// Heavy SERVICE_DETAILS are lazy-loaded via constants/service-loader.ts

// Re-export navigation and contact info
export { NAV_LINKS, getContactEmail, getWhatsAppPhone, getCallPhone } from './constants/nav';

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
