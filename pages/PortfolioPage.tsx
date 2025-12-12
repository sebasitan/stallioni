import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { PortfolioCategory, Industry, PortfolioItem } from '../types';
import FadeIn from '../components/FadeIn';

const PageHeader: React.FC = () => (
    <div className="relative bg-brand-dark overflow-hidden py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 top-0 left-0"></div>
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 container mx-auto px-6">
            <FadeIn>
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-brand-orange font-bold text-sm tracking-wide uppercase mb-6">
                    Our Work
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
                    Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">Success Stories</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
                    Driving growth from Fintech to Healthcare. Explore case studies that prove our capability to deliver tangible business value for our international partners.
                </p>
            </FadeIn>
        </div>
    </div>
);

const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
        <div className="relative overflow-hidden h-60">
            <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/0 transition-colors duration-300 z-10 pointer-events-none"></div>
            <img src={item.imageUrl} alt={item.title} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 right-4 z-20">
                <span className="bg-white/90 backdrop-blur-md text-brand-dark text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm border border-slate-200">
                    {item.category}
                </span>
            </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{item.industry}</p>
            </div>

            <h3 className="text-2xl font-bold text-brand-dark mb-3 group-hover:text-brand-orange transition-colors duration-200">
                {item.title}
            </h3>

            <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
                {item.description}
            </p>

            <div className="space-y-4 mt-auto">
                <div className="flex flex-wrap gap-2">
                    {item.technologies.slice(0, 4).map(tech => (
                        <span key={tech} className="bg-slate-50 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-100">
                            {tech}
                        </span>
                    ))}
                    {item.technologies.length > 4 && (
                        <span className="text-xs text-slate-400 py-1 px-1">+{item.technologies.length - 4} more</span>
                    )}
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <blockquote className="italic text-slate-600 text-sm bg-brand-light/50 p-3 rounded-lg border-l-2 border-brand-orange">
                        "{item.testimonial}"
                        <footer className="mt-2 text-xs font-bold text-brand-dark not-italic flex items-center gap-1 justify-end">
                            <span>— Client in {item.clientLocation}</span>
                            <img src={`https://flagcdn.com/20x15/${getCountryCode(item.clientLocation)}.png`} alt="flag" className="h-3 ml-1 rounded-sm opacity-80" onError={(e) => e.currentTarget.style.display = 'none'} />
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    </div>
);

// Helper for flags (simple mapping, fallback handled by onError)
const getCountryCode = (location: string) => {
    const loc = location.toLowerCase();
    if (loc.includes('usa') || loc.includes('us')) return 'us';
    if (loc.includes('uk') || loc.includes('kingdom')) return 'gb';
    if (loc.includes('uae') || loc.includes('dubai')) return 'ae';
    if (loc.includes('australia')) return 'au';
    if (loc.includes('india')) return 'in';
    if (loc.includes('canada')) return 'ca';
    if (loc.includes('germany')) return 'de';
    return 'un';
};

