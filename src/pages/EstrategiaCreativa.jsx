import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import VideoHero from '../components/VideoHero'
import PageSEO from '../components/PageSEO'

// --- PLAN ICONS (inline SVG) ---
function IconDIY({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8a8 8 0 0 0-7.94 9.1L8.59 32.59a2 2 0 0 0 0 2.83l3.99 3.99a2 2 0 0 0 2.83 0L30.9 23.94A8 8 0 1 0 32 8Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="12" r="2" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M12 36l2 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  )
}

function IconDWY({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="14" r="5" stroke="currentColor" strokeWidth="1.75"/>
      <circle cx="31" cy="14" r="5" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M6 38c0-6.075 4.925-11 11-11h2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <path d="M42 38c0-6.075-4.925-11-11-11h-2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <path d="M20 32h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <path d="M24 28v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  )
}

function IconDFY({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 6C24 6 14 16 14 28a10 10 0 0 0 20 0C34 16 24 6 24 6Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 35l-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <path d="M31 35l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <circle cx="24" cy="26" r="3" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M24 10v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  )
}

const process = [
  {
    num: '01',
    title: 'Diagnóstico',
    iaRole: 'Investigación de mercado automatizada, análisis de competencia y lectura de datos históricos para identificar oportunidades ocultas.',
    items: [
      'Auditoría de campañas activas y métricas históricas',
      'Análisis de mensajes, creatividades y páginas de destino',
      'Identificación del nivel de consciencia del público actual',
      'Mapa de fricción en el embudo de conversión',
    ],
  },
  {
    num: '02',
    title: 'Perfilamiento',
    iaRole: 'Análisis de audiencia, segmentación avanzada, identificación de patrones de comportamiento y motivadores de compra.',
    items: [
      'Construcción del perfil de cliente ideal con datos reales, no suposiciones',
      'Arquetipos de cliente por nivel de consciencia',
      'Mapa de dolores, deseos, objeciones y lenguaje exacto',
      'Definición de ángulos de mensaje por segmento',
    ],
  },
  {
    num: '03',
    title: 'Arquitectura de Mensajes y Contenidos',
    iaRole: 'Generación y testeo de variantes de copy, calculadora de ofertas, simulación de mensajes antes de producir.',
    items: [
      'Framework de mensajes y contenidos para cada etapa del embudo',
      'Video, fotografía, textos, email marketing, copies para campañas, página web',
      'Librería de hooks, titulares y CTAs por ángulo',
      'Sistema de pruebas A/B con hipótesis documentadas',
    ],
  },
  {
    num: '04',
    title: 'Producción y Lanzamiento',
    iaRole: 'Optimización de creatividades, análisis predictivo de rendimiento antes de invertir, ajustes automáticos basados en datos.',
    items: [
      'Producción de creatividades estáticas y en video',
      'Configuración de campañas con estructura por consciencia',
      'Lanzamiento escalonado con control de presupuesto',
      'Monitoreo intensivo primera semana',
    ],
  },
  {
    num: '05',
    title: 'Iteración y Optimización',
    iaRole: 'Análisis automático de métricas, detección de patrones, recomendaciones de ajuste y escalamiento predecible.',
    items: [
      'Ciclos de optimización continuos basados en datos reales',
      'Análisis de datos y ajuste de mensajes',
      'Escalamiento de lo que funciona, corte de lo que no',
      'Reporte de resultados y siguiente ciclo',
    ],
  },
]

const icpTraits = [
  {
    label: 'Categoría de producto',
    value: 'Físico o digital con ticket medio-alto (desde $80 USD / $350K COP)',
  },
  {
    label: 'Facturación actual',
    value: '30M–300M COP/mes con intención de escalar 2–3x en 12 meses',
  },
  {
    label: 'Problema principal',
    value: 'Campañas activas que no escalan o ROAS que no justifica el gasto',
  },
  {
    label: 'Situación en ads',
    value: 'Ya invierte en Meta o Google Ads pero los resultados son inconsistentes',
  },
  {
    label: 'Equipo',
    value: 'Fundador o equipo pequeño que no quiere contratar creativo in-house',
  },
  {
    label: 'Mentalidad',
    value: 'Orientado a resultados, acepta feedback directo, entiende que el proceso tarda',
  },
]

const deliverables = [
  'Mapa de cliente ideal con lenguaje real (no plantilla genérica)',
  'Arquitectura de mensajes por nivel de consciencia',
  'Librería de ángulos y hooks validados',
  '12+ creatividades producidas (estáticas y video)',
  'Estructura de campañas instalada y activa',
  'Dashboard de métricas clave',
  'Sistema de iteración documentado',
  '3 meses de gestión activa con ciclos de optimización',
]

const plans = [
  {
    name: 'Do It Yourself',
    tag: 'DIY — Hazlo Tú Mismo',
    desc: 'Ejecuta la estrategia creativa bajo nuestra guía. Entrenamiento pregrabado + asesorías 1:1 para emprendedores y dueños de negocio que quieren aplicar el sistema por su cuenta.',
    price: '$500 USD',
    period: 'Pago único',
    includes: [
      'Contenido pregrabado completo',
      'Materiales, plantillas y ebooks',
      'Asesorías 1:1 durante 4 meses',
      'Actualizaciones de por vida',
      'Acceso a la comunidad de Skool',
    ],
    cta: 'Empezar Ahora',
    ctaTo: '/contacto',
  },
  {
    name: 'Done With You',
    tag: 'DWY — Lo Hacemos Contigo',
    desc: 'Trabajamos codo a codo contigo para construir tu sistema de estrategia creativa: anuncios, mensajes, generación de contenido y más.',
    price: '$950 USD',
    period: '/mes · 120 días',
    includes: [
      'Todo lo del Plan DIY',
      'Trabajo directo con el equipo El Solar',
      'Sesiones de trabajo colaborativas',
      'Revisiones y feedback personalizado',
      'Implementación guiada paso a paso',
    ],
    cta: 'Aplicar al Programa',
    ctaTo: '/contacto',
    featured: true,
  },
  {
    name: 'Done For You',
    tag: 'DFY — Lo Hacemos Todo Por Ti',
    desc: 'Nosotros ejecutamos absolutamente todo. Tú te enfocas en tu negocio mientras construimos tu sistema de estrategia creativa completo.',
    price: 'Personalizado',
    period: 'Requiere auditoría previa',
    includes: [
      'Ejecución completa por el equipo El Solar',
      'Estrategia, producción, implementación, optimización',
      'Todo incluido — manos libres',
      'Entregables detallados al finalizar',
    ],
    cta: 'Tu Diagnóstico Inteligente — Fase 1 Gratis',
    ctaTo: '/contacto',
  },
]

const planIcons = [IconDIY, IconDWY, IconDFY]
const planAccents = [
  'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'text-violet-400 bg-violet-400/10 border-violet-400/20',
]

export default function EstrategiaCreativa() {
  return (
    <div className="pb-24">
      <PageSEO
        title="Estrategia Creativa — El Solar Creative Group"
        description="Programa DWY de 90 días para construir tu sistema de contenido con IA. Creatividad estructurada, formatos probados y producción masiva sin perder calidad."
        path="/estrategia-creativa"
        ogImage="og-ec.png"
      />
      {/* Hero — video background */}
      <VideoHero
        videoSrc="/assets/videos/estrategia-creativa/hero/hero-ec.mp4"
        videoSrcWebm="/assets/videos/estrategia-creativa/hero/hero-ec.webm"
        eyebrow="Estrategia Creativa"
        heading={<>Creatividad que<br /><span className="font-light opacity-70">convierte en ventas.</span></>}
        subheading="Construimos desde cero la arquitectura de mensajes y contenidos de tu negocio: video, fotografía, copies para campañas, página web — absolutamente todo."
        ctaLabel="Tu Diagnóstico Inteligente — Fase 1 Gratis"
        ctaTo="/contacto"
      />

      {/* El problema — fondo secundario */}
      <section className="bg-[var(--bg-secondary)] py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading subtitle="El problema de fondo">
                El 90% de los anuncios<br />
                <span className="text-[var(--text-muted)]">fallan en el mensaje</span>
              </SectionHeading>
              <p className="text-[var(--text-muted)] leading-relaxed">
                No es el presupuesto. No es el algoritmo. No es la segmentación. Es que el anuncio dice lo incorrecto a la persona incorrecta en el momento incorrecto de su proceso de decisión.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { wrong: 'Creatividades genéricas que no conectan con ningún dolor específico', right: 'Mensajes calibrados al nivel de consciencia exacto del comprador' },
                { wrong: 'Copy que habla del producto en vez de hablar del cliente', right: 'Copy que refleja el lenguaje y las emociones del cliente en su propio proceso' },
                { wrong: 'Una sola creatividad para todo el embudo', right: 'Arquitectura de mensajes por etapa: descubrimiento, consideración, conversión' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card-depth p-5"
                >
                  <div className="flex gap-3 mb-3">
                    <span className="text-red-400 text-xs mt-0.5">✕</span>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.wrong}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[var(--accent-blue)] text-xs mt-0.5">✓</span>
                    <p className="text-xs text-[var(--text-main)] leading-relaxed">{item.right}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Para quién — fondo principal */}
      <section className="bg-[var(--bg-main)] py-24">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Perfil de cliente ideal">
            Para quién está diseñado<br />
            <span className="text-[var(--text-muted)]">este programa</span>
          </SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {icpTraits.map((trait, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-depth p-6"
              >
                <span className="block text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">
                  {trait.label}
                </span>
                <p className="text-sm text-[var(--text-main)] leading-relaxed">{trait.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso — fondo secundario */}
      <section className="bg-[var(--bg-secondary)] py-24">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Cómo Trabajamos">
            De principio a fin<br />
            <span className="text-[var(--text-muted)]">con IA en cada paso</span>
          </SectionHeading>
          <div className="space-y-4">
            {process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-depth p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="shrink-0 md:w-48">
                    <span className="font-mono text-3xl font-light text-[var(--text-muted)] opacity-30 block mb-1">
                      {step.num}
                    </span>
                    <h3 className="text-lg font-medium text-[var(--text-main)] font-space mb-1">
                      {step.title}
                    </h3>
                  </div>
                  <div className="flex-1">
                    <ul className="grid md:grid-cols-2 gap-2 mb-4">
                      {step.items.map((item, j) => (
                        <li key={j} className="flex gap-3 text-sm text-[var(--text-muted)]">
                          <span className="text-[var(--accent-blue)] shrink-0 mt-1">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2 items-start pt-3 border-t border-[var(--border-color)]">
                      <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-blue-400 shrink-0 mt-0.5">Con IA:</span>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">{step.iaRole}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Entregables — fondo principal */}
      <section className="bg-[var(--bg-main)] py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <SectionHeading subtitle="Lo que recibes">
              Entregables concretos<br />
              <span className="text-[var(--text-muted)]">al final del programa</span>
            </SectionHeading>
            <div className="grid gap-3 pt-4">
              {deliverables.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex gap-4 items-start py-3 border-b border-[var(--border-color)] last:border-0"
                >
                  <span className="text-[var(--accent-blue)] text-xs mt-0.5 shrink-0">✓</span>
                  <span className="text-sm text-[var(--text-main)]">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Planes — fondo secundario + iconos diferenciados */}
      <section className="bg-[var(--bg-secondary)] py-24 pb-32">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Inversión">
            Elige el nivel<br />
            <span className="text-[var(--text-muted)]">que corresponde a tu situación</span>
          </SectionHeading>
          <div className="grid md:grid-cols-3 gap-5">
            {plans.map((plan, i) => {
              const PlanIcon = planIcons[i]
              const accent = planAccents[i]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className={`card-depth p-8 flex flex-col group transition-all duration-300 ${plan.featured ? 'ring-1 ring-blue-400/30' : ''}`}
                >
                  {/* Ícono */}
                  <div className={`w-12 h-12 rounded-sm border flex items-center justify-center mb-5 ${accent}`}>
                    <PlanIcon className="w-6 h-6" />
                  </div>

                  {plan.featured && (
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-blue-400 mb-2 block">
                      Más popular
                    </span>
                  )}
                  <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-1">
                    {plan.tag}
                  </span>
                  <h3 className="text-xl font-medium text-[var(--text-main)] font-space mb-3">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                    {plan.desc}
                  </p>
                  <div className="mb-6">
                    <span className="text-3xl font-light font-space text-[var(--text-main)]">{plan.price}</span>
                    <span className="text-sm text-[var(--text-muted)] ml-2">{plan.period}</span>
                  </div>
                  <ul className="space-y-2.5 mb-8 flex-grow">
                    {plan.includes.map((item, j) => (
                      <li key={j} className="flex gap-3 text-sm text-[var(--text-muted)]">
                        <span className="text-[var(--accent-blue)] shrink-0 mt-0.5">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to={plan.ctaTo}>
                    <Button primary={plan.featured}>{plan.cta}</Button>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}