import React from 'react';

interface FreelancerBadgeProps {
    variant?: 'light' | 'dark';
    size?: 'sm' | 'md';
}

const StarIcon = ({ className = '' }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const ExternalLinkIcon = ({ className = '' }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

/**
 * Verifiable trust badge linking to the public Freelancer.com profile.
 * Stats are hard-coded from the profile snapshot — update if the numbers
 * drift significantly. Profile: https://www.freelancer.com/u/graphicaa
 */
const FreelancerBadge: React.FC<FreelancerBadgeProps> = ({ variant = 'dark', size = 'md' }) => {
    const baseClasses = variant === 'dark'
        ? 'bg-white/5 border-white/15 text-white hover:bg-white/10 hover:border-white/30'
        : 'bg-white border-slate-200 text-slate-800 hover:border-brand-orange/50 hover:shadow-md';

    const subtextClasses = variant === 'dark' ? 'text-blue-200' : 'text-slate-500';

    const padding = size === 'sm' ? 'px-3 py-2' : 'px-4 py-3';
    const titleSize = size === 'sm' ? 'text-sm' : 'text-base';
    const subSize = size === 'sm' ? 'text-xs' : 'text-sm';

    return (
        <a
            href="https://www.freelancer.com/u/graphicaa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Verify our 978 reviews and 4.8 star rating on Freelancer.com"
            className={`inline-flex items-center gap-3 rounded-xl border transition-all ${padding} ${baseClasses}`}
        >
            <div className="flex items-center gap-1 text-yellow-400 flex-shrink-0">
                {[0, 1, 2, 3, 4].map(i => (
                    <StarIcon key={i} className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                ))}
            </div>
            <div className="flex flex-col leading-tight">
                <span className={`${titleSize} font-bold`}>4.8 / 5 · 978 reviews</span>
                <span className={`${subSize} ${subtextClasses}`}>Verified on Freelancer.com since 2007</span>
            </div>
            <ExternalLinkIcon className={size === 'sm' ? 'w-3.5 h-3.5 opacity-60' : 'w-4 h-4 opacity-60'} />
        </a>
    );
};

export default FreelancerBadge;
