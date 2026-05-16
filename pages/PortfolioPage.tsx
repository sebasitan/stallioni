import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PortfolioCategory, Industry, PortfolioItem } from '../types';
import FadeIn from '../components/FadeIn';
import { getPortfolioItems } from '../utils/portfolioStorage';
import { useNavigation, useModal } from '../App';

// ============================================
// Helpers
// ============================================
const getCountryCode = (location: string = ''): string => {
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

const Icon = {
    Arrow: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    ),
    Search: () => (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    ),
    Chevron: ({ open }: { open: boolean }) => (
        <svg className={`w-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    ),
    Check: () => (
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    ),
    Star: () => (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    ),
    Quote: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.352 4C4.456 7.456 1 13.064 1 19.96c0 5.488 3.32 8.696 7.16 8.696 3.696 0 6.44-2.832 6.44-6.336 0-3.376-2.456-5.84-5.696-5.84-.656 0-1.448.144-1.648.288.512-3.36 3.696-7.224 6.88-9.16L9.352 4z" />
        </svg>
    ),
};

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-px bg-brand-orange" />
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-dark">{children}</span>
    </div>
);

// ============================================
// HERO — magazine split with project count stats
// ============================================
const Hero: React.FC<{ total: number; items: PortfolioItem[] }> = ({ total, items }) => {
    const previewItems = items.slice(0, 4);
    return (
        <section className="relative bg-white overflow-hidden border-b border-gray-100">
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                aria-hidden="true"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #1F3769 1px, transparent 0)',
                    backgroundSize: '32px 32px',
                }}
            />
            <div className="container mx-auto px-6 max-w-[1400px] relative">
                <div className="grid lg:grid-cols-12 gap-x-10 gap-y-10 items-center pt-12 md:pt-14 pb-14 md:pb-16">
                    {/* LEFT — content */}
                    <div className="lg:col-span-7">
                        <div className="inline-flex items-center gap-2 bg-brand-light border border-gray-200 rounded-full pl-1.5 pr-3.5 py-1 mb-5">
                            <span className="bg-brand-dark text-white text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full">Portfolio</span>
                            <span className="text-[12px] text-brand-dark font-medium">{total}+ projects across 35+ countries</span>
                        </div>

                        <h1 className="text-brand-dark font-bold tracking-[-0.03em] leading-[1.05] text-[clamp(1.75rem,3.5vw,3.25rem)]">
                            Global success stories, <br className="hidden md:block" />
                            <span className="text-brand-orange">delivered.</span>
                        </h1>

                        <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
                            Driving growth from <span className="font-semibold text-brand-dark">Fintech to Healthcare</span> — case studies that prove our capability to deliver tangible business value for international partners.
                        </p>

                        {/* Inline stats */}
                        <div className="mt-7 flex flex-wrap items-end gap-x-4 sm:gap-x-7 gap-y-4">
                            <div>
                                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">{total}<span className="text-brand-orange">+</span></p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Projects</p>
                            </div>
                            <div className="border-l border-gray-200 pl-4 sm:pl-7">
                                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">35<span className="text-brand-orange">+</span></p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Countries</p>
                            </div>
                            <div className="border-l border-gray-200 pl-4 sm:pl-7">
                                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">4.9<span className="text-brand-orange">/5</span></p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Rating</p>
                            </div>
                            <div className="border-l border-gray-200 pl-4 sm:pl-7">
                                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">15<span className="text-brand-orange">+</span></p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Years</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — preview stack */}
                    {previewItems.length > 0 && (
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
                                        <div className="flex items-center gap-1.5">
                                            <span className="relative flex h-1.5 w-1.5">
                                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                                            </span>
                                            <p className="text-[11px] font-mono text-gray-600 tracking-[0.15em] uppercase">Live · Showcase</p>
                                        </div>
                                        <div className="w-12" />
                                    </div>

                                    <div className="p-3.5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <p className="text-[9px] font-semibold tracking-widest uppercase text-brand-orange leading-none mb-1">Featured</p>
                                                <h3 className="text-sm font-bold text-brand-dark leading-none">Recent Builds</h3>
                                            </div>
                                            <span className="text-[10px] font-mono text-gray-400">04 / {total}+</span>
                                        </div>

                                        <div className="space-y-1.5">
                                            {previewItems.map((p) => (
                                                <div key={p.id} className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-brand-light transition-colors border border-transparent hover:border-gray-100">
                                                    <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                        <img
                                                            src={p.imageUrl}
                                                            alt=""
                                                            loading="lazy"
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-semibold text-brand-dark truncate leading-tight">{p.title}</p>
                                                        <p className="text-[10px] text-gray-500 font-mono truncate leading-tight mt-0.5">{p.category} · {p.industry}</p>
                                                    </div>
                                                    <img
                                                        src={`https://flagcdn.com/w40/${getCountryCode(p.clientLocation)}.png`}
                                                        alt=""
                                                        className="w-4 h-4 rounded-full object-cover flex-shrink-0"
                                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Floating: ratings */}
                                <div className="absolute -left-3 -top-4 md:-left-8 md:top-8 bg-white border border-gray-200 rounded-xl p-3 hidden sm:block" style={{ boxShadow: '0 15px 30px -10px rgba(31, 55, 105, 0.15)' }}>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-500 flex items-center justify-center">
                                            <Icon.Star />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-semibold tracking-widest uppercase text-gray-500 leading-none mb-0.5">Client rating</p>
                                            <p className="text-base font-bold text-brand-dark tracking-tight leading-none">4.9 <span className="text-[10px] text-gray-500 font-normal">/ 5</span></p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating: delivery */}
                                <div className="absolute -right-3 -bottom-5 md:-right-6 md:bottom-8 bg-brand-dark text-white rounded-xl p-3 hidden sm:block" style={{ boxShadow: '0 15px 30px -10px rgba(31, 55, 105, 0.3)' }}>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-white">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-semibold tracking-widest uppercase text-white/60 leading-none mb-0.5">Recent</p>
                                            <p className="text-base font-bold tracking-tight leading-none">{total} <span className="text-[10px] text-white/60 font-normal">projects</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

// ============================================
// FILTER DROPDOWN — rounded-full styling
// ============================================
const FilterDropdown: React.FC<{
    label: string;
    options: string[];
    selected: string[];
    onChange: (option: string) => void;
}> = ({ label, options, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors text-sm font-medium whitespace-nowrap outline-none ${
                    selected.length > 0
                        ? 'bg-brand-dark text-white border-brand-dark hover:bg-brand-dark-hover'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-brand-dark'
                }`}
            >
                <span>{label}</span>
                {selected.length > 0 && (
                    <span className="bg-brand-orange text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                        {selected.length}
                    </span>
                )}
                <Icon.Chevron open={isOpen} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 w-[min(18rem,calc(100vw-2rem))] bg-white rounded-2xl border border-gray-200 z-50 p-2" style={{ boxShadow: '0 20px 50px -12px rgba(31, 55, 105, 0.18)' }}>
                    <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                        {options.map((option) => {
                            const checked = selected.includes(option);
                            return (
                                <label key={option} className="flex items-center gap-3 px-3 py-2 hover:bg-brand-light rounded-lg cursor-pointer transition-colors">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${checked ? 'bg-brand-orange border-brand-orange' : 'border-gray-300 bg-white'}`}>
                                        {checked && <Icon.Check />}
                                    </div>
                                    <span className={`text-sm ${checked ? 'font-semibold text-brand-dark' : 'text-gray-700'}`}>{option}</span>
                                    <input type="checkbox" className="hidden" checked={checked} onChange={() => onChange(option)} />
                                </label>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

// ============================================
// FEATURED PROJECT — magazine spotlight (first result)
// ============================================
const FeaturedProjectCard: React.FC<{ item: PortfolioItem }> = ({ item }) => (
    <article className="bg-brand-dark text-white rounded-3xl overflow-hidden relative">
        <div className="grid lg:grid-cols-12 gap-0">
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] overflow-hidden bg-brand-light">
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-5 left-5 flex flex-col gap-2 items-start">
                    <span className="bg-brand-orange text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        Featured Case Study
                    </span>
                    <span className="bg-white/95 backdrop-blur text-brand-dark text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {item.category}
                    </span>
                </div>
                <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full pl-1.5 pr-3 py-1">
                    <img
                        src={`https://flagcdn.com/w40/${getCountryCode(item.clientLocation)}.png`}
                        alt=""
                        className="w-5 h-5 rounded-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="text-[11px] font-medium text-white">{item.clientLocation || 'Global'}</span>
                </div>
            </div>

            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-orange">{item.industry}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50">Success Story</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold leading-[1.1] tracking-tight mb-4">{item.title}</h2>
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">{item.description}</p>

                {item.testimonial && (
                    <blockquote className="relative pl-6 border-l-2 border-brand-orange my-2">
                        <span className="absolute -left-1 -top-2 w-5 h-5 text-brand-orange"><Icon.Quote /></span>
                        <p className="text-white/90 italic text-base md:text-lg leading-relaxed mb-3">"{item.testimonial}"</p>
                        <div className="flex items-center gap-1 text-amber-400">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <span key={i} className="w-3 h-3"><Icon.Star /></span>
                            ))}
                            <span className="text-[11px] text-white/60 ml-2 not-italic font-medium">Verified Client</span>
                        </div>
                    </blockquote>
                )}

                {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-6">
                        {item.technologies.slice(0, 6).map((tech) => (
                            <span key={tech} className="bg-white/5 border border-white/10 text-white/80 text-[11px] px-3 py-1 rounded-md">{tech}</span>
                        ))}
                        {item.technologies.length > 6 && (
                            <span className="text-[11px] text-white/40 px-2 py-1 font-medium">+{item.technologies.length - 6}</span>
                        )}
                    </div>
                )}

                {item.projectUrl && (
                    <a
                        href={item.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors w-fit"
                    >
                        Visit live site
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                )}
            </div>
        </div>
    </article>
);

