# eldarmarketing.ru Layout Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Привести вёрстку eldarmarketing.ru к математически точной системе на токенах: 8pt baseline, modular typography, 12-колоночный grid, golden-ratio пропорции. Стиль editorial mono сохраняется.

**Architecture:** Vanilla CSS Custom Properties в одном файле `themes/minimal/static/css/style.css`. Все размеры выводятся из единого набора токенов. Hugo-шаблоны не меняются (только вынос inline-стилей в классы).

**Tech Stack:** Hugo, vanilla CSS, GT Eesti шрифт, нет сборщика.

**Spec:** `docs/superpowers/specs/2026-05-08-eldarmarketing-layout-refactor-design.md`

---

## Pre-flight — Запуск Hugo dev server

Перед всеми задачами один раз:

- [ ] **Запустить Hugo сервер в фоне для визуальных проверок**

Run:
```bash
cd ~/eldar-marketing-hugo && hugo server -D --port 1313 --bind 127.0.0.1 --disableFastRender
```

В отдельной вкладке держать открытым `http://localhost:1313/` и DevTools responsive mode.

**Тестовые viewport'ы для каждой задачи:** 360 / 390 / 768 / 1024 / 1440.

После каждой задачи — обновить страницу и пройтись глазами по соответствующей секции. Если визуально сломалось — откатить и перепроверить шаги.

---

## Task 1: Заменить блок токенов в :root

**Files:**
- Modify: `themes/minimal/static/css/style.css:13-52` (блоки `:root` и `html.dark`)

- [ ] **Step 1: Заменить блок `:root { ... }` на новую систему токенов**

Заменить строки 13-37 (старый `:root`) на:

```css
/* === DESIGN TOKENS === */
:root {
    /* Colors (без изменений) */
    --bg: #ffffff;
    --bg-alt: #fafafa;
    --bg-invert: #0a0a0a;
    --ink: #0a0a0a;
    --ink-2: #1a1a1a;
    --ink-3: #323232;
    --muted: #6b6b6b;
    --muted-2: #999999;
    --line: #e8e8e8;
    --line-2: #1a1a1a;
    --on-invert: #f5f5f5;
    --on-invert-muted: #a8a8a8;

    /* Spacing scale (8pt + φ на верхних ступенях) */
    --s-0: 4px;
    --s-1: 8px;
    --s-2: 16px;
    --s-3: 24px;
    --s-4: 40px;
    --s-5: 64px;
    --s-6: 104px;
    --s-7: 168px;

    /* Containers (golden ratio) */
    --container: 1240px;
    --reading: 768px;
    --narrow: 480px;
    --gutter: clamp(20px, 4vw, 32px);

    /* Typography scale (modular 1.250) */
    --t-xs: 13px;
    --t-sm: 15px;
    --t-base: 17px;
    --t-md: 21px;
    --t-lg: 27px;
    --t-xl: 34px;
    --t-2xl: 42px;
    --t-3xl: 54px;
    --t-4xl: 68px;
    --t-5xl: 86px;

    /* Section vertical rhythm */
    --section-pad-block: clamp(64px, 7vw, 104px);

    /* Grid */
    --grid-cols: 12;
    --grid-gap: var(--s-3);

    /* Fonts */
    --font-sans: 'GT Eesti', -apple-system, 'SF Pro Display', 'Helvetica Neue', system-ui, sans-serif;
    --font-mono: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;

    /* Transitions */
    --t-fast: 0.18s cubic-bezier(.4, 0, .2, 1);
    --t-med: 0.32s cubic-bezier(.4, 0, .2, 1);

    /* Breakpoints (для @media использовать px напрямую — JS не нужен) */
}

html.dark {
    --bg: #0a0a0a;
    --bg-alt: #131313;
    --bg-invert: #f5f5f5;
    --ink: #f5f5f5;
    --ink-2: #e8e8e8;
    --ink-3: #cfcfcf;
    --muted: #9a9a9a;
    --muted-2: #6b6b6b;
    --line: #232323;
    --line-2: #e8e8e8;
    --on-invert: #0a0a0a;
    --on-invert-muted: #4a4a4a;
}
```

- [ ] **Step 2: Проверить что Hugo пересобирается без ошибок**

Сервер должен автоматически пересобраться. Глянуть `http://localhost:1313/` — главная должна загрузиться. Визуально могут быть мелкие отклонения (старые правила всё ещё используют отдельные значения), но layout не должен ломаться, потому что новые токены не конфликтуют со старыми правилами.

- [ ] **Step 3: Commit**

