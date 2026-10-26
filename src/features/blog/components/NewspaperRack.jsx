import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, BookOpen, Layers } from 'lucide-react';

export const NewspaperRack = ({ onSelectArticle, customHeroImage = '/assets/blog-hero.png' }) => {
  const [imageError, setImageError] = useState(false);
  const [useRenderedMode, setUseRenderedMode] = useState(false);

  // The 4 headline issues shown in the newspaper rack reference
  const rackIssues = [
    {
      id: 'raising-curious-humans',
      category: 'PARENTING',
      volume: 'VOL. 01',
      date: 'OCT 2026',
      title: 'Raising curious humans in a distracted world',
      accentColor: '#f7d359',
      image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=500&auto=format&fit=crop&q=80',
      illustrationLabel: 'Nurture Wonder'
    },
    {
      id: 'play-still-matters',
      category: 'CHILD DEVELOPMENT',
      volume: 'VOL. 01',
      date: 'OCT 2026',
      title: 'Play still matters',
      accentColor: '#fae48c',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=80',
      illustrationLabel: 'Unstructured Play'
    },
    {
      id: 'healthier-relationship-with-screens',
      category: 'MINDFUL TECH',
      volume: 'VOL. 01',
      date: 'OCT 2026',
      title: 'A healthier relationship with screens',
      accentColor: '#fde02f',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500&auto=format&fit=crop&q=80',
      illustrationLabel: 'Digital Balance'
    },
    {
      id: 'slower-days-brighter-tomorrows',
      category: 'WELLBEING',
      volume: 'VOL. 01',
      date: 'OCT 2026',
      title: 'Slower days, brighter tomorrows',
      accentColor: '#fde02f',
      image: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=500&auto=format&fit=crop&q=80',
      illustrationLabel: 'Slow Living'
    }
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none flex flex-col items-center">
      
      {/* Uploaded Image Mode or Interactive Wire Rack */}
      {!useRenderedMode && !imageError ? (
        <div className="relative w-full group">
          {/* Main Hero Image Slot */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#063427] p-2 transition-transform duration-300 group-hover:scale-[1.01]">
            <img
              src={customHeroImage}
              alt="The Plugoff Journal Newspaper Wire Rack"
              className="w-full h-auto object-cover rounded-xl"
              onError={() => {
                // If custom image isn't found at /assets/blog-hero.png, fallback to local reference
                setImageError(true);
              }}
            />
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-xl" />
          </div>

          {/* Quick action pill at bottom */}
          <div className="mt-4 flex items-center justify-between text-xs text-emerald-100/70 px-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#fde02f] animate-pulse" />
              <span>4 Featured Issues Available</span>
            </span>
            <button
              onClick={() => setUseRenderedMode(true)}
              className="text-[#fde02f] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>View Interactive Rack</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Interactive CSS Wire Rack matching the 4 reference issues */
        <div className="w-full relative">
          {/* Green wire frame rack styling */}
          <div className="relative bg-[#052b20]/90 border-2 border-emerald-950/60 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm">
            
            {/* Wire rack side rails */}
            <div className="absolute -left-3 top-6 bottom-6 w-2.5 rounded-full bg-emerald-900 border border-emerald-700/50" />
            <div className="absolute -right-3 top-6 bottom-6 w-2.5 rounded-full bg-emerald-900 border border-emerald-700/50" />

            <div className="space-y-4">
              {rackIssues.map((issue, idx) => (
                <div
                  key={issue.id}
                  onClick={() => onSelectArticle && onSelectArticle(issue.id)}
                  className="group relative bg-[#fdfdfb] text-zinc-900 rounded-xl p-4 sm:p-5 shadow-lg border border-zinc-200/90 cursor-pointer transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-[#fde02f]"
                >
                  {/* Newspaper Header Bar */}
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-300/80 text-[11px] font-mono font-bold tracking-wider text-zinc-600">
                    <span className="text-[#073c2d] uppercase">{issue.category}</span>
                    <span className="text-zinc-500">{issue.volume} · {issue.date}</span>
                  </div>

                  {/* Body with Headline and Illustration Thumbnail */}
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-[#073c2d] transition-colors leading-snug">
                        {issue.title}
                      </h3>
                      {/* Faux newspaper lines */}
                      <div className="mt-2.5 space-y-1 opacity-40 group-hover:opacity-70 transition-opacity">
                        <div className="h-1 bg-zinc-400 rounded-full w-full" />
                        <div className="h-1 bg-zinc-400 rounded-full w-4/5" />
                        <div className="h-1 bg-zinc-400 rounded-full w-11/12" />
                      </div>
                    </div>

                    {/* Illustration Card */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-[#fef08a] border border-amber-300/60 overflow-hidden flex-shrink-0 relative group-hover:scale-105 transition-transform">
                      <img 
                        src={issue.image} 
                        alt={issue.title} 
                        className="w-full h-full object-cover mix-blend-multiply opacity-90"
                      />
                      <div className="absolute inset-0 bg-[#fde02f]/20 pointer-events-none" />
                    </div>
                  </div>

                  {/* Hover Read Indicator */}
                  <div className="mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-[#073c2d] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Story</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>

            {/* Wire rack bottom bar */}
            <div className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-200/80">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#fde02f]" />
                <span>Vol. 01 Wire Rack</span>
              </span>
              {!imageError && (
                <button
                  onClick={() => setUseRenderedMode(false)}
                  className="text-[#fde02f] hover:underline cursor-pointer font-semibold"
                >
                  Show Uploaded Asset
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default NewspaperRack;
