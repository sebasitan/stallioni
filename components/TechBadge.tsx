import React from 'react';

/**
 * Map of common tech names → official simple-icons slug + brand color.
 * Source: https://simpleicons.org (CDN: https://cdn.simpleicons.org)
 * Keys are normalised: lower-case, trimmed.
 */
const TECH_ICON_MAP: Record<string, { slug: string; color: string }> = {
    // Frontend frameworks
    'react': { slug: 'react', color: '61DAFB' },
    'react.js': { slug: 'react', color: '61DAFB' },
    'reactjs': { slug: 'react', color: '61DAFB' },
    'react native': { slug: 'react', color: '61DAFB' },
    'next.js': { slug: 'nextdotjs', color: '000000' },
    'nextjs': { slug: 'nextdotjs', color: '000000' },
    'vue': { slug: 'vuedotjs', color: '4FC08D' },
    'vue.js': { slug: 'vuedotjs', color: '4FC08D' },
    'vuejs': { slug: 'vuedotjs', color: '4FC08D' },
    'angular': { slug: 'angular', color: 'DD0031' },
    'svelte': { slug: 'svelte', color: 'FF3E00' },
    'sveltekit': { slug: 'svelte', color: 'FF3E00' },
    'astro': { slug: 'astro', color: 'BC52EE' },
    'remix': { slug: 'remix', color: '000000' },
    'nuxt': { slug: 'nuxt', color: '00DC82' },
    'nuxt.js': { slug: 'nuxt', color: '00DC82' },
    'gatsby': { slug: 'gatsby', color: '663399' },

    // Languages
    'typescript': { slug: 'typescript', color: '3178C6' },
    'javascript': { slug: 'javascript', color: 'F7DF1E' },
    'python': { slug: 'python', color: '3776AB' },
    'java': { slug: 'openjdk', color: '437291' },
    '.net': { slug: 'dotnet', color: '512BD4' },
    'dotnet': { slug: 'dotnet', color: '512BD4' },
    'c#': { slug: 'dotnet', color: '512BD4' },
    'go': { slug: 'go', color: '00ADD8' },
    'golang': { slug: 'go', color: '00ADD8' },
    'rust': { slug: 'rust', color: '000000' },
    'ruby': { slug: 'ruby', color: 'CC342D' },
    'kotlin': { slug: 'kotlin', color: '7F52FF' },
    'swift': { slug: 'swift', color: 'F05138' },
    'dart': { slug: 'dart', color: '0175C2' },
    'php': { slug: 'php', color: '777BB4' },
    'html5': { slug: 'html5', color: 'E34F26' },
    'html': { slug: 'html5', color: 'E34F26' },
    'css3': { slug: 'css', color: '1572B6' },
    'css': { slug: 'css', color: '1572B6' },
    'sass': { slug: 'sass', color: 'CC6699' },
    'scss': { slug: 'sass', color: 'CC6699' },

    // Backend / PHP frameworks
    'node.js': { slug: 'nodedotjs', color: '5FA04E' },
    'node': { slug: 'nodedotjs', color: '5FA04E' },
    'nodejs': { slug: 'nodedotjs', color: '5FA04E' },
    'express': { slug: 'express', color: '000000' },
    'nestjs': { slug: 'nestjs', color: 'E0234E' },
    'django': { slug: 'django', color: '092E20' },
    'flask': { slug: 'flask', color: '000000' },
    'fastapi': { slug: 'fastapi', color: '009688' },
    'spring': { slug: 'spring', color: '6DB33F' },
    'spring boot': { slug: 'spring', color: '6DB33F' },
    'laravel': { slug: 'laravel', color: 'FF2D20' },
    'symfony': { slug: 'symfony', color: '000000' },
    'codeigniter': { slug: 'codeigniter', color: 'EF4223' },
    'ruby on rails': { slug: 'rubyonrails', color: 'D30001' },
    'rails': { slug: 'rubyonrails', color: 'D30001' },

    // Mobile
    'flutter': { slug: 'flutter', color: '02569B' },
    'ios': { slug: 'ios', color: '000000' },
    'android': { slug: 'android', color: '34A853' },
    'ionic': { slug: 'ionic', color: '3880FF' },
    'capacitor': { slug: 'capacitor', color: '119EFF' },
    'expo': { slug: 'expo', color: '000020' },

    // Databases
    'mongodb': { slug: 'mongodb', color: '47A248' },
    'postgresql': { slug: 'postgresql', color: '4169E1' },
    'postgres': { slug: 'postgresql', color: '4169E1' },
    'mysql': { slug: 'mysql', color: '4479A1' },
    'redis': { slug: 'redis', color: 'DC382D' },
    'sqlite': { slug: 'sqlite', color: '003B57' },
    'firebase': { slug: 'firebase', color: 'FFCA28' },
    'supabase': { slug: 'supabase', color: '3FCF8E' },
    'planetscale': { slug: 'planetscale', color: '000000' },
    'elasticsearch': { slug: 'elasticsearch', color: '005571' },

    // APIs / protocols
    'graphql': { slug: 'graphql', color: 'E10098' },
    'socket.io': { slug: 'socketdotio', color: '010101' },
    'websockets': { slug: 'socketdotio', color: '010101' },
    'websocket': { slug: 'socketdotio', color: '010101' },
    'webrtc': { slug: 'webrtc', color: '333333' },

    // AI / ML
    'tensorflow': { slug: 'tensorflow', color: 'FF6F00' },
    'pytorch': { slug: 'pytorch', color: 'EE4C2C' },
    'anthropic': { slug: 'anthropic', color: 'D97757' },
    'claude': { slug: 'anthropic', color: 'D97757' },
    'gemini': { slug: 'googlegemini', color: '8E75B2' },
    'hugging face': { slug: 'huggingface', color: 'FFD21E' },
    'huggingface': { slug: 'huggingface', color: 'FFD21E' },
    'langchain': { slug: 'langchain', color: '1C3C3C' },
    'scikit-learn': { slug: 'scikitlearn', color: 'F7931E' },
    'pandas': { slug: 'pandas', color: '150458' },
    'numpy': { slug: 'numpy', color: '013243' },
    'keras': { slug: 'keras', color: 'D00000' },

    // Cloud / DevOps
    'google cloud': { slug: 'googlecloud', color: '4285F4' },
    'gcp': { slug: 'googlecloud', color: '4285F4' },
    'docker': { slug: 'docker', color: '2496ED' },
    'kubernetes': { slug: 'kubernetes', color: '326CE5' },
    'k8s': { slug: 'kubernetes', color: '326CE5' },
    'terraform': { slug: 'terraform', color: '7B42BC' },
    'ansible': { slug: 'ansible', color: 'EE0000' },
    'jenkins': { slug: 'jenkins', color: 'D24939' },
    'circleci': { slug: 'circleci', color: '343434' },
    'github actions': { slug: 'githubactions', color: '2088FF' },
    'gitlab': { slug: 'gitlab', color: 'FCA121' },
    'github': { slug: 'github', color: '181717' },
    'vercel': { slug: 'vercel', color: '000000' },
    'netlify': { slug: 'netlify', color: '00C7B7' },
    'cloudflare': { slug: 'cloudflare', color: 'F38020' },
    'nginx': { slug: 'nginx', color: '009639' },
    'datadog': { slug: 'datadog', color: '632CA6' },
    'grafana': { slug: 'grafana', color: 'F46800' },
    'prometheus': { slug: 'prometheus', color: 'E6522C' },

    // CMS / E-commerce
    'wordpress': { slug: 'wordpress', color: '21759B' },
    'shopify': { slug: 'shopify', color: '7AB55C' },
    'woocommerce': { slug: 'woocommerce', color: '96588A' },
    'bigcommerce': { slug: 'bigcommerce', color: '121118' },
    'webflow': { slug: 'webflow', color: '146EF5' },
    'wix': { slug: 'wix', color: '0C6EFC' },
    'joomla': { slug: 'joomla', color: '5091CD' },
    'drupal': { slug: 'drupal', color: '0678BE' },
    'squarespace': { slug: 'squarespace', color: '000000' },
    'ghost': { slug: 'ghost', color: '15171A' },
    'strapi': { slug: 'strapi', color: '4945FF' },
    'sanity': { slug: 'sanity', color: 'F03E2F' },
    'contentful': { slug: 'contentful', color: '2478CC' },
    'prismic': { slug: 'prismic', color: '5163BA' },

    // Design / prototype tools
    'figma': { slug: 'figma', color: 'F24E1E' },
    'sketch': { slug: 'sketch', color: 'F7B500' },
    'framer': { slug: 'framer', color: '0055FF' },
    'maze': { slug: 'maze', color: '7F44FE' },
    'storybook': { slug: 'storybook', color: 'FF4785' },
    'miro': { slug: 'miro', color: 'FFD02F' },
    'notion': { slug: 'notion', color: '000000' },

    // CSS frameworks
    'tailwind': { slug: 'tailwindcss', color: '06B6D4' },
    'tailwind css': { slug: 'tailwindcss', color: '06B6D4' },
    'tailwindcss': { slug: 'tailwindcss', color: '06B6D4' },
    'bootstrap': { slug: 'bootstrap', color: '7952B3' },
    'material-ui': { slug: 'mui', color: '007FFF' },
    'mui': { slug: 'mui', color: '007FFF' },
    'chakra ui': { slug: 'chakraui', color: '319795' },

    // Automation / no-code
    'zapier': { slug: 'zapier', color: 'FF4A00' },
    'make': { slug: 'make', color: '6D00CC' },
    'n8n': { slug: 'n8n', color: 'EA4B71' },
    'airtable': { slug: 'airtable', color: '18BFFF' },

    // Business / CRM
    'hubspot': { slug: 'hubspot', color: 'FF7A59' },
    'zoho': { slug: 'zoho', color: 'C8202F' },
    'intercom': { slug: 'intercom', color: '1F8DED' },

    // Payments
    'stripe': { slug: 'stripe', color: '635BFF' },
    'paypal': { slug: 'paypal', color: '003087' },
    'razorpay': { slug: 'razorpay', color: '0C2451' },
    'square': { slug: 'square', color: '000000' },

    // Marketing / SEO
    'google ads': { slug: 'googleads', color: '4285F4' },
    'google analytics': { slug: 'googleanalytics', color: 'E37400' },
    'mailchimp': { slug: 'mailchimp', color: '000000' },
    'semrush': { slug: 'semrush', color: 'FF642D' },
    'meta': { slug: 'meta', color: '0467DF' },

    // CSS specifics / techniques (no logo) — handled via fallback dot
};

