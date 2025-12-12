import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';
import { useNavigation } from '../App';
import {
  WebDevIcon, MobileDevIcon, SeoIcon, AiIcon, EcommIcon, FullStackIcon, NoCodeIcon, PHPIcon
} from './IconComponents';

interface HeaderProps {
  currentRoute: string;
}

const MEGA_MENU_ITEMS = [
  {
    title: "Website Design & Development",
    href: "/services/website-design-development",
    icon: <WebDevIcon />,
    items: [
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "Website Development", href: "/services/website-development" },
      { label: "Frontend Development (React, Vue, Svelte)", href: "/services/frontend-development" },
      { label: "Responsive & Mobile-First Development", href: "/services/responsive-mobile-first-development" },
      { label: "Landing Page Design", href: "/services/landing-page-design" },
      { label: "Design Systems", href: "/services/design-systems" }
    ]
  },
  {
    title: "Custom Web Application Development",
    href: "/services/custom-web-application-development",
    icon: <FullStackIcon />,
    items: [
      { label: "Business Web Applications (CRM, ERP, HR, Workflow)", href: "/services/business-web-applications" },
      { label: "SaaS Development", href: "/services/saas-development" },
      { label: "API Development (REST / GraphQL)", href: "/services/api-development" },
      { label: "Third-Party Integrations", href: "/services/third-party-integrations" },
      { label: "Microservices Architecture", href: "/services/microservices-architecture" },
      { label: "Web Portals (Customer, Vendor, Partner)", href: "/services/web-portals" }
    ]
  },
  {
    title: "E-Commerce Development",
    href: "/services/ecommerce-development",
    icon: <EcommIcon />,
    items: [
      { label: "WooCommerce Development", href: "/services/woocommerce-development" },
      { label: "Shopify Development", href: "/services/shopify-development" },
      { label: "Magento Development", href: "/services/magento-development" },
      { label: "BigCommerce Development", href: "/services/bigcommerce-development" },
      { label: "Custom E-Commerce Solutions", href: "/services/custom-ecommerce-solutions" },
      { label: "Multi-Vendor Marketplace Development", href: "/services/marketplace-development" },
      { label: "Payment Gateway Integrations", href: "/services/payment-gateway-integrations" }
    ]
  },
  {
    title: "CMS Development",
    href: "/services/cms-development",
    icon: <WebDevIcon />,
    items: [
      { label: "WordPress Development", href: "/services/wordpress-development" },
      { label: "Joomla Development", href: "/services/joomla-development" },
      { label: "Drupal Development", href: "/services/drupal-development" },
      { label: "Squarespace Development", href: "/services/squarespace-development" },
      { label: "Wix Development", href: "/services/wix-development" },
      { label: "Webflow Development", href: "/services/webflow-development" },
      { label: "Ghost / Craft / Typo3 / HubSpot CMS", href: "/services/multi-cms-development" },
      { label: "Headless CMS (Strapi, Sanity, Contentful, Prismic)", href: "/services/headless-cms" }
    ]
  },
  {
    title: "PHP Development",
    href: "/services/php-development",
    icon: <PHPIcon />,
    items: [
      { label: "Laravel Development", href: "/services/laravel-development" },
      { label: "Symfony Development", href: "/services/symfony-development" },
      { label: "CodeIgniter Development", href: "/services/codeigniter-development" },
      { label: "Core PHP Development", href: "/services/php-development" },
      { label: "PHP API Development", href: "/services/php-development" },
      { label: "Migration from Legacy PHP Systems", href: "/services/php-development" }
    ]
  },
  {
    title: "Mobile App Development",
    href: "/services/mobile-app-development",
    icon: <MobileDevIcon />,
    items: [
      { label: "iOS App Development", href: "/services/ios-app-development" },
      { label: "Android App Development", href: "/services/android-app-development" },
      { label: "Flutter Development", href: "/services/flutter-development" },
      { label: "React Native Development", href: "/services/react-native-development" },
      { label: "Progressive Web Apps (PWA)", href: "/services/pwa-development" }
    ]
  },
  {
    title: "Maintenance & Support",
    href: "/services/maintenance-support",
    icon: <FullStackIcon />,
    items: [
      { label: "Website Maintenance", href: "/services/website-maintenance" },
      { label: "Application Maintenance", href: "/services/maintenance-support" },
      { label: "Security Audits & Monitoring", href: "/services/security-audits" },
      { label: "Performance Optimization", href: "/services/performance-optimization" },
      { label: "Backup & Recovery", href: "/services/maintenance-support" },
      { label: "Hosting Support", href: "/services/maintenance-support" }
    ]
  },
  {
    title: "SEO & Digital Marketing",
    href: "/services/seo-digital-marketing",
    icon: <SeoIcon />,
    items: [
      { label: "Technical SEO", href: "/services/technical-seo" },
      { label: "On-Page & Off-Page SEO", href: "/services/seo-digital-marketing" },
      { label: "Local SEO", href: "/services/local-seo" },
      { label: "Google Ads", href: "/services/google-ads" },
      { label: "Social Media Ads", href: "/services/social-media-ads" },
      { label: "Content Writing & Strategy", href: "/services/content-writing-strategy" }
    ]
  },
  {
    title: "Cloud & DevOps Services",
    href: "/services/cloud-devops-services",
    icon: <FullStackIcon />,
    items: [
      { label: "AWS / Azure / Google Cloud Setup", href: "/services/cloud-devops-services" },
      { label: "Cloud Migration", href: "/services/cloud-devops-services" },
      { label: "CI/CD Automation", href: "/services/cloud-devops-services" },
      { label: "Docker & Kubernetes", href: "/services/cloud-devops-services" },
      { label: "Infrastructure as Code", href: "/services/cloud-devops-services" },
      { label: "Logging & Monitoring", href: "/services/cloud-devops-services" }
    ]
  },
  {
    title: "Quality Assurance & Testing",
    href: "/services/quality-assurance-testing",
    icon: <NoCodeIcon />,
    items: [
      { label: "Manual Testing", href: "/services/quality-assurance-testing" },
      { label: "Automated Testing", href: "/services/quality-assurance-testing" },
      { label: "API Testing", href: "/services/quality-assurance-testing" },
      { label: "Performance & Load Testing", href: "/services/quality-assurance-testing" },
      { label: "Cross-Browser Testing", href: "/services/quality-assurance-testing" }
    ]
  },
  {
    title: "AI, Automation & Modern Technologies",
    href: "/services/ai-automation-modern-tech",
    icon: <AiIcon />,
    items: [
      { label: "AI Chatbots", href: "/services/ai-automation-modern-tech" },
      { label: "Recommendation Engines", href: "/services/ai-automation-modern-tech" },
      { label: "NLP Features", href: "/services/ai-automation-modern-tech" },
      { label: "Business Process Automation", href: "/services/ai-automation-modern-tech" },
      { label: "Real-Time Apps (WebSockets)", href: "/services/ai-automation-modern-tech" },
      { label: "WebRTC (Video/Voice)", href: "/services/ai-automation-modern-tech" },
      { label: "AR/VR Experiences", href: "/services/ai-automation-modern-tech" }
    ]
  }
];

