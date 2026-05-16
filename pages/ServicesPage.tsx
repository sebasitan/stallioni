
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { SERVICES_OVERVIEW } from '../constants';
import { getServiceDetail } from '../constants/service-loader';
import { Service, ServiceDetail } from '../types';
import FadeIn from '../components/FadeIn';
import { useNavigation, useModal } from '../App';

const UiUxDesignPage = lazy(() => import('./services/UiUxDesignPage'));
const ServiceDetailLayout = lazy(() => import('./services/ServiceDetailLayout'));

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className || "w-4 h-4"} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-px bg-brand-orange" />
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-dark">{children}</span>
    </div>
);

// ============================================
// SERVICE CARD — horizontal, icon-anchored
// ============================================

const ServiceCard: React.FC<{
    service: Service;
    index: number;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}> = ({ service, onClick }) => {
    return (
        <a
            href={`/services/${service.id}`}
            onClick={onClick}
            className="group relative block bg-white border border-gray-200 rounded-2xl p-6 hover:border-brand-dark transition-colors h-full flex gap-4"
        >
            {/* Icon hub */}
            <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-brand-light text-brand-dark flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors [&_svg]:w-6 [&_svg]:h-6">
                    {service.icon}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col">
                <h3 className="text-base md:text-lg font-bold text-brand-dark tracking-tight leading-snug mb-1.5 group-hover:text-brand-orange transition-colors">
                    {service.title}
                </h3>

                <p className="text-[13px] text-gray-600 leading-relaxed mb-3 line-clamp-2">
                    {service.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                    {service.features.slice(0, 3).map((feature, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-0.5 text-[11px] font-medium bg-brand-light text-gray-600 rounded"
                        >
                            {feature}
                        </span>
                    ))}
                </div>

                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-orange group-hover:translate-x-0.5 transition-transform">
                    Explore
                    <ArrowRightIcon />
                </span>
            </div>
        </a>
    );
};

// ============================================
// SERVICES HUB
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
            {/* HERO */}
            <section className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-6 max-w-[1400px] py-16 md:py-20">
                    <FadeIn>
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                            <div className="max-w-3xl">
                                <Eyebrow>Services</Eyebrow>
                                <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-brand-dark leading-[1.05] tracking-[-0.025em] mb-6">
                                    IT outsourcing services. <span className="text-brand-orange">Web, mobile, AI & cloud.</span>
                                </h1>
                                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mb-8">
                                    From cutting-edge web development to AI-powered automation — world-class digital solutions for clients across 35+ countries.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a
                                        href="/contact"
                                        onClick={(e) => { e.preventDefault(); openModal('Quote'); }}
                                        className="group inline-flex items-center justify-center gap-3 bg-brand-orange text-white font-medium py-3.5 pl-7 pr-3 rounded-full hover:bg-brand-orange-hover transition-colors"
                                    >
                                        Get a free consultation
                                        <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                            <svg className="w-3.5 h-3.5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    </a>
                                    <a
                                        href="/portfolio"
                                        onClick={(e) => handleNav(e, '/portfolio')}
                                        className="inline-flex items-center justify-center gap-2 border border-gray-300 text-brand-dark font-medium py-3.5 px-7 rounded-full hover:border-brand-dark hover:bg-brand-light transition-colors"
                                    >
                                        View our work
                                    </a>
                                </div>
                            </div>

                            {/* Inline service count stat */}
                            <div className="flex items-end gap-6 flex-shrink-0">
                                <div>
                                    <p className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">{SERVICES_OVERVIEW.length}<span className="text-brand-orange">+</span></p>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Services</p>
                                </div>
                                <div className="border-l border-gray-200 pl-6">
                                    <p className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">35<span className="text-brand-orange">+</span></p>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Countries</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="bg-brand-light py-16 md:py-20">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <FadeIn>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
                            <div className="max-w-2xl">
                                <Eyebrow>Our Expertise</Eyebrow>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-4 tracking-[-0.025em] leading-tight">
                                    Services that drive <span className="text-brand-orange">real results.</span>
                                </h2>
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                                    Comprehensive digital solutions tailored for startups, enterprises, and everything in between.
                                </p>
                            </div>

                            {/* Quick filter chips */}
                            <div className="flex flex-wrap gap-2 flex-shrink-0">
                                {['Vetted', 'Scalable', 'Production-ready'].map((tag) => (
                                    <span key={tag} className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-brand-dark">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {SERVICES_OVERVIEW.map((service, index) => (
                            <FadeIn key={service.id} delay={index * 30}>
                                <ServiceCard
                                    service={service}
                                    index={index}
                                    onClick={(e) => handleNav(e, `/services/${service.id}`)}
                                />
                            </FadeIn>
                        ))}
                    </div>

                    {/* Inline custom-solution prompt */}
                    <FadeIn delay={400}>
                        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 bg-white rounded-2xl border border-gray-200">
                            <p className="text-base text-brand-dark">
                                <span className="font-semibold">Need a custom solution?</span>
                                <span className="text-gray-600 ml-1.5">Tell us about your project and we'll scope it.</span>
                            </p>
                            <a
                                href="/contact"
                                onClick={(e) => { e.preventDefault(); openModal('Quote'); }}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:text-brand-orange-hover transition-colors flex-shrink-0"
                            >
                                Get a custom quote
                                <ArrowRightIcon />
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* CTA — light cream matching homepage */}
            <section className="bg-white py-16 md:py-20 relative overflow-hidden">
                <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-brand-orange/5" aria-hidden="true" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-brand-orange/5" aria-hidden="true" />

                <div className="container mx-auto px-6 max-w-4xl text-center relative">
                    <FadeIn>
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <span className="w-10 h-px bg-brand-orange" />
                            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-dark">Let's Build</span>
                            <span className="w-10 h-px bg-brand-orange" />
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-brand-dark mb-6 tracking-[-0.025em] leading-[1.05]">
                            Ready to build <span className="text-brand-orange">something amazing?</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
                            Let's transform your vision into reality. Get a free consultation and project quote from our expert team.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <a
                                href="/contact"
                                onClick={(e) => { e.preventDefault(); openModal('Quote'); }}
                                className="group inline-flex items-center justify-center gap-3 bg-brand-orange text-white font-medium py-3.5 pl-7 pr-3 rounded-full hover:bg-brand-orange-hover transition-colors"
                            >
                                Get a free quote
                                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <svg className="w-3.5 h-3.5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </a>
                            <a
                                href="/contact"
                                onClick={(e) => handleNav(e, '/contact')}
                                className="inline-flex items-center justify-center gap-2 border border-gray-300 text-brand-dark font-medium py-3.5 px-7 rounded-full hover:bg-brand-light hover:border-brand-dark transition-colors"
                            >
                                Contact us
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </>
    );
};

