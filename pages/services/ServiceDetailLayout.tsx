import React from 'react';
import FadeIn from '../../components/FadeIn';
import Breadcrumbs from '../../components/Breadcrumbs';
import TechBadge from '../../components/TechBadge';
import { useNavigation, useModal } from '../../App';
import type { ServiceDetail } from '../../types';

// ============================================
// Icons
// ============================================
const Icon = {
    Arrow: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    ),
    Check: ({ className }: { className?: string }) => (
        <svg className={className || 'w-3 h-3'} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    ),
    Question: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Chat: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
    ),
    Bolt: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    Shield: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
};

const Eyebrow: React.FC<{ children: React.ReactNode; tone?: 'dark' | 'light' }> = ({ children, tone = 'dark' }) => (
    <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-px bg-brand-orange" />
        <span className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${tone === 'light' ? 'text-white/80' : 'text-brand-dark'}`}>{children}</span>
    </div>
);

// ============================================
// Helpers
// ============================================
function inferFaqCategory(q: string): string {
    const s = q.toLowerCase();
    if (s.includes('how long') || s.includes('timeline') || s.includes('how much time') || s.includes('how quickly')) return 'Timeline';
    if (s.includes('cost') || s.includes('price') || s.includes('pricing') || s.includes('budget') || s.includes('how much')) return 'Pricing';
    if (s.includes('support') || s.includes('maintenance') || s.includes('after')) return 'Support';
    if (s.includes('redesign') || s.includes('existing') || s.includes('migrate') || s.includes('migration')) return 'Migration';
    if (s.includes('design system')) return 'Systems';
    if (s.includes('included') || s.includes('package') || s.includes('deliver') || s.includes('what do you')) return 'Scope';
    if (s.includes('tool') || s.includes('tech') || s.includes('stack') || s.includes('framework')) return 'Stack';
    if (s.includes('mobile') || s.includes('responsive')) return 'Devices';
    if (s.includes('secur') || s.includes('safe')) return 'Security';
    if (s.includes('seo') || s.includes('rank')) return 'SEO';
    return 'General';
}

// ============================================
// HERO — magazine split with generic service spotlight
// ============================================
const Hero: React.FC<{ service: ServiceDetail }> = ({ service }) => {
    const { navigate } = useNavigation();
    const { openModal } = useModal();

    const breadcrumbPath = [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: service.title },
    ];

    const topOfferings = service.offerings.slice(0, 4);

    return (
        <section className="relative bg-white overflow-hidden border-b border-gray-100">
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #1F3769 1px, transparent 0)',
                backgroundSize: '32px 32px'
            }} />

            <div className="container mx-auto px-6 max-w-[1400px] relative">
                <div className="pt-6 md:pt-8">
                    <Breadcrumbs path={breadcrumbPath} theme="light" />
                </div>

                <div className="grid lg:grid-cols-12 gap-x-10 gap-y-10 items-start pt-8 md:pt-10 pb-14 md:pb-20">
                    {/* LEFT — content */}
                    <div className="lg:col-span-7">
                        <div className="inline-flex items-center gap-2 bg-brand-light border border-gray-200 rounded-full pl-1.5 pr-3.5 py-1 mb-5">
                            <span className="bg-brand-dark text-white text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full">{service.category}</span>
                            <span className="text-[12px] text-brand-dark font-medium">Senior team · 15+ yrs · 900+ projects</span>
                        </div>

                        <h1 className="text-brand-dark font-bold tracking-[-0.02em] leading-[1.15] text-[1.625rem] md:text-[2rem] lg:text-[2.5rem] max-w-2xl">
                            {service.title}
                        </h1>

                        {service.shortDescription && (
                            <p className="mt-4 text-lg md:text-xl text-brand-orange font-medium leading-snug max-w-xl">
                                {service.shortDescription}
                            </p>
                        )}

                        <div className="mt-5 text-base text-gray-600 leading-relaxed max-w-xl">
                            {service.description}
                        </div>

                        <div className="mt-7 flex flex-col sm:flex-row gap-3">
                            <a
                                href="/contact"
                                onClick={(e) => { e.preventDefault(); openModal('Quote'); }}
                                className="group inline-flex items-center justify-center gap-3 bg-brand-orange text-white font-medium py-3.5 pl-7 pr-3 rounded-full hover:bg-brand-orange-hover transition-colors"
                            >
                                Get a free quote
                                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform text-brand-orange">
                                    <Icon.Arrow />
                                </span>
                            </a>
                            <a
                                href="/portfolio"
                                onClick={(e) => { e.preventDefault(); navigate('/portfolio'); }}
                                className="inline-flex items-center justify-center gap-2 border border-gray-300 text-brand-dark font-medium py-3.5 px-7 rounded-full hover:border-brand-dark hover:bg-brand-light transition-colors"
                            >
                                View our work
                            </a>
                        </div>

                        {/* Inline stats */}
                        <div className="mt-8 flex flex-wrap items-end gap-x-5 sm:gap-x-7 gap-y-4">
                            <div>
                                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">15<span className="text-brand-orange">+</span></p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Years</p>
                            </div>
                            <div className="border-l border-gray-200 pl-5 sm:pl-7">
                                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">900<span className="text-brand-orange">+</span></p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Projects</p>
                            </div>
                            <div className="border-l border-gray-200 pl-5 sm:pl-7">
                                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">35<span className="text-brand-orange">+</span></p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Countries</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — service spotlight card */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative max-w-[420px] mx-auto lg:mx-0 lg:ml-auto">
                            <div className="absolute -top-3 -right-3 w-full h-full border-2 border-brand-orange rounded-2xl hidden md:block" aria-hidden="true" />

                            <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden" style={{ boxShadow: '0 25px 50px -15px rgba(31, 55, 105, 0.15)' }}>
                                {/* Top bar */}
                                <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-brand-light/60">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                                    </div>
                                    <p className="text-[11px] font-mono text-gray-600 tracking-[0.15em] uppercase truncate max-w-[60%]">
                                        stallioni / {service.id}
                                    </p>
                                    <div className="w-12" />
                                </div>

                                {/* Body */}
                                <div className="p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0 [&_svg]:w-6 [&_svg]:h-6">
                                            {service.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[9px] font-semibold tracking-widest uppercase text-brand-orange leading-none mb-1">Live · Available now</p>
                                            <p className="text-sm font-bold text-brand-dark leading-tight truncate">{service.title}</p>
                                        </div>
                                    </div>

                                    <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-2">Top offerings</p>
                                    <ul className="space-y-1.5 mb-4">
                                        {topOfferings.map((o) => (
                                            <li key={o} className="flex items-center gap-2.5 p-1.5 rounded-lg bg-brand-light/60 border border-transparent">
                                                <span className="w-5 h-5 rounded-md bg-brand-orange text-white flex items-center justify-center flex-shrink-0">
                                                    <Icon.Check className="w-2.5 h-2.5" />
                                                </span>
                                                <span className="text-[12px] font-medium text-brand-dark truncate">{o}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={(e) => { e.preventDefault(); openModal('Quote'); }}
                                        className="w-full bg-brand-dark text-white text-xs font-medium py-2.5 rounded-lg hover:bg-brand-dark-hover transition-colors flex items-center justify-center gap-2"
                                    >
                                        Start your project
                                        <Icon.Arrow />
                                    </button>
                                </div>
                            </div>

                            {/* Floating: experience */}
                            <div className="absolute -left-3 -top-4 md:-left-8 md:top-8 bg-white border border-gray-200 rounded-xl p-3 hidden sm:block" style={{ boxShadow: '0 15px 30px -10px rgba(31, 55, 105, 0.15)' }}>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                        <Icon.Shield />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-semibold tracking-widest uppercase text-gray-500 leading-none mb-0.5">Experience</p>
                                        <p className="text-base font-bold text-brand-dark tracking-tight leading-none">15+ <span className="text-[10px] text-gray-500 font-normal">years</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating: delivery */}
                            <div className="absolute -right-3 -bottom-5 md:-right-6 md:bottom-8 bg-brand-dark text-white rounded-xl p-3 hidden sm:block" style={{ boxShadow: '0 15px 30px -10px rgba(31, 55, 105, 0.3)' }}>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-white">
                                        <Icon.Bolt />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-semibold tracking-widest uppercase text-white/60 leading-none mb-0.5">Fast delivery</p>
                                        <p className="text-base font-bold tracking-tight leading-none">48 hrs <span className="text-[10px] text-white/60 font-normal">to start</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ============================================
// WHAT WE DELIVER — magazine cards
// ============================================
const WhatWeDeliver: React.FC<{ service: ServiceDetail }> = ({ service }) => {
    const items = service.featuresWithDesc && service.featuresWithDesc.length > 0
        ? service.featuresWithDesc
        : service.offerings.map((o) => ({ title: o, description: '' }));

    const flatTools = service.technologies.flatMap((stack) => stack.services);

    if (items.length === 0) return null;

    return (
        <section className="bg-white py-20 md:py-24">
            <div className="container mx-auto px-6 max-w-[1400px]">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
                    <div className="max-w-2xl">
                        <Eyebrow>What we deliver</Eyebrow>
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark tracking-[-0.025em] leading-[1.1]">
                            Built end-to-end, <span className="text-brand-orange">ready to ship.</span>
                        </h2>
                        <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-xl">
                            Every engagement delivers production-quality output — code, designs and infrastructure your team can take over on day one.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 flex-shrink-0">
                        {['Production-ready', 'Scalable', 'Documented'].map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-1.5 bg-brand-light border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-brand-dark">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {items.map((item, i) => (
                        <FadeIn key={item.title} delay={i * 60}>
                            <div className="group relative h-full bg-white border border-gray-200 rounded-2xl p-6 hover:border-brand-dark transition-colors flex gap-5">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-light text-brand-dark flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                        <Icon.Check className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col">
                                    <h3 className="text-lg md:text-xl font-bold text-brand-dark tracking-tight leading-tight group-hover:text-brand-orange transition-colors mb-1.5">
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className="text-[13.5px] text-gray-600 leading-relaxed">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {flatTools.length > 0 && (
                    <FadeIn delay={200}>
                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 bg-brand-light rounded-2xl border border-gray-200">
                            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500 flex-shrink-0">
                                Built with
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {flatTools.map((name, idx) => (
                                    <TechBadge key={`${name}-${idx}`} name={name} />
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                )}
            </div>
        </section>
    );
};

// ============================================
// FAQ — home-page style grid
// ============================================
const FAQ: React.FC<{ faqs: { question: string; answer: string }[] }> = ({ faqs }) => {
    return (
        <section className="bg-white py-14 md:py-16">
            <div className="container mx-auto px-6 max-w-[1400px]">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-7">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-8 h-px bg-brand-orange" />
                            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-dark">FAQ</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark tracking-[-0.025em] leading-[1.15]">
                            Answers to your <span className="text-brand-orange">key questions.</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                        <div className="w-9 h-9 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                            <Icon.Chat />
                        </div>
                        <div className="leading-tight">
                            <p className="text-xs font-semibold text-brand-dark">&lt; 24 hours</p>
                            <p className="text-[11px] text-gray-500">avg response</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                    {faqs.map((faq, idx) => (
                        <FadeIn key={idx} delay={idx * 50}>
                            <div className="group h-full bg-white border border-gray-200 hover:border-brand-orange rounded-xl p-5 transition-colors flex flex-col">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="inline-flex items-center gap-1.5 bg-brand-light text-brand-dark text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border border-gray-200">
                                        <span className="w-1 h-1 rounded-full bg-brand-orange" />
                                        {inferFaqCategory(faq.question)}
                                    </span>
                                    <span className="w-7 h-7 rounded-full bg-brand-light text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                        <Icon.Question />
                                    </span>
                                </div>
                                <h3 className="text-base md:text-lg font-bold text-brand-dark leading-snug tracking-tight mb-2 group-hover:text-brand-orange transition-colors">
                                    {faq.question}
                                </h3>
                                <p className="text-[13.5px] text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================
// FINAL CTA — compact dark band
// ============================================
const FinalCTA: React.FC<{ service: ServiceDetail }> = ({ service }) => {
    const { navigate } = useNavigation();
    const { openModal } = useModal();

    return (
        <section className="bg-brand-light py-10 md:py-12">
            <div className="container mx-auto px-6 max-w-[1400px]">
                <div className="relative bg-brand-dark text-white rounded-2xl overflow-hidden px-6 md:px-10 py-6 md:py-7">
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-brand-orange/20" aria-hidden="true" />
                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-brand-orange/40" aria-hidden="true" />

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                        <div className="flex items-start gap-4 max-w-2xl">
                            <span className="hidden sm:flex w-10 h-10 rounded-xl bg-brand-orange items-center justify-center flex-shrink-0 [&_svg]:w-5 [&_svg]:h-5 [&_svg]:!text-white">
                                {service.icon}
                            </span>
                            <div>
                                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-orange mb-1">Free consultation</p>
                                <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-snug">
                                    Ready to start your <span className="text-brand-orange">{service.title.toLowerCase()}</span> project?
                                </h2>
                                <p className="text-white/60 text-sm mt-1.5">
                                    Tell us your goals — we'll scope, price and plan it in 24 hours.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
                            <a
                                href="/contact"
                                onClick={(e) => { e.preventDefault(); openModal('Quote'); }}
                                className="group inline-flex items-center justify-center gap-2 bg-brand-orange text-white text-sm font-medium py-2.5 pl-5 pr-2 rounded-full hover:bg-brand-orange-hover transition-colors"
                            >
                                Get free quote
                                <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform text-brand-orange">
                                    <Icon.Arrow />
                                </span>
                            </a>
                            <a
                                href="/contact"
                                onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
                                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-sm font-medium py-2.5 px-5 rounded-full hover:bg-white/10 transition-colors"
                            >
                                Contact us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ============================================
// LAYOUT — composes the sections
// ============================================
const ServiceDetailLayout: React.FC<{ service: ServiceDetail }> = ({ service }) => {
    const faqs = service.faqs && service.faqs.length > 0 ? service.faqs : [
        { question: `What is included in your ${service.title} package?`, answer: `Every engagement includes scope discovery, architecture, build, QA and a 60-day support window. Specifics are confirmed before we start.` },
        { question: `How long does a ${service.category.toLowerCase()} project take?`, answer: `Small scopes ship in 2–4 weeks; mid-sized projects in 1–3 months; enterprise programs 3–6 months. We commit to a timeline only after scoping.` },
        { question: `Do you offer ongoing support after launch?`, answer: `Yes — maintenance, monitoring, feature work and 24/7 support are all available as optional add-ons.` },
        { question: `What is your pricing model?`, answer: `Fixed-price for well-scoped work, monthly retainer for ongoing teams, hourly for small fixes. We recommend the best fit during scoping.` },
    ];

    return (
        <div className="overflow-x-hidden bg-white">
            <Hero service={service} />
            <WhatWeDeliver service={service} />
            <FAQ faqs={faqs} />
            <FinalCTA service={service} />
        </div>
    );
};

export default ServiceDetailLayout;
