import React, { useState } from 'react';
import { NAV_LINKS, getContactEmail, getTeamsId, WHATSAPP_CONTACTS } from '../constants';
import { SocialIcons } from './IconComponents';
import { useNavigation, useToast } from '../App';
import FreelancerBadge from './FreelancerBadge';
import { getRecaptchaToken } from '../utils/recaptcha';

const EmailIcon = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>);
const LocationIcon = () => (<svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>);
const WhatsAppIcon = () => (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>);
const TeamsIcon = () => (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54,17.22H11.44V12.22H6.24V10.12C6.24,8.4,6.68,7.24,9,7.24h4.51v1.78H9.21c-0.96,0-1.12,0.36-1.12,1.1v2.1h5.45v5ZM21.54,5.73v8.52c0,3.19-2.28,5.47-5.47,5.47H6.68L0,22.5V5.73C0,2.54,2.28,0.26,5.47,0.26h10.6C19.25,0.26,21.54,2.54,21.54,5.73Z" /></svg>);


const Footer: React.FC = () => {
  const { navigate } = useNavigation();
  const { showToast } = useToast();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  const handleContactClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    type: 'email' | 'whatsapp' | 'teams',
    target?: string,
  ) => {
    e.preventDefault();
    let url = '';
    switch (type) {
      case 'email':
        try {
          await navigator.clipboard.writeText(getContactEmail());
          showToast('Email address copied!', 'success');
        } catch (err) {
          showToast('Failed to copy email.', 'error');
        }
        return;
      case 'whatsapp':
        url = target || '';
        break;
      case 'teams':
        url = `https://teams.microsoft.com/l/chat/0/0?users=${getTeamsId()}`;
        break;
    }

    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  };

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;

    if (submitButton) submitButton.disabled = true;

    try {
      // 1. Generate reCAPTCHA Token (waits for the async script to finish loading)
      const recaptchaToken = await getRecaptchaToken('newsletter_subscription');

      // 2. Prepare data
      const data = Object.fromEntries(formData.entries());
      data.recaptchaToken = recaptchaToken;
      // Add missing fields for the generic contact API
      data.name = 'Newsletter Subscriber';
      data.message = 'New Newsletter Subscription Request';

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // GA4 tracking
        if (typeof window.gtag === 'function') {
          window.gtag("event", "generate_lead", {
            method: "newsletter_signup",
          });
        }

        showToast("You've successfully subscribed to our newsletter! Expect insights in your inbox soon.", 'success');
        form.reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Subscription failed');
      }
    } catch (error: any) {
      showToast(error.message || 'There was an error subscribing. Please try again.', 'error');
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  };

  return (
    <footer className="bg-brand-dark text-white relative overflow-hidden">
      {/* Top accent strip — visually separates footer from CTA */}
      <div className="h-1 bg-brand-orange" aria-hidden="true" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #FF6633 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-6 max-w-[1400px] relative">

        {/* TOP: Brand statement + Newsletter card */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 pt-12 pb-10 md:pt-14 md:pb-12 border-b border-white/10">
          {/* Brand statement */}
          <div className="lg:col-span-7">
            <img src="/logo.svg" alt="Stallioni Logo" className="h-8 w-auto mb-6" style={{ filter: 'brightness(0) invert(1)' }} width="210" height="42" />
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.025em] leading-[1.15] mb-4 max-w-2xl">
              Building digital products with the world's <span className="text-brand-orange">best remote teams.</span>
            </h3>
            <p className="text-white/60 leading-relaxed max-w-xl mb-7">
              Web, E-commerce, Mobile & AI-powered solutions for clients across 35+ countries.
            </p>
            <div className="flex items-center gap-5">
              <div className="flex space-x-4 text-white/40">
                <SocialIcons />
              </div>
              <span className="w-px h-6 bg-white/15" />
              <FreelancerBadge variant="dark" size="sm" />
            </div>
          </div>

          {/* Newsletter card */}
          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-orange">Newsletter</span>
                <span className="bg-brand-orange/20 text-brand-orange text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-widest">Weekly</span>
              </div>
              <h4 className="text-xl font-bold tracking-tight mb-2 leading-tight">
                Insights from our team.
              </h4>
              <p className="text-white/60 text-sm mb-5 leading-relaxed">
                Tech, outsourcing, and digital strategy — straight to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit}>
                <input type="hidden" name="_subject" value="New Newsletter Subscription from Stallioni Website" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="_gotcha" aria-hidden="true" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', opacity: 0 }} />
                <div className="flex gap-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    required
                    aria-label="Email for newsletter"
                    className="w-full px-4 py-2.5 text-white bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange placeholder:text-white/40 text-sm transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-brand-orange text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-brand-orange-hover transition-colors flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="text-[11px] text-white/40 mt-3">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>

        {/* MIDDLE: Contact channels + Link columns */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 py-12">

          {/* Quick contact channels */}
          <div className="lg:col-span-5">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-5">Get in touch</h3>
            <div className="space-y-2">
              <a
                href="#"
                onClick={(e) => handleContactClick(e, 'email')}
                className="group flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-brand-orange rounded-xl p-3 transition-colors"
              >
                <span className="w-9 h-9 rounded-lg bg-brand-orange/15 text-brand-orange flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  <EmailIcon />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">Email us</p>
                  <p className="text-xs text-white/50 truncate">
                    contact<span style={{ display: 'none' }}>.</span>@<span style={{ display: 'none' }}>.</span>stallioni.com
                  </p>
                </div>
                <span className="text-[10px] font-mono text-white/30 tracking-widest">COPY</span>
              </a>

              {WHATSAPP_CONTACTS.map((contact) => (
                <a
                  key={contact.name}
                  href="#"
                  onClick={(e) => handleContactClick(e, 'whatsapp', contact.url)}
                  className="group flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-brand-orange rounded-xl p-3 transition-colors"
                >
                  <span className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <WhatsAppIcon />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">Chat on WhatsApp</p>
                    <p className="text-xs text-white/50">Quick replies from the team</p>
                  </div>
                  <span className="text-[10px] font-mono text-white/30 tracking-widest">CHAT</span>
                </a>
              ))}

              <a
                href="#"
                onClick={(e) => handleContactClick(e, 'teams')}
                className="group flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-brand-orange rounded-xl p-3 transition-colors"
              >
                <span className="w-9 h-9 rounded-lg bg-violet-500/15 text-violet-400 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                  <TeamsIcon />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">Microsoft Teams</p>
                  <p className="text-xs text-white/50">For enterprise teams</p>
                </div>
                <span className="text-[10px] font-mono text-white/30 tracking-widest">JOIN</span>
              </a>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3 mt-5 text-white/50 text-[13px] leading-relaxed">
              <span className="text-brand-orange mt-0.5 flex-shrink-0">
                <LocationIcon />
              </span>
              <span>23 Jayanth Complex, TP Road, Annur, Coimbatore-641653, Tamil Nadu, India</span>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Company */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-5">Company</h3>
              <ul className="space-y-3 text-sm">
                {NAV_LINKS.map(link => (
                  <li key={link.href}>
                    <a href={link.href} onClick={(e) => handleNav(e, link.href)} className="text-white/70 hover:text-brand-orange transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="text-white/70 hover:text-brand-orange transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-5">Services</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/services/website-design-development" onClick={(e) => handleNav(e, '/services/website-design-development')} className="text-white/70 hover:text-brand-orange transition-colors">Web Development</a></li>
                <li><a href="/services/mobile-app-development" onClick={(e) => handleNav(e, '/services/mobile-app-development')} className="text-white/70 hover:text-brand-orange transition-colors">Mobile Apps</a></li>
                <li><a href="/services/ecommerce-development" onClick={(e) => handleNav(e, '/services/ecommerce-development')} className="text-white/70 hover:text-brand-orange transition-colors">E-commerce</a></li>
                <li><a href="/services/saas-development" onClick={(e) => handleNav(e, '/services/saas-development')} className="text-white/70 hover:text-brand-orange transition-colors">SaaS Development</a></li>
                <li><a href="/services/ai-automation-modern-tech" onClick={(e) => handleNav(e, '/services/ai-automation-modern-tech')} className="text-white/70 hover:text-brand-orange transition-colors">AI & Automation</a></li>
                <li><a href="/services/seo-digital-marketing" onClick={(e) => handleNav(e, '/services/seo-digital-marketing')} className="text-white/70 hover:text-brand-orange transition-colors">SEO & Marketing</a></li>
              </ul>
            </div>

            {/* Regions */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-5">Regions</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { code: 'us', name: 'United States', href: '/it-outsourcing/usa' },
                  { code: 'au', name: 'Australia', href: '/it-outsourcing/australia' },
                  { code: 'in', name: 'India', href: '/it-outsourcing/india' },
                ].map((region) => (
                  <li key={region.code}>
                    <a
                      href={region.href}
                      onClick={(e) => handleNav(e, region.href)}
                      className="inline-flex items-center gap-2 text-white/70 hover:text-brand-orange transition-colors"
                    >
                      <span className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={`https://flagcdn.com/w40/${region.code}.png`}
                          alt=""
                          width="16"
                          height="16"
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </span>
                      {region.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM: Copyright bar */}
        <div className="py-5 border-t border-white/10 flex flex-col gap-3 text-white/40 text-xs">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p>&copy; {new Date().getFullYear()} Stallioni Net Solutions. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                All systems operational
              </span>
              <span className="text-white/20">·</span>
              <a href="/privacy-policy" onClick={(e) => handleNav(e, '/privacy-policy')} className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            </div>
          </div>
          {/* reCAPTCHA legal notice — required when the badge is hidden */}
          <p className="text-white/30 text-[11px] leading-relaxed text-center sm:text-left">
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/60 transition-colors">Privacy Policy</a>{' '}
            and{' '}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/60 transition-colors">Terms of Service</a>{' '}
            apply.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
