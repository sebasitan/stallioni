import { BLOG_POSTS, JOB_OPENINGS } from './constants';
import { getServiceDetails } from './constants/service-loader';
import { REGIONAL_PAGES } from './constants/regional-pages';
import { BlogPost, ServiceDetail, JobOpening } from './types';

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: 'website' | 'article';
  structuredData: string;
  noindex?: boolean;
  hreflangAlternates?: { hreflang: string; href: string }[];
}

export const BASE_URL = 'https://www.stallioni.com';
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&h=630&auto=format&fit=crop';


export const defaultMetadata: Omit<PageMetadata, 'ogUrl' | 'structuredData'> = {
  title: 'IT Outsourcing Company in India | Hire Dedicated Developers',
  description: 'Scale faster with affordable IT outsourcing from India. Hire dedicated remote developers for web, mobile, AI, and SaaS projects. 900+ projects delivered.',
  keywords: 'IT outsourcing company, hire remote developers, offshore development team, affordable IT outsourcing, software outsourcing services, dedicated developer team, outsourcing for startups, global IT service provider',
  ogTitle: 'Best IT Outsourcing Company | Stallioni Net Solutions',
  ogDescription: 'Scale faster with affordable IT outsourcing. Hire expert developers and remote teams for web, mobile, and SaaS projects. Trusted in USA, UK, India & more.',
  ogImage: DEFAULT_OG_IMAGE,
  ogType: 'website',
};

// --- SCHEMA.ORG STRUCTURED DATA GENERATORS ---

// Markets Stallioni actively services — used in Organization.areaServed and
// per-Service areaServed so Google understands this is a multi-region
// outsourcing provider, not an India-only company.
const SERVED_COUNTRIES = [
  { '@type': 'Country', name: 'India' },
  { '@type': 'Country', name: 'United States' },
  { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'Country', name: 'Australia' },
  { '@type': 'Country', name: 'United Arab Emirates' },
  { '@type': 'Country', name: 'Canada' },
];

// One real verified client testimonial from the public Freelancer.com profile.
// Quoting an individual review (with author + date + body) gives LLMs and
// rich-result eligibility a citable quote — much stronger than AggregateRating
// alone. Add more entries here as we get permission to quote them by name.
const VERIFIED_REVIEWS = [
  {
    '@type': 'Review',
    'author': { '@type': 'Person', 'name': 'Sofia N.' },
    'datePublished': '2022-07-01',
    'reviewBody': 'Stallioni Net Solution was a great partner from the start — always extremely courteous and responsive throughout the project.',
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': '5',
      'bestRating': '5',
      'worstRating': '1',
    },
    'publisher': { '@type': 'Organization', 'name': 'Freelancer.com' },
  },
];

// Entities the company is materially associated with — used by LLMs and
// knowledge-graph builders to triangulate authority and verify claims.
const ORG_MENTIONS = [
  {
    '@type': 'WebSite',
    'name': 'Freelancer.com',
    'url': 'https://www.freelancer.com/u/graphicaa',
    'description': 'Public profile with 978 verified client reviews since 2007.',
  },
  {
    '@type': 'WebSite',
    'name': 'LinkedIn (Founder)',
    'url': 'https://www.linkedin.com/in/sebastian-yesuraj/',
    'description': 'Sebastian Yesuraj — Founder of Stallioni Net Solutions.',
  },
];

const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  'name': 'Stallioni',
  'alternateName': 'Stallioni Net Solutions',
  'url': BASE_URL,
  'logo': `${BASE_URL}/logo.svg`,
  // Verifiable on https://www.freelancer.com/u/graphicaa — established May 2007.
  'foundingDate': '2007',
  'sameAs': [
    'https://www.linkedin.com/in/sebastian-yesuraj/',
    'https://www.freelancer.com/u/graphicaa',
  ],
  // External entities mentioned/related — feeds knowledge-graph triangulation.
  'mentions': ORG_MENTIONS,
  // Sourced from the public Freelancer.com profile linked above
  // (4.8 / 5 across 978 client reviews). Don't change these numbers
  // without also updating the profile — Google verifies aggregateRating
  // against the cited sameAs URL when possible.
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.8',
    'reviewCount': '978',
    'bestRating': '5',
    'worstRating': '1',
  },
  'review': VERIFIED_REVIEWS,
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': '23. Jayanth complex, TP Road',
    'addressLocality': 'Annur, Coimbatore',
    'postalCode': '641653',
    'addressRegion': 'Tamilnadu',
    'addressCountry': 'IN'
  },
  'areaServed': SERVED_COUNTRIES
});