```bash
cd ~/eldar-marketing-hugo
git add themes/minimal/static/css/style.css
git commit -m "refactor(css): новая система токенов — 8pt + φ + modular typography

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Базовый layout — body, контейнеры, .section

**Files:**
- Modify: `themes/minimal/static/css/style.css:60-104` (блок body / main / containers)

- [ ] **Step 1: Заменить блок body + контейнеры**

Заменить строки 60-104 (от `body {` до конца `.full-bleed`) на:

```css
/* === BODY === */
body {
    font-family: var(--font-sans);
    font-size: var(--t-base);
    line-height: 1.6;
    color: var(--ink);
    background: var(--bg);
    font-variant-numeric: tabular-nums;
    transition: background var(--t-med), color var(--t-med);
    overflow-x: hidden;
}

main {
    min-height: 60vh;
}

/* === CONTAINERS === */
.wide {
    max-width: var(--container);
    margin-inline: auto;
    padding-inline: var(--gutter);
}

.reading {
    max-width: var(--reading);
    margin-inline: auto;
    padding-inline: var(--gutter);
}

.narrow {
    max-width: var(--narrow);
    margin-inline: auto;
    padding-inline: var(--gutter);
}

.full-bleed {
    width: 100%;
    padding-inline: var(--gutter);
}

/* Reading column for content pages (services/about/single articles) */
.page-content,
main > article,
main > .markdown,
main > p,
main > h2:not(.section-title),
main > h3,
main > ul,
main > ol,
main > blockquote {
    max-width: var(--reading);
    margin-inline: auto;
    padding-inline: var(--gutter);
}

/* === SECTION (унифицированный ритм) === */
.section {
    max-width: var(--container);
    margin-inline: auto;
    padding-block: var(--section-pad-block);
    padding-inline: var(--gutter);
}

.section--invert {
    background: var(--bg-invert);
    color: var(--on-invert);
    max-width: none;
    padding-inline: 0;
}
.section--invert > * {
    max-width: var(--container);
    margin-inline: auto;
    padding-inline: var(--gutter);
}

/* Anchor offset под sticky header */
.section[id],
section[id] {
    scroll-margin-top: 96px;
}
```

- [ ] **Step 2: Найти и удалить старые правила .section**

Поиск:
```bash
grep -n "^\.section" ~/eldar-marketing-hugo/themes/minimal/static/css/style.css | head -30
```

Найти существующие правила `.section { ... }` и `.section--invert { ... }` ниже в файле и удалить их (чтобы не было дублей). Записать строки куда смотреть.

- [ ] **Step 3: Визуальная проверка**

Обновить `http://localhost:1313/`. Все секции должны иметь одинаковые большие отступы сверху и снизу (примерно 100px на desktop, 64px на mobile). Контент по центру, ширина 1240px max.

- [ ] **Step 4: Commit**

```bash
git add themes/minimal/static/css/style.css
git commit -m "refactor(css): унифицированные контейнеры и section rhythm

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Типографическая иерархия — h1, h2, h3, lead, body, eyebrow

**Files:**
- Modify: `themes/minimal/static/css/style.css` (искать существующие правила h1/h2/h3 и блоки .hero__title, .section-head__title, etc.)

- [ ] **Step 1: Найти все существующие правила заголовков**

Run:
```bash
grep -n "h1\|h2\|h3\|hero__title\|section-head\|section-title\|hero__lead\|hero__eyebrow" ~/eldar-marketing-hugo/themes/minimal/static/css/style.css | head -40
```

Записать строки.

- [ ] **Step 2: Добавить унифицированный блок типографики**

Сразу после блока `.section--invert` вставить:

```css
/* === TYPOGRAPHY HIERARCHY === */
h1, h2, h3, h4 {
    color: var(--ink);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.05;
    text-wrap: balance;
}

h1 {
    font-size: clamp(var(--t-3xl), 5.6vw, var(--t-5xl));
    line-height: 1.02;
    letter-spacing: -0.025em;
    overflow-wrap: anywhere;
}

h2 {
    font-size: clamp(var(--t-xl), 3.4vw, var(--t-3xl));
    line-height: 1.05;
}

h3 {
    font-size: clamp(var(--t-md), 1.8vw, var(--t-lg));
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.2;
}

p {
    color: var(--ink-3);
    font-size: var(--t-base);
    line-height: 1.6;
}

.lead {
    font-size: clamp(var(--t-md), 1.4vw, 23px);
    line-height: 1.5;
    color: var(--ink-3);
    text-wrap: balance;
}

.eyebrow,
.section-head__num {
    font-family: var(--font-mono);
    font-size: var(--t-xs);
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    display: inline-block;
}

/* Russian hyphens на узких экранах */
@media (max-width: 480px) {
    h1, h2 { hyphens: auto; }
}
```

- [ ] **Step 3: Удалить дубли в старых селекторах**

Старые правила для `.hero__title`, `.section-head__title` и т.д. оставляем, но из них убираем дубликаты (font-size, line-height, font-weight) — они теперь идут от глобальных h1/h2. Оставляем только переопределения, специфичные для контекста (margin, color override).

Проходим по найденным в Step 1 строкам и чистим. Если в правиле осталось только одно свойство, или оно стало пустым — удаляем.

- [ ] **Step 4: Визуальная проверка иерархии**

`http://localhost:1313/`:
- H1 hero — самый большой, 68-86px на desktop
- H2 section — 34-54px
- H3 cards — 21-27px
- Lead — заметно крупнее body
- Eyebrow — мелкий моно, uppercase, серый
- Body — 17px, читаемый

Проверить на 360 / 768 / 1440.

- [ ] **Step 5: Commit**

```bash
git add themes/minimal/static/css/style.css
git commit -m "refactor(css): унифицированная типошкала h1-h3, lead, eyebrow

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Hero — golden ratio split

**Files:**
- Modify: `themes/minimal/static/css/style.css:502-...` (блок `.hero` и `.hero--split`)

- [ ] **Step 1: Найти весь блок hero**

Run:
```bash
grep -n "^\.hero" ~/eldar-marketing-hugo/themes/minimal/static/css/style.css
```

Записать диапазон строк всех `.hero*` правил (обычно ~100 строк).

- [ ] **Step 2: Заменить блок hero**

Заменить весь блок hero на:

```css
/* === HERO === */
.hero {
    max-width: var(--container);
    margin-inline: auto;
    padding: clamp(48px, 8vw, 96px) var(--gutter) clamp(48px, 6vw, 80px);
}

.hero--split {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--s-5);
    align-items: center;
}

@media (min-width: 768px) {
    .hero--split {
        grid-template-columns: 7fr 5fr;  /* visual area copy/photo with gap */
        gap: var(--s-4);
    }
}

@media (min-width: 1024px) {
    .hero--split {
        grid-template-columns: minmax(0, 1.618fr) minmax(0, 1fr);  /* φ */
        gap: var(--s-5);
    }
}

.hero__copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--s-3);
}

.hero__visual {
    min-width: 0;
    position: relative;
}

.hero__eyebrow {
    font-family: var(--font-mono);
    font-size: var(--t-xs);
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
}

.hero__title {
    margin: 0;
}

.hero__title em {
    font-style: normal;
    font-weight: inherit;
    background: linear-gradient(currentColor, currentColor) bottom left / 100% 4px no-repeat;
    padding-bottom: 4px;
}

.hero__lead {
    font-size: clamp(var(--t-md), 1.4vw, 23px);
    line-height: 1.5;
    color: var(--ink-3);
    max-width: 56ch;
    text-wrap: balance;
}

.hero__cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--s-2);
    margin-top: var(--s-2);
}

.hero__trust {
    list-style: none;
    margin: var(--s-4) 0 0;
    padding: var(--s-3) 0 0;
    border-top: 1px solid var(--line);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: var(--s-3);
    font-size: var(--t-sm);
    color: var(--muted);
}
.hero__trust li { line-height: 1.4; }
.hero__trust strong { color: var(--ink); font-weight: 600; }

