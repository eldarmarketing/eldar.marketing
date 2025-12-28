import './Cases.css'
import { ALL_CASES_PREVIEW } from '../constants/data'

interface CasesProps {
  onNavigate: (page: 'home' | 'services' | 'cases', caseId?: string) => void
}

export default function Cases({ onNavigate }: CasesProps) {
  return (
    <div className="cases">
      <section className="section">
        <div className="container">
          <h1>Кейсы</h1>
          <p className="page-intro">
            Реальные результаты наших клиентов
          </p>

          <div className="cases-grid">
            {ALL_CASES_PREVIEW.map((caseItem) => (
              <article 
                key={caseItem.id}
                className="case-preview-card" 
                onClick={() => onNavigate('cases', caseItem.id)}
              >
                <div className="case-preview-header">
                  <h3>{caseItem.title}</h3>
                  <div className="case-meta">
                    {caseItem.tags.map((tag) => (
                      <span key={tag} className="case-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <p>{caseItem.description}</p>
              </article>
            ))}
          </div>

          <div className="case-cta">
            <h3>Готовы к своему успешному кейсу?</h3>
            <p>Свяжитесь с нами, чтобы обсудить ваш проект</p>
            <button
              className="btn"
              onClick={() => {
                onNavigate('home')
                setTimeout(() => {
                  document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
            >
              Обсудить проект
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
