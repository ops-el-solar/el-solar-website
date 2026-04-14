import { Link } from 'react-router-dom'
import PageSEO from '../components/PageSEO'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <PageSEO
        title="Página no encontrada — El Solar Creative Group"
        description="La página que buscas no existe."
        path="/404"
        ogImage="og-default.png"
      />

      <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-accent-gold)] uppercase mb-6">
        Error 404
      </span>

      <h1 className="text-6xl md:text-8xl font-light text-[var(--color-white)] font-space mb-6">
        No encontrado
      </h1>

      <p className="text-lg text-[var(--color-white)]/50 max-w-md mb-12 font-light">
        Esta página no existe o fue movida. Vuelve al inicio y encuentra lo que necesitas.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}