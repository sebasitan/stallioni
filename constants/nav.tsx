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

// Change this to your production site key
export const RECAPTCHA_SITE_KEY = '6Lf0E0osAAAAADeWr5AGvZ-DCJpXhYtUqxNPi5kW';

export const NAV_LINKS: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/careers', label: 'Careers' },
];
