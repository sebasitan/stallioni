
import React from 'react';

const defaultIconClass = "w-12 h-12 text-brand-orange";

export const WebDevIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || defaultIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

export const EcommIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || defaultIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

export const MobileDevIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || defaultIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

export const AiIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || defaultIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l1.414 1.414m10.001 10.001l-1.415-1.415M18.364 5.636l-1.414 1.414m-10.001 10.001l1.415-1.415M9 12a3 3 0 116 0 3 3 0 01-6 0z" />
    </svg>
);

export const SeoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || defaultIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

export const DesignIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || defaultIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

export const NoCodeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || defaultIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
);

export const NewSeoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || defaultIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10.5h4m-4-3h4m-4 6h2" />
    </svg>
);

export const FullStackIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || defaultIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

export const CrmIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || defaultIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-2 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const SocialIcons: React.FC = () => (
    <>
        <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-brand-orange"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></a>
        <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-brand-orange"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.176-1.336.213-2.033.188.606 1.922 2.36 3.227 4.444 3.264-1.717 1.33-3.837 2.053-6.075 1.729 1.816 1.167 3.973 1.84 6.262 1.84 7.234 0 11.189-5.792 10.9-10.963.757-.549 1.408-1.238 1.92-2.001z"></path></svg></a>
        <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-brand-orange"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path></svg></a>
    </>
);

export const ChatbotIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || defaultIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

export const AnalyticsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || defaultIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

export const AutomationIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || defaultIconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const PHPIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 120 60" className={className || defaultIconClass} fill="currentColor">
        <path d="M43.71,21.5a14,14,0,1,0,14,14A14,14,0,0,0,43.71,21.5Zm0,23A9,9,0,1,1,52.7,35.5,9,9,0,0,1,43.71,44.5Z" />
        <path d="M60.21,21.5A14.06,14.06,0,0,0,51,24.4V21.5h-5V49.5h5V38.1a14,14,0,1,0,9.21-16.6Z" />
        <path d="M76.71,21.5A14.06,14.06,0,0,0,67.5,24.4V21.5h-5V49.5h5V38.1a14,14,0,1,0,9.21-16.6Z" />
    </svg>
);


// ANIMATIONS START HERE

const AnimationWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-full h-full flex items-center justify-center">
        {children}
    </div>
);

export const WebAnimation: React.FC = () => (
    <AnimationWrapper>
        <style>{`
            @keyframes draw-bracket { 0% { stroke-dashoffset: 25; } 100% { stroke-dashoffset: 0; } }
            @keyframes slide-in-left { 0% { transform: translateX(-20px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
            @keyframes slide-in-right { 0% { transform: translateX(20px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
            .bracket-l { animation: slide-in-left 0.5s ease-out 0.5s forwards; opacity: 0; }
            .bracket-r { animation: slide-in-right 0.5s ease-out 0.5s forwards; opacity: 0; }
            .slash { stroke-dasharray: 25; stroke-dashoffset: 25; animation: draw-bracket 0.5s ease-out 1s forwards; }
        `}</style>
        <svg viewBox="0 0 100 60">
            <rect x="5" y="5" width="90" height="50" rx="5" stroke="#94a3b8" strokeWidth="2" fill="#f1f5f9" />
            <circle cx="15" cy="12" r="2" fill="#ef4444" />
            <circle cx="22" cy="12" r="2" fill="#f97316" />
            <circle cx="29" cy="12" r="2" fill="#22c55e" />
            <polyline className="bracket-l" points="35,25 30,30 35,35" stroke="#F26522" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <line className="slash" x1="40" y1="40" x2="60" y2="20" stroke="#1A233D" strokeWidth="2.5" strokeLinecap="round" />
            <polyline className="bracket-r" points="65,25 70,30 65,35" stroke="#F26522" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
    </AnimationWrapper>
);

