
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

    const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-brand-orange" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-dark">{children}</span>
        </div>
    );

    return (
        <>
            {/* HERO */}
            <section className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-6 max-w-[1400px] py-16 md:py-20">
                    <FadeIn>
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                            <div className="max-w-3xl">
                                <Eyebrow>About Us</Eyebrow>
                                <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-brand-dark leading-[1.05] tracking-[-0.025em] mb-6">
                                    A leading IT outsourcing <span className="text-brand-orange">company in India.</span>
                                </h1>
                                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                                    Stallioni Net Solutions doesn't just build software — we build long-term success for businesses around the world.
                                </p>
                            </div>

                            {/* Inline stats */}
                            <div className="flex gap-6 md:gap-8 flex-shrink-0">
                                <div>
                                    <p className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">15<span className="text-brand-orange">+</span></p>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Years</p>
                                </div>
                                <div className="border-l border-gray-200 pl-6 md:pl-8">
                                    <p className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">900<span className="text-brand-orange">+</span></p>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Projects</p>
                                </div>
                                <div className="border-l border-gray-200 pl-6 md:pl-8">
                                    <p className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-none">35<span className="text-brand-orange">+</span></p>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium">Countries</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* INTRODUCTION */}
            <section className="bg-white py-16 md:py-20">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <FadeIn>
                        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                            <div className="lg:col-span-5">
                                <div className="lg:sticky lg:top-28">
                                    <Eyebrow>Our Mission</Eyebrow>
                                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark tracking-[-0.025em] leading-tight mb-8">
                                        World-class solutions, <span className="text-brand-orange">remote-first.</span>
                                    </h2>

                                    {/* Quick facts card */}
                                    <div className="bg-brand-light border border-gray-200 rounded-2xl p-6">
                                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-5">At a glance</h3>
                                        <dl className="space-y-4">
                                            {[
                                                { label: 'Founded', value: '2007', icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>) },
                                                { label: 'Headquarters', value: 'Coimbatore, India', icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>) },
                                                { label: 'Team size', value: '100+ engineers', icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>) },
                                                { label: 'Global reach', value: '35+ countries', icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>) },
                                            ].map((fact) => (
                                                <div key={fact.label} className="flex items-start gap-3">
                                                    <span className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-brand-orange flex items-center justify-center flex-shrink-0">
                                                        {fact.icon}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <dt className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">{fact.label}</dt>
                                                        <dd className="text-sm font-semibold text-brand-dark mt-0.5">{fact.value}</dd>
                                                    </div>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-7">
                                <div className="text-lg text-gray-700 leading-relaxed space-y-5">
                                    <p>
                                        As a leading <strong className="text-brand-dark">IT outsourcing company in India</strong>, we empower startups, small businesses, agencies, and enterprises with high-quality development talent, innovative technology solutions, and a partnership model designed for growth.
                                    </p>
                                    <blockquote className="bg-brand-light border-l-2 border-brand-orange rounded-r-lg p-6 my-6">
                                        <p className="text-xl md:text-2xl font-medium text-brand-dark leading-snug">
                                            For more than 15 years, our mission has remained crystal clear: deliver world-class digital solutions at affordable prices, backed by a reliable remote development team you can trust.
                                        </p>
                                    </blockquote>
                                    <p>
                                        From websites and mobile apps to enterprise software and SaaS platforms, Stallioni has become a global technology partner known for <strong className="text-brand-dark">speed, quality, and scalability</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* TRUSTED OFFSHORE COMPANY */}
            <section className="bg-brand-light py-16 md:py-20">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <FadeIn>
                        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                            {/* Content side */}
                            <div className="lg:col-span-7">
                                <Eyebrow>Trusted Partner</Eyebrow>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark tracking-[-0.025em] leading-tight mb-6">
                                    Your trusted offshore <span className="text-brand-orange">software development</span> partner.
                                </h2>
                                <div className="text-base md:text-lg text-gray-700 space-y-4 leading-relaxed">
                                    <p>
                                        Since 2007, Stallioni has helped businesses worldwide turn ideas into successful digital products.
                                    </p>
                                    <p>
                                        Our strength lies in combining <strong className="text-brand-dark">cost-effective offshore development</strong> with <strong className="text-brand-dark">strong technical expertise</strong> — giving clients the perfect balance of value and quality.
                                    </p>
                                    <p>
                                        From our development center in Coimbatore, we operate as an extension of your own team — with elite Indian tech talent, streamlined communication, and end-to-end project ownership.
                                    </p>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="lg:col-span-5">
                                <div className="relative rounded-2xl overflow-hidden border border-gray-200">
                                    <img
                                        src="/portfolio/office.png"
                                        alt="Stallioni offshore development office in Coimbatore, India"
                                        loading="eager"
                                        fetchPriority="high"
                                        width="800"
                                        height="900"
                                        onError={(e) => {
                                            const img = e.currentTarget;
                                            if (img.src.indexOf('unsplash') === -1) {
                                                img.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c7da?q=80&w=800&h=900&auto=format&fit=crop';
                                            }
                                        }}
                                        className="w-full object-cover bg-gray-200 aspect-[4/5]"
                                    />
                                    {/* Floating location chip */}
                                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full pl-1.5 pr-3.5 py-1.5 border border-gray-200">
                                        <span className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                                            <img src="https://flagcdn.com/w40/in.png" alt="" className="w-full h-full object-cover" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                        </span>
                                        <span className="text-xs font-medium text-brand-dark">Coimbatore, India</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* CTA — light cream matching homepage */}
            <section className="bg-white py-16 md:py-20 relative overflow-hidden">
                {/* Soft decorative accents */}
                <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-brand-orange/5" aria-hidden="true" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-brand-orange/5" aria-hidden="true" />

                <div className="container mx-auto px-6 max-w-4xl text-center relative">
                    <FadeIn>
                        <Eyebrow><span className="mx-auto">Let's Talk</span></Eyebrow>
                        <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-brand-dark mb-6 tracking-[-0.025em] leading-[1.05]">
                            Your success story <span className="text-brand-orange">starts here.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
                            Stallioni stands for reliability, affordability, and world-class technical craftsmanship. We're committed to delivering software that performs and partnerships that last.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href="/contact"
                                onClick={(e) => { e.preventDefault(); openModal('Consultation'); }}
                                className="group inline-flex items-center justify-center gap-3 bg-brand-orange text-white font-medium py-3.5 pl-7 pr-3 rounded-full hover:bg-brand-orange-hover transition-colors"
                            >
                                Schedule a free consultation
                                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <svg className="w-3.5 h-3.5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </a>
                            <a
                                href="/contact"
                                onClick={(e) => handleNav(e, '/contact')}
                                className="inline-flex items-center justify-center gap-2 border border-gray-300 text-brand-dark font-medium py-3.5 px-7 rounded-full hover:bg-brand-light hover:border-brand-dark transition-colors"
                            >
                                Contact us
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </>
    );
};

export default AboutPage;
