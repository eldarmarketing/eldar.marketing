---
keywords: ["AI-ассистент", "автоматизация", "маркетинг"]
title: "OpenClaw за 10 минут: от 2 часов мучений до автоустановки"
date: 2026-02-11
description: "Как я упаковал установку AI-ассистента на VPS в переиспользуемый скилл. История ошибок, DNS-трюк для России и готовый рецепт."
---

Вчера я потратил 2 часа на то, что сегодня занимает 10 минут.

Задача простая: поставить AI-ассистента на VPS клиента, подключить Telegram-бота. Звучит на 15 минут. Получилось — на 2 часа. Зато второй раз — на 10 минут. Рассказываю, почему.

## Что я ставил

[OpenClaw](https://github.com/openclaw/openclaw) — open-source платформа, которая превращает Claude в Telegram-бота с памятью, инструментами и доступом к вашим данным. Не просто чат-обёртка — полноценный ассистент с файлами, скриптами и cron-задачами.

Клиенту нужен был личный AI-помощник для автоателье: спросил «сколько заказов в работе?» — получил ответ из CRM.

## Проблема №1: Россия

VPS в Москве. Anthropic API блокирует российские IP. Классика.

Первая попытка — HTTP-прокси через US. Настроил `globalThis.fetch` с ProxyAgent. Anthropic заработал. Telegram — сломался. Потому что Telegram тоже использует fetch, и мой патч перехватывал все запросы.

Вторая попытка — `EnvHttpProxyAgent` с `NO_PROXY` для Telegram. Не работает в Node.js 22 для undici. Telegram polling падает каждые 10 секунд.

Третья попытка — `ANTHROPIC_BASE_URL` через nginx reverse proxy. Работает! Но Anthropic SDK видит, что URL не `api.anthropic.com`, и не отправляет OAuth-заголовки. Ответ: «OAuth authentication is currently not supported.»

## Решение: DNS-трюк

Идея простая: пусть SDK думает, что общается с Anthropic напрямую.

```
# На VPS клиента
echo "<IP_ВАШЕГО_ПРОКСИ> api.anthropic.com" >> /etc/hosts
```

Теперь `api.anthropic.com` резолвится на мой VPS в Европе, где nginx проксирует к реальному Anthropic:

```nginx
server {
    listen 443 ssl;
    server_name api.anthropic.com;

    ssl_certificate /etc/nginx/anthropic-proxy-cert.pem;
    ssl_certificate_key /etc/nginx/anthropic-proxy-key.pem;

    allow <IP_КЛИЕНТА>;
    deny all;

    location / {
        resolver 8.8.8.8 ipv6=off;
        set $backend "https://api.anthropic.com";
        proxy_pass $backend;
        proxy_ssl_server_name on;
        proxy_ssl_name api.anthropic.com;
        proxy_set_header Host api.anthropic.com;
        proxy_pass_request_headers on;
        proxy_buffering off;
        proxy_read_timeout 300s;
    }
}
```

Self-signed сертификат для `api.anthropic.com`, `NODE_EXTRA_CA_CERTS` — и SDK даже не замечает подмены. Все заголовки проходят как есть, OAuth работает.

## Проблема №2: autoSelectFamily

После прокси — новая ошибка: `sendMessage failed: Network request failed`. Telegram не может отправить сообщение. Но curl к Telegram API работает!

Оказалось, OpenClaw ставит `autoSelectFamily=false` для Telegram по умолчанию. На некоторых VPS это ломает IPv4/IPv6 fallback. Фикс — одна строка:

```bash
openclaw config set channels.telegram.network.autoSelectFamily true
```

## Проблема №3: формат auth-profiles.json

Токен прописал. Gateway не видит. «No API key found for provider anthropic.»

Оказалось, формат файла строгий:

```json
{
  "version": 1,
  "profiles": {
    "anthropic:default": {
      "type": "token",
      "provider": "anthropic",
      "token": "sk-ant-oat01-..."
    }
  },
  "lastGood": {
    "anthropic": "anthropic:default"
  }
}
```

Не `"type": "api_key"`, не плоский формат. Именно так — с `version: 1`, `lastGood` и вложенным `profiles`.

## Упаковка в скилл

Когда всё заработало, я записал каждый шаг и каждую ошибку в скилл — файл с инструкциями, который мой AI-ассистент использует при следующей установке.

Результат: 10 шагов, таблица диагностики на 9 типичных ошибок, два варианта (с прокси и без). Второй деплой для другого клиента занял 7 минут вместо 2 часов.

## Мораль

Каждая проблема, которую ты решил и не записал — это проблема, которую ты будешь решать снова. Скилл — это просто markdown-файл с пошаговыми инструкциями. Но разница между «я знаю как» и «у меня записано как» — это разница между 2 часами и 10 минутами.

Принцип простой: **Fix once → Rule forever.**

---

*Исходники OpenClaw: [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)*
*Документация: [docs.openclaw.ai](https://docs.openclaw.ai)*
