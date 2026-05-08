# eldarmarketing.ru — Layout refactor по золотому сечению

**Дата:** 2026-05-08
**Тип:** Систематизация вёрстки (рефакторинг без редизайна)
**Подход:** Гибрид — токены + точечная типографика (вариант C из брейншторма)

## Цель

Привести вёрстку eldarmarketing.ru к математически точной системе на токенах, чтобы spacing, сетка, типографика и responsive-поведение работали предсказуемо и "до миллиметров ровно". Текущий чёрно-белый editorial-mono стиль и шрифт GT Eesti сохраняются полностью.

## Проблемы, которые решаем

1. **Spacing/отступы разъезжаются** — нет единого ритма, секции имеют рандомные margin'ы.
2. **Сетка не выровнена** — hero split косой, элементы не попадают в baseline.
3. **Мобильная вёрстка** — hero на 768–1024px ломается, marquee рвёт viewport, CTA-band на ≤480px разваливается.
4. **Типографика** — нет модульной шкалы, иерархия заголовков непоследовательна.

## Что НЕ меняется

- Тексты и контент.
- SEO, метатеги, schema.org, Yandex.Metrika.
- JS-логика (mobile menu, marquee, scroll reveal, theme toggle).
- Цветовая система (монохром).
- Шрифт GT Eesti.
- Hugo шаблонная структура (`baseof.html` / `index.html` / `list.html` / `single.html`).

## Архитектура решения

Вся работа делается в одном CSS-файле `themes/minimal/static/css/style.css` плюс минимальные правки HTML (вынос inline-стилей в классы). Никаких новых зависимостей, никаких сборщиков — только vanilla CSS с CSS Custom Properties.

### Часть 1 — Базовая математическая система

**Базовая единица:** 8px (стандартная baseline grid).

**Spacing scale (8pt baseline + рост по φ ≈ 1.618 на верхних ступенях):**

```css
--s-0:  4px    /* полу-юнит, мелкие зазоры */
--s-1:  8px    /* базовый */
--s-2:  16px   /* стандартный */
--s-3:  24px   /* group gap */
--s-4:  40px   /* section inner */
--s-5:  64px   /* section outer mobile */
--s-6:  104px  /* section outer desktop ≈ 64×φ */
--s-7:  168px  /* large hero spacing ≈ 104×φ */
```

**Контейнеры (золотое сечение):**

```css
--container: 1240px   /* широкая сетка */
--reading:   768px    /* 1240 ÷ φ ≈ 766, округлено к 8pt */
--narrow:    480px    /* 768 ÷ φ ≈ 475, формы и узкие CTA */
--gutter:    32px     /* desktop, responsive ниже */
```

**Hero split по φ:** копирайт ~62% (1/φ), фото ~38% (1−1/φ).

**Section vertical rhythm:** каждая секция получает `padding-block: clamp(64px, 7vw, 104px)` — `--s-5` на mobile, `--s-6` на desktop. Внутри секций margin'ов нет, всё через gap.

### Часть 2 — Типошкала

**Modular scale:** base 17px, ratio 1.250 (Major Third).

```css
--t-xs:    13px   /* caption, badges, метаданные, eyebrow */
--t-sm:    15px   /* вспомогательный текст, навигация */
--t-base:  17px   /* основной текст */
--t-md:    21px   /* lead, подзаголовки секций */
--t-lg:    27px   /* h3 — карточки */
--t-xl:    34px   /* h2 — заголовки секций mobile */
--t-2xl:   42px   /* subhero на mobile */
--t-3xl:   54px   /* h1 mobile / h2 desktop */
--t-4xl:   68px   /* h1 desktop */
--t-5xl:   86px   /* display hero desktop */
```

**Иерархия:**

| Элемент | Weight | Size | Line-height | Letter-spacing |
|---|---|---|---|---|
| H1 (hero) | 700 | clamp(54px, 5.6vw, 86px) | 1.02 | -0.025em |
| H2 (section) | 700 | clamp(34px, 3.4vw, 54px) | 1.05 | -0.02em |
| H3 (card) | 600 | 21–27px | 1.2 | -0.01em |
| Lead | 400 | 19–21px | 1.5 | 0 |
| Body | 400 | 17px | 1.6 | 0 |
| Eyebrow / section-num | 500 | 13px (mono) | 1.4 | 0.08em uppercase |

**Правила:**

- Все line-height приведены к 8pt baseline (через округление вычисленной высоты).
- `font-variant-numeric: tabular-nums` остаётся.
- Body max-width: 65ch (≈680px) — оптимум читабельности.
- Inline `<em>` в hero: weight 700, без курсива (визуальный акцент через подчёркивание/wave-line — не цвет).

### Часть 3 — Grid и layout

**12-колоночная сетка** для контейнера 1240px:

```
--grid-cols: 12
--grid-gap: 24px (--s-3)
column width: (1240 - 11×24) / 12 ≈ 80px
```

**Layout распределение по секциям:**

