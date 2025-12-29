# 🎬 Руководство по системе анимаций "Smooth Minimalism"

## Философия

Система анимаций разработана специально для минималистичного дизайна вашего сайта. Основные принципы:

- **Профессионализм**: анимации тонкие, не отвлекающие
- **Геометрическая точность**: четкие, линейные движения
- **Плавность**: использование современных easing-функций
- **Иерархия**: важные элементы движутся сильнее

## Структура системы

### 1. Timing Functions (Функции плавности)

```css
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)      /* Универсальная плавность */
--ease-enter: cubic-bezier(0, 0, 0.2, 1)         /* Появление элементов */
--ease-exit: cubic-bezier(0.4, 0, 1, 1)          /* Исчезновение элементов */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)  /* Игривый отскок */
--ease-elastic: cubic-bezier(0.68, -0.25, 0.265, 1.25) /* Эластичность */
```

### 2. Durations (Длительность)

```css
--duration-instant: 150ms    /* Мгновенные изменения */
--duration-fast: 250ms       /* Быстрые эффекты */
--duration-normal: 400ms     /* Стандартная анимация */
--duration-slow: 600ms       /* Плавное появление */
--duration-very-slow: 900ms  /* Акцентные эффекты */
```

### 3. Delays (Задержки)

```css
--delay-step: 80ms           /* Шаг для каскадных анимаций */
```

## Основные паттерны анимаций

### 1. Появление контента (Content Reveal)

#### fadeInUp
Базовая анимация появления снизу вверх

```css
.element {
  animation: fadeInUp var(--duration-slow) var(--ease-smooth);
}
```

**Когда использовать**: карточки, секции, основной контент

#### fadeInDown
Появление сверху вниз

```css
.header {
  animation: fadeInDown var(--duration-normal) var(--ease-smooth);
}
```

**Когда использовать**: header, уведомления, дропдауны

#### fadeInLeft / fadeInRight
Боковое появление

```css
.sidebar {
  animation: fadeInLeft var(--duration-slow) var(--ease-smooth);
}
```

**Когда использовать**: боковые панели, фотографии, изображения

#### scaleFadeIn
Масштабирование с появлением

```css
.stat-card {
  animation: scaleFadeIn var(--duration-slow) var(--ease-smooth);
}
```

**Когда использовать**: статистика, акцентные карточки, модальные окна

### 2. Hover эффекты

#### Подъем с тенью (Lift Effect)

```css
.card {
  transition: transform var(--duration-normal) var(--ease-smooth),
              box-shadow var(--duration-normal) var(--ease-smooth);
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}
```

**Когда использовать**: карточки, кнопки, интерактивные блоки

#### Магнитный эффект (Magnetic Pull)

```css
.btn {
  transition: transform var(--duration-fast) var(--ease-elastic);
}

.btn:hover {
  transform: scale(1.02);
}

.btn:active {
  transform: scale(0.98);
}
```

**Когда использовать**: основные кнопки, CTA элементы

#### Подчеркивание (Underline)

```css
.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width var(--duration-normal) var(--ease-smooth);
}

.link:hover::after {
  width: 100%;
}
```

**Когда использовать**: текстовые ссылки, навигация

### 3. Каскадные анимации

Для плавного появления списка элементов:

```css
.item {
  animation: fadeInUp var(--duration-slow) var(--ease-smooth) backwards;
}

.item:nth-child(1) { animation-delay: calc(var(--delay-step) * 0.5); }
.item:nth-child(2) { animation-delay: calc(var(--delay-step) * 1); }
.item:nth-child(3) { animation-delay: calc(var(--delay-step) * 1.5); }
/* и так далее */
```

**Когда использовать**: списки карточек, меню, галереи

### 4. Интерактивные детали

#### Иконки

```css
.icon {
  transition: transform var(--duration-fast) var(--ease-smooth);
}

.button:hover .icon {
  transform: scale(1.1) rotate(-5deg);
}
```

#### Теги/бейджи

```css
.tag {
  transition: transform var(--duration-fast) var(--ease-smooth);
}

.card:hover .tag {
  transform: translateY(-2px);
}
```

#### Цифры статистики

```css
.stat-value {
  transition: transform var(--duration-fast) var(--ease-elastic);
}

.stat-card:hover .stat-value {
  transform: scale(1.15);
}
```

## Примеры использования

