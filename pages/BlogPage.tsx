import React, { useState, useMemo, useEffect } from 'react';
import { BlogPost } from '../types';
import FadeIn from '../components/FadeIn';
import { useNavigation } from '../App';
import { getBlogPosts } from '../utils/blogStorage';

// ============================================
// Icons
// ============================================
const Icon = {
    Search: () => (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    ),
    Arrow: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    ),
};

// ============================================
// Helpers
// ============================================
function formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getInitials(name: string = ''): string {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || 'ST';
}

const authorColors = ['bg-brand-orange', 'bg-brand-dark', 'bg-emerald-600', 'bg-violet-600', 'bg-amber-600', 'bg-sky-600', 'bg-rose-500'];
function authorColor(name: string = ''): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
    return authorColors[Math.abs(hash) % authorColors.length];
}

// ============================================
// EDITORIAL HEADER — pure typography, no marketing visuals
// ============================================
const EditorialHeader: React.FC<{ total: number }> = ({ total }) => (
    <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl py-12 md:py-14">
            <FadeIn>
                <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gray-500 mb-4">The Stallioni Blog</p>
                <h1 className="text-2xl md:text-3xl lg:text-[2rem] font-bold text-brand-dark tracking-[-0.02em] leading-[1.2] max-w-3xl">
                    Stories on building software, scaling teams, and shipping fast.
                </h1>
                <p className="mt-4 text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl">
                    Long-form essays and short field notes from senior engineers, designers, and product leaders at Stallioni.
                </p>
                <p className="mt-6 text-[11px] font-mono uppercase tracking-[0.18em] text-gray-400">
                    {total} {total === 1 ? 'article' : 'articles'} · Updated weekly
                </p>
            </FadeIn>
        </div>
    </header>
);

// ============================================
// STICKY FILTER BAR — text tabs with underline indicator
// ============================================
const FilterBar: React.FC<{
    categories: string[];
    active: string;
    onSelect: (c: string) => void;
    search: string;
    onSearchChange: (v: string) => void;
}> = ({ categories, active, onSelect, search, onSearchChange }) => (
    <div className="sticky top-[64px] md:top-[68px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 md:py-0">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar -mx-2 px-2">
                    {categories.map((cat) => {
                        const isActive = active === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => onSelect(cat)}
                                className={`relative px-3.5 py-4 text-[13.5px] font-medium tracking-tight transition-colors whitespace-nowrap ${
                                    isActive ? 'text-brand-dark' : 'text-gray-500 hover:text-brand-dark'
                                }`}
                            >
                                {cat}
                                <span
                                    aria-hidden="true"
                                    className={`pointer-events-none absolute left-3.5 right-3.5 -bottom-px h-[2px] rounded-full bg-brand-orange transition-transform duration-300 origin-left ${
                                        isActive ? 'scale-x-100' : 'scale-x-0'
                                    }`}
                                />
                            </button>
                        );
                    })}
                </div>

                <div className="relative w-full md:w-72 pb-3 md:pb-0">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Icon.Search />
                    </div>
                    <input
                        type="text"
                        placeholder="Search articles…"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full bg-white placeholder-gray-400 focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-colors text-base sm:text-sm"
                        aria-label="Search articles"
                    />
                </div>
            </div>
        </div>
    </div>
);

