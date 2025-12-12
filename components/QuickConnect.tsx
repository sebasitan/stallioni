import React, { useState } from 'react';
import { getContactEmail, getWhatsAppPhone, getCallPhone } from '../constants';
import { useToast } from '../App';

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const CloseIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
)

const WhatsAppIcon = () => ( <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>);
const TeamsIcon = () => ( <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54,17.22H11.44V12.22H6.24V10.12C6.24,8.4,6.68,7.24,9,7.24h4.51v1.78H9.21c-0.96,0-1.12,0.36-1.12,1.1v2.1h5.45v5ZM21.54,5.73v8.52c0,3.19-2.28,5.47-5.47,5.47H6.68L0,22.5V5.73C0,2.54,2.28,0.26,5.47,0.26h10.6C19.25,0.26,21.54,2.54,21.54,5.73Z"/></svg>);
const EmailIcon = () => ( <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>);
const PhoneIcon = () => ( <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>);

type LinkType = 'whatsapp' | 'teams' | 'email' | 'call';

const QuickConnect: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { showToast } = useToast();

    const handleConnectClick = async (e: React.MouseEvent<HTMLAnchorElement>, type: LinkType) => {
        e.preventDefault();
        setIsOpen(false); // Close menu on any action
        
        let url = '';
        switch(type) {
            case 'whatsapp':
                url = `https://wa.me/${getWhatsAppPhone()}`;
                window.open(url, '_blank', 'noopener,noreferrer');
                break;
            case 'teams':
                url = `msteams:/l/chat/0/0?users=${getContactEmail()}`;
                window.location.href = url;
                break;
            case 'email':
                try {
                    await navigator.clipboard.writeText(getContactEmail());
                    showToast('Email address copied!', 'success');
                } catch (err) {
                    showToast('Failed to copy email.', 'error');
                }
                return;
            case 'call':
                url = `tel:+${getCallPhone()}`;
                window.location.href = url;
                break;
        }
    };

    // FIX: Changed JSX.Element to React.ReactNode to resolve namespace error and improve type safety.
    const links: { type: LinkType; label: string; icon: React.ReactNode; transform: string }[] = [
        { type: 'whatsapp', label: 'Consult on WhatsApp', icon: <WhatsAppIcon />, transform: 'translate(0, -70px)' },
        { type: 'teams', label: 'Consult on Teams', icon: <TeamsIcon />, transform: 'translate(-50px, -50px)' },
        { type: 'email', label: 'Copy Email', icon: <EmailIcon />, transform: 'translate(-70px, 0)' },
        { type: 'call', label: 'Call Us', icon: <PhoneIcon />, transform: 'translate(-50px, 50px)' },
    ];

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <div className="relative flex items-center justify-center">

                    {/* Contact Icons */}
                    {links.map((link, index) => (
                        <div
                            key={link.label}
                            className="absolute transition-all duration-300 ease-out"
                            style={{
                                transform: isOpen ? link.transform : 'translate(0, 0)',
                                opacity: isOpen ? 1 : 0,
                                transitionDelay: isOpen ? `${index * 40}ms` : '0ms'
                            }}
                        >
                             <a
                                href="#"
                                aria-label={link.label}
                                className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-lg text-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-200 group relative"
                                onClick={(e) => handleConnectClick(e, link.type)}
                            >
                                {link.icon}
                                <span className="absolute right-full mr-4 px-3 py-1.5 text-sm font-semibold text-white bg-brand-dark rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                    {link.label}
                                </span>
                            </a>
                        </div>
                    ))}

                    {/* Main FAB Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle contact menu"
                        aria-expanded={isOpen}
                        className="relative w-20 h-20 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-300"
                    >
                        <div className={`absolute transition-all duration-300 ease-out ${isOpen ? 'opacity-0 rotate-45 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
                            <ChatIcon />
                        </div>
                        <div className={`absolute transition-all duration-300 ease-out ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-45 scale-50'}`}>
                            <CloseIcon />
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};

export default QuickConnect;
