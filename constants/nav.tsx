import type { NavLink } from '../types';

// --- Obfuscated Contact Info ---
const emailParts = { user: 'seba', domain: 'stallioni', tld: 'com' };
const whatsAppPhoneParts = { country: '91', number: '6383680419' };
const callPhoneParts = { country: '91', number: '9843296279' };

export const getContactEmail = (): string => `${emailParts.user}@${emailParts.domain}.${emailParts.tld}`;
export const getWhatsAppPhone = (): string => `${whatsAppPhoneParts.country}${whatsAppPhoneParts.number}`;
export const getCallPhone = (): string => `${callPhoneParts.country}${callPhoneParts.number}`;

export const NAV_LINKS: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/careers', label: 'Careers' },
];
