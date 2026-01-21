import { useParams, useNavigate, Link } from 'react-router-dom'
import { SERVICES_DETAIL, CASES_FULL } from '../constants/data'
import './ServiceDetail.css'
import { useState } from 'react'

export default function ServiceDetail() {
    const { serviceId } = useParams()
    const navigate = useNavigate()
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

    const service = SERVICES_DETAIL.find(s => s.id === serviceId)

    if (!service) {
        return (
            <div className="service-detail">
                <section className="section">
                    <div className="container">
                        <h1>Услуга не найдена</h1>
                        <button className="btn" onClick={() => navigate('/services')}>
                            Вернуться к услугам
                        </button>
                    </div>
                </section>
            </div>
        )
    }

    // Получаем связанные кейсы
    const relatedCases = CASES_FULL.filter(c => service.relatedCases.includes(c.id))

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index)
    }

    return (
        <div className="service-detail">
            {/* Hero Section */}
            <section className="service-hero section">
                <div className="container">
                    <button
                        className="back-button"
                        onClick={() => navigate('/services')}
                        aria-label="Вернуться к услугам"
                    >
                        ← Все услуги
                    </button>
                    <h1>{service.title}</h1>
                    <p className="service-subtitle">{service.subtitle}</p>
                    <p className="service-description">{service.description}</p>
                </div>
            </section>

            {/* Market Context */}
            <section className="section">
                <div className="container">
                    <div className="market-context-block">
                        <h2>Контекст российского рынка</h2>
                        <p>{service.marketContext}</p>
                    </div>
                </div>
            </section>

            {/* Target Audience */}
            <section className="section service-target-audience">
                <div className="container">
                    <h2>{service.targetAudience.title}</h2>
                    <ul className="audience-list">
                        {service.targetAudience.segments.map((segment, index) => (
                            <li key={index}>{segment}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Process */}
            <section className="section service-process">
                <div className="container">
                    <h2>{service.process.title}</h2>
                    <div className="process-steps">
                        {service.process.steps.map((step) => (
                            <div key={step.number} className="process-step">
                                <div className="step-number">{step.number}</div>
                                <div className="step-content">
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="section service-benefits">
                <div className="container">
                    <h2>Преимущества</h2>
                    <ul className="benefits-list">
                        {service.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Pricing */}
            <section className="section service-pricing">
                <div className="container">
                    <h2>{service.pricing.title}</h2>
                    <div className="pricing-grid">
                        {service.pricing.models.map((model, index) => (
                            <div key={index} className="pricing-card">
                                <h3>{model.name}</h3>
                                <p>{model.description}</p>
                                {model.price && <div className="price">{model.price}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Cases */}
            {relatedCases.length > 0 && (
                <section className="section service-cases">
                    <div className="container">
                        <h2>Примеры работ</h2>
                        <div className="cases-grid">
                            {relatedCases.map((caseItem) => (
                                <Link
                                    key={caseItem.id}
                                    to={`/cases/${caseItem.id}`}
                                    className="case-preview-card"
                                >
                                    <div className="case-tags">
                                        {caseItem.tags.map((tag, i) => (
                                            <span key={i} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                    <h3>{caseItem.title}</h3>
                                    <p>{caseItem.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ */}
            <section className="section service-faq">
                <div className="container">
                    <h2>Частые вопросы</h2>
                    <div className="faq-list">
                        {service.faq.map((item, index) => (
                            <div
                                key={index}
                                className={`faq-item ${openFaqIndex === index ? 'open' : ''}`}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={openFaqIndex === index}
                                >
                                    <span>{item.question}</span>
                                    <span className="faq-icon">{openFaqIndex === index ? '−' : '+'}</span>
                                </button>
                                <div className="faq-answer">
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section service-cta">
                <div className="container">
                    <div className="cta-block">
                        <h2>{service.cta.title}</h2>
                        <p>{service.cta.subtitle}</p>
                        <button
                            className="btn"
                            onClick={() => navigate('/contacts')}
                        >
                            Связаться со мной
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