// LocalBusiness is the more specific Schema.org subtype for businesses with a
// physical address. Emitted alongside Organization on the homepage so Google
// Maps + local search + AI search treat us as a brick-and-mortar entity with
// verifiable coordinates, opening hours, and price range.
const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#localbusiness`,
  'name': 'Stallioni Net Solutions',
  'image': `${BASE_URL}/logo.svg`,
  'url': BASE_URL,
  'telephone': '+91-98432-96279',
  'email': 'contact@stallioni.com',
  'priceRange': '$$',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': '23 Jayanth Complex, TP Road',
    'addressLocality': 'Annur, Coimbatore',
    'postalCode': '641653',
    'addressRegion': 'Tamil Nadu',
    'addressCountry': 'IN'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 11.2735,
    'longitude': 77.1078
  },
  'openingHoursSpecification': [{
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    'opens': '09:00',
    'closes': '18:00'
  }],
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.8',
    'reviewCount': '978',
    'bestRating': '5',
    'worstRating': '1'
  },
  'areaServed': SERVED_COUNTRIES,
});

// FAQ schema for the homepage — high-intent questions LLMs and Google AI
// Overviews surface for queries like "how much does IT outsourcing cost",
// "how do I verify a Freelancer.com agency", etc. Answers are honest and
// trace back to facts visible elsewhere on the site (no fabrication).
const getHomepageFaqSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'How much does it cost to outsource IT development to India?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Costs vary by project type. Marketing websites typically run $1,500–$4,500, e-commerce stores $2,500–$8,000, SaaS MVPs $8,000–$25,000, and mobile apps $4,000–$60,000+ depending on platforms and features. Our public hourly rate on Freelancer.com is $12 USD, and dedicated developer engagements range from $3,000–$6,500 per developer per month. We provide free fixed-scope quotes within 48 hours of a discovery call.'
      }
    },
    {
      '@type': 'Question',
      'name': 'How can I verify Stallioni’s track record before hiring?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'We have a public Freelancer.com profile at freelancer.com/u/graphicaa with 978 verified client reviews, a 4.8 / 5 rating, and Preferred Freelancer status since May 2007. You can read individual reviews, view past projects, and verify our 86% on-time and 96% on-budget delivery rates before signing any contract.'
      }
    },
    {
      '@type': 'Question',
      'name': 'What time zones do you work in?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Our team is based in Coimbatore, India (IST, UTC+5:30). For US clients, our developers work evening IST which overlaps 3–7 hours with US morning hours. For Australian clients, we work from 8 AM IST giving a full afternoon overlap with AEST/AEDT. For European clients, we share most of the business day. We adjust schedules for tight collaboration projects.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Do you provide dedicated developers or fixed-scope projects?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Both. Dedicated developer engagements run 3 months minimum at a fixed monthly rate per developer ($3,000–$6,500 depending on stack and seniority). Fixed-scope projects use milestone-based pricing — you approve a scope and pay against deliverables. Most clients choose dedicated teams for ongoing product work and fixed-scope for one-time builds like MVPs or migrations.'
      }
    },
    {
      '@type': 'Question',
      'name': 'What payment methods do you accept?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'International clients can pay via wire transfer, PayPal, or Freelancer.com escrow (recommended for first-time clients). Indian clients pay via NEFT, IMPS, RTGS, or UPI with proper GST invoicing. We invoice in USD, AUD, EUR, GBP, or INR depending on the client preference. Most engagements are net-30.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Do you sign NDAs and assign IP rights to clients?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes. Every client signs a mutual NDA before scoping discussions begin, and work-for-hire IP assignment is standard — you own 100% of the code, designs, and assets we produce from the moment they are committed to your repository. We can sign your MSA or use a simple one of ours.'
      }
    },
    {
      '@type': 'Question',
      'name': 'How long does a typical project take?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Marketing websites typically launch in 2–3 weeks. Shopify or WooCommerce stores ship in 3–5 weeks. SaaS MVPs deliver in 8–12 weeks. Custom mobile apps take 10–20 weeks depending on platforms and complexity. We use milestone-based delivery with weekly demos so progress is always visible. Most clients see a working version within 4 weeks.'
      }
    },
    {
      '@type': 'Question',
      'name': 'How do I get started with Stallioni?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Three options: email contact@stallioni.com with a brief about your project, call +91 98432 96279, or message WhatsApp at +91 63836 80419. Within 24 hours we schedule a free 30-minute scoping call. Within 48 hours of that call, we deliver a written proposal with fixed scope, milestones, and pricing. No commitment until you sign.'
      }
    }
  ]
});

