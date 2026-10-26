import React, { useState } from 'react';
import { Check, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../core/context/CartContext.jsx';

const FREEBIES_OPTIONS = [
  {
    id: 'nature-flashcards',
    title: 'Nature Activity Cards & Stationery Kit',
    subtitle: '50 screen-free exploration cards with colored pencils & field notebook',
    image: '/assets/freebie_1.jpg',
    badge: 'Popular',
  },
  {
    id: 'story-book',
    title: 'Illustrated Picture Storybook',
    subtitle: '"Adventures Beyond the Screen" bedtime tale celebrating family moments',
    image: '/assets/freebie_2.jpg',
    badge: 'Kids Favourite',
  },
  {
    id: 'board-game',
    title: 'Offline Family Board Game & Dice',
    subtitle: 'Cooperative laughter-filled tabletop game for the whole family',
    image: '/assets/freebie_3.jpg',
    badge: 'Best for Groups',
  },
  {
    id: 'habit-journal',
    title: 'Mindful Family Daily Habit Journal',
    subtitle: 'Morning gratitude prompts, bedtime reflections & milestone stickers',
    image: '/assets/journal_3.jpg',
    badge: 'Routine Builder',
  },
  {
    id: 'explorer-kit',
    title: 'Outdoor Curiosity Explorer Pouch',
    subtitle: 'Wooden pocket magnifying glass, discovery compass & scavenger list',
    image: '/assets/step2.jpg',
    badge: 'Outdoor Play',
  },
];

export const ProductCatalogue = ({ navigate }) => {
  const { addToCart } = useCart();
  const [isFreebieModalOpen, setIsFreebieModalOpen] = useState(false);
  const [selectedFreebieIds, setSelectedFreebieIds] = useState(['nature-flashcards', 'story-book']);
  const [selectionWarning, setSelectionWarning] = useState('');

  const scrollToProgrammes = () => {
    const el = document.getElementById('our-programmes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleFreebie = (id) => {
    setSelectionWarning('');
    if (selectedFreebieIds.includes(id)) {
      setSelectedFreebieIds(prev => prev.filter(item => item !== id));
    } else {
      if (selectedFreebieIds.length >= 2) {
        setSelectionWarning('You can choose any 2 freebies. Tap a selected item to unselect and swap.');
        return;
      }
      setSelectedFreebieIds(prev => [...prev, id]);
    }
  };

  const handleAddWebinar = () => {
    addToCart({
      id: 'digital-detox-webinar',
      title: 'Digital Detox Webinar',
      price: 99,
      category: 'Webinar',
      image: '/assets/step1.jpg',
      freebies: [],
    });
  };

  const handleOpenCourseModal = () => {
    setSelectionWarning('');
    setIsFreebieModalOpen(true);
  };

  const handleConfirmCourseWithFreebies = () => {
    if (selectedFreebieIds.length !== 2) {
      setSelectionWarning('Please select exactly 2 freebies to continue.');
      return;
    }
    const selectedTitles = FREEBIES_OPTIONS
      .filter(f => selectedFreebieIds.includes(f.id))
      .map(f => f.title);

    addToCart({
      id: 'digital-detox-course',
      title: 'Digital Detox Course',
      price: 4999,
      category: 'Course',
      image: '/assets/freebie_2.jpg',
      freebies: selectedTitles,
    });
    setIsFreebieModalOpen(false);
  };

  return (
    <div className="w-full text-left bg-white min-h-screen">
      
      {/* ========================================================
          SECTION 1: HERO & FREEBIES BANNER
          - Single-line H1 with yellow period dot
          - Subtitle: "Little extras to make screen-free time more fun."
          - Forest Green Rounded Banner (#073c2d):
              Left: FREEBIES, UNLOCKED | Included in your PlugOFF journey. | Explore the programme →
              Right: 3 White Cards showcasing the locked goodies
         ======================================================== */}
      <section className="pt-4 sm:pt-6 lg:pt-8 pb-6 sm:pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Centered Header - strictly 1 line */}
        <div className="text-center w-full max-w-5xl mx-auto select-none overflow-hidden">
          <h1 className="text-[clamp(1.15rem,3.4vw,2.75rem)] font-black tracking-[-0.03em] leading-tight text-[#073c2d] font-sans whitespace-nowrap">
            Goodies for a happier offline life<span className="text-[#f8d468]">.</span>
          </h1>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-[#073c2d]/85 font-normal font-sans">
            Little extras to make screen-free time more fun.
          </p>
        </div>

        {/* Compact Forest Green Banner - Half Height */}
        <div className="mt-4 sm:mt-6 bg-[#073c2d] rounded-[22px] sm:rounded-[28px] lg:rounded-[32px] px-5 py-4 sm:px-8 sm:py-6 lg:px-10 lg:py-6 shadow-sm text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            
            {/* Left Column: Heading, Subtitle & Yellow CTA Button */}
            <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center text-left select-none">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-black tracking-tight leading-[0.95] text-white uppercase font-sans">
                  FREEBIES,<br />
                  UNLOCKED
                </h2>
                
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm lg:text-[15px] text-[#e6f0eb] font-normal leading-snug font-sans">
                  Included in your<br />
                  PlugOFF journey.
                </p>
              </div>

              <div className="mt-3.5 sm:mt-4">
                <button
                  type="button"
                  onClick={scrollToProgrammes}
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#f8e79b] hover:bg-[#f6df84] active:scale-95 text-[#073c2d] text-xs sm:text-sm font-bold tracking-tight shadow-xs hover:shadow transition-all duration-200 cursor-pointer font-sans"
                >
                  <span>Explore the programme</span>
                  <span className="text-base font-bold leading-none">→</span>
                </button>
              </div>
            </div>

            {/* Right Column: 3 White Cards with Illustrations & Lock Badge - Compact */}
            <div className="lg:col-span-8 xl:col-span-8">
              <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                
                {/* Card 1: Nature Activity Cards & Stationery */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 aspect-square max-h-36 sm:max-h-44 md:max-h-48 mx-auto flex items-center justify-center overflow-hidden shadow-xs select-none transition-transform duration-200 hover:scale-[1.02] w-full">
                  <img
                    src="/assets/freebie_1.jpg"
                    alt="Nature Activity Cards & Stationery"
                    className="w-full h-full object-contain pointer-events-none"
                    loading="lazy"
                  />
                </div>

                {/* Card 2: Illustrated Picture Storybook */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 aspect-square max-h-36 sm:max-h-44 md:max-h-48 mx-auto flex items-center justify-center overflow-hidden shadow-xs select-none transition-transform duration-200 hover:scale-[1.02] w-full">
                  <img
                    src="/assets/freebie_2.jpg"
                    alt="Illustrated Children's Picture Storybook"
                    className="w-full h-full object-contain pointer-events-none"
                    loading="lazy"
                  />
                </div>

                {/* Card 3: Offline Family Board Game */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 aspect-square max-h-36 sm:max-h-44 md:max-h-48 mx-auto flex items-center justify-center overflow-hidden shadow-xs select-none transition-transform duration-200 hover:scale-[1.02] w-full">
                  <img
                    src="/assets/freebie_3.jpg"
                    alt="Offline Family Board Game and Dice"
                    className="w-full h-full object-contain pointer-events-none"
                    loading="lazy"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ========================================================
          SECTION 2: OUR PROGRAMMES - "Two ways to begin."
          - Deep forest green background (#073c2d)
          - Kicker: "OUR PROGRAMMES"
          - Headline: "Two ways to begin."
          - Two Cards with #ebf059 border:
              1. Digital Detox Webinar (₹99)
              2. Digital Detox Course (₹4,999) with 2 of 5 Freebies Choice
         ======================================================== */}
      <section id="our-programmes" className="bg-[#073c2d] text-white py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14 select-none">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#e6f0eb] uppercase font-sans">
              OUR PROGRAMMES
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl md:text-6xl font-black tracking-[-0.03em] text-white font-sans">
              Two ways to begin<span className="text-white">.</span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            
            {/* ====================================================
                CARD 1: Digital Detox Webinar (₹99)
               ==================================================== */}
            <div className="bg-white text-zinc-900 rounded-[28px] sm:rounded-[36px] border-[3px] border-[#eff168] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-lg relative select-none">
              <div>
                {/* Yellow Badge */}
                <div className="mb-4">
                  <span className="inline-block bg-[#fbf48d] text-[#073c2d] text-[11px] sm:text-xs font-black tracking-wider px-3.5 py-1 rounded-full uppercase font-sans">
                    START HERE
                  </span>
                </div>

                {/* Title & Price Row */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#073c2d] tracking-tight leading-[1.05] font-sans">
                    Digital Detox<br />
                    Webinar
                  </h3>
                  <div className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#073c2d] tracking-tight font-sans whitespace-nowrap">
                    ₹99
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-600 font-normal leading-relaxed font-sans">
                  A practical introduction for parents who want to understand screen habits and take the first step towards change.
                </p>

                {/* Divider */}
                <div className="border-t border-zinc-200/90 my-6 sm:my-7" />

                {/* Subtitle */}
                <p className="text-[11px] sm:text-xs font-bold text-[#073c2d] tracking-[0.16em] uppercase mb-4 font-sans">
                  WHAT YOU'LL GAIN
                </p>

                {/* Bullet Points */}
                <ul className="space-y-3 sm:space-y-3.5">
                  {[
                    'Understand why screens are so engaging',
                    'Learn about everyday digital habits',
                    'Get simple, practical tips to try at home',
                    'Explore if the PlugOFF approach is right for you',
                  ].map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#fbf48d] text-[#073c2d] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm text-[#073c2d] font-medium leading-snug font-sans">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-2">
                <button
                  type="button"
                  onClick={handleAddWebinar}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-[#073c2d] hover:bg-[#0b4837] active:scale-[0.98] text-white text-sm sm:text-base font-bold tracking-tight flex items-center justify-center gap-2.5 transition-all duration-200 shadow-sm cursor-pointer font-sans"
                >
                  <span>Join the webinar</span>
                  <span className="text-base font-bold leading-none">→</span>
                </button>
              </div>
            </div>

            {/* ====================================================
                CARD 2: Digital Detox Course (₹4,999) - with 2 Freebies Choice
               ==================================================== */}
            <div className="bg-white text-zinc-900 rounded-[28px] sm:rounded-[36px] border-[3px] border-[#eff168] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-lg relative select-none">
              <div>
                {/* Yellow Badge */}
                <div className="mb-4">
                  <span className="inline-block bg-[#fbf48d] text-[#073c2d] text-[11px] sm:text-xs font-black tracking-wider px-3.5 py-1 rounded-full uppercase font-sans">
                    FULL PROGRAMME
                  </span>
                </div>

                {/* Title & Price Row */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#073c2d] tracking-tight leading-[1.05] font-sans">
                    Digital Detox<br />
                    Course
                  </h3>
                  <div className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#073c2d] tracking-tight font-sans whitespace-nowrap">
                    ₹4,999
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-600 font-normal leading-relaxed font-sans">
                  A complete, guided programme for parents who want to build healthier, more sustainable digital habits at home.
                </p>

                {/* Divider */}
                <div className="border-t border-zinc-200/90 my-6 sm:my-7" />

                {/* Subtitle */}
                <p className="text-[11px] sm:text-xs font-bold text-[#073c2d] tracking-[0.16em] uppercase mb-4 font-sans">
                  WHAT YOU'LL WORK TOWARDS
                </p>

                {/* Bullet Points */}
                <ul className="space-y-3 sm:space-y-3.5">
                  {[
                    "Understand children's attention and behaviour",
                    'Create realistic screen-time boundaries',
                    'Discover offline activities that build curiosity and play',
                    'Build a long-term family routine that lasts',
                  ].map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#fbf48d] text-[#073c2d] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm text-[#073c2d] font-medium leading-snug font-sans">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button: Triggers 2-of-5 Freebies Selection */}
              <div className="mt-8 pt-2">
                <button
                  type="button"
                  onClick={handleOpenCourseModal}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-[#fbf48d] hover:bg-[#f6ec6d] active:scale-[0.98] text-[#073c2d] text-sm sm:text-base font-bold tracking-tight flex items-center justify-center gap-2.5 transition-all duration-200 shadow-sm cursor-pointer font-sans"
                >
                  <span>Explore the full course</span>
                  <span className="text-base font-bold leading-none">→</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          FREEBIES SELECTION MODAL (Any 2 of 5)
          - Triggers when user puts Digital Detox Course into cart
         ======================================================== */}
      {isFreebieModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div 
            onClick={() => setIsFreebieModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200" 
          />

          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl z-10 text-left border border-zinc-200 max-h-[90vh] flex flex-col">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsFreebieModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <p className="text-xs font-bold tracking-widest text-[#073c2d] uppercase font-sans mb-1.5">
                Bonus Goodies Unlocked
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-[#073c2d] tracking-tight font-sans">
                Choose any 2 freebies for your course pack
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-600 font-sans">
                Included at no extra charge with the Digital Detox Course (₹4,999). Pick 2 to receive in your welcome parcel.
              </p>
            </div>

            {/* Status / Selection Counter Banner */}
            <div className="mt-4 flex items-center justify-between bg-[#073c2d]/5 rounded-xl px-4 py-2.5 border border-[#073c2d]/10">
              <span className="text-xs sm:text-sm font-semibold text-[#073c2d] font-sans">
                Selected: <strong className="font-black text-[#073c2d]">{selectedFreebieIds.length} of 2</strong>
              </span>
              <span className="text-xs font-medium text-zinc-500 font-sans">
                {selectedFreebieIds.length === 2 ? '✓ 2 selected! Ready to add.' : `Pick ${2 - selectedFreebieIds.length} more`}
              </span>
            </div>

            {/* Warning Message if selecting more than 2 */}
            {selectionWarning && (
              <div className="mt-2 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 font-sans">
                {selectionWarning}
              </div>
            )}

            {/* Freebies List (5 Options) */}
            <div className="mt-4 flex-1 overflow-y-auto pr-1 space-y-3">
              {FREEBIES_OPTIONS.map((freebie) => {
                const isSelected = selectedFreebieIds.includes(freebie.id);
                return (
                  <div
                    key={freebie.id}
                    onClick={() => handleToggleFreebie(freebie.id)}
                    className={`flex items-center gap-4 p-3 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'border-[#073c2d] bg-[#f2f7f4] shadow-xs'
                        : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white border border-zinc-200 overflow-hidden flex-shrink-0 p-1 flex items-center justify-center">
                      <img
                        src={freebie.image}
                        alt={freebie.title}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-[#073c2d] leading-snug font-sans">
                          {freebie.title}
                        </h4>
                        <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#fbf48d] text-[#073c2d] font-sans">
                          {freebie.badge}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-normal mt-1 font-sans line-clamp-2">
                        {freebie.subtitle}
                      </p>
                    </div>

                    {/* Selection Indicator */}
                    <div className="flex-shrink-0">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#073c2d] text-[#fbf48d]'
                          : 'border-2 border-zinc-300 text-transparent'
                      }`}>
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Actions */}
            <div className="mt-5 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsFreebieModalOpen(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-zinc-300 text-zinc-700 hover:bg-zinc-100 text-xs sm:text-sm font-semibold transition-colors cursor-pointer font-sans"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={handleConfirmCourseWithFreebies}
                disabled={selectedFreebieIds.length !== 2}
                className={`w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer font-sans ${
                  selectedFreebieIds.length === 2
                    ? 'bg-[#073c2d] hover:bg-[#0b4837] text-white shadow-sm active:scale-95'
                    : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Course & 2 Goodies to Cart (₹4,999)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProductCatalogue;
