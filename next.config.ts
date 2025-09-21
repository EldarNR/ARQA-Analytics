import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compilerOptions: {
    baseUrl: 'src',
    paths: {
      '@/*': ['*'],
    },
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'ru'],
    },
  },
};

export default nextConfig;
