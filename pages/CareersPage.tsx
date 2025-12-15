import React, { useState } from 'react';
import FadeIn from '../components/FadeIn';
import { getContactEmail } from '../constants';
import { useToast } from '../App';
import { uploadToCloudinary } from '../utils/cloudinary';

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
        const originalButtonText = submitButton ? submitButton.innerText : 'Submit Application';

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerText = 'Processing...';
        }

        try {
            // Handle Resume Upload
            const resumeFile = formData.get('attachment') as File;
            if (resumeFile && resumeFile.size > 0) {
                try {
                    submitButton && (submitButton.innerText = 'Uploading Resume...');
                    const resumeUrl = await uploadToCloudinary(resumeFile);
                    formData.set('resume_link', resumeUrl);
                    formData.delete('attachment'); // Don't send file explicitly to formsubmit to save bandwidth/limits
                } catch (uploadError) {
                    console.error('Resume upload failed:', uploadError);
                    showToast('Failed to upload resume. Please check your connection or file size.', 'error');
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.innerText = originalButtonText;
                    }
                    return; // Stop submission
                }
            }

            submitButton && (submitButton.innerText = 'Sending Application...');

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
            console.error(error);
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerText = originalButtonText;
            }
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
        <div className="bg-slate-50 min-h-screen">
            {/* HERRO SECTION */}
            <div className="relative bg-brand-dark text-white pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] bg-brand-orange/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative container mx-auto px-6 max-w-7xl z-10 text-center">
                    <FadeIn>
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-brand-orange text-sm font-bold tracking-wider mb-6">
                            WE ARE HIRING
                        </span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                            Join Our Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-400">Talent Network</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
                            At Stallioni, we don't just build software; we craft digital experiences. We're looking for passionate freelancers and contract developers ready to make an impact on a global scale.
                        </p>
                    </FadeIn>
                </div>
            </div>

            {/* WHY WORK WITH US */}
            <section className="py-20 md:py-32 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                    <FadeIn>
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-6">
                                Why Choose Stallioni?
                            </h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                We believe in empowering our team with the freedom to work from anywhere while tackling challenging, high-impact projects.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: '🌍', title: '100% Remote', desc: 'Work from the comfort of your home or anywhere in the world.' },
                                { icon: '📝', title: 'Flexible Contracts', desc: 'Project-based engagements that fit your schedule and lifestyle.' },
                                { icon: '🚀', title: 'Global Impact', desc: 'Collaborate with clients from the USA, UK, Middle East, and Australia.' },
                                { icon: '💰', title: 'Competitive Pay', desc: 'Transparent, timely payments for your hard work and expertise.' },
                                { icon: '⚡', title: 'Cutting Edge', desc: 'Work with the latest tech stacks and modern development practices.' },
                                { icon: '🌱', title: 'Career Growth', desc: 'Long-term opportunities for consistent, high-performing partners.' }
                            ].map((benefit, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
                                    <div className="text-4xl mb-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-orange transition-colors">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {benefit.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* CURRENT OPEN POSITIONS */}
            <section className="py-20 md:py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-50 to-white"></div>
                <div className="container mx-auto px-6 max-w-7xl relative">
                    <FadeIn>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div className="max-w-2xl">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-4">
                                    Open Positions
                                </h2>
                                <p className="text-lg text-slate-600">
                                    Ready to start your next chapter? Explore our current freelance and contract opportunities.
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <span className="text-sm font-semibold text-brand-orange bg-brand-orange/10 px-4 py-2 rounded-full">
                                    {jobs.length} roles available
                                </span>
                            </div>
                        </div>

                        <div className="grid gap-8">
                            {jobs.map((job, idx) => (
                                <div key={job.id} className="group relative">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-orange to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur-sm"></div>
                                    <div className="relative bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm hover:shadow-lg transition-all duration-300">
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                                    <h3 className="text-2xl md:text-3xl font-bold text-brand-dark">
                                                        {job.title}
                                                    </h3>
                                                    <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                                        {job.type}
                                                    </span>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-8 mt-8">
                                                    <div>
                                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">You Will Do</h4>
                                                        <ul className="space-y-3">
                                                            {job.responsibilities.map((resp, i) => (
                                                                <li key={i} className="flex items-baseline gap-3 text-slate-600">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0"></span>
                                                                    <span>{resp}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">You Should Have</h4>
                                                        <ul className="space-y-3">
                                                            {job.requirements.map((req, i) => (
                                                                <li key={i} className="flex items-baseline gap-3 text-slate-600">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></span>
                                                                    <span>{req}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="lg:mt-2">
                                                <button
                                                    onClick={() => handleApply(job.title)}
                                                    className="w-full lg:w-auto bg-brand-dark text-white font-bold py-4 px-8 rounded-xl hover:bg-brand-orange transition-colors duration-300 shadow-lg whitespace-nowrap"
                                                >
                                                    Apply Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Application Form Section/Modal Area */}
            <div id="application-form" className={`transition-all duration-500 ease-in-out ${applicationForm.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none absolute bottom-0 left-0 w-full'}`}>
                {applicationForm.show && (
                    <section className="py-24 bg-slate-50 border-t border-slate-200">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <FadeIn>
                                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                                    <div className="bg-brand-dark p-10 text-center relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                                        <h3 className="text-3xl font-bold text-white mb-2 relative z-10">
                                            Apply for <span className="text-brand-orange">{applicationForm.position}</span>
                                        </h3>
                                        <p className="text-slate-300 relative z-10">Please fill out the form below to get started.</p>
                                    </div>

                                    <div className="p-10 md:p-14">
                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            <input type="hidden" name="_subject" value={`New Application: ${applicationForm.position}`} />
                                            <input type="hidden" name="_captcha" value="false" />
                                            <input type="text" name="_honey" style={{ display: 'none' }} />
                                            <input type="hidden" name="position" value={applicationForm.position} />

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Full Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all font-medium"
                                                        placeholder="Jane Doe"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all font-medium"
                                                        placeholder="jane@example.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Phone (Optional)</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all font-medium"
                                                        placeholder="+1 (555) 000-0000"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">LinkedIn Profile</label>
                                                    <input
                                                        type="url"
                                                        name="linkedin"
                                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all font-medium"
                                                        placeholder="https://linkedin.com/in/..."
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Portfolio / GitHub</label>
                                                <input
                                                    type="url"
                                                    name="portfolio"
                                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all font-medium"
                                                    placeholder="https://github.com/..."
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Resume (PDF, DOC)</label>
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        name="attachment"
                                                        accept=".pdf,.doc,.docx"
                                                        required
                                                        className="w-full cursor-pointer file:mr-5 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 text-slate-500 font-medium p-2 border border-slate-200 rounded-xl bg-slate-50 decoration-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Cover Letter</label>
                                                <textarea
                                                    name="message"
                                                    rows={5}
                                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all font-medium"
                                                    placeholder="Tell us what makes you unique..."
                                                ></textarea>
                                            </div>

                                            <div className="flex items-center justify-end gap-6 pt-6">
                                                <button
                                                    type="button"
                                                    onClick={() => setApplicationForm({ position: '', show: false })}
                                                    className="px-6 py-3 font-bold text-slate-500 hover:text-slate-800 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-10 py-4 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:shadow-brand-orange/40 hover:-translate-y-1 transition-all duration-300"
                                                >
                                                    Submit Application
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

            {/* GENERAL CTA SECTION */}
            {!applicationForm.show && (
                <section className="bg-brand-dark text-white py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
                    <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-brand-orange text-sm font-bold mb-8">
                            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                            Always Scouting Talent
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                            Don't see the right fit?
                        </h2>
                        <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                            We are constantly growing. Send us your general application and we'll keep you in mind for future opportunities.
                        </p>
                        <button
                            onClick={() => {
                                setApplicationForm({ position: 'General Application', show: true });
                                setTimeout(() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
                            }}
                            className="bg-white text-brand-dark font-bold py-4 px-10 rounded-full hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-2xl hover:shadow-brand-orange/50 text-lg"
                        >
                            Submit General Application
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
};

export default CareersPage;
