# 🦅 NIP.SYS — Personal Portfolio

Персональный сайт-портфолио **Никиты Ип** — веб-разработчика из Белграда.

![Static Badge](https://img.shields.io/badge/HTML-Core-e8d84a?style=flat-square)
![Static Badge](https://img.shields.io/badge/CSS-Core-e8d84a?style=flat-square)
![Static Badge](https://img.shields.io/badge/JavaScript-Vanilla-e8d84a?style=flat-square)
![Static Badge](https://img.shields.io/badge/No_Framework-Pure_Code-555?style=flat-square)

---

## 📁 Структура проекта

```
nip-sys/
├── index.html       # Разметка страницы
├── style.css        # Стили, переменные, анимации
├── script.js        # Логика: часы, тема, typewriter, гостевая книга
├── image/
│   └── изображение-Photoroom.png  # Аватар / герб
└── README.md
```

---

## ✨ Фичи

- **Dark / Light тема** — переключается кнопкой, сохраняется в `localStorage`
- **Живые часы** — обновляются каждую секунду в реальном времени
- **Typewriter-эффект** — имя печатается при загрузке страницы
- **Skill bars** — анимируются при попадании карточки в viewport (IntersectionObserver)
- **Гостевая книга** — сообщения сохраняются в `localStorage`, без бэкенда
- **Загрузка аватара** — клик по гербу открывает выбор файла
- **Noise-текстура** — тонкая зернистость фона через inline SVG-фильтр
- **Staggered-анимация** — карточки появляются последовательно при загрузке
- **Адаптив** — корректно отображается на мобильных устройствах

---

## 🚀 Запуск

Просто открой `index.html` в браузере — никакой сборки не нужно.

Или через Live Server в VS Code:

```
Правой кнопкой по index.html → Open with Live Server
```

Для деплоя на GitHub Pages:

```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

Затем в Settings репозитория → Pages → Source: `main / root`.

---

## 🎨 Дизайн-система

Все цвета вынесены в CSS-переменные в `:root`. Переключение темы меняет только значения переменных.

| Переменная | Dark | Light |
|---|---|---|
| `--bg` | `#0a0a09` | `#f2f0ea` |
| `--bg-card` | `#111110` | `#fafaf7` |
| `--accent` | `#e8d84a` | `#c49a00` |
| `--text` | `#ede8df` | `#18180f` |
| `--text-muted` | `#7a7872` | `#777068` |

**Шрифты:**
- `Syne 800` — заголовки
- `DM Mono` — основной текст, монотипные элементы

---

## 🧩 Секции

| Секция | Описание |
|---|---|
| **Профиль** | Имя, бейджи, ссылки на Telegram и GitHub |
| **Стек и обучение** | Skill bars с анимацией по скроллу |
| **Проекты** | Ссылки на задеплоенные работы |
| **Инфраструктура** | Рабочие инструменты и устройства |
| **Гостевая книга** | Форма для сообщений с локальным хранением |

---

## 📦 Зависимости

Внешних зависимостей нет. Только Google Fonts через CDN:

```html
https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@600;700;800
```

---

## 📄 Лицензия

Personal project — all rights reserved © Nikita Ip