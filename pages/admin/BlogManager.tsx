import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../types';
import {
    getBlogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost
} from '../../utils/blogStorage';
import { uploadToCloudinary } from '../../utils/cloudinary';

const BlogManager: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState<Partial<BlogPost>>({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        category: '',
        author: 'Stallioni Team',
        readTime: 5
    });

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = () => {
        setPosts(getBlogPosts());
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingPost) {
            updateBlogPost(editingPost.id, formData);
        } else {
            addBlogPost(formData as Omit<BlogPost, 'id'>);
        }

        resetForm();
        loadPosts();
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setFormData(post);
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            deleteBlogPost(id);
            loadPosts();
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            image: '',
            category: '',
            author: 'Stallioni Team',
            readTime: 5
        });
        setEditingPost(null);
        setShowForm(false);
        setIsUploading(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            setFormData(prev => ({ ...prev, image: url }));
        } catch (error) {
            alert('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-brand-dark mb-2">Blog Manager</h2>
                    <p className="text-slate-600">Create and manage blog posts</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-brand-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center gap-2"
                >
                    <span className="text-xl">+</span>
                    New Post
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
                        <h3 className="text-2xl font-bold text-brand-dark mb-6">
                            {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
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
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Excerpt *</label>
                                <textarea
                                    required
                                    rows={2}
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Content *</label>
                                <textarea
                                    required
                                    rows={10}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Write your blog content here..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange font-mono text-sm"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
                                    <select
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                    >
                                        <option value="">Select category</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Business">Business</option>
                                        <option value="Development">Development</option>
                                        <option value="Design">Design</option>
                                        <option value="Marketing">Marketing</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Read Time (minutes)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.readTime}
                                        onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Featured Image *</label>
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <input
                                            type="url"
                                            required
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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
                                {formData.image && (
                                    <img src={formData.image} alt="Preview" className="mt-3 h-40 object-cover rounded-lg border border-slate-200" />
                                )}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-brand-orange text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                                >
                                    {editingPost ? 'Update Post' : 'Publish Post'}
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

            {posts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <p className="text-slate-600 text-lg">No blog posts yet. Create your first one!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-xl shadow-md p-6 flex gap-6">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-48 h-32 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-brand-dark mb-1">{post.title}</h3>
                                        <div className="flex items-center gap-3 text-sm text-slate-500">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                                                {post.category}
                                            </span>
                                            <span>{post.author}</span>
                                            <span>{post.readTime} min read</span>
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(post)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold"
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

export default BlogManager;
