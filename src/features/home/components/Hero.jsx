import React from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * Plugoff Hero Section
 * Fully responsive across mobile and desktop.
 * Features the signature electric yellow ribbon tangled gracefully through
 * "Unplug." and "Plug into life." matching the reference design.
 */
export const Hero = ({ navigate }) => {
  const bgImageUrl =
    'https://res.cloudinary.com/qxfcoki4/image/upload/v1792728134/plugOFF.png';

  return (
    <section
      className="relative w-full min-h-[92vh] sm:min-h-screen bg-cover bg-bottom bg-no-repeat flex flex-col justify-start pt-28 sm:pt-36 md:pt-40 lg:pt-44 pb-20 sm:pb-32 overflow-hidden"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
      }}
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 w-full">
        <div className="max-w-4xl text-left select-none">
          {/* Headline Container */}
          <div className="relative inline-block w-full sm:w-auto">
            {/* Target Selectors:
                CSS selector 1: h1 > span:nth-of-type(2)
                CSS selector 2: h1 > span:nth-of-type(1)
            */}
            <h1 className="text-[#093528] font-black tracking-[-0.035em] font-sans text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.93]">
              <span className="block">Unplug.</span>
              <span className="block mt-1 sm:mt-2 sm:whitespace-nowrap">
                Plug into life.
              </span>
            </h1>
          </div>

          {/* Explore Plugoff Action Button */}
          <div className="mt-8 sm:mt-10 flex items-center gap-3">
            <button
              onClick={() => navigate('/about')}
              className="group inline-flex items-center gap-2 bg-[#fde02f] hover:bg-[#fae01d] text-[#093528] font-bold text-base sm:text-[17px] px-7 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-150 active:scale-[0.97] cursor-pointer"
            >
              <span>Explore Plugoff</span>
              <ArrowUpRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
