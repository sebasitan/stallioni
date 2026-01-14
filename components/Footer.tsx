import React, { useState } from 'react';
import { NAV_LINKS, getContactEmail, getCallPhone, getWhatsAppPhone, RECAPTCHA_SITE_KEY } from '../constants';
import { SocialIcons } from './IconComponents';
import { useNavigation, useToast } from '../App';

const EmailIcon = () => (<svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>);
const PhoneIcon = () => (<svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>);
const LocationIcon = () => (<svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>);
const WhatsAppIcon = () => (<svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>);
const TeamsIcon = () => (<svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54,17.22H11.44V12.22H6.24V10.12C6.24,8.4,6.68,7.24,9,7.24h4.51v1.78H9.21c-0.96,0-1.12,0.36-1.12,1.1v2.1h5.45v5ZM21.54,5.73v8.52c0,3.19-2.28,5.47-5.47,5.47H6.68L0,22.5V5.73C0,2.54,2.28,0.26,5.47,0.26h10.6C19.25,0.26,21.54,2.54,21.54,5.73Z" /></svg>);


const Footer: React.FC = () => {
  const { navigate } = useNavigation();
  const { showToast } = useToast();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  const handleContactClick = async (e: React.MouseEvent<HTMLAnchorElement>, type: 'email' | 'tel' | 'whatsapp' | 'teams') => {
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
      case 'tel':
        url = `tel:+${getCallPhone()}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/${getWhatsAppPhone()}`;
        break;
      case 'teams':
        url = `msteams:/l/chat/0/0?users=${getContactEmail()}`;
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
      // 1. Generate reCAPTCHA Token
      if (typeof window.grecaptcha === 'undefined') {
        throw new Error('reCAPTCHA not loaded');
      }

      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'newsletter_subscription' })
            .then(resolve)
            .catch(reject);
        });
      });

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
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <img src="/logo.svg" alt="Stallioni Logo" className="h-10 mb-4 filter brightness-0 invert w-auto" width="210" height="42" />
            <p className="text-blue-200">
              Web, E-commerce, Mobile & AI-Powered Solutions for a global clientele.
            </p>
            <div className="mt-4 flex space-x-4">
              <SocialIcons />
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => handleNav(e, link.href)} className="text-blue-200 hover:text-brand-orange transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li><a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="text-blue-200 hover:text-brand-orange transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-blue-200">
              <li className="flex items-start">
                <a href="#" onClick={(e) => handleContactClick(e, 'email')} className="inline-flex items-start hover:text-brand-orange transition-colors">
                  <EmailIcon />
                  {/* Obfuscated for scrapers */}
                  <span>seba<span style={{ display: 'none' }}>.</span>@<span style={{ display: 'none' }}>.</span>stallioni.com</span>
                </a>
              </li>
              <li className="flex items-start">
                <a href="#" onClick={(e) => handleContactClick(e, 'tel')} className="inline-flex items-start hover:text-brand-orange transition-colors">
                  <PhoneIcon />
                  {/* Obfuscated for scrapers */}
                  <span>+91 98432<span style={{ display: 'none' }}>-</span>96279</span>
                </a>
              </li>
              <li className="flex items-start">
                <a href="#" onClick={(e) => handleContactClick(e, 'whatsapp')} className="inline-flex items-start hover:text-brand-orange transition-colors">
                  <WhatsAppIcon />
                  <span>Chat on WhatsApp</span>
                </a>
              </li>
              <li className="flex items-start">
                <a href="#" onClick={(e) => handleContactClick(e, 'teams')} className="inline-flex items-start hover:text-brand-orange transition-colors">
                  <TeamsIcon />
                  <span>Connect on Teams</span>
                </a>
              </li>
              <li className="flex items-start"><LocationIcon /><span>23. Jayanth complex, TP Road, Annur, Coimbatore-641653, Tamilnadu, India</span></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-blue-200 mb-4">
              Subscribe to our newsletter for the latest insights on tech, outsourcing, and digital strategy.
            </p>
            <form onSubmit={handleNewsletterSubmit}>
              <input type="hidden" name="_subject" value="New Newsletter Subscription from Stallioni Website" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="company" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              <div className="flex">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  aria-label="Email for newsletter"
                  className="w-full px-4 py-2 text-brand-dark rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-orange transition-shadow"
                />
                <button
                  type="submit"
                  className="bg-brand-orange text-white font-bold px-4 md:px-6 py-2 rounded-r-md hover:bg-opacity-90 transition-colors flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-6 text-center text-blue-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Stallioni. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
