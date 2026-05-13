import React from 'react';
import { useParams } from 'react-router-dom';
import { useModal, useNavigation } from '../App';
import { REGIONAL_PAGES, RegionalPageData } from '../constants/regional-pages';

const CheckIcon = () => (
    <svg className="w-6 h-6 text-brand-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const RegionalLandingPage: React.FC = () => {
    const { region } = useParams<{ region: string }>();
    const { openModal } = useModal();
    const { navigate } = useNavigation();

    const data: RegionalPageData | undefined = region ? REGIONAL_PAGES[region] : undefined;

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Region not found</h1>
                    <button onClick={() => navigate('/')} className="text-brand-orange underline">
                        Back to home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-brand-dark via-slate-900 to-brand-dark text-white py-24 px-6">
                <div className="container mx-auto max-w-5xl text-center">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange font-semibold text-sm mb-6 tracking-wider uppercase">
                        {data.badge}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                        {data.h1Top} <br />
                        <span className="text-brand-orange">{data.h1Highlight}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-10 max-w-3xl mx-auto">
                        {data.subhead}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            onClick={(e) => { e.preventDefault(); openModal('Consultation'); }}
                            className="inline-flex items-center justify-center bg-brand-orange text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-opacity-90 transition-all text-lg"
                        >
                            {data.primaryCta} <ArrowRightIcon />
                        </a>
                        <a
                            href="/services"
                            onClick={(e) => { e.preventDefault(); navigate('/services'); }}
                            className="inline-flex items-center justify-center bg-white/5 border border-white/20 text-white font-semibold py-4 px-10 rounded-full hover:bg-white/10 transition-all text-lg"
                        >
                            See Our Services
                        </a>
                    </div>
                </div>
            </section>

            {/* Why this region section */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark text-center mb-12">
                        {data.whySectionTitle}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {data.whyPoints.map((point, idx) => (
                            <div key={idx} className="flex gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <CheckIcon />
                                <div>
                                    <h3 className="font-bold text-brand-dark text-lg mb-2">{point.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{point.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Body content */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="prose prose-lg prose-slate max-w-none">
                        {data.bodyParagraphs.map((para, idx) => (
                            <React.Fragment key={idx}>
                                {para.heading && (
                                    <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mt-12 mb-4">
                                        {para.heading}
                                    </h2>
                                )}
                                <p className="text-slate-700 leading-relaxed mb-6">{para.text}</p>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services we deliver */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark text-center mb-4">
                        Services for {data.regionDisplayName} Clients
                    </h2>
                    <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                        {data.servicesIntro}
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.featuredServices.map((svc, idx) => (
                            <a
                                key={idx}
                                href={`/services/${svc.slug}`}
                                onClick={(e) => { e.preventDefault(); navigate(`/services/${svc.slug}`); }}
                                className="block bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all"
                            >
                                <h3 className="font-bold text-brand-dark text-lg mb-2">{svc.name}</h3>
                                <p className="text-slate-600 text-sm">{svc.description}</p>
                                <div className="mt-4 text-brand-orange font-semibold inline-flex items-center text-sm">
                                    Learn more <ArrowRightIcon />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark text-center mb-12">
                        {data.regionDisplayName} Client FAQs
                    </h2>
                    <div className="space-y-6">
                        {data.faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6">
                                <h3 className="font-bold text-brand-dark text-lg mb-3">{faq.question}</h3>
                                <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-brand-orange py-16 px-6">
                <div className="container mx-auto max-w-3xl text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{data.ctaHeading}</h2>
                    <p className="text-lg md:text-xl text-white/90 mb-8">{data.ctaSubhead}</p>
                    <a
                        href="/contact"
                        onClick={(e) => { e.preventDefault(); openModal('Quote'); }}
                        className="inline-flex items-center justify-center bg-white text-brand-orange font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-lg"
                    >
                        Get Your Free Quote
                    </a>
                </div>
            </section>
        </div>
    );
};

export default RegionalLandingPage;
