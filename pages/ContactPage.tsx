import React, { useState, useRef, useEffect } from 'react';
import FadeIn from '../components/FadeIn';
import { useToast } from '../App';
import { getContactEmail, getWhatsAppPhone, RECAPTCHA_SITE_KEY } from '../constants';

const ProjectIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>;
const PartnershipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const GeneralIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;

const WhatsAppIcon = () => (<svg className="w-6 h-6 text-slate-700 group-hover:text-brand-orange transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>);
const EmailIcon = () => (<svg className="w-6 h-6 text-slate-700 group-hover:text-brand-orange transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>);

type ContactReason = 'project' | 'partnership' | 'general';

const ContactPage: React.FC = () => {
    const [selectedReason, setSelectedReason] = useState<ContactReason | null>('project');
    const formContainerRef = useRef<HTMLDivElement>(null);
    const { showToast } = useToast();

    useEffect(() => {
        if (selectedReason && formContainerRef.current) {
            const timer = setTimeout(() => {
                formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [selectedReason]);

    const handleQuickConnectClick = async (e: React.MouseEvent<HTMLAnchorElement>, type: 'email' | 'whatsapp') => {
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
                break;
            case 'whatsapp':
                url = `https://wa.me/${getWhatsAppPhone()}`;
                window.open(url, '_blank', 'noopener,noreferrer');
                break;
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
                    window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' })
                        .then(resolve)
                        .catch(reject);
                });
            });

            // 2. Prepare data
            const data = Object.fromEntries(formData.entries());
            data.recaptchaToken = recaptchaToken;

            // 3. Submit to API
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
                        method: "contact_form",
                    });
                }

                // Success message
                const subject = formData.get('_subject') as string || '';
                let successMessage = 'Your inquiry has been sent successfully!';

                if (subject.includes('Project')) {
                    successMessage = "Thanks for your project inquiry! We'll review your details and get back to you within 24 hours.";
                } else if (subject.includes('Partnership')) {
                    successMessage = "Thanks for your partnership interest! We look forward to exploring collaboration opportunities.";
                } else if (subject.includes('General')) {
                    successMessage = "Thanks for reaching out! We've received your message and will respond shortly.";
                }

                showToast(successMessage, 'success');
                form.reset();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Form submission failed');
            }
        } catch (error: any) {
            console.error('Submission error:', error);
            showToast(error.message || 'There was an error sending your message. Please try again.', 'error');
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    };

    const PageHeader: React.FC = () => (
        <div className="relative bg-brand-dark text-white py-20 text-center overflow-hidden">
            <img src="https://images.unsplash.com/photo-1531297484001-80022131c5a9?q=80&w=1920&h=1080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Abstract network" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-brand-dark/70"></div>
            <div className="container mx-auto px-6 relative z-10">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Let's Connect</h1>
                    <p className="text-lg text-slate-300 mt-4 max-w-3xl mx-auto">We're here to help build your next big idea. Tell us how we can help, and we'll get in touch shortly.</p>
                </FadeIn>
            </div>
        </div>
    );

    const ReasonCard: React.FC<{ reason: ContactReason; title: string; description: string; icon: React.ReactNode; }> = ({ reason, title, description, icon }) => {
        const isSelected = selectedReason === reason;
        return (
            <button
                onClick={() => {
                    setSelectedReason(isSelected ? null : reason);
                }}
                className={`p-6 text-left bg-white rounded-xl shadow-lg border-2 transition-all duration-300 w-full ${isSelected ? 'border-brand-orange scale-105 shadow-xl' : 'border-transparent hover:shadow-xl hover:-translate-y-1'}`}
                aria-expanded={isSelected}
            >
                <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 mt-1 transition-colors ${isSelected ? 'text-brand-orange' : 'text-slate-500'}`}>{icon}</div>
                    <div>
                        <h3 className="text-xl font-bold text-brand-dark">{title}</h3>
                        <p className="text-slate-600 mt-1">{description}</p>
                    </div>
                </div>
            </button>
        );
    };

    const InputField: React.FC<{ id: string, name: string, label: string, type?: string, placeholder?: string, required?: boolean }> = ({ id, name, label, type = 'text', placeholder, required = false }) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            <input type={type} id={id} name={name} placeholder={placeholder} required={required} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange transition" />
        </div>
    );

    const SelectField: React.FC<{ id: string, name: string, label: string, children: React.ReactNode }> = ({ id, name, label, children }) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            <div className="relative">
                <select id={id} name={name} className="w-full px-4 py-2 pr-8 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white text-brand-dark appearance-none">
                    {children}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
        </div>
    );

    const ProjectForm = () => {
        return (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="hidden" name="_subject" value="New Project Inquiry from Stallioni Website" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="company" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <h3 className="md:col-span-2 text-2xl font-bold text-brand-dark border-b border-slate-200 pb-3">Project Details</h3>
                <InputField id="name" name="name" label="Full Name" placeholder="Jane Doe" required />
                <InputField id="email" name="email" label="Work Email" type="email" placeholder="jane@company.com" required />
                <InputField id="organization" name="organization" label="Company Name (Optional)" placeholder="Innovate Inc." />
                <InputField id="phone" name="phone" label="Phone Number (Optional)" type="tel" />
                <SelectField id="project-type" name="service_of_interest" label="Service of Interest">
                    <option>Web & E-Commerce</option>
                    <option>Mobile App Development</option>
                    <option>AI-Powered Solutions</option>
                    <option>Full Stack Development</option>
                    <option>UI/UX & Branding</option>
                    <option>Digital Marketing & SEO</option>
                </SelectField>
                <SelectField id="budget" name="budget" label="Estimated Budget (USD)">
                    <option>Under $10,000</option>
                    <option>$10,000 - $25,000</option>
                    <option>$25,000 - $50,000</option>
                    <option>$50,000 - $100,000</option>
                    <option>$100,000+</option>
                </SelectField>
                <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Tell us about your project</label>
                    <textarea id="message" name="message" rows={5} placeholder="Describe your goals, challenges, and any specific requirements..." className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange transition"></textarea>
                </div>
                <div className="md:col-span-2 text-right">
                    <button
                        type="submit"
                        className="bg-brand-orange text-white font-bold py-3 px-12 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-400/50 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        Send Project Inquiry
                    </button>
                </div>
            </form>
        );
    }

    const GeneralForm = ({ title, submitText }: { title: string, submitText: string }) => {
        return (
            <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="_subject" value={`New ${title} from Stallioni Website`} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="company" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <h3 className="text-2xl font-bold text-brand-dark border-b border-slate-200 pb-3">{title}</h3>
                <InputField id="gen-name" name="name" label="Full Name" placeholder="Jane Doe" required />
                <InputField id="gen-email" name="email" label="Email Address" type="email" placeholder="jane.doe@example.com" required />
                <div>
                    <label htmlFor="gen-message" className="block text-sm font-medium text-slate-700 mb-1">Your Message</label>
                    <textarea id="gen-message" name="message" rows={5} placeholder="How can we help you today?" className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange transition"></textarea>
                </div>
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-brand-orange text-white font-bold py-3 px-12 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-400/50 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {submitText}
                    </button>
                </div>
            </form>
        );
    }

    const renderForm = () => {
        switch (selectedReason) {
            case 'project': return <FadeIn key="project"><ProjectForm /></FadeIn>;
            case 'partnership': return <FadeIn key="partnership"><GeneralForm title="Partnership Inquiry" submitText="Send Inquiry" /></FadeIn>;
            case 'general': return <FadeIn key="general"><GeneralForm title="General Inquiry" submitText="Send Message" /></FadeIn>;
            default: return null;
        }
    };

    return (
        <>
            <PageHeader />
            <section className="bg-slate-50/70 py-16 md:py-20">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Left Column: Form & Interaction */}
                        <div className="lg:col-span-3">
                            <FadeIn className="space-y-6">
                                <h2 className="text-3xl font-extrabold text-brand-dark text-center lg:text-left">How can we help you?</h2>
                                <ReasonCard reason="project" title="Start a New Project" description="Let's talk about your idea and how we can bring it to life." icon={<ProjectIcon />} />
                                <ReasonCard reason="partnership" title="Discuss a Partnership" description="Explore how we can collaborate and grow together." icon={<PartnershipIcon />} />
                                <ReasonCard reason="general" title="General Inquiry" description="Have a different question? We're happy to help." icon={<GeneralIcon />} />
                            </FadeIn>
                            <div ref={formContainerRef} className="mt-12 overflow-hidden">
                                <div className={`transition-all duration-700 ease-in-out ${selectedReason ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="bg-white p-8 rounded-xl shadow-2xl border border-slate-200/80">
                                        {renderForm()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Info & Quick Links */}
                        <div className="lg:col-span-2 self-start lg:sticky top-28">
                            <FadeIn delay={200} className="space-y-8">
                                {/* Locations Card */}
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
                                    <h3 className="text-xl font-bold text-brand-dark mb-4">Our Locations</h3>
                                    <div className="h-48 bg-slate-100 rounded-lg overflow-hidden">
                                        <iframe
                                            src="https://maps.google.com/maps?q=Stallioni%20Net%20Solutions%20Annur&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen={true}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Stallioni Net Solutions Location"
                                        ></iframe>
                                    </div>
                                    <div className="mt-4">
                                        <p className="font-semibold text-slate-700">Headquarters (India)</p>
                                        <p className="text-slate-500 text-sm">23. Jayanth complex, TP Road, Annur, Coimbatore-641653, Tamilnadu, India</p>
                                    </div>
                                </div>
                                {/* Quick Connect Card */}
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
                                    <h3 className="text-xl font-bold text-brand-dark mb-4">Quick Connect</h3>
                                    <div className="space-y-3">
                                        <a href={`mailto:${getContactEmail()}`} onClick={(e) => handleQuickConnectClick(e, 'email')} className="flex items-center p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group">
                                            <EmailIcon />
                                            <span className="ml-4 font-semibold text-slate-700 group-hover:text-brand-orange">
                                                seba<span style={{ display: 'none' }}>.</span>@<span style={{ display: 'none' }}>.</span>stallioni.com
                                            </span>
                                        </a>
                                        <a href={`https://wa.me/${getWhatsAppPhone()}`} onClick={(e) => handleQuickConnectClick(e, 'whatsapp')} className="flex items-center p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group">
                                            <WhatsAppIcon />
                                            <span className="ml-4 font-semibold text-slate-700 group-hover:text-brand-orange">Chat on WhatsApp</span>
                                        </a>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactPage;
