---
keywords: ["AI-ассистент", "автоматизация", "маркетинг"]
title: "Как вывести Telegram-канал на сайт без виджетов и iframe"
date: 2026-02-14
description: "Как интегрировать посты из Telegram-канала в дизайн сайта через серверный парсинг на Next.js"
tags: ["telegram", "nextjs", "integration", "parsing", "react"]
---

Недавно столкнулся с интересной задачей для клиента — нужно было вывести последние посты из Telegram-канала на главную страницу сайта. Казалось бы, есть стандартные виджеты от Telegram, но реальность оказалась сложнее.

## Проблема: виджеты не вписываются в дизайн

Стандартный путь — использовать официальный iframe-виджет от Telegram. Выглядит это примерно так:

```html
<iframe src="https://t.me/your_channel/embed" 
        width="100%" height="300"></iframe>
```

Но в реальности возникает куча проблем:

1. **Стилизация невозможна** — iframe полностью изолирован, нельзя применить цвета и шрифты сайта
2. **Ломает дизайн** — фиксированные размеры не адаптируются под мобилку
3. **Тяжёлый** — грузит много лишнего JS и CSS от Telegram
4. **CSP проблемы** — Content Security Policy может заблокировать iframe

У сайта тёмный дизайн с жёлтыми акцентами, а виджет Telegram — белый и голубой. Смотрится как чужеродный элемент.

## Решение: серверный парсинг публичной страницы

Telegram предоставляет публичные веб-страницы каналов по адресу `t.me/s/имя_канала`. Эти страницы можно парсить серверным кодом и извлекать нужные данные.

Преимущества подхода:
- Полный контроль над стилизацией
- Встраивается в дизайн-систему сайта
- Лёгкий — только нужные данные
- Работает без JavaScript на клиенте

## Код: парсинг и отображение

Создаём Server Component в Next.js для получения постов:

```tsx
// components/TelegramFeed.tsx
interface TelegramPost {
  id: string;
  text: string;
  date: string;
  image?: string;
}

async function fetchTelegramPosts(): Promise<TelegramPost[]> {
  const response = await fetch('https://t.me/s/your_channel', {
    next: { revalidate: 3600 } // кэш на час
  });
  
  const html = await response.text();
  const posts: TelegramPost[] = [];
  
  // Парсинг постов через regex
  const postPattern = /<div class="tgme_widget_message_wrap".*?>(.*?)<\/div>/gs;
  const matches = html.match(postPattern) || [];
  
  for (const match of matches.slice(0, 5)) { // берём 5 последних
    const post: TelegramPost = {
      id: extractId(match),
      text: extractText(match),
      date: extractDate(match),
      image: extractImage(match)
    };
    
    if (post.text) posts.push(post);
  }
  
  return posts;
}

function extractText(html: string): string {
  const textMatch = html.match(/<div class="tgme_widget_message_text.*?">(.*?)<\/div>/s);
  if (!textMatch) return '';
  
  return textMatch[1]
    .replace(/<[^>]*>/g, '') // убираем HTML теги
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function extractDate(html: string): string {
  const dateMatch = html.match(/datetime="([^"]+)"/);
  if (!dateMatch) return '';
  
  const date = new Date(dateMatch[1]);
  return date.toLocaleDateString('ru-RU');
}

function extractImage(html: string): string | undefined {
  const imgMatch = html.match(/background-image:url\('([^']+)'\)/);
  return imgMatch ? imgMatch[1] : undefined;
}

function extractId(html: string): string {
  const idMatch = html.match(/data-post="[^\/]+\/(\d+)"/);
  return idMatch ? idMatch[1] : Math.random().toString();
}

export default async function TelegramFeed() {
  const posts = await fetchTelegramPosts();
  
  return (
    <div className="telegram-feed">
      <h2>Новости автоателье</h2>
      
      <div className="posts-grid">
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            {post.image && (
              <img src={post.image} alt="" className="post-image" />
            )}
            
            <div className="post-content">
              <p className="post-text">{post.text}</p>
              <time className="post-date">{post.date}</time>
            </div>
          </article>
        ))}
      </div>
      
      <a 
        href="https://t.me/your_channel" 
        target="_blank"
        className="subscribe-btn"
      >
        Подписаться на канал
      </a>
    </div>
  );
}
```

Стили под тёмный дизайн клиента:

```css
.telegram-feed {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 8px;
}

.posts-grid {
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0;
}

.post-card {
  background: #2a2a2a;
  border-radius: 6px;
  overflow: hidden;
  border-left: 3px solid #ffd700; /* жёлтый акцент */
}

.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.post-content {
  padding: 1rem;
}

.post-text {
  color: #e0e0e0;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

.post-date {
  color: #999;
  font-size: 0.8rem;
}

.subscribe-btn {
  display: inline-block;
  background: #ffd700;
  color: #000;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
}

.subscribe-btn:hover {
  background: #e6c200;
}
```

## Результат с кэшированием

Получаем красивые карточки в стиле сайта, которые обновляются раз в час благодаря `revalidate: 3600`. Это оптимальный баланс между актуальностью и производительностью.

Это решило главную задачу — посты из Telegram органично вписались в дизайн сайта и стали частью пользовательского опыта.

## Плюсы и минусы подхода

**Плюсы:**
- ✅ Полный контроль над дизайном
- ✅ Лёгкий и быстрый
- ✅ Работает без клиентского JS
- ✅ SEO-дружественный
- ✅ Нет проблем с CSP

**Минусы:**
- ❌ Зависит от структуры HTML Telegram
- ❌ Может сломаться при изменении разметки
- ❌ Нужно парсить HTML вручную
- ❌ Ограниченная функциональность (без лайков/комментариев)

**Когда использовать:**
- Дизайн важнее функциональности
- Нужна быстрая загрузка
- Строгая дизайн-система
- Проблемы с iframe/CSP

**Альтернативы:**
- Telegram Bot API (нужен бот и токены)
- RSS-парсер (если канал поддерживает)
- Telegram Web API (сложнее в реализации)

---

Этот подход работает для публичных каналов и даёт полную свободу в дизайне. Получилось идеально интегрированное решение, которое выглядит как родная часть сайта.