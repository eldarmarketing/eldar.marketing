#!/usr/bin/env python3
"""IndexNow: отправка URL сайта в Яндекс/Bing после деплоя.

Использование:
  python3 scripts/indexnow.py                 # все URL из прод-sitemap
  python3 scripts/indexnow.py URL [URL ...]   # только указанные
"""
import json
import re
import sys
import urllib.request

HOST = "eldarmarketing.ru"
KEY = "ec5b31bab920483a8a32c3874821e26d"

def sitemap_urls():
    xml = urllib.request.urlopen(f"https://{HOST}/sitemap.xml", timeout=30).read().decode()
    return re.findall(r"<loc>([^<]+)</loc>", xml)

urls = sys.argv[1:] or sitemap_urls()
payload = {"host": HOST, "key": KEY,
           "keyLocation": f"https://{HOST}/{KEY}.txt", "urlList": urls}
req = urllib.request.Request("https://api.indexnow.org/indexnow",
    data=json.dumps(payload).encode(),
    headers={"Content-Type": "application/json; charset=utf-8"})
with urllib.request.urlopen(req, timeout=30) as r:
    print(f"IndexNow: HTTP {r.status} — отправлено {len(urls)} URL")