// New Dropdown Component for Top Filters
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all text-sm font-semibold whitespace-nowrap ${selected.length > 0
                        ? 'bg-brand-orange text-white border-brand-orange hover:bg-opacity-90 shadow-md'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-brand-orange hover:text-brand-orange'
                    }`}
            >
                <span>{label}</span>
                {selected.length > 0 && (
                    <span className="bg-white text-brand-orange text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {selected.length}
                    </span>
                )}
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 z-50 animate-fade-in p-2">
                    <div className="max-h-64 overflow-y-auto no-scrollbar space-y-1">
                        {options.map(option => (
                            <label key={option} className="flex items-center space-x-3 px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${selected.includes(option) ? 'bg-brand-orange border-brand-orange' : 'border-slate-300 bg-white'}`}>
                                    {selected.includes(option) && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                </div>
                                <span className={`text-sm text-slate-700 ${selected.includes(option) ? 'font-semibold' : ''}`}>{option}</span>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={selected.includes(option)}
                                    onChange={() => onChange(option)}
                                />
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const PortfolioPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        category: 'All' as 'All' | PortfolioCategory,
        industries: [] as Industry[],
        technologies: [] as string[],
    });

    const categoryFilters: ('All' | PortfolioCategory)[] = ['All', ...Object.values(PortfolioCategory)];
    const availableIndustries = useMemo(() => [...new Set(PORTFOLIO_ITEMS.map(item => item.industry))].sort(), []);
    const availableTechnologies = useMemo(() => [...new Set(PORTFOLIO_ITEMS.flatMap(item => item.technologies))].sort(), []);

    const filteredItems = useMemo(() => {
        return PORTFOLIO_ITEMS.filter(item => {
            const matchesSearch = searchQuery === '' ||
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

            const categoryMatch = filters.category === 'All' || item.category === filters.category;
            const industryMatch = filters.industries.length === 0 || filters.industries.includes(item.industry);
            const technologyMatch = filters.technologies.length === 0 || item.technologies.some(tech => filters.technologies.includes(tech));

            return matchesSearch && categoryMatch && industryMatch && technologyMatch;
        });
    }, [filters, searchQuery]);

    const handleCategoryChange = (category: 'All' | PortfolioCategory) => {
        setFilters(prev => ({ ...prev, category }));
    };

    const handleIndustryChange = (industry: string) => {
        setFilters(prev => {
            const newIndustries = prev.industries.includes(industry as Industry)
                ? prev.industries.filter(i => i !== industry)
                : [...prev.industries, industry as Industry];
            return { ...prev, industries: newIndustries };
        });
    };

    const handleTechnologyChange = (tech: string) => {
        setFilters(prev => {
            const newTechs = prev.technologies.includes(tech)
                ? prev.technologies.filter(t => t !== tech)
                : [...prev.technologies, tech];
            return { ...prev, technologies: newTechs };
        });
    };

    const clearFilters = () => {
        setFilters({ category: 'All', industries: [], technologies: [] });
        setSearchQuery('');
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <PageHeader />

            {/* Unified Top Control Bar */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm transition-all duration-300">
                <div className="container mx-auto px-6 py-6 space-y-6">

                    {/* Top Row: Categories & Search */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                        {/* Categories (Horizontal Scroll) */}
                        <div className="overflow-x-auto pb-2 lg:pb-0 no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
                            <div className="flex space-x-2">
                                {categoryFilters.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => handleCategoryChange(cat)}
                                        className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${filters.category === cat
                                                ? 'bg-brand-dark text-white shadow-md transform scale-105'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-brand-dark'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full lg:w-96 flex-shrink-0 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-slate-400 group-focus-within:text-brand-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all duration-200"
                                placeholder="Search by name, tech, or keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Bottom Row: Detailed Filters */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mr-2">Filter By:</span>

                        <FilterDropdown
                            label="Industry"
                            options={availableIndustries}
                            selected={filters.industries}
                            onChange={handleIndustryChange}
                        />

                        <FilterDropdown
                            label="Technology"
                            options={availableTechnologies}
                            selected={filters.technologies}
                            onChange={handleTechnologyChange}
                        />

                        {(filters.industries.length > 0 || filters.technologies.length > 0 || filters.category !== 'All' || searchQuery) && (
                            <button
                                onClick={clearFilters}
                                className="ml-auto text-sm font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-red-50"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                Clear All
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <section className="py-12 md:py-16">
                <div className="container mx-auto px-6 max-w-screen-xl">
                    <div className="flex flex-col">
                        <main className="w-full">

                            {filteredItems.length > 0 ? (
                                <>
                                    <p className="text-slate-500 mb-6 font-medium">Found <span className="text-brand-dark font-bold">{filteredItems.length}</span> success stories</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                                        {filteredItems.map((item, index) => (
                                            <FadeIn key={item.id} delay={index * 50}>
                                                <PortfolioCard item={item} />
                                            </FadeIn>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <FadeIn>
                                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm text-center px-4">
                                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                            <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-brand-dark mb-3">No Projects Found</h3>
                                        <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg">
                                            We couldn't find any case studies matching your criteria. Try adjusting keywords or clearing some filters.
                                        </p>
                                        <button
                                            onClick={clearFilters}
                                            className="px-8 py-3 bg-brand-orange text-white rounded-full font-bold hover:shadow-lg hover:bg-opacity-90 transition-all transform hover:-translate-y-1"
                                        >
                                            Clear All Filters
                                        </button>
                                    </div>
                                </FadeIn>
                            )}
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PortfolioPage;
