import './Privacy.css'

export default function Privacy() {
  return (
    <div className="privacy section">
      <div className="container privacy-container">
        <h1>Политика конфиденциальности</h1>
        
        <div className="privacy-date">
          <p>Дата последнего обновления: 29 декабря 2025 г.</p>
        </div>

        <section className="privacy-section">
          <h2>1. Общие положения</h2>
          <p>
            Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты 
            персональных данных пользователей сайта eldar.marketing (далее — «Сайт»).
          </p>
          <p>
            Оператором персональных данных является Индивидуальный предприниматель Абилвапов Эльдар Меджитович 
            (далее — «Оператор»).
          </p>
          <p>
            Используя Сайт, вы соглашаетесь с условиями настоящей Политики. Если вы не согласны с условиями, 
            пожалуйста, не используйте Сайт.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Информация об операторе</h2>
          <div className="operator-info">
            <div className="info-row">
              <span className="info-label">Наименование:</span>
              <span className="info-value">Индивидуальный предприниматель Абилвапов Эльдар Меджитович</span>
            </div>
            <div className="info-row">
              <span className="info-label">ОГРНИП:</span>
              <span className="info-value">318784700197860</span>
            </div>
            <div className="info-row">
              <span className="info-label">ИНН:</span>
              <span className="info-value">781311652201</span>
            </div>
            <div className="info-row">
              <span className="info-label">Юридический адрес:</span>
              <span className="info-value">197197, Россия, Санкт-Петербург, Большой пр. ПС. д.19, кв.17</span>
            </div>
            <div className="info-row">
              <span className="info-label">Фактический адрес:</span>
              <span className="info-value">199106, Россия, Санкт-Петербург, улица Шевченко, 16, пом. 5Н</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">
                <a href="mailto:eldar@eldar.marketing">eldar@eldar.marketing</a>
              </span>
            </div>
          </div>
        </section>

        <section className="privacy-section">
          <h2>3. Какие данные мы собираем</h2>
          <p>В процессе использования Сайта мы можем собирать следующую информацию:</p>
          <ul>
            <li>Технические данные: IP-адрес, тип браузера, операционная система, время посещения</li>
            <li>Информация о поведении: посещенные страницы, время на сайте, источники переходов</li>
            <li>Контактные данные: имя, электронная почта, телефон (если вы связываетесь с нами)</li>
            <li>Cookie-файлы и аналогичные технологии для улучшения работы Сайта</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>4. Цели обработки персональных данных</h2>
          <p>Мы обрабатываем ваши персональные данные для следующих целей:</p>
          <ul>
            <li>Обеспечение функционирования Сайта</li>
            <li>Улучшение качества услуг и пользовательского опыта</li>
            <li>Аналитика посещаемости и поведения пользователей</li>
            <li>Связь с вами по вашему запросу</li>
            <li>Выполнение договорных обязательств</li>
            <li>Соблюдение требований законодательства РФ</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>5. Правовые основания обработки</h2>
          <p>Обработка персональных данных осуществляется на основании:</p>
          <ul>
            <li>Вашего согласия на обработку персональных данных (ст. 9 Федерального закона № 152-ФЗ)</li>
            <li>Необходимости исполнения договора, стороной которого вы являетесь</li>
            <li>Требований законодательства Российской Федерации</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>6. Cookies и технологии отслеживания</h2>
          <p>
            Мы используем файлы cookies для улучшения работы Сайта, анализа посещаемости и персонализации контента.
          </p>
          <p>Типы используемых cookies:</p>
          <ul>
            <li><strong>Необходимые cookies:</strong> обеспечивают базовые функции Сайта</li>
            <li><strong>Аналитические cookies:</strong> помогают понять, как посетители взаимодействуют с Сайтом</li>
            <li><strong>Функциональные cookies:</strong> запоминают ваши предпочтения</li>
          </ul>
          <p>
            Вы можете отключить cookies в настройках вашего браузера, но это может ограничить функциональность Сайта.
          </p>
        </section>

        <section className="privacy-section">
          <h2>7. Передача данных третьим лицам</h2>
          <p>
            Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением случаев, 
            предусмотренных законодательством РФ или необходимых для предоставления услуг.
          </p>
          <p>Мы можем использовать сервисы третьих лиц для аналитики:</p>
          <ul>
            <li>Системы веб-аналитики (для изучения посещаемости)</li>
            <li>Сервисы связи и коммуникации (Telegram, электронная почта)</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>8. Защита персональных данных</h2>
          <p>
            Мы принимаем технические и организационные меры для защиты персональных данных от неправомерного 
            доступа, изменения, раскрытия или уничтожения:
          </p>
          <ul>
            <li>Шифрование данных при передаче (HTTPS)</li>
            <li>Ограничение доступа к персональным данным</li>
            <li>Регулярный мониторинг систем безопасности</li>
            <li>Обучение персонала правилам обработки персональных данных</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>9. Ваши права</h2>
          <p>В соответствии с законодательством РФ (ФЗ-152) вы имеете право:</p>
          <ul>
            <li>Получать информацию о факте и условиях обработки ваших персональных данных</li>
            <li>Требовать уточнения, блокирования или уничтожения ваших персональных данных</li>
            <li>Отозвать согласие на обработку персональных данных</li>
            <li>Обжаловать действия или бездействие Оператора в Роскомнадзоре или в судебном порядке</li>
          </ul>
          <p>
            Для реализации ваших прав обращайтесь по адресу: 
            <a href="mailto:eldar@eldar.marketing"> eldar@eldar.marketing</a>
          </p>
        </section>

        <section className="privacy-section">
          <h2>10. Срок хранения данных</h2>
          <p>
            Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, 
            если иной срок не установлен законодательством РФ или договором.
          </p>
          <p>
            После достижения целей обработки или при отзыве согласия персональные данные подлежат 
            уничтожению, если иное не предусмотрено законом.
          </p>
        </section>

        <section className="privacy-section">
          <h2>11. Изменения в политике</h2>
          <p>
            Мы оставляем за собой право вносить изменения в настоящую Политику. Все изменения вступают 
            в силу с момента публикации новой редакции на Сайте.
          </p>
          <p>
            Рекомендуем периодически проверять данную страницу на предмет обновлений.
          </p>
        </section>

        <section className="privacy-section">
          <h2>12. Контактная информация</h2>
          <p>
            Если у вас есть вопросы по настоящей Политике или вы хотите воспользоваться своими правами, 
            свяжитесь с нами:
          </p>
          <div className="contact-details">
            <p><strong>Email:</strong> <a href="mailto:eldar@eldar.marketing">eldar@eldar.marketing</a></p>
            <p><strong>Telegram:</strong> <a href="https://t.me/marketing_eldar" target="_blank" rel="noopener noreferrer">@marketing_eldar</a></p>
            <p><strong>Телефон:</strong> <a href="tel:+79219446555">+7 (921) 944-65-55</a></p>
          </div>
        </section>

        <section className="privacy-section">
          <h2>13. Банковские реквизиты</h2>
          <div className="bank-info">
            <div className="info-row">
              <span className="info-label">Расчетный счет:</span>
              <span className="info-value">40802810403500008273</span>
            </div>
            <div className="info-row">
              <span className="info-label">Название банка:</span>
              <span className="info-value">ТОЧКА ПАО БАНКА "ФК ОТКРЫТИЕ"</span>
            </div>
            <div className="info-row">
              <span className="info-label">БИК:</span>
              <span className="info-value">044525999</span>
            </div>
            <div className="info-row">
              <span className="info-label">Город:</span>
              <span className="info-value">г. Москва</span>
            </div>
            <div className="info-row">
              <span className="info-label">Корр. счет:</span>
              <span className="info-value">30101810845250000999</span>
            </div>
          </div>
        </section>

        <section className="privacy-section">
          <h2>14. Применимое право</h2>
          <p>
            К настоящей Политике и отношениям между пользователем и Оператором применяется 
            законодательство Российской Федерации.
          </p>
          <p>
            Все споры решаются в соответствии с законодательством РФ по месту нахождения Оператора.
          </p>
        </section>

        <div className="privacy-footer">
          <p>
            Используя данный сайт, вы подтверждаете, что ознакомились с настоящей Политикой 
            конфиденциальности и согласны с ее условиями.
          </p>
        </div>
      </div>
    </div>
  )
}