function lookup(name: string): { slug: string; color: string } | null {
    if (!name) return null;
    const key = name.toLowerCase().trim();
    if (TECH_ICON_MAP[key]) return TECH_ICON_MAP[key];

    // Strip version suffixes like " 3", " 3.5", " v2" and try again
    const stripped = key.replace(/\s*v?\d+(\.\d+)*$/, '').trim();
    if (stripped !== key && TECH_ICON_MAP[stripped]) return TECH_ICON_MAP[stripped];

    // Try removing common qualifiers
    const cleaned = stripped.replace(/\s*(framework|platform|api|apis|app|sdk|library|cms|stack)$/i, '').trim();
    if (cleaned !== stripped && TECH_ICON_MAP[cleaned]) return TECH_ICON_MAP[cleaned];

    return null;
}

/**
 * Inline tech badge: real brand logo (if available) + name.
 * Falls back to a small brand-orange dot when the name has no matching logo.
 */
const TechBadge: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
    const icon = lookup(name);
    const base = 'inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-2.5 py-1 text-xs font-medium text-brand-dark whitespace-nowrap';
    return (
        <span className={`${base} ${className || ''}`.trim()}>
            {icon ? (
                <img
                    src={`https://cdn.simpleicons.org/${icon.slug}/${icon.color}`}
                    alt=""
                    aria-hidden="true"
                    className="w-3.5 h-3.5 object-contain flex-shrink-0"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" aria-hidden="true" />
            )}
            <span>{name}</span>
        </span>
    );
};

export default TechBadge;
