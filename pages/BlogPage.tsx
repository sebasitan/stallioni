
import React, { useState, useMemo, useEffect } from 'react';
import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';
import FadeIn from '../components/FadeIn';
import { useNavigation } from '../App';
import { getBlogPosts } from '../utils/blogStorage';

const PageHeader: React.FC = () => (
    <div className="bg-white py-16 text-center border-b border-slate-200">
        <div className="container mx-auto px-6">
            <FadeIn>
                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight">From the Blog</h1>
                <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">Expert insights on technology, design, and digital strategy to help you stay ahead of the curve.</p>
            </FadeIn>
        </div>
    </div>
);

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
    const { navigate } = useNavigation();
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate(`/blog/${post.id}`);
    };

    return (
        <a href={`/blog/${post.id}`} onClick={handleNav} className="block group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 border border-slate-100 h-full flex flex-col">
            <div className="overflow-hidden h-48">
                <img src={post.imageUrl} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-bold uppercase tracking-wider bg-brand-orange/10 text-brand-orange px-3 py-1 rounded-full">{post.category}</span>
                <h3 className="text-xl font-bold text-brand-dark mt-4 mb-3 group-hover:text-brand-orange transition-colors line-clamp-3 flex-grow">{post.title}</h3>
                <div className="mt-auto pt-4 border-t border-slate-100 text-sm text-slate-500">
                    <p className="font-semibold text-slate-700">{post.author}</p>
                    <p>{post.date} &middot; {post.readTime}</p>
                </div>
            </div>
        </a>
    );
};

const FeaturedPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
    const { navigate } = useNavigation();
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate(`/blog/${post.id}`);
    };

    return (
        <FadeIn>
            <a href={`/blog/${post.id}`} onClick={handleNav} className="block group relative rounded-2xl overflow-hidden shadow-2xl text-white w-full min-h-[500px] my-12 flex flex-col justify-end">
                <img src={post.imageUrl} alt={post.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative p-8 md:p-12 max-w-4xl">
                    <span className="text-sm font-semibold bg-brand-orange px-3 py-1.5 rounded-full">Featured Article</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4 leading-tight tracking-tight">{post.title}</h2>
                    <p className="hidden md:block text-slate-200 line-clamp-2 text-lg mb-6">{post.excerpt}</p>
                    <div className="text-md font-semibold">
                        <span>By {post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                    </div>
                </div>
            </a>
        </FadeIn>
    );
};

const BlogPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [allPosts, setAllPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        // combine static posts with dynamic posts from local storage
        const dynamicPosts = getBlogPosts();
        // Avoid duplicates if IDs clash, though dynamic IDs are timestamp based
        // Priority to dynamic posts
        const combined = [...dynamicPosts, ...BLOG_POSTS];

        // Remove duplicates by ID just in case
        const uniquePosts = Array.from(new Map(combined.map(item => [item.id, item])).values());

        setAllPosts(uniquePosts);
    }, []);

    const categories = useMemo(() => ['All', ...Array.from(new Set(allPosts.map(p => p.category)))], [allPosts]);

    const filteredPosts = useMemo(() => {
        // Sort posts by ID descending (assuming numeric/timestamp IDs) to get latest first
        const sortedPosts = [...allPosts].sort((a, b) => {
            // Handle numeric IDs vs String IDs
            const idA = Number(a.id) || 0;
            const idB = Number(b.id) || 0;

            // If string IDs like 'blog-123'
            if (typeof a.id === 'string' && a.id.startsWith('blog-')) {
                const timeA = parseInt(a.id.split('-')[1]);
                const timeB = typeof b.id === 'string' && b.id.startsWith('blog-') ? parseInt(b.id.split('-')[1]) : 0;
                return timeB - timeA;
            }

            return idB - idA;
        });

        return sortedPosts
            .filter(post => filterCategory === 'All' || post.category === filterCategory)
            .filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [searchTerm, filterCategory]);

    const featuredPost = useMemo(() => (filteredPosts.length > 0 ? filteredPosts[0] : null), [filteredPosts]);
    const otherPosts = useMemo(() => (filteredPosts.length > 1 ? filteredPosts.slice(1) : []), [filteredPosts]);

    return (
        <>
            <PageHeader />

            <section className="py-16 md:py-20 bg-slate-50/70">
                <div className="container mx-auto px-6 max-w-7xl">
                    <FadeIn>
                        <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200/80 mb-12 flex flex-col md:flex-row items-center gap-4">
                            <div className="flex-grow flex items-center gap-2 overflow-x-auto no-scrollbar">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilterCategory(cat)}
                                        className={`px-4 py-2 text-sm rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${filterCategory === cat ? 'bg-brand-dark text-white shadow-sm' : 'bg-transparent text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <div className="relative w-full md:w-auto">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="border border-slate-300 rounded-lg py-2 pl-10 pr-4 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all"
                                />
                                <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                        </div>
                    </FadeIn>

                    {featuredPost && <FeaturedPostCard post={featuredPost} />}

                    {otherPosts.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherPosts.map((post, index) => (
                                <FadeIn key={post.id} delay={index * 100}>
                                    <BlogCard post={post} />
                                </FadeIn>
                            ))}
                        </div>
                    )}

                    {filteredPosts.length === 0 && (
                        <FadeIn>
                            <div className="text-center py-24 bg-white rounded-lg shadow-md border border-slate-200/80">
                                <h3 className="text-2xl font-bold text-brand-dark">No Articles Found</h3>
                                <p className="text-slate-500 mt-2">Try adjusting your search or filter to find what you're looking for.</p>
                            </div>
                        </FadeIn>
                    )}
                </div>
            </section>
        </>
    );
};

export default BlogPage;
