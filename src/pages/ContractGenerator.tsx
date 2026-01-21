import { useState } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import './ContractGenerator.css'

// Настройка шрифтов для pdfMake
if (pdfFonts && 'pdfMake' in pdfFonts) {
  pdfMake.vfs = (pdfFonts as any).pdfMake.vfs
} else if (pdfFonts && 'vfs' in pdfFonts) {
  pdfMake.vfs = (pdfFonts as any).vfs
}

export default function ContractGenerator() {
  const [formData, setFormData] = useState({
    // Данные компании клиента
    companyName: '',
    companyInn: '',
    companyKpp: '',
    companyOgrn: '',
    companyAddress: '',
    companyDirector: '',
    companyDirectorPost: '',
    companyEmail: '',
    companyPhone: '',
    
    // Банковские реквизиты клиента
    bankName: '',
    bik: '',
    corrAccount: '',
    paymentAccount: '',
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  const generateContractNumber = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${year}/${month}/${random}`
  }

  const generatePDF = () => {
    setIsGenerating(true)

    try {
      const contractNumber = generateContractNumber()
      const contractDate = formatDate(new Date())
      
      // Определение структуры документа для pdfMake
      const docDefinition: any = {
        content: [
          // Заголовок
          {
            text: 'ДОГОВОР НА ОКАЗАНИЕ УСЛУГ',
            style: 'header',
            alignment: 'center',
            margin: [0, 0, 0, 10]
          },
          {
            text: `№ ${contractNumber} от ${contractDate}`,
            style: 'subheader',
            alignment: 'center',
            margin: [0, 0, 0, 20]
          },
          {
            text: 'г. Москва',
            margin: [0, 0, 0, 15]
          },

          // Стороны договора
          {
            text: '1. ПРЕДМЕТ ДОГОВОРА',
            style: 'sectionHeader',
            margin: [0, 10, 0, 10]
          },
          {
            text: [
              'ИП Абилвапов Эльдар Меджитович (далее - "Исполнитель"), с одной стороны, и ',
              `${formData.companyName}, ИНН ${formData.companyInn}, КПП ${formData.companyKpp}, `,
              `ОГРН ${formData.companyOgrn}, в лице ${formData.companyDirectorPost} ${formData.companyDirector}, `,
              'действующего на основании Устава (далее - "Заказчик"), с другой стороны, ',
              'заключили настоящий договор о нижеследующем:'
            ],
            margin: [0, 0, 0, 10],
            alignment: 'justify'
          },
          {
            text: '1.1. Исполнитель обязуется оказать Заказчику услуги по проведению маркетингового аудита (далее - "Услуги"), а Заказчик обязуется принять и оплатить оказанные услуги в порядке и на условиях, предусмотренных настоящим Договором.',
            margin: [0, 0, 0, 10],
            alignment: 'justify'
          },
          {
            text: '1.2. Услуги включают в себя:',
            margin: [0, 0, 0, 5]
          },
          {
            ul: [
              'Анализ текущей маркетинговой стратегии Заказчика',
              'Оценка эффективности маркетинговых каналов',
              'Анализ целевой аудитории и конкурентов',
              'Рекомендации по оптимизации маркетинговых процессов',
              'Предоставление отчета с результатами аудита'
            ],
            margin: [0, 0, 0, 15]
          },

          // Стоимость
          {
            text: '2. СТОИМОСТЬ УСЛУГ И ПОРЯДОК РАСЧЕТОВ',
            style: 'sectionHeader',
            margin: [0, 10, 0, 10]
          },
          {
            text: '2.1. Стоимость услуг Исполнителя составляет 15 000 (Пятнадцать тысяч) рублей за один час работы, НДС не облагается.',
            margin: [0, 0, 0, 10],
            alignment: 'justify'
          },
          {
            text: '2.2. Оплата производится Заказчиком на основании выставленного счета в течение 5 (пяти) банковских дней с даты получения счета.',
            margin: [0, 0, 0, 10],
            alignment: 'justify'
          },
          {
            text: '2.3. Оплата производится путем перечисления денежных средств на расчетный счет Исполнителя, указанный в настоящем Договоре.',
            margin: [0, 0, 0, 15],
            alignment: 'justify'
          },

          // Новая страница для реквизитов
          {
            text: 'РЕКВИЗИТЫ СТОРОН:',
            style: 'sectionHeader',
            pageBreak: 'before',
            margin: [0, 0, 0, 15]
          },

          // Исполнитель
          {
            text: 'ИСПОЛНИТЕЛЬ:',
            bold: true,
            margin: [0, 0, 0, 5]
          },
          {
            text: [
              'ИП Абилвапов Эльдар Меджитович\n',
              'ИНН: 781311652201\n',
              'ОГРНИП: 318784700197860\n',
              'Юридический адрес: 197197, Россия, Санкт-Петербург, Большой пр. ПС. д.19, кв.17\n',
              'Фактический адрес: 199106, Россия, Санкт-Петербург, улица Шевченко, 16, пом. 5Н\n',
              'Email: info@eldar.marketing\n',
              'Банк: ТОЧКА ПАО БАНКА "ФК ОТКРЫТИЕ"\n',
              'БИК: 044525999\n',
              'Корр. счет: 30101810845250000999\n',
              'Расч. счет: №40802810403500008273'
            ],
            margin: [0, 0, 0, 15]
          },

          // Заказчик
          {
            text: 'ЗАКАЗЧИК:',
            bold: true,
            margin: [0, 0, 0, 5]
          },
          {
            text: [
              `${formData.companyName}\n`,
              `ИНН: ${formData.companyInn}\n`,
              `КПП: ${formData.companyKpp}\n`,
              `ОГРН: ${formData.companyOgrn}\n`,
              `Адрес: ${formData.companyAddress}\n`,
              `Email: ${formData.companyEmail}\n`,
              `Телефон: ${formData.companyPhone}`
            ],
            margin: [0, 0, 0, formData.bankName ? 15 : 30]
          },

          // Банковские реквизиты (если указаны)
          ...(formData.bankName ? [
            {
              text: 'Банковские реквизиты:',
              bold: true,
              margin: [0, 0, 0, 5]
            },
            {
              text: [
                `Банк: ${formData.bankName}\n`,
                `БИК: ${formData.bik}\n`,
                `Корр. счет: ${formData.corrAccount}\n`,
                `Расч. счет: ${formData.paymentAccount}`
              ],
              margin: [0, 0, 0, 30]
            }
          ] : []),

          // Подписи
          {
            text: 'ПОДПИСИ СТОРОН:',
            style: 'sectionHeader',
            margin: [0, 20, 0, 15]
          },
          {
            columns: [
              {
                text: 'ИСПОЛНИТЕЛЬ:',
                bold: true
              },
              {
                text: 'ЗАКАЗЧИК:',
                bold: true
              }
            ],
            margin: [0, 0, 0, 30]
          },
          {
            columns: [
              {
                text: '_______________ / Абилвапов Э.М. /'
              },
              {
                text: `_______________ / ${formData.companyDirector} /`
              }
            ]
          }
        ],
        styles: {
          header: {
            fontSize: 16,
            bold: true
          },
          subheader: {
            fontSize: 12,
            bold: true
          },
          sectionHeader: {
            fontSize: 11,
            bold: true
          }
        },
        defaultStyle: {
          fontSize: 10,
          font: 'Roboto'
        }
      }

      // Генерация и скачивание PDF
      pdfMake.createPdf(docDefinition).download(
        `Договор_${contractNumber.replace(/\//g, '-')}_${formData.companyName}.pdf`
      )
      
      alert('Договор успешно сгенерирован и скачан!')
    } catch (error) {
      console.error('Ошибка при генерации PDF:', error)
      alert('Произошла ошибка при генерации договора. Пожалуйста, проверьте все поля.')
    } finally {
      setIsGenerating(false)
    }
  }

  const isFormValid = () => {
    return formData.companyName && 
           formData.companyInn && 
           formData.companyKpp &&
           formData.companyOgrn &&
           formData.companyAddress &&
           formData.companyDirector &&
           formData.companyDirectorPost &&
           formData.companyEmail &&
           formData.companyPhone
  }

  return (
    <div className="contract-generator-page section">
      <div className="container">
        <div className="contract-header">
          <h1>Генерация договора на услуги аудита</h1>
          <p className="contract-intro">
            Заполните реквизиты вашей компании, и система автоматически сгенерирует договор на оказание услуг маркетингового аудита.
          </p>
          <div className="contract-price-badge">
            <span className="price-label">Стоимость услуг:</span>
            <span className="price-value">15 000 ₽ / час</span>
          </div>
        </div>

        <form className="contract-form" onSubmit={(e) => { e.preventDefault(); generatePDF(); }}>
          {/* Основные данные компании */}
          <div className="form-section">
            <h3>Основные данные компании</h3>
            
            <div className="form-group">
              <label htmlFor="companyName">
                Полное наименование организации <span className="required">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder='ООО "Название компании"'
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="companyInn">
                  ИНН <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="companyInn"
                  name="companyInn"
                  value={formData.companyInn}
                  onChange={handleChange}
                  placeholder="1234567890"
                  maxLength={10}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="companyKpp">
                  КПП <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="companyKpp"
                  name="companyKpp"
                  value={formData.companyKpp}
                  onChange={handleChange}
                  placeholder="123456789"
                  maxLength={9}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="companyOgrn">
                  ОГРН <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="companyOgrn"
                  name="companyOgrn"
                  value={formData.companyOgrn}
                  onChange={handleChange}
                  placeholder="1234567890123"
                  maxLength={13}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="companyAddress">
                Юридический адрес <span className="required">*</span>
              </label>
              <textarea
                id="companyAddress"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                placeholder="123456, г. Москва, ул. Примерная, д. 1, офис 100"
                rows={3}
                required
              />
            </div>
          </div>

          {/* Руководитель */}
          <div className="form-section">
            <h3>Данные руководителя</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="companyDirectorPost">
                  Должность <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="companyDirectorPost"
                  name="companyDirectorPost"
                  value={formData.companyDirectorPost}
                  onChange={handleChange}
                  placeholder="Генеральный директор"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="companyDirector">
                  ФИО руководителя <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="companyDirector"
                  name="companyDirector"
                  value={formData.companyDirector}
                  onChange={handleChange}
                  placeholder="Иванов Иван Иванович"
                  required
                />
              </div>
            </div>
          </div>

          {/* Контактные данные */}
          <div className="form-section">
            <h3>Контактные данные</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="companyEmail">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="companyEmail"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  placeholder="info@company.ru"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="companyPhone">
                  Телефон <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="companyPhone"
                  name="companyPhone"
                  value={formData.companyPhone}
                  onChange={handleChange}
                  placeholder="+7 (999) 123-45-67"
                  required
                />
              </div>
            </div>
          </div>

          {/* Банковские реквизиты */}
          <div className="form-section">
            <h3>Банковские реквизиты (опционально)</h3>
            <p className="section-note">Заполните, если хотите включить банковские реквизиты в договор</p>
            
            <div className="form-group">
              <label htmlFor="bankName">Наименование банка</label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder='ПАО "Сбербанк"'
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bik">БИК</label>
                <input
                  type="text"
                  id="bik"
                  name="bik"
                  value={formData.bik}
                  onChange={handleChange}
                  placeholder="044525225"
                  maxLength={9}
                />
              </div>

              <div className="form-group">
                <label htmlFor="corrAccount">Корреспондентский счет</label>
                <input
                  type="text"
                  id="corrAccount"
                  name="corrAccount"
                  value={formData.corrAccount}
                  onChange={handleChange}
                  placeholder="30101810400000000225"
                  maxLength={20}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="paymentAccount">Расчетный счет</label>
              <input
                type="text"
                id="paymentAccount"
                name="paymentAccount"
                value={formData.paymentAccount}
                onChange={handleChange}
                placeholder="40702810138000000000"
                maxLength={20}
              />
            </div>
          </div>

          {/* Кнопка генерации */}
          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-generate"
              disabled={!isFormValid() || isGenerating}
            >
              {isGenerating ? 'Генерация...' : 'Сгенерировать договор'}
            </button>
            <p className="form-note">
              После нажатия кнопки автоматически скачается PDF-файл с договором
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

