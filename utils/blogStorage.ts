import { BlogPost } from '../types';
import { BLOG_POSTS } from '../constants';

const STORAGE_KEY = 'stallioni_blog_v2';

// Get all blog posts
export function getBlogPosts(): BlogPost[] {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            // Seed with initial data if empty
            // We need to ensure we don't save just the reference, but a copy
            const initialPosts = [...BLOG_POSTS];
            // Format IDs to be consistent if needed, but constants have numeric 1. 
            // Admin adds string IDs 'blog-timestamp'.
            // Let's coerce IDs to strings to be safe for future edits
            const formattedInitial = initialPosts.map(p => ({ ...p, id: p.id.toString() }));

            saveBlogPosts(formattedInitial);
            return formattedInitial;
        }
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading blog posts:', error);
        return [];
    }
}

// Save blog posts
export function saveBlogPosts(posts: BlogPost[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
        console.error('Error saving blog posts:', error);
        throw error;
    }
}

// Add new blog post
export function addBlogPost(post: Omit<BlogPost, 'id'>): BlogPost {
    const posts = getBlogPosts();
    const newPost: BlogPost = {
        ...post,
        id: `blog-${Date.now()}`,
        date: post.date || new Date().toISOString().split('T')[0]
    };
    posts.unshift(newPost); // Add to beginning
    saveBlogPosts(posts);
    return newPost;
}

// Update blog post
export function updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const posts = getBlogPosts();
    const index = posts.findIndex(post => post.id === id);

    if (index === -1) return null;

    posts[index] = { ...posts[index], ...updates };
    saveBlogPosts(posts);
    return posts[index];
}

// Delete blog post
export function deleteBlogPost(id: string): boolean {
    const posts = getBlogPosts();
    const filtered = posts.filter(post => post.id !== id);

    if (filtered.length === posts.length) return false;

    saveBlogPosts(filtered);
    return true;
}

// Get single blog post
export function getBlogPost(id: string): BlogPost | null {
    const posts = getBlogPosts();
    return posts.find(post => post.id === id) || null;
}
