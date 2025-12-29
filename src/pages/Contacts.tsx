import './Contacts.css'
import { CONTACTS, COMPANY, COMPANY_DETAILS } from '../constants/data'
import { useState } from 'react'
import CompanyDetailsModal from '../components/CompanyDetailsModal'

export default function Contacts() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="contacts-page">
        <section className="section">
          <div className="container">
            <div className="contacts-header">
              <h1>Контакты</h1>
              <p className="contacts-intro">
                Свяжитесь со мной удобным способом — отвечу на все вопросы и обсудим ваш проект
              </p>
            </div>

            <div className="contacts-grid">
              {/* Основные контакты */}
              <div className="contacts-main">
                <h2>Связаться напрямую</h2>
                <div className="contact-methods">
                  <a
                    href={`tel:${CONTACTS.phoneLink}`}
                    className="contact-method"
                  >
                    <div className="contact-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="contact-info">
                      <div className="contact-label">Телефон</div>
                      <div className="contact-value">{CONTACTS.phone}</div>
                    </div>
                  </a>

                  <a
                    href={CONTACTS.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method"
                  >
                    <div className="contact-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4582 14.006 10.4252 13.9973 10.3938C13.9886 10.3624 13.9724 10.3337 13.95 10.31C13.89 10.26 13.81 10.28 13.74 10.29C13.65 10.31 12.25 11.24 9.52 13.08C9.12 13.35 8.76 13.49 8.44 13.48C8.08 13.47 7.4 13.28 6.89 13.11C6.26 12.91 5.77 12.8 5.81 12.45C5.83 12.27 6.08 12.09 6.55 11.9C9.47 10.63 11.41 9.79 12.38 9.39C15.16 8.23 15.73 8.03 16.11 8.03C16.19 8.03 16.38 8.05 16.5 8.15C16.6 8.23 16.63 8.34 16.64 8.42C16.63 8.48 16.65 8.66 16.64 8.8Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="contact-info">
                      <div className="contact-label">Telegram</div>
                      <div className="contact-value">@{CONTACTS.telegram.split('/').pop()}</div>
                    </div>
                  </a>

                  <a
                    href={CONTACTS.telegramChannel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method"
                  >
                    <div className="contact-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4582 14.006 10.4252 13.9973 10.3938C13.9886 10.3624 13.9724 10.3337 13.95 10.31C13.89 10.26 13.81 10.28 13.74 10.29C13.65 10.31 12.25 11.24 9.52 13.08C9.12 13.35 8.76 13.49 8.44 13.48C8.08 13.47 7.4 13.28 6.89 13.11C6.26 12.91 5.77 12.8 5.81 12.45C5.83 12.27 6.08 12.09 6.55 11.9C9.47 10.63 11.41 9.79 12.38 9.39C15.16 8.23 15.73 8.03 16.11 8.03C16.19 8.03 16.38 8.05 16.5 8.15C16.6 8.23 16.63 8.34 16.64 8.42C16.63 8.48 16.65 8.66 16.64 8.8Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="contact-info">
                      <div className="contact-label">Telegram канал</div>
                      <div className="contact-value">{CONTACTS.telegramChannelName}</div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${CONTACTS.email}`}
                    className="contact-method"
                  >
                    <div className="contact-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="contact-info">
                      <div className="contact-label">Email</div>
                      <div className="contact-value">{CONTACTS.email}</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Информация о компании */}
              <div className="contacts-info">
                <h2>О компании</h2>
                <div className="company-info-card">
                  <div className="company-name">{COMPANY.name}</div>
                  <p className="company-tagline">{COMPANY.tagline}</p>
                  
                  <button 
                    className="company-details-btn"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 15.01L9.41 16.42L11 14.84V19H13V14.84L14.59 16.43L16 15.01L12.01 11L8 15.01Z" fill="currentColor"/>
                    </svg>
                    Реквизиты компании
                  </button>

                  <div className="company-short-info">
                    <div className="info-item">
                      <div className="info-label">Юридическое лицо:</div>
                      <div className="info-value">{COMPANY_DETAILS.shortName}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Почему выбрать меня */}
            <div className="why-choose">
              <h2>Почему выбирают меня</h2>
              <div className="why-grid">
                <div className="why-item">
                  <div className="why-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <h3>Быстрая связь</h3>
                  <p>Отвечаю в течение нескольких часов. Всегда на связи в рабочее время.</p>
                </div>
                <div className="why-item">
                  <div className="why-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <h3>Индивидуальный подход</h3>
                  <p>Каждый проект уникален. Разрабатываю решения под ваши задачи.</p>
                </div>
                <div className="why-item">
                  <div className="why-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <h3>Прозрачность</h3>
                  <p>Честные сроки, понятные цены, регулярные отчеты о ходе работы.</p>
                </div>
                <div className="why-item">
                  <div className="why-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <h3>Результат</h3>
                  <p>Фокус на достижение ваших бизнес-целей, а не просто выполнение задач.</p>
                </div>
              </div>
            </div>

            {/* CTA блок */}
            <div className="contacts-cta">
              <h2>Готовы обсудить проект?</h2>
              <p>Напишите мне в Telegram или позвоните — проконсультирую бесплатно</p>
              <div className="cta-buttons">
                <a
                  href={CONTACTS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Написать в Telegram
                </a>
                <a
                  href={`tel:${CONTACTS.phoneLink}`}
                  className="btn btn-outline"
                >
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CompanyDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