export const EcommAnimation: React.FC = () => (
    <AnimationWrapper>
        <style>{`
            @keyframes move-cart { 
                0% { transform: translateX(-10px); } 
                50% { transform: translateX(5px); }
                100% { transform: translateX(0px); }
            }
            @keyframes drop-item {
                0% { transform: translateY(-30px) scale(0.8); opacity: 0; }
                40% { opacity: 1; }
                100% { transform: translateY(0px) scale(1); opacity: 1; }
            }
            .cart { animation: move-cart 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards; }
            .item { animation: drop-item 1s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards; opacity: 0; transform-origin: bottom; }
        `}</style>
        <svg viewBox="0 0 100 80">
            <path className="item" d="M45,10 h15 v15 h-15 z" fill="#F26522" />
            <g className="cart" transform="translate(15, 45)"><path d="M0 0 H10 L15 20 H50 L55 5 H12" stroke="#1A233D" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx="20" cy="28" r="4" fill="#1A233D" /><circle cx="45" cy="28" r="4" fill="#1A233D" /></g>
        </svg>
    </AnimationWrapper>
);

export const FullStackAnimation: React.FC = () => (
    <AnimationWrapper>
        <style>{`
            @keyframes slide-down-1 { 0% { transform: translateY(-30px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
            @keyframes slide-down-2 { 0% { transform: translateY(-20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
            @keyframes slide-down-3 { 0% { transform: translateY(-10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
            .stack-1 { animation: slide-down-1 0.6s ease-out 0.2s forwards; opacity: 0; }
            .stack-2 { animation: slide-down-2 0.6s ease-out 0.4s forwards; opacity: 0; }
            .stack-3 { animation: slide-down-3 0.6s ease-out 0.6s forwards; opacity: 0; }
        `}</style>
        <svg viewBox="0 0 100 80">
            <g transform="translate(10, 10)">
                <g className="stack-1">
                    <rect x="0" y="0" width="80" height="18" rx="3" fill="#F26522" />
                    <text x="40" y="12" fill="white" textAnchor="middle" fontSize="8" fontWeight="bold">Frontend</text>
                </g>
                <g className="stack-2">
                    <rect x="0" y="22" width="80" height="18" rx="3" fill="#1A233D" />
                    <text x="40" y="34" fill="white" textAnchor="middle" fontSize="8" fontWeight="bold">Backend</text>
                </g>
                <g className="stack-3">
                    <rect x="0" y="44" width="80" height="18" rx="3" fill="#94a3b8" />
                    <text x="40" y="56" fill="white" textAnchor="middle" fontSize="8" fontWeight="bold">Database</text>
                </g>
            </g>
        </svg>
    </AnimationWrapper>
);

export const NoCodeAnimation: React.FC = () => (
    <AnimationWrapper>
        <style>{`
            @keyframes fit-piece-1 { 0% { transform: translate(-10px, -10px); } 100% { transform: translate(0, 0); } }
            @keyframes fit-piece-2 { 0% { transform: translate(10px, 10px); } 100% { transform: translate(0, 0); } }
            @keyframes fit-piece-3 { 0% { transform: translate(10px, -10px); } 100% { transform: translate(0, 0); } }
            .piece-1 { animation: fit-piece-1 1s ease-in-out 0.2s forwards; }
            .piece-2 { animation: fit-piece-2 1s ease-in-out 0.4s forwards; }
            .piece-3 { animation: fit-piece-3 1s ease-in-out 0.6s forwards; }
        `}</style>
        <svg viewBox="0 0 100 100">
            <path className="piece-1" d="M20,20 h20 v-5 c5,0 5,5 10,5 v15 h-15 c0,5 -5,5 -5,10 h-10 Z" fill="#F26522" opacity="0.8" />
            <path className="piece-2" d="M80,80 h-20 v5 c-5,0 -5,-5 -10,-5 v-15 h15 c0,-5 5,-5 5,-10 h10 Z" fill="#1A233D" opacity="0.8" />
            <path className="piece-3" d="M80,20 h-20 v15 c0,5 -5,5 -5,10 h-15 c-5,0 -5,-5 -10,-5 v-20 Z" fill="#94a3b8" opacity="0.8" />
        </svg>
    </AnimationWrapper>
);

