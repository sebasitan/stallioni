import React from 'react';
import { useNavigation } from '../App';

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-brand-orange text-xs font-semibold tracking-[0.2em] uppercase mb-4">{children}</p>
);

const PrivacyPolicy: React.FC = () => {
    const { navigate } = useNavigation();

    return (
        <div className="min-h-screen bg-white">
            {/* HERO */}
            <section className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-6 max-w-7xl py-16 md:py-20">
                    <div className="max-w-3xl">
                        <Eyebrow>Legal</Eyebrow>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-[1.1] tracking-tight mb-4">
                            Privacy policy.
                        </h1>
                        <p className="text-lg text-gray-600">
                            How Stallioni handles and protects your data.
                        </p>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="article-content">
                        <p className="text-sm text-gray-500 mb-8">Last updated: May 1, 2026</p>

                        <h2>1. Introduction</h2>
                        <p>
                            Stallioni ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website (stallioni.com) and use our services.
                        </p>

                        <h2>2. Information we collect</h2>
                        <p>We collect information that you provide directly to us, including:</p>
                        <ul>
                            <li><strong>Contact information:</strong> Name, work email, phone number, and company name when you fill out our contact or quote forms.</li>
                            <li><strong>Professional information:</strong> Resume, LinkedIn profile, and portfolio links when you apply for a career opportunity.</li>
                            <li><strong>Communication data:</strong> Content of your messages sent via our chatbot or email.</li>
                        </ul>

                        <h2>3. How we use your information</h2>
                        <p>We use the collected data for the following purposes:</p>
                        <ul>
                            <li>To respond to your inquiries and provide project estimates.</li>
                            <li>To process job applications and contact potential candidates.</li>
                            <li>To send newsletter updates (only if you have explicitly subscribed).</li>
                            <li>To improve our website performance and user experience.</li>
                        </ul>

                        <h2>4. Data security</h2>
                        <p>
                            We implement industry-standard security measures to protect your data. All form submissions are protected by reCAPTCHA v3 to prevent spam and unauthorized access. We do not sell or share your personal data with third-party marketers.
                        </p>

                        <h2>5. Third-party services</h2>
                        <p>
                            Our website uses Google Analytics to track visitor behavior and Google reCAPTCHA for security. These services may collect information in accordance with their own privacy policies.
                        </p>

                        <h2>6. Your rights</h2>
                        <p>
                            You have the right to access, correct, or request the deletion of your personal information. To exercise these rights, please contact us at <strong>contact@stallioni.com</strong>.
                        </p>

                        <h2>7. Changes to this policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <button
                            onClick={() => navigate('/')}
                            className="text-brand-orange font-semibold hover:text-brand-orange-hover inline-flex items-center gap-1"
                        >
                            ← Return to home
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
