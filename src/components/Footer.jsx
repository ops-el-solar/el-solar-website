import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Sistema Inteligente de Ventas', to: '/sistema-inteligente-ventas' },
  { label: 'Estrategia Creativa', to: '/estrategia-creativa' },
  { label: 'Growth OS con IA', to: '/cultura-ia' },
  { label: 'Quiénes Somos', to: '/quienes-somos' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/elsolar.creativegroup/',
    icon: '/assets/images/global/icons/icon-instagram.svg',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@ElSolarCreativeGroup',
    icon: '/assets/images/global/icons/icon-youtube.svg',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/elsolaragencia/',
    icon: '/assets/images/global/icons/icon-linkedin.svg',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@elsolarcreativegroup',
    icon: '/assets/images/global/icons/icon-tiktok.svg',
  },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-brand)' }} className="pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Col 1: Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link to="/">
              <img
                src="/assets/images/global/logo/logo-light.svg"
                alt="El Solar"
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-[11px] uppercase tracking-widest text-white/60 leading-relaxed">
              Agencia data driven con<br />sistemas de IA
            </p>
          </div>

          {/* Col 2: Nav links */}
          <div className="flex flex-col gap-3">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Navegación</p>
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-[11px] uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Col 3: Redes sociales */}
          <div className="flex flex-col gap-4">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">Redes sociales</p>
            <div className="flex gap-4">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="opacity-60 hover:opacity-100 transition-opacity duration-200"
                >
                  <img src={icon} alt={label} className="w-5 h-5 invert" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Contacto */}
          <div className="flex flex-col gap-3">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Contacto</p>
            <a
              href="mailto:hola@elsolaragencia.co"
              className="text-[11px] uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-200"
            >
              hola@elsolaragencia.co
            </a>
            <a
              href="https://wa.me/573203223580"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-200"
            >
              WhatsApp
            </a>
            <a
              href="https://tidycal.com/elsolar/sesion-de-diagnostico-auditoria-de-adquisicion-b2b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-200"
            >
              Tu Diagnóstico Inteligente
            </a>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-[10px] uppercase tracking-widest text-white/30">
          © 2026 El Solar. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}