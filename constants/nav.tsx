import type { NavLink } from '../types';

// --- Obfuscated Contact Info ---
const emailParts = { user: 'contact', domain: 'stallioni', tld: 'com' };

// Single WhatsApp group — visitors are routed to the Stallioni support group.
export interface WhatsAppContact {
    name: string;
    url: string; // full WhatsApp URL (group invite or wa.me)
}

export const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/Gm0SQQtnheB41ttEKKFXEj';

export const WHATSAPP_CONTACTS: WhatsAppContact[] = [
    { name: 'Stallioni Support Group', url: WHATSAPP_GROUP_URL },
];

// Microsoft Teams handle for direct chat deep-links.
const teamsIdParts = { user: 'head_stallioni', domain: 'stallioni', tld: 'com' };

export const getContactEmail = (): string => `${emailParts.user}@${emailParts.domain}.${emailParts.tld}`;
export const getTeamsId = (): string => `${teamsIdParts.user}@${teamsIdParts.domain}.${teamsIdParts.tld}`;

// Returns the canonical WhatsApp URL (group invite). Kept named `getWhatsAppPhone`
// for backward compat with existing call sites that pass it straight to window.open.
export const getWhatsAppPhone = (): string => WHATSAPP_GROUP_URL;
export const getWhatsAppUrl = (): string => WHATSAPP_GROUP_URL;

// Production site key — restricted to stallioni.com. On localhost we fall back
// to Google's universal test key so dev environments don't fail captcha
// verification with "ERROR for site owner: invalid site key".
const PROD_RECAPTCHA_SITE_KEY = '6Ld3zuwsAAAAAMQ0mOVBl6M9g_apTkBK4Av3glQp';
const TEST_RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

const isLocalHost = (): boolean => {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname;
    return host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
};

export const RECAPTCHA_SITE_KEY = isLocalHost() ? TEST_RECAPTCHA_SITE_KEY : PROD_RECAPTCHA_SITE_KEY;

export const NAV_LINKS: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/careers', label: 'Careers' },
];
