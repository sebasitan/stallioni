import React, { useEffect, useRef, useState } from 'react';
import { WHATSAPP_GROUP_URL, WHATSAPP_GATE_EVENT } from '../constants';
import { useToast } from '../App';
import { getRecaptchaToken } from '../utils/recaptcha';

// Every "Chat on WhatsApp" button opens this instead of the group invite link.
// The link used to be handed out directly, so anyone who clicked joined the
// support group — mostly job seekers. Now a visitor describes their project
// first (the enquiry is emailed + logged in Zoho like any other form), and only
// then gets the "Join WhatsApp" button. Job enquiries are turned away here.

const JOB_OPTION = 'A job or internship';

const SERVICE_OPTIONS = [
  'WordPress / WooCommerce',
  'Shopify / e-commerce',
  'PHP / Laravel',
  'Custom web application',
  'Mobile app',
  'SEO / Google Ads',
  'Maintenance & support',
];

const inputClass = 'w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors text-sm placeholder:text-gray-400';

const WhatsAppGate: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  const close = () => setIsOpen(false);

  useEffect(() => {
    const open = () => {
      setService('');
      setSubmitted(false);
      setIsOpen(true);
    };
    window.addEventListener(WHATSAPP_GATE_EVENT, open);
    return () => window.removeEventListener(WHATSAPP_GATE_EVENT, open);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isJobEnquiry = service === JOB_OPTION;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isJobEnquiry) return;
    const data: Record<string, string> = Object.fromEntries(
      Array.from(new FormData(event.currentTarget).entries()).map(([k, v]) => [k, String(v)]),
    );
    setSubmitting(true);
    try {
      data.recaptchaToken = await getRecaptchaToken('whatsapp_gate');
      data._subject = `WhatsApp Project Enquiry: ${data.name}`;
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Could not send your details. Please try again.');
      }
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { method: 'whatsapp_gate' });
      }
      setSubmitted(true);
    } catch (error: any) {
      showToast(error.message || 'Could not send your details. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-brand-dark/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => { if (modalRef.current && !modalRef.current.contains(e.target as Node)) close(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-gate-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-modal-pop-in no-scrollbar"
        style={{ boxShadow: '0 25px 50px -12px rgba(31, 55, 105, 0.25)' }}
      >
        <div className="p-7 md:p-8">
          <div className="flex justify-between items-start mb-1">
            <h2 id="wa-gate-title" className="text-2xl font-bold text-brand-dark tracking-tight">
              {submitted ? 'Thanks — one last step' : 'Chat with us on WhatsApp'}
            </h2>
            <button onClick={close} className="text-gray-400 hover:text-brand-dark transition-colors -mr-1 -mt-1 p-1" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {submitted ? (
            <>
              <p className="text-gray-600 mb-6">We've got your project details. Join our WhatsApp group and the team will pick it up from there.</p>
              <a
                href={WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="inline-flex w-full justify-center items-center gap-2 bg-emerald-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-emerald-600 transition-colors"
              >
                Join WhatsApp
              </a>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-6">Tell us briefly what you need, then we'll connect you on WhatsApp.</p>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <input type="text" name="_gotcha" aria-hidden="true" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', opacity: 0 }} />

                <div>
                  <label htmlFor="wa-service" className="block text-sm font-medium text-brand-dark mb-1.5">What do you need?<span className="text-brand-orange ml-0.5">*</span></label>
                  <select
                    id="wa-service"
                    name="service_of_interest"
                    required
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`${inputClass} bg-white text-brand-dark`}
                  >
                    <option value="" disabled>Choose one…</option>
                    {SERVICE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                    <option>Something else</option>
                    <option>{JOB_OPTION}</option>
                  </select>
                </div>

                {isJobEnquiry ? (
                  <p className="text-sm text-brand-dark bg-brand-light border border-gray-200 rounded-md p-4">
                    We're not hiring right now, so we can't take job or internship enquiries — on WhatsApp or by email. Thanks for your interest.
                  </p>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="wa-name" className="block text-sm font-medium text-brand-dark mb-1.5">Name<span className="text-brand-orange ml-0.5">*</span></label>
                        <input id="wa-name" name="name" required placeholder="Jane Doe" className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="wa-email" className="block text-sm font-medium text-brand-dark mb-1.5">Work email<span className="text-brand-orange ml-0.5">*</span></label>
                        <input id="wa-email" name="email" type="email" required placeholder="jane@company.com" className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="wa-phone" className="block text-sm font-medium text-brand-dark mb-1.5">WhatsApp number</label>
                      <input id="wa-phone" name="phone" type="tel" placeholder="+1 555 000 0000" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="wa-message" className="block text-sm font-medium text-brand-dark mb-1.5">Project details<span className="text-brand-orange ml-0.5">*</span></label>
                      <textarea id="wa-message" name="message" rows={3} required minLength={20} placeholder="e.g. Upgrade our WooCommerce store from PHP 7.4 to 8.2" className={inputClass} />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-brand-orange text-white font-semibold py-3 px-6 rounded-md hover:bg-brand-orange-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Sending…' : 'Continue to WhatsApp'}
                    </button>
                  </>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppGate;
