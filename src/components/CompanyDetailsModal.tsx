import { useState } from 'react'
import { COMPANY_DETAILS } from '../constants/data'
import './CompanyDetailsModal.css'

interface CompanyDetailsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CompanyDetailsModal({ isOpen, onClose }: CompanyDetailsModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  if (!isOpen) return null

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(fieldName)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Ошибка при копировании:', err)
    }
  }

  const fields = [
    { label: 'Наименование', value: COMPANY_DETAILS.fullName, key: 'name' },
    { label: 'ОГРНИП', value: COMPANY_DETAILS.ogrn, key: 'ogrn' },
    { label: 'ИНН', value: COMPANY_DETAILS.inn, key: 'inn' },
    { label: 'Расчетный счет', value: COMPANY_DETAILS.bankAccount, key: 'account' },
    { label: 'Название банка', value: COMPANY_DETAILS.bankName, key: 'bank' },
    { label: 'БИК', value: COMPANY_DETAILS.bik, key: 'bik' },
    { label: 'Город', value: COMPANY_DETAILS.city, key: 'city' },
    { label: 'Корр. счет', value: COMPANY_DETAILS.correspondentAccount, key: 'corr' },
    { label: 'Юридический адрес', value: COMPANY_DETAILS.legalAddress, key: 'legal' },
    { label: 'Фактический адрес', value: COMPANY_DETAILS.actualAddress, key: 'actual' },
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <h2 className="modal-title">Реквизиты</h2>
        
        <div className="details-list">
          {fields.map((field) => (
            <div key={field.key} className="detail-item">
              <div className="detail-label">{field.label}</div>
              <div className="detail-value-wrapper">
                <div className="detail-value">{field.value}</div>
                <button
                  className={`copy-button ${copiedField === field.key ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(field.value, field.key)}
                  title="Копировать"
                >
                  {copiedField === field.key ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

