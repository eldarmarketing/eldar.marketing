/**
 * Типограф для русского текста
 * Правила Т-Банк / Бюро Горбунова
 */
(function() {
  'use strict';

  // Предлоги и союзы, после которых нельзя переносить
  var PREPOSITIONS = /(\s|^)(а|в|и|к|о|с|у|я|на|не|ни|но|об|от|по|за|из|до|бы|же|ли|во|мы|их|ее|её|он|ты|ко|со|vs|то|та|вс[еёя]|для|без|при|под|над|что|как|или|это|так|уже|ещё|все|его|ему|где|кто|чем|тем|вот|чтo|она|они|нам|вам|нас|вас|был|нет|мне|нам|наш|ваш|мой|моя|моё|тот|эти|эту|сам|два|три|оба|раз|тоже|даже|пока|если|либо|хотя|зато|ведь|лишь|чуть|ради|один|перед|через|между|около|вдоль|среди|кроме|после|вместо) /gi;

  // Числа + единицы
  var NUM_UNIT = /(\d) (г|кг|мг|л|мл|м|км|см|мм|шт|руб|₽|\$|€|%|°C|°F|мин|сек|ч|дн|мес|лет|Гб|Мб|Кб|бит|px|em|rem|vh|vw)/g;

  // Тире между числами (диапазоны)
  var DASH_RANGE = /(\d)\s*[-–]\s*(\d)/g;

  // Длинное тире
  var EM_DASH = /\s+[-–]\s+/g;

  // Кавычки
  var QUOTES_OUTER = /"([^"]+)"/g;

  function processTextNode(node) {
    var text = node.nodeValue;
    if (!text || text.trim().length === 0) return;

    var original = text;

    // 1. Неразрывные пробелы после предлогов
    text = text.replace(PREPOSITIONS, function(match, space, word) {
      return space + word + '\u00A0';
    });

    // 2. Числа + единицы
    text = text.replace(NUM_UNIT, '$1\u00A0$2');

    // 3. Диапазоны: 10-20 → 10–20
    text = text.replace(DASH_RANGE, '$1–$2');

    // 4. Длинное тире
    text = text.replace(EM_DASH, '\u00A0— ');

    // 5. Кавычки ёлочки
    text = text.replace(QUOTES_OUTER, '«$1»');

    // 6. Троеточие
    text = text.replace(/\.\.\./g, '…');

    // 7. Неразрывный пробел перед % и ₽
    text = text.replace(/(\d) ([%₽])/g, '$1\u00A0$2');

    if (text !== original) {
      node.nodeValue = text;
    }
  }

  function walkNodes(el) {
    var walker = document.createTreeWalker(
      el,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          // Пропускаем code, pre, script, style, input
          var parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          var tag = parent.tagName;
          if (tag === 'CODE' || tag === 'PRE' || tag === 'SCRIPT' || 
              tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'INPUT' ||
              tag === 'KBD' || tag === 'SAMP') {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(processTextNode);
  }

  // Запуск после загрузки
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      var main = document.querySelector('main') || document.querySelector('article');
      if (main) walkNodes(main);
    });
  } else {
    var main = document.querySelector('main') || document.querySelector('article');
    if (main) walkNodes(main);
  }
})();
