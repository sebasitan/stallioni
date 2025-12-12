
import React, { useState, useMemo } from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { PortfolioCategory, Industry, PortfolioItem } from '../types';
import FadeIn from '../components/FadeIn';

const PageHeader: React.FC = () => (
    <div className="bg-white py-16 text-center border-b border-slate-200">
        <div className="container mx-auto px-6">
            <FadeIn>
                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight">Global Success Stories</h1>
                <p className="text-lg text-slate-600 mt-4 max-w-4xl mx-auto">Driving growth from Fintech to Healthcare. Explore case studies that prove our capability to deliver tangible business value for our international partners.</p>
            </FadeIn>
        </div>
    </div>
);

const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col border border-slate-100 hover:shadow-2xl hover:border-brand-orange/50">
        <div className="relative overflow-hidden">
            <img src={item.imageUrl} alt={item.title} loading="lazy" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-4 right-4">
                <span className="bg-brand-orange text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">{item.category}</span>
            </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <p className="text-sm font-semibold text-slate-500 mb-1">{item.industry}</p>
            <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-orange transition-colors">{item.title}</h3>
            <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-3">{item.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {item.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">{tech}</span>
                ))}
            </div>
            <blockquote className="border-l-4 border-brand-orange/50 pl-4 mt-auto pt-2 bg-slate-50/70 rounded-r-md">
                <p className="italic text-slate-600 text-sm">"{item.testimonial}"</p>
                <cite className="block text-right not-italic mt-2 text-xs font-semibold text-brand-dark">- Client in {item.clientLocation}</cite>
            </blockquote>
        </div>
    </div>
);


const FilterSidebar: React.FC<{
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
    availableIndustries: Industry[];
    availableTechnologies: string[];
    itemCount: number;
}> = ({ filters, setFilters, availableIndustries, availableTechnologies, itemCount }) => {

    const categoryFilters: ('All' | PortfolioCategory)[] = ['All', ...Object.values(PortfolioCategory)];

    const handleCategoryChange = (category: 'All' | PortfolioCategory) => {
        setFilters(prev => ({ ...prev, category }));
    };

    const handleIndustryChange = (industry: Industry) => {
        setFilters(prev => {
            const newIndustries = prev.industries.includes(industry)
                ? prev.industries.filter((i: Industry) => i !== industry)
                : [...prev.industries, industry];
            return { ...prev, industries: newIndustries };
        });
    };

    const handleTechnologyChange = (tech: string) => {
        setFilters(prev => {
            const newTechs = prev.technologies.includes(tech)
                ? prev.technologies.filter((t: string) => t !== tech)
                : [...prev.technologies, tech];
            return { ...prev, technologies: newTechs };
        });
    };

    const resetFilters = () => {
        setFilters({ category: 'All', industries: [], technologies: [] });
    };

    const FilterGroup: React.FC<{ title: string; children: React.ReactNode; hasActiveFilter?: boolean }> = ({ title, children, hasActiveFilter }) => (
        <div className="mb-6 border-b border-slate-200 pb-6 last:border-b-0 last:pb-0">
            <h3 className="text-lg font-bold text-brand-dark mb-3 flex items-center">
                {title}
                {hasActiveFilter && <span className="ml-2 w-2 h-2 rounded-full bg-brand-orange"></span>}
            </h3>
            {children}
        </div>
    );

    const Checkbox: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
        <label className="flex items-center space-x-3 cursor-pointer group">
            <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded border-slate-300 text-brand-orange focus:ring-brand-orange/50" />
            <span className={`text-slate-700 group-hover:text-brand-dark transition-colors ${checked ? 'font-semibold' : ''}`}>{label}</span>
        </label>
    );

    return (
        <aside className="lg:w-1/4 xl:w-1/5">
            <div className="sticky top-28">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-extrabold text-brand-dark">Filters</h2>
                        <button onClick={resetFilters} className="text-sm font-semibold text-brand-orange hover:underline disabled:text-slate-400 disabled:no-underline" disabled={filters.category === 'All' && filters.industries.length === 0 && filters.technologies.length === 0}>
                            Reset
                        </button>
                    </div>

                    <FilterGroup title="Service" hasActiveFilter={filters.category !== 'All'}>
                        <div className="flex flex-wrap gap-2">
                            {categoryFilters.map(f => (
                                <button
                                    key={f}
                                    onClick={() => handleCategoryChange(f)}
                                    className={`px-3 py-1.5 rounded-full font-semibold text-xs transition-all duration-200 ${filters.category === f ? 'bg-brand-dark text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </FilterGroup>

                    <FilterGroup title="Industry" hasActiveFilter={filters.industries.length > 0}>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                            {availableIndustries.map(industry => (
                                <Checkbox key={industry} label={industry} checked={filters.industries.includes(industry)} onChange={() => handleIndustryChange(industry)} />
                            ))}
                        </div>
                    </FilterGroup>

                    <FilterGroup title="Technology" hasActiveFilter={filters.technologies.length > 0}>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                            {availableTechnologies.map(tech => (
                                <Checkbox key={tech} label={tech} checked={filters.technologies.includes(tech)} onChange={() => handleTechnologyChange(tech)} />
                            ))}
                        </div>
                    </FilterGroup>
                </div>
                <div className="mt-6 bg-brand-light p-4 rounded-lg text-center">
                    <p className="text-brand-dark font-semibold">
                        <span className="text-3xl font-extrabold text-brand-orange">{itemCount}</span> Projects Found
                    </p>
                </div>
            </div>
        </aside>
    );
};


const PortfolioPage: React.FC = () => {
    const [filters, setFilters] = useState({
        category: 'All' as 'All' | PortfolioCategory,
        industries: [] as Industry[],
        technologies: [] as string[],
    });

    const availableIndustries = useMemo(() => [...new Set(PORTFOLIO_ITEMS.map(item => item.industry))].sort(), []);
    const availableTechnologies = useMemo(() => [...new Set(PORTFOLIO_ITEMS.flatMap(item => item.technologies))].sort(), []);

    const filteredItems = useMemo(() => {
        return PORTFOLIO_ITEMS.filter(item => {
            const categoryMatch = filters.category === 'All' || item.category === filters.category;
            const industryMatch = filters.industries.length === 0 || filters.industries.includes(item.industry);
            const technologyMatch = filters.technologies.length === 0 || item.technologies.some(tech => filters.technologies.includes(tech));
            return categoryMatch && industryMatch && technologyMatch;
        });
    }, [filters]);

    return (
        <>
            <PageHeader />
            <section className="py-16 md:py-20 bg-slate-50/70">
                <div className="container mx-auto px-6 max-w-screen-xl">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        <FilterSidebar
                            filters={filters}
                            setFilters={setFilters}
                            availableIndustries={availableIndustries}
                            availableTechnologies={availableTechnologies}
                            itemCount={filteredItems.length}
                        />
                        <main className="lg:w-3/4 xl:w-4/5">
                            {filteredItems.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {filteredItems.map((item, index) => (
                                        <FadeIn key={item.id} delay={index * 50}>
                                            <PortfolioCard item={item} />
                                        </FadeIn>
                                    ))}
                                </div>
                            ) : (
                                <FadeIn>
                                    <div className="text-center py-24 bg-white rounded-lg shadow-md border border-slate-200/80">
                                        <h3 className="text-2xl font-bold text-brand-dark">No Projects Found</h3>
                                        <p className="text-slate-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                                    </div>
                                </FadeIn>
                            )}
                        </main>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PortfolioPage;

