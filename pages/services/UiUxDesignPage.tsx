import React, { useEffect, useState } from 'react';
import FadeIn from '../../components/FadeIn';
import Breadcrumbs from '../../components/Breadcrumbs';
import TechBadge from '../../components/TechBadge';
import { useNavigation, useModal } from '../../App';
import { getServiceDetail } from '../../constants/service-loader';
import type { ServiceDetail } from '../../types';

// ============================================
// Local icons — chosen to match each section's intent
// ============================================
const Icon = {
    Arrow: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    ),
    Research: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    ),
    Wireframe: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v3H4V5zm0 5h7v9H5a1 1 0 01-1-1v-8zm9 0h7v8a1 1 0 01-1 1h-6v-9z" />
        </svg>
    ),
    Palette: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
    ),
    Target: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Heart: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
};

const inferFaqCategory = (q: string): string => {
    const s = q.toLowerCase();
    if (s.includes('how long') || s.includes('timeline') || s.includes('how much time')) return 'Timeline';
    if (s.includes('redesign') || s.includes('existing')) return 'Redesign';
    if (s.includes('design system')) return 'Systems';
    if (s.includes('cost') || s.includes('price') || s.includes('pricing')) return 'Pricing';
    if (s.includes('included') || s.includes('package') || s.includes('deliver')) return 'Package';
    if (s.includes('tool') || s.includes('figma')) return 'Tools';
    if (s.includes('accessib') || s.includes('wcag')) return 'Accessibility';
    return 'General';
};

