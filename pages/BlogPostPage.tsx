import React, { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { BlogPost } from '../types';
import { getBlogPost, getBlogPosts } from '../utils/blogStorage';
import MetaManager from '../components/MetaManager';
import { getBlogPostMetadata } from '../seo';
import { useNavigation, useModal } from '../App';
import FadeIn from '../components/FadeIn';
import Breadcrumbs from '../components/Breadcrumbs';

// ============================================
// Icons
// ============================================
const Icon = {
    Arrow: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    ),
    Back: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    ),
    Calendar: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    Clock: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Twitter: () => (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    ),
    LinkedIn: () => (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
    ),
    Facebook: () => (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
        </svg>
    ),
    WhatsApp: () => (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
    ),
    Link: () => (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
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
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
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
// MAIN
// ============================================
const BlogPostPage: React.FC = () => {
    // NOTE: the route is `/blog/:postId` (see App.tsx) — not `:id`. Reading the
    // wrong param name was returning undefined and 404'ing every post.
    const { postId } = useParams<{ postId: string }>();
    const post = postId
        ? getBlogPost(postId) || getBlogPost(Number(postId).toString())
        : null;
    const { navigate } = useNavigation();
    const { openModal } = useModal();
    const contentRef = useRef<HTMLDivElement>(null);

    const related = useMemo<BlogPost[]>(() => {
        if (!post) return [];
        const all = getBlogPosts();
        const sameCategory = all.filter((p) => p.id !== post.id && p.category === post.category);
        const others = all.filter((p) => p.id !== post.id && p.category !== post.category);
        return [...sameCategory, ...others].slice(0, 3);
    }, [post]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [postId]);

    useEffect(() => {
        if (contentRef.current) {
            const links = contentRef.current.querySelectorAll('a.open-contact-modal');
            const handleClick = (e: Event) => {
                e.preventDefault();
                openModal('Quote');
            };
            links.forEach((link) => link.addEventListener('click', handleClick));
            return () => {
                links.forEach((link) => link.removeEventListener('click', handleClick));
            };
        }
    }, [post, openModal]);

    const handleBackNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate('/blog');
    };

    const handleRelatedNav = (e: React.MouseEvent<HTMLAnchorElement>, postId: string | number) => {
        e.preventDefault();
        navigate(`/blog/${postId}`);
    };

    if (!post) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-white px-6">
                <div className="text-center max-w-md">
                    <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-3">404</p>
                    <h1 className="text-2xl md:text-3xl font-bold text-brand-dark tracking-tight mb-3">Post not found</h1>
                    <p className="text-gray-500 mb-6">The article you're looking for doesn't exist or has been moved.</p>
                    <a
                        href="/blog"
                        onClick={handleBackNav}
                        className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:text-brand-orange-hover transition-colors"
                    >
                        <Icon.Back /> Return to blog
                    </a>
                </div>
            </div>
        );
    }

    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(post.title);
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    const whatsAppShareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;

    const breadcrumbPath = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: post.title },
    ];

    // SEO metadata — title, description, OG, structured data
    const baseMeta = getBlogPostMetadata(post);
    const seoMetadata = {
        ...baseMeta,
        title: baseMeta.title || post.metaTitle || `${post.title} | Stallioni Blog`,
        description: baseMeta.description || post.metaDescription || post.excerpt,
        keywords: baseMeta.keywords || post.keywords || `Stallioni blog, ${post.category}, IT outsourcing`,
        ogTitle: baseMeta.ogTitle || post.metaTitle || post.title,
        ogDescription: baseMeta.ogDescription || post.metaDescription || post.excerpt,
        ogImage: baseMeta.ogImage || post.imageUrl,
        ogUrl: pageUrl,
        ogType: 'article' as const,
        structuredData: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'mainEntityOfPage': {
                '@type': 'WebPage',
                '@id': pageUrl,
            },
            // headline should be the article title only — no " | Stallioni Blog" suffix.
            'headline': post.title,
            'description': post.metaDescription || post.excerpt,
            'image': post.imageUrl,
            'datePublished': post.date,
            'dateModified': post.date,
            'author': {
                '@type': 'Person',
                'name': post.author,
            },
            'publisher': {
                '@type': 'Organization',
                'name': 'Stallioni Net Solutions',
                'url': 'https://www.stallioni.com',
                'logo': {
                    '@type': 'ImageObject',
                    'url': 'https://www.stallioni.com/logo.svg',
                },
            },
            'articleSection': post.category,
            'keywords': post.keywords,
            'inLanguage': 'en-US',
        }),
    };

    const handleCopyLink = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(pageUrl);
        } catch {
            // ignore
        }
    };

    return (
        <div className="bg-white">
            <MetaManager {...seoMetadata} />

            {/* ===== HEADER ===== */}
            <header className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-6 max-w-3xl pt-8 pb-10 md:pt-10 md:pb-12">
                    <FadeIn>
                        <Breadcrumbs path={breadcrumbPath} theme="light" className="mb-8" />
                    </FadeIn>

                    <FadeIn delay={50}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-4">
                            {post.category}
                        </p>
                    </FadeIn>

                    <FadeIn delay={100}>
                        <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-brand-dark tracking-[-0.02em] leading-[1.15] mb-6">
                            {post.title}
                        </h1>
                    </FadeIn>

                    <FadeIn delay={150}>
                        <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-8">
                            {post.excerpt}
                        </p>
                    </FadeIn>

                    <FadeIn delay={200}>
                        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-2.5">
                                <div className={`w-9 h-9 rounded-full ${authorColor(post.author)} text-white flex items-center justify-center font-semibold text-xs`}>
                                    {getInitials(post.author)}
                                </div>
                                <div className="leading-tight">
                                    <p className="text-sm font-semibold text-brand-dark">{post.author}</p>
                                    <p className="text-[11px] text-gray-500">Stallioni team</p>
                                </div>
                            </div>
                            <span className="w-px h-9 bg-gray-200 hidden sm:block" />
                            <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                                <Icon.Calendar />
                                <time dateTime={post.date}>{formatDate(post.date)}</time>
                            </div>
                            {post.readTime && (
                                <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                                    <Icon.Clock />
                                    <span>{post.readTime}</span>
                                </div>
                            )}
                        </div>
                    </FadeIn>
                </div>
            </header>

            {/* ===== HERO IMAGE ===== */}
            <FadeIn delay={250}>
                <div className="container mx-auto px-6 max-w-5xl pt-8 md:pt-10">
                    <figure className="rounded-2xl overflow-hidden bg-gray-100 aspect-[21/9]">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            loading="eager"
                            fetchPriority="high"
                            className="w-full h-full object-cover"
                        />
                    </figure>
                </div>
            </FadeIn>

            {/* ===== ARTICLE BODY ===== */}
            <article className="py-12 md:py-16">
                <div className="container mx-auto px-6 max-w-3xl">
                    <FadeIn delay={300}>
                        <div
                            ref={contentRef}
                            className="article-content"
                            dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
                        />
                    </FadeIn>

                    {/* Share row */}
                    <FadeIn delay={350}>
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500">Share this article</p>
                                <div className="flex items-center gap-2">
                                    {[
                                        { href: twitterShareUrl, label: 'Share on X (Twitter)', icon: <Icon.Twitter /> },
                                        { href: linkedInShareUrl, label: 'Share on LinkedIn', icon: <Icon.LinkedIn /> },
                                        { href: facebookShareUrl, label: 'Share on Facebook', icon: <Icon.Facebook /> },
                                        { href: whatsAppShareUrl, label: 'Share on WhatsApp', icon: <Icon.WhatsApp /> },
                                    ].map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-9 h-9 rounded-full border border-gray-200 text-gray-500 hover:text-brand-orange hover:border-brand-orange flex items-center justify-center transition-colors"
                                            aria-label={s.label}
                                        >
                                            {s.icon}
                                        </a>
                                    ))}
                                    <button
                                        onClick={handleCopyLink}
                                        className="w-9 h-9 rounded-full border border-gray-200 text-gray-500 hover:text-brand-orange hover:border-brand-orange flex items-center justify-center transition-colors"
                                        aria-label="Copy article link"
                                    >
                                        <Icon.Link />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Author bio */}
                    <FadeIn delay={400}>
                        <div className="mt-10 bg-brand-light rounded-2xl p-6 md:p-7 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-full ${authorColor(post.author)} text-white flex items-center justify-center font-semibold flex-shrink-0`}>
                                    {getInitials(post.author)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-1">Written by</p>
                                    <p className="text-base font-bold text-brand-dark">{post.author}</p>
                                    <p className="text-[13.5px] text-gray-600 leading-relaxed mt-2">
                                        Senior {post.category.toLowerCase()} contributor at Stallioni Net Solutions. Writes about IT outsourcing, software delivery, and how senior teams actually ship in 2026.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </article>

            {/* ===== RELATED ARTICLES ===== */}
            {related.length > 0 && (
                <section className="bg-brand-light py-14 md:py-16 border-t border-gray-100">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <FadeIn>
                            <div className="flex items-center gap-3 mb-8">
                                <h2 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gray-500">Keep reading</h2>
                                <span className="flex-1 h-px bg-gray-200" />
                                <a
                                    href="/blog"
                                    onClick={handleBackNav}
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:text-brand-orange transition-colors"
                                >
                                    All articles
                                    <Icon.Arrow />
                                </a>
                            </div>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
                            {related.map((p, idx) => (
                                <FadeIn key={p.id} delay={idx * 60}>
                                    <article>
                                        <a href={`/blog/${p.id}`} onClick={(e) => handleRelatedNav(e, p.id)} className="group block">
                                            <div className="aspect-[16/10] overflow-hidden rounded-xl bg-gray-100 mb-4">
                                                <img
                                                    src={p.imageUrl}
                                                    alt={p.title}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                                />
                                            </div>
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-orange mb-2">
                                                {p.category}
                                            </p>
                                            <h3 className="text-lg font-bold text-brand-dark tracking-tight leading-snug mb-2 group-hover:text-brand-orange transition-colors line-clamp-2">
                                                {p.title}
                                            </h3>
                                            <p className="text-[13.5px] text-gray-600 leading-relaxed line-clamp-2 mb-3">
                                                {p.excerpt}
                                            </p>
                                            <div className="flex items-center gap-2.5 text-[12px] text-gray-500">
                                                <div className={`w-5 h-5 rounded-full ${authorColor(p.author)} text-white flex items-center justify-center text-[9px] font-semibold`}>
                                                    {getInitials(p.author)}
                                                </div>
                                                <span className="font-medium text-brand-dark">{p.author}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                <time dateTime={p.date}>{formatDate(p.date)}</time>
                                            </div>
                                        </a>
                                    </article>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default BlogPostPage;
