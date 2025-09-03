'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: t('language.english') },
    { code: 'ro', name: t('language.romanian') },
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <span className="text-sm font-medium">
          {languages.find(lang => lang.code === i18n.language)?.name || 'English'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-32 bg-popover border border-border rounded-md shadow-lg z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          {languages.map((lang, index) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-muted transition-all duration-200 hover:translate-x-1 ${
                i18n.language === lang.code ? 'bg-muted font-medium translate-x-1' : ''
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
