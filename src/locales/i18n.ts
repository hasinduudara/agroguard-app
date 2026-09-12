import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './en.json';
import si from './si.json';

const resources = {
  en: { translation: en },
  si: { translation: si }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'si', // Default language is Sinhala
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;