export const CrmAnimation: React.FC = () => (
    <AnimationWrapper>
        <style>{`
            @keyframes crm-pop-in { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
            @keyframes crm-link { 0% { stroke-dashoffset: 30; } 100% { stroke-dashoffset: 0; } }
            .crm-user { animation: crm-pop-in 0.5s ease-out forwards; opacity: 0; transform-origin: center; }
            .crm-line { stroke-dasharray: 30; animation: crm-link 1s ease-out 0.5s forwards; }
        `}</style>
        <svg viewBox="0 0 100 80">
            <g className="crm-user" style={{ animationDelay: '0.2s' }}>
                <circle cx="25" cy="25" r="8" fill="#F26522" />
                <path d="M17,40 a8,12 0 0,1 16,0 Z" fill="#F26522" />
            </g>
            <g className="crm-user" style={{ animationDelay: '0.4s' }}>
                <circle cx="75" cy="25" r="8" fill="#1A233D" />
                <path d="M67,40 a8,12 0 0,1 16,0 Z" fill="#1A233D" />
            </g>
            <g className="crm-user" style={{ animationDelay: '0.6s' }}>
                <circle cx="50" cy="60" r="8" fill="#94a3b8" />
                <path d="M42,75 a8,12 0 0,1 16,0 Z" fill="#94a3b8" />
            </g>
            <path className="crm-line" d="M30 35 L 45 50" stroke="#1A233D" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path className="crm-line" d="M70 35 L 55 50" stroke="#1A233D" strokeWidth="2" fill="none" strokeLinecap="round" style={{ animationDelay: '0.7s' }} />
        </svg>
    </AnimationWrapper>
);

export const MobileAnimation: React.FC = () => (
    <AnimationWrapper>
        <style>{`
            @keyframes pop-in { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
            .icon-1 { animation: pop-in 0.4s ease-out 0.5s forwards; opacity: 0; transform-origin: center; }
            .icon-2 { animation: pop-in 0.4s ease-out 0.7s forwards; opacity: 0; transform-origin: center; }
            .icon-3 { animation: pop-in 0.4s ease-out 0.9s forwards; opacity: 0; transform-origin: center; }
        `}</style>
        <svg viewBox="0 0 60 100">
            <rect x="5" y="5" width="50" height="90" rx="10" stroke="#1A233D" strokeWidth="3" fill="#f1f5f9" />
            <line x1="25" y1="15" x2="35" y2="15" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <rect className="icon-1" x="15" y="25" width="12" height="12" rx="3" fill="#F26522" />
            <path className="icon-2" d="M33,25 h12 v12 h-12 z" fill="#1A233D" />
            <circle className="icon-3" cx="21" cy="49" r="6" fill="#94a3b8" />
        </svg>
    </AnimationWrapper>
);

export const AIAnimation: React.FC = () => (
    <AnimationWrapper>
        <style>{`
            @keyframes pulse { 0%, 100% { r: 3; opacity: 1; } 50% { r: 4; opacity: 0.7; } }
            @keyframes trace { 0% { stroke-dashoffset: 40; } 100% { stroke-dashoffset: 0; } }
            .ai-node { animation: pulse 2s infinite ease-in-out; }
            .ai-line { stroke-dasharray: 40; animation: trace 1.5s ease-in-out forwards; }
        `}</style>
        <svg viewBox="0 0 100 100">
            <g fill="#1A233D" stroke="#94a3b8" strokeWidth="0.5">
                <line className="ai-line" style={{ animationDelay: '0.1s' }} x1="20" y1="50" x2="50" y2="25" />
                <line className="ai-line" style={{ animationDelay: '0.2s' }} x1="20" y1="50" x2="50" y2="75" />
                <line className="ai-line" style={{ animationDelay: '0.3s' }} x1="50" y1="25" x2="80" y2="50" />
                <line className="ai-line" style={{ animationDelay: '0.4s' }} x1="50" y1="75" x2="80" y2="50" />
                <line className="ai-line" style={{ animationDelay: '0.5s' }} x1="50" y1="25" x2="50" y2="75" />
                <circle className="ai-node" style={{ animationDelay: '0s' }} cx="20" cy="50" r="3" fill="#F26522" />
                <circle className="ai-node" style={{ animationDelay: '0.2s' }} cx="50" cy="25" r="3" />
                <circle className="ai-node" style={{ animationDelay: '0.4s' }} cx="50" cy="75" r="3" />
                <circle className="ai-node" style={{ animationDelay: '0.6s' }} cx="80" cy="50" r="3" fill="#F26522" />
            </g>
        </svg>
    </AnimationWrapper>
);

