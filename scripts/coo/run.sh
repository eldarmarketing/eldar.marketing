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
    PROMPT="Heartbeat COO (только чтение, ничего не менять и не отправлять): (1) борд «Клиенты»: данные бери ТОЛЬКО из 'bash scripts/coo/board.sh' (борд уже синхронизирован со статусами issues скриптом). Алерты по борду строго по правилам: Inbox — алерт «без разбора» ТОЛЬКО если issue открыта (gh issue view N -R eldarmarketing/<repo> --json state,updatedAt) И в последних коммитах репо (gh api repos/eldarmarketing/<repo>/commits --jq '.[:10]') и комментариях issue за последние 3 дня НЕТ признаков, что работа по её теме сделана; если признаки есть — вместо алерта одна строка «<repo>#N: похоже сделано, но борд не обновлён — закрыть и в Done». In Progress/Waiting — алерт только при updatedAt старше 3 дней. Формат каждого алерта: <repo>#N · <статус> · <возраст> дн · <причина одним предложением>. Ничего не выдумывай — каждая строка подтверждена выводом команды; (2) непрочитанные в Telegram; (3) НЕОТВЕЧЕННЫЕ клиенты Strattera: в чате «strattera / посылки» (telegram-reader, id -1002291288806) найди сообщения «💬 Сообщение от …» за последние сутки, на которые после НЕТ ответа оператора (реплай человека или «✅ Ответ отправлен») — вопрос без ответа старше 4 часов = алерт с именем клиента и текстом. Если telegram-reader отдаёт 'database is locked' — одна повторная попытка через 20 секунд, дальше просто пометь «TG занят» одной строкой, не трать время. Если ничего не требует внимания владельца — последней строкой ответа выведи ровно OK. Иначе — короткий нумерованный список."
    ;;
  retro)
    TITLE="Ретро: черновик готов"
    MODEL="openai-codex/gpt-5.6-sol"
    PROMPT="Подготовь ЧЕРНОВИК пятничного ретро (ничего не публиковать): коммиты недели по клиентским репо (gh), состояние борда «Клиенты», поступления недели (python3 scripts/tochka/tochka.py statement --from \$(date -v-mon +%F)). Структура: сделано / деньги / зависло / вопросы к владельцу."
    ;;
  *)
    echo "unknown mode: $MODE" >&2; exit 2;;
esac

# Детерминированная сверка борда с GitHub перед LLM-прогоном:
# карточка с ЗАКРЫТОЙ issue не в Done → двигаем в Done (единственный источник
# ложных «Inbox без разбора»). Только статус, ничего больше не трогаем.
board_sync() {
  local pid
  pid=$(gh project view 1 --owner eldarmarketing --format json --jq .id 2>/dev/null) || return 0
  gh project item-list 1 --owner eldarmarketing --limit 200 --format json 2>/dev/null \
  | jq -r '.items[] | select(.content.type == "Issue" and .status != "Done")
      | [.id, .content.repository, (.content.number|tostring)] | @tsv' \
  | while IFS=$'\t' read -r iid repo num; do
      [ "$(gh issue view "$num" -R "$repo" --json state --jq .state 2>/dev/null)" = "CLOSED" ] || continue
      gh project item-edit --id "$iid" --project-id "$pid" \
        --field-id "PVTSSF_lAHODwDuH84BSfuzzhAAxMk" --single-select-option-id "43113069" >/dev/null 2>&1 \
        && echo "board-sync: $repo#$num (issue закрыта) → Done"
    done
}
board_sync >"$OUT_DIR/$TS-board-sync.log" 2>&1
[ -s "$OUT_DIR/$TS-board-sync.log" ] || rm -f "$OUT_DIR/$TS-board-sync.log"

# Разовая миграция телеграм-сессии в WAL (снимает «database is locked» при
# параллельных клиентах); пока база занята — молча пробуем в следующий раз.
sqlite3 -cmd ".timeout 3000" "$HOME/birson_session.session" "PRAGMA journal_mode=WAL;" >/dev/null 2>&1 || true

# Единый стиль: ответ уходит в Telegram (tg_send конвертирует markdown → HTML).
STYLE=" Оформление ответа (уйдёт сообщением в Telegram): каждую секцию начинай строкой-заголовком «эмодзи + **жирный заголовок**» (📋 борд, ✈️ телеграм, 🛒 strattera, 💰 деньги, ⚠️ проблемы); пункты — короткие строки с нумерацией или «—»; имена, суммы, дедлайны и repo#N выделяй **жирным**, команды — в \`бэктиках\`; пустая строка между секциями. НИКАКИХ #-заголовков, таблиц, код-блоков и HTML. Служебные правила (например ровно OK последней строкой) — без оформления."

omp -p --model "$MODEL" --max-time 600 "$PROMPT$STYLE" >"$LOG" 2>&1
RC=$?

# Доставка: основной канал — Telegram (@ai_eldar_bot), macOS-баннер как дубль.
[ -f "$HOME/.config/coo/.env" ] && { set -a; . "$HOME/.config/coo/.env"; set +a; }

banner() {
  /usr/bin/osascript -e "display notification \"$1\" with title \"AI-COO: $TITLE\"" 2>/dev/null
}

# Markdown от модели → Telegram HTML: **b** → <b>, `x` → <code>, # → жирный.
tg_html() {
  perl -pe '
    s/&/&amp;/g; s/</&lt;/g; s/>/&gt;/g;
    s/\*\*(.+?)\*\*/<b>$1<\/b>/g;
    s/`([^`]+)`/<code>$1<\/code>/g;
    s/^#{1,6}\s+(.*)$/<b>$1<\/b>/;
  '
}

tg_send() {
  [ -z "${NOTIFY_BOT_TOKEN:-}" ] || [ -z "${NOTIFY_CHAT_ID:-}" ] && return 1
  local text="$1" chunk html resp
  while [ -n "$text" ]; do
    chunk="${text:0:3500}"
    text="${text:3500}"
    html="$(printf '%s' "$chunk" | tg_html)"
    resp=$(curl -sS --max-time 20 -X POST \
      "https://api.telegram.org/bot$NOTIFY_BOT_TOKEN/sendMessage" \
      --data-urlencode "chat_id=$NOTIFY_CHAT_ID" \
      --data-urlencode "parse_mode=HTML" \
      --data-urlencode "disable_web_page_preview=true" \
      --data-urlencode "text=$html")
    # HTML не прошёл (битая разметка от модели) → шлём этот кусок плоско.
    case "$resp" in
      *'"ok":true'*) ;;
      *) curl -sS -o /dev/null --max-time 20 -X POST \
           "https://api.telegram.org/bot$NOTIFY_BOT_TOKEN/sendMessage" \
           --data-urlencode "chat_id=$NOTIFY_CHAT_ID" \
           --data-urlencode "text=$chunk";;
    esac
  done
}

if [ $RC -ne 0 ]; then
  tg_send "⚠️ AI-COO: $TITLE — сбой запуска ($RC). Лог: .briefings/$(basename "$LOG")"
  banner "Сбой запуска ($RC) — см. $LOG"
  exit $RC
fi

if [ "$MODE" = "heartbeat" ] && tail -3 "$LOG" | grep -qx "OK"; then
  exit 0  # тишина по умолчанию: всё в порядке
fi

BODY="$(sed '/^Working\.\.\.$/d' "$LOG")"
tg_send "🤖 **AI-COO · $TITLE** · $(date '+%d.%m %H:%M')

$BODY"
banner "Готово → .briefings/$(basename "$LOG")"
