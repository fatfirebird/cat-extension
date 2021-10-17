# Creative Integrator Extension

## In the development

Используется 12 версия ноды, в корне проекта лежит файл .nvmrc с указанием ее версии.
Порядок команд следующий:
1. В корне проекта `nvm use` - для того, чтобы использовать корректную версию ноды. ВАЖНО, на других версиях проект не запустится.
2. Установить зависимости `yarn`
3. После установки зависимостей нужно создать файл `.env.local` и вставить в него следующее:

```
REACT_APP_TMETRIC_TOKEN='askdhakjsdhjk'
REACT_APP_CLIENT_ID='80841848369-k971484rn8vho1qtke4k2bfccg5o0tto.apps.googleusercontent.com'
REACT_APP_CLIENT_SECRET='OOH4I9kFt1gmF060bm0gt7df'
REACT_APP_BACKEND_URL='https://api.integration-hub.localhost'
```

Команды:

### `yarn dev`

Собирает тестовый бандл в папку `/build`, который необходимо загрузить в том виде, что оно есть.

### `yarn build`

Прод сборка не проверялась....

### `Published application`
После публикации в магазине, нужно проделать <a href="https://stackoverflow.com/questions/46883130/oauth2-using-identity-not-working-in-chrome-extension-when-deployed-in-webstore">следующие шаги</a>

## Map
```
.
├── extension                       # Файлы расширения, статика
│   ├── icons                       # Иконки
│   │── manifest.json               # manifest
│   │── manifest.json               # manifest
│   └── ...                         # Остальная статика
├── src                             # Код проекта
│   ├── background                  # Логика исполняемых в фоне событий.
│   ├── content_scripts             # Логика работы с window, внедрение кода на страницу.
│   ├── components                  # Реакт компоненты
│   ├── views                       # Экраны попапа расширения
│   ├── store                       # Mobx хранилище
│   ├── types                       # Описание типов
│   ├── typings                     # Глобальные типы
│   ├── service                     # Методы для работы с api
│   ├── utils                       # Уилиты для работы с кодом
│   └── ...                         # Хранение статики
├── webpack                         # Вебпак конфиги
├── .env                            # Конфигурация
├── tsconfig.json                   # TSconfig конфигурация
├── webpack.config.js               # Webpack основная конфигурация
└── postcss.config.js               # PostCSS конфигурация
```
