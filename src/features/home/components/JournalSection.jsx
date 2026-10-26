import React, { useState, useRef } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

/**
 * Section 5: "THE PLUGOFF JOURNAL"
 * 
 * Responsive behavior:
 * - Mobile view (< lg): Clean horizontal scrollable cards carousel located beneath the text,
 *   with reduced top section padding to prevent any text collision.
 * - Desktop view (>= lg): Signature vertical tilted arc of cards with drag-to-scroll interaction.
 */
export const JournalSection = () => {
  const stories = [
    {
      id: 'play',
      category: 'PLAY',
      cardBg: '#f2f7f4',
      title: 'More outdoor time, brighter days',
      excerpt:
        'Nature is the ultimate playground. Spending unstructured time outdoors stimulates creative problem-solving, regulates sleep patterns, and restores natural circadian rhythm.',
      image:
        'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&auto=format&fit=crop&q=80',
      alt: 'Child running freely in a sunlit field during golden hour',
    },
    {
      id: 'parenting',
      category: 'PARENTING',
      cardBg: '#fbf0eb',
      title: 'How to nurture curiosity at home',
      excerpt:
        'Curiosity isn’t taught through passive video feeds—it’s sparked when kids have the freedom to ask questions, explore open-ended hobbies, and tinker with real materials.',
      image:
        'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&auto=format&fit=crop&q=80',
      alt: 'Child focused on drawing with colored pencils at a wooden table',
    },
    {
      id: 'wellbeing',
      category: 'WELLBEING',
      cardBg: '#fdf1b0',
      title: 'The beauty of boredom',
      excerpt:
        'Boredom doesn’t always need fixing. Sometimes, it’s where imagination begins and children discover what they truly enjoy.',
      image: '/assets/journal_3.jpg',
      alt: 'Young girl resting chin on hands dreaming over open book in window light',
    },
    {
      id: 'learning',
      category: 'LEARNING',
      cardBg: '#edf6fa',
      title: 'Small habits for a calmer day',
      excerpt:
        'Tiny environmental nudges, from designated charging stations to morning reading rituals, create a sense of calm predictability without daily power struggles.',
      image:
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
      alt: 'Warm tea mug and stacked books on a windowsill overlooking green trees',
    },
    {
      id: 'creativity',
      category: 'CREATIVITY',
      cardBg: '#ffffff',
      title: 'Simple activities for rainy days',
      excerpt:
        'Turn gloomy afternoons into craft workshops, blanket forts, and storytelling adventures that require zero screen time and spark infinite wonder.',
      image:
        'https://images.unsplash.com/photo-1596464716127-f2a829822301?w=600&auto=format&fit=crop&q=80',
      alt: 'Child hands crafting and coloring bright drawings on paper',
    },
  ];

  // Default active story is "The beauty of boredom" (index 2)
  const [activeIndex, setActiveIndex] = useState(2);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startYRef = useRef(0);
  const pointerIdRef = useRef(null);
  const hasDraggedRef = useRef(false);

  const activeStory = stories[activeIndex];

  // Desktop drag gesture handlers
  const handlePointerDown = (e) => {
    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    startYRef.current = e.clientY;
    setIsDragging(true);
    hasDraggedRef.current = false;
  };

  const handlePointerMove = (e) => {
    if (!isDragging || pointerIdRef.current !== e.pointerId) return;
    const deltaY = e.clientY - startYRef.current;
    if (Math.abs(deltaY) > 6) {
      hasDraggedRef.current = true;
    }
    setDragOffset(deltaY * 0.9);
  };

  const handlePointerUp = (e) => {
    if (!isDragging || pointerIdRef.current !== e.pointerId) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if capture ended
    }

    const threshold = 45;
    if (dragOffset < -threshold) {
      // Pushed upward -> next story
      setActiveIndex((prev) => (prev + 1) % stories.length);
    } else if (dragOffset > threshold) {
      // Pushed downward -> prev story
      setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);
    }

    setDragOffset(0);
  };

  const handlePointerCancel = (e) => {
    if (pointerIdRef.current === e.pointerId) {
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  const handleCardClick = (index) => {
    if (!hasDraggedRef.current) {
      setActiveIndex(index);
    }
  };

  // Desktop Arc positioning calculation with infinite wrapping
  const getCardStyle = (index) => {
    let offset = (index - activeIndex) % stories.length;
    if (offset > Math.floor(stories.length / 2)) {
      offset -= stories.length;
    } else if (offset < -Math.floor(stories.length / 2)) {
      offset += stories.length;
    }

    const continuousOffset = offset + dragOffset / 230;

    const translateY = continuousOffset * 225;
    const translateX = 38 - Math.pow(continuousOffset, 2) * 16;
    const rotate = continuousOffset * 9 - 2;
    const scale = Math.max(0.75, 1.03 - Math.abs(continuousOffset) * 0.05);
    const opacity = Math.max(0.2, 1 - Math.abs(continuousOffset) * 0.15);
    const zIndex = Math.round(20 - Math.abs(continuousOffset) * 3);

    return {
      transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`,
      opacity,
      zIndex,
      transition: isDragging ? 'none' : 'all 500ms cubic-bezier(0.34, 1.35, 0.64, 1)',
      userSelect: 'none',
      WebkitUserSelect: 'none',
    };
  };

  return (
    <section
      className="relative w-full bg-[#024d39] pt-10 sm:pt-14 lg:pt-28 pb-16 sm:pb-20 lg:pb-32 overflow-hidden text-left selection:bg-[#f9eaa7] selection:text-[#024d39]"
      style={{ backgroundColor: '#024d39' }}
      aria-label="The Plugoff Journal"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 w-full">
        
        {/* MOBILE VIEW (< lg): Editorial Text on Top + Horizontal Scrollable Cards */}
        <div className="block lg:hidden w-full">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-xs font-bold tracking-[0.2em] text-[#f9eaa7] uppercase font-sans">
              THE PLUGOFF JOURNAL
            </span>
            <span className="h-[1.5px] w-16 bg-[#f9eaa7]/50 block" />
          </div>

          {/* Dynamic Headline */}
          <div key={`mobile-title-${activeStory.id}`} className="animate-fadeIn">
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.035em] text-[#f9eaa7] leading-[1.02] font-sans">
              {activeStory.title}
            </h2>

            {/* Excerpt */}
            <p className="mt-3.5 text-sm sm:text-base text-[#e1ece5] font-normal leading-relaxed">
              {activeStory.excerpt}
            </p>

            {/* CTA Button */}
            <div className="mt-5">
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-[#f9eaa7] hover:bg-[#fae792] text-[#024d39] font-bold text-sm px-6 py-3 rounded-full shadow-sm active:scale-95"
              >
                <span>Read the full story</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Horizontally Scrollable Cards Row */}
          <div className="mt-8 pt-2">
            <div className="flex items-center justify-between mb-2.5 text-xs text-[#e1ece5]/75 font-mono">
              <span>Swipe stories horizontally</span>
              <span>{activeIndex + 1}/{stories.length}</span>
            </div>

            <div className="flex flex-row overflow-x-auto gap-3.5 pb-4 pt-1 snap-x snap-mandatory scroll-smooth -mx-5 px-5">
              {stories.map((story, index) => {
                const isCurrent = index === activeIndex;

                return (
                  <div
                    key={`mobile-card-${story.id}`}
                    onClick={() => setActiveIndex(index)}
                    className={`w-[220px] sm:w-[240px] flex-shrink-0 snap-center rounded-2xl p-3 cursor-pointer shadow-xl transition-all duration-200 ${
                      isCurrent
                        ? 'ring-2 ring-[#f9eaa7] scale-[1.02] shadow-black/40'
                        : 'opacity-80 hover:opacity-100 shadow-black/25'
                    }`}
                    style={{ backgroundColor: story.cardBg }}
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <span className="text-[10px] font-bold tracking-wider text-[#024d39] uppercase font-sans">
                        {story.category}
                      </span>
                      <div className="w-5 h-5 rounded-full border border-[#024d39]/20 flex items-center justify-center text-[#024d39]">
                        <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />
                      </div>
                    </div>

                    <h4 className="text-xs sm:text-sm font-black text-[#024d39] leading-tight mt-1 line-clamp-2 font-sans">
                      {story.title}
                    </h4>

                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mt-2.5 bg-zinc-200">
                      <img
                        src={story.image}
                        alt={story.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* DESKTOP VIEW (>= lg): Original Two-Column Layout with Vertical Tilted Arc */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center min-h-[640px]">
          
          {/* Left Column: Vertical Tilted Arc with Drag Scrolling */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            className={`col-span-5 relative h-[640px] flex items-center justify-start overflow-visible select-none touch-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            <div className="relative w-full h-full flex items-center justify-center -ml-12 pointer-events-none">
              {stories.map((story, index) => {
                const isCurrent = index === activeIndex;

                return (
                  <div
                    key={`desktop-card-${story.id}`}
                    onClick={() => handleCardClick(index)}
                    style={getCardStyle(index)}
                    className={`absolute top-1/2 -mt-[170px] w-[260px] rounded-3xl p-4.5 shadow-2xl transition-shadow pointer-events-auto ${
                      isCurrent
                        ? 'ring-2 ring-[#f9eaa7]/50 shadow-black/45'
                        : 'shadow-black/25 hover:shadow-black/40'
                    }`}
                  >
                    <div
                      className="w-full h-full rounded-2xl p-3 flex flex-col justify-between"
                      style={{ backgroundColor: story.cardBg }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[11px] font-bold tracking-wider text-[#024d39] uppercase font-sans">
                          {story.category}
                        </span>
                        <div className="w-6 h-6 rounded-full border border-[#024d39]/20 flex items-center justify-center text-[#024d39]">
                          <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                        </div>
                      </div>

                      <h4 className="text-[15px] font-black text-[#024d39] leading-tight mt-1 font-sans line-clamp-2">
                        {story.title}
                      </h4>

                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mt-3 bg-zinc-200 pointer-events-none">
                        <img
                          src={story.image}
                          alt={story.alt}
                          className="w-full h-full object-cover pointer-events-none"
                          draggable={false}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Editorial Content */}
          <div className="col-span-7 pl-10 text-left">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="text-[13px] font-bold tracking-[0.25em] text-[#f9eaa7] uppercase font-sans">
                THE PLUGOFF JOURNAL
              </span>
              <span className="h-[1.5px] w-32 bg-[#f9eaa7]/50 block" />
            </div>

            <div key={`desktop-title-${activeStory.id}`} className="animate-fadeIn">
              <h2 className="text-6xl md:text-7xl lg:text-[84px] xl:text-[94px] font-black tracking-[-0.038em] text-[#f9eaa7] leading-[0.92] font-sans">
                {activeStory.title}
              </h2>

              <p className="mt-8 text-lg lg:text-[19px] text-[#e1ece5] font-normal leading-relaxed max-w-lg">
                {activeStory.excerpt}
              </p>

              <div className="mt-10">
                <button
                  type="button"
                  className="group inline-flex items-center gap-2 bg-[#f9eaa7] hover:bg-[#fae792] text-[#024d39] font-bold text-[17px] px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-150 active:scale-[0.98] cursor-pointer"
                >
                  <span>Read the full story</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default JournalSection;
