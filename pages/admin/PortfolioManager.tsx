import React, { useState, useEffect } from 'react';
import { PortfolioItem } from '../../types';
import {
    getPortfolioItems,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem
} from '../../utils/portfolioStorage';
import { uploadToCloudinary } from '../../utils/cloudinary';

const PortfolioManager: React.FC = () => {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // Form state
    const [formData, setFormData] = useState<Partial<PortfolioItem>>({
        title: '',
        category: '',
        description: '',
        imageUrl: '',
        technologies: [],
        link: ''
    });

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = () => {
        setItems(getPortfolioItems());
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingItem) {
            updatePortfolioItem(editingItem.id, formData);
        } else {
            addPortfolioItem(formData as Omit<PortfolioItem, 'id'>);
        }

        resetForm();
        loadItems();
    };

    const handleEdit = (item: PortfolioItem) => {
        setEditingItem(item);
        setFormData(item);
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this portfolio item?')) {
            deletePortfolioItem(id);
            loadItems();
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            category: '',
            description: '',
            imageUrl: '',
            technologies: [],
            link: ''
        });
        setEditingItem(null);
        setShowForm(false);
        setIsUploading(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            setFormData(prev => ({ ...prev, imageUrl: url }));
        } catch (error) {
            alert('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-brand-dark mb-2">Portfolio Manager</h2>
                    <p className="text-slate-600">Manage your portfolio items</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-brand-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center gap-2"
                >
                    <span className="text-xl">+</span>
                    Add New Item
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search portfolio items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                        <h3 className="text-2xl font-bold text-brand-dark mb-6">
                            {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                >
                                    <option value="">Select category</option>
                                    <option value="web">Web Development</option>
                                    <option value="mobile">Mobile App</option>
                                    <option value="ecommerce">E-commerce</option>
                                    <option value="design">Design</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Image *</label>
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <input
                                            type="url"
                                            required
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                            placeholder="Enter image URL or upload..."
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-slate-500">Or upload:</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={isUploading}
                                            className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-orange/10 file:text-brand-orange hover:file:bg-brand-orange/20"
                                        />
                                        {isUploading && <span className="text-sm text-brand-orange animate-pulse">Uploading...</span>}
                                    </div>
                                </div>
                                {formData.imageUrl && (
                                    <img src={formData.imageUrl} alt="Preview" className="mt-3 h-32 object-cover rounded-lg border border-slate-200" />
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Technologies (comma-separated)</label>
                                <input
                                    type="text"
                                    value={formData.technologies?.join(', ')}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                                    })}
                                    placeholder="React, Node.js, MongoDB"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Project Link</label>
                                <input
                                    type="url"
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    placeholder="https://project-url.com"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-brand-orange text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                                >
                                    {editingItem ? 'Update Item' : 'Add Item'}
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

            {/* Items Grid */}
            {filteredItems.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <p className="text-slate-600 text-lg">No portfolio items found. Add your first one!</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-bold text-brand-dark">{item.title}</h3>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                                        {item.category}
                                    </span>
                                </div>
                                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                                {item.technologies && item.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {item.technologies.slice(0, 3).map((tech, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-gray-100 text-slate-700 text-xs rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PortfolioManager;