/* Photo frame (golden ratio aspect) */
.hero__photo-frame {
    position: relative;
    border-radius: var(--s-2);
    overflow: hidden;
    border: 1px solid var(--line);
    aspect-ratio: 1 / 1.272;  /* √φ — приятная вертикаль для портрета */
    background: var(--bg-alt);
    box-shadow: 0 30px 80px -30px rgba(0,0,0,0.18);
}
@media (min-width: 768px) {
    .hero__photo-frame { aspect-ratio: 1 / 1.272; }
}

html.dark .hero__photo-frame { box-shadow: 0 30px 80px -30px rgba(0,0,0,0.6); }

.hero__photo-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(100%) contrast(1.02);
    transition: filter var(--t-med);
}
.hero__photo-frame:hover img { filter: grayscale(0%) contrast(1.02); }
html.dark .hero__photo-frame img { filter: grayscale(100%) brightness(0.9); }

.hero__photo-badge {
    position: absolute;
    bottom: var(--s-2);
    left: var(--s-2);
    background: var(--bg);
    color: var(--ink);
    padding: var(--s-1) var(--s-2);
    border-radius: 999px;
    font-size: var(--t-xs);
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: var(--s-1);
    border: 1px solid var(--line);
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.hero__photo-badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #28c76f;
    box-shadow: 0 0 0 0 rgba(40, 199, 111, 0.7);
    animation: pulse 2.2s infinite;
}

.hero__photo-tag {
    position: absolute;
    bottom: var(--s-2);
    right: var(--s-2);
    background: var(--ink);
    color: var(--bg);
    padding: var(--s-3) var(--s-3);
    border-radius: var(--s-2);
    display: inline-flex;
    align-items: center;
    gap: var(--s-2);
    box-shadow: 0 12px 28px rgba(0,0,0,0.15);
}
.hero__photo-tag-num {
    font-size: clamp(28px, 3.4vw, 42px);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 1;
    font-feature-settings: 'tnum';
}
.hero__photo-tag-label {
    font-size: 11px;
    line-height: 1.25;
    color: var(--on-invert-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
}
```

- [ ] **Step 3: Визуальная проверка**

`http://localhost:1313/`:
- **1440:** copy и фото в пропорции 62/38, выровнены по центру по вертикали
- **1024:** copy 1.618 / photo 1
- **768:** copy 7 / photo 5 (запас под более узкую колонку)
- **390:** stack — eyebrow→title→lead→CTA→trust сверху, photo снизу
- Trust grid не разваливается, авто-fit ≥140px

- [ ] **Step 4: Commit**

```bash
git add themes/minimal/static/css/style.css
git commit -m "refactor(css): hero на golden ratio split + responsive

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Marquee — фикс overflow на mobile

**Files:**
- Modify: `themes/minimal/static/css/style.css` (искать `.marquee`)

- [ ] **Step 1: Найти marquee блок**

Run:
```bash
grep -n "^\.marquee" ~/eldar-marketing-hugo/themes/minimal/static/css/style.css
```

- [ ] **Step 2: Заменить marquee блок**

Заменить весь `.marquee*` блок на:

```css
/* === MARQUEE === */
.marquee {
    overflow: hidden;
    border-block: 1px solid var(--line);
    padding-block: var(--s-3);
    background: var(--bg-alt);
    mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.marquee__track {
    display: flex;
    gap: var(--s-5);
    width: max-content;
    animation: marquee 40s linear infinite;
    will-change: transform;
}

.marquee__item {
    font-size: var(--t-sm);
    font-weight: 500;
    color: var(--muted);
    white-space: nowrap;
    letter-spacing: -0.005em;
    display: inline-flex;
    align-items: center;
    gap: var(--s-2);
}
.marquee__item::after {
    content: '·';
    color: var(--muted-2);
    margin-left: var(--s-5);
}
.marquee__item:last-child::after { content: ''; margin: 0; }

@keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
    .marquee__track { animation: none; }
}
```

- [ ] **Step 3: Визуальная проверка**

- На 360 / 390 — marquee не вызывает горизонтальный скролл страницы (overflow: hidden)
- Текст с краёв затухает (mask-image)
- Анимация плавная, бесшовная

- [ ] **Step 4: Commit**

```bash
git add themes/minimal/static/css/style.css
git commit -m "refactor(css): marquee — fix overflow на mobile + mask edges

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Section-head + Services grid

**Files:**
- Modify: `themes/minimal/static/css/style.css` (искать `.section-head` и `.services-grid`)

- [ ] **Step 1: Найти блоки**

Run:
```bash
grep -n "section-head\|services-grid\|service-cell" ~/eldar-marketing-hugo/themes/minimal/static/css/style.css | head -30
```

- [ ] **Step 2: Заменить section-head блок**

Заменить старый блок `.section-head*` на:

```css
/* === SECTION HEAD === */
.section-head {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--s-3);
    align-items: end;
    margin-bottom: var(--s-4);
}

@media (min-width: 768px) {
    .section-head {
        grid-template-columns: 1fr minmax(280px, 1fr);
        gap: var(--s-4);
    }
}

.section-head > div { display: flex; flex-direction: column; gap: var(--s-1); }
.section-head__title { margin: 0; }
.section-head__lead {
    font-size: var(--t-md);
    line-height: 1.5;
    color: var(--ink-3);
    text-wrap: balance;
}
```

- [ ] **Step 3: Заменить services-grid**

Заменить старый блок `.services-grid` и `.service-cell*` на:

```css
/* === SERVICES GRID === */
.services-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    border: 1px solid var(--line);
    border-radius: var(--s-2);
    overflow: hidden;
}

@media (min-width: 640px) {
    .services-grid { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1024px) {
    .services-grid { grid-template-columns: repeat(4, 1fr); }
}

.service-cell {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--s-2);
    padding: var(--s-4);
    text-decoration: none;
    color: var(--ink);
    background: var(--bg);
    border-right: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    transition: background var(--t-fast);
    min-height: 280px;
}

/* Убрать лишние границы по краям сетки */
@media (min-width: 1024px) {
    .service-cell:nth-child(4n) { border-right: none; }
    .service-cell:nth-last-child(-n+4) { border-bottom: none; }
}
@media (min-width: 640px) and (max-width: 1023.98px) {
    .service-cell:nth-child(2n) { border-right: none; }
    .service-cell:nth-last-child(-n+2) { border-bottom: none; }
}
@media (max-width: 639.98px) {
    .service-cell { border-right: none; }
    .service-cell:last-child { border-bottom: none; }
}

.service-cell:hover { background: var(--bg-alt); }

.service-cell__num {
    font-family: var(--font-mono);
    font-size: var(--t-xs);
    font-weight: 500;
    letter-spacing: 0.08em;
    color: var(--muted);
}
.service-cell__title {
    font-size: var(--t-lg);
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.2;
    color: var(--ink);
}
.service-cell__desc {
    font-size: var(--t-sm);
    line-height: 1.5;
    color: var(--muted);
    flex: 1;
}
.service-cell__arrow {
    font-size: var(--t-md);
    color: var(--ink);
    transition: transform var(--t-fast);
    align-self: flex-start;
}
.service-cell:hover .service-cell__arrow { transform: translateX(4px); }
```

- [ ] **Step 4: Визуальная проверка**

`http://localhost:1313/`:
- **1440:** 4 ячейки в ряд, ровные по высоте, общая рамка с внутренними линиями
- **768:** 2×2
- **390:** 1×4, без правой границы
- Hover — заливка, стрелка едет

- [ ] **Step 5: Commit**

```bash
git add themes/minimal/static/css/style.css
git commit -m "refactor(css): section-head + services-grid (4×1 / 2×2 / 1×4)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Process — горизонтальная timeline

**Files:**
- Modify: `themes/minimal/static/css/style.css` (искать `.process`)

- [ ] **Step 1: Заменить process блок**

Найти и заменить весь `.process*` блок на:

```css
/* === PROCESS === */
.process {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--s-4);
    counter-reset: process;
}