// Speakable schema — tells Google Assistant / Siri which parts of the page
// can be read aloud for voice search answers. Targets the H1 (page topic)
// and FAQ answers (the actual answer-able content).
const getSpeakableSchema = (url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  'url': url,
  'speakable': {
    '@type': 'SpeakableSpecification',
    'cssSelector': ['h1', '[data-speakable]', '.faq-answer']
  }
});

const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'url': `${BASE_URL}/`,
  'potentialAction': {
    '@type': 'SearchAction',
    'target': `${BASE_URL}/services?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

const getBreadcrumbSchema = async (path: string) => {
  const parts = path.replace('/', '').split('/').filter(p => p);
  const itemListElement = [{
    '@type': 'ListItem',
    position: 1,
    name: 'Home',
    item: BASE_URL
  }];

  const breadcrumbMap: { [key: string]: string } = {
    'about': 'About Us',
    'services': 'Services',
    'portfolio': 'Portfolio',
    'blog': 'Blog',
    'careers': 'Careers',
    'contact': 'Contact Us'
  }

  let currentPath = '/';

  // Need service details for breadcrumbs if it's a service page
  let serviceDetails: ServiceDetail[] = [];
  if (path.includes('services')) {
    serviceDetails = await getServiceDetails();
  }

  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    currentPath += `${part}`;
    let name = breadcrumbMap[part] || part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    if (index === 0 && part === 'services' && parts[1]) {
      const service = serviceDetails.find(s => s.id === parts[1]);
      if (service) itemListElement.push({ '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` });
    }
    if (index === 0 && part === 'blog' && parts[1]) {
      const blog = BLOG_POSTS.find(b => b.id === parseInt(parts[1], 10));
      if (blog) itemListElement.push({ '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` });
    }

    if (index === 1 && parts[0] === 'services') {
      const service = serviceDetails.find(s => s.id === part);
      name = service ? service.title : name;
    }
    if (index === 1 && parts[0] === 'blog') {
      const blog = BLOG_POSTS.find(b => b.id === parseInt(part, 10));
      name = blog ? blog.title : name;
    }

    if (index === parts.length - 1) {
      itemListElement.push({ '@type': 'ListItem', position: itemListElement.length + 1, name, item: `${BASE_URL}${path}` });
    }

    currentPath += '/';
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  };
};

const getArticleSchema = (post: BlogPost) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': `${BASE_URL}/blog/${post.id}`
  },
  'headline': post.title,
  'description': post.excerpt,
  'image': post.imageUrl.startsWith('https://images.unsplash.com/')
    ? post.imageUrl.split('?')[0] + '?q=80&w=1200&h=630&auto=format&fit=crop'
    : post.imageUrl,
  'author': {
    '@type': 'Person',
    'name': post.author.split(',')[0]
  },
  'publisher': {
    '@type': 'Organization',
    'name': 'Stallioni',
    'logo': {
      '@type': 'ImageObject',
      'url': `${BASE_URL}/logo.svg`
    }
  },
  'datePublished': post.date,
});

const getServiceSchema = (service: ServiceDetail) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': service.title,
  'provider': {
    '@type': 'Organization',
    'name': 'Stallioni',
    'url': `${BASE_URL}/`
  },
  'description': service.description,
  'areaServed': SERVED_COUNTRIES
});

