import './Services.css'
import { SERVICES_FULL } from '../constants/data'

export default function Services() {

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
              <div key={service.id} className="service-card">
                <h2>{service.title}</h2>
                <ul>
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="services-cta">
            <h2>Готовы обсудить проект?</h2>
            <p>Свяжитесь с нами удобным способом</p>
            <button
              className="btn"
              onClick={() => {
                document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Связаться
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

