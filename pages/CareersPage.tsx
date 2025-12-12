import React, { useState } from 'react';
import FadeIn from '../components/FadeIn';
import { getContactEmail } from '../constants';
import { useToast } from '../App';

const CareersPage: React.FC = () => {
    const { showToast } = useToast();
    const [applicationForm, setApplicationForm] = useState<{ position: string, show: boolean }>({ position: '', show: false });

    const handleApply = (position: string) => {
        setApplicationForm({ position, show: true });
        // Scroll to form
        setTimeout(() => {
            document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;

        if (submitButton) submitButton.disabled = true;

        try {
            const response = await fetch(`https://formsubmit.co/ajax/${getContactEmail()}`, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                showToast('Application submitted successfully! We\'ll be in touch soon.', 'success');
                form.reset();
                setApplicationForm({ position: '', show: false });
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            showToast('Error submitting application. Please try again.', 'error');
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    };

    const jobs = [
        {
            id: 'wordpress-developer',
            title: 'WordPress Developer',
            type: 'Freelance / Contract',
            responsibilities: [
                'Build custom WordPress websites, themes, and plugins',
                'Optimize website speed, SEO structure, and security',
                'Work with ACF, Elementor, Divi, WPBakery, or custom builders',
                'Handle migrations, bug fixes, and WordPress updates',
                'Collaborate with designers and backend developers'
            ],
            requirements: [
                '2+ years of WordPress development experience',
                'Strong PHP & MySQL fundamentals',
                'Experience with APIs, WooCommerce, and custom post types',
                'Clear communication & ability to meet deadlines',
                'Portfolio of previous WordPress projects'
            ]
        },
        {
            id: 'react-developer',
            title: 'React Developer',
            type: 'Freelance / Contract',
            responsibilities: [
                'Build modern, responsive front-end applications using React',
                'Integrate APIs and work with backend teams',
                'Optimize components for speed & performance',
                'Convert UI/UX designs into functional code',
                'Write reusable components and modular architecture'
            ],
            requirements: [
                '2+ years of experience with React.js',
                'Strong JavaScript, HTML, CSS',
                'Experience with Redux, hooks, REST APIs',
                'Familiarity with Git, Figma, and agile workflows',
                'Strong problem-solving skills'
            ]
        },
        {
            id: 'php-developer',
            title: 'PHP Developer',
            type: 'Freelance / Contract',
            responsibilities: [
                'Develop custom PHP applications',
                'Maintain and optimize existing platforms',
                'Work with MySQL databases and REST APIs',
                'Debug, fix issues, and improve application performance',
                'Collaborate with frontend and backend teams'
            ],
            requirements: [
                '2+ years of experience with Core PHP or PHP frameworks',
                'Strong knowledge of MySQL',
                'Familiar with MVC architecture',
                'Experience with Laravel or CodeIgniter is a plus',
                'Ability to write clean, secure, optimized code'
            ]
        },
        {
            id: 'ai-developer',
            title: 'AI Developer',
            type: 'Freelance / Contract',
            responsibilities: [
                'Build AI-driven tools, chatbots, automation scripts',
                'Work with LLMs, AI APIs (OpenAI, Claude, Gemini, etc.)',
                'Train and fine-tune machine learning models',
                'Integrate AI features into web or mobile apps',
                'Provide solutions for automation, prediction, analytics'
            ],
            requirements: [
                'Strong understanding of Python & machine learning',
                'Experience with AI APIs and frameworks (TensorFlow, PyTorch)',
                'Ability to build prototypes quickly',
                'Knowledge of prompt engineering & automation',
                'Portfolio or sample AI projects preferred'
            ]
        }
    ];

    return (
        <>
            {/* HERO SECTION */}
            <div className="bg-brand-dark text-white py-20 md:py-28">
                <div className="container mx-auto px-6 max-w-7xl">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                            Careers at Stallioni – Join Our Global Remote Talent Network
                        </h1>
                        <div className="h-1 w-24 bg-brand-orange mb-8"></div>
                        <div className="max-w-4xl text-lg md:text-xl text-slate-200 space-y-4 leading-relaxed">
                            <p>
                                At <strong className="text-white">STALLIONI NET SOLUTIONS</strong>, we believe great products are built by great people — wherever they are in the world.
                            </p>
                            <p>
                                We work with talented freelancers and contract-based developers who want to build innovative digital solutions for global clients.
                            </p>
                            <p>
                                If you're driven, passionate, and ready to work on exciting international projects, you're in the right place.
                            </p>
                            <p className="text-brand-orange font-semibold text-2xl mt-6">
                                Join a company that values flexibility, creativity, and technical excellence.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* WHY WORK WITH US */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark mb-6 text-center">
                            Why Work With Stallioni?
                        </h2>
                        <p className="text-xl text-slate-700 mb-12 text-center max-w-4xl mx-auto">
                            We offer a work environment that empowers freelancers and contract developers to grow fast and work on meaningful digital products.
                        </p>

                        <div className="mt-16">
                            <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-8 text-center">
                                Benefits of Working With Us
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                                {[
                                    { icon: '🌍', text: '100% Remote Work – work from anywhere' },
                                    { icon: '📝', text: 'Flexible project-based contracts' },
                                    { icon: '🌎', text: 'Opportunity to work with global clients (USA, UK, Middle East, Australia)' },
                                    { icon: '💰', text: 'Fast payments & transparent communication' },
                                    { icon: '🚀', text: 'Exposure to cutting-edge technologies & real-world projects' },
                                    { icon: '🤝', text: 'Supportive project managers & collaborative teams' },
                                    { icon: '⭐', text: 'Long-term contract opportunities for consistent performers' }
                                ].map((benefit, idx) => (
                                    <div key={idx} className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                                        <span className="text-4xl">{benefit.icon}</span>
                                        <p className="text-lg text-slate-700 font-medium">{benefit.text}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-2xl font-bold text-center text-brand-orange mt-12 italic">
                                At Stallioni, you don't just work — you grow, you innovate, you build the future.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* CURRENT OPEN POSITIONS */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <FadeIn>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark mb-4">
                                Current Open Positions
                            </h2>
                            <p className="text-xl text-slate-600">
                                <span className="font-semibold">(Freelance / Contract Only)</span>
                            </p>
                            <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
                                Below are the roles we're currently hiring for. If your skills match, apply today and start working on exciting international projects.
                            </p>
                        </div>

                        {/* JOB LISTINGS */}
                        <div className="space-y-8 max-w-6xl mx-auto">
                            {jobs.map((job, idx) => (
                                <FadeIn key={job.id} delay={idx * 100}>
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                                        <div className="p-8 md:p-10">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                                <div>
                                                    <h2 className="text-3xl font-extrabold text-brand-dark mb-2">
                                                        {job.title}
                                                    </h2>
                                                    <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                                                        {job.type}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* RESPONSIBILITIES */}
                                            <div className="mb-8">
                                                <h3 className="text-xl font-bold text-brand-dark mb-4">Responsibilities</h3>
                                                <ul className="space-y-3">
                                                    {job.responsibilities.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <svg className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                            <span className="text-slate-700">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* REQUIREMENTS */}
                                            <div className="mb-8">
                                                <h3 className="text-xl font-bold text-brand-dark mb-4">Requirements</h3>
                                                <ul className="space-y-3">
                                                    {job.requirements.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <svg className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                            <span className="text-slate-700">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <button
                                                onClick={() => handleApply(job.title)}
                                                className="bg-brand-orange text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                                            >
                                                Apply for {job.title}
                                            </button>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-16 md:py-24 bg-brand-dark text-white">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
                            Build Your Future with Stallioni
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                            Whether you're a WordPress expert, React specialist, PHP engineer, or AI developer, Stallioni gives you the platform to work on real projects that make an impact — with the freedom of freelancing.
                        </p>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-10 max-w-3xl mx-auto">
                            <p className="text-2xl font-bold mb-4">We're not just offering jobs.</p>
                            <p className="text-xl text-slate-300">
                                We're offering opportunities, growth, and long-term partnerships.
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setApplicationForm({ position: 'General Application', show: true });
                                setTimeout(() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
                            }}
                            className="inline-flex items-center gap-3 bg-brand-orange text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-2xl hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 text-lg"
                        >
                            <span>Apply Today — Join Our Remote Global Talent Network</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </FadeIn>
                </div>
            </section>

            {/* APPLICATION FORM */}
            {applicationForm.show && (
                <section id="application-form" className="py-16 bg-gray-50">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <FadeIn>
                            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                                <div className="text-center mb-8">
                                    <h3 className="text-3xl font-extrabold text-brand-dark mb-2">
                                        Apply for {applicationForm.position}
                                    </h3>
                                    <p className="text-slate-600">We're excited to hear from you!</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <input type="hidden" name="_subject" value={`New Application: ${applicationForm.position}`} />
                                    <input type="hidden" name="_captcha" value="false" />
                                    <input type="text" name="_honey" style={{ display: 'none' }} />
                                    <input type="hidden" name="position" value={applicationForm.position} />

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange transition"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange transition"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange transition"
                                                placeholder="+1 234 567 8900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">LinkedIn Profile</label>
                                            <input
                                                type="url"
                                                name="linkedin"
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange transition"
                                                placeholder="https://linkedin.com/in/..."
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Portfolio/GitHub URL</label>
                                        <input
                                            type="url"
                                            name="portfolio"
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange transition"
                                            placeholder="https://github.com/username or https://portfolio.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Resume/CV (PDF, DOC, DOCX) *</label>
                                        <input
                                            type="file"
                                            name="attachment"
                                            accept=".pdf,.doc,.docx"
                                            required
                                            className="w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-orange file:text-white hover:file:bg-opacity-90 file:cursor-pointer"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Cover Letter / Message</label>
                                        <textarea
                                            name="message"
                                            rows={6}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange transition"
                                            placeholder="Tell us why you're a great fit for this role..."
                                        ></textarea>
                                    </div>

                                    <div className="flex gap-4 justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setApplicationForm({ position: '', show: false })}
                                            className="px-8 py-3 border-2 border-gray-300 text-slate-700 font-semibold rounded-full hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-8 py-3 bg-brand-orange text-white font-bold rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            Submit Application
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </FadeIn>
                    </div>
                </section>
            )}
        </>
    );
};

export default CareersPage;
