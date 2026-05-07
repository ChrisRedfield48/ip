```
╔═══════════════════════════════════════════════════════════════════════╗
║                                                                       ║
║    ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓        ║
║                                                                       ║
║        ███╗   ██╗██╗██████╗     ███████╗██╗   ██╗███████╗            ║
║        ████╗  ██║██║██╔══██╗    ██╔════╝╚██╗ ██╔╝██╔════╝            ║
║        ██╔██╗ ██║██║██████╔╝    ███████╗ ╚████╔╝ ███████╗            ║
║        ██║╚██╗██║██║██╔═══╝     ╚════██║  ╚██╔╝  ╚════██║            ║
║        ██║ ╚████║██║██║         ███████║   ██║   ███████║            ║
║        ╚═╝  ╚═══╝╚═╝╚═╝         ╚══════╝   ╚═╝   ╚══════╝            ║
║                                                                       ║
║               P O R T F O L I O   ·   v 3 . 0   ·   2026            ║
║                                                                       ║
║    ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓        ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
```

<div align="center">

[![Live](https://img.shields.io/badge/▶_LIVE-chrisredfield48.github.io-cc0000?style=for-the-badge&labelColor=0d0000)](https://chrisredfield48.github.io)
&nbsp;
[![HTML](https://img.shields.io/badge/HTML5-ff2222?style=for-the-badge&logo=html5&logoColor=white)](/)
[![CSS](https://img.shields.io/badge/CSS3-cc1111?style=for-the-badge&logo=css3&logoColor=white)](/)
[![JS](https://img.shields.io/badge/JavaScript-ff4444?style=for-the-badge&logo=javascript&logoColor=white)](/)
[![Three.js](https://img.shields.io/badge/Three.js-880000?style=for-the-badge&logo=three.js&logoColor=white)](/)

</div>

---

## 🔴 Концепция

> *Тёмный глянец. Как Apple — но мрачнее.*

Одностраничное портфолио с WebGL-фоном, кастомным курсором и плавной якорной навигацией. Никаких фреймворков — только чистый HTML, CSS и JavaScript.

```
RU / EN  ·  One Page  ·  WebGL  ·  Custom Cursor  ·  Bilingual
```

---

## 🗂 Файл

```
index.html   ←  всё здесь. один файл. никаких зависимостей.
```

---

## 🎨 Дизайн-система

```
┌──────────────────────┬───────────────────────────────────────┐
│ Переменная           │ Значение                              │
├──────────────────────┼───────────────────────────────────────┤
│ --bg                 │ #050507   ██ почти чёрный             │
│ --accent             │ #6c63ff   ██ фиолетовый               │
│ --accent2            │ #9d6eff   ██ светло-фиолетовый         │
│ --blue               │ #3d9eff   ██ синий                     │
│ --green              │ #4fffb0   ·· статус онлайн             │
│ --text               │ #f0eeff   ░░ тёплый белый              │
├──────────────────────┼───────────────────────────────────────┤
│ Display              │ Syne — 800 weight, tight tracking      │
│ Monospace            │ JetBrains Mono — UI, labels, code      │
└──────────────────────┴───────────────────────────────────────┘
```

---

## 🧩 Секции

```
┌─────────────────────────────────────────────────────┐  ◀
│  NAV  ·  logo  ·  links  ·  RU/EN  ·  dot-nav       │  ◀
├─────────────────────────────────────────────────────┤  ◀
│                                                     │
│  01  HERO        заголовок · desc · CTA · stats     │
│                                                     │
│  02  PROJECTS    grid · preview · filter            │
│                                                     │
│  03  SKILLS      bars · roadmap · tools             │
│                                                     │
│  04  CONTACT     TG · GH · status block             │
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER  ·  © 2026  ·  ↑↑↓↓←→←→BA                  │
└─────────────────────────────────────────────────────┘
```

---

## ✨ Фичи

**⬛ WebGL (Three.js r128)**
1800 частиц в цветах акцента с аддитивным blending.
Реагируют на движение мыши. Под ними — перспективная сетка.

**⬛ Кастомный курсор**
Точка + кольцо с инерцией. Mix-blend-mode: screen.
На мобиле автоматически отключается.

**⬛ Reveal-анимации**
IntersectionObserver — каждая секция появляется при скролле.
Skill bars анимируются когда входят в viewport.

**⬛ Dot-навигация**
Боковые точки обновляются при скролле.
Клик — плавный скролл к секции.

**⬛ RU / EN**
Переключатель в навигации. Без перезагрузки страницы.

**⬛ Projects Grid**
Фильтр по категориям. Превью проектов.
Hover glow следит за позицией мыши (CSS custom properties).

**⬛ Easter Egg**
```
↑ ↑ ↓ ↓ ← → ← → B A
```

---

## 🔺 Проекты

| # | Название | Стек | Статус |
|---|----------|------|--------|
| 01 | NIP.SYS v2 | HTML · CSS · JS | 🔴 live |
| 02 | Projects Hub | HTML · CSS · JS | 🔴 live |
| 03 | Graphic Designer | HTML · CSS | 🔴 live |
| 04 | Cyberpunk Promo | HTML · CSS · JS | 🔴 live |
| 05 | Zodiac Calculator | JavaScript | 🔴 live |
| 06 | Birthday Search | JavaScript | 🔴 live |
| 07 | Python Path | HTML · CSS · Python | 🔴 live |
| 08 | Createx UI | HTML · CSS | 🔴 live |

---

## 🛣 Roadmap

```
  ✓  HTML & CSS          — освоен
  →  JavaScript          — в процессе
  →  Python              — параллельно
  ○  React.js            — скоро
  ○  Node.js + Backend   — в планах
  ○  Переезд в Европу    — цель
```

---

## 💀 Easter Egg

Konami Code на клавиатуре — `↑↑↓↓←→←→BA` — инвертирует hue всего сайта.

---

<div align="center">

```
▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓

      © 2026  NIP.SYS  ·  CHRIS  ·  Russia → Belgrade

▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓
```

[![Telegram](https://img.shields.io/badge/Telegram-cc0000?style=flat-square&logo=telegram&logoColor=white)](https://t.me/+QpzXesYhdSs1Mzcy)
&nbsp;
[![GitHub](https://img.shields.io/badge/GitHub-880000?style=flat-square&logo=github&logoColor=white)](https://github.com/ChrisRedfield48)

</div>