import React, { useEffect } from 'react';
import { useNavigation } from '../App';
import FadeIn from '../components/FadeIn';

// ============================================
// Helpful suggestion tiles shown on the 404 page
// ============================================
const SUGGESTIONS = [
    { label: 'Services',  href: '/services',  desc: 'Browse 50+ outsourcing services we offer.' },
    { label: 'Portfolio', href: '/portfolio', desc: '900+ projects delivered across 35+ countries.' },
    { label: 'Blog',      href: '/blog',      desc: 'Recent articles from our engineering team.' },
    { label: 'Contact',   href: '/contact',   desc: "Tell us about your project — we'll reply in 24 hours." },
];

const ArrowIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

const NotFoundPage: React.FC = () => {
    const { navigate } = useNavigation();

    useEffect(() => {
        // Tell the browser/crawler this is a 404 via the page title.
        // (We can't return real HTTP 404 from a SPA, but we make the title clear.)
        document.title = '404 — Page not found | Stallioni';
        const meta = document.querySelector('meta[name="robots"]');
        if (meta) meta.setAttribute('content', 'noindex, follow');
        return () => {
            if (meta) meta.setAttribute('content', 'index, follow');
        };
    }, []);

    const go = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        navigate(path);
    };

    return (
        <section className="bg-white">
            <div className="container mx-auto px-6 max-w-3xl py-20 md:py-28 text-center">
                <FadeIn>
                    <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-4">Error 404</p>
                    <h1 className="text-4xl md:text-5xl lg:text-[3rem] font-bold text-brand-dark tracking-[-0.02em] leading-[1.1] mb-5">
                        We couldn't find that page.
                    </h1>
                    <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto mb-10">
                        The link may be broken, the page may have been moved, or it never existed. Try one of the popular destinations below — or head back to the homepage.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
                        <a
                            href="/"
                            onClick={(e) => go(e, '/')}
                            className="group inline-flex items-center justify-center gap-2 bg-brand-orange text-white text-sm font-medium py-3 pl-6 pr-2.5 rounded-full hover:bg-brand-orange-hover transition-colors"
                        >
                            Back to home
                            <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform text-brand-orange">
                                <ArrowIcon />
                            </span>
                        </a>
                        <a
                            href="/contact"
                            onClick={(e) => go(e, '/contact')}
                            className="inline-flex items-center justify-center gap-2 border border-gray-300 text-brand-dark text-sm font-medium py-3 px-6 rounded-full hover:border-brand-dark hover:bg-brand-light transition-colors"
                        >
                            Report a broken link
                        </a>
                    </div>
                </FadeIn>

                <FadeIn delay={120}>
                    <div className="grid sm:grid-cols-2 gap-3 text-left">
                        {SUGGESTIONS.map((s) => (
                            <a
                                key={s.href}
                                href={s.href}
                                onClick={(e) => go(e, s.href)}
                                className="group bg-white border border-gray-200 hover:border-brand-orange rounded-xl p-5 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-1.5">
                                    <h2 className="text-sm font-bold text-brand-dark tracking-tight group-hover:text-brand-orange transition-colors">
                                        {s.label}
                                    </h2>
                                    <span className="text-brand-orange group-hover:translate-x-0.5 transition-transform">
                                        <ArrowIcon />
                                    </span>
                                </div>
                                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
                            </a>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default NotFoundPage;
