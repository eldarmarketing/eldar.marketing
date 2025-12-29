import { useParams, useNavigate } from 'react-router-dom'
import { CASES_FULL, CONTACTS } from '../constants/data'
import './CaseDetail.css'

export default function CaseDetail() {
  const { caseId } = useParams<{ caseId: string }>()
  const navigate = useNavigate()
  const caseData = CASES_FULL.find((c) => c.id === caseId)

  if (!caseData) {
    return (
      <div className="case-detail-page">
        <section className="section">
          <div className="container">
            <button className="back-button" onClick={() => navigate('/cases')}>
              ← Вернуться к кейсам
            </button>
            <h1>Кейс не найден</h1>
            <p>К сожалению, запрошенный кейс не найден.</p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="case-detail-page">
      <section className="section">
        <div className="container">
          <button className="back-button" onClick={() => navigate('/cases')}>
            ← Вернуться к кейсам
          </button>

          <article className="case-detail">
            <div className="case-detail-header">
              <h1>{caseData.fullTitle}</h1>
              <div className="case-meta">
                {caseData.tags.map((tag) => (
                  <span key={tag} className="case-tag">{tag}</span>
                ))}
              </div>
            </div>

            {caseData.about && (
              <div className="case-section">
                <h3>{caseData.id === 'amocrm' ? 'О клиенте' : 'О проекте'}</h3>
                <p>{caseData.about}</p>
              </div>
            )}

            {caseData.problem && (
              <div className="case-section">
                <h3>Проблема</h3>
                {typeof caseData.problem === 'string' ? (
                  <p>{caseData.problem}</p>
                ) : (
                  <ul className="case-list">
                    {caseData.problem.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {caseData.task && (
              <div className="case-section">
                <h3>Задача</h3>
                <p>{caseData.task}</p>
              </div>
            )}

            <div className="case-section">
              <h3>{caseData.task || caseData.problem ? 'Что сделали' : 'Решение'}</h3>
              <ul className="case-list">
                {caseData.solution.map((item, idx) => {
                  const parts = item.split(/(<strong>.*?<\/strong>)/g)
                  return (
                    <li key={idx}>
                      {parts.map((part, partIdx) => {
                        if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
                          const text = part.replace(/<\/?strong>/g, '')
                          return <strong key={partIdx}>{text}</strong>
                        }
                        return part
                      })}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="case-results-section">
              <h3>Результаты</h3>
              {caseData.id === 'chatgpt' && (
                <p>
                  Упростили процесс мониторинга тысяч сообщений. Операторы получают уведомления 
                  только о критических ситуациях, что позволяет:
                </p>
              )}
              {caseData.id === 'chatgpt' ? (
                <ul className="case-list">
                  <li>Своевременно обнаруживать недовольных клиентов</li>
                  <li>Предотвращать эскалацию конфликтов</li>
                  <li>Сохранять репутацию компании</li>
                  <li>Экономить время операторов на ручной проверке</li>
                </ul>
              ) : (
                <div className="results-grid">
                  {caseData.results.map((result, idx) => (
                    <div key={idx} className="result-card">
                      <div className="result-big">{result.value}</div>
                      <p>{result.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {caseData.quote && (
              <div className="case-quote">
                <blockquote>
                  <p>«{caseData.quote.text}»</p>
                  <cite>— {caseData.quote.author}</cite>
                </blockquote>
              </div>
            )}

            <div className="case-cta">
              <h3>Хотите похожий результат?</h3>
              <p>Обсудим ваш проект и подберём решение</p>
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Написать в Telegram
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

