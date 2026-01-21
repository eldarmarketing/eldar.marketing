import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import CookieConsent from './components/CookieConsent'
import ScrollProgressBar from './components/ScrollProgressBar'
import Home from './pages/Home'
import Services from './pages/Services'
import Cases from './pages/Cases'
import CaseDetail from './pages/CaseDetail'
import Contacts from './pages/Contacts'
import ContractGenerator from './pages/ContractGenerator'
import LogoDemo from './pages/LogoDemo'
import Privacy from './pages/Privacy'
import ServiceDetail from './pages/ServiceDetail'
import Proposal from './pages/Proposal'

function App() {
  return (
    <div className="app">
      <ScrollProgressBar />
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/:caseId" element={<CaseDetail />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contract" element={<ContractGenerator />} />
          <Route path="/logo-demo" element={<LogoDemo />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/proposal" element={<Proposal />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}

export default App

