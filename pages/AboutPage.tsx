
import React from 'react';
import FadeIn from '../components/FadeIn';
import { useNavigation, useModal } from '../App';

const AboutPage: React.FC = () => {
    const { navigate } = useNavigation();
    const { openModal } = useModal();

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        navigate(path);
    };

    const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
        <section className={`py-16 md:py-20 ${className}`}>
            <div className="container mx-auto px-6 max-w-7xl">{children}</div>
        </section>
    );

    return (
        <>
            {/* HERO SECTION */}
            <div className="bg-brand-dark text-white py-20 md:py-28">
                <div className="container mx-auto px-6 max-w-7xl">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                            About Stallioni – Leading IT Outsourcing Company in India
                        </h1>
                        <div className="h-1 w-24 bg-brand-orange mb-8"></div>
                    </FadeIn>
                </div>
            </div>

            {/* INTRODUCTION */}
            <Section className="bg-white">
                <FadeIn>
                    <div className="max-w-5xl mx-auto">
                        <div className="text-lg md:text-xl text-slate-700 leading-relaxed space-y-6">
                            <p>
                                At <strong className="text-brand-dark">Stallioni Net Solutions</strong>, we don't just build software—we build long-term success for businesses around the world.
                            </p>
                            <p>
                                As a <strong className="text-brand-dark">leading IT outsourcing company in India</strong>, we empower startups, small businesses, agencies, and enterprises with high-quality development talent, innovative technology solutions, and a partnership model designed for growth.
                            </p>
                            <p className="text-2xl font-semibold text-brand-dark border-l-4 border-brand-orange pl-6 py-2">
                                For more than 15 years, our mission has remained crystal clear:
                                <span className="block mt-2 text-brand-orange">Deliver world-class digital solutions at affordable prices, backed by a reliable remote development team you can trust.</span>
                            </p>
                            <p>
                                From websites and mobile apps to enterprise software and SaaS platforms, <strong className="text-brand-dark">Stallioni</strong> has become a <strong className="text-brand-dark">global technology partner</strong> known for <strong className="text-brand-orange">speed, quality, and scalability</strong>.
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </Section>

            {/* TRUSTED OFFSHORE COMPANY SECTION */}
            <Section className="bg-gray-50">
                <FadeIn>
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-6">
                                Your Trusted Offshore Software Development Company in India
                            </h2>
                            <div className="text-lg text-slate-700 space-y-4 leading-relaxed">
                                <p>
                                    Since 2007, Stallioni has helped businesses worldwide turn ideas into successful digital products.
                                </p>
                                <p>
                                    Our strength lies in combining <strong className="text-brand-dark">cost-effective offshore development</strong> with <strong className="text-brand-dark">strong technical expertise</strong> — giving clients the perfect balance of value and quality.
                                </p>
                                <p>
                                    From our <strong className="text-brand-dark">state-of-the-art development center in Coimbatore</strong>, we operate as an extension of your own team.
                                </p>
                                <p>
                                    You get access to <span className="text-brand-orange font-semibold">elite Indian tech talent</span>, streamlined communication, and end-to-end project ownership — all delivered with transparency and care.
                                </p>
                            </div>

                            {/* PROVEN TRACK RECORD */}
                            <div className="mt-10">
                                <h3 className="text-2xl font-bold text-brand-dark mb-6">Proven Track Record of Excellence</h3>
                                <ul className="space-y-3 text-slate-700">
                                    <li className="flex items-start">
                                        <svg className="w-6 h-6 text-brand-orange mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span><strong>15+ years</strong> of delivering innovative digital solutions</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-6 h-6 text-brand-orange mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span><strong>900+ successful projects</strong> across multiple industries</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-6 h-6 text-brand-orange mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Clients in <strong>35+ countries</strong> including USA, UK, India, Middle East & Australia</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-6 h-6 text-brand-orange mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span><strong>Dedicated in-house team</strong> of developers, designers, testers, and project managers</span>
                                    </li>
                                </ul>
                                <p className="mt-6 text-xl font-semibold text-brand-orange italic">
                                    With every project we take on, our promise is simple: We treat your vision as our own.
                                </p>
                            </div>
                        </div>

                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c7da?q=80&w=800&h=900&auto=format&fit=crop"
                                alt="Expert offshore development team from India collaborating on projects"
                                loading="lazy"
                                className="rounded-2xl shadow-2xl w-full object-cover"
                            />

                            {/* STATS CARDS */}
                            <div className="grid grid-cols-3 gap-4 mt-8">
                                <div className="bg-white p-6 rounded-xl shadow-lg text-center border-t-4 border-brand-orange">
                                    <p className="text-4xl font-extrabold text-brand-orange">15+</p>
                                    <p className="text-sm text-slate-600 mt-2 font-semibold">Years</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg text-center border-t-4 border-brand-orange">
                                    <p className="text-4xl font-extrabold text-brand-orange">900+</p>
                                    <p className="text-sm text-slate-600 mt-2 font-semibold">Projects</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg text-center border-t-4 border-brand-orange">
                                    <p className="text-4xl font-extrabold text-brand-orange">35+</p>
                                    <p className="text-sm text-slate-600 mt-2 font-semibold">Countries</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </Section>

            {/* WHY OUTSOURCE TO STALLIONI */}
            <Section className="bg-white">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark mb-4">
                            Why Outsource Software Development to Stallioni?
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Outsourcing should make your business <strong className="text-brand-dark">stronger, faster, and more efficient</strong>. That's exactly what we deliver — a partnership that eliminates headaches and accelerates growth.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* SEAMLESS COMMUNICATION */}
                        <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-brand-orange hover:shadow-xl transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <svg className="w-12 h-12 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-3">Seamless Communication Across Time Zones</h3>
                                    <p className="text-slate-700 leading-relaxed">
                                        Our project managers are fluent in English and trained in cross-cultural communication. You get <strong>real-time updates, weekly reviews, and clear documentation</strong> — ensuring your project stays on track from day one.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* TRANSPARENT PROJECT MANAGEMENT */}
                        <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-brand-orange hover:shadow-xl transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <svg className="w-12 h-12 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-3">Transparent Project Management</h3>
                                    <p className="text-slate-700 leading-relaxed">
                                        With agile execution, progress tracking, and dedicated reporting, you always know what's happening. We provide a <strong>single point of contact</strong>, removing confusion and improving accountability.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* GLOBAL OPERATIONAL SYNC */}
                        <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-brand-orange hover:shadow-xl transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <svg className="w-12 h-12 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-3">Global Operational Sync</h3>
                                    <p className="text-slate-700 leading-relaxed">
                                        Whether you're in the <strong>US, UK, Middle East, or Australia</strong>, we align our work with your time zone. Your remote team functions as a <strong>seamless extension</strong> of your internal staff.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* WORLD-CLASS QUALITY */}
                        <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-brand-orange hover:shadow-xl transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <svg className="w-12 h-12 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-3">World-Class Quality & Security</h3>
                                    <p className="text-slate-700 leading-relaxed">
                                        Security and performance are non-negotiable. We follow <strong>global best practices</strong> in coding standards, QA, testing, and data security — delivering solutions that are <strong>robust, scalable, and future-ready</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </Section>

            {/* BECOME OUR PARTNER */}
            <Section className="bg-brand-dark text-white">
                <FadeIn>
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
                            Become Our Partner — Build a High-Performance Offshore Team
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                            Hiring the right development team shouldn't be difficult. With Stallioni, it becomes your <span className="text-brand-orange font-semibold">biggest advantage</span>.
                        </p>

                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-12">
                            <h3 className="text-2xl font-bold mb-6">We help businesses:</h3>
                            <div className="grid md:grid-cols-2 gap-6 text-left">
                                {[
                                    'Reduce development cost dramatically',
                                    'Speed up product launch timelines',
                                    'Add skilled talent to their team instantly',
                                    'Scale without operational risk',
                                    'Maintain consistent, high-quality output'
                                ].map((benefit, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <svg className="w-6 h-6 text-brand-orange flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-lg">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold mb-6">Let's Build Something Exceptional Together</h3>
                            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                                Our experts are ready to understand your project, your goals, and your timeline — and help you build a remote team that delivers.
                            </p>
                            <p className="text-lg text-slate-400 mb-10">
                                Whether you need <strong className="text-white">one developer</strong> or a <strong className="text-white">full offshore team</strong>, Stallioni is the partner you can trust to bring your vision to life.
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </Section>

            {/* CONCLUSION & CTA */}
            <Section className="bg-white">
                <FadeIn>
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-gray-50 rounded-3xl p-10 md:p-16 text-center shadow-xl border-t-4 border-brand-orange">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-6">
                                Your Success Story Starts Here
                            </h2>
                            <p className="text-xl text-slate-700 mb-8 leading-relaxed max-w-3xl mx-auto">
                                <strong className="text-brand-dark">Stallioni Net Solutions</strong> stands for <span className="text-brand-orange font-semibold">reliability, affordability, and world-class technical craftsmanship</span>.
                            </p>
                            <p className="text-lg text-slate-600 mb-8">
                                We're committed to delivering software that performs, teams that stay dependable, and partnerships that last.
                            </p>
                            <p className="text-2xl font-bold text-brand-orange mb-10 italic">
                                When you grow, we grow.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => openModal('Consultation')}
                                    className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-2xl hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 text-lg"
                                >
                                    <span>Schedule a Free Outsourcing Consultation</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                                <a
                                    href="/contact"
                                    onClick={(e) => handleNav(e, '/contact')}
                                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-brand-orange text-brand-orange font-bold py-4 px-10 rounded-full hover:bg-brand-orange hover:text-white transition-all duration-300 text-lg"
                                >
                                    Contact Us
                                </a>
                            </div>

                            <p className="text-sm text-slate-500 mt-8">
                                Let's turn your ideas into impactful digital solutions.
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </Section>
        </>
    );
};

export default AboutPage;