const Eyebrow: React.FC<{ children: React.ReactNode; tone?: 'dark' | 'light' }> = ({ children, tone = 'dark' }) => (
    <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-px bg-brand-orange" />
        <span className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${tone === 'light' ? 'text-white/80' : 'text-brand-dark'}`}>{children}</span>
    </div>
);

// ============================================
// HERO — magazine split with Figma-canvas visual
// ============================================
const Hero: React.FC<{ openModal: (m: any) => void; navigate: (p: string) => void; }> = ({ openModal, navigate }) => {
    const breadcrumbPath = [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'UI/UX Design' },
    ];

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

                <div className="grid lg:grid-cols-12 gap-x-10 gap-y-12 items-center pt-8 md:pt-10 pb-14 md:pb-20">
                    {/* LEFT — content */}
                    <div className="lg:col-span-7">
                        <div className="inline-flex items-center gap-2 bg-brand-light border border-gray-200 rounded-full pl-1.5 pr-3.5 py-1 mb-5">
                            <span className="bg-brand-dark text-white text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full">UI/UX</span>
                            <span className="text-[12px] text-brand-dark font-medium">Senior Figma designers · WCAG 2.1 AA</span>
                        </div>

                        <h1 className="text-brand-dark font-bold tracking-[-0.035em] leading-[1.05]">
                            <span className="block text-[clamp(1.85rem,3.6vw,3.25rem)]">User-centric design</span>
                            <span className="block text-[clamp(1.85rem,3.6vw,3.25rem)]">
                                that <span className="italic font-medium">drives <span className="relative inline-block text-brand-orange">
                                    conversions.
                                    <svg className="absolute left-0 -bottom-1.5 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                                        <path d="M2 9 Q 50 2 100 7 T 198 6" stroke="#FF6633" strokeWidth="3" strokeLinecap="round" fill="none" />
                                    </svg>
                                </span></span>
                            </span>
                        </h1>

                        <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
                            Research-led wireframes, high-fidelity Figma designs, and conversion-optimised flows — handed off with a complete design system and developer-ready specs.
                        </p>

                        <div className="mt-7 flex flex-col sm:flex-row gap-3">
                            <a
                                href="/contact"
                                onClick={(e) => { e.preventDefault(); openModal('Quote'); }}
                                className="group inline-flex items-center justify-center gap-3 bg-brand-orange text-white font-medium py-3.5 pl-7 pr-3 rounded-full hover:bg-brand-orange-hover transition-colors"
                            >
                                Get a free design audit
                                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <span className="text-brand-orange"><Icon.Arrow /></span>
                                </span>
                            </a>
                            <a
                                href="/portfolio"
                                onClick={(e) => { e.preventDefault(); navigate('/portfolio'); }}
                                className="inline-flex items-center justify-center gap-2 border border-gray-300 text-brand-dark font-medium py-3.5 px-7 rounded-full hover:border-brand-dark hover:bg-brand-light transition-colors"
                            >
                                View design work
                            </a>
                        </div>

                        {/* Inline stat row */}
                        <div className="mt-8 flex flex-wrap items-end gap-x-7 gap-y-4">
                            <div>
                                <p className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">5–20<span className="text-brand-orange">d</span></p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Delivery</p>
                            </div>
                            <div className="border-l border-gray-200 pl-7">
                                <p className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">900<span className="text-brand-orange">+</span></p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Designs shipped</p>
                            </div>
                            <div className="border-l border-gray-200 pl-7">
                                <p className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">4.9<span className="text-brand-orange">/5</span></p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Client rating</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Figma-style canvas mock */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative max-w-[420px] mx-auto lg:mx-0 lg:ml-auto">
                            <div className="absolute -top-3 -right-3 w-full h-full border-2 border-brand-orange rounded-2xl hidden md:block" aria-hidden="true" />

                            <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden" style={{ boxShadow: '0 25px 50px -15px rgba(31, 55, 105, 0.15)' }}>
                                {/* Canvas top bar */}
                                <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-brand-light/60">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                                    </div>
                                    <p className="text-[11px] font-mono text-gray-600 tracking-[0.15em] uppercase">Home · v4 · Figma</p>
                                    <div className="w-12" />
                                </div>

                                {/* Layered design preview */}
                                <div className="p-4">
                                    <div className="space-y-3">
                                        {/* Hero block */}
                                        <div className="relative rounded-xl bg-gradient-to-br from-brand-light to-white border border-gray-100 p-3.5">
                                            <span className="absolute -top-2 -left-1.5 bg-brand-orange text-white text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded">Hero</span>
                                            <div className="h-2 w-1/2 rounded bg-brand-dark/80 mb-2" />
                                            <div className="h-1.5 w-3/4 rounded bg-gray-300 mb-1" />
                                            <div className="h-1.5 w-2/3 rounded bg-gray-300 mb-3" />
                                            <div className="flex gap-1.5">
                                                <span className="h-5 w-16 rounded-full bg-brand-orange" />
                                                <span className="h-5 w-14 rounded-full border border-gray-300" />
                                            </div>
                                        </div>

                                        {/* Components row */}
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                { bg: 'bg-brand-orange/15', dot: 'bg-brand-orange', label: 'Card' },
                                                { bg: 'bg-emerald-100', dot: 'bg-emerald-500', label: 'Stat' },
                                                { bg: 'bg-violet-100', dot: 'bg-violet-500', label: 'Form' },
                                            ].map((c) => (
                                                <div key={c.label} className={`relative rounded-lg ${c.bg} p-2.5 border border-white/60`}>
                                                    <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${c.dot}`} />
                                                    <div className="h-1.5 w-3/5 rounded bg-brand-dark/70 mb-1.5" />
                                                    <div className="h-1 w-full rounded bg-brand-dark/20 mb-1" />
                                                    <div className="h-1 w-4/5 rounded bg-brand-dark/20" />
                                                    <p className="mt-2 text-[9px] font-mono text-brand-dark/60">{c.label}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Color tokens */}
                                        <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-brand-light/40 px-3 py-2">
                                            <p className="text-[9px] font-mono text-gray-500 tracking-widest uppercase mr-1">Tokens</p>
                                            <span className="w-4 h-4 rounded-full bg-brand-dark border border-white" />
                                            <span className="w-4 h-4 rounded-full bg-brand-orange border border-white" />
                                            <span className="w-4 h-4 rounded-full bg-emerald-500 border border-white" />
                                            <span className="w-4 h-4 rounded-full bg-violet-500 border border-white" />
                                            <span className="w-4 h-4 rounded-full bg-amber-400 border border-white" />
                                            <span className="ml-auto text-[10px] font-mono text-gray-400">8/8</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating: conversion lift */}
                            <div className="absolute -left-3 -top-4 md:-left-8 md:top-8 bg-white border border-gray-200 rounded-xl p-3 hidden sm:block" style={{ boxShadow: '0 15px 30px -10px rgba(31, 55, 105, 0.15)' }}>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                        <Icon.Target />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-semibold tracking-widest uppercase text-gray-500 leading-none mb-0.5">Conversion lift</p>
                                        <p className="text-base font-bold text-brand-dark tracking-tight leading-none">+38% <span className="text-[10px] text-gray-500 font-normal">avg.</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating: WCAG */}
                            <div className="absolute -right-3 -bottom-5 md:-right-6 md:bottom-8 bg-brand-dark text-white rounded-xl p-3 hidden sm:block" style={{ boxShadow: '0 15px 30px -10px rgba(31, 55, 105, 0.3)' }}>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-white">
                                        <Icon.Heart />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-semibold tracking-widest uppercase text-white/60 leading-none mb-0.5">Accessible</p>
                                        <p className="text-base font-bold tracking-tight leading-none">WCAG <span className="text-[10px] text-white/60 font-normal">2.1 AA</span></p>
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
const deliverables = [
    {
        title: 'User Research & Competitor Analysis',
        description: 'We study your audience, market, and competitors to design experiences that match real user behaviour — not guesses.',
        icon: <Icon.Research />,
        tags: ['Interviews', 'Journey maps', 'Heuristics'],
    },
    {
        title: 'Wireframes & Interactive Prototypes',
        description: 'Low-fi wireframes that visualise layout, flow and information hierarchy — then clickable prototypes you can test before a pixel is final.',
        icon: <Icon.Wireframe />,
        tags: ['Figma', 'Lo-fi', 'Click-through'],
    },
    {
        title: 'High-Fidelity UI Design',
        description: 'Pixel-perfect screens with brand-aligned colour, typography and component systems — built to scale across your product.',
        icon: <Icon.Palette />,
        tags: ['Design tokens', 'Components', 'Variants'],
    },
    {
        title: 'UX Optimisation for Conversions',
        description: 'We analyse user behaviour across every touchpoint — from homepage to checkout — and re-design what bleeds drop-off.',
        icon: <Icon.Target />,
        tags: ['CRO', 'A/B ready', 'Funnel audit'],
    },
];

