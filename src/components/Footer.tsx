import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import { CONTACTS, COMPANY, COMPANY_DETAILS } from '../constants/data'
import CompanyDetailsModal from './CompanyDetailsModal'

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <footer className="footer">
        <div className="footer-gradient"></div>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section footer-about">
              <img src="/logo.svg" alt={COMPANY.name} className="footer-logo-img" />
              <p className="footer-tagline">
                {COMPANY.tagline}
              </p>
              <p className="footer-description">
                Создаем эффективные маркетинговые стратегии, которые помогают бизнесу расти и развиваться в цифровой среде.
              </p>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Навигация</h3>
              <nav className="footer-nav">
                <Link to="/" className="footer-link">Главная</Link>
                <Link to="/services" className="footer-link">Услуги</Link>
                <Link to="/cases" className="footer-link">Кейсы</Link>
                <Link to="/contacts" className="footer-link">Контакты</Link>
              </nav>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Telegram канал</h3>
              <div className="footer-social">
                <a
                  href={CONTACTS.telegramChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link social-link-large"
                  title="Telegram канал"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4582 14.006 10.4252 13.9973 10.3938C13.9886 10.3624 13.9724 10.3337 13.95 10.31C13.89 10.26 13.81 10.28 13.74 10.29C13.65 10.31 12.25 11.24 9.52 13.08C9.12 13.35 8.76 13.49 8.44 13.48C8.08 13.47 7.4 13.28 6.89 13.11C6.26 12.91 5.77 12.8 5.81 12.45C5.83 12.27 6.08 12.09 6.55 11.9C9.47 10.63 11.41 9.79 12.38 9.39C15.16 8.23 15.73 8.03 16.11 8.03C16.19 8.03 16.38 8.05 16.5 8.15C16.6 8.23 16.63 8.34 16.64 8.42C16.63 8.48 16.65 8.66 16.64 8.8Z" fill="currentColor"/>
                  </svg>
                </a>
              </div>
              <p className="footer-channel-description">
                Подписывайтесь на наш канал
              </p>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Компания</h3>
              <button 
                className="footer-company-button"
                onClick={() => setIsModalOpen(true)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 15.01L9.41 16.42L11 14.84V19H13V14.84L14.59 16.43L16 15.01L12.01 11L8 15.01Z" fill="currentColor"/>
                </svg>
                Реквизиты компании
              </button>
              <p className="footer-company-info">
                {COMPANY_DETAILS.shortName}
              </p>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="footer-copyright">
                &copy; {new Date().getFullYear()} {COMPANY.name}. Все права защищены.
              </p>
              <div className="footer-bottom-links">
                <button 
                  className="footer-bottom-link"
                  onClick={() => setIsModalOpen(true)}
                >
                  Правовая информация
                </button>
                <Link 
                  to="/privacy"
                  className="footer-bottom-link"
                >
                  Политика конфиденциальности
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <CompanyDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

