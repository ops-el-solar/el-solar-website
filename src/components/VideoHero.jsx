import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * VideoHero — reutilizable para cualquier página
 * Props:
 *   videoSrc     string  — ruta al .mp4 (relativa a /public)
 *   videoSrcWebm string  — ruta al .webm (fallback)
 *   eyebrow      string  — etiqueta pequeña sobre el H1
 *   heading      node    — H1 principal (puede incluir <br /> o <span>)
 *   subheading   string  — párrafo de apoyo
 *   ctaLabel     string  — texto del botón
 *   ctaTo        string  — ruta Link
 *   overlayOpacity number — 0-1, default 0.6
 */
export default function VideoHero({
  videoSrc,
  videoSrcWebm,
  eyebrow,
  heading,
  subheading,
  ctaLabel = 'Tu Diagnóstico Inteligente — Fase 1 Gratis',
  ctaTo = '/contacto',
  overlayOpacity = 0.6,
  minHeight = '90vh',
}) {
  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{ minHeight }}
    >
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        {videoSrcWebm && <source src={videoSrcWebm} type="video/webm" />}
        {videoSrc && <source src={videoSrc} type="video/mp4" />}
        {/* Fallback: si no hay video se ve el overlay sobre fondo negro */}
      </video>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Noise grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '128px 128px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pb-20 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span className="block text-[10px] font-bold tracking-[0.25em] text-white/50 mb-6 uppercase">
              {eyebrow}
            </span>
          )}

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-white font-space mb-8 text-balance">
            {heading}
          </h1>

          {subheading && (
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-10 font-light">
              {subheading}
            </p>
          )}

          <Link
            to={ctaTo}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
          >
            {ctaLabel}
          </Link>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-main)] to-transparent pointer-events-none" />
    </section>
  )
}