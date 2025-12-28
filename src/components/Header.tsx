import { useState } from 'react'
import './Header.css'

type Page = 'home' | 'services' | 'cases'

interface HeaderProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleNavigate = (page: Page) => {
    onNavigate(page)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToContacts = () => {
    setMobileMenuOpen(false)
    setTimeout(() => {
      document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <button
            className="logo-btn"
            onClick={() => handleNavigate('home')}
            aria-label="На главную"
          >
            <img src="/logo.svg" alt="eldar.marketing" className="logo-img" />
          </button>

          <nav className="nav-desktop" aria-label="Основная навигация">
            <a
              href="#"
              className={currentPage === 'home' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                handleNavigate('home')
              }}
            >
              Главная
            </a>
            <a
              href="#"
              className={currentPage === 'services' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                handleNavigate('services')
              }}
            >
              Услуги
            </a>
            <a
              href="#"
              className={currentPage === 'cases' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                handleNavigate('cases')
              }}
            >
              Кейсы
            </a>
            <a
              href="#contacts"
              onClick={(e) => {
                e.preventDefault()
                scrollToContacts()
              }}
            >
              Контакты
            </a>
          </nav>

          <button
            className={`burger ${mobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Меню"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="nav-mobile" aria-label="Мобильная навигация">
            <a
              href="#"
              className={currentPage === 'home' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                handleNavigate('home')
              }}
            >
              Главная
            </a>
            <a
              href="#"
              className={currentPage === 'services' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                handleNavigate('services')
              }}
            >
              Услуги
            </a>
            <a
              href="#"
              className={currentPage === 'cases' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                handleNavigate('cases')
              }}
            >
              Кейсы
            </a>
            <a
              href="#contacts"
              onClick={(e) => {
                e.preventDefault()
                scrollToContacts()
              }}
            >
              Контакты
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}

