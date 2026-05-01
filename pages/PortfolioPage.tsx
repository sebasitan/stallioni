import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PortfolioCategory, Industry, PortfolioItem } from '../types';
import FadeIn from '../components/FadeIn';
import { getPortfolioItems } from '../utils/portfolioStorage';

const PageHeader: React.FC = () => (
    <div className="relative bg-brand-dark pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden text-center">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] bg-brand-orange/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
            <FadeIn>
                <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-brand-orange text-sm font-bold tracking-wider mb-6">
                    OUR WORK
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                    Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-400">Success Stories</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
                    Driving growth from Fintech to Healthcare. Explore case studies that prove our capability to deliver tangible business value for our international partners.
                </p>
            </FadeIn>
        </div>
    </div>
);

const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => (
    <div className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
        <div className="relative h-64 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-4 right-4 z-20">
                <span className="bg-white/90 backdrop-blur-md text-brand-dark text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm border border-slate-200">
                    {item.category}
                </span>
            </div>
            <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 text-white font-bold flex items-center gap-2">
                <span>View Case Study</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
        </div>

        <div className="p-8 flex flex-col flex-grow">
            <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">{item.industry}</span>
            </div>

            <h3 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-orange transition-colors duration-300">
                {item.title}
            </h3>

            <p className="text-slate-600 mb-8 flex-grow leading-relaxed">
                {item.description}
            </p>

            <div className="pt-6 border-t border-slate-100">
                <div className="flex flex-wrap gap-2 mb-6">
                    {item.technologies.slice(0, 4).map(tech => (
                        <span key={tech} className="bg-slate-50 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full border border-slate-200">
                            {tech}
                        </span>
                    ))}
                    {item.technologies.length > 4 && (
                        <span className="text-xs text-slate-400 py-1 px-1 font-semibold">+{item.technologies.length - 4}</span>
                    )}
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                    <svg className="absolute top-4 left-4 w-6 h-6 text-brand-orange/20 rotate-180" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.0547 15.372 14.8125 17.0679 14.4766C17.4722 14.3945 17.8486 14.3555 18.2393 14.3555V11.2305C15.8242 11.2305 14.017 13.0469 14.017 15.332V21H14.017ZM6.83984 21L6.83984 18C6.83984 16.0547 8.19629 14.8125 9.8916 14.4766C10.2959 14.3945 10.6724 14.3555 11.062 14.3555V11.2305C8.64746 11.2305 6.83984 13.0469 6.83984 15.332V21H6.83984Z" /></svg>
                    <p className="italic text-slate-600 text-sm pl-8">
                        "{item.testimonial}"
                    </p>
                    <div className="mt-3 flex items-center justify-end gap-2 pl-8">
                        <span className="text-xs font-bold text-brand-dark">— Client in {item.clientLocation}</span>
                        <img src={`https://flagcdn.com/20x15/${getCountryCode(item.clientLocation)}.png`} alt="flag" className="h-3 rounded-sm opacity-80" onError={(e) => e.currentTarget.style.display = 'none'} />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Helper for flags
const getCountryCode = (location: string) => {
    const loc = location.toLowerCase();
    if (loc.includes('usa') || loc.includes('us')) return 'us';
    if (loc.includes('uk') || loc.includes('kingdom')) return 'gb';
    if (loc.includes('uae') || loc.includes('dubai')) return 'ae';
    if (loc.includes('australia')) return 'au';
    if (loc.includes('india')) return 'in';
    if (loc.includes('canada')) return 'ca';
    if (loc.includes('germany')) return 'de';
    if (loc.includes('france')) return 'fr';
    return 'un';
};

// Modern Filter Dropdown
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
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all text-sm font-semibold whitespace-nowrap outline-none ${selected.length > 0
                    ? 'bg-brand-dark text-white border-brand-dark shadow-md'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-brand-orange hover:text-brand-orange'
                    }`}
            >
                <span>{label}</span>
                {selected.length > 0 && (
                    <span className="bg-brand-orange text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {selected.length}
                    </span>
                )}
                <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 p-2 transform origin-top animate-fade-in">
                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-1">
                        {options.map(option => (
                            <label key={option} className="flex items-center space-x-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group">
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${selected.includes(option) ? 'bg-brand-orange border-brand-orange' : 'border-slate-300 bg-white group-hover:border-brand-orange'}`}>
                                    {selected.includes(option) && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                </div>
                                <span className={`text-sm ${selected.includes(option) ? 'font-bold text-brand-dark' : 'text-slate-600 group-hover:text-brand-dark'}`}>{option}</span>
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
    const [allItems, setAllItems] = useState<PortfolioItem[]>([]);

    useEffect(() => {
        // combine static items with dynamic items from local storage
        const dynamicItems = getPortfolioItems();
        setAllItems(dynamicItems);
    }, []);

    const categoryFilters: ('All' | PortfolioCategory)[] = ['All', ...Object.values(PortfolioCategory)];
    const availableIndustries = useMemo(() => [...new Set(allItems.map(item => item.industry).filter(Boolean))].sort(), [allItems]);
    const availableTechnologies = useMemo(() => [...new Set(allItems.flatMap(item => item.technologies || []).filter(Boolean))].sort(), [allItems]);

    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const matchesSearch = searchQuery === '' ||
                (item.title?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.technologies?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

            const categoryMatch = filters.category === 'All' || item.category === filters.category;
            const industryMatch = filters.industries.length === 0 || filters.industries.includes(item.industry);
            const technologyMatch = filters.technologies.length === 0 || item.technologies.some(tech => filters.technologies.includes(tech));

            return matchesSearch && categoryMatch && industryMatch && technologyMatch;
        });
    }, [filters, searchQuery, allItems]);

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

    // Calculate dynamic delay for improved staggered animation
    const getDelay = (index: number) => Math.min(index * 100, 1000);

    return (
        <div className="bg-slate-50 min-h-screen">
            <PageHeader />

            {/* Sticky Filter Bar */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-6 py-6 lg:py-4">
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">

                        {/* Top: Categories */}
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 xl:pb-0">
                            {categoryFilters.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${filters.category === cat
                                        ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-brand-dark'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Bottom/Right: Search & Filters */}
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                            <div className="relative w-full md:w-80 group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-slate-400 group-focus-within:text-brand-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-12 pr-4 py-2.5 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all duration-200 font-medium"
                                    placeholder="Search projects..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
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
                                        className="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-wider px-2"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    {filteredItems.length > 0 ? (
                        <>
                            <p className="text-slate-500 mb-8 font-medium">Showing <span className="text-brand-dark font-bold">{filteredItems.length}</span> results</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredItems.map((item, index) => (
                                    <FadeIn key={item.id} delay={getDelay(index)}>
                                        <PortfolioCard item={item} />
                                    </FadeIn>
                                ))}
                            </div>
                        </>
                    ) : (
                        <FadeIn>
                            <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm text-center px-4">
                                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-brand-dark mb-3">No Success Stories Found</h3>
                                <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg">
                                    We couldn't find any projects matching your current filters. Try adjusting your search query or categories.
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="px-8 py-3 bg-brand-dark text-white rounded-full font-bold hover:shadow-lg hover:bg-brand-orange transition-all duration-300"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </FadeIn>
                    )}
                </div>
            </section>
        </div>
    );
};

export default PortfolioPage;
