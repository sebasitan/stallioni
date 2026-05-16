import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));

        const success = login(username, password);

        if (success) {
            navigate('/seba');
        } else {
            setError('Invalid username or password');
            setPassword('');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-brand-light flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <img src="/logo.svg" alt="Stallioni Logo" className="h-8 w-auto mx-auto mb-6" />
                    <h1 className="text-2xl font-bold text-brand-dark tracking-tight">Admin dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1.5">Stallioni Net Solutions</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-7">
                    <h2 className="text-lg font-semibold text-brand-dark mb-5">Sign in</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-brand-dark mb-1.5">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors text-sm placeholder:text-gray-400"
                                placeholder="Enter username"
                                autoComplete="username"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-brand-dark mb-1.5">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors text-sm placeholder:text-gray-400"
                                placeholder="Enter password"
                                autoComplete="current-password"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-orange text-white font-semibold py-2.5 px-5 rounded-md hover:bg-brand-orange-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Signing in…
                                </span>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>

                    <p className="mt-5 text-center text-xs text-gray-500">
                        Authorized personnel only.
                    </p>
                </div>

                <div className="mt-6 text-center">
                    <a
                        href="/"
                        className="text-gray-500 hover:text-brand-orange transition-colors inline-flex items-center gap-1.5 text-sm font-medium"
                    >
                        ← Back to home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
