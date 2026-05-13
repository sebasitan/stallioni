import type { NavLink } from '../types';

// --- Obfuscated Contact Info ---
const emailParts = { user: 'contact', domain: 'stallioni', tld: 'com' };

// Two WhatsApp contacts — shown by name, numbers never rendered in UI.
export interface WhatsAppContact {
    name: string;
    number: string; // E.164 without the leading +
}

export const WHATSAPP_CONTACTS: WhatsAppContact[] = [
    { name: 'Sathies', number: '919843296279' },
    { name: 'Gopal', number: '919843274279' },
];

// Microsoft Teams handle for direct chat deep-links.
const teamsIdParts = { user: 'head_stallioni', domain: 'stallioni', tld: 'com' };

export const getContactEmail = (): string => `${emailParts.user}@${emailParts.domain}.${emailParts.tld}`;
export const getTeamsId = (): string => `${teamsIdParts.user}@${teamsIdParts.domain}.${teamsIdParts.tld}`;

// Primary WhatsApp number used when a single link is needed (FAB, chatbot, etc.).
export const getWhatsAppPhone = (): string => WHATSAPP_CONTACTS[0].number;

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
