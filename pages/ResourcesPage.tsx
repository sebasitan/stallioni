import React from 'react';
import { useNavigation } from '../App';
import {
    RESOURCE_ARTICLES,
    CATEGORY_LABELS,
    CATEGORY_ORDER,
    getArticlesByCategory,
    ResourceArticle,
} from '../constants/resources';
import AffiliateDisclosure from '../components/AffiliateDisclosure';

const CalendarIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const ClockIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ArrowIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const ArticleCard: React.FC<{ article: ResourceArticle; onClick: (slug: string) => void }> = ({ article, onClick }) => (
    <a
        href={`/resources/${article.slug}`}
        onClick={(e) => {
            e.preventDefault();
            onClick(article.slug);
        }}
        className="group flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-brand-orange hover:shadow-xl transition-all duration-300"
    >
        {article.ogImage && (
            <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                    src={article.ogImage}
                    alt={article.h1}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange font-semibold uppercase tracking-wide">
                    {CATEGORY_LABELS[article.category]}
                </span>
                <span className="flex items-center gap-1">
                    <CalendarIcon /> {formatDate(article.publishedDate)}
                </span>
                <span className="flex items-center gap-1">
                    <ClockIcon /> {article.readTimeMinutes} min
                </span>
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-orange transition-colors leading-tight">
                {article.h1}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">{article.summary}</p>
            <div className="text-brand-orange font-semibold text-sm inline-flex items-center gap-2">
                Read article <ArrowIcon />
            </div>
        </div>
    </a>
);

const ResourcesPage: React.FC = () => {
    const { navigate } = useNavigation();
    const grouped = getArticlesByCategory();
    const totalArticles = RESOURCE_ARTICLES.length;

    return (
        <div className="bg-white">
            {/* HERO */}
            <section className="relative bg-brand-dark text-white py-20 md:py-24 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.08] pointer-events-none"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
                        backgroundSize: '32px 32px',
                    }}
                />
                <div className="container mx-auto px-6 max-w-5xl relative">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange font-semibold text-xs mb-6 tracking-widest uppercase">
                        Resources
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                        Honest reviews & comparison guides<br />
                        <span className="text-brand-orange">from a working agency</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mb-6">
                        We ship 50+ client projects per year on the tools we recommend. Every guide here is
                        based on real client work — not a marketing pitch. We disclose affiliate
                        relationships and only recommend tools we genuinely use.
                    </p>
                    <p className="text-slate-400 text-sm">
                        {totalArticles} article{totalArticles !== 1 ? 's' : ''} published · Updated regularly
                    </p>
                </div>
            </section>

            {/* DISCLOSURE BANNER */}
            <section className="bg-slate-50 py-6 border-b border-slate-200">
                <div className="container mx-auto px-6 max-w-4xl">
                    <AffiliateDisclosure />
                </div>
            </section>

            {/* CATEGORY SECTIONS */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    {CATEGORY_ORDER.map((category) => {
                        const articles = grouped[category];
                        if (articles.length === 0) return null;
                        return (
                            <div key={category} className="mb-16 last:mb-0">
                                <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-slate-200">
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark">
                                        {CATEGORY_LABELS[category]}
                                    </h2>
                                    <span className="text-slate-500 text-sm">
                                        {articles.length} article{articles.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {articles.map((article) => (
                                        <ArticleCard
                                            key={article.slug}
                                            article={article}
                                            onClick={(slug) => navigate(`/resources/${slug}`)}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-brand-orange py-14 px-6">
                <div className="container mx-auto max-w-3xl text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                        Need help picking the right stack?
                    </h2>
                    <p className="text-lg text-white/90 mb-7 leading-relaxed">
                        We scope projects honestly — including telling you when our services are
                        overkill. Free 30-minute consultation, no pitch.
                    </p>
                    <a
                        href="/contact"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/contact');
                        }}
                        className="inline-flex items-center gap-2 bg-white text-brand-orange font-bold py-3.5 px-9 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                        Talk to an engineer <ArrowIcon />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ResourcesPage;
