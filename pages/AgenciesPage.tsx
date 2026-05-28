import React from 'react';
import { useNavigation, useModal } from '../App';
import { AGENCIES_PAGE } from '../constants/agencies-page';
import FadeIn from '../components/FadeIn';
import Breadcrumbs from '../components/Breadcrumbs';

const Icon = {
    Arrow: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    ),
    Check: () => (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    ),
    Star: () => (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    ),
    Question: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Mask: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M16 10h.01M9 16c.5-.5 1.5-1 3-1s2.5.5 3 1" />
        </svg>
    ),
};

const Eyebrow: React.FC<{ children: React.ReactNode; tone?: 'dark' | 'light' }> = ({ children, tone = 'dark' }) => (
    <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-px bg-brand-orange" />
        <span className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${tone === 'light' ? 'text-white/80' : 'text-brand-dark'}`}>{children}</span>
    </div>
);

const AgenciesPage: React.FC = () => {
    const data = AGENCIES_PAGE;
    const { navigate } = useNavigation();
    const { openModal } = useModal();

    const breadcrumbPath = [
        { label: 'Home', href: '/' },
        { label: 'For Agencies' },
    ];

    return (
        <div className="overflow-x-hidden bg-white">
            {/* HERO */}
            <section className="relative bg-white overflow-hidden border-b border-gray-100">
                <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #1F3769 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                }} />
                <div className="container mx-auto px-6 max-w-[1400px] relative">
                    <div className="pt-6 md:pt-8">
                        <Breadcrumbs path={breadcrumbPath} theme="light" />
                    </div>

                    <div className="grid lg:grid-cols-12 gap-x-10 gap-y-10 items-start pt-6 md:pt-8 pb-14 md:pb-20">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 bg-brand-light border border-gray-200 rounded-full pl-1.5 pr-3.5 py-1 mb-5">
                                <span className="bg-brand-dark text-white text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full">{data.badge}</span>
                                <span className="text-[12px] text-brand-dark font-medium">Senior team · 19+ yrs · White-label by default</span>
                            </div>

                            <h1 className="text-brand-dark font-bold tracking-[-0.02em] leading-[1.1] text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] max-w-3xl">
                                {data.h1Top}
                            </h1>
                            <p className="mt-4 text-lg md:text-xl text-brand-orange font-medium leading-snug max-w-2xl">
                                {data.h1Highlight}
                            </p>
                            <p className="mt-5 text-base text-gray-600 leading-relaxed max-w-2xl">
                                {data.subhead}
                            </p>

                            <div className="mt-7 flex flex-col sm:flex-row gap-3">
                                <a
                                    href="/contact"
                                    onClick={(e) => { e.preventDefault(); openModal('Quote'); }}
                                    className="group inline-flex items-center justify-center gap-3 bg-brand-orange text-white font-medium py-3.5 pl-7 pr-3 rounded-full hover:bg-brand-orange-hover transition-colors"
                                >
                                    {data.primaryCta}
                                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform text-brand-orange">
                                        <Icon.Arrow />
                                    </span>
                                </a>
                                <a
                                    href="https://www.freelancer.com/u/graphicaa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 border border-gray-300 text-brand-dark font-medium py-3.5 px-7 rounded-full hover:border-brand-dark hover:bg-brand-light transition-colors"
                                >
                                    <Icon.Star />
                                    Verify 978 reviews
                                </a>
                            </div>

                            <div className="mt-8 flex flex-wrap items-end gap-x-5 sm:gap-x-7 gap-y-4">
                                <div>
                                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">19<span className="text-brand-orange">+</span></p>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Years</p>
                                </div>
                                <div className="border-l border-gray-200 pl-5 sm:pl-7">
                                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">978</p>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Reviews · 4.8★</p>
                                </div>
                                <div className="border-l border-gray-200 pl-5 sm:pl-7">
                                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">96<span className="text-brand-orange">%</span></p>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">On-budget delivery</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — white-label illustration card */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative max-w-[420px] mx-auto lg:mx-0 lg:ml-auto">
                                <div className="absolute -top-3 -right-3 w-full h-full border-2 border-brand-orange rounded-2xl hidden md:block" aria-hidden="true" />
                                <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden" style={{ boxShadow: '0 25px 50px -15px rgba(31, 55, 105, 0.15)' }}>
                                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-brand-light/60">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                                        </div>
                                        <p className="text-[11px] font-mono text-gray-600 tracking-[0.15em] uppercase">your-agency.com</p>
                                        <div className="w-12" />
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0">
                                                <Icon.Mask />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[9px] font-semibold tracking-widest uppercase text-brand-orange leading-none mb-1">White-label</p>
                                                <p className="text-sm font-bold text-brand-dark leading-tight">Built by your team</p>
                                            </div>
                                        </div>
                                        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-2">What stays invisible</p>
                                        <ul className="space-y-1.5 mb-4">
                                            {['Code repos under your org', 'Slack & email in your branding', 'Figma comments as your designer', 'Client calls fronted by your AM'].map((o) => (
                                                <li key={o} className="flex items-center gap-2.5 p-1.5 rounded-lg bg-brand-light/60">
                                                    <span className="w-5 h-5 rounded-md bg-brand-orange text-white flex items-center justify-center flex-shrink-0">
                                                        <Icon.Check />
                                                    </span>
                                                    <span className="text-[12px] font-medium text-brand-dark">{o}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={(e) => { e.preventDefault(); openModal('Quote'); }}
                                            className="w-full bg-brand-dark text-white text-xs font-medium py-2.5 rounded-lg hover:bg-brand-dark-hover transition-colors flex items-center justify-center gap-2"
                                        >
                                            Start the conversation
                                            <Icon.Arrow />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY US */}
            <section className="bg-white py-16 md:py-20">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="max-w-2xl mb-10">
                        <Eyebrow>Why us</Eyebrow>
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark tracking-[-0.025em] leading-[1.15]">
                            {data.whyTitle}
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {data.whyPoints.map((p, i) => (
                            <FadeIn key={p.title} delay={i * 60}>
                                <div className="h-full bg-white border border-gray-200 rounded-2xl p-6 hover:border-brand-dark transition-colors flex gap-5">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-xl bg-brand-light text-brand-dark flex items-center justify-center">
                                            <Icon.Check />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg md:text-xl font-bold text-brand-dark tracking-tight leading-tight mb-1.5">{p.title}</h3>
                                        <p className="text-[13.5px] text-gray-600 leading-relaxed">{p.description}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* OVERVIEW — dark editorial */}
            <section className="bg-brand-dark py-16 md:py-20">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="max-w-3xl">
                        <Eyebrow tone="light">How it works</Eyebrow>
                        <div className="text-[15.5px] md:text-base text-gray-300 leading-relaxed space-y-6">
                            {data.bodyParagraphs.map((p) => (
                                <div key={p.heading}>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 mt-2 tracking-tight">{p.heading}</h2>
                                    <p>{p.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="bg-brand-light py-16 md:py-20">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="max-w-2xl mb-10">
                        <Eyebrow>What we deliver</Eyebrow>
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark tracking-[-0.025em] leading-[1.15]">
                            Stack we cover, <span className="text-brand-orange">all white-labelled.</span>
                        </h2>
                        <p className="mt-4 text-base text-gray-600 leading-relaxed">{data.servicesIntro}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.featuredServices.map((s, i) => (
                            <FadeIn key={s.slug} delay={i * 50}>
                                <a
                                    href={`/services/${s.slug}`}
                                    onClick={(e) => { e.preventDefault(); navigate(`/services/${s.slug}`); }}
                                    className="block h-full bg-white border border-gray-200 rounded-2xl p-5 hover:border-brand-orange transition-colors group"
                                >
                                    <h3 className="text-base md:text-lg font-bold text-brand-dark tracking-tight leading-tight mb-1.5 group-hover:text-brand-orange transition-colors">{s.name}</h3>
                                    <p className="text-[13.5px] text-gray-600 leading-relaxed">{s.description}</p>
                                </a>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-white py-14 md:py-16">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="max-w-2xl mb-7">
                        <Eyebrow>FAQ</Eyebrow>
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark tracking-[-0.025em] leading-[1.15]">
                            Agency-partner questions, <span className="text-brand-orange">answered.</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                        {data.faqs.map((f, i) => (
                            <FadeIn key={i} delay={i * 50}>
                                <div className="h-full bg-white border border-gray-200 hover:border-brand-orange rounded-xl p-5 transition-colors">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="inline-flex items-center gap-1.5 bg-brand-light text-brand-dark text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border border-gray-200">
                                            <span className="w-1 h-1 rounded-full bg-brand-orange" />
                                            White-label
                                        </span>
                                        <span className="w-7 h-7 rounded-full bg-brand-light text-brand-orange flex items-center justify-center">
                                            <Icon.Question />
                                        </span>
                                    </div>
                                    <h3 className="text-base md:text-lg font-bold text-brand-dark leading-snug tracking-tight mb-2">{f.question}</h3>
                                    <p className="text-[13.5px] text-gray-600 leading-relaxed">{f.answer}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-brand-light py-10 md:py-12">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="relative bg-brand-dark text-white rounded-2xl overflow-hidden px-6 md:px-10 py-7 md:py-8">
                        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-brand-orange/20" aria-hidden="true" />
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-brand-orange/40" aria-hidden="true" />
                        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                            <div className="max-w-2xl">
                                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-orange mb-1">For agency owners</p>
                                <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-snug">{data.ctaHeading}</h2>
                                <p className="text-white/60 text-sm mt-2">{data.ctaSubhead}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
                                <a
                                    href="/contact"
                                    onClick={(e) => { e.preventDefault(); openModal('Quote'); }}
                                    className="group inline-flex items-center justify-center gap-2 bg-brand-orange text-white text-sm font-medium py-2.5 pl-5 pr-2 rounded-full hover:bg-brand-orange-hover transition-colors"
                                >
                                    {data.primaryCta}
                                    <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform text-brand-orange">
                                        <Icon.Arrow />
                                    </span>
                                </a>
                                <a
                                    href="/contact"
                                    onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
                                    className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-sm font-medium py-2.5 px-5 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    Contact form
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AgenciesPage;
