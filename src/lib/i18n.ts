import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enCommon from '../../public/locales/en/common.json';
import roCommon from '../../public/locales/ro/common.json';
import enLessons from '../../public/locales/en/lessons.json';
import roLessons from '../../public/locales/ro/lessons.json';

const resources = {
  en: {
    common: enCommon,
    lessons: enLessons,
  },
  ro: {
    common: roCommon,
    lessons: roLessons,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || 'en' : 'en',
    fallbackLng: 'en',
    ns: ['common', 'lessons'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