const getFaqSchema = (service: ServiceDetail) => {
  if (!service.faqs || service.faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': service.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
};

const getHowToSchema = (service: ServiceDetail) => {
  if (!service.process || service.process.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': `How We Deliver ${service.title}`,
    'description': service.shortDescription,
    'step': service.process.map(p => ({
      '@type': 'HowToStep',
      'position': p.step,
      'name': p.title,
      'text': p.description
    }))
  };
};

// Trim description to ~155 chars at a word boundary, no trailing partial word.
const trimDescription = (text: string, maxLen = 155): string => {
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated).replace(/[.,;:\s]+$/, '') + '…';
};

const getJobPostingSchema = () => JOB_OPENINGS.map(job => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  'title': job.title,
  'description': job.description,
  'hiringOrganization': getOrganizationSchema(),
  'employmentType': job.employmentType,
  'datePosted': new Date().toISOString().split('T')[0], // Assuming jobs are always current
  'validThrough': new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0], // Valid for 1 year
  'jobLocation': {
    '@type': 'Place',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Coimbatore',
      'addressRegion': 'Tamil Nadu',
      'addressCountry': 'IN',
    }
  },
  'jobLocationType': 'TELECOMMUTE',
  'applicantLocationRequirements': {
    '@type': 'Country',
    'name': 'India'
  },
  'baseSalary': {
    '@type': 'MonetaryAmount',
    'currency': 'INR',
    'value': {
      '@type': 'QuantitativeValue',
      'minValue': 1500000,
      'maxValue': 3000000,
      'unitText': 'YEAR'
    }
  }
}));


// --- METADATA COMPOSITION ---

const staticMetadata: Record<string, Partial<PageMetadata>> = {
  '/': {}, // Uses default
  '/about': {
    title: 'About Stallioni | Leading IT Outsourcing Company in India',
    description: 'Learn about Stallioni, a global IT outsourcing company delivering affordable, high-quality software development with expert remote teams. Trusted in 35+ countries.',
    keywords: 'about Stallioni, IT outsourcing company in India, offshore development company, remote development team India, global software outsourcing partner, Indian software development company, about stallioni, trusted offshore development partner, IT outsourcing company India, remote development teams, hire Indian developers, software development India since 2007, global technology partner, offshore development center coimbatore',
    ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c7da?q=80&w=1200&h=630&auto=format&fit=crop',
  },
  '/services': {
    title: 'IT Outsourcing Services | Stallioni - Offshore Development India',
    description: 'Explore our comprehensive IT outsourcing services. Hire remote teams in India for web & mobile development, AI solutions, UI/UX design, CRM customization, and digital marketing.',
    keywords: 'IT outsourcing services, offshore software development, hire remote development teams, web development outsourcing India, mobile app development outsourcing, AI solutions India, full stack developer hire, CRM customization services, UI/UX design agency, digital marketing outsourcing, white label SEO services',
    ogImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&h=630&auto=format&fit=crop',
  },
  '/portfolio': {
    title: 'Portfolio | 900+ IT Outsourcing Projects Delivered Worldwide',
    description: 'Browse 900+ successful IT outsourcing projects. Web, mobile, AI, and e-commerce builds delivered to clients in 35+ countries since 2008.',
    keywords: 'IT outsourcing portfolio, offshore development case studies, software development projects, stallioni clients, remote team success stories, hire Indian developers portfolio, success stories outsourcing India',
    ogImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&h=630&auto=format&fit=crop',
  },
  '/blog': {
    title: 'Stallioni Blog | Insights on IT Outsourcing, Tech & Digital Strategy',
    description: "Read the latest articles from Stallioni's experts on IT outsourcing to India, emerging technologies, AI, software development trends, and digital marketing strategies.",
    keywords: 'IT outsourcing blog, technology blog, software development trends, offshore development insights, remote team management, AI development articles, tech insights India, outsourcing best practices',
    ogImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&h=630&auto=format&fit=crop',
  },
  '/careers': {
    title: 'Careers — Freelance Developer Jobs at Stallioni',
    description: 'Join Stallioni as a freelance WordPress, React, PHP, or AI developer. Contract-based remote jobs with global clients. Apply today.',
    keywords: 'freelance developer jobs, contract developer jobs India, remote WordPress developer, freelance React developer, PHP developer jobs, AI developer freelance, contract-based jobs, remote development jobs, freelance tech jobs India, work from home developer',
    ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c7da?q=80&w=1200&h=630&auto=format&fit=crop',
  },
  '/contact': {
    title: 'Contact Stallioni | Get a Free Outsourcing Quote',
    description: 'Contact Stallioni to start your project or discuss a partnership. Get a free, no-obligation quote from our offshore software development team in India.',
    keywords: 'contact stallioni, get a quote, IT outsourcing consultation, software development quote, hire indian developers contact, free consultation, project quote India',
    ogImage: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=1200&h=630&auto=format&fit=crop',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Stallioni',
    description: 'Learn how Stallioni collects, uses, and protects your personal data. Our privacy practices comply with GDPR and Indian IT regulations.',
    keywords: '',
    noindex: true,
  },
  // Admin surface — must not be indexed
  '/seba': {
    title: 'Admin · Stallioni',
    description: 'Internal admin dashboard.',
    keywords: '',
    noindex: true,
  },
  '/seba/login': {
    title: 'Admin Login · Stallioni',
    description: 'Internal admin login.',
    keywords: '',
    noindex: true,
  },
  '/seba/portfolio': {
    title: 'Admin · Portfolio · Stallioni',
    description: 'Internal admin dashboard.',
    keywords: '',
    noindex: true,
  },
  '/seba/blog': {
    title: 'Admin · Blog · Stallioni',
    description: 'Internal admin dashboard.',
    keywords: '',
    noindex: true,
  },
  '/seba/careers': {
    title: 'Admin · Careers · Stallioni',
    description: 'Internal admin dashboard.',
    keywords: '',
    noindex: true,
  },
};

