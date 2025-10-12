import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const FrenchFlag = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" className="rounded-full">
    {/* Fond circulaire */}
    <circle cx="12" cy="12" r="12" fill="#f0f0f0"/>
    
    {/* Masque circulaire */}
    <defs>
      <clipPath id="frenchFlagClip">
        <circle cx="12" cy="12" r="11"/>
      </clipPath>
    </defs>
    
    {/* Drapeau français */}
    <g clipPath="url(#frenchFlagClip)">
      <rect x="0" y="0" width="8" height="24" fill="#0052CC"/>
      <rect x="8" y="0" width="8" height="24" fill="#FFFFFF"/>
      <rect x="16" y="0" width="8" height="24" fill="#CE1126"/>
    </g>
  </svg>
);

const BritishFlag = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" className="rounded-full">
    <circle cx="12" cy="12" r="12" fill="#012169"/>
    <g clipPath="url(#clip)">
      <path d="M0 0h24v24H0z" fill="#012169"/>
      <path d="m0 0 24 24M24 0 0 24" stroke="#fff" strokeWidth="2.67"/>
      <path d="m0 0 24 24M24 0 0 24" stroke="#C8102E" strokeWidth="1.6"/>
      <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="4"/>
      <path d="M12 0v24M0 12h24" stroke="#C8102E" strokeWidth="2.4"/>
    </g>
    <defs>
      <clipPath id="clip">
        <circle cx="12" cy="12" r="12"/>
      </clipPath>
    </defs>
  </svg>
);

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 md:space-x-2 bg-white border-2 border-gray-300 rounded-full p-1 md:p-2 shadow-md">
      <button
        onClick={() => setLanguage('fr')}
        className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
          language === 'fr'
            ? 'bg-papio-500 text-white shadow-md'
            : 'text-gray-600 hover:text-gray-800 hover:bg-white'
        }`}
        aria-label="Français"
      >
        <div className="w-4 h-4 md:w-6 md:h-6">
          <FrenchFlag />
        </div>
        <span className="text-xs md:text-sm font-medium hidden sm:inline">FR</span>
      </button>
      
      <button
        onClick={() => setLanguage('en')}
        className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-papio-500 text-white shadow-md'
            : 'text-gray-600 hover:text-gray-800 hover:bg-white'
        }`}
        aria-label="English"
      >
        <div className="w-4 h-4 md:w-6 md:h-6">
          <BritishFlag />
        </div>
        <span className="text-xs md:text-sm font-medium hidden sm:inline">EN</span>
      </button>
    </div>
  );
};

export default LanguageSelector;