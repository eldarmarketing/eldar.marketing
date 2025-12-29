import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Home.css'
import '../components/CompanyDetailsModal.css'
import { COMPANY, ABOUT, SERVICES_PREVIEW, APPROACH_STEPS, CASES_PREVIEW_WITH_RESULTS, PLANETA_PROMO, ECOMMERCE_PROMO, CONTACTS } from '../constants/data'

export default function Home() {
  const navigate = useNavigate()
  const [showContactPopup, setShowContactPopup] = useState(false)

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero section">
        <div className="container">
          <div className="hero-content">
            <h1>{COMPANY.hero.title}</h1>
            <p className="hero-subtitle">
              {COMPANY.hero.subtitle}
            </p>
            <div className="hero-buttons">
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Обсудить проект
              </a>
              <Link
                to="/cases"
                className="btn btn-outline"
              >
                Посмотреть кейсы
              </Link>
            </div>
            <p className="hero-caption">
              {COMPANY.hero.caption}
            </p>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* About Section */}
      <section className="about section">
        <div className="container">
          <h2>Кто мы</h2>
          <div className="about-content">
            <div className="about-text">
              <div className="founder-info">
                <div 
                  className="founder-avatar-wrapper"
                  onClick={() => setShowContactPopup(true)}
                  style={{ cursor: 'pointer' }}
                  title="Связаться с Эльдаром"
                >
                  <img 
                    src="/eldar-photo.png" 
                    alt={ABOUT.founder.name}
                    className="founder-avatar"
                  />
                  <span className="online-indicator">
                    <span className="online-dot"></span>
                  </span>
                </div>
                <div className="founder-details">
                  <h3>{ABOUT.founder.name}</h3>
                  <p className="founder-title">{ABOUT.founder.title}</p>
                </div>
              </div>
              
              {/* Contact Popup */}
              {showContactPopup && (
                <div className="modal-overlay" onClick={() => setShowContactPopup(false)}>
                  <div className="modal-content contact-modal" onClick={(e) => e.stopPropagation()}>
                    <button 
                      className="modal-close"
                      onClick={() => setShowContactPopup(false)}
                      aria-label="Закрыть"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    <h2 className="modal-title">Связаться</h2>
                    
                    <div className="details-list">
                      <a
                        href={CONTACTS.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="detail-item contact-item"
                        onClick={() => setShowContactPopup(false)}
                      >
                        <div className="detail-label">Telegram</div>
                        <div className="detail-value-wrapper">
                          <div className="detail-value">Написать в Telegram</div>
                          <div className="contact-arrow">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </div>
                        </div>
                      </a>
                      <a
                        href={`tel:${CONTACTS.phoneLink}`}
                        className="detail-item contact-item"
                        onClick={() => setShowContactPopup(false)}
                      >
                        <div className="detail-label">Телефон</div>
                        <div className="detail-value-wrapper">
                          <div className="detail-value">{CONTACTS.phone}</div>
                          <div className="contact-arrow">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              )}
              <p className="about-story">{ABOUT.founder.story}</p>
              <p className="about-team">{ABOUT.founder.team}</p>
              <blockquote className="about-philosophy">
                {ABOUT.founder.philosophy}
              </blockquote>
            </div>
            <div className="about-stats">
              {ABOUT.stats.map((stat, idx) => (
                <div key={idx} className="stat-item">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* Services Preview */}
      <section className="services-preview section">
        <div className="container">
          <h2>Услуги</h2>
          <div className="grid grid-3">
            {SERVICES_PREVIEW.map((service) => (
              <div key={service.id} className="card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link
              to="/services"
              className="btn btn-outline"
            >
              Все услуги
            </Link>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* Approach Section */}
      <section className="approach section">
        <div className="container">
          <h2>Подход</h2>
          <div className="approach-list">
            {APPROACH_STEPS.map((step) => (
              <div key={step.number} className="approach-item">
                <div className="approach-number">{step.number}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* Planeta.marketing Promo */}
      <section className="planeta-promo section">
        <div className="container">
          <div className="planeta-promo-content">
            <div className="planeta-badge">{PLANETA_PROMO.badge}</div>
            <h2 className="planeta-title">{PLANETA_PROMO.title}</h2>
            <p className="planeta-description">{PLANETA_PROMO.description}</p>
            
            <div className="planeta-grid">
              <div className="planeta-column">
                <h3>Знакомо?</h3>
                <ul className="planeta-list problems">
                  {PLANETA_PROMO.problems.map((problem, idx) => (
                    <li key={idx}>{problem}</li>
                  ))}
                </ul>
              </div>
              
              <div className="planeta-column">
                <h3>Что даёт система:</h3>
                <ul className="planeta-list features">
                  {PLANETA_PROMO.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="planeta-cta">
              <a 
                href={PLANETA_PROMO.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-planeta"
              >
                {PLANETA_PROMO.cta}
              </a>
              <span className="planeta-link-note">planeta.marketing</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* E-commerce Promo */}
      <section className="ecommerce-promo section">
        <div className="container">
          <div className="ecommerce-promo-content">
            <div className="ecommerce-badge">{ECOMMERCE_PROMO.badge}</div>
            <h2 className="ecommerce-title">{ECOMMERCE_PROMO.title}</h2>
            <p className="ecommerce-description">{ECOMMERCE_PROMO.description}</p>
            
            <div className="ecommerce-features">
              <h3>Что входит в решение:</h3>
              <ul className="ecommerce-list">
                {ECOMMERCE_PROMO.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="ecommerce-example">
              <p className="example-text">«{ECOMMERCE_PROMO.example.text}»</p>
              <p className="example-subtext">— {ECOMMERCE_PROMO.example.subtext}</p>
              <div className="example-links">
                {ECOMMERCE_PROMO.example.links.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="example-link"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>

            <div className="ecommerce-cta">
              <a 
                href={ECOMMERCE_PROMO.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ecommerce"
              >
                {ECOMMERCE_PROMO.cta}
              </a>
              <span className="ecommerce-note">Стоимость комплексного решения уточняйте в Telegram</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* Cases Preview */}
      <section className="cases-preview section">
        <div className="container">
          <h2>Кейсы</h2>
          <div className="cases-preview-grid">
            {CASES_PREVIEW_WITH_RESULTS.map((caseItem) => {
              // Проверяем, является ли это кейсом про рекламу
              const isAdCase = caseItem.title.includes('реклама не работает')
              
              return (
                <div 
                  key={caseItem.id} 
                  className="case-card"
                  onClick={() => navigate(`/cases/${caseItem.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="case-header">
                    <h3>
                      {isAdCase ? (
                        // Разбиваем текст на слова для водного эффекта
                        caseItem.title.split(' ').map((word, idx) => (
                          <span key={idx} className="water-text-word">
                            {word}{idx < caseItem.title.split(' ').length - 1 ? ' ' : ''}
                          </span>
                        ))
                      ) : (
                        caseItem.title
                      )}
                    </h3>
                    <span className="case-tag">{caseItem.tags.join(' / ')}</span>
                  </div>
                  <p className="case-description">
                    {caseItem.description}
                  </p>
                  <div className="case-results">
                    {caseItem.previewResults.map((result, idx) => (
                      <div key={idx} className="result-item">
                        <div className="result-value">{result.value}</div>
                        <div className="result-label">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="section-cta">
            <Link
              to="/cases"
              className="btn btn-outline"
            >
              Все кейсы
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

