import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { api } from '../../services/api';
import { Search, Calendar, ChevronRight, BookOpen, RefreshCw } from 'lucide-react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await api.getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Could not retrieve blog articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = ['All', 'Payments', 'Finance', 'Utilities', 'Telecoms', 'Growth'];

  // Filtered blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = selectedCategory === 'All' || blog.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#f4f7fc] min-h-screen pt-28 pb-16 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-40 right-10 w-80 h-80 bg-primary/10 rounded-full blur-[80px] pointer-events-none float-slow" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/15 rounded-full blur-[100px] pointer-events-none float-medium" />

      <SEO 
        title="Business Insights & Guides"
        description="Explore the Nitru Connect blog for business utility cost audits, merchant payment guidelines, SME funding calculators, and local marketing strategies."
      />

      {/* Header Hero Section */}
      <section className="relative px-4 md:px-8 max-w-7xl mx-auto mb-12">
        <div className="rounded-[2.5rem] py-16 px-6 md:px-12 text-center relative overflow-hidden bg-gradient-to-r from-primary to-[#1844cb] text-white border border-white/10 shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-dark pointer-events-none" />
          <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-5 z-10">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Nitru Insights</span>
            <h1 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">SME Growth & Cost Auditing Blog</h1>
            <p className="text-white/80 text-xs sm:text-sm max-w-xl leading-relaxed font-semibold">
              Stay up to date with energy tariff market trends, card terminal compliance audits, and business funding opportunities in the UK.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search Bar Row */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-6 relative z-10">
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white/90 shadow-md flex flex-col md:flex-row gap-6 justify-between items-center">
          {/* Categories list */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-montserrat text-xs font-bold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-white border-primary shadow-sm hover:bg-primary-dark'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-xs bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-slate-700"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          </div>
        </div>
      </section>

      {/* Main Grid Area */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-6 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <RefreshCw className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin text-primary" />
            <p className="text-xs font-bold text-gray-400 font-montserrat">Loading insights...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 text-xs p-4 rounded-xl border border-red-200 text-center max-w-md mx-auto my-8 font-semibold">
            {error}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="glass-panel text-center py-20 max-w-md mx-auto flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white/90 shadow-md">
            <BookOpen className="text-primary/70 animate-bounce" size={48} />
            <h3 className="font-montserrat text-lg font-bold text-neutral">No Articles Found</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-semibold px-6">
              We couldn't find any published blog posts matching your search or category filters. Check back soon for new guides!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            
            {/* Featured Post Card (Displayed only when no search or category filters are applied) */}
            {searchQuery === '' && selectedCategory === 'All' && (
              <div className="group relative bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md flex flex-col md:flex-row items-stretch transition-all duration-500 min-h-[380px]">
                <div className="w-full md:w-3/5 h-64 md:h-auto relative overflow-hidden shrink-0">
                  {filteredBlogs[0].coverImage ? (
                    <img 
                      src={filteredBlogs[0].coverImage} 
                      alt={filteredBlogs[0].title}
                      className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-primary to-[#1844cb] flex items-center justify-center p-6 text-white font-montserrat font-bold text-2xl select-none">
                      {filteredBlogs[0].category}
                    </div>
                  )}
                  <span className="absolute top-6 left-6 bg-secondary text-neutral font-montserrat font-bold text-[10px] uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
                    Featured
                  </span>
                </div>

                <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center text-left bg-white">
                  <div className="text-primary font-bold text-xs mb-3 uppercase tracking-wider font-montserrat">
                    {filteredBlogs[0].category}
                  </div>
                  <h2 className="font-montserrat text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-neutral leading-tight group-hover:text-primary transition-colors">
                    <Link to={`/blog/${filteredBlogs[0].slug}`}>{filteredBlogs[0].title}</Link>
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mb-6 font-semibold line-clamp-3 leading-relaxed">
                    {filteredBlogs[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-primary/70" />
                      {new Date(filteredBlogs[0].publishedAt || filteredBlogs[0].createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <Link 
                    to={`/blog/${filteredBlogs[0].slug}`}
                    className="inline-flex items-center text-primary hover:text-primary-dark font-bold text-xs font-montserrat hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ChevronRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            )}

            {/* Blogs Listing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(searchQuery === '' && selectedCategory === 'All' ? filteredBlogs.slice(1) : filteredBlogs).map((blog) => (
                <article 
                  key={blog._id} 
                  className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full text-left"
                >
                  {/* Cover Image or Fallback Gradient */}
                  <div className="h-48 relative overflow-hidden bg-neutral-light shrink-0">
                    {blog.coverImage ? (
                      <img 
                        src={blog.coverImage} 
                        alt={blog.title} 
                        className="w-full h-full object-cover hover:scale-103 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-primary to-[#1844cb] flex items-center justify-center p-6 text-white font-montserrat font-bold text-lg select-none">
                        {blog.category}
                      </div>
                    )}
                    <span className="absolute top-4 left-4 bg-secondary text-neutral font-montserrat font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {blog.category}
                    </span>
                  </div>

                  {/* Article Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-primary/70" />
                          {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <h3 className="font-montserrat text-sm font-bold text-neutral hover:text-primary transition-colors leading-snug">
                        <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h3>

                      <p className="text-slate-600 text-[11px] leading-relaxed font-medium line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                      {/* Tags */}
                      <div className="flex gap-1 overflow-hidden max-w-[70%]">
                        {blog.tags && blog.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-[9px] text-primary bg-primary/5 border border-primary/10 font-bold px-2 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Read CTA */}
                      <Link 
                        to={`/blog/${blog.slug}`}
                        className="text-primary hover:text-primary-dark text-xs font-bold font-montserrat flex items-center gap-1 group transition-colors cursor-pointer"
                      >
                        <span>Read Article</span>
                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;
