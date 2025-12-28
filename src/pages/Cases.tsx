import './Cases.css'
import { ALL_CASES_PREVIEW, CASES_FULL, CaseDetail } from '../constants/data'

// Компонент для отображения детального кейса
function CaseDetailView({ caseData }: { caseData: CaseDetail }) {
  return (
    <article className="case-detail" id={`case-${caseData.id}`}>
      <div className="case-detail-header">
        <h2>{caseData.fullTitle}</h2>
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
            // Проверяем, есть ли в тексте жирный текст (обозначенный через <strong>)
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

      {caseData.id === 'amocrm' && (
        <div className="case-cta">
          <h3>Хотите похожий результат?</h3>
          <p>Обсудим ваш проект и подберём решение</p>
          <button
            className="btn"
            onClick={() => {
              document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Связаться с нами
          </button>
        </div>
      )}
    </article>
  )
}

export default function Cases() {
  return (
    <div className="cases">
      <section className="section">
        <div className="container">
          <h1>Кейсы</h1>
          <p className="page-intro">
            Реальные результаты наших клиентов
          </p>

          {/* Cases Grid */}
          <div className="cases-grid">
            {ALL_CASES_PREVIEW.map((caseItem) => (
              <article 
                key={caseItem.id}
                className="case-preview-card" 
                onClick={() => {
                  document.getElementById(`case-${caseItem.id}`)?.scrollIntoView({ behavior: 'smooth' })
                }}
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

          <div className="divider"></div>

          {/* Detailed Cases */}
          {CASES_FULL.map((caseData, index) => (
            <div key={caseData.id}>
              <CaseDetailView caseData={caseData} />
              {index < CASES_FULL.length - 1 && <div className="divider"></div>}
            </div>
          ))}

          <div className="case-cta">
            <h3>Готовы к своему успешному кейсу?</h3>
            <p>Свяжитесь с нами, чтобы обсудить ваш проект</p>
            <button
              className="btn"
              onClick={() => {
                document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
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
