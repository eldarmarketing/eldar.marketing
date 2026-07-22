#!/usr/bin/env python3
"""SEO-срез из Яндекс Вебмастера для пятничного ретро.

Токен: ~/.config/yandex-webmaster/app.json (поле token).
Выводит markdown: ИКС, страницы в поиске, активные проблемы, топ-запросы 30 дней.

Использование: python3 scripts/coo/seo-weekly.py [host_id ...]
По умолчанию — https:eldarmarketing.ru:443.
"""
import json
import pathlib
import sys
import urllib.parse
import urllib.request
from datetime import date, timedelta
import signal

signal.signal(signal.SIGPIPE, signal.SIG_DFL)

CFG = json.loads((pathlib.Path.home() / ".config/yandex-webmaster/app.json").read_text())
WM = "https://api.webmaster.yandex.net/v4"
DEFAULT_HOSTS = ["https:eldarmarketing.ru:443"]


def wm(path):
    req = urllib.request.Request(WM + path, headers={"Authorization": "OAuth " + CFG["token"]})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def report(uid, host):
    s = wm(f"/user/{uid}/hosts/{host}/summary")
    print(f"\n## {host.split(':')[1]}")
    print(f"ИКС: {s['sqi']} · в поиске: {s['searchable_pages_count']} стр. · исключено: {s['excluded_pages_count']}")

    diag = wm(f"/user/{uid}/hosts/{host}/diagnostics")["problems"]
    active = [f"{k} ({v['severity']})" for k, v in diag.items() if v["state"] == "PRESENT"]
    print("Проблемы: " + ("; ".join(active) if active else "нет"))

    d_to, d_from = date.today(), date.today() - timedelta(days=30)
    qs = urllib.parse.urlencode({
        "order_by": "TOTAL_SHOWS", "date_from": d_from, "date_to": d_to,
        "query_indicator": ["TOTAL_SHOWS", "TOTAL_CLICKS", "AVG_SHOW_POSITION"],
    }, doseq=True)
    queries = wm(f"/user/{uid}/hosts/{host}/search-queries/popular/?{qs}").get("queries", [])
    if queries:
        print(f"\n| Запрос | Показы | Клики | Позиция |\n|---|---|---|---|")
        for q in queries[:20]:
            i = q.get("indicators", {})
            print(f"| {q['query_text'][:50]} | {i.get('TOTAL_SHOWS', 0):.0f} | "
                  f"{i.get('TOTAL_CLICKS', 0):.0f} | {i.get('AVG_SHOW_POSITION', 0):.1f} |")


def main():
    uid = wm("/user")["user_id"]
    for host in (sys.argv[1:] or DEFAULT_HOSTS):
        try:
            report(uid, host)
        except Exception as e:  # noqa: BLE001
            print(f"\n## {host}: ошибка {e}")


if __name__ == "__main__":
    main()
