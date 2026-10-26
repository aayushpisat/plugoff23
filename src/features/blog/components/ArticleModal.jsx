import React, { useEffect } from 'react';
import { X, Calendar, Clock, BookOpen, Share2, CheckCircle2, Bookmark, ArrowLeft } from 'lucide-react';

export const ArticleModal = ({ article, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!article) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-200 animate-fadeIn cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-left max-h-[90vh] flex flex-col animate-slideUp border border-zinc-200">
        
        {/* Top Bar with Journal Meta & Close */}
        <div className="px-6 py-4 bg-[#073c2d] text-white flex items-center justify-between border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full bg-[#fde02f] text-[#093528] font-bold">
              {article.category}
            </span>
            <span className="text-xs font-mono text-emerald-200/80">
              {article.volume} · {article.date}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 divide-y divide-zinc-100">
          
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-700" />
                {article.readTime}
              </span>
              <span>•</span>
              <span className="text-zinc-600">By <strong>{article.author}</strong> ({article.authorRole})</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#073c2d] leading-tight tracking-tight">
              {article.title}
            </h1>

            {article.headline && (
              <p className="text-lg font-serif italic text-zinc-700 border-l-4 border-[#fde02f] pl-4 py-1">
                "{article.headline}"
              </p>
            )}

            {/* Featured Image */}
            {article.image && (
              <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden bg-zinc-100 mt-4">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
          </div>

          {/* Article Text Content */}
          <div className="pt-6 space-y-5 text-base sm:text-lg text-zinc-700 leading-relaxed font-sans">
            {article.content?.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Takeaways for Parents Box */}
          {article.takeaways && article.takeaways.length > 0 && (
            <div className="pt-6">
              <div className="bg-[#f7faf8] border border-emerald-900/10 rounded-2xl p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2 text-[#073c2d]">
                  <BookOpen className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-bold text-base sm:text-lg">
                    Parent Rituals & Takeaways
                  </h3>
                </div>
                <ul className="space-y-3">
                  {article.takeaways.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-700">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Author Bio & Journal Footer */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#073c2d] text-[#fde02f] flex items-center justify-center font-bold text-base">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm text-zinc-900">{article.author}</p>
                <p className="text-xs text-zinc-500">{article.authorRole} · Plugoff Editorial Board</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-[#073c2d] hover:bg-[#094e3b] text-white font-semibold text-xs px-5 py-2.5 rounded-full transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Journal</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
