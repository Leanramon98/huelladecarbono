'use client';

import React from 'react';
import { useLanguage, Language } from '@/lib/store/useLanguage';
import { motion } from 'framer-motion';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage(lang.code)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            language === lang.code
              ? 'bg-forest-500 text-white shadow-lg'
              : 'text-forest-900 hover:bg-forest-100'
          }`}
        >
          <span className="text-base">{lang.flag}</span>
          <span className="hidden sm:inline">{lang.label}</span>
        </motion.button>
      ))}
    </div>
  );
};
