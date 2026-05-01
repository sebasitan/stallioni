import React, { useState, useEffect } from 'react';
import {
    JobOpening,
    getJobOpenings,
    addJobOpening,
    updateJobOpening,
    deleteJobOpening,
    toggleJobStatus
} from '../../utils/careersStorage';

const CareersManager: React.FC = () => {
    const [jobs, setJobs] = useState<JobOpening[]>([]);
    const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState<Partial<JobOpening>>({
        title: '',
        type: 'Freelance / Contract',
        responsibilities: [''],
        requirements: [''],
        status: 'open'
    });

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = () => {
        setJobs(getJobOpenings());
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Filter out empty items
        const cleanedFormData = {
            ...formData,
            responsibilities: formData.responsibilities?.filter(r => r.trim()),
            requirements: formData.requirements?.filter(r => r.trim())
        };

        if (editingJob) {
            updateJobOpening(editingJob.id, cleanedFormData);
        } else {
            addJobOpening(cleanedFormData as Omit<JobOpening, 'id'>);
        }

        resetForm();
        loadJobs();
    };

    const handleEdit = (job: JobOpening) => {
        setEditingJob(job);
        setFormData(job);
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this job opening?')) {
            deleteJobOpening(id);
            loadJobs();
        }
    };

    const handleToggleStatus = (id: string) => {
        toggleJobStatus(id);
        loadJobs();
    };

    const resetForm = () => {
        setFormData({
            title: '',
            type: 'Freelance / Contract',
            responsibilities: [''],
            requirements: [''],
            status: 'open'
        });
        setEditingJob(null);
        setShowForm(false);
    };

    const addListItem = (field: 'responsibilities' | 'requirements') => {
        setFormData(prev => ({
            ...prev,
            [field]: [...(prev[field] || []), '']
        }));
    };

    const updateListItem = (field: 'responsibilities' | 'requirements', index: number, value: string) => {
        const newList = [...(formData[field] || [])];
        newList[index] = value;
        setFormData({ ...formData, [field]: newList });
    };

    const removeListItem = (field: 'responsibilities' | 'requirements', index: number) => {
        const newList = (formData[field] || []).filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: newList });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-brand-dark mb-2">Careers Manager</h2>
                    <p className="text-slate-600">Manage job openings</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-brand-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center gap-2"
                >
                    <span className="text-xl">+</span>
                    Post New Job
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
                        <h3 className="text-2xl font-bold text-brand-dark mb-6">
                            {editingJob ? 'Edit Job Opening' : 'Post New Job Opening'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g., React Developer"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Employment Type *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    placeholder="Freelance / Contract"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                />
                            </div>

                            {/* Responsibilities */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Responsibilities *</label>
                                {formData.responsibilities?.map((resp, idx) => (
                                    <div key={idx} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={resp}
                                            onChange={(e) => updateListItem('responsibilities', idx, e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                            placeholder="Enter responsibility"
                                        />
                                        {idx > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeListItem('responsibilities', idx)}
                                                className="px-3 text-red-600 hover:text-red-800"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addListItem('responsibilities')}
                                    className="text-brand-orange text-sm font-semibold hover:underline"
                                >
                                    + Add Responsibility
                                </button>
                            </div>

                            {/* Requirements */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Requirements *</label>
                                {formData.requirements?.map((req, idx) => (
                                    <div key={idx} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={req}
                                            onChange={(e) => updateListItem('requirements', idx, e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                            placeholder="Enter requirement"
                                        />
                                        {idx > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeListItem('requirements', idx)}
                                                className="px-3 text-red-600 hover:text-red-800"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addListItem('requirements')}
                                    className="text-brand-orange text-sm font-semibold hover:underline"
                                >
                                    + Add Requirement
                                </button>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-brand-orange text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                                >
                                    {editingJob ? 'Update Job' : 'Post Job'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 bg-gray-200 text-slate-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {jobs.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <p className="text-slate-600 text-lg">No job openings yet. Post your first one!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-1">{job.title}</h3>
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                                            {job.type}
                                        </span>
                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${job.status === 'open'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {job.status === 'open' ? '🟢 Open' : '⚫ Closed'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-4">
                                <div>
                                    <h4 className="font-semibold text-brand-dark mb-2">Responsibilities:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-slate-600 text-sm">
                                        {job.responsibilities.slice(0, 3).map((resp, idx) => (
                                            <li key={idx}>{resp}</li>
                                        ))}
                                        {job.responsibilities.length > 3 && (
                                            <li>+{job.responsibilities.length - 3} more...</li>
                                        )}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-brand-dark mb-2">Requirements:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-slate-600 text-sm">
                                        {job.requirements.slice(0, 3).map((req, idx) => (
                                            <li key={idx}>{req}</li>
                                        ))}
                                        {job.requirements.length > 3 && (
                                            <li>+{job.requirements.length - 3} more...</li>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(job)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleToggleStatus(job.id)}
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm font-semibold"
                                >
                                    {job.status === 'open' ? 'Close' : 'Open'}
                                </button>
                                <button
                                    onClick={() => handleDelete(job.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CareersManager;
