import React from 'react';
import { TECHNOLOGIES } from '../constants';

const TechnologyTicker: React.FC = () => {
  const tickerItems = TECHNOLOGIES.map((tech, i) => (
    <li key={i} className="group flex-shrink-0 flex items-center gap-3 text-gray-600 text-base font-medium whitespace-nowrap mx-7 transition-colors hover:text-brand-orange">
      <div className="w-7 h-7 flex justify-center items-center">{tech.icon}</div>
      <span>{tech.name}</span>
    </li>
  ));

  return (
    <div className="w-full">
      <p className="text-center text-gray-400 mb-6 text-xs font-semibold tracking-[0.2em] uppercase">
        Technologies we master
      </p>
      <div className="relative w-full overflow-hidden py-4">
        <div className="flex animate-marquee">
          <ul className="flex-shrink-0 flex items-center">
            {tickerItems}
          </ul>
          <ul className="flex-shrink-0 flex items-center" aria-hidden="true">
            {TECHNOLOGIES.map((tech, i) => (
              <li key={i + TECHNOLOGIES.length} className="group flex-shrink-0 flex items-center gap-3 text-gray-600 text-base font-medium whitespace-nowrap mx-7 transition-colors hover:text-brand-orange">
                <div className="w-7 h-7 flex justify-center items-center">{tech.icon}</div>
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
