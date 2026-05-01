import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { BlogPost } from '../types';
import { getBlogPost } from '../utils/blogStorage';
import MetaManager from '../components/MetaManager';
import { getBlogPostMetadata } from '../seo';
import { useNavigation, useModal } from '../App';
import FadeIn from '../components/FadeIn';
import Breadcrumbs from '../components/Breadcrumbs';

const BackArrowIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>);
const TwitterIcon = () => (<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.176-1.336.213-2.033.188.606 1.922 2.36 3.227 4.444 3.264-1.717 1.33-3.837 2.053-6.075 1.729 1.816 1.167 3.973 1.84 6.262 1.84 7.234 0 11.189-5.792 10.9-10.963.757-.549 1.408-1.238 1.92-2.001z" /></svg>);
const LinkedInIcon = () => (<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>);
const FacebookIcon = () => (<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>);
const WhatsAppIcon = () => (<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>);
const RedditIcon = () => (<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0z M12,21.6c-5.304,0-9.6-4.296-9.6-9.6S6.696,2.4,12,2.4s9.6,4.296,9.6,9.6S17.304,21.6,12,21.6z M16.8,11.04c0-0.66-0.54-1.2-1.2-1.2s-1.2,0.54-1.2,1.2s0.54,1.2,1.2,1.2S16.8,11.7,16.8,11.04z M7.2,11.04c0-0.66,0.54-1.2,1.2-1.2s1.2,0.54,1.2,1.2s-0.54,1.2-1.2,1.2S7.2,11.7,7.2,11.04z M17.4,14.4c-0.24-0.24-0.6-0.24-0.84,0l-1.2,1.2c-1.56,1.08-3.48,1.08-5.04,0l-1.2-1.2c-0.24-0.24-0.6-0.24-0.84,0s-0.24,0.6,0,0.84l1.2,1.2c0.36,0.24,0.72,0.36,1.08,0.48c0.84,0.24,1.8,0.36,2.76,0.36c0.96,0,1.92-0.12,2.76-0.36c0.36-0.12,0.72-0.24,1.08-0.48l1.2-1.2C17.64,15,17.64,14.64,17.4,14.4z" /></svg>);
const EmailIcon = () => (<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>);


const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Use getBlogPost from storage to find both static and dynamic posts
  // The route parameter ID could be 'blog-timestamp' or '1'
  const post = id ? getBlogPost(id) || getBlogPost(Number(id).toString()) : null;
  const { navigate } = useNavigation();
  const { openModal } = useModal();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const links = contentRef.current.querySelectorAll('a.open-contact-modal');
      const handleClick = (e: Event) => {
        e.preventDefault();
        openModal('Quote');
      };
      links.forEach(link => link.addEventListener('click', handleClick));

      return () => {
        links.forEach(link => link.removeEventListener('click', handleClick));
      };
    }
  }, [post, openModal]);

  const handleBackNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/blog');
  };

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">Post not found</h1>
        <a href="/blog" onClick={handleBackNav} className="text-brand-orange hover:underline mt-4 inline-block">
          Return to Blog
        </a>
      </div>
    );
  }

  const pageUrl = window.location.href;
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const whatsAppShareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
  const redditShareUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
  const emailShareUrl = `mailto:?subject=${encodedTitle}&body=Check%20out%20this%20article:%20${encodedUrl}`;

  const breadcrumbPath = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title }
  ];



  // Generate SEO Metadata
  const seoMetadata = {
    ...getBlogPostMetadata(post),
    ogUrl: window.location.href, // Ensure current URL is used
    // Ensure required properties are present if helper returns partial
    ogType: 'article' as const,
    title: post.metaTitle || `${post.title} | Stallioni Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords || `Stallioni blog, ${post.category}, IT outsourcing`,
    ogTitle: post.metaTitle || post.title,
    ogDescription: post.metaDescription || post.excerpt,
    ogImage: post.imageUrl,
    structuredData: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': post.metaTitle || post.title,
      'image': post.imageUrl,
      'datePublished': post.date,
      'author': { '@type': 'Person', 'name': post.author }
    })
  };

  return (
    <div className="bg-white">
      <MetaManager {...seoMetadata} />
      <article className="py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <div className="text-center mb-12">
              <Breadcrumbs path={breadcrumbPath} theme="light" className="justify-center mb-4" />
              <span className="block text-sm font-bold uppercase tracking-wider bg-brand-orange/10 text-brand-orange px-3 py-1 rounded-full w-fit mx-auto">{post.category}</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mt-4">{post.title}</h1>
              <div className="mt-4 text-md text-slate-500">
                <span>By {post.author}</span>
                <span className="mx-2">&middot;</span>
                <span>{post.date}</span>
                <span className="mx-2">&middot;</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <img src={post.imageUrl} alt={post.title} loading="lazy" className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-2xl mb-12" />
          </FadeIn>

          <FadeIn delay={200}>
            <div ref={contentRef} className="article-content max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
          </FadeIn>

          <FadeIn delay={300}>
            <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6">
              <h3 className="text-lg font-semibold text-brand-dark">Share this article:</h3>
              <div className="flex items-center space-x-4">
                <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-500 transition-colors" aria-label="Share on Twitter"><TwitterIcon /></a>
                <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-700 transition-colors" aria-label="Share on LinkedIn"><LinkedInIcon /></a>
                <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-800 transition-colors" aria-label="Share on Facebook"><FacebookIcon /></a>
                <a href={whatsAppShareUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-green-500 transition-colors" aria-label="Share on WhatsApp"><WhatsAppIcon /></a>
                <a href={redditShareUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-orange-600 transition-colors" aria-label="Share on Reddit"><RedditIcon /></a>
                <a href={emailShareUrl} className="text-slate-500 hover:text-gray-700 transition-colors" aria-label="Share via Email"><EmailIcon /></a>
              </div>
            </div>
          </FadeIn>

        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