@media (min-width: 640px) {
    .process { grid-template-columns: 1fr 1fr; gap: var(--s-4); }
}
@media (min-width: 1024px) {
    .process { grid-template-columns: repeat(4, 1fr); gap: var(--s-4); }
}

.process__step {
    display: flex;
    flex-direction: column;
    gap: var(--s-2);
    padding-top: var(--s-3);
    border-top: 1px solid var(--line);
    position: relative;
}

.section--invert .process__step { border-top-color: rgba(255,255,255,0.16); }

.process__num {
    font-family: var(--font-mono);
    font-size: var(--t-xs);
    font-weight: 500;
    letter-spacing: 0.08em;
    color: var(--muted);
}
.section--invert .process__num { color: var(--on-invert-muted); }

.process__title {
    font-size: var(--t-md);
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.25;
    color: inherit;
    margin: 0;
}

.process__desc {
    font-size: var(--t-sm);
    line-height: 1.5;
    color: var(--muted);
    flex: 1;
    margin: 0;
}
.section--invert .process__desc { color: var(--on-invert-muted); }

.process__time {
    font-family: var(--font-mono);
    font-size: var(--t-xs);
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--muted-2);
    padding-top: var(--s-1);
}
.section--invert .process__time { color: var(--on-invert-muted); }
```

- [ ] **Step 2: Визуальная проверка**

- 1440: 4 шага в ряд, верхняя линия сверху каждого
- 768: 2×2
- 390: 1×4, читается как timeline сверху вниз
- В section--invert цвета корректные

- [ ] **Step 3: Commit**

```bash
git add themes/minimal/static/css/style.css
git commit -m "refactor(css): process timeline (4×1 / 2×2 / 1×4)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Why-секция

**Files:**
- Modify: `themes/minimal/static/css/style.css` (искать `.why`)

- [ ] **Step 1: Заменить why блок**

```css
/* === WHY === */
.why {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--s-4);
}

@media (min-width: 1024px) {
    .why {
        grid-template-columns: 5fr 7fr;
        gap: var(--s-5);
        align-items: start;
    }
}

.why__intro {
    display: flex;
    flex-direction: column;
    gap: var(--s-2);
    position: sticky;
    top: 88px;
}

@media (max-width: 1023.98px) {
    .why__intro { position: static; }
}

.why__lead {
    font-size: var(--t-md);
    line-height: 1.5;
    color: var(--ink-3);
    margin-top: var(--s-2);
    text-wrap: balance;
}

.why__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    border-top: 1px solid var(--line);
}

@media (min-width: 768px) {
    .why__list { grid-template-columns: 1fr 1fr; gap: 0; }
}

.why__item {
    display: flex;
    flex-direction: column;
    gap: var(--s-2);
    padding: var(--s-3) 0;
    border-bottom: 1px solid var(--line);
}

@media (min-width: 768px) {
    .why__item {
        padding: var(--s-3);
        border-right: 1px solid var(--line);
    }
    .why__item:nth-child(2n) { border-right: none; }
    .why__list { border-top: none; border-block: 1px solid var(--line); }
}

.why__num {
    font-family: var(--font-mono);
    font-size: var(--t-xs);
    font-weight: 500;
    letter-spacing: 0.08em;
    color: var(--muted);
}
.why__title {
    font-size: var(--t-md);
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.25;
    margin: 0;
}
.why__desc {
    font-size: var(--t-sm);
    line-height: 1.5;
    color: var(--muted);
    margin: 0;
}
```

- [ ] **Step 2: Визуальная проверка**

- 1440: intro слева sticky, list справа 2 колонки
- 768: stack, intro сверху, list 2 колонки
- 390: всё стак, чистая вертикаль

- [ ] **Step 3: Commit**

```bash
git add themes/minimal/static/css/style.css
git commit -m "refactor(css): why-секция 5/7 split + sticky intro

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: Cases grid + post-list

**Files:**
- Modify: `themes/minimal/static/css/style.css` (искать `.cases-grid`, `.case-card`, `.post-list`)

- [ ] **Step 1: Заменить cases блок**

```css
/* === CASES GRID === */
.cases-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--s-3);
}

@media (min-width: 640px) {
    .cases-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
    .cases-grid { grid-template-columns: repeat(3, 1fr); }
}

.case-card {
    display: flex;
    flex-direction: column;
    gap: var(--s-2);
    padding: var(--s-3);
    text-decoration: none;
    color: var(--ink);
    background: var(--bg);
    border: 1px solid var(--line);
    border-radius: var(--s-2);
    transition: border-color var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast);
    min-height: 240px;
}
.case-card:hover {
    border-color: var(--ink);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px -12px rgba(0,0,0,0.12);
}

