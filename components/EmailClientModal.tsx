import React, { useEffect, useRef } from 'react';
import { getContactEmail } from '../constants';
import { useToast } from '../App';

// Icons for the buttons
const MailAppIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7.45-6.126a2 2 0 012.32 0l7.45 6.126A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-5.5L12 15l2.25-1.5L21 19" /></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const GmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"><path fill="#EA4335" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>;
const OutlookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"><path fill="#0072C6" d="M21.4 4.3a2 2 0 0 0-1.6-.8H4.2a2 2 0 0 0-1.6.8L12 11.4l9.4-7.1zM12 13.6L2.6 6.5a2 2 0 0 0-.6 1.4V16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7.9a2 2 0 0 0-.6-1.4L12 13.6z"/></svg>;

interface EmailClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailClientModal: React.FC<EmailClientModalProps> = ({ isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const { showToast } = useToast();
    const email = getContactEmail();

    useEffect(() => {
        if (!isOpen) return;
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeydown);
        document.body.style.overflow = 'hidden';
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

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            showToast('Email address copied!', 'success');
        } catch (err) {
            showToast('Failed to copy email.', 'error');
        }
        onClose();
    };

    const subject = "Website Inquiry";
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}`;
    const outlookUrl = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${email}&subject=${encodeURIComponent(subject)}`;
    
    if (!isOpen) return null;

    const ActionButton: React.FC<{ onClick?: () => void; href?: string; children: React.ReactNode; isButton?: boolean; }> = ({ onClick, href, children, isButton = false }) => {
        const commonClasses = "w-full text-left p-4 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-4 font-semibold text-brand-dark";
        if (isButton) {
            return <button onClick={onClick} className={commonClasses}>{children}</button>;
        }
        return <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer" className={commonClasses}>{children}</a>;
    };
    
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby="email-modal-title">
            <div ref={modalRef} className="bg-white rounded-xl shadow-2xl w-full max-w-sm animate-modal-pop-in" onClick={e => e.stopPropagation()}>
                <div className="p-6">
                    <h3 id="email-modal-title" className="text-xl font-bold text-brand-dark text-center mb-2">Connect via Email</h3>
                    <p className="text-center text-slate-500 mb-6">Choose your preferred email client.</p>
                    <div className="space-y-3">
                        <ActionButton href={`mailto:${email}`} onClick={onClose}><MailAppIcon /> Open Default App</ActionButton>
                        <ActionButton onClick={handleCopy} isButton><CopyIcon /> Copy Email Address</ActionButton>
                        <ActionButton href={gmailUrl} onClick={onClose}><GmailIcon /> Compose in Gmail</ActionButton>
                        <ActionButton href={outlookUrl} onClick={onClose}><OutlookIcon /> Compose in Outlook</ActionButton>
                    </div>
                    <div className="text-center mt-6">
                         <button onClick={onClose} className="text-sm font-semibold text-slate-500 hover:text-brand-dark">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailClientModal;

