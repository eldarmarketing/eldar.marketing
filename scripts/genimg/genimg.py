#!/usr/bin/env python3
"""Генерация картинок для контента через kie.ai (issue eldar.marketing#10).

Использование:
  export KIE_API_KEY=...   # ключ с https://kie.ai (пополнение СБП)
  python3 genimg.py "промпт" -o cover.png
  python3 genimg.py "логотип-иконка" -o icon.png --transparent
  python3 genimg.py "промпт" -o img.png --model google/nano-banana-2 --size 16:9

Прозрачность: модели не умеют нативную альфу — генерируем на chroma-зелёном
фоне и вырезаем его (паттерн из чата вайбкодеров, июль 2026).

Зависимости: pip install pillow requests
"""

import argparse
import os
import sys
import time

try:
    import requests
except ImportError:
    print("error: нет зависимостей — pip install pillow requests", file=sys.stderr)
    sys.exit(1)

API = "https://api.kie.ai/api/v1"
CHROMA_SUFFIX = (
    ", isolated on a solid pure chroma green background (#00FF00), "
    "no shadows on background, sharp subject edges"
)


def die(msg: str) -> None:
    print(f"error: {msg}", file=sys.stderr)
    sys.exit(1)


def create_task(key: str, model: str, prompt: str, size: str) -> str:
    r = requests.post(
        f"{API}/jobs/createTask",
        headers={"Authorization": f"Bearer {key}"},
        json={
            "model": model,
            "input": {"prompt": prompt, "output_format": "png", "image_size": size},
        },
        timeout=30,
    )
    r.raise_for_status()
    data = r.json()
    task_id = (data.get("data") or {}).get("taskId") or data.get("taskId")
    if not task_id:
        die(f"createTask без taskId: {data}")
    return task_id


def poll(key: str, task_id: str, timeout_s: int = 300) -> str:
    """Ждёт завершения, возвращает URL картинки."""
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        r = requests.get(
            f"{API}/jobs/recordInfo",
            headers={"Authorization": f"Bearer {key}"},
            params={"taskId": task_id},
            timeout=30,
        )
        r.raise_for_status()
        data = r.json().get("data") or {}
        state = (data.get("state") or data.get("status") or "").lower()
        if state in ("success", "completed", "succeeded"):
            result = data.get("resultJson") or data.get("result") or {}
            if isinstance(result, str):
                import json as _json

                result = _json.loads(result)
            urls = (
                result.get("resultUrls")
                or result.get("result_urls")
                or result.get("urls")
                or []
            )
            if not urls:
                die(f"задача завершена, но URL нет: {data}")
            return urls[0]
        if state in ("failed", "error"):
            die(f"генерация упала: {data.get('failMsg') or data}")
        time.sleep(5)
    die(f"таймаут {timeout_s}s (taskId={task_id})")
    raise AssertionError  # unreachable


def remove_chroma(png_path: str, threshold: int = 110) -> None:
    """Вырезает chroma-зелёный фон -> альфа. In-place."""
    from PIL import Image

    img = Image.open(png_path).convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            # зелёный доминирует и ярче остальных каналов
            if g > 120 and g - max(r, b) > threshold // 2 and (g - r) + (g - b) > threshold:
                px[x, y] = (r, g, b, 0)
    img.save(png_path)


def main() -> None:
    p = argparse.ArgumentParser(description="Генерация картинок через kie.ai")
    p.add_argument("prompt")
    p.add_argument("-o", "--out", required=True, help="выходной .png")
    p.add_argument("--model", default="google/nano-banana-2")
    p.add_argument("--size", default="1:1", help="1:1 | 16:9 | 9:16 | 3:2 ...")
    p.add_argument("--transparent", action="store_true", help="chroma-фон -> альфа")
    p.add_argument("--timeout", type=int, default=300)
    args = p.parse_args()

    key = os.environ.get("KIE_API_KEY")
    if not key:
        die("нет KIE_API_KEY (ключ: https://kie.ai, API Key Management)")

    prompt = args.prompt + (CHROMA_SUFFIX if args.transparent else "")
    task_id = create_task(key, args.model, prompt, args.size)
    print(f"task: {task_id}", file=sys.stderr)
    url = poll(key, task_id, args.timeout)

    img = requests.get(url, timeout=60)
    img.raise_for_status()
    with open(args.out, "wb") as f:
        f.write(img.content)

    if args.transparent:
        remove_chroma(args.out)
    print(args.out)


if __name__ == "__main__":
    main()
