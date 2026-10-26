import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

/**
 * Section 6: FAQ Section - "Good questions. Honest answers."
 * 
 * Editorial book-spread aesthetic with warm yellow background,
 * subtle book spine crease, and interactive 6-item accordion.
 */
export const FaqSection = () => {
  // Item 0 is open by default as shown in the reference
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      id: '01',
      question: 'What exactly is Plugoff?',
      answer:
        'Plugoff is a parent-focused program that helps families build healthier relationships with screens. Through practical tools, engaging activities and expert guidance, it encourages more curiosity, creativity and real-world connection in everyday life.',
    },
    {
      id: '02',
      question: 'Is Plugoff about taking screens away?',
      answer:
        'Not at all. Plugoff isn’t about total elimination or demonizing technology. It’s about intentionality—reducing aimless, fragmented screen checking and replacing it with high-value offline rituals so screens serve a purposeful role rather than consuming the day.',
    },
    {
      id: '03',
      question: 'Who is this for?',
      answer:
        'Plugoff is designed for parents with children aged 4 to 14 who notice friction around screen transitions, shorter attention spans, or difficulty finding offline engagement. It adapts whether your family needs a gentle routine reset or a comprehensive digital balance plan.',
    },
    {
      id: '04',
      question: 'What will my child actually do?',
      answer:
        'Children engage in hands-on creative experiments, outdoor missions, reading journeys, and collaborative family challenges. They use physical tracker charts, activity cards, and tangible rewards that make off-screen time intrinsically satisfying.',
    },
    {
      id: '05',
      question: 'How is it delivered?',
      answer:
        'The program combines physical toolkits delivered directly to your door (activity boxes, routine boards, visual cue jars) with weekly parent coaching modules, downloadable companion guides, and audio adventures for kids.',
    },
    {
      id: '06',
      question: 'Do I need to be involved throughout?',
      answer:
        'In the first 7 to 10 days, parent co-involvement is key to establishing simple household friction rules and positive visual cues. Once the rhythms take hold, children naturally develop self-directed off-screen agency with minimal parental management.',
    },
  ];

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative w-full bg-[#faea9c] py-20 sm:py-24 lg:py-32 text-left selection:bg-[#0e3c2f] selection:text-[#faea9c]"
      style={{ backgroundColor: '#faea9c' }}
      aria-label="Frequently Asked Questions"
    >
      {/* Editorial Book Spine Shadow (Visible on desktop) */}
      <div
        className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-20 -translate-x-1/2 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(0, 0, 0, 0.05) 50%, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Headings & Subtitle (Left Page) */}
          <div className="lg:col-span-5 text-left lg:sticky lg:top-28">
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#0e3c2f] uppercase block mb-6 sm:mb-10 font-sans">
              FAQS
            </span>

            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-black tracking-[-0.04em] text-[#0e3c2f] leading-[0.94] font-sans">
              <span className="block">Good</span>
              <span className="block">questions.</span>
              <span className="block">Honest</span>
              <span className="block">answers.</span>
            </h2>

            <p className="mt-7 sm:mt-9 text-base sm:text-lg text-[#0e3c2f]/85 font-normal leading-relaxed max-w-sm">
              Everything parents want to know before choosing Plugoff.
            </p>
          </div>

          {/* RIGHT COLUMN: 6 Interactive FAQ Accordion Rows (Right Page) */}
          <div className="lg:col-span-7 lg:pl-4">
            <div className="divide-y divide-[#0e3c2f]/20 border-b border-[#0e3c2f]/20">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={faq.id}
                    className="py-5 sm:py-6 transition-colors duration-150"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(index)}
                      className="w-full flex items-start justify-between gap-4 text-left cursor-pointer group focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      {/* Step Number + Question Title */}
                      <div className="flex items-start gap-4 sm:gap-6 flex-1">
                        <span className="text-xs sm:text-[13px] font-bold text-[#0e3c2f] font-mono pt-1 flex-shrink-0 w-6">
                          {faq.id}
                        </span>
                        <h3 className="text-lg sm:text-xl lg:text-[22px] font-black text-[#0e3c2f] tracking-tight leading-snug font-sans group-hover:text-[#092a20] transition-colors">
                          {faq.question}
                        </h3>
                      </div>

                      {/* Circular Toggle Icon */}
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#0e3c2f] flex items-center justify-center text-[#0e3c2f] flex-shrink-0 mt-0.5 group-hover:bg-[#0e3c2f] group-hover:text-[#faea9c] transition-colors duration-150">
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                        )}
                      </div>
                    </button>

                    {/* Answer Collapsible Section */}
                    {isOpen && (
                      <div className="pl-10 sm:pl-12 pt-3 pb-2 animate-fadeIn">
                        <p className="text-sm sm:text-base text-[#0e3c2f]/85 font-normal leading-relaxed max-w-xl">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FaqSection;
