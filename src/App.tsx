import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Cases from './pages/Cases'

type Page = 'home' | 'services' | 'cases'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />
      case 'services':
        return <Services />
      case 'cases':
        return <Cases />
      default:
        return <Home onNavigate={setCurrentPage} />
    }
  }

  return (
    <>
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer />
    </>
  )
}

export default App

