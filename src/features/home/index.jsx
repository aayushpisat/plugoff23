import React from 'react';
import { Hero } from './components/Hero.jsx';
import { UnplugSection } from './components/UnplugSection.jsx';
import { DifferentDaySection } from './components/DifferentDaySection.jsx';
import { StepsSection } from './components/StepsSection.jsx';
import { JournalSection } from './components/JournalSection.jsx';
import { FaqSection } from './components/FaqSection.jsx';

export const Home = ({ navigate }) => {
  return (
    <div className="w-full">
      <Hero navigate={navigate} />
      <UnplugSection />
      <DifferentDaySection />
      <StepsSection />
      <JournalSection />
      <FaqSection />
    </div>
  );
};

export default Home;
