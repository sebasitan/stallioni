import React, { useState, useEffect } from 'react';
import FadeIn from '../components/FadeIn';
import { RECAPTCHA_SITE_KEY } from '../constants';
import { useToast } from '../App';
import { uploadToCloudinary } from '../utils/cloudinary';
import { getJobOpenings, JobOpening } from '../utils/careersStorage';

// ============================================
// Icons
// ============================================
const Icon = {
    Arrow: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    ),
};

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-px bg-brand-orange" />
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-dark">{children}</span>
    </div>
);

// ============================================
// EDITORIAL HEADER
// ============================================
const PageHeader: React.FC = () => (
    <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl py-14 md:py-16">
            <FadeIn>
                <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gray-500 mb-4">Careers at Stallioni</p>
                <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-brand-dark tracking-[-0.02em] leading-[1.15] max-w-3xl">
                    Build software that ships, with a team that respects your time.
                </h1>
                <p className="mt-4 text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl">
                    We hire senior engineers, designers and product thinkers for both in-house and contract roles. Browse our open positions below.
                </p>
            </FadeIn>
        </div>
    </header>
);

// ============================================
// WHY WORK WITH US — iconed cards
// ============================================
const benefits = [
    { title: 'Meaningful work', desc: 'Production software for real clients — no busy work, no throwaway prototypes.' },
    { title: 'Senior team', desc: 'Collaborate with engineers and designers who care about craft, code quality, and shipping.' },
    { title: 'Competitive pay', desc: 'Transparent rates, timely payments, and no surprises on the invoice.' },
    { title: 'Modern tooling', desc: 'React, Node, Flutter, AWS, AI — we invest in tools that make great work feel easy.' },
    { title: 'Flexible arrangements', desc: 'In-house or contract, full-time or freelance — we work with senior people on terms that fit.' },
    { title: 'Long-term growth', desc: 'High performers get larger scope, lead opportunities, and a seat at architecture decisions.' },
];

