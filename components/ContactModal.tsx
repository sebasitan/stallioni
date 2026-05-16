import React, { useEffect, useRef } from 'react';
import { SERVICES_OVERVIEW, RECAPTCHA_SITE_KEY } from '../constants';
import { getContactEmail } from '../constants';
import { useToast } from '../App';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: 'Consultation' | 'Quote';
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, modalType }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  const title = modalType === 'Consultation' ? 'Request a Free Consultation' : 'Get a Free Project Quote';
  const submitText = modalType === 'Consultation' ? 'Schedule Consultation' : 'Get My Quote';

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
          window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'modal_form' })
            .then(resolve)
            .catch(reject);
        });
      });

      // 2. Prepare data
      const data = Object.fromEntries(formData.entries());
      data.recaptchaToken = recaptchaToken;

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // GA4 tracking
        if (typeof window.gtag === 'function') {
          window.gtag("event", "generate_lead", {
            method: "contact_modal",
          });
        }

        const successMessage = modalType === 'Consultation'
          ? "Consultation request sent! We'll contact you shortly to schedule a time."
          : "Quote request received! We'll analyze your requirements and send a proposal soon.";

        showToast(successMessage, 'success');
        form.reset();
        onClose();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Form submission failed');
      }
    } catch (error: any) {
      showToast(error.message || 'There was an error sending your message. Please try again.', 'error');
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  };


  const InputField: React.FC<{ id: string, name: string, label: string, type?: string, placeholder?: string, required?: boolean }> = ({ id, name, label, type = 'text', placeholder, required = false }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-brand-dark mb-1.5">{label}{required && <span className="text-brand-orange ml-0.5">*</span>}</label>
      <input type={type} id={id} name={name} placeholder={placeholder} required={required} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors text-sm placeholder:text-gray-400" />
    </div>
  );

  const SelectField: React.FC<{ id: string, name: string, label: string, children: React.ReactNode }> = ({ id, name, label, children }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-brand-dark mb-1.5">{label}</label>
      <div className="relative">
        <select id={id} name={name} className="w-full px-3.5 py-2.5 pr-9 border border-gray-300 rounded-md focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-white text-brand-dark appearance-none text-sm">
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-brand-dark/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-modal-pop-in no-scrollbar"
        style={{ boxShadow: '0 25px 50px -12px rgba(31, 55, 105, 0.25)' }}
      >
        <div className="p-7 md:p-9">
          <div className="flex justify-between items-start mb-1">
            <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-brand-dark tracking-tight">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-brand-dark transition-colors -mr-1 -mt-1 p-1"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <p className="text-gray-600 mb-7">Fill out the form below and our team will get back to you within 24 hours.</p>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input type="hidden" name="_subject" value={`New Submission from Stallioni Website: ${modalType}`} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="_gotcha" aria-hidden="true" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', opacity: 0 }} />

            <InputField id="modal-name" name="name" label="Full name" placeholder="Jane Doe" required />
            <InputField id="modal-email" name="email" label="Work email" type="email" placeholder="jane@company.com" required />
            <InputField id="modal-organization" name="organization" label="Company name" placeholder="Innovate Inc." />
            <InputField id="modal-phone" name="phone" label="Phone number" type="tel" />
            <div className="md:col-span-2">
              <SelectField id="modal-project-type" name="service_of_interest" label="Service of interest">
                {SERVICES_OVERVIEW.map(service => (
                  <option key={service.id}>{service.title}</option>
                ))}
                <option>Other</option>
              </SelectField>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="modal-message" className="block text-sm font-medium text-brand-dark mb-1.5">Tell us about your project<span className="text-brand-orange ml-0.5">*</span></label>
              <textarea id="modal-message" name="message" rows={4} required placeholder="Describe your goals, challenges, and any specific requirements…" className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors text-sm placeholder:text-gray-400"></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end pt-2">
              <button
                type="submit"
                className="bg-brand-orange text-white font-semibold py-3 px-8 rounded-md hover:bg-brand-orange-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
