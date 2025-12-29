import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { COMPANY, CONTACTS } from '../constants/data'
import './Header.css'
import './LogoAnimations.css'

export default function Header() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLogoClick = () => {
    closeMobileMenu()
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo logo-advanced" onClick={handleLogoClick}>
            <img src="/logo.svg" alt={COMPANY.name} className="logo-img" />
          </Link>

          <nav className="nav-desktop">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Главная
            </Link>
            <Link 
              to="/services" 
              className={`nav-link ${isActive('/services') ? 'active' : ''}`}
            >
              Услуги
            </Link>
            <Link 
              to="/cases" 
              className={`nav-link ${isActive('/cases') || location.pathname.startsWith('/cases/') ? 'active' : ''}`}
            >
              Кейсы
            </Link>
            <Link 
              to="/contacts" 
              className={`nav-link ${isActive('/contacts') ? 'active' : ''}`}
            >
              Контакты
            </Link>
          </nav>

          <a 
            href={CONTACTS.telegram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary header-cta"
          >
            Написать в Telegram
          </a>

          <button 
            className={`burger ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="nav-mobile">
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Главная
            </Link>
            <Link 
              to="/services" 
              className={isActive('/services') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Услуги
            </Link>
            <Link 
              to="/cases" 
              className={isActive('/cases') || location.pathname.startsWith('/cases/') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Кейсы
            </Link>
            <Link 
              to="/contacts" 
              className={isActive('/contacts') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Контакты
            </Link>
            <a 
              href={CONTACTS.telegram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginTop: 'var(--spacing-sm)' }}
            >
              Написать в Telegram
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}

