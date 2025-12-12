
import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SERVICES_OVERVIEW } from '../constants';
import { getServiceDetail } from '../constants/service-loader';
import { Service, ServiceDetail } from '../types';
import FadeIn from '../components/FadeIn';
import { useNavigation, useModal } from '../App';
import AnimatedHeroBackground from '../components/AnimatedHeroBackground';
import Breadcrumbs from '../components/Breadcrumbs';

// ============================================
// PREMIUM ICON COMPONENTS
// ============================================

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const StarIcon = () => (
    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const SparkleIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" />
    </svg>
);

// ============================================
// ANIMATED FLOATING ELEMENTS
// ============================================

const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Floating Dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-orange/50 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-brand-orange/30 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-brand-orange/40 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
    </div>
);

// ============================================
// PREMIUM SERVICE CARD
// ============================================

const PremiumServiceCard: React.FC<{
    service: Service;
    index: number;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}> = ({ service, onClick }) => {
    return (
        <a
            href={`/services/${service.id}`}
            onClick={onClick}
            className="group relative block"
        >
            {/* Card Container */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-brand-orange/20 hover:-translate-y-3 h-full">
                {/* Gradient Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                <div className="relative p-6 md:p-8">
                    {/* Icon Container */}
                    <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 mb-6 flex items-center justify-center group-hover:bg-brand-orange group-hover:scale-110 transition-all duration-500">
                        {React.cloneElement(service.icon as React.ReactElement<any>, {
                            className: 'w-7 h-7 text-brand-orange group-hover:text-white transition-colors'
                        })}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-orange transition-colors duration-300">
                        {service.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                        {service.description}
                    </p>

                    {/* Features Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {service.features.slice(0, 3).map((feature, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors duration-300"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-brand-orange font-semibold text-sm">
                        <span className="group-hover:mr-2 transition-all duration-300">Explore Service</span>
                        <ArrowRightIcon />
                    </div>
                </div>
            </div>
        </a>
    );
};

// ============================================
// SERVICES HUB PAGE
// ============================================

const ServicesHub: React.FC = () => {
    const { navigate } = useNavigation();
    const { openModal } = useModal();

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        navigate(path);
    };

    return (
        <>
            {/* HERO SECTION */}
            <section className="relative min-h-[85vh] bg-gray-900 text-white overflow-hidden flex items-center">
                <div className="absolute inset-0 z-0">
                    <AnimatedHeroBackground />
                </div>
                <FloatingElements />

                {/* Mesh Gradient Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-orange/20 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />

                <div className="container mx-auto px-6 py-20 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <FadeIn>
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium mb-8">
                                <SparkleIcon />
                                <span>Enterprise-Grade Digital Solutions</span>
                            </div>
                        </FadeIn>

                        <FadeIn delay={100}>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8">
                                <span className="block">Transform Your Business</span>
                                <span className="block text-brand-orange">
                                    With Digital Excellence
                                </span>
                            </h1>
                        </FadeIn>

                        <FadeIn delay={200}>
                            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
                                From cutting-edge web development to AI-powered automation, we deliver
                                <span className="text-white font-semibold"> world-class digital solutions</span> that drive growth for businesses across
                                <span className="text-brand-orange"> 35+ countries</span>.
                            </p>
                        </FadeIn>

                        <FadeIn delay={300}>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                                <button
                                    onClick={() => openModal('Quote')}
                                    className="group relative px-8 py-4 bg-brand-orange hover:bg-brand-orange/90 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Get Free Consultation
                                        <ArrowRightIcon />
                                    </span>
                                </button>

                                <button
                                    onClick={() => openModal('Consultation')}
                                    className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                                >
                                    View Our Work
                                </button>
                            </div>
                        </FadeIn>

                        {/* Stats */}
                        <FadeIn delay={400}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
                                {[
                                    { value: '900+', label: 'Projects Delivered' },
                                    { value: '35+', label: 'Countries Served' },
                                    { value: '15+', label: 'Years Experience' },
                                    { value: '4.9/5', label: 'Client Rating' },
                                ].map((stat, idx) => (
                                    <div key={idx} className="relative group">
                                        <div className="absolute inset-0 bg-brand-orange/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-all duration-300">
                                            <div className="text-3xl md:text-4xl font-black text-white">
                                                {stat.value}
                                            </div>
                                            <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDownIcon className="w-8 h-8 text-white/50" />
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-50">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(226, 232, 240) 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-2 bg-brand-orange/10 text-brand-orange font-semibold text-sm rounded-full mb-4">
                                OUR EXPERTISE
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                                Services That Drive
                                <span className="block text-brand-orange">
                                    Real Business Results
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Comprehensive digital solutions tailored for startups, enterprises, and everything in between.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {SERVICES_OVERVIEW.map((service, index) => (
                            <FadeIn key={service.id} delay={index * 50}>
                                <PremiumServiceCard
                                    service={service}
                                    index={index}
                                    onClick={(e) => handleNav(e, `/services/${service.id}`)}
                                />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="py-24 md:py-32 bg-gray-900 text-white relative overflow-hidden">
                <FloatingElements />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <div>
                                <span className="inline-block px-4 py-2 bg-brand-orange/20 text-brand-orange font-semibold text-sm rounded-full mb-6">
                                    WHY STALLIONI
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                                    Your Trusted Partner for
                                    <span className="block text-brand-orange">Digital Transformation</span>
                                </h2>
                                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                                    With 15+ years of experience serving clients across 35+ countries, we bring enterprise-level expertise at competitive prices. Our agile teams deliver results that exceed expectations.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        'Affordable pricing without compromising quality',
                                        'Dedicated project managers for seamless communication',
                                        'Agile methodology with transparent progress tracking',
                                        'Post-launch support and maintenance packages',
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-4">
                                            <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckIcon />
                                            </div>
                                            <span className="text-gray-300">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => openModal('Quote')}
                                    className="mt-10 group px-8 py-4 bg-brand-orange hover:bg-brand-orange/90 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    <span className="flex items-center gap-2">
                                        Start Your Project
                                        <ArrowRightIcon />
                                    </span>
                                </button>
                            </div>
                        </FadeIn>

                        <FadeIn delay={200}>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { icon: '🚀', title: 'Fast Delivery', desc: 'Projects delivered on time, every time' },
                                    { icon: '🌍', title: 'Global Reach', desc: 'Serving USA, UK, India, Middle East & Australia' },
                                    { icon: '💎', title: 'Premium Quality', desc: 'Enterprise-grade solutions at competitive prices' },
                                    { icon: '🤝', title: 'Dedicated Support', desc: '24/7 support with dedicated project managers' },
                                ].map((item, idx) => (
                                    <div key={idx} className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                                        <div className="text-4xl mb-4">{item.icon}</div>
                                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-400 text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 md:py-32 bg-brand-dark relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23fff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M0%200h20v20H0V0zm20%2020h20v20H20V20z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <FadeIn>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                                Ready to Build Something
                                <span className="block">Amazing Together?</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
                                Let's transform your vision into reality. Get a free consultation and project quote from our expert team.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button
                                    onClick={() => openModal('Quote')}
                                    className="group px-10 py-5 bg-white text-gray-900 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Get Free Quote
                                        <ArrowRightIcon />
                                    </span>
                                </button>
                                <a
                                    href="/contact"
                                    onClick={(e) => handleNav(e, '/contact')}
                                    className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </>
    );
};

// ============================================
// SERVICE DETAIL PAGE
// ============================================

interface FAQItem {
    question: string;
    answer: string;
}

const FAQAccordion: React.FC<{ faqs: FAQItem[] }> = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden ${openIndex === index ? 'border-brand-orange/30 shadow-brand-orange/10' : 'border-transparent'
                        }`}
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                        <span className="font-bold text-gray-900 pr-4 text-lg">{faq.question}</span>
                        <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-brand-orange text-white rotate-180' : ''
                            }`}>
                            <ChevronDownIcon className="w-5 h-5" />
                        </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                        <p className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const ServiceDetailView: React.FC<{ serviceId: string }> = ({ serviceId }) => {
    const { navigate } = useNavigation();
    const { openModal } = useModal();
    const [service, setService] = useState<ServiceDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadService() {
            setLoading(true);
            const serviceData = await getServiceDetail(serviceId);
            setService(serviceData || null);
            setLoading(false);
        }
        loadService();
    }, [serviceId]);

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        navigate(path);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-orange mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading service details...</p>
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-8xl mb-6">🔍</div>
                    <h1 className="text-4xl font-black text-gray-900 mb-4">Service Not Found</h1>
                    <p className="text-gray-600 mb-8 text-lg">The service you're looking for doesn't exist.</p>
                    <a
                        href="/services"
                        onClick={(e) => handleNav(e, '/services')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-xl font-bold hover:-translate-y-1 transition-all duration-300"
                    >
                        ← Back to All Services
                    </a>
                </div>
            </div>
        );
    }

    const breadcrumbPath = [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: service.title }
    ];

    const faqs: FAQItem[] = service.faqs || [
        {
            question: `What makes your ${service.title} services different?`,
            answer: `We combine 15+ years of experience with cutting-edge technology to deliver solutions that drive real business results. Our team focuses on understanding your unique needs and delivering custom solutions that exceed expectations, all at competitive prices.`
        },
        {
            question: `How long does a typical project take?`,
            answer: `Project timelines vary based on scope and complexity. A simple project might take 2-4 weeks, while complex enterprise solutions can take 3-6 months. We provide detailed timelines during our free initial consultation.`
        },
        {
            question: `Do you offer ongoing support after project completion?`,
            answer: `Absolutely! We offer comprehensive maintenance and support packages including regular updates, security patches, performance monitoring, and 24/7 support for critical issues. Your success is our priority.`
        },
        {
            question: `What is your pricing model?`,
            answer: `We offer flexible pricing models including fixed-price projects, hourly rates, and dedicated team arrangements. We'll recommend the best model based on your requirements and budget during our consultation.`
        }
    ];

    return (
        <>
            {/* HERO SECTION */}
            <section className="relative min-h-[70vh] bg-gray-900 text-white overflow-hidden flex items-center">
                <div className="absolute inset-0 z-0 opacity-50">
                    <AnimatedHeroBackground />
                </div>
                <FloatingElements />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-orange/30 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-orange/10 via-transparent to-transparent" />

                <div className="container mx-auto px-6 py-20 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <FadeIn>
                            <div className="mb-6">
                                <Breadcrumbs path={breadcrumbPath} />
                            </div>
                        </FadeIn>

                        <FadeIn delay={100}>
                            <div className="w-16 h-16 rounded-2xl bg-brand-orange p-3 shadow-lg mb-8">
                                {React.cloneElement(service.icon as React.ReactElement<any>, { className: 'w-10 h-10 text-white' })}
                            </div>
                        </FadeIn>

                        <FadeIn delay={200}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                                {service.title}
                            </h1>
                        </FadeIn>

                        <FadeIn delay={300}>
                            <div className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-10 space-y-6">
                                {service.longDescription || service.description}
                            </div>
                        </FadeIn>

                        <FadeIn delay={400}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => openModal('Quote')}
                                    className="group px-8 py-4 bg-brand-orange hover:bg-brand-orange/90 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Get Free Quote
                                        <ArrowRightIcon />
                                    </span>
                                </button>
                                <button
                                    onClick={() => openModal('Consultation')}
                                    className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
                                >
                                    Schedule Consultation
                                </button>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* TRUST BAR */}
            <div className="bg-white border-b border-gray-100 py-6">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        {[
                            { icon: '✓', text: '15+ Years Experience' },
                            { icon: '✓', text: '900+ Projects Delivered' },
                            { icon: '✓', text: '35+ Countries Served' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                                    {item.icon}
                                </div>
                                <span className="text-gray-700 font-medium">{item.text}</span>
                            </div>
                        ))}
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                            <span className="text-gray-700 font-medium ml-1">4.9/5 Rating</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* WHAT WE DELIVER */}
            <section className="py-24 bg-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(226, 232, 240) 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <FadeIn>
                            <div className="text-center mb-16">
                                <span className="inline-block px-4 py-2 bg-brand-orange/10 text-brand-orange font-semibold text-sm rounded-full mb-4">
                                    OUR DELIVERABLES
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                                    What We Deliver
                                </h2>
                                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                    Comprehensive solutions designed to help your business grow, stand out, and convert.
                                </p>
                            </div>
                        </FadeIn>

                        <div className={`grid gap-6 ${service.featuresWithDesc ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
                            {service.featuresWithDesc ? (
                                service.featuresWithDesc.map((feature, index) => (
                                    <FadeIn key={index} delay={index * 50}>
                                        <div className="group h-full bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/10 transition-all duration-300 hover:-translate-y-1">
                                            <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:scale-110 transition-all duration-300">
                                                <SparkleIcon />
                                            </div>
                                            <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-brand-orange transition-colors">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </FadeIn>
                                ))
                            ) : (
                                service.offerings.map((offering, index) => (
                                    <FadeIn key={index} delay={index * 50}>
                                        <div className="group bg-white p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/10 transition-all duration-300 hover:-translate-y-1">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-brand-orange flex items-center justify-center flex-shrink-0 text-white">
                                                    <CheckIcon />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-brand-orange transition-colors">
                                                        {offering}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </FadeIn>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* BENEFITS SECTION (Dynamic) */}
            {service.benefits && (
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10">
                        <FadeIn>
                            <div className="text-center mb-16">
                                <span className="inline-block px-4 py-2 bg-brand-orange/10 text-brand-orange font-semibold text-sm rounded-full mb-4">
                                    KEY BENEFITS
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                                    {service.benefits.title}
                                </h2>
                            </div>
                        </FadeIn>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {service.benefits.items.map((item, idx) => (
                                <FadeIn key={idx} delay={idx * 50}>
                                    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-white mt-1">
                                            <CheckIcon />
                                        </div>
                                        <p className="text-lg font-medium text-gray-800">{item}</p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* PROCESS SECTION (Dynamic) */}
            {service.process && (
                <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
                    <FloatingElements />
                    <div className="container mx-auto px-6 relative z-10">
                        <FadeIn>
                            <div className="text-center mb-16">
                                <span className="inline-block px-4 py-2 bg-brand-orange/20 text-brand-orange font-semibold text-sm rounded-full mb-4">
                                    OUR PROCESS
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black mb-6">
                                    How We Work
                                </h2>
                            </div>
                        </FadeIn>

                        <div className="max-w-5xl mx-auto">
                            <div className="space-y-12">
                                {service.process.map((step, idx) => (
                                    <FadeIn key={idx} delay={idx * 100}>
                                        <div className="flex flex-col md:flex-row gap-8 items-start relative">
                                            {/* Line connector */}
                                            {idx !== service.process!.length - 1 && (
                                                <div className="hidden md:block absolute left-8 top-16 bottom-[-48px] w-1 bg-white/10" />
                                            )}

                                            <div className="w-16 h-16 rounded-2xl bg-brand-orange flex items-center justify-center text-2xl font-black text-white flex-shrink-0 z-10 shadow-lg shadow-brand-orange/20">
                                                {step.step}
                                            </div>
                                            <div className="flex-1 pt-2">
                                                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                                <p className="text-gray-400 text-lg leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* TECHNOLOGIES & WHY US */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            <FadeIn>
                                <div>
                                    <span className="inline-block px-4 py-2 bg-brand-orange/10 text-brand-orange font-semibold text-sm rounded-full mb-4">
                                        TECHNOLOGY STACK
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                                        Technologies We Master
                                    </h2>
                                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                        We use cutting-edge technologies and industry best practices to deliver solutions that are fast, secure, scalable, and future-proof.
                                    </p>

                                    <div className="space-y-6">
                                        {service.technologies.map((tech, index) => (
                                            <div key={index}>
                                                <h4 className="font-bold text-gray-900 mb-3">{tech.name}</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {tech.services.map((item, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-brand-orange hover:text-white transition-all duration-300 cursor-default"
                                                        >
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>

                            <FadeIn delay={200}>
                                <div className="bg-gray-900 text-white p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/20 rounded-full blur-3xl" />
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl" />

                                    <div className="relative">
                                        <h3 className="text-2xl font-black mb-8">{service.whyChooseUs?.title || 'Why Choose Stallioni?'}</h3>

                                        <div className="space-y-5">
                                            {(service.whyChooseUs?.points || [
                                                'Affordable pricing without compromising quality',
                                                'Strong and skilled team with 15+ years experience',
                                                'Fast delivery — projects on time, every time',
                                                'Serving 35+ countries worldwide',
                                                'Transparent communication & dedicated managers',
                                                'Flexible engagement models',
                                            ]).map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <CheckIcon />
                                                    </div>
                                                    <span className="text-gray-300">{item}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => openModal('Quote')}
                                            className="mt-10 w-full py-4 bg-brand-orange hover:bg-brand-orange/90 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 hover:-translate-y-1"
                                        >
                                            Start Your Project Today
                                        </button>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONCLUSION SECTION */}
            {service.conclusion && (
                <section className="py-24 bg-gray-50 border-t border-gray-200">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <FadeIn>
                                <div className="text-xl text-gray-700 leading-relaxed font-medium">
                                    {service.conclusion}
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ SECTION */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <FadeIn>
                            <div className="text-center mb-12">
                                <span className="inline-block px-4 py-2 bg-brand-orange/10 text-brand-orange font-semibold text-sm rounded-full mb-4">
                                    FAQ
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                                    Frequently Asked Questions
                                </h2>
                            </div>
                        </FadeIn>

                        <FadeIn delay={100}>
                            <FAQAccordion faqs={faqs} />
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 md:py-32 bg-brand-dark relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23fff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M0%200h20v20H0V0zm20%2020h20v20H20V20z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <FadeIn>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
                                Ready to Start Your
                                <span className="block">{service.title} Project?</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
                                Let's transform your vision into reality. Get a free consultation and project quote today.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button
                                    onClick={() => openModal('Quote')}
                                    className="group px-10 py-5 bg-white text-gray-900 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Get Your Free Quote
                                        <ArrowRightIcon />
                                    </span>
                                </button>
                                <a
                                    href="/contact"
                                    onClick={(e) => handleNav(e, '/contact')}
                                    className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* RELATED SERVICES */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-black text-gray-900 text-center mb-12">
                                Explore Related Services
                            </h2>
                        </FadeIn>

                        <div className="grid md:grid-cols-3 gap-6">
                            {SERVICES_OVERVIEW.filter(s => s.id !== serviceId).slice(0, 3).map((relatedService, index) => (
                                <FadeIn key={relatedService.id} delay={index * 100}>
                                    <a
                                        href={`/services/${relatedService.id}`}
                                        onClick={(e) => handleNav(e, `/services/${relatedService.id}`)}
                                        className="group block bg-gray-50 p-6 rounded-2xl border-2 border-transparent hover:border-brand-orange/30 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                                                {React.cloneElement(relatedService.icon as React.ReactElement<any>, { className: 'w-6 h-6 text-brand-orange' })}
                                            </div>
                                            <h3 className="font-bold text-gray-900 group-hover:text-brand-orange transition-colors">
                                                {relatedService.title}
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 text-sm line-clamp-2">{relatedService.description}</p>
                                    </a>
                                </FadeIn>
                            ))}
                        </div>

                        <FadeIn delay={300}>
                            <div className="text-center mt-12">
                                <a
                                    href="/services"
                                    onClick={(e) => handleNav(e, '/services')}
                                    className="inline-flex items-center gap-2 text-brand-orange font-bold hover:underline group"
                                >
                                    View All Services
                                    <ArrowRightIcon />
                                </a>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </>
    );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================

const ServicesPage: React.FC = () => {
    const { serviceId } = useParams<{ serviceId?: string }>();

    if (serviceId) {
        return <ServiceDetailView serviceId={serviceId} />;
    }
    return <ServicesHub />;
};

export default ServicesPage;
