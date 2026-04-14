import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import VideoHero from '../components/VideoHero'
import PageSEO from '../components/PageSEO'

// --- CAPA ICONS (inline SVG, 48x48, stroke line, currentColor) ---
function IconOferta({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 24L24 6l18 18v18H6V24Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M17 42V30h14v12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="15" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path d="M30 15h4M32 13v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconContenido({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 6h20a2 2 0 0 1 2 2v32a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.75" />
      <path d="M18 16h12M18 22h12M18 28h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M30 34l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconData({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="28" width="8" height="14" rx="1" stroke="currentColor" strokeWidth="1.75" />
      <rect x="20" y="18" width="8" height="24" rx="1" stroke="currentColor" strokeWidth="1.75" />
      <rect x="34" y="8" width="8" height="34" rx="1" stroke="currentColor" strokeWidth="1.75" />
      <path d="M10 22l10-8 10 6 10-12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconDecision({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="14" r="6" stroke="currentColor" strokeWidth="1.75" />
      <path d="M24 20v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M24 26l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M24 26l8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="14" cy="38" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="34" cy="38" r="4" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

// --- DATA ---
const capas = [
  {
    num: '01',
    title: 'Oferta',
    desc: 'Una oferta mal construida no la salva ningún canal ni presupuesto. Auditamos y reconstruimos tu propuesta de valor para que sea irresistible antes de lanzar un solo anuncio.',
    detail: 'Calculadora de oferta, análisis de precio percibido, posicionamiento vs competencia, garantías y bonos estratégicos.',
    Icon: IconOferta,
    accent: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  },
  {
    num: '02',
    title: 'Contenido',
    desc: 'El contenido que vende no es creativo genérico. Es arquitectura de mensajes calibrada al nivel de consciencia exacto del comprador en cada etapa del embudo.',
    detail: 'Librería de hooks, copies para ads y landing pages, guiones de video, email sequences, creatividades estáticas y en movimiento.',
    Icon: IconContenido,
    accent: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  },
  {
    num: '03',
    title: 'Data',
    desc: 'Sin tracking completo, cada decisión de presupuesto es una apuesta. Instalamos la infraestructura de datos que convierte métricas en decisiones rentables.',
    detail: 'Pixel + CAPI, Google Tag Manager, dashboards de KPIs, atribución de conversiones, alertas automáticas por anomalías.',
    Icon: IconData,
    accent: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  },
  {
    num: '04',
    title: 'Decisión',
    desc: 'Los datos sin interpretación no sirven. La IA analiza el rendimiento, detecta fricciones y genera recomendaciones de acción — nosotros las ejecutamos en ciclos de 14 días.',
    detail: 'Análisis automatizado, hipótesis de optimización, ciclos de A/B test, escalamiento predictivo, reportes ejecutivos mensuales.',
    Icon: IconDecision,
    accent: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  },
]

const awareness = [
  {
    level: 'Nivel 1',
    name: 'Sin consciencia',
    desc: 'No sabe que tiene el problema. Contenido educativo: "por qué tu tienda no vende aunque tenga tráfico".',
    color: 'text-[var(--text-muted)]',
  },
  {
    level: 'Nivel 2',
    name: 'Consciente del problema',
    desc: 'Siente el dolor pero no sabe la causa. Contenido de diagnóstico y herramientas de auditoría.',
    color: 'text-[var(--text-muted)]',
  },
  {
    level: 'Nivel 3',
    name: 'Consciente de la solución',
    desc: 'Sabe que existe algo como "marketing digital" pero no entiende qué variante le aplica.',
    color: 'text-[var(--text-main)]',
  },
  {
    level: 'Nivel 4',
    name: 'Consciente del producto',
    desc: 'Está evaluando opciones. Compara. Aquí la propuesta de valor y prueba social son decisivas.',
    color: 'text-[var(--text-main)]',
  },
  {
    level: 'Nivel 5',
    name: 'Listo para comprar',
    desc: 'Solo necesita la oferta correcta en el momento correcto. Urgencia real, garantía, facilidad de pago.',
    color: 'text-[var(--accent-blue)]',
  },
]

const iaRoles = [
  { title: 'Análisis de datos de campañas', desc: 'Detecta patrones en datos de rendimiento que tardarían horas en revisión manual.' },
  { title: 'Generación de variantes creativas', desc: 'Produce decenas de variaciones de copy y creatividades para A/B test sistemático.' },
  { title: 'Automatización de reportes', desc: 'Dashboards que se actualizan solos y alertas cuando un KPI sale del rango objetivo.' },
  { title: 'Cualificación de leads', desc: 'Scoring automático basado en comportamiento para priorizar el follow-up comercial.' },
  { title: 'Optimización de puja en tiempo real', desc: 'Ajustes de presupuesto y puja basados en señales de conversión cada hora.' },
  { title: 'Personalización a escala', desc: 'Mensajes que se adaptan según el segmento, comportamiento e historial sin trabajo adicional.' },
]

export default function SistemaVentas() {
  return (
    <div className="pb-24">
      <PageSEO
        title="Sistema Inteligente de Ventas B2B — El Solar Creative Group"
        description="Convierte tu proceso comercial en un sistema predecible. Diagnóstico, calificación automática y seguimiento con IA para empresas B2B en Latinoamérica."
        path="/sistema-inteligente-ventas"
        ogImage="og-siv.png"
      />

      {/* Hero — video background */}
      <VideoHero
        videoSrc="/assets/videos/siv/hero/hero-siv.mp4"
        videoSrcWebm="/assets/videos/siv/hero/hero-siv.webm"
        eyebrow="Sistema Inteligente de Ventas"
        heading={<>Un sistema que vende<br /><span className="font-light opacity-70">mientras tú creces.</span></>}
        subheading="No es una campaña. Es una arquitectura completa de adquisición de clientes que conecta oferta, contenido, data y decisión en un flujo automatizado y medible."
        ctaLabel="Tu Diagnóstico Inteligente — Fase 1 Gratis"
        ctaTo="/contacto"
      />

      {/* Para quién — fondo secundario */}
      <section className="bg-[var(--bg-secondary)] py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <SectionHeading subtitle="Perfil de cliente">
              Diseñado para<br />
              <span className="text-[var(--text-muted)]">negocios con tracción</span>
            </SectionHeading>
            <div className="space-y-6 pt-4">
              {[
                'Tiendas e-commerce con facturación entre 50M–500M COP/mes que quieren crecer sin depender de un solo canal.',
                'Negocios con producto validado pero adquisición de clientes caótica, dependiente de voz a voz o referidos.',
                'Fundadores que invierten en ads y no entienden por qué el ROAS no justifica el gasto.',
                'Empresas que crecieron orgánicamente y ahora necesitan sistematizar para escalar sin contratar 5 personas más.',
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <span className="text-[var(--accent-blue)] font-mono text-sm mt-1 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[var(--text-muted)] leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Las 4 capas — fondo principal */}
      <section className="bg-[var(--bg-main)] py-24">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Arquitectura del sistema">
            Las 4 capas del<br />
            <span className="text-[var(--text-muted)]">Sistema de Ventas</span>
          </SectionHeading>
          <div className="grid md:grid-cols-2 gap-5">
            {capas.map((capa, i) => {
              const { Icon } = capa
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="card-depth p-8 flex flex-col gap-5"
                >
                  {/* Icon + number */}
                  <div className="flex items-start justify-between">
                    <div className={`w-14 h-14 rounded-sm border flex items-center justify-center shrink-0 ${capa.accent}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="font-mono text-4xl font-light text-[var(--text-muted)] opacity-20">
                      {capa.num}
                    </span>
                  </div>

                  {/* Title + desc */}
                  <div>
                    <h3 className="text-xl font-medium text-[var(--text-main)] font-space mb-3">
                      {capa.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                      {capa.desc}
                    </p>
                  </div>

                  {/* Detail pill */}
                  <div className="pt-4 border-t border-[var(--border-color)]">
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{capa.detail}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5 niveles de consciencia — fondo secundario */}
      <section className="bg-[var(--bg-secondary)] py-24">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Framework de mensajes">
            5 niveles de consciencia<br />
            <span className="text-[var(--text-muted)]">del comprador</span>
          </SectionHeading>
          <p className="text-[var(--text-muted)] max-w-2xl mb-12 -mt-4">
            La mayoría de campañas fallan porque hablan en el nivel incorrecto. Cada mensaje que producimos está calibrado al momento exacto donde está el cliente en su proceso de decisión.
          </p>
          <div className="relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[var(--border-color)] hidden md:block" />
            <div className="space-y-6">
              {awareness.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="shrink-0 w-6 h-6 rounded-full border border-[var(--border-color)] bg-[var(--bg-main)] flex items-center justify-center mt-1 relative z-10">
                    <span className="text-[8px] font-bold text-[var(--text-muted)]">{i + 1}</span>
                  </div>
                  <div className="card-depth p-6 flex-1 grid md:grid-cols-[200px_1fr] gap-4 items-start">
                    <div>
                      <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] block mb-1">
                        {item.level}
                      </span>
                      <h4 className={`font-medium font-space ${item.color}`}>{item.name}</h4>
                    </div>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rol de la IA — fondo principal */}
      <section className="bg-[var(--bg-main)] py-24">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Ventaja tecnológica">
            Lo que la IA hace<br />
            <span className="text-[var(--text-muted)]">que otros no pueden</span>
          </SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {iaRoles.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-depth p-6"
              >
                <div className="w-8 h-px bg-[var(--accent-blue)] mb-4" />
                <h4 className="text-sm font-medium text-[var(--text-main)] mb-2 font-space">
                  {item.title}
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — fondo secundario */}
      <section className="bg-[var(--bg-secondary)] py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-depth p-12 md:p-16 text-center max-w-3xl mx-auto"
          >
            <span className="block text-[10px] font-bold tracking-[0.22em] text-[var(--text-muted)] mb-6 uppercase">
              Siguiente paso
            </span>
            <h2 className="text-3xl md:text-4xl font-light font-space text-[var(--text-main)] mb-6 text-balance">
              ¿Tu modelo necesita este sistema?
            </h2>
            <p className="text-[var(--text-muted)] mb-10 leading-relaxed">
              Hacemos una auditoría de fricción operativa de 45 minutos. Identificamos dónde se está perdiendo el dinero y si tiene sentido trabajar juntos.
            </p>
            <Link to="/contacto">
              <Button primary>Tu Diagnóstico Inteligente — Fase 1 Gratis</Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}