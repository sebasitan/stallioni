// FIX: Import React to provide types like React.ReactNode.
import React from 'react';

export interface NavLink {
  href: string;
  label: string;
}

export interface Service {
  id: string;
  icon: React.ReactNode;
  animation: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

export enum PortfolioCategory {
  WEB = 'Web',
  MOBILE = 'Mobile',
  ECOMMERCE = 'E-commerce',
  AI = 'AI',
  SEO = 'SEO',
  CRM = 'CRM',
  CLOUD = 'Cloud & DevOps',
  DESIGN = 'Design',
  SUPPORT = 'Support & Maintenance',
  CONSULTING = 'Consulting',
}

export enum Industry {
  FINTECH = 'Fintech',
  HEALTHCARE = 'Healthcare',
  ECOMMERCE_RETAIL = 'E-commerce & Retail',
  EDUCATION = 'Education',
  SAAS = 'SaaS',
  REAL_ESTATE = 'Real Estate',
  MEDIA_ENTERTAINMENT = 'Media & Entertainment',
  LOGISTICS = 'Logistics & Supply Chain',
  TRAVEL_HOSPITALITY = 'Travel & Hospitality',
}

export interface PortfolioItem {
  id: string | number;
  title: string;
  category: PortfolioCategory;
  industry: Industry;
  technologies: string[];
  description: string;
  imageUrl: string;
  clientLocation: string;
  testimonial: string;
  projectUrl?: string;
}

export interface BlogPost {
  id: string | number;
  title: string;
  category: string;
  imageUrl: string;
  excerpt: string;
  author: string;
  date: string; // Should be in YYYY-MM-DD format for schema
  readTime?: string;
  content?: string;
  // SEO Fields
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  bio?: string;
}

export interface JobOpening {
  title: string;
  department: string;
  location: string;
  description: string;
  employmentType: 'FULL_TIME' | 'CONTRACTOR' | 'PART_TIME';
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export interface Technology {
  name: string;
  icon: React.ReactNode;
}

export interface TechnologyStack {
  name: string;
  services: string[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  shortDescription: string;
  offerings: string[];
  technologies: TechnologyStack[];
  category: PortfolioCategory;
  // Enhanced Content Fields
  longDescription?: string | React.ReactNode; // For the "Turn Visitors into Customers..." intro
  conclusion?: string | React.ReactNode; // For the Conclusion section
  featuresWithDesc?: { title: string; description: string }[]; // For "Comprehensive Web Solutions"
  benefits?: { title: string; items: string[] }; // For "Why Your Business Needs..."
  process?: { step: number; title: string; description: string }[]; // For "Our 5-Step Development Process"
  faqs?: { question: string; answer: string }[]; // Specific FAQs
  whyChooseUs?: { title: string; points: string[] }; // Specific "Why Choose" points
  // Custom SEO Metadata
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  // Related services for internal linking — array of service IDs.
  // When set, ServiceDetailLayout renders a "Related Services" section
  // before the final CTA, passing crawl signal + link equity to listed
  // pages. Critical for unindexed sub-services to get discovered.
  relatedServices?: string[];
  // Related resource articles for internal linking — {title, slug} pairs.
  // Renders a "Related reading" block that passes link equity from the
  // service page to the article (the reciprocal of an article's
  // relatedServices). Used to funnel indexed money-page equity into
  // comparison/informational articles that rank on lower authority.
  relatedResources?: { title: string; slug: string }[];
}