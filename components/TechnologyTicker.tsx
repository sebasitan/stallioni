import React from 'react';
import { TECHNOLOGIES } from '../constants';

const TechnologyTicker: React.FC = () => {
  const tickerItems = TECHNOLOGIES.map((tech, i) => (
      <li key={i} className="group flex-shrink-0 flex items-center space-x-4 text-slate-300 text-lg font-medium whitespace-nowrap mx-8 transition-colors duration-300 hover:text-white">
          <div className="w-8 h-8 flex justify-center items-center">{tech.icon}</div>
          <span>{tech.name}</span>
      </li>
  ));

  return (
    <div className="w-full">
      <p className="text-center text-slate-400 mb-4 text-sm font-bold tracking-widest uppercase">
        Technologies We Master
      </p>
      <div className="relative w-full overflow-hidden py-4">
        {/* Fading Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-dark to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-dark to-transparent z-10" />

        <div className="flex animate-marquee">
          <ul className="flex-shrink-0 flex items-center">
            {tickerItems}
          </ul>
          {/* Duplicate for seamless loop */}
          <ul className="flex-shrink-0 flex items-center" aria-hidden="true">
             {TECHNOLOGIES.map((tech, i) => (
                <li key={i + TECHNOLOGIES.length} className="group flex-shrink-0 flex items-center space-x-4 text-slate-300 text-lg font-medium whitespace-nowrap mx-8 transition-colors duration-300 hover:text-white">
                    <div className="w-8 h-8 flex justify-center items-center">{tech.icon}</div>
                    <span>{tech.name}</span>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TechnologyTicker;
