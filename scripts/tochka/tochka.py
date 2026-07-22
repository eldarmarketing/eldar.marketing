#!/usr/bin/env python3
"""Финансовый контур AI-COO: Точка Банк Open API.

Токены: ~/.config/tochka/.env
  TOCHKA_JWT       — ИП Малышев М.А. (агентство, по умолчанию)
  TOCHKA_JWT_ELDAR — ИП Абилвапов Э.М.

Команды:
    tochka.py accounts  [--who malyshev|eldar]
    tochka.py balance   [--who ...]
    tochka.py statement --from 2026-07-01 [--to 2026-07-21] [--account 4080...] [--json]
    tochka.py yesterday [--who ...]              # поступления за вчера (для брифинга)
    tochka.py income    [--year 2026] [--who ...]  # налоговая база УСН 6% + НДС-порог

Только чтение. Платежи и подписи через API не выполняются (T2-тир — только владелец).
"""
import argparse
import datetime as dt
import json
import os
import sys
import time
import urllib.error
import urllib.request

BASE = "https://enter.tochka.com/uapi/open-banking/v1.0"

WHO = {
    "malyshev": {"env": "TOCHKA_JWT", "label": "ИП Малышев М.А."},
    "eldar": {"env": "TOCHKA_JWT_ELDAR", "label": "ИП Абилвапов Э.М."},
}

# УСН 6% «Доходы», 2026 (docs/ai-coo/tax-profile.md)
TAX = {2026: {"rate": 0.06, "fixed": 57_390, "over300k": 0.01, "nds_limit": 20_000_000}}


def token(who: str) -> str:
    path = os.path.expanduser("~/.config/tochka/.env")
    key = WHO[who]["env"]
    for line in open(path, encoding="utf-8"):
        if line.startswith(key + "="):
            return line.split("=", 1)[1].strip()
    sys.exit(f"{key} не найден в {path}")


def api(who: str, method: str, path: str, body: dict | None = None) -> dict:
    req = urllib.request.Request(
        BASE + path,
        method=method,
        headers={"Authorization": "Bearer " + token(who), "Content-Type": "application/json"},
        data=json.dumps(body).encode() if body else None,
    )
    try:
        return json.loads(urllib.request.urlopen(req, timeout=30).read())
    except urllib.error.HTTPError as e:
        sys.exit(f"API {method} {path} → HTTP {e.code}: {e.read().decode(errors='replace')[:500]}")


def accounts(who: str) -> list[dict]:
    return api(who, "GET", "/accounts")["Data"]["Account"]


def own_tax_code(who: str) -> str:
    for c in api(who, "GET", "/customers")["Data"]["Customer"]:
        if c.get("customerType") == "Business":
            return c["taxCode"]
    return ""


def cmd_accounts(args):
    for a in accounts(args.who):
        print(f"{a['accountId']}  {a['status']}  открыт {a.get('registrationDate', '?')}")


def cmd_balance(args):
    total = 0.0
    for a in accounts(args.who):
        acc = a["accountId"]
        data = api(args.who, "GET", f"/accounts/{acc.replace('/', '%2F')}/balances")
        for b in data["Data"]["Balance"]:
            amt = float(b["Amount"]["amount"])
            total += amt
            print(f"{acc}  {b.get('type', '')}  {amt:,.2f} ₽".replace(",", " "))
    print(f"ИТОГО: {total:,.2f} ₽".replace(",", " "))


def fetch_statement(who: str, account_id: str, d_from: str, d_to: str) -> list[dict]:
    """Init statement → poll until Ready → return transactions."""
    init = api(who, "POST", "/statements", {
        "Data": {"Statement": {"accountId": account_id, "startDateTime": d_from, "endDateTime": d_to}}
    })
    st = init["Data"]["Statement"]
    st_id = st["statementId"]
    acc = account_id.replace("/", "%2F")
    for _ in range(30):
        res = api(who, "GET", f"/accounts/{acc}/statements/{st_id}")
        stmt = res["Data"]["Statement"][0] if isinstance(res["Data"]["Statement"], list) else res["Data"]["Statement"]
        status = stmt.get("status", "Ready")
        if status in ("Ready", "ready"):
            return stmt.get("Transaction", [])
        if status in ("Error", "error"):
            sys.exit(f"Выписка {st_id}: статус Error")
        time.sleep(1)
    sys.exit(f"Выписка {st_id} не готова за 30с")


def tx_fields(t: dict) -> tuple[str, float, str, str, str]:
    """(date, amount, credit|debit, counterparty, purpose)"""
    amount = float(t["Amount"]["amount"])
    side = t.get("creditDebitIndicator", "")
    date = (t.get("documentProcessDate") or t.get("bookingDate") or "")[:10]
    purpose = (t.get("description") or t.get("paymentPurpose") or "").strip()
    cp, cp_inn = "", ""
    for role in ("DebtorParty", "CreditorParty"):
        p = t.get(role) or {}
        if p and p.get("name"):
            if (side == "Credit" and role == "DebtorParty") or (side == "Debit" and role == "CreditorParty"):
                cp, cp_inn = p.get("name", ""), p.get("inn", "")
    return date, amount, side, f"{cp} ({cp_inn})" if cp_inn else cp, purpose


ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def classifications() -> list[dict]:
    """docs/ai-coo/classifications.yml — вердикты владельца по спорным операциям."""
    path = os.path.join(ROOT, "docs", "ai-coo", "classifications.yml")
    entries: list[dict] = []
    cur = None
    if not os.path.exists(path):
        return entries
    for line in open(path, encoding="utf-8"):
        s = line.strip()
        if s.startswith("#") or not s:
            continue
        if s.startswith("- "):
            cur = {}
            entries.append(cur)
            s = s[2:]
        if cur is None or ":" not in s:
            continue
        k, v = s.split(":", 1)
        cur[k.strip()] = v.strip().strip('"')
    return entries


