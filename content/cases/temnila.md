---
keywords: ["тонировка сайт", "сайт автосервис", "Next.js сайт"]
title: "Сайт для тонировки Темнила — с нуля до своего канала заявок"
date: 2026-04-14
description: "Разработка сайта для сервиса тонировки в Петербурге: Next.js, блог, подарочные сертификаты, SEO."
readtime: 2
metric:
  value: "10"
  label: "SEO-статей в комплекте"
---

## Задача

Темнила — сервис тонировки автомобилей в Санкт-Петербурге. Своего сайта не было. Клиенты приходили от автосервисов-партнёров и с одного объявления на Авито. Нужен был сайт, который даст свой канал заявок и начнёт работать на поисковый трафик.

## Что было

- Сайта нет — только объявление на Авито
- Клиенты от автосервисов — зависимость от чужого потока
- Нет присутствия в поиске по запросам про тонировку в СПб

## Что сделали

### 1. Дизайн и вёрстка

Тёмная тема — под специфику бизнеса. Премиальный вид без перегруза. Mobile-first — большинство заходит с телефона.

Стек: Next.js 16 + React 19 + Tailwind CSS 4. Шрифт — GT Eesti Pro Display.

<video src="/images/cases/temnila/desktop.mp4" poster="/images/cases/temnila/desktop-poster.webp" autoplay loop muted playsinline preload="auto" style="width:100%;border-radius:8px;background:#000;"></video>

### 2. Страницы услуг

4 типа тонировки — каждая на отдельной странице с описанием, ценами и особенностями:
- Атермальная
- Классическая
- Лобовое стекло
- Растонировка

### 3. Блог на MDX

10 статей для SEO — от "какую плёнку выбрать" до "штрафы за тонировку". Каждая статья — точка входа из поиска.

### 4. Подарочные сертификаты

Интерактивная форма + PDF-генерация через Playwright. Можно купить сертификат на тонировку в подарок — API для создания, верификации и проверки статуса.

### 5. Инфраструктура

- Docker-деплой на VPS
- Яндекс.Метрика для аналитики
- Nodemailer для отправки писем
- Форма заявки

<div style="max-width:390px;border-radius:8px;overflow:hidden;aspect-ratio:9/16;background:#1a1a2e;"><video src="/images/cases/temnila/mobile.mp4" poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='393' height='780'%3E%3Crect width='393' height='780' fill='%231a1a2e'/%3E%3C/svg%3E" autoplay loop muted playsinline preload="auto" style="width:100%;height:120%;object-fit:cover;object-position:top;background:#1a1a2e !important;"></video></div>

## Результат

- Свой сайт вместо зависимости от Авито
- 10 SEO-статей для органического трафика
- Подарочные сертификаты — дополнительный канал продаж
- Полная аналитика через Яндекс.Метрику

## Технический стек

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4
- MDX (блог)
- Playwright (PDF-сертификаты)
- Docker, Nginx
- Nodemailer, Яндекс.Метрика

## Хотите так же?

Напишите [@eldarmarketing](https://t.me/eldarmarketing) — обсудим вашу задачу.
