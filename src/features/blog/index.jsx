import React, { useState, useMemo } from 'react';
import { BLOG_ARTICLES } from './data/articles.js';
import { ArticleModal } from './components/ArticleModal.jsx';

export const Blog = ({ navigate }) => {
  const [activeCategory, setActiveCategory] = useState('All articles');
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const categories = [
    'All articles',
    'Screen time',
    'Focus',
    'Family',
    'Wellbeing'
  ];

  // Filter articles based on active category
  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All articles') {
      return BLOG_ARTICLES;
    }
    return BLOG_ARTICLES.filter((article) => {
      const catMatch = article.category.toLowerCase() === activeCategory.toLowerCase();
      const tagsMatch = article.tags && article.tags.some(t => t.toLowerCase() === activeCategory.toLowerCase());
      return catMatch || tagsMatch;
    });
  }, [activeCategory]);

  const selectedArticle = useMemo(() => {
    return BLOG_ARTICLES.find((a) => a.id === selectedArticleId) || null;
  }, [selectedArticleId]);

  // Separate articles into Row 1 (first 2 articles) and subsequent rows for exact 2-column + 3-column reference layout
  const isDefaultAllView = activeCategory === 'All articles';
  const row1Articles = isDefaultAllView ? filteredArticles.slice(0, 2) : [];
  const row2Articles = isDefaultAllView ? filteredArticles.slice(2, 5) : [];
  const row3Articles = isDefaultAllView ? filteredArticles.slice(5, 8) : [];

  return (
    <div className="w-full text-left bg-white min-h-screen">
      
      {/* ========================================================
          HERO SECTION (The Plugoff Journal)
         ======================================================== */}
      <section 
        className="relative w-full min-h-[440px] sm:min-h-[520px] lg:min-h-[600px] xl:min-h-[640px] bg-[#073c2d] text-white flex items-center px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-[#052e22]"
        style={{ 
          backgroundImage: "url('/assets/blog-hero-bg.png'), url('/assets/blog-hero.png'), url('/assets/blog-hero-bg.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center',
          backgroundSize: 'cover'
        }}
      >
        {/* Crisp background image layer anchored to right side matching reference */}
        <img 
          src="/assets/blog-hero-bg.png" 
          alt="The Plugoff Journal Hero"
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none select-none z-0"
        />

        <div className="max-w-7xl mx-auto w-full pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 relative z-10">
          <div className="max-w-3xl select-none">
            <span className="text-base sm:text-lg md:text-xl font-bold tracking-[0.25em] text-white/95 block mb-2 sm:mb-3 uppercase font-sans">
              THE
            </span>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[104px] xl:text-[118px] font-black tracking-[-0.03em] leading-[0.88] text-white uppercase font-sans drop-shadow-sm">
              PLUGOFF<br />
              JOURNAL
            </h1>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: ARTICLES CATALOG (Matches Reference Exactly)
          Category Pills: All articles, Screen time, Focus, Family, Wellbeing
          Row 1: 2 horizontal split cards
          Row 2: 3 vertical cards
          Row 3: 3 vertical cards
         ======================================================== */}
      <section className="w-full bg-white py-10 sm:py-14 lg:py-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap mb-8 sm:mb-10">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#f8e79b] text-[#073c2d] shadow-xs'
                      : 'bg-transparent text-[#073c2d] border border-[#073c2d]/35 hover:border-[#073c2d] hover:bg-[#073c2d]/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Articles Grid - Matches Reference Image Exactly */}
          {isDefaultAllView ? (
            <div className="space-y-6 sm:space-y-7">
              
              {/* Row 1: 2 large featured horizontal cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
                {row1Articles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => setSelectedArticleId(article.id)}
                    className="group rounded-2xl sm:rounded-3xl border border-[#073c2d]/25 bg-white p-5 sm:p-6 flex flex-col sm:flex-row items-stretch gap-5 sm:gap-6 hover:border-[#073c2d]/50 transition-all duration-200 cursor-pointer"
                  >
                    {/* Left: Image */}
                    <div className="w-full sm:w-[48%] flex-shrink-0 aspect-[16/11] sm:aspect-auto rounded-xl overflow-hidden bg-zinc-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Right: Title & Yellow Pill Button */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <h2 className="text-xl sm:text-[22px] lg:text-[23px] font-bold text-[#073c2d] leading-[1.25] tracking-tight">
                        {article.title}
                      </h2>

                      <div className="pt-5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedArticleId(article.id);
                          }}
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f8e79b] hover:bg-[#f5dd7e] text-[#073c2d] text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer group-hover:shadow-sm"
                        >
                          <span>Read article</span>
                          <span className="text-sm font-bold">→</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Row 2: 3 vertical cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
                {row2Articles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => setSelectedArticleId(article.id)}
                    className="group rounded-2xl sm:rounded-3xl border border-[#073c2d]/25 bg-white p-5 sm:p-6 flex flex-col justify-between h-full hover:border-[#073c2d]/50 transition-all duration-200 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 mb-5">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between flex-1">
                      <h2 className="text-lg sm:text-[19px] font-bold text-[#073c2d] leading-snug mb-5">
                        {article.title}
                      </h2>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedArticleId(article.id);
                          }}
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f8e79b] hover:bg-[#f5dd7e] text-[#073c2d] text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer group-hover:shadow-sm"
                        >
                          <span>Read article</span>
                          <span className="text-sm font-bold">→</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Row 3: 3 vertical cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
                {row3Articles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => setSelectedArticleId(article.id)}
                    className="group rounded-2xl sm:rounded-3xl border border-[#073c2d]/25 bg-white p-5 sm:p-6 flex flex-col justify-between h-full hover:border-[#073c2d]/50 transition-all duration-200 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 mb-5">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between flex-1">
                      <h2 className="text-lg sm:text-[19px] font-bold text-[#073c2d] leading-snug mb-5">
                        {article.title}
                      </h2>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedArticleId(article.id);
                          }}
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f8e79b] hover:bg-[#f5dd7e] text-[#073c2d] text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer group-hover:shadow-sm"
                        >
                          <span>Read article</span>
                          <span className="text-sm font-bold">→</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

            </div>
          ) : (
            /* Filtered View (When category other than 'All articles' is selected) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => setSelectedArticleId(article.id)}
                  className="group rounded-2xl sm:rounded-3xl border border-[#073c2d]/25 bg-white p-5 sm:p-6 flex flex-col justify-between h-full hover:border-[#073c2d]/50 transition-all duration-200 cursor-pointer"
                >
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 mb-5">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1">
                    <h2 className="text-lg sm:text-[19px] font-bold text-[#073c2d] leading-snug mb-5">
                      {article.title}
                    </h2>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedArticleId(article.id);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f8e79b] hover:bg-[#f5dd7e] text-[#073c2d] text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer group-hover:shadow-sm"
                      >
                        <span>Read article</span>
                        <span className="text-sm font-bold">→</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ========================================================
          ARTICLE READER MODAL (Opens full article on click)
         ======================================================== */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticleId(null)}
        />
      )}

    </div>
  );
};

export default Blog;
