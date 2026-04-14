import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import SistemaVentas from './pages/SistemaVentas'
import EstrategiaCreativa from './pages/EstrategiaCreativa'
import CulturaIA from './pages/CulturaIA'
import QuienesSomos from './pages/QuienesSomos'
import Contacto from './pages/Contacto'
import NotFound from './pages/NotFound'

export default function App() {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout theme={theme} toggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sistema-inteligente-ventas" element={<SistemaVentas />} />
          <Route path="/estrategia-creativa" element={<EstrategiaCreativa />} />
          <Route path="/cultura-ia" element={<CulturaIA />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}