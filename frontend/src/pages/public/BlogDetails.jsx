import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { api } from '../../services/api';
import { Calendar, User, Tag, ChevronLeft, ArrowLeft, RefreshCw, AlertCircle, Bolt } from 'lucide-react';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const data = await api.getBlogBySlug(slug);
        setBlog(data);
        
        try {
          const blogsList = await api.getBlogs();
          const filtered = blogsList.filter(b => b.slug !== slug).slice(0, 3);
          setRecentBlogs(filtered);
        } catch (recentErr) {
          console.error('Error fetching recent blogs:', recentErr);
        }
      } catch (err) {
        console.error('Error fetching blog details:', err);
        setError('We could not find the requested blog article. It may have been archived or deleted.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#f4f7fc] min-h-screen pt-28 pb-16 relative overflow-hidden flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 relative z-10">
          <RefreshCw className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin text-primary" />
          <span className="font-montserrat text-xs font-bold text-gray-500">Loading Article...</span>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bg-[#f4f7fc] min-h-screen pt-28 pb-16 relative overflow-hidden flex items-center justify-center px-6">
        <div className="glass-panel rounded-3xl p-8 max-w-md shadow-xl border border-white/50 bg-white/40 text-center flex flex-col items-center gap-6 relative z-10">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/25">
            <AlertCircle className="text-red-500" size={24} />
          </div>
          <h2 className="font-montserrat text-lg font-bold text-neutral">Article Not Found</h2>
          <p className="text-gray-400 text-xs leading-relaxed font-semibold">
            {error || 'The requested article could not be loaded.'}
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold px-6 py-3 rounded-full transition-all active:scale-95 font-montserrat shadow-md"
          >
            <ArrowLeft size={14} />
            Back to Blog List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f7fc] min-h-screen pt-28 pb-16 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-40 left-10 w-80 h-80 bg-primary/10 rounded-full blur-[80px] pointer-events-none float-slow z-0" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-[100px] pointer-events-none float-medium z-0" />

      {/* Connection Line Background SVG (Decorative) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1280 800" preserveAspectRatio="none">
          <path className="flow-line animate-dash" d="M -50 200 Q 300 150 640 400 T 1330 300" fill="transparent" stroke="#0f3cc9" strokeWidth="1" strokeDasharray="10,10"></path>
          <path className="flow-line animate-dash" d="M -50 400 Q 400 600 800 300 T 1330 600" fill="transparent" stroke="#0f3cc9" strokeWidth="1" strokeDasharray="5,5"></path>
        </svg>
      </div>

      <SEO 
        title={blog.seoTitle || blog.title}
        description={blog.seoDescription || blog.excerpt}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 relative z-10">
        {/* Back Link */}
        <Link 
          to="/blog"
          className="inline-flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors text-xs font-bold mb-6 font-montserrat self-start cursor-pointer"
        >
          <ChevronLeft size={16} />
          Back to Blog List
        </Link>

        {/* Layout Wrapper */}
        <div className="flex flex-col gap-8">
          
          {/* Main Article Content */}
          <article className="w-full flex flex-col gap-6">
            <div className="glass-panel p-6 sm:p-10 md:p-12 rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[0_20px_50px_rgba(15,60,201,0.04)] text-left">
              {/* Category & Title */}
              <div className="flex flex-col items-start gap-4 font-montserrat mb-6">
                <span className="bg-primary/5 text-primary border border-primary/10 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {blog.category}
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral leading-tight">
                  {blog.title}
                </h1>
              </div>

              {/* Metadata info */}
              <div className="flex flex-wrap items-center gap-6 border-y border-slate-100 py-4 mb-8 text-[11px] text-slate-500 font-bold font-montserrat">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-primary/70" />
                  <span>
                    Published on {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <User size={14} className="text-primary/70" />
                  <span>By Nitru Connect Editorial</span>
                </span>
              </div>

              {/* Cover Image */}
              {blog.coverImage && (
                <div className="w-full h-[250px] sm:h-[380px] rounded-3xl overflow-hidden mb-10 shadow-md border-t-4 border-secondary">
                  <img 
                    src={blog.coverImage} 
                    alt={blog.title} 
                    className="w-full h-full object-cover hover:scale-101 transition-all duration-300"
                  />
                </div>
              )}

              {/* Content Box */}
              <div className="prose prose-neutral max-w-none text-slate-700 text-sm leading-relaxed whitespace-pre-line font-montserrat font-medium flex flex-col gap-6">
                {blog.content}
              </div>

              {/* Footer Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="border-t border-slate-100 pt-8 mt-12 flex flex-wrap items-center gap-3">
                  <Tag size={14} className="text-primary/70 shrink-0" />
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="bg-white border border-slate-200 text-neutral text-[10px] font-bold px-3 py-1 rounded-full shadow-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Bottom Sections: Horizontal flex on lg screens */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full">
            
            {/* Editor Panel Card */}
            <div className="flex-1 glass-panel p-6 rounded-3xl border border-slate-200/80 bg-white/90 shadow-md text-left flex flex-col justify-between gap-4 font-montserrat">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 mb-1">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/25">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral text-sm">Nitru Insights</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Expert Analysis</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                  Nitru Connect delivers expert utility audits, commercial tariff guidance, and finance advice to help UK SMEs save money and optimize their operational overhead.
                </p>
              </div>
            </div>

            {/* Read Next / Recent Blogs list */}
            {recentBlogs.length > 0 && (
              <div className="flex-1 glass-panel p-6 rounded-3xl border border-slate-200/80 bg-white/90 shadow-md text-left flex flex-col gap-4 font-montserrat">
                <h4 className="text-xs font-bold text-neutral uppercase tracking-widest text-primary">Recent Insights</h4>
                <div className="flex flex-col gap-4">
                  {recentBlogs.map((b) => (
                    <Link 
                      key={b._id} 
                      to={`/blog/${b.slug}`}
                      className="group flex gap-3 items-center border-b border-slate-100 pb-3 last:border-0 last:pb-0 cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                        {b.coverImage ? (
                          <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-tr from-primary to-[#1844cb] flex items-center justify-center text-white font-bold text-[8px] uppercase select-none">
                            {b.category}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0 text-left">
                        <span className="text-[9px] font-bold text-secondary-dark uppercase tracking-wider font-montserrat">{b.category}</span>
                        <h5 className="text-[11px] font-bold text-neutral group-hover:text-primary transition-colors leading-snug line-clamp-2 font-montserrat">
                          {b.title}
                        </h5>
                        <span className="text-[9px] text-slate-400 font-semibold mt-0.5 font-montserrat">
                          {new Date(b.publishedAt || b.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sidebar CTA Box */}
            <div className="flex-1 border border-slate-800 bg-slate-900 text-white p-6 rounded-3xl text-center shadow-lg relative overflow-hidden flex flex-col items-center justify-between gap-4 font-montserrat group">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary mb-1 shadow-sm">
                <Bolt size={20} className="animate-pulse" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h4 className="text-sm font-bold tracking-tight text-white">Optimize Your Connectivity</h4>
                <p className="text-slate-300 text-[10px] sm:text-[11px] font-semibold leading-relaxed">
                  Stop leaking revenue to inefficient payment routing and archaic infrastructure. Compare rates within 24 hours.
                </p>
              </div>
              <Link
                to="/contact"
                className="w-full bg-secondary hover:bg-secondary-dark text-neutral text-xs font-bold py-3 rounded-xl transition-all active:scale-95 shadow-md hover:shadow-lg cursor-pointer z-10"
              >
                Request Free Tariff Review
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* CTA Box */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto my-8 relative z-10">
        <div className="border border-white/10 bg-gradient-to-r from-primary to-[#1844cb] text-white p-8 md:p-12 rounded-[2rem] text-center shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-dark pointer-events-none" />
          <div className="relative flex flex-col items-center gap-5 z-10 font-montserrat">
            <h2 className="text-xl md:text-2xl font-bold">Need a Custom Commercial Utility Audit?</h2>
            <p className="text-white/80 text-xs sm:text-sm max-w-md font-semibold leading-relaxed">
              Our specialists can review your utility bills, broadband terminals, or card payment contracts and find saving avenues within 24 hours.
            </p>
            <Link
              to="/contact"
              className="bg-secondary hover:bg-secondary-dark text-neutral text-xs font-bold px-8 py-3.5 rounded-full transition-all active:scale-95 shadow-md mt-2 cursor-pointer"
            >
              Start Free Tariff Comparison
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;