### Hero секция

```css
.hero {
  animation: fadeInUp var(--duration-slow) var(--ease-smooth);
}

.hero h1 {
  animation: fadeInUp var(--duration-slow) var(--ease-smooth) 0.1s backwards;
}

.hero-subtitle {
  animation: fadeInUp var(--duration-slow) var(--ease-smooth) 0.2s backwards;
}

.hero-buttons {
  animation: fadeInUp var(--duration-slow) var(--ease-smooth) 0.3s backwards;
}
```

### Карточки с результатами

```css
.result-card {
  transition: border-color var(--duration-normal) var(--ease-smooth),
              transform var(--duration-normal) var(--ease-smooth),
              box-shadow var(--duration-normal) var(--ease-smooth);
}

.result-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.result-card:hover .result-value {
  transform: scale(1.15);
}
```

### Модальные окна

```css
.modal-overlay {
  animation: modalFadeIn var(--duration-normal) var(--ease-smooth);
}

.modal-content {
  animation: modalSlideUp var(--duration-normal) var(--ease-smooth);
}

.modal-close:hover {
  transform: rotate(90deg);
}
```

### Списки с hover эффектом

```css
.list-item {
  transition: transform var(--duration-fast) var(--ease-smooth),
              color var(--duration-fast) var(--ease-smooth);
}

.list-item:hover {
  transform: translateX(8px);
  color: var(--color-text);
}

.list-item::before {
  transition: transform var(--duration-fast) var(--ease-smooth);
}

.list-item:hover::before {
  transform: scale(1.5);
}
```

## Готовые utility-классы

Система предоставляет готовые классы для быстрого применения:

```html
<!-- Задержки -->
<div class="delay-100">...</div>
<div class="delay-200">...</div>

<!-- Hover эффекты -->
<div class="hover-lift">...</div>
<div class="hover-scale">...</div>

<!-- Анимации -->
<div class="animate-float">...</div>
<div class="animate-pulse">...</div>
```

## Best Practices

### ✅ Делайте

1. **Используйте единые переменные**: всегда используйте CSS-переменные для timing и duration
2. **Комбинируйте свойства**: анимируйте несколько свойств одновременно для богатого эффекта
3. **Соблюдайте иерархию**: более важные элементы должны двигаться сильнее
4. **Тестируйте на медленных устройствах**: убедитесь, что анимации не тормозят
5. **Уважайте prefers-reduced-motion**: система автоматически отключает анимации для пользователей с ограничениями

### ❌ Избегайте

1. **Слишком долгих анимаций**: пользователь не должен ждать
2. **Слишком много движения**: не анимируйте всё подряд
3. **Конфликтующих анимаций**: один элемент - одна основная анимация
4. **Анимаций layout**: избегайте анимации width/height, используйте transform
5. **Игнорирования производительности**: используйте transform и opacity для лучшей производительности

## Производительность

### Оптимизированные свойства

Для плавных 60fps анимаций используйте только:

- `transform` (translateX, translateY, scale, rotate)
- `opacity`

### Избегайте анимации

- `width`, `height` → используйте `scale`
- `top`, `left` → используйте `translate`
- `margin`, `padding` → используйте `translate`
- `background-position` (кроме градиентов)

### Используйте will-change для сложных анимаций

```css
.complex-animation {
  will-change: transform, opacity;
}
```

**Важно**: не злоупотребляйте `will-change`, это может снизить производительность!

## Accessibility (Доступность)

Система автоматически отключает анимации для пользователей с `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Это обязательно для соответствия стандартам WCAG 2.1.

## Отладка анимаций

### Chrome DevTools

1. Откройте DevTools (F12)
2. Перейдите в Animations panel (Ctrl+Shift+P → "Show Animations")
3. Замедлите анимации для детальной проверки

### Firefox DevTools

1. Откройте DevTools (F12)
2. Перейдите в Inspector → Animations
3. Используйте визуальный timeline для анализа

## Расширение системы

Для добавления новых анимаций:

1. Добавьте @keyframes в `animations.css`
2. Следуйте naming convention: `actionObject` (fadeInUp, slideReveal)
3. Используйте существующие timing-функции
4. Добавьте примеры в эту документацию

---

**Создано для проекта eldar.marketing**
Концепция: Smooth Minimalism - профессиональные анимации для минималистичного дизайна

