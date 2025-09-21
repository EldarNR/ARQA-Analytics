My Next.js App

Это современное приложение, созданное на базе [Next.js](https://nextjs.org/), с поддержкой SCSS и возможностью
автоматического деплоя через CI/CD.

Быстрый старт

1. Установка зависимостей
   npm install или yarn install
2. Запуск в режиме разработки
   npm run dev
3. Сборка для продакшена
   npm run build
4. Запуск продакшн-сборки
   npm run start

Используемые технологии Next.js(App Router), TypeScript, Tantask Querya, Tailwind / shadcn/ui, Chart.js, Jest, ESLint +
Prettie, I18n, CI/CD

Структура проекта (Компонентный)

src/ ├── app/ # Основное приложение (роутинг, главные компоненты) ├── assets/ # Ресурсы приложения (иконки, изображения,
стили, локализация) ├── components/ # UI - Компоненты ├── helpers/ # Вспомогательные утилиты и функции ├── hooks/ #
Кастомные React хуки и Tantask Query ├── lib/ # Внешние библиотеки и их конфигурация ├── providers/ # React провайдеры (
контексты) ├── server/ # Серверная логика (API routes, серверные функции) ├── style/ # Глобальные стили и темы ├──
tests_/ # Тесты
