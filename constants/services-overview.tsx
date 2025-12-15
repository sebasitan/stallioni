import React from 'react';
import type { Service } from '../types';
import {
    WebDevIcon, MobileDevIcon, SeoIcon, AiIcon, EcommIcon, DesignIcon, FullStackIcon, NoCodeIcon,
    WebAnimation, MobileAnimation, AIAnimation, MarketingAnimation, DesignAnimation, EcommAnimation, FullStackAnimation, NoCodeAnimation, SeoAnimation, CrmAnimation
} from '../components/IconComponents';
import {
    WooCommerceIcon, ShopifyIcon, MagentoIcon, FlutterIcon, DockerIcon
} from '../components/TechnologyIcons';

export const SERVICES_OVERVIEW: Service[] = [
    {
        id: 'website-design-development',
        icon: <WebDevIcon />,
        animation: <WebAnimation />,
        title: 'Website Design & Development',
        description: 'Creating stunning, responsive, and high-performance websites that drive engagement.',
        features: ['UI/UX Design', 'Frontend Development', 'Responsive Design', 'Landing Pages']
    },
    // Sub-Services under Website Design & Development
    {
        id: 'ui-ux-design',
        icon: <DesignIcon />,
        animation: <DesignAnimation />,
        title: 'UI/UX Design',
        description: 'User-centric design that drives conversions and enhances experience.',
        features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design']
    },
    {
        id: 'website-development',
        icon: <WebDevIcon />,
        animation: <WebAnimation />,
        title: 'Website Development',
        description: 'Professional, secure, and scalable website development services.',
        features: ['Custom Websites', 'CMS', 'E-commerce', 'Redesign']
    },
    {
        id: 'frontend-development',
        icon: <WebDevIcon />,
        animation: <WebAnimation />,
        title: 'Frontend Development',
        description: 'Modern frontend development with React, Vue, and Svelte.',
        features: ['React', 'Vue', 'Svelte', 'SPA']
    },
    {
        id: 'responsive-mobile-first-development',
        icon: <MobileDevIcon />,
        animation: <MobileAnimation />,
        title: 'Responsive & Mobile-First',
        description: 'Websites that look perfect on mobile, tablet, and desktop.',
        features: ['Mobile-First', 'Fluid Grids', 'Speed Opt', 'Cross-Device']
    },
    {
        id: 'landing-page-design',
        icon: <DesignIcon />,
        animation: <DesignAnimation />,
        title: 'Landing Page Design',
        description: 'High-converting landing pages for your marketing campaigns.',
        features: ['Conversion Focus', 'A/B Testing', 'Fast Loading', 'Mobile Ready']
    },
    {
        id: 'design-systems',
        icon: <DesignIcon />,
        animation: <DesignAnimation />,
        title: 'Design Systems',
        description: 'Scalable design systems for consistent global branding.',
        features: ['Component Libraries', 'Style Guides', 'Documentation', 'Tokens']
    },
    {
        id: 'custom-web-application-development',
        icon: <FullStackIcon />,
        animation: <FullStackAnimation />,
        title: 'Custom Web Application Development',
        description: 'Tailored web applications to streamline your unique business processes.',
        features: ['Business Web Apps', 'SaaS Development', 'API Development', 'Microservices']
    },
    // Sub-Services under Custom Web Application Development
    {
        id: 'business-web-applications',
        icon: <FullStackIcon />,
        animation: <FullStackAnimation />,
        title: 'Business Web Applications',
        description: 'CRM, ERP, HR & Workflow automation tools for business efficiency.',
        features: ['CRM', 'ERP', 'HR Systems', 'Workflow Tools']
    },
    {
        id: 'saas-development',
        icon: <FullStackIcon />,
        animation: <FullStackAnimation />,
        title: 'SaaS Development',
        description: 'Scalable cloud-based software products for startups and enterprises.',
        features: ['Multi-Tenancy', 'Subscription Billing', 'Cloud Scaling', 'MVP']
    },
    {
        id: 'api-development',
        icon: <FullStackIcon />,
        animation: <FullStackAnimation />,
        title: 'API Development',
        description: 'Secure and high-performance REST & GraphQL API solutions.',
        features: ['REST APIs', 'GraphQL', 'Documentation', 'Security']
    },
    {
        id: 'third-party-integrations',
        icon: <FullStackIcon />,
        animation: <FullStackAnimation />,
        title: 'Third-Party Integrations',
        description: 'Seamless integration with payment gateways, CRMs, and more.',
        features: ['Payment Gateways', 'CRM Sync', 'Marketing Tools', 'ERP Connectors']
    },
    {
        id: 'microservices-architecture',
        icon: <FullStackIcon />,
        animation: <FullStackAnimation />,
        title: 'Microservices Architecture',
        description: 'Decoupled, scalable, and resilient system architecture.',
        features: ['Containerization', 'API Gateway', 'Event-Driven', 'Cloud Native']
    },
    {
        id: 'web-portals',
        icon: <FullStackIcon />,
        animation: <FullStackAnimation />,
        title: 'Web Portals',
        description: 'Secure portals for customers, vendors, and partners.',
        features: ['Customer Portals', 'Vendor Dashboards', 'Self-Service', 'RBAC']
    },
    {
        id: 'ecommerce-development',
        icon: <EcommIcon />,
        animation: <EcommAnimation />,
        title: 'E-Commerce Development',
        description: 'Scalable online stores built on top of powerful platforms for maximum sales.',
        features: ['WooCommerce', 'Shopify', 'Magento', 'Custom Solutions', 'Marketplaces']
    },
    // Sub-Services under E-Commerce Development
    {
        id: 'woocommerce-devel',
        icon: <WooCommerceIcon />,
        animation: <EcommAnimation />,
        title: 'WooCommerce Development',
        description: 'Custom stores, plugins, and migration services for WooCommerce.',
        features: ['Custom Themes', 'Plugins', 'Migration', 'Optimization']
    },
    {
        id: 'shopify-development',
        icon: <ShopifyIcon />,
        animation: <EcommAnimation />,
        title: 'Shopify Development',
        description: 'End-to-end Shopify solutions including setup, apps, and migration.',
        features: ['Store Setup', 'Custom Apps', 'Migration', 'Shopify Plus']
    },
    {
        id: 'magento-development',
        icon: <MagentoIcon />,
        animation: <EcommAnimation />,
        title: 'Magento Development',
        description: 'Enterprise-grade Magento stores with high performance and scalability.',
        features: ['B2B Solutions', 'Extensions', 'Migration', 'Performance']
    },
    {
        id: 'bigcommerce-development',
        icon: <EcommIcon />,
        animation: <EcommAnimation />,
        title: 'BigCommerce Development',
        description: 'Scalable SaaS e-commerce solutions for growing businesses.',
        features: ['Store Design', 'API Integration', 'Headless', 'Migration']
    },
    {
        id: 'custom-ecommerce-solutions',
        icon: <FullStackIcon />,
        animation: <FullStackAnimation />,
        title: 'Custom E-Commerce',
        description: 'Tailored e-commerce platforms built from scratch for unique needs.',
        features: ['Custom Dev', 'Marketplaces', 'Integrations', 'SaaS']
    },
    {
        id: 'marketplace-development',
        icon: <EcommIcon />,
        animation: <EcommAnimation />,
        title: 'Multi-Vendor Marketplaces',
        description: 'Build your own Amazon or Etsy-style marketplace platform.',
        features: ['Vendor Portals', 'Commissions', 'Payouts', 'Scalable']
    },
    {
        id: 'payment-gateway-integrations',
        icon: <EcommIcon />,
        animation: <EcommAnimation />,
        title: 'Payment Integrations',
        description: 'Secure payment gateway integration for any platform.',
        features: ['Stripe', 'PayPal', 'Razorpay', 'Global Gateways']
    },
    {
        id: 'cms-development',
        icon: <NoCodeIcon />,
        animation: <NoCodeAnimation />,
        title: 'CMS Development',
        description: 'Flexible content management systems giving you full control over your content.',
        features: ['WordPress', 'Joomla', 'Drupal', 'Headless CMS']
    },
    {
        id: 'php-development',
        icon: <FullStackIcon />,
        animation: <FullStackAnimation />,
        title: 'PHP Development',
        description: 'Expert PHP development using modern frameworks for robust back-end solutions.',
        features: ['Laravel', 'Symfony', 'CodeIgniter', 'Core PHP']
    },
    {
        id: 'mobile-app-development',
        icon: <MobileDevIcon />,
        animation: <MobileAnimation />,
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications for iOS and Android.',
        features: ['iOS Apps', 'Android Apps', 'Flutter', 'React Native']
    },
    // Sub-Services under Mobile App Development
    {
        id: 'ios-app-development',
        icon: <MobileDevIcon />,
        animation: <MobileAnimation />,
        title: 'iOS App Development',
        description: 'Native iOS applications for iPhone, iPad, and Apple Watch.',
        features: ['Swift', 'SwiftUI', 'Xcode', 'Apple Ecosystem']
    },
    {
        id: 'android-app-development',
        icon: <MobileDevIcon />,
        animation: <MobileAnimation />,
        title: 'Android App Development',
        description: 'Scalable Android apps for the world\'s most popular OS.',
        features: ['Kotlin', 'Java', 'Jetpack Compose', 'Play Store']
    },
    {
        id: 'flutter-development',
        icon: <FlutterIcon />,
        animation: <MobileAnimation />,
        title: 'Flutter Development',
        description: 'Beautiful cross-platform apps from a single codebase.',
        features: ['iOS & Android', 'Dart', 'Fast Performance', 'Custom UI']
    },
    {
        id: 'react-native-development',
        icon: <MobileDevIcon />,
        animation: <MobileAnimation />,
        title: 'React Native Development',
        description: 'Native-like performance with shared React codebase.',
        features: ['Cross-Platform', 'JavaScript', 'Expo', 'Fast Delivery']
    },
    {
        id: 'pwa-development',
        icon: <MobileDevIcon />,
        animation: <MobileAnimation />,
        title: 'Progressive Web Apps (PWA)',
        description: 'App-like web experiences that work offline.',
        features: ['Offline Access', 'Push Notifications', 'Fast Loading', 'No Install']
    },
    {
        id: 'maintenance-support',
        icon: <MobileDevIcon />,
        animation: <MobileAnimation />,
        title: 'Maintenance & Support',
        description: 'Reliable support and maintenance to keep your digital assets secure and updated.',
        features: ['Website Maintenance', 'Security Audits', 'Performance Optimization', 'Hosting Support']
    },
    // Sub-Services under Maintenance & Support
    {
        id: 'website-maintenance',
        icon: <MobileDevIcon />,
        animation: <MobileAnimation />,
        title: 'Website Maintenance',
        description: 'Regular updates and fixes to keep your website secure and smooth.',
        features: ['CMS Updates', 'Security Monitoring', 'Bug Fixing', 'Content Updates']
    },
    {
        id: 'application-maintenance',
        icon: <MobileDevIcon />,
        animation: <MobileAnimation />,
        title: 'Application Maintenance',
        description: 'Proactive support for web and mobile applications.',
        features: ['Bug Fixing', 'Platform Updates', 'Performance Tuning', 'Monitoring']
    },
    {
        id: 'security-audits',
        icon: <MobileDevIcon />,
        animation: <MobileAnimation />,
        title: 'Security Audits & Monitoring',
        description: 'Protect your business from malware and cyber threats.',
        features: ['Vulnerability Scan', 'Malware Removal', 'Firewall Setup', '24/7 Monitoring']
    },
    {
        id: 'performance-optimization',
        icon: <MobileDevIcon />,
        animation: <MobileAnimation />,
        title: 'Performance Optimization',
        description: 'Speed up your website to boost SEO and conversions.',
        features: ['Speed Optimization', 'Core Web Vitals', 'Database Cleanup', 'CDN Setup']
    },
    {
        id: 'backup-recovery',
        icon: <MobileDevIcon />,
        animation: <MobileAnimation />,
        title: 'Backup & Recovery',
        description: 'Secure automated backups to prevent data loss.',
        features: ['Automated Backups', 'Cloud Storage', 'Disaster Recovery', 'Rapid Restore']
    },
    {
        id: 'hosting-support',
        icon: <MobileDevIcon />,
        animation: <MobileAnimation />,
        title: 'Hosting Support Services',
        description: 'Expert management for your hosting environment.',
        features: ['Server Setup', 'Migration', '24/7 Monitoring', 'Email Support']
    },
    {
        id: 'seo-digital-marketing',
        icon: <SeoIcon />,
        animation: <SeoAnimation />,
        title: 'SEO & Digital Marketing',
        description: 'Data-driven strategies to boost your online visibility and organic traffic.',
        features: ['Technical SEO', 'Local SEO', 'PPC Ads', 'Content Strategy']
    },
    // Sub-Services under SEO & Digital Marketing
    {
        id: 'technical-seo',
        icon: <SeoIcon />,
        animation: <SeoAnimation />,
        title: 'Technical SEO',
        description: 'Optimize site speed, crawling, and indexing.',
        features: ['Site Audit', 'Speed Optimization', 'Schema Markup', 'Core Web Vitals']
    },
    {
        id: 'on-page-off-page-seo',
        icon: <SeoIcon />,
        animation: <SeoAnimation />,
        title: 'On-Page & Off-Page SEO',
        description: 'Boost rankings with content and authority building.',
        features: ['Keyword Research', 'Meta Tags', 'Link Building', 'Guest Posting']
    },
    {
        id: 'local-seo',
        icon: <SeoIcon />,
        animation: <SeoAnimation />,
        title: 'Local SEO',
        description: 'Dominate local search results and Google Maps.',
        features: ['GMB Optimization', 'Local Citations', 'Reviews', 'Local Keywords']
    },
    {
        id: 'google-ads',
        icon: <SeoIcon />,
        animation: <SeoAnimation />,
        title: 'Google Ads (PPC)',
        description: 'Drive instant traffic with paid search campaigns.',
        features: ['Search Ads', 'Display Ads', 'Shopping Ads', 'ROI Tracking']
    },
    {
        id: 'social-media-ads',
        icon: <SeoIcon />,
        animation: <SeoAnimation />,
        title: 'Social Media Ads',
        description: 'Targeted ads on Facebook, Instagram, and LinkedIn.',
        features: ['fb/Insta Ads', 'Audience Targeting', 'Video Ads', 'Retargeting']
    },
    {
        id: 'content-writing-strategy',
        icon: <SeoIcon />,
        animation: <SeoAnimation />,
        title: 'Content Writing & Strategy',
        description: 'Engage your audience with SEO-friendly content.',
        features: ['Blogs', 'Web Copy', 'Product Desc', 'Content Plan']
    },
    {
        id: 'cloud-devops-services',
        icon: <FullStackIcon />,
        animation: <FullStackAnimation />,
        title: 'Cloud & DevOps Services',
        description: 'Cloud infrastructure setup and automated DevOps pipelines for efficiency.',
        features: ['Cloud Migration', 'CI/CD Automation', 'Docker & Kubernetes', 'AWS/Azure']
    },
    // Sub-Services under Cloud & DevOps
    {
        id: 'cloud-setup',
        icon: <FullStackIcon />,
        animation: <FullStackAnimation />,
        title: 'AWS / Azure / GCP Setup',
        description: 'Secure and scalable cloud environment setup.',
        features: ['Infrastructure Setup', 'Security Configuration', 'Load Balancing', 'Cost Optimization']
    },
    {
        id: 'cloud-migration',
        icon: <FullStackIcon />,
        animation: <FullStackAnimation />,
        title: 'Cloud Migration',
        description: 'Move your apps and data to the cloud seamlessly.',
        features: ['Assessment', 'Strategy', 'Data Migration', 'App Migration']
    },
    {
        id: 'cicd-automation',
        icon: <FullStackIcon />,
        animation: <FullStackAnimation />,
        title: 'CI/CD Automation',
        description: 'Automate build, test, and deployment pipelines.',
        features: ['Pipeline Setup', 'Automated Testing', 'Continuous Delivery', 'DevOps Ops']
    },
    {
        id: 'docker-kubernetes',
        icon: <DockerIcon />,
        animation: <FullStackAnimation />,
        title: 'Docker & Kubernetes',
        description: 'Containerization and orchestration for scalability.',
        features: ['Dockerization', 'K8s Cluster Setup', 'Microservices', 'High Availability']
    },
    {
        id: 'infrastructure-as-code',
        icon: <FullStackIcon />,
        animation: <FullStackAnimation />,
        title: 'Infrastructure as Code',
        description: 'Manage infrastructure using code (Terraform, Ansible).',
        features: ['Terraform', 'Ansible', 'Automation', 'Scalability']
    },
    {
        id: 'logging-monitoring',
        icon: <FullStackIcon />,
        animation: <FullStackAnimation />,
        title: 'Logging & Monitoring',
        description: 'Real-time monitoring and logging for your apps.',
        features: ['ELK Stack', 'Prometheus', 'Grafana', 'Alerts']
    },
    {
        id: 'quality-assurance-testing',
        icon: <NoCodeIcon />,
        animation: <NoCodeAnimation />,
        title: 'Quality Assurance & Testing',
        description: 'Comprehensive testing services to ensure bug-free and reliable software.',
        features: ['Automated Testing', 'Manual Testing', 'API Testing', 'Performance Testing']
    },
    // Sub-Services under Quality Assurance
    {
        id: 'manual-testing',
        icon: <NoCodeIcon />,
        animation: <NoCodeAnimation />,
        title: 'Manual Testing',
        description: 'Detailed manual testing for UX and functionality.',
        features: ['Functional Testing', 'UI/UX Testing', 'Regression Testing', 'Usability Testing']
    },
    {
        id: 'automated-testing',
        icon: <NoCodeIcon />,
        animation: <NoCodeAnimation />,
        title: 'Automated Testing',
        description: 'Speed up releases with automated test scripts.',
        features: ['Selenium', 'Cypress', 'Regression Automation', 'CI/CD Integration']
    },
    {
        id: 'api-testing',
        icon: <NoCodeIcon />,
        animation: <NoCodeAnimation />,
        title: 'API Testing',
        description: 'Ensure secure and reliable API integrations.',
        features: ['REST/SOAP Testing', 'Load Testing', 'Security Checks', 'Postman']
    },
    {
        id: 'performance-testing',
        icon: <NoCodeIcon />,
        animation: <NoCodeAnimation />,
        title: 'Performance & Load Testing',
        description: 'Test app stability under high traffic loads.',
        features: ['Load Testing', 'Stress Testing', 'Scalability', 'Speed Optimization']
    },
    {
        id: 'cross-browser-testing',
        icon: <NoCodeIcon />,
        animation: <NoCodeAnimation />,
        title: 'Cross-Browser Testing',
        description: 'Ensure compatibility across all devices and browsers.',
        features: ['BrowserStack', 'Responsive Design', 'Mobile Compatibility', 'UI Consistency']
    },
    {
        id: 'ai-automation-modern-tech',
        icon: <AiIcon />,
        animation: <AIAnimation />,
        title: 'AI, Automation & Modern Technologies',
        description: 'Leveraging AI and automation to transform business operations.',
        features: ['AI Chatbots', 'NLP Features', 'Process Automation', 'WebRTC']
    },
    // Sub-Services under AI & Automation
    {
        id: 'ai-chatbots',
        icon: <AiIcon />,
        animation: <AIAnimation />,
        title: 'AI Chatbots',
        description: 'Intelligent conversational AI for support and sales.',
        features: ['Support Bots', 'Sales Bots', 'WhatsApp Bots', 'Voice Assistants']
    },
    {
        id: 'recommendation-engines',
        icon: <AiIcon />,
        animation: <AIAnimation />,
        title: 'Recommendation Engines',
        description: 'Personalized product and content suggestions.',
        features: ['Collaborative Filtering', 'Content-Based', 'Real-Time Recommender', 'Upselling']
    },
    {
        id: 'nlp-features',
        icon: <AiIcon />,
        animation: <AIAnimation />,
        title: 'NLP Features',
        description: 'Advanced text analysis and sentiment processing.',
        features: ['Sentiment Analysis', 'Text Classification', 'Smart Search', 'Extraction']
    },
    {
        id: 'business-process-automation',
        icon: <AiIcon />,
        animation: <AIAnimation />,
        title: 'Business Process Automation',
        description: 'Automate repetitive workflows and tasks.',
        features: ['Workflow Automation', 'Invoice & Billing', 'CRM Automation', 'Data Sync']
    },
    {
        id: 'real-time-apps',
        icon: <AiIcon />,
        animation: <AIAnimation />,
        title: 'Real-Time Apps (WebSockets)',
        description: 'Instant updates for chat, tracking, and dashboards.',
        features: ['Live Chat', 'Real-Time Tracking', 'Live Dashboards', 'Notifications']
    }
];
