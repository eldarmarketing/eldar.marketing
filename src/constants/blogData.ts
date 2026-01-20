export interface BlogPost {
  id: string
  title: string
  description: string
  date: string
  tags: string[]
  readTime: string
  contentPath: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'neuromarketing-osnovy',
    title: 'Нейромаркетинг: как использовать науку о мозге для увеличения продаж',
    description: 'Разбираемся в основах нейромаркетинга и практических техниках влияния на подсознание клиентов для повышения конверсии.',
    date: '2026-01-20',
    tags: ['Нейромаркетинг', 'Психология продаж', 'Конверсия'],
    readTime: '7 мин',
    contentPath: '/blog-content/neuromarketing-osnovy.md',
  },
  {
    id: 'vibecoding-philosophy',
    title: 'Вайбкодинг: когда интуиция важнее правил',
    description: 'Что такое вайбкодинг и почему иногда "почувствовать" решение эффективнее, чем следовать best practices.',
    date: '2026-01-19',
    tags: ['Вайбкодинг', 'Разработка', 'Философия'],
    readTime: '5 мин',
    contentPath: '/blog-content/vibecoding-philosophy.md',
  },
  {
    id: 'business-automation-roi',
    title: 'ROI автоматизации: как посчитать реальную выгоду от внедрения CRM',
    description: 'Пошаговая методика расчёта возврата инвестиций в автоматизацию бизнес-процессов на примере amoCRM.',
    date: '2026-01-18',
    tags: ['Автоматизация', 'CRM', 'ROI', 'Оптимизация'],
    readTime: '8 мин',
    contentPath: '/blog-content/business-automation-roi.md',
  },
  {
    id: 'color-psychology-marketing',
    title: 'Психология цвета в digital-маркетинге: от теории к практике',
    description: 'Как цветовые решения влияют на поведение пользователей и конверсию. Практические примеры и A/B тесты.',
    date: '2026-01-17',
    tags: ['Нейромаркетинг', 'Дизайн', 'UX/UI'],
    readTime: '6 мин',
    contentPath: '/blog-content/color-psychology-marketing.md',
  },
  {
    id: 'crm-integration-ecosystem',
    title: 'Экосистема интеграций: как превратить CRM в центр управления бизнесом',
    description: 'Обзор ключевых интеграций для CRM-систем: от рекламных кабинетов до складского учёта.',
    date: '2026-01-16',
    tags: ['CRM', 'Автоматизация', 'Интеграции'],
    readTime: '10 мин',
    contentPath: '/blog-content/crm-integration-ecosystem.md',
  },
]