export const DesignAnimation: React.FC = () => (
    <AnimationWrapper>
        <style>{`
            @keyframes draw-path { 0% { stroke-dashoffset: 100; } 100% { stroke-dashoffset: 0; } }
            @keyframes fill-color { 0% { opacity: 0; } 100% { opacity: 1; } }
            .pen-path { stroke-dasharray: 100; animation: draw-path 2s ease-in-out forwards; }
            .swatch { opacity: 0; animation: fill-color 0.5s ease-out forwards; }
        `}</style>
        <svg viewBox="0 0 100 100">
            <path className="pen-path" d="M10,80 Q 50,10 90,60" stroke="#1A233D" strokeWidth="2" fill="none" />
            <circle cx="10" cy="80" r="3" fill="#F26522" />
            <circle cx="90" cy="60" r="3" fill="#F26522" />
            <rect className="swatch" style={{ animationDelay: '1s' }} x="20" y="20" width="15" height="15" fill="#F26522" opacity="0.8" rx="2" />
            <rect className="swatch" style={{ animationDelay: '1.2s' }} x="40" y="45" width="15" height="15" fill="#1A233D" opacity="0.8" rx="2" />
            <rect className="swatch" style={{ animationDelay: '1.4s' }} x="65" y="70" width="15" height="15" fill="#94a3b8" opacity="0.8" rx="2" />
        </svg>
    </AnimationWrapper>
);

export const SeoAnimation: React.FC = () => (
    <AnimationWrapper>
        <style>{`
            @keyframes rise { 0% { height: 0; y: 80; } 100% { height: var(--h); y: var(--y); } }
            @keyframes sweep { 0% { transform: translate(-20px, 20px) rotate(-45deg); } 100% { transform: translate(0, 0) rotate(0); } }
            .bar { animation: rise 1s ease-out 0.5s forwards; }
            .glass { animation: sweep 1s ease-out forwards; }
        `}</style>
        <svg viewBox="0 0 100 100">
            <g className="glass">
                <circle cx="40" cy="40" r="15" stroke="#1A233D" strokeWidth="2" fill="rgba(242,101,34,0.1)" />
                <line x1="52" y1="52" x2="65" y2="65" stroke="#1A233D" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            {/* FIX: Cast style prop to React.CSSProperties to allow for CSS custom properties used in the animation. */}
            <rect className="bar" style={{ '--h': 20, '--y': 60 } as React.CSSProperties} x="20" y="80" width="15" fill="#94a3b8" />
            <rect className="bar" style={{ '--h': 35, '--y': 45, animationDelay: '0.7s' } as React.CSSProperties} x="40" y="80" width="15" fill="#1A233D" />
            <rect className="bar" style={{ '--h': 50, '--y': 30, animationDelay: '0.9s' } as React.CSSProperties} x="60" y="80" width="15" fill="#F26522" />
        </svg>
    </AnimationWrapper>
);

export const MarketingAnimation: React.FC = () => (
    <AnimationWrapper>
        <style>{`
            @keyframes wave { 0% { stroke-width: 0; opacity: 1; } 100% { stroke-width: 2; opacity: 0; transform: scale(2.5); } }
            @keyframes pop-icon { 0% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); } }
            .wave { animation: wave 1.5s ease-out infinite; transform-origin: 30px 50px; }
            .m-icon { opacity: 0; animation: pop-icon 0.5s ease-out forwards; transform-origin: center; }
        `}</style>
        <svg viewBox="0 0 100 100">
            <path d="M20,40 h10 l10,-10 v20 l-10,-10 Z" fill="#F26522" />
            <path className="wave" style={{ animationDelay: '0s' }} d="M45,50 a 1 1 0 0 0 0 -20" stroke="#F26522" fill="none" strokeLinecap="round" />
            <path className="wave" style={{ animationDelay: '0.5s' }} d="M45,50 a 1 1 0 0 0 0 -20" stroke="#F26522" fill="none" strokeLinecap="round" />
            <path className="m-icon" style={{ animationDelay: '0.8s' }} d="M70,30 a5,5 0 0,1 10,0 a5,5 0 0,1 10,0 q0,5 -10,10 q-10,-5 -10,-10 Z" fill="#1A233D" />
            <path className="m-icon" style={{ animationDelay: '1s' }} d="M75 60 l5 10 l5 -10 h-10 Z" fill="#94a3b8" />
        </svg>
    </AnimationWrapper>
);

