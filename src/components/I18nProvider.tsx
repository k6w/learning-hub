'use client';

import { I18nextProvider } from 'react-i18next';
import { useEffect } from 'react';
import i18n from '@/lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      document.documentElement.lang = lng;
    };

    i18n.on('languageChanged', handleLanguageChange);

    // Set initial language
    document.documentElement.lang = i18n.language;

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