const getServiceMetadata = (service: ServiceDetail): Partial<PageMetadata> => {
  const baseKeywords = [
    `outsource ${service.category} development`,
    `hire remote ${service.category} developers India`,
    `${service.category} outsourcing services`,
    `offshore ${service.category} development company`,
  ];

  const specificKeywords = [
    service.title,
    ...service.offerings,
    ...service.technologies.flatMap(t => [t.name, ...t.services])
  ];

  const keywords = [...new Set([...baseKeywords, ...specificKeywords])].join(', ');

  // Build a fallback meta description that reads like a sentence. The previous
  // version produced grammar like "Outsource Design development to Stallioni"
  // because service.category is a noun, not a verb. Use service.title instead.
  const fallbackDescription = `${service.title} by Stallioni — ${service.shortDescription}. Hire dedicated remote developers from India.`;

  return {
    title: service.metaTitle || `${service.title} | Offshore Outsourcing Services by Stallioni`,
    description: trimDescription(service.metaDescription || fallbackDescription),
    keywords: service.keywords || keywords,
    ogImage: `${BASE_URL}/og/${service.id}.jpg`,
  };
};


export const getBlogPostMetadata = (post: BlogPost): Partial<PageMetadata> => ({
  title: post.metaTitle || `${post.title} | Stallioni Blog`,
  description: post.metaDescription || post.excerpt,
  keywords: post.keywords || `Stallioni blog, ${post.category}, ${post.title.split(' ').slice(0, 5).join(', ')}, IT outsourcing insights`,
  ogTitle: post.metaTitle || `${post.title} | Stallioni Blog`,
  ogDescription: post.metaDescription || post.excerpt,
  ogImage: post.imageUrl.startsWith('https://images.unsplash.com/')
    ? post.imageUrl.split('?')[0] + '?q=80&w=1200&h=630&auto=format&fit=crop'
    : post.imageUrl,
  ogType: 'article',
});

