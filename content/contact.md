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

<style>
.req-card { border: 1px solid var(--line, #e8e8e8); margin-top: 48px; }
.req-card__head { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid var(--line, #e8e8e8); }
.req-card__label { font-family: var(--font-mono, monospace); font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted, #6b6b6b); }
.req-card__copy { font-family: inherit; font-size: 13px; font-weight: 600; background: transparent; color: var(--ink, #0a0a0a); border: 1px solid var(--line-2, #d4d4d4); padding: 8px 16px; cursor: pointer; transition: background .15s, color .15s; }
.req-card__copy:hover { background: var(--ink, #0a0a0a); color: var(--bg, #fff); }
.req-card__name { font-size: 19px; font-weight: 700; letter-spacing: -0.01em; padding: 20px 24px 4px; color: var(--ink, #0a0a0a); }
.req-card__geo { font-size: 14px; color: var(--muted, #6b6b6b); padding: 0 24px 16px; }
.req-card__grid { display: grid; grid-template-columns: 1fr 1fr; margin: 0; border-top: 1px solid var(--line, #e8e8e8); }
.req-card__cell { padding: 14px 24px; border-bottom: 1px solid var(--line, #e8e8e8); cursor: copy; transition: background .15s; position: relative; }
.req-card__cell:nth-child(odd) { border-right: 1px solid var(--line, #e8e8e8); }
.req-card__cell:nth-last-child(-n+2) { border-bottom: none; }
.req-card__cell:hover { background: var(--bg-alt, #fafafa); }
.req-card__cell dt { font-family: var(--font-mono, monospace); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted-2, #999); margin: 0 0 4px; }
.req-card__cell dd { font-size: 15px; font-weight: 500; color: var(--ink, #0a0a0a); margin: 0; font-variant-numeric: tabular-nums; word-break: break-all; }
.req-card__cell.is-copied::after { content: 'Скопировано'; position: absolute; top: 8px; right: 12px; font-family: var(--font-mono, monospace); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted, #6b6b6b); }
@media (max-width: 560px) {
  .req-card__grid { grid-template-columns: 1fr; }
  .req-card__cell:nth-child(odd) { border-right: none; }
  .req-card__cell:nth-last-child(-n+2) { border-bottom: 1px solid var(--line, #e8e8e8); }
  .req-card__cell:last-child { border-bottom: none; }
}
</style>

<div class="req-card">
  <div class="req-card__head">
    <span class="req-card__label">Реквизиты</span>
    <button class="req-card__copy" id="req-copy" type="button">Скопировать всё</button>
  </div>
  <div class="req-card__name">ИП&nbsp;Малышев Максим Александрович</div>
  <div class="req-card__geo">Санкт-Петербург, Россия · <a href="mailto:i@eldarmarketing.ru">i@eldarmarketing.ru</a></div>
  <dl class="req-card__grid" id="req-grid">
    <div class="req-card__cell"><dt>ИНН</dt><dd>780162236049</dd></div>
    <div class="req-card__cell"><dt>ОГРНИП</dt><dd>325784700365064</dd></div>
    <div class="req-card__cell"><dt>Расчётный счёт</dt><dd>40802810420000798697</dd></div>
    <div class="req-card__cell"><dt>Банк</dt><dd>ООО «Банк Точка»</dd></div>
    <div class="req-card__cell"><dt>БИК</dt><dd>044525104</dd></div>
    <div class="req-card__cell"><dt>Корр. счёт</dt><dd>30101810745374525104</dd></div>
  </dl>
</div>

<script>
(function(){
  function copy(text, done){
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function(){});
    }
  }
  document.querySelectorAll('.req-card__cell').forEach(function(cell){
    cell.addEventListener('click', function(){
      copy(cell.querySelector('dd').textContent.trim(), function(){
        cell.classList.add('is-copied');
        setTimeout(function(){ cell.classList.remove('is-copied'); }, 1600);
      });
    });
  });
  var btn = document.getElementById('req-copy');
  btn.addEventListener('click', function(){
    var lines = ['ИП Малышев Максим Александрович', 'Санкт-Петербург, Россия'];
    document.querySelectorAll('.req-card__cell').forEach(function(cell){
      lines.push(cell.querySelector('dt').textContent.trim() + ': ' + cell.querySelector('dd').textContent.trim());
    });
    copy(lines.join('\n'), function(){
      btn.textContent = 'Скопировано ✓';
      setTimeout(function(){ btn.textContent = 'Скопировать всё'; }, 1600);
    });
  });
})();
</script>
