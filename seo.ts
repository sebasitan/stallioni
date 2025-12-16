import { BLOG_POSTS, JOB_OPENINGS } from './constants';
import { getServiceDetails } from './constants/service-loader';
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
}

const BASE_URL = 'https://stallioni.com';
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&h=630&auto=format&fit=crop';


export const defaultMetadata: Omit<PageMetadata, 'ogUrl' | 'structuredData'> = {
  title: 'Best IT Outsourcing Company | Stallioni Net Solutions',
  description: 'Scale faster with affordable IT outsourcing. Hire expert developers and remote teams for web, mobile, and SaaS projects. Trusted in USA, UK, India & more.',
  keywords: 'IT outsourcing company, hire remote developers, offshore development team, affordable IT outsourcing, software outsourcing services, dedicated developer team, outsourcing for startups, global IT service provider',
  ogTitle: 'Best IT Outsourcing Company | Stallioni Net Solutions',
  ogDescription: 'Scale faster with affordable IT outsourcing. Hire expert developers and remote teams for web, mobile, and SaaS projects. Trusted in USA, UK, India & more.',
  ogImage: DEFAULT_OG_IMAGE,
  ogType: 'website',
};

// --- SCHEMA.ORG STRUCTURED DATA GENERATORS ---

const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Stallioni',
  'url': BASE_URL,
  'logo': `${BASE_URL}logo.svg`,
  'sameAs': [
    // Add social media links here if available
  ],
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': '23. Jayanth complex, TP Road',
    'addressLocality': 'Annur, Coimbatore',
    'postalCode': '641653',
    'addressRegion': 'Tamilnadu',
    'addressCountry': 'IN'
  }
});

const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'url': BASE_URL,
  'potentialAction': {
    '@type': 'SearchAction',
    'target': `${BASE_URL}#/search?q={search_term_string}`,
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
      'url': `${BASE_URL}logo.svg`
    }
  },
  'datePublished': post.date,
});

const getServiceSchema = (service: ServiceDetail) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  'serviceType': service.title,
  'provider': {
    '@type': 'Organization',
    'name': 'Stallioni'
  },
  'description': service.description,
  'areaServed': {
    '@type': 'Country',
    'name': 'Worldwide'
  }
});

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
      'addressCountry': 'IN',
    }
  },
  'jobLocationType': 'TELECOMMUTE'
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
    title: 'Our Portfolio | Global Success Stories in IT Outsourcing - Stallioni',
    description: 'Browse our portfolio of 900+ successful projects. See how our offshore development teams in India have delivered world-class solutions for clients in 35+ countries.',
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
    title: 'Careers – Freelance Developer Jobs | Stallioni Net Solutions',
    description: 'Join Stallioni as a freelance WordPress, React, PHP, or AI developer. Contract-based remote jobs with global clients. Apply today and grow your career.',
    keywords: 'freelance developer jobs, contract developer jobs India, remote WordPress developer, freelance React developer, PHP developer jobs, AI developer freelance, contract-based jobs, remote development jobs, freelance tech jobs India, work from home developer',
    ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c7da?q=80&w=1200&h=630&auto=format&fit=crop',
  },
  '/contact': {
    title: 'Contact Stallioni | Get a Free Outsourcing Quote',
    description: 'Contact Stallioni to start your project or discuss a partnership. Get a free, no-obligation quote from our leading offshore software development team in India.',
    keywords: 'contact stallioni, get a quote, IT outsourcing consultation, software development quote, hire indian developers contact, free consultation, project quote India',
    ogImage: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=1200&h=630&auto=format&fit=crop',
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

  return {
    title: service.metaTitle || `${service.title} | Offshore Outsourcing Services by Stallioni`,
    description: service.metaDescription || `Outsource ${service.category} development to Stallioni. ${service.shortDescription}. Explore our expert services: ${service.offerings.join(', ')}.`,
    keywords: service.keywords || keywords,
    ogImage: `https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&h=630&auto=format&fit=crop`,
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
    const id = parseInt(cleanRoute.split('/')[2], 10);
    const post = BLOG_POSTS.find(p => p.id === id);
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
    }
  } else if (staticMetadata[cleanRoute]) {
    partialMetadata = staticMetadata[cleanRoute];
    if (cleanRoute === '/') schema.push(getWebsiteSchema());
    if (cleanRoute === '/careers') schema.push(...getJobPostingSchema());
  } else if (cleanRoute === '/') {
    partialMetadata = staticMetadata['/'];
    schema.push(getWebsiteSchema());
  }

  const ogUrl = `${BASE_URL}${cleanRoute}`;
  const structuredData = JSON.stringify(schema);

  const finalMetadata = { ...defaultMetadata, ...partialMetadata, ogUrl, structuredData };
  if (!partialMetadata.ogTitle && finalMetadata.title) {
    finalMetadata.ogTitle = finalMetadata.title;
  }
  if (!partialMetadata.ogDescription && finalMetadata.description) {
    finalMetadata.ogDescription = finalMetadata.description;
  }

  return finalMetadata as PageMetadata;
};