export const getPageMetadata = async (route: string): Promise<PageMetadata> => {
  let partialMetadata: Partial<PageMetadata> = {};
  const cleanRoute = route.split('?')[0]; // Ignore query params

  const schema: any[] = [getOrganizationSchema()];
  schema.push(await getBreadcrumbSchema(cleanRoute));

  if (cleanRoute.startsWith('/blog/')) {
    // Post IDs can be numeric (seeded posts) or strings like "blog-1234" (admin
    // posts). The route gives us a raw string — try every reasonable form.
    const rawId = cleanRoute.split('/')[2];
    const numericId = parseInt(rawId, 10);
    const post = BLOG_POSTS.find(
      (p) =>
        p.id === rawId ||
        p.id.toString() === rawId ||
        (!Number.isNaN(numericId) && p.id === numericId)
    );
    if (post) {
      partialMetadata = getBlogPostMetadata(post);
      schema.push(getArticleSchema(post));
    }
  } else if (cleanRoute.startsWith('/services/')) {
    const id = cleanRoute.split('/')[2];
    const serviceDetails = await getServiceDetails();
    const service = serviceDetails.find(s => s.id === id);
    if (service) {
      partialMetadata = getServiceMetadata(service);
      schema.push(getServiceSchema(service));
      const faqSchema = getFaqSchema(service);
      if (faqSchema) schema.push(faqSchema);
      const howToSchema = getHowToSchema(service);
      if (howToSchema) schema.push(howToSchema);
    }
  } else if (cleanRoute.startsWith('/it-outsourcing/')) {
    const regionSlug = cleanRoute.split('/')[2];
    const regional = REGIONAL_PAGES[regionSlug];
    if (regional) {
      const region = regional.regionDisplayName;
      const regionalKeywords = [
        `IT outsourcing ${region}`,
        `hire developers from India for ${region}`,
        `offshore software development ${region}`,
        `remote developers ${region}`,
        `${region} web development outsourcing`,
        `${region} mobile app developers India`,
        `${region} e-commerce outsourcing`,
        `Stallioni ${region}`,
      ];
      const regionOgImages: Record<string, string> = {
        usa: 'https://images.unsplash.com/photo-1496450681664-3df85efbd29f?q=80&w=1200&h=630&auto=format&fit=crop',
        australia: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1200&h=630&auto=format&fit=crop',
        india: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&h=630&auto=format&fit=crop',
        uk: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&h=630&auto=format&fit=crop',
      };
      partialMetadata = {
        title: regional.metaTitle,
        description: regional.metaDescription,
        keywords: regionalKeywords.join(', '),
        ogImage: regionOgImages[regionSlug] || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&h=630&auto=format&fit=crop',
        hreflangAlternates: [
          { hreflang: 'en-us', href: `${BASE_URL}/it-outsourcing/usa` },
          { hreflang: 'en-au', href: `${BASE_URL}/it-outsourcing/australia` },
          { hreflang: 'en-in', href: `${BASE_URL}/it-outsourcing/india` },
          { hreflang: 'en-gb', href: `${BASE_URL}/it-outsourcing/uk` },
          { hreflang: 'x-default', href: `${BASE_URL}/` },
        ],
      };
      // Emit FAQPage schema for the regional FAQs too — qualifies for rich results.
      schema.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': regional.faqs.map(f => ({
          '@type': 'Question',
          'name': f.question,
          'acceptedAnswer': { '@type': 'Answer', 'text': f.answer }
        }))
      });
      // Speakable for voice search — flags H1 + FAQ answers as voice-readable.
      schema.push(getSpeakableSchema(`${BASE_URL}${cleanRoute}`));
    }
  } else if (cleanRoute === '/resources' || cleanRoute.startsWith('/resources/')) {
    const { RESOURCE_ARTICLES, getArticleBySlug, CATEGORY_LABELS } = await import('./constants/resources');
    if (cleanRoute === '/resources') {
      // Hub page metadata
      partialMetadata = {
        title: 'Resources | Honest Tool Reviews & Guides from a Working Agency | Stallioni',
        description: 'Comparison guides, honest reviews, and tools-we-actually-use roundups for hosting, e-commerce, SEO, and design — written by a working digital agency.',
        keywords: 'agency resources, tool reviews, hosting comparison, ecommerce comparison, SEO tools, web development resources',
        ogImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&h=630&auto=format&fit=crop',
      };
      // ItemList schema for the hub — helps search engines understand it's a collection
      schema.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'name': 'Stallioni Resources',
        'numberOfItems': RESOURCE_ARTICLES.length,
        'itemListElement': RESOURCE_ARTICLES.map((article: any, idx: number) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'url': `${BASE_URL}/resources/${article.slug}`,
          'name': article.h1,
        })),
      });
    } else {
      // Individual article page
      const articleSlug = cleanRoute.split('/')[2];
      const article = getArticleBySlug(articleSlug);
      if (article) {
        partialMetadata = {
          title: article.metaTitle,
          description: article.metaDescription,
          keywords: `${article.category}, ${article.h1.toLowerCase()}, agency review, honest comparison`,
          ogImage: article.ogImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&h=630&auto=format&fit=crop',
          ogType: 'article',
        };
        // Article schema — qualifies for Google's article rich results
        schema.push({
          '@context': 'https://schema.org',
          '@type': 'Article',
          'headline': article.h1,
          'description': article.summary,
          'image': article.ogImage,
          'datePublished': article.publishedDate,
          'dateModified': article.updatedDate || article.publishedDate,
          'author': {
            '@type': 'Person',
            'name': article.author,
            'url': 'https://www.linkedin.com/in/sebastian-yesuraj/',
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'Stallioni',
            'logo': { '@type': 'ImageObject', 'url': `${BASE_URL}/logo.svg` },
          },
          'mainEntityOfPage': { '@type': 'WebPage', '@id': `${BASE_URL}${cleanRoute}` },
          'articleSection': CATEGORY_LABELS[article.category],
        });
        // FAQPage schema — same trick we use on regional pages
        if (article.faqs && article.faqs.length > 0) {
          schema.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': article.faqs.map((f: { question: string; answer: string }) => ({
              '@type': 'Question',
              'name': f.question,
              'acceptedAnswer': { '@type': 'Answer', 'text': f.answer },
            })),
          });
        }
      }
    }
  } else if (cleanRoute === '/agencies') {
    const { AGENCIES_PAGE } = await import('./constants/agencies-page');
    partialMetadata = {
      title: AGENCIES_PAGE.metaTitle,
      description: AGENCIES_PAGE.metaDescription,
      keywords: 'white-label development, agency partner, offshore developers for agencies, IR35-free dev team, dedicated developers for agencies, agency overflow capacity',
      ogImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&h=630&auto=format&fit=crop',
    };
    // FAQ schema for rich results
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': AGENCIES_PAGE.faqs.map(f => ({
        '@type': 'Question',
        'name': f.question,
        'acceptedAnswer': { '@type': 'Answer', 'text': f.answer }
      }))
    });
  } else if (staticMetadata[cleanRoute]) {
    partialMetadata = staticMetadata[cleanRoute];
    if (cleanRoute === '/') {
      schema.push(getWebsiteSchema());
      // Homepage gets the full AI-search payload:
      // - LocalBusiness pins us to a real address/coordinates for local search
      // - FAQPage answers high-intent queries directly (Google AI Overviews,
      //   ChatGPT/Perplexity citations, etc.)
      schema.push(getLocalBusinessSchema());
      schema.push(getHomepageFaqSchema());
    }
    if (cleanRoute === '/careers') schema.push(...getJobPostingSchema());
  } else if (cleanRoute === '/') {
    partialMetadata = staticMetadata['/'];
    schema.push(getWebsiteSchema());
    schema.push(getLocalBusinessSchema());
    schema.push(getHomepageFaqSchema());
  } else if (cleanRoute.startsWith('/seba')) {
    // Catch-all for any admin sub-route not explicitly listed above.
    partialMetadata = {
      title: 'Admin · Stallioni',
      description: 'Internal admin dashboard.',
      keywords: '',
      noindex: true,
    };
  } else {
    // Any other unmatched route — the React Router catch-all renders the
    // NotFoundPage. Set metadata accordingly so search engines don't index it.
    partialMetadata = {
      title: '404 — Page not found | Stallioni',
      description: 'The page you are looking for doesn\'t exist or has been moved.',
      keywords: '',
      noindex: true,
    };
  }

  const ogUrl = `${BASE_URL}${cleanRoute}`;
  const structuredData = JSON.stringify(schema);

  const finalMetadata = { ...defaultMetadata, ...partialMetadata, ogUrl, structuredData };
  // Enforce Google's ~155 char limit so descriptions don't get truncated mid-sentence in SERPs.
  if (finalMetadata.description) {
    finalMetadata.description = trimDescription(finalMetadata.description);
  }
  if (!partialMetadata.ogTitle && finalMetadata.title) {
    finalMetadata.ogTitle = finalMetadata.title;
  }
  if (!partialMetadata.ogDescription && finalMetadata.description) {
    finalMetadata.ogDescription = finalMetadata.description;
  }

  return finalMetadata as PageMetadata;
};