

import React from 'react';
import { AiIcon } from '../components/IconComponents';
import FadeIn from '../components/FadeIn';
import { useNavigation } from '../App';

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-brand-orange text-xs font-semibold tracking-[0.2em] uppercase mb-4">{children}</p>
);

const AIPage: React.FC = () => {
    const { navigate } = useNavigation();

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        navigate(path);
    };

    return (
        <>
            {/* HERO */}
            <section className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-6 max-w-7xl py-20 md:py-28">
                    <FadeIn>
                        <div className="max-w-4xl">
                            <Eyebrow>AI & emerging tech</Eyebrow>
                            <h1 className="text-4xl md:text-6xl font-bold text-brand-dark leading-[1.1] tracking-tight mb-6">
                                Intelligent systems.<br />Unprecedented growth.
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
                                Harness the power of AI to bridge distances, automate complex tasks, and unlock data-driven insights that drive efficiency, personalization, and scalability.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* SERVICES */}
            <section className="py-20 md:py-24 bg-brand-light">
                <div className="container mx-auto px-6 max-w-7xl">
                    <FadeIn>
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <Eyebrow>Offerings</Eyebrow>
                            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark tracking-tight">
                                Our AI service offerings.
                            </h2>
                        </div>
                    </FadeIn>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {['AI chatbots', 'Predictive analytics', 'Automation tools', 'Personalized recommendations'].map((service, i) => (
                            <FadeIn key={service} delay={i * 60}>
                                <div className="bg-white p-7 rounded-lg border border-gray-200 hover:border-brand-orange transition-colors h-full">
                                    <div className="w-10 h-10 mb-5 flex items-center justify-center">
                                        <AiIcon className="w-7 h-7 text-brand-orange" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-brand-dark">{service}</h3>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* BENEFITS */}
            <section className="py-20 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <FadeIn>
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <Eyebrow>Benefits</Eyebrow>
                            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark tracking-tight">
                                Tangible benefits of AI.
                            </h2>
                        </div>
                    </FadeIn>
                    <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
                        {[
                            { title: 'Enhanced efficiency & ROI', desc: 'Automate repetitive tasks, optimize resource allocation, and see a direct impact on your bottom line.' },
                            { title: 'Hyper-personalization', desc: 'Deliver unique experiences to every user, increasing engagement and conversion rates.' },
                            { title: 'Data-driven decisions', desc: 'Turn raw data into actionable insights to guide your business strategy.' },
                            { title: 'Global scalability', desc: 'AI systems handle massive volumes of interactions and data, letting your business grow without limits.' },
                        ].map((b, i) => (
                            <FadeIn key={b.title} delay={i * 60}>
                                <div className="bg-white p-7 rounded-lg border border-gray-200 hover:border-brand-orange transition-colors">
                                    <h3 className="text-lg font-semibold text-brand-dark mb-2">{b.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-[15px]">{b.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-brand-dark text-white py-20 md:py-24">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight">
                            Integrate AI into your business strategy.
                        </h2>
                        <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Let us show you how AI can transform your operations and create a sustainable competitive advantage.
                        </p>
                        <a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="inline-flex items-center gap-2 bg-brand-orange text-white font-semibold py-3.5 px-7 rounded-md hover:bg-brand-orange-hover transition-colors">
                            Talk to our AI experts
                        </a>
                    </FadeIn>
                </div>
            </section>
        </>
    );
};

export default AIPage;