.case-card__meta {
    font-family: var(--font-mono);
    font-size: var(--t-xs);
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--muted);
}
.case-card__title {
    font-size: var(--t-md);
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.25;
    color: var(--ink);
}
.case-card__desc {
    font-size: var(--t-sm);
    line-height: 1.5;
    color: var(--muted);
    flex: 1;
}
.case-card__metric {
    display: flex;
    align-items: baseline;
    gap: var(--s-2);
    padding-top: var(--s-2);
    border-top: 1px dashed var(--line);
}
.case-card__metric-value {
    font-size: var(--t-lg);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--ink);
    font-feature-settings: 'tnum';
}
.case-card__metric-label {
    font-size: var(--t-xs);
    color: var(--muted);
    line-height: 1.3;
}
.case-card__cta {
    font-size: var(--t-sm);
    font-weight: 500;
    color: var(--ink);
    margin-top: auto;
}
```

- [ ] **Step 2: Заменить post-list блок**

```css
/* === POST LIST === */
.post-list {
    list-style: none;
    margin: 0;
    padding: 0;
    max-width: var(--reading);
    margin-inline: auto;
    border-top: 1px solid var(--line);
}
.post-list li {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
    gap: var(--s-3);
    padding: var(--s-3) 0;
    border-bottom: 1px solid var(--line);
    min-height: 56px;
}

@media (max-width: 600px) {
    .post-list li {
        grid-template-columns: 1fr;
        gap: var(--s-1);
    }
    .post-list .reading-time { justify-self: start; }
}

.post-list .date {
    font-family: var(--font-mono);
    font-size: var(--t-xs);
    color: var(--muted);
    letter-spacing: 0.04em;
    white-space: nowrap;
}
.post-list a {
    font-size: var(--t-md);
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--ink);
    text-decoration: none;
    line-height: 1.3;
}
.post-list a:hover { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 4px; }
.post-list .reading-time {
    font-family: var(--font-mono);
    font-size: var(--t-xs);
    color: var(--muted-2);
}
```

- [ ] **Step 3: Визуальная проверка**

- 1440: cases 3 колонки, ровные по высоте; blog reading column 768 центрирован
- 768: cases 2 колонки
- 390: всё 1 колонка, blog список читается чисто

- [ ] **Step 4: Commit**

```bash
git add themes/minimal/static/css/style.css
git commit -m "refactor(css): cases-grid + post-list на токенах

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: CTA-band

**Files:**
- Modify: `themes/minimal/static/css/style.css` (искать `.cta-band`)

- [ ] **Step 1: Заменить cta-band блок**

```css
/* === CTA BAND === */
.cta-band {
    background: var(--bg-invert);
    color: var(--on-invert);
    padding-block: var(--section-pad-block);
}

.cta-band__inner {
    max-width: var(--container);
    margin-inline: auto;
    padding-inline: var(--gutter);
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--s-4);
}

@media (min-width: 1024px) {
    .cta-band__inner {
        grid-template-columns: 7fr 5fr;
        gap: var(--s-5);
        align-items: end;
    }
}

.cta-band__copy { display: flex; flex-direction: column; gap: var(--s-2); }
.cta-band__label {
    font-family: var(--font-mono);
    font-size: var(--t-xs);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--on-invert-muted);
}
.cta-band__title {
    font-size: clamp(var(--t-xl), 3.4vw, var(--t-3xl));
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.05;
    color: var(--on-invert);
    margin: 0;
    text-wrap: balance;
}
.cta-band__lead {
    font-size: var(--t-md);
    line-height: 1.5;
    color: var(--on-invert-muted);
    max-width: 56ch;
}

.cta-band__row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--s-2);
    margin-top: var(--s-2);
}

.cta-band__meta {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--s-3);
    border-top: 1px solid rgba(255,255,255,0.16);
    padding-top: var(--s-3);
}

@media (min-width: 1024px) {
    .cta-band__meta {
        border-top: none;
        padding-top: 0;
        border-left: 1px solid rgba(255,255,255,0.16);
        padding-left: var(--s-4);
    }
}

.cta-band__meta-item {
    display: flex;
    flex-direction: column;
    gap: var(--s-0);
}
.cta-band__meta-label {
    font-family: var(--font-mono);
    font-size: var(--t-xs);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--on-invert-muted);
}
.cta-band__meta-item a,
.cta-band__meta-item span {
    font-size: var(--t-md);
    color: var(--on-invert);
    text-decoration: none;
    font-weight: 500;
    letter-spacing: -0.01em;
}
.cta-band__meta-item a:hover { text-decoration: underline; text-underline-offset: 4px; }
```

- [ ] **Step 2: Визуальная проверка**

- 1440: copy 7 / meta 5, разделитель вертикальной линией
- 768: stack, meta сверху отделён горизонтальной линией
- 390: всё стак, кнопки переносятся

- [ ] **Step 3: Commit**

```bash
git add themes/minimal/static/css/style.css
git commit -m "refactor(css): cta-band 7/5 split с разделителями

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 11: Footer

**Files:**
- Modify: `themes/minimal/static/css/style.css` (искать `.site-footer`)

- [ ] **Step 1: Заменить footer блок**

```css
/* === FOOTER === */
.site-footer {
    border-top: 1px solid var(--line);
    background: var(--bg);
    margin-top: var(--s-5);
}

.site-footer__inner {
    max-width: var(--container);
    margin-inline: auto;
    padding: var(--s-5) var(--gutter) var(--s-4);
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--s-4);
}

@media (min-width: 640px) {
    .site-footer__inner {
        grid-template-columns: 1fr 1fr;
        gap: var(--s-4);
    }
}
@media (min-width: 1024px) {
    .site-footer__inner {
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: var(--s-5);
    }
}

.site-footer__brand h2 {
    font-size: var(--t-md);
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.3;
    margin: 0 0 var(--s-2);
    text-wrap: balance;
}
.site-footer__brand p {
    font-size: var(--t-sm);
    line-height: 1.5;
    color: var(--muted);
    margin: 0;
    max-width: 40ch;
}

.site-footer__col h3 {
    font-family: var(--font-mono);
    font-size: var(--t-xs);
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin: 0 0 var(--s-2);
}
.site-footer__col ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--s-1);
}
.site-footer__col a {
    font-size: var(--t-sm);
    color: var(--ink-3);
    text-decoration: none;
    transition: color var(--t-fast);
    line-height: 1.5;
}
.site-footer__col a:hover { color: var(--ink); }

