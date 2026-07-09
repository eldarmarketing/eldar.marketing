# Runbook: VPS down (89.169.38.127)

Основной VPS: eldarmarketing.ru, birsonavto.ru + CRM, temnila.ru, 4mashiny, fishapp, Strattera (pm2), пельменная, ТДО.

## Первые 5 минут

```bash
# 1. Что лежит снаружи?
for u in https://eldarmarketing.ru https://birsonavto.ru https://crm.birsonavto.ru/login https://temnila.ru; do
  printf "%s: " "$u"; curl -s -o /dev/null -w "%{http_code} (%{time_total}s)\n" -m 15 "$u"; done

# 2. SSH (если refused — подожди 30–60 сек и повтори: бывает при перегрузке)
ssh root@89.169.38.127

# 3. Общее состояние
df -h /            # диск: >85% — ЧИСТИТЬ (см. ниже)
free -h            # available < 1G — ищи пожирателя: ps aux --sort=-%mem | head
docker ps --format '{{.Names}}\t{{.Status}}' | sort   # что не Up/healthy?
pm2 ls             # Strattera и 1integra; ↺ растёт = краш-цикл
dmesg | grep -i oom | tail   # OOM killer?
```

## Типовые причины и лечение

| Симптом | Причина | Лечение |
|---|---|---|
| Диск >85% | docker builder cache (копится ~90 ГБ за квартал) | `docker builder prune -af && docker image prune -af` (weekly cron стоит: вс 04:00, лог /var/log/docker-weekly-prune.log) |
| Контейнер unhealthy | приложение зависло | autoheal перезапустит сам (режим all); вручную: `docker restart <name>` |
| Сайт 502, контейнер Up | NPM/proxy-net | `docker restart reverse-proxy`; проверь `docker network inspect proxy-net` |
| pm2 ↺ сотни рестартов | краш-цикл | `pm2 logs <name> --lines 50`; если мусорный процесс — `pm2 delete <name> && pm2 save` |
| SSH refused, сайты живы | перегрузка/сборка | подожди; не паникуй, autoheal работает |
| RAM/swap забиты | утечка в контейнере | `docker stats --no-stream | sort -k7 -h | tail`; рестарт виновника |

## Во время инцидента builds запрещены

Тяжёлая docker-сборка на проде выжимает CPU/IO → healthchecks валятся → autoheal перезапускает здоровые контейнеры. Сборки — только когда всё зелёное.

## После инцидента

1. Причина → комментарий в eldarmarketing/eldar.marketing#1.
2. Если новый класс отказа — добавить строку в таблицу выше.
3. Проверить acceptance: диск <70%, available RAM ≥2G, все критичные healthy.
