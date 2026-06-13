import React from 'react';

interface AffiliateLinkProps {
    /** The destination URL (your affiliate link from the program dashboard). */
    href: string;
    /** Program identifier for analytics — e.g., 'shopify', 'cloudways', 'kinsta'. */
    provider: string;
    /** Where on the page this link appears — used for click attribution. */
    position?: 'inline' | 'card' | 'cta' | 'table' | 'header' | 'footer';
    /** Article slug for tracking which page drove the click. */
    articleSlug?: string;
    /** Optional class overrides. */
    className?: string;
    /** Visual variant — default unstyled, 'button' for CTA buttons. */
    variant?: 'inline' | 'button';
    children: React.ReactNode;
}

/**
 * Affiliate link with FTC + Google-safe attributes baked in.
 *
 *   - rel="nofollow sponsored noopener noreferrer"
 *     → tells Google these are paid recommendations and shouldn't pass authority
 *   - target="_blank"
 *     → opens in new tab so the visitor doesn't lose our site
 *   - onClick handler
 *     → fires a GA4 `affiliate_click` event with provider/position/article params
 *       so we can see exactly which articles and which CTAs convert
 *
 * Usage:
 *   <AffiliateLink href="https://shopify.com/?ref=stallioni" provider="shopify" position="cta">
 *     Try Shopify Free
 *   </AffiliateLink>
 */
const AffiliateLink: React.FC<AffiliateLinkProps> = ({
    href,
    provider,
    position = 'inline',
    articleSlug,
    className = '',
    variant = 'inline',
    children,
}) => {
    const handleClick = () => {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'affiliate_click', {
                event_category: 'Affiliate',
                event_label: provider,
                provider,
                position,
                article_slug: articleSlug || 'unknown',
                outbound_url: href,
            });
        }
    };

    const baseClasses =
        variant === 'button'
            ? 'inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md'
            : 'text-brand-orange hover:text-brand-orange/80 underline underline-offset-2 font-medium';

    return (
        <a
            href={href}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            onClick={handleClick}
            data-provider={provider}
            data-position={position}
            className={`${baseClasses} ${className}`}
        >
            {children}
            {variant === 'button' && (
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            )}
        </a>
    );
};

export default AffiliateLink;