.site-footer__bottom {
    max-width: var(--container);
    margin-inline: auto;
    padding: var(--s-3) var(--gutter);
    border-top: 1px solid var(--line);
    display: flex;
    flex-wrap: wrap;
    gap: var(--s-2);
    justify-content: space-between;
    font-size: var(--t-xs);
    color: var(--muted);
}
.site-footer__bottom a {
    color: var(--muted);
    text-decoration: none;
}
.site-footer__bottom a:hover { color: var(--ink); text-decoration: underline; }
```

- [ ] **Step 2: Визуальная проверка**

- 1440: brand 2fr / 3 cols × 1fr
- 768: 2×2
- 390: 1×N столбиком

- [ ] **Step 3: Commit**

```bash
git add themes/minimal/static/css/style.css
git commit -m "refactor(css): footer responsive grid (2/1/1/1 → 2×2 → 1×N)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 12: Buttons (.btn)

**Files:**
- Modify: `themes/minimal/static/css/style.css` (искать `.btn`)

- [ ] **Step 1: Заменить кнопки**

```css
/* === BUTTONS === */
.btn {
    display: inline-flex;
    align-items: center;
    gap: var(--s-1);
    padding: 14px 22px;
    border-radius: 999px;
    text-decoration: none;
    font-size: var(--t-sm);
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1;
    cursor: pointer;
    transition: transform var(--t-fast), background var(--t-fast), color var(--t-fast), border-color var(--t-fast);
    min-height: 44px;
    white-space: nowrap;
    border: 1px solid transparent;
    font-family: inherit;
}

.btn--primary {
    background: var(--ink);
    color: var(--bg);
}
.btn--primary:hover { transform: translateY(-1px); }

.btn--ghost {
    background: transparent;
    color: var(--ink);
    border-color: var(--line-2);
}
.btn--ghost:hover { background: var(--ink); color: var(--bg); }

.btn--invert.btn--primary {
    background: var(--on-invert);
    color: var(--bg-invert);
}
.btn--invert.btn--ghost {
    color: var(--on-invert);
    border-color: rgba(255,255,255,0.3);
}
.btn--invert.btn--ghost:hover {
    background: var(--on-invert);
    color: var(--bg-invert);
}

.btn--small {
    padding: 10px 16px;
    font-size: var(--t-xs);
    min-height: 36px;
}

.btn__arrow {
    transition: transform var(--t-fast);
}
.btn:hover .btn__arrow { transform: translateX(3px); }
```

- [ ] **Step 2: Визуальная проверка кнопок**

- Hero CTA-row: primary (чёрный) + ghost (рамка) выровнены, ≥44px
- Section-head "Все кейсы / статьи" — small ghost
- CTA-band — invert стили (белый на чёрном)
- Контактная кнопка `+7...` — invert ghost

- [ ] **Step 3: Commit**

```bash
git add themes/minimal/static/css/style.css
git commit -m "refactor(css): кнопки на токенах + invert variants

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 13: Cookie banner — вынос inline в класс

**Files:**
- Modify: `themes/minimal/layouts/_default/baseof.html:250-256`
- Modify: `themes/minimal/static/css/style.css` (добавить `.cookie-banner`)

- [ ] **Step 1: Добавить класс cookie-banner в CSS**

В конец style.css добавить:

```css
/* === COOKIE BANNER === */
.cookie-banner {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    padding: var(--s-2) var(--s-3);
    border-top: 1px solid var(--line);
    background: var(--bg);
    color: var(--ink);
    font-size: var(--t-sm);
    line-height: 1.5;
    transition: transform var(--t-med);
}
.cookie-banner.is-visible { display: block; }
.cookie-banner.is-hidden { transform: translateY(100%); }

.cookie-banner__inner {
    max-width: 920px;
    margin-inline: auto;
    display: flex;
    align-items: center;
    gap: var(--s-2);
    flex-wrap: wrap;
}
.cookie-banner__text {
    margin: 0;
    flex: 1;
    min-width: 200px;
}
.cookie-banner__text a {
    text-decoration: underline;
    color: inherit;
}
.cookie-banner__btn {
    padding: 10px 22px;
    border-radius: 999px;
    border: none;
    font-weight: 600;
    font-size: var(--t-sm);
    cursor: pointer;
    white-space: nowrap;
    font-family: inherit;
    background: var(--ink);
    color: var(--bg);
    min-height: 44px;
    transition: transform var(--t-fast);
}
.cookie-banner__btn:hover { transform: translateY(-1px); }
```

- [ ] **Step 2: Заменить inline-стили в baseof.html**

В файле `themes/minimal/layouts/_default/baseof.html` найти строки 250-260 (cookie banner) и заменить на:

```html
<!-- Cookie Consent Banner -->
<div id="cookie-banner" class="cookie-banner">
  <div class="cookie-banner__inner">
    <p class="cookie-banner__text">Мы&nbsp;используем cookie и&nbsp;Яндекс.Метрику для&nbsp;улучшения работы сайта. Продолжая, вы&nbsp;соглашаетесь с&nbsp;<a href="/privacy/">политикой конфиденциальности</a>.</p>
    <button onclick="acceptCookies()" class="cookie-banner__btn">Принять</button>
  </div>
</div>
<script>
function acceptCookies(){
  localStorage.setItem("cookies_accepted","1");
  document.getElementById("cookie-banner").classList.add("is-hidden");
}
(function(){
  if(!localStorage.getItem("cookies_accepted")){
    document.getElementById("cookie-banner").classList.add("is-visible");
  }
})();
</script>
```

- [ ] **Step 3: Визуальная проверка**

В DevTools открыть incognito (или localStorage → удалить ключ `cookies_accepted`), обновить — баннер появляется внизу, "Принять" → плавно уезжает вниз.

- [ ] **Step 4: Commit**

```bash
git add themes/minimal/static/css/style.css themes/minimal/layouts/_default/baseof.html
git commit -m "refactor: cookie banner — inline стили в .cookie-banner

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 14: Header polish + sticky offset

**Files:**
- Modify: `themes/minimal/static/css/style.css` (искать `.site-header`)

- [ ] **Step 1: Подогнать header под токены**

