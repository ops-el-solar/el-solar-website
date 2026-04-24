import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'Inicio', to: '/' },
  { label: 'Sistema Inteligente de Ventas', to: '/sistema-inteligente-ventas' },
  { label: 'Estrategia Creativa', to: '/estrategia-creativa' },
  { label: 'Growth OS con IA', to: '/cultura-ia' },
  { label: 'Quiénes Somos', to: '/quienes-somos' },
]

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [location])

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'py-3 glass-panel' : 'py-6 bg-transparent'}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="z-50 relative flex items-center">
            <img
              src={theme === 'dark' ? '/assets/images/global/logo/logo-light.svg' : '/assets/images/global/logo/logo-dark.svg'}
              alt="El Solar"
              className="h-7 w-auto"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex gap-8 text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--text-muted)] absolute left-1/2 -translate-x-1/2">
            {links.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`hover:text-[var(--text-main)] transition-colors duration-200 ${location.pathname === to ? 'text-[var(--text-main)]' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <a
              href="https://tidycal.com/elsolar/sesion-de-diagnostico-auditoria-de-adquisicion-b2b"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center px-5 py-2 text-[10px] tracking-[0.18em] uppercase font-medium bg-[var(--button-bg)] text-[var(--button-text)] hover:opacity-85 transition-opacity duration-200"
            >
              Tu Diagnóstico Inteligente
            </a>
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'all' : 'none' }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-30 bg-[var(--bg-main)] flex flex-col items-start justify-center px-8 gap-8 lg:hidden"
      >
        {links.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className="text-3xl font-light font-space text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            {label}
          </Link>
        ))}
        <a
          href="https://tidycal.com/elsolar/sesion-de-diagnostico-auditoria-de-adquisicion-b2b"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-3xl font-light font-space text-[var(--text-main)]"
        >
          Tu Diagnóstico Inteligente
        </a>
      </motion.div>
    </>
  )
}