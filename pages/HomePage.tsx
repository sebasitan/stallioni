

import React, { useState, lazy, Suspense } from 'react';
import { SERVICES_OVERVIEW, PORTFOLIO_ITEMS, TESTIMONIALS } from '../constants';
import FadeIn from '../components/FadeIn';
import { useNavigation, useModal } from '../App';
import { WebDevIcon, MobileDevIcon, FullStackIcon, EcommIcon, DesignIcon, CrmIcon } from '../components/IconComponents';

// Lazy load TechnologyTicker only
const TechnologyTicker = lazy(() => import('../components/TechnologyTicker'));

const HomePage: React.FC = () => {
    const { navigate } = useNavigation();
    const { openModal } = useModal();

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        navigate(path);
    };

    const Section: React.FC<{ children: React.ReactNode; className?: string, id?: string }> = ({ children, className = '', id }) => (
        <section id={id} className={`py-16 md:py-24 ${className}`}>
            <div className="container mx-auto px-6 max-w-7xl">{children}</div>
        </section>
    );

    const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
        <h2 className={`text-3xl md:text-4xl font-extrabold text-brand-dark text-center mb-12 ${className}`}>{children}</h2>
    );

    const HeroSection: React.FC = () => {
        const handleConsultationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            openModal('Consultation');
        };

        return (
            <div className="relative bg-brand-dark text-white overflow-hidden min-h-screen flex items-center">
                {/* Lightweight CSS-only animated background */}
                <div className="absolute inset-0 z-0">
                    {/* Animated gradient orbs */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl animate-float-slow"></div>
                    <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-float-delayed"></div>
                    <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-float"></div>

                    {/* Optional: Subtle animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 animate-gradient"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center flex flex-col justify-center items-center py-24 md:py-32">
                    <div className="max-w-5xl mx-auto animate-fade-in-up">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-semibold text-sm mb-8 tracking-wider uppercase backdrop-blur-sm">
                            Top IT Outsourcing Company
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tight">
                            Build Your Dream Team with <br className="hidden md:block" />
                            <span className="text-brand-orange">STALLIONI NET SOLUTIONS</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-8 max-w-4xl mx-auto font-light">
                            Ready to grow faster, reduce costs, and launch lightning-fast projects? <br className="hidden lg:block" />
                            We help startups, agencies, and businesses build world-class digital products without the high cost of in-house teams.
                        </p>

                        <p className="text-lg text-slate-400 mb-10 max-w-3xl mx-auto">
                            With clients across the USA, UK, India, Middle East, and Australia, we deliver premium-quality code and rapid results at a budget-friendly price.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="#" onClick={handleConsultationClick} className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-orange text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-2xl hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 text-lg">
                                <span>Book Your Free Consultation</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </a>
                            <a href="/portfolio" onClick={(e) => handleNav(e, '/portfolio')} className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/5 border border-white/20 text-white font-semibold py-4 px-10 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg">
                                <span>View Our Work</span>
                            </a>
                        </div>

                        <p className="text-lg font-medium text-brand-orange mt-12 italic opacity-90">
                            "Your dream product, your remote team, your competitive edge — built by us."
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    const PartnerSection: React.FC = () => (
        <Section className="bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-orange/5 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/5 rounded-full blur-3xl z-0"></div>

            <div className="relative z-10 text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-6 tracking-tight">Your High-Value <span className="text-brand-orange">Offshore Development Partner</span></h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                    Stop wasting time and money searching for developers who don’t deliver.
                    At <span className="font-bold text-brand-dark">STALLIONI NET SOLUTIONS</span>, you get a fully dedicated development partner focused on accelerating your growth and maximizing your ROI.
                </p>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-brand-orange/10 to-blue-500/10 border border-brand-orange/20 text-brand-orange font-bold text-sm tracking-wider uppercase mb-6 backdrop-blur-sm shadow-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        Why Choose Us
                    </div>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-4 tracking-tight">
                        The Advantage You <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-blue-600">Can't Ignore</span>
                    </h3>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Discover what sets us apart from the competition
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {[
                        {
                            title: "Cost Efficiency",
                            desc: "Save up to 60% on development costs without compromising on quality",
                            gradient: "from-emerald-500 to-teal-600",
                            bgGradient: "from-emerald-50 to-teal-50",
                            icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                            number: "01"
                        },
                        {
                            title: "Rapid Assembly",
                            desc: "Build a high-performance remote team in days—not months",
                            gradient: "from-blue-500 to-indigo-600",
                            bgGradient: "from-blue-50 to-indigo-50",
                            icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
                            number: "02"
                        },
                        {
                            title: "Top-Tier Talent",
                            desc: "Work with elite developers trained in global standards and best practices",
                            gradient: "from-purple-500 to-pink-600",
                            bgGradient: "from-purple-50 to-pink-50",
                            icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                            number: "03"
                        },
                        {
                            title: "Agile Speed",
                            desc: "Enjoy faster delivery timelines powered by agile methodologies and execution",
                            gradient: "from-orange-500 to-red-600",
                            bgGradient: "from-orange-50 to-red-50",
                            icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                            number: "04"
                        },
                        {
                            title: "Scalability",
                            desc: "Scale your team and infrastructure effortlessly as your business grows",
                            gradient: "from-cyan-500 to-blue-600",
                            bgGradient: "from-cyan-50 to-blue-50",
                            icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>,
                            number: "05"
                        },
                        {
                            title: "Seamless Process",
                            desc: "Experience a smooth, transparent, and stress-free outsourcing journey",
                            gradient: "from-violet-500 to-purple-600",
                            bgGradient: "from-violet-50 to-purple-50",
                            icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                            number: "06"
                        },
                    ].map((item, i) => (
                        <FadeIn key={i} delay={i * 100}>
                            <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100/50 group overflow-hidden h-full">
                                {/* Gradient background overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                                {/* Number badge */}
                                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 group-hover:bg-white group-hover:text-brand-orange transition-all duration-300 z-10">
                                    {item.number}
                                </div>

                                {/* Icon with gradient */}
                                <div className={`relative w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-md group-hover:shadow-xl z-10`}>
                                    <div className="text-white">
                                        {item.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h4 className="text-2xl font-extrabold text-brand-dark mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-orange group-hover:to-blue-600 transition-all duration-300">
                                        {item.title}
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed text-base group-hover:text-slate-700">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Decorative corner element */}
                                <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${item.gradient} rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* Bottom CTA with enhanced styling */}
                <div className="mt-16 text-center">
                    <div className="inline-block bg-gradient-to-r from-brand-orange/5 to-blue-500/5 backdrop-blur-sm border border-brand-orange/20 rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
                        <p className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-red-500 to-blue-600 mb-2">
                            We don't just write code.
                        </p>
                        <p className="text-xl md:text-2xl font-bold text-brand-dark">
                            We build your competitive advantage.
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );

    const WhyStallioniSection: React.FC = () => {
        const reasons = [
            {
                title: "1. Affordable Pricing That Beats Competitors",
                content: "Get world-class quality without the world-class price tag.\nPerfect for startups and small businesses looking to grow without heavy investment.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>
            },
            {
                title: "2. Strong, Skilled, and Reliable Development Team",
                content: "From frontend to backend to cloud, our experts deliver clean, secure, scalable solutions engineered for real business growth.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            },
            {
                title: "3. Fast Delivery With Zero Compromise",
                content: "We combine speed + precision, ensuring your product hits the market faster — helping you win more customers, sooner.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            },
            {
                title: "4. Seamless Outsourcing Experience",
                content: "We manage everything for you — planning, development, deployment, and long-term support.\nYou focus on business.\nWe handle the tech.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            }
        ];

        return (
            <Section className="bg-brand-dark text-white">
                <SectionTitle className="text-white">Why Stallioni is the Smartest Outsourcing Choice</SectionTitle>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
                    {reasons.map((reason, i) => (
                        <div key={i} className="flex flex-col h-full bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-3 bg-brand-orange rounded-lg">
                                    {reason.icon}
                                </div>
                                <h3 className="text-xl font-bold">{reason.title}</h3>
                            </div>
                            <div className="text-slate-300 leading-relaxed whitespace-pre-line pl-16">
                                {reason.content}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        );
    };

    const ServicesSection: React.FC = () => {
        const services = [
            {
                title: "Web Development Services",
                icon: <WebDevIcon />,
                items: [
                    { label: "Custom websites", href: "/services/website-development" },
                    { label: "CMS websites", href: "/services/cms-development" },
                    { label: "Corporate websites", href: "/services/website-design-development" },
                    { label: "Landing pages", href: "/services/landing-page-design" },
                    { label: "E-commerce platforms", href: "/services/ecommerce-development" },
                    { label: "Web portals", href: "/services/web-portals" },
                    { label: "API development & integration", href: "/services/api-development" },
                    { label: "Microservices architecture", href: "/services/microservices-architecture" }
                ]
            },
            {
                title: "Mobile App Development",
                icon: <MobileDevIcon />,
                items: [
                    { label: "Android & iOS apps", href: "/services/mobile-app-development" },
                    { label: "Cross-platform development", href: "/services/mobile-app-development" },
                    { label: "Flutter apps", href: "/services/flutter-development" },
                    { label: "React Native apps", href: "/services/react-native-development" },
                    { label: "UI/UX design", href: "/services/ui-ux-design" },
                    { label: "App maintenance and upgrades", href: "/services/maintenance-support" }
                ]
            },
            {
                title: "Software & SaaS Development",
                icon: <FullStackIcon />,
                items: [
                    { label: "CRM & ERP applications", href: "/services/business-web-applications" },
                    { label: "HR management systems", href: "/services/business-web-applications" },
                    { label: "Business automation", href: "/services/ai-automation-modern-tech" },
                    { label: "Enterprise workflow tools", href: "/services/business-web-applications" },
                    { label: "Custom SaaS solutions", href: "/services/saas-development" },
                    { label: "MVP development for startups", href: "/services/custom-web-application-development" }
                ]
            },
            {
                title: "E-Commerce Development",
                icon: <EcommIcon />,
                items: [
                    { label: "Shopify development", href: "/services/shopify-development" },
                    { label: "WooCommerce", href: "/services/woocommerce-devel" },
                    { label: "Magento", href: "/services/magento-development" },
                    { label: "BigCommerce", href: "/services/bigcommerce-development" },
                    { label: "Custom online store development", href: "/services/custom-ecommerce-solutions" },
                    { label: "Multi-vendor marketplace solutions", href: "/services/marketplace-development" }
                ]
            },
            {
                title: "Dedicated Remote Team Hiring",
                icon: <CrmIcon />,
                subtitle: "Perfect for scaling businesses that want flexibility, speed, and control.",
                items: [
                    { label: "Hire: Full-stack developers", href: "/contact" },
                    { label: "UI/UX designers", href: "/contact" },
                    { label: "QA engineers", href: "/contact" },
                    { label: "Project managers", href: "/contact" },
                    { label: "Backend / Frontend specialists", href: "/contact" },
                    { label: "DevOps engineers", href: "/contact" }
                ]
            },
            {
                title: "UI/UX & Brand Design",
                icon: <DesignIcon />,
                items: [
                    { label: "Website UI/UX", href: "/services/ui-ux-design" },
                    { label: "App UI/UX", href: "/services/ui-ux-design" },
                    { label: "Brand identity design", href: "/services/landing-page-design" },
                    { label: "Wireframes, prototypes & design systems", href: "/services/design-systems" }
                ]
            }
        ];

        return (
            <Section className="bg-white">
                <SectionTitle>Our Comprehensive Offshore Development Services</SectionTitle>
                <p className="text-center text-xl text-slate-600 max-w-3xl mx-auto -mt-8 mb-16">
                    We deliver everything you need to build, scale, and <span className="font-bold text-brand-dark">dominate your market.</span>
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <FadeIn key={index} delay={index * 100}>
                            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-full border border-gray-100 flex flex-col group">
                                <div className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-4">{service.title}</h3>
                                {service.subtitle && <p className="text-sm text-slate-500 mb-4 italic">{service.subtitle}</p>}
                                <ul className="space-y-3 flex-grow">
                                    {service.items.map((item, idx) => (
                                        <li key={idx} className="flex items-start text-slate-600">
                                            <span className="text-brand-orange mr-2 mt-1 flex-shrink-0">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                            </span>
                                            <a
                                                href={item.href}
                                                onClick={(e) => handleNav(e, item.href)}
                                                className="hover:text-brand-orange transition-colors duration-200 border-b border-transparent hover:border-brand-orange/30"
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </Section>
        );
    };

    const ProcessSection: React.FC = () => {
        const steps = [
            { title: "Step 1 – Tell Us Your Vision", description: "We analyze, plan, and strategize your project for success." },
            { title: "Step 2 – Build Your Dream Team", description: "We handpick highly skilled developers who match your project perfectly." },
            { title: "Step 3 – Execute with Speed", description: "Agile sprints. Weekly demos. Transparent communication. Zero delays." },
            { title: "Step 4 – Test, Deploy & Optimize", description: "Your product goes live — high-performing, secure, and ready to scale." },
            { title: "Step 5 – Long-Term Support & Growth", description: "We stay with you to refine, enhance, and scale your solution." }
        ];

        return (
            <Section className="bg-white">
                <SectionTitle>How We Deliver – Fast, Simple & Effective</SectionTitle>
                <div className="max-w-5xl mx-auto">
                    <div className="relative border-l-4 border-brand-orange/20 ml-4 md:ml-0 md:pl-0 md:border-l-0 md:grid md:grid-cols-5 md:gap-4">
                        {/* Desktop Connection Line - Hidden on mobile, simulated by grid */}

                        {steps.map((step, index) => (
                            <div key={index} className="mb-10 ml-8 md:ml-0 md:mb-0 relative group">
                                <div className="absolute -left-[45px] md:-left-0 md:relative md:mx-auto w-10 h-10 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10 md:mb-4">
                                    {index + 1}
                                </div>
                                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:border-brand-orange/50 transition-colors h-full text-center">
                                    <h3 className="font-bold text-brand-dark mb-2 text-lg">{step.title}</h3>
                                    <p className="text-slate-600 text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        );
    };

    const ClientSuccessSection: React.FC = () => (
        <Section className="bg-brand-dark text-white">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <SectionTitle className="text-white mb-6">Real Success Stories — Global Clients Trust Us</SectionTitle>
                <p className="text-xl text-slate-300 mb-8">
                    When smart brands want results, they hire <span className="text-white font-bold">STALLIONI NET SOLUTIONS.</span>
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
                    {["Launch products faster", "Reduce development costs significantly", "Automate operations", "Boost online revenue", "Scale teams without risk"].map((item, i) => (
                        <div key={i} className="bg-white/10 px-4 py-3 rounded-lg border border-white/5 text-sm font-medium flex items-center justify-center min-h-[60px]">
                            {item}
                        </div>
                    ))}
                </div>
                <p className="text-2xl font-bold text-brand-orange mt-12">Your success story could be next.</p>
            </div>

            <div className="w-full max-w-6xl mx-auto mt-16">
                <Suspense fallback={<div className="h-24 bg-white/5 rounded-lg animate-pulse" />}>
                    <TechnologyTicker />
                </Suspense>
            </div>
        </Section>
    );

    const OutsourceReasonsSection: React.FC = () => {
        const reasons = [
            { title: "Maximize Budget Efficiency", desc: "Why pay more locally when you can get premium quality at a fraction of the cost?" },
            { title: "Access Top Talent Instantly", desc: "We deliver highly trained experts — no hiring delays, no HR burden." },
            { title: "Scale Without Limits", desc: "Need 1 developer? Need 10 developers? We scale with you instantly." },
            { title: "Zero-Risk Partnership", desc: "Clear communication. Transparent pricing. Guaranteed delivery." },
            { title: "Global Reliability", desc: "Trusted by clients across USA, UK, India, Middle East & Australia." }
        ];

        return (
            <Section className="bg-slate-50">
                <SectionTitle>Why Companies Outsource to Stallioni Net Solutions</SectionTitle>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {reasons.map((r, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border-l-4 border-brand-orange shadow-sm hover:shadow-md transition-all">
                            <h3 className="text-xl font-bold text-brand-dark mb-2 flex items-center">
                                <span className="text-brand-orange mr-2">➤</span> {r.title}
                            </h3>
                            <p className="text-slate-600">{r.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>
        );
    };

    const FAQSection: React.FC = () => {
        const [openIndex, setOpenIndex] = useState<number | null>(null);

        const faqs = [
            {
                q: "What makes Stallioni the best IT outsourcing company?",
                a: "Our mix of affordable pricing, strong tech team, fast delivery, and global experience makes us the best choice for small and growing businesses.",
                icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            },
            {
                q: "How quickly can I hire a remote development team?",
                a: "In as little as 48 hours, depending on your requirements.",
                icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            },
            {
                q: "Are outsourced developers reliable?",
                a: "Yes — our developers are vetted, trained, and aligned with global coding standards.",
                icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            },
            {
                q: "Do startups benefit from outsourcing?",
                a: "Absolutely! You reduce cost, launch faster, and scale without the risk of hiring full-time employees.",
                icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            }
        ];

        return (
            <Section className="bg-white relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="text-center mb-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm tracking-wide uppercase mb-4">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            FAQ
                        </div>
                    </div>
                    <SectionTitle>Answering Your Key Questions</SectionTitle>
                    <p className="text-center text-lg text-slate-600 max-w-2xl mx-auto mb-12">
                        Everything you need to know about partnering with us
                    </p>

                    <div className="max-w-4xl mx-auto space-y-4">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border-2 overflow-hidden ${openIndex === idx ? 'border-brand-orange' : 'border-slate-100 hover:border-slate-200'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 group"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openIndex === idx
                                            ? 'bg-brand-orange text-white'
                                            : 'bg-blue-50 text-blue-600 group-hover:bg-brand-orange/10'
                                            }`}>
                                            {faq.icon}
                                        </div>
                                        <span className="font-bold text-brand-dark text-lg pr-4">{faq.q}</span>
                                    </div>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openIndex === idx
                                        ? 'bg-brand-orange text-white rotate-180'
                                        : 'bg-slate-100 text-slate-400 group-hover:bg-brand-orange/10 group-hover:text-brand-orange'
                                        }`}>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <div className="px-6 pb-6 pt-2">
                                        <div className="pl-14">
                                            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-brand-orange">
                                                <p className="text-slate-700 leading-relaxed">{faq.a}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-slate-600 mb-4">Still have questions?</p>
                        <a
                            href="/contact"
                            onClick={(e) => handleNav(e, '/contact')}
                            className="inline-flex items-center gap-2 bg-brand-orange text-white font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 hover:gap-3 shadow-md hover:shadow-lg"
                        >
                            <span>Talk to Our Team</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                    </div>
                </div>
            </Section>
        );
    };

    const CTASection: React.FC = () => (
        <Section className="relative overflow-hidden py-24">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-brand-dark z-0"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/10 transform skew-x-12 z-0"></div>

            <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">Ready to Build Something Amazing?</h2>

                <p className="text-xl md:text-2xl leading-relaxed mb-10 font-light text-blue-50">
                    If you’re ready to grow faster, build smarter, and scale without limits, <br />
                    <strong className="text-brand-orange font-extrabold animate-pulse">STALLIONI NET SOLUTIONS</strong> is your perfect outsourcing partner.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-12 text-lg md:text-xl font-medium">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-orange"></span> Your next product.
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-orange"></span> Your next team.
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-orange"></span> Your next level of success.
                    </div>
                </div>

                <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); openModal('Consultation'); }}
                    className="inline-flex items-center gap-3 bg-brand-orange text-white font-bold py-5 px-12 rounded-full shadow-[0_10px_40px_-10px_rgba(255,107,0,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(255,107,0,0.6)] hover:bg-opacity-90 hover:scale-105 transition-all duration-300 text-xl group"
                >
                    <span>Book Your Free Consultation Today</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
            </div>
        </Section>
    );

    return (
        <div className="overflow-x-hidden">
            <HeroSection />
            <PartnerSection />
            <WhyStallioniSection />
            <ServicesSection />
            <ProcessSection />
            <ClientSuccessSection />
            <OutsourceReasonsSection />
            <FAQSection />
            <CTASection />
        </div>
    );
};

export default HomePage;
