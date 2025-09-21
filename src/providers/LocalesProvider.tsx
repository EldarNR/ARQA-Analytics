'use client';

// libraries
import { ReactNode, useEffect } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// locales
import en from '@/assets/locales/en.json';
import ru from '@/assets/locales/ru.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    ru: { common: ru },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export const LocalesProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const savedLang = localStorage.getItem('lang');

    if (savedLang) {
      i18n.changeLanguage(savedLang);

      return;
    }

    const browserLang = navigator.language.split('-')[0];

    if (['en', 'ru'].includes(browserLang)) {
      i18n.changeLanguage(browserLang);
      localStorage.setItem('lang', browserLang);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