const Benefits: React.FC = () => (
    <section className="bg-brand-light py-14 md:py-16 border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
            <FadeIn>
                <div className="mb-10 max-w-2xl">
                    <Eyebrow>Why join us</Eyebrow>
                    <h2 className="text-2xl md:text-3xl font-bold text-brand-dark tracking-[-0.02em] leading-[1.2]">
                        Built for senior people who value craft.
                    </h2>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7">
                {benefits.map((b, i) => (
                    <FadeIn key={b.title} delay={i * 40}>
                        <div className="flex gap-3.5">
                            <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-brand-orange" />
                            <div>
                                <h3 className="text-[15.5px] font-semibold text-brand-dark tracking-tight mb-1.5">{b.title}</h3>
                                <p className="text-[14px] text-gray-600 leading-relaxed">{b.desc}</p>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
    </section>
);

// ============================================
// JOB CARD
// ============================================
const JobCard: React.FC<{ job: JobOpening; onApply: (title: string) => void }> = ({ job, onApply }) => (
    <article className="bg-white border border-gray-200 hover:border-brand-dark rounded-2xl p-6 md:p-8 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-brand-dark tracking-tight leading-tight">
                        {job.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 bg-brand-light border border-gray-200 text-brand-dark text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                        <span className="w-1 h-1 rounded-full bg-brand-orange" />
                        {job.type}
                    </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-6">
                    <div>
                        <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.18em] mb-3">What you'll do</h4>
                        <ul className="space-y-2">
                            {job.responsibilities.map((resp, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-gray-600 text-[14.5px] leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0" />
                                    <span>{resp}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.18em] mb-3">What we're looking for</h4>
                        <ul className="space-y-2">
                            {job.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-gray-600 text-[14.5px] leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                                    <span>{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="lg:mt-1 flex-shrink-0">
                <button
                    onClick={() => onApply(job.title)}
                    className="group inline-flex items-center justify-center gap-2 bg-brand-orange text-white font-medium py-3 pl-6 pr-2.5 rounded-full hover:bg-brand-orange-hover transition-colors w-full lg:w-auto"
                >
                    Apply now
                    <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform text-brand-orange">
                        <Icon.Arrow />
                    </span>
                </button>
            </div>
        </div>
    </article>
);

// ============================================
// MAIN
// ============================================
const CareersPage: React.FC = () => {
    const { showToast } = useToast();
    const [applicationForm, setApplicationForm] = useState<{ position: string; show: boolean }>({ position: '', show: false });
    const [jobs, setJobs] = useState<JobOpening[]>([]);

    const handleApply = (position: string) => {
        setApplicationForm({ position, show: true });
        setTimeout(() => {
            document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
        const originalButtonText = submitButton ? submitButton.innerText : 'Submit application';

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerText = 'Processing…';
        }

        try {
            const resumeFile = formData.get('attachment') as File;
            if (resumeFile && resumeFile.size > 0) {
                try {
                    submitButton && (submitButton.innerText = 'Uploading resume…');
                    const resumeUrl = await uploadToCloudinary(resumeFile);
                    formData.set('resume_link', resumeUrl);
                    formData.delete('attachment');
                } catch (uploadError: any) {
                    console.error('Resume upload failed:', uploadError);
                    showToast(`Resume upload failed: ${uploadError.message}`, 'error');
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.innerText = originalButtonText;
                    }
                    return;
                }
            } else if (applicationForm.position !== 'General Application') {
                showToast('Please select a resume file to upload.', 'error');
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerText = originalButtonText;
                }
                return;
            }

            submitButton && (submitButton.innerText = 'Sending application…');

            const recaptchaToken = await new Promise<string>((resolve, reject) => {
                if (typeof window.grecaptcha === 'undefined') {
                    reject(new Error('reCAPTCHA not loaded'));
                    return;
                }
                window.grecaptcha.ready(() => {
                    window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'career_form' })
                        .then(resolve)
                        .catch(reject);
                });
            });

            const data = Object.fromEntries(formData.entries());
            data.recaptchaToken = recaptchaToken;

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                if (typeof window.gtag === 'function') {
                    window.gtag('event', 'generate_lead', { method: 'career_form' });
                }
                showToast("Application submitted! We'll review your profile soon.", 'success');
                form.reset();
                setApplicationForm({ position: '', show: false });
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Submission failed');
            }
        } catch (error) {
            showToast('Error submitting application. Please try again.', 'error');
            console.error(error);
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerText = originalButtonText;
            }
        }
    };

    useEffect(() => {
        const allJobs = getJobOpenings();
        let displayJobs = allJobs.filter((j) => j.status === 'open');

        if (allJobs.length === 0) {
            displayJobs = [
                {
                    id: 'wordpress-developer',
                    title: 'WordPress Developer',
                    type: 'Freelance / Contract',
                    responsibilities: [
                        'Build custom WordPress websites, themes, and plugins',
                        'Optimize website speed, SEO structure, and security',
                        'Work with ACF, Elementor, Divi, WPBakery, or custom builders',
                        'Handle migrations, bug fixes, and WordPress updates',
                        'Collaborate with designers and backend developers',
                    ],
                    requirements: [
                        '2+ years of WordPress development experience',
                        'Strong PHP & MySQL fundamentals',
                        'Experience with APIs, WooCommerce, and custom post types',
                        'Clear communication & ability to meet deadlines',
                        'Portfolio of previous WordPress projects',
                    ],
                    status: 'open',
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
                        'Write reusable components and modular architecture',
                    ],
                    requirements: [
                        '2+ years of experience with React.js',
                        'Strong JavaScript, HTML, CSS',
                        'Experience with Redux, hooks, REST APIs',
                        'Familiarity with Git, Figma, and agile workflows',
                        'Strong problem-solving skills',
                    ],
                    status: 'open',
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
                        'Collaborate with frontend and backend teams',
                    ],
                    requirements: [
                        '2+ years of experience with Core PHP or PHP frameworks',
                        'Strong knowledge of MySQL',
                        'Familiar with MVC architecture',
                        'Experience with Laravel or CodeIgniter is a plus',
                        'Ability to write clean, secure, optimized code',
                    ],
                    status: 'open',
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
                        'Provide solutions for automation, prediction, analytics',
                    ],
                    requirements: [
                        'Strong understanding of Python & machine learning',
                        'Experience with AI APIs and frameworks (TensorFlow, PyTorch)',
                        'Ability to build prototypes quickly',
                        'Knowledge of prompt engineering & automation',
                        'Portfolio or sample AI projects preferred',
                    ],
                    status: 'open',
                },
            ];
        }

        setJobs(displayJobs);
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <PageHeader />
            <Benefits />

            {/* OPEN POSITIONS */}
            <section className="py-14 md:py-16 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <FadeIn>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
                            <div className="max-w-2xl">
                                <Eyebrow>Open roles</Eyebrow>
                                <h2 className="text-2xl md:text-3xl font-bold text-brand-dark tracking-[-0.02em] leading-[1.2]">
                                    {jobs.length > 0 ? "We're hiring." : "No open roles right now."}
                                </h2>
                                <p className="mt-4 text-base text-gray-500 leading-relaxed">
                                    {jobs.length > 0
                                        ? 'Every application is reviewed within 5 business days.'
                                        : 'Send us a general application and we will reach out as new roles open.'}
                                </p>
                            </div>
                            {jobs.length > 0 && (
                                <span className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3.5 py-1.5 text-sm font-medium text-brand-dark whitespace-nowrap flex-shrink-0">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    {jobs.length} {jobs.length === 1 ? 'role' : 'roles'} available
                                </span>
                            )}
                        </div>
                    </FadeIn>

                    <div className="space-y-4">
                        {jobs.map((job, i) => (
                            <FadeIn key={job.id} delay={Math.min(i * 50, 300)}>
                                <JobCard job={job} onApply={handleApply} />
                            </FadeIn>
                        ))}
                    </div>

                    {jobs.length === 0 && (
                        <FadeIn>
                            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
                                <p className="text-gray-500 mb-6">No openings right now — but we're always reviewing applications.</p>
                                <button
                                    onClick={() => handleApply('General Application')}
                                    className="inline-flex items-center justify-center gap-2 bg-brand-dark text-white text-sm font-medium py-2.5 px-5 rounded-full hover:bg-brand-dark-hover transition-colors"
                                >
                                    Send general application
                                </button>
                            </div>
                        </FadeIn>
                    )}
                </div>
            </section>

            {/* APPLICATION FORM */}
            <div
                id="application-form"
                className={`transition-all duration-500 ${applicationForm.show ? 'opacity-100' : 'opacity-0 pointer-events-none h-0 overflow-hidden'}`}
            >
                {applicationForm.show && (
                    <section className="py-16 md:py-20 bg-white">
                        <div className="container mx-auto px-6 max-w-3xl">
                            <FadeIn>
                                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                                    <div className="border-b border-gray-100 p-7 md:p-8 bg-brand-light/30">
                                        <Eyebrow>Application</Eyebrow>
                                        <h3 className="text-2xl md:text-3xl font-bold text-brand-dark tracking-tight">
                                            Apply for <span className="text-brand-orange">{applicationForm.position}</span>
                                        </h3>
                                        <p className="text-gray-500 mt-1.5 text-sm">Fill out the form below. We respond within 5 business days.</p>
                                    </div>

                                    <div className="p-7 md:p-10">
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <input type="hidden" name="_subject" value={`New Application: ${applicationForm.position}`} />
                                            <input type="hidden" name="_captcha" value="false" />
                                            <input type="text" name="_gotcha" aria-hidden="true" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', opacity: 0 }} />
                                            <input type="hidden" name="position" value={applicationForm.position} />

                                            <div className="grid md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-medium text-brand-dark mb-1.5">Full name<span className="text-brand-orange ml-0.5">*</span></label>
                                                    <input type="text" name="name" required className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-colors text-sm placeholder:text-gray-400" placeholder="Jane Doe" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-brand-dark mb-1.5">Email<span className="text-brand-orange ml-0.5">*</span></label>
                                                    <input type="email" name="email" required className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-colors text-sm placeholder:text-gray-400" placeholder="jane@example.com" />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-medium text-brand-dark mb-1.5">Phone</label>
                                                    <input type="tel" name="phone" className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-colors text-sm placeholder:text-gray-400" placeholder="+1 (555) 000-0000" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-brand-dark mb-1.5">LinkedIn</label>
                                                    <input type="url" name="linkedin" className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-colors text-sm placeholder:text-gray-400" placeholder="https://linkedin.com/in/…" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-brand-dark mb-1.5">Portfolio / GitHub</label>
                                                <input type="url" name="portfolio" className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-colors text-sm placeholder:text-gray-400" placeholder="https://github.com/…" />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-brand-dark mb-1.5">Resume (PDF, DOC)</label>
                                                <input
                                                    type="file"
                                                    name="attachment"
                                                    accept=".pdf,.doc,.docx"
                                                    required
                                                    className="w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-light file:text-brand-dark hover:file:bg-gray-100 p-2 border border-gray-300 rounded-lg bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-brand-dark mb-1.5">Cover letter<span className="text-brand-orange ml-0.5">*</span></label>
                                                <textarea name="message" rows={5} required className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-colors text-sm placeholder:text-gray-400" placeholder="Tell us what makes you unique…" />
                                            </div>

                                            <div className="flex items-center justify-end gap-3 pt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setApplicationForm({ position: '', show: false })}
                                                    className="px-5 py-2.5 font-semibold text-gray-600 hover:text-brand-dark transition-colors text-sm"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="group inline-flex items-center justify-center gap-2 bg-brand-orange text-white text-sm font-medium py-2.5 pl-6 pr-2.5 rounded-full hover:bg-brand-orange-hover transition-colors"
                                                >
                                                    Submit application
                                                    <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform text-brand-orange">
                                                        <Icon.Arrow />
                                                    </span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default CareersPage;