| Секция | Desktop | Tablet | Mobile |
|---|---|---|---|
| Hero | copy 7 / gap 1 / photo 4 (62/38) | copy 8 / photo 4 | stack: photo → copy |
| Services | 4 cols × 1 row | 2×2 | 1×4 |
| Process | 4 in row + vertical lines | 2×2 | vertical stack + left timeline |
| Why | intro 5 / gap 1 / list 6 | stack | stack |
| Cases | 3 cols (auto-fit minmax(320px, 1fr)) | 2 cols | 1 col |
| Blog post-list | reading column 768px centered | reading column | reading column |
| CTA-band | copy 7 / meta 5 | stack | stack |
| Footer | brand 4 / 3 cols × 8 / 4 | 2×2 | 1×N |

**Section-head (унифицированный):**

- Layout: eyebrow + h2 слева; lead/CTA справа.
- `align-items: end` — заголовок и lead по нижней baseline.
- Gap eyebrow→h2: 12px.
- Gap h2→content: --s-4 (40px).

**Сафети-правила (без них layout ломается):**

- `min-width: 0` на всех flex/grid items.
- `overflow-wrap: anywhere` на hero h1.
- `hyphens: auto` для русских заголовков на ≤480px.
- Никаких фикс-ширин внутри сетки — везде `fr` / `minmax` / `clamp`.
- Тач-таргеты ≥ 44×44px (CTA, навигация, иконки моб. меню).
- Sticky header anchor offset: `scroll-margin-top: 96px` на секциях.

### Часть 4 — Responsive breakpoints

Mobile-first, 4 точки:

```css
--bp-sm:  480px   /* фон. телефон → большой телефон */
--bp-md:  768px   /* планшет / phones landscape */
--bp-lg:  1024px  /* десктоп */
--bp-xl:  1280px  /* широкий десктоп */
```

**Container behavior:**

| Viewport | Container |
|---|---|
| < 480px | padding-inline: 20px, full bleed |
| 480–768 | padding-inline: 24px |
| 768–1024 | padding-inline: 32px, max-width начинает работать |
| > 1024 | max-width: 1240px, centered |
| > 1280 | то же, нет растяжения |

**Конкретные баги, которые точно лечим:**

1. Hero 768–1024px — копирайт и фото не выровнены → `grid-template-columns: 7fr 4fr` на ≥768px.
2. Services grid на mobile дёргается → единый row-gap = `--s-3`.
3. Sticky header anchor overlap → `scroll-margin-top: 96px`.
4. Marquee на mobile рвёт viewport → `mask-image: linear-gradient(...)` + `min-width: max-content`.
5. CTA-band ≤480px разваливается → стак с rhythm'ом --s-4 / --s-5.
6. Footer 4-колоночный → 2×2 на tablet, 1×N на mobile.

**Тестовые viewport'ы:** 360 (iPhone SE) / 390 (iPhone 14) / 768 (iPad portrait) / 1024 (iPad landscape) / 1440 (стандарт desktop) / 1920 (широкий).

### Часть 5 — Список файлов и порядок работы

**Файлы:**

1. `themes/minimal/static/css/style.css` — основная работа.
2. `themes/minimal/layouts/index.html` — вынос inline-стилей в классы.
3. `themes/minimal/layouts/_default/baseof.html` — cookie-banner inline → класс `.cookie-banner`.
4. `themes/minimal/layouts/_default/list.html` и `single.html` — проверка и подгон под reading column.

**Порядок работы (один длинный проход, без декомпозиции на под-проекты):**

1. Заменить блок `:root { ... }` (строки 14–37) на новый набор токенов (spacing, typography, breakpoints, containers).
2. Переписать base layout: `body`, `.section`, контейнеры (`.wide`, `.full-bleed`, `.page-content`), headings (h1–h3, lead, body, eyebrow).
3. Hero — golden ratio split, фикс photo-frame, badge, tag.
4. Services grid — выровненная 4×1 / 2×2 / 1×4 сетка.
5. Process — горизонтальная timeline на desktop, vertical с левой линией на mobile.
6. Why — 5/1/6 split.
7. Cases-grid и Blog post-list — на новых токенах.
8. CTA-band — split + responsive стак.
9. Footer — 2×2 / 1×N responsive.
10. Header + Mobile menu — финальная подгонка под новую spacing scale.
11. Чистка мёртвого CSS.
12. Тест на viewport'ах: 360 / 390 / 768 / 1024 / 1440.

## Acceptance criteria

- Все vertical отступы между логическими блоками кратны 8px.
- Hero на ≥768px имеет пропорцию copy/photo ≈ 62/38 (с допуском ±1%).
- На viewport'ах 360 / 390 / 768 / 1024 / 1440 нет горизонтального скролла, нет overflow.
- Все интерактивные элементы ≥44×44px.
- Body line length на reading-страницах не превышает 65ch.
- Иерархия заголовков визуально читается с одного взгляда (h1 → h2 → h3 → body).
- Smoke-тест каждой секции index.html в DevTools responsive mode без визуальных дефектов.
- `hugo server` собирает без ошибок и warning'ов о шаблонах.

## Out of scope

- Редизайн (новый стиль, новые цвета, новые шрифты).
- Новые секции / новые блоки контента.
- Изменения в JS.
- Изменения SEO/метаданных.
- Performance-оптимизации (отдельная задача — `optimize` skill).
- Accessibility-аудит (отдельная задача — `audit` skill).