// ============================================
// FEATURED POST — full-bleed image with overlay text
// ============================================
const FeaturedPost: React.FC<{ post: BlogPost }> = ({ post }) => {
    const { navigate } = useNavigation();
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate(`/blog/${post.id}`);
    };
    return (
        <article>
            <a
                href={`/blog/${post.id}`}
                onClick={handleNav}
                className="group relative block aspect-[21/10] md:aspect-[21/9] rounded-2xl overflow-hidden bg-gray-200"
            >
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-12 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-brand-orange text-white text-[10px] font-semibold uppercase tracking-[0.18em] px-3 py-1 rounded-full">
                            Featured
                        </span>
                        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/85">
                            {post.category}
                        </span>
                    </div>

                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] leading-[1.1] max-w-3xl mb-4 group-hover:text-brand-orange transition-colors">
                        {post.title}
                    </h2>

                    <p className="hidden md:block text-white/80 text-base lg:text-lg leading-relaxed max-w-2xl mb-5 line-clamp-2">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center flex-wrap gap-x-3 gap-y-2 text-[13px]">
                        <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full ${authorColor(post.author)} text-white flex items-center justify-center font-semibold text-[10px]`}>
                                {getInitials(post.author)}
                            </div>
                            <span className="font-medium text-white">{post.author}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <time className="text-white/75" dateTime={post.date}>{formatDate(post.date)}</time>
                        {post.readTime && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-white/40" />
                                <span className="text-white/75">{post.readTime}</span>
                            </>
                        )}
                    </div>
                </div>
            </a>
        </article>
    );
};

// ============================================
// ARTICLE CARD — clean, borderless, editorial
// ============================================
const ArticleCard: React.FC<{ post: BlogPost }> = ({ post }) => {
    const { navigate } = useNavigation();
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate(`/blog/${post.id}`);
    };
    return (
        <article>
            <a href={`/blog/${post.id}`} onClick={handleNav} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-gray-100 mb-5">
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                </div>

                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange mb-2.5">
                    {post.category}
                </p>

                <h3 className="text-[1.35rem] md:text-[1.4rem] font-bold text-brand-dark tracking-[-0.015em] leading-[1.2] mb-3 group-hover:text-brand-orange transition-colors line-clamp-2">
                    {post.title}
                </h3>

                <p className="text-[14.5px] text-gray-600 leading-relaxed line-clamp-2 mb-5">
                    {post.excerpt}
                </p>

                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[12.5px] text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full ${authorColor(post.author)} text-white flex items-center justify-center text-[9.5px] font-semibold`}>
                            {getInitials(post.author)}
                        </div>
                        <span className="font-medium text-brand-dark">{post.author}</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.readTime && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span>{post.readTime}</span>
                        </>
                    )}
                </div>
            </a>
        </article>
    );
};

// ============================================
// MAIN
// ============================================
const BlogPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [allPosts, setAllPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        setAllPosts(getBlogPosts());
    }, []);

    const categories = useMemo(() => ['All', ...Array.from(new Set(allPosts.map((p) => p.category)))], [allPosts]);

    const sortedPosts = useMemo(() => {
        return [...allPosts].sort((a, b) => {
            // Sort by date, newest first; fall back to id ordering.
            const da = new Date(a.date).getTime();
            const db = new Date(b.date).getTime();
            if (!Number.isNaN(da) && !Number.isNaN(db) && da !== db) return db - da;
            return (Number(b.id) || 0) - (Number(a.id) || 0);
        });
    }, [allPosts]);

    const filteredPosts = useMemo(() => {
        const q = searchTerm.toLowerCase();
        return sortedPosts
            .filter((p) => filterCategory === 'All' || p.category === filterCategory)
            .filter((p) =>
                p.title.toLowerCase().includes(q) ||
                p.excerpt.toLowerCase().includes(q)
            );
    }, [searchTerm, filterCategory, sortedPosts]);

    const hasActiveFilters = filterCategory !== 'All' || searchTerm !== '';
    const featuredPost = filteredPosts[0] || null;
    const otherPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

    return (
        <div className="bg-white min-h-screen">
            <EditorialHeader total={allPosts.length} />

            <FilterBar
                categories={categories}
                active={filterCategory}
                onSelect={setFilterCategory}
                search={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <section className="py-12 md:py-16">
                <div className="container mx-auto px-6 max-w-6xl">
                    {filteredPosts.length > 0 ? (
                        <>
                            {featuredPost && (
                                <FadeIn>
                                    <div className="mb-12 md:mb-16">
                                        <FeaturedPost post={featuredPost} />
                                    </div>
                                </FadeIn>
                            )}

                            {otherPosts.length > 0 && (
                                <>
                                    <div className="flex items-center gap-3 mb-8">
                                        <h2 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gray-500">More articles</h2>
                                        <span className="flex-1 h-px bg-gray-200" />
                                        <span className="text-[11px] font-mono text-gray-400">
                                            {otherPosts.length} {otherPosts.length === 1 ? 'post' : 'posts'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                                        {otherPosts.map((post, index) => (
                                            <FadeIn key={post.id} delay={Math.min(index * 40, 320)}>
                                                <ArticleCard post={post} />
                                            </FadeIn>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <FadeIn>
                            <div className="flex flex-col items-center justify-center py-24 text-center px-4">
                                <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-5 text-gray-400">
                                    <Icon.Search />
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-2 tracking-tight">No articles found</h3>
                                <p className="text-gray-500 max-w-md mx-auto mb-6">Try a different search term or category.</p>
                                {hasActiveFilters && (
                                    <button
                                        onClick={() => { setSearchTerm(''); setFilterCategory('All'); }}
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:text-brand-orange-hover transition-colors"
                                    >
                                        Reset filters
                                        <Icon.Arrow />
                                    </button>
                                )}
                            </div>
                        </FadeIn>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
