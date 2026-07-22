#!/usr/bin/env python3
"""Генерация картинок через AiGate (OpenAI-совместимый шлюз).

Gemini image-модели на AiGate работают через /chat/completions
с modalities: ["text", "image"] (НЕ через /images/generations).

Ключ: env AIGATE_API_KEY / AIGATE_BASE_URL, иначе берём из ~/eldar_progress/.env.
"""
import argparse
import base64
import json
import os
import pathlib
import sys
import time
import urllib.request

DEFAULT_MODEL = "google/gemini-3.1-flash-image-preview"  # быстрая; качественнее: google/gemini-3-pro-image, openai/gpt-image-2

STYLE_BRAND = (
    "Minimalist abstract tech illustration, dark charcoal background (#0a0a0a), "
    "single vivid accent color, thin geometric lines, subtle grid, "
    "no text, no letters, no people, premium editorial style, 16:9 wide composition. Theme: "
)


def load_env():
    base = os.environ.get("AIGATE_BASE_URL")
    key = os.environ.get("AIGATE_API_KEY")
    if not (base and key):
        envfile = pathlib.Path.home() / "eldar_progress" / ".env"
        if envfile.exists():
            for line in envfile.read_text().splitlines():
                if line.startswith("AIGATE_") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k, v.strip().strip('"'))
        base = os.environ.get("AIGATE_BASE_URL")
        key = os.environ.get("AIGATE_API_KEY")
    if not (base and key):
        sys.exit("Нет AIGATE_API_KEY/AIGATE_BASE_URL (env или ~/eldar_progress/.env)")
    return base, key


def generate(prompt: str, model: str, base: str, key: str) -> bytes:
    payload = {
        "model": model,
        "modalities": ["text", "image"],
        "messages": [{"role": "user", "content": prompt}],
    }
    req = urllib.request.Request(
        base + "/chat/completions",
        data=json.dumps(payload).encode(),
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=240) as r:
        msg = json.loads(r.read())["choices"][0]["message"]
    url = None
    for img in msg.get("images") or []:
        url = img["image_url"]["url"] if isinstance(img, dict) else img
        break
    if not url and isinstance(msg.get("content"), list):
        for part in msg["content"]:
            if part.get("type") in ("image_url", "image"):
                url = part.get("image_url", {}).get("url") or part.get("url")
                break
    if not url:
        raise RuntimeError("в ответе нет картинки: " + json.dumps(msg)[:200])
    if url.startswith("data:"):
        return base64.b64decode(url.split(",", 1)[1])
    return urllib.request.urlopen(url, timeout=120).read()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("prompt")
    ap.add_argument("-o", "--out", default="out.png")
    ap.add_argument("--model", default=DEFAULT_MODEL)
    ap.add_argument("--brand", action="store_true", help="обернуть промпт в фирменный стиль обложек")
    ap.add_argument("--retries", type=int, default=3)
    args = ap.parse_args()

    base, key = load_env()
    prompt = (STYLE_BRAND + args.prompt) if args.brand else args.prompt
    err = None
    for attempt in range(args.retries):
        try:
            raw = generate(prompt, args.model, base, key)
            pathlib.Path(args.out).write_bytes(raw)
            print(f"OK {args.out} {len(raw) // 1024}KB")
            return
        except Exception as e:  # noqa: BLE001
            err = e
            time.sleep(3 * (attempt + 1))
    sys.exit(f"FAIL после {args.retries} попыток: {err}")


if __name__ == "__main__":
    main()
