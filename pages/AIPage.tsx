

import React from 'react';
import { AiIcon } from '../components/IconComponents';
import FadeIn from '../components/FadeIn';
import { useNavigation } from '../App';

const AIPage: React.FC = () => {
    const { navigate } = useNavigation();

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        navigate(path);
    };

    const PageHeader: React.FC<{title: string, subtitle: string}> = ({title, subtitle}) => (
        <div className="bg-brand-dark text-white py-20 text-center">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-extrabold">{title}</h1>
                    <p className="text-lg text-slate-300 mt-4 max-w-4xl mx-auto">{subtitle}</p>
                </FadeIn>
            </div>
        </div>
    );

    const Section: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className = '' }) => (
        <section className={`py-16 md:py-20 ${className}`}>
            <div className="container mx-auto px-6">{children}</div>
        </section>
    );

    const SectionTitle: React.FC<{children: React.ReactNode;}> = ({ children }) => (
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark text-center mb-12">{children}</h2>
    );

    const OverviewSection: React.FC = () => (
        <Section>
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Why AI & Emerging Tech are Critical</h2>
                <p className="text-slate-600 text-lg">
                    In today's global marketplace, staying competitive means leveraging the most advanced tools available. AI and emerging technologies are no longer a luxury—they are essential for efficiency, personalization, and scalability. For our overseas clients, these technologies bridge distances, automate complex tasks, and unlock data-driven insights that are crucial for growth.
                </p>
            </div>
        </Section>
    );
    
    const ServicesSection: React.FC = () => (
        <Section className="bg-brand-light">
            <SectionTitle>Our AI Service Offerings</SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {['AI Chatbots', 'Predictive Analytics', 'Automation Tools', 'Personalized Recommendations'].map(service => (
                    <div key={service} className="bg-white p-8 rounded-lg shadow-md text-center">
                        <div className="flex justify-center mb-4"><AiIcon /></div>
                        <h3 className="text-xl font-bold text-brand-dark">{service}</h3>
                    </div>
                ))}
            </div>
        </Section>
    );

    const BenefitsSection: React.FC = () => (
        <Section>
            <SectionTitle>The Tangible Benefits of AI</SectionTitle>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <div className="bg-slate-100 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-brand-dark mb-2">Enhanced Efficiency & ROI</h3>
                    <p className="text-slate-600">Automate repetitive tasks, optimize resource allocation, and see a direct impact on your bottom line.</p>
                </div>
                <div className="bg-slate-100 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-brand-dark mb-2">Hyper-Personalization</h3>
                    <p className="text-slate-600">Deliver unique experiences to every user, increasing engagement and conversion rates.</p>
                </div>
                 <div className="bg-slate-100 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-brand-dark mb-2">Data-Driven Decisions</h3>
                    <p className="text-slate-600">Turn raw data into actionable insights to guide your business strategy.</p>
                </div>
                 <div className="bg-slate-100 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-brand-dark mb-2">Global Scalability</h3>
                    <p className="text-slate-600">AI systems can handle massive volumes of interactions and data, allowing your business to grow without limits.</p>
                </div>
            </div>
        </Section>
    );

    const CtaSection: React.FC = () => (
        <Section className="bg-brand-orange text-white">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Integrate AI into Your Business Strategy</h2>
                <p className="mb-8 max-w-4xl mx-auto">Let us show you how AI can transform your operations and create a sustainable competitive advantage.</p>
                <a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="bg-white text-brand-orange font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all duration-300">
                    Talk to Our AI Experts
                </a>
            </div>
        </Section>
    );

    return (
        <>
            <PageHeader title="AI & Emerging Technologies" subtitle="Harness the power of intelligent systems to unlock unprecedented growth and efficiency."/>
            <FadeIn><OverviewSection /></FadeIn>
            <FadeIn><ServicesSection /></FadeIn>
            <FadeIn><BenefitsSection /></FadeIn>
            <FadeIn><CtaSection /></FadeIn>
        </>
    );
};

export default AIPage;
