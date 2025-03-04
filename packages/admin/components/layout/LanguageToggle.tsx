'use client';

import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center justify-center p-2 rounded-md text-white hover:bg-sa-700 transition-colors"
      aria-label={`Switch to ${language === 'ar' ? 'English' : 'Arabic'}`}
    >
      <span className="text-sm font-medium">
        {language === 'ar' ? 'English' : 'العربية'}
      </span>
    </button>
  );
};

export default LanguageToggle;