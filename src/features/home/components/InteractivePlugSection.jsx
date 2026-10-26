import React, { useState } from 'react';

/**
 * Interactive Plug & Screen Time Impact Section
 * 
 * Features two interactive states toggled by clicking the central SVG plug:
 * - State 1: Plugged In -> Screen immersion (phone, blue/green screen light cone, social apps)
 * - State 2: Unplugged  -> Real life immersion (reading a book peacefully with plush toy)
 */
export const InteractivePlugSection = () => {
  const [isUnplugged, setIsUnplugged] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const state1Image =
    'https://res.cloudinary.com/qxfcoki4/image/upload/v1792729355/plugOFF_section2.1.png';
  const state2Image =
    'https://res.cloudinary.com/qxfcoki4/image/upload/v1792729356/plugOFF_section2.2.png';

  const togglePlug = () => {
    setIsUnplugged((prev) => !prev);
  };

  return (
    <section className="relative w-full bg-[#0a3325] text-white overflow-hidden select-none py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Stage Container with Cross-fading Illustrations */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#082b1f] border border-white/5">
          {/* Ratio Container for the 16:9 illustration */}
          <div className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[460px] md:min-h-[540px]">
            {/* State 1: Screen & Notifications (Active when NOT unplugged) */}
            <img
              src={state1Image}
              alt="Screens steal more than time - plugged in child on smartphone"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                isUnplugged ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            />

            {/* State 2: Peaceful Book Reading (Active when UNPLUGGED) */}
            <img
              src={state2Image}
              alt="A brighter world is possible - unplugged child reading book"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                isUnplugged ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />

            {/* Text Overlay for Screen Readers & Accessible Structured Typography */}
            <div className="sr-only">
              <h2>Screens steal more than time. A brighter world is possible.</h2>
              <p>
                Constant videos, games and notifications keep children hooked — pulling them away from what truly matters.
                When screens take a step back, children get the space to create, move, explore and build real connections.
              </p>
            </div>

            {/* Interactive SVG Plug Overlay at Bottom Center */}
            <div className="absolute bottom-[3%] sm:bottom-[3.5%] md:bottom-[4%] left-0 right-0 w-full flex flex-col items-center justify-center z-20">
              {/* Interactive Tooltip Callout */}
              <button
                type="button"
                onClick={togglePlug}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group flex flex-col items-center focus:outline-none cursor-pointer"
                aria-label={isUnplugged ? 'Click to plug in' : 'Click to unplug'}
              >
                {/* Floating Hint Badge */}
                <div
                  className={`mb-2 sm:mb-3 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-200 shadow-lg ${
                    isUnplugged
                      ? 'bg-amber-400 text-[#093528] hover:bg-amber-300 ring-2 ring-amber-300/40'
                      : 'bg-white text-[#093528] hover:bg-zinc-100 ring-2 ring-white/40'
                  } ${isHovered ? 'scale-105' : 'scale-100 animate-bounce'}`}
                >
                  {isUnplugged ? '✨ Unplugged! Click to Reconnect' : '⚡ Click Plug to Unplug'}
                </div>

                {/* SVG Plug Component */}
                <div className="relative w-full max-w-[500px] h-14 sm:h-16 flex items-center justify-center">
                  <svg
                    viewBox="0 0 500 80"
                    className="w-full h-full overflow-visible drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Left Wire */}
                    <line
                      x1="0"
                      y1="40"
                      x2={isUnplugged ? '200' : '225'}
                      y2="40"
                      stroke="#fde02f"
                      strokeWidth="5"
                      strokeLinecap="round"
                      className="transition-all duration-500 ease-out"
                    />

                    {/* Right Wire */}
                    <line
                      x1={isUnplugged ? '300' : '275'}
                      y1="40"
                      x2="500"
                      y2="40"
                      stroke="#fde02f"
                      strokeWidth="5"
                      strokeLinecap="round"
                      className="transition-all duration-500 ease-out"
                    />

                    {/* Left Male Plug Body */}
                    <g
                      transform={isUnplugged ? 'translate(-25, 0)' : 'translate(0, 0)'}
                      className="transition-transform duration-500 ease-out"
                    >
                      {/* Cable Relief */}
                      <rect x="180" y="34" width="12" height="12" rx="2" fill="#d8d1c2" />
                      {/* Main Plug Shell */}
                      <rect
                        x="192"
                        y="22"
                        width="36"
                        height="36"
                        rx="8"
                        fill="#f3eee3"
                        stroke="#dfd8c8"
                        strokeWidth="1.5"
                      />
                      {/* Shading Accent */}
                      <path
                        d="M 194 28 C 194 25, 197 24, 202 24 L 222 24 C 226 24, 227 26, 227 28 L 227 34 L 194 34 Z"
                        fill="#ffffff"
                        opacity="0.6"
                      />

                      {/* Male Metal Prongs (revealed prominently when unplugged) */}
                      <rect
                        x="228"
                        y="28"
                        width="18"
                        height="6"
                        rx="1.5"
                        fill="#e5c158"
                        stroke="#c49e32"
                        strokeWidth="1"
                      />
                      <rect
                        x="228"
                        y="46"
                        width="18"
                        height="6"
                        rx="1.5"
                        fill="#e5c158"
                        stroke="#c49e32"
                        strokeWidth="1"
                      />
                    </g>

                    {/* Golden Sparks (displayed only when UNPLUGGED in State 2) */}
                    <g
                      className={`transition-opacity duration-300 ${
                        isUnplugged ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {/* Top-Left Spark */}
                      <line
                        x1="243"
                        y1="22"
                        x2="237"
                        y2="15"
                        stroke="#fde02f"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Top-Right Spark */}
                      <line
                        x1="257"
                        y1="22"
                        x2="263"
                        y2="15"
                        stroke="#fde02f"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Bottom-Left Spark */}
                      <line
                        x1="243"
                        y1="58"
                        x2="237"
                        y2="65"
                        stroke="#fde02f"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Bottom-Right Spark */}
                      <line
                        x1="257"
                        y1="58"
                        x2="263"
                        y2="65"
                        stroke="#fde02f"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </g>

                    {/* Right Female Socket Body */}
                    <g
                      transform={isUnplugged ? 'translate(25, 0)' : 'translate(0, 0)'}
                      className="transition-transform duration-500 ease-out"
                    >
                      {/* Cable Relief */}
                      <rect x="308" y="34" width="12" height="12" rx="2" fill="#d8d1c2" />
                      {/* Main Socket Shell */}
                      <rect
                        x="272"
                        y="22"
                        width="36"
                        height="36"
                        rx="8"
                        fill="#f3eee3"
                        stroke="#dfd8c8"
                        strokeWidth="1.5"
                      />
                      {/* Shading Accent */}
                      <path
                        d="M 274 28 C 274 25, 277 24, 282 24 L 302 24 C 306 24, 307 26, 307 28 L 307 34 L 274 34 Z"
                        fill="#ffffff"
                        opacity="0.6"
                      />
                      {/* Socket Insertion Slots */}
                      <rect x="272" y="29" width="3" height="5" rx="1" fill="#7a705e" />
                      <rect x="272" y="46" width="3" height="5" rx="1" fill="#7a705e" />
                    </g>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* State Indicator Summary Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div
            onClick={() => setIsUnplugged(false)}
            className={`p-5 rounded-xl border transition-all cursor-pointer ${
              !isUnplugged
                ? 'bg-white/10 border-[#fde02f] ring-1 ring-[#fde02f]'
                : 'bg-white/5 border-white/10 hover:bg-white/[0.08]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${!isUnplugged ? 'bg-[#fde02f] animate-pulse' : 'bg-zinc-500'}`} />
              <h3 className="text-base font-bold text-white">
                State 1: Plugged In (Digital Saturation)
              </h3>
            </div>
            <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
              Algorithmic feeds, endless games, and notifications pull young minds into digital loops. The plug is connected.
            </p>
          </div>

          <div
            onClick={() => setIsUnplugged(true)}
            className={`p-5 rounded-xl border transition-all cursor-pointer ${
              isUnplugged
                ? 'bg-white/10 border-[#fde02f] ring-1 ring-[#fde02f]'
                : 'bg-white/5 border-white/10 hover:bg-white/[0.08]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isUnplugged ? 'bg-[#fde02f] animate-pulse' : 'bg-zinc-500'}`} />
              <h3 className="text-base font-bold text-white">
                State 2: Unplugged (Real Connections)
              </h3>
            </div>
            <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
              Screens step back. Children regain the calm, creativity, books, and human bonds that nurture their wellbeing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractivePlugSection;
