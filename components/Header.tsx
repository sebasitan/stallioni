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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const { navigate } = useNavigation();

  // Standard navigation - e.preventDefault() for SPA behavior, href for SEO
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  const handleMobileNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
  }

  // Close mobile menu (and reset accordion) whenever the route changes.
  React.useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [currentRoute]);

  const isContactActive = currentRoute === '/contact';

  return (
    <header className="bg-white/85 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-3.5 flex justify-between items-center relative gap-6">
        <a href="/" onClick={(e) => handleNav(e, '/')} className="flex items-center flex-shrink-0" aria-label="Stallioni home">
          <img src="/logo.svg" alt="Stallioni Logo" className="h-10 md:h-9 w-auto" width="210" height="42" fetchPriority="high" />
        </a>

        {/* Desktop Navigation — pill segment */}
        <nav className="hidden lg:flex items-center gap-1 bg-brand-light/60 border border-gray-200/80 rounded-full p-1">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === '/' ? currentRoute === '/' : currentRoute.startsWith(link.href);

            if (link.label === 'Services') {
              const showAccent = isActive || isServicesOpen;
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      handleNav(e, link.href);
                      setIsServicesOpen(false);
                    }}
                    className={`relative text-[14.5px] font-medium tracking-tight px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                      showAccent
                        ? 'bg-brand-dark text-white shadow-sm'
                        : 'text-gray-700 hover:text-brand-dark hover:bg-white'
                    }`}
                  >
                    {link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-3 w-3 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>

                  {/* Mega Menu Dropdown */}
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 pt-3 w-[96vw] max-w-[1280px] transition-opacity duration-200 ${isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                    <div
                      className="relative bg-white rounded-2xl border border-gray-200 max-h-[82vh] overflow-y-auto"
                      style={{ boxShadow: '0 30px 60px -20px rgba(31, 55, 105, 0.18)' }}
                    >
                      {/* Subtle dot pattern */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-[0.03] rounded-2xl"
                        aria-hidden="true"
                        style={{
                          backgroundImage: 'radial-gradient(circle at 1px 1px, #1F3769 1px, transparent 0)',
                          backgroundSize: '24px 24px',
                        }}
                      />

                      {/* TOP EYEBROW BAR */}
                      <div className="relative flex items-center justify-between gap-4 px-8 py-4 border-b border-gray-100 bg-brand-light/40">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="w-8 h-px bg-brand-orange" />
                          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-dark">Our Services</span>
                          <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-brand-dark">
                            <span className="w-1 h-1 rounded-full bg-brand-orange" />
                            {MEGA_MENU_ITEMS.reduce((n, c) => n + c.items.length, 0)}+ offerings
                          </span>
                        </div>
                        <a
                          href="/services"
                          onClick={(e) => {
                            handleNav(e, '/services');
                            setIsServicesOpen(false);
                          }}
                          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:text-brand-orange transition-colors flex-shrink-0"
                        >
                          Browse all
                          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>

                      {/* CATEGORY CARDS GRID */}
                      <div className="relative p-6 grid grid-cols-4 gap-3">
                        {MEGA_MENU_ITEMS.map((col) => (
                          <div
                            key={col.title}
                            className="group/cat flex flex-col bg-white border border-gray-200 hover:border-brand-orange rounded-xl p-4 transition-colors"
                          >
                            <a
                              href={col.href}
                              onClick={(e) => {
                                handleNav(e, col.href);
                                setIsServicesOpen(false);
                              }}
                              className="flex items-start gap-3 mb-3"
                            >
                              <span className="w-10 h-10 rounded-xl bg-brand-light text-brand-dark flex items-center justify-center flex-shrink-0 group-hover/cat:bg-brand-orange group-hover/cat:text-white transition-colors [&_svg]:w-5 [&_svg]:h-5">
                                {col.icon}
                              </span>
                              <div className="flex-1 min-w-0 pt-0.5">
                                <h4 className="font-bold text-brand-dark text-[13.5px] leading-tight tracking-tight group-hover/cat:text-brand-orange transition-colors">
                                  {col.title}
                                </h4>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mt-1">
                                  {col.items.length} services
                                </p>
                              </div>
                            </a>

                            <div className="flex flex-col">
                              {col.items.map((item) => (
                                <a
                                  key={item.label}
                                  href={item.href}
                                  onClick={(e) => {
                                    handleNav(e, item.href);
                                    setIsServicesOpen(false);
                                  }}
                                  className="group/item flex items-center gap-2 text-[12.5px] text-gray-600 hover:text-brand-orange transition-colors leading-snug py-1"
                                >
                                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover/item:bg-brand-orange transition-colors flex-shrink-0" />
                                  <span className="line-clamp-1">{item.label}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* BOTTOM CTA STRIP */}
                      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-8 py-5 border-t border-gray-100 bg-brand-light/40">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L23 12l-6.857 2.286L14 21l-2.143-6.714L5 12l6.857-2.286L14 3z" />
                            </svg>
                          </span>
                          <div>
                            <h4 className="font-semibold text-brand-dark text-sm">Need a custom solution?</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Tell us your goals — we'll scope it in 24 hours.</p>
                          </div>
                        </div>
                        <a
                          href="/contact"
                          onClick={(e) => {
                            handleNav(e, '/contact');
                            setIsServicesOpen(false);
                          }}
                          className="group inline-flex items-center justify-center gap-2 bg-brand-orange text-white text-sm font-medium py-2.5 pl-5 pr-2 rounded-full hover:bg-brand-orange-hover transition-colors flex-shrink-0"
                        >
                          Get a quote
                          <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-brand-orange group-hover:translate-x-1 transition-transform">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                        </a>
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
                className={`text-[14.5px] font-medium tracking-tight px-4 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-dark text-white shadow-sm'
                    : 'text-gray-700 hover:text-brand-dark hover:bg-white'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Mobile Toggle & Contact */}
        <div className="flex items-center gap-3">
          <a
            href="/contact"
            onClick={(e) => handleNav(e, '/contact')}
            className={`hidden lg:inline-flex items-center font-semibold text-[14.5px] tracking-tight py-2.5 px-5 rounded-full transition-colors ${
              isContactActive
                ? 'bg-brand-dark text-white hover:bg-brand-dark-hover'
                : 'bg-brand-orange text-white hover:bg-brand-orange-hover'
            }`}
          >
            Contact Us
          </a>
          <button
            className="lg:hidden text-brand-dark p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-3 px-4 overflow-y-auto max-h-[85vh]">
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === '/' ? currentRoute === '/' : currentRoute.startsWith(link.href);

              if (link.label === 'Services') {
                return (
                  <div key={link.href} className="flex flex-col">
                    {/* Tap to toggle — does NOT navigate. The accordion stays open until
                        the user taps the row again or picks a sub-item / "View all". */}
                    <button
                      type="button"
                      onClick={() => setIsMobileServicesOpen((v) => !v)}
                      aria-expanded={isMobileServicesOpen}
                      className={`w-full flex items-center justify-between py-3.5 px-2 text-left text-base font-semibold transition-colors ${isActive || isMobileServicesOpen
                        ? 'text-brand-orange'
                        : 'text-brand-dark'
                        }`}
                    >
                      <span>{link.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isMobileServicesOpen && (
                      <div className="mt-1 mb-2 rounded-xl bg-brand-light/50 border border-gray-200 p-3 max-h-[55vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-2 px-1">
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Service categories</p>
                          <button
                            type="button"
                            onClick={() => setIsMobileServicesOpen(false)}
                            className="text-[11px] text-gray-500 hover:text-brand-orange font-medium inline-flex items-center gap-1"
                            aria-label="Close services menu"
                          >
                            Close
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex flex-col gap-1">
                          {MEGA_MENU_ITEMS.map((col) => (
                            <a
                              key={col.title}
                              href={col.href}
                              onClick={(e) => handleMobileNav(e, col.href)}
                              className="flex items-center gap-3 text-gray-700 text-[14px] py-2.5 px-2 rounded-lg hover:bg-white hover:text-brand-orange transition-colors"
                            >
                              <span className="w-8 h-8 rounded-lg bg-white text-brand-orange flex items-center justify-center flex-shrink-0 [&_svg]:w-4 [&_svg]:h-4 border border-gray-200">
                                {col.icon}
                              </span>
                              <span className="flex-1 leading-tight">{col.title}</span>
                              <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </a>
                          ))}
                        </div>
                        <a
                          href="/services"
                          onClick={(e) => handleMobileNav(e, '/services')}
                          className="mt-2 inline-flex items-center justify-center gap-2 w-full bg-brand-dark text-white text-sm font-medium py-3 rounded-full hover:bg-brand-dark-hover transition-colors"
                        >
                          View all services
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleMobileNav(e, link.href)}
                  className={`text-base font-semibold block py-3.5 px-2 transition-colors ${isActive
                    ? 'text-brand-orange'
                    : 'text-brand-dark'
                    }`}
                >
                  {link.label}
                </a>
              )
            })}
            <a
              href="/contact"
              onClick={(e) => handleMobileNav(e, '/contact')}
              className="mt-4 mb-2 inline-flex items-center justify-center font-semibold text-sm py-3 px-6 rounded-full bg-brand-orange text-white hover:bg-brand-orange-hover transition-colors text-center"
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
