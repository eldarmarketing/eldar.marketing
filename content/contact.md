---
title: "Обсудить проект"
description: "Оставьте заявку — свяжемся в течение дня"
---

Расскажите о&nbsp;задаче&nbsp;— ответим в&nbsp;течение дня.

<form id="contact-form" action="/api/lead" method="POST">
  <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
  <input type="hidden" name="js_check" id="lead-js" value="">
  <p>
    <label>Имя</label>
    <input type="text" name="name" required placeholder="Как к вам обращаться">
  </p>
  <p>
    <label>Телефон или Telegram</label>
    <input type="text" name="contact" required placeholder="+7... или @username">
  </p>
  <p>
    <label>Чем можем помочь?</label>
    <textarea name="message" rows="4" placeholder="Опишите задачу"></textarea>
  </p>
  <p style="margin-top:1em">
    <label style="display:flex;align-items:flex-start;gap:8px;font-size:14px;line-height:1.4;cursor:pointer">
      <input type="checkbox" name="consent" required style="margin-top:3px;flex-shrink:0">
      <span>Я&nbsp;даю согласие на&nbsp;обработку моих персональных данных в&nbsp;соответствии с&nbsp;<a href="/privacy/" target="_blank">политикой конфиденциальности</a></span>
    </label>
  </p>
  <p>
    <button type="submit">Отправить заявку</button>
  </p>
</form>

<script>
  // анти-спам: токен заполняется только в браузере с JS; боты без JS его не пришлют
  (function(){
    var f = document.getElementById('contact-form');
    var j = document.getElementById('lead-js');
    if (f && j) f.addEventListener('submit', function(){ j.value = Date.now().toString(36); });
  })();
</script>

Или напишите напрямую: [@eldarmarketing](https://t.me/eldarmarketing)

<div style="margin-top:2.5em;border:1px solid rgba(128,128,128,0.25);border-radius:16px;padding:1.5em 1.75em">
  <div style="font-weight:700;font-size:1.05em;margin-bottom:0.9em">Реквизиты</div>
  <table style="width:100%;border-collapse:collapse;font-size:0.95em;line-height:1.5">
    <tr><td style="padding:0.35em 0;opacity:0.65;white-space:nowrap;vertical-align:top">Наименование</td><td style="padding:0.35em 0 0.35em 1.25em;font-weight:600">Индивидуальный предприниматель Малышев Максим Александрович</td></tr>
    <tr><td style="padding:0.35em 0;opacity:0.65;vertical-align:top">ИНН</td><td style="padding:0.35em 0 0.35em 1.25em;font-weight:600">780162236049</td></tr>
    <tr><td style="padding:0.35em 0;opacity:0.65;vertical-align:top">ОГРНИП</td><td style="padding:0.35em 0 0.35em 1.25em;font-weight:600">325784700365064</td></tr>
    <tr><td style="padding:0.35em 0;opacity:0.65;vertical-align:top">Расчётный счёт</td><td style="padding:0.35em 0 0.35em 1.25em;font-weight:600">40802810420000798697</td></tr>
    <tr><td style="padding:0.35em 0;opacity:0.65;vertical-align:top">Банк</td><td style="padding:0.35em 0 0.35em 1.25em;font-weight:600">ООО «Банк Точка»</td></tr>
    <tr><td style="padding:0.35em 0;opacity:0.65;vertical-align:top">БИК</td><td style="padding:0.35em 0 0.35em 1.25em;font-weight:600">044525104</td></tr>
    <tr><td style="padding:0.35em 0;opacity:0.65;vertical-align:top">Корр. счёт</td><td style="padding:0.35em 0 0.35em 1.25em;font-weight:600">30101810745374525104</td></tr>
  </table>
</div>
