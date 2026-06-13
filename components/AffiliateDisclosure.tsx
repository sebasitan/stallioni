import React from 'react';

interface AffiliateDisclosureProps {
    variant?: 'banner' | 'inline';
}

/**
 * FTC-compliant disclosure for affiliate content.
 *
 * Required by:
 *   - FTC 16 CFR Part 255 (US)
 *   - ASA CAP Code (UK)
 *   - ACCC Australian Consumer Law
 *   - EU Digital Services Act
 *
 * Must appear ABOVE the first affiliate link on every page that contains
 * affiliate links. The `banner` variant is the prominent one — use that at
 * the top of every article. The `inline` variant is a compact pill for
 * inside content blocks.
 */
const AffiliateDisclosure: React.FC<AffiliateDisclosureProps> = ({ variant = 'banner' }) => {
    if (variant === 'inline') {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                    />
                </svg>
                Contains affiliate links
            </span>
        );
    }

    return (
        <aside
            role="note"
            aria-label="Affiliate disclosure"
            className="not-prose bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-md my-6 text-sm text-amber-900"
        >
            <p className="flex items-start gap-2">
                <svg
                    className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                    />
                </svg>
                <span>
                    <strong className="font-bold">Disclosure:</strong> This page contains affiliate links.
                    We may earn a small commission when you sign up through these links — at no extra cost
                    to you. We only recommend tools we have personally used on real client projects.
                </span>
            </p>
        </aside>
    );
};

export default AffiliateDisclosure;
