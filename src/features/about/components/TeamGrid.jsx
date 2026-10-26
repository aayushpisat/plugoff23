import React from 'react';

const TEAM_MEMBERS = [
  {
    name: 'Aanya Mehta',
    role: 'CO-FOUNDER',
    image: '/assets/team_aanya.jpg',
    bio: 'Passionate about understanding children and families. She brings a background in education and a deep interest in child development, believing in practical, real-world solutions for modern families.'
  },
  {
    name: 'Rohan Kapoor',
    role: 'CO-FOUNDER',
    image: '/assets/team_rohan.jpg',
    bio: 'Focused on turning ideas into simple, thoughtful tools that make offline connection easier for families. He comes from a background in design and technology, and loves building products that create meaningful change in everyday life.'
  }
];

export const TeamGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10 items-stretch">
      {TEAM_MEMBERS.map((member) => (
        <div
          key={member.name}
          className="bg-white text-[#073c2d] rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 lg:p-7 border-[2.5px] border-[#f8d468] shadow-sm flex flex-col sm:flex-row items-stretch gap-6 sm:gap-7 select-none transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          {/* Portrait Photo */}
          <div className="w-full sm:w-[46%] lg:w-[48%] flex-shrink-0 aspect-[4/5] sm:aspect-auto rounded-2xl overflow-hidden bg-zinc-100">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* Member Information */}
          <div className="flex-1 flex flex-col justify-start py-1 sm:py-2 text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-[28px] font-black text-[#073c2d] tracking-tight leading-tight font-sans">
              {member.name}
            </h3>
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#073c2d]/75 uppercase mt-1 sm:mt-1.5 font-sans">
              {member.role}
            </span>
            <p className="text-sm sm:text-[15px] lg:text-[15.5px] text-[#073c2d]/90 leading-[1.65] font-normal mt-4 sm:mt-5 font-sans">
              {member.bio}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamGrid;
