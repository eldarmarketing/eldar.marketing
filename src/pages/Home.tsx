import './Home.css'
import { COMPANY, ABOUT, SERVICES_PREVIEW, APPROACH_STEPS, CASES_PREVIEW_WITH_RESULTS, PLANETA_PROMO } from '../constants/data'

interface HomeProps {
  onNavigate: (page: 'home' | 'services' | 'cases') => void
}

export default function Home({ onNavigate }: HomeProps) {
  const handleNavigate = (page: 'home' | 'services' | 'cases') => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
              <button
                className="btn"
                onClick={() => {
                  document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Обсудить проект
              </button>
              <button
                className="btn btn-outline"
                onClick={() => handleNavigate('cases')}
              >
                Посмотреть кейсы
              </button>
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
          <div className="about-content">
            <div className="about-text">
              <h2>Кто мы</h2>
              <div className="founder-info">
                <h3>{ABOUT.founder.name}</h3>
                <p className="founder-title">{ABOUT.founder.title}</p>
              </div>
              <p className="about-story">{ABOUT.founder.story}</p>
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
            <button
              className="btn btn-outline"
              onClick={() => handleNavigate('services')}
            >
              Все услуги
            </button>
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

      {/* Cases Preview */}
      <section className="cases-preview section">
        <div className="container">
          <h2>Кейсы</h2>
          <div className="cases-preview-grid">
            {CASES_PREVIEW_WITH_RESULTS.map((caseItem) => (
              <div key={caseItem.id} className="case-card">
                <div className="case-header">
                  <h3>{caseItem.title}</h3>
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
            ))}
          </div>
          <div className="section-cta">
            <button
              className="btn btn-outline"
              onClick={() => handleNavigate('cases')}
            >
              Все кейсы
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

