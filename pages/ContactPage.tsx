import React, { useState, useRef, useEffect } from 'react';
import FadeIn from '../components/FadeIn';
import FreelancerBadge from '../components/FreelancerBadge';
import { useToast } from '../App';
import { getContactEmail, getTeamsId, WHATSAPP_CONTACTS } from '../constants';
import { getRecaptchaToken } from '../utils/recaptcha';

// ============================================
// Icons
// ============================================
const Icon = {
    Arrow: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    ),
    Mail: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    WhatsApp: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
    ),
    Teams: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.54,17.22H11.44V12.22H6.24V10.12C6.24,8.4,6.68,7.24,9,7.24h4.51v1.78H9.21c-0.96,0-1.12,0.36-1.12,1.1v2.1h5.45v5ZM21.54,5.73v8.52c0,3.19-2.28,5.47-5.47,5.47H6.68L0,22.5V5.73C0,2.54,2.28,0.26,5.47,0.26h10.6C19.25,0.26,21.54,2.54,21.54,5.73Z" />
        </svg>
    ),
    Pin: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    Clock: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Copy: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
    ),
    External: () => (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
    ),
};

type ContactReason = 'project' | 'partnership' | 'general';

// ============================================
// MAIN
// ============================================
const ContactPage: React.FC = () => {
    const [selectedReason, setSelectedReason] = useState<ContactReason>('project');
    const formContainerRef = useRef<HTMLDivElement>(null);
    const { showToast } = useToast();

    useEffect(() => {
        if (formContainerRef.current && window.innerWidth < 1024) {
            const timer = setTimeout(() => {
                formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [selectedReason]);

    const handleQuickConnect = async (
        e: React.MouseEvent<HTMLAnchorElement>,
        type: 'email' | 'whatsapp' | 'teams',
        target?: string
    ) => {
        e.preventDefault();
        switch (type) {
            case 'email':
                try {
                    await navigator.clipboard.writeText(getContactEmail());
                    showToast('Email address copied!', 'success');
                } catch {
                    showToast('Failed to copy email.', 'error');
                }
                break;
            case 'whatsapp':
                if (target) window.open(target, '_blank', 'noopener,noreferrer');
                break;
            case 'teams':
                window.open(`https://teams.microsoft.com/l/chat/0/0?users=${getTeamsId()}`, '_blank', 'noopener,noreferrer');
                break;
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
        const originalText = submitButton?.innerText || 'Send';

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerText = 'Sending…';
        }

        try {
            const recaptchaToken = await getRecaptchaToken('contact_form');
            const data: Record<string, any> = Object.fromEntries(formData.entries());
            data.recaptchaToken = recaptchaToken;

            const urlParams = new URLSearchParams(window.location.search);
            ['utm_source', 'utm_campaign', 'utm_medium', 'utm_term', 'utm_content'].forEach((key) => {
                const fromUrl = urlParams.get(key);
                const fromStorage = sessionStorage.getItem('stl_' + key);
                const value = fromUrl || fromStorage;
                if (value) data[key] = value;
            });

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                if (typeof window.gtag === 'function') {
                    window.gtag('event', 'generate_lead', { method: 'contact_form' });
                }
                const subject = (formData.get('_subject') as string) || '';
                let msg = "Your message has been sent. We'll reply within 24 hours.";
                if (subject.includes('Project')) msg = "Thanks for your project inquiry — we'll review and reply within 24 hours.";
                else if (subject.includes('Partnership')) msg = "Thanks for your partnership interest — we'll be in touch shortly.";
                else if (subject.includes('General')) msg = "Thanks for reaching out — we've received your message.";
                showToast(msg, 'success');
                form.reset();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Form submission failed');
            }
        } catch (error: any) {
            console.error('Submission error:', error);
            showToast(error.message || 'There was an error sending your message. Please try again.', 'error');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerText = originalText;
            }
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* ===== HEADER ===== */}
            <header className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-6 max-w-6xl py-14 md:py-16">
                    <FadeIn>
                        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gray-500 mb-4">Contact us</p>
                        <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-brand-dark tracking-[-0.02em] leading-[1.15] max-w-3xl">
                            Tell us about your project — we'll reply within 24 hours.
                        </h1>
                        <p className="mt-4 text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl">
                            Whether you want to start a build, explore a partnership, or just have a question — pick the option below and we'll route it to the right person.
                        </p>
                        <div className="mt-6 inline-flex items-center gap-2 text-[12px] text-gray-500">
                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                                </span>
                                Online now
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-gray-500">
                                <Icon.Clock />
                                Avg response &lt; 24h
                            </span>
                        </div>
                    </FadeIn>
                </div>
            </header>

            {/* ===== MAIN GRID ===== */}
            <section className="bg-brand-light py-12 md:py-16 border-y border-gray-100">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
                        {/* LEFT — Tabs + Form */}
                        <div className="lg:col-span-3" ref={formContainerRef}>
                            {/* Reason tabs */}
                            <FadeIn>
                                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1 mb-6 w-full sm:w-auto overflow-x-auto no-scrollbar">
                                    {([
                                        { id: 'project', label: 'New project' },
                                        { id: 'partnership', label: 'Partnership' },
                                        { id: 'general', label: 'General' },
                                    ] as { id: ContactReason; label: string }[]).map((tab) => {
                                        const active = selectedReason === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setSelectedReason(tab.id)}
                                                className={`flex-1 sm:flex-none min-w-fit px-3.5 sm:px-4 py-2 rounded-full text-[13px] sm:text-[13.5px] font-medium tracking-tight transition-all duration-200 whitespace-nowrap ${
                                                    active
                                                        ? 'bg-brand-dark text-white shadow-sm'
                                                        : 'text-gray-600 hover:text-brand-dark hover:bg-brand-light'
                                                }`}
                                            >
                                                {tab.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </FadeIn>

                            {/* Form */}
                            <FadeIn delay={80}>
                                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                                    <div className="px-5 md:px-9 py-5 border-b border-gray-100 bg-brand-light/30">
                                        <h2 className="text-xl md:text-2xl font-bold text-brand-dark tracking-tight">
                                            {selectedReason === 'project' && 'Tell us about your project'}
                                            {selectedReason === 'partnership' && 'Explore a partnership'}
                                            {selectedReason === 'general' && 'Send us a message'}
                                        </h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {selectedReason === 'project' && "Share the goals and scope. We'll come back with a quote in 24 hours."}
                                            {selectedReason === 'partnership' && "Tell us how we might work together. We respond within 24 hours."}
                                            {selectedReason === 'general' && "Have a question? We'll reply as soon as we can."}
                                        </p>
                                    </div>

                                    <div className="p-5 md:p-9">
                                        {selectedReason === 'project' && <ProjectForm key="project" onSubmit={handleSubmit} />}
                                        {selectedReason === 'partnership' && <GeneralForm key="partnership" subject="New Partnership Inquiry from Stallioni Website" submitText="Send inquiry" onSubmit={handleSubmit} />}
                                        {selectedReason === 'general' && <GeneralForm key="general" subject="New General Inquiry from Stallioni Website" submitText="Send message" onSubmit={handleSubmit} />}
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        {/* RIGHT — Sidebar */}
                        <aside className="lg:col-span-2 lg:sticky lg:top-24 self-start space-y-4">
                            {/* Quick channels */}
                            <FadeIn delay={120}>
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-dark mb-4">Talk to us your way</p>
                                    <div className="space-y-2">
                                        <a
                                            href={`mailto:${getContactEmail()}`}
                                            onClick={(e) => handleQuickConnect(e, 'email')}
                                            className="group flex items-center justify-between gap-4 bg-brand-light hover:bg-white border border-gray-200 hover:border-brand-orange rounded-xl p-3.5 transition-colors"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-9 h-9 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                                    <Icon.Mail />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-brand-dark">Email</p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        contact<span style={{ display: 'none' }}>.</span>@<span style={{ display: 'none' }}>.</span>stallioni.com
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-gray-400 tracking-widest flex-shrink-0 group-hover:text-brand-orange transition-colors">
                                                <Icon.Copy />
                                                COPY
                                            </span>
                                        </a>

                                        {WHATSAPP_CONTACTS.map((contact) => (
                                            <a
                                                key={contact.name}
                                                href="#"
                                                onClick={(e) => handleQuickConnect(e, 'whatsapp', contact.url)}
                                                className="group flex items-center justify-between gap-4 bg-brand-light hover:bg-white border border-gray-200 hover:border-brand-orange rounded-xl p-3.5 transition-colors"
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                                        <Icon.WhatsApp />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-semibold text-brand-dark">WhatsApp</p>
                                                        <p className="text-xs text-gray-500 truncate">{contact.name}</p>
                                                    </div>
                                                </div>
                                                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-gray-400 tracking-widest flex-shrink-0 group-hover:text-brand-orange transition-colors">
                                                    JOIN <Icon.External />
                                                </span>
                                            </a>
                                        ))}

                                        <a
                                            href="#"
                                            onClick={(e) => handleQuickConnect(e, 'teams')}
                                            className="group flex items-center justify-between gap-4 bg-brand-light hover:bg-white border border-gray-200 hover:border-brand-orange rounded-xl p-3.5 transition-colors"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-9 h-9 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                                                    <Icon.Teams />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-brand-dark">Microsoft Teams</p>
                                                    <p className="text-xs text-gray-500 truncate">For enterprise clients</p>
                                                </div>
                                            </div>
                                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-gray-400 tracking-widest flex-shrink-0 group-hover:text-brand-orange transition-colors">
                                                JOIN <Icon.External />
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </FadeIn>

                            {/* Office */}
                            <FadeIn delay={170}>
                                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                                    <div className="p-6">
                                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-dark mb-3">Headquarters</p>
                                        <div className="flex items-start gap-3">
                                            <span className="w-9 h-9 rounded-lg bg-brand-light text-brand-dark flex items-center justify-center flex-shrink-0">
                                                <Icon.Pin />
                                            </span>
                                            <div>
                                                <p className="text-sm font-semibold text-brand-dark">Stallioni Net Solutions</p>
                                                <p className="text-[13px] text-gray-600 leading-relaxed mt-0.5">
                                                    23 Jayanth Complex, TP Road,<br />
                                                    Annur, Coimbatore — 641653,<br />
                                                    Tamil Nadu, India
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-44 bg-gray-100">
                                        <iframe
                                            src="https://maps.google.com/maps?q=Stallioni%20Net%20Solutions%20Annur&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Stallioni Net Solutions Location"
                                        />
                                    </div>
                                </div>
                            </FadeIn>

                            {/* Trust */}
                            <FadeIn delay={220}>
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-dark mb-2">Verified track record</p>
                                    <p className="text-[13.5px] text-gray-600 leading-relaxed mb-4">
                                        978 client reviews on our public Freelancer.com profile — active since 2007.
                                    </p>
                                    <FreelancerBadge variant="light" size="sm" />
                                </div>
                            </FadeIn>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
};

// ============================================
// FORM FIELDS
// ============================================
// text-base (16px) on mobile prevents iOS Safari's input-focus zoom bounce.
// On sm+ we drop to text-sm (14px) to match the desktop design.
const inputClass = 'w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-colors placeholder:text-gray-400 text-base sm:text-sm bg-white';

const InputField: React.FC<{ id: string; name: string; label: string; type?: string; placeholder?: string; required?: boolean }> = ({ id, name, label, type = 'text', placeholder, required = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-brand-dark mb-1.5">
            {label}{required && <span className="text-brand-orange ml-0.5">*</span>}
        </label>
        <input type={type} id={id} name={name} placeholder={placeholder} required={required} className={inputClass} />
    </div>
);

const SelectField: React.FC<{ id: string; name: string; label: string; children: React.ReactNode }> = ({ id, name, label, children }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-brand-dark mb-1.5">{label}</label>
        <div className="relative">
            <select id={id} name={name} className={`${inputClass} pr-9 appearance-none`}>
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </div>
        </div>
    </div>
);

const SubmitButton: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 bg-brand-orange text-white text-sm font-medium py-3 pl-6 pr-2.5 rounded-full hover:bg-brand-orange-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
        {children}
        <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform text-brand-orange">
            <Icon.Arrow />
        </span>
    </button>
);

const HoneypotAndCaptcha: React.FC<{ subject: string }> = ({ subject }) => (
    <>
        <input type="hidden" name="_subject" value={subject} />
        <input type="hidden" name="_captcha" value="false" />
        <input
            type="text"
            name="_gotcha"
            aria-hidden="true"
            tabIndex={-1}
            autoComplete="off"
            style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', opacity: 0 }}
        />
    </>
);

// ============================================
// FORMS
// ============================================
const ProjectForm: React.FC<{ onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }> = ({ onSubmit }) => (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <HoneypotAndCaptcha subject="New Project Inquiry from Stallioni Website" />
        <InputField id="name" name="name" label="Full name" placeholder="Jane Doe" required />
        <InputField id="email" name="email" label="Work email" type="email" placeholder="jane@company.com" required />
        <InputField id="organization" name="organization" label="Company" placeholder="Innovate Inc." />
        <InputField id="phone" name="phone" label="Phone (optional)" type="tel" placeholder="+1 (555) 000-0000" />
        <SelectField id="project-type" name="service_of_interest" label="Service of interest">
            <option>Web & E-Commerce</option>
            <option>Mobile App Development</option>
            <option>AI-Powered Solutions</option>
            <option>Full Stack Development</option>
            <option>UI/UX & Branding</option>
            <option>Digital Marketing & SEO</option>
            <option>Cloud & DevOps</option>
        </SelectField>
        <SelectField id="budget" name="budget" label="Estimated budget (USD)">
            <option>Under $10,000</option>
            <option>$10,000 – $25,000</option>
            <option>$25,000 – $50,000</option>
            <option>$50,000 – $100,000</option>
            <option>$100,000+</option>
        </SelectField>
        <div className="md:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-brand-dark mb-1.5">
                Project details<span className="text-brand-orange ml-0.5">*</span>
            </label>
            <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Goals, scope, timeline, anything we should know…"
                className={inputClass}
            />
        </div>
        <div className="md:col-span-2 flex justify-end pt-2">
            <SubmitButton>Send project inquiry</SubmitButton>
        </div>
    </form>
);

const GeneralForm: React.FC<{ subject: string; submitText: string; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }> = ({ subject, submitText, onSubmit }) => (
    <form onSubmit={onSubmit} className="space-y-5">
        <HoneypotAndCaptcha subject={subject} />
        <div className="grid md:grid-cols-2 gap-5">
            <InputField id="gen-name" name="name" label="Full name" placeholder="Jane Doe" required />
            <InputField id="gen-email" name="email" label="Email" type="email" placeholder="jane@example.com" required />
        </div>
        <div>
            <label htmlFor="gen-message" className="block text-sm font-medium text-brand-dark mb-1.5">
                Your message<span className="text-brand-orange ml-0.5">*</span>
            </label>
            <textarea
                id="gen-message"
                name="message"
                rows={5}
                required
                placeholder="How can we help?"
                className={inputClass}
            />
        </div>
        <div className="flex justify-end pt-1">
            <SubmitButton>{submitText}</SubmitButton>
        </div>
    </form>
);

export default ContactPage;
