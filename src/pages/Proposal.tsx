import { Link } from 'react-router-dom'
import { CONTACTS, CASES_PREVIEW_WITH_RESULTS } from '../constants/data'
import './Proposal.css'

export default function Proposal() {
  return (
    <div className="proposal">
      {/* Hero */}
      <section className="proposal-hero section">
        <div className="container">
          <div className="proposal-meta">
            <span className="proposal-badge">Коммерческое предложение</span>
            <span className="proposal-date">Январь 2026</span>
          </div>
          <h1>Комплексное продвижение<br />оптового поставщика продуктов</h1>
          <div className="proposal-client">
            <div className="client-info">
              <strong>Клиент:</strong> <a href="https://tdo.spb.ru" target="_blank" rel="noopener noreferrer">tdo.spb.ru</a>
            </div>
            <div className="client-info">
              <strong>Сфера:</strong> Оптовая торговля продуктами питания
            </div>
            <div className="client-info">
              <strong>География:</strong> Санкт-Петербург и область
            </div>
          </div>
          <p className="proposal-subtitle">
            SEO-продвижение + Контекстная реклама в Яндекс.Директ для масштабирования потока заявок от ресторанов, кафе и розничных магазинов
          </p>
        </div>
      </section>

      {/* Анализ текущей ситуации */}
      <section className="section proposal-analysis">
        <div className="container">
          <h2>Анализ текущей ситуации</h2>
          <div className="analysis-grid">
            <div className="analysis-card analysis-problem">
              <h3>Текущие вызовы</h3>
              <ul>
                <li>Сайт не находится в топе поисковых систем по целевым запросам</li>
                <li>Низкая видимость в Яндекс и Google по запросам «оптовая продажа овощей СПб», «поставка фруктов ресторанам» и аналогичным</li>
                <li>Отсутствие стабильного потока заявок из поисковых систем</li>
                <li>Зависимость от сарафанного радио и текущей клиентской базы</li>
                <li>Конкуренты активно занимают топ-позиции и привлекают новых клиентов</li>
              </ul>
            </div>
            <div className="analysis-card analysis-opportunity">
              <h3>Возможности роста</h3>
              <ul>
                <li>Высокий спрос: рестораны и кафе постоянно ищут надёжных поставщиков</li>
                <li>Локальный поиск активен: запросы типа «овощи оптом СПб» имеют высокую конверсию</li>
                <li>Долгий цикл клиента: оптовые покупатели ищут долгосрочных партнёров</li>
                <li>Конкурентное преимущество: широкий ассортимент (1500+ позиций), доставка, отсрочка</li>
                <li>B2B сегмент хорошо конвертируется через контекстную рекламу</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Что предлагаем */}
      <section className="section proposal-services">
        <div className="container">
          <h2>Комплексное решение</h2>
          <p className="section-intro">
            Двухканальная стратегия для максимального охвата целевой аудитории: долгосрочные позиции через SEO + быстрые заявки через контекст
          </p>
          
          <div className="services-grid">
            <div className="service-card service-seo">
              <div className="service-icon">🔍</div>
              <h3>SEO-продвижение</h3>
              <p className="service-desc">Вывод сайта в топ Яндекса по целевым запросам для стабильного потока органического трафика</p>
              
              <div className="service-details">
                <h4>Что входит:</h4>
                <ul>
                  <li><strong>Технический аудит</strong> — анализ текущего состояния сайта, исправление критических ошибок</li>
                  <li><strong>Семантическое ядро</strong> — сбор 300+ целевых запросов B2B сегмента</li>
                  <li><strong>Внутренняя оптимизация</strong> — улучшение Title, Description, контента под запросы</li>
                  <li><strong>Контент-план</strong> — создание статей под коммерческие и информационные запросы</li>
                  <li><strong>Локальное SEO</strong> — оптимизация под СПб, работа с Яндекс Картами и Справочником</li>
                  <li><strong>Ссылочное продвижение</strong> — наращивание качественной ссылочной массы</li>
                  <li><strong>Отчётность</strong> — еженедельный мониторинг позиций, ежемесячные отчёты</li>
                </ul>
              </div>

              <div className="service-timeline">
                <h4>Сроки результатов:</h4>
                <div className="timeline-item">
                  <span className="timeline-period">Месяц 1-2:</span>
                  <span>Аудит, техническая оптимизация, запуск продвижения</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-period">Месяц 3-4:</span>
                  <span>Первые позиции в топ-10, рост трафика на 30-50%</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-period">Месяц 6-12:</span>
                  <span>Стабильный топ-3 по ключевым запросам, 2-3x рост трафика</span>
                </div>
              </div>
            </div>

            <div className="service-card service-context">
              <div className="service-icon">🎯</div>
              <h3>Яндекс.Директ</h3>
              <p className="service-desc">Быстрое привлечение целевых заявок через контекстную рекламу</p>
              
              <div className="service-details">
                <h4>Что входит:</h4>
                <ul>
                  <li><strong>Анализ конкурентов</strong> — изучение рекламных стратегий других поставщиков</li>
                  <li><strong>Структура кампаний</strong> — поиск + РСЯ, сегментация по типам продуктов</li>
                  <li><strong>Объявления</strong> — создание продающих текстов с УТП (ассортимент, доставка, отсрочка)</li>
                  <li><strong>Настройка аналитики</strong> — отслеживание звонков, заявок, конверсий</li>
                  <li><strong>Оптимизация</strong> — еженедельная работа со ставками, минус-словами, объявлениями</li>
                  <li><strong>Ретаргетинг</strong> — возврат посетителей, которые не оставили заявку</li>
                  <li><strong>Отчётность</strong> — еженедельные отчёты по CPA, количеству лидов, ROMI</li>
                </ul>
              </div>

              <div className="service-timeline">
                <h4>Сроки результатов:</h4>
                <div className="timeline-item">
                  <span className="timeline-period">Неделя 1:</span>
                  <span>Настройка кампаний, запуск, первые заявки</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-period">Неделя 2-4:</span>
                  <span>Сбор статистики, A/B тесты, оптимизация CPA</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-period">Месяц 2+:</span>
                  <span>Масштабирование работающих связок, стабильный поток лидов</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Синергия каналов */}
      <section className="section proposal-synergy">
        <div className="container">
          <div className="synergy-block">
            <h2>Почему комплексный подход эффективнее</h2>
            <div className="synergy-grid">
              <div className="synergy-item">
                <div className="synergy-number">1</div>
                <h3>Покрытие всей воронки</h3>
                <p>SEO захватывает верх воронки (информационные запросы), контекст — низ (готовые к заказу)</p>
              </div>
              <div className="synergy-item">
                <div className="synergy-number">2</div>
                <h3>Быстрый старт + долгосрочный рост</h3>
                <p>Контекст даёт заявки с первой недели, SEO наращивает бесплатный трафик через 3-6 месяцев</p>
              </div>
              <div className="synergy-item">
                <div className="synergy-number">3</div>
                <h3>Снижение стоимости лида</h3>
                <p>Со временем органический трафик снижает зависимость от платной рекламы и уменьшает средний CPA</p>
              </div>
              <div className="synergy-item">
                <div className="synergy-number">4</div>
                <h3>Взаимное усиление</h3>
                <p>SEO-оптимизированные страницы повышают Quality Score в контексте, снижая стоимость клика</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Прогноз результатов */}
      <section className="section proposal-forecast">
        <div className="container">
          <h2>Прогноз результатов</h2>
          <div className="forecast-table">
            <div className="forecast-row forecast-header">
              <div className="forecast-cell">Период</div>
              <div className="forecast-cell">Трафик из SEO</div>
              <div className="forecast-cell">Заявки из Директа</div>
              <div className="forecast-cell">Общий результат</div>
            </div>
            <div className="forecast-row">
              <div className="forecast-cell"><strong>Месяц 1-2</strong></div>
              <div className="forecast-cell">Старт продвижения<br/><small>Технические работы</small></div>
              <div className="forecast-cell">15-25 заявок/мес<br/><small>CPA: 3 000-5 000 ₽</small></div>
              <div className="forecast-cell forecast-highlight">15-25 заявок</div>
            </div>
            <div className="forecast-row">
              <div className="forecast-cell"><strong>Месяц 3-6</strong></div>
              <div className="forecast-cell">+100-150 визитов<br/><small>5-10 органических заявок</small></div>
              <div className="forecast-cell">20-30 заявок/мес<br/><small>CPA: 2 500-4 000 ₽</small></div>
              <div className="forecast-cell forecast-highlight">25-40 заявок</div>
            </div>
            <div className="forecast-row">
              <div className="forecast-cell"><strong>Месяц 6-12</strong></div>
              <div className="forecast-cell">+300-500 визитов<br/><small>15-25 органических заявок</small></div>
              <div className="forecast-cell">25-35 заявок/мес<br/><small>CPA: 2 000-3 500 ₽</small></div>
              <div className="forecast-cell forecast-highlight">40-60 заявок</div>
            </div>
          </div>
          <p className="forecast-note">
            * Прогноз основан на средних показателях для B2B-сегмента в сфере оптовых поставок продуктов. Точные цифры зависят от сезонности, конверсии сайта и скорости обработки заявок.
          </p>
        </div>
      </section>

      {/* Стоимость */}
      <section className="section proposal-pricing">
        <div className="container">
          <h2>Инвестиции в продвижение</h2>
          
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>SEO-продвижение</h3>
                <div className="pricing-amount">
                  <span className="price-value">70 000 ₽</span>
                  <span className="price-period">/месяц</span>
                </div>
              </div>
              <div className="pricing-body">
                <p className="pricing-desc">Комплексное SEO под ключ: аудит, оптимизация, контент, ссылки</p>
                <ul className="pricing-features">
                  <li>Техническая оптимизация сайта</li>
                  <li>300+ целевых запросов</li>
                  <li>Контент-план и статьи</li>
                  <li>Ссылочное продвижение</li>
                  <li>Локальное SEO (Яндекс Карты)</li>
                  <li>Еженедельный мониторинг</li>
                </ul>
                <div className="pricing-note">
                  Минимальный срок: 6 месяцев<br/>
                  <small>(SEO — долгосрочная инвестиция)</small>
                </div>
              </div>
            </div>

            <div className="pricing-card pricing-featured">
              <div className="pricing-badge">Рекомендуем</div>
              <div className="pricing-header">
                <h3>Комплексный пакет</h3>
                <div className="pricing-amount">
                  <span className="price-value">110 000 ₽</span>
                  <span className="price-period">/месяц</span>
                </div>
              </div>
              <div className="pricing-body">
                <p className="pricing-desc">SEO + Яндекс.Директ — максимальный охват аудитории</p>
                <ul className="pricing-features">
                  <li><strong>Всё из SEO-пакета +</strong></li>
                  <li>Настройка Яндекс.Директ</li>
                  <li>Ведение рекламных кампаний</li>
                  <li>Ежедневная оптимизация</li>
                  <li>Аналитика и call-tracking</li>
                  <li>Ретаргетинг и РСЯ</li>
                  <li>Еженедельные отчёты по обоим каналам</li>
                </ul>
                <div className="pricing-note pricing-note-featured">
                  Минимальный срок: 3 месяца<br/>
                  <small>Экономия 15% по сравнению с раздельной покупкой</small>
                </div>
              </div>
            </div>

            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Яндекс.Директ</h3>
                <div className="pricing-amount">
                  <span className="price-value">55 000 ₽</span>
                  <span className="price-period">/месяц</span>
                </div>
              </div>
              <div className="pricing-body">
                <p className="pricing-desc">Контекстная реклама для быстрых заявок</p>
                <ul className="pricing-features">
                  <li>Аудит и стратегия</li>
                  <li>Настройка кампаний</li>
                  <li>Поиск + РСЯ + ретаргетинг</li>
                  <li>Оптимизация CPA</li>
                  <li>Аналитика и отчёты</li>
                  <li>Тесты объявлений и аудиторий</li>
                </ul>
                <div className="pricing-note">
                  + рекламный бюджет<br/>
                  <small>(рекомендуем от 50 000 ₽/мес)</small>
                </div>
              </div>
            </div>
          </div>

          <div className="pricing-comparison">
            <h3>Почему наши цены конкурентны</h3>
            <div className="comparison-table">
              <div className="comparison-row">
                <span className="comparison-label">Средняя цена SEO в СПб:</span>
                <span className="comparison-value">80 000 — 150 000 ₽/мес</span>
              </div>
              <div className="comparison-row">
                <span className="comparison-label">Средняя цена ведения Директа:</span>
                <span className="comparison-value">20 000 — 65 000 ₽/мес</span>
              </div>
              <div className="comparison-row comparison-row-highlight">
                <span className="comparison-label">Наше предложение (комплекс):</span>
                <span className="comparison-value">110 000 ₽/мес — на 30% выгоднее</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Наш опыт */}
      <section className="section proposal-cases">
        <div className="container">
          <h2>Наш опыт в B2B-сегменте</h2>
          <p className="section-intro">
            Работаем с автосервисами, производителями и другими B2B-компаниями. Знаем специфику длинного цикла сделки и высокого LTV
          </p>
          <div className="cases-grid">
            {CASES_PREVIEW_WITH_RESULTS.slice(0, 3).map((caseItem) => (
              <Link to={`/cases/${caseItem.id}`} key={caseItem.id} className="case-card">
                <h3>{caseItem.title}</h3>
                <div className="case-tags">
                  {caseItem.tags.map((tag) => (
                    <span key={tag} className="case-tag">{tag}</span>
                  ))}
                </div>
                <p>{caseItem.description}</p>
                {caseItem.previewResults && (
                  <div className="case-results">
                    {caseItem.previewResults.map((result, idx) => (
                      <div key={idx} className="case-result-item">
                        <div className="result-value">{result.value}</div>
                        <div className="result-label">{result.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
          <div className="cases-cta">
            <Link to="/cases" className="btn btn-secondary">Смотреть все кейсы</Link>
          </div>
        </div>
      </section>

      {/* Гарантии */}
      <section className="section proposal-guarantees">
        <div className="container">
          <h2>Наши гарантии</h2>
          <div className="guarantees-grid">
            <div className="guarantee-item">
              <div className="guarantee-icon">📊</div>
              <h3>Прозрачная аналитика</h3>
              <p>Еженедельные отчёты по всем ключевым метрикам: позиции, трафик, заявки, CPA, ROMI</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">💼</div>
              <h3>Юридическая чистота</h3>
              <p>Работаем по договору, все услуги официально, с закрывающими документами</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">🎯</div>
              <h3>Работа на результат</h3>
              <p>Если за 3 месяца не увидите роста заявок — доработаем стратегию бесплатно</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">⚡</div>
              <h3>Быстрый старт</h3>
              <p>Запуск контекстной рекламы — за 5-7 дней. Первые результаты SEO — через 2-3 месяца</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">🔧</div>
              <h3>Без скрытых платежей</h3>
              <p>Всё, что обсуждаем, фиксируем в договоре. Никаких доплат за «стандартные» работы</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">👥</div>
              <h3>Личный менеджер</h3>
              <p>Вы всегда знаете, с кем работаете. Прямая связь, быстрая реакция на вопросы</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section proposal-cta">
        <div className="container">
          <div className="cta-block">
            <h2>Готовы обсудить сотрудничество?</h2>
            <p>
              Запишитесь на бесплатную консультацию — разберём ваш сайт, обсудим стратегию и ответим на все вопросы
            </p>
            <div className="cta-buttons">
              <a href={CONTACTS.telegram} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Написать в Telegram
              </a>
              <a href={`tel:${CONTACTS.phoneLink}`} className="btn btn-secondary">
                Позвонить: {CONTACTS.phone}
              </a>
            </div>
            <div className="cta-note">
              <p><strong>Следующий шаг:</strong> созвон 30-40 минут, где обсудим детали вашего проекта, ответим на вопросы и составим персональную стратегию продвижения</p>
            </div>
          </div>
        </div>
      </section>

      {/* О нас */}
      <section className="section proposal-about">
        <div className="container">
          <div className="about-content">
            <h2>О команде eldar.marketing</h2>
            <div className="about-grid">
              <div className="about-text">
                <p>
                  Работаем в digital-маркетинге <strong>более 10 лет</strong>. Специализируемся на комплексном продвижении B2B и B2C проектов в Санкт-Петербурге и по всей России.
                </p>
                <p>
                  За плечами — <strong>60+ млн рублей</strong> рекламных бюджетов под управлением, <strong>50+ проектов</strong> с автоматизацией и CRM, долгосрочное сотрудничество с федеральными брендами.
                </p>
                <p>
                  Наш подход — системный маркетинг с измеримыми результатами. Не просто «делаем SEO» или «льём трафик», а выстраиваем управляемую систему привлечения клиентов.
                </p>
              </div>
              <div className="about-stats">
                <div className="about-stat">
                  <div className="stat-value">10+ лет</div>
                  <div className="stat-label">опыта в digital-маркетинге</div>
                </div>
                <div className="about-stat">
                  <div className="stat-value">60+ млн ₽</div>
                  <div className="stat-label">рекламных бюджетов под управлением</div>
                </div>
                <div className="about-stat">
                  <div className="stat-value">50+ проектов</div>
                  <div className="stat-label">с автоматизацией и CRM</div>
                </div>
              </div>
            </div>
            <div className="about-cta">
              <Link to="/" className="btn btn-outline">Подробнее о компании</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
