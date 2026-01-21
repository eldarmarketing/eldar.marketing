import { useNavigate, Link } from 'react-router-dom'
import { SERVICES_FULL } from '../constants/data'
import './Services.css'

export default function Services() {
  const navigate = useNavigate()

  return (
    <div className="services">
      <section className="section">
        <div className="container">
          <h1>Услуги</h1>
          <p className="page-intro">
            Комплексные решения для роста бизнеса: от стратегии до автоматизации процессов
          </p>

          <div className="services-grid">
            {SERVICES_FULL.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="service-card"
              >
                <h2>{service.title}</h2>
                <ul>
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>

          <div className="services-cta">
            <h2>Готовы обсудить проект?</h2>
            <p>Свяжитесь со мной удобным способом</p>
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

