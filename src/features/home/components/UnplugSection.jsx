import React, { useState } from 'react';

/**
 * Interactive Unplug Section
 * 
 * Features:
 * - 100% gapless, seamless continuous yellow cable extending to both screen edges.
 * - Male plug with metal prongs that mechanically slide into the female socket when plugged.
 * - Smooth spring-animated separation when clicked, with electrical sparks bursting in the gap.
 * - Full-bleed background crossfade between screen overload (2.1) and peaceful reading (2.2).
 */
export const UnplugSection = () => {
  const [isUnplugged, setIsUnplugged] = useState(false);

  const bgImage1 =
    'https://res.cloudinary.com/qxfcoki4/image/upload/v1792729355/plugOFF_section2.1.png';
  const bgImage2 =
    'https://res.cloudinary.com/qxfcoki4/image/upload/v1792729356/plugOFF_section2.2.png';

  const handleToggle = () => {
    setIsUnplugged((prev) => !prev);
  };

  return (
    <section
      onClick={handleToggle}
      className="relative w-full overflow-hidden select-none cursor-pointer group min-h-[580px] sm:min-h-[680px] lg:min-h-[760px] flex flex-col justify-between"
      style={{ backgroundColor: '#073325' }}
      aria-label="Interactive Screens vs Real Life demonstration. Click to unplug."
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      {/* Background Image 1 (Plugged: screens overwhelm) */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out pointer-events-none ${
          isUnplugged ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `url(${bgImage1})`,
        }}
      />

      {/* Background Image 2 (Unplugged: peaceful book & bunny) - Adjusted vertically to eliminate the downward offset */}
      <div
        className={`absolute inset-x-0 w-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out pointer-events-none ${
          isUnplugged ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${bgImage2})`,
          top: '-5.6%',
          height: '105.6%',
          backgroundColor: '#014f40',
        }}
      />

      {/* Text Columns Overlay (Left & Right) */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Screens steal more than time */}
          <div className="lg:col-span-4 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.08] font-sans">
              <span className="text-white block">Screens</span>
              <span className="text-white block">steal more</span>
              <span className="text-[#ffe600] block">than time.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-[15px] text-zinc-200/90 leading-relaxed font-normal max-w-sm">
              Constant videos, games and notifications keep children hooked — pulling them away from what truly matters.
            </p>
          </div>

          {/* Center Column: Open area framing child illustration */}
          <div className="hidden lg:block lg:col-span-4 pointer-events-none min-h-[360px]" />

          {/* Right Column: A brighter world is possible */}
          <div className="lg:col-span-4 text-left lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.08] font-sans">
              <span className="text-white block">A brighter</span>
              <span className="text-white block">world is</span>
              <span className="text-[#ffe600] block">possible.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-[15px] text-zinc-200/90 leading-relaxed font-normal max-w-sm">
              When screens take a step back, children get the space to create, move, explore and build real connections.
            </p>
          </div>
        </div>
      </div>

      {/* Seamless Wire & Intersecting Plug Assembly along Bottom */}
      <div className="relative z-30 w-full pb-8 sm:pb-12 lg:pb-14 flex items-center justify-center overflow-visible">
        <div className="relative w-full flex items-center justify-center overflow-visible">
          {/* CENTER PLUG JUNCTION CONTAINER */}
          <div className="relative flex items-center justify-center overflow-visible">
            
            {/* LEFT MALE PLUG (Slides Left when Unplugged) */}
            <div
              className="relative z-10 flex items-center transition-transform duration-500 ease-[cubic-bezier(0.34,1.45,0.64,1)]"
              style={{
                transform: isUnplugged ? 'translateX(-42px)' : 'translateX(0px)',
              }}
            >
              {/* Left Infinite Yellow Wire: Physically anchored to back of Left Collar */}
              <div
                className="absolute right-full top-1/2 -translate-y-1/2 w-[120vw] h-[4.5px] bg-[#ffe600] shadow-[0_0_8px_rgba(255,230,0,0.3)] pointer-events-none"
              />

              {/* Left Plug SVG Component */}
              <svg
                width="106"
                height="56"
                viewBox="0 0 106 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible flex-shrink-0"
              >
                {/* Left Strain Relief Collar (Trapezoid) */}
                <path
                  d="M 2 18 L 24 14 L 24 42 L 2 38 Z"
                  fill="#ebe6dc"
                  stroke="#d7d0c2"
                  strokeWidth="1.5"
                />

                {/* Left Plug Body */}
                <rect
                  x="24"
                  y="7"
                  width="54"
                  height="42"
                  rx="10"
                  fill="#f4efe6"
                  stroke="#ddd6c8"
                  strokeWidth="2"
                />

                {/* Vertical Grip Grooves */}
                <line
                  x1="44"
                  y1="15"
                  x2="44"
                  y2="41"
                  stroke="#ded7ca"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="54"
                  y1="15"
                  x2="54"
                  y2="41"
                  stroke="#ded7ca"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* TWO GOLDEN METAL PRONGS (Extend 28px past plug body face x=78 to x=106) */}
                {/* Upper Metal Prong */}
                <rect
                  x="78"
                  y="18"
                  width="26"
                  height="6"
                  rx="2"
                  fill="#e5aa38"
                  stroke="#c58b22"
                  strokeWidth="1"
                />
                {/* Lower Metal Prong */}
                <rect
                  x="78"
                  y="32"
                  width="26"
                  height="6"
                  rx="2"
                  fill="#e5aa38"
                  stroke="#c58b22"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* SPARKS BURST OVERLAY IN GAP (Only active when unplugged) */}
            {isUnplugged && (
              <div className="absolute z-30 pointer-events-none flex items-center justify-center animate-pulse">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="overflow-visible"
                >
                  {/* Subtle golden electrical glow halo */}
                  <circle
                    cx="30"
                    cy="30"
                    r="16"
                    fill="#ffe600"
                    opacity="0.2"
                    className="animate-ping"
                  />

                  {/* Radiating Spark Lines */}
                  {/* Top-Left */}
                  <line
                    x1="22"
                    y1="22"
                    x2="14"
                    y2="14"
                    stroke="#ffe600"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Top-Right */}
                  <line
                    x1="38"
                    y1="22"
                    x2="46"
                    y2="14"
                    stroke="#ffe600"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Bottom-Left */}
                  <line
                    x1="22"
                    y1="38"
                    x2="14"
                    y2="46"
                    stroke="#ffe600"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Bottom-Right */}
                  <line
                    x1="38"
                    y1="38"
                    x2="46"
                    y2="46"
                    stroke="#ffe600"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Vertical accent sparks */}
                  <line
                    x1="30"
                    y1="16"
                    x2="30"
                    y2="8"
                    stroke="#ffe600"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="30"
                    y1="44"
                    x2="30"
                    y2="52"
                    stroke="#ffe600"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}

            {/* RIGHT FEMALE SOCKET (Slides Right when Unplugged, covers prongs when Plugged) */}
            <div
              className="relative z-20 flex items-center transition-transform duration-500 ease-[cubic-bezier(0.34,1.45,0.64,1)] -ml-[28px]"
              style={{
                transform: isUnplugged ? 'translateX(42px)' : 'translateX(0px)',
              }}
            >
              {/* Right Socket SVG Component */}
              <svg
                width="84"
                height="56"
                viewBox="0 0 84 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible flex-shrink-0"
              >
                {/* Socket Body (Draws over prongs when plugged, creating seamless mechanical seal) */}
                <rect
                  x="2"
                  y="6"
                  width="58"
                  height="44"
                  rx="10"
                  fill="#f4efe6"
                  stroke="#ddd6c8"
                  strokeWidth="2"
                />

                {/* Female Receptor Rim Accent */}
                <rect
                  x="2"
                  y="12"
                  width="4"
                  height="32"
                  rx="2"
                  fill="#e5dfd2"
                />

                {/* Vertical Grip Grooves */}
                <line
                  x1="30"
                  y1="15"
                  x2="30"
                  y2="41"
                  stroke="#ded7ca"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="40"
                  y1="15"
                  x2="40"
                  y2="41"
                  stroke="#ded7ca"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Right Strain Relief Collar (Trapezoid) */}
                <path
                  d="M 60 14 L 82 18 L 82 38 L 60 42 Z"
                  fill="#ebe6dc"
                  stroke="#d7d0c2"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Right Infinite Yellow Wire: Physically anchored to back of Right Collar */}
              <div
                className="absolute left-full top-1/2 -translate-y-1/2 w-[120vw] h-[4.5px] bg-[#ffe600] shadow-[0_0_8px_rgba(255,230,0,0.3)] pointer-events-none"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default UnplugSection;