def classify(date: str, amount: float, purpose: str) -> str | None:
    for e in classifications():
        try:
            if e.get("date") == date and abs(float(e.get("amount", "0")) - amount) < 0.01 \
                    and e.get("match", "") in purpose:
                return e.get("verdict")
        except ValueError:
            continue
    return None


def all_credits(who: str, d_from: str, d_to: str) -> list[tuple]:
    """Кредитовые операции по всем счетам, без переводов между своими счетами."""
    own_inn = own_tax_code(who)
    rows = []
    for a in accounts(who):
        for t in fetch_statement(who, a["accountId"], d_from, d_to):
            date, amount, side, cp, purpose = tx_fields(t)
            if side != "Credit":
                continue
            if own_inn and own_inn in cp:
                continue  # перевод между своими счетами / себе
            verdict = classify(date, amount, purpose)
            if verdict == "own":
                continue  # владелец подтвердил: собственные средства, не доход
            review = verdict != "income" and ("внесение" in purpose.lower() or "банк точка" in cp.lower())
            rows.append((date, amount, cp, purpose, a["accountId"], review))
    return sorted(rows)


def cmd_statement(args):
    d_to = args.to or dt.date.today().isoformat()
    accs = [args.account] if args.account else [a["accountId"] for a in accounts(args.who)]
    out = []
    for acc in accs:
        for t in fetch_statement(args.who, acc, getattr(args, "from"), d_to):
            date, amount, side, cp, purpose = tx_fields(t)
            out.append({"date": date, "amount": amount, "side": side, "counterparty": cp,
                        "purpose": purpose, "account": acc})
    if args.json:
        print(json.dumps(out, ensure_ascii=False, indent=1))
        return
    for r in out:
        sign = "+" if r["side"] == "Credit" else "-"
        print(f"{r['date']}  {sign}{r['amount']:>12,.2f} ₽  {r['counterparty'][:45]:45}  {r['purpose'][:60]}".replace(",", " "))


def cmd_yesterday(args):
    day = (dt.date.today() - dt.timedelta(days=1)).isoformat()
    rows = all_credits(args.who, day, day)
    if not rows:
        print(f"{day}: поступлений нет")
        return
    total = sum(r[1] for r in rows)
    print(f"Поступления за {day} — {WHO[args.who]['label']}:")
    for date, amount, cp, purpose, acc, review in rows:
        mark = "  ⚠️ классифицировать" if review else ""
        print(f"  +{amount:,.2f} ₽  {cp[:50]}  «{purpose[:70]}»{mark}".replace(",", " "))
    print(f"ИТОГО: {total:,.2f} ₽".replace(",", " "))


def cmd_income(args):
    year = args.year
    p = TAX.get(year) or sys.exit(f"Нет налоговых параметров для {year} — обнови TAX в скрипте по tax-profile.md")
    d_from, d_to = f"{year}-01-01", min(dt.date.today(), dt.date(year, 12, 31)).isoformat()
    rows = all_credits(args.who, d_from, d_to)
    confirmed = [r for r in rows if not r[5]]
    review = [r for r in rows if r[5]]
    base = sum(r[1] for r in confirmed)
    tax6 = base * p["rate"]
    over = max(0.0, base - 300_000) * p["over300k"]
    contrib = p["fixed"] + over
    to_pay = max(0.0, tax6 - contrib)  # ИП без сотрудников: вычет до нуля
    nds_pct = base / p["nds_limit"] * 100

    f = lambda x: f"{x:,.2f} ₽".replace(",", " ")
    print(f"УСН 6% «Доходы» — {WHO[args.who]['label']}, {d_from}..{d_to}")
    print(f"  Поступлений от клиентов: {len(confirmed)} шт, база = {f(base)}")
    if review:
        print(f"  ⚠️ Требуют классификации (внесение наличных/операции банка) — НЕ в базе:")
        for date, amount, cp, purpose, acc, _ in review:
            print(f"     {date}  +{f(amount)}  «{purpose[:60]}»")
        print(f"     Если это выручка — база больше на {f(sum(r[1] for r in review))} и налог пересчитается.")
    print(f"  Налог 6%:                {f(tax6)}")
    print(f"  Взносы (фикс {f(p['fixed'])} + 1% свыше 300к = {f(over)}): {f(contrib)}")
    print(f"  Налог к уплате после вычета (без сотрудников): {f(to_pay)}")
    print(f"  НДС-порог {p['nds_limit'] / 1e6:.0f} млн ₽: использовано {nds_pct:.1f}%"
          + ("  ⚠️ ВНИМАНИЕ" if nds_pct >= 70 else ""))
    print("  ! Проверка: цифры из выписки; сверь с «Мой налог»/ЛК ФНС перед оплатой.")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--who", choices=WHO, default="malyshev")
    sub = p.add_subparsers(required=True)

    sub.add_parser("accounts").set_defaults(fn=cmd_accounts)
    sub.add_parser("balance").set_defaults(fn=cmd_balance)

    s = sub.add_parser("statement")
    s.add_argument("--from", required=True)
    s.add_argument("--to")
    s.add_argument("--account")
    s.add_argument("--json", action="store_true")
    s.set_defaults(fn=cmd_statement)

    sub.add_parser("yesterday").set_defaults(fn=cmd_yesterday)

    s = sub.add_parser("income")
    s.add_argument("--year", type=int, default=dt.date.today().year)
    s.set_defaults(fn=cmd_income)

    args = p.parse_args()
    args.fn(args)


if __name__ == "__main__":
    main()
