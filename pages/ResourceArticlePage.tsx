import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigation } from '../App';
import {
    getArticleBySlug,
    ResourceArticle,
    ProductCard,
    CATEGORY_LABELS,
} from '../constants/resources';
import AffiliateLink from '../components/AffiliateLink';
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

const StarIcon: React.FC<{ filled?: boolean; half?: boolean }> = ({ filled, half }) => (
    <svg
        className={`w-4 h-4 ${filled || half ? 'text-yellow-400' : 'text-slate-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const XIcon = () => (
    <svg className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function renderStars(rating: number): React.ReactNode {
    const full = Math.floor(rating);
    const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
    const stars: React.ReactNode[] = [];
    for (let i = 0; i < 5; i++) {
        if (i < full) stars.push(<StarIcon key={i} filled />);
        else if (i === full && hasHalf) stars.push(<StarIcon key={i} half />);
        else stars.push(<StarIcon key={i} />);
    }
    return (
        <div className="inline-flex items-center gap-1">
            {stars}
            <span className="ml-1 text-sm font-semibold text-slate-700">{rating.toFixed(1)}</span>
        </div>
    );
}

// Inline markdown: **bold** → <strong>, [label](href) → <a>
function renderInline(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={idx} className="font-bold text-brand-dark">{part.slice(2, -2)}</strong>;
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
            const [, label, href] = link;
            const isExternal = /^https?:\/\//.test(href);
            return (
                <a
                    key={idx}
                    href={href}
                    className="text-brand-orange font-semibold hover:underline"
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                    {label}
                </a>
            );
        }
        return part;
    });
}

function renderParagraphs(body: string): React.ReactNode {
    return body.split(/\n\n+/).map((para, idx) => {
        // Bullet lists — lines starting with "• " or "- "
        const lines = para.split('\n');
        const isList = lines.every((l) => l.trim().startsWith('•') || l.trim().startsWith('-') || l.trim() === '');
        if (isList && lines.some((l) => l.trim())) {
            return (
                <ul key={idx} className="list-none space-y-2 my-4 pl-0">
                    {lines.filter((l) => l.trim()).map((line, i) => (
                        <li key={i} className="flex gap-2 text-slate-700">
                            <span className="text-brand-orange flex-shrink-0">•</span>
                            <span>{renderInline(line.replace(/^[•-]\s*/, ''))}</span>
                        </li>
                    ))}
                </ul>
            );
        }
        return (
            <p key={idx} className="text-slate-700 leading-relaxed mb-4">
                {renderInline(para)}
            </p>
        );
    });
}

const ProductCardBlock: React.FC<{ card: ProductCard; articleSlug: string }> = ({ card, articleSlug }) => (
    <div className="not-prose bg-white border border-slate-200 rounded-2xl p-6 md:p-7 my-8 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <div>
                <h3 className="text-2xl font-extrabold text-brand-dark mb-1.5">{card.name}</h3>
                <p className="text-slate-600 text-sm">{card.tagline}</p>
            </div>
            {card.rating !== undefined && renderStars(card.rating)}
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-5 pb-5 border-b border-slate-100 text-sm">
            <div>
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-1">Pricing</div>
                <div className="text-brand-dark font-bold">{card.pricing}</div>
            </div>
            <div className="sm:col-span-2">
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-1">Best for</div>
                <div className="text-slate-700">{card.bestFor}</div>
            </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <div>
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Pros</div>
                <ul className="space-y-2">
                    {card.pros.map((p, i) => (
                        <li key={i} className="flex gap-2 text-slate-700 text-sm">
                            <CheckIcon />
                            <span>{p}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Cons</div>
                <ul className="space-y-2">
                    {card.cons.map((c, i) => (
                        <li key={i} className="flex gap-2 text-slate-700 text-sm">
                            <XIcon />
                            <span>{c}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <AffiliateLink
            href={card.affiliateUrl}
            provider={card.affiliateProvider}
            position="card"
            articleSlug={articleSlug}
            variant="button"
        >
            {card.ctaLabel || `Try ${card.name}`}
        </AffiliateLink>
    </div>
);

const ResourceArticlePage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { navigate } = useNavigation();
    const article: ResourceArticle | undefined = slug ? getArticleBySlug(slug) : undefined;

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white py-20 px-6">
                <div className="text-center max-w-md">
                    <h1 className="text-3xl font-extrabold text-brand-dark mb-4">Article not found</h1>
                    <p className="text-slate-600 mb-8">
                        This article does not exist yet or has been moved.
                    </p>
                    <button
                        onClick={() => navigate('/resources')}
                        className="text-brand-orange font-semibold underline hover:text-brand-orange/80"
                    >
                        Browse all resources →
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* HERO */}
            <section className="bg-slate-50 border-b border-slate-200 py-10 md:py-14">
                <div className="container mx-auto px-6 max-w-4xl">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
                        <a
                            href="/"
                            onClick={(e) => { e.preventDefault(); navigate('/'); }}
                            className="hover:text-brand-orange"
                        >
                            Home
                        </a>
                        <span>·</span>
                        <a
                            href="/resources"
                            onClick={(e) => { e.preventDefault(); navigate('/resources'); }}
                            className="hover:text-brand-orange"
                        >
                            Resources
                        </a>
                        <span>·</span>
                        <span className="text-brand-dark font-medium">{CATEGORY_LABELS[article.category]}</span>
                    </nav>

                    <div className="inline-block px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange font-semibold text-xs mb-5 uppercase tracking-widest">
                        {CATEGORY_LABELS[article.category]}
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark leading-tight mb-5">
                        {article.h1}
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
                        {article.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                        <span>By {article.author}</span>
                        <span className="flex items-center gap-1.5">
                            <CalendarIcon /> Published {formatDate(article.publishedDate)}
                        </span>
                        {article.updatedDate && (
                            <span className="flex items-center gap-1.5">
                                Updated {formatDate(article.updatedDate)}
                            </span>
                        )}
                        <span className="flex items-center gap-1.5">
                            <ClockIcon /> {article.readTimeMinutes} min read
                        </span>
                    </div>
                </div>
            </section>

            {/* BODY */}
            <article className="py-12 md:py-16">
                <div className="container mx-auto px-6 max-w-3xl">
                    <AffiliateDisclosure />

                    {/* INTRO */}
                    <div className="prose prose-lg max-w-none mb-10">
                        {renderParagraphs(article.intro)}
                    </div>

                    {/* QUICK VERDICT BOX */}
                    {article.quickVerdict && (
                        <div className="not-prose bg-brand-dark text-white rounded-2xl p-6 md:p-8 my-10">
                            <h2 className="text-xl md:text-2xl font-extrabold mb-5 flex items-center gap-2">
                                <svg className="w-6 h-6 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Quick Verdict
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-brand-orange text-xs font-bold uppercase tracking-wider">Winner</span>
                                    <p className="text-white font-bold text-lg mt-0.5">{article.quickVerdict.winner.name}</p>
                                    <p className="text-slate-300 text-sm mt-1 leading-relaxed">{article.quickVerdict.winner.reason}</p>
                                </div>
                                {article.quickVerdict.runnerUp && (
                                    <div>
                                        <span className="text-blue-300 text-xs font-bold uppercase tracking-wider">Runner-up</span>
                                        <p className="text-white font-bold text-lg mt-0.5">{article.quickVerdict.runnerUp.name}</p>
                                        <p className="text-slate-300 text-sm mt-1 leading-relaxed">{article.quickVerdict.runnerUp.reason}</p>
                                    </div>
                                )}
                                {article.quickVerdict.budget && (
                                    <div>
                                        <span className="text-green-300 text-xs font-bold uppercase tracking-wider">Best on a budget</span>
                                        <p className="text-white font-bold text-lg mt-0.5">{article.quickVerdict.budget.name}</p>
                                        <p className="text-slate-300 text-sm mt-1 leading-relaxed">{article.quickVerdict.budget.reason}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* COMPARISON TABLE */}
                    {article.comparisonTable && (
                        <div className="not-prose my-10 overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="bg-brand-dark text-white">
                                        {article.comparisonTable.columns.map((c, i) => (
                                            <th key={i} className="p-4 text-sm font-bold border border-brand-dark/20">{c}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {article.comparisonTable.rows.map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                            <td className="p-4 text-sm font-semibold text-brand-dark border border-slate-200">{row.feature}</td>
                                            {row.values.map((v, j) => (
                                                <td key={j} className="p-4 text-sm text-slate-700 border border-slate-200">{v}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* SECTIONS */}
                    {article.sections.map((section, idx) => (
                        <div key={idx} className="mb-10">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mt-12 mb-5 leading-tight">
                                {section.heading}
                            </h2>
                            <div className="prose prose-lg max-w-none">
                                {renderParagraphs(section.body)}
                            </div>
                            {section.productCards?.map((card, i) => (
                                <ProductCardBlock key={i} card={card} articleSlug={article.slug} />
                            ))}
                        </div>
                    ))}

                    {/* FAQ */}
                    {article.faqs && article.faqs.length > 0 && (
                        <div className="my-12">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-6">
                                Frequently asked questions
                            </h2>
                            <div className="space-y-5">
                                {article.faqs.map((faq, i) => (
                                    <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                                        <h3 className="font-bold text-brand-dark mb-2 text-lg">{faq.question}</h3>
                                        <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CONCLUSION */}
                    <div className="my-12 pt-8 border-t border-slate-200">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-5">
                            The bottom line
                        </h2>
                        <div className="prose prose-lg max-w-none">
                            {renderParagraphs(article.conclusion)}
                        </div>
                    </div>

                    {/* RELATED SERVICES */}
                    {article.relatedServices && article.relatedServices.length > 0 && (
                        <div className="not-prose bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 my-10">
                            <h2 className="text-xl font-bold text-brand-dark mb-3">
                                We build this for clients
                            </h2>
                            <p className="text-slate-600 text-sm mb-5">
                                If you would rather have us do this work for you, here are the related services:
                            </p>
                            <ul className="space-y-2">
                                {article.relatedServices.map((svc) => (
                                    <li key={svc.slug}>
                                        <a
                                            href={`/services/${svc.slug}`}
                                            onClick={(e) => { e.preventDefault(); navigate(`/services/${svc.slug}`); }}
                                            className="text-brand-orange font-semibold hover:underline inline-flex items-center gap-1.5"
                                        >
                                            {svc.name} →
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </article>

            {/* BACK TO RESOURCES */}
            <section className="bg-slate-50 py-12 px-6 border-t border-slate-200">
                <div className="container mx-auto max-w-3xl text-center">
                    <a
                        href="/resources"
                        onClick={(e) => { e.preventDefault(); navigate('/resources'); }}
                        className="text-brand-orange font-semibold hover:underline"
                    >
                        ← Back to all resources
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ResourceArticlePage;