// ============================================
// PROJECT CARD — secondary cards
// ============================================
const ProjectCard: React.FC<{ item: PortfolioItem }> = ({ item }) => (
    <article className="group bg-white rounded-2xl border border-gray-200 hover:border-brand-dark overflow-hidden transition-colors h-full flex flex-col">
        <div className="relative h-52 overflow-hidden bg-gray-100">
            <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-3 left-3 bg-white text-brand-dark text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
                {item.category}
            </span>
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full pl-1 pr-2.5 py-0.5">
                <img
                    src={`https://flagcdn.com/w40/${getCountryCode(item.clientLocation)}.png`}
                    alt=""
                    className="w-4 h-4 rounded-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="text-[10px] font-medium text-white">{item.clientLocation || 'Global'}</span>
            </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-orange mb-2">{item.industry}</p>

            <h3 className="text-lg font-bold text-brand-dark leading-snug tracking-tight mb-2 group-hover:text-brand-orange transition-colors line-clamp-2">
                {item.title}
            </h3>

            <p className="text-gray-600 text-[13.5px] leading-relaxed mb-4 line-clamp-3 flex-grow">{item.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
                {item.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="bg-brand-light text-gray-700 text-[11px] font-medium px-2.5 py-0.5 rounded">{tech}</span>
                ))}
                {item.technologies.length > 4 && (
                    <span className="text-[11px] text-gray-400 px-1 py-0.5 font-medium">+{item.technologies.length - 4}</span>
                )}
            </div>

            {item.testimonial && (
                <blockquote className="mt-auto pt-4 border-t border-gray-100">
                    <p className="text-[12.5px] text-gray-500 italic leading-relaxed line-clamp-2">"{item.testimonial}"</p>
                </blockquote>
            )}
        </div>
    </article>
);