Найти `.site-header__inner` и заменить его блок (включая под-селекторы logo, nav, cta) на:

```css
/* === HEADER === */
.site-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: color-mix(in srgb, var(--bg) 90%, transparent);
    backdrop-filter: saturate(180%) blur(12px);
    -webkit-backdrop-filter: saturate(180%) blur(12px);
    border-bottom: 1px solid var(--line);
    transition: background var(--t-med), border-color var(--t-med);
}
.site-header__inner {
    max-width: var(--container);
    margin-inline: auto;
    padding: var(--s-2) var(--gutter);
    display: flex;
    align-items: center;
    gap: var(--s-3);
    min-height: 64px;
}
.site-header__logo {
    display: inline-flex;
    align-items: center;
    gap: var(--s-1);
    text-decoration: none;
    color: var(--ink);
    font-weight: 600;
    font-size: var(--t-base);
    letter-spacing: -0.01em;
    line-height: 1;
}
.site-header__logo svg {
    height: 26px;
    width: auto;
    fill: var(--ink);
    transition: fill var(--t-med);
}
.site-header__nav {
    display: flex;
    align-items: center;
    gap: var(--s-0);
    margin-left: auto;
}
.site-header__nav a {
    color: var(--muted);
    text-decoration: none;
    font-size: var(--t-sm);
    font-weight: 500;
    padding: var(--s-1) var(--s-2);
    border-radius: var(--s-1);
    transition: color var(--t-fast), background var(--t-fast);
    min-height: 36px;
    display: inline-flex;
    align-items: center;
}
.site-header__nav a:hover { color: var(--ink); background: var(--bg-alt); }
.site-header__cta {
    display: inline-flex;
    align-items: center;
    gap: var(--s-1);
    background: var(--ink);
    color: var(--bg);
    text-decoration: none;
    font-size: var(--t-xs);
    font-weight: 600;
    padding: 10px 18px;
    border-radius: 999px;
    margin-left: var(--s-1);
    white-space: nowrap;
    transition: transform var(--t-fast), background var(--t-fast);
    letter-spacing: -0.01em;
    min-height: 40px;
}
.site-header__cta:hover { transform: translateY(-1px); }
.site-header__cta::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #28c76f;
    box-shadow: 0 0 0 0 rgba(40, 199, 111, 0.7);
    animation: pulse 2.2s infinite;
}

@media (max-width: 860px) {
    .site-header__nav,
    .site-header__cta { display: none; }
    .site-header__menu-btn { display: inline-flex; }
    .site-header__inner { gap: var(--s-2); padding: 14px var(--gutter); }
    .site-header__logo svg { height: 24px; }
}
@media (max-width: 540px) {
    .site-header__logo span { display: none; }
}
```

(Менюшная кнопка `.site-header__menu-btn` остаётся как есть — там уже всё хорошо.)

- [ ] **Step 2: Визуальная проверка**

- Header прилипает сверху, blur работает
- На <860px — гамбургер виден, nav/cta скрыты
- При клике по anchor (например `/contact/`) контент не уезжает под header (scroll-margin-top из Task 2 работает)

- [ ] **Step 3: Commit**

```bash
git add themes/minimal/static/css/style.css
git commit -m "refactor(css): header на токенах + min-height 64px

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 15: List/Single шаблоны (страницы кейсов и блога)

**Files:**
- Read: `themes/minimal/layouts/_default/list.html`
- Read: `themes/minimal/layouts/_default/single.html`
- Read: `themes/minimal/layouts/blog/list.html` (если есть)
- Read: `themes/minimal/layouts/cases/list.html` (если есть)
- Modify: те же файлы (добавить классы `.wide` / `.reading` где нужно)

- [ ] **Step 1: Прочитать все list/single шаблоны**

```bash
cat ~/eldar-marketing-hugo/themes/minimal/layouts/_default/list.html
cat ~/eldar-marketing-hugo/themes/minimal/layouts/_default/single.html
ls ~/eldar-marketing-hugo/themes/minimal/layouts/blog ~/eldar-marketing-hugo/themes/minimal/layouts/cases 2>/dev/null
```

- [ ] **Step 2: Обернуть контент в правильный контейнер**

- Cases list (страница со всеми кейсами) → `.wide` контейнер + `.cases-grid` внутри
- Blog list → `.reading` контейнер + `.post-list`
- Single (статья / кейс) → `.reading` контейнер с `<article>` внутри

Конкретно: каждый шаблон проверяем, и если внешний div не имеет нужного контейнерного класса — добавляем.

Пример для `single.html`:

```html
{{ define "main" }}
<article class="reading page-content">
    <header class="page-content__header">
        <span class="eyebrow">{{ .Section }}</span>
        <h1>{{ .Title }}</h1>
        {{ if .Description }}<p class="lead">{{ .Description }}</p>{{ end }}
        <span class="post-meta">{{ .Date.Format "02.01.2006" }} · {{ math.Round (div (countwords .Content) 200.0) }} мин</span>
    </header>
    <div class="markdown">
        {{ .Content }}
    </div>
