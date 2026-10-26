import React from 'react';

/**
 * Section 4: "HOW PLUGOFF WORKS - Three steps to a more balanced day."
 * 
 * Showcases the three foundational pillars of the Plugoff methodology:
 * 01. Add friction
 * 02. Build discipline
 * 03. Engage the mind
 */
export const StepsSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Add friction',
      description:
        'Keep devices in another room or a designated place, so impulsive checking becomes less automatic.',
      image: '/assets/step1.jpg',
      alt: 'Phone stored inside a designated ceramic box on a nightstand',
    },
    {
      number: '02',
      title: 'Build discipline',
      description:
        'Create simple routines and visual cues to make it easier for children to choose offline activities.',
      image: '/assets/step2.jpg',
      alt: 'Child tracking off-screen activities on a sticker routine wall chart',
    },
    {
      number: '03',
      title: 'Engage the mind',
      description:
        'With fewer screen interruptions, children have more time and mental space to explore, create, play and discover what they enjoy.',
      image: '/assets/step3.jpg',
      alt: 'Child immersed in solving a colorful jigsaw puzzle at a table',
    },
  ];

  return (
    <section className="w-full bg-white py-20 lg:py-28 text-center selection:bg-[#0e3c2f] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 w-full">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#0e3c2f] uppercase block font-sans">
            HOW PLUGOFF WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-[-0.035em] text-[#0e3c2f] leading-tight font-sans mt-2.5">
            Three steps to a more balanced day.
          </h2>
        </div>

        {/* 3 Steps Cards Grid */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-3xl sm:rounded-[32px] p-4 sm:p-5 border border-zinc-100 shadow-lg shadow-black/[0.03] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
            >
              <div>
                {/* Image Container with Rounded Corners */}
                <div className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-[22px] overflow-hidden bg-zinc-100">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Card Content */}
                <div className="pt-5 sm:pt-6 px-1.5 pb-2">
                  {/* Step Number Tag */}
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#fcf2b6] text-[#0e3c2f] font-bold text-xs sm:text-[13px] font-sans">
                    {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#0e3c2f] tracking-tight mt-3 font-sans">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-sm sm:text-[15px] text-[#0e3c2f]/80 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StepsSection;
