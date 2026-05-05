```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   ░█▀█░▀█▀░█▀█░░░█▀▀░█░█░█▀▀                                   ║
║   ░█░█░░█░░█▀▀░░░▀▀█░░█░░▀▀█                                   ║
║   ░▀░▀░▀▀▀░▀░░░░░▀▀▀░░▀░░▀▀▀                                   ║
║                                                                  ║
║   P O R T F O L I O  ·  v 3 . 0  ·  2 0 2 6                   ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

<div align="center">

**`nip.sys — portfolio v3.0`** &nbsp;·&nbsp; Web Developer &nbsp;·&nbsp; Russia → Belgrade

[![Live](https://img.shields.io/badge/LIVE-chrisredfield48.github.io-c8f050?style=flat-square&labelColor=0c0c0c)](https://chrisredfield48.github.io)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

</div>

---

## ⚡ О проекте

Портфолио в стиле **desktop OS** — с тайтлбаром, сайдбаром, панелями и терминальной эстетикой. Никаких фреймворков. Чистый HTML / CSS / JS.

```
_ Доступен к работе
_ Планирую трансфер в Европу
_ Open to Work
```

---

## 🗂 Структура

```
nip.sys/
├── index.html        ← разметка: titlebar, sidebar, панели
├── style.css         ← тема, сетка, анимации, mobile nav
├── script.js         ← логика: clock, scroll, GitHub API, reveal
├── reset3.css        ← сброс стилей
└── image/
    └── ...           ← аватар, favicon
```

---

## 🎨 Дизайн-система

```
┌─────────────────┬──────────────────────────────┐
│ Переменная      │ Значение                     │
├─────────────────┼──────────────────────────────┤
│ --bg            │ #0c0c0c   ░ почти чёрный     │
│ --panel         │ #111111   ░ поверхность       │
│ --accent        │ #c8f050   ▓ кислотный зелёный│
│ --text          │ #e8e4dc   ░ тёплый белый      │
│ --green         │ #50f0a0   · статус онлайн     │
│ --red           │ #ff5f5f   · кнопка закрыть    │
├─────────────────┼──────────────────────────────┤
│ Заголовки       │ Space Grotesk                │
│ Интерфейс       │ Space Mono                   │
└─────────────────┴──────────────────────────────┘
```

**Детали:**
- Scanlines через `repeating-linear-gradient` на `body::after`
- Scroll progress bar — 2px линия с `box-shadow` свечением
- Shield-аватар через `clip-path: polygon()`
- Все цвета в CSS-переменных — тема меняется в одном месте

---

## ⚙️ Как работает

### Лейаут
```
┌─────────────────────────────────────────┐
│  TITLEBAR  ·  clock  ·  status dot      │  38px
├──────────┬──────────────────────────────┤
│          │  hero                        │
│ SIDEBAR  │  stack | roadmap             │
│  avatar  │  projects                    │
│  nav     │  github | infra              │
│  TG / GH │  contacts                    │
│          │  footer                      │
└──────────┴──────────────────────────────┘
  260px      1fr
```

### Анимации при скролле
Панели появляются через `IntersectionObserver` с классом `.reveal → .visible`.
Соседние панели анимируются с задержкой 80ms — stagger-эффект.

### GitHub Stats
Живые данные с `api.github.com` — репозитории, подписчики, звёзды.
Цифры считаются анимацией от 0 до значения.

### Мобильный nav
На `≤ 640px` сайдбар схлопывается, внизу появляется фиксированный bottom bar с 6 пунктами и подсветкой активного раздела.

---

## 🗺 Секции

```
 01  Стек        — skill bars + terminal log
 02  Проекты     — список с тегами и ссылками
 03  Roadmap     — прогресс по технологиям
 04  GitHub      — live stats из API
 05  Инфра       — железо и окружение
 06  Контакты    — статус + TG / GH
```

---

## 🚀 Проекты на витрине

| # | Название | Стек | Ссылка |
|---|----------|------|--------|
| 01 | Graphic Designer | UI | [↗](https://chrisredfield48.github.io/graphic-designer/) |
| 02 | Cyberpunk Promo | Promo | [↗](https://chrisredfield48.github.io/Cyberpunk/) |
| 03 | Createx UI | UI Kit | [↗](https://chrisredfield48.github.io/Createx/) |
| 04 | Projects Hub | Hub | [↗](https://chrisredfield48.github.io/Projects/) |
| 05 | Python | Python | [↗](https://chrisredfield48.github.io/python/) |
| 06 | NIP.SYS v3 | Portfolio | [↗](https://chrisredfield48.github.io) |

---

## 🥚 Easter Eggs

```
↑ ↑ ↓ ↓ ← → ← → B A    ← попробуй на клавиатуре
```

---

<div align="center">

```
© 2026  NIP · SYS  ·  CHRIS  ·  RUSSIA → BELGRADE
```

[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=flat-square&logo=telegram&logoColor=white)](https://t.me/+QpzXesYhdSs1Mzcy)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/ChrisRedfield48)

</div>