</article>
{{ end }}
```

(Точные edits зависят от того что ты прочитал в Step 1 — действуй по обстановке, сохраняя существующую логику.)

- [ ] **Step 3: Добавить стили для article + markdown**

В конец style.css:

```css
/* === ARTICLE / SINGLE PAGE === */
.page-content__header {
    display: flex;
    flex-direction: column;
    gap: var(--s-2);
    margin-bottom: var(--s-4);
    padding-block: var(--s-4);
    border-bottom: 1px solid var(--line);
}
.page-content__header h1 { margin: 0; }
.page-content__header .post-meta {
    font-family: var(--font-mono);
    font-size: var(--t-xs);
    color: var(--muted);
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.markdown {
    font-size: var(--t-base);
    line-height: 1.7;
    color: var(--ink);
}
.markdown > * + * { margin-top: var(--s-3); }
.markdown h2 {
    font-size: clamp(var(--t-lg), 2.4vw, var(--t-xl));
    margin-top: var(--s-5);
    margin-bottom: var(--s-2);
    line-height: 1.15;
}
.markdown h3 {
    font-size: var(--t-md);
    margin-top: var(--s-4);
    margin-bottom: var(--s-1);
    font-weight: 600;
}
.markdown p { color: var(--ink-3); max-width: 65ch; }
.markdown ul,
.markdown ol {
    padding-left: var(--s-3);
    color: var(--ink-3);
}
.markdown li + li { margin-top: var(--s-1); }
.markdown a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.markdown a:hover { text-decoration-thickness: 2px; }
.markdown blockquote {
    border-left: 2px solid var(--ink);
    padding-left: var(--s-3);
    color: var(--ink-3);
    font-style: italic;
}
.markdown img {
    max-width: 100%;
    height: auto;
    border-radius: var(--s-1);
    border: 1px solid var(--line);
}
.markdown pre {
    background: var(--bg-alt);
    border: 1px solid var(--line);
    border-radius: var(--s-1);
    padding: var(--s-2);
    overflow-x: auto;
    font-size: var(--t-sm);
}
.markdown code {
    font-family: var(--font-mono);
    font-size: 0.92em;
    background: var(--bg-alt);
    padding: 2px 6px;
    border-radius: 4px;
}
.markdown pre code { background: none; padding: 0; }
```

- [ ] **Step 4: Визуальная проверка**

Открыть случайный кейс (`http://localhost:1313/cases/<любой>`) и пост блога — проверить что:
- Контент в reading column (768px max)
- Заголовки иерархичны
- Картинки в рамке, не вылезают
- Списки отступлены, читаемы
- Цитаты с левой линией

- [ ] **Step 5: Commit**

```bash
git add themes/minimal/layouts themes/minimal/static/css/style.css
git commit -m "refactor: list/single шаблоны + .markdown стили на reading column

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 16: Чистка мёртвого CSS

**Files:**
- Modify: `themes/minimal/static/css/style.css`

- [ ] **Step 1: Найти кандидаты на удаление**

После 15 задач в файле могут остаться:
- Дубли селекторов (одно правило заменили в одном месте, оставили в другом)
- Старые правила, ссылающиеся на несуществующие элементы (после редизайна)
- Магические числа в правилах, которые должны быть на токенах

```bash
grep -n "px;" ~/eldar-marketing-hugo/themes/minimal/static/css/style.css | grep -v "var(" | head -50
```

(Ищем "px;" без var() — это магические числа, кандидаты на замену токеном или удаление.)

- [ ] **Step 2: Пройтись по списку и почистить**

Для каждого попадания решить:
- Заменить на токен (`16px` → `var(--s-2)`)
- Оставить (нестандартное точечное значение, например `1.6px`)
- Удалить (мёртвое правило)

Не торопиться — каждое изменение отдельно проверять визуально.

- [ ] **Step 3: Прогнать сборку без ошибок**

```bash
cd ~/eldar-marketing-hugo && hugo --minify --buildDrafts 2>&1 | tail -20
```

Не должно быть warnings о шаблонах. CSS не должен быть огромным относительно прежнего размера.

- [ ] **Step 4: Финальная визуальная проверка на 6 viewport'ах**

Пройтись по главной + 1 кейс + 1 блог-пост на:
- 360 (iPhone SE)
- 390 (iPhone 14)
- 768 (iPad portrait)
- 1024 (iPad landscape)
- 1440 (стандарт desktop)
- 1920 (большой)

Проверить:
- [ ] Нет горизонтального скролла
- [ ] Hero пропорция photo/copy ≈ 62/38 на ≥1024
- [ ] Все секции имеют одинаковый vertical rhythm
- [ ] Тач-таргеты ≥44×44 (DevTools → Inspect, измерить кнопки и navi)
- [ ] H1 → H2 → H3 → body — чёткая иерархия с одного взгляда
- [ ] Footer корректно собирается на всех точках
- [ ] Cookie banner не перекрывает контент критически

- [ ] **Step 5: Commit**

```bash
git add themes/minimal/static/css/style.css
git commit -m "chore(css): убрать мёртвые правила и магические числа

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Final review — verification before completion

- [ ] **Step 1: Прогнать `hugo --minify` и проверить размер**

```bash
cd ~/eldar-marketing-hugo && rm -rf public && hugo --minify
ls -lh public/css/style.min.css 2>/dev/null || ls -lh public/css/style.css
```

- [ ] **Step 2: Acceptance criteria check (из spec)**

- [ ] Все vertical отступы между логическими блоками кратны 8px (DevTools → Computed)
- [ ] Hero на ≥768px имеет пропорцию copy/photo ≈ 62/38 (±1%)
- [ ] На 360 / 390 / 768 / 1024 / 1440 нет горизонтального скролла, нет overflow
- [ ] Все интерактивные элементы ≥44×44px
- [ ] Body line length на reading-страницах ≤ 65ch
- [ ] Иерархия заголовков визуально читается с одного взгляда
- [ ] `hugo server` без ошибок и warning'ов
- [ ] Все 14 коммитов чистые, в каждом описание

- [ ] **Step 3: Запустить site verification subagent**

После всех тасков — дёрнуть `verifier` агента с заданием пройтись по acceptance criteria выше с свежим взглядом. Прикрепить ссылку на спеку.

- [ ] **Step 4: Сообщить пользователю что готово, попросить проверить локально**

Сообщить ссылку `http://localhost:1313/` и попросить пройти по главной + кейсам + блогу на 2-3 устройствах. После аппрува — задеплоить (через стандартный скилл `/birson` или прямой Hugo deploy флоу пользователя).

---

## Self-review notes

**Spec coverage:**
- Section 1 (математическая система) — Task 1 ✓
- Section 2 (типошкала) — Task 3 ✓
- Section 3 (grid и layout) — Tasks 4, 6, 7, 8, 9, 10, 11 ✓
- Section 4 (responsive) — все задачи + явные media queries ✓
- Section 5 (план миграции) — все задачи покрывают список файлов ✓
- Acceptance criteria — Final review Step 2 ✓

**Type consistency:**
- Токены `--s-N` именованы единообразно во всех задачах ✓
- `--t-N` типошкала используется консистентно ✓
- `--section-pad-block` везде где задаётся section vertical rhythm ✓
- Media queries: 480 / 640 / 768 / 1024 / 1280 — придерживаемся ✓

**Placeholder scan:**
- Нет TBD/TODO ✓
- В Task 15 Step 2 указано "действуй по обстановке" — это допустимо т.к. нужно сначала прочитать существующие шаблоны (Step 1) и подгонять под фактическую структуру, не зная её заранее ✓
