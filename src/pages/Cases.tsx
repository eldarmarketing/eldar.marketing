import { Link, useNavigate } from 'react-router-dom'
import { ALL_CASES_PREVIEW } from '../constants/data'
import './Cases.css'

export default function Cases() {
  const navigate = useNavigate()

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
                onClick={() => navigate(`/cases/${caseItem.id}`)}
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
            <p>Свяжитесь со мной, чтобы обсудить ваш проект</p>
            <button
              className="btn"
              onClick={() => navigate('/contacts')}
            >
              Перейти к контактам
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