// ============================================
// SERVICE DETAIL
// ============================================

const ServiceDetailView: React.FC<{ serviceId: string }> = ({ serviceId }) => {
    const { navigate } = useNavigation();
    const [service, setService] = useState<ServiceDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            const s = await getServiceDetail(serviceId);
            if (!cancelled) {
                setService(s || null);
                setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [serviceId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-brand-orange border-t-transparent mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">Loading service details…</p>
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center px-6 max-w-md">
                    <h1 className="text-3xl font-bold text-brand-dark mb-3 tracking-tight">Service not found</h1>
                    <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
                    <a
                        href="/services"
                        onClick={(e) => { e.preventDefault(); navigate('/services'); }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-md font-semibold hover:bg-brand-orange-hover transition-colors"
                    >
                        ← Back to all services
                    </a>
                </div>
            </div>
        );
    }

    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-brand-orange border-t-transparent" />
            </div>
        }>
            <ServiceDetailLayout service={service} />
        </Suspense>
    );
};


// ============================================
// MAIN
// ============================================

const ServicesPage: React.FC = () => {
    const { serviceId } = useParams<{ serviceId?: string }>();

    if (serviceId === 'ui-ux-design') {
        return (
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-brand-orange border-t-transparent" />
                </div>
            }>
                <UiUxDesignPage />
            </Suspense>
        );
    }

    if (serviceId) {
        return <ServiceDetailView serviceId={serviceId} />;
    }
    return <ServicesHub />;
};

export default ServicesPage;
