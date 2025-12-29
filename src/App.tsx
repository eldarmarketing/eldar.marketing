import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Services from './pages/Services'
import Cases from './pages/Cases'
import CaseDetail from './pages/CaseDetail'
import Contacts from './pages/Contacts'
import ContractGenerator from './pages/ContractGenerator'
import LogoDemo from './pages/LogoDemo'

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/:caseId" element={<CaseDetail />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contract" element={<ContractGenerator />} />
          <Route path="/logo-demo" element={<LogoDemo />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

