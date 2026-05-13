import React from 'react';
import { useNavigation } from '../App';

const PrivacyPolicy: React.FC = () => {
    const { navigate } = useNavigation();

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-brand-dark py-20 px-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Privacy Policy</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        How Stallioni handles and protects your data.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="prose prose-lg prose-slate max-w-none">
                        <p className="text-slate-600 mb-8">
                            Last Updated: May 1, 2026
                        </p>

                        <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">1. Introduction</h2>
                        <p className="text-slate-700 mb-6">
                            Stallioni ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website (stallioni.com) and use our services.
                        </p>

                        <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">2. Information We Collect</h2>
                        <p className="text-slate-700 mb-4">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc pl-6 text-slate-700 mb-6">
                            <li><strong>Contact Information:</strong> Name, work email, phone number, and company name when you fill out our contact or quote forms.</li>
                            <li><strong>Professional Information:</strong> Resume, LinkedIn profile, and portfolio links when you apply for a career opportunity.</li>
                            <li><strong>Communication Data:</strong> Content of your messages sent via our chatbot or email.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">3. How We Use Your Information</h2>
                        <p className="text-slate-700 mb-4">
                            We use the collected data for the following purposes:
                        </p>
                        <ul className="list-disc pl-6 text-slate-700 mb-6">
                            <li>To respond to your inquiries and provide project estimates.</li>
                            <li>To process job applications and contact potential candidates.</li>
                            <li>To send newsletter updates (only if you have explicitly subscribed).</li>
                            <li>To improve our website performance and user experience.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">4. Data Security</h2>
                        <p className="text-slate-700 mb-6">
                            We implement industry-standard security measures to protect your data. All form submissions are protected by reCAPTCHA v3 to prevent spam and unauthorized access. We do not sell or share your personal data with third-party marketers.
                        </p>

                        <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">5. Third-Party Services</h2>
                        <p className="text-slate-700 mb-6">
                            Our website uses Google Analytics to track visitor behavior and Google reCAPTCHA for security. These services may collect information in accordance with their own privacy policies.
                        </p>

                        <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">6. Your Rights</h2>
                        <p className="text-slate-700 mb-6">
                            You have the right to access, correct, or request the deletion of your personal information. To exercise these rights, please contact us at <strong>contact@stallioni.com</strong>.
                        </p>

                        <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">7. Changes to This Policy</h2>
                        <p className="text-slate-700 mb-6">
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.
                        </p>
                    </div>

                    <div className="mt-12 pt-12 border-t border-slate-200 text-center">
                        <button 
                            onClick={() => navigate('/')}
                            className="text-brand-orange font-bold hover:underline"
                        >
                            Return to Home
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
