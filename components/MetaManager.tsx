import React, { useEffect } from 'react';
import { PageMetadata } from '../seo';

// Helper function to set/create meta tags by name or property
const setMetaTag = (attr: 'name' | 'property', value: string, content: string) => {
    const selector = `meta[${attr}="${value}"]`;
    let element = document.querySelector(selector);
    
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
};

// Helper function to set/create link tags
const setLinkTag = (rel: string, href: string) => {
    const selector = `link[rel="${rel}"]`;
    let element = document.querySelector(selector) as HTMLLinkElement | null;
    
    if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
    }
    element.setAttribute('href', href);
};

// Helper to manage the structured data script
const setStructuredData = (data: string) => {
    const scriptId = 'structured-data-json-ld';
    // FIX: Cast the result of getElementById to let TypeScript know that if this element exists, it's a script tag.
    // This resolves the error "Property 'type' does not exist on type 'HTMLElement'".
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }
    script.textContent = data;
}


const MetaManager: React.FC<PageMetadata> = (props) => {
    useEffect(() => {
        document.title = props.title;
        setMetaTag('name', 'description', props.description);
        setMetaTag('name', 'keywords', props.keywords);

        // Canonical
        setLinkTag('canonical', props.ogUrl);

        // Open Graph
        setMetaTag('property', 'og:title', props.ogTitle);
        setMetaTag('property', 'og:description', props.ogDescription);
        setMetaTag('property', 'og:image', props.ogImage);
        setMetaTag('property', 'og:url', props.ogUrl);
        setMetaTag('property', 'og:type', props.ogType);
        setMetaTag('property', 'og:site_name', 'Stallioni');
        setMetaTag('property', 'og:locale', 'en_US');


        // Twitter Card
        setMetaTag('name', 'twitter:card', 'summary_large_image');
        setMetaTag('name', 'twitter:title', props.ogTitle);
        setMetaTag('name', 'twitter:description', props.ogDescription);
        setMetaTag('name', 'twitter:image', props.ogImage);

        // Structured Data
        if (props.structuredData) {
            setStructuredData(props.structuredData);
        }

    }, [props]);

    return null;
};

export default MetaManager;
