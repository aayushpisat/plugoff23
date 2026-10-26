import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

/**
 * Section 3: "Same time. A very different day."
 * 
 * Demonstrates how Plugoff prevents screen fragmentation.
 * Interactive toggle: Clicking "See how Plugoff changes the day" makes
 * the scattered orange pickup strands disappear/consolidate, while the longest
 * uninterrupted block expands.
 */
export const DifferentDaySection = () => {
  const [isPlugoff, setIsPlugoff] = useState(false);

  // Time markers along the top of the timeline
  const timeMarkers = [
    { label: '6 AM', pos: '4%' },
    { label: '12 PM', pos: '38%' },
    { label: '6 PM', pos: '72%' },
    { label: '11 PM', pos: '96%' },
  ];

  // Default fragmented strands (orange interruptions scattered throughout the day)
  // Each strand has left position (%) and width (%)
  const fragmentedStrands = [
    { left: 3.5, width: 1 },
    { left: 7, width: 0.8 },
    { left: 10.5, width: 1.2 },
    { left: 14, width: 0.8 },
    { left: 18, width: 1 },
    { left: 24, width: 0.9 },
    { left: 33, width: 1.1 },
    { left: 39, width: 1.4 },
    { left: 43.5, width: 0.8 },
    { left: 49, width: 1.2 },
    { left: 54, width: 1 },
    { left: 58, width: 1.5 },
    { left: 63, width: 0.9 },
    { left: 71, width: 2.2 },
    { left: 74, width: 1.2 },
    { left: 79, width: 0.8 },
    { left: 82, width: 1.8 },
    { left: 84.5, width: 1.5 },
    { left: 89, width: 0.9 },
    { left: 93, width: 2 },
    { left: 95.5, width: 1.6 },
  ];

  // Plugoff day strands: the scattered interruptions disappear!
  // Only 2 intentional, calm consolidated blocks remain.
  const plugoffStrands = [
    { left: 71, width: 4.5 },
    { left: 82, width: 4 },
  ];

  const activeStrands = isPlugoff ? plugoffStrands : fragmentedStrands;

  return (
    <section className="w-full bg-[#fbf0b2] py-20 lg:py-28 text-left selection:bg-[#0e3c2f] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Editorial Copy */}
          <div className="lg:col-span-5 text-left">
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#0e3c2f] uppercase block mb-4 font-sans">
              WHY PLUGOFF
            </span>

            <h2 className="text-5xl sm:text-6xl lg:text-[66px] font-black tracking-[-0.035em] text-[#0e3c2f] leading-[0.98] font-sans">
              <span className="block">Same time.</span>
              <span className="block">A very</span>
              <span className="block">different day.</span>
            </h2>

            <p className="mt-7 text-base sm:text-lg text-[#0e3c2f]/85 font-medium leading-relaxed max-w-md">
              We noticed that it’s not just the total screen time that affects children, but how often it breaks their day into small pieces.
            </p>
          </div>

          {/* Right Column: Interactive White Rounded Card */}
          <div className="lg:col-span-7">
            <div className="w-full bg-white rounded-3xl sm:rounded-[36px] p-6 sm:p-9 lg:p-10 shadow-xl shadow-black/[0.04] border border-black/[0.03]">
              
              {/* Timeline Header Time Labels with Tick Marks */}
              <div className="relative w-full h-8 mb-2">
                {timeMarkers.map((marker, index) => (
                  <div
                    key={index}
                    className="absolute -translate-x-1/2 flex flex-col items-center"
                    style={{ left: marker.pos }}
                  >
                    <span className="text-xs sm:text-[13px] font-bold text-[#0e3c2f] font-sans">
                      {marker.label}
                    </span>
                    <span className="w-[1px] h-2 bg-[#0e3c2f]/50 block mt-0.5" />
                  </div>
                ))}
              </div>

              {/* Timeline Visual Track */}
              <div className="relative h-11 sm:h-12 w-full rounded-2xl sm:rounded-full bg-[#edf6f0] overflow-hidden flex items-stretch border border-[#d6e8dc]/70">
                {/* Subtle vertical mint tick background grid (texture) */}
                <div
                  className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, #cde3d4 0px, #cde3d4 1px, transparent 1px, transparent 8px)',
                  }}
                />

                {/* Orange Strands (Screen Interruption Bars) */}
                {activeStrands.map((strand, index) => (
                  <div
                    key={`${isPlugoff ? 'plugoff' : 'frag'}-${index}`}
                    className="absolute top-0 bottom-0 bg-[#ea5d38] rounded-xs shadow-[0_0_2px_rgba(234,93,56,0.3)] transition-all duration-700 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
                    style={{
                      left: `${strand.left}%`,
                      width: `${strand.width}%`,
                      opacity: 1,
                    }}
                  />
                ))}
              </div>

              {/* 3 Metric Summary Cards */}
              <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
                {/* Metric 1: Pickups */}
                <div className="rounded-2xl bg-[#f2f8f4] p-4 sm:p-5 text-center flex flex-col justify-center items-center">
                  <span className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0e3c2f] font-sans tracking-tight leading-none transition-all duration-300">
                    {isPlugoff ? '2' : '10'}
                  </span>
                  <span className="text-xs sm:text-[13px] text-[#2c5244] font-medium mt-2 leading-tight">
                    Pickups in a day
                  </span>
                </div>

                {/* Metric 2: Longest Uninterrupted Time */}
                <div className="rounded-2xl bg-[#f2f8f4] p-4 sm:p-5 text-center flex flex-col justify-center items-center">
                  <span className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0e3c2f] font-sans tracking-tight leading-none transition-all duration-300">
                    {isPlugoff ? '4h 15m' : '1h 36m'}
                  </span>
                  <span className="text-xs sm:text-[13px] text-[#2c5244] font-medium mt-2 leading-tight">
                    Longest uninterrupted time
                  </span>
                </div>

                {/* Metric 3: Total Screen Time */}
                <div className="rounded-2xl bg-[#f2f8f4] p-4 sm:p-5 text-center flex flex-col justify-center items-center">
                  <span className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0e3c2f] font-sans tracking-tight leading-none">
                    4h
                  </span>
                  <span className="text-xs sm:text-[13px] text-[#2c5244] font-medium mt-2 leading-tight">
                    Total screen time <span className="block sm:inline text-[11px] text-[#2c5244]/80">(still the same)</span>
                  </span>
                </div>
              </div>

              {/* Interactive Pill Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setIsPlugoff(!isPlugoff)}
                  className="w-full py-4 sm:py-4.5 px-6 rounded-full bg-[#0e3c2f] hover:bg-[#092a20] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-sm hover:shadow"
                >
                  <span>
                    {isPlugoff
                      ? 'See fragmented day without Plugoff'
                      : 'See how Plugoff changes the day'}
                  </span>
                  {isPlugoff ? (
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  )}
                </button>
              </div>

              {/* Disclaimer Footer */}
              <p className="text-[11px] sm:text-xs text-[#2c5244]/75 text-center leading-relaxed mt-4 sm:mt-5 font-normal">
                This is an illustrative example based on common patterns observed in children’s digital habits, not measured data from a specific individual.
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DifferentDaySection;
