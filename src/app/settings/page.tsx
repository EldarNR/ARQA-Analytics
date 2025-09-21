'use client';

// libraries
import { useTranslation } from 'react-i18next';

import { useTheme } from 'next-themes';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { i18n, t } = useTranslation('common');

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t('settings.title')}</h1>

      {/* Переключатель темы */}
      <div className="flex items-center gap-4 mb-6">
        <span>{t('settings.theme')}:</span>
        <button
          className="px-3 py-1 border rounded"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {t('settings.switchTheme', { theme: theme === 'light' ? 'Dark' : 'Light' })}
        </button>
      </div>

      <div className="flex items-center gap-4">
        <span>{t('settings.language')}:</span>
        <button className="px-3 py-1 border rounded" onClick={() => changeLanguage('en')}>
          English
        </button>
        <button className="px-3 py-1 border rounded" onClick={() => changeLanguage('ru')}>
          Русский
        </button>
      </div>
    </div>
  );
};

export default Settings;
