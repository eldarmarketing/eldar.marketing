import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Cases from './pages/Cases'
import CaseDetail from './pages/CaseDetail'

type Page = 'home' | 'services' | 'cases'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [currentCaseId, setCurrentCaseId] = useState<string | null>(null)

  const handleNavigate = (page: Page, caseId?: string) => {
    if (page === 'cases' && caseId) {
      setCurrentCaseId(caseId)
    } else {
      setCurrentCaseId(null)
    }
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const renderPage = () => {
    if (currentPage === 'cases' && currentCaseId) {
      return <CaseDetail caseId={currentCaseId} onNavigate={handleNavigate} />
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />
      case 'services':
        return <Services />
      case 'cases':
        return <Cases onNavigate={handleNavigate} />
      default:
        return <Home onNavigate={handleNavigate} />
    }
  }

  return (
    <>
      <Header 
        currentPage={currentCaseId ? 'cases' : currentPage} 
        onNavigate={handleNavigate} 
      />
      <main>{renderPage()}</main>
      <Footer />
    </>
  )
}

export default App

