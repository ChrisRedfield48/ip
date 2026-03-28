# NIP.SYS — Personal OS Dashboard

```
███╗   ██╗██╗██████╗     ███████╗██╗   ██╗███████╗
████╗  ██║██║██╔══██╗    ██╔════╝╚██╗ ██╔╝██╔════╝
██╔██╗ ██║██║██████╔╝    ███████╗ ╚████╔╝ ███████╗
██║╚██╗██║██║██╔═══╝     ╚════██║  ╚██╔╝  ╚════██║
██║ ╚████║██║██║         ███████║   ██║   ███████║
╚═╝  ╚═══╝╚═╝╚═╝         ╚══════╝   ╚═╝   ╚══════╝
                                              v2.0
```

> Персональный сайт-дашборд в стиле OS-интерфейса. Живёт в Белграде. Едет в Европу.

---

## ⚡ Превью

![NIP.SYS Dashboard](https://img.shields.io/badge/STATUS-ONLINE-4ae87a?style=flat-square&labelColor=0a0a08&color=4ae87a)
![Version](https://img.shields.io/badge/VERSION-2.0-e8d84a?style=flat-square&labelColor=0a0a08&color=e8d84a)
![Made with](https://img.shields.io/badge/STACK-HTML%2FCSS%2FJS-e8d84a?style=flat-square&labelColor=0a0a08)
![Location](https://img.shields.io/badge/LOCATION-BELGRADE%2C_RS-8a8880?style=flat-square&labelColor=0a0a08)

---

## 🗂 Структура

```
nip.sys/
├── index.html          # Разметка — bento-grid dashboard
├── style2.css          # Все стили + low-perf режим
├── script2.js          # JS логика, AI-чат, гостевая книга
├── reset3.css          # CSS reset
└── 2026-02-16 04.04.38.jpg   # Фото профиля
```

---

## 🧩 Блоки (Cards)

| Карточка | Описание |
|---|---|
| **PROFILE** | Имя, бейджи, ссылки на Telegram и GitHub |
| **UPTIME** | Время сессии + обратный отсчёт до академии |
| **WEATHER** | Реальная погода в Белграде (Open-Meteo API) |
| **SKILLS** | Стек с анимированными прогресс-барами |
| **QUESTS** | Текущие и запланированные цели |
| **TERMINAL** | Интерактивный терминал со своими командами |
| **MOOD** | Переключатель режимов дня |
| **HARDWARE** | Список железа |
| **PROJECTS** | Карточки с ссылками на проекты |
| **AI MODULE** | Симуляция обучения нейросети |
| **STATS** | Прогресс трансфера в академию |
| **AI.CLONE** | 🆕 AI-чат с цифровой копией Никиты (Claude API) |
| **GUEST.LOG** | 🆕 Гостевая книга с persistent storage |

---

## 🤖 AI.CLONE

Блок использует **Claude claude-sonnet-4-20250514** для имитации общения с автором сайта.

- Знает контекст: стек, проекты, цели, Белград
- Multi-turn диалог — помнит историю разговора
- Отвечает на русском и английском
- Работает через `fetch` к Anthropic API

> ⚠️ Для работы требуется подключение к `api.anthropic.com`. Ключ проксируется автоматически при деплое через claude.ai.

---

## 📖 GUEST.LOG

Гостевая книга с сохранением записей в `localStorage`.

- Поля: позывной, город, сообщение (до 280 символов)
- Счётчик символов в реальном времени
- Записи отображаются в обратном хронологическом порядке
- Данные хранятся в браузере посетителя

---

## 🖥 Терминал — команды

```bash
help       # Список всех команд
status     # Текущий уровень навыков
skills     # Визуальный стек в ASCII
projects   # Список проектов со ссылками
about      # Краткая информация об авторе
clear      # Очистить терминал
matrix     # 👾 Easter egg
quote      # Случайная цитата
advice     # Случайный совет (adviceslip API)
danya      # 🔒 ACCESS DENIED
```

**Easter egg:** напечатай `virus` на клавиатуре в любом месте сайта.

---

## ⚙️ Performance

Сайт автоматически определяет слабое железо и переключается в **low-perf режим**:

```
Проверки:
├── prefers-reduced-motion  → системная настройка
├── deviceMemory ≤ 4GB      → низкая RAM
├── backdrop-filter support → старый браузер
├── мобильное устройство    → touch-девайс
└── FPS бенчмарк < 40fps   → реальная скорость
```

**В low-perf отключается:**
- Кастомный курсор (rAF loop)
- `backdrop-filter: blur` на хедере
- Глитч-анимации и сканлайн
- Grain-текстура фона
- Тяжёлые hover box-shadows

AI-модуль автоматически останавливается когда вкладка не активна (`document.hidden`).

---

## 🌐 API

| API | Назначение | Fallback |
|---|---|---|
| [Open-Meteo](https://open-meteo.com) | Погода в Белграде | Климатическая симуляция |
| [AdviceSlip](https://api.adviceslip.com) | Команда `advice` в терминале | Сообщение об ошибке |
| [Anthropic](https://anthropic.com) | AI.CLONE чат | — |

---

## 🗓 Roadmap

- [x] Bento-grid дашборд
- [x] Интерактивный терминал
- [x] Реальная погода
- [x] AI.CLONE — чат с цифровой копией
- [x] GUEST.LOG — гостевая книга
- [x] Performance-детектор
- [ ] GitHub активность (contributions graph)
- [ ] Spotify Now Playing
- [ ] Полноценный бэкенд для гостевой книги

---

## 🛠 Деплой

```bash
git clone https://github.com/ChrisRedfield48/ВАШ-РЕПО.git
cd ВАШ-РЕПО

# Просто открой index.html в браузере
# Или залей на GitHub Pages — работает из коробки
```

Никаких сборщиков, зависимостей и `npm install`. Чистый HTML/CSS/JS.

---

## 👤 Автор

**Никита Ип** — Web Developer, Белград 🇷🇸

[![Telegram](https://img.shields.io/badge/TELEGRAM-2CA5E0?style=flat-square&logo=telegram&logoColor=white)](https://t.me/+QpzXesYhdSs1Mzcy)
[![GitHub](https://img.shields.io/badge/GITHUB-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/ChrisRedfield48)

---

<div align="center">
  <sub>© 2026 NIP.SYS · НИКИТА ИП · BELGRADE, RS</sub>
</div>
