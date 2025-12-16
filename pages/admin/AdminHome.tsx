import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome: React.FC = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Portfolio Items', value: '12', icon: '💼', color: 'bg-blue-500', path: '/seba/portfolio' },
        { label: 'Blog Posts', value: '8', icon: '📝', color: 'bg-green-500', path: '/seba/blog' },
        { label: 'Job Openings', value: '4', icon: '👥', color: 'bg-purple-500', path: '/seba/careers' },
    ];

    const quickActions = [
        { label: 'Add Portfolio Item', icon: '➕', path: '/seba/portfolio', color: 'bg-blue-600' },
        { label: 'Write Blog Post', icon: '✍️', path: '/seba/blog', color: 'bg-green-600' },
        { label: 'Post Job Opening', icon: '📢', path: '/seba/careers', color: 'bg-purple-600' },
    ];

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-brand-dark mb-2">Dashboard Overview</h2>
                <p className="text-slate-600">Welcome to your admin dashboard. Manage your website content from here.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <button
                        key={idx}
                        onClick={() => navigate(stat.path)}
                        className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer text-left"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                                {stat.icon}
                            </div>
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-brand-dark mb-1">{stat.value}</h3>
                        <p className="text-slate-600">{stat.label}</p>
                    </button>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-brand-dark mb-4">Quick Actions</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {quickActions.map((action, idx) => (
                        <button
                            key={idx}
                            onClick={() => navigate(action.path)}
                            className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-3`}
                        >
                            <span className="text-2xl">{action.icon}</span>
                            <span className="font-semibold">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-brand-dark mb-4">Getting Started</h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                        <span className="text-brand-orange mt-1">✓</span>
                        <span className="text-slate-700">Navigate using the sidebar menu to manage different sections</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-brand-orange mt-1">✓</span>
                        <span className="text-slate-700">Upload images to Cloudinary for optimal performance</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-brand-orange mt-1">✓</span>
                        <span className="text-slate-700">All changes are saved automatically to localStorage</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminHome;