const WhatWeDeliver: React.FC = () => (
    <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-[1400px]">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
                <div className="max-w-2xl">
                    <Eyebrow>What we deliver</Eyebrow>
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-dark tracking-[-0.025em] leading-[1.1]">
                        End-to-end design, <span className="text-brand-orange">handed off ready to ship.</span>
                    </h2>
                    <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-xl">
                        From the first user interview to the final developer hand-off — one team, one Figma, one outcome.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 flex-shrink-0">
                    {['User-centred', 'Conversion-led', 'WCAG 2.1 AA'].map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1.5 bg-brand-light border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-brand-dark">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {deliverables.map((item, i) => (
                    <FadeIn key={item.title} delay={i * 60}>
                        <div className="group relative h-full bg-white border border-gray-200 rounded-2xl p-6 hover:border-brand-dark transition-colors flex gap-5">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 rounded-2xl bg-brand-light text-brand-dark flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                    {item.icon}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col">
                                <h3 className="text-lg md:text-xl font-bold text-brand-dark tracking-tight leading-tight group-hover:text-brand-orange transition-colors mb-1.5">
                                    {item.title}
                                </h3>
                                <p className="text-[13.5px] text-gray-600 leading-relaxed mb-4">
                                    {item.description}
                                </p>
                                <div className="mt-auto flex flex-wrap gap-1.5">
                                    {item.tags.map((t) => (
                                        <span key={t} className="inline-flex items-center bg-brand-light rounded-md px-2.5 py-1 text-[12px] font-medium text-gray-700">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>

            <FadeIn delay={200}>
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 bg-brand-light rounded-2xl border border-gray-200">
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500 flex-shrink-0">
                        Built with
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Framer', 'Maze'].map((name) => (
                            <TechBadge key={name} name={name} />
                        ))}
                    </div>
                </div>
            </FadeIn>
        </div>
    </section>
);

// ============================================
// FAQ — home-page style: grid of always-visible cards
// ============================================
const FAQ: React.FC<{ faqs: { question: string; answer: string }[] }> = ({ faqs }) => (
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
                        Answers to your <span className="text-brand-orange">design questions.</span>
                    </h2>
                </div>

                {/* Quick stat — inline */}
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

            {/* FAQ grid */}
            <div className="grid md:grid-cols-2 gap-3 mb-5">
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

// ============================================
// CTA — compact horizontal band (distinct from home-page CTA)
// ============================================
const FinalCTA: React.FC<{ openModal: (m: any) => void; navigate: (p: string) => void; }> = ({ openModal, navigate }) => (
    <section className="bg-white py-10 md:py-12">
        <div className="container mx-auto px-6 max-w-[1400px]">
            <div className="relative bg-brand-dark text-white rounded-2xl overflow-hidden px-6 md:px-10 py-6 md:py-7">
                {/* Subtle orange corner accent */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-brand-orange/20" aria-hidden="true" />
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-brand-orange/40" aria-hidden="true" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    <div className="flex items-start gap-4 max-w-2xl">
                        <span className="hidden sm:flex w-10 h-10 rounded-xl bg-brand-orange text-white items-center justify-center flex-shrink-0">
                            <Icon.Palette />
                        </span>
                        <div>
                            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-orange mb-1">Free design audit</p>
                            <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-snug">
                                Want a product users <span className="text-brand-orange">actually love?</span>
                            </h2>
                            <p className="text-white/60 text-sm mt-1.5">
                                Send us your product — we'll flag the 3 biggest friction points, free.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
                        <a
                            href="/contact"
                            onClick={(e) => { e.preventDefault(); openModal('Quote'); }}
                            className="group inline-flex items-center justify-center gap-2 bg-brand-orange text-white text-sm font-medium py-2.5 pl-5 pr-2 rounded-full hover:bg-brand-orange-hover transition-colors"
                        >
                            Get free audit
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

// ============================================
// MAIN
// ============================================
const UiUxDesignPage: React.FC = () => {
    const { navigate } = useNavigation();
    const { openModal } = useModal();
    const [service, setService] = useState<ServiceDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            const s = await getServiceDetail('ui-ux-design');
            if (!cancelled) {
                setService(s || null);
                setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-brand-orange border-t-transparent mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">Loading…</p>
                </div>
            </div>
        );
    }

    const faqs = service?.faqs && service.faqs.length > 0 ? service.faqs : [
        { question: 'What is included in your UI/UX design package?', answer: 'Wireframes, user flows, page designs, interactions, and design system components — handed off in Figma with developer-ready specs.' },
        { question: 'How long does UI/UX design take?', answer: 'Normally 5–20 days depending on the number of screens, research depth and number of revision rounds.' },
        { question: 'Do you redesign existing products?', answer: 'Yes — we run a heuristic audit, identify the biggest friction points, then redesign the highest-impact flows first.' },
        { question: 'Can you build the design system too?', answer: 'Absolutely. Most of our engagements include a Figma component library with tokens, variants and documentation.' },
    ];

    return (
        <div className="overflow-x-hidden bg-white">
            <Hero openModal={openModal} navigate={navigate} />
            <WhatWeDeliver />
            <FAQ faqs={faqs} />
            <FinalCTA openModal={openModal} navigate={navigate} />
        </div>
    );
};

export default UiUxDesignPage;
