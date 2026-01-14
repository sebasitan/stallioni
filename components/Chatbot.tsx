import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { ChatbotIcon, CloseIcon, SendIcon } from './IconComponents';
import { getContactEmail, getWhatsAppPhone, getCallPhone, RECAPTCHA_SITE_KEY } from '../constants';
import { useToast, useNavigation } from '../App';
import { SERVICES_OVERVIEW } from '../constants/services-overview';

interface Message {
    role: 'user' | 'model';
    text: string;
}

const ARIA_AVATAR_URL = "/logo.svg"; // Fallback to logo or a stylized icon if image is missing

const EmailTranscriptModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSend: (email: string) => Promise<void>;
}> = ({ isOpen, onClose, onSend }) => {
    const [isSending, setIsSending] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSending(true);
        const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
        await onSend(email);
        setIsSending(false);
    };

    return (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex items-center justify-center p-4 rounded-2xl animate-fade-in">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 w-full">
                <h4 className="text-lg font-bold text-brand-dark text-center">Get Chat Transcript</h4>
                <p className="text-sm text-slate-500 text-center mt-1 mb-4">Enter your email to receive a copy of this conversation.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange transition"
                    />
                    <div className="flex items-center gap-3 mt-4">
                        <button type="button" onClick={onClose} className="w-full text-center px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors">
                            No, Thanks
                        </button>
                        <button type="submit" disabled={isSending} className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-brand-orange hover:bg-opacity-90 rounded-md transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed">
                            {isSending ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isBubbleVisible, setIsBubbleVisible] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);

    const { navigate } = useNavigation();
    const { showToast } = useToast();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const isOpenRef = useRef(isOpen);

    const MaximizeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4m12 4V4h-4M8 20v-4H4m12 0v4h-4" />
        </svg>
    );

    const RestoreIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 16v4h-4M4 8V4h4m12 0h-4v4M4 20h4v-4" />
        </svg>
    );

    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    useEffect(() => {
        const bubbleDismissed = sessionStorage.getItem('ariaBubbleDismissed');
        if (bubbleDismissed) return;
        const timer = setTimeout(() => {
            if (!isOpenRef.current) setIsBubbleVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsBubbleVisible(false);
            if (messages.length === 0) {
                setMessages([{ role: 'model', text: "Hello! I'm Aria, your Stallioni Assistant. I can help you with:\n[Hire a developer]\n[Get a project estimate]\n[Explore our services]" }]);
            }
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        if (isOpen && !showEmailModal) {
            inputRef.current?.focus();
        }
    }, [messages, isLoading, isOpen, showEmailModal]);


    // --- CONTROL LAYER & AI INTEGRATION ---
    // Using internal Gemini API via /api/chat

    // 1. The Gatekeeper: Strict Policy Check
    const evaluateRequest = (text: string): { type: 'refusal' | 'static' | 'generate'; content?: string; serviceContext?: any } => {
        const lowerText = text.toLowerCase();

        // A. Strict Refusals
        const forbiddenTriggers = ['president', 'weather', 'recipe', 'joke', 'capital of', 'who is', 'meaning of life', 'chatgpt', 'openai', 'hugging face', 'model', 'llm', 'instruction', 'politics', 'religion'];
        if (forbiddenTriggers.some(trigger => lowerText.includes(trigger))) {
            return { type: 'refusal' };
        }

        // B. Static Business Responses (No AI needed)
        if (lowerText.match(/^(hi|hello|hey|greetings|good morning|hola|aria)/)) {
            return { type: 'static', content: "Hello! I'm Aria, your Stallioni Assistant. How can I help you today? I can help with hiring developers, project estimates, or answering questions about our services." };
        }
        if (lowerText.includes('hire') || lowerText.includes('developer') || lowerText.includes('team')) {
            return { type: 'static', content: "Excellent! We have top-tier developers ready to join your team. You can check our [Careers Page] or tell me what technology you need expertise in." };
        }
        if (lowerText.includes('cost') || lowerText.includes('price') || lowerText.includes('quote') || lowerText.includes('estimate') || lowerText.includes('budget')) {
            return { type: 'static', content: "Our pricing is flexible and tailored to your project scope. I can help you get a custom quote. Would you like to [Get a project estimate] or [Book a consultation]?" };
        }
        if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('phone') || lowerText.includes('location')) {
            return { type: 'static', content: `You can reach us via email at ${getContactEmail()}, or call us directly at +${getCallPhone()}. We are based in India, serving clients globally.` };
        }
        if (lowerText.includes('portfolio') || lowerText.includes('case study') || lowerText.includes('work')) {
            return { type: 'static', content: "We have successfully delivered over 900+ projects. You can explore our huge success stories on our [Portfolio Page]." };
        }

        // C. Service Lookup (The Gateway to AI)
        const matchedService = SERVICES_OVERVIEW.find(service => {
            const titleMatch = service.title.toLowerCase().includes(lowerText);
            const descMatch = service.description.toLowerCase().includes(lowerText);
            const featureMatch = service.features?.some(f => lowerText.includes(f.toLowerCase()));
            const keywordMap: Record<string, string> = {
                'web': 'website-design-development',
                'app': 'mobile-app-development',
                'mobile': 'mobile-app-development',
                'ecommerce': 'ecommerce-development',
                'shop': 'ecommerce-development',
                'seo': 'seo-digital-marketing',
                'marketing': 'seo-digital-marketing',
                'cloud': 'cloud-devops-services',
                'qa': 'quality-assurance-testing',
                'ai': 'ai-automation-modern-tech',
                'bot': 'ai-chatbots',
                'automation': 'business-process-automation'
            };
            for (const [key, id] of Object.entries(keywordMap)) {
                if (lowerText.includes(key) && service.id === id) return true;
            }
            return titleMatch || featureMatch;
        });

        if (matchedService) {
            return { type: 'generate', serviceContext: matchedService };
        }

        // D. Default to Gemini AI for everything else!
        // This ensures the user NEVER gets the "Sorry..." message for legitimate questions.
        return { type: 'generate', serviceContext: { title: 'General Stallioni Inquiry', description: 'Stallioni provides elite web, mobile, and AI solutions.', features: [] } };
    };

    // 2. The Generator: Call our internal Vercel API
    const generateAIResponse = async (context: any, userQuery: string): Promise<string> => {
        try {
            // Include service context in the system-level instruction or as a prefix
            const augmentedQuery = `[Relevant Service: ${context.title}] ${userQuery}\n\nService Details: ${context.description}\nKey Features: ${context.features.join(', ')}`;

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: augmentedQuery,
                    history: messages.slice(-5), // Only send last 5 messages for brevity
                }),
            });

            if (!response.ok) throw new Error("Chat API Error");

            const result = await response.json();
            return result.text || `Yes, we specialize in ${context.title}. ${context.description}`;

        } catch (error) {
            console.error("AI Generation Failed:", error);
            // Graceful fallback
            return `Yes, we specialize in ${context.title}. ${context.description}`;
        }
    };

    const sendMessage = async (messageText: string) => {
        if (!messageText) return;

        // 1. User Message
        const newMessages: Message[] = [...messages, { role: 'user', text: messageText }];
        setMessages(newMessages);
        setIsLoading(true);

        // 2. Control Layer Evaluation
        const decision = evaluateRequest(messageText);

        if (decision.type === 'refusal') {
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'model', text: "Sorry, I can only answer questions about our services." }]);
                setIsLoading(false);
            }, 600);
            return;
        }

        if (decision.type === 'static' && decision.content) {
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'model', text: decision.content! }]);
                setIsLoading(false);
            }, 600);
            return;
        }

        // 3. AI Generation (Filtered)
        if (decision.type === 'generate' && decision.serviceContext) {
            try {
                const aiResponse = await generateAIResponse(decision.serviceContext, messageText);
                setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
            } catch (error) {
                setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to my brain right now, but yes, we definitely offer that service!" }]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const userInput = (form.elements.namedItem('message') as HTMLInputElement).value.trim();
        form.reset();
        await sendMessage(userInput);
    };

    const handleQuickReplyClick = (replyText: string) => {
        const lowerReply = replyText.toLowerCase();

        // Navigation actions
        if (lowerReply.includes('careers page')) {
            navigate('/careers');
            setMessages(prev => [...prev, { role: 'user', text: replyText }, { role: 'model', text: "Navigating you to our careers page now!" }]);
            setIsOpen(false);
            return;
        }

        if (lowerReply.includes('contact page') || lowerReply.includes('[contact page]')) {
            navigate('/contact');
            setMessages(prev => [...prev, { role: 'user', text: replyText }, { role: 'model', text: "Taking you to our contact page." }]);
            setIsOpen(false);
            return;
        }

        // Direct contact actions
        if (lowerReply.includes('whatsapp')) {
            const url = `https://wa.me/${getWhatsAppPhone()}`;
            window.open(url, '_blank', 'noopener,noreferrer');
            setMessages(prev => [...prev, { role: 'user', text: replyText }, { role: 'model', text: `I've opened WhatsApp for you to chat with our team. Our number is +${getWhatsAppPhone()}.` }]);
            setIsOpen(false);
            return;
        }

        if (lowerReply.includes('ms teams')) {
            const url = `msteams:/l/chat/0/0?users=${getContactEmail()}`;
            window.location.href = url;
            setMessages(prev => [...prev, { role: 'user', text: replyText }, { role: 'model', text: `I've opened Microsoft Teams for you. Our Teams ID is ${getContactEmail()}.` }]);
            setIsOpen(false);
            return;
        }

        if (lowerReply.includes('get phone number') || lowerReply.includes('call')) {
            const url = `tel:+${getCallPhone()}`;
            window.location.href = url;
            setMessages(prev => [...prev, { role: 'user', text: replyText }, { role: 'model', text: `I'm initiating a call for you to +${getCallPhone()}.` }]);
            setIsOpen(false);
            return;
        }

        // Default: send to simulated AI
        sendMessage(replyText);
    };

    const handleDismissBubble = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIsBubbleVisible(false);
        sessionStorage.setItem('ariaBubbleDismissed', 'true');
    };

    const finalClose = () => {
        setShowEmailModal(false);
        setIsOpen(false);
    }

    const handleRequestClose = () => {
        // Only ask for email if there's a meaningful conversation
        if (messages.length > 2) {
            setShowEmailModal(true);
        } else {
            setIsOpen(false);
        }
    };

    const openChat = () => {
        sessionStorage.setItem('ariaBubbleDismissed', 'true');
        setIsBubbleVisible(false);
        setIsOpen(true);
    };

    const handleSendTranscript = async (userEmail: string) => {
        const formattedTranscript = messages.map(msg =>
            `${msg.role === 'user' ? 'You' : 'Aria'}: ${msg.text.split('\n[')[0]}` // Remove quick replies from transcript
        ).join('\n\n');

        const emailBody = `Here is the transcript of your conversation with Aria from the Stallioni website:\n\n---\n\n${formattedTranscript}\n\n---\n\nIf you have more questions, feel free to visit our website again or contact us directly at ${getContactEmail()}.\n\nBest regards,\nThe Stallioni Team`;

        const formData = new FormData();
        formData.append('_subject', 'Your Stallioni Chat Transcript');
        formData.append('_captcha', 'false');
        formData.append('message', emailBody);
        formData.append('_to', userEmail);
        formData.append('_cc', getContactEmail());

        try {
            // 1. Generate reCAPTCHA Token
            if (typeof window.grecaptcha === 'undefined') {
                throw new Error('reCAPTCHA not loaded');
            }

            const recaptchaToken = await new Promise<string>((resolve, reject) => {
                window.grecaptcha.ready(() => {
                    window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'chatbot_transcript' })
                        .then(resolve)
                        .catch(reject);
                });
            });

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Chat User',
                    email: userEmail,
                    message: emailBody,
                    _subject: 'Your Stallioni Chat Transcript',
                    recaptchaToken
                }),
            });
            if (response.ok) {
                // GA4 tracking
                if (typeof window.gtag === 'function') {
                    window.gtag("event", "generate_lead", {
                        method: "chatbot_transcript",
                    });
                }
                showToast("Transcript sent! Check your inbox for the conversation history.", 'success');
            } else {
                throw new Error('Failed to send transcript');
            }
        } catch (error) {
            console.error('Error sending transcript:', error);
            showToast('Could not send transcript. Please try again.', 'error');
        } finally {
            finalClose();
        }
    };

    const parseMessage = (text: string) => {
        const lines = text.split('\n');
        const mainText = [];
        const replies = [];
        const replyRegex = /^\[(.*?)\]$/;

        for (const line of lines) {
            const match = line.match(replyRegex);
            if (match && match[1]) {
                replies.push(match[1]);
            } else {
                mainText.push(line);
            }
        }
        return { text: mainText.join('\n').trim(), replies };
    };

    const TypingIndicator = () => (
        <div className="flex items-end gap-2.5 justify-start">
            <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">A</div>
            <div className="bg-slate-200 text-brand-dark rounded-bl-md rounded-2xl p-3">
                <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
            </div>
        </div>
    );

    const containerClasses = `fixed z-[100] transition-opacity duration-300 ease-in-out ${isMaximized ? 'inset-0 sm:inset-6' : 'bottom-6 right-6'
        }`;

    const chatWindowClasses = isMaximized
        ? 'w-full h-full'
        : 'w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[500px]';

    if (!isOpen) {
        return (
            <div className="fixed bottom-6 right-6 z-50">
                {isBubbleVisible && (
                    <div className="absolute bottom-20 right-0 w-64 bg-white p-4 rounded-xl shadow-lg animate-fade-in border border-slate-200/80" role="alert">
                        <button onClick={handleDismissBubble} className="absolute top-2 right-2 text-slate-400 hover:text-brand-dark" aria-label="Dismiss message">
                            <CloseIcon className="w-4 h-4" />
                        </button>
                        <p className="text-sm text-brand-dark pr-4">Need to hire a developer or get a project estimate? I can help with that instantly.</p>
                        <div className="absolute right-6 -bottom-2 w-4 h-4 bg-white transform rotate-45 border-r border-b border-slate-200/80"></div>
                    </div>
                )}
                <button
                    onClick={openChat}
                    aria-label="Open chat assistant"
                    aria-expanded={false}
                    className="relative mt-4 ml-auto block w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-300"
                >
                    <ChatbotIcon className="w-8 h-8" />
                </button>
            </div>
        )
    }

    return (
        <div className={`${containerClasses} animate-fade-in`}>
            <div className={`relative ${chatWindowClasses} bg-white rounded-2xl shadow-2xl flex flex-col border border-slate-200/80 overflow-hidden transition-all duration-300 ease-in-out`}>
                <EmailTranscriptModal isOpen={showEmailModal} onClose={finalClose} onSend={handleSendTranscript} />
                <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50/70 rounded-t-2xl flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold shadow-md border-2 border-white">A</div>
                        <div>
                            <h3 className="text-lg font-bold text-brand-dark">Aria</h3>
                            <p className="text-xs text-slate-500">Stallioni Assistant</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsMaximized(!isMaximized)} className="text-slate-400 hover:text-brand-dark transition-colors" aria-label={isMaximized ? 'Restore chat' : 'Maximize chat'}>
                            {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
                        </button>
                        <button onClick={handleRequestClose} className="text-slate-400 hover:text-brand-dark transition-colors" aria-label="Close chat">
                            <CloseIcon className="w-5 h-5" />
                        </button>
                    </div>
                </header>
                <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-2">
                    {messages.map((msg, index) => {
                        const { text: messageText, replies } = parseMessage(msg.text);
                        const isLastMessage = index === messages.length - 1;

                        return (
                            <div key={index}>
                                <div className={`flex items-end gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'model' && (
                                        <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">A</div>
                                    )}
                                    {messageText && (
                                        <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-brand-dark text-white rounded-br-md' : 'bg-slate-200 text-brand-dark rounded-bl-md'}`}>
                                            <p className="text-sm whitespace-pre-wrap">{messageText}</p>
                                        </div>
                                    )}
                                </div>
                                {isLastMessage && !isLoading && replies.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3 justify-start pl-10">
                                        {replies.map((reply, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleQuickReplyClick(reply)}
                                                className="px-3 py-1.5 text-sm font-semibold text-brand-orange bg-brand-orange/10 border border-brand-orange/20 rounded-full hover:bg-brand-orange/20 transition-colors"
                                            >
                                                {reply}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}

                    {isLoading && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleFormSubmit} className="p-4 border-t border-slate-200 flex items-center gap-2 flex-shrink-0">
                    <input
                        ref={inputRef}
                        type="text"
                        name="message"
                        placeholder="Ask about our services..."
                        className="w-full px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-orange transition-shadow"
                        autoComplete="off"
                        disabled={isLoading}
                    />
                    <button type="submit" className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-brand-orange text-white rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-110 disabled:bg-slate-400 disabled:scale-100" aria-label="Send message" disabled={isLoading}>
                        <SendIcon />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
