#!/bin/bash
# AI-COO автономные циклы (launchd): run.sh briefing|heartbeat|retro
# Результат: лог в .briefings/, macOS-уведомление (heartbeat молчит, если всё ок).
set -u
MODE="${1:?usage: run.sh briefing|heartbeat|retro}"
export HOME="${HOME:-/Users/eldar}"
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
REPO="$HOME/eldar-marketing-hugo"
OUT_DIR="$REPO/.briefings"
mkdir -p "$OUT_DIR"
TS="$(date +%F-%H%M)"
LOG="$OUT_DIR/$TS-$MODE.md"
cd "$REPO" || exit 1

# Модели: read-only джобы не жгут Max-квоту fable.
# heartbeat — sonnet (хватает для чтения борда/телеграма);
# briefing/retro — GPT Sol на квоте Codex (в -p/print-режиме codex-модели работают).
case "$MODE" in
  briefing)
    TITLE="Утренний брифинг"
    MODEL="openai-codex/gpt-5.6-sol"
    PROMPT="брифинг"
    ;;
  heartbeat)
    TITLE="Heartbeat"
    MODEL="anthropic/claude-sonnet-5"
    PROMPT="Heartbeat COO (только чтение, ничего не менять и не отправлять): (1) борд «Клиенты» (gh project); (2) непрочитанные в Telegram; (3) НЕОТВЕЧЕННЫЕ клиенты Strattera: в чате «strattera / посылки» (telegram-reader, id -1002291288806) найди сообщения «💬 Сообщение от …» за последние сутки, на которые после НЕТ ответа оператора (реплай человека или «✅ Ответ отправлен») — вопрос без ответа старше 4 часов = алерт с именем клиента и текстом. Если ничего не требует внимания владельца — последней строкой ответа выведи ровно OK. Иначе — короткий нумерованный список."
    ;;
  retro)
    TITLE="Ретро: черновик готов"
    MODEL="openai-codex/gpt-5.6-sol"
    PROMPT="Подготовь ЧЕРНОВИК пятничного ретро (ничего не публиковать): коммиты недели по клиентским репо (gh), состояние борда «Клиенты», поступления недели (python3 scripts/tochka/tochka.py statement --from \$(date -v-mon +%F)). Структура: сделано / деньги / зависло / вопросы к владельцу."
    ;;
  *)
    echo "unknown mode: $MODE" >&2; exit 2;;
esac

omp -p --model "$MODEL" --max-time 600 "$PROMPT" >"$LOG" 2>&1
RC=$?

notify() {
  /usr/bin/osascript -e "display notification \"$1\" with title \"AI-COO: $TITLE\"" 2>/dev/null
}

if [ $RC -ne 0 ]; then
  notify "Сбой запуска ($RC) — см. $LOG"
  exit $RC
fi

if [ "$MODE" = "heartbeat" ] && tail -3 "$LOG" | grep -qx "OK"; then
  exit 0  # тишина по умолчанию: всё в порядке
fi

notify "Готово → .briefings/$(basename "$LOG")"