// ============================================
// FINAL CTA — compact band
// ============================================
const FinalCTA: React.FC = () => {
    const { navigate } = useNavigation();
    const { openModal } = useModal();
    return (
        <section className="bg-white py-12 md:py-14">
            <div className="container mx-auto px-6 max-w-[1400px]">
                <div className="relative bg-brand-dark text-white rounded-2xl overflow-hidden px-6 md:px-10 py-6 md:py-7">
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-brand-orange/20" aria-hidden="true" />
                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-brand-orange/40" aria-hidden="true" />

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                        <div className="max-w-2xl">
                            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-orange mb-1">Your project, next</p>
                            <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-snug">
                                Want to be our <span className="text-brand-orange">next success story?</span>
                            </h2>
                            <p className="text-white/60 text-sm mt-1.5">Tell us your goals — we'll scope and price it in 24 hours.</p>
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
// MAIN
// ============================================
const PortfolioPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        category: 'All' as 'All' | PortfolioCategory,
        industries: [] as Industry[],
        technologies: [] as string[],
    });
    const [allItems, setAllItems] = useState<PortfolioItem[]>([]);

    useEffect(() => {
        setAllItems(getPortfolioItems());
    }, []);

    // Only surface categories that actually have at least one project — avoids
    // dead filters that lead to "No projects found".
    const categoryFilters = useMemo<('All' | PortfolioCategory)[]>(() => {
        const present = new Set(allItems.map((i) => i.category));
        return ['All', ...Object.values(PortfolioCategory).filter((c) => present.has(c))];
    }, [allItems]);
    const availableIndustries = useMemo(() => [...new Set(allItems.map((i) => i.industry).filter(Boolean))].sort(), [allItems]);
    const availableTechnologies = useMemo(() => [...new Set(allItems.flatMap((i) => i.technologies || []).filter(Boolean))].sort(), [allItems]);

    const filteredItems = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return allItems.filter((item) => {
            const matchesSearch = q === '' ||
                item.title?.toLowerCase().includes(q) ||
                item.description?.toLowerCase().includes(q) ||
                item.technologies?.some((t) => t.toLowerCase().includes(q));

            const categoryMatch = filters.category === 'All' || item.category === filters.category;
            const industryMatch = filters.industries.length === 0 || filters.industries.includes(item.industry);
            const technologyMatch = filters.technologies.length === 0 || item.technologies.some((tech) => filters.technologies.includes(tech));

            return matchesSearch && categoryMatch && industryMatch && technologyMatch;
        });
    }, [filters, searchQuery, allItems]);

    const handleCategoryChange = (category: 'All' | PortfolioCategory) => {
        setFilters((p) => ({ ...p, category }));
    };

    const handleIndustryChange = (industry: string) => {
        setFilters((p) => {
            const next = p.industries.includes(industry as Industry)
                ? p.industries.filter((i) => i !== industry)
                : [...p.industries, industry as Industry];
            return { ...p, industries: next };
        });
    };

    const handleTechnologyChange = (tech: string) => {
        setFilters((p) => {
            const next = p.technologies.includes(tech) ? p.technologies.filter((t) => t !== tech) : [...p.technologies, tech];
            return { ...p, technologies: next };
        });
    };

    const clearFilters = () => {
        setFilters({ category: 'All', industries: [], technologies: [] });
        setSearchQuery('');
    };

    const hasActiveFilters = filters.category !== 'All' || filters.industries.length > 0 || filters.technologies.length > 0 || searchQuery !== '';
    const featured = filteredItems[0];
    const rest = filteredItems.slice(1);

    return (
        <div className="bg-white min-h-screen">
            <Hero total={allItems.length} items={allItems} />

            {/* STICKY FILTER BAR */}
            <div className="sticky top-[67px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-6 max-w-[1400px] py-4">
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                        {/* Category pill segment */}
                        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-brand-light/60 border border-gray-200/80 rounded-full p-1 max-w-full">
                            {categoryFilters.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium tracking-tight whitespace-nowrap transition-all duration-200 ${
                                        filters.category === cat
                                            ? 'bg-brand-dark text-white shadow-sm'
                                            : 'text-gray-700 hover:text-brand-dark hover:bg-white'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search + dropdowns */}
                        <div className="flex flex-col md:flex-row gap-2.5 items-start md:items-center">
                            <div className="relative w-full md:w-64">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Icon.Search />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full bg-white placeholder-gray-400 focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-colors text-base sm:text-sm"
                                    placeholder="Search projects…"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    aria-label="Search projects"
                                />
                            </div>

                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <FilterDropdown label="Industry" options={availableIndustries} selected={filters.industries} onChange={handleIndustryChange} />
                                <FilterDropdown label="Technology" options={availableTechnologies} selected={filters.technologies} onChange={handleTechnologyChange} />
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm font-medium text-gray-500 hover:text-brand-orange transition-colors px-2"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <section className="py-12 md:py-16 bg-brand-light">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    {filteredItems.length > 0 ? (
                        <>
                            <div className="flex items-center justify-between mb-8">
                                <p className="text-sm text-gray-500">
                                    Showing <span className="text-brand-dark font-semibold">{filteredItems.length}</span> {filteredItems.length === 1 ? 'project' : 'projects'}
                                    {hasActiveFilters && <span className="text-gray-400"> · filtered</span>}
                                </p>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange hover:text-brand-orange-hover transition-colors"
                                    >
                                        Reset
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {featured && (
                                <FadeIn>
                                    <div className="mb-5">
                                        <FeaturedProjectCard item={featured} />
                                    </div>
                                </FadeIn>
                            )}

                            {rest.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                    {rest.map((item, index) => (
                                        <FadeIn key={item.id} delay={Math.min(index * 50, 400)}>
                                            <ProjectCard item={item} />
                                        </FadeIn>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <FadeIn>
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 text-center px-4">
                                <div className="w-14 h-14 bg-brand-light rounded-full flex items-center justify-center mb-5 text-gray-400">
                                    <Icon.Search />
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-2 tracking-tight">No projects found</h3>
                                <p className="text-gray-500 max-w-md mx-auto mb-6">Try adjusting your search query or filters.</p>
                                <button
                                    onClick={clearFilters}
                                    className="inline-flex items-center justify-center gap-2 bg-brand-dark text-white text-sm font-semibold py-2.5 px-5 rounded-full hover:bg-brand-dark-hover transition-colors"
                                >
                                    Reset filters
                                </button>
                            </div>
                        </FadeIn>
                    )}
                </div>
            </section>

            <FinalCTA />
        </div>
    );
};

export default PortfolioPage;
