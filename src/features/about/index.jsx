import React from 'react';
import { TeamGrid } from './components/TeamGrid.jsx';

const PURPOSE_CARDS = [
  {
    number: '01',
    title: 'To look beyond\nscreen time.',
    description: 'We see screen use as a symptom, not the real problem. We look at the routines, triggers and needs behind it.'
  },
  {
    number: '02',
    title: 'To make offline\nchoices easier.',
    description: 'We help families create environments where real-world activities feel natural, appealing and accessible.'
  },
  {
    number: '03',
    title: 'To support\nreal life needs.',
    description: 'We make room for play, creativity, movement, connection and rest — the things that help children grow.'
  },
  {
    number: '04',
    title: 'To guide families\nwith empathy.',
    description: 'We believe change works best with support, not shame. We offer simple, practical tools that fit real family life.'
  }
];

export const About = ({ navigate }) => {
  const scrollToStory = () => {
    const el = document.getElementById('our-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full text-left bg-white min-h-screen">
      {/* ========================================================
          SECTION 1: HERO SECTION
          - Deep forest green base (#0c4333 / #073c2d)
          - Left side reserved for vintage camera background image
          - Right side:
              Heading: "A childhood beyond the screen."
              Subtitle: "We're making more room for curiosity, creativity and real-world connection."
              CTA Button: "Our story →" (Warm yellow pill button)
          - User background upload target: /assets/about-hero-bg.png
         ======================================================== */}
      <section 
        className="relative w-full min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] xl:min-h-[780px] bg-[#0c4333] text-white flex items-center overflow-hidden border-b border-[#083024]"
        style={{ 
          backgroundImage: "url('/assets/about-hero-bg.png'), url('/assets/about-hero.png'), url('/assets/about-hero-bg.jpg'), url('/assets/about-hero-bg.jpeg')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left center',
          backgroundSize: 'cover'
        }}
      >
        {/* Background Image Layer (Anchored to left side matching camera placement in reference) */}
        <img 
          src="/assets/about-hero-bg.png" 
          alt="A childhood beyond the screen"
          onError={(e) => {
            // Gracefully hide if user has not yet uploaded the file
            e.currentTarget.style.display = 'none';
          }}
          className="absolute inset-0 w-full h-full object-cover object-left pointer-events-none select-none z-0"
        />

        <div className="max-w-7xl mx-auto w-full pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 px-6 sm:px-10 lg:px-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
            
            {/* Left Side: Space left open for the camera graphic embedded in the background */}
            <div className="hidden lg:block lg:col-span-6 xl:col-span-6 min-h-[360px]" aria-hidden="true" />

            {/* Right Side: Exact typography, copy and yellow pill button */}
            <div className="lg:col-span-6 xl:col-span-6 text-left select-none">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[88px] font-black tracking-[-0.03em] leading-[0.93] text-white font-sans drop-shadow-sm">
                A childhood<br />
                beyond<br />
                the screen.
              </h1>

              <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-[#e6ece6] font-normal leading-relaxed max-w-xl">
                We&apos;re making more room for curiosity, creativity and real-world connection.
              </p>

              <div className="mt-8 sm:mt-10">
                <button
                  type="button"
                  onClick={scrollToStory}
                  className="inline-flex items-center gap-3 px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-[#f8d468] hover:bg-[#f5cc4b] active:scale-95 text-[#073c2d] text-base sm:text-lg font-bold tracking-tight shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <span>Our story</span>
                  <span className="text-xl font-bold leading-none">→</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: WHY PLUGOFF EXISTS (Matches Reference Exactly)
          - Full section background image across the entire section
          - Left column:
              Title: "Why PlugOFF exists." (with yellow period dot)
              3 thoughtful editorial paragraphs (text kept exactly as is)
          - Right side: Empty column allowing the full background image illustration to show through
          - Target upload path: /public/assets/about-why-bg.png
         ======================================================== */}
      <section 
        id="our-story" 
        className="relative w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[740px] xl:min-h-[780px] bg-white py-16 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-14 overflow-hidden flex items-center border-b border-zinc-100"
        style={{ 
          backgroundImage: "url('/assets/about-why-bg.png'), url('/assets/about-why-bg.jpg'), url('/assets/about-why-bg.jpeg')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center',
          backgroundSize: 'cover'
        }}
      >
        {/* Full-bleed background image layer spanning the entire section */}
        <img 
          src="/assets/about-why-bg.png" 
          alt=""
          onError={(e) => {
            if (!e.currentTarget.src.endsWith('.jpg')) {
              e.currentTarget.src = '/assets/about-why-bg.jpg';
            } else {
              e.currentTarget.style.display = 'none';
            }
          }}
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none select-none z-0"
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading and 3 Narrative Paragraphs (Kept exactly as is) */}
            <div className="lg:col-span-7 xl:col-span-6 select-none max-w-2xl">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] xl:text-[74px] font-black tracking-[-0.03em] leading-[1.02] text-[#073c2d] font-sans">
                Why PlugOFF<br />
                exists<span className="text-[#f8d468]">.</span>
              </h2>

              <div className="mt-8 sm:mt-10 space-y-6 sm:space-y-7 text-[#073c2d] text-base sm:text-lg lg:text-[18px] leading-[1.7] font-normal">
                <p>
                  We started noticing something familiar — our children reaching for screens at every quiet moment. We also realised we were doing the same, often choosing our phones over real conversations, play and connection.
                </p>

                <p>
                  It made us pause. We didn&apos;t want to just limit screen time; we wanted to understand it, and create a better, more balanced way forward for our own family and for others like ours.
                </p>

                <p>
                  That&apos;s how PlugOFF began — from a real need, a few honest conversations, and a shared belief in a kinder, more intentional digital life.
                </p>
              </div>
            </div>

            {/* Right Column: Empty space so the full background image is completely unobstructed */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6 min-h-[300px]" aria-hidden="true" />

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: CLEAR PURPOSE (Matches Reference Exactly)
          - Large bold heading: "PlugOFF was created with a clear purpose." (with yellow period dot)
          - 4 Deep Green Cards with signature chamfered/angled top-left corner
          - Fully responsive across mobile (1 col), tablet (2 col), and desktop (4 col)
         ======================================================== */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Heading */}
          <div className="mb-8 sm:mb-10 lg:mb-12 select-none max-w-3xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-black tracking-[-0.03em] leading-[1.02] text-[#073c2d] font-sans">
              PlugOFF was created<br />
              with a clear purpose<span className="text-[#f8d468]">.</span>
            </h2>
          </div>

          {/* 4 Cards Grid - Responsive from 1 column on mobile to 2 on tablet to 4 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-6 items-stretch">
            {PURPOSE_CARDS.map((card) => (
              <div
                key={card.number}
                className="group relative bg-[#073c2d] text-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default select-none"
                style={{
                  clipPath: 'polygon(26px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 26px)'
                }}
              >
                {/* Card Number */}
                <span className="block text-sm sm:text-base font-bold text-[#f8d468] tracking-wider mb-4 sm:mb-5 font-sans">
                  {card.number}
                </span>

                {/* Card Title */}
                <h3 className="text-xl sm:text-[22px] lg:text-[21px] xl:text-[23px] font-black text-white leading-[1.2] tracking-tight whitespace-pre-line font-sans">
                  {card.title}
                </h3>

                {/* Description directly below title with tight, natural spacing */}
                <div className="mt-5 sm:mt-6">
                  <p className="text-sm sm:text-[15px] text-[#e4ebe5] leading-[1.6] font-normal font-sans">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 4: MEET THE PEOPLE BEHIND PLUGOFF (Matches Reference Exactly)
          - Full-width deep forest green background (#073c2d)
          - Heading: "Meet the people behind PlugOFF." (with yellow period dot)
          - 2 Team Cards with yellow outline border and portrait images
         ======================================================== */}
      <section className="w-full bg-[#073c2d] py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-14 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="mb-10 sm:mb-14 select-none max-w-4xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[68px] font-black tracking-[-0.03em] leading-[1.05] text-white font-sans">
              Meet the people behind PlugOFF<span className="text-[#f8d468]">.</span>
            </h2>
          </div>

          {/* Team Cards Grid */}
          <TeamGrid />
        </div>
      </section>

      {/* ========================================================
          SECTION 5: MAKE ROOM FOR WHAT MATTERS (Matches Reference Exactly)
          - Background: Exact Hex #fdf7b9
          - Text & Primary Button: Exact Hex #084839
          - Heading: "Make room for what matters."
          - Subtitle: "Start with one small change. Help your family find more time for play, curiosity, and connection beyond the screen."
          - Buttons:
              Button 1: "Explore our approach →" (bg-[#084839], text-white)
              Button 2: "Get in touch" (bg-white, text-[#084839], border-[#084839])
         ======================================================== */}
      <section className="w-full bg-[#fdf7b9] py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-14 text-center">
        <div className="max-w-4xl mx-auto select-none">
          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-black tracking-[-0.03em] leading-[1.0] text-[#084839] font-sans">
            Make room for what matters.
          </h2>

          {/* Subtitle */}
          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl lg:text-[22px] text-[#084839] font-normal leading-relaxed max-w-2xl mx-auto font-sans">
            Start with one small change. Help your family find more time for play, curiosity, and connection beyond the screen.
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            {/* Primary Dark Button */}
            <button
              type="button"
              onClick={() => navigate ? navigate('/products') : (window.location.hash = '/products')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-[#084839] hover:opacity-90 active:scale-95 text-white text-base sm:text-lg font-bold tracking-tight shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <span>Explore our approach</span>
              <span className="text-xl font-bold leading-none">→</span>
            </button>

            {/* Secondary Outlined White Button */}
            <button
              type="button"
              onClick={() => navigate ? navigate('/contact') : (window.location.hash = '/contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-white hover:bg-zinc-50 active:scale-95 text-[#084839] border border-[#084839] text-base sm:text-lg font-bold tracking-tight shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              Get in touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
