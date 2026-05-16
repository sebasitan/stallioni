

import React, { useState, lazy, Suspense } from 'react';
import FadeIn from '../components/FadeIn';
import FreelancerBadge from '../components/FreelancerBadge';
import { useNavigation, useModal, useToast } from '../App';
import { WebDevIcon, MobileDevIcon, FullStackIcon, EcommIcon, DesignIcon, CrmIcon } from '../components/IconComponents';
import { getPortfolioItems } from '../utils/portfolioStorage';
import { getContactEmail, getTeamsId, WHATSAPP_CONTACTS } from '../constants';

const TechnologyTicker = lazy(() => import('../components/TechnologyTicker'));

const HomePage: React.FC = () => {
    const { navigate } = useNavigation();
    const { openModal } = useModal();
    const { showToast } = useToast();

    const handleQuickContact = async (
        e: React.MouseEvent<HTMLAnchorElement>,
        type: 'email' | 'whatsapp' | 'teams',
        target?: string,
    ) => {
        e.preventDefault();
        if (type === 'email') {
            try {
                await navigator.clipboard.writeText(getContactEmail());
                showToast('Email address copied!', 'success');
            } catch { showToast('Failed to copy email.', 'error'); }
            return;
        }
        if (type === 'whatsapp') {
            if (target) window.open(target, '_blank', 'noopener,noreferrer');
            return;
        }
        if (type === 'teams') {
            window.open(`https://teams.microsoft.com/l/chat/0/0?users=${getTeamsId()}`, '_blank', 'noopener,noreferrer');
        }
    };

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        navigate(path);
    };

    // ============================================
    // HERO — modern split with developer pool visual
    // ============================================
    const HeroSection: React.FC = () => {
        const handleConsultationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            openModal('Consultation');
        };

        const devTeam = [
            { initials: 'AR', name: 'Senior React Developer', tag: 'React · Next.js · TS', avail: 'Available', color: 'bg-brand-orange' },
            { initials: 'MK', name: 'Full-Stack Engineer', tag: 'Node · PostgreSQL · AWS', avail: 'Available', color: 'bg-brand-dark' },
            { initials: 'PS', name: 'Mobile App Developer', tag: 'Flutter · React Native', avail: 'Available', color: 'bg-emerald-600' },
            { initials: 'NV', name: 'UI/UX Designer', tag: 'Figma · Framer · Webflow', avail: 'In 48 hrs', color: 'bg-violet-600' },
        ];

        return (
            <section className="relative bg-white overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #1F3769 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                }} />

                <div className="container mx-auto px-6 max-w-[1400px] relative">
                    {/* Main hero */}
                    <div className="grid lg:grid-cols-12 gap-x-10 gap-y-10 items-center pt-5 md:pt-7 pb-8 md:pb-10">
                        {/* LEFT — Content */}
                        <div className="lg:col-span-7">
                            {/* Eyebrow pill */}
                            <div className="inline-flex items-center gap-2 bg-brand-light border border-gray-200 rounded-full pl-1.5 pr-3.5 py-1 mb-5">
                                <span className="bg-brand-dark text-white text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full">
                                    New
                                </span>
                                <span className="text-[12px] text-brand-dark font-medium">
                                    Top IT Outsourcing Company in India
                                </span>
                            </div>

                            {/* Headline — tighter, fewer lines */}
                            <h1 className="text-brand-dark font-bold tracking-[-0.035em] leading-[1.05]">
                                <span className="block text-[clamp(1.75rem,3.3vw,3rem)]">
                                    Hire dedicated remote
                                </span>
                                <span className="block text-[clamp(1.75rem,3.3vw,3rem)]">
                                    developers <span className="italic font-medium">in <span className="relative inline-block text-brand-orange">
                                        48 hours.
                                        <svg className="absolute left-0 -bottom-1.5 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                                            <path d="M2 9 Q 50 2 100 7 T 198 6" stroke="#FF6633" strokeWidth="3" strokeLinecap="round" fill="none" />
                                        </svg>
                                    </span></span>
                                </span>
                            </h1>

                            {/* Subtitle */}
                            <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed max-w-xl">
                                Build your dream team with <span className="font-semibold text-brand-dark">Stallioni Net Solutions</span> — grow faster, reduce costs, and launch lightning-fast projects without the high cost of in-house teams.
                            </p>

                            {/* CTA Group */}
                            <div className="mt-5 flex flex-col sm:flex-row gap-3">
                                <a
                                    href="/contact"
                                    onClick={handleConsultationClick}
                                    className="group inline-flex items-center justify-center gap-3 bg-brand-dark text-white text-sm font-medium py-3 pl-6 pr-2.5 rounded-full hover:bg-brand-dark-hover transition-colors"
                                >
                                    Book Your Free Consultation
                                    <span className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </a>
                                <a
                                    href="/portfolio"
                                    onClick={(e) => handleNav(e, '/portfolio')}
                                    className="inline-flex items-center justify-center gap-2 text-brand-dark text-sm font-medium py-3 px-5 rounded-full hover:bg-brand-light transition-colors"
                                >
                                    <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">
                                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    </span>
                                    View Our Work
                                </a>
                            </div>

                            {/* Social proof row */}
                            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex -space-x-2">
                                        {['AR', 'MK', 'PS', 'NV'].map((init, i) => (
                                            <div
                                                key={i}
                                                className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-semibold ${['bg-brand-orange', 'bg-brand-dark', 'bg-emerald-600', 'bg-violet-600'][i]}`}
                                            >
                                                {init}
                                            </div>
                                        ))}
                                        <div className="w-8 h-8 rounded-full border-2 border-white bg-white text-brand-dark text-[10px] font-bold flex items-center justify-center">
                                            +95
                                        </div>
                                    </div>
                                    <div className="text-xs">
                                        <p className="text-brand-dark font-semibold leading-tight">100+ developers</p>
                                        <p className="text-gray-500 text-[11px] leading-tight">ready to join your team</p>
                                    </div>
                                </div>

                                <div className="hidden sm:block w-px h-8 bg-gray-200" />

                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-0.5 text-amber-400">
                                        {[0, 1, 2, 3, 4].map(i => (
                                            <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <div className="text-xs">
                                        <p className="text-brand-dark font-semibold leading-tight">4.8 / 5 · 978 reviews</p>
                                        <p className="text-gray-500 text-[11px] leading-tight">on Freelancer.com since 2007</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — Visual: developer pool card stack */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative max-w-[400px] mx-auto lg:mx-0 lg:ml-auto">
                                {/* Decorative offset frame */}
                                <div className="absolute -top-3 -right-3 w-full h-full border-2 border-brand-orange rounded-2xl hidden md:block" aria-hidden="true" />

                                {/* Main card — Available developers */}
                                <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden" style={{ boxShadow: '0 25px 50px -15px rgba(31, 55, 105, 0.15)' }}>
                                    {/* Card header — status panel */}
                                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-brand-light/60">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="relative flex h-1.5 w-1.5">
                                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                                            </span>
                                            <p className="text-[11px] font-mono text-gray-600 tracking-[0.15em] uppercase">Live · Roster</p>
                                        </div>
                                        <div className="w-12" />
                                    </div>

                                    {/* Card body */}
                                    <div className="p-3.5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <p className="text-[9px] font-semibold tracking-widest uppercase text-brand-orange leading-none mb-1">Live · Available Now</p>
                                                <h3 className="text-sm font-bold text-brand-dark leading-none">Your Dedicated Team</h3>
                                            </div>
                                            <span className="text-[10px] font-mono text-gray-400">04 / 100+</span>
                                        </div>

                                        <div className="space-y-1">
                                            {devTeam.map((dev, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-brand-light transition-colors border border-transparent hover:border-gray-100"
                                                >
                                                    <div className={`w-7 h-7 rounded-full ${dev.color} text-white text-[10px] font-semibold flex items-center justify-center flex-shrink-0`}>
                                                        {dev.initials}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-semibold text-brand-dark truncate leading-tight">{dev.name}</p>
                                                        <p className="text-[10px] text-gray-500 font-mono truncate leading-tight mt-0.5">{dev.tag}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1 flex-shrink-0">
                                                        {dev.avail === 'Available' ? (
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                        ) : (
                                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                        )}
                                                        <span className="text-[9px] font-medium text-gray-600">{dev.avail}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            onClick={(e) => { e.preventDefault(); openModal('Consultation'); }}
                                            className="mt-3 w-full bg-brand-dark text-white text-xs font-medium py-2.5 rounded-lg hover:bg-brand-dark-hover transition-colors flex items-center justify-center gap-2"
                                        >
                                            Assemble My Team
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Floating badge — Cost savings */}
                                <div className="absolute -left-3 -top-4 md:-left-8 md:top-8 bg-white border border-gray-200 rounded-xl p-3 hidden sm:block" style={{ boxShadow: '0 15px 30px -10px rgba(31, 55, 105, 0.15)' }}>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-semibold tracking-widest uppercase text-gray-500 leading-none mb-0.5">Cost savings</p>
                                            <p className="text-base font-bold text-brand-dark tracking-tight leading-none">60% <span className="text-[10px] text-gray-500 font-normal">avg.</span></p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating badge — Delivery time */}
                                <div className="absolute -right-3 -bottom-5 md:-right-6 md:bottom-8 bg-brand-dark text-white rounded-xl p-3 hidden sm:block" style={{ boxShadow: '0 15px 30px -10px rgba(31, 55, 105, 0.3)' }}>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-semibold tracking-widest uppercase text-white/60 leading-none mb-0.5">Hire in</p>
                                            <p className="text-base font-bold tracking-tight leading-none">48 hrs <span className="text-[10px] text-white/60 font-normal">or less</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom — Trusted regions strip */}
                    <div className="border-t border-gray-100 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400 flex-shrink-0">
                            Trusted by clients in
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            {[
                                { name: 'United States', code: 'us' },
                                { name: 'United Kingdom', code: 'gb' },
                                { name: 'Australia', code: 'au' },
                                { name: 'Middle East', code: 'ae' },
                                { name: 'India', code: 'in' },
                                { name: 'Canada', code: 'ca' },
                            ].map((region) => (
                                <span
                                    key={region.code}
                                    className="inline-flex items-center gap-2 bg-brand-light border border-gray-200 rounded-full pl-1.5 pr-3.5 py-1 text-sm font-medium text-brand-dark hover:border-brand-orange transition-colors"
                                >
                                    <span className="w-5 h-5 rounded-full overflow-hidden border border-white bg-gray-100 flex-shrink-0" style={{ boxShadow: '0 0 0 1px rgba(31, 55, 105, 0.08)' }}>
                                        <img
                                            src={`https://flagcdn.com/w40/${region.code}.png`}
                                            srcSet={`https://flagcdn.com/w80/${region.code}.png 2x`}
                                            width="20"
                                            height="20"
                                            alt=""
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                    </span>
                                    {region.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // ============================================
    // PARTNER SECTION — Stat-anchored magazine layout
    // ============================================
    const PartnerSection: React.FC = () => {
        const features = [
            {
                num: "02",
                title: "Rapid Assembly",
                stat: "48",
                statUnit: "hrs",
                statLabel: "to onboard",
                desc: "Build a high-performance remote team in days—not months",
                icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>)
            },
            {
                num: "03",
                title: "Top-Tier Talent",
                stat: "100",
                statUnit: "+",
                statLabel: "elite devs",
                desc: "Work with elite developers trained in global standards and best practices",
                icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>)
            },
            {
                num: "04",
                title: "Agile Speed",
                stat: "2",
                statUnit: "×",
                statLabel: "faster delivery",
                desc: "Enjoy faster delivery timelines powered by agile methodologies and execution",
                icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>)
            },
            {
                num: "05",
                title: "Scalability",
                stat: "1",
                statUnit: "→ 10+",
                statLabel: "team size",
                desc: "Scale your team and infrastructure effortlessly as your business grows",
                icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>)
            },
        ];

        return (
            <section className="bg-brand-light py-20 md:py-28 relative overflow-hidden">
                {/* Subtle background grid */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #1F3769 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />

                <div className="container mx-auto px-6 max-w-[1400px] relative">
                    {/* Header */}
                    <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8 mb-12 lg:mb-16">
                        <div className="lg:col-span-7">
                            <div className="flex items-center gap-3 mb-5">
                                <span className="w-12 h-px bg-brand-orange" />
                                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-dark">Why Stallioni</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark tracking-[-0.03em] leading-[1.04]">
                                Your high-value <br />
                                <span className="text-brand-orange italic font-medium">offshore development</span> partner.
                            </h2>
                        </div>
                        <div className="lg:col-span-5 lg:pt-3 flex flex-col justify-end">
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                Stop wasting time searching for developers who don't deliver. Get a focused partner built around your growth and ROI.
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mt-5">
                                <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-brand-dark">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Vetted
                                </span>
                                <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-brand-dark">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Dedicated
                                </span>
                                <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-brand-dark">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> ROI-focused
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Top spotlight — Cost Efficiency featured + Comparison */}
                    <div className="grid lg:grid-cols-12 gap-4 mb-4">
                        {/* Featured Cost Efficiency card */}
                        <FadeIn className="lg:col-span-7">
                            <div className="h-full bg-brand-dark text-white rounded-3xl p-8 md:p-10 relative overflow-hidden">
                                {/* Orange accent corner */}
                                <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-brand-orange/20" aria-hidden="true" />
                                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-brand-orange/40" aria-hidden="true" />

                                <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-semibold tracking-widest uppercase text-white/50">Featured Advantage</span>
                                        <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-2.5 py-1 text-[10px] font-mono">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> VERIFIED
                                        </span>
                                    </div>

                                    <div className="flex items-end gap-6 flex-wrap">
                                        <div>
                                            <div className="flex items-baseline gap-1 leading-none mb-2">
                                                <span className="text-[clamp(4rem,9vw,7rem)] font-bold tracking-[-0.05em]">60</span>
                                                <span className="text-3xl md:text-4xl font-bold text-brand-orange tracking-tight">%</span>
                                            </div>
                                            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50">Average cost savings</p>
                                        </div>
                                        <div className="flex-1 min-w-[200px]">
                                            <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">Cost Efficiency</h3>
                                            <p className="text-white/70 text-sm md:text-base leading-relaxed">
                                                Save up to 60% on development costs without compromising on quality — premium output, friendly budget.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Comparison mini card */}
                        <FadeIn delay={80} className="lg:col-span-5">
                            <div className="h-full bg-white border border-gray-200 rounded-3xl p-7 md:p-8 flex flex-col">
                                <div className="flex items-center gap-2 mb-5">
                                    <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">In-house vs Stallioni</span>
                                </div>

                                <div className="space-y-3 flex-grow">
                                    {[
                                        { label: "Monthly dev cost", inhouse: "$12,000", us: "$4,800", positive: true },
                                        { label: "Time to hire", inhouse: "3–6 months", us: "48 hours", positive: true },
                                        { label: "Onboarding", inhouse: "Weeks", us: "Day 1", positive: true },
                                        { label: "Scale up/down", inhouse: "Slow & risky", us: "Instant", positive: true },
                                    ].map((row, i) => (
                                        <div key={i} className="grid grid-cols-12 gap-2 items-center py-2 border-b border-gray-100 last:border-0">
                                            <span className="col-span-5 text-xs text-gray-500">{row.label}</span>
                                            <span className="col-span-3 text-xs text-gray-400 line-through">{row.inhouse}</span>
                                            <span className="col-span-4 text-right inline-flex items-center justify-end gap-1.5 text-sm font-bold text-brand-dark">
                                                {row.us}
                                                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                </span>
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-[11px] font-mono text-gray-400 tracking-wider mt-5 pt-4 border-t border-gray-100">
                                    Real numbers · Verified by 900+ clients
                                </p>
                            </div>
                        </FadeIn>
                    </div>

                    {/* 4 stat-anchored feature cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {features.map((item, i) => (
                            <FadeIn key={i} delay={i * 60}>
                                <div className="group h-full bg-white border border-gray-200 hover:border-brand-orange rounded-3xl p-6 md:p-7 transition-all duration-300 relative overflow-hidden">
                                    {/* Hover accent strip */}
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" aria-hidden="true" />

                                    <div className="mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-brand-light text-brand-dark flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                            {item.icon}
                                        </div>
                                    </div>

                                    <div className="flex items-baseline gap-1 mb-1">
                                        <span className="text-5xl md:text-6xl font-bold text-brand-dark tracking-[-0.04em] leading-none">{item.stat}</span>
                                        <span className="text-xl md:text-2xl font-bold text-brand-orange tracking-tight">{item.statUnit}</span>
                                    </div>
                                    <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-5">{item.statLabel}</p>

                                    <h3 className="text-lg font-bold text-brand-dark mb-2 tracking-tight">{item.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* Wide Seamless Process card */}
                    <FadeIn delay={100}>
                        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
                            {/* Top bar */}
                            <div className="bg-brand-dark text-white px-7 md:px-9 py-4 flex items-center justify-between border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-px bg-white/20" />
                                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/80">End-to-End Journey</span>
                                </div>
                                <div className="hidden sm:flex items-center gap-2">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                                    </span>
                                    <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase">6 Stages · Zero Handoff Loss</span>
                                </div>
                            </div>

                            {/* Main content */}
                            <div className="p-7 md:p-9">
                                <div className="grid lg:grid-cols-12 gap-x-10 gap-y-6 mb-8 items-end">
                                    <div className="lg:col-span-5">
                                        <h3 className="text-3xl md:text-4xl font-bold text-brand-dark tracking-[-0.02em] leading-tight mb-3">
                                            Seamless Process
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                            Experience a smooth, transparent, and stress-free outsourcing journey from day one.
                                        </p>
                                    </div>
                                    <div className="lg:col-span-7 flex flex-wrap gap-2">
                                        {[
                                            { label: 'Weekly demos', icon: '◷' },
                                            { label: 'Single PM contact', icon: '◉' },
                                            { label: 'Transparent reporting', icon: '◈' },
                                            { label: 'Agile sprints', icon: '◆' },
                                        ].map((chip) => (
                                            <span key={chip.label} className="inline-flex items-center gap-1.5 bg-brand-light border border-gray-200 rounded-full px-3 py-1.5 text-xs font-medium text-brand-dark">
                                                <span className="text-brand-orange text-[10px]">{chip.icon}</span>
                                                {chip.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Process flow grid */}
                                <div className="relative">
                                    {/* Dashed background line on desktop */}
                                    <div className="hidden lg:block absolute top-[34px] left-[5%] right-[5%] h-px border-t border-dashed border-gray-300" aria-hidden="true" />

                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-2 relative">
                                        {[
                                            {
                                                step: 'Discover',
                                                activity: 'Vision & goals alignment',
                                                icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>),
                                            },
                                            {
                                                step: 'Plan',
                                                activity: 'Roadmap & team match',
                                                icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>),
                                            },
                                            {
                                                step: 'Build',
                                                activity: 'Agile sprints & demos',
                                                icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>),
                                            },
                                            {
                                                step: 'Test',
                                                activity: 'QA & security audits',
                                                icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>),
                                            },
                                            {
                                                step: 'Launch',
                                                activity: 'Deploy & go-live',
                                                icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>),
                                            },
                                            {
                                                step: 'Support',
                                                activity: 'Maintain & scale',
                                                icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>),
                                            },
                                        ].map((item, idx, arr) => {
                                            const isFirst = idx === 0;
                                            const isLast = idx === arr.length - 1;
                                            return (
                                                <div key={item.step} className="group relative flex flex-col">
                                                    {/* Numbered icon hub */}
                                                    <div className="flex items-center mb-3">
                                                        <div className={`relative w-[68px] h-[68px] rounded-2xl flex items-center justify-center transition-colors z-10 ${isFirst ? 'bg-brand-orange text-white' : isLast ? 'bg-brand-dark text-white' : 'bg-brand-light text-brand-dark border border-gray-200 group-hover:border-brand-orange group-hover:bg-white'}`}>
                                                            <span className="leading-none [&_svg]:w-6 [&_svg]:h-6">{item.icon}</span>
                                                        </div>
                                                    </div>

                                                    {/* Text */}
                                                    <div>
                                                        <p className="text-sm font-bold text-brand-dark mb-0.5 leading-tight">{item.step}</p>
                                                        <p className="text-[11px] text-gray-500 leading-snug">{item.activity}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                </div>
            </section>
        );
    };

    // ============================================
    // SERVICES — magazine-style grid
    // ============================================
    const ServicesSection: React.FC = () => {
        const services = [
            {
                title: "Web Development Services",
                description: "Custom websites, CMS platforms, and enterprise web applications engineered for performance, SEO, and scale.",
                icon: <WebDevIcon className="w-6 h-6" />,
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
                description: "Native iOS, Android, and cross-platform mobile apps with delightful UX and rock-solid performance.",
                icon: <MobileDevIcon className="w-6 h-6" />,
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
                description: "Bespoke business applications, CRMs, and SaaS platforms tailored to your workflow and team.",
                icon: <FullStackIcon className="w-6 h-6" />,
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
                description: "Shopify, WooCommerce, Magento, and fully custom storefronts engineered to drive revenue.",
                icon: <EcommIcon className="w-6 h-6" />,
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
                description: "Vetted developers, designers, and project managers acting as a seamless extension of your team.",
                icon: <CrmIcon className="w-6 h-6" />,
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
                description: "User experience design, wireframes, prototypes, and brand systems that ship and convert.",
                icon: <DesignIcon className="w-6 h-6" />,
                items: [
                    { label: "Website UI/UX", href: "/services/ui-ux-design" },
                    { label: "App UI/UX", href: "/services/ui-ux-design" },
                    { label: "Brand identity design", href: "/services/landing-page-design" },
                    { label: "Wireframes, prototypes & design systems", href: "/services/design-systems" }
                ]
            }
        ];

        // Map each service category to a logical landing href
        const categoryHrefs = [
            '/services/website-design-development',
            '/services/mobile-app-development',
            '/services/saas-development',
            '/services/ecommerce-development',
            '/contact',
            '/services/ui-ux-design',
        ];

        return (
            <section className="bg-brand-light py-16 md:py-20">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    {/* Header — controlled, balanced */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-5">
                                <span className="w-10 h-px bg-brand-orange" />
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-dark">Services</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-brand-dark tracking-[-0.025em] leading-[1.1]">
                                Our Comprehensive Offshore <span className="text-brand-orange">Development Services</span>
                            </h2>
                            <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-xl">
                                We deliver everything you need to build, scale, and <span className="font-semibold text-brand-dark">dominate your market.</span>
                            </p>
                        </div>
                        <a
                            href="/services"
                            onClick={(e) => handleNav(e, '/services')}
                            className="group inline-flex items-center gap-3 text-sm font-semibold text-brand-dark hover:text-brand-orange transition-colors self-start flex-shrink-0"
                        >
                            <span className="uppercase tracking-[0.15em] text-xs">View all services</span>
                            <span className="w-10 h-10 rounded-full bg-brand-dark text-white group-hover:bg-brand-orange flex items-center justify-center transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </a>
                    </div>

                    {/* Services grid — compact horizontal cards */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {services.map((service, index) => {
                            const categoryHref = categoryHrefs[index] || '/services';
                            const previewItems = service.items.slice(0, 4);
                            const remaining = service.items.length - previewItems.length;
                            return (
                                <FadeIn key={index} delay={index * 50}>
                                    <a
                                        href={categoryHref}
                                        onClick={(e) => handleNav(e, categoryHref)}
                                        className="group relative h-full bg-white border border-gray-200 rounded-2xl p-6 hover:border-brand-dark transition-colors flex gap-5"
                                    >
                                        {/* Left — Icon */}
                                        <div className="flex-shrink-0">
                                            <div className="w-14 h-14 rounded-2xl bg-brand-light text-brand-dark flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors [&_svg]:w-6 [&_svg]:h-6">
                                                {service.icon}
                                            </div>
                                        </div>

                                        {/* Right — Content */}
                                        <div className="flex-1 min-w-0 flex flex-col">
                                            <div className="flex items-start justify-between gap-3 mb-1.5">
                                                <h3 className="text-lg md:text-xl font-bold text-brand-dark tracking-tight leading-tight group-hover:text-brand-orange transition-colors">
                                                    {service.title}
                                                </h3>
                                            </div>

                                            <p className="text-[13px] text-gray-600 leading-relaxed mb-3 line-clamp-2">
                                                {service.description}
                                            </p>

                                            {/* Inline pill links */}
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {previewItems.map((item, idx) => (
                                                    <span
                                                        key={idx}
                                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleNav(e as any, item.href); }}
                                                        className="inline-flex items-center bg-brand-light hover:bg-brand-orange hover:text-white rounded-md px-2.5 py-1 text-[12px] font-medium text-gray-700 transition-colors cursor-pointer"
                                                    >
                                                        {item.label}
                                                    </span>
                                                ))}
                                                {remaining > 0 && (
                                                    <span className="inline-flex items-center text-[12px] text-gray-400 px-1.5 py-1 font-medium">
                                                        + {remaining} more
                                                    </span>
                                                )}
                                            </div>

                                            {/* Footer link */}
                                            <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                                                <span className="text-[11px] font-mono text-gray-400 tracking-widest uppercase">
                                                    {service.items.length} offerings
                                                </span>
                                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark group-hover:text-brand-orange transition-colors">
                                                    Explore
                                                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </FadeIn>
                            );
                        })}
                    </div>

                    {/* Bottom CTA — minimal */}
                    <FadeIn delay={300}>
                        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-7 py-6 bg-white rounded-2xl border border-gray-200">
                            <p className="text-base md:text-lg text-brand-dark">
                                <span className="font-semibold">Need a custom solution?</span>
                                <span className="text-gray-600 ml-1.5">Tell us about your project and we'll scope it.</span>
                            </p>
                            <a
                                href="/contact"
                                onClick={(e) => { e.preventDefault(); openModal('Quote'); }}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:text-brand-orange-hover transition-colors"
                            >
                                Get a custom quote
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>
        );
    };

    // ============================================
    // CLIENT SUCCESS — light premium magazine
    // ============================================
    const ClientSuccessSection: React.FC = () => {
        const featuredItems = getPortfolioItems().slice(0, 3);
        const featured = featuredItems[0];
        const secondary = featuredItems.slice(1, 3);

        const getCountryCode = (location: string = '') => {
            const loc = location.toLowerCase();
            if (loc.includes('malaysia') || loc.includes('kuala lumpur')) return 'my';
            if (loc.includes('usa') || loc.includes('us')) return 'us';
            if (loc.includes('uk') || loc.includes('kingdom') || loc.includes('london') || loc.includes('northampton')) return 'gb';
            if (loc.includes('uae') || loc.includes('dubai')) return 'ae';
            if (loc.includes('australia') || loc.includes('melbourne') || loc.includes('sydney')) return 'au';
            if (loc.includes('india')) return 'in';
            if (loc.includes('canada') || loc.includes('toronto')) return 'ca';
            if (loc.includes('germany') || loc.includes('berlin')) return 'de';
            if (loc.includes('france') || loc.includes('paris')) return 'fr';
            if (loc.includes('norway') || loc.includes('oslo')) return 'no';
            if (loc.includes('ireland') || loc.includes('donegal')) return 'ie';
            return 'un';
        };

        return (
            <section className="bg-white py-20 md:py-24">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-5">
                                <span className="w-10 h-px bg-brand-orange" />
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-dark">Client Success</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-brand-dark tracking-[-0.025em] leading-[1.1]">
                                Real success stories <br />
                                <span className="text-brand-orange">trusted globally.</span>
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-xl">
                                When smart brands want results, they hire <span className="font-semibold text-brand-dark">Stallioni Net Solutions.</span>
                            </p>
                        </div>

                        {/* Inline stats */}
                        <div className="flex gap-6 md:gap-8 flex-shrink-0">
                            <div>
                                <p className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">900<span className="text-brand-orange">+</span></p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Projects</p>
                            </div>
                            <div className="border-l border-gray-200 pl-6 md:pl-8">
                                <p className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">35<span className="text-brand-orange">+</span></p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Countries</p>
                            </div>
                            <div className="border-l border-gray-200 pl-6 md:pl-8">
                                <p className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">4.9<span className="text-brand-orange">/5</span></p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Rating</p>
                            </div>
                        </div>
                    </div>

                    {/* Featured spotlight — dark hero card */}
                    {featured && (
                        <FadeIn>
                            <div className="bg-brand-dark text-white rounded-3xl overflow-hidden mb-5 relative">
                                <div className="grid lg:grid-cols-12 gap-0">
                                    {/* Image — 5 cols */}
                                    <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px] overflow-hidden bg-brand-light">
                                        <img
                                            src={featured.imageUrl}
                                            alt={featured.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            onError={(e) => {
                                                const img = e.currentTarget;
                                                if (img.src.indexOf('unsplash') === -1) {
                                                    img.src = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&h=600&auto=format&fit=crop';
                                                }
                                            }}
                                        />
                                        {/* Side overlay tags */}
                                        <div className="absolute top-5 left-5 flex flex-col gap-2 items-start">
                                            <span className="bg-brand-orange text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                                Featured Case Study
                                            </span>
                                            <span className="bg-white/95 backdrop-blur text-brand-dark text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                                {featured.category}
                                            </span>
                                        </div>

                                        {/* Country flag bottom-left */}
                                        <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full pl-1.5 pr-3 py-1">
                                            <img
                                                src={`https://flagcdn.com/w40/${getCountryCode(featured.clientLocation)}.png`}
                                                alt=""
                                                className="w-5 h-5 rounded-full object-cover"
                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                            />
                                            <span className="text-[11px] font-medium text-white">{featured.clientLocation || 'Global'}</span>
                                        </div>
                                    </div>

                                    {/* Content — 7 cols */}
                                    <div className="lg:col-span-7 p-8 md:p-12 flex flex-col">
                                        <div className="flex items-center gap-3 mb-5">
                                            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-orange">
                                                {featured.industry}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-white/30" />
                                            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50">
                                                Success Story
                                            </span>
                                        </div>

                                        <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold leading-[1.1] tracking-tight mb-4">
                                            {featured.title}
                                        </h3>

                                        <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                                            {featured.description}
                                        </p>

                                        {/* Integrated testimonial blockquote */}
                                        <blockquote className="relative pl-6 border-l-2 border-brand-orange my-2">
                                            <svg className="absolute -left-1 -top-2 w-5 h-5 text-brand-orange" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                                                <path d="M9.352 4C4.456 7.456 1 13.064 1 19.96c0 5.488 3.32 8.696 7.16 8.696 3.696 0 6.44-2.832 6.44-6.336 0-3.376-2.456-5.84-5.696-5.84-.656 0-1.448.144-1.648.288.512-3.36 3.696-7.224 6.88-9.16L9.352 4z" />
                                            </svg>
                                            <p className="text-white/90 italic text-base md:text-lg leading-relaxed mb-3">
                                                "{featured.testimonial || 'Stallioni delivered our project on time and at half the local cost. Their team felt like an extension of ours.'}"
                                            </p>
                                            <div className="flex items-center gap-1 text-amber-400">
                                                {[0, 1, 2, 3, 4].map(i => (
                                                    <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                                <span className="text-[11px] text-white/60 ml-2 not-italic font-medium">Verified Client</span>
                                            </div>
                                        </blockquote>

                                        {/* Tech badges */}
                                        {featured.technologies && featured.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-6 mb-6">
                                                {featured.technologies.slice(0, 6).map((tech) => (
                                                    <span key={tech} className="bg-white/5 border border-white/10 text-white/80 text-[11px] px-3 py-1 rounded-md">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* CTAs */}
                                        <div className="mt-auto flex flex-wrap items-center gap-3">
                                            <a
                                                href="/portfolio"
                                                onClick={(e) => handleNav(e, '/portfolio')}
                                                className="group inline-flex items-center gap-3 bg-brand-orange text-white text-sm font-medium py-3 pl-6 pr-2.5 rounded-full hover:bg-brand-orange-hover transition-colors"
                                            >
                                                Read the full story
                                                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                                    <svg className="w-3.5 h-3.5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </span>
                                            </a>
                                            {featured.projectUrl && (
                                                <a
                                                    href={featured.projectUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors border border-white/20 hover:border-white/40 py-3 px-5 rounded-full"
                                                >
                                                    Visit live site
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    )}

                    {/* Secondary projects — clean light cards */}
                    {secondary.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-5 mb-12">
                            {secondary.map((item, index) => (
                                <FadeIn key={item.id} delay={index * 80}>
                                    <a
                                        href="/portfolio"
                                        onClick={(e) => handleNav(e, '/portfolio')}
                                        className="group block bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-brand-dark transition-colors h-full"
                                    >
                                        <div className="grid grid-cols-5 gap-0 h-full">
                                            {/* Compact image */}
                                            <div className="col-span-2 relative aspect-[4/5] sm:aspect-auto overflow-hidden bg-gray-100">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.title}
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <span className="absolute top-3 left-3 bg-white text-brand-dark text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded">
                                                    {item.category}
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <div className="col-span-3 p-6 flex flex-col">
                                                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-orange mb-2">
                                                    {item.industry}
                                                </p>
                                                <h4 className="text-lg font-bold text-brand-dark mb-2 leading-tight tracking-tight group-hover:text-brand-orange transition-colors line-clamp-2">
                                                    {item.title}
                                                </h4>
                                                <p className="text-gray-600 text-[13px] mb-4 line-clamp-3 leading-relaxed flex-grow">
                                                    {item.description}
                                                </p>
                                                <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
                                                    <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                                                        <img
                                                            src={`https://flagcdn.com/w40/${getCountryCode(item.clientLocation)}.png`}
                                                            alt=""
                                                            className="w-3.5 h-3.5 rounded-full object-cover"
                                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                        />
                                                        <span>{item.clientLocation}</span>
                                                    </div>
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-orange group-hover:translate-x-0.5 transition-transform">
                                                        View
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </FadeIn>
                            ))}
                        </div>
                    )}

                    {/* Industries + CTA strip */}
                    <div className="bg-brand-light rounded-2xl px-6 md:px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-12">
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">Industries we serve</span>
                            {['Fintech', 'Healthcare', 'E-Commerce', 'SaaS', 'EdTech', 'Logistics'].map((ind) => (
                                <span key={ind} className="text-sm font-medium text-brand-dark">{ind}</span>
                            ))}
                        </div>
                        <a
                            href="/portfolio"
                            onClick={(e) => handleNav(e, '/portfolio')}
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-dark hover:text-brand-orange transition-colors flex-shrink-0"
                        >
                            Explore full portfolio
                            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>

                    {/* Tech ticker */}
                    <div className="w-full pt-8 border-t border-gray-100">
                        <Suspense fallback={<div className="h-16" />}>
                            <TechnologyTicker />
                        </Suspense>
                    </div>
                </div>
            </section>
        );
    };

    // ============================================
    // FAQ — modern always-visible card grid
    // ============================================
    const FAQSection: React.FC = () => {
        const faqs = [
            {
                category: "About",
                q: "What makes Stallioni the best IT outsourcing company?",
                a: "Our mix of affordable pricing, strong tech team, fast delivery, and global experience makes us the best choice for small and growing businesses.",
            },
            {
                category: "Hiring",
                q: "How quickly can I hire a remote development team?",
                a: "In as little as 48 hours, depending on your requirements.",
            },
            {
                category: "Trust",
                q: "Are outsourced developers reliable?",
                a: "Yes — our developers are vetted, trained, and aligned with global coding standards.",
            },
            {
                category: "Startups",
                q: "Do startups benefit from outsourcing?",
                a: "Absolutely! You reduce cost, launch faster, and scale without the risk of hiring full-time employees.",
            }
        ];

        return (
            <section className="bg-brand-light py-14 md:py-16">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    {/* Header — compact */}
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

                        {/* Quick stat — inline */}
                        <div className="flex items-center gap-2.5 flex-shrink-0">
                            <div className="w-9 h-9 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                <svg className="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <div className="leading-tight">
                                <p className="text-xs font-semibold text-brand-dark">&lt; 24 hours</p>
                                <p className="text-[11px] text-gray-500">avg response</p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ grid — tighter cards */}
                    <div className="grid md:grid-cols-2 gap-3 mb-5">
                        {faqs.map((faq, idx) => (
                            <FadeIn key={idx} delay={idx * 50}>
                                <div className="group h-full bg-white border border-gray-200 hover:border-brand-orange rounded-xl p-5 transition-colors flex flex-col">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="inline-flex items-center gap-1.5 bg-brand-light text-brand-dark text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border border-gray-200">
                                            <span className="w-1 h-1 rounded-full bg-brand-orange" />
                                            {faq.category}
                                        </span>
                                        <span className="w-7 h-7 rounded-full bg-brand-light text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </span>
                                    </div>

                                    <h3 className="text-base md:text-lg font-bold text-brand-dark leading-snug tracking-tight mb-2 group-hover:text-brand-orange transition-colors">
                                        {faq.q}
                                    </h3>

                                    <p className="text-[13.5px] text-gray-600 leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* Compact bottom CTA strip */}
                    <FadeIn delay={250}>
                        <div className="bg-brand-dark text-white rounded-xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <span className="text-brand-orange">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </span>
                                <p className="text-sm">
                                    <span className="font-semibold">Still have questions?</span>
                                    <span className="text-white/60 ml-1.5">We reply in under 24 hours.</span>
                                </p>
                            </div>
                            <a
                                href="/contact"
                                onClick={(e) => handleNav(e, '/contact')}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:text-white transition-colors"
                            >
                                Contact our team
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>
        );
    };

    // ============================================
    // CTA — final conversion block with multi-channel
    // ============================================
    const CTASection: React.FC = () => (
        <section className="bg-brand-light text-brand-dark pt-16 pb-12 md:pt-20 md:pb-14 relative overflow-hidden">
            {/* Soft decorative orange accents */}
            <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-brand-orange/8" aria-hidden="true" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-brand-orange/5" aria-hidden="true" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #1F3769 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }} />

            <div className="container mx-auto px-6 max-w-[1400px] relative">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* LEFT — Headline & primary CTAs */}
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-10 h-px bg-brand-orange" />
                            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-dark">Let's Build</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-brand-dark tracking-[-0.025em] leading-[1.05] mb-6">
                            Ready to build <br />
                            <span className="text-brand-orange">something amazing?</span>
                        </h2>

                        <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-600 max-w-2xl">
                            If you're ready to grow faster, build smarter, and scale without limits, <span className="font-semibold text-brand-dark">Stallioni Net Solutions</span> is your outsourcing partner.
                        </p>

                        {/* Promise chips */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {['Your next product', 'Your next team', 'Your next level of success'].map((promise) => (
                                <span key={promise} className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs font-medium text-brand-dark">
                                    <span className="w-1 h-1 rounded-full bg-brand-orange" /> {promise}
                                </span>
                            ))}
                        </div>

                        {/* Primary CTA group */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="/contact"
                                onClick={(e) => { e.preventDefault(); openModal('Consultation'); }}
                                className="group inline-flex items-center justify-center gap-3 bg-brand-orange text-white font-medium py-4 pl-7 pr-3 rounded-full hover:bg-brand-orange-hover transition-colors"
                            >
                                Book free consultation
                                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <svg className="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </a>
                            <a
                                href="/portfolio"
                                onClick={(e) => handleNav(e, '/portfolio')}
                                className="inline-flex items-center justify-center gap-2 border border-gray-300 text-brand-dark text-sm font-medium py-4 px-6 rounded-full hover:bg-white hover:border-brand-dark transition-colors"
                            >
                                See our work
                            </a>
                        </div>

                        {/* Trust signal */}
                        <div className="flex items-center gap-3 mt-8 text-sm text-gray-600">
                            <div className="flex -space-x-1.5">
                                {['AR', 'MK', 'PS', 'NV'].map((init, i) => (
                                    <div
                                        key={i}
                                        className={`w-7 h-7 rounded-full border-2 border-brand-light flex items-center justify-center text-white text-[10px] font-semibold ${['bg-brand-orange', 'bg-emerald-600', 'bg-violet-600', 'bg-amber-600'][i]}`}
                                    >
                                        {init}
                                    </div>
                                ))}
                            </div>
                            <span>
                                <span className="text-brand-dark font-semibold">100+ developers</span> ready to start within 48 hours
                            </span>
                        </div>
                    </div>

                    {/* RIGHT — Quick contact channels card */}
                    <div className="lg:col-span-5">
                        <div className="bg-white border border-gray-200 rounded-3xl p-7 md:p-8 relative">
                            {/* Live status */}
                            <div className="flex items-center justify-between mb-7">
                                <div>
                                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-orange mb-1">Quick channels</p>
                                    <h3 className="text-lg font-bold text-brand-dark tracking-tight">Talk to us your way.</h3>
                                </div>
                                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                                    </span>
                                    <span className="text-[10px] font-semibold tracking-widest text-emerald-600 uppercase">Online</span>
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                {/* Email */}
                                <a
                                    href="#"
                                    onClick={(e) => handleQuickContact(e, 'email')}
                                    className="group flex items-center justify-between gap-4 bg-brand-light hover:bg-white border border-gray-200 hover:border-brand-orange rounded-2xl p-4 transition-colors"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-brand-dark truncate">Email us</p>
                                            <p className="text-xs text-gray-500 truncate">
                                                contact<span style={{ display: 'none' }}>.</span>@<span style={{ display: 'none' }}>.</span>stallioni.com
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-mono text-gray-400 tracking-widest flex-shrink-0">COPY →</span>
                                </a>

                                {/* WhatsApp group */}
                                {WHATSAPP_CONTACTS.slice(0, 1).map((contact) => (
                                    <a
                                        key={contact.name}
                                        href="#"
                                        onClick={(e) => handleQuickContact(e, 'whatsapp', contact.url)}
                                        className="group flex items-center justify-between gap-4 bg-brand-light hover:bg-white border border-gray-200 hover:border-brand-orange rounded-2xl p-4 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                                </svg>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-brand-dark truncate">Chat on WhatsApp</p>
                                                <p className="text-xs text-gray-500 truncate">Quick replies from the team</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-400 tracking-widest flex-shrink-0">JOIN →</span>
                                    </a>
                                ))}

                                {/* Teams */}
                                <a
                                    href="#"
                                    onClick={(e) => handleQuickContact(e, 'teams')}
                                    className="group flex items-center justify-between gap-4 bg-brand-light hover:bg-white border border-gray-200 hover:border-brand-orange rounded-2xl p-4 transition-colors"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M13.54,17.22H11.44V12.22H6.24V10.12C6.24,8.4,6.68,7.24,9,7.24h4.51v1.78H9.21c-0.96,0-1.12,0.36-1.12,1.1v2.1h5.45v5ZM21.54,5.73v8.52c0,3.19-2.28,5.47-5.47,5.47H6.68L0,22.5V5.73C0,2.54,2.28,0.26,5.47,0.26h10.6C19.25,0.26,21.54,2.54,21.54,5.73Z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-brand-dark truncate">Microsoft Teams</p>
                                            <p className="text-xs text-gray-500 truncate">For enterprise teams</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-mono text-gray-400 tracking-widest flex-shrink-0">JOIN →</span>
                                </a>
                            </div>

                            {/* Footer trust strip */}
                            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between gap-3">
                                <p className="text-[11px] text-gray-500">
                                    Reply within <span className="text-brand-dark font-semibold">24 hours</span>
                                </p>
                                <div className="flex items-center gap-0.5 text-amber-400">
                                    {[0, 1, 2, 3, 4].map(i => (
                                        <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <span className="text-[11px] text-gray-500 ml-1">4.9 · 978 reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    return (
        <div className="overflow-x-hidden bg-white">
            <HeroSection />
            <PartnerSection />
            <ServicesSection />
            <ClientSuccessSection />
            <FAQSection />
            <CTASection />
        </div>
    );
};

export default HomePage;
