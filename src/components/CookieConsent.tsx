import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CookieConsent.css'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Проверяем, согласился ли пользователь ранее
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      // Показываем баннер с небольшой задержкой для плавности
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="cookie-consent">
      <div className="cookie-content">
        <div className="cookie-text">
          <p>
            Мы используем файлы cookies для улучшения работы сайта, анализа посещаемости и персонализации контента.
            Продолжая использовать сайт, вы соглашаетесь с{' '}
            <Link 
              to="/privacy" 
              className="cookie-link"
            >
              политикой конфиденциальности
            </Link>
            {' '}в соответствии с законодательством РФ.
          </p>
        </div>
        <button 
          onClick={handleAccept}
          className="cookie-accept"
          aria-label="Принять cookies"
        >
          Понятно
        </button>
      </div>
    </div>
  )
}