const Header: React.FC<HeaderProps> = ({ currentRoute }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigate } = useNavigation();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  const handleMobileNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
    setIsMenuOpen(false);
  }

  const isContactActive = currentRoute === '/contact';

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        <a href="/" onClick={(e) => handleNav(e, '/')} className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Stallioni Logo" className="h-8 md:h-10" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === '/' ? currentRoute === '/' : currentRoute.startsWith(link.href);

            if (link.label === 'Services') {
              return (
                <div key={link.href} className="relative group">
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className={`text-base font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 ${isActive
                      ? 'bg-blue-900 text-white'
                      : 'text-brand-dark hover:bg-blue-100 hover:text-blue-600 group-hover:text-blue-600'
                      }`}
                  >
                    {link.label}
                    {/* Chevron Down */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>

                  {/* Mega Menu Dropdown */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-4 w-[98vw] max-w-[1400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl shadow-xl border border-gray-100 max-h-[80vh] overflow-y-auto">
                      <div className="p-8 grid grid-cols-4 gap-y-8 gap-x-6">
                        {MEGA_MENU_ITEMS.map((col) => (
                          <div key={col.title} className="flex flex-col space-y-3">
                            <a
                              href={col.href}
                              onClick={(e) => handleNav(e, col.href)}
                              className="text-brand-dark font-bold text-lg hover:text-white border-b border-gray-100 pb-2 flex items-center gap-2 group/category p-2 -ml-2 rounded-lg hover:bg-brand-orange transition-all duration-200"
                            >
                              <span className="text-brand-orange group-hover/category:text-white transition-colors">
                                {col.icon}
                              </span>
                              <span>{col.title}</span>
                            </a>
                            <div className="flex flex-col space-y-2">
                              {col.items.map(item => (
                                <a
                                  key={item.label}
                                  href={item.href}
                                  onClick={(e) => handleNav(e, item.href)}
                                  className="text-gray-600 hover:text-white hover:translate-x-1 transition-all duration-200 text-base font-medium leading-tight block p-2 -ml-2 rounded hover:bg-brand-orange"
                                >
                                  {item.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                        {/* CTA Box in Menu */}
                        <div className="col-span-4 mt-2 pt-4 border-t border-gray-100 flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                          <div>
                            <h4 className="font-bold text-gray-900">Need a Custom Solution?</h4>
                            <p className="text-sm text-gray-500">Our experts are ready to build exactly what you need.</p>
                          </div>
                          <a
                            href="/contact"
                            onClick={(e) => handleNav(e, '/contact')}
                            className="bg-brand-orange text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all text-sm"
                          >
                            Get a Quote
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className={`text-base font-medium px-4 py-2 rounded-lg transition-all duration-300 ${isActive
                  ? 'bg-blue-900 text-white'
                  : 'text-brand-dark hover:bg-blue-100 hover:text-blue-600'
                  }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Mobile Toggle & Contact */}
        <div className="flex items-center space-x-4">
          <a
            href="/contact"
            onClick={(e) => handleNav(e, '/contact')}
            className={`text-xl hidden lg:inline-block font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${isContactActive
              ? 'bg-blue-900 text-white ring-4 ring-blue-700'
              : 'bg-brand-orange text-white hover:bg-opacity-90'
              }`}
          >
            Contact Us
          </a>
          <button
            className="lg:hidden text-brand-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white py-4 px-6 overflow-y-auto max-h-[80vh]">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === '/' ? currentRoute === '/' : currentRoute.startsWith(link.href);

              if (link.label === 'Services') {
                return (
                  <div key={link.href} className="flex flex-col space-y-1">
                    <a
                      href={link.href}
                      onClick={(e) => handleMobileNav(e, link.href)}
                      className={`text-xl font-medium text-center block py-3 rounded-lg transition-all duration-300 ${isActive
                        ? 'bg-blue-900 text-white'
                        : 'text-brand-dark hover:bg-blue-100 hover:text-blue-600'
                        }`}
                    >
                      {link.label}
                    </a>
                    {/* Simple list for mobile - limited items to avoid clutter or full accordion */}
                    <div className="pl-4 border-l-2 border-gray-100 ml-4 space-y-2 py-2">
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Key Services</p>
                      {MEGA_MENU_ITEMS.map((col) => (
                        <a
                          key={col.title}
                          href={col.href}
                          onClick={(e) => handleMobileNav(e, col.href)}
                          className="flex items-center gap-2 text-gray-600 text-base py-1 hover:text-blue-600"
                        >
                          <span className="text-brand-orange w-5 h-5 flex items-center justify-center">
                            {col.icon}
                          </span>
                          {col.title}
                        </a>
                      ))}
                      <a href="/services" onClick={(e) => handleMobileNav(e, '/services')} className="text-blue-600 text-sm font-bold block pt-1">View All Services →</a>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleMobileNav(e, link.href)}
                  className={`text-xl font-medium text-center block py-3 rounded-lg transition-all duration-300 ${isActive
                    ? 'bg-blue-900 text-white'
                    : 'text-brand-dark hover:bg-blue-100 hover:text-blue-600'
                    }`}
                >
                  {link.label}
                </a>
              )
            })}
            <a
              href="/contact"
              onClick={(e) => handleMobileNav(e, '/contact')}
              className={`text-xl font-bold py-3 px-6 rounded-lg transition-all duration-300 text-center block ${isContactActive
                ? 'bg-blue-900 text-white ring-4 ring-blue-700'
                : 'bg-brand-orange text-white hover:bg-opacity-90'
                }`}
            >
              Contact Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
