#!/bin/bash
# Борд «Клиенты» в терминале: board [status]
# board          — активные колонки (без Done)
# board review   — одна колонка (inbox|todo|"in progress"|review|waiting|done)
set -u
FILTER="${1:-}"
R=$'\033[31m'; Y=$'\033[33m'; C=$'\033[36m'; B=$'\033[1m'; N=$'\033[0m'

JSON=$(gh project item-list 1 --owner eldarmarketing --limit 200 --format json)

show() {
  local st="$1"
  local rows
  rows=$(jq -r --arg st "$st" '
    .items[] | select(.content.type != "DraftIssue") | select((.status // "—") == $st) |
    "\(.priority // "—")\t\(.content.repository | sub("eldarmarketing/";""))#\(.content.number)\t\(.title)"' <<<"$JSON" | sort)
  [ -z "$rows" ] && return
  printf '%s%s (%d)%s\n' "$B" "$st" "$(wc -l <<<"$rows" | tr -d ' ')" "$N"
  while IFS=$'\t' read -r prio ref title; do
    local pc="$N"
    [ "$prio" = "P0" ] && pc="$R"
    [ "$prio" = "P1" ] && pc="$Y"
    printf '  %s%-3s%s %s%-24s%s %s\n' "$pc" "$prio" "$N" "$C" "$ref" "$N" "$title"
  done <<<"$rows"
}

if [ -n "$FILTER" ]; then
  case "$(tr '[:upper:]' '[:lower:]' <<<"$FILTER")" in
    inbox) show "Inbox";;
    todo) show "Todo";;
    "in progress"|progress|wip) show "In Progress";;
    review) show "Review";;
    waiting) show "Waiting";;
    done) show "Done";;
    *) echo "usage: board [inbox|todo|progress|review|waiting|done]" >&2; exit 2;;
  esac
else
  for st in "Inbox" "In Progress" "Review" "Waiting" "Todo"; do show "$st"; done
fi
