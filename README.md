My Next.js App

Это современное приложение, созданное на базе [Next.js](https://nextjs.org/), с поддержкой SCSS и возможностью автоматического деплоя через CI/CD.

Быстрый старт

1. Установка зависимостей
npm install или yarn install
2. Запуск в режиме разработки
npm run dev
3. Сборка для продакшена
npm run build
4. Запуск продакшн-сборки
npm run start

Используемые технологии
Next.js, TypeScript, Axios, React-Query, Zustand, SCSS, CI/CD

CI/CD
Автоматический деплой выполняется при каждом пуше в main-ветку с помощью GitHub Actions.
Структура проекта (Компонентный)
<div>
my-app/
├── src/
|   ├── api/          # Запросы
│   ├── app/          # layout.tsx
│   ├── assets/       # Медиа файлы
│   ├── pages/        # Страницы Next.js
│   ├── components/   # Переиспользуемые компоненты
│   ├── store/        # Стейт менеджер
│   ├── provider/     # Обертка для React Query
│   └── style/        # SCSS стили
├── public/           # Публичные ассеты
├── .github/          # CI/CD workflows
├── package.json
└── README.md
</div>

