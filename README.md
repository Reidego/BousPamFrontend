<h1 align="center">Клиентская часть проекта Bous Pam</h1>

<h2 align="center">Технологии</h2>

1. React: Основной фреймворк для построения пользовательского интерфейса.

2. NextJS: Для серверной развертке
   
4. TypeScript: Используется для статической типизации.

5. Ant Design: библиотека компонентов для пользовательского интерфейса.

6. Tailwind CSS: Для стилизации компонентов.

7. Zustand: Стейт менеджер используемый в проекте


<h2 align="center">Запуск проекта локально</h2>

1. Клонировать репозиторий: `git clone https://github.com/Reidego/BousPamFrontend.git`

2. Установить yarn 
  
3. Установить все необходимые библиотеки и фреймворки: `yarn install`/ `npm install`

4. Перейти в работчую директориию: `cd BousPamFrontend\bousPam`

5. Запустить приложение: `yarn dev`/ `npm run dev`


<h2 align="center">Запуск проекта с помощью контейнеризации</h2>

1. Клонировать репозиторий: `git clone https://github.com/Reidego/BousPamFrontend.git`

2. Перейти в работчую директориию: `cd bousPam`

3. Билд контейнера `docker build -t bouspam-frontend .`

4. Запустить контейнера: `docker run -p 3000:3000 bouspam-frontend`

<h2 align="start">Структура проекта</h2>

BousPamFrontend/
├── package.json
├── README.md
├── bousPam/
│   ├── .env
│   ├── .gitignore
│   ├── .prettierignore
│   ├── .prettierrc
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── store/
│   │   └── utils/
│   └── .next/

<h2 align="start">Основные компоненты</h>
<p>
   
1. Терминалы

Файл: src/app/terminals/page.tsx

* Управление терминалами.
* Создание новых терминалов.
* Поиск терминалов по названию компании.

2. Кассиры

Файл: src/app/cashiers/page.tsx

* Управление кассирами.
* Создание новых кассиров.
* Поиск кассиров по имени.

3. Пассажиры

Файл: src/app/passengers/page.tsx

* Управление пассажирами.
* Создание новых пассажиров.
* Пополнение баланса пассажиров.

4. Транспортные компании

Файл: src/app/transportCompanies/page.tsx

* Управление транспортными компаниями.
* Создание новых компаний.
* Поиск компаний по названию.

5. Маршруты

Файл: src/utils/api/routes.ts

* Получение списка маршрутов.
* Создание новых маршрутов.
</p>
